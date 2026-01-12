// Quick test to verify Arena functionality
import { cardCollectionManager } from '../utils/cardCollectionManager';
import { KNOWLEDGE_CARDS_DATABASE } from '../data/knowledgeCardsData';
import { KnowledgeCard } from '../types/knowledgeCards';

// Test function to check collection and APUSH cards
export function testArenaSetup() {
  console.log('=== Arena Setup Test ===');
  
  // Check all available cards
  const allCards: KnowledgeCard[] = KNOWLEDGE_CARDS_DATABASE;
  console.log(`Total cards in database: ${allCards.length}`);
  
  // Check APUSH cards specifically
  const apushCards = allCards.filter((card: KnowledgeCard) => 
    card.subjects.some((subject: string) => subject.toLowerCase() === 'apush')
  );
  console.log(`APUSH cards available: ${apushCards.length}`);
  console.log('Sample APUSH cards:', apushCards.slice(0, 5).map((card: KnowledgeCard) => ({ 
    id: card.id, 
    name: card.name, 
    subjects: card.subjects 
  })));
  
  // Check user collection
  const userCollection = cardCollectionManager.getCollection();
  console.log(`User collection size: ${userCollection.length}`);
  
  const userApushCards = userCollection.filter((card: KnowledgeCard) => 
    card.subjects.some((subject: string) => subject.toLowerCase() === 'apush')
  );
  console.log(`User APUSH cards: ${userApushCards.length}`);
  console.log('User APUSH cards:', userApushCards.slice(0, 5).map((card: KnowledgeCard) => ({ 
    id: card.id, 
    name: card.name, 
    subjects: card.subjects 
  })));
  
  return {
    totalCards: allCards.length,
    apushCardsAvailable: apushCards.length,
    userCollectionSize: userCollection.length,
    userApushCards: userApushCards.length
  };
}
