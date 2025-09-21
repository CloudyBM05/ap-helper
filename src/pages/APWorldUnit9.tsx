import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const unit9Content = [
    {
        key: '9.1',
        title: '9.1 – Advances in Technology and Exchange',
        bullets: [
            '<strong>Science and Tech Revolutionized the World:</strong>',
            '<ul><li><u>Medical Advances:</u></li></ul>',
            '<ul><li>Antibiotics (like penicillin): dramatically reduced death rates from bacterial infections.</li><li>Vaccines: eradicated or limited many deadly diseases (e.g., smallpox, polio).</li><li>Birth control pill: enabled population control and revolutionized gender dynamics.</li></ul>',
            '<ul><li><u>Energy Technologies:</u></li></ul>',
            '<ul><li>Oil and nuclear power dominated the 20th century as primary energy sources.</li><li>Shift from coal to petroleum in industries and militaries.</li><li>Nuclear power plants emerged as cleaner alternatives—but controversial (Chernobyl, Fukushima).</li></ul>',
            '<ul><li><u>Information & Communication Tech:</u></li></ul>',
            '<ul><li>Cell phones, internet, and fiber optics revolutionized global communication and economics.</li><li>Created a more interconnected world—the foundation of modern globalization.</li></ul>',
            '<ul><li><u>Green Revolution (1950s–60s):</u></li></ul>',
            '<ul><li>New high-yield crops, synthetic fertilizers, pesticides.</li><li>Boosted food production, especially in developing nations like India and Mexico.</li><li>Criticized for hurting small farmers and increasing environmental damage.</li></ul>'
        ]
    },
    {
        key: '9.2',
        title: '9.2 – Technological Advances and Limitations',
        bullets: [
            '<strong>Effects of Population Growth and Tech:</strong>',
            '<ul><li>Population Boom: global population skyrocketed due to medical advances and food surplus.</li><li>Life expectancy rose, especially in the Global South.</li></ul>',
            '<strong>Environmental Costs:</strong>',
            '<ul><li>Climate change caused by CO₂ and greenhouse gas emissions from industrialization.</li><li>Deforestation, loss of biodiversity, rising sea levels, and more extreme weather.</li></ul>',
            '<strong>Diseases:</strong>',
            '<ul><li>Pandemics and epidemics in modern history:</li><li>1918 Influenza Pandemic: 20–50 million deaths worldwide.</li><li>HIV/AIDS emerged in the 1980s—still a global issue.</li><li>COVID-19 (2019): major impact on global health, travel, economy.</li></ul>',
            '<strong>Emergent Diseases:</strong>',
            '<ul><li>New or resurging diseases like Ebola, Zika, and SARS show limitations of science.</li><li>But global cooperation increased (e.g., WHO, mRNA vaccines).</li></ul>'
        ]
    },
    {
        key: '9.3',
        title: '9.3 – Economics in the Global Age',
        bullets: [
            '<strong>Global Economy Expands:</strong>',
            '<ul><li>Post-Cold War: more countries adopted free-market capitalism.</li><li>Knowledge economy: based on services, information, and technology rather than raw goods.</li></ul>',
            '<strong>Globalization of Production:</strong>',
            '<ul><li>Outsourcing and offshoring: companies moved production to cheaper countries.</li><li>Ex: China as manufacturing hub; India for tech/customer service.</li></ul>',
            '<strong>Economic Institutions:</strong>',
            '<ul><li>World Bank, International Monetary Fund (IMF), World Trade Organization (WTO): promoted global development, trade liberalization.</li><li>Multinational corporations (MNCs) like Apple, McDonald’s, and Toyota became global brands.</li></ul>',
            '<strong>Free-Market Reforms:</strong>',
            '<ul><li>Chile under Pinochet (with U.S. support): early adopter of neoliberal reforms.</li><li>China (under Deng Xiaoping) opened to foreign investment in the 1980s—became economic giant.</li><li>India liberalized economy in 1990s—tech and service sectors grew.</li></ul>',
            '<strong>Consumer Culture:</strong>',
            '<ul><li>Rise of a global middle class led to more consumerism.</li><li>Western brands, music, fashion spread worldwide, often clashing with traditional cultures.</li></ul>'
        ]
    },
    {
        key: '9.4',
        title: '9.4 – Global Culture',
        bullets: [
            '<strong>Globalization of Culture:</strong>',
            '<ul><li>Media, music, film, fashion now circulate worldwide:</li><li>Bollywood films, K-Pop, Hollywood movies, global streaming services.</li><li>World Cup and Olympics create global cultural moments.</li></ul>',
            '<strong>Social Media Revolution:</strong>',
            '<ul><li>Platforms like Facebook, Twitter, Instagram allowed real-time communication across borders.</li><li>Spread social movements, like Arab Spring or BLM, and misinformation.</li></ul>',
            '<strong>Religious Movements:</strong>',
            '<ul><li>Some people resisted global culture through religious revivalism:</li><li>Ex: Salafi Islam, Christian evangelicalism, Hindu nationalism.</li></ul>',
            '<strong>Global Artistic Movements:</strong>',
            '<ul><li>Artists incorporate traditional and global elements (hybridity).</li><li>Example: Banksy (graffiti + political critique), Ai Weiwei (activism + Chinese tradition).</li></ul>'
        ]
    },
    {
        key: '9.5',
        title: '9.5 – Resistance to Globalization',
        bullets: [
            '<strong>Critics of Globalization:</strong>',
            '<ul><li>Argued it widened the gap between rich and poor.</li><li>Anti-globalization movements criticized:</li><li>Environmental damage.</li><li>Loss of local culture.</li><li>Exploitation by corporations.</li></ul>',
            '<strong>Religious and Ethnic Responses:</strong>',
            '<ul><li>Islamist movements like al-Qaeda emerged partly in opposition to Western influence.</li><li>Populism and nationalism rose in Europe and the U.S. (Brexit, Trump).</li></ul>',
            '<strong>Economic Resistance:</strong>',
            '<ul><li>Protestors rallied against IMF, WTO, and G7 summits.</li><li>Some countries implemented protectionism or economic nationalism.</li></ul>',
            '<strong>Cultural Resistance:</strong>',
            '<ul><li>Movements to preserve indigenous languages, traditions, and autonomy.</li><li>Some states passed laws to limit foreign media or internet content.</li></ul>'
        ]
    },
    {
        key: '9.6',
        title: '9.6 – Institutions Developing in a Globalized World',
        bullets: [
            '<strong>Human Rights & Global Organizations:</strong>',
            '<ul><li>United Nations (UN) became a global force for peacekeeping and humanitarian aid.</li><li>Universal Declaration of Human Rights (1948): set global standard for basic rights.</li></ul>',
            '<strong>Women\'s Rights:</strong>',
            '<ul><li>UN’s CEDAW treaty advocated for gender equality.</li><li>Grassroots feminist movements worldwide fought for reproductive rights, voting rights, and economic equality.</li></ul>',
            '<strong>Children & Minorities:</strong>',
            '<ul><li>UN Convention on the Rights of the Child.</li><li>Activists fought discrimination based on race, gender, sexual orientation, disability.</li></ul>',
            '<strong>International Organizations:</strong>',
            '<ul><li>World Health Organization (WHO): coordinated global health responses (e.g., polio, HIV, COVID).</li><li>International Court of Justice (ICJ) and ICC: tried war crimes and genocide cases.</li></ul>',
            '<strong>Civil Rights Movements Expanded:</strong>',
            '<ul><li>LGBTQ+ rights advanced in many countries (e.g., same-sex marriage legalization).</li><li>Women and minorities gained leadership roles in politics, business, education.</li></ul>'
        ]
    },
    {
        key: '9.7',
        title: '9.7 – Calls for Reform and Responses',
        bullets: [
            '<strong>Environmental Movements:</strong>',
            '<ul><li>Scientists warned of global warming, rising CO₂, deforestation.</li></ul>',
            '<strong>Global agreements:</strong>',
            '<ul><li>Kyoto Protocol (1997): aimed to cut greenhouse gases.</li><li>Paris Agreement (2015): stronger commitments to fight climate change.</li></ul>',
            '<strong>Green Technology:</strong>',
            '<ul><li>Rise in renewable energy: solar, wind, hydro.</li><li>Push for electric vehicles, recycling, and sustainable development.</li></ul>',
            '<strong>Social Reform Movements:</strong>',
            '<ul><li>Feminism, anti-racism, workers’ rights, indigenous rights gained traction.</li><li>NGOs and global activists pushed reforms and accountability.</li></ul>'
        ]
    },
    {
        key: '9.8',
        title: '9.8 – Continuity and Change in Global Culture',
        bullets: [
            '<strong>Continuities:</strong>',
            '<ul><li>Religions remained major forces, but often adapted to modern contexts (e.g., megachurches, televangelism, online worship).</li><li>Patriarchy and gender inequality persisted, especially in the Global South.</li></ul>',
            '<strong>Changes:</strong>',
            '<ul><li>Greater interconnectedness through migration, tourism, internet, and trade.</li><li>Rise of hybrid cultures (e.g., Tex-Mex food, Afrobeat + hip hop fusion).</li><li>Spread of Western secularism, but also revival of traditionalism.</li></ul>'
        ]
    },
    {
        key: '9.9',
        title: '9.9 – Globalization Since 1900 (Summary)',
        bullets: [
            '<strong>Key Takeaways:</strong>',
            '<ul><li>Globalization is the increasing interconnection of economies, cultures, and people.</li></ul>',
            '<ul><li>It has:</li></ul>',
            '<ul><li>Spread ideas, goods, and services faster than ever before.</li><li>Raised living standards but also harmed the environment.</li><li>Reduced poverty but widened inequality.</li><li>Enabled global cooperation but fueled new conflicts.</li></ul>',
            '<ul><li>Globalization is a double-edged sword—bringing opportunity and threat, unity and division.</li></ul>'
        ]
    }
];

const timelineData = [
    {
        key: 'globalization-rise',
        icon: '🌐',
        title: 'Rise of Globalization – 1970s–Present',
        summary: 'Increased interdependence of global economies, politics, and cultures.',
        details: [
            'Driven by trade liberalization, multinational corporations, and technology.',
            'Leads to increased migration, cultural blending, and global connectivity.'
        ],
    },
    {
        key: 'digital-revolution',
        icon: '📱',
        title: 'Digital Revolution – 1980s–2000s',
        summary: 'Spread of personal computers, the internet, and mobile technology.',
        details: [
            'Transforms communication, commerce, education, and information access.',
            'Enables rapid globalization and rise of global social media platforms.'
        ],
    },
    {
        key: 'wto-formation',
        icon: '📦',
        title: 'Formation of the World Trade Organization (WTO) – 1995',
        summary: 'Replaced the General Agreement on Tariffs and Trade (GATT).',
        details: [
            'Promotes free trade by regulating international commerce and resolving disputes.',
            'Criticized for favoring wealthy nations and corporations.'
        ],
    },
    {
        key: 'covid-pandemic',
        icon: '🦠',
        title: 'COVID-19 Pandemic – 2019–Present',
        summary: 'Global health crisis caused by the SARS-CoV-2 virus.',
        details: [
            'Disrupted economies, education, travel, and healthcare systems.',
            'Highlighted global interdependence and inequities in access to vaccines and aid.'
        ],
    },
    {
        key: 'financial-crisis-2008',
        icon: '📉',
        title: '2008 Global Financial Crisis – 2008',
        summary: 'Collapse of major U.S. financial institutions triggered worldwide recession.',
        details: [
            'Caused by risky banking practices and housing market collapse.',
            'Resulted in bailouts, austerity, and widespread unemployment.'
        ],
    },
    {
        key: 'global-protests',
        icon: '📢',
        title: 'Global Protest Movements – 2010s–Present',
        summary: 'Worldwide uprisings over economic inequality, racism, authoritarianism, and gender rights.',
        details: [
            'Examples: Arab Spring (2011), Black Lives Matter (2020), Iranian protests (2022).',
            'Enabled by social media and transnational solidarity.'
        ],
    },
    {
        key: 'paris-agreement',
        icon: '🌿',
        title: 'Paris Climate Agreement – 2015',
        summary: 'Nearly 200 countries pledged to limit global warming below 2°C.',
        details: [
            'Part of global response to climate change and environmental degradation.',
            'Mixed results due to uneven enforcement and national interests.'
        ],
    },
    {
        key: 'supranational-orgs',
        icon: '⚖️',
        title: 'Rise of Supranational Organizations – 1990s–Present',
        summary: 'Growth of groups like the European Union (EU), African Union (AU), and United Nations (UN).',
        details: [
            'Coordinate economic policy, security, environmental action, and humanitarian aid.',
            'Increase international cooperation but also raise debates over sovereignty.'
        ],
    },
    {
        key: 'biotech-ai',
        icon: '🤖',
        title: 'Advances in Biotechnology & Artificial Intelligence – 2000s–Present',
        summary: 'Breakthroughs in gene editing (CRISPR), machine learning, and robotics.',
        details: [
            'Transform medicine, agriculture, surveillance, and labor.',
            'Raise ethical concerns about privacy, equity, and human identity.'
        ],
    },
    {
        key: 'global-feminism',
        icon: '📚',
        title: 'Global Feminist & Human Rights Movements – 20th–21st Century',
        summary: "Women's rights, LGBTQ+ rights, and Indigenous movements gain traction globally.",
        details: [
            'Influenced by Western liberalism, decolonization, and social media.',
            'Challenge patriarchal systems and promote legal/economic reforms.'
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

const APWorldUnit9: React.FC = () => {
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
                    <h1 className="text-4xl font-bold text-green-800">AP World Unit 9: Globalization (c. 1900–Present)</h1>
                    <p className="text-lg text-slate-600 mt-2">Technology, culture, and economics in the modern world.</p>
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
                        onClick={() => navigate('/ap-world-study-guide/unit/9/quiz')}
                        className={`px-6 py-3 font-semibold text-lg transition-colors ${location.pathname === '/ap-world-study-guide/unit/9/quiz' ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
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

export default APWorldUnit9;
