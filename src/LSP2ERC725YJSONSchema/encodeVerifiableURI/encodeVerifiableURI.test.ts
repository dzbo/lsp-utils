import { expect } from 'chai';
import { concat, hexlify, keccak256, toBeHex, toUtf8Bytes } from 'ethers';
import { encodeVerifiableURI } from './encodeVerifiableURI';

describe('testing `encodeVerifiableURI`', () => {
    it('Encoding random json with random url', () => {
        const json = {
            someData:
                'Commodo fugiat labore ipsum do ullamco officia sunt commodo reprehenderit in anim mollit. Aute fugiat sunt dolor ut adipisicing dolor. Nostrud laboris ullamco eu eu sint laboris id aliqua. Ipsum consequat fugiat eiusmod irure non. Cillum exercitation reprehenderit ullamco irure sint labore duis cupidatat. Lorem veniam cillum tempor incididunt laboris veniam commodo consequat sint. Velit exercitation dolore consequat nostrud et minim cillum quis aute minim.',
            comeHere: 'Dolore incididunt consectetur incididunt nulla.',
        };
        const url = 'https://google.com/';

        const encodedData = encodeVerifiableURI(json, url);

        expect(encodedData).to.equal(
            concat([
                toBeHex(0, 2),
                '0x6f357c6a',
                toBeHex(32, 2),
                hexlify(keccak256(toUtf8Bytes(JSON.stringify(json)))),
                toUtf8Bytes(url),
            ]),
        );
    });
});
