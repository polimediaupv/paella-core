const { default: EsbuildPluginImportGlob } = require('esbuild-plugin-import-glob');
const ImportGlobPlugin = require('esbuild-plugin-import-glob');

require('esbuild').build({
    entryPoints: ['src/debug.js'],
    bundle: true,
    minify: false,
    sourcemap: true,
    watch: true,
    loader: {
        ".svg": "text"
    },
   
    outfile: 'debug/paella-core.js'
}).catch(err => console.error(err));
