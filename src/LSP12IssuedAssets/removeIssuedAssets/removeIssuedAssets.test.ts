import { ERC725YDataKeys, INTERFACE_IDS, LSP4_TOKEN_TYPES } from '@lukso/lsp-smart-contracts';
import { BytesLike, Signer, toBeHex } from 'ethers';
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

        it('should pass and remove creators (overload: issuer address + signer)', async () => {
            await removeIssuedAssets(
                await context.universalProfile.getAddress(),
                context.universalProfileOwner,
            );

            expect(await context.universalProfile.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });

        it('should pass and remove creators (overload: issuer contract + signer)', async () => {
            await removeIssuedAssets(context.universalProfile, context.universalProfileOwner);

            expect(await context.universalProfile.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });

        it('should pass and remove creators (overload: issuer contract)', async () => {
            await removeIssuedAssets(
                context.universalProfile.connect(context.universalProfileOwner),
            );

            expect(await context.universalProfile.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });
    });
});
