import { expect } from 'chai';
import { generateMappingWithGroupingKey } from '../..';
import { concat, keccak256, toUtf8Bytes } from 'ethers';

describe('generateMappingWithGroupingKey', () => {
    it('should pass and generate a mapping with grouping key. `firstPart` as UTF8 & `middlePart` as UTF8 & `lastPart` as UTF8', () => {
        const firstPart = 'firstPart';
        const middlePart = 'middlePart';
        const lastPart = 'lastPart';

        expect(generateMappingWithGroupingKey(firstPart, middlePart, lastPart)).to.equal(
            concat([
                keccak256(toUtf8Bytes(firstPart)).substring(0, 14),
                keccak256(toUtf8Bytes(middlePart)).substring(0, 10),
                '0x0000',
                keccak256(toUtf8Bytes(lastPart)).substring(0, 42),
            ]),
        );
    });

    it('should pass and generate a mapping with grouping key. `firstPart` as UTF8 & `middlePart` as UTF8 & `lastPart` as hex', () => {
        const firstPart = 'firstPart';
        const middlePart = 'middlePart';
        const lastPart = keccak256(toUtf8Bytes('lastPart')).substring(0, 42);

        expect(generateMappingWithGroupingKey(firstPart, middlePart, lastPart)).to.equal(
            concat([
                keccak256(toUtf8Bytes(firstPart)).substring(0, 14),
                keccak256(toUtf8Bytes(middlePart)).substring(0, 10),
                '0x0000',
                lastPart,
            ]),
        );
    });

    it('should pass and generate a mapping with grouping key. `firstPart` as UTF8 & `middlePart` as hex & `lastPart` as UTF8', () => {
        const firstPart = 'firstPart';
        const middlePart = keccak256(toUtf8Bytes('middlePart')).substring(0, 10);
        const lastPart = 'lastPart';

        expect(generateMappingWithGroupingKey(firstPart, middlePart, lastPart)).to.equal(
            concat([
                keccak256(toUtf8Bytes(firstPart)).substring(0, 14),
                middlePart,
                '0x0000',
                keccak256(toUtf8Bytes(lastPart)).substring(0, 42),
            ]),
        );
    });

    it('should pass and generate a mapping with grouping key. `firstPart` as UTF8 & `middlePart` as hex & `lastPart` as UTF8', () => {
        const firstPart = 'firstPart';
        const middlePart = keccak256(toUtf8Bytes('middlePart')).substring(0, 10);
        const lastPart = keccak256(toUtf8Bytes('lastPart')).substring(0, 42);

        expect(generateMappingWithGroupingKey(firstPart, middlePart, lastPart)).to.equal(
            concat([
                keccak256(toUtf8Bytes(firstPart)).substring(0, 14),
                middlePart,
                '0x0000',
                lastPart,
            ]),
        );
    });

    it('should pass and generate a mapping with grouping key. `firstPart` as hex & `middlePart` as UTF8 & `lastPart` as UTF8', () => {
        const firstPart = keccak256(toUtf8Bytes('firstPart')).substring(0, 14);
        const middlePart = 'middlePart';
        const lastPart = 'lastPart';

        expect(generateMappingWithGroupingKey(firstPart, middlePart, lastPart)).to.equal(
            concat([
                firstPart,
                keccak256(toUtf8Bytes(middlePart)).substring(0, 10),
                '0x0000',
                keccak256(toUtf8Bytes(lastPart)).substring(0, 42),
            ]),
        );
    });

    it('should pass and generate a mapping with grouping key. `firstPart` as hex & `middlePart` as UTF8 & `lastPart` as hex', () => {
        const firstPart = keccak256(toUtf8Bytes('firstPart')).substring(0, 14);
        const middlePart = 'middlePart';
        const lastPart = keccak256(toUtf8Bytes('lastPart')).substring(0, 42);

        expect(generateMappingWithGroupingKey(firstPart, middlePart, lastPart)).to.equal(
            concat([
                firstPart,
                keccak256(toUtf8Bytes(middlePart)).substring(0, 10),
                '0x0000',
                lastPart,
            ]),
        );
    });

    it('should pass and generate a mapping with grouping key. `firstPart` as hex & `middlePart` as hex & `lastPart` as UTF8', () => {
        const firstPart = keccak256(toUtf8Bytes('firstPart')).substring(0, 14);
        const middlePart = keccak256(toUtf8Bytes('middlePart')).substring(0, 10);
        const lastPart = 'lastPart';

        expect(generateMappingWithGroupingKey(firstPart, middlePart, lastPart)).to.equal(
            concat([
                firstPart,
                middlePart,
                '0x0000',
                keccak256(toUtf8Bytes(lastPart)).substring(0, 42),
            ]),
        );
    });

    it('should pass and generate a mapping with grouping key. `firstPart` as hex & `middlePart` as hex & `lastPart` as hex', () => {
        const firstPart = keccak256(toUtf8Bytes('firstPart')).substring(0, 14);
        const middlePart = keccak256(toUtf8Bytes('middlePart')).substring(0, 10);
        const lastPart = keccak256(toUtf8Bytes('lastPart')).substring(0, 42);

        expect(generateMappingWithGroupingKey(firstPart, middlePart, lastPart)).to.equal(
            concat([firstPart, middlePart, '0x0000', lastPart]),
        );
    });
});
