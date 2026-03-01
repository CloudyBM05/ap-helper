# Socratic Learning System - Setup Guide

This guide will help you set up the complete Socratic AI tutoring system for APUSH Unit 1.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

## Setup Instructions

### 1. Frontend Setup (Already Done)
The frontend React components are already integrated into your existing app:
- `SocraticLearning.tsx` - Course and unit selection
- `SocraticChat.tsx` - AI chat interface
- Routes added to `App.tsx`

### 2. Backend API Setup

1. **Navigate to the API directory:**
```bash
cd api
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment file:**
```bash
cp .env.example .env
```

4. **Edit the .env file and add your OpenAI API key:**
```
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
PORT=3001
FRONTEND_URL=http://localhost:3000
```

5. **Start the API server:**
```bash
npm run dev
```

The API will run on http://localhost:3001

### 3. Frontend Setup (Connect to API)

Make sure your React app is running on http://localhost:3000:
```bash
npm start
```

## How to Use

1. Navigate to `/socratic-learning` in your app
2. Click on "AP US History"
3. Click on "Unit 1: World/Exploration"
4. Start chatting with the AI tutor!

## Current Features

✅ **Basic Chat Interface**: Clean, modern chat UI with message history
✅ **Socratic AI Responses**: AI trained to ask guiding questions instead of giving direct answers
✅ **APUSH Unit 1 Content**: AI has access to Unit 1 study guide content
✅ **Real-time Conversation**: Messages sent and received in real-time
✅ **Conversation Context**: AI remembers previous messages in the conversation

## Limitations (Current MVP)

- Only APUSH Unit 1 is implemented
- No user authentication yet
- No persistent chat history between sessions
- No cross-session memory
- Simple content integration (will be expanded)

## Next Steps to Implement

1. **User Authentication**: Add login/signup functionality
2. **Persistent Storage**: Save chat history to database
3. **Expand Content**: Add more units and courses
4. **Memory System**: AI remembers across sessions
5. **Analytics**: Track learning progress
6. **Advanced Features**: Study plan generation, progress tracking

## Testing the System

Try these sample interactions to test the Socratic method:

1. **Student**: "What caused Europeans to explore the Americas?"
   **AI Should**: Ask what the student thinks motivated them, guide toward "3 Gs"

2. **Student**: "The Columbian Exchange was bad for Native Americans"
   **AI Should**: Ask for evidence, guide toward examining both positive and negative impacts

3. **Student**: "I don't understand encomienda"
   **AI Should**: Ask what they know about Spanish colonization, guide toward labor systems

## Troubleshooting

- **API not connecting**: Make sure both frontend (3000) and backend (3001) are running
- **AI responses generic**: Check that OpenAI API key is valid and has credits
- **CORS errors**: Ensure FRONTEND_URL in .env matches your actual frontend URL

## Architecture Overview

```
Frontend (React) ←→ Express API ←→ OpenAI GPT-4 ←→ Study Guide Content
     ↓                  ↓                ↓              ↓
- Chat Interface    - Route handling  - Socratic       - APUSH Unit 1
- Message history   - CORS setup      prompting        content
- User input        - Error handling  - Context        - Key concepts
                                      management
```
