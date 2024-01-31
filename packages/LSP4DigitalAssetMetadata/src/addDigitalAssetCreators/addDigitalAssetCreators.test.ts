import { ERC725YDataKeys, INTERFACE_IDS, LSP4_TOKEN_TYPES } from '@lukso/lsp-smart-contracts';
import { BytesLike, Signer, concat, toBeHex } from 'ethers';
import ERC725 from '@erc725/erc725.js';
import { ethers } from 'hardhat';
import { expect } from 'chai';

// lsp-utils
import { generateArrayElementKeyAtIndex } from '@lukso/lsp2-utils';
import { Issuer } from '@lukso/lsp-utils-constants';

// typechain
import {
    UniversalProfile__factory,
    UniversalProfile,
    LSP7Mintable__factory,
    LSP7Mintable,
} from '../typechain';

// utils
import { removeDigitalAssetCreators } from '../removeDigitalAssetCreators';
import { addDigitalAssetCreators } from '../addDigitalAssetCreators';

describe('addDigitalAssetCreators', () => {
    let context: {
        creators: Issuer[];
        universalProfileOwner: Signer;
        universalProfile: UniversalProfile;
        digitalAssetOwner: Signer;
        digitalAsset: LSP7Mintable;
    };
    before('deploy UP and token contract', async () => {
        const signers = await ethers.getSigners();
        const owner = signers[0];
        const creator = signers[1];

        const universalProfile = await new UniversalProfile__factory(owner).deploy(owner.address);

        const digitalAsset = await new LSP7Mintable__factory(owner).deploy(
            'TestToken',
            'TTS',
            owner.address,
            LSP4_TOKEN_TYPES.TOKEN,
            true,
        );

        context = {
            creators: [
                {
                    address: creator.address,
                    interfaceId: '0xffffffff',
                },
                {
                    address: await universalProfile.getAddress(),
                    interfaceId: INTERFACE_IDS.LSP0ERC725Account,
                },
            ],
            universalProfileOwner: owner,
            universalProfile,
            digitalAssetOwner: owner,
            digitalAsset,
        };
    });

    it('should throw when calling with `newCreators` as an empty array', async () => {
        const digitalAssetAddress = await context.digitalAsset.getAddress();

        await expect(
            addDigitalAssetCreators(digitalAssetAddress, [], context.digitalAssetOwner),
        ).to.be.rejectedWith('`newCreators` length is 0.');
    });

    describe('test overloads', () => {
        let dataKeys: BytesLike[];
        let dataValues: BytesLike[];

        before(() => {
            dataKeys = [
                ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
                ...context.creators.flatMap((newCreator, index) => [
                    generateArrayElementKeyAtIndex(
                        ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
                        index,
                    ),
                    ERC725.encodeKeyName('LSP4CreatorsMap:<address>', [
                        newCreator.address.toString(),
                    ]),
                ]),
            ];

            dataValues = [
                toBeHex(context.creators.length, 16),
                ...context.creators.flatMap((newCreator, index) => [
                    newCreator.address.toString(),
                    concat([newCreator.interfaceId, toBeHex(index, 16)]),
                ]),
            ];
        });

        afterEach('remove the LSP4 Creators', async () => {
            await removeDigitalAssetCreators(
                context.digitalAsset.connect(context.digitalAssetOwner),
            );
        });

        it('should pass and add new creators (overload: asset address + signer)', async () => {
            const digitalAssetAddress = await context.digitalAsset.getAddress();

            await addDigitalAssetCreators(
                digitalAssetAddress,
                context.creators,
                context.digitalAssetOwner,
            );

            expect(await context.digitalAsset.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });

        it('should pass and add new creators (overload: asset contract)', async () => {
            await addDigitalAssetCreators(
                context.digitalAsset.connect(context.digitalAssetOwner),
                context.creators,
            );

            expect(await context.digitalAsset.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });

        it('should pass and add new creators (overload: asset contract + signer)', async () => {
            await addDigitalAssetCreators(
                context.digitalAsset,
                context.creators,
                context.digitalAssetOwner,
            );

            expect(await context.digitalAsset.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });
    });
});
