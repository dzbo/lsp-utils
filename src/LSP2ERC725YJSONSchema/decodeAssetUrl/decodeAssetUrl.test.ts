import { expect } from 'chai';
import { decodeAssetUrl } from '../..';

describe('decodeAssetUrl', () => {
    it('should pass if ASSETURL has bytes length bigger than 36', () => {
        const ASSETURL =
            '0x6f357c6a2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c053568747470733a2f2f676f6f676c652e636f6d2f';

        const expectedJsonUrl = {
            hashFunction: '0x6f357c6a',
            hash: '0x2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c0535',
            url: 'https://google.com/',
        };

        expect(decodeAssetUrl(ASSETURL)).to.deep.equal(expectedJsonUrl);
    });

    it('should pass if ASSETURL has bytes length equal to 36', () => {
        const ASSETURL =
            '0x6f357c6a2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c0535';

        const expectedJsonUrl = {
            hashFunction: '0x6f357c6a',
            hash: '0x2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c0535',
            url: '',
        };

        expect(decodeAssetUrl(ASSETURL)).to.deep.equal(expectedJsonUrl);
    });

    it('should throw if ASSETURL has bytes length smaller than 36', () => {
        const ASSETURL = '0xcafedeafbeef';

        expect(() => decodeAssetUrl(ASSETURL)).to.throw(
            `Invalid 'JSONURL' value. Less than 36 bytes. Value: ${ASSETURL}`,
        );
    });
});
