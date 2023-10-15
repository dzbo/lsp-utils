import { expect } from 'chai';
import { generateSingletonKey } from '../../src';
import { keccak256, toUtf8Bytes } from 'ethers';

describe('generateSingletonKey', () => {
    it('should pass and return the hash', () => {
        const keyName = 'SignletonKey';

        expect(generateSingletonKey(keyName)).to.equal(keccak256(toUtf8Bytes(keyName)));
    });
});
