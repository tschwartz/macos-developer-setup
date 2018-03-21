const fs = require('fs')

const initTask = () => {
    const dataFile = './data/mac-os-settings.json';

    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return next(err);
        }

        const settings = JSON.parse(data);

        console.log(`/**\n * Configuring macOS settings...\n */`);

        settings.forEach(setting => {
            const childProcess = require('child_process');

            if (setting.enabled) {
                console.log(`${setting.description}`);

                childProcess.execSync(setting.cmd);
            }
        });

        console.log(`\n`);
    });
};

module.exports = { initTask };
