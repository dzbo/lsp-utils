import { keccak256, toUtf8Bytes, hexlify } from 'ethers';
import { generateLSP4JSONWithHash } from '../generateLSP4JSONWithHash/generateLSP4JSONWithHash';
import { Link, Attribute, Icons, Images, Assets } from '../../types/index';

/**
 * @file LSP4MetadataJSON.ts
 * @description Contains the `toLSP4MetadataJSON` function for generating LSP4 metadata JSON.
 */

/**
 * Generates the LSP4 metadata JSON string based on the provided parameters.
 * @function generateLSP4JSONVerifiableURI
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
export function generateLSP4JSONVerifiableURI(
    name: string,
    description: string,
    links: Link[],
    attributes: Attribute[],
    icons: Icons,
    images: Images,
    assets: Assets,
): string {
    const { json, hash } = generateLSP4JSONWithHash(
        name,
        description,
        links,
        attributes,
        icons,
        images,
        assets,
    );

    // Encoding the JSON string as base64
    // Encoding the JSON string as base64 using Buffer
    const base64Json = Buffer.from(json).toString('base64');

    // Creating the data URI with base64-encoded JSON
    const dataUri = `data:application/json;base64,${base64Json}`;

    const dataUriBytes = hexlify(toUtf8Bytes(dataUri));

    // Prepending specific byte sequences
    const byteSequence =
        '0x' +
        '0000' + // bytes2(0)
        '6f357c6a' + // 0x6f357c6a
        '0020' + // 0x0020
        hash.slice(2) +
        dataUriBytes.slice(2);

    return byteSequence;
}
