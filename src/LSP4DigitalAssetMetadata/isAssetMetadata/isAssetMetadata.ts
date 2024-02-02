import { LSP4DigitalAssetMetadataJSON } from '@lukso/lsp-smart-contracts';

/**
 * Returns `true` is the passed object is an LSP4 Asset Metadata, `false` otherwise.
 *
 * @since v0.0.1
 * @category LSP4
 * @param object - The object that is to be checked.
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md
 * @example
 * ```ts
 * isAssetMetadata({ LSP4Metadata: { description: "", links: [], images: [], assets: [] icon: [] } }) => true
 * isAssetMetadata({ description: "", links: [], name: "", tags: [] }) => false
 * ```
 */
export const isAssetMetadata = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any,
): object is LSP4DigitalAssetMetadataJSON => {
    return (
        'LSP4Metadata' in object &&
        'description' in object.LSP4Metadata &&
        'links' in object.LSP4Metadata &&
        'images' in object.LSP4Metadata &&
        'assets' in object.LSP4Metadata &&
        'icon' in object.LSP4Metadata
    );
};
