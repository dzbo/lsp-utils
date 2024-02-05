import { ERC725YDataKeys, INTERFACE_IDS, LSP4_TOKEN_TYPES } from '@lukso/lsp-smart-contracts';
import { BytesLike, Signer, concat, toBeHex } from 'ethers';
import ERC725 from '@erc725/erc725.js';
import { ethers } from 'hardhat';
import { expect } from 'chai';

// types
import {
    UniversalProfile__factory,
    UniversalProfile,
    LSP7Mintable__factory,
    LSP7Mintable,
} from '../../typechain/lukso';

// utils
import {
    DigitalAsset,
    addIssuedAssets,
    generateArrayElementKeyAtIndex,
    removeIssuedAssets,
} from '../..';

describe('addIssuedAssets', () => {
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
            LSP4_TOKEN_TYPES.TOKEN,
            true,
        );

        const secondIssuedAsset = await new LSP7Mintable__factory(owner).deploy(
            'SecondTestToken',
            'STT',
            owner.address,
            LSP4_TOKEN_TYPES.TOKEN,
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

    it('should throw when calling with `newIssuedAssets` as an empty array', async () => {
        const issuerAddress = await context.universalProfile.getAddress();

        await expect(
            addIssuedAssets(issuerAddress, [], context.universalProfileOwner),
        ).to.be.rejectedWith('`newIssuedAssets` length is 0.');
    });

    describe('test overloads', () => {
        let dataKeys: BytesLike[];
        let dataValues: BytesLike[];

        before(() => {
            dataKeys = [
                ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
                ...context.issuedAssets.flatMap((newIssuedAsset, index) => [
                    generateArrayElementKeyAtIndex(
                        ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
                        index,
                    ),
                    ERC725.encodeKeyName('LSP12IssuedAssetsMap:<address>', [
                        newIssuedAsset.address.toString(),
                    ]),
                ]),
            ];

            dataValues = [
                toBeHex(context.issuedAssets.length, 16),
                ...context.issuedAssets.flatMap((newIssuedAsset, index) => [
                    newIssuedAsset.address.toString(),
                    concat([newIssuedAsset.interfaceId, toBeHex(index, 16)]),
                ]),
            ];
        });

        afterEach('remove the LSP4 Creators', async () => {
            await removeIssuedAssets(
                context.universalProfile.connect(context.universalProfileOwner),
            );
        });

        it('should pass and add new issuedAssets (overload: issuer address + signer)', async () => {
            const issuerAddress = await context.universalProfile.getAddress();

            await addIssuedAssets(
                issuerAddress,
                context.issuedAssets,
                context.universalProfileOwner,
            );

            expect(await context.universalProfile.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });

        it('should pass and add new issuedAssets (overload: issuer contract + signer)', async () => {
            await addIssuedAssets(
                context.universalProfile,
                context.issuedAssets,
                context.universalProfileOwner,
            );

            expect(await context.universalProfile.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });

        it('should pass and add new issuedAssets (overload: issuer contract)', async () => {
            await addIssuedAssets(
                context.universalProfile.connect(context.universalProfileOwner),
                context.issuedAssets,
            );

            expect(await context.universalProfile.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });
    });
});
