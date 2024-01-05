import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import fetch from 'isomorphic-fetch';

// constants
import { LSP3ProfileMetadata, defaultLSP3ProfileMetadata } from '../../constants';

// IPFS Utils
import { validateIpfsUrl } from '../../IPFS/validateIpfsUrl';

// LSP2 Utils
import { decodeJsonUrl } from '../../LSP2/decodeJsonUrl';

// LSP3 Utils
import { isProfileMetadata } from '../isProfileMetadata';

// types
import { UniversalProfile, UniversalProfile__factory } from '../../typechain';
import { BytesLike, Provider, isAddress, isAddressable } from 'ethers';

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
export async function getProfileMetadata(
    unviersalProfile: UniversalProfile,
): Promise<LSP3ProfileMetadata>;
export async function getProfileMetadata(
    unviersalProfile: BytesLike,
    provider: Provider,
): Promise<LSP3ProfileMetadata>;
export async function getProfileMetadata(
    unviersalProfile: BytesLike | UniversalProfile,
    provider?: Provider,
): Promise<LSP3ProfileMetadata> {
    let unviersalProfileContract: UniversalProfile;
    if (isAddress(unviersalProfile)) {
        unviersalProfileContract = UniversalProfile__factory.connect(unviersalProfile, provider);
    } else if (isAddressable(unviersalProfile)) {
        unviersalProfileContract = unviersalProfile;
    }

    const profileMetadataDataValue = await unviersalProfileContract.getData(
        ERC725YDataKeys.LSP3.LSP3Profile,
    );

    const JSONURL = decodeJsonUrl(profileMetadataDataValue);

    const profileDataURL = validateIpfsUrl(JSONURL.url);

    let profileData: LSP3ProfileMetadata;
    try {
        const response = await fetch(profileDataURL);
        profileData = await response.json();
    } catch {
        throw new Error("Couldn't fetch Profile Data from the url.");
    }

    if (!isProfileMetadata(profileData)) {
        throw new Error('Fetched data is not an `LSP3ProfileMetadata` object.');
    }

    return profileData ? profileData : defaultLSP3ProfileMetadata;
}

export default getProfileMetadata;
