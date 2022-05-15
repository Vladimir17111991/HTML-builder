const fs = require('fs');
const stream = new fs.ReadStream('./01-read-file/text.txt',{encoding:'utf-8'});
stream.on('readable',()=>{
    let data;
    while ((data = stream.read()) !== null) {
        console.log(data);
    }
})