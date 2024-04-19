import { AddressLike, BytesLike } from 'ethers';
import { PERMISSIONS, INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

// generate types from INTERFACE_IDS imported from `@lukso/lsp-smart-contracts`
export type InterfaceIdName = keyof typeof INTERFACE_IDS;
export type InterfaceId = (typeof INTERFACE_IDS)[InterfaceIdName];

// generate types from PERMISSIONS imported from `@lukso/lsp-smart-contracts`
export type LSP6PermissionName = keyof typeof PERMISSIONS;
export type LSP6Permission = (typeof PERMISSIONS)[LSP6PermissionName];

export interface Link {
    title: string;
    url: string;
}

export interface Attribute {
    key: string;
    value: string;
    type: string | number | boolean;
}

export interface HashBasedVerification {
    method: 'keccak256(bytes)' | 'keccak256(utf8)';
    data: BytesLike;
}

export interface ECDSABasedVerification {
    method: 'ecdsa';
    data: string;
    source: string;
}

export interface Image {
    width: number;
    height: number;
    url: string;
    verification: HashBasedVerification | ECDSABasedVerification;
}
export interface Asset {
    url: string;
    fileType: string;
    verification: HashBasedVerification | ECDSABasedVerification;
}
export interface Avatar extends Asset {}

export interface FungibleAsset {
    address: AddressLike;
}

export interface NFTBasedAsset {
    address: AddressLike;
    tokenId?: BytesLike;
}
export interface NFTBasedImage extends NFTBasedAsset {}
export interface NFTBasedAvatar extends NFTBasedAsset {}

export interface Icons {
    icons: Image[];
    lsp7icons: FungibleAsset[];
    lsp8icons: NFTBasedAsset[];
}

export interface Assets {
    assets: Asset[];
    lsp7assets: FungibleAsset[];
    lsp8assets: NFTBasedAsset[];
}

export interface GroupImageField {
    images: Image[];
    lsp7images: FungibleAsset[];
    lsp8images: NFTBasedAsset[];
}

export interface Images {
    imageFields: GroupImageField[];
}

export interface LSP4AssetMetadata {
    LSP4Metadata: {
        name: string;
        description: string;
        links: Link[];
        icon: (Image | NFTBasedImage)[];
        images: (Image | NFTBasedImage)[][];
        assets: (Asset | NFTBasedAsset)[];
        attributes?: Attribute[];
    };
}

export interface LSP3ProfileMetadata {
    LSP3Profile: {
        name: string;
        description: string;
        links: Link[];
        tags: string[];
        avatar: (Avatar | NFTBasedAvatar)[];
        profileImage: (Image | NFTBasedImage)[];
        backgroundImage: (Image | NFTBasedImage)[];
    };
}

export type Issuer = { address: AddressLike; interfaceId: BytesLike };

export type DigitalAsset = { address: AddressLike; interfaceId: BytesLike };

export type IssuerAssets = {
    unauthenticatedAssets: DigitalAsset[];
    authenticatedAssets: DigitalAsset[];
};

export type DigitalAssetsCreators = {
    unauthenticatedCreators: Issuer[];
    authenticatedCreators: Issuer[];
};

export type LSP6Controller = {
    address: AddressLike;
    permissions: BytesLike;
};
