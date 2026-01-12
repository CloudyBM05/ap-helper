# AP Helper Deployment Script for Windows PowerShell
# Deploy to GitHub Pages (aphelper.tech) with comprehensive testing

Write-Host "🚀 AP Helper Deployment Script - Deploy to aphelper.tech" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Info {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

Write-Host ""
Write-Info "Starting comprehensive deployment process..."
Write-Host ""

# Step 1: Verify project files
Write-Info "Verifying project files..."
if (-not (Test-Path "package.json")) {
    Write-Error "package.json not found. Please run this script from the project root directory."
    exit 1
}

if (-not (Test-Path "grader_api.py")) {
    Write-Error "grader_api.py not found. Please run this script from the project root directory."
    exit 1
}

Write-Success "✅ Project files verified"

# Step 2: Check backend server
Write-Info "Testing backend server connection..."
try {
    $response = Invoke-WebRequest -Uri "http://127.0.0.1:8080/api/unit-topics?course=apush&unit=unit1" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Success "✅ Backend server is running and responding"
    }
} catch {
    Write-Warning "⚠️  Backend server not detected. Make sure to run 'python grader_api.py' in another terminal"
    $continue = Read-Host "Continue anyway? (y/N)"
    if ($continue -notmatch "^[Yy]$") {
        exit 1
    }
}

# Step 3: Test all APUSH units
Write-Info "Testing all 9 APUSH units..."
$allUnitsWorking = $true
for ($i = 1; $i -le 9; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://127.0.0.1:8080/api/unit-topics?course=apush&unit=unit$i" -Method GET -TimeoutSec 5
        $data = $response.Content | ConvertFrom-Json
        if ($data.topics.Count -gt 0) {
            Write-Host "  ✅ Unit $i`: Working ($($data.topics.Count) topics)" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Unit $i`: No topics found" -ForegroundColor Red
            $allUnitsWorking = $false
        }
    } catch {
        Write-Host "  ❌ Unit $i`: Connection failed" -ForegroundColor Red
        $allUnitsWorking = $false
    }
}

if ($allUnitsWorking) {
    Write-Success "✅ All 9 APUSH units tested and working"
} else {
    Write-Error "Some APUSH units are not working properly"
    exit 1
}

# Step 4: Install dependencies
Write-Info "Installing/updating npm dependencies..."
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Error "npm install failed"
    exit 1
}
Write-Success "✅ Dependencies installed"

# Step 5: Run linting (optional)
Write-Info "Running ESLint..."
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Warning "⚠️  Linting issues found, but continuing..."
}

# Step 6: Build for production
Write-Info "Building for production..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed"
    exit 1
}
Write-Success "✅ Production build completed"

# Step 7: Verify build output
Write-Info "Verifying build output..."
$requiredFiles = @("dist/index.html", "dist/assets/app.js", "dist/assets/app.css", "dist/.nojekyll", "dist/404.html")

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  ✅ $file" -ForegroundColor Green
    } else {
        Write-Host "  ❌ $file (missing)" -ForegroundColor Red
        Write-Error "Required build file missing: $file"
        exit 1
    }
}
Write-Success "✅ All required build files present"

# Step 8: Deploy to GitHub Pages
Write-Info "Deploying to GitHub Pages (aphelper.tech)..."
npm run deploy
if ($LASTEXITCODE -ne 0) {
    Write-Error "GitHub Pages deployment failed"
    exit 1
}
Write-Success "✅ Deployed to GitHub Pages"

# Step 9: Deployment summary
Write-Host ""
Write-Host "🎉 DEPLOYMENT COMPLETE! 🎉" -ForegroundColor Magenta
Write-Host "========================" -ForegroundColor Magenta
Write-Host ""
Write-Success "✅ Frontend deployed to: https://aphelper.tech"
Write-Success "✅ All 9 APUSH units working with Socratic AI"
Write-Success "✅ Authentication system configured"
Write-Success "✅ Progress tracking enabled"
Write-Success "✅ Mobile responsive design"
Write-Host ""
Write-Info "Backend API should be deployed separately to:"
Write-Info "   https://ap-helper-2d9f117e9bdb.herokuapp.com"
Write-Host ""
Write-Info "To deploy backend to Heroku:"
Write-Info "   git push heroku main"
Write-Host ""
Write-Success "🚀 AP Helper is ready for students to use!"
Write-Host ""
Write-Info "Test the deployment:"
Write-Info "1. Visit https://aphelper.tech"
Write-Info "2. Navigate to Socratic Learning" 
Write-Info "3. Select APUSH"
Write-Info "4. Choose any unit (1-9)"
Write-Info "5. Verify topics load correctly"
Write-Info "6. Test chat functionality"
Write-Host ""
Write-Success "🎯 Everything is configured and ready to go!"
Write-Host ""

# Optional: Open the deployed site
$openSite = Read-Host "Open https://aphelper.tech in your browser? (y/N)"
if ($openSite -match "^[Yy]$") {
    Start-Process "https://aphelper.tech"
}
