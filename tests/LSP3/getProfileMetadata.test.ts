import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import { Signer } from 'ethers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

// types
import { UniversalProfile__factory, UniversalProfile } from '../../src/typechain';

// utils
import { getProfileMetadata } from '../../src';

describe('getProfileMetadata', () => {
    let context: {
        universalProfileOwner: Signer;
        universalProfile: UniversalProfile;
    };
    before('deploy up with LSP3 Profile Metadata', async () => {
        const signers = await ethers.getSigners();
        const owner = signers[0];

        const universalProfile = await new UniversalProfile__factory(owner).deploy(owner.address);

        const LSP3Profile =
            '0x6f357c6ae8b1db2db7ce8a555019ab31c557e9934145c0baa7fdae3f1a131e736d3d4e8e697066733a2f2f516d583543365939614a35646879697533546446704b6258797653434345386a435477514436374743784d705a31';

        await universalProfile.setData(ERC725YDataKeys.LSP3.LSP3Profile, LSP3Profile);

        context = {
            universalProfileOwner: owner,
            universalProfile,
        };
    });

    it('should get and return proper data (overload: up contract)', async () => {
        expect(await getProfileMetadata(context.universalProfile)).to.deep.equal({
            LSP3Profile: { name: 'b00ste', description: '', tags: [], links: [] },
        });
    });

    it('should get and return proper data (overload: up address, provider)', async () => {
        expect(
            await getProfileMetadata(await context.universalProfile.getAddress(), ethers.provider),
        ).to.deep.equal({
            LSP3Profile: { name: 'b00ste', description: '', tags: [], links: [] },
        });
    });
});
