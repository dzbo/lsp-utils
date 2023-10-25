import { BytesLike, Provider, isAddress, isAddressable, isHexString, toNumber } from 'ethers';
import { ERC725YDataKeys, INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

// types
import { ERC725Y__factory, ERC725Y } from '../typechain';

// constants
import {
    DigitalAsset,
    generateArrayElementKeyAtIndex,
    generateMappingKey,
    isValidArrayLengthValue,
} from '..';

/**
 * Get the LSP12 Issued Assets of a issuer contract that supports ERC725Y.
 *
 * @since v0.0.2
 * @category LSP12
 * @param provider A ethers provider.
 * @param issuerAddress The adderss of the issuer contract that supports ERC725Y.
 *
 * @returns An array of Digital Assets.
 *
 * @throws
 * - When `issuerAddress` is not a valid address.
 * - When the contract deployed at `issuerAddress` address does not support the `ERC725Y` interface id.
 * - When the length for `LSP12IssuedAssets[]` is not a valid LSP2 array length value.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-12-IssuedAssets.md
 */
export async function getIssuedAssets(issuer: ERC725Y): Promise<DigitalAsset[]>;
export async function getIssuedAssets(issuer: ERC725Y, provider: Provider): Promise<DigitalAsset[]>;
export async function getIssuedAssets(
    issuer: BytesLike | string,
    provider: Provider,
): Promise<DigitalAsset[]>;
export async function getIssuedAssets(
    issuer: ERC725Y | BytesLike | string,
    provider?: Provider,
): Promise<DigitalAsset[]> {
    let issuerContract: ERC725Y;
    if (isAddress(issuer)) {
        issuerContract = ERC725Y__factory.connect(issuer, provider);
    } else if (isAddressable(issuer)) {
        if (provider) {
            issuerContract = issuer.connect(provider);
        } else {
            issuerContract = issuer;
        }
    } else {
        throw new Error(
            `The parameter \`issuerAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${issuer}'`,
        );
    }

    if (!(await issuerContract.supportsInterface(INTERFACE_IDS.ERC725Y))) {
        throw new Error("Issuer does not support 'ERC725Y'. Cannot use `getData()`");
    }

    const issuedAssetsLengthHex = await issuerContract.getData(
        ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
    );

    if (issuedAssetsLengthHex === '' || issuedAssetsLengthHex === '0x') {
        return [];
    }

    if (!isValidArrayLengthValue(issuedAssetsLengthHex)) {
        throw new Error(
            `The data value for \`LSP12IssuedAssets[]\` data key is not a valid LSP2 array length value. Value: ${issuedAssetsLengthHex}`,
        );
    }

    const issuedAssetsLength = toNumber(issuedAssetsLengthHex);

    const digitalAssets: DigitalAsset[] = [];

    for (let index = 0; index < issuedAssetsLength; index++) {
        const issuedAssetAdress = await issuerContract.getData(
            generateArrayElementKeyAtIndex(
                ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
                index,
            ),
        );

        // If no address is returned, nothing else can be done
        if (!isAddress(issuedAssetAdress)) {
            continue;
        }

        const issuerMap = await issuerContract.getData(
            generateMappingKey(ERC725YDataKeys.LSP12.LSP12IssuedAssetsMap, issuedAssetAdress),
        );

        // According to LSP12 the value of `LSP12IssuedAssetsMap` should have 20 bytes
        digitalAssets.push({
            address: issuedAssetAdress,
            interfaceId: isHexString(issuerMap, 20) ? issuerMap.substring(0, 10) : '0x',
        });
    }

    return digitalAssets;
}
