import fs from 'fs';
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const mergeCss = async (cssPath, outPath, outFileName) => {
    await fs.promises.mkdir(outPath, { recursive: true });
    const files = fs.readdirSync(cssPath);
    let css = '';
    files.forEach((file) => {
        css += fs.readFileSync(path.join(cssPath, file));
    });
    fs.writeFileSync(path.join(outPath, outFileName), css);
}

const cssPath = path.join(__dirname, '../css/');
mergeCss(cssPath, path.join(__dirname, '../../css'), 'paella-core.css');
