import { BytesLike, Provider, isAddress, isAddressable, isHexString, toNumber } from 'ethers';
import { ERC725YDataKeys, INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

// types
import { ERC725Y__factory, ERC725Y } from '../../typechain';

// constants
import {
    Issuer,
    generateArrayElementKeyAtIndex,
    generateMappingKey,
    isValidArrayLengthValue,
} from '../..';

/**
 * Get the LSP4 Creators of a digital asset contract that supports ERC725Y.
 *
 * @since v0.0.2
 * @category LSP4
 * @param provider A ethers provider.
 * @param digitalAssetAddress The adderss of the digital asset contract that supports ERC725Y.
 *
 * @returns An array of Issuers.
 *
 * @throws
 * - When `digitalAssetAddress` is not a valid address.
 * - When the contract deployed at `digitalAssetAddress` address does not support the `ERC725Y` interface id.
 * - When the length for `LSP4Creators[]` is not a valid LSP2 array length value.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md
 */
export async function getDigitalAssetCreators(digitalAsset: ERC725Y): Promise<Issuer[]>;
export async function getDigitalAssetCreators(
    digitalAsset: ERC725Y,
    provider: Provider,
): Promise<Issuer[]>;
export async function getDigitalAssetCreators(
    digitalAsset: BytesLike | string,
    provider: Provider,
): Promise<Issuer[]>;
export async function getDigitalAssetCreators(
    digitalAsset: ERC725Y | BytesLike | string,
    provider?: Provider,
): Promise<Issuer[]> {
    let digitalAssetContract: ERC725Y;
    if (isAddress(digitalAsset)) {
        digitalAssetContract = ERC725Y__factory.connect(digitalAsset, provider);
    } else if (isAddressable(digitalAsset)) {
        if (provider) {
            digitalAssetContract = digitalAsset.connect(provider);
        } else {
            digitalAssetContract = digitalAsset;
        }
    } else {
        throw new Error(
            `The parameter \`digitalAssetAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${digitalAsset}'`,
        );
    }

    if (!(await digitalAssetContract.supportsInterface(INTERFACE_IDS.ERC725Y))) {
        throw new Error("Digital asset does not support 'ERC725Y'. Cannot use `getData()`");
    }

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
