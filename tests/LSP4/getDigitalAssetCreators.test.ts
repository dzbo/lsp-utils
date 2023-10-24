// import { expect } from 'chai';
import { ERC725YDataKeys, INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
import { Signer, concat, keccak256, toBeHex, toUtf8Bytes } from 'ethers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

// types
import {
    UniversalProfile__factory,
    UniversalProfile,
    LSP7Mintable__factory,
    LSP7Mintable,
    LSP6KeyManager__factory,
} from '../../src/typechain';

// util
import {
    Issuer,
    generateArrayElementKeyAtIndex,
    generateMappingKey,
    addDigitalAssetCreators,
    getDigitalAssetCreators,
    removeDigitalAssetCreators,
} from '../../src';

describe('getDigitalAssetCreators', () => {
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

    it('should throw when token address is not hex', async () => {
        const digitalAssetAddress = 'address';

        await expect(
            getDigitalAssetCreators(digitalAssetAddress, ethers.provider),
        ).to.be.rejectedWith(
            `The parameter \`digitalAssetAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${digitalAssetAddress}'`,
        );
    });

    it('should throw when token address is hex with less than 20 bytes', async () => {
        const digitalAssetAddress = keccak256(toUtf8Bytes('address')).substring(0, 40);

        await expect(
            getDigitalAssetCreators(digitalAssetAddress, ethers.provider),
        ).to.be.rejectedWith(
            `The parameter \`digitalAssetAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${digitalAssetAddress}'`,
        );
    });

    it('should throw when token address is hex with more than 20 bytes', async () => {
        const digitalAssetAddress = keccak256(toUtf8Bytes('address')).substring(0, 44);

        await expect(
            getDigitalAssetCreators(digitalAssetAddress, ethers.provider),
        ).to.be.rejectedWith(
            `The parameter \`digitalAssetAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${digitalAssetAddress}'`,
        );
    });

    it('should throw when token address does not support `ERC725Y`', async () => {
        const digitalAsset = await new LSP6KeyManager__factory(context.digitalAssetOwner).deploy(
            context.digitalAssetOwner,
        );
        const digitalAssetAddress = await digitalAsset.getAddress();

        await expect(
            getDigitalAssetCreators(digitalAssetAddress, ethers.provider),
        ).to.be.rejectedWith("Digital asset does not support 'ERC725Y'. Cannot use `getData()`");
    });

    it('should pass and return an empty array when token has no `LSP4Creators[]`', async () => {
        const digitalAssetAddress = await context.digitalAsset.getAddress();

        expect(await getDigitalAssetCreators(digitalAssetAddress, ethers.provider)).to.deep.equal(
            [],
        );
    });

    describe('when the `LSP4Creators[]` length is bigger than 16 bytes', () => {
        const creatorsLengthHex = toBeHex(2, 17);

        before('Adding `LSP4Creators[]` length', async () => {
            await context.digitalAsset
                .connect(context.digitalAssetOwner)
                .setData(ERC725YDataKeys.LSP4['LSP4Creators[]'].length, creatorsLengthHex);
        });

        it('should throw', async () => {
            const digitalAssetAddress = await context.digitalAsset.getAddress();

            await expect(
                getDigitalAssetCreators(digitalAssetAddress, ethers.provider),
            ).to.be.rejectedWith(
                `The data value for \`LSP4Creators[]\` data key is not a valid LSP2 array length value. Value: ${creatorsLengthHex}`,
            );
        });
    });

    describe('when the `LSP4Creators[]` length is smaller than 16 bytes', () => {
        const creatorsLengthHex = toBeHex(2, 15);

        before('Adding `LSP4Creators[]` length', async () => {
            await context.digitalAsset
                .connect(context.digitalAssetOwner)
                .setData(ERC725YDataKeys.LSP4['LSP4Creators[]'].length, creatorsLengthHex);
        });

        it('should throw', async () => {
            const digitalAssetAddress = await context.digitalAsset.getAddress();

            await expect(
                getDigitalAssetCreators(digitalAssetAddress, ethers.provider),
            ).to.be.rejectedWith(
                `The data value for \`LSP4Creators[]\` data key is not a valid LSP2 array length value. Value: ${creatorsLengthHex}`,
            );
        });
    });

    describe('when there are two `LSP4Creators[]` but the address of one is corrupted', () => {
        beforeEach('Adding `LSP4Creators[]`', async () => {
            await context.digitalAsset
                .connect(context.digitalAssetOwner)
                .setDataBatch(
                    [
                        ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
                        generateArrayElementKeyAtIndex(
                            ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
                            0,
                        ),
                        generateArrayElementKeyAtIndex(
                            ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
                            1,
                        ),
                        generateMappingKey(
                            ERC725YDataKeys.LSP4.LSP4CreatorsMap,
                            context.creators[0].address,
                        ),
                        generateMappingKey(
                            ERC725YDataKeys.LSP4.LSP4CreatorsMap,
                            context.creators[1].address,
                        ),
                    ],
                    [
                        toBeHex(2, 16),
                        '0x',
                        context.creators[1].address,
                        concat([context.creators[0].interfaceId, toBeHex(0, 16)]),
                        concat([context.creators[1].interfaceId, toBeHex(1, 16)]),
                    ],
                );
        });

        afterEach('Removing `LSP4Creators[]`', async () => {
            await removeDigitalAssetCreators(
                context.digitalAsset.connect(context.digitalAssetOwner),
            );
        });

        it('should pass and return one creator (overload: asset address + provider)', async () => {
            const digitalAssetAddress = await context.digitalAsset.getAddress();

            expect(
                await getDigitalAssetCreators(digitalAssetAddress, ethers.provider),
            ).to.deep.equal([context.creators[1]]);
        });

        it('should pass and return one creator (overload: asset contract)', async () => {
            expect(await getDigitalAssetCreators(context.digitalAsset)).to.deep.equal([
                context.creators[1],
            ]);
        });

        it('should pass and return one creator (overload: asset contract + provider)', async () => {
            expect(
                await getDigitalAssetCreators(context.digitalAsset, ethers.provider),
            ).to.deep.equal([context.creators[1]]);
        });
    });

    describe('when there are two `LSP4Creators[]` but the mapping of one is corrupted', () => {
        let expectedCreators: Issuer[];
        before(() => {
            expectedCreators = [
                {
                    address: context.creators[0].address,
                    interfaceId: '0x',
                },
                context.creators[1],
            ];
        });
        beforeEach('Adding `LSP4Creators[]`', async () => {
            await context.digitalAsset
                .connect(context.digitalAssetOwner)
                .setDataBatch(
                    [
                        ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
                        generateArrayElementKeyAtIndex(
                            ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
                            0,
                        ),
                        generateArrayElementKeyAtIndex(
                            ERC725YDataKeys.LSP4['LSP4Creators[]'].length,
                            1,
                        ),
                        generateMappingKey(
                            ERC725YDataKeys.LSP4.LSP4CreatorsMap,
                            context.creators[0].address,
                        ),
                        generateMappingKey(
                            ERC725YDataKeys.LSP4.LSP4CreatorsMap,
                            context.creators[1].address,
                        ),
                    ],
                    [
                        toBeHex(2, 16),
                        context.creators[0].address,
                        context.creators[1].address,
                        '0x',
                        concat([context.creators[1].interfaceId, toBeHex(1, 16)]),
                    ],
                );
        });

        afterEach('Removing `LSP4Creators[]`', async () => {
            await removeDigitalAssetCreators(
                context.digitalAsset.connect(context.digitalAssetOwner),
            );
        });

        it('should pass and return both creators, but one without interface id (overload: asset address + provider)', async () => {
            const digitalAssetAddress = await context.digitalAsset.getAddress();

            expect(
                await getDigitalAssetCreators(digitalAssetAddress, ethers.provider),
            ).to.deep.equal(expectedCreators);
        });

        it('should pass and return both creators, but one without interface id (overload: asset contract)', async () => {
            expect(await getDigitalAssetCreators(context.digitalAsset)).to.deep.equal(
                expectedCreators,
            );
        });

        it('should pass and return both creators, but one without interface id (overload: asset contract + provider)', async () => {
            expect(
                await getDigitalAssetCreators(context.digitalAsset, ethers.provider),
            ).to.deep.equal(expectedCreators);
        });
    });

    describe('when there are two valid `LSP4Creators[]`', () => {
        beforeEach('Adding `LSP4Creators[]`', async () => {
            await addDigitalAssetCreators(
                context.digitalAsset.connect(context.digitalAssetOwner),
                context.creators,
            );
        });

        afterEach('Removing `LSP4Creators[]`', async () => {
            await removeDigitalAssetCreators(
                context.digitalAsset.connect(context.digitalAssetOwner),
            );
        });

        it('should pass and return both creators (overload: asset address + provider)', async () => {
            const digitalAssetAddress = await context.digitalAsset.getAddress();

            expect(
                await getDigitalAssetCreators(digitalAssetAddress, ethers.provider),
            ).to.deep.equal(context.creators);
        });

        it('should pass and return both creators (overload: asset contract)', async () => {
            expect(await getDigitalAssetCreators(context.digitalAsset)).to.deep.equal(
                context.creators,
            );
        });

        it('should pass and return both creators (overload: asset contract + provider)', async () => {
            expect(
                await getDigitalAssetCreators(context.digitalAsset, ethers.provider),
            ).to.deep.equal(context.creators);
        });
    });
});
