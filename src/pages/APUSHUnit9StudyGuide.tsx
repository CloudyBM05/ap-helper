import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the types for your data
interface TimelineEvent {
  key: string;
  icon: string;
  title: string;
  summary: string;
  details: string[];
}

interface ContentSection {
  key: string;
  title: string;
  bullets: string[];
}

export const unit9Content: ContentSection[] = [
    {
        key: '9.2',
        title: '9.2 Causes of the Conservative Movement',
        bullets: [
            '**Presidential Elections & Shift to Conservatism**',
            'Barry Goldwater (1964): His campaign laid ideological groundwork for modern conservatism ("New Right").',
            '',
            '**Failures of Carter Administration**',
            'Economic stagnation + inflation = “Stagflation”.',
            'Energy crisis due to Middle Eastern oil embargo.',
            'Iran Hostage Crisis damaged public confidence.',
            '',
            '**Election of Ronald Reagan (1980)**',
            'Reagan won in a landslide (489–49 electoral votes).',
            'Effective communicator due to former actor background—skilled with media.',
            '',
            '**Three Pillars of the New Right**',
            'Cold War Conservatism: Strong anti-communist stance.',
            'Pro-Business Economics:',
            '  - Wanted deregulation and lower corporate taxes.',
            'Moral and Religious Traditionalism:',
            '  - Reaction against cultural shifts in the 1960s-70s (abortion, gay rights, feminism).',
            '',
            '**Reaganomics (Supply-Side Economics)**',
            'Core Beliefs:',
            '  - Cut taxes, especially for the wealthy.',
            '  - Reduce federal spending to encourage investment.',
            'Economic Recovery Act of 1981:',
            '  - Reduced income tax rates across the board.',
            'Critiques:',
            '  - Wealthy benefited the most.',
            '  - “Trickle-down” benefits to the poor were debated.',
            '',
            '**Federal Spending and Deregulation**',
            'Military Spending: Increased by $150 billion, while welfare was cut by $40 billion.',
            'Deregulation:',
            '  - Weakened environmental protections.',
            '  - Opened up federal lands to drilling and logging.',
            '  - Reduced car safety and emission regulations.',
            '',
            '**Moral and Religious Achievements**',
            'Judicial Appointments: Four Supreme Court justices, shifting court toward conservatism.',
            'Impact: Conservative resurgence in policy, economics, and culture.',
        ],
    },
    {
        key: '9.3',
        title: '9.3 End of the Cold War',
        bullets: [
            '**Reagan’s Rhetoric and Speeches**',
            '1982 Speech to British Parliament: Predicted fall of Marxism.',
            '1983 “Evil Empire” Speech: Asserted strong opposition to the USSR.',
            '',
            '**Diplomatic Engagement**',
            'Mikhail Gorbachev’s Reforms:',
            '  - Glasnost: Political openness.',
            '  - Perestroika: Economic liberalization.',
            'Major Agreements:',
            '  - INF Treaty: Elimination of intermediate-range nuclear missiles.',
            '  - Soviet withdrawal from Afghanistan.',
            '',
            '**Military Strategy**',
            'Strategic Defense Initiative (SDI): "Star Wars" missile defense in space.',
            'Expansion of U.S. Arsenal:',
            '  - New bombers (B-1), MX missiles.',
            '  - Navy increased to over 600 ships.',
            '  - Defense budget nearly doubled from 1981–1986.',
            '',
            '**Limited Military Engagement**',
            'Reagan Doctrine: Support anti-communist groups globally.',
            'Nicaragua: Backed the “Contras” to fight Sandinistas.',
            'Iran-Contra Affair:',
            '  - Secretly sold arms to Iran to fund the Contras.',
            '  - Unconstitutional, led to scandal but Reagan was not directly implicated.',
            '',
            '**Fall of the USSR**',
            '1989: Communist governments in Eastern Europe collapsed.',
            'Berlin Wall: Fell in 1989, symbolic end of Soviet dominance.',
            '1991: USSR officially dissolved under George H. W. Bush.',
            '',
            '**Post-Cold War Diplomacy**',
            'START I & II Treaties: Major arms reductions and U.S. financial support to stabilize post-Soviet Russia.',
        ],
    },
    {
        key: '9.4',
        title: '9.4 America’s Economy in the Late 20th Century',
        bullets: [
            '**Digital Revolution**',
            '1964: First computers.',
            'Microprocessors made tech more accessible.',
            'Communication innovations:',
            '  - Email, early platforms like Napster.',
            '  - Transformed business and personal interaction.',
            '',
            '**Economic Effects**',
            'Productivity Boost: Due to faster communication and computing.',
            'Rise of Tech Giants: Amazon, Microsoft outcompete brick-and-mortar stores.',
            'Wage Stagnation:',
            '  - Despite productivity, wages didn’t rise significantly.',
            'Reasons:',
            '  - Growth of low-wage service sector jobs.',
            '  - Outsourcing of manufacturing.',
            '  - Decline in labor unions.',
            'Income inequality increased.',
        ],
    },
    {
        key: '9.5',
        title: '9.5 Migration and Immigration in the 1990s and 2000s',
        bullets: [
            '**Internal Migration**',
            'Sun Belt Migration:',
            '  - Drawn by warm climate, jobs in defense and tech.',
            '  - Enabled by affordable air conditioning.',
            'Political Consequence: Southern and Western states gained political power (more House seats).',
            '',
            '**Immigration**',
            'Main Sources:',
            '  - Latin America (especially Mexico).',
            '  - Asia and Middle East.',
            'Economic Impact:',
            '  - Provided essential low-wage labor.',
            '  - Little evidence of harming native employment.',
            '',
            '**Immigration Laws**',
            '1965 Immigration Act: Removed quotas based on nationality.',
            '1986 Immigration Reform and Control Act:',
            '  - Legalized many undocumented immigrants.',
            '  - Penalized employers of undocumented workers.',
            '',
            '**Demographic Shifts**',
            'Pre-1965: Immigration was 10% of population growth.',
            'Post-1965: Jumped to ~33%.',
            'White Population Decline:',
            '  - From 75% (1990s) to ~63% (2011).',
            '  - Estimated minority-majority shift by 2050.',
        ],
    },
    {
        key: '9.6',
        title: '9.6 Challenges of the 21st Century',
        bullets: [
            '**Political Events**',
            'Election of 2000:',
            '  - Bush vs. Gore.',
            '  - Disputed Florida results.',
            '  - Bush v. Gore Supreme Court decision gave Bush the presidency.',
            '',
            '**September 11, 2001 Attacks**',
            'Coordinated by al Qaeda.',
            'Targets: Twin Towers (NYC), Pentagon, and United 93 (crashed in Pennsylvania).',
            'Immediate Effect: National unity and declaration of War on Terror.',
            '',
            '**War on Terror**',
            'Afghanistan (2001):',
            '  - Goal: Remove Taliban, capture bin Laden.',
            '  - Taliban removed quickly, bin Laden not captured until 2011.',
            'Iraq War (2003):',
            '  - Alleged WMDs (never found).',
            '  - Removed Saddam Hussein.',
            '  - Resulted in instability and prolonged conflict.',
            '',
            '**Government Response**',
            'Patriot Act (2001 & 2003):',
            '  - Expanded government surveillance (phones, internet).',
            '  - Raised civil liberty concerns.',
            'Department of Homeland Security:',
            '  - Created by merging 20+ federal agencies.',
            '  - Tasked with counter-terrorism and disaster response.',
            '',
            '**Environmental Concerns**',
            'Dependence on Fossil Fuels:',
            '  - Wars and crises highlighted this (e.g., Gulf War).',
            'Climate Change Awareness:',
            '  - Al Gore and An Inconvenient Truth increased public consciousness.',
            'Partisan Split:',
            '  - Democrats favored regulation.',
            '  - Many Republicans questioned human-caused climate change.',
        ],
    },
];

export const timelineDataUnit9: TimelineEvent[] = [
  {
    key: '1980',
    icon: '🇺🇸',
    title: 'Ronald Reagan Elected President (1980)',
    summary: 'Ronald Reagan won a landslide victory, marking the culmination of the modern conservative movement and a shift in American politics.',
    details: [
      'Campaigned on tax cuts, reduced government spending, and a strong national defense.',
      'His victory signaled a rejection of the liberal policies of the 1960s and 70s.',
    ],
  },
  {
    key: '1981',
    icon: '💰',
    title: 'Economic Recovery Act of 1981',
    summary: 'The centerpiece of “Reaganomics,” this act implemented a 25% cut in federal income taxes over three years.',
    details: [
      'Based on supply-side economics, the theory that tax cuts for the wealthy stimulate investment.',
      'Led to a significant increase in the national debt.',
    ],
  },
  {
    key: '1983',
    icon: '🗣️',
    title: '“Evil Empire” Speech (1983)',
    summary: 'Reagan delivered a speech calling the Soviet Union an “evil empire,” intensifying Cold War rhetoric and framing the conflict in moral terms.',
    details: [
      'Part of a strategy to put ideological pressure on the USSR.',
      'Contrasted with the policy of détente from the 1970s.',
    ],
  },
  {
    key: '1985',
    icon: '🤝',
    title: 'Gorbachev Comes to Power (1985)',
    summary: 'Mikhail Gorbachev became the leader of the Soviet Union and introduced the reforms of glasnost (openness) and perestroika (restructuring).',
    details: [
      'His reforms were intended to save the failing Soviet system but ultimately hastened its collapse.',
      'Opened the door for diplomatic breakthroughs with the U.S.',
    ],
  },
  {
    key: '1986',
    icon: '📜',
    title: 'Iran-Contra Affair (1986)',
    summary: 'A political scandal where the Reagan administration secretly sold arms to Iran in exchange for hostages and used the profits to fund anti-communist Contras in Nicaragua.',
    details: [
      'A major violation of U.S. law and policy.',
      'Damaged the credibility of the Reagan administration, though Reagan himself was not impeached.',
    ],
  },
  {
    key: '1987',
    icon: '🚀',
    title: 'INF Treaty Signed (1987)',
    summary: 'The Intermediate-Range Nuclear Forces Treaty was a landmark arms control agreement between the U.S. and the USSR, eliminating an entire class of nuclear weapons.',
    details: [
      'A result of the improved relationship between Reagan and Gorbachev.',
      'A major step in de-escalating the Cold War.',
    ],
  },
  {
    key: '1989',
    icon: '🧱',
    title: 'Fall of the Berlin Wall (1989)',
    summary: 'The symbolic barrier between East and West Berlin was torn down, signaling the collapse of Soviet control over Eastern Europe.',
    details: [
      'A powerful symbol of the end of the Cold War.',
      'Led to the reunification of Germany in 1990.',
    ],
  },
  {
    key: '1991',
    icon: '🇷🇺',
    title: 'Dissolution of the Soviet Union (1991)',
    summary: 'The Soviet Union officially dissolved, breaking into 15 independent republics and formally ending the Cold War.',
    details: [
      'Occurred under President George H. W. Bush.',
      'Left the United States as the world’s sole superpower.',
    ],
  },
  {
    key: '1994',
    icon: '💼',
    title: 'NAFTA Enacted (1994)',
    summary: 'The North American Free Trade Agreement created a free-trade zone between the U.S., Canada, and Mexico, eliminating most tariffs on trade between the nations.',
    details: [
      'Promoted by President Bill Clinton as a way to boost economic growth.',
      'Criticized for causing the outsourcing of American manufacturing jobs.',
    ],
  },
  {
    key: '2000',
    icon: '🗳️',
    title: 'Bush v. Gore (2000)',
    summary: 'A controversial Supreme Court decision that stopped the Florida recount in the 2000 presidential election, effectively handing the presidency to George W. Bush.',
    details: [
      'One of the closest and most disputed elections in U.S. history.',
      'Highlighted issues with the U.S. electoral system.',
    ],
  },
  {
    key: '2001',
    icon: '✈️',
    title: 'September 11th Attacks (2001)',
    summary: 'A series of coordinated terrorist attacks by al-Qaeda that killed nearly 3,000 people and launched the U.S. into the War on Terror.',
    details: [
      'Led to the invasion of Afghanistan and the passage of the Patriot Act.',
      'Fundamentally reshaped American foreign policy and domestic security.',
    ],
  },
  {
    key: '2003',
    icon: '🇮🇶',
    title: 'Invasion of Iraq (2003)',
    summary: 'The U.S. and its allies invaded Iraq, citing concerns over weapons of mass destruction (WMDs) and ties to terrorism.',
    details: [
      'Saddam Hussein was overthrown, but no WMDs were ever found.',
      'Led to a long and costly insurgency and widespread instability in the region.',
    ],
  },
];

const APUSHUnit9StudyGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleTopic = (key: string) => {
    setOpenTopic(openTopic === key ? null : key);
  };

  const renderBullets = (bullets: string[]) => {
    const items: JSX.Element[] = [];
    let currentList: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        items.push(
          <ul key={`list-${items.length}`} className="list-disc pl-5 mt-2 space-y-1">
            {currentList.map((point, index) => {
              if (point.startsWith('  -')) {
                return (
                  <li key={index} className="ml-5" dangerouslySetInnerHTML={{ __html: point.substring(3) }} />
                );
              }
              return (
                <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
              );
            })}
          </ul>
        );
        currentList = [];
      }
    };

    bullets.forEach((item, index) => {
      if (item.startsWith('**') && item.endsWith('**')) {
        flushList();
        items.push(
          <h4 key={`header-${index}`} className="text-lg font-semibold text-blue-800 mt-4 mb-2"
              dangerouslySetInnerHTML={{ __html: item.replace(/\*\*/g, '') }} />
        );
      } else if (item.trim() === '') {
        flushList();
        if (items.length > 0 && items[items.length - 1].type !== 'div') {
             items.push(<div key={`spacer-${index}`} className="h-4" />);
        }
      } else {
        currentList.push(item);
      }
    });

    flushList();
    return items;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/apush-study-guide')}
          className="mb-6 px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Units
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800">Unit 9: Globalization and a Changing America (1980-Present)</h1>
          <p className="text-lg text-slate-600 mt-2">Explore the key events, people, and concepts of this period.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b-2 border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'topics' ? 'border-b-4 border-blue-600 text-blue-700' : 'text-slate-500 hover:text-blue-600'}`}
          >
            Key Topics
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'timeline' ? 'border-b-4 border-blue-600 text-blue-700' : 'text-slate-500 hover:text-blue-600'}`}
          >
            Timeline
          </button>
          <button
            onClick={() => navigate('/apush-study-guide/unit/9/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-blue-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit9Content.map((topic) => (
                <div key={topic.key} className="border-b border-slate-200 last:border-b-0 pb-4">
                  <button
                    onClick={() => toggleTopic(topic.key)}
                    className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-blue-700">{topic.title}</h3>
                    <span className="text-2xl text-slate-500">{openTopic === topic.key ? '−' : '+'}</span>
                  </button>
                  {openTopic === topic.key && (
                    <div className="p-4 bg-slate-50 rounded-b-lg text-base text-slate-700 leading-relaxed">
                      {renderBullets(topic.bullets)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {activeTab === 'timeline' && (
            <div className="relative border-l-4 border-blue-200 ml-4 pl-8 space-y-12">
              {timelineDataUnit9.map((event, index) => (
                <div key={`${event.key}-${index}`} className="relative">
                  <div className="absolute -left-11 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-2xl text-white shadow-md">
                    {event.icon}
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl shadow-md ml-4">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">{event.title}</h3>
                    <p className="text-lg text-slate-600 mb-4">{event.summary}</p>
                    {event.details && event.details.length > 0 && (
                      <ul className="space-y-2 list-disc pl-5">
                        {event.details.map((detail, i) => (
                          <li key={i} className="text-base text-slate-700" dangerouslySetInnerHTML={{ __html: detail.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default APUSHUnit9StudyGuide;
