import { expect } from 'chai';
import { encodeAllowedERC725YDataKeys } from '../../src';

describe('encodeAllowedERC725YDataKeys.test', () => {
    it('should throw if a passed data key is UTF8', () => {
        const dataKeys = ['data key'];

        expect(() => encodeAllowedERC725YDataKeys(dataKeys)).to.throw(
            `'${dataKeys[0]}' is not hex`,
        );
    });

    it('should throw if a passed data key has 0 bytes', () => {
        const dataKeys = ['0x'];

        expect(() => encodeAllowedERC725YDataKeys(dataKeys)).to.throw(
            `Invalid length. Length: '${
                dataKeys[0].length - 2
            }'. Must be bigger than 0 and smaller than 32.`,
        );
    });

    it('should throw if a passed data key has more than 32 bytes', () => {
        const dataKeys = [
            '0xcafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafecafe',
        ];

        expect(() => encodeAllowedERC725YDataKeys(dataKeys)).to.throw(
            `Invalid length. Length: '${
                dataKeys[0].length / 2 - 1
            }'. Must be bigger than 0 and smaller than 32.`,
        );
    });
});
