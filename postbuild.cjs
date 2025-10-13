const fs = require('fs');
const path = require('path');

console.log('Running postbuild script...');

// Copy .nojekyll to dist
const nojekyllSrc = path.join(__dirname, 'public', '.nojekyll');
const nojekyllDest = path.join(__dirname, 'dist', '.nojekyll');

if (fs.existsSync(nojekyllSrc)) {
  fs.copyFileSync(nojekyllSrc, nojekyllDest);
  console.log('✓ Copied .nojekyll to dist/');
} else {
  // Create .nojekyll if it doesn't exist
  fs.writeFileSync(nojekyllDest, '');
  console.log('✓ Created .nojekyll in dist/');
}

// Copy 404.html to dist
const html404Src = path.join(__dirname, 'public', '404.html');
const html404Dest = path.join(__dirname, 'dist', '404.html');

if (fs.existsSync(html404Src)) {
  fs.copyFileSync(html404Src, html404Dest);
  console.log('✓ Copied 404.html to dist/');
}

console.log('Postbuild complete!');
