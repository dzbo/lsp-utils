import { AddressLike, BytesLike } from 'ethers';
import { PERMISSIONS, INTERFACE_IDS } from '@lukso/lsp-smart-contracts';

// generate types from INTERFACE_IDS imported from `@lukso/lsp-smart-contracts`
export type InterfaceIdName = keyof typeof INTERFACE_IDS;
export type InterfaceId = (typeof INTERFACE_IDS)[InterfaceIdName];

// generate types from PERMISSIONS imported from `@lukso/lsp-smart-contracts`
export type LSP6PermissionName = keyof typeof PERMISSIONS;
export type LSP6Permission = (typeof PERMISSIONS)[LSP6PermissionName];

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
