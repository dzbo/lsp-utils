import { expect } from 'chai';
import { encodeJsonUrl } from './encodeJsonUrl';

describe('encodeJsonUrl', () => {
    it('should pass when encoding any `hashFunction`, `json`, `url`', () => {
        expect(
            encodeJsonUrl(
                'keccak256(utf8)',
                '{"name":"Tom","description":"Some random description about Tom"}',
                'https://google.com/',
            ),
        ).to.equal(
            '0x6f357c6a4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a4184968747470733a2f2f676f6f676c652e636f6d2f',
        );
    });
});
