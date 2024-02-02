// ------ Constants ------
export {
    defaultLSP3ProfileMetadata,
    defaultIpfsGateway,
    LSP23LinkedContractsFactoryAddress,
    upPostDeploymentModuleAddress,
    UniversalProfileInitAddress,
    LSP6KeyManagerInitAddress,
    LSP7MintableInitAddress,
    LSP8MintableInitAddress,
    LSP1UniversalReceiverDelegateUPAddress,
} from './constants';

// ------ Types ------
export * from './types';

// ------ Helpers ------
export { getErc725yContract, supportsLSPInterface } from './helpers';

// ------ TypeChain ------
export * as erc725Typechain from './typechain/erc725';
export * as luksoTypechain from './typechain/lukso';
export * as openzeppelinTypechain from './typechain/openzeppelin';

// ------ IPFS ------
export { validateIpfsUrl } from './IPFS';

// ------ LSP2 ------
export {
    decodeAssetUrl,
    decodeJsonUrl,
    encodeAssetUrl,
    encodeJsonUrl,
    generateArrayElementKeyAtIndex,
    generateArrayKey,
    generateMappingKey,
    generateMappingWithGroupingKey,
    generateSingletonKey,
    isCompactBytesArray,
    isValidArrayLengthValue,
    removeElementFromArrayAndMap,
    removeLastElementFromArrayAndMap,
} from './LSP2ERC725YJSONSchema';

// ------ LSP3 ------
export { getProfileMetadata, isProfileMetadata } from './LSP3ProfileMetadata';

// ------ LSP4 ------
export {
    addDigitalAssetCreators,
    authenticateDigitalAssetCreators,
    removeDigitalAssetCreators,
    getDigitalAssetCreators,
    getAssetMetadata,
    isAssetMetadata,
} from './LSP4DigitalAssetMetadata';

// ------ LSP5 ------
export { generateReceivedAssetKeys, generateSentAssetKeys } from './LSP5ReceivedAssets';

// ------ LSP6 ------
export {
    createValidityTimestamp,
    decodeAllowedCalls,
    encodeAllowedCalls,
    decodeAllowedERC725YDataKeys,
    encodeAllowedERC725YDataKeys,
    encodePermissions,
    decodePermissions,
} from './LSP6KeyManager';

// ------ LSP12 ------
export {
    addIssuedAssets,
    authenticateIssuedAssets,
    removeIssuedAssets,
    getIssuedAssets,
} from './LSP12IssuedAssets';

// ------ LSP23 ------
export { deployUniversalProfile } from './LSP23LinkedContractsFactory';
