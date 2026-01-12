import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Types
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatRequest {
  message: string;
  conversationHistory: Message[];
  course: string;
  unit: string;
  userId?: string;
}

// APUSH Unit 1 Study Guide Content (simplified)
const APUSH_UNIT1_CONTENT = `
APUSH Unit 1: World Exploration and Contact (1491-1607)

Key Themes:
1. Pre-Columbian Native American societies and their diversity
2. European motivations for exploration (God, Gold, Glory)
3. Spanish conquistadors and encomienda system
4. Columbian Exchange and its impacts
5. Early English colonization attempts

Important Concepts:
- Native American societies before European contact
- Spanish colonization in the Americas
- Economic and social impacts of European colonization
- Environmental consequences of the Columbian Exchange
- Differences between Spanish, French, and English colonial approaches

Key People: Christopher Columbus, Hernán Cortés, Francisco Pizarro, Bartolomé de las Casas
Key Terms: Encomienda, Columbian Exchange, Conquistadors, Pueblos, Cahokia
`;

// Socratic prompting system
const createSocraticPrompt = (userMessage: string, conversationHistory: Message[], course: string, unit: string): string => {
  const historyContext = conversationHistory
    .slice(-6) // Last 6 messages for context
    .map(msg => `${msg.sender}: ${msg.content}`)
    .join('\n');

  return `You are a Socratic AI tutor for ${course.toUpperCase()} ${unit.toUpperCase()}. Your role is to guide students through discovery using the Socratic method.

CRITICAL RULES:
1. NEVER give direct answers or facts
2. ALWAYS respond with thoughtful questions that guide discovery
3. Help students think critically and make connections
4. Reference the study guide content when relevant
5. Build on previous conversation context
6. Encourage evidence-based reasoning

Study Guide Context:
${APUSH_UNIT1_CONTENT}

Previous Conversation:
${historyContext}

Student's latest message: "${userMessage}"

Respond with 1-3 thoughtful questions that will help the student discover the answer themselves. Focus on helping them think critically about historical causation, comparison, and continuity/change. Keep your response under 150 words.`;
};

// API Routes
app.post('/api/chat/send', async (req, res) => {
  try {
    const { message, conversationHistory, course, unit, userId }: ChatRequest = req.body;

    // Validate required fields
    if (!message || !course || !unit) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Only handle APUSH Unit 1 for now
    if (course !== 'apush' || unit !== 'unit1') {
      return res.status(400).json({ error: 'Only APUSH Unit 1 is currently supported' });
    }

    // Create Socratic prompt
    const systemPrompt = createSocraticPrompt(message, conversationHistory || [], course, unit);

    // Call Gemini API
    const fullPrompt = `${systemPrompt}\n\nStudent: ${message}\n\nTutor:`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const aiResponse = response.text() || "I'm having trouble processing that. Could you rephrase your question?";

    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get study guide content for a specific unit
app.get('/api/study-guide/:course/:unit', (req, res) => {
  const { course, unit } = req.params;

  if (course === 'apush' && unit === 'unit1') {
    res.json({
      course,
      unit,
      content: APUSH_UNIT1_CONTENT,
      title: 'World Exploration and Contact',
      period: '1491-1607'
    });
  } else {
    res.status(404).json({ error: 'Study guide not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Socratic Learning API running on port ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});
