// import { PERMISSIONS } from '@lukso/lsp-smart-contracts';
import { BytesLike, ZeroHash, isHexString, stripZerosLeft, toBeHex } from 'ethers';
import { PERMISSIONS } from '@lukso/lsp-smart-contracts';
import { LSP6PermissionName } from '../../types';

/**
 * Decode a hex value, containing a `BitArray` of permissions. The `AddressPermissions:Permissions:<address>` can be decoded using this function.
 *
 * @since v0.0.2
 * @category LSP6
 * @param permissions A hex value, containing a BitArray of permissions.
 * @param decodedPermissionsType Optional param, defaults to `LSP6PermissionName`.
 * Can be used to specfiy the type of the return array. Options:
 * - `BytesLike`
 * - `bigint`
 * - `boolean`
 * - `LSP6PermissionName`
 *
 * @return An array of decoded permissions.
 *
 * @throws
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md
 * @example
 * ```
 * decodePermissions([
 *   `0x0000000000000000000000000000000000000000000000000000000000040803`
 * ]) //=> new Set([ CHANGEOWNER, ADDCONTROLLER, CALL, SETDATA ])
 * decodePermissions([
 *   `0x0000000000000000000000000000000000000000000000000000000000040803`,
 *   'LSP6PermissionName'
 * ]) //=> new Set([ CHANGEOWNER, ADDCONTROLLER, CALL, SETDATA ])
 * decodePermissions([
 *   `0x0000000000000000000000000000000000000000000000000000000000040803`,
 *   'BytesLike'
 * ]) //=>
 * // new Set([
 * //   '0x0000000000000000000000000000000000000000000000000000000000000001',
 * //   '0x0000000000000000000000000000000000000000000000000000000000000002',
 * //   '0x0000000000000000000000000000000000000000000000000000000000000800',
 * //   '0x0000000000000000000000000000000000000000000000000000000000040000',
 * // ])
 * decodePermissions([
 *   `0x0000000000000000000000000000000000000000000000000000000000040803`,
 *   'bigint'
 * ]) //=> new Set([ 1n, 2n, 2048n, 262144n ])
 * decodePermissions([
 *   `0x0000000000000000000000000000000000000000000000000000000000000003`,
 *   'boolean'
 * ]) //=> [ true, true, false, false, false, false, false, false ]
 * ```
 */
export function decodePermissions(
    permissions: string | BytesLike,
    decodedPermissionsType?: 'BytesLike' | 'bigint' | 'boolean' | 'LSP6PermissionName',
): Set<BytesLike | bigint | LSP6PermissionName> | boolean[] {
    if (permissions === ZeroHash || permissions === '') {
        throw new Error('There are no permissions to decode');
    }

    if (!isHexString(permissions)) {
        throw new Error(`Permissions is not hex. permissions: '${permissions}'`);
    }

    decodedPermissionsType = decodedPermissionsType ? decodedPermissionsType : 'LSP6PermissionName';

    const zeroStrippedPermissions = stripZerosLeft(permissions);
    const bigIntPermissions = BigInt(zeroStrippedPermissions);

    if (decodedPermissionsType === 'boolean') {
        const decodedPermissions: boolean[] = [];

        for (let index = 0; index < zeroStrippedPermissions.length * 4; index++) {
            const bigIntPermission = (BigInt(1) << BigInt(index)) & bigIntPermissions;
            const booleanPermissions = bigIntPermission !== BigInt(0);

            decodedPermissions[index] = booleanPermissions;
        }

        return decodedPermissions;
    } else {
        const decodedPermissionsSet: Set<BytesLike | bigint | LSP6PermissionName> = new Set([]);

        for (let index = 0; index < zeroStrippedPermissions.length * 4; index++) {
            const bigIntPermission = (BigInt(1) << BigInt(index)) & bigIntPermissions;

            if (decodedPermissionsType === 'BytesLike') {
                const bytesLikePermissions = toBeHex(bigIntPermission, 32);

                if (bytesLikePermissions !== ZeroHash) {
                    decodedPermissionsSet.add(bytesLikePermissions);
                }
            } else if (decodedPermissionsType === 'bigint') {
                if (bigIntPermission !== BigInt(0)) {
                    decodedPermissionsSet.add(bigIntPermission);
                }
            } else if (decodedPermissionsType === 'LSP6PermissionName') {
                const bytesLikePermissions = toBeHex(bigIntPermission, 32);

                if (bytesLikePermissions !== ZeroHash) {
                    const permissionName = Object.getOwnPropertyNames(PERMISSIONS).filter(
                        (permission) => PERMISSIONS[permission] === bytesLikePermissions,
                    )[0];

                    if (permissionName) {
                        decodedPermissionsSet.add(permissionName);
                    } else {
                        throw new Error(
                            `LSP6 permission does not exist. Permission: ${bytesLikePermissions}`,
                        );
                    }
                }
            }
        }

        return decodedPermissionsSet;
    }
}
