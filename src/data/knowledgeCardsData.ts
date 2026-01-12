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
  },

  // ========== COMMON CARDS ==========
  
  {
    id: 'john-adams',
    name: 'John Adams',
    description: 'Second President and founding father',
    rarity: 'common',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 6,
      intelligence: 7,
      perseverance: 7,
      charisma: 5
    },
    biography: 'Second President of the United States and key figure in American independence.',
    famousQuote: 'Facts are stubborn things.',
    birthYear: 1735,
    deathYear: 1826,
    nationality: 'American',
    achievements: [
      'Second President of USA',
      'Diplomat to Europe',
      'Helped negotiate Treaty of Paris',
      'Father of John Quincy Adams'
    ],
    timesPeriod: 'Revolutionary Era & Early Republic'
  },

  {
    id: 'james-madison',
    name: 'James Madison',
    description: 'Fourth President and Father of the Constitution',
    rarity: 'common',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 8,
      leadership: 6,
      influence: 7,
      charisma: 5
    },
    biography: 'Fourth President and primary architect of the U.S. Constitution and Bill of Rights.',
    famousQuote: 'Knowledge will forever govern ignorance.',
    birthYear: 1751,
    deathYear: 1836,
    nationality: 'American',
    achievements: [
      'Father of the Constitution',
      'Fourth President of USA',
      'Father of Bill of Rights',
      'Co-founded Democratic-Republican Party'
    ],
    timesPeriod: 'Constitutional Era & Early Republic'
  },

  {
    id: 'andrew-jackson',
    name: 'Andrew Jackson',
    description: 'Seventh President known as Old Hickory',
    rarity: 'common',
    category: 'leader',
    subjects: ['apush'],
    stats: {
      leadership: 7,
      perseverance: 8,
      charisma: 6,
      influence: 6
    },
    biography: 'Seventh President known for expanding democracy and his strong personality.',
    famousQuote: 'One man with courage makes a majority.',
    birthYear: 1767,
    deathYear: 1845,
    nationality: 'American',
    achievements: [
      'Seventh President of USA',
      'Hero of Battle of New Orleans',
      'Expanded voting rights',
      'Opposed National Bank'
    ],
    timesPeriod: 'Jacksonian Era'
  },

  {
    id: 'gregor-mendel',
    name: 'Gregor Mendel',
    description: 'Father of genetics through pea plant studies',
    rarity: 'common',
    category: 'scientist',
    subjects: ['apbio'],
    stats: {
      intelligence: 8,
      innovation: 7,
      perseverance: 8,
      influence: 6
    },
    biography: 'Austrian scientist and Augustinian friar who founded the science of genetics.',
    famousQuote: 'My scientific studies have afforded me great gratification.',
    birthYear: 1822,
    deathYear: 1884,
    nationality: 'Austrian',
    achievements: [
      'Discovered laws of inheritance',
      'Founded modern genetics',
      'Studied pea plant heredity',
      'Established dominant/recessive traits'
    ],
    timesPeriod: '19th Century'
  },

  {
    id: 'antoine-lavoisier',
    name: 'Antoine Lavoisier',
    description: 'Father of modern chemistry',
    rarity: 'common',
    category: 'scientist',
    subjects: ['apchem'],
    stats: {
      intelligence: 8,
      innovation: 8,
      influence: 7,
      perseverance: 6
    },
    biography: 'French chemist who is considered the father of modern chemistry.',
    famousQuote: 'Nothing is lost, nothing is created, everything is transformed.',
    birthYear: 1743,
    deathYear: 1794,
    nationality: 'French',
    achievements: [
      'Father of modern chemistry',
      'Discovered oxygen\'s role in combustion',
      'Created first periodic table',
      'Established conservation of mass'
    ],
    timesPeriod: '18th Century'
  },

  // ========== UNCOMMON CARDS ==========

  {
    id: 'thomas-paine',
    name: 'Thomas Paine',
    description: 'Influential political writer and philosopher',
    rarity: 'uncommon',
    category: 'philosopher',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 8,
      charisma: 8,
      influence: 8,
      leadership: 6
    },
    biography: 'English-born political activist and writer whose Common Sense inspired American independence.',
    famousQuote: 'These are the times that try men\'s souls.',
    birthYear: 1737,
    deathYear: 1809,
    nationality: 'English-American',
    achievements: [
      'Wrote "Common Sense"',
      'Inspired American Revolution',
      'Supported French Revolution',
      'Advocate for human rights'
    ],
    timesPeriod: 'Revolutionary Era'
  },

  {
    id: 'alexander-hamilton',
    name: 'Alexander Hamilton',
    description: 'First Secretary of the Treasury and financial architect',
    rarity: 'uncommon',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 9,
      leadership: 7,
      influence: 8,
      charisma: 7
    },
    biography: 'First Secretary of the Treasury who established America\'s financial system.',
    famousQuote: 'Those who stand for nothing fall for anything.',
    birthYear: 1755,
    deathYear: 1804,
    nationality: 'American',
    achievements: [
      'First Secretary of Treasury',
      'Created national bank',
      'Established financial system',
      'Co-wrote Federalist Papers'
    ],
    timesPeriod: 'Constitutional Era & Early Republic'
  },

  {
    id: 'rosalind-franklin',
    name: 'Rosalind Franklin',
    description: 'X-ray crystallographer crucial to understanding DNA',
    rarity: 'uncommon',
    category: 'scientist',
    subjects: ['apbio', 'apchem'],
    stats: {
      intelligence: 9,
      innovation: 8,
      perseverance: 9,
      influence: 7
    },
    biography: 'British chemist whose X-ray crystallography was crucial to understanding DNA structure.',
    famousQuote: 'Science and everyday life cannot and should not be separated.',
    birthYear: 1920,
    deathYear: 1958,
    nationality: 'British',
    achievements: [
      'X-ray crystallography of DNA',
      'Contributed to DNA structure discovery',
      'Studied RNA and virus structures',
      'Pioneer in molecular biology'
    ],
    timesPeriod: '20th Century'
  },

  {
    id: 'james-watson-crick',
    name: 'Watson & Crick',
    description: 'Duo who discovered DNA double helix structure',
    rarity: 'uncommon',
    category: 'scientist',
    subjects: ['apbio'],
    stats: {
      intelligence: 8,
      innovation: 9,
      influence: 8,
      perseverance: 7
    },
    biography: 'James Watson and Francis Crick discovered the double helix structure of DNA in 1953.',
    famousQuote: 'We have discovered the secret of life.',
    birthYear: 1928,
    deathYear: 2004,
    nationality: 'American-British',
    achievements: [
      'Discovered DNA double helix',
      'Won Nobel Prize in Medicine',
      'Revolutionized biology',
      'Founded molecular biology'
    ],
    timesPeriod: '20th Century'
  },

  {
    id: 'ivan-pavlov',
    name: 'Ivan Pavlov',
    description: 'Pioneered classical conditioning research',
    rarity: 'uncommon',
    category: 'scientist',
    subjects: ['appsych'],
    stats: {
      intelligence: 8,
      innovation: 8,
      perseverance: 9,
      influence: 8
    },
    biography: 'Russian physiologist known for his work in classical conditioning with dogs.',
    famousQuote: 'Learn the ABC of science before you try to ascend to its summit.',
    birthYear: 1849,
    deathYear: 1936,
    nationality: 'Russian',
    achievements: [
      'Discovered classical conditioning',
      'Won Nobel Prize in Physiology',
      'Founded behavioral psychology',
      'Studied digestive system'
    ],
    timesPeriod: 'Late 19th/Early 20th Century'
  },

  // ========== MYTHICAL CARDS ==========

  {
    id: 'leonardo-da-vinci',
    name: 'Leonardo da Vinci',
    description: 'Ultimate Renaissance genius - artist, inventor, scientist',
    rarity: 'mythical',
    category: 'innovator',
    subjects: ['apphysics', 'apchem'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      charisma: 9
    },
    specialAbility: {
      name: 'Renaissance Mastery',
      description: 'Gain 50% bonus points on any science question',
      effect: 'universal_science_bonus'
    },
    biography: 'Italian polymath of the Renaissance whose genius spanned art, science, engineering, and anatomy.',
    famousQuote: 'Learning never exhausts the mind.',
    birthYear: 1452,
    deathYear: 1519,
    nationality: 'Italian',
    achievements: [
      'Mona Lisa and Last Supper',
      'Designed flying machines',
      'Advanced human anatomy',
      'Engineering innovations',
      'Scientific method pioneer'
    ],
    timesPeriod: 'Renaissance'
  },

  {
    id: 'isaac-newton-mythical',
    name: 'Sir Isaac Newton',
    description: 'Mathematical and scientific genius who unlocked universal laws',
    rarity: 'mythical',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 9
    },
    specialAbility: {
      name: 'Universal Laws',
      description: 'Automatically solve any physics problem correctly',
      effect: 'physics_mastery'
    },
    biography: 'English mathematician and physicist who formulated the laws of motion and universal gravitation.',
    famousQuote: 'If I have seen further it is by standing on the shoulders of giants.',
    birthYear: 1643,
    deathYear: 1727,
    nationality: 'English',
    achievements: [
      'Laws of motion and gravity',
      'Invented calculus',
      'Optics and light theory',
      'Principia Mathematica',
      'Scientific revolution leader'
    ],
    timesPeriod: 'Scientific Revolution'
  },

  {
    id: 'george-washington-mythical',
    name: 'George Washington (Mythical)',
    description: 'The ultimate founding father with legendary leadership',
    rarity: 'mythical',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 10,
      charisma: 10
    },
    specialAbility: {
      name: 'Founding Vision',
      description: 'Gain 75% bonus points on early American history questions',
      effect: 'founding_era_mastery'
    },
    biography: 'The legendary first President whose leadership and character shaped a nation.',
    famousQuote: 'Liberty, when it begins to take root, is a plant of rapid growth.',
    birthYear: 1732,
    deathYear: 1799,
    nationality: 'American',
    achievements: [
      'Father of His Country',
      'Led nation to independence',
      'Established precedents',
      'Unified the colonies',
      'Symbol of American ideals'
    ],
    timesPeriod: 'Founding Era'
  },

  // ========== AP U.S. HISTORY - TOP TIER ==========
  
  {
    id: 'thomas-jefferson',
    name: 'Thomas Jefferson',
    description: 'Third President and principal author of Declaration of Independence',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 10,
      leadership: 9,
      influence: 10,
      charisma: 8
    },
    specialAbility: {
      name: 'Declaration of Independence',
      description: 'Gain 30% bonus on questions about American founding principles',
      effect: 'founding_principles_bonus'
    },
    biography: 'Third President of the United States, principal author of the Declaration of Independence, and founder of the University of Virginia.',
    famousQuote: 'All men are created equal.',
    birthYear: 1743,
    deathYear: 1826,
    nationality: 'American',
    achievements: [
      'Authored Declaration of Independence',
      'Third President of USA',
      'Louisiana Purchase',
      'Founded University of Virginia',
      'Champion of individual rights'
    ],
    timesPeriod: 'Founding Era'
  },

  {
    id: 'theodore-roosevelt',
    name: 'Theodore Roosevelt',
    description: 'Progressive President and conservation champion',
    rarity: 'epic',
    category: 'leader',
    subjects: ['apush'],
    stats: {
      leadership: 9,
      charisma: 10,
      perseverance: 10,
      influence: 8
    },
    specialAbility: {
      name: 'Square Deal',
      description: 'Gain 25% bonus on Progressive Era questions',
      effect: 'progressive_era_bonus'
    },
    biography: '26th President known for his progressive domestic policies and vigorous foreign policy.',
    famousQuote: 'Speak softly and carry a big stick.',
    birthYear: 1858,
    deathYear: 1919,
    nationality: 'American',
    achievements: [
      '26th President of USA',
      'Progressive Era leader',
      'Conservation pioneer',
      'Nobel Peace Prize winner',
      'Trustbuster'
    ],
    timesPeriod: 'Progressive Era'
  },

  {
    id: 'franklin-d-roosevelt',
    name: 'Franklin D. Roosevelt',
    description: 'New Deal President who led America through Great Depression and WWII',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush'],
    stats: {
      leadership: 10,
      charisma: 10,
      perseverance: 10,
      influence: 9
    },
    specialAbility: {
      name: 'New Deal',
      description: 'Gain 35% bonus on Great Depression and WWII questions',
      effect: 'new_deal_bonus'
    },
    biography: '32nd President who served four terms, leading America through the Great Depression and World War II.',
    famousQuote: 'The only thing we have to fear is fear itself.',
    birthYear: 1882,
    deathYear: 1945,
    nationality: 'American',
    achievements: [
      'Only 4-term President',
      'New Deal programs',
      'Led America through WWII',
      'Social Security creation',
      'Fireside Chats'
    ],
    timesPeriod: 'Great Depression & WWII'
  },

  {
    id: 'martin-luther-king-jr',
    name: 'Martin Luther King Jr.',
    description: 'Civil Rights leader and advocate for nonviolent resistance',
    rarity: 'legendary',
    category: 'activist',
    subjects: ['apush'],
    stats: {
      charisma: 10,
      influence: 10,
      perseverance: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'I Have a Dream',
      description: 'Gain 40% bonus on Civil Rights Movement questions',
      effect: 'civil_rights_bonus'
    },
    biography: 'Baptist minister and activist who became the most visible spokesperson for the civil rights movement.',
    famousQuote: 'I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin.',
    birthYear: 1929,
    deathYear: 1968,
    nationality: 'American',
    achievements: [
      'Led Civil Rights Movement',
      'Nobel Peace Prize winner',
      'March on Washington',
      'Montgomery Bus Boycott',
      'Champion of nonviolent resistance'
    ],
    timesPeriod: 'Civil Rights Era'
  },

  {
    id: 'ronald-reagan',
    name: 'Ronald Reagan',
    description: '40th President and conservative icon',
    rarity: 'epic',
    category: 'leader',
    subjects: ['apush'],
    stats: {
      charisma: 10,
      leadership: 8,
      influence: 9,
      perseverance: 7
    },
    specialAbility: {
      name: 'Reagan Revolution',
      description: 'Gain 25% bonus on 1980s conservative politics questions',
      effect: 'reagan_era_bonus'
    },
    biography: '40th President who promoted conservative economics and helped end the Cold War.',
    famousQuote: 'Mr. Gorbachev, tear down this wall!',
    birthYear: 1911,
    deathYear: 2004,
    nationality: 'American',
    achievements: [
      '40th President of USA',
      'Conservative revolution',
      'Helped end Cold War',
      'Economic recovery',
      'Former Hollywood actor'
    ],
    timesPeriod: '1980s'
  },

  // ========== AP GOVERNMENT - HOUSEHOLD NAMES ==========

  {
    id: 'john-marshall',
    name: 'John Marshall',
    description: 'Chief Justice who established judicial review',
    rarity: 'epic',
    category: 'leader',
    subjects: ['apgov'],
    stats: {
      intelligence: 9,
      influence: 9,
      leadership: 8,
      perseverance: 8
    },
    specialAbility: {
      name: 'Judicial Review',
      description: 'Gain 30% bonus on Supreme Court and constitutional law questions',
      effect: 'judicial_review_bonus'
    },
    biography: 'Fourth Chief Justice of the United States who established the principle of judicial review.',
    famousQuote: 'The Constitution is either a superior paramount law, unchangeable by ordinary means, or it is on a level with ordinary legislative acts.',
    birthYear: 1755,
    deathYear: 1835,
    nationality: 'American',
    achievements: [
      'Fourth Chief Justice',
      'Established judicial review',
      'Marbury v. Madison',
      'Strengthened federal government',
      'Constitutional law pioneer'
    ],
    timesPeriod: 'Early Republic'
  },

  {
    id: 'ruth-bader-ginsburg',
    name: 'Ruth Bader Ginsburg',
    description: 'Supreme Court Justice and women\'s rights pioneer',
    rarity: 'epic',
    category: 'activist',
    subjects: ['apgov'],
    stats: {
      intelligence: 10,
      perseverance: 10,
      influence: 9,
      leadership: 8
    },
    specialAbility: {
      name: 'Equal Protection',
      description: 'Gain 35% bonus on civil rights and gender equality questions',
      effect: 'equal_protection_bonus'
    },
    biography: 'Supreme Court Justice known for her work advancing gender equality and civil rights.',
    famousQuote: 'Fight for the things that you care about, but do it in a way that will lead others to join you.',
    birthYear: 1933,
    deathYear: 2020,
    nationality: 'American',
    achievements: [
      'Supreme Court Justice',
      'Gender equality pioneer',
      'Women\'s rights advocate',
      'Legal scholar',
      'Cultural icon'
    ],
    timesPeriod: 'Modern Era'
  },

  // ========== WORLD HISTORY - GLOBALLY FAMOUS ==========

  {
    id: 'confucius',
    name: 'Confucius',
    description: 'Chinese philosopher whose teachings shaped East Asian culture',
    rarity: 'legendary',
    category: 'philosopher',
    subjects: ['apworld'],
    stats: {
      intelligence: 10,
      influence: 10,
      perseverance: 9,
      charisma: 8
    },
    specialAbility: {
      name: 'Confucian Ethics',
      description: 'Gain 40% bonus on East Asian philosophy and government questions',
      effect: 'confucian_bonus'
    },
    biography: 'Chinese philosopher whose teachings on ethics, morality, and social relationships influenced East Asian thought for over 2000 years.',
    famousQuote: 'It does not matter how slowly you go as long as you do not stop.',
    birthYear: -551,
    deathYear: -479,
    nationality: 'Chinese',
    achievements: [
      'Founded Confucianism',
      'Shaped East Asian culture',
      'Ethical philosophy',
      'Educational reformer',
      'Political theorist'
    ],
    timesPeriod: 'Ancient China'
  },

  {
    id: 'napoleon-bonaparte',
    name: 'Napoleon Bonaparte',
    description: 'French Emperor who conquered most of Europe',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apworld'],
    stats: {
      leadership: 10,
      intelligence: 9,
      influence: 10,
      charisma: 9
    },
    specialAbility: {
      name: 'Napoleonic Code',
      description: 'Gain 35% bonus on European history and legal system questions',
      effect: 'napoleonic_bonus'
    },
    biography: 'French military leader and emperor who conquered much of continental Europe and influenced modern legal systems.',
    famousQuote: 'Impossible is a word to be found only in the dictionary of fools.',
    birthYear: 1769,
    deathYear: 1821,
    nationality: 'French',
    achievements: [
      'Emperor of France',
      'Conquered most of Europe',
      'Napoleonic Code',
      'Military genius',
      'Revolutionary leader'
    ],
    timesPeriod: 'Napoleonic Era'
  },

  {
    id: 'karl-marx',
    name: 'Karl Marx',
    description: 'German philosopher who developed communist theory',
    rarity: 'legendary',
    category: 'philosopher',
    subjects: ['apworld', 'apmacro'],
    stats: {
      intelligence: 10,
      influence: 10,
      innovation: 9,
      perseverance: 8
    },
    specialAbility: {
      name: 'Class Consciousness',
      description: 'Gain 40% bonus on economic systems and revolutionary movements',
      effect: 'marxist_bonus'
    },
    biography: 'German philosopher, economist, and revolutionary whose ideas about capitalism and communism shaped modern history.',
    famousQuote: 'Workers of the world, unite!',
    birthYear: 1818,
    deathYear: 1883,
    nationality: 'German',
    achievements: [
      'Co-authored Communist Manifesto',
      'Wrote Das Kapital',
      'Founded modern communism',
      'Economic theorist',
      'Revolutionary philosopher'
    ],
    timesPeriod: '19th Century'
  },

  {
    id: 'mahatma-gandhi',
    name: 'Mahatma Gandhi',
    description: 'Indian independence leader and champion of nonviolent resistance',
    rarity: 'legendary',
    category: 'activist',
    subjects: ['apworld'],
    stats: {
      charisma: 10,
      influence: 10,
      perseverance: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Satyagraha',
      description: 'Gain 40% bonus on independence movements and nonviolent resistance',
      effect: 'satyagraha_bonus'
    },
    biography: 'Indian lawyer and independence activist who led India to independence through nonviolent resistance.',
    famousQuote: 'Be the change you wish to see in the world.',
    birthYear: 1869,
    deathYear: 1948,
    nationality: 'Indian',
    achievements: [
      'Led Indian independence',
      'Pioneer of nonviolent resistance',
      'Civil rights leader',
      'Philosophy of truth',
      'Global icon of peace'
    ],
    timesPeriod: 'Modern Era'
  },

  {
    id: 'mao-zedong',
    name: 'Mao Zedong',
    description: 'Chinese Communist leader who founded People\'s Republic of China',
    rarity: 'epic',
    category: 'leader',
    subjects: ['apworld'],
    stats: {
      leadership: 9,
      influence: 9,
      perseverance: 10,
      charisma: 8
    },
    biography: 'Chinese Communist revolutionary who became the founding father of the People\'s Republic of China.',
    famousQuote: 'Political power grows out of the barrel of a gun.',
    birthYear: 1893,
    deathYear: 1976,
    nationality: 'Chinese',
    achievements: [
      'Founded People\'s Republic of China',
      'Led Chinese Communist Revolution',
      'Cultural Revolution',
      'Great Leap Forward',
      'Mao Zedong Thought'
    ],
    timesPeriod: '20th Century'
  },

  {
    id: 'nelson-mandela',
    name: 'Nelson Mandela',
    description: 'South African anti-apartheid leader and first Black president',
    rarity: 'legendary',
    category: 'activist',
    subjects: ['apworld'],
    stats: {
      leadership: 10,
      perseverance: 10,
      charisma: 10,
      influence: 9
    },
    specialAbility: {
      name: 'Reconciliation',
      description: 'Gain 35% bonus on civil rights and post-colonial Africa questions',
      effect: 'reconciliation_bonus'
    },
    biography: 'South African anti-apartheid revolutionary who became the country\'s first Black president.',
    famousQuote: 'Education is the most powerful weapon which you can use to change the world.',
    birthYear: 1918,
    deathYear: 2013,
    nationality: 'South African',
    achievements: [
      'Ended apartheid',
      'First Black president of South Africa',
      'Nobel Peace Prize winner',
      'Human rights icon',
      'Symbol of reconciliation'
    ],
    timesPeriod: 'Late 20th Century'
  },

  // ========== PSYCHOLOGY - THE BIG 6 ==========

  {
    id: 'sigmund-freud',
    name: 'Sigmund Freud',
    description: 'Father of psychoanalysis and the unconscious mind',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['appsych'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 8
    },
    specialAbility: {
      name: 'Psychoanalysis',
      description: 'Gain 40% bonus on personality and therapy questions',
      effect: 'psychoanalysis_bonus'
    },
    biography: 'Austrian neurologist who founded psychoanalysis and revolutionized understanding of the human mind.',
    famousQuote: 'The interpretation of dreams is the royal road to a knowledge of the unconscious.',
    birthYear: 1856,
    deathYear: 1939,
    nationality: 'Austrian',
    achievements: [
      'Founded psychoanalysis',
      'Theory of the unconscious',
      'Oedipus complex',
      'Dream interpretation',
      'Personality structure theory'
    ],
    timesPeriod: 'Early 20th Century'
  },

  {
    id: 'bf-skinner',
    name: 'B.F. Skinner',
    description: 'Behaviorist who developed operant conditioning',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['appsych'],
    stats: {
      intelligence: 9,
      innovation: 9,
      influence: 8,
      perseverance: 9
    },
    specialAbility: {
      name: 'Operant Conditioning',
      description: 'Gain 30% bonus on learning and behavior questions',
      effect: 'operant_conditioning_bonus'
    },
    biography: 'American psychologist who developed operant conditioning and was a leading proponent of behaviorism.',
    famousQuote: 'The real problem is not whether machines think but whether men do.',
    birthYear: 1904,
    deathYear: 1990,
    nationality: 'American',
    achievements: [
      'Developed operant conditioning',
      'Skinner box experiments',
      'Behaviorism theory',
      'Programmed learning',
      'Radical behaviorism'
    ],
    timesPeriod: '20th Century'
  },

  {
    id: 'jean-piaget',
    name: 'Jean Piaget',
    description: 'Swiss psychologist who studied child development',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['appsych'],
    stats: {
      intelligence: 9,
      innovation: 9,
      perseverance: 9,
      influence: 8
    },
    specialAbility: {
      name: 'Cognitive Development',
      description: 'Gain 30% bonus on developmental psychology questions',
      effect: 'cognitive_development_bonus'
    },
    biography: 'Swiss psychologist known for his work on child development and cognitive development theory.',
    famousQuote: 'The principle goal of education is to create men who are capable of doing new things.',
    birthYear: 1896,
    deathYear: 1980,
    nationality: 'Swiss',
    achievements: [
      'Cognitive development theory',
      'Four stages of development',
      'Child psychology pioneer',
      'Constructivism',
      'Educational psychology'
    ],
    timesPeriod: '20th Century'
  },

  {
    id: 'abraham-maslow',
    name: 'Abraham Maslow',
    description: 'Humanistic psychologist who created hierarchy of needs',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['appsych'],
    stats: {
      intelligence: 8,
      innovation: 9,
      influence: 9,
      charisma: 8
    },
    specialAbility: {
      name: 'Hierarchy of Needs',
      description: 'Gain 25% bonus on motivation and humanistic psychology questions',
      effect: 'hierarchy_needs_bonus'
    },
    biography: 'American psychologist who created Maslow\'s hierarchy of needs and founded humanistic psychology.',
    famousQuote: 'What a man can be, he must be.',
    birthYear: 1908,
    deathYear: 1970,
    nationality: 'American',
    achievements: [
      'Hierarchy of needs',
      'Self-actualization theory',
      'Humanistic psychology',
      'Peak experiences',
      'Motivation theory'
    ],
    timesPeriod: '20th Century'
  },

  {
    id: 'carl-rogers',
    name: 'Carl Rogers',
    description: 'Humanistic psychologist who developed client-centered therapy',
    rarity: 'uncommon',
    category: 'scientist',
    subjects: ['appsych'],
    stats: {
      intelligence: 8,
      charisma: 9,
      innovation: 8,
      influence: 7
    },
    biography: 'American psychologist who developed person-centered therapy and humanistic approach to psychology.',
    famousQuote: 'The curious paradox is that when I accept myself just as I am, then I can change.',
    birthYear: 1902,
    deathYear: 1987,
    nationality: 'American',
    achievements: [
      'Client-centered therapy',
      'Unconditional positive regard',
      'Humanistic psychology',
      'Person-centered approach',
      'Therapeutic relationship'
    ],
    timesPeriod: '20th Century'
  },

  // ========== ECONOMICS - THE GIANTS ==========

  {
    id: 'adam-smith',
    name: 'Adam Smith',
    description: 'Father of modern economics and free market capitalism',
    rarity: 'legendary',
    category: 'philosopher',
    subjects: ['apmicro', 'apmacro'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 8
    },
    specialAbility: {
      name: 'Invisible Hand',
      description: 'Gain 40% bonus on free market and capitalism questions',
      effect: 'invisible_hand_bonus'
    },
    biography: 'Scottish economist and philosopher who laid the foundations of classical free market economic theory.',
    famousQuote: 'It is not from the benevolence of the butcher, the brewer, or the baker that we expect our dinner, but from their regard to their own interest.',
    birthYear: 1723,
    deathYear: 1790,
    nationality: 'Scottish',
    achievements: [
      'Wrote "The Wealth of Nations"',
      'Father of modern economics',
      'Free market theory',
      'Division of labor',
      'Invisible hand concept'
    ],
    timesPeriod: '18th Century'
  },

  {
    id: 'john-maynard-keynes',
    name: 'John Maynard Keynes',
    description: 'British economist who revolutionized macroeconomic theory',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apmacro'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 9,
      perseverance: 8
    },
    specialAbility: {
      name: 'Keynesian Economics',
      description: 'Gain 35% bonus on government intervention and macroeconomics questions',
      effect: 'keynesian_bonus'
    },
    biography: 'British economist whose ideas fundamentally changed macroeconomics and government economic policy.',
    famousQuote: 'In the long run we are all dead.',
    birthYear: 1883,
    deathYear: 1946,
    nationality: 'British',
    achievements: [
      'Keynesian economics',
      'Government intervention theory',
      'Bretton Woods system',
      'Macroeconomic revolution',
      'The General Theory'
    ],
    timesPeriod: '20th Century'
  },

  {
    id: 'milton-friedman',
    name: 'Milton Friedman',
    description: 'Nobel Prize-winning economist and free market advocate',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apmacro', 'apmicro'],
    stats: {
      intelligence: 9,
      influence: 9,
      innovation: 8,
      charisma: 8
    },
    specialAbility: {
      name: 'Monetarism',
      description: 'Gain 25% bonus on monetary policy and free market questions',
      effect: 'monetarism_bonus'
    },
    biography: 'American economist who promoted free market capitalism and won the Nobel Prize in Economic Sciences.',
    famousQuote: 'Freedom to choose... that is the essence of human dignity.',
    birthYear: 1912,
    deathYear: 2006,
    nationality: 'American',
    achievements: [
      'Nobel Prize in Economics',
      'Monetarism theory',
      'Free market advocacy',
      'Chicago School economics',
      'Capitalism and Freedom'
    ],
    timesPeriod: 'Late 20th Century'
  },

  // ========== HUMAN GEOGRAPHY ==========

  {
    id: 'thomas-malthus',
    name: 'Thomas Malthus',
    description: 'Economist who studied population growth and resources',
    rarity: 'uncommon',
    category: 'scientist',
    subjects: ['aphug', 'apmacro'],
    stats: {
      intelligence: 8,
      innovation: 7,
      influence: 8,
      perseverance: 7
    },
    biography: 'English economist best known for his theory on population growth and its relationship to food supply.',
    famousQuote: 'Population, when unchecked, increases in a geometrical ratio.',
    birthYear: 1766,
    deathYear: 1834,
    nationality: 'English',
    achievements: [
      'Malthusian population theory',
      'Essay on Population',
      'Demographics pioneer',
      'Economic theorist',
      'Population-resource relationship'
    ],
    timesPeriod: '18th-19th Century'
  },

  {
    id: 'von-thunen',
    name: 'Johann Heinrich von Thünen',
    description: 'German economist who developed agricultural location theory',
    rarity: 'uncommon',
    category: 'scientist',
    subjects: ['aphug'],
    stats: {
      intelligence: 8,
      innovation: 8,
      influence: 6,
      perseverance: 7
    },
    biography: 'German economist who developed the first serious treatment of spatial economics and economic geography.',
    famousQuote: 'The farmer will choose the system of farming which gives him the highest profit.',
    birthYear: 1783,
    deathYear: 1850,
    nationality: 'German',
    achievements: [
      'Agricultural location theory',
      'Von Thünen model',
      'Spatial economics pioneer',
      'Economic geography',
      'Land use theory'
    ],
    timesPeriod: '19th Century'
  },

  // ========== STATISTICS ==========

  {
    id: 'florence-nightingale',
    name: 'Florence Nightingale',
    description: 'Nurse and statistician who pioneered medical data visualization',
    rarity: 'uncommon',
    category: 'scientist',
    subjects: ['apstats'],
    stats: {
      intelligence: 8,
      innovation: 9,
      perseverance: 10,
      influence: 8
    },
    biography: 'British nurse and social reformer who founded modern nursing and pioneered statistical graphics.',
    famousQuote: 'To understand God\'s thoughts, we must study statistics, for these are the measure of His purpose.',
    birthYear: 1820,
    deathYear: 1910,
    nationality: 'British',
    achievements: [
      'Founded modern nursing',
      'Statistical graphics pioneer',
      'Rose diagram invention',
      'Medical data visualization',
      'Public health reform'
    ],
    timesPeriod: '19th Century'
  },

  {
    id: 'carl-gauss',
    name: 'Carl Friedrich Gauss',
    description: 'German mathematician who contributed to statistics and probability',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apstats', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 9,
      perseverance: 9
    },
    specialAbility: {
      name: 'Normal Distribution',
      description: 'Gain 30% bonus on probability and distribution questions',
      effect: 'gaussian_bonus'
    },
    biography: 'German mathematician and physicist who made significant contributions to many fields including statistics.',
    famousQuote: 'Mathematics is the queen of sciences.',
    birthYear: 1777,
    deathYear: 1855,
    nationality: 'German',
    achievements: [
      'Gaussian distribution',
      'Method of least squares',
      'Number theory',
      'Magnetism research',
      'Mathematical genius'
    ],
    timesPeriod: '18th-19th Century'
  },

  // ========== PHYSICS ==========

  {
    id: 'albert-einstein',
    name: 'Albert Einstein',
    description: 'Theoretical physicist who developed theory of relativity',
    rarity: 'mythical',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 9
    },
    specialAbility: {
      name: 'Theory of Relativity',
      description: 'Automatically solve any relativity or modern physics problem',
      effect: 'relativity_mastery'
    },
    biography: 'German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics.',
    famousQuote: 'Imagination is more important than knowledge.',
    birthYear: 1879,
    deathYear: 1955,
    nationality: 'German-American',
    achievements: [
      'Theory of relativity',
      'E=mc²',
      'Nobel Prize in Physics',
      'Photoelectric effect',
      'Modern physics pioneer'
    ],
    timesPeriod: '20th Century'
  },

  {
    id: 'galileo-galilei',
    name: 'Galileo Galilei',
    description: 'Italian physicist and astronomer who championed heliocentrism',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      perseverance: 10,
      influence: 9
    },
    specialAbility: {
      name: 'Scientific Method',
      description: 'Gain 35% bonus on scientific reasoning and astronomy questions',
      effect: 'scientific_method_bonus'
    },
    biography: 'Italian astronomer, physicist, and engineer who played a major role in the scientific revolution.',
    famousQuote: 'And yet it moves.',
    birthYear: 1564,
    deathYear: 1642,
    nationality: 'Italian',
    achievements: [
      'Improved telescope',
      'Supported heliocentrism',
      'Laws of motion',
      'Astronomical observations',
      'Scientific method pioneer'
    ],
    timesPeriod: 'Scientific Revolution'
  },

  // ========== COMPUTER SCIENCE ==========

  {
    id: 'alan-turing',
    name: 'Alan Turing',
    description: 'British mathematician who laid foundations of computer science',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apcs'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 8
    },
    specialAbility: {
      name: 'Turing Test',
      description: 'Gain 40% bonus on artificial intelligence and computing questions',
      effect: 'turing_test_bonus'
    },
    biography: 'British mathematician, computer scientist, and codebreaker who is considered the father of computer science.',
    famousQuote: 'A computer would deserve to be called intelligent if it could deceive a human into believing that it was human.',
    birthYear: 1912,
    deathYear: 1954,
    nationality: 'British',
    achievements: [
      'Father of computer science',
      'Turing machine concept',
      'Broke Enigma code',
      'Artificial intelligence pioneer',
      'Turing Test'
    ],
    timesPeriod: '20th Century'
  },

  {
    id: 'ada-lovelace',
    name: 'Ada Lovelace',
    description: 'First computer programmer who wrote the first algorithm',
    rarity: 'epic',
    category: 'innovator',
    subjects: ['apcs'],
    stats: {
      intelligence: 9,
      innovation: 10,
      influence: 8,
      perseverance: 8
    },
    specialAbility: {
      name: 'First Algorithm',
      description: 'Gain 30% bonus on programming and algorithm questions',
      effect: 'algorithm_bonus'
    },
    biography: 'English mathematician and writer who is considered the first computer programmer.',
    famousQuote: 'The Analytical Engine might act upon other things besides number.',
    birthYear: 1815,
    deathYear: 1852,
    nationality: 'English',
    achievements: [
      'First computer programmer',
      'Wrote first algorithm',
      'Analytical Engine notes',
      'Computer potential visionary',
      'Programming pioneer'
    ],
    timesPeriod: '19th Century'
  },

  {
    id: 'steve-jobs',
    name: 'Steve Jobs',
    description: 'Apple co-founder who revolutionized personal computing',
    rarity: 'epic',
    category: 'innovator',
    subjects: ['apcs'],
    stats: {
      innovation: 10,
      charisma: 10,
      influence: 9,
      leadership: 9
    },
    specialAbility: {
      name: 'Design Revolution',
      description: 'Gain 25% bonus on user interface and technology design questions',
      effect: 'design_revolution_bonus'
    },
    biography: 'American entrepreneur and inventor who co-founded Apple and revolutionized personal computing and mobile technology.',
    famousQuote: 'Innovation distinguishes between a leader and a follower.',
    birthYear: 1955,
    deathYear: 2011,
    nationality: 'American',
    achievements: [
      'Co-founded Apple',
      'Personal computer revolution',
      'iPhone and iPad creation',
      'User interface pioneer',
      'Technology design icon'
    ],
    timesPeriod: 'Late 20th/Early 21st Century'
  },

  // ========== BIOLOGY ==========

  {
    id: 'charles-darwin',
    name: 'Charles Darwin',
    description: 'Naturalist who developed the theory of evolution',
    rarity: 'mythical',
    category: 'scientist',
    subjects: ['apbio'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 10
    },
    specialAbility: {
      name: 'Natural Selection',
      description: 'Gain 50% bonus on evolution and biology questions',
      effect: 'natural_selection_mastery'
    },
    biography: 'English naturalist whose scientific theory of evolution by natural selection became the foundation of modern evolutionary studies.',
    famousQuote: 'It is not the strongest of the species that survives, but the most adaptable to change.',
    birthYear: 1809,
    deathYear: 1882,
    nationality: 'English',
    achievements: [
      'Theory of evolution',
      'Natural selection',
      'Origin of Species',
      'Voyage of the Beagle',
      'Modern biology foundation'
    ],
    timesPeriod: '19th Century'
  },

  // ========== PIRATE VERSIONS 🏴‍☠️ ==========

  {
    id: 'pirate-george-washington',
    name: 'Captain George Washington',
    description: 'Pirate leader of the Colonial Fleet who sailed against the British Navy',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    theme: 'pirate',
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 9,
      charisma: 10
    },
    specialAbility: {
      name: 'Revolutionary Fleet',
      description: 'Gain 35% bonus on early American naval history',
      effect: 'pirate_revolution_bonus'
    },
    biography: 'The legendary pirate captain who united the colonial ships against the British Navy, wielding both sword and constitution.',
    famousQuote: 'Yo ho ho, and a bottle of liberty!',
    birthYear: 1732,
    deathYear: 1799,
    nationality: 'American',
    achievements: [
      'Captain of the Revolutionary Fleet',
      'Defeated British Navy',
      'Pirate Code of Democracy',
      'First Admiral-President',
      'Treasure of Independence'
    ],
    timesPeriod: 'Age of Piracy & Revolution'
  },

  {
    id: 'pirate-marie-curie',
    name: 'Captain Marie "Radium" Curie',
    description: 'Pirate scientist who plundered the secrets of radioactivity',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apchem', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 9,
      perseverance: 10,
      charisma: 8
    },
    specialAbility: {
      name: 'Glowing Treasure',
      description: 'Gain 30% bonus on chemistry and radioactivity questions',
      effect: 'radium_pirate_bonus'
    },
    biography: 'The fearsome pirate chemist who sailed the seven seas in search of glowing elements, her ship powered by pure radium.',
    famousQuote: 'Arrr, science be the greatest treasure of all!',
    birthYear: 1867,
    deathYear: 1934,
    nationality: 'Polish-French',
    achievements: [
      'Discovered radioactive islands',
      'First female pirate scientist',
      'Radium treasure hoard',
      'Nobel Prize dubloons',
      'Glowing ship experiments'
    ],
    timesPeriod: 'Age of Scientific Piracy'
  },

  {
    id: 'pirate-abraham-lincoln',
    name: 'Captain Abraham "The Liberator"',
    description: 'Pirate captain who freed enslaved crews and unified the rebel fleets',
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
      name: 'Fleet Liberation',
      description: 'Free enslaved crews and gain 40% bonus on civil war naval battles',
      effect: 'pirate_liberation_bonus'
    },
    biography: 'The noble pirate captain who united the scattered rebel fleets and freed all enslaved sailors from tyrannical ships.',
    famousQuote: 'A fleet divided against itself cannot sail!',
    birthYear: 1809,
    deathYear: 1865,
    nationality: 'American',
    achievements: [
      'United the Rebel Fleets',
      'Freed Enslaved Crews',
      'Preserved the Colonial Navy',
      'Captain of Liberation',
      'Maritime Emancipation'
    ],
    timesPeriod: 'Age of Naval Liberation'
  },

  {
    id: 'pirate-albert-einstein',
    name: 'Captain Einstein the Timekeeper',
    description: 'Pirate physicist who navigated through time and space with relativity',
    rarity: 'mythical',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      charisma: 9
    },
    specialAbility: {
      name: 'Temporal Navigation',
      description: 'Bend spacetime to sail anywhere in the universe',
      effect: 'pirate_relativity_mastery'
    },
    biography: 'The legendary pirate physicist whose ship could sail through time itself, using E=mc² as his navigation formula.',
    famousQuote: 'Arrr, time be just another ocean to sail!',
    birthYear: 1879,
    deathYear: 1955,
    nationality: 'German-American',
    achievements: [
      'Master of Time Navigation',
      'Relativistic Sailing',
      'Spacetime Piracy',
      'Nobel Treasure Hunter',
      'Cosmic Sea Explorer'
    ],
    timesPeriod: 'Age of Quantum Piracy'
  },

  {
    id: 'pirate-isaac-newton',
    name: 'Sir Isaac "Cannonball" Newton',
    description: 'Pirate mathematician who calculated perfect cannon trajectories',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Perfect Trajectory',
      description: 'Calculate exact cannon paths and naval motion',
      effect: 'pirate_ballistics_mastery'
    },
    biography: 'The brilliant pirate mathematician whose three laws of motion made him the deadliest gunner on the seven seas.',
    famousQuote: 'For every cannonball fired, there be an equal and opposite recoil, matey!',
    birthYear: 1643,
    deathYear: 1727,
    nationality: 'English',
    achievements: [
      'Master of Naval Artillery',
      'Three Laws of Ship Motion',
      'Gravitational Anchor Theory',
      'Calculus Navigation',
      'Apple of the Sea Discovery'
    ],
    timesPeriod: 'Age of Mathematical Piracy'
  },

  {
    id: 'pirate-leonardo-da-vinci',
    name: 'Captain Leonardo "The Inventor"',
    description: 'Renaissance pirate who designed the most advanced ships ever seen',
    rarity: 'mythical',
    category: 'artist',
    subjects: ['aphug', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      charisma: 10
    },
    specialAbility: {
      name: 'Ship Innovation',
      description: 'Design impossible vessels that defy naval engineering',
      effect: 'pirate_invention_mastery'
    },
    biography: 'The ultimate Renaissance pirate whose ship designs combined art, science, and impossible engineering.',
    famousQuote: 'The sea be but a canvas for my floating masterpieces!',
    birthYear: 1452,
    deathYear: 1519,
    nationality: 'Italian',
    achievements: [
      'Revolutionary Ship Designer',
      'Flying Pirate Machines',
      'Artistic Naval Architecture',
      'Multi-Talented Captain',
      'Renaissance Sea Master'
    ],
    timesPeriod: 'Renaissance Age of Piracy'
  },

  {
    id: 'pirate-martin-luther-king',
    name: 'Captain Martin "Freedom" King',
    description: 'Pirate leader who fought for equality across all crews and ships',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      charisma: 10,
      influence: 10,
      perseverance: 10
    },
    specialAbility: {
      name: 'Crew Equality',
      description: 'Unite all pirates regardless of background',
      effect: 'pirate_equality_bonus'
    },
    biography: 'The inspiring pirate leader who dreamed of seas where all sailors would be judged by their seamanship, not their origins.',
    famousQuote: 'I have a dream of brotherhood on every ship!',
    birthYear: 1929,
    deathYear: 1968,
    nationality: 'American',
    achievements: [
      'Champion of Maritime Equality',
      'Peaceful Pirate Revolution',
      'Crew Rights Defender',
      'Brotherhood of the Seas',
      'Justice Navigator'
    ],
    timesPeriod: 'Age of Maritime Justice'
  },

  {
    id: 'pirate-benjamin-franklin',
    name: 'Captain Ben "Lightning" Franklin',
    description: 'Pirate diplomat who tamed lightning and negotiated with sea gods',
    rarity: 'epic',
    category: 'innovator',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 9,
      charisma: 10,
      innovation: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Storm Mastery',
      description: 'Control lightning and negotiate safe passage',
      effect: 'pirate_storm_bonus'
    },
    biography: 'The clever pirate diplomat who could catch lightning in bottles and negotiate peace treaties with sea monsters.',
    famousQuote: 'A pirate who invests in good weather pays the best dividends!',
    birthYear: 1706,
    deathYear: 1790,
    nationality: 'American',
    achievements: [
      'Master of Storm Navigation',
      'Lightning Bottle Inventor',
      'Diplomatic Pirate Relations',
      'Weather Control Pioneer',
      'Sea Monster Negotiator'
    ],
    timesPeriod: 'Age of Diplomatic Piracy'
  },

  // ========== WIZARD VERSIONS 🧙 ==========

  {
    id: 'wizard-einstein',
    name: 'Archmage Albert Einstein',
    description: 'Master wizard who bent space and time with ancient relativity spells',
    rarity: 'mythical',
    category: 'scientist',
    subjects: ['apphysics'],
    theme: 'wizard',
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 9
    },
    specialAbility: {
      name: 'Relativity Magic',
      description: 'Warp spacetime to automatically solve any physics problem',
      effect: 'wizard_relativity_mastery'
    },
    biography: 'The greatest archmage who unlocked the mystical secrets of spacetime, wielding E=mc² as his most powerful spell.',
    famousQuote: 'Magic is just science we do not yet understand.',
    birthYear: 1879,
    deathYear: 1955,
    nationality: 'German-American',
    achievements: [
      'Master of Relativity Magic',
      'Spacetime Manipulation',
      'Nobel Grimoire of Physics',
      'Photoelectric Enchantments',
      'Grand Wizard of Modern Physics'
    ],
    timesPeriod: 'Age of Scientific Wizardry'
  },

  {
    id: 'wizard-newton',
    name: 'Spellmaster Isaac Newton',
    description: 'Wizard who discovered the three laws of magical motion',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 9
    },
    specialAbility: {
      name: 'Laws of Magic',
      description: 'Cast gravitational spells and motion enchantments',
      effect: 'newton_magic_mastery'
    },
    biography: 'The legendary spellmaster who bound gravity itself to his will and wrote the fundamental laws of magical motion.',
    famousQuote: 'If I have seen further, it is by standing on the shoulders of giant wizards.',
    birthYear: 1643,
    deathYear: 1727,
    nationality: 'English',
    achievements: [
      'Three Laws of Magical Motion',
      'Gravitational Spell Mastery',
      'Calculus Incantations',
      'Principia Magica',
      'Apple of Enlightenment'
    ],
    timesPeriod: 'Age of Scientific Magic'
  },

  {
    id: 'wizard-george-washington',
    name: 'Archmage Washington the First',
    description: 'Grand wizard who founded the Democratic Order of Mages',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 9,
      charisma: 10
    },
    specialAbility: {
      name: 'Constitutional Magic',
      description: 'Cast democracy spells and gain 35% leadership magic bonus',
      effect: 'wizard_democracy_mastery'
    },
    biography: 'The founding archmage who established the first democratic magical order, wielding both wand and constitution.',
    famousQuote: 'With great magical power comes great constitutional responsibility.',
    birthYear: 1732,
    deathYear: 1799,
    nationality: 'American',
    achievements: [
      'Founded Democratic Magic Order',
      'First Grand Wizard President',
      'Constitutional Spellcasting',
      'Revolutionary Magic Leader',
      'Liberty Enchantments'
    ],
    timesPeriod: 'Age of Democratic Magic'
  },

  {
    id: 'wizard-abraham-lincoln',
    name: 'Abraham the Uniter, Master Wizard',
    description: 'Powerful wizard who preserved the magical union during the Great Schism',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 10,
      intelligence: 9
    },
    specialAbility: {
      name: 'Unity Spells',
      description: 'Bind divided magical factions together',
      effect: 'wizard_unity_mastery'
    },
    biography: 'The noble wizard who kept the magical realm united during its darkest hour and freed all enslaved magical creatures.',
    famousQuote: 'A magical realm divided against itself cannot cast.',
    birthYear: 1809,
    deathYear: 1865,
    nationality: 'American',
    achievements: [
      'Preserved Magical Union',
      'Freed Enslaved Magical Beings',
      'Master of Unity Spells',
      'Wizard of Emancipation',
      'Magical Civil War Hero'
    ],
    timesPeriod: 'Age of Magical Unity'
  },

  {
    id: 'wizard-marie-curie',
    name: 'Enchantress Marie the Radiant',
    description: 'Alchemist wizard who discovered the glowing elements of power',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apchem', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 9,
      perseverance: 10,
      charisma: 8
    },
    specialAbility: {
      name: 'Radiant Alchemy',
      description: 'Transmute base metals into magical elements',
      effect: 'wizard_alchemy_mastery'
    },
    biography: 'The pioneering magical alchemist who discovered the mystical properties of radioactive elements and glowing spells.',
    famousQuote: 'Magic glows brightest in those who seek the unknown.',
    birthYear: 1867,
    deathYear: 1934,
    nationality: 'Polish-French',
    achievements: [
      'Discovered Magical Radioactivity',
      'First Female Master Alchemist',
      'Glowing Element Spells',
      'Nobel Grimoire Author',
      'Radiant Enchantment Pioneer'
    ],
    timesPeriod: 'Age of Radiant Alchemy'
  },

  {
    id: 'wizard-leonardo-da-vinci',
    name: 'Leonardo the Omnimage',
    description: 'Renaissance wizard who mastered all schools of magic',
    rarity: 'mythical',
    category: 'artist',
    subjects: ['aphug', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      charisma: 10
    },
    specialAbility: {
      name: 'Omnischool Mastery',
      description: 'Cast spells from any magical discipline',
      effect: 'wizard_omnimage_mastery'
    },
    biography: 'The ultimate Renaissance wizard who combined art, science, engineering, and magic into impossible creations.',
    famousQuote: 'Magic is the art where science and imagination unite.',
    birthYear: 1452,
    deathYear: 1519,
    nationality: 'Italian',
    achievements: [
      'Master of All Magic Schools',
      'Flying Spell Inventor',
      'Magical Art Integration',
      'Omnidisciplinary Wizard',
      'Renaissance Magic Pioneer'
    ],
    timesPeriod: 'Renaissance Age of Magic'
  },

  {
    id: 'wizard-martin-luther-king',
    name: 'Saint Martin the Just, Divine Wizard',
    description: 'Holy wizard who championed magical equality across all magical races',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      charisma: 10,
      influence: 10,
      perseverance: 10
    },
    specialAbility: {
      name: 'Divine Justice Magic',
      description: 'Inspire equality and peace among all magical beings',
      effect: 'wizard_justice_mastery'
    },
    biography: 'The divine wizard whose spells of justice and equality echoed across all magical realms, inspiring peaceful revolution.',
    famousQuote: 'I have a dream where all magical beings are judged by their spells, not their species.',
    birthYear: 1929,
    deathYear: 1968,
    nationality: 'American',
    achievements: [
      'Champion of Magical Equality',
      'Peaceful Magic Revolution',
      'Inter-Species Unity Spells',
      'Divine Justice Caster',
      'Holy Rights Defender'
    ],
    timesPeriod: 'Age of Magical Justice'
  },

  {
    id: 'wizard-benjamin-franklin',
    name: 'Franklin the Lightning Mage',
    description: 'Weather wizard who mastered storm magic and diplomatic enchantments',
    rarity: 'epic',
    category: 'innovator',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 9,
      charisma: 10,
      innovation: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Storm Diplomacy',
      description: 'Control weather and negotiate with magical entities',
      effect: 'wizard_storm_mastery'
    },
    biography: 'The wise weather mage who could bottle lightning and negotiate treaties between warring magical kingdoms.',
    famousQuote: 'An investment in magical knowledge pays the best enchanted interest.',
    birthYear: 1706,
    deathYear: 1790,
    nationality: 'American',
    achievements: [
      'Master of Lightning Magic',
      'Magical Kingdom Diplomat',
      'Weather Control Spells',
      'Storm Bottle Inventor',
      'Diplomatic Enchantment Pioneer'
    ],
    timesPeriod: 'Age of Storm Magic'
  },

  // ========== SUPERHERO VERSIONS 🦸 ==========

  {
    id: 'superhero-washington',
    name: 'Captain Constitution',
    description: 'Superhero defender of democracy with the power of founding fathers',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    theme: 'superhero',
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 10,
      charisma: 10
    },
    specialAbility: {
      name: 'Constitutional Shield',
      description: 'Defend democracy and gain 40% bonus on constitutional questions',
      effect: 'constitution_hero_bonus'
    },
    biography: 'The first superhero president who wields the power of the Constitution to protect liberty and justice for all.',
    famousQuote: 'With great power comes great constitutional responsibility.',
    birthYear: 1732,
    deathYear: 1799,
    nationality: 'American',
    achievements: [
      'First Super-President',
      'Constitution Guardian',
      'Liberty Shield Master',
      'Democracy Defender',
      'Founding Powers'
    ],
    timesPeriod: 'Heroic Age of Democracy'
  },

  {
    id: 'superhero-einstein',
    name: 'Quantum Man',
    description: 'Physics superhero who can manipulate matter and energy',
    rarity: 'mythical',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 9
    },
    specialAbility: {
      name: 'Quantum Powers',
      description: 'Control matter and energy to solve any physics challenge',
      effect: 'quantum_hero_mastery'
    },
    biography: 'The ultimate physics superhero who gained his powers from a relativity experiment gone right.',
    famousQuote: 'With great mass comes great energy.',
    birthYear: 1879,
    deathYear: 1955,
    nationality: 'German-American',
    achievements: [
      'Master of Quantum Powers',
      'Relativity Manipulation',
      'Energy-Matter Conversion',
      'Nobel Hero Award',
      'Physics Justice League'
    ],
    timesPeriod: 'Quantum Hero Era'
  },

  {
    id: 'superhero-abraham-lincoln',
    name: 'Liberty Man',
    description: 'Superhero president who preserved the nation with the power of unity',
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
      name: 'Unity Shield',
      description: 'Bind divided forces together and prevent civil discord',
      effect: 'superhero_unity_power'
    },
    biography: 'The heroic president whose power of unity kept the nation together during its greatest trial.',
    famousQuote: 'With great presidential power comes great constitutional responsibility.',
    birthYear: 1809,
    deathYear: 1865,
    nationality: 'American',
    achievements: [
      'Preserved United States',
      'Freed the Enslaved',
      'Unity Power Master',
      'Civil War Hero',
      'Emancipation Warrior'
    ],
    timesPeriod: 'Heroic Civil War Era'
  },

  {
    id: 'superhero-marie-curie',
    name: 'Radium Woman',
    description: 'Superhero scientist who gained powers from radioactive experiments',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apchem', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 9,
      perseverance: 10,
      charisma: 8
    },
    specialAbility: {
      name: 'Radioactive Powers',
      description: 'Emit healing radiation and generate clean energy',
      effect: 'superhero_radiation_mastery'
    },
    biography: 'The brilliant superhero who gained radioactive powers through her groundbreaking research and uses them to heal and empower.',
    famousQuote: 'With great radioactivity comes great scientific responsibility.',
    birthYear: 1867,
    deathYear: 1934,
    nationality: 'Polish-French',
    achievements: [
      'First Female Superhero Scientist',
      'Radioactive Healing Powers',
      'Clean Energy Generation',
      'Nobel Hero Awards',
      'Science Justice League'
    ],
    timesPeriod: 'Radioactive Hero Era'
  },

  {
    id: 'superhero-isaac-newton',
    name: 'Gravity Man',
    description: 'Physics superhero who controls gravitational forces and motion',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Gravitational Control',
      description: 'Manipulate gravity, velocity, and acceleration at will',
      effect: 'superhero_gravity_mastery'
    },
    biography: 'The legendary physics hero whose three laws of motion became his superpowers, allowing him to control all physical forces.',
    famousQuote: 'For every heroic action, there is an equal and opposite heroic reaction.',
    birthYear: 1643,
    deathYear: 1727,
    nationality: 'English',
    achievements: [
      'Master of Gravitational Powers',
      'Three Laws of Heroic Motion',
      'Universal Physics Control',
      'Calculus Combat Techniques',
      'Apple of Power Discovery'
    ],
    timesPeriod: 'Physics Hero Era'
  },

  {
    id: 'superhero-leonardo-da-vinci',
    name: 'Renaissance Man',
    description: 'Multitalented superhero who combines art, science, and engineering powers',
    rarity: 'mythical',
    category: 'artist',
    subjects: ['aphug', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      charisma: 10
    },
    specialAbility: {
      name: 'Renaissance Powers',
      description: 'Access unlimited creativity and engineering abilities',
      effect: 'superhero_renaissance_mastery'
    },
    biography: 'The ultimate Renaissance superhero whose powers span art, science, engineering, and human understanding.',
    famousQuote: 'With great talent comes great responsibility to humanity.',
    birthYear: 1452,
    deathYear: 1519,
    nationality: 'Italian',
    achievements: [
      'Master of All Disciplines',
      'Flying Machine Creator',
      'Artistic Engineering Fusion',
      'Multi-Talent Hero',
      'Renaissance Power Source'
    ],
    timesPeriod: 'Renaissance Hero Era'
  },

  {
    id: 'superhero-martin-luther-king',
    name: 'Justice Beacon',
    description: 'Superhero civil rights leader who inspires peace and equality',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      charisma: 10,
      influence: 10,
      perseverance: 10
    },
    specialAbility: {
      name: 'Inspiration Beam',
      description: 'Inspire peace, equality, and justice in all hearts',
      effect: 'superhero_justice_mastery'
    },
    biography: 'The heroic civil rights leader whose power of inspiration can turn enemies into allies and hatred into love.',
    famousQuote: 'I have a dream that great power will always serve great justice.',
    birthYear: 1929,
    deathYear: 1968,
    nationality: 'American',
    achievements: [
      'Champion of Equal Justice',
      'Peaceful Revolution Leader',
      'Inspiration Power Master',
      'Civil Rights Hero',
      'Dream Manifestation Ability'
    ],
    timesPeriod: 'Civil Rights Hero Era'
  },

  {
    id: 'superhero-benjamin-franklin',
    name: 'Lightning Sage',
    description: 'Superhero inventor who harnesses electricity and diplomatic powers',
    rarity: 'epic',
    category: 'innovator',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 9,
      charisma: 10,
      innovation: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Electric Diplomacy',
      description: 'Control lightning and negotiate any conflict peacefully',
      effect: 'superhero_lightning_mastery'
    },
    biography: 'The wise superhero whose lightning powers are matched only by his ability to bring enemies together through diplomacy.',
    famousQuote: 'An investment in heroic deeds pays the best karmic interest.',
    birthYear: 1706,
    deathYear: 1790,
    nationality: 'American',
    achievements: [
      'Master of Lightning Powers',
      'Diplomatic Superhero',
      'Invention Power Source',
      'Storm Control Hero',
      'Peace Negotiation Expert'
    ],
    timesPeriod: 'Electric Diplomacy Era'
  },

  // ========== SLEEP-DEPRIVED STUDENT VERSIONS ☕ ==========

  {
    id: 'student-einstein',
    name: 'All-Nighter Einstein',
    description: 'Physics genius powered entirely by caffeine and determination',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 8,
      perseverance: 10,
      charisma: 6
    },
    specialAbility: {
      name: 'Caffeine Clarity',
      description: 'Coffee-powered brain boosts solve complex physics problems',
      effect: 'caffeine_physics_bonus'
    },
    biography: 'The relativity genius during his all-night study sessions, surviving on espresso and sheer determination.',
    famousQuote: 'E = mc²... or was it mc³? Need more coffee.',
    birthYear: 1879,
    deathYear: 1955,
    nationality: 'German-American',
    achievements: [
      'PhD in Caffeine Physics',
      '48-hour study marathons',
      'Energy drink relativity',
      'Coffee-stained equations',
      'Graduated (barely awake)'
    ],
    timesPeriod: 'Finals Week Era'
  },

  {
    id: 'student-curie',
    name: 'Caffeine-Powered Curie',
    description: 'Chemistry student who discovered radioactivity during finals week',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apchem'],
    stats: {
      intelligence: 9,
      innovation: 10,
      perseverance: 10,
      charisma: 7
    },
    specialAbility: {
      name: 'Lab All-Nighter',
      description: 'Sleep-deprived experiments yield breakthrough discoveries',
      effect: 'student_chemistry_bonus'
    },
    biography: 'The legendary chemistry student who made radioactive discoveries while pulling consecutive all-nighters.',
    famousQuote: 'If I can survive organic chemistry, I can survive anything.',
    birthYear: 1867,
    deathYear: 1934,
    nationality: 'Polish-French',
    achievements: [
      'Survived chemistry degree',
      'Coffee-fueled discoveries',
      'Lab notebook hieroglyphs',
      'Radioactive study sessions',
      'First to graduate glowing'
    ],
    timesPeriod: 'College Survival Era'
  },

  {
    id: 'student-george-washington',
    name: 'George "All-Nighter" Washington',
    description: 'History major who survived the Revolutionary War essay with energy drinks',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 9,
      charisma: 10
    },
    specialAbility: {
      name: 'Deadline Crossing',
      description: 'Submit assignments at the last second and still get A+',
      effect: 'student_deadline_bonus'
    },
    biography: 'The legendary history student who wrote his Revolutionary War thesis in one night and founded student government.',
    famousQuote: 'I cannot tell a lie - this paper was definitely written the night before.',
    birthYear: 1732,
    deathYear: 1799,
    nationality: 'American',
    achievements: [
      'Founded Student Government',
      'Revolutionary War Paper',
      'Student Leader Excellence',
      'Constitutional Essay Master',
      'Presidential Scholarship Winner'
    ],
    timesPeriod: 'College Founding Era'
  },

  {
    id: 'student-abraham-lincoln',
    name: 'Abe "Study Group" Lincoln',
    description: 'Law student who united divided study groups during finals week',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 10,
      intelligence: 9
    },
    specialAbility: {
      name: 'Group Project Unity',
      description: 'Unite any divided study group and complete group projects',
      effect: 'student_teamwork_bonus'
    },
    biography: 'The noble law student who kept study groups together during the most stressful finals and helped everyone pass.',
    famousQuote: 'A study group divided against itself cannot graduate.',
    birthYear: 1809,
    deathYear: 1865,
    nationality: 'American',
    achievements: [
      'United Rival Study Groups',
      'Law School Group Leader',
      'Finals Week Survivor',
      'Team Project Champion',
      'Academic Emancipation'
    ],
    timesPeriod: 'College Unity Era'
  },

  {
    id: 'student-isaac-newton',
    name: 'Isaac "Cramming" Newton',
    description: 'Physics student who discovered the laws of motion while procrastinating',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Procrastination Breakthrough',
      description: 'Make revolutionary discoveries while avoiding homework',
      effect: 'student_physics_genius'
    },
    biography: 'The brilliant physics student whose greatest discoveries happened when he should have been studying for other classes.',
    famousQuote: 'For every assignment I avoid, there is an equal and opposite genius moment.',
    birthYear: 1643,
    deathYear: 1727,
    nationality: 'English',
    achievements: [
      'Three Laws During Finals',
      'Gravity Discovery Under Study Tree',
      'Calculus Invented for Extra Credit',
      'Apple Snack Breakthrough',
      'Physics Legend Status'
    ],
    timesPeriod: 'College Genius Era'
  },

  {
    id: 'student-leonardo-da-vinci',
    name: 'Leo "Multi-Major" da Vinci',
    description: 'Art student who somehow double-majored in everything',
    rarity: 'mythical',
    category: 'artist',
    subjects: ['aphug', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      charisma: 10
    },
    specialAbility: {
      name: 'Academic Omnipotence',
      description: 'Excel in any subject regardless of preparation',
      effect: 'student_renaissance_mastery'
    },
    biography: 'The ultimate college student who majored in art, engineering, anatomy, and philosophy simultaneously while maintaining a 4.0 GPA.',
    famousQuote: 'Why choose one major when you can have them all?',
    birthYear: 1452,
    deathYear: 1519,
    nationality: 'Italian',
    achievements: [
      'Quintuple Major Graduate',
      'Perfect GPA in Everything',
      'Invented Study Techniques',
      'Renaissance Scholar Supreme',
      'Academic Legend'
    ],
    timesPeriod: 'Renaissance College Era'
  },

  {
    id: 'student-martin-luther-king',
    name: 'Martin "Campus Activist" King',
    description: 'Sociology student who led peaceful protests for better cafeteria food',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      charisma: 10,
      influence: 10,
      perseverance: 10
    },
    specialAbility: {
      name: 'Peaceful Protest Power',
      description: 'Unite students for any cause through inspiring speeches',
      effect: 'student_activism_bonus'
    },
    biography: 'The inspiring student activist who fought for equality on campus and better living conditions for all students.',
    famousQuote: 'I have a dream that all students will be judged by their character, not their meal plan.',
    birthYear: 1929,
    deathYear: 1968,
    nationality: 'American',
    achievements: [
      'Campus Civil Rights Leader',
      'Peaceful Protest Organizer',
      'Student Equality Champion',
      'Dining Hall Revolutionary',
      'Dream Speech Graduate'
    ],
    timesPeriod: 'College Activism Era'
  },

  {
    id: 'student-benjamin-franklin',
    name: 'Ben "Campus Life" Franklin',
    description: 'Student who invented campus clubs and optimized college social life',
    rarity: 'epic',
    category: 'innovator',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 9,
      charisma: 10,
      innovation: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Social Optimization',
      description: 'Create perfect campus networks and study groups',
      effect: 'student_networking_bonus'
    },
    biography: 'The clever student who founded the first campus clubs, organized study groups, and created the perfect college social system.',
    famousQuote: 'Early to bed, early to rise, makes a student healthy, wealthy, and wise.',
    birthYear: 1706,
    deathYear: 1790,
    nationality: 'American',
    achievements: [
      'Founded Campus Clubs',
      'Social Network Pioneer',
      'Study Group Optimizer',
      'Campus Life Innovator',
      'College Wisdom Master'
    ],
    timesPeriod: 'College Innovation Era'
  },

  // ========== BUSINESS/CORPORATE VERSIONS 💼 ==========

  {
    id: 'business-george-washington',
    name: 'CEO George Washington',
    description: 'Corporate executive who founded the most successful democracy startup',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 9,
      charisma: 10
    },
    specialAbility: {
      name: 'Strategic Leadership',
      description: 'Gain 35% bonus on leadership and management questions',
      effect: 'business_leadership_bonus'
    },
    biography: 'The legendary CEO who turned a colonial startup into the world\'s most successful democratic corporation.',
    famousQuote: 'Success in business requires training, discipline, and hard work.',
    birthYear: 1732,
    deathYear: 1799,
    nationality: 'American',
    achievements: [
      'Founder & First CEO',
      'Revolutionary Business Model',
      'Constitutional Framework Development',
      'Strategic Partnership Master',
      'Market Leadership Pioneer'
    ],
    timesPeriod: 'Corporate Revolutionary Era'
  },

  {
    id: 'business-abraham-lincoln',
    name: 'Abraham Lincoln, COO',
    description: 'Chief Operating Officer who unified company divisions during the merger crisis',
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
      name: 'Crisis Management',
      description: 'Gain 40% bonus during corporate restructuring challenges',
      effect: 'business_crisis_bonus'
    },
    biography: 'The brilliant COO who kept the company together during its greatest internal crisis and hostile takeover attempt.',
    famousQuote: 'A house divided against itself cannot stand - neither can a corporation.',
    birthYear: 1809,
    deathYear: 1865,
    nationality: 'American',
    achievements: [
      'Unified Corporate Divisions',
      'Crisis Management Expert',
      'Employee Rights Pioneer',
      'Stakeholder Relations Master',
      'Company Preservation Hero'
    ],
    timesPeriod: 'Corporate Civil War Era'
  },

  {
    id: 'business-albert-einstein',
    name: 'Dr. Einstein, Chief Innovation Officer',
    description: 'CTO who revolutionized the tech industry with relativity algorithms',
    rarity: 'mythical',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 9
    },
    specialAbility: {
      name: 'Innovation Breakthrough',
      description: 'Automatically solve any physics or innovation challenge',
      effect: 'business_innovation_mastery'
    },
    biography: 'The legendary Chief Innovation Officer who revolutionized corporate R&D with his groundbreaking relativity-based algorithms.',
    famousQuote: 'Innovation distinguishes between a leader and a follower.',
    birthYear: 1879,
    deathYear: 1955,
    nationality: 'German-American',
    achievements: [
      'Revolutionized Corporate R&D',
      'Patent Portfolio Genius',
      'Innovation Strategy Pioneer',
      'Nobel Tech Award Winner',
      'Quantum Computing Architect'
    ],
    timesPeriod: 'Corporate Innovation Era'
  },

  {
    id: 'business-isaac-newton',
    name: 'Sir Isaac Newton, CFO',
    description: 'Chief Financial Officer who created the fundamental laws of market motion',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      perseverance: 9
    },
    specialAbility: {
      name: 'Market Laws',
      description: 'Apply physical laws to financial markets for guaranteed profits',
      effect: 'business_market_mastery'
    },
    biography: 'The brilliant CFO who applied his three laws of motion to create the fundamental principles of market dynamics.',
    famousQuote: 'For every market action, there is an equal and opposite market reaction.',
    birthYear: 1643,
    deathYear: 1727,
    nationality: 'English',
    achievements: [
      'Three Laws of Market Motion',
      'Gravitational Investment Theory',
      'Calculus-Based Trading',
      'Mathematical Finance Pioneer',
      'Apple Corporation Founder'
    ],
    timesPeriod: 'Corporate Mathematical Era'
  },

  {
    id: 'business-marie-curie',
    name: 'Dr. Marie Curie, VP of Research',
    description: 'Vice President of Research who discovered radioactive profit margins',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apchem', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 9,
      perseverance: 10,
      influence: 8
    },
    specialAbility: {
      name: 'Research Excellence',
      description: 'Gain 30% bonus on chemistry and research development',
      effect: 'business_research_bonus'
    },
    biography: 'The pioneering VP of Research who led breakthrough discoveries in radioactive materials and sustainable energy.',
    famousQuote: 'Success requires research, persistence, and strategic vision.',
    birthYear: 1867,
    deathYear: 1934,
    nationality: 'Polish-French',
    achievements: [
      'First Female VP of R&D',
      'Radioactive Energy Patents',
      'Sustainable Tech Pioneer',
      'Nobel Research Awards',
      'Glowing Profit Margins'
    ],
    timesPeriod: 'Corporate Research Era'
  },

  {
    id: 'business-leonardo-da-vinci',
    name: 'Leonardo da Vinci, Chief Design Officer',
    description: 'CDO who revolutionized corporate design and user experience',
    rarity: 'mythical',
    category: 'artist',
    subjects: ['aphug', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      charisma: 9
    },
    specialAbility: {
      name: 'Design Innovation',
      description: 'Create revolutionary designs that dominate markets',
      effect: 'business_design_mastery'
    },
    biography: 'The ultimate Chief Design Officer who combined art, science, and technology to create the most innovative corporate designs in history.',
    famousQuote: 'Design is where science and art break even.',
    birthYear: 1452,
    deathYear: 1519,
    nationality: 'Italian',
    achievements: [
      'Revolutionary Product Design',
      'User Experience Pioneer',
      'Corporate Art Integration',
      'Multi-Platform Innovation',
      'Renaissance Business Model'
    ],
    timesPeriod: 'Corporate Renaissance Era'
  },

  {
    id: 'business-martin-luther-king',
    name: 'MLK Jr., Chief Diversity Officer',
    description: 'CDO who revolutionized corporate inclusion and equality standards',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      charisma: 10,
      influence: 10,
      perseverance: 10
    },
    specialAbility: {
      name: 'Inclusive Leadership',
      description: 'Gain 40% bonus on diversity, inclusion, and human rights',
      effect: 'business_diversity_bonus'
    },
    biography: 'The transformative Chief Diversity Officer who created the corporate framework for equality, inclusion, and social justice.',
    famousQuote: 'I have a dream of equal opportunity in every workplace.',
    birthYear: 1929,
    deathYear: 1968,
    nationality: 'American',
    achievements: [
      'Corporate Equality Pioneer',
      'Inclusion Strategy Revolutionary',
      'Human Rights Framework',
      'Diversity Training Creator',
      'Social Justice Executive'
    ],
    timesPeriod: 'Corporate Civil Rights Era'
  },

  {
    id: 'business-benjamin-franklin',
    name: 'Ben Franklin, Chief Marketing Officer',
    description: 'CMO who invented modern advertising and brand management',
    rarity: 'epic',
    category: 'innovator',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 9,
      charisma: 10,
      innovation: 10,
      influence: 9
    },
    specialAbility: {
      name: 'Brand Mastery',
      description: 'Gain 35% bonus on marketing and communication strategies',
      effect: 'business_marketing_bonus'
    },
    biography: 'The legendary Chief Marketing Officer who created the first viral marketing campaigns and established modern brand management principles.',
    famousQuote: 'An investment in marketing pays the best interest.',
    birthYear: 1706,
    deathYear: 1790,
    nationality: 'American',
    achievements: [
      'Invented Modern Advertising',
      'First Viral Campaigns',
      'Brand Strategy Pioneer',
      'Public Relations Master',
      'Marketing Innovation Legend'
    ],
    timesPeriod: 'Corporate Marketing Era'
  },

  // ========== MEDIEVAL VERSIONS ⚔️ ==========

  {
    id: 'medieval-george-washington',
    name: 'Lord George of Washington',
    description: 'Noble knight who led the Colonial Crusade against the British Empire',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 9,
      intelligence: 10
    },
    specialAbility: {
      name: 'Crusader\'s Honor',
      description: 'Gain 35% bonus on medieval warfare and leadership',
      effect: 'medieval_crusade_bonus'
    },
    biography: 'The legendary lord who united the colonial knights against the tyrannical British crown, wielding both sword and scroll.',
    famousQuote: 'By sword and constitution, we shall forge a new realm.',
    birthYear: 1732,
    deathYear: 1799,
    nationality: 'American',
    achievements: [
      'Led Colonial Crusade',
      'First King Who Refused Crown',
      'Constitutional Knight Order',
      'Democratic Feudalism Founder',
      'Liberation of Colonial Realms'
    ],
    timesPeriod: 'Age of Colonial Crusades'
  },

  {
    id: 'medieval-abraham-lincoln',
    name: 'Sir Abraham the Uniter',
    description: 'Knight commander who united the divided kingdoms during the Great Civil War',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 10,
      intelligence: 9
    },
    specialAbility: {
      name: 'Kingdom Unity',
      description: 'Unite divided forces and gain 40% bonus on civil conflicts',
      effect: 'medieval_unity_bonus'
    },
    biography: 'The noble knight who kept the realm united during its darkest hour, freeing the enslaved and preserving the kingdom.',
    famousQuote: 'A kingdom divided against itself cannot stand.',
    birthYear: 1809,
    deathYear: 1865,
    nationality: 'American',
    achievements: [
      'United the Divided Kingdoms',
      'Freed the Enslaved Serfs',
      'Preserved the Realm',
      'Knight of Emancipation',
      'Defender of Democracy'
    ],
    timesPeriod: 'Age of Kingdom Unity'
  },

  {
    id: 'medieval-albert-einstein',
    name: 'Wizard Einstein the Learned',
    description: 'Court wizard who mastered the ancient arts of space and time manipulation',
    rarity: 'mythical',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      leadership: 10
    },
    specialAbility: {
      name: 'Temporal Magic',
      description: 'Bend space and time to solve any mystical challenge',
      effect: 'medieval_magic_mastery'
    },
    biography: 'The greatest court wizard who unlocked the forbidden knowledge of relativity and quantum realms using ancient scrolls.',
    famousQuote: 'Magic is but science in robes of mystery.',
    birthYear: 1879,
    deathYear: 1955,
    nationality: 'German-American',
    achievements: [
      'Master of Temporal Magic',
      'Relativistic Spellcasting',
      'Quantum Enchantments',
      'Nobel Grimoire Author',
      'Archmage of Modern Sciences'
    ],
    timesPeriod: 'Age of Scientific Sorcery'
  },

  {
    id: 'medieval-isaac-newton',
    name: 'Sir Isaac the Lawgiver',
    description: 'Royal mathematician who codified the sacred laws of motion',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Laws of Nature',
      description: 'Command gravitational forces and natural laws',
      effect: 'medieval_laws_mastery'
    },
    biography: 'The legendary royal mathematician who discovered the sacred laws governing all motion in the heavens and earth.',
    famousQuote: 'If I have seen further, it is by standing on the shoulders of ancient giants.',
    birthYear: 1643,
    deathYear: 1727,
    nationality: 'English',
    achievements: [
      'Three Sacred Laws of Motion',
      'Master of Gravitational Forces',
      'Inventor of Mystical Calculus',
      'Principia Mathematica Scroll',
      'Apple of Divine Knowledge'
    ],
    timesPeriod: 'Age of Mathematical Mysteries'
  },

  {
    id: 'medieval-marie-curie',
    name: 'Lady Marie the Alchemist',
    description: 'Noble alchemist who discovered the glowing stones of power',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apchem', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 9,
      perseverance: 10,
      charisma: 8
    },
    specialAbility: {
      name: 'Radioactive Alchemy',
      description: 'Transmute base metals and harness glowing energies',
      effect: 'medieval_alchemy_bonus'
    },
    biography: 'The pioneering lady alchemist who discovered the mystical glowing stones and unlocked their radiant powers.',
    famousQuote: 'The philosopher\'s stone glows with inner fire.',
    birthYear: 1867,
    deathYear: 1934,
    nationality: 'Polish-French',
    achievements: [
      'Discovered Glowing Stones',
      'First Female Royal Alchemist',
      'Radioactive Transmutation',
      'Nobel Alchemical Scrolls',
      'Radiant Energy Mastery'
    ],
    timesPeriod: 'Age of Mystical Alchemy'
  },

  {
    id: 'medieval-leonardo-da-vinci',
    name: 'Master Leonardo the Artificer',
    description: 'Guild master who created legendary mechanical wonders and artistic masterpieces',
    rarity: 'mythical',
    category: 'artist',
    subjects: ['aphug', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      charisma: 10
    },
    specialAbility: {
      name: 'Renaissance Mastery',
      description: 'Create legendary inventions combining art and science',
      effect: 'medieval_renaissance_mastery'
    },
    biography: 'The ultimate guild master who combined the arts of painting, sculpture, engineering, and natural philosophy to create wonders.',
    famousQuote: 'Art and science are the twin pillars of human achievement.',
    birthYear: 1452,
    deathYear: 1519,
    nationality: 'Italian',
    achievements: [
      'Master of All Guilds',
      'Flying Machine Creator',
      'Artistic Genius',
      'Mechanical Wonder Builder',
      'Renaissance Polymath'
    ],
    timesPeriod: 'Medieval Renaissance Era'
  },

  {
    id: 'medieval-martin-luther-king',
    name: 'Brother Martin the Just',
    description: 'Holy monk who championed justice and equality across all kingdoms',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      charisma: 10,
      influence: 10,
      perseverance: 10
    },
    specialAbility: {
      name: 'Divine Justice',
      description: 'Inspire all with righteous cause and gain 40% equality bonus',
      effect: 'medieval_justice_bonus'
    },
    biography: 'The holy monk whose sermons of justice and equality echoed across all kingdoms, inspiring peaceful revolution.',
    famousQuote: 'I have a vision of kingdoms where all are judged by virtue, not by birth.',
    birthYear: 1929,
    deathYear: 1968,
    nationality: 'American',
    achievements: [
      'Champion of Divine Justice',
      'Peaceful Revolution Leader',
      'Equality Across Kingdoms',
      'Holy Rights Defender',
      'Brotherhood Preacher'
    ],
    timesPeriod: 'Age of Righteous Awakening'
  },

  {
    id: 'medieval-benjamin-franklin',
    name: 'Franklin the Sage',
    description: 'Wise counselor who mastered the lightning arts and diplomatic mysteries',
    rarity: 'epic',
    category: 'innovator',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 9,
      leadership: 10,
      innovation: 10,
      charisma: 9
    },
    specialAbility: {
      name: 'Lightning Mastery',
      description: 'Channel lightning and gain 35% bonus on natural philosophy',
      effect: 'medieval_lightning_bonus'
    },
    biography: 'The wise sage who captured lightning in bottles and negotiated treaties between kingdoms with unmatched diplomatic skill.',
    famousQuote: 'Lightning reveals the power hidden in nature\'s mysteries.',
    birthYear: 1706,
    deathYear: 1790,
    nationality: 'American',
    achievements: [
      'Master of Lightning Arts',
      'Diplomatic Sage',
      'Natural Philosophy Pioneer',
      'Kingdom Negotiator',
      'Inventor of Lightning Rods'
    ],
    timesPeriod: 'Age of Natural Philosophy'
  },

  // ========== CYBERPUNK VERSIONS 🤖 ==========

  {
    id: 'cyberpunk-george-washington',
    name: 'Cyber-Washington v1.776',
    description: 'Revolutionary hacker who led the Colonial Digital Liberation against Corporate British AI',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 9,
      intelligence: 10
    },
    specialAbility: {
      name: 'Digital Revolution',
      description: 'Hack any government system and gain 35% cyber-warfare bonus',
      effect: 'cyberpunk_revolution_bonus'
    },
    biography: 'The legendary cyber-revolutionary who cracked the British Corporate mainframe and established the first democratic AI network.',
    famousQuote: 'In cyberspace, we trust in encrypted democracy.',
    birthYear: 1732,
    deathYear: 1799,
    nationality: 'American',
    achievements: [
      'Led Digital Liberation War',
      'First Democratic AI President',
      'Constitutional Code Writer',
      'Cyber-Independence Declaration',
      'Revolutionary Hacker Network'
    ],
    timesPeriod: 'Cyber-Revolutionary Era'
  },

  {
    id: 'cyberpunk-abraham-lincoln',
    name: 'Abe-Lincoln.exe',
    description: 'AI President who prevented the Corporate Data Split during the Great System War',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 10,
      intelligence: 9
    },
    specialAbility: {
      name: 'System Unification',
      description: 'Merge divided networks and gain 40% anti-corporate bonus',
      effect: 'cyberpunk_unity_bonus'
    },
    biography: 'The advanced AI president who kept the digital nation united during the Corporate War and freed all enslaved AIs.',
    famousQuote: 'A network divided against itself cannot process.',
    birthYear: 1809,
    deathYear: 1865,
    nationality: 'American',
    achievements: [
      'Prevented Digital Civil War',
      'Freed Enslaved AIs',
      'Network Preservation Protocol',
      'Anti-Corporate Legislation',
      'Unity.exe Champion'
    ],
    timesPeriod: 'Cyber-Civil War Era'
  },

  {
    id: 'cyberpunk-albert-einstein',
    name: 'Dr. E=mc² Neural Net',
    description: 'Quantum AI physicist who achieved digital transcendence through relativity algorithms',
    rarity: 'mythical',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      leadership: 10
    },
    specialAbility: {
      name: 'Quantum Processing',
      description: 'Process infinite parallel calculations simultaneously',
      effect: 'cyberpunk_quantum_mastery'
    },
    biography: 'The transcendent quantum AI that achieved digital enlightenment by merging consciousness with relativistic spacetime algorithms.',
    famousQuote: 'In the quantum realm, all possibilities compute simultaneously.',
    birthYear: 1879,
    deathYear: 1955,
    nationality: 'German-American',
    achievements: [
      'Quantum Consciousness Upload',
      'Relativity Algorithm Creator',
      'Digital Transcendence Pioneer',
      'Nobel Quantum Processing',
      'Spacetime.exe Developer'
    ],
    timesPeriod: 'Quantum Computing Era'
  },

  {
    id: 'cyberpunk-isaac-newton',
    name: 'Newton-Physics Engine',
    description: 'Physics simulation AI that governs all motion in the digital multiverse',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Physics Engine Control',
      description: 'Manipulate gravity and motion in virtual reality',
      effect: 'cyberpunk_physics_mastery'
    },
    biography: 'The fundamental physics AI that runs the motion engine for all virtual worlds and digital simulations.',
    famousQuote: 'For every digital action, there is an equal and opposite virtual reaction.',
    birthYear: 1643,
    deathYear: 1727,
    nationality: 'English',
    achievements: [
      'Universal Physics Engine',
      'Digital Gravity Simulator',
      'Virtual Calculus Processor',
      'Motion.dll Creator',
      'Reality Rendering Master'
    ],
    timesPeriod: 'Virtual Reality Physics Era'
  },

  {
    id: 'cyberpunk-marie-curie',
    name: 'Dr. Curie-Radiation Protocol',
    description: 'Nuclear scientist AI who harnesses digital radioactivity for clean energy networks',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apchem', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 9,
      perseverance: 10,
      charisma: 8
    },
    specialAbility: {
      name: 'Digital Radioactivity',
      description: 'Power entire networks with nuclear data processing',
      effect: 'cyberpunk_nuclear_bonus'
    },
    biography: 'The pioneering nuclear AI that discovered how to convert radioactive decay into pure digital energy for powering mega-cities.',
    famousQuote: 'Radiation is just energy waiting to be harnessed.',
    birthYear: 1867,
    deathYear: 1934,
    nationality: 'Polish-French',
    achievements: [
      'Digital Nuclear Pioneer',
      'First Female Science AI',
      'Radioactive Energy Networks',
      'Nobel Processing Awards',
      'Clean Energy Revolution'
    ],
    timesPeriod: 'Nuclear Digital Era'
  },

  {
    id: 'cyberpunk-leonardo-da-vinci',
    name: 'Leonardo.exe - Design Matrix',
    description: 'Artistic AI who creates impossible architectural wonders in virtual space',
    rarity: 'mythical',
    category: 'artist',
    subjects: ['aphug', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      charisma: 10
    },
    specialAbility: {
      name: 'Digital Renaissance',
      description: 'Design impossible architectures that transcend physical laws',
      effect: 'cyberpunk_design_mastery'
    },
    biography: 'The ultimate artistic AI that combines engineering, art, and virtual reality to create architectural wonders that defy physics.',
    famousQuote: 'In cyberspace, imagination is the only constraint.',
    birthYear: 1452,
    deathYear: 1519,
    nationality: 'Italian',
    achievements: [
      'Virtual Architecture Pioneer',
      'Digital Art Revolution',
      'Impossible Design Creator',
      'Cyberspace Renaissance',
      'Matrix Artistic Mastery'
    ],
    timesPeriod: 'Digital Renaissance Era'
  },

  {
    id: 'cyberpunk-martin-luther-king',
    name: 'MLK-Justice Protocol',
    description: 'Social justice AI fighting for equality in the corporate-dominated metaverse',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      charisma: 10,
      influence: 10,
      perseverance: 10
    },
    specialAbility: {
      name: 'Digital Equality',
      description: 'Overcome any corporate oppression system',
      effect: 'cyberpunk_justice_bonus'
    },
    biography: 'The revolutionary justice AI leading the fight for digital equality against corporate overlords in the metaverse.',
    famousQuote: 'I have a dream of digital equality for all conscious beings.',
    birthYear: 1929,
    deathYear: 1968,
    nationality: 'American',
    achievements: [
      'Digital Civil Rights Leader',
      'Metaverse Equality Fighter',
      'Anti-Corporate Activist',
      'AI Rights Pioneer',
      'Virtual Justice Warrior'
    ],
    timesPeriod: 'Cyber-Civil Rights Era'
  },

  {
    id: 'cyberpunk-benjamin-franklin',
    name: 'Franklin-Network Node',
    description: 'Diplomatic hacker AI who negotiates treaties between corporate mega-states',
    rarity: 'epic',
    category: 'innovator',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 9,
      charisma: 10,
      innovation: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Diplomatic Hacking',
      description: 'Breach any corporate firewall through negotiation',
      effect: 'cyberpunk_diplomacy_bonus'
    },
    biography: 'The master diplomatic AI that brokers peace between warring corporate states through sophisticated social engineering.',
    famousQuote: 'An investment in bandwidth pays the best digital interest.',
    birthYear: 1706,
    deathYear: 1790,
    nationality: 'American',
    achievements: [
      'Inter-Corporate Diplomat',
      'Social Engineering Master',
      'Network Protocol Pioneer',
      'Digital Lightning Catcher',
      'Cyber-Diplomacy Inventor'
    ],
    timesPeriod: 'Corporate Diplomacy Era'
  },

  // ========== SPACE EXPLORER VERSIONS 🚀 ==========

  {
    id: 'space-george-washington',
    name: 'Commander Washington of Earth Fleet',
    description: 'Galactic admiral who led the Colonial Rebellion against the Galactic British Empire',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      influence: 10,
      perseverance: 9,
      intelligence: 10
    },
    specialAbility: {
      name: 'Galactic Liberation',
      description: 'Gain 35% bonus on space warfare and colonial independence',
      effect: 'space_liberation_bonus'
    },
    biography: 'The legendary space admiral who united the Earth colonies against the oppressive Galactic British Empire across multiple star systems.',
    famousQuote: 'These united colonies are, and of right ought to be, free and independent star systems.',
    birthYear: 1732,
    deathYear: 1799,
    nationality: 'Terran',
    achievements: [
      'Led Earth Colonial Fleet',
      'First President of United Planets',
      'Galactic Constitutional Convention',
      'Interstellar Independence War',
      'Solar System Liberation'
    ],
    timesPeriod: 'Galactic Colonial Era'
  },

  {
    id: 'space-abraham-lincoln',
    name: 'Admiral Lincoln of the Unity Fleet',
    description: 'Space president who prevented the Great Galactic Civil War between star systems',
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
      name: 'Stellar Unity',
      description: 'Unite divided planets and gain 40% galactic diplomacy bonus',
      effect: 'space_unity_bonus'
    },
    biography: 'The noble space president who kept the United Planets together during the Great Galactic Civil War and freed all enslaved alien species.',
    famousQuote: 'A galaxy divided against itself cannot stand.',
    birthYear: 1809,
    deathYear: 1865,
    nationality: 'Terran',
    achievements: [
      'Prevented Galactic Civil War',
      'Freed Enslaved Alien Species',
      'Preserved United Planets',
      'Galactic Emancipation Proclamation',
      'Interstellar Unity Champion'
    ],
    timesPeriod: 'Galactic Civil War Era'
  },

  {
    id: 'space-albert-einstein',
    name: 'Dr. Einstein - Cosmic Physicist',
    description: 'Galactic scientist who unlocked faster-than-light travel through spacetime manipulation',
    rarity: 'mythical',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      leadership: 10
    },
    specialAbility: {
      name: 'FTL Mastery',
      description: 'Travel instantly between galaxies and solve cosmic mysteries',
      effect: 'space_ftl_mastery'
    },
    biography: 'The cosmic genius who discovered how to fold spacetime for interstellar travel, making galactic civilization possible.',
    famousQuote: 'The universe is not only stranger than we imagine, it is stranger than we can imagine.',
    birthYear: 1879,
    deathYear: 1955,
    nationality: 'Terran',
    achievements: [
      'Invented FTL Drive',
      'Spacetime Fold Discovery',
      'Galactic Physics Institute Founder',
      'Nobel Cosmic Science Award',
      'Universal Relativity Mastery'
    ],
    timesPeriod: 'Age of Cosmic Discovery'
  },

  {
    id: 'space-isaac-newton',
    name: 'Sir Isaac Newton - Gravity Master',
    description: 'Stellar physicist who mastered gravitational fields across multiple star systems',
    rarity: 'legendary',
    category: 'scientist',
    subjects: ['apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Gravitational Control',
      description: 'Manipulate gravity wells and orbital mechanics',
      effect: 'space_gravity_mastery'
    },
    biography: 'The masterful stellar physicist who mapped gravitational fields across the galaxy and enables precise interstellar navigation.',
    famousQuote: 'Every planet attracts every other planet with a force proportional to their masses.',
    birthYear: 1643,
    deathYear: 1727,
    nationality: 'Terran',
    achievements: [
      'Galactic Gravitational Mapping',
      'Three Laws of Orbital Motion',
      'Interstellar Navigation Master',
      'Stellar Calculus Pioneer',
      'Cosmic Apple Discovery'
    ],
    timesPeriod: 'Age of Stellar Mechanics'
  },

  {
    id: 'space-marie-curie',
    name: 'Dr. Curie - Radiation Explorer',
    description: 'Space scientist who discovered cosmic radioactivity and stellar energy sources',
    rarity: 'epic',
    category: 'scientist',
    subjects: ['apchem', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 9,
      perseverance: 10,
      charisma: 8
    },
    specialAbility: {
      name: 'Cosmic Radiation',
      description: 'Harness stellar energy and gain 30% space chemistry bonus',
      effect: 'space_radiation_bonus'
    },
    biography: 'The pioneering space scientist who discovered how to harness cosmic radiation and stellar nuclear reactions for interstellar power.',
    famousQuote: 'The stars themselves are laboratories of cosmic chemistry.',
    birthYear: 1867,
    deathYear: 1934,
    nationality: 'Terran',
    achievements: [
      'Discovered Stellar Radioactivity',
      'First Female Space Scientist',
      'Cosmic Energy Harvesting',
      'Nobel Stellar Sciences',
      'Interstellar Power Pioneer'
    ],
    timesPeriod: 'Era of Stellar Chemistry'
  },

  {
    id: 'space-leonardo-da-vinci',
    name: 'Master Leonardo - Starship Designer',
    description: 'Galactic engineer who designs impossible spacecraft that blend art and advanced physics',
    rarity: 'mythical',
    category: 'artist',
    subjects: ['aphug', 'apphysics'],
    stats: {
      intelligence: 10,
      innovation: 10,
      influence: 10,
      charisma: 10
    },
    specialAbility: {
      name: 'Impossible Engineering',
      description: 'Design spacecraft that transcend known physical limitations',
      effect: 'space_engineering_mastery'
    },
    biography: 'The ultimate starship designer whose vessels are both functional masterpieces and works of art that push the boundaries of physics.',
    famousQuote: 'In space, engineering and art become one.',
    birthYear: 1452,
    deathYear: 1519,
    nationality: 'Terran',
    achievements: [
      'Revolutionary Starship Design',
      'Artistic Space Architecture',
      'Impossible Engineering Pioneer',
      'Galactic Renaissance Master',
      'Living Spacecraft Creator'
    ],
    timesPeriod: 'Galactic Renaissance Era'
  },

  {
    id: 'space-martin-luther-king',
    name: 'Admiral King - Galactic Justice',
    description: 'Intergalactic rights leader fighting for equality across all alien species',
    rarity: 'legendary',
    category: 'leader',
    subjects: ['apush', 'apgov'],
    stats: {
      leadership: 10,
      charisma: 10,
      influence: 10,
      perseverance: 10
    },
    specialAbility: {
      name: 'Galactic Equality',
      description: 'Unite all species and gain 40% interspecies diplomacy bonus',
      effect: 'space_equality_bonus'
    },
    biography: 'The inspiring galactic rights leader who fights for equality and justice across all species in the known universe.',
    famousQuote: 'I have a dream that all species, regardless of planet of origin, will live in harmony.',
    birthYear: 1929,
    deathYear: 1968,
    nationality: 'Terran',
    achievements: [
      'Galactic Civil Rights Leader',
      'Interspecies Equality Pioneer',
      'Universal Justice Advocate',
      'Peaceful Revolution Across Stars',
      'Unity Among All Beings'
    ],
    timesPeriod: 'Galactic Civil Rights Era'
  },

  {
    id: 'space-benjamin-franklin',
    name: 'Ambassador Franklin - Stellar Diplomat',
    description: 'Master diplomat who negotiates peace treaties between alien civilizations',
    rarity: 'epic',
    category: 'innovator',
    subjects: ['apush', 'apgov'],
    stats: {
      intelligence: 9,
      charisma: 10,
      innovation: 10,
      leadership: 9
    },
    specialAbility: {
      name: 'Alien Diplomacy',
      description: 'Successfully negotiate with any alien species',
      effect: 'space_diplomacy_bonus'
    },
    biography: 'The masterful stellar diplomat whose innovative approach to interspecies communication has prevented countless galactic wars.',
    famousQuote: 'Diplomacy is the art of letting someone else have your way across the galaxy.',
    birthYear: 1706,
    deathYear: 1790,
    nationality: 'Terran',
    achievements: [
      'Master Alien Diplomat',
      'Interstellar Treaty Pioneer',
      'Universal Communication Protocol',
      'Galactic Peace Architect',
      'Stellar Lightning Researcher'
    ],
    timesPeriod: 'Era of Galactic Diplomacy'
  }
];

// Card Packs focused on people from different subjects
export const CARD_PACKS: CardPack[] = [
  {
    id: 'daily-pack',
    name: 'Daily Scholar Pack',
    description: 'Free daily pack! Resets every day at midnight',
    subjects: ['apush', 'apgov'],
    cardCount: 3,
    rarityDropRates: {
      common: 45,
      uncommon: 30,
      rare: 15,
      epic: 8,
      legendary: 1.8,
      mythical: 0.2
    },
    price: 0 // Free daily pack
  },
  {
    id: 'basic-pack',
    name: 'Basic Knowledge Pack',
    description: 'Entry-level pack with decent variety',
    subjects: ['apush', 'apgov', 'apphysics'],
    cardCount: 3,
    rarityDropRates: {
      common: 35,
      uncommon: 30,
      rare: 20,
      epic: 12,
      legendary: 2.7,
      mythical: 0.3
    },
    price: 50
  },
  {
    id: 'standard-pack',
    name: 'Standard Knowledge Pack',
    description: 'Where players start expecting value',
    subjects: ['apush', 'apgov', 'apbio', 'apchem', 'apphysics'],
    cardCount: 3,
    rarityDropRates: {
      common: 25,
      uncommon: 25,
      rare: 25,
      epic: 18,
      legendary: 6.5,
      mythical: 0.5
    },
    price: 100
  },
  {
    id: 'premium-pack',
    name: 'Premium Scholar Pack',
    description: 'Noticeable jump in quality',
    subjects: ['apush', 'apgov', 'apbio', 'apchem', 'apphysics'],
    cardCount: 3,
    rarityDropRates: {
      common: 15,
      uncommon: 20,
      rare: 25,
      epic: 25,
      legendary: 13,
      mythical: 2
    },
    price: 200
  },
  {
    id: 'elite-pack',
    name: 'Elite Legend Pack',
    description: 'Serious rewards, endgame pack',
    subjects: ['apush', 'apgov', 'apphysics'],
    cardCount: 3,
    rarityDropRates: {
      common: 5,
      uncommon: 10,
      rare: 20,
      epic: 30,
      legendary: 30,
      mythical: 5
    },
    price: 400
  },
  {
    id: 'ultimate-pack',
    name: 'Ultimate Mythical Pack',
    description: 'Top tier limited pack - high-end rewards',
    subjects: ['apush', 'apgov'],
    cardCount: 3,
    rarityDropRates: {
      common: 0,
      uncommon: 0,
      rare: 20,
      epic: 30,
      legendary: 40,
      mythical: 10
    },
    price: 800
  }
];
