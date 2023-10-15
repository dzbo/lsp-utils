import { BytesLike, isHexString, toNumber } from 'ethers';

/**
 * Verify if `data` is a valid array of value encoded as a `CompactBytesArray` according to the LSP2 `CompactBytesArray` valueType specification.
 *
 * @since v0.0.1
 * @category LSP2
 *
 * @param compactBytesArray The bytes value to verify.
 *
 * @return `true` if the `data` is correctly encoded CompactBytesArray, `false` otherwise.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * - isCompactBytesArray("0x0002cafe000abeefdeadbeef0000cafe") //=> true
 * - isCompactBytesArray("0x0002cafecafe000abeefdeadbeef0000cafe") //=> false
 * - isCompactBytesArray("0x0002") //=> false
 */
export const isCompactBytesArray = (compactBytesArray: BytesLike) => {
    if (!isHexString(compactBytesArray)) {
        throw new Error(`'compactBytesArray' is not hex. Value: '${compactBytesArray}'`);
    }

    /**
     * Pointer will always land on these values:
     *
     * ↓↓↓↓
     * 0003 a00000
     * 0005 fff83a0011
     * 0020 aa0000000000000000000000000000000000000000000000000000000000cafe
     * 0012 bb000000000000000000000000000000beef
     * 0019 cc00000000000000000000000000000000000000000000deed
     * ↑↑↑↑
     *
     * The pointer can only land on the length of the following bytes value.
     */
    let pointer = 0;
    const strippedCompactBytesArray = compactBytesArray.substring(2);

    /**
     * Check each length byte and make sure that when you reach the last length byte.
     * Make sure that the last length describes exactly the last bytes value and you do not get out of bounds.
     */
    while (pointer < strippedCompactBytesArray.length) {
        if (pointer + 4 >= strippedCompactBytesArray.length) return false;
        const elementLength = strippedCompactBytesArray.substring(pointer, pointer + 4);

        pointer += toNumber(elementLength) + 4;
    }
    if (pointer === strippedCompactBytesArray.length) return true;
    return false;
};
