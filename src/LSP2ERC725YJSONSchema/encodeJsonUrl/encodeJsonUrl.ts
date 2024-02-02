import { concat, keccak256, toUtf8Bytes } from 'ethers';

/**
 * Encode a JSONURL value content.
 *
 * @since v0.0.1
 * @category LSP2
 *
 * @param hashFunction The function used to hash the JSON file.
 * @param json Bytes value of the JSON file.
 * @param url The URL where the JSON file is hosted.
 *
 * @return The encoded value as an `JSONURL`.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * ```ts
 * encodeJsonUrl(
 *   "keccak256(utf8)",
 *   "{\"name\":\"Tom\",\"description\":\"Some random description about Tom\"}",
 *   "https://google.com/"
 * ) => "0x6f357c6a4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a4184968747470733a2f2f676f6f676c652e636f6d2f"
 * ```
 */
export const encodeJsonUrl = (hashFunction: string, json: string, url: string) => {
    const hashFunctionDigest = keccak256(toUtf8Bytes(hashFunction)).substring(0, 10);
    const jsonDigest = keccak256(toUtf8Bytes(json));

    const JSONURLValue = concat([hashFunctionDigest, jsonDigest, toUtf8Bytes(url)]);

    return JSONURLValue;
};
