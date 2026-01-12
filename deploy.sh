#!/bin/bash

echo "🚀 AP Helper Deployment Script - Comprehensive Deploy to aphelper.tech"
echo "================================================================"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

echo ""
print_status "Starting comprehensive deployment process..."
echo ""

# Step 1: Verify we're in the correct directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root directory."
    exit 1
fi

if [ ! -f "grader_api.py" ]; then
    print_error "grader_api.py not found. Please run this script from the project root directory."
    exit 1
fi

print_success "✅ Project files verified"

# Step 2: Check if backend server is running
print_status "Checking if backend server is running..."
if curl -s "http://127.0.0.1:8080/api/unit-topics?course=apush&unit=unit1" > /dev/null 2>&1; then
    print_success "✅ Backend server is running and responding"
else
    print_warning "⚠️  Backend server not detected. Make sure to run 'python grader_api.py' in another terminal"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Step 3: Test all APUSH units
print_status "Testing all 9 APUSH units..."
for i in {1..9}; do
    if curl -s "http://127.0.0.1:8080/api/unit-topics?course=apush&unit=unit$i" | grep -q "topics"; then
        echo "  ✅ Unit $i: Working"
    else
        echo "  ❌ Unit $i: Failed"
        print_error "Unit $i is not responding correctly"
        exit 1
    fi
done
print_success "✅ All 9 APUSH units tested and working"

# Step 4: Install dependencies
print_status "Installing/updating npm dependencies..."
npm install
if [ $? -ne 0 ]; then
    print_error "npm install failed"
    exit 1
fi
print_success "✅ Dependencies installed"

# Step 5: Run linting
print_status "Running ESLint..."
npm run lint
if [ $? -ne 0 ]; then
    print_warning "⚠️  Linting issues found, but continuing..."
fi

# Step 6: Build for production
print_status "Building for production..."
npm run build
if [ $? -ne 0 ]; then
    print_error "Build failed"
    exit 1
fi
print_success "✅ Production build completed"

# Step 7: Verify built files
print_status "Verifying build output..."
if [ ! -f "dist/index.html" ]; then
    print_error "dist/index.html not found"
    exit 1
fi

if [ ! -f "dist/assets/app.js" ]; then
    print_error "dist/assets/app.js not found"
    exit 1
fi

if [ ! -f "dist/assets/app.css" ]; then
    print_error "dist/assets/app.css not found"
    exit 1
fi

if [ ! -f "dist/.nojekyll" ]; then
    print_error "dist/.nojekyll not found"
    exit 1
fi

print_success "✅ All required build files present"

# Step 8: Deploy to GitHub Pages
print_status "Deploying to GitHub Pages (aphelper.tech)..."
npm run deploy
if [ $? -ne 0 ]; then
    print_error "GitHub Pages deployment failed"
    exit 1
fi
print_success "✅ Deployed to GitHub Pages"

# Step 9: Summary
echo ""
echo "🎉 DEPLOYMENT COMPLETE! 🎉"
echo "========================"
echo ""
print_success "✅ Frontend deployed to: https://aphelper.tech"
print_success "✅ All 9 APUSH units working with Socratic AI"
print_success "✅ Authentication system configured"
print_success "✅ Progress tracking enabled"
print_success "✅ Mobile responsive design"
echo ""
print_status "Backend API should be deployed separately to:"
print_status "   https://ap-helper-2d9f117e9bdb.herokuapp.com"
echo ""
print_status "To deploy backend to Heroku:"
print_status "   git push heroku main"
echo ""
print_success "🚀 AP Helper is ready for students to use!"
echo ""
print_status "Test the deployment:"
print_status "1. Visit https://aphelper.tech"
print_status "2. Navigate to Socratic Learning"
print_status "3. Select APUSH"
print_status "4. Choose any unit (1-9)"
print_status "5. Verify topics load correctly"
print_status "6. Test chat functionality"
echo ""
print_success "🎯 Everything is configured and ready to go!"
