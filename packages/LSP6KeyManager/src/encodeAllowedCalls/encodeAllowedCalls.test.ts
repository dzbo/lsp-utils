import { expect } from 'chai';

// utils
import { encodeAllowedCalls } from './encodeAllowedCalls';

describe('encodeAllowedCalls', () => {
    describe('testing `allowedInteractions`', () => {
        it('should throw if any element of `allowedInteractions` is not hex', () => {
            const allowedInteractions = ['allowedInteractions'];
            const allowedAddresses = ['0xcafecafecafecafecafecafecafecafecafecafe'];
            const allowedStandards = ['0x24871b3d'];
            const allowedFunctions = ['0x7f23690c'];

            expect(() =>
                encodeAllowedCalls(
                    allowedInteractions,
                    allowedAddresses,
                    allowedStandards,
                    allowedFunctions,
                ),
            ).to.throw(
                `Allowed interaction is not hex. Allowed interaction: '${allowedInteractions[0]}'`,
            );
        });

        it('should throw if any element of `allowedInteractions` has bytes lenght bigger than 4', () => {
            const allowedInteractions = ['0x0000000200'];
            const allowedAddresses = ['0xcafecafecafecafecafecafecafecafecafecafe'];
            const allowedStandards = ['0x24871b3d'];
            const allowedFunctions = ['0x7f23690c'];

            expect(() =>
                encodeAllowedCalls(
                    allowedInteractions,
                    allowedAddresses,
                    allowedStandards,
                    allowedFunctions,
                ),
            ).to.throw(
                `Allowed interactions has invalid bytes length. Must be 4. Length: ${
                    allowedInteractions[0].length / 2 - 1
                }`,
            );
        });

        it('should throw if any element of `allowedInteractions` has bytes lenght smaller than 4', () => {
            const allowedInteractions = ['0x000002'];
            const allowedAddresses = ['0xcafecafecafecafecafecafecafecafecafecafe'];
            const allowedStandards = ['0x24871b3d'];
            const allowedFunctions = ['0x7f23690c'];

            expect(() =>
                encodeAllowedCalls(
                    allowedInteractions,
                    allowedAddresses,
                    allowedStandards,
                    allowedFunctions,
                ),
            ).to.throw(
                `Allowed interactions has invalid bytes length. Must be 4. Length: ${
                    allowedInteractions[0].length / 2 - 1
                }`,
            );
        });
    });

    describe('testing `allowedAddresses`', () => {
        it('should throw if any element of `allowedAddresses` is not hex', () => {
            const allowedInteractions = ['0x00000002'];
            const allowedAddresses = ['allowedAddresses'];
            const allowedStandards = ['0x24871b3d'];
            const allowedFunctions = ['0x7f23690c'];

            expect(() =>
                encodeAllowedCalls(
                    allowedInteractions,
                    allowedAddresses,
                    allowedStandards,
                    allowedFunctions,
                ),
            ).to.throw(`Allowed address is not hex. Allowed address: '${allowedAddresses[0]}'`);
        });

        it('should throw if any element of `allowedAddresses` has bytes lenght bigger than 20', () => {
            const allowedInteractions = ['0x00000002'];
            const allowedAddresses = ['0xcafecafecafecafecafecafecafecafecafecafe0000'];
            const allowedStandards = ['0x24871b3d'];
            const allowedFunctions = ['0x7f23690c'];

            expect(() =>
                encodeAllowedCalls(
                    allowedInteractions,
                    allowedAddresses,
                    allowedStandards,
                    allowedFunctions,
                ),
            ).to.throw(
                `Allowed interactions has invalid bytes length. Must be 20. Length: ${
                    allowedAddresses[0].length / 2 - 1
                }`,
            );
        });

        it('should throw if any element of `allowedAddresses` has bytes lenght smaller than 20', () => {
            const allowedInteractions = ['0x00000002'];
            const allowedAddresses = ['0xcafecafecafecafecafecafecafecafecafe'];
            const allowedStandards = ['0x24871b3d'];
            const allowedFunctions = ['0x7f23690c'];

            expect(() =>
                encodeAllowedCalls(
                    allowedInteractions,
                    allowedAddresses,
                    allowedStandards,
                    allowedFunctions,
                ),
            ).to.throw(
                `Allowed interactions has invalid bytes length. Must be 20. Length: ${
                    allowedAddresses[0].length / 2 - 1
                }`,
            );
        });
    });

    describe('testing `allowedStandards`', () => {
        it('should throw if any element of `allowedStandards` is not hex', () => {
            const allowedInteractions = ['0x00000002'];
            const allowedAddresses = ['0xcafecafecafecafecafecafecafecafecafecafe'];
            const allowedStandards = ['allowedStandards'];
            const allowedFunctions = ['0x7f23690c'];

            expect(() =>
                encodeAllowedCalls(
                    allowedInteractions,
                    allowedAddresses,
                    allowedStandards,
                    allowedFunctions,
                ),
            ).to.throw(`Allowed standard is not hex. Allowed standard: '${allowedStandards[0]}'`);
        });

        it('should throw if any element of `allowedStandards` has bytes lenght bigger than 4', () => {
            const allowedInteractions = ['0x00000002'];
            const allowedAddresses = ['0xcafecafecafecafecafecafecafecafecafecafe'];
            const allowedStandards = ['0x24871b3d00'];
            const allowedFunctions = ['0x7f23690c'];

            expect(() =>
                encodeAllowedCalls(
                    allowedInteractions,
                    allowedAddresses,
                    allowedStandards,
                    allowedFunctions,
                ),
            ).to.throw(
                `Allowed interactions has invalid bytes length. Must be 4. Length: ${
                    allowedStandards[0].length / 2 - 1
                }`,
            );
        });

        it('should throw if any element of `allowedStandards` has bytes lenght smaller than 4', () => {
            const allowedInteractions = ['0x00000002'];
            const allowedAddresses = ['0xcafecafecafecafecafecafecafecafecafecafe'];
            const allowedStandards = ['0x24871b'];
            const allowedFunctions = ['0x7f23690c'];

            expect(() =>
                encodeAllowedCalls(
                    allowedInteractions,
                    allowedAddresses,
                    allowedStandards,
                    allowedFunctions,
                ),
            ).to.throw(
                `Allowed interactions has invalid bytes length. Must be 4. Length: ${
                    allowedStandards[0].length / 2 - 1
                }`,
            );
        });
    });

    describe('testing `allowedFunctions`', () => {
        it('should throw if any element of `allowedFunctions` is not hex', () => {
            const allowedInteractions = ['0x00000002'];
            const allowedAddresses = ['0xcafecafecafecafecafecafecafecafecafecafe'];
            const allowedStandards = ['0x24871b3d'];
            const allowedFunctions = ['allowedFunctions'];

            expect(() =>
                encodeAllowedCalls(
                    allowedInteractions,
                    allowedAddresses,
                    allowedStandards,
                    allowedFunctions,
                ),
            ).to.throw(`Allowed function is not hex. Allowed function: '${allowedFunctions[0]}'`);
        });

        it('should throw if any element of `allowedFunctions` has bytes lenght bigger than 4', () => {
            const allowedInteractions = ['0x00000002'];
            const allowedAddresses = ['0xcafecafecafecafecafecafecafecafecafecafe'];
            const allowedStandards = ['0x24871b3d'];
            const allowedFunctions = ['0x7f23690c00'];

            expect(() =>
                encodeAllowedCalls(
                    allowedInteractions,
                    allowedAddresses,
                    allowedStandards,
                    allowedFunctions,
                ),
            ).to.throw(
                `Allowed interactions has invalid bytes length. Must be 4. Length: ${
                    allowedFunctions[0].length / 2 - 1
                }`,
            );
        });

        it('should throw if any element of `allowedFunctions` has bytes lenght smaller than 4', () => {
            const allowedInteractions = ['0x00000002'];
            const allowedAddresses = ['0xcafecafecafecafecafecafecafecafecafecafe'];
            const allowedStandards = ['0x24871b3d'];
            const allowedFunctions = ['0x7f2369'];

            expect(() =>
                encodeAllowedCalls(
                    allowedInteractions,
                    allowedAddresses,
                    allowedStandards,
                    allowedFunctions,
                ),
            ).to.throw(
                `Allowed interactions has invalid bytes length. Must be 4. Length: ${
                    allowedFunctions[0].length / 2 - 1
                }`,
            );
        });
    });

    it('should pass if `allowedInteractions`, `allowedAddresses`, `allowedStandards` & `allowedFunctions` are valid', () => {
        const allowedInteractions = ['0x00000002', '0x00000003'];
        const allowedAddresses = [
            '0xcafecafecafecafecafecafecafecafecafecafe',
            '0xcafecafecafecafecafecafecafecafecafecafe',
        ];
        const allowedStandards = ['0x24871b3d', '0x24871b3d'];
        const allowedFunctions = ['0x7f23690c', '0x44c028fe'];

        const expectedAllowedCalls =
            '0x002000000002cafecafecafecafecafecafecafecafecafecafe24871b3d7f23690c002000000003cafecafecafecafecafecafecafecafecafecafe24871b3d44c028fe';

        expect(
            encodeAllowedCalls(
                allowedInteractions,
                allowedAddresses,
                allowedStandards,
                allowedFunctions,
            ),
        ).to.equal(expectedAllowedCalls);
    });
});
