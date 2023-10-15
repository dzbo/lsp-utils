import { expect } from 'chai';
import { isCompactBytesArray } from '../../src';

describe('isCompactBytesArray', () => {
    it('should throw if passed value is not hex', () => {
        const compactBytesArray = 'Some string';

        expect(() => isCompactBytesArray(compactBytesArray)).to.throw(
            `'compactBytesArray' is not hex. Value: '${compactBytesArray}'`,
        );
    });

    it('should pass and return true if valid', () => {
        const compactBytesArray = '0x0002cafe000abeefdeadbeef0000cafe';

        expect(isCompactBytesArray(compactBytesArray)).to.be.true;
    });

    it('should pass and return false if invalid', () => {
        const compactBytesArray = '0x0002cafecafe000abeefdeadbeef0000cafe';

        expect(isCompactBytesArray(compactBytesArray)).to.be.false;
    });

    it('should pass and return false if invalid', () => {
        const compactBytesArray = '0x0002';

        expect(isCompactBytesArray(compactBytesArray)).to.be.false;
    });
});
