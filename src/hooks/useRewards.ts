import { useState, useCallback } from 'react';
import { CardCollectionManager } from '../utils/cardCollectionManager';
import { KnowledgeCard, CardRarity, Subject } from '../types/knowledgeCards';

interface RewardState {
  isAwarding: boolean;
  recentReward: KnowledgeCard | null;
  scholarCoinsEarned: number;
  showNotification: boolean;
}

interface UseRewardsResult {
  rewardState: RewardState;
  awardQuizReward: (userId: string, score: number, subject: Subject, quizType?: string) => void;
  awardScholarCoins: (userId: string, amount: number) => void;
  awardRandomCard: (userId: string, rarity?: CardRarity) => void;
  dismissNotification: () => void;
}

export const useRewards = (): UseRewardsResult => {
  const [rewardState, setRewardState] = useState<RewardState>({
    isAwarding: false,
    recentReward: null,
    scholarCoinsEarned: 0,
    showNotification: false
  });

  const awardQuizReward = useCallback((userId: string, score: number, subject: Subject, _quizType = 'quiz') => {
    setRewardState(prev => ({ ...prev, isAwarding: true }));

    // Calculate base coin reward
    let coinReward = Math.floor(score * 2); // 2 coins per point
    
    // Bonus for perfect scores
    if (score >= 100) {
      coinReward += 50;
    } else if (score >= 90) {
      coinReward += 25;
    } else if (score >= 80) {
      coinReward += 10;
    }

    // Award coins
    CardCollectionManager.addScholarCoins(userId, coinReward);

    // Determine if user gets a card reward
    let cardReward: KnowledgeCard | null = null;
    
    // Card reward chances based on score
    const cardChance = Math.random() * 100;
    let shouldAwardCard = false;
    let preferredRarity: CardRarity | undefined;

    if (score >= 100) {
      shouldAwardCard = cardChance < 30; // 30% chance for perfect score
      if (shouldAwardCard && cardChance < 5) {
        preferredRarity = 'legendary'; // 5% chance for legendary
      } else if (shouldAwardCard && cardChance < 15) {
        preferredRarity = 'epic'; // 10% chance for epic
      }
    } else if (score >= 90) {
      shouldAwardCard = cardChance < 20; // 20% chance for 90+
      if (shouldAwardCard && cardChance < 5) {
        preferredRarity = 'epic'; // 5% chance for epic
      }
    } else if (score >= 80) {
      shouldAwardCard = cardChance < 10; // 10% chance for 80+
    } else if (score >= 70) {
      shouldAwardCard = cardChance < 5; // 5% chance for 70+
    }

    // Award card if eligible
    if (shouldAwardCard) {
      cardReward = CardCollectionManager.awardCardReward(userId, preferredRarity);
    }

    // Check for achievement milestones
    const collection = CardCollectionManager.getUserCollection(userId);
    
    // First card achievement
    if (collection.totalCards === 1 && cardReward) {
      CardCollectionManager.addAchievementBadge(userId, 'First Card');
    }
    
    // Perfect score achievements
    if (score === 100) {
      CardCollectionManager.addAchievementBadge(userId, `Perfect ${subject.toUpperCase()}`);
    }

    // Collection milestones
    if (collection.totalCards === 10) {
      CardCollectionManager.addAchievementBadge(userId, 'Collector');
    } else if (collection.totalCards === 25) {
      CardCollectionManager.addAchievementBadge(userId, 'Dedicated Collector');
    } else if (collection.totalCards === 50) {
      CardCollectionManager.addAchievementBadge(userId, 'Master Collector');
    }

    setRewardState({
      isAwarding: false,
      recentReward: cardReward,
      scholarCoinsEarned: coinReward,
      showNotification: true
    });
  }, []);

  const awardScholarCoins = useCallback((userId: string, amount: number) => {
    CardCollectionManager.addScholarCoins(userId, amount);
    setRewardState({
      isAwarding: false,
      recentReward: null,
      scholarCoinsEarned: amount,
      showNotification: true
    });
  }, []);

  const awardRandomCard = useCallback((userId: string, rarity?: CardRarity) => {
    const cardReward = CardCollectionManager.awardCardReward(userId, rarity);
    setRewardState({
      isAwarding: false,
      recentReward: cardReward,
      scholarCoinsEarned: 0,
      showNotification: true
    });
  }, []);

  const dismissNotification = useCallback(() => {
    setRewardState(prev => ({
      ...prev,
      showNotification: false,
      recentReward: null,
      scholarCoinsEarned: 0
    }));
  }, []);

  return {
    rewardState,
    awardQuizReward,
    awardScholarCoins,
    awardRandomCard,
    dismissNotification
  };
};

// Utility function for calculating card drop rates based on various factors
export const calculateCardDropChance = (
  score: number,
  consecutivePerfectScores: number = 0,
  streakBonus: number = 0
): { shouldDrop: boolean; preferredRarity?: CardRarity } => {
  let baseChance = 0;
  let preferredRarity: CardRarity | undefined;

  // Base chances based on score
  if (score >= 100) {
    baseChance = 30;
  } else if (score >= 90) {
    baseChance = 20;
  } else if (score >= 80) {
    baseChance = 10;
  } else if (score >= 70) {
    baseChance = 5;
  }

  // Streak bonuses
  baseChance += Math.min(consecutivePerfectScores * 5, 20); // Up to +20% for streaks
  baseChance += streakBonus;

  const roll = Math.random() * 100;
  const shouldDrop = roll < baseChance;

  if (shouldDrop) {
    // Determine rarity based on score and luck
    const rarityRoll = Math.random() * 100;
    
    if (score >= 100) {
      if (rarityRoll < 5) {
        preferredRarity = 'legendary';
      } else if (rarityRoll < 15) {
        preferredRarity = 'epic';
      } else if (rarityRoll < 40) {
        preferredRarity = 'rare';
      }
    } else if (score >= 90) {
      if (rarityRoll < 5) {
        preferredRarity = 'epic';
      } else if (rarityRoll < 25) {
        preferredRarity = 'rare';
      }
    } else if (score >= 80) {
      if (rarityRoll < 15) {
        preferredRarity = 'rare';
      }
    }
  }

  return { shouldDrop, preferredRarity };
};
