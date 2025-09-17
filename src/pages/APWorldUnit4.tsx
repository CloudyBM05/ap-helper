import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const unit4Content = [
    {
        key: '4.1',
        title: '4.1 – Adopted Technologies and European Innovations',
        bullets: [
            '<strong>Magnetic Compass</strong>',
            '<ul><li>Developed in China; used to determine direction during navigation.</li></ul>',
            '<strong>Astrolabe</strong>',
            '<ul><li>Used to calculate latitude and longitude by measuring the position of stars.</li></ul>',
            '<strong>Lateen Sail</strong>',
            '<ul><li>Triangular sail design capable of catching wind on both sides; improved maneuverability.</li></ul>',
            '<strong>Astronomical Charts</strong>',
            '<ul><li>Detailed diagrams of stars and constellations.</li><li>Mainly developed by Muslim scholars who built upon Greek knowledge.</li></ul>',
            '<strong>Technology Transfer</strong>',
            '<ul><li>Europeans did not invent these technologies but adopted them through trade routes, especially facilitated by the Pax Mongolica.</li></ul>',
            '<strong>European Shipbuilding Innovations</strong>',
            '<ul><li><u>Caravel (Portugal):</u> Small, agile ship equipped with cannons. Enhanced naval combat and exploration ability.</li><li><u>Carrack (Portugal):</u> Larger than caravels, able to carry more cargo and guns. Key to Portugal\'s dominance in Indian Ocean trade.</li><li><u>Fluyt (Dutch):</u> Designed purely for trade, with large cargo capacity and small crews. Cheap to build, helped the Dutch overtake Portuguese trade dominance.</li></ul>'
        ]
    },
    {
        key: '4.2',
        title: '4.2 – State-Sponsored Exploration',
        bullets: [
            '<strong>Power Shifts in Europe</strong>',
            '<ul><li>Population growth post-Black Death.</li><li>Monarchs consolidating power, reducing nobility’s influence.</li><li>Militaries strengthened with gunpowder weapons.</li><li>More efficient taxation supported exploration funding.</li></ul>',
            '<strong>Motivations for Exploration</strong>',
            '<ul><li>Desire for Asian spices (especially pepper) was a major economic motivator.</li><li>Land empires controlled traditional spice routes, inflating prices in Europe.</li><li>Europeans sought alternative sea routes to Asian spice markets.</li></ul>',
            '<strong>Portugal’s Trading Post Empire</strong>',
            '<ul><li>Maritime exploration only option to expand.</li><li>Prince Henry sponsored voyages using new technology (caravel, carrack, compass).</li><li>Economic incentives included gold from Trans-Saharan trade and spices.</li><li>Religious motivations: spreading Christianity and finding Prester John.</li><li>Established trading posts along African coasts and Indian Ocean (Vasco da Gama).</li><li>Military superiority (guns) allowed control over trade routes.</li></ul>',
            '<strong>Spain’s Sea-Based Empire</strong>',
            '<ul><li>Funded Columbus’ voyage; mistakenly believed he reached East Indies.</li><li>Discovery of new continents led to further expeditions and colonization.</li><li>Magellan’s circumnavigation proved new routes and colonization possibilities.</li><li>Led to the Trans-Atlantic trade system, rivaling Indian Ocean trade.</li></ul>',
            '<strong>Other European States</strong>',
            '<ul><li><u>France:</u> Sought westward route to Asia, failed, settled colonies (Quebec) mainly via trading posts.</li><li><u>England:</u> Late to exploration due to textile focus; eventually established colonies (Jamestown).</li><li><u>Dutch Republic:</u> Gained independence, became Europe’s richest; challenged Portuguese dominance; established New Amsterdam (NY).</li></ul>'
        ]
    },
    {
        key: '4.3',
        title: '4.3 – Columbian Exchange: Definition, Causes, Effects',
        bullets: [
            '<strong>Definition</strong>',
            '<ul><li>Widespread transfer of plants, animals, diseases, and people between Eastern and Western Hemispheres following Columbus’ voyages.</li></ul>',
            '<strong>Causes</strong>',
            '<ul><li>European contact with Americas initiated exchange.</li></ul>',
            '<strong>Effects: Diseases</strong>',
            '<ul><li>Europeans introduced new diseases (smallpox, measles, malaria).</li><li>Indigenous populations decimated (50-90% mortality), aiding European conquest.</li></ul>',
            '<strong>Effects: Plants and Foods</strong>',
            '<ul><li>Europeans brought wheat, grapes, sugar, bananas.</li><li>Indigenous diets diversified with new foods.</li><li>Americas exported potatoes, maize, manioc, which boosted population growth in Europe, Africa, and Asia.</li></ul>',
            '<strong>Effects: Cash Crops and Labor</strong>',
            '<ul><li>Plantation agriculture for export, especially sugarcane.</li><li>Intensive labor mostly by enslaved Africans.</li><li>Africans also introduced crops like okra and rice to the Americas.</li></ul>',
            '<strong>Effects: Animals</strong>',
            '<ul><li>Europeans introduced pigs, cattle, horses, sheep to Americas.</li><li>Horses transformed indigenous North American societies by improving hunting.</li><li>Environmental impacts often disrupted native farming systems.</li></ul>'
        ]
    },
    {
        key: '4.4',
        title: '4.4 – European Trade Ascendancy and Asian/African Responses',
        bullets: [
            '<strong>Motives for Imperialism</strong>',
            '<ul><li>Gold (wealth), God (spread Christianity), Glory (power/prestige).</li></ul>',
            '<strong>European Powers</strong>',
            '<ul><li><u>Portugal:</u> First trading post empire, militarized dominance in Indian Ocean.</li><li><u>Spain:</u> Established full colonies, e.g., Philippines; used tribute and coercive labor.</li><li><u>Dutch:</u> Used fluyts, took over Indian Ocean trade; converted trading posts into colonies (Indonesia).</li><li><u>British:</u> Initially limited to trading posts in India, later full colonial control by late 18th century.</li></ul>',
            '<strong>Trade Continuity</strong>',
            '<ul><li>Long-standing Asian merchants (Gujaratis, Middle Eastern, SE Asian) continued Indian Ocean trade.</li><li>European entry increased profits but didn’t replace existing networks.</li></ul>',
            '<strong>Asian Resistance</strong>',
            '<ul><li><u>Tokugawa Japan:</u> Initially open to trade but expelled Christian missionaries fearing cultural disruption. Isolated to maintain political unification.</li><li><u>Ming China:</u> Zheng He’s voyages aimed to control Indian Ocean trade but ended in isolationism. Portuguese forced to use bribery; eventually expelled by Ming officials.</li></ul>',
            '<strong>African States</strong>',
            '<ul><li><u>Asante Empire:</u> Wealth from gold, ivory, slaves; resisted European colonization.</li><li><u>Kingdom of Kongo:</u> Strong ties with Portugal; adopted Christianity; relationship later soured.</li></ul>',
            '<strong>Economic and Labor Systems</strong>',
            '<ul><li>Existing systems like mit’a adapted for silver mining.</li><li>New systems: Chattel Slavery (Africans treated as hereditary property), Indentured Servitude (Europeans working fixed terms), Encomienda and Hacienda Systems (Spanish coerced indigenous labor for agriculture and mining).</li></ul>',
            '<strong>Development of Slavery</strong>',
            '<ul><li>African slave trade existed before but intensified with Atlantic trade.</li><li>In Islamic world, slaves often assimilated, sometimes held power.</li><li>Transatlantic trade was racialized, brutal, and hereditary.</li></ul>'
        ]
    },
    {
        key: '4.5',
        title: '4.5 – Economics of Empire Building',
        bullets: [
            '<strong>Mercantilism</strong>',
            '<ul><li>State-driven economic policy aiming for accumulation of precious metals.</li><li>World wealth seen as fixed; countries competed for largest “slice.”</li><li>Favorable balance of trade was essential (more exports than imports).</li><li>Colonies created captive markets for mother countries.</li></ul>',
            '<strong>Joint-Stock Companies</strong>',
            '<ul><li>Privately funded businesses chartered by states.</li><li>Limited liability for investors.</li><li>Granted monopolies on trade, helped fund imperial expansion.</li></ul>',
            '<strong>Dutch East India Company (1602)</strong>',
            '<ul><li>Monopoly in Indian Ocean trade.</li><li>Investors got rich; Dutch state expanded power.</li></ul>',
            '<strong>Other European States</strong>',
            '<ul><li>Other European states (Britain, France) created similar companies.</li><li>Joint-stock companies contributed to rivalries and wars (e.g., Anglo-Dutch War).</li></ul>',
            '<strong>Trade Networks: Change and Continuity</strong>',
            '<ul><li><u>Change:</u> Rise of the Atlantic system connecting Americas, Europe, Africa. Sugar plantations became major economic driver. Massive silver mining (Potosi) fueled European and Asian economies. Silver used to purchase Asian goods, expanding global trade. Coerced labor systems sustained plantations.</li><li><u>Continuity:</u> Afro-Eurasian trade markets persisted and thrived. Asian land empires controlled overland routes (Silk Roads). Peasant subsistence farming and artisan crafts continued but increased production for export.</li></ul>',
            '<strong>Social Effects</strong>',
            '<ul><li><u>African Slave Trade:</u> Gender imbalance led to changes in family structures (polygyny). Enslaved Africans formed creole cultures and languages in Americas.</li><li><u>Changing Belief Systems:</u> Spanish and Portuguese missionaries spread Christianity. Indigenous peoples often syncretized Christian and native beliefs. Violent suppression of indigenous religious practices occurred.</li></ul>'
        ]
    },
    {
        key: '4.6',
        title: '4.6 – Local Resistance',
        bullets: [
            '<strong>European Imperial Control Caused Backlash</strong>',
            '<ul><li>Fronde (France): Nobles and peasants rebelled against Louis XIV’s absolutism and taxation. Rebellion failed; monarchy’s power increased.</li><li>Queen Ana Nzinga (Africa): Ruled Ndongo and Matamba. Allied with Dutch and Kongo to resist Portuguese expansion.</li><li>Pueblo Revolt (North America): Indigenous Pueblo people revolted against Spanish oppression and forced labor in 1680. Temporarily expelled Spanish; colonizers returned after about a decade.</li></ul>',
            '<strong>Resistance from Enslaved Africans</strong>',
            '<ul><li>Enslaved populations resisted through rebellions and forming maroon societies (communities of escaped slaves). Notable in Caribbean and Brazil.</li><li>British colonial attempts to crush maroon communities often failed, resulting in treaties recognizing freedom (e.g., Jamaica, 1738).</li><li>Stono Rebellion (1739, South Carolina): Major slave uprising targeting colonial authorities. Suppressed but caused fear among slaveholders.</li></ul>'
        ]
    },
    {
        key: '4.7',
        title: '4.7 – Responses to Ethnic Diversity and Social Hierarchies',
        bullets: [
            '<strong>Treatment of Jews</strong>',
            '<ul><li>Expulsion: Spain and Portugal expelled Jews after Reconquista (1492).</li><li>Tolerance: Ottoman Empire welcomed Jewish refugees, allowed limited autonomy, but imposed jizya tax.</li></ul>',
            '<strong>Qing Dynasty (China)</strong>',
            '<ul><li>Founded by Manchus, who preserved Confucian bureaucracy but reserved top posts for Manchus.</li><li>Enforced cultural control (e.g., forced Han men to wear Manchu hairstyles).</li><li>Marked by ethnic hierarchy and tension.</li></ul>',
            '<strong>Mughal Empire</strong>',
            '<ul><li>Akbar promoted religious tolerance. Abolished jizya tax temporarily. Funded construction of churches, temples, and mosques.</li></ul>',
            '<strong>Rise of New Elites</strong>',
            '<ul><li>Global trade and imperial power shifts created new social hierarchies.</li><li>Spanish Casta System (Americas): Social order based on race and birthplace. Peninsulares (born in Spain) on top. Creoles (European descent born in Americas). Mestizos (European-Indigenous mixed), Mulattoes (European-African mixed). Indigenous peoples and enslaved Africans at bottom. Erased previous cultural complexity of indigenous groups.</li></ul>',
            '<strong>Struggles of Existing Elites</strong>',
            '<ul><li><u>Russian Boyars:</u> Aristocracy lost power under Peter the Great’s absolutism. Peter abolished boyar rank and centralized bureaucracy.</li><li><u>Ottoman Timars:</u> Aristocratic land grants lost to tax farming by sultans. Aristocrats lost power and land.</li></ul>'
        ]
    }
];

const timelineData = [
    {
        key: 'age-of-exploration',
        icon: '🌍',
        title: 'Age of Exploration Begins – 1450s',
        summary: 'European nations start exploring sea routes to Asia for trade and wealth.',
        details: [
            'Innovations like the caravel ship, compass, and astrolabe aid navigation.',
            'Portuguese lead early explorations around Africa’s coast.'
        ],
    },
    {
        key: 'columbus-americas',
        icon: '⚓',
        title: 'Columbus Reaches Americas – 1492',
        summary: 'Christopher Columbus lands in the Caribbean, opening the Americas to Europe.',
        details: [
            'Initiates widespread European colonization and conquest.',
            'Sparks Columbian Exchange between Old and New Worlds.'
        ],
    },
    {
        key: 'treaty-tordesillas',
        icon: '🌐',
        title: 'Treaty of Tordesillas – 1494',
        summary: 'Agreement between Spain and Portugal dividing newly discovered lands.',
        details: [
            'Spain gets most of the Americas; Portugal claims Africa, Asia, and Brazil.',
            'Reduces conflict between the two maritime powers.'
        ],
    },
    {
        key: 'vasco-da-gama',
        icon: '🚢',
        title: 'Vasco da Gama’s Voyage to India – 1498',
        summary: 'First European to reach India by sea around Africa’s Cape of Good Hope.',
        details: [
            'Establishes Portuguese presence in Indian Ocean trade.',
            'Begins European dominance in spice trade.'
        ],
    },
    {
        key: 'conquest-aztecs',
        icon: '🏰',
        title: 'Spanish Conquest of the Aztecs – 1519–1521',
        summary: 'Hernán Cortés leads conquest of Aztec Empire in Mexico.',
        details: [
            'Use of superior weapons, alliances, and disease devastate Aztec population.',
            'Spain gains vast wealth and territory in the Americas.'
        ],
    },
    {
        key: 'conquest-inca',
        icon: '⚔️',
        title: 'Spanish Conquest of the Inca – 1532–1533',
        summary: 'Francisco Pizarro conquers Inca Empire in South America.',
        details: [
            'Exploits internal divisions and disease.',
            'Spain solidifies control over Peru and rich silver mines.'
        ],
    },
    {
        key: 'columbian-exchange',
        icon: '💰',
        title: 'Columbian Exchange – Late 1400s onward',
        summary: 'Transfer of plants, animals, diseases, and people between Old and New Worlds.',
        details: [
            'Introduction of crops like potatoes and maize to Europe, and horses, cattle to Americas.',
            'Devastating impact on indigenous populations due to diseases like smallpox.'
        ],
    },
    {
        key: 'mughal-empire',
        icon: '🕌',
        title: 'Rise of the Mughal Empire – Early 1500s',
        summary: 'Babur founds Mughal dynasty in India.',
        details: [
            'Combines Islamic and Hindu cultures, promotes trade and art.',
            'Expands empire with strong centralized rule.'
        ],
    },
    {
        key: 'manila-galleons',
        icon: '🛶',
        title: 'Manila Galleons Begin – 1565',
        summary: 'Spanish ships connect the Philippines to Mexico across the Pacific.',
        details: [
            'Facilitate silver trade from Americas to Asia.',
            'Link global trade networks more tightly.'
        ],
    },
    {
        key: 'gunpowder-empires',
        icon: '💣',
        title: 'Introduction of Gunpowder Empires’ Military Technology – 1500s–1600s',
        summary: 'Empires like the Ottoman, Safavid, and Mughal use cannons and firearms.',
        details: [
            'Gunpowder weapons reshape warfare and empire expansion.',
            'Enhance central authority and territorial control.'
        ],
    },
    {
        key: 'atlantic-slave-trade',
        icon: '🚜',
        title: 'Atlantic Slave Trade Expands – 1500s onward',
        summary: 'European powers increase demand for African slaves in Americas.',
        details: [
            'Triangular trade routes develop connecting Africa, Americas, and Europe.',
            'Causes demographic shifts and deep social impacts in Africa and Americas.'
        ],
    },
    {
        key: 'scientific-revolution',
        icon: '🏛️',
        title: 'Scientific Revolution – Mid-1500s to 1700s',
        summary: 'New approaches to understanding nature challenge traditional beliefs.',
        details: [
            'Figures like Copernicus, Galileo, and Newton transform science.',
            'Lays groundwork for Enlightenment and modern science.'
        ],
    },
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

const APWorldUnit4: React.FC = () => {
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
                    <h1 className="text-4xl font-bold text-green-800">AP World Unit 4: Transoceanic Interconnections (c. 1450–1750)</h1>
                    <p className="text-lg text-slate-600 mt-2">Exploration, trade, and cultural exchanges across the oceans.</p>
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
                        onClick={() => navigate('/ap-world-study-guide/unit/4/quiz')}
                        className={`px-6 py-3 font-semibold text-lg transition-colors ${location.pathname === '/ap-world-study-guide/unit/4/quiz' ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
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

export default APWorldUnit4;
