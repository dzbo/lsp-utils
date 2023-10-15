import { BigNumberish, concat, toBeHex } from 'ethers';

/**
 * Create a `validityTimestamp` that can be used in `LSP6.executeRelayCall(...)`
 *
 * @since v0.0.1
 * @category LSP6
 * @param startingTimestamp The timestamp after which a relay call can be executed.
 * @param endingTimestamp The timestamp after which a relay call cannot be executed.
 *
 * @throws When teh bytes value of either `startingTimestamp` or `endingTimestamp` exceeds 16 bytes.
 *
 * @return A hex value of 32 bytes that contains both starting & ending timestamps.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md
 * @example
 * ```
 * createValidityTimestamp(5, 10) //=> `0x000000000000000000000000000000050000000000000000000000000000000a`
 * ```
 */
export const createValidityTimestamp = (
    startingTimestamp: number | BigNumberish,
    endingTimestamp: number | BigNumberish,
) => {
    if (toBeHex(startingTimestamp).length > 34) {
        throw new Error(`The hex value of the number: '${startingTimestamp}' execeeds 16 bytes`);
    }

    if (toBeHex(endingTimestamp).length > 34) {
        throw new Error(`The hex value of the number: '${endingTimestamp}' execeeds 16 bytes`);
    }

    return concat([toBeHex(startingTimestamp, 16), toBeHex(endingTimestamp, 16)]);
};
