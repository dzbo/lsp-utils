import { expect } from 'chai';
import { keccak256, toUtf8Bytes } from 'ethers';
import { defaultIpfsGateway } from '@lukso/lsp-utils-constants';

import { validateIpfsUrl } from './validateIpfsUrl';

describe('validateIpfsUrl', () => {
    it('IPFS URL with default gateway', () => {
        const randomHash = keccak256(toUtf8Bytes('RandomHash')).substring(2);

        expect(validateIpfsUrl(`ipfs://${randomHash}`)).to.equal(defaultIpfsGateway + randomHash);
    });

    it('IPFS URL with custom gateway', () => {
        const randomHash = keccak256(toUtf8Bytes('RandomHash')).substring(2);
        const customGateway = 'https://custom.gateway.io/';

        expect(validateIpfsUrl(`ipfs://${randomHash}`, customGateway)).to.equal(
            customGateway + randomHash,
        );
    });

    it('Normal URL without custom gateway', () => {
        const url = 'https://google.com';

        expect(validateIpfsUrl(url)).to.equal(url);
    });

    it('Normal URL with custom gateway', () => {
        const url = 'https://google.com';
        const customGateway = 'https://custom.gateway.io/';

        expect(validateIpfsUrl(url, customGateway)).to.equal(url);
    });
});
