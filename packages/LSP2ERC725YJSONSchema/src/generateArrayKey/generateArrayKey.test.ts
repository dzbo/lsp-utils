import { expect } from 'chai';
import { keccak256, toUtf8Bytes } from 'ethers';
import { generateArrayKey } from './generateArrayKey';

describe('generateArrayKey', () => {
    it('should pass if `arrayKey` is a UTF8 string', () => {
        const arrayKeyName = 'SomeArray[]';

        expect(generateArrayKey(arrayKeyName)).to.equal(keccak256(toUtf8Bytes(arrayKeyName)));
    });

    it("should pass if `arrayKey` is '[]'", () => {
        const arrayKeyName = '[]';

        expect(generateArrayKey(arrayKeyName)).to.equal(keccak256(toUtf8Bytes(arrayKeyName)));
    });

    it('should revert if `arrayKey` is a UTF8 string with a single character', () => {
        const arrayKeyName = 'S';

        expect(() => generateArrayKey(arrayKeyName)).to.throw(
            'Array data key name must be longer than 2 characters.',
        );
    });

    it("should revert if `arrayKey` is a UTF8 string without '[]' at the end", () => {
        const arrayKeyName = 'SomeArray';

        expect(() => generateArrayKey(arrayKeyName)).to.throw(
            "Missing empty square brackets '[]' at the end of the data key name.",
        );
    });
});
