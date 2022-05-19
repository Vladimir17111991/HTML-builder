const fs = require('fs');
const { join } = require('path');
const pathFolderOriginal = join(__dirname, 'files');
const pathFolderCopy = join(__dirname, 'files-copy');

try {
    fs.mkdir(pathFolderCopy, { recursive: true }, err => {
        if (err) throw err;
        console.log('Папка успешно создана');
    });
    fs.readdir(pathFolderOriginal, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            fs.copyFile(join(pathFolderOriginal, file.name), join(pathFolderCopy, file.name), (err) => {
                if (err) throw err;
            })
            console.log(`Файл ${file.name} успешно скопирован`);
        })
    });
}
catch (err) {
    console.log(err);
}

