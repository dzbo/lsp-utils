import { expect } from 'chai';
import { isAssetMetadata } from './isAssetMetadata';
import { defaultLSP4AssetMetadata } from '@lukso/lsp-utils-constants';

describe('isAssetMetadata', () => {
    it('should return true if an object of type `LSP3ProfileMetadata` is passed', () => {
        expect(isAssetMetadata(defaultLSP4AssetMetadata)).to.be.true;
    });

    it('should return false if an object of type other than `LSP3ProfileMetadata` is passed', () => {
        const object = { description: '', links: [], name: '', images: [] };

        expect(isAssetMetadata(object)).to.be.false;
    });
});
