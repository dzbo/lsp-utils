import { expect } from 'chai';
import { decodeAllowedCalls } from '../..';

describe('decodeAllowedCalls', () => {
    it('should throw if passed `allowedCalls` is not hex', () => {
        const allowedCalls = 'allowedCalls';

        expect(() => decodeAllowedCalls(allowedCalls)).to.throw(
            `The parameter \`allowedCalls\` is not hex. Value: '${allowedCalls}'`,
        );
    });

    it('should throw if a length in the passed `allowedCalls` is 0', () => {
        const allowedCalls =
            '0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c0000';

        expect(() => decodeAllowedCalls(allowedCalls)).to.throw(
            `Invalid length. Length: '${0}'. Must be 32.`,
        );
    });

    it('should throw if a length in the passed `allowedCalls` is smaller than 32', () => {
        const allowedCalls =
            '0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c001000000003cafecafecafecafecafecafe';

        expect(() => decodeAllowedCalls(allowedCalls)).to.throw(
            `Invalid length. Length: '${16}'. Must be 32.`,
        );
    });

    it('should throw if a length in the passed `allowedCalls` is bigger than 32', () => {
        const allowedCalls =
            '0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c004000000003cafecafecafecafecafecafecafecafecafecafe24871b3d44c028fe00000003cafecafecafecafecafecafecafecafecafecafe24871b3d44c028fe';

        expect(() => decodeAllowedCalls(allowedCalls)).to.throw(
            `Invalid length. Length: '${64}'. Must be 32.`,
        );
    });

    it('should throw if a length in the passed `allowedCalls` is bigger than its element', () => {
        const allowedCalls =
            '0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c0020cafecafecafecafecafecafecafecafecafecafe';

        expect(() => decodeAllowedCalls(allowedCalls)).to.throw(
            'Out of bounds, length of an element reaches past the length of `allowedCalls`',
        );
    });

    it('should pass if `allowedCalls` is valid', () => {
        const allowedCalls =
            '0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c002000000003cafecafecafecafecafecafecafecafecafecafe24871b3d44c028fe';

        const decodedAllowedCalls = {
            allowedInteractions: ['0x00000002', '0x00000003'],
            allowedAddresses: [
                '0xcafecafecafecafecafecafecafecafecafecafe',
                '0xcafecafecafecafecafecafecafecafecafecafe',
            ],
            allowedStandards: ['0x24871b3d', '0x24871b3d'],
            allowedFunctions: ['0x7f23690c', '0x44c028fe'],
        };

        expect(decodeAllowedCalls(allowedCalls)).to.deep.equal(decodedAllowedCalls);
    });
});
