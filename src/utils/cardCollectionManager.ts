import { KnowledgeCard, CardPack, UserCard, UserCollection, CardRarity } from '../types/knowledgeCards';
import { KNOWLEDGE_CARDS_DATABASE, CARD_PACKS } from '../data/knowledgeCardsData';

export class CardCollectionManager {
  private static STORAGE_KEY = 'ap_helper_card_collection';

  static getUserCollection(userId: string): UserCollection {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        return this.createNewCollection(userId);
      }

      const collections: UserCollection[] = JSON.parse(stored);
      const userCollection = collections.find(c => c.userId === userId);
      
      if (!userCollection) {
        return this.createNewCollection(userId);
      }

      // Ensure cards have proper Date objects
      userCollection.cards.forEach(card => {
        if (typeof card.obtainedDate === 'string') {
          card.obtainedDate = new Date(card.obtainedDate);
        }
      });

      if (userCollection.lastCardObtained && typeof userCollection.lastCardObtained.date === 'string') {
        userCollection.lastCardObtained.date = new Date(userCollection.lastCardObtained.date);
      }

      // Ensure daily pack claims field exists (for existing collections)
      if (!userCollection.dailyPackClaims) {
        userCollection.dailyPackClaims = {
          totalClaimed: 0
        };
      }

      // Recalculate completion percentage
      userCollection.completionPercentage = this.calculateCompletionPercentage(userCollection);

      return userCollection;
    } catch (error) {
      console.error('Error loading user collection:', error);
      return this.createNewCollection(userId);
    }
  }

  private static createNewCollection(userId: string): UserCollection {
    const newCollection: UserCollection = {
      userId,
      cards: [],
      totalCards: 0,
      completionPercentage: 0,
      scholarCoins: 100, // Start with enough for basic packs
      achievementBadges: [],
      dailyPackClaims: {
        totalClaimed: 0
      }
    };

    this.saveCollection(newCollection);
    return newCollection;
  }

  static saveCollection(collection: UserCollection): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      const collections: UserCollection[] = stored ? JSON.parse(stored) : [];
      
      const existingIndex = collections.findIndex(c => c.userId === collection.userId);
      if (existingIndex >= 0) {
        collections[existingIndex] = collection;
      } else {
        collections.push(collection);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(collections));
    } catch (error) {
      console.error('Error saving collection:', error);
    }
  }

  static addCardToCollection(userId: string, cardId: string): UserCard | null {
    const collection = this.getUserCollection(userId);
    const card = KNOWLEDGE_CARDS_DATABASE.find(c => c.id === cardId);

    if (!card) {
      console.error('Card not found:', cardId);
      return null;
    }

    // Check if user already has this card
    const existingCard = collection.cards.find(c => c.cardId === cardId);
    if (existingCard) {
      console.log('User already owns this card:', cardId);
      return existingCard;
    }

    const newUserCard: UserCard = {
      cardId,
      userId,
      obtainedDate: new Date(),
      experience: 0,
      level: 1,
      isPrestiged: false,
      timesUsed: 0
    };

    collection.cards.push(newUserCard);
    collection.totalCards = collection.cards.length;
    collection.completionPercentage = this.calculateCompletionPercentage(collection);
    collection.lastCardObtained = {
      cardId,
      date: new Date()
    };

    console.log('Added new card to collection:', cardId, 'Total cards now:', collection.totalCards);
    this.saveCollection(collection);
    return newUserCard;
  }

  static openCardPack(userId: string, packId: string): KnowledgeCard[] | null {
    console.log(`🎯 PACK OPENING STARTED - User: ${userId}, Pack: ${packId}`);
    
    const collection = this.getUserCollection(userId);
    const pack = CARD_PACKS.find(p => p.id === packId);

    if (!pack) {
      console.error('❌ Pack not found:', packId);
      console.error('Available packs:', CARD_PACKS.map(p => p.id));
      return null;
    }

    console.log(`📦 Found pack: ${pack.name}`);
    console.log(`💰 User coins: ${collection.scholarCoins}, Pack price: ${pack.price}`);

    // Special handling for daily pack
    if (pack.id === 'daily-pack') {
      if (!this.isDailyPackAvailable(userId)) {
        console.error('❌ Daily pack already claimed today');
        return null;
      }
    }

    if (collection.scholarCoins < pack.price) {
      console.error('❌ Insufficient Scholar Coins');
      return null;
    }

    // Deduct coins (daily pack is free so no coins deducted)
    if (pack.price > 0) {
      collection.scholarCoins -= pack.price;
      console.log(`💸 Deducted ${pack.price} coins, remaining: ${collection.scholarCoins}`);
      // Save the collection immediately after deducting coins
      this.saveCollection(collection);
    }

    // If this is a daily pack, mark it as claimed
    if (pack.id === 'daily-pack') {
      this.claimDailyPack(userId);
      console.log('📅 Daily pack claimed');
    }

    // Generate cards based on pack drop rates
    const obtainedCards: KnowledgeCard[] = [];
    const availableCards = KNOWLEDGE_CARDS_DATABASE.filter(card =>
      pack.subjects.some(subject => card.subjects.includes(subject))
    );

    console.log(`=== PACK OPENING DEBUG ===`);
    console.log(`Pack: "${pack.name}" (${pack.id})`);
    console.log('Pack subjects:', pack.subjects);
    console.log(`Total cards in database: ${KNOWLEDGE_CARDS_DATABASE.length}`);
    console.log('First 3 cards in database:', KNOWLEDGE_CARDS_DATABASE.slice(0, 3).map(c => `${c.name} - subjects: [${c.subjects.join(', ')}]`));
    console.log(`Available cards for pack: ${availableCards.length}`);
    console.log('Sample available cards:', availableCards.slice(0, 5).map(c => `${c.name} (${c.subjects.join(', ')})`));
    
    if (availableCards.length === 0) {
      console.error('❌ CRITICAL ERROR: No available cards found for this pack!');
      console.error('Pack subjects:', pack.subjects);
      console.error('Available subjects in database:', [...new Set(KNOWLEDGE_CARDS_DATABASE.flatMap(c => c.subjects))]);
      return null;
    }

    // Helper function to pick random card based on rarity percentages
    const getRandomCardByDropRate = (): KnowledgeCard | null => {
      const random = Math.random() * 100; // 0-100
      
      // Build cumulative probability ranges
      const ranges: { min: number; max: number; rarity: CardRarity }[] = [];
      let cumulative = 0;
      
      const rarities: CardRarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythical'];
      
      console.log('🎯 Pack drop rates:', pack.rarityDropRates);
      
      for (const rarity of rarities) {
        const rate = pack.rarityDropRates[rarity];
        if (rate > 0) {
          ranges.push({
            min: cumulative,
            max: cumulative + rate,
            rarity: rarity
          });
          cumulative += rate;
        }
      }
      
      console.log(`🎲 Random roll: ${random.toFixed(2)}%`);
      console.log('📊 Cumulative ranges:', ranges.map(r => `${r.rarity}: ${r.min}-${r.max}%`));
      
      // Find which range the random number falls into
      let selectedRarity: CardRarity = 'common'; // fallback
      let foundRange = false;
      
      for (const range of ranges) {
        if (random >= range.min && random < range.max) {
          selectedRarity = range.rarity;
          console.log(`✅ Selected rarity: ${selectedRarity} (fell in range ${range.min}-${range.max}%)`);
          foundRange = true;
          break;
        }
      }
      
      if (!foundRange) {
        console.log(`⚠️ Random ${random.toFixed(2)}% didn't fall in any range, using first available rarity`);
        if (ranges.length > 0) {
          selectedRarity = ranges[0].rarity;
        }
      }
      
      // Get cards of the selected rarity
      const cardsOfRarity = availableCards.filter(card => card.rarity === selectedRarity);
      console.log(`🔍 Cards available for rarity '${selectedRarity}': ${cardsOfRarity.length}`);
      console.log('Available rarities in pool:', [...new Set(availableCards.map(c => c.rarity))]);
      
      if (cardsOfRarity.length === 0) {
        console.log(`No cards found for rarity: ${selectedRarity}, falling back to common`);
        const commonCards = availableCards.filter(card => card.rarity === 'common');
        console.log(`🔍 Common cards available: ${commonCards.length}`);
        if (commonCards.length > 0) {
          const randomIndex = Math.floor(Math.random() * commonCards.length);
          return commonCards[randomIndex];
        }
        console.log(`❌ No common cards available either!`);
        // Try ANY rarity as final fallback
        if (availableCards.length > 0) {
          console.log(`🔧 EMERGENCY FALLBACK: Using any available card`);
          const randomIndex = Math.floor(Math.random() * availableCards.length);
          return availableCards[randomIndex];
        }
        return null;
      }
      
      // Filter out cards already obtained in this pack to avoid duplicates within the same pack
      const availableCardsOfRarity = cardsOfRarity.filter(card => 
        !obtainedCards.some(obtainedCard => obtainedCard.id === card.id)
      );
      
      // If no available cards of this rarity (all already obtained), allow duplicates
      const finalCardsPool = availableCardsOfRarity.length > 0 ? availableCardsOfRarity : cardsOfRarity;
      const randomIndex = Math.floor(Math.random() * finalCardsPool.length);
      const selectedCard = finalCardsPool[randomIndex];
      
      console.log(`Selected card: ${selectedCard.name} (${selectedCard.rarity})`);
      return selectedCard;
    };

    // Generate the specified number of cards
    console.log(`🎲 Generating ${pack.cardCount} cards...`);
    for (let i = 0; i < pack.cardCount; i++) {
      console.log(`🔄 Generating card ${i + 1} of ${pack.cardCount}`);
      const card = getRandomCardByDropRate();
      if (card) {
        console.log(`✅ Card generated: ${card.name} (${card.rarity})`);
        obtainedCards.push(card);
      } else {
        console.error(`❌ Failed to generate card ${i + 1}`);
      }
    }

    console.log(`🎁 Total cards generated: ${obtainedCards.length}`);
    
    if (obtainedCards.length === 0) {
      console.error('❌ CRITICAL ERROR: No cards were generated!');
      console.error('Pack card count:', pack.cardCount);
      console.error('Available cards pool size:', availableCards.length);
      console.error('Pack rarity drop rates:', pack.rarityDropRates);
      return null;
    }

    // Add all obtained cards to the collection
    console.log('=== PACK OPENING RESULTS ===');
    console.log('Pack:', pack.name);
    console.log('Expected rates:', pack.rarityDropRates);
    
    // Count actual rarities obtained
    const actualRarities: Record<CardRarity, number> = {
      common: 0, uncommon: 0, rare: 0, epic: 0, legendary: 0, mythical: 0
    };
    
    obtainedCards.forEach(card => {
      actualRarities[card.rarity]++;
    });
    
    console.log('Actual cards obtained:', obtainedCards.map(c => `${c.name} (${c.rarity})`));
    console.log('Actual rarity counts:', actualRarities);
    
    obtainedCards.forEach(card => {
      this.addCardToCollection(userId, card.id);
    });

    // Refresh collection after adding cards
    const updatedCollection = this.getUserCollection(userId);
    console.log('Pack opened successfully. Total cards now:', updatedCollection.totalCards);
    
    return obtainedCards;
  }

  static addScholarCoins(userId: string, amount: number): void {
    const collection = this.getUserCollection(userId);
    collection.scholarCoins += amount;
    this.saveCollection(collection);
  }

  static useCard(userId: string, cardId: string): void {
    const collection = this.getUserCollection(userId);
    const userCard = collection.cards.find(c => c.cardId === cardId);

    if (userCard) {
      userCard.timesUsed++;
      userCard.experience += 10;
      
      // Level up logic
      const expNeededForNextLevel = userCard.level * 100;
      if (userCard.experience >= expNeededForNextLevel) {
        userCard.level++;
        userCard.experience = 0;
      }

      this.saveCollection(collection);
    }
  }

  static calculateCompletionPercentage(collection: UserCollection): number {
    const totalAvailableCards = KNOWLEDGE_CARDS_DATABASE.length;
    return Math.round((collection.cards.length / totalAvailableCards) * 100);
  }

  static getCardById(cardId: string): KnowledgeCard | undefined {
    return KNOWLEDGE_CARDS_DATABASE.find(card => card.id === cardId);
  }

  static getPackById(packId: string): CardPack | undefined {
    return CARD_PACKS.find(pack => pack.id === packId);
  }

  static getCardsOwnedByRarity(collection: UserCollection): Record<CardRarity, number> {
    const counts: Record<CardRarity, number> = {
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
      mythical: 0
    };

    collection.cards.forEach(userCard => {
      const card = this.getCardById(userCard.cardId);
      if (card) {
        counts[card.rarity]++;
      }
    });

    return counts;
  }

  static getRecentCards(userId: string, limit: number = 5): KnowledgeCard[] {
    const collection = this.getUserCollection(userId);
    const sortedCards = collection.cards
      .sort((a, b) => b.obtainedDate.getTime() - a.obtainedDate.getTime())
      .slice(0, limit);

    return sortedCards
      .map(userCard => this.getCardById(userCard.cardId))
      .filter((card): card is KnowledgeCard => card !== undefined);
  }

  static setFavoriteCard(userId: string, cardId: string): void {
    const collection = this.getUserCollection(userId);
    const userOwnsCard = collection.cards.some(c => c.cardId === cardId);

    if (userOwnsCard) {
      collection.favoriteCard = cardId;
      this.saveCollection(collection);
    }
  }

  static addAchievementBadge(userId: string, badge: string): void {
    const collection = this.getUserCollection(userId);
    if (!collection.achievementBadges.includes(badge)) {
      collection.achievementBadges.push(badge);
      this.saveCollection(collection);
    }
  }

  // Reward system integration
  static awardCardReward(userId: string, cardRarity?: CardRarity): KnowledgeCard | null {
    const availableCards = cardRarity 
      ? KNOWLEDGE_CARDS_DATABASE.filter(card => card.rarity === cardRarity)
      : KNOWLEDGE_CARDS_DATABASE;

    if (availableCards.length === 0) return null;

    const randomCard = availableCards[Math.floor(Math.random() * availableCards.length)];
    const userCard = this.addCardToCollection(userId, randomCard.id);
    
    return userCard ? randomCard : null;
  }

  static isDailyPackAvailable(userId: string): boolean {
    const collection = this.getUserCollection(userId);
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // If no daily pack has ever been claimed, it's available
    if (!collection.dailyPackClaims.lastClaimedDate) {
      return true;
    }
    
    // If the last claimed date is before today, it's available
    return collection.dailyPackClaims.lastClaimedDate !== today;
  }

  static getDailyPackTimeUntilReset(): string {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set to midnight
    
    const msUntilReset = tomorrow.getTime() - now.getTime();
    const hoursUntilReset = Math.floor(msUntilReset / (1000 * 60 * 60));
    const minutesUntilReset = Math.floor((msUntilReset % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hoursUntilReset}h ${minutesUntilReset}m`;
  }

  static claimDailyPack(userId: string): void {
    const collection = this.getUserCollection(userId);
    const today = new Date().toISOString().split('T')[0];
    
    collection.dailyPackClaims.lastClaimedDate = today;
    collection.dailyPackClaims.totalClaimed += 1;
    
    this.saveCollection(collection);
  }
}

// Export convenience functions for easier imports
// Export instance for easy access
export const cardCollectionManager = {
  getCollection: () => {
    const collection = CardCollectionManager.getUserCollection('test-user-123');
    console.log('cardCollectionManager.getCollection() - Raw collection:', collection);
    console.log('cardCollectionManager.getCollection() - User cards:', collection.cards);
    
    const cards = collection.cards.map(userCard => {
      const card = CardCollectionManager.getCardById(userCard.cardId);
      console.log(`Mapping userCard ${userCard.cardId} to card:`, card);
      return card;
    }).filter((card): card is KnowledgeCard => card !== undefined);
    
    console.log('cardCollectionManager.getCollection() - Final cards array:', cards);
    console.log('cardCollectionManager.getCollection() - Final cards length:', cards.length);
    return cards;
  },
  addCard: (cardId: string) => CardCollectionManager.addCardToCollection('test-user-123', cardId),
  openPack: (packId: string) => CardCollectionManager.openCardPack('test-user-123', packId),
  addCoins: (amount: number) => CardCollectionManager.addScholarCoins('test-user-123', amount),
  useCard: (cardId: string) => CardCollectionManager.useCard('test-user-123', cardId),
  getCardById: (cardId: string) => CardCollectionManager.getCardById(cardId),
  getPackById: (packId: string) => CardCollectionManager.getPackById(packId)
};

export const {
  getUserCollection,
  saveCollection,
  addCardToCollection,
  openCardPack,
  addScholarCoins,
  useCard,
  getCardById,
  getPackById,
  getCardsOwnedByRarity,
  getRecentCards,
  setFavoriteCard,
  addAchievementBadge,
  awardCardReward
} = CardCollectionManager;
