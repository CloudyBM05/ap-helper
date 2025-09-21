import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const unit5Content = [
    {
        key: '5.1',
        title: '5.1 – The Enlightenment',
        bullets: [
            '<ul><li>Intellectual movement applying rationalism and empiricism to understand nature and human society.</li><li>Built on the Scientific Revolution (16th-17th centuries), which rejected religious dogma in favor of reason and experimentation.</li><li>Enlightenment thinkers applied scientific methods to human society and politics, questioning the role of religion in governance.</li></ul>',
            '<strong>Deism</strong>',
            '<ul><li>Belief in a God who created the universe but does not intervene. Popular among Enlightenment thinkers.</li></ul>',
            '<strong>Atheism</strong>',
            '<ul><li>Complete rejection of religious belief also emerged.</li></ul>',
            '<strong>Political Ideas</strong>',
            '<ul><li><u>Individualism:</u> Society’s basic unit is the individual, not groups.</li><li><u>Natural Rights:</u> Humans born with rights (life, liberty, property) that governments must protect (Locke).</li><li><u>Social Contract:</u> Governments exist by consent of the governed and can be overthrown if tyrannical.</li></ul>',
            '<strong>Effects</strong>',
            '<ul><li>Ideological foundation for American, French, Haitian, and Latin American revolutions.</li><li>Spread nationalism—shared language, religion, customs create common identity and desire for self-rule.</li><li>Expansion of suffrage: gradual extension of voting rights from propertied white males to black males.</li><li>Abolitionism: Critique of slavery’s denial of natural rights led to abolition movements, e.g., Britain abolished slavery in 1807.</li><li>Peasant revolts and end of serfdom in Europe as industrial economies grew.</li><li>Women’s rights movements: Feminists like Olympe de Gouges demanded voting rights; 1848 Seneca Falls Convention marked early organized suffrage efforts.</li></ul>'
        ]
    },
    {
        key: '5.2',
        title: '5.2 – Revolutions',
        bullets: [
            '<strong>Causes</strong>',
            '<ul><li><u>Rise of Nationalism:</u> People with shared ethnicity, language, religion seek self-rule, disrupting multi-ethnic empires.</li><li>Governments sometimes used nationalism to unify but it often spurred counter-nationalism (e.g., Poland under Russia).</li><li><u>Political dissent:</u> widespread rejection of monarchies and empires; rebellions (Safavid decline, Wahhabi reform movement).</li></ul>',
            '<strong>New ideologies</strong>',
            '<ul><li>Popular sovereignty, democracy, liberalism emphasizing civil rights, representative government, economic freedom.</li></ul>',
            '<strong>Atlantic Revolutions</strong>',
            '<ul><li><u>American Revolution (1776):</u> Colonies resisted British taxes; Enlightenment principles (natural rights, social contract) shaped the Declaration of Independence; U.S. independence in 1783.</li><li><u>French Revolution (1789):</u> Inspired by American success; overthrew monarchy amid financial crisis; Declaration of the Rights of Man emphasized natural rights and popular sovereignty.</li><li><u>Haitian Revolution (1791):</u> Enslaved Africans in French colony inspired by liberty and equality; led by Toussaint Louverture; created first black republic in the Americas.</li><li><u>Latin American Revolutions:</u> Creoles (Europeans born in Americas) led independence movements during Napoleonic wars; Simon Bolivar emphasized Enlightenment ideals; new republican governments formed.</li></ul>',
            '<strong>Other nationalist movements</strong>',
            '<ul><li>Philippines’ Propaganda Movement pushed for reforms and education, leading to revolution.</li><li>Unification of Italy and Germany through nationalist-inspired military and diplomatic efforts.</li></ul>'
        ]
    },
    {
        key: '5.3',
        title: '5.3 – Industrial Revolution',
        bullets: [
            '<ul><li>Transition from agrarian to industrial economies; machine-made goods replace handcrafts.</li></ul>',
            '<strong>Why Britain?</strong>',
            '<ul><li>Abundant waterways for transport.</li><li>Large deposits of coal and iron fueled machines and construction.</li><li>Access to raw materials from empire (cotton from India, timber from North America).</li><li>Agricultural revolution increased food production (crop rotation, seed drill) and population growth.</li><li>Urbanization: Migration from countryside to cities for factory jobs.</li><li>Legal protections encouraged entrepreneurs to invest in industry.</li><li>Capital accumulation from slave trade wealth funded industrial ventures.</li><li>Factory system: Concentrated production, specialized labor, mechanized textile production with inventions like the spinning jenny.</li></ul>'
        ]
    },
    {
        key: '5.4',
        title: '5.4 – Spread of Industrialization',
        bullets: [
            '<ul><li>Steam power freed factories from waterways, enabling location flexibility and faster transport (steamships, railroads).</li><li>Global economies divided into industrialized (Britain, U.S., France) and non-industrialized (Middle East, Asia) regions.</li><li>Decline of traditional manufacturing in places like India and Egypt due to British mass-produced textiles.</li></ul>',
            '<strong>Countries</strong>',
            '<ul><li><u>France:</u> Slower industrialization but government supported canals, railroads, and textiles; avoided some social upheaval seen in Britain.</li><li><u>U.S.:</u> Rapid post-Civil War industrialization due to resources, stability, and population growth; high living standards.</li><li><u>Russia:</u> State-driven industrialization with railroads (Trans-Siberian), harsh labor conditions, leading to unrest.</li><li><u>Japan:</u> Meiji Restoration state-led industrialization borrowing Western tech; rapidly became regional power.</li></ul>'
        ]
    },
    {
        key: '5.5',
        title: '5.5 – Technology of Industrial Age',
        bullets: [
            '<ul><li><u>First Industrial Revolution (1750-1830):</u> Centered in Britain; powered by coal and steam engine (James Watt).</li><li>Steam engines powered factories, locomotives, steamships, transforming production and transportation.</li><li><u>Suez Canal (1869):</u> Shortened Europe-Asia route, expanding steamship trade.</li><li><u>Second Industrial Revolution (1870-1914):</u> Spread to Europe, U.S., Russia, Japan.</li><li>New fuels: oil and internal combustion engine enabled automobiles.</li></ul>',
            '<strong>Technological advances</strong>',
            '<ul><li><u>Steel:</u> Bessemer process created cheap, strong steel for construction and machines.</li><li><u>Chemical engineering:</u> Synthetic dyes and vulcanized rubber.</li><li><u>Electricity:</u> Light bulbs, electric streetcars, subways revolutionized cities.</li><li><u>Telegraph:</u> Instant communication across continents (Morse code, transatlantic cable).</li></ul>',
            '<strong>Effects</strong>',
            '<ul><li>Development of interior regions away from coasts via railroads.</li><li>Massive increase in global trade (10x from 1850-1913).</li><li>Large-scale migration from rural to urban areas and overseas (Europeans to Americas, Australia, South Africa).</li></ul>'
        ]
    },
    {
        key: '5.6',
        title: '5.6 – Government Sponsored Industrialization',
        bullets: [
            '<ul><li><u>Defensive Industrialization:</u> Some non-Western states pursued limited industrialization to avoid domination by industrial powers.</li></ul>',
            '<strong>Egypt (Ottoman-controlled)</strong>',
            '<ul><li>Egypt operated semi-independently with a strong military government under Muhammed Ali.</li><li>Ottoman Empire was in decline, with internal corruption and limited resources for industrialization.</li><li><u>Muhammed Ali initiated industrial reforms:</u> Built textile and weapons factories, directed peasants to grow cash crops (wheat, cotton) for export, implemented tariffs to protect nascent industries.</li><li><u>However, Britain intervened when Egypt fought the Ottomans in 1839:</u> Forced Egypt to remove tariffs, British manufactured goods flooded Egypt, crippling local industries.</li></ul>',
            '<strong>Japan</strong>',
            '<ul><li>Initially isolated with only limited Dutch trade.</li><li>Threatened by Western imperialism, especially after the U.S. Commodore Matthew Perry’s 1853 arrival with steam-powered warships.</li><li>Overthrew the shogunate in 1868; restored the emperor under the Meiji Restoration.</li><li>Aggressive, state-led industrialization program aimed to modernize to resist Western domination.</li><li>Borrowed technology, education systems, and political ideas wholesale from the West, especially Germany.</li><li>Created railroads, banking systems, and industrial factories (textiles, munitions).</li><li>By late 19th century, Japan became a major industrial power in Asia, able to negotiate on equal terms with Western powers.</li></ul>'
        ]
    },
    {
        key: '5.7',
        title: '5.7 – Economics of Industrial Revolution',
        bullets: [
            '<strong>Decline of Mercantilism</strong>',
            '<ul><li><u>Mercantilism:</u> state-controlled economic system fueling exploration and imperialism.</li><li>Replaced by free market economics, driven by supply and demand rather than state control.</li><li>Adam Smith’s Wealth of Nations (1776) criticized mercantilism; advocated laissez-faire economics and the "invisible hand" guiding markets.</li><li>After 1815, many Western governments reduced trade regulations, increasing global commerce.</li></ul>',
            '<strong>Critiques of Free Market</strong>',
            '<ul><li>Critics noted free markets often caused harsh conditions for the working class.</li><li>Jeremy Bentham argued for government intervention to improve workers’ lives.</li><li>Friedrich List opposed free trade globally, promoting protectionism to support national industries.</li><li>His ideas led to the Zollverein, a German customs union lowering internal tariffs but raising external ones.</li></ul>',
            '<strong>Transnational Corporations</strong>',
            '<ul><li>Companies headquartered in one country but with operations worldwide.</li><li><u>Examples:</u> Hong Kong and Shanghai Banking Corporation (HSBC): Founded 1865 to finance British imperial ventures, including opium trade. Unilever: Anglo-Dutch company producing consumer goods like soap, sourcing raw materials from colonies in Africa.</li><li>Relied on advances in banking and stock markets to raise capital.</li><li><u>Stock Markets:</u> Enabled corporations to raise money by selling shares; shareholders gained profits but had limited liability.</li></ul>',
            '<strong>Effects of Industrial Capitalism</strong>',
            '<ul><li>Western industrialized nations grew far richer by 1900.</li><li>Rise in standard of living and access to consumer goods.</li><li>Creation of a new, wealthy middle class able to afford mass-produced goods.</li><li>Mechanized farming improved food variety and availability, increasing life expectancy.</li></ul>'
        ]
    },
    {
        key: '5.8',
        title: '5.8 – Reactions',
        bullets: [
            '<strong>Calls for Reform</strong>',
            '<ul><li>Harsh working conditions, long hours, and low wages spurred demands for reforms.</li></ul>',
            '<strong>Political Reform</strong>',
            '<ul><li>Expansion of suffrage allowed working class votes.</li><li>Rise of mass political parties representing labor interests.</li><li>Conservatives and liberals incorporated social reforms to appeal to the new electorate.</li></ul>',
            '<strong>Social Reform</strong>',
            '<ul><li>Working class formed mutual aid societies for sickness insurance and social events.</li></ul>',
            '<strong>Educational Reform</strong>',
            '<ul><li>From 1870 to 1914, many European countries passed compulsory schooling laws for children aged 6-12.</li><li>Education prepared youth for technical, specialized jobs.</li></ul>',
            '<strong>Urban Reform</strong>',
            '<ul><li>Rapid urbanization caused overcrowding and poor sanitation.</li><li>Governments invested in sewers and sanitation infrastructure, though often led to pollution of water bodies.</li></ul>',
            '<strong>Rise of Labor Unions</strong>',
            '<ul><li>Groups of workers banded together to protect interests.</li><li>Initially illegal, unions gained power to negotiate better wages, hours, and conditions.</li><li>By late 19th century, millions joined unions in Britain, Germany, and the U.S.</li><li>Some unions evolved into political parties, e.g., the German Social Democratic Party advocating Marxist reforms.</li></ul>',
            '<strong>Ideological Reactions - Marxism</strong>',
            '<ul><li><u>Karl Marx:</u> Criticized capitalism for creating a stark class divide between bourgeoisie (owners) and proletariat (workers). Predicted inevitable proletariat revolution leading to a classless society. Co-authored Communist Manifesto (1848) introducing “scientific socialism.” Viewed history as driven by class struggle exacerbated by industrialization.</li></ul>',
            '<strong>China Attempts Industrialization</strong>',
            '<ul><li>Qing Dynasty resisted British trade demands, leading to Opium Wars.</li><li>Defeated by British industrial power; forced into unequal treaties opening ports.</li><li>Western powers carved China into spheres of influence.</li><li><u>Self-Strengthening Movement:</u> Reforms to modernize industry and military; hindered by conservative resistance.</li><li>Defeat by Japan in Sino-Japanese War showed failure of reforms.</li></ul>',
            '<strong>Ottoman Modernization</strong>',
            '<ul><li>Known as "Sick Man of Europe" by mid-19th century due to losses and weak economy.</li><li><u>Began Tanzimat Reforms:</u> Built textile factories, introduced Western-style laws, courts, and secular education.</li><li>Emergence of Young Ottomans demanding constitutional government.</li><li>Sultan briefly accepted constitution (1876) but revoked it during war tensions.</li><li>Reforms better than China’s but insufficient to prevent empire’s decline.</li></ul>'
        ]
    },
    {
        key: '5.9',
        title: '5.9 – Society / Changes',
        bullets: [
            '<strong>New Social Classes</strong>',
            '<ul><li><u>Industrial Working Class:</u> Former rural farmers and artisans turned unskilled factory and mine workers. Viewed as interchangeable parts by managers due to repetitive, unskilled labor. Higher wages than rural areas but endured dangerous working conditions, overcrowded housing, and disease.</li><li><u>Middle Class:</u> Benefited most from industrialization. Included factory owners, managers, lawyers, doctors, teachers (white-collar jobs). Some could buy into aristocracy. Saw their rise as merit-based, viewing non-ascenders as lazy.</li><li><u>Industrialists (Captains of Industry):</u> Top of social hierarchy. Wealthy owners of industrial corporations. Often more powerful than traditional landed aristocracy.</li></ul>',
            '<strong>Women in Industrialization</strong>',
            '<ul><li><u>Working-Class Women:</u> Worked factory jobs to supplement family income. Children as young as five initially worked in mines. Family units often separated at workplaces. Child labor laws later limited children’s work, encouraging schooling.</li><li><u>Middle-Class Women:</u> Generally did not work; stayed in "separate sphere." Focused on domestic roles: homemaking and child-rearing.</li></ul>',
            '<strong>Challenges of Industrialization</strong>',
            '<ul><li><u>Rapid Urban Growth:</u> Cities grew faster than infrastructure could handle.</li><li><u>Pollution:</u> Coal smoke and factory emissions created toxic fogs. Industrial and human waste polluted rivers; e.g., London’s River Thames had foul odors.</li><li><u>Housing Shortages:</u> Tenements were overcrowded, poorly ventilated, and unsanitary. Facilitated spread of diseases like typhoid and cholera.</li><li><u>Increase in Crime:</u> Concentration of poor led to more theft and violent crime. Theft often survival-based; violence linked to alcohol consumption.</li></ul>'
        ]
    }
];

const timelineData = [
    {
        key: 'american-revolution',
        icon: '⚡',
        title: 'The American Revolution – 1775–1783',
        summary: 'Thirteen American colonies fight for independence from British rule.',
        details: [
            'Influenced by Enlightenment ideas of liberty and democracy.',
            'Results in the creation of the United States of America.'
        ],
    },
    {
        key: 'french-revolution',
        icon: '🗡️',
        title: 'The French Revolution – 1789–1799',
        summary: 'Radical social and political upheaval in France challenging monarchy and aristocracy.',
        details: [
            'Key ideas: liberty, equality, fraternity.',
            'Leads to rise of Napoleon Bonaparte.'
        ],
    },
    {
        key: 'haitian-revolution',
        icon: '🏛️',
        title: 'Haitian Revolution – 1791–1804',
        summary: 'Enslaved Africans and free people of color overthrow French colonial rule.',
        details: [
            'First successful slave revolt leading to independent black republic.',
            'Inspired by Enlightenment and French Revolution ideals.'
        ],
    },
    {
        key: 'industrial-revolution-begins',
        icon: '🚂',
        title: 'Industrial Revolution Begins – Late 1700s',
        summary: 'Originates in Britain, spreads globally.',
        details: [
            'Major shift from agrarian economies to industrial manufacturing.',
            'Innovations include steam engine, textile machinery, and iron production.'
        ],
    },
    {
        key: 'latin-american-independence',
        icon: '⚓',
        title: 'Latin American Independence Movements – Early 1800s',
        summary: 'Colonies in South and Central America fight for independence from Spain and Portugal.',
        details: [
            'Leaders include Simón Bolívar and José de San Martín.',
            'Inspired by Enlightenment and earlier revolutions.'
        ],
    },
    {
        key: 'factory-system-expands',
        icon: '🏭',
        title: 'Factory System Expands – 1800s',
        summary: 'Centralized production in factories replaces artisanal and cottage industries.',
        details: [
            'Rise of wage labor and urban working class.',
            'Harsh working conditions spark early labor movements.'
        ],
    },
    {
        key: 'age-of-imperialism',
        icon: '🌍',
        title: 'Age of Imperialism – Late 1800s',
        summary: 'European powers aggressively colonize Africa and Asia (Scramble for Africa).',
        details: [
            'Motivated by economic interests, nationalism, and social Darwinism.',
            'Leads to exploitation and resistance in colonized regions.'
        ],
    },
    {
        key: 'transcontinental-railroads',
        icon: '🛤️',
        title: 'Transcontinental Railroads Completed – Mid to Late 1800s',
        summary: 'Railroads like the US Transcontinental and the Trans-Siberian connect vast territories.',
        details: [
            'Facilitate migration, trade, and military movement.',
            'Accelerate economic growth and imperial control.'
        ],
    },
    {
        key: 'opium-wars',
        icon: '⚔️',
        title: 'Opium Wars – 1839–1842, 1856–1860',
        summary: 'Conflicts between Britain and Qing China over trade and sovereignty.',
        details: [
            'Result in “Unequal Treaties” and foreign spheres of influence in China.',
            'Mark decline of Qing dynasty.'
        ],
    },
    {
        key: 'meiji-restoration',
        icon: '🗽',
        title: 'Meiji Restoration – 1868',
        summary: 'Japan modernizes rapidly, ending feudal Tokugawa rule.',
        details: [
            'Adopts Western technology and government institutions.',
            'Emerges as a major imperial power by early 20th century.'
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

const APWorldUnit5: React.FC = () => {
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
                    <h1 className="text-4xl font-bold text-green-800">AP World Unit 5: Revolutions (c. 1750–1900)</h1>
                    <p className="text-lg text-slate-600 mt-2">Industrialization, nationalism, and the transformation of societies.</p>
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
                        onClick={() => navigate('/ap-world-study-guide/unit/5/quiz')}
                        className={`px-6 py-3 font-semibold text-lg transition-colors ${location.pathname === '/ap-world-study-guide/unit/5/quiz' ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
                    >
                        Take Quiz
                    </button>
                </div>
                {/* Content */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    {activeTab === 'topics' && (
                        <div className="space-y-4">
                            {unit5Content.map((topic) => (
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

export default APWorldUnit5;
