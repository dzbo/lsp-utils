import { ERC725YDataKeys, INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
import { BytesLike, Signer, keccak256, toBeHex, toUtf8Bytes } from 'ethers';
import ERC725 from '@erc725/erc725.js';
import { ethers } from 'hardhat';
import { expect } from 'chai';

// types
import {
    UniversalProfile__factory,
    UniversalProfile,
    LSP7Mintable__factory,
    LSP7Mintable,
} from '../../src/typechain';

// utils
import {
    DigitalAsset,
    addIssuedAssets,
    generateArrayElementKeyAtIndex,
    removeIssuedAssets,
} from '../../src';

describe('removeIssuedAssets', () => {
    let context: {
        issuedAssets: DigitalAsset[];
        universalProfileOwner: Signer;
        universalProfile: UniversalProfile;
        firstIssuedAssetOwner: Signer;
        firstIssuedAsset: LSP7Mintable;
        secondIssuedAssetOwner: Signer;
        secondIssuedAsset: LSP7Mintable;
    };
    before('deploy UP and token contract', async () => {
        const signers = await ethers.getSigners();
        const owner = signers[0];

        const universalProfile = await new UniversalProfile__factory(owner).deploy(owner.address);

        const firstIssuedAsset = await new LSP7Mintable__factory(owner).deploy(
            'FirstTestToken',
            'FTT',
            owner.address,
            true,
        );

        const secondIssuedAsset = await new LSP7Mintable__factory(owner).deploy(
            'SecondTestToken',
            'STT',
            owner.address,
            true,
        );

        context = {
            issuedAssets: [
                {
                    address: await firstIssuedAsset.getAddress(),
                    interfaceId: INTERFACE_IDS.LSP7DigitalAsset,
                },
                {
                    address: await secondIssuedAsset.getAddress(),
                    interfaceId: INTERFACE_IDS.LSP7DigitalAsset,
                },
            ],
            universalProfileOwner: owner,
            universalProfile,
            firstIssuedAssetOwner: owner,
            firstIssuedAsset,
            secondIssuedAssetOwner: owner,
            secondIssuedAsset,
        };
    });

    it('should throw when `issuerAddress` is UTF8', async () => {
        const issuerAddress = 'address';

        await expect(
            removeIssuedAssets(issuerAddress, context.universalProfileOwner),
        ).to.be.rejectedWith(
            `The parameter \`issuerAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${issuerAddress}'`,
        );
    });

    it('should throw when `issuerAddress` is hex bigger than 20 bytes', async () => {
        const issuerAddress = keccak256(toUtf8Bytes('address')).substring(0, 44);

        await expect(
            removeIssuedAssets(issuerAddress, context.universalProfileOwner),
        ).to.be.rejectedWith(
            `The parameter \`issuerAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${issuerAddress}'`,
        );
    });

    it('should throw when `issuerAddress` is hex smaller than 20 bytes', async () => {
        const issuerAddress = keccak256(toUtf8Bytes('address')).substring(0, 40);

        await expect(
            removeIssuedAssets(issuerAddress, context.universalProfileOwner),
        ).to.be.rejectedWith(
            `The parameter \`issuerAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${issuerAddress}'`,
        );
    });

    describe('valid case', () => {
        let dataKeys: BytesLike[];
        let dataValues: BytesLike[];

        before('Adding `LSP12IssuedAssets[]`', async () => {
            dataKeys = [
                ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
                ...context.issuedAssets.flatMap((newIssuedAsset, index) => [
                    generateArrayElementKeyAtIndex(
                        ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
                        index,
                    ),
                    ERC725.encodeKeyName('LSP4CreatorsMap:<address>', [
                        newIssuedAsset.address.toString(),
                    ]),
                ]),
            ];

            dataValues = [toBeHex(0, 16), ...context.issuedAssets.flatMap(() => ['0x', '0x'])];

            await addIssuedAssets(
                context.universalProfile.connect(context.universalProfileOwner),
                context.issuedAssets,
            );
        });

        it('should pass and add new creators (overload: issuer address + signer)', async () => {
            await removeIssuedAssets(
                await context.universalProfile.getAddress(),
                context.universalProfileOwner,
            );

            expect(await context.universalProfile.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });

        it('should pass and add new creators (overload: issuer contract + signer)', async () => {
            await removeIssuedAssets(context.universalProfile, context.universalProfileOwner);

            expect(await context.universalProfile.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });

        it('should pass and add new creators (overload: issuer contract)', async () => {
            await removeIssuedAssets(
                context.universalProfile.connect(context.universalProfileOwner),
            );

            expect(await context.universalProfile.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });
    });
});
