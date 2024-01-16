import { LSP3ProfileMetadata, LSP4AssetMetadata } from '../types';

export const defaultLSP3ProfileMetadata: LSP3ProfileMetadata = {
    LSP3Profile: {
        name: '',
        description: '',
        links: [],
        avatar: [],
        profileImage: [],
        backgroundImage: [],
        tags: [],
    },
};

export const defaultLSP4AssetMetadata: LSP4AssetMetadata = {
    LSP4Metadata: {
        name: '',
        description: '',
        attributes: [],
        links: [],
        icon: [],
        images: [],
        assets: [],
    },
};

export const defaultIpfsGateway = 'https://ipfs.io/ipfs/';

export const LSP23LinkedContractsFactoryAddress = '0x2300000A84D25dF63081feAa37ba6b62C4c89a30';
export const upPostDeploymentModuleAddress = '0x000000000066093407b6704B89793beFfD0D8F00';

export const UniversalProfileInitAddress = '0x3024D38EA2434BA6635003Dc1BDC0daB5882ED4F';
export const LSP6KeyManagerInitAddress = ' 0x2Fe3AeD98684E7351aD2D408A43cE09a738BF8a4';
export const LSP7MintableInitAddress = '0x28B7CcdaD1E15cCbDf380c439Cc1F2EBe7f5B2d8';
export const LSP8MintableInitAddress = '0xd787a2f6B14d4dcC2fb897f40b87f2Ff63a07997';
export const LSP1UniversalReceiverDelegateUPAddress = '0x7870C5B8BC9572A8001C3f96f7ff59961B23500D';
