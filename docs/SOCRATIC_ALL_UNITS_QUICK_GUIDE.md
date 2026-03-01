# Quick Setup Guide: Socratic AI for All APUSH Units - UPDATED

## 🚀 Getting Started

The Socratic AI chatbot now supports all 9 APUSH units! Here's how to use it:

## 🔧 Setup

### Local Development
```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Start the server
python grader_api.py

# 3. Access endpoints
# Chat: POST /api/chat/send
# Legacy: POST /api/socratic-chat
```

### Heroku Deployment
```bash
# Deploy with existing Procfile and requirements.txt
git push heroku main
```

## 📡 API Usage

### Main Chat Endpoint: `/api/chat/send`

```javascript
// Send a message to the Socratic AI
const response = await fetch('/api/chat/send', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "What was the Market Revolution?",
    course: "apush",
    unit: "unit4",  // Any unit from unit1 to unit9
    userId: "student123",
    conversationHistory: [
      { sender: 'user', content: 'Previous message...' },
      { sender: 'bot', content: 'Previous response...' }
    ]
  })
});

const data = await response.json();
console.log(data.response); // AI response
console.log(data.overallProgress); // Learning progress %
console.log(data.conceptsLearned); // New concepts introduced
```

### Response Format
```json
{
  "response": "Great question about The Market Revolution! Key facts: Market Revolution: Transportation revolution (canals, railroads), factory system, cash crop agriculture, urbanization. What questions do you have about these developments?",
  "source": "enhanced_socratic_system",
  "timestamp": "2026-01-07T...",
  "progressUpdate": {
    "market_revolution": {
      "introduced": true,
      "concepts_learned": ["Market Revolution: Transportation revolution..."],
      "last_interaction": "2026-01-07T..."
    }
  },
  "conceptsLearned": ["Market Revolution: Transportation revolution..."],
  "topicFocus": "market_revolution",
  "overallProgress": 16.67,
  "readyForFinalAssessment": false,
  "sectionsLearned": 1,
  "totalSections": 6
}
```

## 📚 All Supported Units

| Unit | Time Period | Key Themes |
|------|-------------|------------|
| **unit1** | 1491-1607 | Native American societies, European exploration, Columbian Exchange |
| **unit2** | 1607-1754 | Colonial development, regional differences, Atlantic trade |
| **unit3** | 1754-1800 | Revolution, independence, early republic formation |
| **unit4** | 1800-1848 | Territorial expansion, democracy, reform movements |
| **unit5** | 1844-1877 | Sectional crisis, Civil War, Reconstruction |
| **unit6** | 1865-1898 | Industrialization, immigration, Gilded Age politics |
| **unit7** | 1890-1945 | Progressive Era, WWI, Depression, WWII |
| **unit8** | 1945-1980 | Cold War, civil rights, social movements |
| **unit9** | 1980-present | Conservative resurgence, globalization, modern challenges |

## 💡 Usage Tips

### For Students
1. **Start with overview questions**: "What is Unit 4 about?"
2. **Ask specific questions**: "What was Manifest Destiny?"
3. **Request comparisons**: "How did the North and South differ?"
4. **Build on previous knowledge**: The AI remembers your conversation
5. **Check progress**: Look for completion messages and progress percentages

### For Teachers
1. **Monitor progress**: Use `overallProgress` and `sectionsLearned` fields
2. **Assess readiness**: Check `readyForFinalAssessment` flag
3. **Track concepts**: Review `conceptsLearned` arrays
4. **Guide conversations**: Use conversation history to provide context

### Best Practices
- **Be specific**: Ask about particular events, people, or concepts
- **Follow up**: The AI provides better responses with conversation context  
- **Express confusion**: Say "I don't understand" for more detailed explanations
- **Ask for analysis**: Use words like "analyze," "compare," "evaluate" for deeper thinking

## 🔍 Example Conversations

### Unit 2 - Colonial Development
```
Student: "Tell me about colonial regions"
AI: "Unit 2 covers colonial America development. Key themes: colonial regions (New England, Middle, Southern), economic systems, labor systems... Which part would you like to dive deeper into?"

Student: "What made the Southern colonies different?"
AI: "Great question about Tobacco and Southern Economy! Key facts: Tobacco economy: 'Brown gold,' labor-intensive cultivation, indentured servants initially, shift to enslaved African labor. What questions do you have about these developments?"
```

### Unit 7 - Progressive Era
```
Student: "What was the Progressive Era?"
AI: "Unit 7 covers Progressive Era, imperialism, WWI, 1920s, Depression, New Deal, WWII. Key themes: reform movements, overseas expansion, wartime changes, economic boom/bust, federal power expansion. Which part would you like to dive deeper into?"

Student: "Tell me about progressive reforms"
AI: "Great question about Progressive Era Reforms! Key facts: Progressive Reforms: Muckrakers, trust-busting, consumer protection, conservation, direct democracy (initiative, referendum, recall). What questions do you have about these developments?"
```

## ⚙️ Configuration

### Authentication (Optional)
```python
# In grader_api.py, uncomment to enable auth:
# @require_auth  # Remove comment to enable authentication
```

### CORS Origins
```python
# Update CORS origins in grader_api.py for your domain:
@cross_origin(origins=[
    "https://your-frontend-domain.com",
    # ... other origins
])
```

## 🎯 Success Metrics

- **Content Coverage**: ✅ All 9 units supported
- **Response Quality**: ✅ Unit-specific, historically accurate  
- **Progress Tracking**: ✅ Section-based learning progression
- **Adaptability**: ✅ Adjusts to user knowledge level
- **Assessment Readiness**: ✅ Indicates completion status

---

**The enhanced Socratic AI is ready to help students master any APUSH unit with intelligent, adaptive tutoring!**
