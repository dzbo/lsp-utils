# Module: LSP12

## LSP12

### addIssuedAssets

▸ **addIssuedAssets**(`issuer`, `newIssuedAssets`): `Promise`\<`void`\>

Add LSP12 Issued Assets to a issuer contract that supports ERC725Y.

#### Parameters

| Name              | Type             | Description                                                                                  |
| :---------------- | :--------------- | :------------------------------------------------------------------------------------------- |
| `issuer`          | `ERC725Y`        | -                                                                                            |
| `newIssuedAssets` | `DigitalAsset`[] | An array of issued assets which specifies the address and interface id of each issued asset. |

#### Returns

`Promise`\<`void`\>

**`Since`**

v0.0.2

**`Throws`**

-   When `newIssuedAssets` is an empty array.
-   When `issuerAddress` is not a valid address.
-   When the contract deployed at `issuerAddress` address does not support the `ERC725Y` interface id.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-12-IssuedAssets.md

#### Defined in

[LSP12/addIssuedAssets/addIssuedAssets.ts:36](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP12/addIssuedAssets/addIssuedAssets.ts#L36)

▸ **addIssuedAssets**(`issuer`, `newIssuedAssets`, `signer`): `Promise`\<`void`\>

#### Parameters

| Name              | Type                 |
| :---------------- | :------------------- |
| `issuer`          | `ERC725Y`            |
| `newIssuedAssets` | `DigitalAsset`[]     |
| `signer`          | `Signer` \| `Wallet` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[LSP12/addIssuedAssets/addIssuedAssets.ts:40](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP12/addIssuedAssets/addIssuedAssets.ts#L40)

▸ **addIssuedAssets**(`issuer`, `newIssuedAssets`, `signer`): `Promise`\<`void`\>

#### Parameters

| Name              | Type                 |
| :---------------- | :------------------- |
| `issuer`          | `BytesLike`          |
| `newIssuedAssets` | `DigitalAsset`[]     |
| `signer`          | `Signer` \| `Wallet` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[LSP12/addIssuedAssets/addIssuedAssets.ts:45](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP12/addIssuedAssets/addIssuedAssets.ts#L45)

---

### getIssuedAssets

▸ **getIssuedAssets**(`issuer`): `Promise`\<`DigitalAsset`[]\>

Get the LSP12 Issued Assets of a issuer contract that supports ERC725Y.

#### Parameters

| Name     | Type      |
| :------- | :-------- |
| `issuer` | `ERC725Y` |

#### Returns

`Promise`\<`DigitalAsset`[]\>

An array of Digital Assets.

**`Since`**

v0.0.2

**`Throws`**

-   When `issuerAddress` is not a valid address.
-   When the contract deployed at `issuerAddress` address does not support the `ERC725Y` interface id.
-   When the length for `LSP12IssuedAssets[]` is not a valid LSP2 array length value.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-12-IssuedAssets.md

#### Defined in

[LSP12/getIssuedAssets/getIssuedAssets.ts:32](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP12/getIssuedAssets/getIssuedAssets.ts#L32)

▸ **getIssuedAssets**(`issuer`, `provider`): `Promise`\<`DigitalAsset`[]\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `issuer`   | `ERC725Y`  |
| `provider` | `Provider` |

#### Returns

`Promise`\<`DigitalAsset`[]\>

#### Defined in

[LSP12/getIssuedAssets/getIssuedAssets.ts:33](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP12/getIssuedAssets/getIssuedAssets.ts#L33)

▸ **getIssuedAssets**(`issuer`, `provider`): `Promise`\<`DigitalAsset`[]\>

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `issuer`   | `BytesLike` |
| `provider` | `Provider`  |

#### Returns

`Promise`\<`DigitalAsset`[]\>

#### Defined in

[LSP12/getIssuedAssets/getIssuedAssets.ts:34](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP12/getIssuedAssets/getIssuedAssets.ts#L34)

---

### removeIssuedAssets

▸ **removeIssuedAssets**(`issuer`): `Promise`\<`void`\>

Remove the LSP12 Issued Assets of a issuer contract that supports ERC725Y.

#### Parameters

| Name     | Type      |
| :------- | :-------- |
| `issuer` | `ERC725Y` |

#### Returns

`Promise`\<`void`\>

**`Since`**

v0.0.2

**`Throws`**

-   When `issuerAddress` is not a valid address.
-   When the contract deployed at `issuerAddress` address does not support the `ERC725Y` interface id.
-   When there are no `LSP12IssuedAssets[]` in the issuer storage.
-   When the length for `LSP12IssuedAssets[]` is not a valid LSP2 array length value.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-12-IssuedAssets.md

#### Defined in

[LSP12/removeIssuedAssets/removeIssuedAssets.ts:27](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP12/removeIssuedAssets/removeIssuedAssets.ts#L27)

▸ **removeIssuedAssets**(`issuer`, `signer`): `Promise`\<`void`\>

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `issuer` | `ERC725Y`            |
| `signer` | `Signer` \| `Wallet` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[LSP12/removeIssuedAssets/removeIssuedAssets.ts:28](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP12/removeIssuedAssets/removeIssuedAssets.ts#L28)

▸ **removeIssuedAssets**(`issuer`, `signer`): `Promise`\<`void`\>

#### Parameters

| Name     | Type                 |
| :------- | :------------------- |
| `issuer` | `BytesLike`          |
| `signer` | `Signer` \| `Wallet` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[LSP12/removeIssuedAssets/removeIssuedAssets.ts:29](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP12/removeIssuedAssets/removeIssuedAssets.ts#L29)
