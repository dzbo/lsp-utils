# Module: LSP4

## LSP4

### addDigitalAssetCreators

▸ **addDigitalAssetCreators**(`digitalAsset`, `newCreators`): `Promise`\<`void`\>

Add LSP4 Creators to the digital asset contract that supports ERC725Y.

#### Parameters

| Name           | Type       | Description                                                                          |
| :------------- | :--------- | :----------------------------------------------------------------------------------- |
| `digitalAsset` | `ERC725Y`  | -                                                                                    |
| `newCreators`  | `Issuer`[] | An array of creators which specifies the address and interface id of each creatotor. |

#### Returns

`Promise`\<`void`\>

**`Since`**

v0.0.2

**`Throws`**

-   When `newCreators` is an empty array.
-   When `digitalAssetAddress` is not a valid address.
-   When the contract deployed at `digitalAssetAddress` address does not support the `ERC725Y` interface id.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md

#### Defined in

[LSP4/addDigitalAssetCreators/addDigitalAssetCreators.ts:36](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP4/addDigitalAssetCreators/addDigitalAssetCreators.ts#L36)

▸ **addDigitalAssetCreators**(`digitalAsset`, `newCreators`, `signer`): `Promise`\<`void`\>

#### Parameters

| Name           | Type                 |
| :------------- | :------------------- |
| `digitalAsset` | `ERC725Y`            |
| `newCreators`  | `Issuer`[]           |
| `signer`       | `Signer` \| `Wallet` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[LSP4/addDigitalAssetCreators/addDigitalAssetCreators.ts:40](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP4/addDigitalAssetCreators/addDigitalAssetCreators.ts#L40)

▸ **addDigitalAssetCreators**(`digitalAsset`, `newCreators`, `signer`): `Promise`\<`void`\>

#### Parameters

| Name           | Type                 |
| :------------- | :------------------- |
| `digitalAsset` | `BytesLike`          |
| `newCreators`  | `Issuer`[]           |
| `signer`       | `Signer` \| `Wallet` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[LSP4/addDigitalAssetCreators/addDigitalAssetCreators.ts:45](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP4/addDigitalAssetCreators/addDigitalAssetCreators.ts#L45)

---

### getDigitalAssetCreators

▸ **getDigitalAssetCreators**(`digitalAsset`): `Promise`\<`Issuer`[]\>

Get the LSP4 Creators of a digital asset contract that supports ERC725Y.

#### Parameters

| Name           | Type      |
| :------------- | :-------- |
| `digitalAsset` | `ERC725Y` |

#### Returns

`Promise`\<`Issuer`[]\>

An array of Issuers.

**`Since`**

v0.0.2

**`Throws`**

-   When `digitalAssetAddress` is not a valid address.
-   When the contract deployed at `digitalAssetAddress` address does not support the `ERC725Y` interface id.
-   When the length for `LSP4Creators[]` is not a valid LSP2 array length value.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md

#### Defined in

[LSP4/getDigitalAssetCreators/getDigitalAssetCreators.ts:32](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP4/getDigitalAssetCreators/getDigitalAssetCreators.ts#L32)

▸ **getDigitalAssetCreators**(`digitalAsset`, `provider`): `Promise`\<`Issuer`[]\>

#### Parameters

| Name           | Type       |
| :------------- | :--------- |
| `digitalAsset` | `ERC725Y`  |
| `provider`     | `Provider` |

#### Returns

`Promise`\<`Issuer`[]\>

#### Defined in

[LSP4/getDigitalAssetCreators/getDigitalAssetCreators.ts:33](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP4/getDigitalAssetCreators/getDigitalAssetCreators.ts#L33)

▸ **getDigitalAssetCreators**(`digitalAsset`, `provider`): `Promise`\<`Issuer`[]\>

#### Parameters

| Name           | Type        |
| :------------- | :---------- |
| `digitalAsset` | `BytesLike` |
| `provider`     | `Provider`  |

#### Returns

`Promise`\<`Issuer`[]\>

#### Defined in

[LSP4/getDigitalAssetCreators/getDigitalAssetCreators.ts:37](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP4/getDigitalAssetCreators/getDigitalAssetCreators.ts#L37)

---

### removeDigitalAssetCreators

▸ **removeDigitalAssetCreators**(`digitalAsset`): `Promise`\<`void`\>

Remove the LSP4 Creators of a digital asset contract that supports ERC725Y.

#### Parameters

| Name           | Type      |
| :------------- | :-------- |
| `digitalAsset` | `ERC725Y` |

#### Returns

`Promise`\<`void`\>

**`Since`**

v0.0.2

**`Throws`**

-   When `digitalAssetAddress` is not a valid address.
-   When the contract deployed at `digitalAssetAddress` address does not support the `ERC725Y` interface id.
-   When there are no `LSP4Creators[]` in the digital asset storage.
-   When the length for `LSP4Creators[]` is not a valid LSP2 array length value.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-4-DigitalAsset-Metadata.md

#### Defined in

[LSP4/removeDigitalAssetCreators/removeDigitalAssetCreators.ts:27](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP4/removeDigitalAssetCreators/removeDigitalAssetCreators.ts#L27)

▸ **removeDigitalAssetCreators**(`digitalAsset`, `provider`): `Promise`\<`void`\>

#### Parameters

| Name           | Type                 |
| :------------- | :------------------- |
| `digitalAsset` | `ERC725Y`            |
| `provider`     | `Signer` \| `Wallet` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[LSP4/removeDigitalAssetCreators/removeDigitalAssetCreators.ts:28](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP4/removeDigitalAssetCreators/removeDigitalAssetCreators.ts#L28)

▸ **removeDigitalAssetCreators**(`digitalAsset`, `provider`): `Promise`\<`void`\>

#### Parameters

| Name           | Type                 |
| :------------- | :------------------- |
| `digitalAsset` | `BytesLike`          |
| `provider`     | `Signer` \| `Wallet` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[LSP4/removeDigitalAssetCreators/removeDigitalAssetCreators.ts:32](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/main/src/LSP4/removeDigitalAssetCreators/removeDigitalAssetCreators.ts#L32)
