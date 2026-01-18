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

// Copy .htaccess to dist for proper MIME types
const htaccessSrc = path.join(__dirname, 'public', '.htaccess');
const htaccessDest = path.join(__dirname, 'dist', '.htaccess');

if (fs.existsSync(htaccessSrc)) {
  fs.copyFileSync(htaccessSrc, htaccessDest);
  console.log('✓ Copied .htaccess to dist/');
}

// Fix MIME type issues for GitHub Pages
const indexHtmlPath = path.join(__dirname, 'dist', 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Remove all type="module" attributes and related module syntax
  htmlContent = htmlContent.replace(/type="module"\s+crossorigin\s+/g, '');
  htmlContent = htmlContent.replace(/type="module"\s+/g, '');
  htmlContent = htmlContent.replace(/\scrossorigin\s+/g, ' ');
  htmlContent = htmlContent.replace(/\scrossorigin=""/g, '');
  
  // Ensure script tags have correct type
  htmlContent = htmlContent.replace(/<script\s+src="/g, '<script type="application/javascript" src="');
  
  // Move script tags from head to end of body for proper DOM loading order
  const scriptTagRegex = /(<script[^>]*src="[^"]*assets\/[^"]*\.js"[^>]*><\/script>)/g;
  const scriptTags = [];
  
  // Extract script tags
  htmlContent = htmlContent.replace(scriptTagRegex, (match) => {
    scriptTags.push(match);
    return ''; // Remove from current position
  });
  
  // Insert script tags before closing body tag
  if (scriptTags.length > 0) {
    htmlContent = htmlContent.replace('</body>', scriptTags.join('\n    ') + '\n  </body>');
  }
  
  fs.writeFileSync(indexHtmlPath, htmlContent);
  console.log('✓ Fixed MIME type issues and script placement in index.html');
}

console.log('Postbuild complete!');
