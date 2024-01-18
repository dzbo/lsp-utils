import ERC725 from '@erc725/erc725.js';
import { BytesLike, Signer, Wallet, isAddress, toBeHex, toNumber } from 'ethers';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// types
import { ERC725Y } from '../../typechain';

// utils
import { generateArrayElementKeyAtIndex, getErc725yContract, isValidArrayLengthValue } from '../..';

/**
 * Remove the LSP12 Issued Assets of a issuer contract that supports ERC725Y.
 *
 * @since v0.0.2
 * @category LSP12
 * @param signer The signer that will send the transaction.
 * @param issuerAddress The address of the issuer contract that supports ERC725Y.
 *
 * @throws
 * - When `issuerAddress` is not a valid address.
 * - When the contract deployed at `issuerAddress` address does not support the `ERC725Y` interface id.
 * - When there are no `LSP12IssuedAssets[]` in the issuer storage.
 * - When the length for `LSP12IssuedAssets[]` is not a valid LSP2 array length value.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-12-IssuedAssets.md
 */
export async function removeIssuedAssets(issuer: ERC725Y): Promise<void>;
export async function removeIssuedAssets(
    issuer: ERC725Y | BytesLike,
    signer?: Signer | Wallet,
): Promise<void> {
    const issuerContract: ERC725Y = signer
        ? await getErc725yContract(issuer, signer)
        : await getErc725yContract(issuer);

    const issuedAssetsLengthHex = await issuerContract.getData(
        ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
    );

    if (issuedAssetsLengthHex === '' || issuedAssetsLengthHex === '0x') {
        throw new Error('There are no LSP12 Issued Assets .');
    }

    if (!isValidArrayLengthValue(issuedAssetsLengthHex)) {
        throw new Error(
            `The data value for \`LSP12IssuedAssets[]\` data key is not a valid LSP2 array length value. Value: ${issuedAssetsLengthHex}`,
        );
    }

    const issuedAssetsLength = toNumber(issuedAssetsLengthHex);

    const dataKeys: BytesLike[] = [ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length];
    const dataValues: BytesLike[] = [toBeHex(0, 16)];

    for (let index = 0; index < issuedAssetsLength; index++) {
        const arrayIndexDataKey = generateArrayElementKeyAtIndex(
            ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
            index,
        );
        const arrayIndexDataValue = await issuerContract.getData(arrayIndexDataKey);

        if (!isAddress(arrayIndexDataValue)) {
            dataKeys.push(arrayIndexDataKey);
            dataValues.push('0x');
            continue;
        }

        dataKeys.push(
            arrayIndexDataKey,
            ERC725.encodeKeyName('LSP12IssuedAssetsMap:<address>', [arrayIndexDataValue]),
        );
        dataValues.push('0x', '0x');
    }

    const tx = await issuerContract.setDataBatch(dataKeys, dataValues);

    await tx.wait(1);
}
