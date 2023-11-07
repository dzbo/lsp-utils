import ERC725 from '@erc725/erc725.js';
import { BytesLike, Signer, Wallet, isAddress, isAddressable, toBeHex, toNumber } from 'ethers';
import { ERC725YDataKeys, INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

// types
import { ERC725Y, ERC725Y__factory } from '../../typechain';

// utils
import { generateArrayElementKeyAtIndex, isValidArrayLengthValue } from '../..';

/**
 * Remove the LSP4 Creators of a digital asset contract that supports ERC725Y.
 *
 * @since v0.0.2
 * @category LSP4
 * @param signer The signer that will send the transaction.
 * @param digitalAssetAddress The adderss of the digital asset contract that supports ERC725Y.
 *
 * @throws
 * - When `digitalAssetAddress` is not a valid address.
 * - When the contract deployed at `digitalAssetAddress` address does not support the `ERC725Y` interface id.
 * - When there are no `LSP4Creators[]` in the digital asset storage.
 * - When the length for `LSP4Creators[]` is not a valid LSP2 array length value.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md
 */
export async function removeDigitalAssetCreators(digitalAsset: ERC725Y): Promise<void>;
export async function removeDigitalAssetCreators(
    digitalAsset: ERC725Y,
    provider: Signer | Wallet,
): Promise<void>;
export async function removeDigitalAssetCreators(
    digitalAsset: BytesLike | string,
    provider: Signer | Wallet,
): Promise<void>;
export async function removeDigitalAssetCreators(
    digitalAsset: ERC725Y | BytesLike | string,
    signer?: Signer | Wallet,
): Promise<void> {
    let digitalAssetContract: ERC725Y;
    if (isAddress(digitalAsset)) {
        digitalAssetContract = ERC725Y__factory.connect(digitalAsset, signer);
    } else if (isAddressable(digitalAsset)) {
        if (signer) {
            digitalAssetContract = digitalAsset.connect(signer);
        } else {
            digitalAssetContract = digitalAsset;
        }
    } else {
        throw new Error(
            `The parameter \`digitalAssetAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${digitalAsset}'`,
        );
    }

    if (!(await digitalAssetContract.supportsInterface(INTERFACE_IDS.ERC725Y))) {
        throw new Error(
            "Digital asset does not support 'ERC725Y'. Cannot use `getData()` or `setData()`",
        );
    }

    const creatorsLengthHex = await digitalAssetContract.getData(
        ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
    );

    if (creatorsLengthHex === '' || creatorsLengthHex === '0x') {
        throw new Error('There are no LSP4 Creators.');
    }

    if (!isValidArrayLengthValue(creatorsLengthHex)) {
        throw new Error(
            `The data value for \`LSP4Creators[]\` data key is not a valid LSP2 array length value. Value: ${creatorsLengthHex}`,
        );
    }

    const creatorsLength = toNumber(creatorsLengthHex);

    const dataKeys: BytesLike[] = [ERC725YDataKeys.LSP4['LSP4Creators[]'].length];
    const dataValues: BytesLike[] = [toBeHex(0, 16)];

    for (let index = 0; index < creatorsLength; index++) {
        const arrayIndexDataKey = generateArrayElementKeyAtIndex(
            ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
            index,
        );
        const arrayIndexDataValue = await digitalAssetContract.getData(arrayIndexDataKey);

        if (!isAddress(arrayIndexDataValue)) {
            dataKeys.push(arrayIndexDataKey);
            dataValues.push('0x');
            continue;
        }

        dataKeys.push(
            arrayIndexDataKey,
            ERC725.encodeKeyName('LSP4CreatorsMap:<address>', [arrayIndexDataValue]),
        );
        dataValues.push('0x', '0x');
    }

    const tx = await digitalAssetContract.setDataBatch(dataKeys, dataValues);

    await tx.wait(1);
}
