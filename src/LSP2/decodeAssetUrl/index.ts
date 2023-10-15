import { BytesLike, toUtf8String } from 'ethers';

/**
 * Decode a JSONURL value content.
 *
 * @since v0.0.1
 * @category LSP2
 * @param assetUrlValue The encoded value as `{ "valueContent": "ASSETURL" }`.
 *
 * @throws When `assetUrlValue` his composed of less than 36 bytes.
 *
 * @return
 * ```
 * {
 *   // The hash digest of the function used to hash the JSON file.
 *   "hashFunction": string
 *   // the hashed bytes value of the JSON file.
 *   "json": string
 *   // The URL where the JSON file is hosted.
 *   "url": string
 * }
 * ```
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * ```
 * decodeAssetUrl("0x6f357c6a2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c053568747470733a2f2f676f6f676c652e636f6d2f") //=>
 * // {
 * //   hashFunction: "0x6f357c6a",
 * //   hash: "0x2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c0535",
 * //   url: "https://google.com/"
 * // }
 * ```
 */
export const decodeAssetUrl = (assetUrlValue: BytesLike) => {
    const stringifiedAssetUrlValue = assetUrlValue.toString().substring(2);

    if (stringifiedAssetUrlValue.length < 72) {
        throw new Error(`Invalid 'JSONURL' value. Less than 36 bytes. Value: ${assetUrlValue}`);
    }

    const decodedJSONURL = {
        hashFunction: `0x${stringifiedAssetUrlValue.substring(0, 8)}`,
        hash: `0x${stringifiedAssetUrlValue.substring(8, 72)}`,
        url: toUtf8String(`0x${stringifiedAssetUrlValue.substring(72)}`),
    };

    return decodedJSONURL;
};
