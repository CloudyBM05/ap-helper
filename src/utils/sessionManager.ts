// Simple session management for demo purposes
// In production, this would be handled by a proper authentication system

interface UserSession {
  id: string;
  createdAt: Date;
  lastActive: Date;
  chatSessions: ChatSession[];
}

interface ChatSession {
  course: string;
  unit: string;
  startedAt: Date;
  lastMessage: Date;
  messageCount: number;
  topics: string[];
  currentTopic?: string;
}

class SessionManager {
  private sessions: Map<string, UserSession> = new Map();

  // Get or create a user session
  getSession(userId: string): UserSession {
    if (!this.sessions.has(userId)) {
      this.sessions.set(userId, {
        id: userId,
        createdAt: new Date(),
        lastActive: new Date(),
        chatSessions: []
      });
    }
    
    const session = this.sessions.get(userId)!;
    session.lastActive = new Date();
    return session;
  }

  // Start a new chat session
  startChatSession(userId: string, course: string, unit: string): ChatSession {
    const userSession = this.getSession(userId);
    
    const chatSession: ChatSession = {
      course,
      unit,
      startedAt: new Date(),
      lastMessage: new Date(),
      messageCount: 0,
      topics: []
    };

    userSession.chatSessions.push(chatSession);
    return chatSession;
  }

  // Update chat session with new message
  updateChatSession(userId: string, course: string, unit: string, topic?: string): void {
    const userSession = this.getSession(userId);
    const chatSession = userSession.chatSessions.find(
      cs => cs.course === course && cs.unit === unit
    );

    if (chatSession) {
      chatSession.lastMessage = new Date();
      chatSession.messageCount++;
      
      if (topic && !chatSession.topics.includes(topic)) {
        chatSession.topics.push(topic);
      }
      
      if (topic) {
        chatSession.currentTopic = topic;
      }
    }
  }

  // Get chat history for a specific course/unit
  getChatHistory(userId: string, course: string, unit: string): ChatSession | undefined {
    const userSession = this.getSession(userId);
    return userSession.chatSessions.find(
      cs => cs.course === course && cs.unit === unit
    );
  }

  // Generate a simple user ID for demo purposes
  static generateUserId(): string {
    return `user_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const sessionManager = new SessionManager();
export type { UserSession, ChatSession };
