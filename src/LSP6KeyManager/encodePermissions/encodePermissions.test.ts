import { PERMISSIONS } from '@lukso/lsp-smart-contracts';
import { toBeHex } from 'ethers';
import { expect } from 'chai';

import { encodePermissions } from '../..';

describe('encodePermissions', () => {
    it('should pass and combine permissions properly, 0 perimissions', () => {
        const expectedResult = toBeHex(0, 32);

        expect(encodePermissions([])).to.equal(expectedResult);
    });

    describe('testing parameter as `string[]`', () => {
        it('should throw if a permission is not hex and not a valid permission name', () => {
            expect(() =>
                encodePermissions([
                    PERMISSIONS.CHANGEOWNER,
                    'some text',
                    PERMISSIONS.ADDEXTENSIONS,
                ]),
            ).to.throw("Permission: 'some text' is not a hex string.");
        });

        it('should pass and combine permissions properly', () => {
            const expectedResult = toBeHex(
                BigInt(PERMISSIONS.CHANGEOWNER) |
                    BigInt(PERMISSIONS.ADDCONTROLLER) |
                    BigInt(PERMISSIONS.CALL) |
                    BigInt(PERMISSIONS.SETDATA),
                32,
            );

            expect(
                encodePermissions([
                    PERMISSIONS.CHANGEOWNER,
                    PERMISSIONS.ADDCONTROLLER,
                    PERMISSIONS.CALL,
                    PERMISSIONS.SETDATA,
                ]),
            ).to.equal(expectedResult);
        });

        it('should pass and combine permissions properly, repeating permission', () => {
            const expectedResult = toBeHex(
                BigInt(PERMISSIONS.CHANGEOWNER) |
                    BigInt(PERMISSIONS.ADDCONTROLLER) |
                    BigInt(PERMISSIONS.CALL) |
                    BigInt(PERMISSIONS.SETDATA),
                32,
            );

            expect(
                encodePermissions([
                    PERMISSIONS.CHANGEOWNER,
                    PERMISSIONS.CHANGEOWNER,
                    PERMISSIONS.ADDCONTROLLER,
                    PERMISSIONS.CALL,
                    PERMISSIONS.SETDATA,
                    PERMISSIONS.SETDATA,
                ]),
            ).to.equal(expectedResult);
        });

        it('should pass and allow a valid LSP permission name', () => {
            const expectedResult = toBeHex(
                BigInt(PERMISSIONS.CHANGEOWNER) |
                    BigInt(PERMISSIONS.SETDATA) |
                    BigInt(PERMISSIONS.ADDEXTENSIONS),
                32,
            );

            expect(encodePermissions(['CHANGEOWNER', 'SETDATA', 'ADDEXTENSIONS'])).to.equal(
                expectedResult,
            );
        });
    });

    describe('testing parameter as `number[]`', () => {
        it('should pass and combine permissions properly', () => {
            const expectedResult = toBeHex(15 | 6 | 49 | 170, 32);

            expect(encodePermissions([15, 6, 49, 170])).to.equal(expectedResult);
        });

        it('should pass and combine permissions properly, repeating permission', () => {
            const expectedResult = toBeHex(15 | 6 | 49 | 170, 32);

            expect(encodePermissions([15, 15, 6, 49, 170, 170])).to.equal(expectedResult);
        });
    });

    describe('testing parameter as `bigint[]`', () => {
        it('should pass and combine permissions properly', () => {
            const expectedResult = toBeHex(
                BigInt('18371249837432') |
                    BigInt('1324876374612367') |
                    BigInt('836421867624') |
                    BigInt('5723167862178'),
                32,
            );

            expect(
                encodePermissions([
                    BigInt('18371249837432'),
                    BigInt('1324876374612367'),
                    BigInt('836421867624'),
                    BigInt('5723167862178'),
                ]),
            ).to.equal(expectedResult);
        });

        it('should pass and combine permissions properly, repeating permission', () => {
            const expectedResult = toBeHex(
                BigInt('18371249837432') |
                    BigInt('1324876374612367') |
                    BigInt('836421867624') |
                    BigInt('5723167862178'),
                32,
            );

            expect(
                encodePermissions([
                    BigInt('18371249837432'),
                    BigInt('18371249837432'),
                    BigInt('1324876374612367'),
                    BigInt('836421867624'),
                    BigInt('5723167862178'),
                    BigInt('5723167862178'),
                ]),
            ).to.equal(expectedResult);
        });
    });

    describe('testing parameter as `bool[]`', () => {
        it('should pass and combine permissions properly', () => {
            const expectedResult = toBeHex(
                (BigInt(true) << BigInt(0)) |
                    (BigInt(true) << BigInt(1)) |
                    (BigInt(false) << BigInt(2)) |
                    (BigInt(true) << BigInt(3)),
                32,
            );

            expect(encodePermissions([true, true, false, true])).to.equal(expectedResult);
        });
    });

    describe('testing a combination of types: string, number, bigint', () => {
        it('should pass and combine permissions properly with mutiple types', () => {
            const expectedResult = toBeHex(
                BigInt(PERMISSIONS.CALL) |
                    (BigInt(true) << BigInt(1)) |
                    BigInt('5723167862178') |
                    BigInt(PERMISSIONS.SETDATA) |
                    BigInt(15),
                32,
            );

            expect(
                encodePermissions([PERMISSIONS.CALL, true, BigInt('5723167862178'), 'SETDATA', 15]),
            ).to.equal(expectedResult);
        });
    });
});
