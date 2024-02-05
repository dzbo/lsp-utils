import { BytesLike, isHexString, toNumber } from 'ethers';

/**
 * Decode AllowedERC725YDataKeys encoded as `{ "valueType": "bytes[CompactBytesArray]" }`.
 *
 * @since v0.0.1
 * @category LSP6
 * @param allowedERC725YDataKeys A list of allowed calls as `{ "valueType": "bytes[CompactBytesArray]" }`.
 *
 * @throws
 * - When the value of `allowedERC725YDataKeys` is not hex.
 * - When the bytes length of any allowed ERC725Y data key is 0 or bigger than 32.
 * - When the length of an element reaches past the length of `allowedERC725YDataKeys`
 *
 * @return The allowed ERC725Y data keys that were encoded.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md
 * @example
 * ```ts
 * decodeAllowedERC725YDataKeys("0x0002cafe000abeefdeadbeef0000cafe") =>
 * [
 *   "0xcafe",
 *   "0xbeefdeadbeef0000cafe"
 * ]
 * ```
 */
export function decodeAllowedERC725YDataKeys(allowedERC725YDataKeys: BytesLike) {
    if (!isHexString(allowedERC725YDataKeys)) {
        throw new Error(
            `The parameter \`allowedERC725YDataKeys\` is not hex. Value: '${allowedERC725YDataKeys}'`,
        );
    }

    const strippedAllowedERC725YDataKeys = allowedERC725YDataKeys.substring(2);
    let pointer = 0;

    const dataKeys: BytesLike[] = [];

    while (pointer < strippedAllowedERC725YDataKeys.length) {
        const bytesLength = toNumber(
            '0x' + strippedAllowedERC725YDataKeys.toString().substring(pointer, pointer + 4),
        );
        // increment to skip length
        pointer += 4;

        if (bytesLength === 0 || bytesLength > 32) {
            throw new Error(
                `Invalid length. Length: '${bytesLength}'. Must be bigger than 0 and smaller than 32.`,
            );
        }

        const stringLength = bytesLength * 2;

        if (pointer + stringLength > strippedAllowedERC725YDataKeys.length) {
            throw new Error(
                'Out of bounds, length of an element reaches past the length of `allowedERC725YDataKeys`',
            );
        }

        dataKeys.push(
            '0x' +
                strippedAllowedERC725YDataKeys
                    .toString()
                    .substring(pointer, pointer + stringLength),
        );

        // increment to skip element
        pointer += stringLength;
    }

    return dataKeys;
}
