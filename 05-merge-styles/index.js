const { readdir, createReadStream, createWriteStream } = require('fs');
const { parse, join } = require('path');
const pathToFolder = join(__dirname, 'project-dist');
const pathToFile = createWriteStream(join(pathToFolder, 'bundle.css'));
const pathToFilesForCopy = join(__dirname, 'styles');

readdir(pathToFilesForCopy, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    for (let file of files) {
        const currentFile = createReadStream(join(pathToFilesForCopy, file.name));
        const typeFile = parse(file.name).ext;
        if (typeFile !== '.css') {
            continue;
        }
        currentFile.on('data', data => {
            pathToFile.write(data, 'utf-8');
        })
    }
});