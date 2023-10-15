import { hexlify, keccak256, toUtf8Bytes } from 'ethers';

/**
 * Generates a data key of `{ "keyType": "Singleton" }` by hashing the string `keyName`.
 *
 * @since v0.0.1
 * @category LSP2
 *
 * @param keyName The string to hash to generate a Singleton data key.
 *
 * @return The generated `bytes32` data key of key type Singleton.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * generateSingletonKey("RandomDataKey") //=> keccak256("RandomKeyName") = "0xb0c92ac98a2a422f33a3e130e3fa6e922195f0a0a99199963814012351f906cb"
 */
export const generateSingletonKey = (keyName: string) => {
    return hexlify(keccak256(toUtf8Bytes(keyName)));
};
