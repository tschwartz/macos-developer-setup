const fs = require('fs');
const childProcess = require('child_process');

const initTask = () => {
    const dataFile = './data/git.json';

    fs.readFile(dataFile, (err, data) => {
        if (err) {
            return next(err);
        }

        const repos = JSON.parse(data);

        console.log(`/**\n * Setting up GitHub projects...\n */`);

        repos.forEach(repo => {
            const path = `${repo.workspace}/${repo.name}/`;
            const exists = fs.existsSync(path);
            let options = {
                cwd: repo.workspace,
                stdio: [0,1,2]
            };

            // Clone Repository
            if (!exists && repo.keep) {

                console.log(`Cloning Git project, setting the upstream and the email address  ${repo.name}`);

                if (repo.origin && repo.name) {
                    try {
                        childProcess.execSync(`git clone ${repo.origin} ${repo.name}`, options);
                    } catch (err) {}
                }

                // // Add upstream
                if (repo.upstream && repo.name) {
                    options.cwd = path;
                    try {
                        childProcess.execSync(`git remote add upstream ${repo.upstream}`, options);
                    } catch (err) {}
                }

                // Set email address
                if (repo.email && repo.email !== 'schwartz.tyler+github@gmail.com') {
                    options.cwd = path;
                    try {
                        childProcess.execSync(`git config --local user.email "${repo.email}"`, options);
                    } catch (err) {}
                }

            }

            // Update repository
            if (exists && repo.keep) {
                console.log(`Setting origin and upstream remotes and email address for ${repo.name}`);

                // Set origin url
                if (repo.origin && repo.name) {
                    options.cwd = path;
                    try {
                        childProcess.execSync(`git remote set-url origin ${repo.origin}`, options);
                    } catch (err) {}
                }

                // Set upstream url
                if (repo.upstream && repo.name) {
                    options.cwd = path;
                    try {
                        childProcess.execSync(`git remote set-url upstream ${repo.upstream}`, options);
                    } catch (err) {}
                }
            }

            // Delete repository
            if (exists && !repo.keep) {
                console.log(`Deleting Git project ${repo.name}`);

                options.cwd = repo.workspace;
                try {
                    childProcess.execSync(`git push --all origin`, options);
                    childProcess.execSync(`rm -rf ${repo.name}`, options);
                } catch (err) {}
            }
        });

        console.log(`\n`);
    });
};

module.exports = { initTask };
