npx typechain --target=ethers-v6 --out-dir \
    src/typechain \
    ./node_modules/@erc725/smart-contracts/artifacts/ERC725Y.json \
    ./node_modules/@lukso/lsp-smart-contracts/artifacts/LSP23LinkedContractsFactory.json \
    ./node_modules/@lukso/lsp-smart-contracts/artifacts/UniversalProfileInit.json \
    ./node_modules/@lukso/lsp-smart-contracts/artifacts/LSP6KeyManagerInit.json
