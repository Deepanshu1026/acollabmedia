const fs = require('fs');
const path = require('path');

function nuke(targetPath) {
    let iteration = 0;
    while (true) {
        iteration++;
        let didRename = false;

        // Helper to recursively collect dirs from bottom up
        function walk(dir) {
            let entries;
            try {
                entries = fs.readdirSync(dir, { withFileTypes: true });
            } catch (e) {
                return; // Dir might be gone or inaccessible
            }

            for (let entry of entries) {
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) {
                    walk(fullPath);
                    if (entry.name.length > 1) {
                        let newName = 'a';
                        let newPath = path.join(dir, newName);
                        let counter = 1;
                        while (fs.existsSync(newPath) && newPath !== fullPath) {
                            newName = 'a' + counter;
                            newPath = path.join(dir, newName);
                            counter++;
                        }
                        if (newPath !== fullPath) {
                            try {
                                fs.renameSync(fullPath, newPath);
                                didRename = true;
                            } catch (e) { }
                        }
                    }
                } else {
                    try {
                        fs.unlinkSync(fullPath);
                    } catch (e) { }
                }
            }
        }

        walk(targetPath);
        if (!didRename) {
            break;
        }
        if (iteration > 200) break; // Infinite loop protection
    }

    // Now delete
    fs.rmSync(targetPath, { recursive: true, force: true });
}

nuke('.dist_trash');
