[@lukso/lsp-smart-contracts-utils](README.md) / Exports

# @lukso/lsp-smart-contracts-utils

## Table of contents

### Interfaces

- [LSP3ProfileMetadata](interfaces/LSP3ProfileMetadata.md)

### Variables

- [defaultIpfsGateway](modules.md#defaultipfsgateway)
- [defaultLSP3ProfileMetadata](modules.md#defaultlsp3profilemetadata)

### Functions

- [createValidityTimestamp](modules.md#createvaliditytimestamp)
- [decodeAllowedCalls](modules.md#decodeallowedcalls)
- [decodeAllowedERC725YDataKeys](modules.md#decodeallowederc725ydatakeys)
- [decodeAssetUrl](modules.md#decodeasseturl)
- [decodeJsonUrl](modules.md#decodejsonurl)
- [encodeAllowedCalls](modules.md#encodeallowedcalls)
- [encodeAllowedERC725YDataKeys](modules.md#encodeallowederc725ydatakeys)
- [encodeAssetUrl](modules.md#encodeasseturl)
- [encodeJsonUrl](modules.md#encodejsonurl)
- [generateArrayElementKeyAtIndex](modules.md#generatearrayelementkeyatindex)
- [generateArrayKey](modules.md#generatearraykey)
- [generateMappingKey](modules.md#generatemappingkey)
- [generateMappingWithGroupingKey](modules.md#generatemappingwithgroupingkey)
- [generateReceivedAssetKeys](modules.md#generatereceivedassetkeys)
- [generateSentAssetKeys](modules.md#generatesentassetkeys)
- [generateSingletonKey](modules.md#generatesingletonkey)
- [getProfileMetadata](modules.md#getprofilemetadata)
- [isCompactBytesArray](modules.md#iscompactbytesarray)
- [isProfileMetadata](modules.md#isprofilemetadata)
- [isValidArrayLengthValue](modules.md#isvalidarraylengthvalue)
- [removeElementFromArrayAndMap](modules.md#removeelementfromarrayandmap)
- [removeLastElementFromArrayAndMap](modules.md#removelastelementfromarrayandmap)
- [validateIpfsUrl](modules.md#validateipfsurl)

## IPFS

### validateIpfsUrl

▸ **validateIpfsUrl**(`url`, `ipfsGateway?`): `string`

Returns a valid URL. If it is an IPFS URL (E.g. `ipfs://{hash}`), the IPFS Gateway will be used to generate a valid link. Otherwise the link is returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL that is to be validated. |
| `ipfsGateway?` | `string` | The IPFS Gateway to be used for IPFS URLs. |

#### Returns

`string`

**`Since`**

v0.0.1

**`Example`**

```ts
validateIpfsUrl('ipfs://{hash}') //=> 'https://2eff.lukso.dev/ipfs/{hash}'
validateIpfsUrl('https://google.com/something') //=> 'https://google.com/something'
validateIpfsUrl('') //=> ''
```

#### Defined in

[IPFS/validateIpfsUrl.ts:15](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/IPFS/validateIpfsUrl.ts#L15)

## LSP2

### decodeAssetUrl

▸ **decodeAssetUrl**(`assetUrlValue`): `Object`

Decode a JSONURL value content.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `assetUrlValue` | `BytesLike` | The encoded value as `{ "valueContent": "ASSETURL" }`. |

#### Returns

`Object`

```
{
  // The hash digest of the function used to hash the JSON file.
  "hashFunction": string
  // the hashed bytes value of the JSON file.
  "json": string
  // The URL where the JSON file is hosted.
  "url": string
}
```

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `hashFunction` | `string` |
| `url` | `string` |

**`Since`**

v0.0.1

**`Throws`**

When `assetUrlValue` his composed of less than 36 bytes.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```
decodeAssetUrl("0x6f357c6a2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c053568747470733a2f2f676f6f676c652e636f6d2f") //=>
// {
//   hashFunction: "0x6f357c6a",
//   hash: "0x2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c0535",
//   url: "https://google.com/"
// }
```

#### Defined in

[LSP2/decodeAssetUrl.ts:35](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/decodeAssetUrl.ts#L35)

___

### decodeJsonUrl

▸ **decodeJsonUrl**(`jsonUrlValue`): `Object`

Decode a JSONURL value content.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `jsonUrlValue` | `BytesLike` | The encoded value as `{ "valueContent": "JSONURL" }`. |

#### Returns

`Object`

```
{
  // The hash digest of the function used to hash the JSON file.
  "hashFunction": string
  // the hashed bytes value of the JSON file.
  "json": string
  // The URL where the JSON file is hosted.
  "url": string
}
```

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `hashFunction` | `string` |
| `url` | `string` |

**`Since`**

v0.0.1

**`Throws`**

When `jsonUrlValue` his composed of less than 36 bytes.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```
decodeJsonUrl("0x6f357c6a4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a4184968747470733a2f2f676f6f676c652e636f6d2f") //=>
// {
//   hashFunction: "0x6f357c6a",
//   hash: "0x4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a41849",
//   url: "https://google.com/"
// }
```

#### Defined in

[LSP2/decodeJsonUrl.ts:35](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/decodeJsonUrl.ts#L35)

___

### encodeAssetUrl

▸ **encodeAssetUrl**(`hashFunction`, `assetBytes`, `url`): `string`

Generate a ASSETURL value content.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hashFunction` | `string` | The function used to hash the JSON file. |
| `assetBytes` | `string` | Bytes value of the JSON file. |
| `url` | `string` | The URL where the JSON file is hosted. |

#### Returns

`string`

The encoded value as an `ASSETURL`.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
encodeAssetUrl(
  "keccak256(utf8)",
  "{\"name\":\"USDStablecoin\",\"description\":\"Some random description about the token USD Stablecoin\"}",
  "https://google.com/"
) //=> "0x6f357c6a2a04850096912391bbb0966a624519e8f5d797df2a2c47425e892c25e00c053568747470733a2f2f676f6f676c652e636f6d2f"
```

#### Defined in

[LSP2/encodeAssetUrl.ts:23](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/encodeAssetUrl.ts#L23)

___

### encodeJsonUrl

▸ **encodeJsonUrl**(`hashFunction`, `json`, `url`): `string`

Encode a JSONURL value content.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hashFunction` | `string` | The function used to hash the JSON file. |
| `json` | `string` | Bytes value of the JSON file. |
| `url` | `string` | The URL where the JSON file is hosted. |

#### Returns

`string`

The encoded value as an `JSONURL`.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
encodeJsonUrl(
  "keccak256(utf8)",
  "{\"name\":\"Tom\",\"description\":\"Some random description about Tom\"}",
  "https://google.com/"
) //=> "0x6f357c6a4dade694d7dd4081f46073e99ce898a9b53cf6988452904de7db5cc704a4184968747470733a2f2f676f6f676c652e636f6d2f"
```

#### Defined in

[LSP2/encodeJsonUrl.ts:23](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/encodeJsonUrl.ts#L23)

___

### generateArrayElementKeyAtIndex

▸ **generateArrayElementKeyAtIndex**(`arrayKey`, `index`): `string`

Generates a data key of `{ "keyType": "Array" }` at a specific `index`. `arrayKey` can have the following values:
1. An array data key, 32 bytes hex value.
2. An array data key name of type `dataKeyName[]` that will be used to generate an array data key using `generateArrayKey(arrayKey)`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrayKey` | `string` | The Array data key from which to generate the Array data key at a specific `index`. |
| `index` | `number` | The index number in the `arrayKey`. |

#### Returns

`string`

The generated `bytes32` data key of key type Array at a specific `index`.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
- generateSingletonKey(arrayDataKeyName, index) //=> `<bytes16(keccak256(arrayDataKeyName))>:<bytes16(index)>`
- generateSingletonKey(arrayDataKey, index) //=> `<bytes16(arrayDataKey)>:<bytes16(index)>`
```

#### Defined in

[LSP2/generateArrayElementKeyAtIndex.ts:22](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/generateArrayElementKeyAtIndex.ts#L22)

___

### generateArrayKey

▸ **generateArrayKey**(`arrayKeyName`): `string`

Generates a data key of `{ "keyType": "Array" }` by hashing `arrayKeyName`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrayKeyName` | `string` | The string that will be used to generate a data key of key type Array. |

#### Returns

`string`

The generated `bytes32` data key of key type Array.

**`Since`**

v0.0.1

**`Throws`**

`keyName` has less than 2 characters.

**`Throws`**

`keyName` does not include square brackets `"[]"` at the end of the string.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
generateArrayKey("RandomArrayDataKey[]") //=> keccak256("RandomArrayDataKey[]") = "0x6e9974ec39571e80dcc2ab1fac99097b03bb4617b071cd519a23d38f88f28ffb"
```

#### Defined in

[LSP2/generateArrayKey.ts:20](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/generateArrayKey.ts#L20)

___

### generateMappingKey

▸ **generateMappingKey**(`firstPart`, `lastPart`): `string`

Generates a data key of `{ "keyType": "Mapping" }` that map `firstPart` to `lastPart`.

`firstPart` can have the following values:
1. A 10 bytes hex value.
2. A hex value that will be hashed (first 10 bytes will be used).
2. A UTF8 string that will be hashed (first 10 bytes will be used).

`lastPart` can have the following values:
1. An address.
1. A 20 bytes hex value.
2. A hex value that will be hashed (first 20 bytes will be used).
2. A UTF8 string that will be hashed (first 20 bytes will be used).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `firstPart` | `string` | The word to retrieve the first 10 bytes of its hash. |
| `lastPart` | `string` | The word to retrieve the first 10 bytes of its hash. |

#### Returns

`string`

The generated `bytes32` data key of key type Mapping that map `firstPart` to a specific `lastPart`.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
- generateMappingKey(firstWord, lastWord)
//=>`<bytes10(keccak256(firstWord))>:<0000>:<bytes20(keccak256(lastWord))>`

- generateMappingKey(firstWord, bytes20value)
//=>`<bytes10(keccak256(firstWord))>:<0000>:<bytes20value>`

- generateMappingKey(bytes10Value, lastWord)
//=>`<bytes10Value>:<0000>:<bytes20(keccak256(lastWord))>`

- generateMappingKey(bytes10Value, bytes20value)
//=>`<bytes10Value>:<0000>:<bytes20value>`
```

#### Defined in

[LSP2/generateMappingKey.ts:39](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/generateMappingKey.ts#L39)

___

### generateMappingWithGroupingKey

▸ **generateMappingWithGroupingKey**(`firstPart`, `middlePart`, `lastPart`): `string`

Generates a data key of `{ "keyType": "MappingWithGrouping" }` that map `firstPart` to `middlePart` and to `lastPart`.

`firstPart` can have the following values:
1. A 6 bytes hex value.
2. A hex value that will be hashed (first 6 bytes will be used).
2. A UTF8 string that will be hashed (first 6 bytes will be used).

`middlePart` can have the following values:
1. A 4 bytes hex value.
2. A hex value that will be hashed (first 4 bytes will be used).
2. A UTF8 string that will be hashed (first 4 bytes will be used).

`lastPart` can have the following values:
1. An address.
1. A 20 bytes hex value.
2. A hex value that will be hashed (first 20 bytes will be used).
2. A UTF8 string that will be hashed (first 20 bytes will be used).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `firstPart` | `string` | The word to retrieve the first 6 bytes of its hash. |
| `middlePart` | `string` | The word to retrieve the first 4 bytes of its hash. |
| `lastPart` | `string` | The word to retrieve the first 20 bytes of its hash. |

#### Returns

`string`

The generated `bytes32` data key of key type MappingWithGrouping that map a `firstWord` to a `secondWord` to a specific address `addr`.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
- generateMappingWithGroupingKey(firstWord, middleWord, lastWord)
//=> `<bytes6(keccak256(firstWord))>:<bytes4(keccak256(middleWord))>:<0000>:<bytes20(keccak256(lastWord))>`

- generateMappingWithGroupingKey(firstWord, middleWord, bytes20Value)
//=> `<bytes6(keccak256(firstWord))>:<bytes4(keccak256(middleWord))>:<0000>:<bytes20Value>`

- generateMappingWithGroupingKey(firstWord, bytes4Value, lastWord)
//=> `<bytes6(keccak256(firstWord))>:<bytes4Value>:<0000>:<bytes20(keccak256(lastWord))>`

- generateMappingWithGroupingKey(firstWord, bytes4Value, bytes20Value)
//=> `<bytes6(keccak256(firstWord))>:<bytes4Value>:<0000>:<bytes20Value>`

- generateMappingWithGroupingKey(bytes6Value, middleWord, lastWord)
//=> `<bytes6Value>:<bytes4(keccak256(middleWord))>:<0000>:<bytes20(keccak256(lastWord))>`

- generateMappingWithGroupingKey(bytes6Value, middleWord, bytes20Value)
//=> `<bytes6Value>:<bytes4(keccak256(middleWord))>:<0000>:<bytes20Value>`

- generateMappingWithGroupingKey(bytes6Value, bytes4Value, lastWord)
//=> `<bytes6Value>:<bytes4Value>:<0000>:<bytes20(keccak256(lastWord))>`

- generateMappingWithGroupingKey(bytes6Value, bytes4Value, bytes20Value)
//=> `<bytes6Value>:<bytes4Value>:<0000>:<bytes20Value>`
```

#### Defined in

[LSP2/generateMappingWithGroupingKey.ts:57](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/generateMappingWithGroupingKey.ts#L57)

___

### generateSingletonKey

▸ **generateSingletonKey**(`keyName`): `string`

Generates a data key of `{ "keyType": "Singleton" }` by hashing the string `keyName`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyName` | `string` | The string to hash to generate a Singleton data key. |

#### Returns

`string`

The generated `bytes32` data key of key type Singleton.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
generateSingletonKey("RandomDataKey") //=> keccak256("RandomKeyName") = "0xb0c92ac98a2a422f33a3e130e3fa6e922195f0a0a99199963814012351f906cb"
```

#### Defined in

[LSP2/generateSingletonKey.ts:17](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/generateSingletonKey.ts#L17)

___

### isCompactBytesArray

▸ **isCompactBytesArray**(`compactBytesArray`): `boolean`

Verify if `data` is a valid array of value encoded as a `CompactBytesArray` according to the LSP2 `CompactBytesArray` valueType specification.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `compactBytesArray` | `BytesLike` | The bytes value to verify. |

#### Returns

`boolean`

`true` if the `data` is correctly encoded CompactBytesArray, `false` otherwise.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
- isCompactBytesArray("0x0002cafe000abeefdeadbeef0000cafe") //=> true
- isCompactBytesArray("0x0002cafecafe000abeefdeadbeef0000cafe") //=> false
- isCompactBytesArray("0x0002") //=> false
```

#### Defined in

[LSP2/isCompactBytesArray.ts:19](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/isCompactBytesArray.ts#L19)

___

### isValidArrayLengthValue

▸ **isValidArrayLengthValue**(`arrayLength`): `boolean`

Validates if the bytes `arrayLength` are exactly 16 bytes long, and are of the exact size of an LSP2 Array length value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrayLength` | `BytesLike` | Plain bytes that should be validated. |

#### Returns

`boolean`

`true` if the value is 16 bytes long, `false` otherwise.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
- isValidArrayLengthValue("0x00000000000000000000000000000001") //=> true
- isValidArrayLengthValue("0x00000000000000000000000000000a3b") //=> true
- isValidArrayLengthValue("0x000000000000000000000000004a") //=> false
- isValidArrayLengthValue("0x0000000000000000000000000000000000f60a") //=> false
```

#### Defined in

[LSP2/isValidArrayLengthValue.ts:20](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/isValidArrayLengthValue.ts#L20)

___

### removeElementFromArrayAndMap

▸ **removeElementFromArrayAndMap**(`erc725YContract`, `arrayKey`, `newArrayLength`, `removedElementIndexKey`, `removedElementIndex`, `removedElementMapKey`): `Promise`<{ `dataKeys`: `BytesLike`[] ; `dataValues`: `BytesLike`[]  }\>

Generates Data Key/Value pairs for removing an element from an LSP2 Array and a mapping Data Key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `erc725YContract` | `UniversalProfile` | The ERC725Y contract. |
| `arrayKey` | `BytesLike` | The Data Key of Key Type Array. |
| `newArrayLength` | `number` | The new Array Length for the `arrayKey`. |
| `removedElementIndexKey` | `BytesLike` | The Data Key of Key Type Array Index for the removed element. |
| `removedElementIndex` | `number` | the index of the removed element. |
| `removedElementMapKey` | `BytesLike` | The Data Key of a mapping to be removed. |

#### Returns

`Promise`<{ `dataKeys`: `BytesLike`[] ; `dataValues`: `BytesLike`[]  }\>

A set of data keys & data values that can be used to update an array and map in ERC725Y storage.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
- removeLastElementFromArrayAndMap(...) //=> { dataKeys: BytesLike[], dataValues: BytesLike[] }
```

#### Defined in

[LSP2/removeElementFromArrayAndMap.ts:28](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/removeElementFromArrayAndMap.ts#L28)

___

### removeLastElementFromArrayAndMap

▸ **removeLastElementFromArrayAndMap**(`arrayKey`, `newArrayLength`, `removedElementIndexKey`, `removedElementMapKey`): `Object`

Generates Data Key/Value pairs for removing the last element from an LSP2 Array and a mapping Data Key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arrayKey` | `BytesLike` | The Data Key of Key Type Array. |
| `newArrayLength` | `number` | The new Array Length for the `arrayKey`. |
| `removedElementIndexKey` | `BytesLike` | The Data Key of Key Type Array Index for the removed element. |
| `removedElementMapKey` | `BytesLike` | The Data Key of a mapping to be removed. |

#### Returns

`Object`

A set of data keys & data values that can be used to update an array and map in ERC725Y storage.

| Name | Type |
| :------ | :------ |
| `dataKeys` | `BytesLike`[] |
| `dataValues` | `BytesLike`[] |

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-2-ERC725YJSONSchema.md

**`Example`**

```ts
- removeLastElementFromArrayAndMap(...) //=> { dataKeys: BytesLike[], dataValues: BytesLike[] }
```

#### Defined in

[LSP2/removeLastElementFromArrayAndMap.ts:20](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP2/removeLastElementFromArrayAndMap.ts#L20)

## LSP3

### getProfileMetadata

▸ **getProfileMetadata**(`unviersalProfile`): `Promise`<[`LSP3ProfileMetadata`](interfaces/LSP3ProfileMetadata.md)\>

Returns a object of type LSP3ProfileMetadata.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unviersalProfile` | `UniversalProfile` | The instance of a Unviersal Profile contract. |

#### Returns

`Promise`<[`LSP3ProfileMetadata`](interfaces/LSP3ProfileMetadata.md)\>

**`Since`**

v0.0.1

**`Throws`**

When the fetched data is not `LSP3ProfileMetadata`.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md

**`Example`**

```
getMetadata(UniversalProfile) //=>
// {
//   LSP3Profile: {
//     description: "",
//     links: [],
//     name: "",
//     tags: []
//   }
// }
```

#### Defined in

[LSP3/getProfileMetadata.ts:42](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP3/getProfileMetadata.ts#L42)

___

### isProfileMetadata

▸ **isProfileMetadata**(`object`): object is LSP3ProfileMetadata

Returns `true` is the passed object is an LSP3 Profile Metadata, `false` otherwise.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `any` | The object that is to be checked. |

#### Returns

object is LSP3ProfileMetadata

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-Profile-Metadata.md

**`Example`**

```
isProfileMetadata({ LSP3Profile: { description: "", links: [], name: "", tags: [] } }) //=> true
isProfileMetadata({ description: "", links: [], name: "", tags: [] }) //=> false
```

#### Defined in

[LSP3/isProfileMetadata.ts:16](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP3/isProfileMetadata.ts#L16)

## LSP5

### generateReceivedAssetKeys

▸ **generateReceivedAssetKeys**(`erc725YContract`, `assetAddress`, `assetInterfaceId`): `Promise`<{ `lsp5DataKeys`: `BytesLike`[] ; `lsp5DataValues`: `BytesLike`[]  }\>

Generate an array of Data Key/Value pairs to be set on the receiver address after receiving assets.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `erc725YContract` | `UniversalProfile` | The contract instance of the asset reciever. |
| `assetAddress` | `BytesLike` | The address of the asset being received (_e.g: an LSP7 or LSP8 token_). |
| `assetInterfaceId` | `BytesLike` | The interfaceID of the asset being received. |

#### Returns

`Promise`<{ `lsp5DataKeys`: `BytesLike`[] ; `lsp5DataValues`: `BytesLike`[]  }\>

A set of LSP5 data keys & data values that can be used to update an array and map in ERC725Y storage.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md

**`Example`**

```ts
- generateReceivedAssetKeys(...) //=> { lsp5DataKeys: BytesLike[], lsp5DataValues: BytesLike[] }
```

#### Defined in

[LSP5/generateReceivedAssetKeys.ts:30](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP5/generateReceivedAssetKeys.ts#L30)

___

### generateSentAssetKeys

▸ **generateSentAssetKeys**(`erc725YContract`, `assetAddress`): `Promise`<{ `dataKeys`: `BytesLike`[] ; `dataValues`: `BytesLike`[]  }\>

Generate an array of Data Key/Value pairs to be set on the sender address after sending assets.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `erc725YContract` | `UniversalProfile` | The contract instance of the asset sender. |
| `assetAddress` | `BytesLike` | The address of the asset that is being sent. |

#### Returns

`Promise`<{ `dataKeys`: `BytesLike`[] ; `dataValues`: `BytesLike`[]  }\>

A set of LSP5 data keys & data values that can be used to update an array and map in ERC725Y storage.

**`Since`**

v0.0.1

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-5-ReceivedAssets.md

**`Example`**

```ts
- generateSentAssetKeys(...) //=> { lsp5DataKeys: BytesLike[], lsp5DataValues: BytesLike[] }
```

#### Defined in

[LSP5/generateSentAssetKeys.ts:32](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP5/generateSentAssetKeys.ts#L32)

## LSP6

### createValidityTimestamp

▸ **createValidityTimestamp**(`startingTimestamp`, `endingTimestamp`): `string`

Create a `validityTimestamp` that can be used in `LSP6.executeRelayCall(...)`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `startingTimestamp` | `BigNumberish` | The timestamp after which a relay call can be executed. |
| `endingTimestamp` | `BigNumberish` | The timestamp after which a relay call cannot be executed. |

#### Returns

`string`

A hex value of 32 bytes that contains both starting & ending timestamps.

**`Since`**

v0.0.1

**`Throws`**

When teh bytes value of either `startingTimestamp` or `endingTimestamp` exceeds 16 bytes.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md

**`Example`**

```
createValidityTimestamp(5, 10) //=> `0x000000000000000000000000000000050000000000000000000000000000000a`
```

#### Defined in

[LSP6/createValidityTimestamp.ts:21](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP6/createValidityTimestamp.ts#L21)

___

### decodeAllowedCalls

▸ **decodeAllowedCalls**(`allowedCalls`): `Object`

Decode AllowedCalls encoded as `{ "valueType": "bytes32[CompactBytesArray]" }`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `allowedCalls` | `BytesLike` | A list of allowed calls as `{ "valueType": "bytes32[CompactBytesArray]" }`. |

#### Returns

`Object`

The allowed interactions, addresses, functions and standards that were encoded.

| Name | Type |
| :------ | :------ |
| `allowedAddresses` | `BytesLike`[] |
| `allowedFunctions` | `BytesLike`[] |
| `allowedInteractions` | `BytesLike`[] |
| `allowedStandards` | `BytesLike`[] |

**`Since`**

v0.0.1

**`Throws`**

- When the value of `allowedCalls` is not hex.
- When the bytes length of any allowed call is different from 32.
- When the length of an element reaches past the length of `allowedCalls`

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md

**`Example`**

```
decodeAllowedCalls("0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c002000000003cafecafecafecafecafecafecafecafecafecafe24871b3d44c028fe") //=>
// {
//   allowedInteractions: ["0x00000002", "0x00000003"],
//   allowedAddresses: ["0xcafecafecafecafecafecafecafecafecafecafe", "0xcafecafecafecafecafecafecafecafecafecafe"],
//   allowedStandards: ["0x24871b3d", "0x24871b3d"],
//   allowedFunctions: ["0x7f23690c", "0x44c028fe"],
// }

decodeAllowedCalls("0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c") //=>
// {
//   allowedInteractions: ["0x00000002"],
//   allowedAddresses: ["0xcafecafecafecafecafecafecafecafecafecafe"],
//   allowedStandards: ["0x24871b3d"],
//   allowedFunctions: ["0x7f23690c"],
// }
```

#### Defined in

[LSP6/decodeAllowedCalls.ts:37](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP6/decodeAllowedCalls.ts#L37)

___

### decodeAllowedERC725YDataKeys

▸ **decodeAllowedERC725YDataKeys**(`allowedERC725YDataKeys`): `BytesLike`[]

Decode AllowedERC725YDataKeys encoded as `{ "valueType": "bytes[CompactBytesArray]" }`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `allowedERC725YDataKeys` | `BytesLike` | A list of allowed calls as `{ "valueType": "bytes[CompactBytesArray]" }`. |

#### Returns

`BytesLike`[]

The allowed ERC725Y data keys that were encoded.

**`Since`**

v0.0.1

**`Throws`**

- When the value of `allowedERC725YDataKeys` is not hex.
- When the bytes length of any allowed ERC725Y data key is 0 or bigger than 32.
- When the length of an element reaches past the length of `allowedERC725YDataKeys`

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md

**`Example`**

```
decodeAllowedERC725YDataKeys("0x0002cafe000abeefdeadbeef0000cafe") //=>
// [
//   "0xcafe",
//   "0xbeefdeadbeef0000cafe"
// ]
```

#### Defined in

[LSP6/decodeAllowedERC725YDataKeys.ts:27](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP6/decodeAllowedERC725YDataKeys.ts#L27)

___

### encodeAllowedCalls

▸ **encodeAllowedCalls**(`allowedInteractions`, `allowedAddresses`, `allowedStandards`, `allowedFunctions`): `string`

Enocde a list of data keys as `{ "valueType": "bytes32[CompactBytesArray]" }`. The result can be user for `AddressPermissions:AllowedCalls:<address>`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `allowedInteractions` | `BytesLike`[] | A list of allowed interactions. |
| `allowedAddresses` | `BytesLike`[] | A list of allowed addresses. |
| `allowedStandards` | `BytesLike`[] | A list of allowed standards. |
| `allowedFunctions` | `BytesLike`[] | A list of allowed functions. |

#### Returns

`string`

The compacted array of allowed calls as `{ "valueType": "bytes32[CompactBytesArray]" }`.

**`Since`**

v0.0.1

**`Throws`**

- When the arrays passed as parameters don't have the same length.
- When one of `allowedInteractions[index]` has a bytes length different from 4.
- When one of `allowedAddresses[index]` has a bytes length different from 20.
- When one of `allowedStandards[index]` has a bytes length different from 4.
- When one of `allowedFunctions[index]` has a bytes length different from 4.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md

**`Example`**

```
encodeAllowedCalls(
  ["0x00000002", "0x00000003"],
  ["0xcafecafecafecafecafecafecafecafecafecafe", "0xcafecafecafecafecafecafecafecafecafecafe"]
  ["0x24871b3d", "0x24871b3d"],
  ["0x7f23690c", "0x44c028fe"],
) //=> "0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c002000000003cafecafecafecafecafecafecafecafecafecafe24871b3d44c028fe"
encodeAllowedCalls(
  ["0x00000002"],
  ["0xcafecafecafecafecafecafecafecafecafecafe"]
  ["0x24871b3d"],
  ["0x7f23690c"],
) //=> "0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c"
```

#### Defined in

[LSP6/encodeAllowedCalls.ts:39](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP6/encodeAllowedCalls.ts#L39)

___

### encodeAllowedERC725YDataKeys

▸ **encodeAllowedERC725YDataKeys**(`dataKeys`): `string`

Enocde a list of data keys as `{ "valueType": "bytes[CompactBytesArray]" }`. The result can be user for `AddressPermissions:AllowedERC725YDataKeys:<address>`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dataKeys` | `BytesLike`[] | A list of data keys. |

#### Returns

`string`

The compacted array of data keys as `{ "valueType": "bytes[CompactBytesArray]" }`.

**`Since`**

v0.0.1

**`Throws`**

- When one of `dataKeys[index]` is not hex.
- When one of `dataKeys[index]` has a length of 0 bytes or bigger thsn 32 bytes.

**`See`**

https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-6-KeyManager.md

**`Example`**

```
encodeAllowedERC725YDataKeys([
  "0xcafe",
  "0xbeefdeadbeef0000cafe"
]) //=> "0x0002cafe000abeefdeadbeef0000cafe"
```

#### Defined in

[LSP6/encodeAllowedERC725YDataKeys.ts:25](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/LSP6/encodeAllowedERC725YDataKeys.ts#L25)

## Other

### defaultIpfsGateway

• `Const` **defaultIpfsGateway**: ``"https://2eff.lukso.dev/ipfs/"``

#### Defined in

[constants/index.ts:33](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/constants/index.ts#L33)

___

### defaultLSP3ProfileMetadata

• `Const` **defaultLSP3ProfileMetadata**: [`LSP3ProfileMetadata`](interfaces/LSP3ProfileMetadata.md)

#### Defined in

[constants/index.ts:24](https://github.com/lukso-network/lsp-smart-contracts-utils/blob/5cc91da/src/constants/index.ts#L24)
