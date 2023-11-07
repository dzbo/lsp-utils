import { expect } from 'chai';
import { createValidityTimestamp } from '../..';
import { concat, toBeHex } from 'ethers';

describe('createValidityTimestamp', () => {
    it('should pass if the passed timestamps are valid', () => {
        const startingTimestamp = Math.round(new Date().getTime() / 1000);
        const endingTimestamp = startingTimestamp + 60;

        expect(createValidityTimestamp(startingTimestamp, endingTimestamp)).to.equal(
            concat([toBeHex(startingTimestamp, 16), toBeHex(endingTimestamp, 16)]),
        );
    });

    it('should throw if the bytes value of `startingTimestamp` is bigger than 16 bytes', () => {
        const startingTimestamp = '0xffffffffffffffffffffffffffffffffff';
        const endingTimestamp = Math.round(new Date().getTime() / 1000);

        expect(() => createValidityTimestamp(startingTimestamp, endingTimestamp)).to.throw(
            `The hex value of the number: '${startingTimestamp}' execeeds 16 bytes`,
        );
    });

    it('should throw if the bytes value of `endingTimestamp` is bigger than 16 bytes', () => {
        const startingTimestamp = Math.round(new Date().getTime() / 1000);
        const endingTimestamp = '0xffffffffffffffffffffffffffffffffff';

        expect(() => createValidityTimestamp(startingTimestamp, endingTimestamp)).to.throw(
            `The hex value of the number: '${endingTimestamp}' execeeds 16 bytes`,
        );
    });
});
