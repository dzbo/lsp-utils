import { BytesLike, toUtf8String } from 'ethers';

/**
 * Decode a JSONURL value content.
 *
 * @since v0.0.1
 * @category LSP2
 * @param jsonUrlValue The encoded value as `{ "valueContent": "JSONURL" }`.
 *
 * @throws When `jsonUrlValue` his composed of less than 36 bytes.
 *
 * @return
 * ```json
 * {
 *   // The hash digest of the function used to hash the JSON file.
 *   "hashFunction": "string"
 *   // the hashed bytes value of the JSON file.
 *   "json": "string"
 *   // The URL where the JSON file is hosted.
 *   "url": "string"
 * }
 * ```
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * ```ts
 * decodeJsonUrl("0x6f357c6a4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a4184968747470733a2f2f676f6f676c652e636f6d2f") =>
 * {
 *   hashFunction: "0x6f357c6a",
 *   hash: "0x4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a41849",
 *   url: "https://google.com/"
 * }
 * ```
 */
export const decodeJsonUrl = (jsonUrlValue: BytesLike) => {
    const stringifiedJsonUrlValue = jsonUrlValue.toString().substring(2);

    if (stringifiedJsonUrlValue.length < 72) {
        throw new Error(`Invalid 'JSONURL' value. Less than 36 bytes. Value: ${jsonUrlValue}`);
    }

    const decodedJSONURL = {
        hashFunction: `0x${stringifiedJsonUrlValue.substring(0, 8)}`,
        hash: `0x${stringifiedJsonUrlValue.substring(8, 72)}`,
        url: toUtf8String(`0x${stringifiedJsonUrlValue.substring(72)}`),
    };

    return decodedJSONURL;
};
