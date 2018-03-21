const fs = require('fs');

const initTask = () => {
    const dataFile = './data/symlinks.json';

    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return next(err);
        }

        const symlinks = JSON.parse(data);

        console.log(`/**\n * Setting up symbolic links...\n */`)

        symlinks.forEach(symlink => {
            const dest = symlink.dest;
            const link = `${dest}/${symlink.file}`;
            const dropbox = symlink.dropbox;

            if (fs.existsSync(dest) && fs.existsSync(link)) {
                fs.unlinkSync(link);
            }

            if (fs.existsSync(dest) && !fs.existsSync(link) && fs.existsSync(dropbox)) {
                console.log(`Creating Symlink for ${link}`);
                fs.symlinkSync(dropbox, link);
            }
        });

        console.log(`\n`);
    });
};

module.exports = { initTask };
