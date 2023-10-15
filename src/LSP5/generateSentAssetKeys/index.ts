// ethers
import { BytesLike, toBeHex, toNumber } from 'ethers';

// `@lukso/lsp-smart-contracts` constants
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// LSP2 utils
import { isValidArrayLengthValue } from '../../LSP2/isValidArrayLengthValue';
import { generateMappingKey } from '../../LSP2/generateMappingKey';
import { generateArrayElementKeyAtIndex } from '../../LSP2/generateArrayElementKeyAtIndex';
import { removeLastElementFromArrayAndMap } from '../../LSP2/removeLastElementFromArrayAndMap';
import { removeElementFromArrayAndMap } from '../../LSP2/removeElementFromArrayAndMap';

// types
import { UniversalProfile } from '../../../types';

/**
 * Generate an array of Data Key/Value pairs to be set on the sender address after sending assets.
 *
 * @since v0.0.1
 * @category LSP5
 *
 * @param erc725YContract The contract instance of the asset sender.
 * @param assetAddress The address of the asset that is being sent.
 *
 * @return A set of LSP5 data keys & data values that can be used to update an array and map in ERC725Y storage.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md
 * @example
 * - generateSentAssetKeys(...) //=> { lsp5DataKeys: BytesLike[], lsp5DataValues: BytesLike[] }
 */
export const generateSentAssetKeys = async (
    erc725YContract: UniversalProfile,
    assetAddress: BytesLike
) => {
    // --- `LSP5ReceivedAssets[]` Array ---
    const currentArrayLengthBytes = await erc725YContract.getData(
        ERC725YDataKeys.LSP5['LSP5ReceivedAssets[]'].length
    );

    // CHECK that the value of `LSP5ReceivedAssets[]` Array length is a valid `uint128` (16 bytes long)
    if (!isValidArrayLengthValue(currentArrayLengthBytes)) {
        throw new Error(`'LSP5ReceivedAssets[]' length invalid. Value: ${currentArrayLengthBytes}`);
    }

    // CHECK for potential underflow
    if (currentArrayLengthBytes === toBeHex(0, 16)) {
        throw new Error("'LSP5ReceivedAssets[]' length is 0. Cannot remove asset.");
    }

    const newArrayLength = toNumber(currentArrayLengthBytes) - 1;

    // --- `LSP5ReceivedAssetsMap:<assetAddress>` ---

    const removedElementMapKey = generateMappingKey(
        ERC725YDataKeys.LSP5.LSP5ReceivedAssetsMap,
        assetAddress.toString()
    );

    // Query the ERC725Y storage of the LSP0-ERC725Account
    const mapValue = await erc725YContract.getData(removedElementMapKey);

    // CHECK if no map value was set for the asset to remove.
    // If that's the case, there is nothing to remove. Do not try to update.
    if (mapValue === '' || mapValue === '0x') {
        throw new Error(
            `Asset is not registerd length is 0. Cannot remove asset. Asset address: '${assetAddress}'`
        );
    }
    if (mapValue.length !== 20) {
        throw new Error(
            `Registered asset has invalid data in the map. Asset address: '${assetAddress}'. Map data: '${mapValue}'.`
        );
    }

    // Extract index of asset to remove from the map value
    const removedElementIndex = toNumber(`0x${mapValue.substring(10)}`);

    const removedElementIndexKey = generateArrayElementKeyAtIndex(
        ERC725YDataKeys.LSP5['LSP5ReceivedAssets[]'].length,
        removedElementIndex
    );

    if (removedElementIndex === newArrayLength) {
        return removeLastElementFromArrayAndMap(
            ERC725YDataKeys.LSP5['LSP5ReceivedAssets[]'].length,
            newArrayLength,
            removedElementIndexKey,
            removedElementMapKey
        );
    } else if (removedElementIndex < newArrayLength) {
        return removeElementFromArrayAndMap(
            erc725YContract,
            ERC725YDataKeys.LSP5['LSP5ReceivedAssets[]'].length,
            newArrayLength,
            removedElementIndexKey,
            removedElementIndex,
            removedElementMapKey
        );
    } else {
        // If index is bigger than the array length, out of bounds
        throw new Error(
            `Element index is out of the array bounds. Array length: '${
                newArrayLength + 1
            }'. Asset index: '${removedElementIndex}'`
        );
    }
};
