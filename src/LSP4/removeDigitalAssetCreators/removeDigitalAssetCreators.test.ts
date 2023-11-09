import { ERC725YDataKeys, INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
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
} from '../../typechain';

// utils
import {
    Issuer,
    addDigitalAssetCreators,
    generateArrayElementKeyAtIndex,
    removeDigitalAssetCreators,
} from '../..';

describe('removeDigitalAssetCreators', () => {
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

    describe('valid case', () => {
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

            dataValues = [toBeHex(0, 16), ...context.creators.flatMap(() => ['0x', '0x'])];
        });

        beforeEach('Adding `LSP4Creators[]`', async () => {
            await addDigitalAssetCreators(
                context.digitalAsset.connect(context.digitalAssetOwner),
                context.creators,
            );
        });

        it('should pass and remove creators (overload: asset address + signer)', async () => {
            const digitalAssetAddress = await context.digitalAsset.getAddress();

            await removeDigitalAssetCreators(digitalAssetAddress, context.digitalAssetOwner);

            expect(await context.digitalAsset.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });

        it('should pass and remove creators (overload: asset contract)', async () => {
            await removeDigitalAssetCreators(
                context.digitalAsset.connect(context.digitalAssetOwner),
            );

            expect(await context.digitalAsset.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });

        it('should pass and remove creators (overload: asset contract + signer)', async () => {
            await removeDigitalAssetCreators(context.digitalAsset, context.digitalAssetOwner);

            expect(await context.digitalAsset.getDataBatch(dataKeys)).to.deep.equal(dataValues);
        });
    });
});
