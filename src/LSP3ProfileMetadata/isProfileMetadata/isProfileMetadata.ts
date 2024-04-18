import { LSP3ProfileMetadataJSON } from '@lukso/lsp-smart-contracts';

/**
 * Returns `true` is the passed object is an LSP3 Profile Metadata, `false` otherwise.
 *
 * @since v0.0.1
 * @category LSP3
 * @param object - The object that is to be checked.
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md
 * @example
 * ```ts
 * isProfileMetadata({ LSP3Profile: { name: "", description: "", links: [], tags: [] avatar: [], profileImage: [], backgroundImage: [], } }) => true
 * isProfileMetadata({ description: "", links: [], name: "", tags: [] }) => false
 * ```
 */
export const isProfileMetadata = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any,
): object is LSP3ProfileMetadataJSON => {
    return (
        'LSP3Profile' in object &&
        'name' in object.LSP3Profile &&
        'description' in object.LSP3Profile
    );
};
