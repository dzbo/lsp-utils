import { BytesLike, isHexString, toNumber } from 'ethers';

/**
 * Decode AllowedCalls encoded as `{ "valueType": "bytes32[CompactBytesArray]" }`.
 *
 * @since v0.0.1
 * @category LSP6
 * @param allowedCalls A list of allowed calls as `{ "valueType": "bytes32[CompactBytesArray]" }`.
 *
 * @throws
 * - When the value of `allowedCalls` is not hex.
 * - When the bytes length of any allowed call is different from 32.
 * - When the length of an element reaches past the length of `allowedCalls`
 *
 * @return The allowed interactions, addresses, functions and standards that were encoded.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md
 * @example
 * ```
 * decodeAllowedCalls("0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c002000000003cafecafecafecafecafecafecafecafecafecafe24871b3d44c028fe") //=>
 * // {
 * //   allowedInteractions: ["0x00000002", "0x00000003"],
 * //   allowedAddresses: ["0xcafecafecafecafecafecafecafecafecafecafe", "0xcafecafecafecafecafecafecafecafecafecafe"],
 * //   allowedStandards: ["0x24871b3d", "0x24871b3d"],
 * //   allowedFunctions: ["0x7f23690c", "0x44c028fe"],
 * // }
 *
 * decodeAllowedCalls("0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c") //=>
 * // {
 * //   allowedInteractions: ["0x00000002"],
 * //   allowedAddresses: ["0xcafecafecafecafecafecafecafecafecafecafe"],
 * //   allowedStandards: ["0x24871b3d"],
 * //   allowedFunctions: ["0x7f23690c"],
 * // }
 * ```
 */
export const decodeAllowedCalls = (allowedCalls: BytesLike) => {
    if (!isHexString(allowedCalls)) {
        throw new Error(`'${allowedCalls}' is not hex`);
    }

    const strippedAllowedCalls = allowedCalls.substring(2);
    let pointer = 0;

    const allowedInteractions: BytesLike[] = [];
    const allowedAddresses: BytesLike[] = [];
    const allowedStandards: BytesLike[] = [];
    const allowedFunctions: BytesLike[] = [];

    while (pointer < strippedAllowedCalls.length) {
        const bytesLength = toNumber(
            '0x' + strippedAllowedCalls.toString().substring(pointer, pointer + 4),
        );
        // increment to skip length
        pointer += 4;

        if (bytesLength !== 32) {
            throw new Error(`Invalid length. Length: '${bytesLength}'. Must be 32.`);
        }

        const stringLength = bytesLength * 2;

        if (pointer + stringLength > strippedAllowedCalls.length) {
            throw new Error(
                'Out of bounds, length of an element reaches past the length of `allowedCalls`',
            );
        }

        const allowedCall = strippedAllowedCalls
            .toString()
            .substring(pointer, pointer + stringLength);

        allowedInteractions.push(`0x${allowedCall.substring(0, 8)}`);
        allowedAddresses.push(`0x${allowedCall.substring(8, 48)}`);
        allowedStandards.push(`0x${allowedCall.substring(48, 56)}`);
        allowedFunctions.push(`0x${allowedCall.substring(56)}`);

        // increment to skip element
        pointer += stringLength;
    }

    return { allowedInteractions, allowedAddresses, allowedStandards, allowedFunctions };
};
