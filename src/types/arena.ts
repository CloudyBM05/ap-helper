import { KnowledgeCard } from './knowledgeCards';

export type ArenaMode = 'menu' | 'deck-builder' | 'battle' | 'collection';

export interface DeckCard extends KnowledgeCard {
  isSelected?: boolean;
  battlePower?: number; // Calculated from stats
}

export interface BattleState {
  currentQuestionIndex: number;
  score: number;
  playerHealth: number;
  enemyHealth: number;
  cardsUsed: string[];
  questionsAnswered: number;
  correctAnswers: number;
}

export interface BattleCard extends KnowledgeCard {
  battlePower: number; // Calculated from stats
  battleAbilities: BattleAbility[];
}

export interface BattleAbility {
  name: string;
  description: string;
  effect: 'bonus_points' | 'time_extension' | 'hint_reveal' | 'difficulty_reduction' | 'double_score';
  power: number; // 1-3, based on rarity
  cooldown?: number; // turns before can use again
}

export interface ArenaBattle {
  id: string;
  name: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  requiredCards?: number; // minimum cards needed in deck
  restrictedToSubjects?: string[]; // must use cards from these subjects
  restrictedToThemes?: string[]; // must use cards from these themes
  questions: BattleQuestion[];
  rewards: {
    scholarCoins: number;
    experiencePoints: number;
    cardPacks?: string[];
    exclusiveCards?: string[];
  };
  boss?: {
    name: string;
    description: string;
    avatar: string;
    specialMechanics: string[];
  };
}

export interface BattleQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  difficulty: number; // 1-10
  timeLimit: number; // seconds
  relatedCards?: string[]; // card IDs that provide bonuses
}

export interface PlayerDeck {
  name: string;
  cards: BattleCard[];
  totalPower: number;
  synergies: DeckSynergy[];
}

export interface DeckSynergy {
  name: string;
  description: string;
  effect: string;
  triggeredBy: string[]; // card IDs that trigger this synergy
  bonus: {
    type: 'accuracy' | 'speed' | 'points' | 'time';
    value: number;
  };
}

export interface BattleResult {
  battleId: string;
  playerDeck: PlayerDeck;
  questionsAnswered: number;
  questionsCorrect: number;
  timeUsed: number;
  abilitiesUsed: BattleAbility[];
  synergiesTriggered: DeckSynergy[];
  score: number;
  rewards: {
    scholarCoins: number;
    experiencePoints: number;
    cardsUnlocked?: string[];
  };
  performanceGrade: 'F' | 'D' | 'C' | 'B' | 'A' | 'S';
}

export interface ArenaStats {
  battlesWon: number;
  battlesLost: number;
  totalScore: number;
  averageScore: number;
  favoriteSubject: string;
  strongestDeck: PlayerDeck;
  achievementsUnlocked: string[];
}
