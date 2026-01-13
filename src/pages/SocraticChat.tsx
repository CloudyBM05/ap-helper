import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Bot, User, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sessionManager } from '../utils/sessionManager';
import { APUSH_UNIT1_CONTENT } from '../utils/apushContent';
import { userMemoryManager, ConversationMemory } from '../utils/userMemory';
import { useAuth } from '../hooks/useAuth';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Quiz {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface UnitTopic {
  key: string;
  title: string;
  keyFacts: string[];
}

interface UnitTopicsData {
  unit: string;
  course: string;
  overview: string;
  topics: UnitTopic[];
}

const SocraticChat = () => {
  const { course, unit } = useParams<{ course: string; unit: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading, getAuthHeaders } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationMemory, setConversationMemory] = useState<ConversationMemory | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const [unitTopics, setUnitTopics] = useState<UnitTopic[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // Always scroll to bottom for new messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  // Define utility functions before useEffects to avoid hoisting issues
  const getUnitInfo = () => {
    if (course === 'apush') {
      const unitData = {
        'unit1': { title: 'APUSH Unit 1: Colonial Period and Independence', period: '1491–1800', emoji: '🌎' },
        'unit2': { title: 'APUSH Unit 2: Early Republic', period: '1800–1848', emoji: '🇺🇸' },
        'unit3': { title: 'APUSH Unit 3: Civil War and Reconstruction', period: '1844–1877', emoji: '⚔️' },
        'unit4': { title: 'APUSH Unit 4: The Gilded Age', period: '1865–1898', emoji: '🏭' },
        'unit5': { title: 'APUSH Unit 5: Imperialism and World War I', period: '1890–1920', emoji: '🌍' },
        'unit6': { title: 'APUSH Unit 6: Prosperity, Depression, and the New Deal', period: '1920–1945', emoji: '📈' },
        'unit7': { title: 'APUSH Unit 7: World War II and Early Cold War', period: '1940–1963', emoji: '🕊️' },
        'unit8': { title: 'APUSH Unit 8: Civil Rights and Social Change', period: '1945–1980', emoji: '✊' },
        'unit9': { title: 'APUSH Unit 9: Entering the 21st Century', period: '1980–Present', emoji: '💻' }
      };
      return unitData[unit as keyof typeof unitData] || { title: `APUSH ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
    }
    if (course === 'apgov') {
      const unitData = {
        'unit1': { title: 'AP Gov Unit 1: Foundations of Democracy', period: 'Constitutional Framework', emoji: '📜' },
        'unit2': { title: 'AP Gov Unit 2: Interactions Among Branches', period: 'Government Structure', emoji: '🏛️' },
        'unit3': { title: 'AP Gov Unit 3: Civil Liberties and Rights', period: 'Individual Rights', emoji: '⚖️' },
        'unit4': { title: 'AP Gov Unit 4: Political Ideologies and Beliefs', period: 'Public Opinion', emoji: '💭' },
        'unit5': { title: 'AP Gov Unit 5: Political Participation', period: 'Democratic Process', emoji: '🗳️' }
      };
      return unitData[unit as keyof typeof unitData] || { title: `AP Gov ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
    }
    return { title: 'Unknown Unit', period: '', emoji: '📚' };
  };

  // Function to fetch unit topics from backend
  const fetchUnitTopics = useCallback(async () => {
    if (!course || !unit) return;
    
    try {
      setTopicsLoading(true);
      
      // Always use deployed backend - it's ready and working
      const API_BASE = 'https://ap-helper-2d9f117e9bdb.herokuapp.com';

      const url = `${API_BASE}/api/unit-topics?course=${encodeURIComponent(course)}&unit=${encodeURIComponent(unit)}`;

      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(user ? getAuthHeaders() : {})
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UnitTopicsData = await response.json();
      
      // For Socratic AI system, we don't need server-provided topics
      // The AI generates content dynamically based on course and unit
      if (!data.topics || data.topics.length === 0) {
        // Provide fallback content to indicate Socratic AI is ready
        setUnitTopics([
          {
            key: 'socratic_ready',
            title: 'Dynamic AI Content Ready',
            keyFacts: [
              'Conversational learning available',
              'Context-aware responses',
              'Socratic questioning method',
              'All topics covered dynamically'
            ]
          }
        ]);
      } else {
        setUnitTopics(data.topics);
      }
    } catch (error) {
      console.error('Error fetching unit topics:', error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.warn('Request timeout - server may be slow');
        } else if (error.message.includes('Failed to fetch')) {
          console.warn('Network error - server may be unavailable');
        }
      }
      
      // Set fallback content for Socratic AI - it doesn't need server topics
      setUnitTopics([
        {
          key: 'socratic_ai_ready',
          title: 'AI Tutor Available', 
          keyFacts: [
            'Ask questions about any topic',
            'Get contextual explanations',
            'Socratic learning method',
            'Dynamic content generation'
          ]
        }
      ]);
    } finally {
      setTopicsLoading(false);
    }
  }, [course, unit, user, getAuthHeaders]);

  // Welcome message function
  const getWelcomeMessage = (course: string, unit: string) => {
    if (course === 'apush') {
      const unitInfo = getUnitInfo();
      const welcomeMessages = {
        'unit1': "Welcome to APUSH Unit 1: Colonial Period and Independence (1491–1800)! 🌎\n\nI'm your Socratic AI tutor. I'll guide your learning through questions rather than giving direct answers.\n\nKey topics: Pre-Columbian societies • European exploration • Spanish colonization • Columbian Exchange • Early English attempts\n\nWhat interests you most about this period, or what do you already know about European exploration?",
        'unit2': "Welcome to APUSH Unit 2: Early Republic (1800–1848)! 🇺🇸\n\nI'm your Socratic AI tutor. I'll guide your learning through thoughtful questions and discussion.\n\nKey topics: Jeffersonian democracy • War of 1812 • Market Revolution • Westward expansion • Reform movements • Sectional tensions\n\nWhat would you like to explore about this era of American growth and change?",
        'unit3': "Welcome to APUSH Unit 3: Civil War and Reconstruction (1844–1877)! ⚔️\n\nI'm your Socratic AI tutor. Let's explore this pivotal period through guided discussion.\n\nKey topics: Sectional conflict • Kansas-Nebraska Act • Lincoln • Civil War • Emancipation • Reconstruction policies\n\nWhat aspect of this transformative era interests you most?",
        'unit4': "Welcome to APUSH Unit 4: The Gilded Age (1865–1898)! 🏭\n\nI'm your Socratic AI tutor. Let's examine this era of rapid change and growth.\n\nKey topics: Industrialization • Immigration • Urbanization • Labor movements • Political corruption • Agrarian discontent\n\nWhat would you like to discover about America's industrial transformation?",
        'unit5': "Welcome to APUSH Unit 5: Imperialism and World War I (1890–1920)! 🌍\n\nI'm your Socratic AI tutor. Let's explore America's emergence as a world power.\n\nKey topics: Spanish-American War • Progressive Era • World War I • Wilson's foreign policy • Social reform\n\nWhat interests you about America's growing role on the world stage?",
        'unit6': "Welcome to APUSH Unit 6: Prosperity, Depression, and the New Deal (1920–1945)! 📈\n\nI'm your Socratic AI tutor. Let's examine this era of boom, bust, and recovery.\n\nKey topics: 1920s culture • Great Depression • New Deal programs • World War II • Social changes\n\nWhat aspect of this dramatic period would you like to explore?",
        'unit7': "Welcome to APUSH Unit 7: World War II and Early Cold War (1940–1963)! 🕊️\n\nI'm your Socratic AI tutor. Let's discuss America's role as a global superpower.\n\nKey topics: World War II • Holocaust • Atomic bomb • Cold War origins • Containment • Nuclear arms race\n\nWhat would you like to learn about this pivotal era in world history?",
        'unit8': "Welcome to APUSH Unit 8: Civil Rights and Social Change (1945–1980)! ✊\n\nI'm your Socratic AI tutor. Let's explore this era of social transformation and activism.\n\nKey topics: Civil Rights Movement • Great Society • Vietnam War • Counterculture • Women's Liberation • Conservative backlash\n\nWhat aspect of this dynamic period of change interests you most?",
        'unit9': "Welcome to APUSH Unit 9: Entering the 21st Century (1980–Present)! 💻\n\nI'm your Socratic AI tutor. Let's examine recent American history and its ongoing impact.\n\nKey topics: Reagan Revolution • End of Cold War • Technology revolution • 9/11 • Political polarization • Modern challenges\n\nWhat would you like to discuss about America's recent history and current issues?"
      };
      return welcomeMessages[unit as keyof typeof welcomeMessages] || `Welcome to ${unitInfo.title}! I'm your Socratic AI tutor, ready to help you explore this historical period through guided questions and discussion.`;
    }
    if (course === 'apgov') {
      const unitInfo = getUnitInfo();
      const welcomeMessages = {
        'unit1': "Welcome to AP Government Unit 1: Foundations of Democracy! 📜\n\nI'm your Socratic AI tutor. I'll guide your understanding of American democracy through thoughtful questions and discussion.\n\nKey topics: Enlightenment ideals • Articles of Confederation • Constitutional Convention • Federalism • Separation of powers • Bill of Rights\n\nWhat do you already know about the founding principles of American government, or what would you like to explore first?",
        'unit2': "Welcome to AP Government Unit 2: Interactions Among Branches! 🏛️\n\nI'm your Socratic AI tutor. Let's explore how the three branches of government work together and check each other's power.\n\nKey topics: Congress • Presidency • Federal courts • Bureaucracy • Checks and balances • Inter-branch relations\n\nWhat interests you most about how our government is structured, or what questions do you have about how it operates?",
        'unit3': "Welcome to AP Government Unit 3: Civil Liberties and Civil Rights! ⚖️\n\nI'm your Socratic AI tutor. Let's examine how individual freedoms are protected and how rights have expanded over time.\n\nKey topics: First Amendment freedoms • Due process • Equal protection • Civil rights movement • Supreme Court cases\n\nWhat do you think is the difference between civil liberties and civil rights, or what specific rights interest you most?",
        'unit4': "Welcome to AP Government Unit 4: Political Ideologies and Beliefs! 💭\n\nI'm your Socratic AI tutor. Let's explore how Americans form their political opinions and what they believe about government's role.\n\nKey topics: Political culture • Political socialization • Public opinion • Ideologies • Party identification • Demographics\n\nWhat influences your own political beliefs, or what would you like to understand about how people form their political views?",
        'unit5': "Welcome to AP Government Unit 5: Political Participation! 🗳️\n\nI'm your Socratic AI tutor. Let's examine how citizens participate in democracy through voting, campaigns, and civic engagement.\n\nKey topics: Voting rights • Elections • Campaigns • Political parties • Interest groups • Media\n\nWhat do you think motivates people to vote, or what questions do you have about how elections and campaigns work?"
      };
      return welcomeMessages[unit as keyof typeof welcomeMessages] || `Welcome to ${unitInfo.title}! I'm your Socratic AI tutor, ready to help you explore American government through guided questions and discussion.`;
    }
    return "Welcome! I'm your Socratic AI tutor, ready to help you learn through guided discussion.";
  };

  useEffect(() => {
    // Only auto-scroll on new messages, with a slight delay to ensure rendering is complete
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  // Redirect to login if not authenticated
  useEffect(() => {
    // Remove authentication requirement for Socratic chat
    // if (!authLoading && !isAuthenticated) {
    //   navigate('/login');
    //   return;
    // }
  }, [authLoading, isAuthenticated, navigate]);

  // Fetch unit topics when component loads
  useEffect(() => {
    if (course && unit && !authLoading) {
      fetchUnitTopics();
    }
  }, [course, unit, authLoading, fetchUnitTopics]);

  // Initialize conversation with welcome message and memory system
  useEffect(() => {
    if ((course === 'apush' || course === 'apgov') && unit && !authLoading) {
      // Handle authenticated users with memory system
      if (user) {
        const userId = user.uid; // Use Firebase user ID

        // Initialize user account and memory system
        userMemoryManager.loadUserData(userId);
        userMemoryManager.createOrGetUser(userId);
        
        // Load or create conversation memory
        let memory = userMemoryManager.loadConversationMemory(userId, course, unit);
        if (!memory) {
          memory = userMemoryManager.createConversationMemory(userId, course, unit);
        }
        setConversationMemory(memory);

        // Load previous messages if they exist
        if (memory.messages.length > 0) {
          const loadedMessages = memory.messages.map(msg => ({
            id: msg.id,
            content: msg.content,
            sender: msg.sender,
            timestamp: msg.timestamp
          }));
          setMessages(loadedMessages);
          return; // Don't show welcome message if we have previous conversation
        }

        // Start session tracking
        sessionManager.startChatSession(userId, course, unit);
      }

      // Show welcome message for both authenticated and unauthenticated users
      // Only if there are no previous messages loaded
      if (messages.length === 0) {
        const welcomeMessage: Message = {
          id: '1',
          content: getWelcomeMessage(course, unit),
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [course, unit, user, authLoading, messages.length]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Update memory with user message
    if (conversationMemory && user) {
      const detectedTopic = detectTopic(inputMessage);
      userMemoryManager.addMessage(user.uid, course!, unit!, {
        id: userMessage.id,
        content: userMessage.content,
        sender: userMessage.sender,
        timestamp: userMessage.timestamp,
        topic: detectedTopic
      });
      
      // Update topic progress
      if (detectedTopic) {
        userMemoryManager.updateTopicProgress(user.uid, course!, unit!, detectedTopic, {
          introduced: true,
          questionsAsked: [...(conversationMemory.topicProgress[detectedTopic]?.questionsAsked || []), inputMessage]
        });
      }
    }
    
    setInputMessage('');
    setIsLoading(true);

    try {
      // This is where we'll call our AI API
      const aiResponse = await getSocraticResponse(inputMessage, messages);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Update memory with AI response
      if (conversationMemory && user) {
        userMemoryManager.addMessage(user.uid, course!, unit!, {
          id: aiMessage.id,
          content: aiMessage.content,
          sender: aiMessage.sender,
          timestamp: aiMessage.timestamp
        });
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Detect topic from user input
  const detectTopic = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('native') || input.includes('indigenous') || input.includes('cahokia') || input.includes('pueblo')) {
      return 'nativeAmericans';
    } else if (input.includes('motivation') || input.includes('why') || input.includes('god') || input.includes('gold') || input.includes('glory')) {
      return 'europeanMotivations';
    } else if (input.includes('spanish') || input.includes('conquistador') || input.includes('encomienda') || input.includes('cortés') || input.includes('pizarro')) {
      return 'spanishColonization';
    } else if (input.includes('exchange') || input.includes('disease') || input.includes('crops') || input.includes('animals') || input.includes('columbian')) {
      return 'columbianExchange';
    }
    
    return 'general';
  };

  // Call our AI API for Socratic responses
  const getSocraticResponse = async (userInput: string, conversationHistory: Message[]): Promise<string> => {
    try {
      // Detect topic for better content targeting
      const detectedTopic = detectTopic(userInput);
      
      // Update session with detected topic (only if user is logged in)
      if (user) {
        try {
          sessionManager.updateChatSession(user.uid, course!, unit!, detectedTopic);
        } catch (sessionError) {
          console.warn('Session manager error (non-critical):', sessionError);
        }
      }

      // Always use deployed backend - it's ready and working
      const API_BASE = 'https://ap-helper-2d9f117e9bdb.herokuapp.com';

      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${API_BASE}/api/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user ? getAuthHeaders() : {})
        },
        body: JSON.stringify({
          message: userInput,
          conversationHistory: conversationHistory,
          course: course,
          unit: unit,
          userId: user?.uid || 'anonymous',
          detectedTopic: detectedTopic
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle progress updates from AI
      if (data.progressUpdate && Object.keys(data.progressUpdate).length > 0 && user) {
        Object.entries(data.progressUpdate).forEach(([topic, updates]: [string, any]) => {
          userMemoryManager.updateTopicProgress(user.uid, course!, unit!, topic, {
            introduced: updates.introduced || false,
            practiced: updates.practiced || false,
            mastered: updates.mastered || false,
            conceptsLearned: updates.concepts_learned || updates.conceptsLearned || [],
            ready_for_assessment: updates.ready_for_assessment || false,
            advanced_thinking: updates.advanced_thinking || false,
            questionsAsked: updates.questionsAsked || []
          });
        });
        
        // Update overall progress if provided
        if (data.overallProgress !== undefined) {
          const updatedMemory = userMemoryManager.loadConversationMemory(user.uid, course!, unit!);
          if (updatedMemory) {
            updatedMemory.overallProgress.completionPercentage = data.overallProgress;
            updatedMemory.overallProgress.readyForAssessment = data.readyForFinalAssessment || false;
            setConversationMemory(updatedMemory);
          }
        }
        
        // Refresh conversation memory to show updated progress
        const updatedMemory = userMemoryManager.loadConversationMemory(user.uid, course!, unit!);
        if (updatedMemory) {
          setConversationMemory(updatedMemory);
        }
      }
      
      // Handle quiz if provided
      if (data.quiz) {
        setCurrentQuiz(data.quiz);
      }
      
      return data.response;
    } catch (error) {
      console.error('Error calling AI API:', error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return "I'm taking a bit longer than usual to respond. Let me try to give you a helpful answer about this topic instead.";
        }
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          return "I'm having trouble connecting to the server right now. Please check your internet connection and try again.";
        }
      }
      
      // Fallback to topic-specific Socratic questions
      return getFallbackSocraticResponse(userInput);
    }
  };

  // Fallback Socratic responses when API is unavailable
  const getFallbackSocraticResponse = (userInput: string): string => {
    const topic = detectTopic(userInput);
    const topicData = APUSH_UNIT1_CONTENT.topics[topic as keyof typeof APUSH_UNIT1_CONTENT.topics];
    
    if (topicData && topicData.socraticQuestions.length > 0) {
      const randomQuestion = topicData.socraticQuestions[Math.floor(Math.random() * topicData.socraticQuestions.length)];
      return `That's an interesting point! ${randomQuestion} What evidence can you think of to support your reasoning?`;
    }
    
    return "That's a thoughtful observation! What led you to that conclusion? Can you think of any specific examples or evidence that supports your thinking?";
  };

  // Quiz handling functions
  const handleQuizAnswer = async (selectedAnswer: number) => {
    if (!currentQuiz) return;
    
    setQuizAnswer(selectedAnswer);
    setShowQuizResult(true);
    
    try {
      // Always use deployed backend - it's ready and working
      const API_BASE = 'https://ap-helper-2d9f117e9bdb.herokuapp.com';
        
      const response = await fetch(`${API_BASE}/api/quiz/answer`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          userId: user?.uid,
          topic: detectTopic(messages[messages.length - 1]?.content || ''),
          selectedAnswer: selectedAnswer,
          correctAnswer: currentQuiz.correct,
          course: course,
          unit: unit
        })
      });
      
      const result = await response.json();
      
      // Update progress based on quiz result
      if (result.progressUpdate && Object.keys(result.progressUpdate).length > 0 && user) {
        Object.entries(result.progressUpdate).forEach(([topic, updates]) => {
          userMemoryManager.updateTopicProgress(user.uid, course!, unit!, topic, updates as any);
        });
        
        // Refresh conversation memory
        const updatedMemory = userMemoryManager.loadConversationMemory(user.uid, course!, unit!);
        if (updatedMemory) {
          setConversationMemory(updatedMemory);
        }
      }
      
      // Add quiz result as AI message
      setTimeout(() => {
        const resultMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: result.message + (selectedAnswer === currentQuiz.correct ? '' : `\n\n💡 ${currentQuiz.explanation}`),
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, resultMessage]);
        
        // Clear quiz after showing result
        setTimeout(() => {
          setCurrentQuiz(null);
          setQuizAnswer(null);
          setShowQuizResult(false);
        }, 3000);
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting quiz answer:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const unitInfo = getUnitInfo();

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600 mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // Remove login requirement - allow unauthenticated access
  // Show login required message if not authenticated
  // if (!isAuthenticated) {
  //   return (
  //     <div className="h-screen bg-slate-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-xl font-semibold text-slate-900 mb-2">Login Required</h2>
  //         <p className="text-slate-600 mb-4">Please log in to access the Socratic tutor.</p>
  //         <button 
  //           onClick={() => navigate('/login')}
  //           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  //         >
  //           Go to Login
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // Restart conversation function
  const handleRestartClick = () => {
    setShowRestartConfirm(true);
  };

  const confirmRestart = () => {
    // Clear current messages
    setMessages([]);
    setInputMessage('');
    setCurrentQuiz(null);
    setQuizAnswer(null);
    setShowQuizResult(false);
    setShowRestartConfirm(false);
    
    // Clear memory from localStorage and reset progress
    if (user && course && unit) {
      const memoryKey = `memory_${user.uid}_${course}_${unit}`;
      localStorage.removeItem(memoryKey);
      
      // Create fresh conversation memory
      const newMemory = userMemoryManager.createConversationMemory(user.uid, course, unit);
      setConversationMemory(newMemory);
      
      // Start new session
      sessionManager.startChatSession(user.uid, course, unit);
      
      // Show fresh welcome message
      const welcomeMessage: Message = {
        id: '1',
        content: getWelcomeMessage(course, unit),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const cancelRestart = () => {
    setShowRestartConfirm(false);
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/socratic-learning')}
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Units</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="text-2xl">{unitInfo.emoji}</div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">{unitInfo.title}</h1>
                <p className="text-sm text-slate-600">{unitInfo.period}</p>
              </div>
            </div>

            <button
              onClick={handleRestartClick}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border border-slate-200 hover:border-orange-200"
              title="Start fresh conversation and reset progress"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl mx-auto w-full min-h-0 max-h-[calc(100vh-140px)]">
        {/* Progress Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 p-4 overflow-y-auto flex-shrink-0">
          <div className="space-y-4">
            {/* Quick Start Guide */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                💡 Need Help Getting Started?
              </h3>
              <p className="text-xs text-blue-800 mb-2">Try saying:</p>
              <div className="space-y-1">
                <button 
                  onClick={() => setInputMessage("I don't know anything about this")}
                  className="block w-full text-left text-xs bg-white border border-blue-200 rounded px-2 py-1 hover:bg-blue-100 transition-colors"
                >
                  "I don't know anything about this"
                </button>
                <button 
                  onClick={() => setInputMessage("Can you explain what happened?")}
                  className="block w-full text-left text-xs bg-white border border-blue-200 rounded px-2 py-1 hover:bg-blue-100 transition-colors"
                >
                  "Can you explain what happened?"
                </button>
                <button 
                  onClick={() => setInputMessage("Please help me understand")}
                  className="block w-full text-left text-xs bg-white border border-blue-200 rounded px-2 py-1 hover:bg-blue-100 transition-colors"
                >
                  "Please help me understand"
                </button>
              </div>
              <p className="text-xs text-blue-700 mt-2 italic">These will get you helpful overviews instead of just questions!</p>
            </div>

            {/* Unit Topics List */}
            <div>
              <h3 className="text-md font-semibold text-slate-900 mb-3 flex items-center gap-2">
                📚 {unit?.toUpperCase()} Topics
              </h3>
              
              <div className="space-y-2">
                {topicsLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-xs text-slate-500 mt-2">Loading topics...</p>
                  </div>
                ) : unitTopics.length > 0 ? (
                  unitTopics.map((topic, index) => {
                    // Check if this topic has been discussed in conversation memory
                    const topicProgress = conversationMemory?.topicProgress?.[topic.key];
                    const isActive = topicProgress?.introduced || false;
                    const isMastered = topicProgress?.mastered || false;
                    
                    return (
                      <div 
                        key={topic.key} 
                        className={`p-3 border rounded-lg transition-all duration-200 hover:shadow-sm cursor-pointer ${
                          isActive 
                            ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                        onClick={() => setInputMessage(`Tell me about ${topic.title.toLowerCase()}`)}
                        title={`Click to ask about ${topic.title}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mt-1 ${
                            isMastered 
                              ? 'bg-green-500 text-white' 
                              : isActive 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {isMastered ? '✓' : index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className={`text-sm font-medium leading-tight mb-1 ${
                              isActive ? 'text-blue-900' : 'text-slate-900'
                            }`}>
                              {topic.title}
                            </h5>
                            <div className={`text-xs ${isActive ? 'text-blue-700' : 'text-slate-600'} mb-2`}>
                              {topic.keyFacts.length} key concepts
                            </div>
                            
                            {/* Show progress indicator */}
                            {isActive && (
                              <div className={`text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 ${
                                isMastered 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {isMastered ? '🎓 Mastered' : '📖 In Progress'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-slate-500 text-sm py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                    <div className="text-2xl mb-2">🤖✨</div>
                    <p className="font-medium text-slate-700">Socratic AI Ready</p>
                    <p className="text-xs mt-1 text-slate-600">Advanced AI tutor available for all topics</p>
                    <p className="text-xs mt-1 text-blue-600">Start chatting below to explore any concept!</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-md font-semibold text-slate-900 mb-3">Learning Progress</h3>
              
              {conversationMemory && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600">{unit?.toUpperCase()} Mastery Progress</span>
                    <span className="font-medium text-slate-900">
                      {Math.round(conversationMemory.overallProgress.completionPercentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        conversationMemory.overallProgress.completionPercentage >= 80 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : conversationMemory.overallProgress.completionPercentage >= 50
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                          : 'bg-gradient-to-r from-slate-400 to-blue-500'
                      }`}
                      style={{ width: `${conversationMemory.overallProgress.completionPercentage}%` }}
                    />
                  </div>
                  
                  {/* Completion Status */}
                  {conversationMemory.overallProgress.completionPercentage >= 80 && (
                    <div className="mt-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🎓</span>
                        <span className="font-semibold text-green-800">{unit?.toUpperCase()} Mastery Achieved!</span>
                      </div>
                      <p className="text-sm text-green-700 mb-3">
                        Congratulations! You've mastered most of {unit?.toUpperCase()}. You're ready for the comprehensive assessment.
                      </p>
                      <button
                        onClick={() => {
                          if (course === 'apush') {
                            navigate(`/apush-study-guide/unit/${unit?.replace('unit', '')}/quiz`);
                          } else if (course === 'apgov') {
                            navigate(`/ap-gov-unit/${unit?.replace('unit', '')}`);
                          }
                        }}
                        className="w-full px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-md"
                      >
                        Take Final Assessment →
                      </button>
                    </div>
                  )}
                  
                  {/* Progress Milestones */}
                  {conversationMemory.overallProgress.completionPercentage < 80 && (
                    <div className="mt-3 text-xs text-slate-500">
                      {conversationMemory.overallProgress.completionPercentage < 25 && "🌱 Just getting started - keep exploring!"}
                      {conversationMemory.overallProgress.completionPercentage >= 25 && conversationMemory.overallProgress.completionPercentage < 50 && "📚 Building understanding - great progress!"}
                      {conversationMemory.overallProgress.completionPercentage >= 50 && conversationMemory.overallProgress.completionPercentage < 80 && "🎯 Almost there - pushing toward mastery!"}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-900 mb-2">Learning Topics</h4>
              <div className="space-y-2">
                {conversationMemory && Object.entries(conversationMemory.topicProgress).length > 0 ? 
                  Object.entries(conversationMemory.topicProgress).map(([key, progress]) => {
                    const status = progress?.mastered ? 'mastered' : progress?.practiced ? 'practiced' : progress?.introduced ? 'introduced' : 'not-started';
                    
                    return (
                      <div key={key} className="bg-white border border-slate-200 rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center ${
                            status === 'mastered' ? 'bg-green-500' :
                            status === 'practiced' ? 'bg-blue-500' :
                            status === 'introduced' ? 'bg-yellow-500' :
                            'bg-slate-300'
                          }`}>
                            {status === 'mastered' && <span className="text-white text-xs">✓</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="text-sm font-medium text-slate-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                              <span className={`text-xs font-medium px-2 py-1 rounded ${
                                status === 'mastered' ? 'bg-green-100 text-green-700' :
                                status === 'practiced' ? 'bg-blue-100 text-blue-700' :
                                status === 'introduced' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {status === 'mastered' ? 'Mastered' :
                                 status === 'practiced' ? 'Practiced' :
                                 status === 'introduced' ? 'Learning' :
                                 'Not Started'}
                              </span>
                            </div>
                            <div className="text-xs text-slate-600">
                              📚 Concepts learned: {progress?.conceptsLearned?.length || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="text-center text-slate-500 text-sm py-4">
                      Start learning to see your progress here!
                    </div>
                  )
                }
              </div>
            </div>

            {conversationMemory?.overallProgress.strongAreas && conversationMemory.overallProgress.strongAreas.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-slate-900 mb-3">Strong Areas</h4>
                <div className="space-y-1">
                  {conversationMemory.overallProgress.strongAreas.map(area => (
                    <div key={area} className="text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">
                      ✓ {APUSH_UNIT1_CONTENT.topics[area as keyof typeof APUSH_UNIT1_CONTENT.topics]?.title || area}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {conversationMemory?.overallProgress.needsReview && conversationMemory.overallProgress.needsReview.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-slate-900 mb-3">Needs Review</h4>
                <div className="space-y-1">
                  {conversationMemory.overallProgress.needsReview.map(area => (
                    <div key={area} className="text-sm text-orange-700 bg-orange-50 px-3 py-1 rounded-full">
                      ⚠ {APUSH_UNIT1_CONTENT.topics[area as keyof typeof APUSH_UNIT1_CONTENT.topics]?.title || area}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unit Quiz Link */}
            <div className="border-t pt-4">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">📝</span>
                  <h4 className="text-md font-semibold text-emerald-900">{unit?.toUpperCase()} Comprehensive Quiz</h4>
                </div>
                <p className="text-sm text-emerald-800 mb-3">
                  Ready to test your knowledge? Take the official {course?.toUpperCase()} {unit?.toUpperCase()} {course === 'apush' ? 'quiz with document-based questions and detailed explanations' : 'study guide with comprehensive content and practice questions'}.
                </p>
                <button
                  onClick={() => {
                    if (course === 'apush') {
                      navigate(`/apush-study-guide/unit/${unit?.replace('unit', '')}/quiz`);
                    } else if (course === 'apgov') {
                      navigate(`/ap-gov-unit/${unit?.replace('unit', '')}`);
                    }
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
                >
                  Take {unit?.toUpperCase()} {course === 'apush' ? 'Quiz' : 'Study Guide'} →
                </button>
                <p className="text-xs text-emerald-700 mt-2 text-center">
                  {course === 'apush' ? '10 questions • Historical documents • Instant feedback' : 'Comprehensive content • Practice questions • Key concepts'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          <div className="flex-1 px-4 py-3 overflow-y-auto min-h-0">
            <div className="space-y-3 pb-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
              )}
              
              <div
                className={`max-w-xl px-3 py-2 rounded-2xl text-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-slate-900 rounded-bl-sm shadow-sm border'
                }`}
              >
                <div className="leading-relaxed">
                  {message.sender === 'ai' ? (
                    <ReactMarkdown 
                      components={{
                        // Customize how different markdown elements are rendered with explicit styling
                        strong: ({...props}) => <strong style={{ fontWeight: 'bold', color: '#1e293b' }} className="font-extrabold" {...props} />,
                        em: ({...props}) => <em className="italic" {...props} />,
                        ul: ({...props}) => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,
                        ol: ({...props}) => <ol className="list-decimal list-inside space-y-1 my-2" {...props} />,
                        li: ({...props}) => <li className="ml-2" {...props} />,
                        p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        h3: ({...props}) => <h3 style={{ fontWeight: 'bold' }} className="font-extrabold text-lg mb-2" {...props} />,
                        h4: ({...props}) => <h4 style={{ fontWeight: 'bold' }} className="font-extrabold text-base mb-1" {...props} />
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
                <p className={`text-xs mt-1 opacity-75 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="bg-white text-slate-900 rounded-2xl rounded-bl-sm shadow-sm border px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Quiz Component */}
          {currentQuiz && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">?</span>
                </div>
                <h4 className="font-semibold text-blue-900">Quick Knowledge Check!</h4>
              </div>
              
              <p className="text-sm text-blue-800 mb-3 font-medium">{currentQuiz.question}</p>
              
              <div className="space-y-2">
                {currentQuiz.options.map((option, index) => {
                  let buttonClass = "w-full text-left px-3 py-2 text-sm rounded-xl border transition-all duration-200";
                  
                  if (showQuizResult) {
                    if (index === currentQuiz.correct) {
                      buttonClass += " bg-green-100 border-green-300 text-green-800";
                    } else if (index === quizAnswer && index !== currentQuiz.correct) {
                      buttonClass += " bg-red-100 border-red-300 text-red-800";
                    } else {
                      buttonClass += " bg-gray-100 border-gray-200 text-gray-600";
                    }
                  } else {
                    buttonClass += " bg-white border-blue-200 text-blue-900 hover:bg-blue-100 hover:border-blue-300";
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => !showQuizResult && handleQuizAnswer(index)}
                      disabled={showQuizResult}
                      className={buttonClass}
                    >
                      {String.fromCharCode(65 + index)}. {option}
                    </button>
                  );
                })}
              </div>
              
              {showQuizResult && (
                <div className="mt-3 text-xs text-blue-700">
                  {quizAnswer === currentQuiz.correct ? "🎉 Correct! Great job!" : "❌ Not quite right, but keep learning!"}
                </div>
              )}
            </div>
          )}
            </div>
            <div ref={messagesEndRef} />
          </div>
        </div>
      
      </div> {/* Close main flex container */}

      {/* Restart Confirmation Modal */}
      {showRestartConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Restart Conversation?</h3>
            </div>
            
            <p className="text-slate-600 mb-6">
              This will clear your entire conversation history and reset all learning progress for this unit. 
              You'll start completely fresh with a new welcome message.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelRestart}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRestart}
                className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded-lg transition-colors"
              >
                Yes, Restart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t shadow-lg flex-shrink-0 max-h-32">
        <div className="max-w-7xl mx-auto flex">
          <div className="w-80 flex-shrink-0"></div> {/* Spacer for sidebar */}
          <div className="flex-1 px-4 py-3">
            <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts or ask a question..."
                className="w-full px-3 py-2 border border-slate-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '80px' }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-3 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-10"
            >
              <Send className="w-4 h-4" />
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocraticChat;
