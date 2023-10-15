import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// constants
import { defaultLSP3ProfileMetadata } from '../../constants/constants';

// IPFS Utils
import { validateIpfsUrl } from '../../IPFS/validateIpfsUrl';

// LSP2 Utils
import { decodeJsonUrl } from '../../LSP2/decodeJsonUrl';

// LSP3 Utils
import { isProfileMetadata } from '../isProfileMetadata';

// types
import { UniversalProfile } from '../../../types/';

/**
 * Returns a object of type LSP3ProfileMetadata.
 *
 * @since v0.0.1
 * @category LSP3
 *
 * @param unviersalProfile The instance of a Unviersal Profile contract.
 *
 * @throws When the fetched data is not `LSP3ProfileMetadata`.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md
 * @example
 * ```
 * getMetadata(UniversalProfile) //=>
 * // {
 * //   LSP3Profile: {
 * //     description: "",
 * //     links: [],
 * //     name: "",
 * //     tags: []
 * //   }
 * // }
 * ```
 */
export const getProfileMetadata = async (unviersalProfile: UniversalProfile) => {
    const profileMetadataDataValue = await unviersalProfile.getData(
        ERC725YDataKeys.LSP3.LSP3Profile,
    );

    const JSONURL = decodeJsonUrl(profileMetadataDataValue);

    const profileDataURL = validateIpfsUrl(JSONURL.url);

    let profileData;

    await fetch(profileDataURL)
        .then(async (result) => await result.json())
        .then((result) => (profileData = result));

    if (!isProfileMetadata(profileData)) {
        throw new Error('Fetched data is not an `LSP3ProfileMetadata` object.');
    }

    return profileData ? profileData : defaultLSP3ProfileMetadata;
};
