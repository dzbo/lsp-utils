import { expect } from 'chai';
import { decodeVerifiableURI } from './decodeVerifiableURI';

describe('testing `decodeVerifiableURI`', () => {
    it('Decoding a Verifiable URI', () => {
        const data =
            '0x00006f357c6a0020eaba44f326e1405eed836279c9bdb0d62b6f8f7a6187f4fb8454607afd550ee368747470733a2f2f676f6f676c652e636f6d2f';
        const decodedData = decodeVerifiableURI(data);

        expect(decodedData).to.deep.equal({
            verification: {
                method: 'keccak256(utf8)',
                data: '0xeaba44f326e1405eed836279c9bdb0d62b6f8f7a6187f4fb8454607afd550ee3',
            },
            url: 'https://google.com/',
        });
    });
});
