import { keccak256 } from 'ethers';
import { generateLSP4JSON } from '../generateLSP4JSON/generateLSP4JSON';
import { Link, Attribute, Icons, Images, Assets } from '../../types/index';

/**
 * @file LSP4MetadataJSON.ts
 * @description Contains the `toLSP4MetadataJSON` function for generating LSP4 metadata JSON.
 */

/**
 * Generates the LSP4 metadata JSON string based on the provided parameters.
 * @function generateLSP4JSONWithHash
 * @param {string} name - The name of the LSP4 metadata.
 * @param {string} description - The description of the LSP4 metadata.
 * @param {Link[]} links - An array of link objects.
 * @param {Attribute[]} attributes - An array of attribute objects.
 * @param {Icons} icons - An icons object containing image, LSP7, and LSP8 asset objects.
 * @param {Images} images - An images object containing group image field objects.
 * @param {Assets} assets - An assets object containing asset, LSP7, and LSP8 asset objects.
 * @returns {json} The LSP4 metadata JSON string.
 * * @returns {hash} The hash of the LSP4 metadata JSON string.
 */
export function generateLSP4JSONWithHash(
    name: string,
    description: string,
    links: Link[],
    attributes: Attribute[],
    icons: Icons,
    images: Images,
    assets: Assets,
): { json: string; hash: string } {
    const json = generateLSP4JSON(name, description, links, attributes, icons, images, assets);
    const hash = keccak256(Buffer.from(json));
    return { json, hash };
}
