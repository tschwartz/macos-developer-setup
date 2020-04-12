const fs = require('fs')
const childProcess = require('child_process');

const initTask = () => {
    const dataFile = './data/folders.json';

    // Prevents IT provisioned work laptop from having incorrect permissions
    childProcess.execSync('sudo chown tschwartz ~/');

    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return next(err);
        }

        const folders = JSON.parse(data);

        console.log(`/**\n * Setting up folders...\n */`);

        folders.forEach(folder => {
            const dest = folder.dest;

            if (!fs.existsSync(dest)) {
                fs.mkdirSync(dest);
            }
            console.log(`Creating ${dest}`);

        });

        console.log(`\n`);
    });
};

module.exports = { initTask };
