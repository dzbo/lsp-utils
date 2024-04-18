import { BytesLike, Signer, Wallet } from 'ethers';
import { LSP4DigitalAssetMetadataJSON } from '@lukso/lsp-smart-contracts';
import { ERC725Y } from '../../typechain/erc725';
import { getErc725yContract } from '../../helpers';

import ERC725 from '@erc725/erc725.js';
import LSP3Schema from '@erc725/erc725.js/schemas/LSP3ProfileMetadata.json';

const erc725 = new ERC725(LSP3Schema);

/**
 * Set Asset metadata.
 *
 * @category LSP4
 *
 * @param erc725y The address of the Asset whoose metadata needs to be updated.
 * @param json The JSON that was hosted at `url`.
 * @param url The URL where the JSON file is hosted.
 * @param signer The etehrs `Signer`, address that is allowed ot modify the Asset metadata.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md
 * @example
 * ```ts
 * setAssetMetadata(
 *   "0x..."
 *   {
 *     LSP4Metadata: {
 *       "name": "Chillwhales",
 *       "description": "Some random description about Chillwhales",
 *       "links": [...];
 *       "images": [...];
 *       "assets": [...];
 *       "icon": [...];
 *     }
 *   },
 *   "https://google.com/",
 *   signer
 * )
 * ```
 */
export async function setAssetMetadata(
    digitalAsset: ERC725Y | BytesLike,
    json: LSP4DigitalAssetMetadataJSON,
    url: string,
    signer?: Signer | Wallet,
): Promise<void> {
    const digitalAssetContract: ERC725Y = signer
        ? await getErc725yContract(digitalAsset, signer)
        : await getErc725yContract(digitalAsset);

    const {
        keys: [dataKey],
        values: [dataValue],
    } = erc725.encodeData([
        {
            keyName: 'LSP3Profile',
            value: {
                url,
                json,
            },
        },
    ]);

    await digitalAssetContract.setData(dataKey, dataValue);
}
