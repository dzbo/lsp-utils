import { LSP4AssetMetadata } from '../../types';

export const isAssetMetadata = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any,
): object is LSP4AssetMetadata => {
    return (
        'LSP4Metadata' in object &&
        'name' in object.LSP4Metadata &&
        'description' in object.LSP4Metadata &&
        'links' in object.LSP4Metadata &&
        'icon' in object.LSP4Metadata &&
        'images' in object.LSP4Metadata &&
        'assets' in object.LSP4Metadata &&
        'attributes' in object.LSP4Metadata
    );
};
