const fs = require('fs');
const path = require('path');
const readFrom = path.join(__dirname, 'secret-folder');

// function listFile(pathName){
// console.log(pathName)
fs.readdir(readFrom, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    for (let file of files) {
        // }
        // files.forEach(file => {
        if (file.isDirectory()) continue;
            // console.log("Папка: " + file);
        //  console.log(file.name)
        // listFile(path.join(pathName,file.name));
        // const nameFile = file.name;
        // const typeFile = nameFile.split('.').pop();
        const nameFile = path.parse(file.name).name;
        const typeFile = path.parse(file.name).ext;
        const pathNew = path.join(readFrom, file.name);
        fs.stat(pathNew, (errSt, status) => {
            if (errSt) throw errSt;
            // console.log("Файл: " + status);
            console.log(nameFile + ' - ' + typeFile.substring(1, typeFile.length) + ' - ' + (status.size / 1024).toFixed(3) + 'kB')
        });
        // });
    }
});
// }
// listFile(readFrom);