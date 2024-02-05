import { BytesLike, isHexString } from 'ethers';

/**
 * Enocde a list of data keys as `{ "valueType": "bytes32[CompactBytesArray]" }`. The result can be user for `AddressPermissions:AllowedCalls:<address>`
 *
 * @since v0.0.1
 * @category LSP6
 * @param allowedInteractions A list of allowed interactions.
 * @param allowedAddresses A list of allowed addresses.
 * @param allowedStandards A list of allowed standards.
 * @param allowedFunctions A list of allowed functions.
 *
 * @throws
 * - When the arrays passed as parameters don't have the same length.
 * - When one of `allowedInteractions[index]` has a bytes length different from 4.
 * - When one of `allowedAddresses[index]` has a bytes length different from 20.
 * - When one of `allowedStandards[index]` has a bytes length different from 4.
 * - When one of `allowedFunctions[index]` has a bytes length different from 4.
 *
 * @return The compacted array of allowed calls as `{ "valueType": "bytes32[CompactBytesArray]" }`.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md
 * @example
 * ```ts
 * encodeAllowedCalls(
 *   ["0x00000002", "0x00000003"],
 *   ["0xcafecafecafecafecafecafecafecafecafecafe", "0xcafecafecafecafecafecafecafecafecafecafe"]
 *   ["0x24871b3d", "0x24871b3d"],
 *   ["0x7f23690c", "0x44c028fe"],
 * ) => "0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c002000000003cafecafecafecafecafecafecafecafecafecafe24871b3d44c028fe"
 * encodeAllowedCalls(
 *   ["0x00000002"],
 *   ["0xcafecafecafecafecafecafecafecafecafecafe"]
 *   ["0x24871b3d"],
 *   ["0x7f23690c"],
 * ) => "0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c"
 * ```
 */
export function encodeAllowedCalls(
    allowedInteractions: BytesLike[],
    allowedAddresses: BytesLike[],
    allowedStandards: BytesLike[],
    allowedFunctions: BytesLike[],
) {
    if (
        allowedInteractions.length !== allowedAddresses.length &&
        allowedAddresses.length !== allowedStandards.length &&
        allowedStandards.length !== allowedFunctions.length
    ) {
        throw new Error(
            'Arrays must have the same length. ' +
                `'allowedInteractions' length: ${allowedInteractions}. ` +
                `'allowedAddresses' length: ${allowedAddresses}. ` +
                `'allowedStandards' length: ${allowedStandards}. ` +
                `'allowedFunctions' length: ${allowedFunctions}.`,
        );
    }

    // 32 in hex (2 bytes), required length for an allowed call
    const allowedCallLength = '0020';

    let result = '0x';

    for (let ii = 0; ii < allowedStandards.length; ii++) {
        // remove "0x" prefixes

        if (!isHexString(allowedInteractions[ii])) {
            throw new Error(
                `Allowed interaction is not hex. Allowed interaction: '${allowedInteractions[ii]}'`,
            );
        }
        if (!isHexString(allowedInteractions[ii], 4)) {
            throw new Error(
                `Allowed interactions has invalid bytes length. Must be 4. Length: ${
                    allowedInteractions[ii].length / 2 - 1
                }`,
            );
        }

        const allowedInteraction = allowedInteractions[ii].toString().substring(2);

        if (!isHexString(allowedAddresses[ii])) {
            throw new Error(
                `Allowed address is not hex. Allowed address: '${allowedAddresses[ii]}'`,
            );
        }
        if (!isHexString(allowedAddresses[ii], 20)) {
            throw new Error(
                `Allowed interactions has invalid bytes length. Must be 20. Length: ${
                    allowedAddresses[ii].length / 2 - 1
                }`,
            );
        }

        const allowedAddress = allowedAddresses[ii].toString().substring(2).toLowerCase();

        if (!isHexString(allowedStandards[ii])) {
            throw new Error(
                `Allowed standard is not hex. Allowed standard: '${allowedStandards[ii]}'`,
            );
        }
        if (!isHexString(allowedStandards[ii], 4)) {
            throw new Error(
                `Allowed interactions has invalid bytes length. Must be 4. Length: ${
                    allowedStandards[ii].length / 2 - 1
                }`,
            );
        }

        const allowedStandard = allowedStandards[ii].toString().substring(2);

        if (!isHexString(allowedFunctions[ii])) {
            throw new Error(
                `Allowed function is not hex. Allowed function: '${allowedFunctions[ii]}'`,
            );
        }
        if (!isHexString(allowedFunctions[ii], 4)) {
            throw new Error(
                `Allowed interactions has invalid bytes length. Must be 4. Length: ${
                    allowedFunctions[ii].length / 2 - 1
                }`,
            );
        }

        const allowedFunction = allowedFunctions[ii].toString().substring(2);

        result =
            result +
            allowedCallLength +
            allowedInteraction +
            allowedAddress +
            allowedStandard +
            allowedFunction;
    }

    return result;
}
