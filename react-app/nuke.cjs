const fs = require('fs');
const path = require('path');

function nuke(targetPath) {
    if (!fs.existsSync(targetPath)) return;
    
    let iteration = 0;
    while (true) {
        iteration++;
        let didRename = false;
        
        function walk(dir) {
            let entries;
            try {
                entries = fs.readdirSync(dir, { withFileTypes: true });
            } catch (e) { return; }
            
            for (let entry of entries) {
                const fullPath = path.join(dir, entry.name);
                if (entry.isDirectory()) {
                    walk(fullPath);
                    if (entry.name.length > 1 && entry.name !== 'react-app' && entry.name !== 'dist') {
                       // we can rename any directory in the trash
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
                            } catch (e) {}
                        }
                    }
                } else {
                    try {
                        fs.unlinkSync(fullPath);
                    } catch (e) {}
                }
            }
        }
        
        walk(targetPath);
        if (!didRename || iteration > 500) break;
    }
    
    try { fs.rmSync(targetPath, { recursive: true, force: true }); } catch (e) {}
}

nuke('.dist_trash');
