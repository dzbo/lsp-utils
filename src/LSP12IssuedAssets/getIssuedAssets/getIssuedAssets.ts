import { BytesLike, Provider, isAddress, isHexString, toNumber } from 'ethers';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// types
import { ERC725Y } from '../../typechain/erc725';

// constants
import {
    DigitalAsset,
    generateArrayElementKeyAtIndex,
    generateMappingKey,
    getErc725yContract,
    isValidArrayLengthValue,
} from '../..';

/**
 * Get the LSP12 Issued Assets of a issuer contract that supports ERC725Y.
 *
 * @since v0.0.2
 * @category LSP12
 * @param provider An ethers provider.
 * @param issuerAddress The address of the issuer contract that supports ERC725Y.
 *
 * @returns An array of Digital Assets.
 *
 * @throws
 * - When `issuerAddress` is not a valid address.
 * - When the contract deployed at `issuerAddress` does not support the `ERC725Y` interface id.
 * - When the length for `LSP12IssuedAssets[]` is not a valid LSP2 array length value.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-12-IssuedAssets.md
 */
export async function getIssuedAssets(
    issuer: ERC725Y | BytesLike,
    provider?: Provider,
): Promise<DigitalAsset[]> {
    const issuerContract: ERC725Y = provider
        ? await getErc725yContract(issuer, provider)
        : await getErc725yContract(issuer);

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
