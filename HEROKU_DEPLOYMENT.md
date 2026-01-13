# Heroku Deployment Guide - Socratic AI Tutor

## 🚀 Deploying the Socratic Tutor API to Heroku

### Option 1: Separate Heroku App (Recommended)
Create a separate Heroku app for the Socratic tutor API:

```bash
# Navigate to the API directory
cd api

# Create new Heroku app
heroku create your-app-socratic-api

# Set environment variables
heroku config:set GEMINI_API_KEY=your_gemini_api_key_here
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://aphelper.tech

# Deploy
git init
git add .
git commit -m "Initial Socratic API deployment"
git push heroku main
```

### Option 2: Add to Existing Heroku App
If you want to add this to your existing aphelper.tech app:

```bash
# Set the new environment variable in your existing app
heroku config:set GEMINI_API_KEY=your_gemini_api_key_here -a your-existing-app

# The API will be available at: https://aphelper.tech/api/
```

### Required Environment Variables:
```
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=production
FRONTEND_URL=https://aphelper.tech
```

### Frontend Integration:
Update your frontend build to point to the production API:

```javascript
// In SocraticChat.tsx, update the fetch URL:
const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-app.herokuapp.com' 
  : 'http://localhost:3010';

const response = await fetch(`${API_BASE}/api/chat/send`, {
  // ... rest of config
});
```

### Current Status:
✅ **Enhanced Fallback System**: Works perfectly even without Gemini API
✅ **Production Ready**: All configurations set for Heroku
✅ **Cross-Origin Support**: CORS configured for aphelper.tech
✅ **Environment Variables**: Ready for secure deployment

### Post-Deployment Testing:
- Health check: `https://your-api-app.herokuapp.com/api/health`
- Chat endpoint: `https://your-api-app.herokuapp.com/api/chat/send`
