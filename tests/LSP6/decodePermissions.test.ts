import { PERMISSIONS } from '@lukso/lsp-smart-contracts';
import { ZeroHash, toBeHex } from 'ethers';
import { expect } from 'chai';

import { decodePermissions } from '../../src';

describe('decodePermissions', () => {
    it('should throw, passing empty string as permissions', () => {
        expect(() => decodePermissions('')).to.throw('There are no permissions to decode');
    });

    it('should throw, passing `ZeroHash` as permissions', () => {
        expect(() => decodePermissions(ZeroHash)).to.throw('There are no permissions to decode');
    });

    it('should throw, passing UTF8 string as permissions', () => {
        const permissions = 'Some random string';

        expect(() => decodePermissions(permissions)).to.throw(
            `Permissions is not hex. permissions: '${permissions}'`,
        );
    });

    it('should pass, testing return value as `BytesLike[]`', () => {
        const expectedPermissions = [
            PERMISSIONS.CHANGEOWNER,
            PERMISSIONS.ADDCONTROLLER,
            PERMISSIONS.CALL,
            PERMISSIONS.SETDATA,
        ];

        expect(
            Array.from(
                decodePermissions(
                    toBeHex(
                        BigInt(PERMISSIONS.CHANGEOWNER) |
                            BigInt(PERMISSIONS.ADDCONTROLLER) |
                            BigInt(PERMISSIONS.CALL) |
                            BigInt(PERMISSIONS.SETDATA),
                        32,
                    ),
                    'BytesLike',
                ),
            ),
        ).to.deep.equal(expectedPermissions);
    });

    it('should pass, testing return value as `bigint[]`', () => {
        const expectedPermissions = [
            BigInt(PERMISSIONS.CHANGEOWNER),
            BigInt(PERMISSIONS.ADDCONTROLLER),
            BigInt(PERMISSIONS.CALL),
            BigInt(PERMISSIONS.SETDATA),
        ];

        expect(
            Array.from(
                decodePermissions(
                    toBeHex(
                        BigInt(PERMISSIONS.CHANGEOWNER) |
                            BigInt(PERMISSIONS.ADDCONTROLLER) |
                            BigInt(PERMISSIONS.CALL) |
                            BigInt(PERMISSIONS.SETDATA),
                        32,
                    ),
                    'bigint',
                ),
            ),
        ).to.deep.equal(expectedPermissions);
    });

    it('should pass, testing return value as `boolean[]`', () => {
        // because the `SETDATA` permissions is the 19th `Bit` in the `BitArray`
        // it means that `SETDATA` would be situated in the 3rd byte from left to right
        // and because each bytes has 8 bits, the retuned array would have 32 (8 bits * 3 bytes) elements
        const expectedPermissions = [
            true,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            true,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ];

        expect(
            decodePermissions(
                toBeHex(
                    BigInt(PERMISSIONS.CHANGEOWNER) |
                        BigInt(PERMISSIONS.ADDCONTROLLER) |
                        BigInt(PERMISSIONS.CALL) |
                        BigInt(PERMISSIONS.SETDATA),
                    32,
                ),
                'boolean',
            ),
        ).to.deep.equal(expectedPermissions);
    });

    it('should pass, testing return value as `LSP6PermissionName[]`', () => {
        const expectedPermissions = ['CHANGEOWNER', 'ADDCONTROLLER', 'CALL', 'SETDATA'];

        expect(
            Array.from(
                decodePermissions(
                    toBeHex(
                        BigInt(PERMISSIONS.CHANGEOWNER) |
                            BigInt(PERMISSIONS.ADDCONTROLLER) |
                            BigInt(PERMISSIONS.CALL) |
                            BigInt(PERMISSIONS.SETDATA),
                        32,
                    ),
                    'LSP6PermissionName',
                ),
            ),
        ).to.deep.equal(expectedPermissions);
    });

    it('should throw, if LSP6 permission does not exist when testing return value as `LSP6PermissionName[]`', () => {
        const nonLSP6Permission = BigInt(1) << BigInt(100);

        expect(() =>
            Array.from(
                decodePermissions(
                    toBeHex(
                        BigInt(PERMISSIONS.CHANGEOWNER) |
                            BigInt(PERMISSIONS.ADDCONTROLLER) |
                            BigInt(PERMISSIONS.CALL) |
                            BigInt(PERMISSIONS.SETDATA) |
                            nonLSP6Permission,
                        32,
                    ),
                    'LSP6PermissionName',
                ),
            ),
        ).to.throw(`LSP6 permission does not exist. Permission: ${toBeHex(nonLSP6Permission, 32)}`);
    });

    it('should pass, testing default return value', () => {
        const expectedPermissions = ['CHANGEOWNER', 'ADDCONTROLLER', 'CALL', 'SETDATA'];

        expect(
            Array.from(
                decodePermissions(
                    toBeHex(
                        BigInt(PERMISSIONS.CHANGEOWNER) |
                            BigInt(PERMISSIONS.ADDCONTROLLER) |
                            BigInt(PERMISSIONS.CALL) |
                            BigInt(PERMISSIONS.SETDATA),
                        32,
                    ),
                    'LSP6PermissionName',
                ),
            ),
        ).to.deep.equal(expectedPermissions);
    });
});
