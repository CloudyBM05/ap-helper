import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit4Content = [
	{
		key: '4.2',
		title: '4.2 – Policy Debates in Early America',
		bullets: [[
			'**Rise of Political Parties**',
			'Federalists (Hamilton): strong central government, support for commerce/industry.',
			'Democratic-Republicans (Jefferson): limited federal government, focus on agriculture and states’ rights (yeoman farmers).',
			'The Revolution of 1800: peaceful power transfer when Jefferson defeats Adams.',
			'**Federal Power Under Jefferson**',
			'Cut military spending, eliminated Whiskey Tax.',
			'Louisiana Purchase: Doubled U.S. territory (1803). Jefferson conflicted over strict interpretation.',
			'Lewis & Clark Expedition: Mapped territory, made Native diplomatic ties.',
			'**Judicial Power and John Marshall**',
			'Marbury v. Madison (1803): Judicial review established.',
			'McCulloch v. Maryland (1819): Federal law over state law, upheld Bank of the U.S.',
			'**Foreign Policy Conflicts**',
			'Barbary Wars: Jefferson refused increased tribute; U.S. fought pirates.',
			'War of 1812 Causes:',
			'  • British impressment of American sailors.',
			'  • British support for Native resistance on frontier.',
			'  • War Hawks in Congress pushed for war.',
			'Federalist opposition culminated in Hartford Convention (talks of secession).',
			'Effects of War of 1812',
			'  • Boosted nationalism.',
			'  • Death knell for Federalist Party.',
		]],
	},
	{
		key: '4.3',
		title: '4.3 – Debates About Federal Power',
		bullets: [[
			'**Impact of the War of 1812**',
			'Exposed weaknesses: poor infrastructure and lack of national bank.',
			'**Henry Clay’s American System**',
			'Protective tariffs to support industry.',
			'National Bank to ensure currency stability.',
			'Internal improvements (roads, canals) to connect regions.',
			'**Tensions Over Internal Improvements**',
			'Madison and Monroe veto federal funding; too much federal power.',
			'Erie Canal and roads built mostly by states or private funding.',
			'**Missouri Compromise (1820)**',
			'Proposed by Henry Clay:',
			'  • Missouri = slave state, Maine = free state.',
			'  • 36°30′ line drawn to divide future free/slave territories.',
		]],
	},
	{
		key: '4.4',
		title: '4.4 – Expansion and Foreign Policy',
		bullets: [[
			'**Treaty of Ghent (1814)**',
			'Ended War of 1812, no clear victory, but helped define borders.',
			'**Rush-Bagot Agreement (1817)**',
			'U.S.-Canada border set at 49th parallel; Oregon shared for 10 years.',
			'**Florida and the Adams-Onís Treaty (1819)**',
			'Jackson invades Spanish Florida.',
			'Spain cedes Florida to U.S., western boundary of Louisiana Territory defined.',
			'**Monroe Doctrine (1823)**',
			'Asserted Western Hemisphere as U.S. sphere.',
			'Warned Europe to stay out of Latin America.',
			'**Increased Trade**',
			'With Latin America, China, and Mexico.',
		]],
	},
	{
		key: '4.5',
		title: '4.5 – The Market Revolution',
		bullets: [[
			'**Definition:** Linking of regions through economic specialization and transport.',
			'**Transportation Innovations**',
			'National Road (Cumberland Road).',
			'Erie Canal: Linked Midwest farms to NYC.',
			'Steamboats: Allowed 2-way river travel.',
			'Railroads: Became dominant transportation.',
			'**Industrial Innovations**',
			'Factory system: Mass production, began in textiles.',
			'Interchangeable parts by Eli Whitney.',
			'Patent laws protected inventors.',
			'**Agricultural Changes**',
			'Cotton gin: Increased demand for slave labor.',
			'Focus on cash crops.',
		]],
	},
	{
		key: '4.6',
		title: '4.6 – Market Revolution’s Effects & Migration',
		bullets: [[
			'**Immigration Surge**',
			'Irish: Escaped famine, settled in Northeast cities.',
			'Germans: Escaped political unrest, settled Midwest.',
			'**Urban Growth**',
			'Ethnic neighborhoods formed with cultural institutions (churches, synagogues).',
			'New communities along Ohio and Mississippi Rivers.',
			'**Nativist Backlash**',
			'Anti-Catholic, anti-immigrant sentiments.',
			'Stereotypes and xenophobia.',
			'**Emergence of Middle Class**',
			'Professionals (lawyers, journalists, merchants).',
			'Valued education, temperance, Protestant values.',
			'**Leisure and Culture**',
			'Plays, sports, circuses gained popularity.',
			'**Women in the Workforce**',
			'Lowell Mills: Women worked long hours under close supervision.',
			'**Cult of Domesticity**',
			'Idealized women as moral guardians of the home.',
			'Promoted separate spheres: men in public, women in private.',
		]],
	},
	{
		key: '4.7',
		title: '4.7 – Expanding Democracy',
		bullets: [[
			'**Causes**',
			'Panic of 1819: Led to economic crisis; people demanded more voice.',
			'Property qualifications for voting removed across states.',
			'**Effects**',
			'Universal white male suffrage expanded democracy.',
			'**Election of 1824**',
			'4 candidates split vote; Corrupt Bargain between Adams and Clay.',
			'Jacksonians felt betrayed, formed Democratic Party.',
		]],
	},
	{
		key: '4.8',
		title: '4.8 – Andrew Jackson and Federal Power',
		bullets: [[
			'**Democrats vs. Whigs**',
			'Democrats (Jackson): Local power, anti-bank, anti-tariff.',
			'Whigs (Clay): Federal infrastructure, tariffs, national bank.',
			'**Major Debates**',
			'Tariff of 1828: Southern anger led to Nullification Crisis.',
			'Bank War: Jackson vetoed recharter, viewed bank as corrupt elite tool.',
			'Internal Improvements: Democrats resisted; Whigs promoted it.',
			'**Indian Removal**',
			'Indian Removal Act (1830): Forced relocation westward.',
			'Worcester v. Georgia: Court ruled in favor of Cherokee.',
			'Trail of Tears: Forced march, thousands died.',
		]],
	},
	{
		key: '4.9',
		title: '4.9 – American Culture',
		bullets: [[
			'**From Enlightenment to Romanticism**',
			'Emphasis shifted to emotion, nature, and individualism.',
			'**Literature**',
			'James Fenimore Cooper: Romanticized frontier life.',
			'Washington Irving: Wrote whimsical folklore.',
			'Noah Webster: Standardized American English.',
			'**Art**',
			'Hudson River School: Landscapes expressing American spirit.',
			'**Philosophy**',
			'Transcendentalism: Emerson (individualism), Thoreau (simplicity).',
			'**Utopian Communities**',
			'Shakers: Celibate, communal property.',
			'Oneida: Shared property and marriage.',
		]],
	},
	{
		key: '4.10',
		title: '4.10 – Second Great Awakening',
		bullets: [[
			'**Causes**',
			'Market Revolution’s message of self-determination.',
			'Shift toward emotional religion (Romanticism).',
			'**Key Features**',
			'Emotional revivals, camp meetings.',
			'Preached personal responsibility and morality.',
			'Charles Finney: Prominent revivalist preacher.',
			'**Inclusivity**',
			'Welcomed poor, women, African Americans (enslaved/free).',
		]],
	},
	{
		key: '4.11',
		title: '4.11 – Religious Reform Movements',
		bullets: [[
			'**Mormons**',
			'Joseph Smith: Founded LDS Church, received Book of Mormon.',
			'Persecuted for polygamy.',
			'Brigham Young led migration to Utah.',
			'**Temperance**',
			'American Temperance Society: Targeted working men.',
			'Goal: Reduce alcohol consumption to increase productivity.',
			'**Abolitionism**',
			'Influenced by religion.',
			'William Lloyd Garrison: The Liberator, moral persuasion.',
			'Frederick Douglass: Former slave, powerful voice.',
			'**Women’s Rights**',
			'Seneca Falls Convention (1848).',
			'Led by Stanton and Mott.',
			'Drafted Declaration of Sentiments: Modeled after Declaration of Independence.',
		]],
	},
	{
		key: '4.12',
		title: '4.12 – Lives and Resistance of African Americans',
		bullets: [[
			'**Cultural Identity**',
			'Retained names, language, religion, folk stories.',
			'Created rich internal culture despite oppression.',
			'**Slave Rebellions**',
			'Haitian Revolution: Inspired hope for freedom.',
			'Nat Turner’s Rebellion (1831): Killed 57 whites, led to harsh retaliation.',
			'Amistad Mutiny: Africans won freedom in court.',
			'**White Reaction**',
			'Southern laws tightened:',
			'  • Illegal to teach enslaved people.',
			'  • Banned slave marriages.',
			'  • Literacy and legal rights restricted.',
		]],
	},
];

const APUSHUnit4StudyGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleTopic = (key: string) => {
    setOpenTopic(openTopic === key ? null : key);
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
          <h1 className="text-4xl font-bold text-blue-800">APUSH Unit 4: The Early Republic (1800–1848)</h1>
          <p className="text-lg text-slate-600 mt-2">Explore the key events, people, and concepts of the Early Republic era.</p>
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
            onClick={() => navigate('/apush-study-guide/unit/4/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-blue-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit4Content.map((topic) => (
                <div key={topic.key} className="border-b border-slate-200 last:border-b-0 pb-4">
                  <button
                    onClick={() => toggleTopic(topic.key)}
                    className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-blue-700">{topic.title}</h3>
                    <span className="text-2xl text-slate-500">{openTopic === topic.key ? '-' : '+'}</span>
                  </button>
                  {openTopic === topic.key && (
                    <div className="p-4 bg-slate-50 rounded-b-lg">
                      {(() => {
                        const items = topic.bullets[0];
                        const groupedItems = [];
                        let currentGroup: { heading: string; points: string[] } | null = null;

                        for (const item of items) {
                          if (item.startsWith('**') && item.endsWith('**')) {
                            if (currentGroup) {
                              groupedItems.push(currentGroup);
                            }
                            currentGroup = { heading: item, points: [] };
                          } else if (item === '') {
                            if (currentGroup) {
                              groupedItems.push(currentGroup);
                              currentGroup = null;
                            }
                          } else if (currentGroup) {
                            currentGroup.points.push(item);
                          }
                        }
                        if (currentGroup) {
                          groupedItems.push(currentGroup);
                        }

                        return groupedItems.map((group, i) => (
                          <div key={i} className="mb-4">
                            <h4
                              className="text-lg font-semibold text-blue-800"
                              dangerouslySetInnerHTML={{ __html: group.heading.replace(/\*\*(.*?)\*\*/g, '$1') }}
                            />
                            <ul className="mt-2 space-y-2 pl-5">
                              {group.points.map((point, j) => {
                                if (point.trim().startsWith('•')) {
                                  return (
                                    <li key={j} className="text-base text-slate-700 leading-relaxed">
                                      <ul className="list-disc pl-5">
                                        <li dangerouslySetInnerHTML={{ __html: point.trim().substring(1).trim() }} />
                                      </ul>
                                    </li>
                                  );
                                }
                                if (point.endsWith(':')) {
                                  return (
                                    <p key={j} className="font-semibold mt-2 text-slate-700" dangerouslySetInnerHTML={{ __html: point }} />
                                  );
                                }
                                return (
                                  <li key={j} className="text-base text-slate-700 leading-relaxed list-disc" dangerouslySetInnerHTML={{ __html: point }} />
                                );
                              })}
                            </ul>
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="relative border-l-4 border-blue-200 ml-4 pl-8 space-y-12">
              {timelineDataUnit4.map((event) => (
                <div key={event.key} className="relative">
                  <div className="absolute -left-11 -top-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-md">
                    {event.icon}
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl shadow-md">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">{event.title}</h3>
                    <p className="text-lg text-slate-600 mb-4">{event.summary}</p>
                    <ul className="space-y-2 list-disc pl-5">
                      {event.details.map((detail, index) => (
                        <li key={index} className="text-base text-slate-700" dangerouslySetInnerHTML={{ __html: detail.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      ))}
                    </ul>
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

export const timelineDataUnit4 = [
    {
      key: '1800',
      icon: '🗳️',
      title: '1800 – Revolution of 1800',
      summary: 'Thomas Jefferson is elected president, marking the first peaceful transfer of power between political parties.',
      details: [
        'The election exposed flaws in the Constitution, leading to the 12th Amendment.',
        'Jefferson’s presidency ushered in an era of Democratic-Republican dominance.',
      ],
    },
    {
      key: '1803',
      icon: '🏞️',
      title: '1803 – Louisiana Purchase',
      summary: 'The U.S. purchases the Louisiana Territory from France, doubling the size of the country.',
      details: [
        'The purchase was controversial, as it was not explicitly authorized by the Constitution.',
        'It opened up vast new lands for settlement and expansion.',
      ],
    },
    {
      key: '1812',
      icon: '⚔️',
      title: '1812 – War of 1812',
      summary: 'A conflict between the U.S. and Great Britain over issues of trade, impressment, and territorial expansion.',
      details: [
        'The war ended in a stalemate, but it fostered a sense of national unity and patriotism.',
        'The Battle of New Orleans, fought after the war was officially over, made Andrew Jackson a national hero.',
      ],
    },
    {
      key: '1820',
      icon: '📜',
      title: '1820 – Missouri Compromise',
      summary: 'A compromise that admitted Missouri as a slave state and Maine as a free state, maintaining the balance of power in the Senate.',
      details: [
        'It also prohibited slavery in the northern part of the Louisiana Purchase territory.',
        'The compromise temporarily resolved the issue of slavery’s expansion, but it highlighted the growing sectional tensions.',
      ],
    },
    {
      key: '1823',
      icon: '🌎',
      title: '1823 – Monroe Doctrine',
      summary: 'A foreign policy statement that declared the Western Hemisphere off-limits to further European colonization.',
      details: [
        'It was a bold assertion of American influence in the region.',
        'The doctrine would be used to justify U.S. intervention in Latin America in the future.',
      ],
    },
    {
      key: '1830',
      icon: '😢',
      title: '1830 – Indian Removal Act',
      summary: 'A law that authorized the forced removal of Native American tribes from their ancestral lands in the Southeast.',
      details: [
        'The act led to the Trail of Tears, in which thousands of Cherokees died during their forced march to Oklahoma.',
        'It was a brutal example of the government’s policy of westward expansion and Native American displacement.',
      ],
    },
    {
      key: '1845',
      icon: '⭐️',
      title: '1845 – Manifest Destiny',
      summary: 'The belief that the U.S. was destined to expand across the continent, from the Atlantic to the Pacific.',
      details: [
        'It fueled westward expansion, the annexation of Texas, and the Mexican-American War.',
        'It also had a profound impact on Native Americans and other groups who stood in the way of American expansion.',
      ],
    },
    {
      key: '1848',
      icon: '🇲🇽',
      title: '1848 – Treaty of Guadalupe Hidalgo',
      summary: 'The treaty that ended the Mexican-American War and ceded vast territories to the U.S.',
      details: [
        'The U.S. acquired California, Nevada, Utah, Arizona, and parts of New Mexico, Colorado, and Wyoming.',
        'The treaty reignited the debate over the expansion of slavery into the new territories.',
      ],
    },
  ];

export default APUSHUnit4StudyGuide;