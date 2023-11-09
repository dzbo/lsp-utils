import ERC725 from '@erc725/erc725.js';
import { BytesLike, Signer, Wallet, concat, toBeHex, toNumber } from 'ethers';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// types
import { ERC725Y } from '../../typechain';

// utils
import {
    Issuer,
    generateArrayElementKeyAtIndex,
    getErc725yContract,
    isValidArrayLengthValue,
} from '../..';

/**
 * Add LSP4 Creators to the digital asset contract that supports ERC725Y.
 *
 * @since v0.0.2
 * @category LSP4
 * @param signer The signer that will send the transaction.
 * @param digitalAssetAddress The adderss of the digital asset contract that supports ERC725Y.
 * @param newCreators An array of creators which specifies the address and interface id of each creatotor.
 *
 * @throws
 * - When `newCreators` is an empty array.
 * - When `digitalAssetAddress` is not a valid address.
 * - When the contract deployed at `digitalAssetAddress` address does not support the `ERC725Y` interface id.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md
 */
export async function addDigitalAssetCreators(
    digitalAsset: ERC725Y,
    newCreators: Issuer[],
): Promise<void>;
export async function addDigitalAssetCreators(
    digitalAsset: ERC725Y | BytesLike,
    newCreators: Issuer[],
    signer?: Signer | Wallet,
): Promise<void> {
    if (newCreators.length === 0) {
        throw new Error('`newCreators` length is 0.');
    }

    const digitalAssetContract: ERC725Y = signer
        ? await getErc725yContract(digitalAsset, signer)
        : await getErc725yContract(digitalAsset);

    const creatorsLengthHex = await digitalAssetContract.getData(
        ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
    );

    let creatorsLength: number;

    if (creatorsLengthHex === '' || creatorsLengthHex === '0x') {
        creatorsLength = 0;
    } else if (!isValidArrayLengthValue(creatorsLengthHex)) {
        creatorsLength = 0;
    } else {
        creatorsLength = toNumber(creatorsLengthHex);
    }

    const dataKeys = [
        ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
        ...newCreators.flatMap((newCreator, index) => [
            generateArrayElementKeyAtIndex(
                ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
                creatorsLength + index,
            ),
            ERC725.encodeKeyName('LSP4CreatorsMap:<address>', [newCreator.address.toString()]),
        ]),
    ];

    const dataValues = [
        toBeHex(creatorsLength + newCreators.length, 16),
        ...newCreators.flatMap((newCreator, index) => [
            newCreator.address,
            concat([newCreator.interfaceId, toBeHex(index, 16)]),
        ]),
    ];

    const tx = await digitalAssetContract.setDataBatch(dataKeys, dataValues);

    await tx.wait(1);
}
