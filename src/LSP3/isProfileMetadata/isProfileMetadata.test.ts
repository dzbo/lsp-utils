import { expect } from 'chai';
import { isProfileMetadata } from '../..';

describe('isProfileMetadata', () => {
    it('should pass and return true if an object of type `LSP3ProfileMetadata` is passed', () => {
        const object = { LSP3Profile: { description: '', links: [], name: '', tags: [] } };

        expect(isProfileMetadata(object)).to.be.true;
    });

    it('should pass and return false if an object of type other than `LSP3ProfileMetadata` is passed', () => {
        const object = { description: '', links: [], name: '', tags: [] };

        expect(isProfileMetadata(object)).to.be.false;
    });
});
