import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
    root: './src',
    build: {
        outDir: '../dist',
        lib: {
            entry: './js/index.js',
            name: 'paella-core'
        },
        rollupOptions: {
            output: {
                assetFileNames: assetInfo => {
                    return path.extname(assetInfo.name) === '.css' ? 'paella-core.css' : assetInfo.name;
                }
            }
        }
    }
});
