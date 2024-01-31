import { LSP3ProfileMetadataJSON } from '@lukso/lsp-smart-contracts';

/**
 * Returns `true` is the passed object is an LSP3 Profile Metadata, `false` otherwise.
 *
 * @since v0.0.1
 * @category LSP3
 * @param object - The object that is to be checked.
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md
 * @example
 * ```
 * isProfileMetadata({ LSP3Profile: { description: "", links: [], name: "", tags: [] } }) //=> true
 * isProfileMetadata({ description: "", links: [], name: "", tags: [] }) //=> false
 * ```
 */
export const isProfileMetadata = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any,
): object is LSP3ProfileMetadataJSON => {
    return (
        'LSP3Profile' in object &&
        'name' in object.LSP3Profile &&
        'description' in object.LSP3Profile &&
        'links' in object.LSP3Profile &&
        'tags' in object.LSP3Profile &&
        'avatar' in object.LSP3Profile &&
        'profileImage' in object.LSP3Profile &&
        'backgroundImage' in object.LSP3Profile
    );
};
