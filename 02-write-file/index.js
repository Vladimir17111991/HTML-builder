const fs = require('fs');
const path = require('path');
const process = require('process');
const filePath = path.join(__dirname,'text.txt');

const createFile = () => {
        fs.open(filePath, 'w', (err) => {
        if (err) throw err;
        console.log('File created. Enter text:')
    });
};
const farewellText = ()=>{
    console.log("Thank you for your attention!");
    process.exit();
};

createFile();
process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        if (`${chunk}`.trim() === 'exit') {
            farewellText();
        }
        fs.appendFile(filePath, `${chunk}`, 'utf-8', () => {
            console.log('Text added. Enter something else: ')
        });
    }
});

process.on('SIGINT', farewellText)