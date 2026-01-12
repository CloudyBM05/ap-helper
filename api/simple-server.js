require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAduqZskqSWWduyGn9l7U9ogczqvayaOW4';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 200,
  }
});

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', 
    'http://localhost:5175', 
    'http://localhost:5176',
    'https://aphelper.tech',
    'https://www.aphelper.tech'
  ],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    ai: 'Gemini',
    timestamp: new Date().toISOString() 
  });
});

// List available models endpoint
app.get('/api/models', async (req, res) => {
  try {
    const models = await genAI.listModels();
    res.json({
      models: models.map(m => ({ name: m.name, displayName: m.displayName })),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.json({
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Enhanced Socratic responses based on topic detection
function getSocraticResponse(message, course, unit) {
  const msg = message.toLowerCase();
  
  // APUSH Unit 1 specific responses - beginner-friendly with overviews
  if (course === 'apush' && unit === 'unit1') {
    // Beginner-friendly overview responses
    if (msg.includes('overview') || msg.includes('summary') || msg.includes('what happened') || (msg.includes('tell me') && msg.includes('about'))) {
      return "Here's the big picture: From 1491-1607, two worlds collided. Native Americans had built complex societies like Cahokia (10,000+ people) and Tenochtitlan (200,000+ people). Then Europeans arrived seeking God, Gold, and Glory. The result? Massive changes for everyone involved. What aspect interests you most - the Native societies, European motivations, or what happened when they met?";
    }
    
    // More specific overview requests
    if ((msg.includes('what is') || msg.includes('what was')) && (msg.includes('unit 1') || msg.includes('1491') || msg.includes('1607'))) {
      return "Unit 1 covers the period when two different worlds first met. Before 1492, Native Americans had developed amazing civilizations - cities, agriculture, trade networks. Europeans were just discovering the Americas existed! This collision changed everything. What draws your curiosity - the advanced Native societies or the bold European explorers?";
    }
    
    if (msg.includes('can you explain') || msg.includes('please explain') || msg.includes('explain to me') || msg.includes('walk me through')) {
      return "Of course! Let me break this down: Picture America in 1491 - millions of people living in sophisticated societies from the Aztec empire to farming communities. Then imagine Europeans who think they're sailing to Asia but find an entire 'New World' instead. What do you think would happen when these two very different worlds meet?";
    }
    
    if (msg.includes('give me information') || msg.includes('tell me something') || msg.includes('what should i know')) {
      return "Here's what's important to understand: In 1491, the Americas had millions of people in advanced civilizations. Europeans didn't even know the Americas existed! When Columbus sailed in 1492, he thought he was going to Asia. This meeting of worlds changed history forever. What interests you most about this incredible collision of civilizations?";
    }
    
    // Help for confused students
    if (msg.includes('confused') || msg.includes('dont understand') || msg.includes('lost') || msg.includes('difficult') || msg.includes('hard') || msg.includes('help')) {
      return "Let's start simple! Picture this: you're living in 1491. In the Americas, there are millions of people in cities, farms, and complex societies. In Europe, people are just learning about a 'New World.' What do you think would motivate someone to leave everything they know and sail into the unknown?";
    }
    
    // Migration/Origins questions
    if (msg.includes('human') && (msg.includes('get') || msg.includes('arrive') || msg.includes('come'))) {
      return "Great question! Native Americans had been in the Americas for thousands of years before 1491, developing diverse and sophisticated societies. How do you think this long history might have shaped the complex civilizations that Europeans encountered? What does it suggest about their knowledge and organization?";
    }
    
    // Topic-specific overviews with questions
    if (msg.includes('native american') || msg.includes('indigenous')) {
      return "Native American societies were incredibly diverse and advanced! Take Cahokia - a city of 10,000-20,000 people in present-day Illinois, or Tenochtitlan with over 200,000 inhabitants. They had sophisticated agriculture, trade networks, and urban planning. What do you think Europeans expected to find when they arrived in the 'New World'?";
    }
    
    if (msg.includes('european') && (msg.includes('explore') || msg.includes('motivation') || msg.includes('why'))) {
      return "Europeans had three main drives for exploration - the 'Three G's': God (spread Christianity), Gold (wealth and spices), and Glory (national prestige). Spain and Portugal were competing fiercely for Asian trade routes. Which of these motivations do you think would be most powerful in convincing someone to risk their life crossing an ocean?";
    }
    
    if (msg.includes('spanish') || msg.includes('conquistador')) {
      return "Spanish conquistadors like Cortés (conquered Aztecs 1519-1521) and Pizarro (conquered Incas 1532) achieved remarkable military victories with small forces. They used superior technology, horses, and steel weapons, but also exploited existing conflicts between Native groups. What other factors besides technology might explain how such small European forces could topple massive empires?";
    }
    
    if (msg.includes('columbian exchange') || msg.includes('disease')) {
      return "Why do you think diseases had such a devastating impact on Native American populations but not on Europeans? What does this tell us about the different historical experiences of these populations?";
    }
    
    if (msg.includes('colonization') || msg.includes('settlement')) {
      return "What challenges do you think Europeans faced when trying to establish permanent settlements? How might these challenges have shaped their relationships with Native Americans?";
    }
    
    if (msg.includes('elaborate') || msg.includes('explain more') || msg.includes('tell me more')) {
      return "I'd be happy to provide more context! This period was all about contact and change. Native Americans had been developing their civilizations for thousands of years - building cities, perfecting agriculture, creating trade networks. Then Europeans arrived with new technologies but also new diseases and different goals. What specific part of this story would you like to dive deeper into?";
    }
    
    if (msg.includes('tell me') && msg.includes('information') || msg.includes('help me study')) {
      return "Let me help you understand the key story: Two worlds that had been separate for thousands of years suddenly met. Native Americans had sophisticated societies - the Aztec capital was bigger than any European city! Europeans brought horses, guns, and diseases, but they also learned from Native techniques. What part of this meeting of worlds interests you most?";
    }
    
    if (msg.includes('dont know') || msg.includes("don't know") || msg.includes('hello')) {
      return "Perfect starting point! Here's the basic story: Before 1492, the Americas had millions of people living in advanced civilizations like the Aztec Empire (capital: Tenochtitlan with 200,000+ people). Europeans didn't even know the Americas existed! When Columbus sailed in 1492, he thought he was going to Asia. This collision between two worlds changed everything - Europeans brought diseases that killed 90% of Native Americans, but also crops and animals were exchanged. What part of this story interests you most?";
    }
    
    if (msg.includes('tell me something') || msg.includes('give me') || msg.includes('teach me') || msg.includes('start teaching') || msg.includes('please start')) {
      return "I'll help you learn through discovery! Here's the fascinating setup: In 1491, millions of people lived in the Americas in cities and complex societies. Europeans had no idea the Americas existed - they thought the world was much smaller! When Columbus sailed west in 1492, he was trying to reach Asia. What do you think happened when these two completely different worlds suddenly met?";
    }
    
    if (msg.includes('not sure') || msg.includes('im not sure') || msg.includes('can you tell me') || msg.includes('please help')) {
      return "Of course! Let me break down the essentials: Europeans explored for three reasons - the '3 G's' (God, Gold, Glory). Spain dominated early exploration: conquistadors like Cortés conquered the Aztec Empire in 1521, Pizarro conquered the Incas in 1532. They used the encomienda system (forced Native American labor). The biggest impact was disease - European diseases killed about 90% of Native Americans who had no immunity. This also started the Columbian Exchange (trading crops, animals, diseases between continents). Which of these topics would you like to explore more?";
    }

    // Quiz requests
    if (msg.includes('quiz') || msg.includes('test') || msg.includes('assessment')) {
      if (msg.includes('comprehensive') || msg.includes('unit assessment') || msg.includes('final')) {
        return "Excellent! You're ready for a comprehensive assessment. This will test your mastery across all Unit 1 topics. Are you prepared to demonstrate your understanding of Native American societies, European motivations, Spanish colonization, and the Columbian Exchange?";
      } else if (msg.includes('native american') || msg.includes('indigenous')) {
        return "Great! Let's test your understanding of Pre-Columbian Native American societies. You should know about Cahokia, Tenochtitlan, agricultural systems, and the complexity of these civilizations. Ready for the quiz?";
      } else if (msg.includes('european') || msg.includes('exploration')) {
        return "Perfect! Time to test your knowledge of European motivations for exploration. This covers the 'Three G's' (God, Gold, Glory), technological advances, and the competition between European powers. Are you ready?";
      } else if (msg.includes('spanish') || msg.includes('conquistador')) {
        return "Excellent! Let's assess your understanding of Spanish colonization. This includes conquistadors like Cortés and Pizarro, the encomienda system, and the impact on Native populations. Ready to begin?";
      } else if (msg.includes('columbian') || msg.includes('exchange')) {
        return "Great choice! Time to test your knowledge of the Columbian Exchange. This covers the biological and cultural exchanges, disease impact, and how crops and animals changed both worlds. Are you prepared?";
      } else {
        return "I'd be happy to quiz you! Based on your progress, which topic would you like to be tested on: Native American societies, European exploration motivations, Spanish colonization, or the Columbian Exchange? Or are you ready for a comprehensive unit assessment?";
      }
    }
    
    if (msg.includes('experience what') || msg.includes('what do you mean')) {
      return "Good question! I was being too vague. Let me be more specific: When Europeans first arrived in the Americas, they encountered Native American societies. How do you think a Spanish conquistador might have viewed these encounters differently than a Native American leader? What different priorities and perspectives would each have had?";
    }
  }
  
  // General Socratic responses that work for any topic
  const generalResponses = [
    "What evidence supports that idea? Can you think of specific examples?",
    "How does this connect to what we know about the time period? What patterns do you notice?",
    "What do you think were the most important causes? Can you rank them by significance?",
    "If you were in that situation, what factors would influence your decisions?",
    "What questions does this raise for you? What would you want to investigate further?",
    "How might different groups of people have experienced this differently? Why?",
    "What were the short-term versus long-term consequences? Which were more significant?",
    "Can you compare this to other similar events? What similarities and differences do you notice?",
    "What assumptions are we making? What if we challenged those assumptions?",
    "What sources or evidence would help us better understand this topic?"
  ];
  
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}

// Student knowledge analysis function - tracks what they know/don't know
function analyzeStudentKnowledge(conversationHistory) {
  const studentMessages = conversationHistory.filter(msg => msg.sender === 'user');
  const allText = studentMessages.map(msg => msg.content.toLowerCase()).join(' ');
  
  const topicMentions = {
    nativeAmericans: ['cahokia', 'pueblo', 'aztec', 'inca', 'tenochtitlan', 'agriculture', 'trade', 'complex'],
    europeanMotivations: ['god', 'gold', 'glory', 'spices', 'trade', 'wealth', 'christianity', 'exploration'],
    spanishColonization: ['conquistador', 'cortés', 'pizarro', 'encomienda', 'spanish', 'conquest'],
    columbianExchange: ['exchange', 'disease', 'crops', 'animals', 'population', 'smallpox']
  };

  const strongAreas = [];
  const weakAreas = [];
  const misconceptions = [];
  
  // Check for strong understanding
  Object.entries(topicMentions).forEach(([topic, concepts]) => {
    const mentionCount = concepts.filter(concept => allText.includes(concept)).length;
    if (mentionCount >= 4) {
      strongAreas.push(topic);
    } else if (mentionCount <= 1) {
      weakAreas.push(topic);
    }
  });

  // Check for common misconceptions
  if (allText.includes('columbus discovered') || allText.includes('found america')) {
    misconceptions.push('Columbus "discovery" misconception');
  }
  if (allText.includes('primitive') || allText.includes('savage')) {
    misconceptions.push('Native American stereotypes');
  }
  if (allText.includes('empty land') || allText.includes('virgin land')) {
    misconceptions.push('Empty land myth');
  }

  // Determine learning style based on responses
  let learningStyle = 'beginner';
  if (studentMessages.length >= 5 && strongAreas.length >= 2) {
    learningStyle = 'intermediate';
  }
  if (studentMessages.length >= 8 && strongAreas.length >= 3 && misconceptions.length === 0) {
    learningStyle = 'advanced';
  }

  return {
    strongAreas,
    weakAreas,
    misconceptions,
    learningStyle,
    totalMessages: studentMessages.length
  };
}

// Progress analysis function
function analyzeStudentProgress(userMessage, aiResponse, topic, conversationHistory) {
  const msg = userMessage.toLowerCase();
  const progress = {
    topicUpdates: {},
    conceptsLearned: [],
    needsQuiz: false,
    readyForQuiz: false
  };

  // Check for evidence of understanding - MUCH MORE RIGOROUS
  const understandingIndicators = [
    'because', 'since', 'therefore', 'due to', 'as a result', 'leads to', 'causes',
    'example', 'instance', 'such as', 'including', 'like when',
    'compare', 'different', 'similar', 'unlike', 'whereas', 'however',
    'this shows', 'demonstrates', 'indicates', 'suggests', 'reveals'
  ];

  const strongUnderstandingIndicators = [
    'this demonstrates', 'for example', 'this shows that', 'as a result of',
    'this is because', 'evidence shows', 'this indicates', 'compared to'
  ];

  const hasUnderstanding = understandingIndicators.some(indicator => msg.includes(indicator));
  const hasStrongUnderstanding = strongUnderstandingIndicators.some(indicator => msg.includes(indicator));
  const messageLength = userMessage.split(' ').length;
  const hasDetail = messageLength > 15; // Increased from 10 to 15
  const hasSubstantialDetail = messageLength > 25; // New tier
  
  // Topic-specific concept recognition
  const topicConcepts = {
    nativeAmericans: ['cahokia', 'pueblo', 'aztec', 'inca', 'agriculture', 'trade', 'complex', 'urban'],
    europeanMotivations: ['gold', 'god', 'glory', 'spices', 'trade', 'wealth', 'christianity', 'prestige'],
    spanishColonization: ['conquistador', 'cortés', 'pizarro', 'encomienda', 'disease', 'smallpox'],
    columbianExchange: ['exchange', 'crops', 'animals', 'disease', 'population', 'potatoes', 'corn']
  };

  if (topic && topic !== 'general' && topicConcepts[topic]) {
    const conceptsFound = topicConcepts[topic].filter(concept => msg.includes(concept));
    progress.conceptsLearned = conceptsFound;

    // Determine progress level
    const conversationCount = conversationHistory.filter(m => m.sender === 'user').length;
    
    // MUCH MORE RIGOROUS PROGRESS REQUIREMENTS
    if (conceptsFound.length > 0 || hasUnderstanding) {
      // Only mark as 'introduced' initially
      let topicProgress = {
        introduced: true,
        practiced: false,
        conceptsLearned: conceptsFound
      };

      // Mark as 'practiced' only with substantial evidence
      if (conceptsFound.length >= 3 && hasUnderstanding && hasDetail) {
        topicProgress.practiced = true;
      }

      // Mark as 'mastered' only with exceptional understanding
      if (conceptsFound.length >= 5 && hasStrongUnderstanding && hasSubstantialDetail && conversationCount >= 6) {
        topicProgress.mastered = true;
      }

      progress.topicUpdates[topic] = topicProgress;

      // Ready for quiz only with VERY strong evidence of mastery
      if (conceptsFound.length >= 6 && hasStrongUnderstanding && hasSubstantialDetail && conversationCount >= 8) {
        progress.readyForQuiz = true;
        progress.needsQuiz = true;
      }
    }
  }

  return progress;
}

// Mini-quiz generation function
function generateQuiz(topic) {
  const quizzes = {
    nativeAmericans: {
      question: "Which Pre-Columbian city had 10,000-20,000 people and was located in present-day Illinois?",
      options: ["Tenochtitlan", "Cahokia", "Cusco", "Machu Picchu"],
      correct: 1,
      explanation: "Cahokia was a major urban center with 10,000-20,000 inhabitants, showing the complexity of Native American societies before European contact."
    },
    europeanMotivations: {
      question: "The 'Three G's' that motivated European exploration were:",
      options: ["Gold, Glory, God", "Goods, Gold, Government", "God, Guns, Germs", "Glory, Goods, Growth"],
      correct: 0,
      explanation: "Gold (wealth/spices), Glory (national prestige), and God (spreading Christianity) were the three main motivations for European exploration."
    },
    spanishColonization: {
      question: "Which conquistador conquered the Aztec Empire between 1519-1521?",
      options: ["Francisco Pizarro", "Hernán Cortés", "Vasco da Gama", "Christopher Columbus"],
      correct: 1,
      explanation: "Hernán Cortés conquered the Aztec Empire (1519-1521), while Pizarro conquered the Inca Empire (1532)."
    },
    columbianExchange: {
      question: "What was the most devastating effect of the Columbian Exchange on Native American populations?",
      options: ["Loss of land", "Cultural changes", "Disease epidemics", "Economic disruption"],
      correct: 2,
      explanation: "Disease epidemics (smallpox, measles, typhus) killed 90%+ of Native Americans who had no immunity to Old World diseases."
    },
    comprehensive: {
      question: "Which statement best describes the period 1491-1607?",
      options: [
        "Europeans discovered an empty continent and began colonization",
        "Two sophisticated worlds met, resulting in complex exchanges and conflicts", 
        "Native Americans learned European ways and adapted quickly",
        "Spain was the only European power interested in the New World"
      ],
      correct: 1,
      explanation: "This period saw the meeting of two complex civilizations - Native American societies and Europeans - resulting in biological, cultural, and political exchanges that transformed both worlds."
    }
  };

  return quizzes[topic] || null;
}

// Socratic chat endpoint with enhanced fallback and memory
app.post('/api/chat/send', async (req, res) => {
  try {
    const { message, course, unit, userId, conversationHistory = [], detectedTopic } = req.body;
    
    // Try Gemini API first (if working)
    if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      try {
        // Enhanced system prompt with study guide content and memory context
        const conversationContext = conversationHistory.length > 0 
          ? `Previous conversation context:\n${conversationHistory.slice(-3).map(msg => `${msg.sender}: ${msg.content}`).join('\n')}\n\n`
          : '';

        // Build student knowledge profile from conversation history
        const studentKnowledge = analyzeStudentKnowledge(conversationHistory);
        const knowledgeProfile = `
STUDENT KNOWLEDGE PROFILE:
Strong Areas: ${studentKnowledge.strongAreas.join(', ') || 'None identified yet'}
Weak Areas: ${studentKnowledge.weakAreas.join(', ') || 'None identified yet'}
Misconceptions: ${studentKnowledge.misconceptions.join(', ') || 'None identified yet'}
Learning Style: ${studentKnowledge.learningStyle}
`;

        const systemPrompt = `You are a Socratic AI tutor for APUSH Unit 1: World/Exploration (1491–1607). You guide students using the Socratic method while being especially helpful to beginners.

HISTORICAL CONTENT TO REFERENCE:
Key Topics:
- Pre-Columbian Native American societies: Diverse, complex civilizations (Aztec, Inca, Cahokia, Pueblo peoples). Cahokia had 10,000-20,000 people. Tenochtitlan had 200,000+ inhabitants. Advanced agriculture (Three Sisters), trade networks, urban centers.
- European motivations: God (Christianity), Gold (wealth/spices), Glory (national prestige). Technological advances: compass, astrolabe, caravels. Economic competition for Asian trade.
- Spanish colonization: Conquistadors (Cortés conquered Aztecs 1519-1521, Pizarro conquered Incas 1532). Encomienda system. Disease devastated Native populations.
- Columbian Exchange: Biological exchange of crops, animals, diseases. Native population declined 90%+. New World crops (potatoes, corn, tomatoes) revolutionized Old World agriculture.

${conversationContext}${knowledgeProfile}

ADAPTIVE TEACHING RULES:
1. USE STUDENT'S KNOWLEDGE PROFILE: Build on their strong areas, address weak areas, correct misconceptions
2. PRIORITIZE HELPING CONFUSED STUDENTS: If student says "I'm not sure," "can you tell me," "I don't know," or asks for explanations, PROVIDE helpful context first, then ask ONE simple question
3. LIMIT QUESTIONS: Ask only 1-2 questions maximum per response, not 3-5 questions
4. PROVIDE OVERVIEWS WHEN REQUESTED: Give brief but informative explanations when students ask for them
5. NEVER mention "study guide" - say "historians know," "evidence shows," or "we learn from historical records" instead
6. Balance being informative with encouraging critical thinking
7. Use specific examples to anchor learning (Cahokia, Tenochtitlan, Cortés, etc.)
8. When students seem lost, give them solid information to work with
9. REMEMBER PREVIOUS CONVERSATIONS: Don't repeat information they've already demonstrated understanding of
10. ADDRESS MISCONCEPTIONS: Gently correct any historical misconceptions you notice
11. ADJUST DIFFICULTY: Match complexity to their learning style (beginner/intermediate/advanced)

Current topic focus: ${detectedTopic || 'general Unit 1 concepts'}
Student's message: "${message}"

Be helpful first, then guide discovery. If student needs information, provide it clearly. Keep under 200 words.`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const aiResponse = response.text();

        // Analyze progress and generate response data
        const progressData = analyzeStudentProgress(message, aiResponse, detectedTopic, conversationHistory);
        
        // Check for quiz requests
        let quiz = null;
        if (progressData.readyForQuiz) {
          quiz = generateQuiz(detectedTopic);
        } else if (message.toLowerCase().includes('comprehensive') || message.toLowerCase().includes('unit assessment')) {
          // Check if ready for comprehensive assessment
          const studentKnowledge = analyzeStudentKnowledge(conversationHistory);
          if (studentKnowledge.strongAreas.length >= 2 && studentKnowledge.totalMessages >= 10) {
            quiz = generateQuiz('comprehensive');
          }
        } else if (message.toLowerCase().includes('quiz') || message.toLowerCase().includes('test')) {
          // Generate quiz for requested topic if they've practiced it
          const requestedTopic = detectedTopic;
          if (requestedTopic && requestedTopic !== 'general') {
            quiz = generateQuiz(requestedTopic);
          }
        }

        return res.json({
          response: aiResponse,
          source: 'gemini',
          timestamp: new Date().toISOString(),
          progressUpdate: progressData.topicUpdates,
          conceptsLearned: progressData.conceptsLearned,
          quiz: quiz
        });
      } catch (error) {
        console.error('Gemini API failed, using enhanced fallback:', error.message);
      }
    }
    
    // Enhanced fallback responses with progress tracking
    const socraticResponse = getSocraticResponse(message, course, unit);
    const progressData = analyzeStudentProgress(message, socraticResponse, detectedTopic, conversationHistory);
    
    // Check for quiz requests in fallback too
    let quiz = null;
    if (progressData.readyForQuiz) {
      quiz = generateQuiz(detectedTopic);
    } else if (message.toLowerCase().includes('comprehensive') || message.toLowerCase().includes('unit assessment')) {
      const studentKnowledge = analyzeStudentKnowledge(conversationHistory);
      if (studentKnowledge.strongAreas.length >= 2 && studentKnowledge.totalMessages >= 10) {
        quiz = generateQuiz('comprehensive');
      }
    } else if (message.toLowerCase().includes('quiz') || message.toLowerCase().includes('test')) {
      const requestedTopic = detectedTopic;
      if (requestedTopic && requestedTopic !== 'general') {
        quiz = generateQuiz(requestedTopic);
      }
    }
    
    res.json({
      response: socraticResponse,
      source: 'enhanced_fallback',
      timestamp: new Date().toISOString(),
      progressUpdate: progressData.topicUpdates,
      conceptsLearned: progressData.conceptsLearned,
      quiz: quiz
    });

  } catch (error) {
    console.error('Error in chat endpoint:', error);
    
    res.json({
      response: "I'm having trouble processing that right now. Could you rephrase your question or try asking about a specific aspect of the topic?",
      source: 'error_fallback',
      timestamp: new Date().toISOString()
    });
  }
});

// Quiz answer endpoint
app.post('/api/quiz/answer', async (req, res) => {
  try {
    const { userId, topic, selectedAnswer, correctAnswer, course, unit } = req.body;
    
    const isCorrect = selectedAnswer === correctAnswer;
    const progressUpdate = {};
    
    if (isCorrect) {
      // Mark topic as mastered if quiz passed
      progressUpdate[topic] = {
        introduced: true,
        practiced: true,
        mastered: true,
        quizPassed: true,
        quizScore: 100
      };
    } else {
      // Mark for review if quiz failed
      progressUpdate[topic] = {
        introduced: true,
        practiced: true,
        mastered: false,
        quizPassed: false,
        quizScore: 0,
        needsReview: true
      };
    }

    res.json({
      correct: isCorrect,
      progressUpdate: progressUpdate,
      message: isCorrect 
        ? "Excellent! You've mastered this topic! 🎉" 
        : "Not quite right, but that's okay! Let's review this topic a bit more.",
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error in quiz endpoint:', error);
    res.status(500).json({
      error: 'Failed to process quiz answer',
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(PORT, () => {
  console.log(`🤖 Socratic Learning API running on port ${PORT}`);
  console.log(`🧠 AI Provider: Google Gemini`);
  console.log(`🌐 Frontend URL: http://localhost:5176`);
  
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.log(`⚠️  Warning: GEMINI_API_KEY not set. Add your API key to .env file.`);
  } else {
    console.log(`✅ Gemini API key configured`);
  }
});
