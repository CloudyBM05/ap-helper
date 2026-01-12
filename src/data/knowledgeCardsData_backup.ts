import { KnowledgeCard, CardPack } from '../types/knowledgeCards';

export const KNOWLEDGE_CARDS_DATABASE: KnowledgeCard[] = [
  // ========== AP US HISTORY ==========
  
  // LEGENDARY - Most Influential Americans
  {
    id: 'george-washington',
    name: 'George Washington',
    description: 'The founding father who established precedents for American presidency',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 9,
      intelligence: 8
    },
    specialAbility: {
      name: 'Presidential Precedent',
      description: 'Gain 25% bonus points on questions about early American government',
      effect: 'early_government_bonus'
    },
    biography: 'First President of the United States (1789-1797), commander-in-chief during the Revolutionary War, and chairman of the Constitutional Convention. Known as the "Father of His Country," Washington established many precedents for the presidency and voluntarily stepped down after two terms.',
    famousQuote: 'It is better to offer no excuse than a bad one.',
    birthYear: 1732,
    deathYear: 1799,
    nationality: 'American',
    achievements: [
      'First President of the United States',
      'Led Continental Army to victory',
      'Presided over Constitutional Convention',
      'Established presidential precedents'
    ],
    timesPeriod: 'Revolutionary Era & Early Republic'
  },

  {
    id: 'abraham-lincoln',
    name: 'Abraham Lincoln',
    description: 'The president who preserved the Union and ended slavery',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 10,
      charisma: 9
    },
    specialAbility: {
      name: 'Union Preservation',
      description: 'Double XP on Civil War and Reconstruction topics',
      effect: 'civil_war_double_xp'
    },
    biography: '16th President of the United States who led the nation through the Civil War, preserved the Union, and ended slavery through the Emancipation Proclamation.',
    famousQuote: 'A house divided against itself cannot stand.',
    birthYear: 1809,
    deathYear: 1865,
    nationality: 'American',
    achievements: [
      'Preserved the Union during Civil War',
      'Issued Emancipation Proclamation',
      'Passed 13th Amendment abolishing slavery',
      'Delivered Gettysburg Address'
    ],
    timesPeriod: 'Civil War Era'
  },

  {
    id: 'franklin-roosevelt',
    name: 'Franklin D. Roosevelt',
    description: 'The only president elected four times, led through Depression and WWII',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      charisma: 10,
      innovation: 8
    },
    specialAbility: {
      name: 'New Deal Programs',
      description: 'Bonus points on 20th century American history questions',
      effect: 'twentieth_century_bonus'
    },
    biography: '32nd President who led America through the Great Depression with New Deal programs and through most of World War II.',
    famousQuote: 'The only thing we have to fear is fear itself.',
    birthYear: 1882,
    deathYear: 1945,
    nationality: 'American',
    achievements: [
      'Led nation through Great Depression',
      'Created New Deal programs',
      'Led America through WWII',
      'Only president elected four times'
    ],
    timesPeriod: 'Depression & WWII Era'
  },

  // EPIC - Major Historical Figures
  {
    id: 'thomas-jefferson',
    name: 'Thomas Jefferson',
    description: 'Author of the Declaration of Independence and third president',
    rarity: 'epic',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 10,
      leadership: 8,
      innovation: 9,
      influence: 9
    },
    biography: 'Third President, principal author of the Declaration of Independence, and founder of the Democratic-Republican Party.',
    famousQuote: 'We hold these truths to be self-evident, that all men are created equal.',
    birthYear: 1743,
    deathYear: 1826,
    nationality: 'American',
    achievements: [
      'Wrote Declaration of Independence',
      'Third President of United States',
      'Completed Louisiana Purchase',
      'Founded University of Virginia'
    ],
    timesPeriod: 'Revolutionary Era & Early Republic'
  },

  {
    id: 'martin-luther-king',
    name: 'Martin Luther King Jr.',
    description: 'Civil rights leader who championed nonviolent resistance',
    rarity: 'epic',
    category: 'activist',
    subjects: ['apush', 'apgov'],
    stats: {
      charisma: 10,
      influence: 10,
      leadership: 9,
      perseverance: 10
    },
    biography: 'Baptist minister and civil rights activist who played a pivotal role in advancing civil rights using nonviolent civil disobedience.',
    famousQuote: 'I have a dream that one day this nation will rise up and live out the true meaning of its creed.',
    birthYear: 1929,
    deathYear: 1968,
    nationality: 'American',
    achievements: [
      'Led Montgomery Bus Boycott',
      'March on Washington organizer',
      'Nobel Peace Prize winner',
      'Instrumental in Civil Rights Act passage'
    ],
    timesPeriod: 'Civil Rights Era'
  },

  // ========== AP GOVERNMENT ==========
  
  {
    id: 'james-madison',
    name: 'James Madison',
    description: 'Father of the Constitution and Bill of Rights',
    rarity: 'epic',
    category: 'philosopher',
    subjects: ['apgov', 'apush'],
    stats: {
      intelligence: 10,
      innovation: 9,
      influence: 9,
      leadership: 7
    },
    biography: 'Fourth President and primary architect of the Constitution and Bill of Rights. Known as the "Father of the Constitution."',
    famousQuote: 'If men were angels, no government would be necessary.',
    birthYear: 1751,
    deathYear: 1836,
    nationality: 'American',
    achievements: [
      'Primary author of Constitution',
      'Wrote Bill of Rights',
      'Fourth President of United States',
      'Co-authored Federalist Papers'
    ],
    timesPeriod: 'Constitutional Era'
  },

  // ========== AP BIOLOGY ==========
  
  {
    id: 'charles-darwin',
    name: 'Charles Darwin',
    description: 'Naturalist who developed the theory of evolution',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apbio'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 9
    },
    specialAbility: {
      name: 'Natural Selection',
      description: 'Gain 30% bonus on evolution and biodiversity questions',
      effect: 'evolution_bonus'
    },
    biography: 'English naturalist who proposed the theory of evolution by natural selection, fundamentally changing our understanding of life on Earth.',
    famousQuote: 'It is not the strongest of the species that survives, nor the most intelligent, but the one most responsive to change.',
    birthYear: 1809,
    deathYear: 1882,
    nationality: 'British',
    achievements: [
      'Developed theory of evolution',
      'Wrote "On the Origin of Species"',
      'Studied aboard HMS Beagle',
      'Revolutionized biology'
    ],
    timesPeriod: 'Victorian Era'
  },

  {
    id: 'gregor-mendel',
    name: 'Gregor Mendel',
    description: 'Augustinian friar who discovered the laws of inheritance',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apbio'],
    stats: {
      intelligence: 9,
      innovation: 10,
      perseverance: 8,
      influence: 9
    },
    biography: 'Augustinian friar whose experiments with pea plants established the fundamental laws of inheritance.',
    famousQuote: 'My scientific studies have afforded me great gratification.',
    birthYear: 1822,
    deathYear: 1884,
    nationality: 'Austrian',
    achievements: [
      'Discovered laws of inheritance',
      'Founded modern genetics',
      'Conducted pea plant experiments',
      'Established dominant/recessive traits'
    ],
    timesPeriod: '19th Century'
  },

  // ========== AP CHEMISTRY ==========
  
  {
    id: 'marie-curie',
    name: 'Marie Curie',
    description: 'First woman to win Nobel Prize, pioneer in radioactivity',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apchem', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 9,
      perseverance: 10,
      influence: 10
    },
    specialAbility: {
      name: 'Radioactive Research',
      description: 'Double XP on atomic structure and radioactivity topics',
      effect: 'radioactivity_double_xp'
    },
    biography: 'Polish-French physicist and chemist, first woman to win a Nobel Prize and only person to win Nobel Prizes in two different sciences.',
    famousQuote: 'Nothing in life is to be feared, it is only to be understood.',
    birthYear: 1867,
    deathYear: 1934,
    nationality: 'Polish-French',
    achievements: [
      'First woman to win Nobel Prize',
      'Won Nobel Prizes in Physics and Chemistry',
      'Discovered polonium and radium',
      'Pioneered radioactivity research'
    ],
    timesPeriod: 'Early 20th Century'
  },

  {
    id: 'dmitri-mendeleev',
    name: 'Dmitri Mendeleev',
    description: 'Russian chemist who created the periodic table',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apchem'],
    stats: {
      intelligence: 9,
      innovation: 10,
      influence: 9,
      perseverance: 8
    },
    biography: 'Russian chemist who formulated the periodic law and created the periodic table of elements.',
    famousQuote: 'I saw in a dream a table where all elements fell into place as required.',
    birthYear: 1834,
    deathYear: 1907,
    nationality: 'Russian',
    achievements: [
      'Created periodic table',
      'Formulated periodic law',
      'Predicted unknown elements',
      'Advanced chemical education'
    ],
    timesPeriod: '19th Century'
  },

  // ========== AP PHYSICS ==========
  
  {
    id: 'albert-einstein',
    name: 'Albert Einstein',
    description: 'Theoretical physicist who developed theory of relativity',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      charisma: 7
    },
    specialAbility: {
      name: 'Relativity Theory',
      description: 'Gain 35% bonus on modern physics questions',
      effect: 'modern_physics_bonus'
    },
    biography: 'German-born theoretical physicist who developed the theory of relativity and won Nobel Prize in Physics.',
    famousQuote: 'Imagination is more important than knowledge.',
    birthYear: 1879,
    deathYear: 1955,
    nationality: 'German-American',
    achievements: [
      'Developed theory of relativity',
      'Formulated E=mc²',
      'Won Nobel Prize in Physics',
      'Advanced quantum theory'
    ],
    timesPeriod: '20th Century'
  },

  {
    id: 'isaac-newton',
    name: 'Isaac Newton',
    description: 'Mathematician and physicist who formulated laws of motion',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 8
    },
    specialAbility: {
      name: 'Laws of Motion',
      description: 'Gain 30% bonus on mechanics and motion questions',
      effect: 'mechanics_bonus'
    },
    biography: 'English mathematician, physicist, and astronomer who formulated the laws of motion and universal gravitation.',
    famousQuote: 'If I have seen further, it is by standing on the shoulders of giants.',
    birthYear: 1643,
    deathYear: 1727,
    nationality: 'English',
    achievements: [
      'Formulated laws of motion',
      'Discovered law of universal gravitation',
      'Invented calculus',
      'Wrote Principia Mathematica'
    ],
    timesPeriod: 'Scientific Revolution'
  },

  // ========== AP PSYCHOLOGY ==========
  
  {
    id: 'sigmund-freud',
    name: 'Sigmund Freud',
    description: 'Austrian neurologist who founded psychoanalysis',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['appsych'],
    stats: {
      intelligence: 9,
      innovation: 10,
      influence: 10,
      charisma: 8
    },
    specialAbility: {
      name: 'Psychoanalysis',
      description: 'Bonus points on personality and therapy questions',
      effect: 'psychology_bonus'
    },
    biography: 'Austrian neurologist and founder of psychoanalysis, revolutionizing our understanding of the human mind.',
    famousQuote: 'The interpretation of dreams is the royal road to a knowledge of the unconscious.',
    birthYear: 1856,
    deathYear: 1939,
    nationality: 'Austrian',
    achievements: [
      'Founded psychoanalysis',
      'Developed theories of unconscious mind',
      'Created talk therapy',
      'Influenced modern psychology'
    ],
    timesPeriod: 'Early 20th Century'
  },

  // ========== AP ECONOMICS ==========
  
  {
    id: 'adam-smith',
    name: 'Adam Smith',
    description: 'Scottish economist who wrote "The Wealth of Nations"',
    rarity: 'legendary',
    category: 'philosopher',
    subjects: ['apmicro', 'apmacro'],
    stats: {
      intelligence: 10,
      innovation: 9,
      influence: 10,
      leadership: 7
    },
    specialAbility: {
      name: 'Invisible Hand',
      description: 'Gain bonus points on market economy questions',
      effect: 'economics_bonus'
    },
    biography: 'Scottish economist and philosopher, known as the "Father of Economics" for his influential work on free market capitalism.',
    famousQuote: 'It is not from the benevolence of the butcher, the brewer, or the baker that we expect our dinner.',
    birthYear: 1723,
    deathYear: 1790,
    nationality: 'Scottish',
    achievements: [
      'Wrote "The Wealth of Nations"',
      'Founded modern economics',
      'Developed concept of invisible hand',
      'Influenced capitalist theory'
    ],
    timesPeriod: 'Enlightenment'
  },

  // ========== RARE & COMMON FIGURES ==========
  
  {
    id: 'benjamin-franklin',
    name: 'Benjamin Franklin',
    description: 'Polymath, inventor, diplomat, and founding father',
    rarity: 'rare',
    category: 'innovator',
    subjects: ['apush', 'apphysics'],
    stats: {
      intelligence: 9,
      innovation: 10,
      charisma: 9,
      influence: 8
    },
    biography: 'American polymath who was a leading writer, printer, inventor, scientist, and diplomat during the American Revolution.',
    famousQuote: 'An investment in knowledge pays the best interest.',
    birthYear: 1706,
    deathYear: 1790,
    nationality: 'American',
    achievements: [
      'Key founding father',
      'Invented lightning rod',
      'Diplomat to France',
      'Founded first public library'
    ],
    timesPeriod: 'Colonial & Revolutionary Era'
  },

  {
    id: 'susan-b-anthony',
    name: 'Susan B. Anthony',
    description: 'Women\'s rights activist who fought for suffrage',
    rarity: 'rare',
    category: 'activist',
    subjects: ['apush', 'apgov'],
    stats: {
      perseverance: 10,
      leadership: 8,
      influence: 8,
      charisma: 7
    },
    biography: 'American women\'s rights activist who played a pivotal role in the women\'s suffrage movement.',
    famousQuote: 'Failure is impossible.',
    birthYear: 1820,
    deathYear: 1906,
    nationality: 'American',
    achievements: [
      'Led women\'s suffrage movement',
      'Co-founded National Woman Suffrage Association',
      'First woman on US currency',
      'Fought for equal rights'
    ],
    timesPeriod: '19th Century'
  }
];

// Update Card Packs to focus on people
export const CARD_PACKS = [
  {
    id: 'founding-fathers',
    name: 'Founding Fathers Collection',
    description: 'The brilliant minds who created America',
    subjects: ['apush', 'apgov'],
    cardCount: 5,
    rarityGuarantees: {
      common: 2,
      rare: 2,
      epic: 1
    },
    price: 0 // Free starter pack
  },
  {
    id: 'scientific-revolutionaries',
    name: 'Scientific Revolutionaries',
    description: 'Scientists who changed our understanding of the world',
    subjects: ['apbio', 'apchem', 'apphysics'],
    cardCount: 4,
    rarityGuarantees: {
      rare: 2,
      epic: 1,
      legendary: 1
    },
    price: 150
  },
  {
    id: 'civil-rights-heroes',
    name: 'Civil Rights Heroes',
    description: 'Champions of equality and justice',
    subjects: ['apush', 'apgov'],
    cardCount: 3,
    rarityGuarantees: {
      rare: 1,
      epic: 2
    },
    price: 100
  },
  {
    id: 'economic-thinkers',
    name: 'Economic Thinkers',
    description: 'Brilliant economists who shaped modern markets',
    subjects: ['apmicro', 'apmacro'],
    cardCount: 3,
    rarityGuarantees: {
      uncommon: 1,
      rare: 1,
      epic: 1
    },
    price: 120,
    unlockCondition: 'Complete 10 chemistry quizzes with 95%+ accuracy',
    collectionSet: 'Chemistry Legends',
    comboCards: ['lab-microscope-001']
  }
];

export const additionalCards = [
  {
    id: 'washington-001',
    name: 'George Washington',
    description: 'First President of the United States and Founding Father',
    rarity: 'legendary',
    category: 'scholar',
    subjects: ['apush', 'apgov'],
    stats: {
      impact: 10,
      perseverance: 9,
      intelligence: 8
    },
    specialAbility: {
      name: 'Presidential Precedent',
      description: 'Bonus points on all government and early American history topics',
      effect: 'gov_history_bonus',
      duration: 24
    },
    lore: 'The reluctant leader who set the precedent for peaceful transfer of power and established the presidency as we know it.',
    quote: 'Liberty, when it begins to take root, is a plant of rapid growth.',
    year: 1789,
    unlockCondition: 'Master all APUSH Unit 1 topics',
    collectionSet: 'Founding Fathers'
  },

  // EPIC CONCEPTS
  {
    id: 'dna-helix-001',
    name: 'DNA Double Helix',
    description: 'The twisted ladder structure that holds the secrets of life',
    rarity: 'epic',
    category: 'concept',
    subjects: ['apbio'],
    stats: {
      complexity: 9,
      impact: 10,
      innovation: 8
    },
    specialAbility: {
      name: 'Genetic Insight',
      description: 'Reveals one biology quiz answer per day',
      effect: 'daily_bio_hint',
      duration: 24
    },
    lore: 'Discovered in 1953 by Watson, Crick, Franklin, and Wilkins, the double helix structure explained how genetic information is stored and copied.',
    year: 1953,
    unlockCondition: 'Perfect score on genetics quiz',
    collectionSet: 'Molecular Biology',
    comboCards: ['watson-crick-001', 'rosalind-franklin-001']
  },

  {
    id: 'constitution-001',
    name: 'U.S. Constitution',
    description: 'The supreme law that has guided America for over 200 years',
    rarity: 'epic',
    category: 'event',
    subjects: ['apush', 'apgov'],
    stats: {
      impact: 10,
      complexity: 8,
      utility: 9
    },
    specialAbility: {
      name: 'Constitutional Scholar',
      description: 'Bonus points on all government structure questions',
      effect: 'government_bonus',
      duration: 48
    },
    lore: 'Written in 1787, this document established the framework for American government with its system of checks and balances.',
    year: 1787,
    unlockCondition: 'Complete AP Gov constitutional unit',
    collectionSet: 'Founding Documents'
  },

  // RARE TOOLS
  {
    id: 'lab-microscope-001',
    name: 'Laboratory Microscope',
    description: 'The tool that revealed the microscopic world',
    rarity: 'rare',
    category: 'tool',
    subjects: ['apbio', 'apchem'],
    stats: {
      utility: 9,
      complexity: 6,
      innovation: 7
    },
    specialAbility: {
      name: 'Microscopic Vision',
      description: 'See detailed explanations on cellular biology questions',
      effect: 'detailed_bio_explanations',
      duration: 6
    },
    lore: 'From simple magnifying glasses to electron microscopes, these tools have revealed worlds invisible to the naked eye.',
    unlockCondition: 'Complete 5 biology lab simulations',
    collectionSet: 'Scientific Instruments',
    evolutionChain: {
      nextCard: 'electron-microscope-001',
      evolutionRequirement: 'Use 50 times'
    }
  },

  // UNCOMMON CONCEPTS
  {
    id: 'pythagorean-theorem-001',
    name: 'Pythagorean Theorem',
    description: 'a² + b² = c² - The foundation of geometry',
    rarity: 'uncommon',
    category: 'concept',
    subjects: ['apstats'], // Math concepts appear in statistics
    stats: {
      utility: 8,
      complexity: 4,
      impact: 7
    },
    specialAbility: {
      name: 'Right Triangle Master',
      description: 'Shortcuts for geometry problems',
      effect: 'geometry_shortcuts',
      duration: 2
    },
    lore: 'Named after the ancient Greek mathematician Pythagoras, this theorem has been fundamental to mathematics for over 2,000 years.',
    year: -500,
    unlockCondition: 'Solve 10 geometry problems correctly',
    collectionSet: 'Mathematical Foundations'
  },

  // COMMON STUDY MATERIALS
  {
    id: 'periodic-table-001',
    name: 'Periodic Table',
    description: 'The organized chart of all chemical elements',
    rarity: 'common',
    category: 'tool',
    subjects: ['apchem'],
    stats: {
      utility: 10,
      complexity: 5,
      impact: 8
    },
    specialAbility: {
      name: 'Elemental Knowledge',
      description: 'Quick reference for element properties',
      effect: 'element_reference',
      duration: 1
    },
    lore: 'Dmitri Mendeleev organized the elements by atomic weight, predicting the existence of undiscovered elements.',
    year: 1869,
    unlockCondition: 'Complete first chemistry lesson',
    collectionSet: 'Chemistry Basics'
  },

  {
    id: 'declaration-independence-001',
    name: 'Declaration of Independence',
    description: 'The document that declared America\'s freedom',
    rarity: 'uncommon',
    category: 'event',
    subjects: ['apush', 'apgov'],
    stats: {
      impact: 9,
      innovation: 8,
      utility: 7
    },
    specialAbility: {
      name: 'Revolutionary Spirit',
      description: 'Bonus on American Revolution topics',
      effect: 'revolution_bonus',
      duration: 12
    },
    lore: 'Written primarily by Thomas Jefferson, this document articulated the philosophical foundation for American independence.',
    quote: 'We hold these truths to be self-evident, that all men are created equal.',
    year: 1776,
    unlockCondition: 'Complete American Revolution quiz',
    collectionSet: 'Revolutionary War'
  }
];

// Additional Card Packs (merged)
const additionalCardPacks = [
  {
    id: 'starter-pack',
    name: 'Scholar\'s Starter Pack',
    description: 'Perfect for beginning your collection',
    subjects: ['apush', 'apbio', 'apchem'],
    cardCount: 5,
    rarityGuarantees: {
      common: 3,
      uncommon: 1,
      rare: 1
    },
    price: 0 // Free starter pack
  },
  {
    id: 'history-legends',
    name: 'History Legends Pack',
    description: 'Legendary figures who shaped the world',
    subjects: ['apush', 'apgov'],
    cardCount: 3,
    rarityGuarantees: {
      rare: 1,
      epic: 1
    },
    price: 100
  },
  {
    id: 'science-breakthrough',
    name: 'Scientific Breakthrough Pack',
    description: 'Revolutionary discoveries and their discoverers',
    subjects: ['apbio', 'apchem', 'apphysics'],
    cardCount: 4,
    rarityGuarantees: {
      uncommon: 2,
      rare: 1,
      epic: 1
    },
    price: 150
  }
];

// Merge additional card packs with main CARD_PACKS export
export { CARD_PACKS } from './knowledgeCardsData_backup';
