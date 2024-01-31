import { expect } from 'chai';
import { decodeJsonUrl } from './decodeJsonUrl';

describe('decodeJsonUrl', () => {
    it('should pass if JSONURL has bytes length bigger than 36', () => {
        const JSONURL =
            '0x6f357c6a4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a4184968747470733a2f2f676f6f676c652e636f6d2f';

        const expectedJsonUrl = {
            hashFunction: '0x6f357c6a',
            hash: '0x4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a41849',
            url: 'https://google.com/',
        };

        expect(decodeJsonUrl(JSONURL)).to.deep.equal(expectedJsonUrl);
    });

    it('should pass if JSONURL has bytes length equal to 36', () => {
        const JSONURL =
            '0x6f357c6a4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a41849';

        const expectedJsonUrl = {
            hashFunction: '0x6f357c6a',
            hash: '0x4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a41849',
            url: '',
        };

        expect(decodeJsonUrl(JSONURL)).to.deep.equal(expectedJsonUrl);
    });

    it('should throw if JSONURL has bytes length smaller than 36', () => {
        const JSONURL = '0xcafedeafbeef';

        expect(() => {
            decodeJsonUrl(JSONURL);
        }).to.throw(`Invalid 'JSONURL' value. Less than 36 bytes. Value: ${JSONURL}`);
    });
});
