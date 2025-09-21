const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, 'dist');
const oldPath = '/AP-Helper/';
const newPath = '/ap-helper/';

function replaceInFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }
    if (data.includes(oldPath)) {
      const result = data.replace(new RegExp(oldPath, 'g'), newPath);
      fs.writeFile(filePath, result, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file ${filePath}:`, err);
        } else {
          console.log(`Replaced paths in ${filePath}`);
        }
      });
    }
  });
}

function traverseDir(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }
    files.forEach(file => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) {
          console.error(`Error stating file ${filePath}:`, err);
          return;
        }
        if (stat.isDirectory()) {
          traverseDir(filePath);
        } else if (filePath.endsWith('.html') || filePath.endsWith('.css') || filePath.endsWith('.js')) {
          replaceInFile(filePath);
        }
      });
    });
  });
}

console.log(`Running post-build script to fix paths in ${distDir}`);
traverseDir(distDir);
