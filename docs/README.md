@lukso/lsp-smart-contracts-utils / [Exports](modules.md)

# LSP Utils &middot; [![npm version](https://img.shields.io/npm/v/@lukso/lsp-smart-contracts-utils.svg?style=flat)](https://www.npmjs.com/package/@lukso/lsp-smart-contracts-utils)

This package was created with the intent to help developers to use `@lukso/lsp-smart-contracts`. Its purpose is to provide a series of helper functions for each LSP.

-   For more information on LSPs see [Documentation](https://docs.lukso.tech/standards/smart-contracts/introduction) on _[docs.lukso.tech](https://docs.lukso.tech/standards/introduction)._
-   For more information on LIPs see [Specification](https://github.com/lukso-network/LIPs)

| :warning: | _This package is currently in early stages of development,<br/> use for testing or experimentation purposes only._ |
| :-------: | :----------------------------------------------------------------------------------------------------------------- |

## Installation

### npm

`@lukso/lsp-smart-contracts-utils` is available as a [npm package](https://www.npmjs.com/package/@lukso/lsp-smart-contracts-utils).

```bash
npm install @lukso/lsp-smart-contracts-utils
```

### cloning the repository

Alternatively you can also clone the repository and install its dependencies to start using the smart contracts.

```bash
$ git clone https://github.com/lukso-network/lsp-smart-contracts-utils.git
$ cd ./lsp-utils
$ npm install
```

## Usage

### in Javascript

You can use the utils by importing them as follow:

#### ES6 Modules:

```javascript
import { encodeAllowedCalls } from '@lukso/lsp-smart-contracts-utils/dist/lib/es6';

const allowedCalls = encodeAllowedCalls(
    allowedInteractions,
    allowedAddresses,
    allowedStandards,
    allowedFunctions,
);
```

#### CommonJS

```javascript
cosnt { encodeAllowedCalls } = require('@lukso/lsp-smart-contracts-utils/dist/lib/es5');

const allowedCalls = encodeAllowedCalls(
    allowedInteractions,
    allowedAddresses,
    allowedStandards,
    allowedFunctions
);
```

## Documentation

For more informations check the [`docs`](https://github.com/lukso-network/lsp-smart-contracts-utils/tree/develop/docs) folder
