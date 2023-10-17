import dts from 'vite-plugin-dts';

import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        minify: false,
        lib: {
            entry: './src/index.ts',
            formats: ['es', 'cjs'],
            fileName: 'index',
        },
        target: 'esnext',
        emptyOutDir: true,
        outDir: './dist',
    },
    plugins: [
        dts({
            exclude: ['./types/**/*.ts'],
        }),
    ],
});
