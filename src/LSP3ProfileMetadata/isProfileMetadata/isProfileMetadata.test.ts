import { expect } from 'chai';
import { isProfileMetadata } from './isProfileMetadata';
import { defaultLSP3ProfileMetadata } from '../../constants';

describe('isProfileMetadata', () => {
    it('should return true if an object of type `LSP3ProfileMetadata` is passed', () => {
        expect(isProfileMetadata(defaultLSP3ProfileMetadata)).to.be.true;
    });

    it('should return false if an object of type other than `LSP3ProfileMetadata` is passed', () => {
        const object = { description: '', links: [], name: '', tags: [] };

        expect(isProfileMetadata(object)).to.be.false;
    });
});
