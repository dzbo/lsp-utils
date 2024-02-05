import { expect } from 'chai';

// types
import { ERC725Y } from '../../typechain/erc725';

// utils
import { getAssetMetadata } from '../..';

// TODO Find a way to test without fetching data from ipfs
describe.skip('getAssetMetadata', () => {
    const mockErc725yContract = {
        async supportsInterface(interfaceId: string) {
            interfaceId;
            return true;
        },
        async getData(dataKey: string) {
            dataKey;
            return '0x6f357c6ae2a000b36a03b180365241dc292bb800af5eef0702fcd7875b52a8b618d6f0ba697066733a2f2f6261666b726569687570796d3736697479746c6676686c356378666e6a34747061726f7a6b72706f35663765776d65336866346578683373697265';
        },
        getAddress() {
            return;
        },
    } as ERC725Y;

    it('should get and return proper data', async () => {
        expect(await getAssetMetadata(mockErc725yContract)).to.deep.equal({
            LSP4Metadata: {
                description: 'A test collection',
                links: [{ title: 'BLXK', url: 'hoodiecartel.com' }],
                icon: [
                    {
                        width: 1200,
                        height: 1200,
                        url: 'ipfs://bafybeigiqcviaswqllze4y7x6cfbpcngtb4fxncixwsdoljb5ae6nutbta',
                        verification: {
                            method: 'keccak256(bytes)',
                            data: '0xd7bf9df16dd8f66b87d9e46619f7f4f7068afea54ae05f518393fcea7b094601',
                        },
                    },
                ],
                assets: [],
                images: [
                    [
                        {
                            width: 1200,
                            height: 1200,
                            url: 'ipfs://bafybeigiqcviaswqllze4y7x6cfbpcngtb4fxncixwsdoljb5ae6nutbta',
                            verification: {
                                method: 'keccak256(bytes)',
                                data: '0xd7bf9df16dd8f66b87d9e46619f7f4f7068afea54ae05f518393fcea7b094601',
                            },
                        },
                    ],
                ],
            },
        });
    });
});
