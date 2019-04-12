const fs = require('fs-extra');
const concat = require('concat');
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');
const stripDebug = require('strip-debug');
const {promisify} = require('util');

const ensureDir = promisify(fs.ensureDir);
const remove = promisify(fs.remove);
const copyFileSync = promisify(fs.copyFileSync);
const rename = promisify(fs.rename);
const ncpPromise = promisify(ncp);

(async function build() {
  const files = [
    './dist/runtime.js',
    './dist/polyfills.js',
    './dist/scripts.js',
    './dist/main.js'
  ];
  // Delete Folder Elements
  rimraf('elements', async () => {
    console.log('1. Create Folder Elements');
    // Create Folder Elements
    await ensureDir('elements');

    console.log('2. Copy Files from dist to elements');
    // Copy Files from dist to elements
    await ncpPromise('dist/', 'elements/');

    console.log('3. Concat Files for Angular Elements');
    // Conact Files for Angular Elements
    await concat(files, 'elements/eassessment-content-editor.js');

    console.log('4. CleanUp Old Files');
    // CleanUp Old Files
    for (let file of files) {
      file = file.replace('dist', 'elements');
      await remove(file);
    }

    console.log('Remove Console Log');
    // Remove Console Log
    fs.readFile('elements/eassessment-content-editor.js', (err, data) => {
      if (err) throw err;
      let newData = stripDebug(data.toString()).toString();
      fs.writeFile('elements/eassessment-content-editor.js', newData, (err)  => {
        if (err) throw err;
        console.log("The file was saved!");
      });
    });
    

    console.log('Rename Style File');
    // Rename Style File
    rename('elements/styles.css', 'elements/eassessment-content-editor.css');

    console.log('Copy Demo HTML File');
    // Copy Demo HTML File
    copyFileSync('src/elements.html', 'elements/index.html');
  });
})();
