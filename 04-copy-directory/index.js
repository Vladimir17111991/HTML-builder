const fs = require('fs');
const path = require('path');
const pathFolderOriginal = path.join(__dirname, 'files');
const pathFolderCopy = path.join(__dirname, 'files-copy');
fs.mkdir(pathFolderCopy, { recursive: true }, err => {
    if (err) throw err;
    console.log('Папка успешно создана');
});
fs.readdir(pathFolderOriginal, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        fs.copyFile(path.join(pathFolderOriginal, file.name), path.join(pathFolderCopy, file.name), (err) => {
            if (err) throw err;
        })
        console.log(`Файл ${file.name} успешно скопирован`)
    })

})
