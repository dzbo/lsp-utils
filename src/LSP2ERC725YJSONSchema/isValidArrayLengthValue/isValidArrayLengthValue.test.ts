import { expect } from 'chai';
import { isValidArrayLengthValue } from '../..';

describe('isValidArrayLengthValue', () => {
    it('should pass and return true if value is exactly 16 bytes', () => {
        const arrayLength = '0x00000000000000000000000000000a3b';

        expect(isValidArrayLengthValue(arrayLength)).to.be.true;
    });

    it('should pass and return true if value is shorter than 16 bytes', () => {
        const arrayLength = '0x000000000000000000000000004a';

        expect(isValidArrayLengthValue(arrayLength)).to.be.false;
    });

    it('should pass and return true if value is longer than 16 bytes', () => {
        const arrayLength = '0x0000000000000000000000000000000000f60a';

        expect(isValidArrayLengthValue(arrayLength)).to.be.false;
    });
});
