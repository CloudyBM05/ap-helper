// Knowledge Cards - Data Models and Types (Person-Focused)
export type CardRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythical';
export type CardCategory = 'scientist' | 'leader' | 'philosopher' | 'artist' | 'innovator' | 'activist';
export type Subject = 'apush' | 'apgov' | 'apbio' | 'apchem' | 'apphysics' | 'apstats' | 'appsych' | 'aphug' | 'aplit' | 'aplang' | 'apmicro' | 'apmacro' | 'apworld' | 'apcs';
export type CardTheme = 'standard' | 'pirate' | 'wizard' | 'superhero' | 'student' | 'business' | 'medieval' | 'cyberpunk' | 'space';

export interface KnowledgeCard {
  id: string;
  name: string; // Person's full name
  description: string; // Brief description of who they are and why they're important
  rarity: CardRarity;
  category: CardCategory;
  subjects: Subject[];
  theme?: CardTheme; // What themed variant this card represents
  stats: {
    intelligence?: number; // Intellectual contributions
    influence?: number; // Impact on society/field
    innovation?: number; // Revolutionary ideas/methods
    leadership?: number; // Ability to lead and inspire
    perseverance?: number; // Overcoming obstacles
    charisma?: number; // Personal magnetism and appeal
  };
  specialAbility?: {
    name: string;
    description: string;
    effect: string;
    duration?: number; // in hours
  };
  biography: string; // Longer biographical information
  famousQuote?: string; // Their most famous quote
  birthYear?: number;
  deathYear?: number;
  nationality?: string;
  education?: string; // Where they studied
  achievements: string[]; // List of major achievements
  timesPeriod?: string; // Historical period they lived in
  imageUrl?: string;
  relatedPeople?: string[]; // IDs of other cards they're connected to
}

export interface UserCard {
  cardId: string;
  userId: string;
  obtainedDate: Date;
  experience: number;
  level: number;
  isPrestiged: boolean;
  timesUsed: number;
  personalNotes?: string;
}

export interface CardPack {
  id: string;
  name: string;
  description: string;
  subjects: Subject[];
  cardCount: number;
  rarityDropRates: {
    [key in CardRarity]: number; // Percentage chance (0-100)
  };
  price: number; // in "Scholar Coins" or achievement points
  imageUrl?: string;
}

export interface UserCollection {
  userId: string;
  cards: UserCard[];
  totalCards: number;
  completionPercentage: number;
  favoriteCard?: string;
  lastCardObtained?: {
    cardId: string;
    date: Date;
  };
  scholarCoins: number; // Currency for trading/packs
  achievementBadges: string[];
  dailyPackClaims: {
    lastClaimedDate?: string; // ISO date string (YYYY-MM-DD)
    totalClaimed: number;
  };
}

// Rarity Configuration
export const RARITY_CONFIG = {
  common: {
    color: '#9CA3AF',
    borderColor: '#6B7280',
    glow: 'rgba(156, 163, 175, 0.3)',
    dropRate: 69.5,
    name: 'Common'
  },
  uncommon: {
    color: '#10B981',
    borderColor: '#059669',
    glow: 'rgba(16, 185, 129, 0.4)',
    dropRate: 20,
    name: 'Uncommon'
  },
  rare: {
    color: '#3B82F6',
    borderColor: '#1D4ED8',
    glow: 'rgba(59, 130, 246, 0.5)',
    dropRate: 8,
    name: 'Rare'
  },
  epic: {
    color: '#8B5CF6',
    borderColor: '#7C3AED',
    glow: 'rgba(139, 92, 246, 0.6)',
    dropRate: 2,
    name: 'Epic'
  },
  legendary: {
    color: '#F59E0B',
    borderColor: '#D97706',
    glow: 'rgba(245, 158, 11, 0.7)',
    dropRate: 0.5,
    name: 'Legendary'
  },
  mythical: {
    color: '#EC4899',
    borderColor: '#BE185D',
    glow: 'rgba(236, 72, 153, 0.8)',
    dropRate: 0.1,
    name: 'Mythical'
  }
};

// Card Categories (Person Types)
export const CATEGORY_CONFIG = {
  scientist: {
    icon: '🔬',
    name: 'Scientist',
    description: 'Brilliant minds who advanced human knowledge'
  },
  leader: {
    icon: '👑',
    name: 'Leader',
    description: 'Political and social leaders who shaped history'
  },
  philosopher: {
    icon: '🤔',
    name: 'Philosopher',
    description: 'Thinkers who explored the big questions of life'
  },
  artist: {
    icon: '🎨',
    name: 'Artist',
    description: 'Creative geniuses who expressed human experience'
  },
  innovator: {
    icon: '💡',
    name: 'Innovator',
    description: 'Inventors and entrepreneurs who changed the world'
  },
  activist: {
    icon: '✊',
    name: 'Activist',
    description: 'Champions of justice and social change'
  }
};

// Card Themes (Visual Variants)
export const THEME_CONFIG = {
  standard: {
    icon: '📚',
    name: 'Standard',
    description: 'Classic historical figures',
    borderStyle: 'solid',
    bgGradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
  },
  pirate: {
    icon: '🏴‍☠️',
    name: 'Pirate',
    description: 'Swashbuckling sea adventurers',
    borderStyle: 'dashed',
    bgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #1e3a8a 50%, #0f172a 100%)'
  },
  wizard: {
    icon: '🧙',
    name: 'Wizard',
    description: 'Mystical masters of magic',
    borderStyle: 'dotted',
    bgGradient: 'linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #1e1b4b 100%)'
  },
  superhero: {
    icon: '🦸',
    name: 'Superhero',
    description: 'Heroic defenders of justice',
    borderStyle: 'double',
    bgGradient: 'linear-gradient(135deg, #dc2626 0%, #f59e0b 50%, #1f2937 100%)'
  },
  student: {
    icon: '☕',
    name: 'Student',
    description: 'Sleep-deprived academic achievers',
    borderStyle: 'solid',
    bgGradient: 'linear-gradient(135deg, #92400e 0%, #d97706 50%, #451a03 100%)'
  },
  business: {
    icon: '💼',
    name: 'Business',
    description: 'Corporate leaders and executives',
    borderStyle: 'solid',
    bgGradient: 'linear-gradient(135deg, #374151 0%, #6b7280 50%, #111827 100%)'
  },
  medieval: {
    icon: '⚔️',
    name: 'Medieval',
    description: 'Noble knights and medieval lords',
    borderStyle: 'solid',
    bgGradient: 'linear-gradient(135deg, #713f12 0%, #a16207 50%, #292524 100%)'
  },
  cyberpunk: {
    icon: '🤖',
    name: 'Cyberpunk',
    description: 'Futuristic digital entities',
    borderStyle: 'solid',
    bgGradient: 'linear-gradient(135deg, #065f46 0%, #10b981 50%, #064e3b 100%)'
  },
  space: {
    icon: '🚀',
    name: 'Space',
    description: 'Galactic explorers and commanders',
    borderStyle: 'solid',
    bgGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #0f0a19 100%)'
  }
};
