// ethers
import { BytesLike, concat, isHexString, toBeHex } from 'ethers';

// types
import { UniversalProfile } from '../../../types';
import { generateArrayElementKeyAtIndex } from '../generateArrayElementKeyAtIndex';
import { generateMappingKey } from '../generateMappingKey';

/**
 * Generates Data Key/Value pairs for removing an element from an LSP2 Array and a mapping Data Key.
 *
 * @since v0.0.1
 * @category LSP2
 *
 * @param erc725YContract The ERC725Y contract.
 * @param arrayKey The Data Key of Key Type Array.
 * @param newArrayLength The new Array Length for the `arrayKey`.
 * @param removedElementIndexKey The Data Key of Key Type Array Index for the removed element.
 * @param removedElementIndex the index of the removed element.
 * @param removedElementMapKey The Data Key of a mapping to be removed.
 *
 * @return A set of data keys & data values that can be used to update an array and map in ERC725Y storage.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md
 * @example
 * - removeLastElementFromArrayAndMap(...) //=> { dataKeys: BytesLike[], dataValues: BytesLike[] }
 */
export const removeElementFromArrayAndMap = async (
    erc725YContract: UniversalProfile,
    arrayKey: BytesLike,
    newArrayLength: number,
    removedElementIndexKey: BytesLike,
    removedElementIndex: number,
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

    // Generate the key of the last element in the array
    const lastElementIndexKey = generateArrayElementKeyAtIndex(arrayKey, newArrayLength);

    // Get the data value from the key of the last element in the array
    const lastElementIndexValue = await erc725YContract.getData(lastElementIndexKey);

    if (!isHexString(lastElementIndexValue, 20)) {
        throw new Error(
            `'lastElementIndexValue' data key is not of length 20 bytes. Value: '${lastElementIndexValue}'`,
        );
    }

    // Set data value of the last element instead of the element from the array that will be removed
    dataKeys[2] = removedElementIndexKey;
    dataValues[2] = lastElementIndexValue;

    // Remove the data value for the swapped array element
    dataKeys[3] = lastElementIndexKey;
    dataValues[3] = '';

    // Generate mapping key for the swapped array element
    const lastElementMapKey = generateMappingKey(removedElementMapKey, lastElementIndexValue);

    // Generate the mapping value for the swapped array element
    const lastElementMapValue = concat([
        (await erc725YContract.getData(lastElementMapKey)).substring(0, 10),
        toBeHex(removedElementIndex, 16),
    ]);

    // Update the map value of the swapped array element to the new index
    dataKeys[4] = lastElementMapKey;
    dataValues[4] = lastElementMapValue;

    return { dataKeys, dataValues };
};
