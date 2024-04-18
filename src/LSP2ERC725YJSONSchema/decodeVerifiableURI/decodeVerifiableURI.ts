import { decodeValueContent } from '@erc725/erc725.js';

/**
 * Decode a VerifableURI value content.
 *
 * @category LSP2
 * @param data A value encoded as VerifiableURI
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * ```ts
 * decodeVerifiableURI("0x00006f357c6a0020eaba44f326e1405eed836279c9bdb0d62b6f8f7a6187f4fb8454607afd550ee368747470733a2f2f676f6f676c652e636f6d2f") =>
 * {
 *     verification: {
 *         method: 'keccak256(utf8)',
 *         data: '0xeaba44f326e1405eed836279c9bdb0d62b6f8f7a6187f4fb8454607afd550ee3',
 *     },
 *     url: 'https://google.com/',
 * }
 * ```
 */
export const decodeVerifiableURI = (data: string) => {
    return decodeValueContent('VerifiableURI', data);
};
