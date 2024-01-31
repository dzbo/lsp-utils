import { expect } from 'chai';
import { concat, keccak256, toBeHex, toUtf8Bytes } from 'ethers';
import { generateArrayElementKeyAtIndex } from './generateArrayElementKeyAtIndex';

describe('generateArrayElementKeyAtIndex', () => {
    it('should pas if `arrayKey` is a UTF8 string', () => {
        const arrayKeyName = 'SomeArray[]';
        const index = 2;

        expect(generateArrayElementKeyAtIndex(arrayKeyName, index)).to.equal(
            concat([keccak256(toUtf8Bytes(arrayKeyName)).substring(0, 34), toBeHex(index, 16)]),
        );
    });

    it('should pas if `arrayKey` is a hex string', () => {
        const arrayKey = keccak256(toUtf8Bytes('SomeArray[]'));
        const index = 2;

        expect(generateArrayElementKeyAtIndex(arrayKey, index)).to.equal(
            concat([arrayKey.substring(0, 34), toBeHex(index, 16)]),
        );
    });
});
