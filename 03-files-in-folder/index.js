const fs = require('fs');
const {join,parse} = require('path');
const readFrom = join(__dirname, 'secret-folder');
try{
    fs.readdir(readFrom, { withFileTypes: true }, (err, files) => {
        if (err) throw err;
        for (let file of files) {
            if (file.isDirectory()) continue;
            const nameFile = parse(file.name).name;
            // const typeFile = nameFile.split('.').pop();
            const typeFile = parse(file.name).ext;
            const pathNew = join(readFrom, file.name);
            fs.stat(pathNew, (err, stats) => {
                if (err) throw err;
                console.log(nameFile + ' - ' + typeFile.substring(1, typeFile.length) + ' - ' + (stats.size / 1024).toFixed(3) + 'kB')
            });
        }
    });
}
catch(error){
console.log(error);
}

