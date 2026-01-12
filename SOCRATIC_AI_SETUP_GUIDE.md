# Socratic AI Bot - Setup Guide

## Overview
This improved Socratic AI bot is designed to work both locally and on Heroku with enhanced features:
- ✅ **Local & Heroku Compatible**: Works seamlessly in both environments
- ✅ **Progress Tracking**: Persistent learning progress storage
- ✅ **Study Guide Integration**: Uses your 100% accurate study notes
- ✅ **Balanced Teaching**: More answering than questioning while remaining Socratic
- ✅ **Completion Detection**: Knows when students have learned everything

## Key Improvements

### 1. **Better Answer-to-Question Ratio**
- Provides comprehensive answers when users ask direct questions
- Uses Socratic questioning sparingly (30-50% of the time)
- Prioritizes information delivery over endless questioning

### 2. **Accurate Study Guide Integration**
- Directly uses content from your `APUSHUnit1StudyGuide.tsx`
- 100% accurate facts and information
- No hallucinated content - only your verified notes

### 3. **Smart Progress Tracking**
- Persistent storage in `socratic_progress.json`
- Tracks concepts learned per user per unit
- Calculates overall completion percentage
- Detects when user is ready for assessment

### 4. **Completion Detection**
- Monitors progress across all unit sections
- Provides completion message when 80%+ mastered
- Ready for final assessment indicator

## Local Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key_here
SECRET_KEY=your_secret_key_for_jwt
PORT=8080

# Optional - Firebase (for production authentication)
FIREBASE_SERVICE_ACCOUNT_KEY=your_firebase_service_account_json
```

### 3. Run Locally
```bash
# Using Python directly
python grader_api_improved.py

# Or using gunicorn
gunicorn grader_api_improved:app --bind 0.0.0.0:8080
```

The API will be available at: `http://localhost:8080`

## Heroku Deployment

### 1. Heroku CLI Setup
```bash
heroku login
```

### 2. Create Heroku App
```bash
heroku create your-app-name
```

### 3. Set Environment Variables
```bash
heroku config:set OPENAI_API_KEY=your_openai_api_key_here
heroku config:set SECRET_KEY=your_secret_key_for_jwt
heroku config:set FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
```

### 4. Deploy
```bash
git add .
git commit -m "Deploy improved Socratic AI"
git push heroku main
```

## Usage Examples

### Frontend Integration
The Socratic chat endpoint expects this format:

```javascript
const response = await fetch('/api/chat/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + token  // Uncomment for auth
  },
  body: JSON.stringify({
    message: "What were the motivations for European exploration?",
    conversationHistory: [
      // Previous messages
    ],
    course: "apush",
    unit: "unit1",
    userId: "user123"
  })
});

const data = await response.json();
console.log(data.response); // AI response
console.log(data.overallProgress); // Progress percentage
console.log(data.readyForFinalAssessment); // Boolean
```

### Response Format
```javascript
{
  "response": "Great question about European Exploration! Here's what you should know:\n\n• Motivations: Post-plague population surge...",
  "source": "enhanced_socratic_system",
  "timestamp": "2026-01-06T...",
  "progressUpdate": {
    "european_exploration": {
      "introduced": true,
      "concepts_learned": [...],
      "last_interaction": "2026-01-06T..."
    }
  },
  "conceptsLearned": [...],
  "topicFocus": "european_exploration",
  "overallProgress": 45.2,
  "readyForFinalAssessment": false,
  "sectionsLearned": 3,
  "totalSections": 6
}
```

## Teaching Strategy

### More Answering
When users ask questions like "What was the Columbian Exchange?", the AI will:
1. ✅ Provide comprehensive factual information from your study guide
2. ✅ Include 3-4 relevant key facts
3. ⚠️ Only occasionally add a follow-up question

### Less Questioning  
When users make statements, the AI will:
1. ✅ Acknowledge their knowledge
2. ✅ Build on it with additional accurate facts
3. ⚠️ Sometimes add thought-provoking questions (30-50% of the time)

### Example Interaction
**User**: "Tell me about Native American societies before Columbus"

**Old Approach** (too much questioning):
> "What do you already know about pre-Columbian societies? Can you think of any specific examples?"

**New Approach** (more informative):
> "Great question about Native American Peoples! Here's what you should know:
> 
> • Aztecs: Central Mexico, sprawling cities, hierarchical governments, written language, advanced canals, ritual offerings
> • Mayans: Yucatan Peninsula, massive cities, complex waterworks, soaring stone temples, divine rulers  
> • Incas: Andes and Pacific coast, 16 million people, well-organized empire, terraced fields for potatoes, extensive road network
> • Cahokia: 10-30K people, sophisticated urban planning, major trade hub
> 
> What surprises you most about these sophisticated civilizations?"

## Authentication Options

### Development Mode
- Authentication is disabled by default for local testing
- Comment in `@require_auth` decorators to enable

### Production Mode  
- Firebase authentication supported
- JWT fallback for non-Firebase environments
- Automatic fallback if Firebase is unavailable

## File Structure
```
├── grader_api_improved.py     # Main improved API
├── grader_api.py             # Original API (backup)
├── requirements.txt          # Python dependencies
├── Procfile                 # Heroku deployment config
├── socratic_progress.json   # Progress storage (created automatically)
├── daily_usage.json        # Usage tracking (created automatically)
├── .env                    # Environment variables
└── src/pages/APUSHUnit1StudyGuide.tsx  # Source of truth for content
```

## Monitoring Progress

The system creates `socratic_progress.json` to track user learning:
```json
{
  "user123": {
    "apush_unit1": {
      "native_american_peoples": {
        "introduced": true,
        "concepts_learned": ["Aztecs: Central Mexico...", "..."],
        "last_interaction": "2026-01-06T..."
      },
      "european_exploration": {
        "introduced": true,
        "mastered": true
      }
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **OpenAI API Errors**
   - Check your API key in `.env` file
   - Ensure you have credits in your OpenAI account

2. **Progress Not Saving**  
   - Check file permissions for `socratic_progress.json`
   - Ensure the app has write access to the directory

3. **Study Guide Content Missing**
   - Verify the `load_study_guide_content()` function has the correct content
   - Add more units by expanding the function

4. **Authentication Issues**
   - For local development, authentication is disabled
   - For production, ensure Firebase credentials are set

### Heroku Specific Issues

1. **Port Issues**
   - Heroku automatically sets the PORT environment variable
   - The app uses `os.environ.get('PORT', 8080)`

2. **File Persistence**  
   - Progress files are stored in the app's temporary filesystem
   - Consider using a database for production if you need permanent storage

## Next Steps

1. **Add More Units**: Expand `load_study_guide_content()` with Units 2-9
2. **Database Integration**: Replace JSON files with PostgreSQL for production
3. **Advanced Analytics**: Track learning patterns and optimize teaching
4. **Mobile Optimization**: Ensure frontend works well on mobile devices

## Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify your environment variables are set correctly
3. Test locally before deploying to Heroku
4. Ensure your OpenAI API key has sufficient credits
