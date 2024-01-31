import { expect } from 'chai';
import { encodeAssetUrl } from './encodeAssetUrl';

describe('encodeAssetUrl', () => {
    it('should pass when encoding any `hashFunction`, `assetBytes`, `url`', () => {
        expect(
            encodeAssetUrl(
                'keccak256(utf8)',
                '{"name":"USDStablecoin","description":"Some random description about the token USD Stablecoin"}',
                'https://google.com/',
            ),
        ).to.equal(
            '0x6f357c6a2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c053568747470733a2f2f676f6f676c652e636f6d2f',
        );
    });
});
