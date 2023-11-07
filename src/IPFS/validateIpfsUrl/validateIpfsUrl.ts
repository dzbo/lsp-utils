import { defaultIpfsGateway } from '../../constants';

/**
 * Returns a valid URL. If it is an IPFS URL (E.g. `ipfs://{hash}`), the IPFS Gateway will be used to generate a valid link. Otherwise the link is returned.
 *
 * @since v0.0.1
 * @category IPFS
 * @param url The URL that is to be validated.
 * @param ipfsGateway The IPFS Gateway to be used for IPFS URLs.
 * @example
 * validateIpfsUrl('ipfs://{hash}') //=> 'https://2eff.lukso.dev/ipfs/{hash}'
 * validateIpfsUrl('https://google.com/something') //=> 'https://google.com/something'
 * validateIpfsUrl('') //=> ''
 */
export const validateIpfsUrl = (url: string, ipfsGateway?: string): string => {
    return url.startsWith('ipfs://')
        ? ipfsGateway
            ? ipfsGateway + url.replace('ipfs://', '')
            : defaultIpfsGateway + url.replace('ipfs://', '')
        : url;
};
