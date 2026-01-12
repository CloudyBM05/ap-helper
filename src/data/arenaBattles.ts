import { ArenaBattle } from '../types/arena';

export const ARENA_BATTLES: ArenaBattle[] = [
  // Quick Battles
  {
    id: 'revolutionary-war-quick',
    name: 'Revolutionary War Skirmish',
    description: 'Test your knowledge of the American Revolution in this quick 5-question battle!',
    subject: 'APUSH',
    difficulty: 'easy',
    requiredCards: 3,
    restrictedToSubjects: ['APUSH'],
    questions: [
      {
        id: 'rev-war-1',
        question: 'Which event directly led to the famous Boston Tea Party?',
        options: [
          'The Stamp Act',
          'The Tea Act of 1773',
          'The Intolerable Acts',
          'The Boston Massacre'
        ],
        correctAnswer: 1,
        explanation: 'The Tea Act of 1773 gave the British East India Company a monopoly on tea sales in the colonies, leading colonists to dump tea into Boston Harbor.',
        subject: 'APUSH',
        difficulty: 3,
        timeLimit: 30,
        relatedCards: ['george-washington', 'benjamin-franklin', 'pirate-george-washington']
      },
      {
        id: 'rev-war-2',
        question: 'What was the significance of the Battle of Saratoga?',
        options: [
          'It ended the Revolutionary War',
          'It convinced France to join the war',
          'It was Washington\'s first victory',
          'It secured the Southern colonies'
        ],
        correctAnswer: 1,
        explanation: 'The Battle of Saratoga was the turning point that convinced France to formally enter the war as an American ally.',
        subject: 'APUSH',
        difficulty: 4,
        timeLimit: 45,
        relatedCards: ['george-washington', 'benjamin-franklin']
      },
      {
        id: 'rev-war-3',
        question: 'Which document formally ended the Revolutionary War?',
        options: [
          'Treaty of Versailles',
          'Treaty of Paris (1783)',
          'Declaration of Independence',
          'Articles of Confederation'
        ],
        correctAnswer: 1,
        explanation: 'The Treaty of Paris, signed in 1783, officially ended the Revolutionary War and recognized American independence.',
        subject: 'APUSH',
        difficulty: 2,
        timeLimit: 25,
        relatedCards: ['george-washington', 'benjamin-franklin']
      },
      {
        id: 'rev-war-4',
        question: 'What was the primary purpose of the Continental Congress?',
        options: [
          'To declare independence',
          'To coordinate colonial resistance',
          'To write the Constitution',
          'To establish trade agreements'
        ],
        correctAnswer: 1,
        explanation: 'The Continental Congress was formed to coordinate colonial resistance to British policies and later to govern during the war.',
        subject: 'APUSH',
        difficulty: 3,
        timeLimit: 35,
        relatedCards: ['george-washington', 'benjamin-franklin']
      },
      {
        id: 'rev-war-5',
        question: 'Which principle was established by Washington\'s Farewell Address?',
        options: [
          'Avoiding permanent foreign alliances',
          'Establishing political parties',
          'Expanding westward',
          'Creating a national bank'
        ],
        correctAnswer: 0,
        explanation: 'Washington warned against permanent foreign alliances and the dangers of political parties in his Farewell Address.',
        subject: 'APUSH',
        difficulty: 4,
        timeLimit: 40,
        relatedCards: ['george-washington']
      }
    ],
    rewards: {
      scholarCoins: 50,
      experiencePoints: 100,
      cardPacks: ['daily-pack']
    }
  },
  
  // Boss Battle
  {
    id: 'founding-fathers-boss',
    name: 'Council of Founding Fathers',
    description: 'Face the legendary Founding Fathers in an epic 15-question battle about the birth of America!',
    subject: 'APUSH',
    difficulty: 'expert',
    requiredCards: 5,
    restrictedToSubjects: ['APUSH'],
    boss: {
      name: 'The Founding Fathers Council',
      description: 'A legendary assembly of Washington, Jefferson, Franklin, and Adams',
      avatar: '🏛️',
      specialMechanics: [
        'Constitutional Challenge: Every 5th question is extra difficult',
        'Founding Wisdom: Boss provides misleading hints',
        'Democratic Process: Must achieve 80% accuracy to win'
      ]
    },
    questions: [
      {
        id: 'founding-1',
        question: 'What compromise resolved the debate over representation in Congress?',
        options: [
          'The Great Compromise',
          'The Three-Fifths Compromise', 
          'The Commerce Compromise',
          'The Federal Compromise'
        ],
        correctAnswer: 0,
        explanation: 'The Great Compromise (Connecticut Compromise) created a bicameral legislature with equal representation in the Senate and proportional in the House.',
        subject: 'APUSH',
        difficulty: 5,
        timeLimit: 45,
        relatedCards: ['george-washington', 'benjamin-franklin']
      }
      // Add more questions...
    ],
    rewards: {
      scholarCoins: 200,
      experiencePoints: 500,
      cardPacks: ['premium-pack'],
      exclusiveCards: ['legendary-george-washington']
    }
  },

  // Science Battle
  {
    id: 'physics-fundamentals',
    name: 'Physics Fundamentals Arena',
    description: 'Master the basic principles of physics with your greatest scientific minds!',
    subject: 'AP Physics',
    difficulty: 'medium',
    requiredCards: 4,
    restrictedToSubjects: ['AP Physics', 'AP Chemistry'],
    questions: [
      {
        id: 'physics-1',
        question: 'What is Newton\'s First Law of Motion?',
        options: [
          'F = ma',
          'An object at rest stays at rest unless acted upon by a force',
          'For every action there is an equal and opposite reaction',
          'Energy cannot be created or destroyed'
        ],
        correctAnswer: 1,
        explanation: 'Newton\'s First Law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an unbalanced force.',
        subject: 'AP Physics',
        difficulty: 2,
        timeLimit: 30,
        relatedCards: ['isaac-newton', 'wizard-newton', 'albert-einstein']
      }
    ],
    rewards: {
      scholarCoins: 75,
      experiencePoints: 150,
      cardPacks: ['science-pack']
    }
  }
];

// Card synergies that provide battle bonuses
export const CARD_SYNERGIES = {
  'revolutionary-trio': {
    name: 'Revolutionary Trio',
    description: 'Washington, Franklin, and Adams unite for independence!',
    triggeredBy: ['george-washington', 'benjamin-franklin', 'john-adams'],
    bonus: {
      type: 'accuracy' as const,
      value: 15
    }
  },
  'science-masters': {
    name: 'Masters of Science',
    description: 'Einstein, Newton, and Curie unlock the secrets of the universe!',
    triggeredBy: ['albert-einstein', 'isaac-newton', 'marie-curie'],
    bonus: {
      type: 'points' as const,
      value: 25
    }
  },
  'pirate-crew': {
    name: 'Pirate\'s Crew',
    description: 'A crew of pirate-themed cards sails to victory!',
    triggeredBy: ['pirate-george-washington', 'pirate-abraham-lincoln', 'pirate-benjamin-franklin'],
    bonus: {
      type: 'speed' as const,
      value: 20
    }
  },
  'wizard-council': {
    name: 'Council of Wizards', 
    description: 'Magical knowledge flows through this mystical council!',
    triggeredBy: ['wizard-einstein', 'wizard-newton', 'wizard-curie'],
    bonus: {
      type: 'time' as const,
      value: 30
    }
  }
};
