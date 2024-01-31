// types
import { BytesLike, Provider } from 'ethers';
import { ERC725YDataKeys, LSP4DigitalAssetMetadataJSON } from '@lukso/lsp-smart-contracts';

// erc725.js
import ERC725, { ERC725JSONSchema } from '@erc725/erc725.js';
import LSP4DigitalAssetSchema from '@erc725/erc725.js/schemas/LSP4DigitalAsset.json';

// lsp-utils
import { getErc725yContract } from '@lukso/lsp-utils-helpers';
import { validateIpfsUrl } from '@lukso/ipfs-utils';

// utils
import { isAssetMetadata } from '../isAssetMetadata';

// typechain
import { ERC725Y } from '../typechain';

/**
 * Returns a object of type LSP4AssetMetadata.
 *
 * @since v0.0.2
 * @category LSP4
 *
 * @param digitalAsset The instance of a ERC725Y contract.
 *
 * @throws
 * - When fails fetching the data from the stored url.
 * - When the fetched data is not `LSP4AssetMetadata`.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md
 * @example
 * ```
 * getAssetMetadata(ERC725Y) //=>
 * // {
 * //   LSP4Metadata: {
 * //     name: "",
 * //     description: "",
 * //     links: [],
 * //     icon: [],
 * //     assets: [],
 * //     images: []
 * //   }
 * // }
 * ```
 */
export async function getAssetMetadata(
    digitalAsset: ERC725Y | BytesLike,
    provider?: Provider,
): Promise<LSP4DigitalAssetMetadataJSON> {
    const digitalAssetContract: ERC725Y = provider
        ? await getErc725yContract(digitalAsset, provider)
        : await getErc725yContract(digitalAsset);

    const dataValue = await digitalAssetContract.getData(ERC725YDataKeys.LSP4.LSP4Metadata);

    const decodedDataValue = ERC725.decodeData(
        [{ value: dataValue, keyName: 'LSP4Metadata' }],
        [
            LSP4DigitalAssetSchema.filter(
                ({ name }) => name === 'LSP4Metadata',
            )[0] as ERC725JSONSchema,
        ],
    );

    const { url } = decodedDataValue[0].value;
    const validatedUrl = validateIpfsUrl(url);

    let assetMetadata: LSP4DigitalAssetMetadataJSON;
    try {
        const response = await fetch(validatedUrl);
        assetMetadata = await response.json();
    } catch {
        throw new Error("Couldn't fetch Asset Metadata from the url.");
    }

    if (!isAssetMetadata(assetMetadata)) {
        throw new Error('Fetched data is not `LSP4Metadata`');
    }

    return assetMetadata;
}
