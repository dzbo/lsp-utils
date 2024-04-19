import { Link, Attribute, Icons, Images, Assets } from '../../types/index';

/**
 * Generates the LSP4 metadata JSON string based on the provided parameters.
 * @function toLSP4MetadataJSON
 * @param {string} name - The name of the LSP4 metadata.
 * @param {string} description - The description of the LSP4 metadata.
 * @param {Link[]} links - An array of link objects.
 * @param {Attribute[]} attributes - An array of attribute objects.
 * @param {Icons} icons - An icons object containing image, LSP7, and LSP8 asset objects.
 * @param {Images} images - An images object containing group image field objects.
 * @param {Assets} assets - An assets object containing asset, LSP7, and LSP8 asset objects.
 * @returns {string} The LSP4 metadata JSON string.
 */
export function generateLSP4JSON(
    name: string,
    description: string,
    links: Link[],
    attributes: Attribute[],
    icons: Icons,
    images: Images,
    assets: Assets,
): string {
    const metadata = {
        LSP4Metadata: {
            name,
            description,
            links: links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            icon: icons.icons.map((icon) => ({
                width: icon.width,
                height: icon.height,
                url: icon.url,
                verification: {
                    method: icon.verification.method,
                    data: icon.verification.data,
                },
            })),
            images: images.imageFields.map((field) => [
                ...field.images.map((image) => ({
                    width: image.width,
                    height: image.height,
                    url: image.url,
                    verification: {
                        method: image.verification.method,
                        data: image.verification.data,
                    },
                })),
                ...field.lsp7images.map((lsp7) => ({ address: lsp7.address })),
                ...field.lsp8images.map((lsp8) => ({
                    address: lsp8.address,
                    tokenId: lsp8.tokenId,
                })),
            ]),
            assets: [
                ...assets.assets.map((asset) => ({
                    url: asset.url,
                    fileType: asset.fileType,
                    verification: {
                        method: asset.verification.method,
                        data: asset.verification.data,
                    },
                })),
                ...assets.lsp7assets.map((lsp7) => ({ address: lsp7.address })),
                ...assets.lsp8assets.map((lsp8) => ({
                    address: lsp8.address,
                    tokenId: lsp8.tokenId,
                })),
            ],
            attributes: attributes.map((attr) => ({
                key: attr.key,
                value: attr.value,
                type: attr.type,
            })),
        },
    };

    return JSON.stringify(metadata);
}
