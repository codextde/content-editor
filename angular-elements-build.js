const fs = require('fs-extra');
const concat = require('concat');
var ncp = require('ncp').ncp;
var rimraf = require("rimraf");


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
    await fs.ensureDir('elements');

    console.log('2. Copy Files from dist to elements');
    // Copy Files from dist to elements
    await ncp('dist/', 'elements/');

    console.log('3. Conact Files for Angular Elements');
    // Conact Files for Angular Elements
    await concat(files, 'elements/eassessment-content-editor.js');

    console.log('4. CleanUp Old Files');
    // CleanUp Old Files
    for (let file of files) {
      file = file.replace('dist', 'elements');
      await fs.remove(file);
    }

    console.log('Rename Style File');
    // Rename Style File
    fs.rename('elements/styles.css', 'elements/eassessment-content-editor.css');

    console.log('Copy Demo HTML File');
    // Copy Demo HTML File
    fs.copyFileSync('src/elements.html', 'elements/index.html');
  });
})();