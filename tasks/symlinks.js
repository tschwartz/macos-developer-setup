const fs = require('fs');

const initTask = () => {
    const dataFile = '/Users/tschwartz/.googledrive/macos-developer-setup/data/symlinks.json';

    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return next(err);
        }

        const symlinks = JSON.parse(data) || [];

        console.log(`/**\n * Setting up ${symlinks.length} symbolic links...\n */`)

        symlinks.forEach(symlink => {
            const dest = symlink.dest;
            const link = `${dest}/${symlink.file}`;
            const location = symlink.location;

            if (fs.existsSync(dest) && fs.existsSync(link)) {
                fs.unlinkSync(link);
            }

            if (fs.existsSync(dest) && !fs.existsSync(link) && fs.existsSync(location)) {
                console.log(`Creating Symlink for ${link}`);
                fs.symlinkSync(location, link);
            }
        });

        console.log(`\n`);
    });
};

module.exports = { initTask };
