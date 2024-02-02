import { BytesLike, isHexString, toBeHex } from 'ethers';

/**
 * Generates Data Key/Value pairs for removing the last element from an LSP2 Array and a mapping Data Key.
 *
 * @since v0.0.1
 * @category LSP2
 *
 * @param arrayKey The Data Key of Key Type Array.
 * @param newArrayLength The new Array Length for the `arrayKey`.
 * @param removedElementIndexKey The Data Key of Key Type Array Index for the removed element.
 * @param removedElementMapKey The Data Key of a mapping to be removed.
 *
 * @return A set of data keys & data values that can be used to update an array and map in ERC725Y storage.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * ```ts
 * removeLastElementFromArrayAndMap(...) => { dataKeys: BytesLike[], dataValues: BytesLike[] }
 * ```
 */
export const removeLastElementFromArrayAndMap = (
    arrayKey: BytesLike,
    newArrayLength: number,
    removedElementIndexKey: BytesLike,
    removedElementMapKey: BytesLike,
) => {
    if (!isHexString(arrayKey, 32)) {
        throw new Error(`'arrayKey' data key is not of length 32 bytes. Value: '${arrayKey}'`);
    }

    if (!isHexString(removedElementIndexKey, 32)) {
        throw new Error(
            `'removedElementIndexKey' data key is not of length 32 bytes. Value: '${removedElementIndexKey}'`,
        );
    }

    if (!isHexString(removedElementMapKey, 32)) {
        throw new Error(
            `'removedElementMapKey' data key is not of length 32 bytes. Value: '${removedElementMapKey}'`,
        );
    }

    const dataKeys: BytesLike[] = [];
    const dataValues: BytesLike[] = [];

    // store the number of received assets decremented by 1
    dataKeys[0] = arrayKey;
    dataValues[0] = toBeHex(newArrayLength, 16);

    // remove the data value for the map key of the element
    dataKeys[1] = removedElementMapKey;
    dataValues[1] = '';

    // remove the data value for the map key of the element
    dataKeys[2] = removedElementIndexKey;
    dataValues[2] = '';

    return { dataKeys, dataValues };
};
