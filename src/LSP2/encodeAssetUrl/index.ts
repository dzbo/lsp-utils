import { concat, keccak256, toUtf8Bytes } from 'ethers';

/**
 * Generate a ASSETURL value content.
 *
 * @since v0.0.1
 * @category LSP2
 *
 * @param hashFunction The function used to hash the JSON file.
 * @param assetBytes Bytes value of the JSON file.
 * @param url The URL where the JSON file is hosted.
 *
 * @return The encoded value as an `ASSETURL`.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * encodeAssetUrl(
 *   "keccak256(utf8)",
 *   "{\"name\":\"USDStablecoin\",\"description\":\"Some random description about the token USD Stablecoin\"}",
 *   "https://google.com/"
 * ) //=> "0x6f357c6a2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c053568747470733a2f2f676f6f676c652e636f6d2f"
 */
export const encodeAssetUrl = (hashFunction: string, assetBytes: string, url: string) => {
    const hashFunctionDigest = keccak256(toUtf8Bytes(hashFunction));
    const jsonDigest = keccak256(toUtf8Bytes(assetBytes));

    const ASSETURLValue = concat([hashFunctionDigest, jsonDigest, toUtf8Bytes(url)]);

    return ASSETURLValue;
};
