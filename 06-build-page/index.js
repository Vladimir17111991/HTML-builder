const FSP = require('fs/promises');
const fs = require('fs');
const { join, parse } = require('path');
const { throws } = require('assert');

const pathFolderCopy = join(__dirname, 'project-dist');
const pathFolderAssets = join(__dirname, 'assets');
const newFolderAssets = join(pathFolderCopy, 'assets');

const pathToStyleCss = fs.createWriteStream(join(pathFolderCopy, 'style.css'));
const pathToStylesCopy = join(__dirname, 'styles');

const pathToTemplate = join(__dirname, 'template.html');
const pathToComponents = join(__dirname, 'components');
let indexHtml = '';

try {
    FSP.mkdir(pathFolderCopy, { recursive: true }, (err) => {
        if (err) throw err;
        FSP.mkdir(newFolderAssets, { recursive: true }, (err) => {
            if (err) throw err;
        });
    });
}
catch (err) { console.log(err); }


/*------------------------------------------------------------------------------------------------------------------------------------*/
// create folder project-dist and copy folder assets in project-dist
async function copyDirAssets(src, dest) {
    const files = await FSP.readdir(src, { withFileTypes: true });
    FSP.mkdir(dest, { recursive: true }, (err) => {
        if (err) throw err;

    });
    for (let file of files) {
        const srcPath = join(src, file.name);
        const destPath = join(dest, file.name);
        file.isDirectory() ? await copyDirAssets(srcPath, destPath) : await FSP.copyFile(srcPath, destPath);
    }
};
/*------------------------------------------------------------------------------------------------------------------------------------*/
// create file style.css and copying information from files to style.css
async function copyStyle(src, dest) {
    const files = await FSP.readdir(src, { withFileTypes: true });
    for (let file of files) {
        const currentFile = fs.createReadStream(join(src, file.name));
        const typeFile = parse(file.name).ext;
        if (typeFile !== '.css') {
            continue;
        }
        currentFile.on('data', data => {
            dest.write(data, 'utf-8');
        })
    }
};
/*------------------------------------------------------------------------------------------------------------------------------------*/
// create file index.html and adding information from template.html
async function copyIndex(src, dest) {
    await FSP.copyFile(src, join(dest, 'index.html'));
    const files = await FSP.readdir(pathToComponents, { withFileTypes: true });//components
    const data = await FSP.readFile(join(dest, 'index.html'), 'utf-8'); // index.html(data)
    indexHtml = data;
    files.forEach(file => { //footer,main,header
        fs.readFile(join(pathToComponents, file.name, ''), "utf8", (err, data) => {    //data from the file
            if (err) throw err;
            const nameFile = parse(file.name).name;    //footer.html, main.html, header.html
            indexHtml = indexHtml.replace(`{{${nameFile}}}`, data);
            fs.writeFile(join(dest, 'index.html'), indexHtml, (err) => {
                if (err) throw err;
            })
        });
    });
};
/*------------------------------------------------------------------------------------------------------------------------------------*/
copyDirAssets(pathFolderAssets, newFolderAssets);
copyStyle(pathToStylesCopy, pathToStyleCss);
copyIndex(pathToTemplate, pathFolderCopy)