import { BytesLike, Provider, isAddress, isHexString, toNumber } from 'ethers';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// constants
import {
    generateArrayElementKeyAtIndex,
    generateMappingKey,
    isValidArrayLengthValue,
} from '@lukso/lsp2-utils';
import { Issuer } from '@lukso/lsp-utils-constants';
import { getErc725yContract } from '@lukso/lsp-utils-helpers';

// typechain
import { ERC725Y } from '../typechain';

/**
 * Get the LSP4 Creators of a digital asset contract that supports ERC725Y.
 *
 * @since v0.0.2
 * @category LSP4
 * @param provider An ethers provider.
 * @param digitalAssetAddress The address of the digital asset contract that supports ERC725Y.
 *
 * @returns An array of Issuers.
 *
 * @throws
 * - When `digitalAssetAddress` is not a valid address.
 * - When the contract deployed at `digitalAssetAddress` does not support the `ERC725Y` interface id.
 * - When the length for `LSP4Creators[]` is not a valid LSP2 array length value.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md
 */
export async function getDigitalAssetCreators(
    digitalAsset: ERC725Y | BytesLike,
    provider?: Provider,
): Promise<Issuer[]> {
    const digitalAssetContract: ERC725Y = provider
        ? await getErc725yContract(digitalAsset, provider)
        : await getErc725yContract(digitalAsset);

    const creatorsLengthHex = await digitalAssetContract.getData(
        ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
    );

    if (creatorsLengthHex === '' || creatorsLengthHex === '0x') {
        return [];
    }

    if (!isValidArrayLengthValue(creatorsLengthHex)) {
        throw new Error(
            `The data value for \`LSP4Creators[]\` data key is not a valid LSP2 array length value. Value: ${creatorsLengthHex}`,
        );
    }

    const creatorsLength = toNumber(creatorsLengthHex);

    const creators: Issuer[] = [];

    for (let index = 0; index < creatorsLength; index++) {
        const creatorAddress = await digitalAssetContract.getData(
            generateArrayElementKeyAtIndex(ERC725YDataKeys.LSP4['LSP4Creators[]'].length, index),
        );

        // If no address is returned, nothing else can be done
        if (!isAddress(creatorAddress)) {
            continue;
        }

        const creatorMap = await digitalAssetContract.getData(
            generateMappingKey(ERC725YDataKeys.LSP4.LSP4CreatorsMap, creatorAddress),
        );

        // According to LSP4 the value of `LSP4CreatorsMap` should have 20 bytes
        creators.push({
            address: creatorAddress,
            interfaceId: isHexString(creatorMap, 20) ? creatorMap.substring(0, 10) : '0x',
        });
    }

    return creators;
}
