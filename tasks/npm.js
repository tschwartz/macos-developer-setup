const fs = require('fs')
const childProcess = require('child_process');

const initTask = () => {
    const dataFile = './data/npm.json';

    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return next(err);
        }

        const packages = JSON.parse(data);

        console.log(`/**\n * Setting up NPM Packages...\n */`);

        packages.forEach(package => {
            const path = `${package.dest}/${package.bin}`;
            const exists = fs.existsSync(path);
            let cmd = '';

            // Install
            if (!exists && package.keep) {
                console.log(`Installing ${package.name}`);
                cmd = `sudo npm install -g ${package.name}`;
            }

            // Update
            if (exists && package.keep) {
                console.log(`Updating ${package.name}`);
                cmd = `sudo npm install -g ${package.name}`;
            }

            // Uninstall
            if (exists && !package.keep) {
                console.log(`Uninstalling ${package.name}`);
                cmd = `sudo npm uninstall -g ${package.name}`;
            }

            childProcess.execSync(cmd, {
                stdio: [0,1,2]
            });
        });

        console.log(`\n`);
    });
};

module.exports = { initTask };
