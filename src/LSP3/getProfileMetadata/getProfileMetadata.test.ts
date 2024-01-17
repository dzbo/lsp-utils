import { expect } from 'chai';

// types
import { ERC725Y } from '../../typechain/erc725';

// utils
import { getProfileMetadata } from '../..';

// TODO Find a way to test without fetching data from ipfs
describe.skip('getProfileMetadata', () => {
    const mockErc725yContract = {
        async supportsInterface(interfaceId: string) {
            interfaceId;
            return true;
        },
        async getData(dataKey: string) {
            dataKey;
            return '0x6f357c6ae8b1db2db7ce8a555019ab31c557e9934145c0baa7fdae3f1a131e736d3d4e8e697066733a2f2f516d583543365939614a35646879697533546446704b6258797653434345386a435477514436374743784d705a31';
        },
        getAddress() {
            return;
        },
    } as ERC725Y;

    it('should get and return proper data', async () => {
        expect(await getProfileMetadata(mockErc725yContract)).to.deep.equal({
            LSP3Profile: { name: 'b00ste', description: '', tags: [], links: [] },
        });
    });
});
