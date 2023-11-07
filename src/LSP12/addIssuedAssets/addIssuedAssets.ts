import ERC725 from '@erc725/erc725.js';
import {
    BytesLike,
    Signer,
    Wallet,
    concat,
    isAddress,
    isAddressable,
    toBeHex,
    toNumber,
} from 'ethers';
import { ERC725YDataKeys, INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

// types
import { ERC725Y__factory, ERC725Y } from '../../typechain';

// utils
import { DigitalAsset, generateArrayElementKeyAtIndex, isValidArrayLengthValue } from '../..';

/**
 * Add LSP12 Issued Assets to a issuer contract that supports ERC725Y.
 *
 * @since v0.0.2
 * @category LSP12
 * @param signer The signer that will send the transaction.
 * @param issuerAddress The adderss of a issuer contract that supports ERC725Y.
 * @param newIssuedAssets An array of issued assets which specifies the address and interface id of each issued asset.
 *
 * @throws
 * - When `newIssuedAssets` is an empty array.
 * - When `issuerAddress` is not a valid address.
 * - When the contract deployed at `issuerAddress` address does not support the `ERC725Y` interface id.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-12-IssuedAssets.md
 */
export async function addIssuedAssets(
    issuer: ERC725Y,
    newIssuedAssets: DigitalAsset[],
): Promise<void>;
export async function addIssuedAssets(
    issuer: ERC725Y,
    newIssuedAssets: DigitalAsset[],
    signer: Signer | Wallet,
): Promise<void>;
export async function addIssuedAssets(
    issuer: BytesLike | string,
    newIssuedAssets: DigitalAsset[],
    signer: Signer | Wallet,
): Promise<void>;
export async function addIssuedAssets(
    issuer: ERC725Y | BytesLike | string,
    newIssuedAssets: DigitalAsset[],
    signer?: Signer | Wallet,
): Promise<void> {
    if (newIssuedAssets.length === 0) {
        throw new Error('`newIssuedAssets` length is 0.');
    }

    let issuerContract: ERC725Y;
    if (isAddress(issuer)) {
        issuerContract = ERC725Y__factory.connect(issuer, signer);
    } else if (isAddressable(issuer)) {
        if (signer) {
            issuerContract = issuer.connect(signer);
        } else {
            issuerContract = issuer;
        }
    } else {
        throw new Error(
            `The parameter \`issuerAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${issuer}'`,
        );
    }

    if (!(await issuerContract.supportsInterface(INTERFACE_IDS.ERC725Y))) {
        throw new Error(
            "Digital asset does not support 'ERC725Y'. Cannot use `getData()` or `setData()`",
        );
    }

    const issuedAssetsLengthHex = await issuerContract.getData(
        ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
    );

    let issuedAssetsLength: number;

    if (issuedAssetsLengthHex === '' || issuedAssetsLengthHex === '0x') {
        issuedAssetsLength = 0;
    } else if (!isValidArrayLengthValue(issuedAssetsLengthHex)) {
        issuedAssetsLength = 0;
    } else {
        issuedAssetsLength = toNumber(issuedAssetsLengthHex);
    }

    const dataKeys = [
        ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
        ...newIssuedAssets.flatMap((newIssuedAsset, index) => [
            generateArrayElementKeyAtIndex(
                ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
                issuedAssetsLength + index,
            ),
            ERC725.encodeKeyName('LSP12IssuedAssetsMap:<address>', [
                newIssuedAsset.address.toString(),
            ]),
        ]),
    ];

    const dataValues = [
        toBeHex(issuedAssetsLength + newIssuedAssets.length, 16),
        ...newIssuedAssets.flatMap((newIssuedAsset, index) => [
            newIssuedAsset.address,
            concat([newIssuedAsset.interfaceId, toBeHex(index, 16)]),
        ]),
    ];

    const tx = await issuerContract.setDataBatch(dataKeys, dataValues);

    await tx.wait(1);
}
