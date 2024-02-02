import { BytesLike, concat, isHexString, keccak256, toUtf8Bytes } from 'ethers';

/**
 * Generates a data key of `{ "keyType": "MappingWithGrouping" }` that map `firstPart` to `middlePart` and to `lastPart`.
 *
 * `firstPart` can have the following values:
 * 1. A 6 bytes hex value.
 * 2. A hex value that will be hashed (first 6 bytes will be used).
 * 2. A UTF8 string that will be hashed (first 6 bytes will be used).
 *
 * `middlePart` can have the following values:
 * 1. A 4 bytes hex value.
 * 2. A hex value that will be hashed (first 4 bytes will be used).
 * 2. A UTF8 string that will be hashed (first 4 bytes will be used).
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
 * @param firstPart The word to retrieve the first 6 bytes of its hash.
 * @param middlePart The word to retrieve the first 4 bytes of its hash.
 * @param lastPart The word to retrieve the first 20 bytes of its hash.
 *
 * @return The generated `bytes32` data key of key type MappingWithGrouping that map a `firstWord` to a `secondWord` to a specific address `addr`.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * ```ts
 * generateMappingWithGroupingKey(firstWord, middleWord, lastWord) => `<bytes6(keccak256(firstWord))>:<bytes4(keccak256(middleWord))>:<0000>:<bytes20(keccak256(lastWord))>`
 *
 * generateMappingWithGroupingKey(firstWord, middleWord, bytes20Value) => `<bytes6(keccak256(firstWord))>:<bytes4(keccak256(middleWord))>:<0000>:<bytes20Value>`
 *
 * generateMappingWithGroupingKey(firstWord, bytes4Value, lastWord) => `<bytes6(keccak256(firstWord))>:<bytes4Value>:<0000>:<bytes20(keccak256(lastWord))>`
 *
 * generateMappingWithGroupingKey(firstWord, bytes4Value, bytes20Value) => `<bytes6(keccak256(firstWord))>:<bytes4Value>:<0000>:<bytes20Value>`
 *
 * generateMappingWithGroupingKey(bytes6Value, middleWord, lastWord) => `<bytes6Value>:<bytes4(keccak256(middleWord))>:<0000>:<bytes20(keccak256(lastWord))>`
 *
 * generateMappingWithGroupingKey(bytes6Value, middleWord, bytes20Value) => `<bytes6Value>:<bytes4(keccak256(middleWord))>:<0000>:<bytes20Value>`
 *
 * generateMappingWithGroupingKey(bytes6Value, bytes4Value, lastWord) => `<bytes6Value>:<bytes4Value>:<0000>:<bytes20(keccak256(lastWord))>`
 *
 * generateMappingWithGroupingKey(bytes6Value, bytes4Value, bytes20Value) => `<bytes6Value>:<bytes4Value>:<0000>:<bytes20Value>`
 * ```
 */
export const generateMappingWithGroupingKey = (
    firstPart: string | BytesLike,
    middlePart: string | BytesLike,
    lastPart: string | BytesLike,
) => {
    let firstPartHex = firstPart;

    if (!isHexString(firstPart, 6)) {
        if (isHexString(firstPart)) {
            firstPartHex = keccak256(firstPart).substring(0, 14);
        } else if (typeof firstPart === 'string') {
            firstPartHex = keccak256(toUtf8Bytes(firstPart)).substring(0, 14);
        }
    }

    let middlePartHex = middlePart;

    if (!isHexString(middlePart, 4)) {
        if (isHexString(middlePart)) {
            middlePartHex = keccak256(middlePart).substring(0, 10);
        } else if (typeof middlePart === 'string') {
            middlePartHex = keccak256(toUtf8Bytes(middlePart)).substring(0, 10);
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

    const mappingWithGroupingDataKey = concat([firstPartHex, middlePartHex, '0x0000', lastPartHex]);

    return mappingWithGroupingDataKey;
};
