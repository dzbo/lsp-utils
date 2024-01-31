import { expect } from 'chai';
import { keccak256, toUtf8Bytes } from 'ethers';
import { generateSingletonKey } from './generateSingletonKey';

describe('generateSingletonKey', () => {
    it('should pass and return the hash', () => {
        const keyName = 'SignletonKey';

        expect(generateSingletonKey(keyName)).to.equal(keccak256(toUtf8Bytes(keyName)));
    });
});
