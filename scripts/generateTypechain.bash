npx typechain --target=ethers-v6 --out-dir \
    src/typechain/lukso \
    ./node_modules/@lukso/lsp-smart-contracts/artifacts/*.json

npx typechain --target=ethers-v6 --out-dir \
    src/typechain/erc725 \
    ./node_modules/@erc725/smart-contracts/artifacts/*.json

npx typechain --target=ethers-v6 --out-dir \
    src/typechain/openzeppelin \
    ./node_modules/@openzeppelin/contracts/build/contracts/*.json

for FILE in src/typechain/**/*.ts;
do
echo '// @ts-nocheck' | cat - $FILE > temp && mv temp $FILE
done

for FILE in src/typechain/***/**/*.ts;
do
echo '// @ts-nocheck' | cat - $FILE > temp && mv temp $FILE
done
