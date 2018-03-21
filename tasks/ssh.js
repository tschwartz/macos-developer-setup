const fs = require('fs')
const childProcess = require('child_process');
const username = require("os").userInfo().username;

const initTask = () => {
    const dataFile = './data/ssh.json';

    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return next(err);
        }

        const dest = `/Users/${username}/.ssh`;
        const keys = JSON.parse(data);

        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest);
        }

        console.log(`/**\n * Setting up shh keys...\n */`);

        keys.forEach(key => {
            const link = `${dest}/${key.file}`;
            const dropbox = key.dropbox;
            const permissions = key.permissions;

            if (fs.existsSync(dest) && fs.existsSync(link)) {
                fs.unlinkSync(link);
            }

            if (fs.existsSync(dest) && !fs.existsSync(link) && fs.existsSync(dropbox)) {
                fs.symlinkSync(dropbox, link);

                // Set correct file permissions
                if (permissions) {
                    childProcess.execSync(`sudo chmod ${permissions} ${link}`, {
                        stdio: [0,1,2]
                    });
                }
            }
            console.log(`Creating symlink to ssh key ${key.file}`);

        });

        console.log(`\n`);
    });
};

module.exports = { initTask };
