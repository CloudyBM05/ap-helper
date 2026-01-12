// User account and memory management for Socratic learning
export interface UserAccount {
  id: string;
  name?: string;
  email?: string;
  createdAt: Date;
  lastActive: Date;
  preferences: {
    learningStyle?: 'visual' | 'analytical' | 'discussion-based';
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    topics?: string[];
  };
}

export interface ConversationMemory {
  userId: string;
  course: string;
  unit: string;
  sessionId: string;
  messages: Array<{
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    topic?: string;
    conceptsCovered?: string[];
  }>;
  topicProgress: {
    [topicKey: string]: {
      introduced: boolean;
      practiced: boolean;
      mastered: boolean;
      lastDiscussed: Date;
      conceptsLearned: string[];
      questionsAsked: string[];
      strugglingAreas: string[];
      ready_for_assessment?: boolean;
      advanced_thinking?: boolean;
      concept_count?: number;
      total_concepts?: number;
    };
  };
  overallProgress: {
    completionPercentage: number;
    strongAreas: string[];
    needsReview: string[];
    readyForAssessment: boolean;
  };
}

class UserMemoryManager {
  private static instance: UserMemoryManager;
  private users: Map<string, UserAccount> = new Map();
  private memories: Map<string, ConversationMemory[]> = new Map();

  static getInstance(): UserMemoryManager {
    if (!UserMemoryManager.instance) {
      UserMemoryManager.instance = new UserMemoryManager();
    }
    return UserMemoryManager.instance;
  }

  // User Account Management
  createOrGetUser(userId: string, userData?: Partial<UserAccount>): UserAccount {
    if (!this.users.has(userId)) {
      const newUser: UserAccount = {
        id: userId,
        name: userData?.name,
        email: userData?.email,
        createdAt: new Date(),
        lastActive: new Date(),
        preferences: {
          learningStyle: 'discussion-based',
          difficulty: 'intermediate',
          topics: []
        }
      };
      this.users.set(userId, newUser);
      
      // Save to localStorage
      localStorage.setItem(`user_${userId}`, JSON.stringify(newUser));
    }
    
    const user = this.users.get(userId)!;
    user.lastActive = new Date();
    localStorage.setItem(`user_${userId}`, JSON.stringify(user));
    return user;
  }

  // Memory Management
  getConversationMemory(userId: string, course: string, unit: string): ConversationMemory | null {
    const userMemories = this.memories.get(userId) || [];
    return userMemories.find(m => m.course === course && m.unit === unit) || null;
  }

  createConversationMemory(userId: string, course: string, unit: string): ConversationMemory {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const memory: ConversationMemory = {
      userId,
      course,
      unit,
      sessionId,
      messages: [],
      topicProgress: {},
      overallProgress: {
        completionPercentage: 0,
        strongAreas: [],
        needsReview: [],
        readyForAssessment: false
      }
    };

    const userMemories = this.memories.get(userId) || [];
    userMemories.push(memory);
    this.memories.set(userId, userMemories);
    
    // Save to localStorage
    localStorage.setItem(`memory_${userId}_${course}_${unit}`, JSON.stringify(memory));
    return memory;
  }

  updateTopicProgress(userId: string, course: string, unit: string, topic: string, updates: Partial<ConversationMemory['topicProgress'][string]>) {
    const memory = this.getConversationMemory(userId, course, unit);
    if (!memory) return;

    if (!memory.topicProgress[topic]) {
      memory.topicProgress[topic] = {
        introduced: false,
        practiced: false,
        mastered: false,
        lastDiscussed: new Date(),
        conceptsLearned: [],
        questionsAsked: [],
        strugglingAreas: []
      };
    }

    Object.assign(memory.topicProgress[topic], updates);
    memory.topicProgress[topic].lastDiscussed = new Date();

    // Update overall progress
    this.updateOverallProgress(memory);
    
    // Save to localStorage
    localStorage.setItem(`memory_${userId}_${course}_${unit}`, JSON.stringify(memory));
  }

  private updateOverallProgress(memory: ConversationMemory) {
    const topics = Object.keys(memory.topicProgress);
    const totalTopics = Math.max(topics.length, 4); // Ensure we account for main APUSH topics
    
    if (topics.length === 0) {
      memory.overallProgress.completionPercentage = 0;
      return;
    }

    // MUCH MORE RIGOROUS PROGRESS CALCULATION - EXCLUDE GENERAL TOPIC
    const masteredTopics = topics.filter(topic => {
      if (topic === 'general') return false;
      const topicData = memory.topicProgress[topic];
      // Must have mastered AND proven with quiz or extensive conversation
      return topicData.mastered && 
             topicData.conceptsLearned.length >= 5 && 
             topicData.questionsAsked.length >= 3;
    }).length;
    
    const practicedTopics = topics.filter(topic => {
      if (topic === 'general') return false;
      const topicData = memory.topicProgress[topic];
      // Must show real understanding, not just mentioned concepts
      return topicData.practiced && 
             !topicData.mastered && 
             topicData.conceptsLearned.length >= 3 &&
             topicData.questionsAsked.length >= 2;
    }).length;
    
    const introducedTopics = topics.filter(topic => {
      if (topic === 'general') return false;
      const topicData = memory.topicProgress[topic];
      return topicData.introduced && 
             !topicData.practiced && 
             topicData.conceptsLearned.length >= 1;
    }).length;
    
    // STRICTER scoring: mastered = 100%, practiced = 40%, introduced = 10%
    // Require more evidence for higher scores
    const totalScore = (masteredTopics * 100) + (practicedTopics * 40) + (introducedTopics * 10);
    memory.overallProgress.completionPercentage = Math.min(100, totalScore / (totalTopics * 100) * 100);
    
    // Only consider truly mastered topics as strong areas - EXCLUDE GENERAL
    memory.overallProgress.strongAreas = topics.filter(topic => {
      const topicData = memory.topicProgress[topic];
      // Skip "general" topic
      if (topic === 'general') {
        return false;
      }
      return topicData.mastered && topicData.conceptsLearned.length >= 5;
    });
    
    // More comprehensive needs review logic - EXCLUDE MASTERED TOPICS AND GENERAL
    memory.overallProgress.needsReview = topics.filter(topic => {
      const topicData = memory.topicProgress[topic];
      
      // Skip "general" topic - it's not a real learning topic
      if (topic === 'general') {
        return false;
      }
      
      // If topic is truly mastered, it NEVER needs review, regardless of any other flags
      if (topicData.mastered && topicData.conceptsLearned.length >= 5 && topicData.questionsAsked.length >= 3) {
        return false;
      }
      
      // Otherwise, check if it needs review
      return (topicData.introduced && topicData.conceptsLearned.length < 2) ||
             (topicData.practiced && !topicData.mastered && topicData.conceptsLearned.length < 4) ||
             ((topicData as any).needsReview && !topicData.mastered) ||
             topicData.strugglingAreas.length > 0;
    });
    
    // Much higher bar for assessment readiness - need actual mastery
    memory.overallProgress.readyForAssessment = masteredTopics >= 3 && memory.overallProgress.completionPercentage >= 85;
  }

  addMessage(userId: string, course: string, unit: string, message: any) {
    const memory = this.getConversationMemory(userId, course, unit);
    if (memory) {
      memory.messages.push(message);
      localStorage.setItem(`memory_${userId}_${course}_${unit}`, JSON.stringify(memory));
    }
  }

  // Load from localStorage
  loadUserData(userId: string) {
    try {
      const userData = localStorage.getItem(`user_${userId}`);
      if (userData) {
        const user = JSON.parse(userData);
        user.createdAt = new Date(user.createdAt);
        user.lastActive = new Date(user.lastActive);
        this.users.set(userId, user);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }

  loadConversationMemory(userId: string, course: string, unit: string): ConversationMemory | null {
    try {
      const memoryData = localStorage.getItem(`memory_${userId}_${course}_${unit}`);
      if (memoryData) {
        const memory = JSON.parse(memoryData);
        // Convert date strings back to Date objects
        memory.messages.forEach((msg: any) => {
          msg.timestamp = new Date(msg.timestamp);
        });
        Object.keys(memory.topicProgress).forEach(topic => {
          memory.topicProgress[topic].lastDiscussed = new Date(memory.topicProgress[topic].lastDiscussed);
        });
        
        const userMemories = this.memories.get(userId) || [];
        const existingIndex = userMemories.findIndex(m => m.course === course && m.unit === unit);
        if (existingIndex >= 0) {
          userMemories[existingIndex] = memory;
        } else {
          userMemories.push(memory);
        }
        this.memories.set(userId, userMemories);
        return memory;
      }
    } catch (error) {
      console.error('Error loading conversation memory:', error);
    }
    return null;
  }
}

export const userMemoryManager = UserMemoryManager.getInstance();
