import { BytesLike, concat, isHexString, toBeHex, toNumber } from "ethers";

// `@luksp/lsp-smart-contracts` constants
import { ERC725YDataKeys } from "@lukso/lsp-smart-contracts";

// LSP2 utils
import { isValidArrayLengthValue } from "../../LSP2/isValidArrayLengthValue";
import { generateMappingKey } from "../../LSP2/generateMappingKey";
import { generateArrayElementKeyAtIndex } from "../../LSP2/generateArrayElementKeyAtIndex";

// types
import { UniversalProfile } from "../../../types";

/**
 * Generate an array of Data Key/Value pairs to be set on the receiver address after receiving assets.
 *
 * @since v0.0.1
 * @category LSP5
 *
 * @param erc725YContract The contract instance of the asset reciever.
 * @param assetAddress The address of the asset being received (_e.g: an LSP7 or LSP8 token_).
 * @param assetInterfaceId The interfaceID of the asset being received.
 *
 * @return A set of LSP5 data keys & data values that can be used to update an array and map in ERC725Y storage.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md
 * @example
 * - generateReceivedAssetKeys(...) //=> { lsp5DataKeys: BytesLike[], lsp5DataValues: BytesLike[] }
 */
export const generateReceivedAssetKeys = async (
    erc725YContract: UniversalProfile,
    assetAddress: BytesLike,
    assetInterfaceId: BytesLike
) => {
    if (isHexString(assetAddress, 20)) {
        throw new Error(`'assetAddress' bytes length is not 20. Value: ${assetAddress}`);
    }

    if (isHexString(assetInterfaceId, 4)) {
        throw new Error(`'assetInterfaceId' bytes length is not 4. Value: ${assetInterfaceId}`);
    }

    // --- `LSP5ReceivedAssets[]` Array ---
    let currentArrayLengthBytes = await erc725YContract.getData(
        ERC725YDataKeys.LSP5['LSP5ReceivedAssets[]'].length
    );

    // CHECK that the value of `LSP5ReceivedAssets[]` Array length is a valid `uint128` (16 bytes long)
    if (!isValidArrayLengthValue(currentArrayLengthBytes)) {
        if (currentArrayLengthBytes === '0x' || currentArrayLengthBytes === '') {
            // if it's the first asset received and nothing is set (= 0x)
            // we need to convert it to: `0x00000000000000000000000000000000`
            // to safely cast to a uint128 of length 0
            currentArrayLengthBytes = toBeHex(0, 16);
        } else {
            // otherwise the array length is invalid
            throw new Error(
                `'LSP5ReceivedAssets[]' length invalid. Value: ${currentArrayLengthBytes}`
            );
        }
    }

    // CHECK for potential overflow
    if (currentArrayLengthBytes === `0x${'ff'.repeat(16)}`) {
        throw new Error(
            `'LSP5ReceivedAssets[]' length reached max value. Value: ${currentArrayLengthBytes}`
        );
    }

    const currentArrayLength = toNumber(currentArrayLengthBytes);

    // --- `LSP5ReceivedAssetsMap:<assetAddress>` ---

    const mapDataKey = generateMappingKey(
        ERC725YDataKeys.LSP5.LSP5ReceivedAssetsMap,
        assetAddress.toString()
    );

    // CHECK that the map value is not already set in the storage for the newly received asset
    // If that's the case, the asset is already registered. Do not try to update.
    const fetchedMapValue = await erc725YContract.getData(mapDataKey);
    if (!(fetchedMapValue === '0x') && !(fetchedMapValue === '')) {
        throw new Error(`Asset already registred. Asset address: ${assetAddress}`);
    }

    // --- LSP5 Data Keys & Values ---

    const lsp5DataKeys: BytesLike[] = [];
    const lsp5DataValues: BytesLike[] = [];

    // Increment `LSP5ReceivedAssets[]` Array length
    lsp5DataKeys[0] = ERC725YDataKeys.LSP5['LSP5ReceivedAssets[]'].length;
    lsp5DataValues[0] = toBeHex(currentArrayLength + 1, 16);

    // Add asset address to `LSP5ReceivedAssets[index]`, where index == previous array length
    lsp5DataKeys[1] = generateArrayElementKeyAtIndex(
        ERC725YDataKeys.LSP5['LSP5ReceivedAssets[]'].length,
        currentArrayLength
    );
    lsp5DataValues[1] = assetAddress;

    // Add interfaceId + index as value under `LSP5ReceivedAssetsMap:<assetAddress>`
    lsp5DataKeys[2] = mapDataKey;
    lsp5DataValues[2] = concat([assetInterfaceId, currentArrayLengthBytes]);

    return {lsp5DataKeys,
        lsp5DataValues}
};