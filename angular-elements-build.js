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
  await rimraf('elements', async function () { 
    return await console.log("Folder deleted");
  });
  // Create Folder Elements
  await fs.ensureDir('elements');

  // Copy Files from dist to elements
  await ncp('dist/', 'elements/');

  // Conact Files for Angular Elements
  await concat(files, 'elements/eassessment-content-editor.js');

  // CleanUp Old Files
  files.forEach(async (file) => {
    file = file.replace('dist', 'elements');
    await rimraf(file, async function () { 
      await console.log("File deleted", file);
    })
  })
  // Rename Style File
  fs.rename('elements/styles.css', 'elements/eassessment-content-editor.css');

  // Copy Demo HTML File
  fs.copyFileSync('src/elements.html', 'elements/index.html');
})();