import { expect } from 'chai';
import { generateMappingKey } from './generateMappingKey';
import { concat, keccak256, toUtf8Bytes } from 'ethers';

describe('generateMappingKey', () => {
    it('should pass and generate a mapping key. `firstPart` as UTF8 & `lastPart` as UTF8', () => {
        const firstPart = 'firstPart';
        const lastPart = 'lastPart';

        expect(generateMappingKey(firstPart, lastPart)).to.equal(
            concat([
                keccak256(toUtf8Bytes(firstPart)).substring(0, 22),
                '0x0000',
                keccak256(toUtf8Bytes(lastPart)).substring(0, 42),
            ]),
        );
    });

    it('should pass and generate a mapping key. `firstPart` as hex & `lastPart` as UTF8', () => {
        const firstPart = keccak256(toUtf8Bytes('firstPart')).substring(0, 22);
        const lastPart = 'lastPart';

        expect(generateMappingKey(firstPart, lastPart)).to.equal(
            concat([firstPart, '0x0000', keccak256(toUtf8Bytes(lastPart)).substring(0, 42)]),
        );
    });

    it('should pass and generate a mapping key. `firstPart` as UTF8 & `lastPart` as hex', () => {
        const firstPart = 'firstPart';
        const lastPart = keccak256(toUtf8Bytes('lastPart')).substring(0, 42);

        expect(generateMappingKey(firstPart, lastPart)).to.equal(
            concat([keccak256(toUtf8Bytes(firstPart)).substring(0, 22), '0x0000', lastPart]),
        );
    });

    it('should pass and generate a mapping key. `firstPart` as hex & `lastPart` as hex', () => {
        const firstPart = keccak256(toUtf8Bytes('firstPart')).substring(0, 22);
        const lastPart = keccak256(toUtf8Bytes('lastPart')).substring(0, 42);

        expect(generateMappingKey(firstPart, lastPart)).to.equal(
            concat([firstPart, '0x0000', lastPart]),
        );
    });
});
