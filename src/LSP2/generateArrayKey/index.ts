import { hexlify, keccak256, toUtf8Bytes } from 'ethers';

/**
 * Generates a data key of `{ "keyType": "Array" }` by hashing `arrayKeyName`.
 *
 * @since v0.0.1
 * @category LSP2
 *
 * @param arrayKeyName The string that will be used to generate a data key of key type Array.
 *
 * @return The generated `bytes32` data key of key type Array.
 *
 * @throws `keyName` has less than 2 characters.
 * @throws `keyName` does not include square brackets `"[]"` at the end of the string.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * generateArrayKey("RandomArrayDataKey[]") //=> keccak256("RandomArrayDataKey[]") = "0x6e9974ec39571e80dcc2ab1fac99097b03bb4617b071cd519a23d38f88f28ffb"
 */
export const generateArrayKey = (arrayKeyName: string) => {
    if (arrayKeyName.length < 2) {
        throw new Error('Array data key name must be longer than 2 characters.');
    }

    if (!arrayKeyName.endsWith('[]')) {
        throw new Error("Missing empty square brackets '[]' at the end of the data key name.");
    }

    return hexlify(keccak256(toUtf8Bytes(arrayKeyName)));
};
