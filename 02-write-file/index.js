const fs = require('fs');
const process = require('process');

const createFile = () => {
    fs.open('./02-write-file/text.txt', 'w', (err) => {
        if (err) throw err;
        console.log('File created. Enter text:')
    });
};
createFile();

process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        if (`${chunk}`.trim() === 'exit') {
            console.log("Thank you for your attention!");
            process.exit();
        }
        fs.appendFile('./02-write-file/text.txt', `${chunk}`, 'utf-8', () => {
            console.log('Text added. Enter something else: ')
        });
    }
});
process.on('SIGINT', () => {
    console.log("Thank you for your attention!");
    setTimeout(() => process.exit(0), 1000);
});
