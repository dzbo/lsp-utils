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
    DigitalAsset,
    addIssuedAssets,
    generateArrayElementKeyAtIndex,
    generateArrayKey,
    generateMappingKey,
    getIssuedAssets,
    removeIssuedAssets,
} from '../../src';

describe('getIssuedAssets', () => {
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

    it('should throw when token address is not hex', async () => {
        const issuerAddress = 'address';

        await expect(getIssuedAssets(issuerAddress, ethers.provider)).to.be.rejectedWith(
            `The parameter \`issuerAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${issuerAddress}'`,
        );
    });

    it('should throw when token address is hex with less than 20 bytes', async () => {
        const issuerAddress = keccak256(toUtf8Bytes('address')).substring(0, 40);

        await expect(getIssuedAssets(issuerAddress, ethers.provider)).to.be.rejectedWith(
            `The parameter \`issuerAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${issuerAddress}'`,
        );
    });

    it('should throw when token address is hex with more than 20 bytes', async () => {
        const issuerAddress = keccak256(toUtf8Bytes('address')).substring(0, 44);

        await expect(getIssuedAssets(issuerAddress, ethers.provider)).to.be.rejectedWith(
            `The parameter \`issuerAddress\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${issuerAddress}'`,
        );
    });

    it('should throw when token address does not support `ERC725Y`', async () => {
        const issuer = await new LSP6KeyManager__factory(context.universalProfileOwner).deploy(
            context.universalProfileOwner,
        );
        const issuerAddress = await issuer.getAddress();

        await expect(getIssuedAssets(issuerAddress, ethers.provider)).to.be.rejectedWith(
            "Issuer does not support 'ERC725Y'. Cannot use `getData()`",
        );
    });

    it('should pass and return an empty array when token has no `LSP12IssuedAssets[]`', async () => {
        const issuerAddress = await context.universalProfile.getAddress();

        expect(await getIssuedAssets(issuerAddress, ethers.provider)).to.deep.equal([]);
    });

    describe('when the `LSP12IssuedAssets[]` length is bigger than 16 bytes', () => {
        const issuedAssetsLengthHex = toBeHex(2, 17);

        before('Adding `LSP12IssuedAssets[]` length', async () => {
            await context.universalProfile
                .connect(context.universalProfileOwner)
                .setData(
                    ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
                    issuedAssetsLengthHex,
                );
        });

        it('should throw', async () => {
            const digitalAssetAddress = await context.universalProfile.getAddress();

            await expect(getIssuedAssets(digitalAssetAddress, ethers.provider)).to.be.rejectedWith(
                `The data value for \`LSP12IssuedAssets[]\` data key is not a valid LSP2 array length value. Value: ${issuedAssetsLengthHex}`,
            );
        });
    });

    describe('when the `LSP12IssuedAssets[]` length is smaller than 16 bytes', () => {
        const issuedAssetsLengthHex = toBeHex(2, 15);

        before('Adding `LSP12IssuedAssets[]` length', async () => {
            await context.universalProfile
                .connect(context.universalProfileOwner)
                .setData(
                    ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
                    issuedAssetsLengthHex,
                );
        });

        it('should throw', async () => {
            const digitalAssetAddress = await context.universalProfile.getAddress();

            await expect(getIssuedAssets(digitalAssetAddress, ethers.provider)).to.be.rejectedWith(
                `The data value for \`LSP12IssuedAssets[]\` data key is not a valid LSP2 array length value. Value: ${issuedAssetsLengthHex}`,
            );
        });
    });

    describe('when there are two `LSP12IssuedAssets[]` but the address of one is corrupted', () => {
        beforeEach('Adding `LSP12IssuedAssets[]`', async () => {
            await context.universalProfile
                .connect(context.universalProfileOwner)
                .setDataBatch(
                    [
                        generateArrayKey('LSP12IssuedAssets[]'),
                        generateArrayElementKeyAtIndex(
                            ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
                            0,
                        ),
                        generateArrayElementKeyAtIndex(
                            ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
                            1,
                        ),
                        generateMappingKey(
                            ERC725YDataKeys.LSP12.LSP12IssuedAssetsMap,
                            context.issuedAssets[0].address,
                        ),
                        generateMappingKey(
                            ERC725YDataKeys.LSP12.LSP12IssuedAssetsMap,
                            context.issuedAssets[1].address,
                        ),
                    ],
                    [
                        toBeHex(2, 16),
                        '0x',
                        context.issuedAssets[1].address,
                        concat([context.issuedAssets[0].interfaceId, toBeHex(0, 16)]),
                        concat([context.issuedAssets[1].interfaceId, toBeHex(1, 16)]),
                    ],
                );
        });

        afterEach('Removing `LSP4Creators[]`', async () => {
            await removeIssuedAssets(
                context.universalProfile.connect(context.universalProfileOwner),
            );
        });

        it('should pass and return one issued asset (overload: issuer address + provider)', async () => {
            const issuerAddress = await context.universalProfile.getAddress();

            expect(await getIssuedAssets(issuerAddress, ethers.provider)).to.deep.equal([
                context.issuedAssets[1],
            ]);
        });

        it('should pass and return one issued asset (overload: issuer contract + provider)', async () => {
            expect(await getIssuedAssets(context.universalProfile, ethers.provider)).to.deep.equal([
                context.issuedAssets[1],
            ]);
        });

        it('should pass and return one issued asset (overload: issuer contract)', async () => {
            expect(await getIssuedAssets(context.universalProfile)).to.deep.equal([
                context.issuedAssets[1],
            ]);
        });
    });

    describe('when there are two `LSP12IssuedAssets[]` but the mapping of one is corrupted', () => {
        let expectedIssuedAssets: DigitalAsset[];

        beforeEach('Adding `LSP12IssuedAssets[]`', async () => {
            expectedIssuedAssets = [
                {
                    address: context.issuedAssets[0].address,
                    interfaceId: '0x',
                },
                context.issuedAssets[1],
            ];

            await context.universalProfile
                .connect(context.universalProfileOwner)
                .setDataBatch(
                    [
                        generateArrayKey('LSP12IssuedAssets[]'),
                        generateArrayElementKeyAtIndex(
                            ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
                            0,
                        ),
                        generateArrayElementKeyAtIndex(
                            ERC725YDataKeys.LSP12['LSP12IssuedAssets[]'].length,
                            1,
                        ),
                        generateMappingKey(
                            ERC725YDataKeys.LSP12.LSP12IssuedAssetsMap,
                            context.issuedAssets[0].address,
                        ),
                        generateMappingKey(
                            ERC725YDataKeys.LSP12.LSP12IssuedAssetsMap,
                            context.issuedAssets[1].address,
                        ),
                    ],
                    [
                        toBeHex(2, 16),
                        context.issuedAssets[0].address,
                        context.issuedAssets[1].address,
                        '0x',
                        concat([context.issuedAssets[1].interfaceId, toBeHex(1, 16)]),
                    ],
                );
        });

        afterEach('Removing `LSP4Creators[]`', async () => {
            await removeIssuedAssets(
                context.universalProfile.connect(context.universalProfileOwner),
            );
        });

        it('should pass and return both issued assets, but one without interface id (overload: issuer address + provider)', async () => {
            const issuerAddress = await context.universalProfile.getAddress();

            expect(await getIssuedAssets(issuerAddress, ethers.provider)).to.deep.equal(
                expectedIssuedAssets,
            );
        });

        it('should pass and return both issued assets, but one without interface id (overload: issuer contract + provider)', async () => {
            expect(await getIssuedAssets(context.universalProfile, ethers.provider)).to.deep.equal(
                expectedIssuedAssets,
            );
        });

        it('should pass and return both issued assets, but one without interface id (overload: issuer contract)', async () => {
            expect(
                await getIssuedAssets(
                    context.universalProfile.connect(context.universalProfileOwner),
                ),
            ).to.deep.equal(expectedIssuedAssets);
        });
    });

    describe('when there are two valid `LSP12IssuedAssets[]`', () => {
        beforeEach('Adding `LSP12IssuedAssets[]`', async () => {
            await addIssuedAssets(
                context.universalProfile.connect(context.universalProfileOwner),
                context.issuedAssets,
            );
        });

        afterEach('Removing `LSP4Creators[]`', async () => {
            await removeIssuedAssets(
                context.universalProfile.connect(context.universalProfileOwner),
            );
        });

        it('should pass and return both issued assets (overload: issuer address + provider)', async () => {
            const issuerAddress = await context.universalProfile.getAddress();

            expect(await getIssuedAssets(issuerAddress, ethers.provider)).to.deep.equal(
                context.issuedAssets,
            );
        });

        it('should pass and return both issued assets (overload: issuer contract + provider)', async () => {
            expect(await getIssuedAssets(context.universalProfile, ethers.provider)).to.deep.equal(
                context.issuedAssets,
            );
        });

        it('should pass and return both issued assets (overload: issuer contract)', async () => {
            expect(
                await getIssuedAssets(
                    context.universalProfile.connect(context.universalProfileOwner),
                ),
            ).to.deep.equal(context.issuedAssets);
        });
    });
});
