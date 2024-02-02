import { BytesLike, isHexString } from 'ethers';

/**
 * Validates if the bytes `arrayLength` are exactly 16 bytes long, and are of the exact size of an LSP2 Array length value
 *
 * @since v0.0.1
 * @category LSP2
 *
 * @param arrayLength Plain bytes that should be validated.
 *
 * @return `true` if the value is 16 bytes long, `false` otherwise.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * ```ts
 * isValidArrayLengthValue("0x00000000000000000000000000000001") => true
 * isValidArrayLengthValue("0x00000000000000000000000000000a3b") => true
 * isValidArrayLengthValue("0x000000000000000000000000004a") => false
 * isValidArrayLengthValue("0x0000000000000000000000000000000000f60a") => false
 * ```
 */
export const isValidArrayLengthValue = (arrayLength: BytesLike) => {
    if (isHexString(arrayLength, 16)) {
        return true;
    }

    return false;
};
