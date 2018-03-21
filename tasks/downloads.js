const fs = require('fs');
const childProcess = require('child_process');

const initTask = () => {
    const dataFile = './data/downloads.json';

    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return next(err);
        }

        const downloads = JSON.parse(data);

        console.log(`/**\n * Opening software downloads...\n */`);

        downloads.forEach(download => {
            childProcess.execSync(`open ${download.url}`, {
                stdio: [0,1,2]
            });
            console.log(`Opening a link to ${download.url}`);
        });

        console.log(`\n`);
    });
};

module.exports = { initTask };

