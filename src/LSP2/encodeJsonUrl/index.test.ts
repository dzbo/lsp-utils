// eslint-disable-next-line @typescript-eslint/no-var-requires
const { encodeJsonUrl } = require('../../../dist/lib/es5/src/LSP2/encodeJsonUrl');

describe('encodeJsonUrl', () => {
    test('true', () => {
        console.log(
            encodeJsonUrl(
                'keccak256(utf8)',
                '{"name":"USDStablecoin","description":"Some random description about the token USD Stablecoin"}',
                'https://google.com/'
            )
        );
        // expect(isNil(undefined)).toBe(true);
        // expect(isNil(null)).toBe(true);
    });

    test('false', () => {
        // expect(isNil('')).toBe(false);
        // expect(isNil([])).toBe(false);
        // expect(isNil({})).toBe(false);
        // expect(isNil(25)).toBe(false);
        // expect(isNil(() => undefined)).toBe(false);
        // expect(isNil(Symbol('my symbol'))).toBe(false);
    });
});
