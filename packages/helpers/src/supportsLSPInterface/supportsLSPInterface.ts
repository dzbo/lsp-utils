import { BytesLike, Provider, isAddress, isAddressable } from 'ethers';
import { INTERFACE_IDS } from '@lukso/lsp-smart-contracts';
import { InterfaceId, InterfaceIdName } from '@lukso/lsp-utils-constants';

// typechain
import { ERC165, ERC165__factory } from '../typechain';

const interfaceIds: Record<string, string> = INTERFACE_IDS;

export async function supportsLSPInterface(
    interfaceId: InterfaceId | InterfaceIdName,
    contract: ERC165 | BytesLike,
    provider?: Provider,
): Promise<boolean> {
    if (!isAddress(contract) && !isAddressable(contract)) {
        throw new Error(
            `The parameter \`contract\` is not a valid address nor a valid contract instance of ERC165 contract. Value: '${contract}'`,
        );
    }

    let contractInstance: ERC165;

    if (isAddress(contract)) {
        contractInstance = ERC165__factory.connect(contract, provider);
    } else if (provider) {
        contractInstance = contract.connect(provider);
    } else {
        contractInstance = contract;
    }

    let result: boolean;
    try {
        if (interfaceIds[interfaceId]) {
            result = await contractInstance.supportsInterface(interfaceIds[interfaceId]);
        } else {
            result = await contractInstance.supportsInterface(interfaceId);
        }
    } catch (errorMessage) {
        throw new Error(errorMessage as string);
    }

    return result;
}
