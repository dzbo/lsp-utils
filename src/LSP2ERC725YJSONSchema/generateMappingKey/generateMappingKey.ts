import { BytesLike, concat, isHexString, keccak256, toUtf8Bytes } from 'ethers';

/**
 * Generates a data key of `{ "keyType": "Mapping" }` that map `firstPart` to `lastPart`.
 *
 * `firstPart` can have the following values:
 * 1. A 10 bytes hex value.
 * 2. A hex value that will be hashed (first 10 bytes will be used).
 * 2. A UTF8 string that will be hashed (first 10 bytes will be used).
 *
 * `lastPart` can have the following values:
 * 1. An address.
 * 1. A 20 bytes hex value.
 * 2. A hex value that will be hashed (first 20 bytes will be used).
 * 2. A UTF8 string that will be hashed (first 20 bytes will be used).
 *
 * @since v0.0.1
 * @category LSP2
 *
 * @param firstPart The word to retrieve the first 10 bytes of its hash.
 * @param lastPart The word to retrieve the first 10 bytes of its hash.
 *
 * @return The generated `bytes32` data key of key type Mapping that map `firstPart` to a specific `lastPart`.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * ```ts
 * generateMappingKey(firstWord, lastWord) =>`<bytes10(keccak256(firstWord))>:<0000>:<bytes20(keccak256(lastWord))>`
 *
 * generateMappingKey(firstWord, bytes20value) =>`<bytes10(keccak256(firstWord))>:<0000>:<bytes20value>`
 *
 * generateMappingKey(bytes10Value, lastWord) =>`<bytes10Value>:<0000>:<bytes20(keccak256(lastWord))>`
 *
 * generateMappingKey(bytes10Value, bytes20value) =>`<bytes10Value>:<0000>:<bytes20value>`
 * ```
 */
export const generateMappingKey = (firstPart: string | BytesLike, lastPart: string | BytesLike) => {
    let firstPartHex = firstPart;

    if (!isHexString(firstPart, 10)) {
        if (isHexString(firstPart, 12) && firstPart.endsWith('0000')) {
            firstPartHex = firstPart.substring(0, 22);
        } else if (isHexString(firstPart)) {
            firstPartHex = keccak256(firstPart).substring(0, 22);
        } else if (typeof firstPart === 'string') {
            firstPartHex = keccak256(toUtf8Bytes(firstPart)).substring(0, 22);
        }
    }

    let lastPartHex = lastPart;

    if (!isHexString(lastPart, 20)) {
        if (isHexString(lastPart)) {
            lastPartHex = keccak256(lastPart).substring(0, 42);
        } else if (typeof lastPart === 'string') {
            lastPartHex = keccak256(toUtf8Bytes(lastPart)).substring(0, 42);
        }
    }

    const mappingDataKey = concat([firstPartHex, '0x0000', lastPartHex]);

    return mappingDataKey;
};
