import { LSP3ProfileMetadata } from '../../constants';

/**
 * Returns `true` is the passed object is an LSP3 Profile Metadata, `false` otherwise.
 *
 * @since v0.0.1
 * @category LSP3
 * @param object - The object that is to be checked.
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md
 * @example
 * isProfile({ LSP3Profile: { description: "", links: [], name: "", tags: [] } }) //=> true
 * isProfile({ description: "", links: [], name: "", tags: [] }) //=> false
 */
export const isProfileMetadata = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: any
): object is LSP3ProfileMetadata => {
    return (
        'LSP3Profile' in object &&
        'description' in object.LSP3Profile &&
        'links' in object.LSP3Profile &&
        'name' in object.LSP3Profile &&
        'tags' in object.LSP3Profile
    );
};
