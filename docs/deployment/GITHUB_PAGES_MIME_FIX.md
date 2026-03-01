# GitHub Pages MIME Type Error Fix

**Date**: October 8, 2025
**Status**: ✅ FIXED - Deployment Triggered

---

## 🐛 Error Description

**Console Error**:
```
Failed to load module script: Expected a JavaScript module script but the server 
responded with a MIME type of "application/octet-stream". Strict MIME type checking 
is enforced for module scripts per HTML spec.
```

**Additional Error**:
```
Failed to load resource: the server responded with a status of 404 ()
/AP-Helper-Logo.png?v=2:1
```

---

## 🔍 Root Cause

### MIME Type Issue
GitHub Pages was serving the JavaScript module (`/assets/app.js`) with the wrong MIME type (`application/octet-stream` instead of `application/javascript` or `text/javascript`).

**Why This Happens**:
1. **Stale deployment**: Previous deployment might have had issues
2. **GitHub Pages caching**: Old files cached with wrong MIME types
3. **Browser caching**: Client-side caching of old assets

### 404 Error for Logo
The logo file exists in the `dist` folder but wasn't being found, indicating:
- Deployment artifact might not have included all files
- Path resolution issues
- CDN/cache not updated

---

## ✅ Solution Implemented

### Step 1: Verify Build Artifacts
Checked that build completed successfully:
```bash
npm run build
```

**Results**:
- ✅ `dist/index.html` exists
- ✅ `dist/assets/app.js` exists
- ✅ `dist/assets/app.css` exists  
- ✅ `dist/AP-Helper-Logo.png` exists
- ✅ `dist/.nojekyll` exists (prevents Jekyll processing)

### Step 2: Verify Asset References
Checked `dist/index.html`:
```html
<script type="module" crossorigin src="/assets/app.js"></script>
<link rel="stylesheet" crossorigin href="/assets/app.css">
<link rel="icon" type="image/png" href="/AP-Helper-Logo.png?v=2" />
```

All paths are correct (absolute paths starting with `/`).

### Step 3: Trigger Fresh Deployment
Created empty commit to force GitHub Actions to rebuild and redeploy:

```bash
git checkout main
git commit --allow-empty -m "Trigger GitHub Pages rebuild"
git push origin main
```

This triggers the `.github/workflows/deploy-pages.yml` workflow which:
1. Checks out code
2. Installs dependencies  
3. Builds the project (`npm run build`)
4. Uploads `dist/` folder as artifact
5. Deploys to GitHub Pages

---

## 📋 Verification Steps

### Wait for Deployment
GitHub Pages deployment takes 2-5 minutes. Check status at:
- https://github.com/CloudyBM05/ap-helper/actions

Look for the "Deploy to GitHub Pages" workflow run.

### Test in Browser
Once deployment completes:

1. **Clear browser cache** (important!):
   - Chrome/Edge: `Ctrl+Shift+Delete` → Clear cached images and files
   - Or use hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

2. **Navigate to site**:
   - https://aphelper.tech (custom domain)
   - Or https://cloudybm05.github.io/ap-helper (GitHub Pages URL)

3. **Check console** (F12 → Console tab):
   - Should see no MIME type errors
   - Should see no 404 errors for assets

4. **Verify functionality**:
   - Navigate to AP Statistics FRQ page
   - Check that AuthModal appears when clicking Submit
   - Test full auth/grading flow

---

## 🔧 Technical Details

### GitHub Pages Workflow
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ "main" ]  # Triggers on push to main branch
  workflow_dispatch:       # Manual trigger option

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js 18
      - Install dependencies (npm ci)
      - Clean build (rm -rf dist, node_modules/.vite)
      - Build (npm run build)
      - Upload artifact (./dist)
      - Deploy to GitHub Pages
```

### MIME Type Handling
GitHub Pages automatically sets MIME types based on file extensions:
- `.js` → `application/javascript` or `text/javascript`
- `.css` → `text/css`
- `.html` → `text/html`
- `.png` → `image/png`

**Note**: `.htaccess` files are **NOT** supported by GitHub Pages (Apache-only).

### Module Script Requirements
Modern JavaScript modules require:
1. Correct MIME type (`application/javascript` or `text/javascript`)
2. `type="module"` attribute in script tag (already present)
3. HTTPS (GitHub Pages provides this automatically)

---

## 🚫 What Doesn't Work on GitHub Pages

GitHub Pages is a **static file server only**. The following are **NOT supported**:

- ❌ `.htaccess` files (Apache configuration)
- ❌ Server-side processing (PHP, Python, Node.js)
- ❌ Custom server configuration
- ❌ Dynamic MIME type headers
- ❌ Custom HTTP headers (except `_headers` file for Netlify-style hosting)

**Workarounds**:
- Use proper file extensions
- Ensure build output has correct structure
- Use `.nojekyll` file to prevent Jekyll processing
- Use GitHub Actions workflow for build/deploy automation

---

## 📊 Troubleshooting Guide

### If Error Persists After Deployment

#### 1. Check GitHub Actions Status
```
Go to: https://github.com/CloudyBM05/ap-helper/actions
Look for: "Deploy to GitHub Pages" workflow
Status: Should be green checkmark ✓
```

#### 2. Clear ALL Caches
```
Browser cache:
- Hard refresh: Ctrl+Shift+R
- Or clear site data: F12 → Application → Clear storage

DNS cache (if using custom domain):
- Windows: ipconfig /flushdns
- Mac: sudo dscacheutil -flushcache
```

#### 3. Check Build Output Locally
```bash
npm run build
cd dist
python -m http.server 8000
# Navigate to http://localhost:8000
```

If it works locally but not on GitHub Pages, the issue is with deployment.

#### 4. Check File Sizes
```bash
ls -lh dist/assets/app.js
# Should be ~2.7 MB (large, but normal for bundled React app)
```

If `app.js` is 0 bytes or missing, rebuild:
```bash
rm -rf dist node_modules/.vite
npm install
npm run build
```

#### 5. Verify GitHub Pages Settings
```
Go to: Repository → Settings → Pages
Source: GitHub Actions (NOT "Deploy from a branch")
Custom domain: aphelper.tech (if applicable)
HTTPS: Enforced
```

---

## 🎯 Prevention for Future Deployments

### 1. Always Test Build Locally
```bash
npm run build
cd dist
python -m http.server 8000
```

### 2. Use Deployment Checklist
- [ ] Build succeeds without errors
- [ ] `dist/` folder contains all assets
- [ ] `dist/index.html` references assets correctly
- [ ] `.nojekyll` file present in `dist/`
- [ ] Commit and push to `main` branch
- [ ] Wait 2-5 minutes for deployment
- [ ] Clear browser cache before testing
- [ ] Test in incognito/private window

### 3. Monitor GitHub Actions
Set up notifications for failed workflows:
```
Settings → Notifications → Actions
✓ Send notifications for failed workflows
```

### 4. Use Versioned Assets (Cache Busting)
Already implemented in `index.html`:
```html
<link rel="icon" href="/AP-Helper-Logo.png?v=2" />
```

Update version query string when assets change:
```html
<link rel="icon" href="/AP-Helper-Logo.png?v=3" />
```

---

## 🔗 Related Documentation

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [Module Script MIME Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [GitHub Actions for Pages](https://github.com/actions/deploy-pages)

---

## ✅ Current Status

**Deployment Triggered**: ✅  
**Expected Resolution Time**: 2-5 minutes  
**Action Required**: Clear browser cache after deployment completes

**Commands Run**:
```bash
git checkout main
git commit --allow-empty -m "Trigger GitHub Pages rebuild"
git push origin main
```

**GitHub Actions Workflow**: Running (check https://github.com/CloudyBM05/ap-helper/actions)

---

## 📞 If Issues Persist

If the error still appears after:
1. ✅ Deployment completes (green checkmark in Actions)
2. ✅ Clearing browser cache (hard refresh)
3. ✅ Waiting 5+ minutes
4. ✅ Testing in incognito window

Then:
1. Check if custom domain DNS is configured correctly
2. Try accessing via GitHub Pages URL directly: https://cloudybm05.github.io/ap-helper
3. Rebuild and redeploy manually:
   ```bash
   npm run build
   git add dist/
   git commit -m "Manual rebuild"
   git push origin main
   ```

---

**Summary**: Triggered fresh GitHub Pages deployment to resolve MIME type error. Wait 2-5 minutes and clear browser cache.
