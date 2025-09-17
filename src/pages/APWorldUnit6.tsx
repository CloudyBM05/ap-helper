import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Replace unit6Content with a more detailed, AP World Unit 5-style format for Unit 6
const unit6Content = [
  {
    key: '6.1',
    title: '6.1 – IDEAS that Justified IMPERIALISM',
    bullets: [
      '<strong>New Imperialism Context</strong>',
      '<ul><li>Previous era focused on Americas and Indian Ocean trade.</li><li>Industrial Revolution sparked a new wave of imperialism in late 19th century.</li><li>Traditional motives (God, Gold, Glory) persisted but were supplemented by new ideological justifications.</li></ul>',
      '<strong>Four Major Ideologies Justifying Imperialism</strong>',
      '<ul><li><u>Nationalism:</u> Loyalty shifted from rulers to nations defined by shared language, religion, customs.</li><li>Nationalistic pride fueled imperial competition—colonies were seen as proof of national superiority.</li><li>National unifications (Italy, Germany) fueled imperial ambitions.</li><li>Imperialism became a rivalry to expand territory as a mark of national greatness.</li></ul>',
      '<ul><li><u>Scientific Racism:</u> Attempt to classify humans hierarchically by race using pseudoscience.</li><li>Shifted "us vs. them" from religious (Christian vs. heathen) to racial categories.</li><li>Phrenology (skull measurement) used to "prove" white superiority.</li><li>Justified domination and colonization of "child races" as natural and scientific.</li></ul>',
      '<ul><li><u>Social Darwinism:</u> Applied Darwin’s theory of natural selection to human societies.</li><li>Claimed “fittest” societies (industrial Western powers) were destined to dominate weaker ones.</li><li>Justified imperial conquest as “survival of the fittest” on a national scale.</li></ul>',
      '<ul><li><u>Civilizing Mission:</u> Belief Western societies had a duty to civilize "backward" peoples.</li><li>Efforts included Christian missionary work, imposition of Western education, governance.</li><li>Aimed at suppressing indigenous cultures and languages to “improve” colonized societies.</li></ul>'
    ]
  },
  {
    key: '6.2',
    title: '6.2 – How IMPERIAL States EXPANDED, 1750-1900',
    bullets: [
      '<strong>Geographical Shift in Imperialism</strong>',
      '<ul><li>1450-1750: Focus on Americas, Asia, and Southeast Asia; Africa mainly coastal trading posts.</li><li>1750-1900: Focus shifted to interior Africa, Asia, and SE Asia; Americas less central.</li></ul>',
      '<strong>Changing Imperial Powers</strong>',
      '<ul><li>Spain and Portugal’s influence waned.</li><li>Britain, France, and the Netherlands remained important.</li><li>New imperial powers emerged: Germany, Italy, Belgium, U.S., Japan.</li></ul>',
      '<strong>Private to State Control</strong>',
      '<ul><li>Early colonies often controlled by private companies (e.g., British East India Company, Dutch East India Company).</li><li>Governments took over private colonies to exert direct control.</li><li>Example: King Leopold II’s private control over Congo Free State led to brutal exploitation.</li><li>Belgian government took Congo from Leopold in 1908 after public outrage.</li></ul>',
      '<strong>Diplomacy & Warfare in Africa</strong>',
      '<ul><li>Berlin Conference (1884-85): European powers divided Africa without African input. Borders ignored ethnic groups, creating future conflicts.</li><li>Some expansions via warfare (e.g., France in Algeria): Algeria invaded after ruler assaulted French diplomat.</li><li>Despite resistance, France expanded territory through military force.</li></ul>',
      '<strong>Settler Colonies</strong>',
      '<ul><li>Imperial powers sent settlers to already inhabited lands to establish new societies.</li><li>Examples: British 13 colonies (earlier period), Australia and New Zealand in late 19th century.</li><li>Resulted in displacement and disease decimating indigenous populations (Aborigines, Maori).</li></ul>',
      '<strong>Conquering Neighboring Territories</strong>',
      '<ul><li>U.S.: Manifest Destiny drove westward expansion, displacing Native Americans forcibly (reservations, assimilation).</li><li>Russia: Pan-Slavism fueled territorial expansion into Central Asia and Far East.</li><li>Japan: Rapid Meiji industrialization enabled imperial expansion over Korea, Manchuria, parts of China.</li></ul>'
    ]
  },
  {
    key: '6.3',
    title: '6.3 – How Indigenous People RESISTED Imperial Expansion',
    bullets: [
      '<strong>Causes of Resistance</strong>',
      '<ul><li>Western education and Enlightenment ideas (popular sovereignty, social contract) inspired educated colonized people to question imperial authority.</li><li>Indigenous nationalism grew in response to cultural imposition.</li></ul>',
      '<strong>Direct Resistance</strong>',
      '<ul><li>Armed conflicts against imperial powers.</li><li>Yaa Asantewaa War (Asante Kingdom, West Africa): British sought control of gold-rich Asante territory.</li><li>Asante’s Queen Mother Yaa Asantewaa led rebellion to protect cultural symbol—the Golden Stool.</li><li>Despite bravery, British military superiority led to Asante defeat.</li></ul>',
      '<strong>Creation of New States (Assimilation & Forced Relocation)</strong>',
      '<ul><li>Cherokee Nation (U.S.): Attempted cultural assimilation to avoid removal.</li><li>Indian Removal Act (1835) forcibly relocated Cherokee to Oklahoma.</li><li>Established semi-autonomous governance in new territory.</li><li>Later marginalization as U.S. expanded westward.</li></ul>',
      '<strong>Religious Rebellions</strong>',
      '<ul><li>Ghost Dance Movement (North America): Native American spiritual movement promising return to ancestral ways and removal of colonizers.</li><li>Xhosa Cattle Killing Movement (South Africa): Xhosa prophet Nongqawuse claimed killing cattle would lead to ancestors rising and driving out British.</li><li>Resulted in massive cattle slaughter and famine.</li><li>Weakened Xhosa resistance and eased British colonization.</li></ul>'
    ]
  },
  {
    key: '6.4',
    title: '6.4 – Global ECONOMIC Changes from 1750-1900',
    bullets: [
      '<strong>Development of Export Economies</strong>',
      '<ul><li>Imperial powers transformed many colonies from subsistence farming to export economies focused on raw materials or cash crops.</li><li>Export economies served imperial industrial needs, providing resources like copper, cotton, rubber, gold, and diamonds.</li><li>Colonized peoples shifted from diverse food production to mono-crop or resource extraction for foreign markets.</li></ul>',
      '<strong>Causes of Economic Development</strong>',
      '<ul><li>Industrial factories needed raw materials, motivating imperial powers to reorganize colonies.</li><li>Examples: Egypt and India became major cotton exporters after U.S. Civil War disrupted global cotton supply.</li><li>West Africa’s palm oil was essential for soap and industrial lubrication, leading to plantation exploitation.</li><li>Guano extraction on Pacific and Atlantic islands provided fertilizer for industrial agriculture.</li><li>Growing urban populations in industrial countries increased demand for food imports, encouraging colonies to produce cash crops like sugar and coffee.</li><li>Argentina and Brazil developed industrial-scale ranching to satisfy global meat demand.</li></ul>',
      '<strong>Effects of Economic Development</strong>',
      '<ul><li>Export profits were used by colonies to buy finished manufactured goods from imperial powers.</li><li>Colonial economies became tightly integrated into global trade networks dominated by imperial powers.</li><li>Colonies became captive markets for industrial goods, leading to economic dependence.</li><li>Indigenous peoples became increasingly dependent on imperial economies, often losing self-sufficiency.</li></ul>'
    ]
  },
  {
    key: '6.5',
    title: '6.5 – Economic Imperialism, Explained',
    bullets: [
      '<strong>Economic Imperialism</strong>',
      '<ul><li>A cheaper alternative to direct colonization, using economic control to dominate weaker states.</li></ul>',
      '<strong>Opium Wars (Britain & France vs. China)</strong>',
      '<ul><li>China remained a major power but failed to industrialize, leaving it vulnerable.</li><li>China restricted foreign trade to Canton port, causing trade imbalances favoring China.</li><li>Britain illegally exported addictive opium from India to China to balance trade, creating widespread addiction.</li><li>China banned opium imports and destroyed shipments, provoking British military retaliation (First Opium War).</li><li>Britain defeated China and imposed the Treaty of Nanjing (unequal treaty opening ports and granting economic concessions).</li><li>Taiping Rebellion weakened Qing dynasty further; Qing crushed it at great cost.</li><li>British and French launched Second Opium War, forcing further concessions.</li><li>China was carved into spheres of influence by European powers, Russia, and Japan—economic domination without formal colonization.</li></ul>',
      '<strong>Port of Buenos Aires</strong>',
      '<ul><li>British investments modernized Argentina’s infrastructure, including railroads and port facilities.</li><li>Port built near British interests increased Argentine exports to Britain, deepening economic dependence.</li></ul>',
      '<strong>Trade in Commodities</strong>',
      '<ul><li>Colonial economies reorganized to focus on a few commodities for imperial powers.</li><li>Examples: Cotton (India, Egypt), Palm Oil (Sub-Saharan Africa).</li><li>Commodities trade enriched imperial centers but disadvantaged colonial producers.</li></ul>'
    ]
  },
  {
    key: '6.6',
    title: '6.6 – CAUSES of MIGRATION from 1750-1900',
    bullets: [
      '<strong>Environmental & Demographic Causes</strong>',
      '<ul><li>Population boom in Europe due to improved medicine and diets.</li><li>Rural populations pushed off land due to mechanized farming, increasing urban migration.</li><li>Famines (e.g., Irish Potato Famine) caused mass deaths and emigration.</li></ul>',
      '<strong>Technological Causes</strong>',
      '<ul><li>Railroads and steamships made migration easier, cheaper, and faster.</li><li>Migrants moved to industrial urban centers in imperial and colonial regions.</li><li>Some migrants traveled back and forth thanks to improved transport (e.g., Lebanese merchants to South America).</li></ul>',
      '<strong>Economic Causes</strong>',
      '<ul><li>Voluntary migration: People moved seeking jobs and better opportunities (e.g., Irish, Italian, German to U.S. east coast; Chinese to U.S. west coast railroads).</li><li>Coerced & Semi-Coerced labor: Atlantic slave trade continued early in period, though gradually abolished.</li><li>Convict labor sent to penal colonies like British Australia and French Guiana.</li><li>Indentured servitude contracts forced laborers to work for several years in exchange for passage, filling labor shortages.</li><li>Indian indentured servants sent to Caribbean, Africa, SE Asia.</li><li>Chinese indentured workers sent to Malaysian tin mines.</li></ul>'
    ]
  },
  {
    key: '6.7',
    title: '6.7 – The EFFECTS of MIGRATION',
    bullets: [
      '<strong>Effect #1: Gender Imbalance</strong>',
      '<ul><li>Majority migrants were men, leaving home societies with disproportionate numbers of women.</li><li>Women assumed traditionally male roles, especially in subsistence farming.</li><li>Example: In South Africa, 60% of households were female-led.</li><li>Some women gained financial independence by selling crops.</li><li>Cultural shifts accompanied changes in family structures.</li></ul>',
      '<strong>Effect #2: Ethnic Enclaves</strong>',
      '<ul><li>Migrants clustered in ethnic neighborhoods within foreign cities.</li><li>Enclaves preserved language, religion, cultural traditions.</li><li>Provided familiarity and support networks.</li><li>Promoted cultural diffusion into host societies.</li><li>Examples: Indians in Mauritius and Natal maintaining Hindu and Muslim practices. Irish enclaves boosted Catholic presence in predominantly Protestant U.S. Chinese enclaves in SE Asia became important economic players.</li></ul>',
      '<strong>Effect #3: Nativism</strong>',
      '<ul><li>Native-born populations often reacted with hostility to immigrants.</li><li>Rooted in racial, ethnic prejudice and fear of cultural difference.</li><li>Immigrants marginalized despite their economic contributions.</li><li>Examples: Irish in U.S. faced discrimination and political marginalization.</li></ul>',
      '<strong>Government Policies Restricting Immigration</strong>',
      '<ul><li>Chinese Exclusion Act (U.S.): Passed due to anti-Chinese riots and violence. Banned all Chinese immigration.</li><li>White Australia Policy: British government policy to restrict Asian immigration. Aimed to maintain Australia’s “white” British identity.</li></ul>'
    ]
  }
];

const timelineData = [
    {
        key: 'industrial-revolution-spreads',
        icon: '🛠️',
        title: 'Industrial Revolution Spreads – 1750s–1900',
        summary: 'Originated in Great Britain, then spread to Europe, the U.S., Russia, and Japan.',
        details: [
            'Powered by coal, steam, and later oil and electricity.',
            'Created demand for raw materials and new markets, fueling imperialism.'
        ],
    },
    {
        key: 'british-raj',
        icon: '🌍',
        title: 'British Raj in India Begins – 1858',
        summary: 'Following the Sepoy Mutiny (1857), Britain takes direct control of India.',
        details: [
            'Marks shift from British East India Company rule to British Crown governance.',
            'India becomes the “jewel in the crown” of the British Empire.'
        ],
    },
    {
        key: 'expansion-global-capitalism',
        icon: '📈',
        title: 'Expansion of Global Capitalism – 1800s',
        summary: 'Global trade networks expanded to meet industrial demand.',
        details: [
            'Export economies developed: cotton in Egypt, rubber in Congo, guano in Peru.',
            'Rise of banking, transnational corporations (e.g., HSBC), and stock exchanges.'
        ],
    },
    {
        key: 'opium-wars',
        icon: '⚔️',
        title: 'Opium Wars – 1839–1842, 1856–1860',
        summary: 'Britain forced China to import opium, leading to two wars.',
        details: [
            'Resulted in unequal treaties like the Treaty of Nanjing.',
            'Opened Chinese ports to European control and weakened Qing authority.'
        ],
    },
    {
        key: 'transcontinental-railroads',
        icon: '🚂',
        title: 'Completion of Transcontinental Railroads – Mid–Late 1800s',
        summary: 'U.S., Russia, and Canada built massive rail systems.',
        details: [
            'Enabled faster resource extraction and settler migration.',
            'Railroads were often built by coerced or migrant laborers.'
        ],
    },
    {
        key: 'berlin-conference',
        icon: '🧪',
        title: 'Berlin Conference – 1884–1885',
        summary: 'European powers divided Africa with no African input.',
        details: [
            'Justified through Social Darwinism and "civilizing missions."',
            'Ignited the "Scramble for Africa" and set colonial boundaries.'
        ],
    },
    {
        key: 'zulu-resistance',
        icon: '🏴‍☠️',
        title: 'Zulu Resistance / Anglo-Zulu War – 1879',
        summary: 'Zulu Kingdom resisted British imperialism in Southern Africa.',
        details: [
            'Despite initial victories, the British ultimately defeated the Zulu.',
            'Example of African resistance to European imperial conquest.'
        ],
    },
    {
        key: 'meiji-restoration',
        icon: '📜',
        title: 'Meiji Restoration – 1868',
        summary: 'Japan rapidly industrialized and modernized to resist Western domination.',
        details: [
            'Adopted Western military, technology, and government systems.',
            'Transformed Japan into an imperial power by the early 20th century.'
        ],
    },
    {
        key: 'migration-laborers',
        icon: '📦',
        title: 'Migration of Laborers – 1800s',
        summary: 'Millions migrated for work, often under indentured contracts.',
        details: [
            'Chinese and Indian laborers sent to Southeast Asia, the Caribbean, and Africa.',
            'Enclaves formed; cultural diffusion occurred in host societies.'
        ],
    },
    {
        key: 'boxer-rebellion',
        icon: '🛡️',
        title: 'Boxer Rebellion – 1899–1901',
        summary: 'Anti-foreign and anti-Christian uprising in China.',
        details: [
            'Suppressed by an international coalition (including U.S., Japan, Britain).',
            'Demonstrated Qing weakness and increased foreign control in China.'
        ],
    }
];

// Utility to parse HTML bullet structure into JSX
const parseBullets = (bullets: string[]) => {
    const result: React.ReactNode[] = [];
    let currentHeader: string | null = null;
    let currentList: string[] = [];

    const flush = () => {
        if (currentHeader) {
            result.push(
                <div key={currentHeader + Math.random()} className="font-semibold text-green-700 mb-1 text-base" dangerouslySetInnerHTML={{ __html: currentHeader }} />
            );
            currentHeader = null;
        }
        if (currentList.length > 0) {
            result.push(
                <ul key={Math.random()} className="list-disc pl-6 space-y-1">
                    {currentList.map((item, idx) => (
                        <li key={idx} className="text-slate-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                </ul>
            );
            currentList = [];
        }
    };

    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        const headerMatch = bullet.match(/^<strong>(.*?)<\/strong>$/);
        const listMatch = bullet.match(/^<ul>([\s\S]*)<\/ul>$/);
        if (headerMatch) {
            flush();
            currentHeader = headerMatch[1];
        } else if (listMatch) {
            currentList.push(listMatch[1]);
        } else {
            flush();
            result.push(
                <div key={bullet + Math.random()} className="font-semibold text-green-700 mb-1 text-base" dangerouslySetInnerHTML={{ __html: bullet }} />
            );
        }
    }
    flush();
    return result;
};

const APWorldUnit6: React.FC = () => {
    const [openTopic, setOpenTopic] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('topics');
    const navigate = useNavigate();
    const location = useLocation();

    const toggleTopic = (key: string) => {
        setOpenTopic(openTopic === key ? null : key);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
                <button
                    onClick={() => navigate('/ap-world-study-guide')}
                    className="mb-6 px-4 py-2 rounded-lg bg-white text-green-700 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Units
                </button>
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-green-800">AP World Unit 6: Consequences of Industrialization (c. 1750–1900)</h1>
                    <p className="text-lg text-slate-600 mt-2">Imperialism, migration, and global economic changes.</p>
                </div>
                {/* Tabs */}
                <div className="flex justify-center border-b-2 border-slate-200 mb-8">
                    <button
                        onClick={() => setActiveTab('topics')}
                        className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'topics' ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
                    >
                        Key Topics
                    </button>
                    <button
                        onClick={() => setActiveTab('timeline')}
                        className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'timeline' ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
                    >
                        Timeline
                    </button>
                    <button
                        onClick={() => navigate('/ap-world-study-guide/unit/6/quiz')}
                        className={`px-6 py-3 font-semibold text-lg transition-colors ${location.pathname === '/ap-world-study-guide/unit/6/quiz' ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
                    >
                        Take Quiz
                    </button>
                </div>
                {/* Content */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    {activeTab === 'topics' && (
                        <div className="space-y-4">
                            {unit6Content.map((topic) => (
                                <div key={topic.key} className="border-b border-slate-200 last:border-b-0 pb-4">
                                    <button
                                        onClick={() => toggleTopic(topic.key)}
                                        className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
                                    >
                                        <h3 className="text-xl font-semibold text-green-700">{topic.title}</h3>
                                        <span className="text-2xl text-slate-500">{openTopic === topic.key ? '-' : '+'}</span>
                                    </button>
                                    {openTopic === topic.key && (
                                        <div className="p-4 bg-slate-50 rounded-b-lg">
                                            <div className="space-y-3">
                                                {parseBullets(topic.bullets)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'timeline' && (
                        <div className="relative border-l-4 border-green-200 ml-4 pl-8 space-y-12">
                            {timelineData.map((event) => (
                                <div key={event.key} className="relative">
                                    <div className="absolute -left-11 -top-1 w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white text-2xl shadow-md">
                                        {event.icon}
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-xl shadow-md">
                                        <h3 className="text-2xl font-bold text-green-800 mb-2">{event.title}</h3>
                                        <p className="text-lg text-slate-600 mb-2">{event.summary}</p>
                                        {event.details.length > 0 && (
                                            <ul className="space-y-2 list-disc pl-5">
                                                {event.details.map((detail, index) => (
                                                    <li key={index} className="text-base text-slate-700" dangerouslySetInnerHTML={{ __html: detail }} />
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

export default APWorldUnit6;
