import {
    AbstractProvider,
    Provider,
    Signer,
    VoidSigner,
    ZeroAddress,
    keccak256,
    toUtf8Bytes,
} from 'ethers';
import { expect } from 'chai';

// types
import { ERC725Y } from '../../typechain';

// utils
import { getErc725yContract } from '../..';

describe('getErc725yContract', () => {
    let context: {
        provider: Provider;
        signer: Signer;
        nonErc725yContract: ERC725Y;
        erc725yContract: ERC725Y;
    };

    before('generate context', async () => {
        const nonErc725yContract = {
            getAddress: async () => ZeroAddress,
            supportsInterface: async () => false,
        } as ERC725Y;

        const erc725yContract = {
            getAddress: async () => ZeroAddress,
            supportsInterface: async () => true,
        } as ERC725Y;

        context = {
            provider: new AbstractProvider(),
            signer: new VoidSigner(`0x${'cafe'.repeat(10)}`),
            // signer: await ethers.getSigners()[0],
            nonErc725yContract,
            erc725yContract,
        };
    });

    describe('testing `erc725y` as address', () => {
        describe('testing with provider', () => {
            it('should throw when `erc725y` is UTF8', async () => {
                const erc725y = 'erc725y';

                await expect(getErc725yContract(erc725y, context.provider)).to.be.rejectedWith(
                    `The parameter \`erc725y\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${erc725y}'`,
                );
            });

            it('should throw when `erc725y` is hex bigger than 20 bytes', async () => {
                const erc725y = keccak256(toUtf8Bytes('erc725y')).substring(0, 44);

                await expect(getErc725yContract(erc725y, context.provider)).to.be.rejectedWith(
                    `The parameter \`erc725y\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${erc725y}'`,
                );
            });

            it('should throw when `erc725y` is hex smaller than 20 bytes', async () => {
                const erc725y = keccak256(toUtf8Bytes('erc725y')).substring(0, 40);

                await expect(getErc725yContract(erc725y, context.provider)).to.be.rejectedWith(
                    `The parameter \`erc725y\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${erc725y}'`,
                );
            });
        });

        describe('testing with signer', () => {
            it('should throw when `erc725y` is UTF8', async () => {
                const erc725y = 'erc725y';

                await expect(getErc725yContract(erc725y, context.signer)).to.be.rejectedWith(
                    `The parameter \`erc725y\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${erc725y}'`,
                );
            });

            it('should throw when `erc725y` is hex bigger than 20 bytes', async () => {
                const erc725y = keccak256(toUtf8Bytes('erc725y')).substring(0, 44);

                await expect(getErc725yContract(erc725y, context.signer)).to.be.rejectedWith(
                    `The parameter \`erc725y\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${erc725y}'`,
                );
            });

            it('should throw when `erc725y` is hex smaller than 20 bytes', async () => {
                const erc725y = keccak256(toUtf8Bytes('erc725y')).substring(0, 40);

                await expect(getErc725yContract(erc725y, context.signer)).to.be.rejectedWith(
                    `The parameter \`erc725y\` is not a valid address nor a valid contract instance of \`ERC725Y\`. Value: '${erc725y}'`,
                );
            });
        });
    });

    describe('testing `erc725y` as contract', () => {
        it('should throw when `erc725y` does not support `ERC725Y`', async () => {
            await expect(getErc725yContract(context.nonErc725yContract)).to.be.rejectedWith(
                "Contract does not support 'ERC725Y'.",
            );
        });

        it('should pass when `erc725y` does supports `ERC725Y`', async () => {
            expect(await getErc725yContract(context.erc725yContract)).to.be.deep.equal(
                context.erc725yContract,
            );
        });
    });
});
