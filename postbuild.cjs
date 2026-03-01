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

// Create .htaccess for proper MIME types
const htaccessContent = `# Enable MIME type for ES modules
AddType text/javascript .js
AddType text/javascript .mjs

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE text/javascript
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType text/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# Fallback to index.html for SPA
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]`;

const htaccessDest = path.join(__dirname, 'dist', '.htaccess');
fs.writeFileSync(htaccessDest, htaccessContent);
console.log('✓ Created .htaccess with proper MIME types in dist/');

// For custom domains, ensure proper HTML structure without breaking ES modules
const indexHtmlPath = path.join(__dirname, 'dist', 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Ensure ES module scripts have proper type attribute
  htmlContent = htmlContent.replace(
    /<script\s+(crossorigin\s+)?src="([^"]*\.js)"([^>]*)>/g, 
    '<script type="module" crossorigin src="$2"$3>'
  );
  
  fs.writeFileSync(indexHtmlPath, htmlContent);
  console.log('✓ Ensured proper ES module script types in index.html');
}

console.log('Postbuild complete!');
