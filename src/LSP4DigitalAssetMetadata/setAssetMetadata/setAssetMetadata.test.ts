import { expect } from 'chai';
import { setAssetMetadata } from './setAssetMetadata';
import { ZeroAddress } from 'ethers';
import { ERC725Y } from '../../typechain/erc725';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';
import { encodeVerifiableURI } from '../../LSP2ERC725YJSONSchema';

class MockERC725Y {
    _store: Record<string, string> = {};

    getAddress = async () => ZeroAddress;
    supportsInterface = async (interfaceId: string) => true;

    setData = async (dataKey: string, dataValue: string) => {
        this._store[dataKey] = dataValue;
    };
    getData = async (dataKey: string) => {
        return this._store[dataKey];
    };
}

describe('testing `setAssetMetadata`', () => {
    const mockErc725y = new MockERC725Y() as unknown as ERC725Y;
    const metadata = {
        LSP3Profile: {
            name: 'Your Name',
            description:
                'Anim magna pariatur velit ex consequat. Exercitation veniam anim labore do ad. Ex exercitation veniam veniam ex dolor ullamco sit id proident sint consequat nulla. Exercitation id duis voluptate occaecat enim ea do in. Eu ut minim voluptate commodo excepteur.',
        },
    };
    const url = 'https://google.com/';

    it('should update the Asset metadata', async () => {
        await setAssetMetadata(mockErc725y, metadata, url);

        expect(await mockErc725y.getData(ERC725YDataKeys.LSP3.LSP3Profile)).to.equal(
            encodeVerifiableURI(metadata, url),
        );
    });
});
