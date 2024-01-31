import { expect } from 'chai';

// utils
import { decodeAllowedERC725YDataKeys } from './decodeAllowedERC725YDataKeys';

describe('decodeAllowedERC725YDataKeys', () => {
    it('should throw if passed `allowedERC725YDataKeys` is not hex', () => {
        const allowedERC725YDataKeys = 'allowedERC725YDataKeys';

        expect(() => decodeAllowedERC725YDataKeys(allowedERC725YDataKeys)).to.throw(
            `The parameter \`allowedERC725YDataKeys\` is not hex. Value: '${allowedERC725YDataKeys}'`,
        );
    });

    it('should throw if a length in the passed `allowedERC725YDataKeys` is 0', () => {
        const allowedERC725YDataKeys = '0x0004deadbeef0000cafe';

        expect(() => decodeAllowedERC725YDataKeys(allowedERC725YDataKeys)).to.throw(
            `Invalid length. Length: '${0}'. Must be bigger than 0 and smaller than 32.`,
        );
    });

    it('should throw if a length in the passed `allowedERC725YDataKeys` is bigger than 32', () => {
        const allowedERC725YDataKeys =
            '0x0004deadbeef0040cafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe';

        expect(() => decodeAllowedERC725YDataKeys(allowedERC725YDataKeys)).to.throw(
            `Invalid length. Length: '${64}'. Must be bigger than 0 and smaller than 32.`,
        );
    });

    it('should throw if a length in the passed `allowedERC725YDataKeys` is bigger than its element', () => {
        const allowedERC725YDataKeys = '0x0004deadbeef0020cafecafecafecafe';

        expect(() => decodeAllowedERC725YDataKeys(allowedERC725YDataKeys)).to.throw(
            'Out of bounds, length of an element reaches past the length of `allowedERC725YDataKeys`',
        );
    });

    it('should pass if `allowedERC725YDataKeys` is valid', () => {
        const allowedERC725YDataKeys =
            '0x0004deadbeef0020cafecafecafecafecafe00cafecafecafecafe00cafecafecafecafecafecafe0001aa0014beefbeefbeefbeefbeefbeefbeefbeefbeefbeef';

        const decodedDataKeys = [
            '0xdeadbeef',
            '0xcafecafecafecafecafe00cafecafecafecafe00cafecafecafecafecafecafe',
            '0xaa',
            '0xbeefbeefbeefbeefbeefbeefbeefbeefbeefbeef',
        ];

        expect(decodeAllowedERC725YDataKeys(allowedERC725YDataKeys)).to.deep.equal(decodedDataKeys);
    });
});
