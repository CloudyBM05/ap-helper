// Quick debug script to check card subjects
import { KNOWLEDGE_CARDS_DATABASE, CARD_PACKS } from './src/data/knowledgeCardsData.js';

console.log('=== SUBJECTS ANALYSIS ===');

// Count cards per subject
const subjectCounts = {};
KNOWLEDGE_CARDS_DATABASE.forEach(card => {
  card.subjects.forEach(subject => {
    subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
  });
});

console.log('\nCards per subject:');
Object.entries(subjectCounts).sort((a,b) => b[1] - a[1]).forEach(([subject, count]) => {
  console.log(`${subject}: ${count} cards`);
});

console.log('\nTotal cards in database:', KNOWLEDGE_CARDS_DATABASE.length);

console.log('\n=== PACK ANALYSIS ===');
CARD_PACKS.forEach(pack => {
  console.log(`\nPack: ${pack.name}`);
  console.log(`Subjects: ${pack.subjects.join(', ')}`);
  
  const availableCards = KNOWLEDGE_CARDS_DATABASE.filter(card =>
    pack.subjects.some(subject => card.subjects.includes(subject))
  );
  
  console.log(`Available cards: ${availableCards.length}`);
  
  if (availableCards.length === 0) {
    console.log('❌ ERROR: No available cards for this pack!');
  }
});
