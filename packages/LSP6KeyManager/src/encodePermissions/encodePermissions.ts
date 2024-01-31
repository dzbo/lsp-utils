import { PERMISSIONS } from '@lukso/lsp-smart-contracts';
import { isHexString, toBeHex } from 'ethers';

const LSP6Permissions: Record<string, string> = PERMISSIONS;

/**
 * Generate a `BitArray` of permissions. The result can be user for `AddressPermissions:Permissions:<address>`.
 *
 * @since v0.0.2
 * @category LSP6
 * @param permissions An array of LSP6 permissions, LSP6 permission names, numbers, booleans or any combination of the previously enumerated types.
 *
 * @return A `BitArray` that can be use as LSP6 controller permissions.
 *
 * @see https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md
 * @example
 * ```
 * encodePermissions([
 *   "0x0000000000000000000000000000000000000000000000000000000000000001", //CHANGEOWNER
 *   "0x0000000000000000000000000000000000000000000000000000000000000002", //ADDCONTROLLER
 *   "0x0000000000000000000000000000000000000000000000000000000000000800", //CALL
 *   "0x0000000000000000000000000000000000000000000000000000000000040000", //SETDATA
 * ]) //=> `0x0000000000000000000000000000000000000000000000000000000000040803`
 * encodePermissions([
 *   true,  // `0x0000000000000000000000000000000000000000000000000000000000000001` - CHANGEOWNER
 *   true,  // `0x0000000000000000000000000000000000000000000000000000000000000002` - ADDCONTROLLER
 *   false, // `0x0000000000000000000000000000000000000000000000000000000000000000` - EDITPERMISSIONS
 *   true,  // `0x0000000000000000000000000000000000000000000000000000000000000008` - ADDEXTENSIONS
 * ]) //=> `0x000000000000000000000000000000000000000000000000000000000000000b`
 * encodePermissions([
 *   1, // `0x0000000000000000000000000000000000000000000000000000000000000001` - CHANGEOWNER
 *   2, // `0x0000000000000000000000000000000000000000000000000000000000000002` - ADDCONTROLLER
 *   4, // `0x0000000000000000000000000000000000000000000000000000000000000004` - EDITPERMISSIONS
 * ]) //=> `0x0000000000000000000000000000000000000000000000000000000000000007`
 * ```
 */
export function encodePermissions(permissions: (bigint | number | boolean | string)[]) {
    let result = BigInt(0);

    permissions.forEach((permission: bigint | number | boolean | string, index) => {
        if (typeof permission === 'string') {
            if (!isHexString(permission)) {
                if (LSP6Permissions[permission]) {
                    const permissionAsBN = BigInt(LSP6Permissions[permission]);
                    result |= BigInt(permissionAsBN);
                    return;
                }

                throw new Error(`Permission: '${permission}' is not a hex string.`);
            }
        } else if (typeof permission === 'boolean') {
            const permissionAsBN = BigInt(permission);
            result |= BigInt(permissionAsBN) << BigInt(index);
            return;
        }

        const permissionAsBN = BigInt(permission);
        result |= BigInt(permissionAsBN);
    });

    return toBeHex(result, 32);
}
