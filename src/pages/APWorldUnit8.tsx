import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const unit8Content = [
    {
        key: '8.1',
        title: '8.1 – Setting the Stage for the Cold War and Decolonization',
        bullets: [
            '<strong>Shifting Global Power Structures After WWII</strong>',
            '<ul><li>WWII left Europe economically devastated and politically weakened.</li></ul>',
            '<strong>U.S. and Soviet Union emerged as superpowers with contrasting ideologies:</strong>',
            '<ul><li>U.S.: capitalist democracy, free market economy.</li><li>USSR: communist, state-controlled economy, one-party rule.</li></ul>',
            '<ul><li>These ideological differences led to the Cold War (not a direct war, but a prolonged period of tension and indirect conflict).</li></ul>',
            '<ul><li>Former colonies in Africa, Asia, and the Middle East began movements toward independence and self-rule.</li></ul>'
        ]
    },
    {
        key: '8.2',
        title: '8.2 – The Cold War',
        bullets: [
            '<strong>Causes of the Cold War</strong>',
            '<ul><li>U.S. and USSR had deep ideological mistrust.</li><li>Disagreements during WWII (e.g., timing of D-Day, post-war plans).</li><li>The U.S. dropped atomic bombs without Soviet input, stoking suspicion.</li><li>Postwar Soviet expansion in Eastern Europe alarmed Western powers.</li></ul>',
            '<strong>Cold War Alliances</strong>',
            '<ul><li>NATO (1949): North Atlantic Treaty Organization – U.S. and Western European allies.</li><li>Warsaw Pact (1955): USSR and Eastern Bloc countries.</li><li>Each side pledged mutual defense and increased military spending.</li></ul>'
        ]
    },
    {
        key: '8.3',
        title: '8.3 – Effects of the Cold War',
        bullets: [
            '<strong>Proxy Wars</strong>',
            '<ul><li>Korean War (1950–1953): North (USSR/China-backed) vs. South (U.S.-backed); ended in a stalemate at the 38th parallel.</li><li>Vietnam War (1955–1975): Communist North (supported by USSR/China) vs. South (supported by U.S.); ended with U.S. withdrawal and communist victory.</li><li>Afghan-Soviet War (1979–1989): Soviets invaded Afghanistan; U.S. funded Islamic fighters (Mujahideen) → long-term consequences.</li></ul>',
            '<strong>Nuclear Arms Race</strong>',
            '<ul><li>Massive buildup of nuclear weapons, including hydrogen bombs and ICBMs.</li><li>Mutually Assured Destruction (MAD) doctrine: both sides knew full-scale nuclear war would destroy both.</li></ul>',
            '<strong>Space Race</strong>',
            '<ul><li>USSR launched Sputnik in 1957 (first satellite).</li><li>U.S. responded with NASA and landed a man on the moon in 1969.</li></ul>',
            '<strong>Military-Industrial Complex</strong>',
            '<ul><li>Both nations poured money into military tech, creating permanent wartime economies.</li><li>Industries profited from perpetual conflict → Eisenhower warned of its dangers.</li></ul>'
        ]
    },
    {
        key: '8.4',
        title: '8.4 – Spread of Communism',
        bullets: [
            '<strong>China</strong>',
            '<ul><li>Chinese Communist Party (CCP) led by Mao Zedong won the Chinese Civil War in 1949.</li><li>CCP promised land reform and anti-corruption → popular among peasants.</li><li>Great Leap Forward (1958–1962): Forced industrialization and collectivization of farms → led to famine and deaths of tens of millions.</li><li>Cultural Revolution (1966–1976): Attempt to root out "capitalist" elements; used Red Guards; resulted in mass chaos and purges.</li></ul>',
            '<strong>Other Nations</strong>',
            '<ul><li>Cuba: Fidel Castro overthrew Batista in 1959 → turned to communism → U.S. attempted to overthrow him (Bay of Pigs) and blockaded missiles (Cuban Missile Crisis, 1962).</li><li>Vietnam: Communist revolution in the North under Ho Chi Minh spread southward.</li><li>Cambodia: Khmer Rouge (Pol Pot) implemented radical communist agrarian reforms → mass killings.</li></ul>'
        ]
    },
    {
        key: '8.5',
        title: '8.5 – Decolonization After 1900',
        bullets: [
            '<strong>Causes</strong>',
            '<ul><li>WWII weakened colonial powers and emboldened independence movements.</li><li>Ideals of self-determination (from Wilson & UN Charter).</li><li>Educated elites and mass movements demanded self-rule.</li><li>Economic burden of empire became unsustainable.</li></ul>',
            '<strong>Negotiated Independence</strong>',
            '<ul><li>India (1947): Gained independence from Britain through Gandhi’s nonviolent resistance.</li><li>Partitioned into India (Hindu-majority) and Pakistan (Muslim-majority) → led to massive violence and displacement.</li><li>Ghana: First sub-Saharan African nation to gain independence (1957) under Kwame Nkrumah.</li></ul>',
            '<strong>Violent Struggles</strong>',
            '<ul><li>Algeria: Violent revolution against France (1954–1962) → guerrilla warfare and mass atrocities.</li><li>Kenya: Mau Mau Rebellion against British settlers.</li><li>Vietnam: Independence from France → led to civil war and U.S. intervention.</li></ul>'
        ]
    },
    {
        key: '8.6',
        title: '8.6 – Newly Independent States',
        bullets: [
            '<strong>Struggles Post-Independence</strong>',
            '<ul><li>Ethnic, religious, and linguistic divisions (legacy of arbitrary colonial borders).</li><li>Power vacuums led to civil wars, military coups, and authoritarianism.</li><li>Difficulty establishing stable democratic institutions.</li></ul>',
            '<strong>Political Movements</strong>',
            '<ul><li>Pan-Arabism and Pan-Africanism: Attempts to unify culturally/ethnically similar regions.</li><li>Nasser in Egypt: Nationalized the Suez Canal (1956), led non-aligned movement.</li><li>Non-Aligned Movement: Led by leaders like Tito (Yugoslavia), Nehru (India), and Nasser (Egypt) → sought neutrality during Cold War.</li></ul>'
        ]
    },
    {
        key: '8.7',
        title: '8.7 – Global Resistance to Established Power Structures',
        bullets: [
            '<strong>Anti-Apartheid Movement</strong>',
            '<ul><li>South Africa: Racial segregation enforced by law (Apartheid).</li><li>Nelson Mandela and the African National Congress (ANC) led resistance → jailed, later freed → became first Black president in 1994.</li></ul>',
            '<strong>Civil Rights Movements</strong>',
            '<ul><li>U.S.: Martin Luther King Jr., Rosa Parks, and others resisted Jim Crow laws and fought for desegregation and voting rights.</li></ul>',
            '<strong>Feminist Movements</strong>',
            '<ul><li>Second-wave feminism (1960s–80s): Called for workplace equality, reproductive rights, and social reforms.</li><li>Global women’s rights movements gained traction in many countries.</li></ul>'
        ]
    },
    {
        key: '8.8',
        title: '8.8 – End of the Cold War',
        bullets: [
            '<strong>Decline of the USSR</strong>',
            '<ul><li>Soviet economy stagnated under Brezhnev; overly focused on military.</li><li>Mikhail Gorbachev introduced:</li></ul>',
            '<ul><li>Perestroika: Restructuring economy to include some capitalist principles.</li><li>Glasnost: Openness and transparency in government and society.</li></ul>',
            '<ul><li>USSR loosened grip on Eastern Europe → revolutions in Poland, Czechoslovakia, Romania, etc.</li></ul>',
            '<strong>Fall of the Berlin Wall (1989)</strong>',
            '<ul><li>Symbolic end of Cold War division.</li><li>Led to German reunification.</li></ul>',
            '<strong>Collapse of the Soviet Union (1991)</strong>',
            '<ul><li>USSR dissolved into independent republics (Russia, Ukraine, etc.).</li><li>End of the Cold War and bipolar world order.</li></ul>'
        ]
    }
];

const timelineData = [
    {
        key: 'cold-war-start',
        icon: '❄️',
        title: 'Start of the Cold War – 1947',
        summary: 'Tensions between the U.S. (capitalist democracy) and USSR (communist dictatorship).',
        details: [
            'Triggered by post-WWII disagreements over Eastern Europe and nuclear arms.',
            'Results in global ideological rivalry, proxy wars, and the arms race.'
        ],
    },
    {
        key: 'marshall-plan',
        icon: '🍲',
        title: 'Marshall Plan – 1948',
        summary: 'U.S. economic aid package to rebuild Western Europe after WWII.',
        details: [
            'Aimed to prevent the spread of communism by promoting prosperity.',
            'Boosted American influence and recovery of capitalist democracies.'
        ],
    },
    {
        key: 'nato-warsaw',
        icon: '💣',
        title: 'NATO and Warsaw Pact Formed – 1949 & 1955',
        summary: 'NATO (North Atlantic Treaty Organization) formed by U.S. and Western allies.',
        details: [
            'Warsaw Pact formed in response by the USSR and Eastern Bloc nations.',
            'Both alliances heightened Cold War military tensions.'
        ],
    },
    {
        key: 'korean-war',
        icon: '🔥',
        title: 'Korean War – 1950–1953',
        summary: 'First major Cold War conflict; North Korea (communist) invaded South Korea.',
        details: [
            'U.S. and UN supported the South, China supported the North.',
            'Ends in stalemate along the 38th parallel, but Cold War expands into Asia.'
        ],
    },
    {
        key: 'decolonization',
        icon: '✊',
        title: 'Decolonization of Africa and Asia – 1945–1975',
        summary: 'Dozens of nations in Asia and Africa gain independence from European empires.',
        details: [
            'Often peaceful (e.g., India); sometimes violent (e.g., Algeria, Vietnam).',
            'Nationalist leaders like Gandhi, Nkrumah, and Ho Chi Minh emerge.'
        ],
    },
    {
        key: 'space-race',
        icon: '🚀',
        title: 'Space Race Begins – 1957',
        summary: 'USSR launches Sputnik, the first satellite in space.',
        details: [
            'Triggers U.S. investment in science and education (NASA founded).',
            'Symbolized Cold War technological competition.'
        ],
    },
    {
        key: 'china-cultural-revolution',
        icon: '🇨🇳',
        title: 'Chinese Cultural Revolution – 1966–1976',
        summary: 'Mao Zedong mobilizes youth (Red Guards) to purge “counter-revolutionaries.”',
        details: [
            'Intellectuals persecuted; traditional culture destroyed.',
            'Led to massive social and economic upheaval.'
        ],
    },
    {
        key: 'vietnam-war',
        icon: '🧨',
        title: 'Vietnam War – 1955–1975',
        summary: 'North Vietnam (communist) fought U.S.-backed South Vietnam.',
        details: [
            'U.S. escalated involvement but withdrew after public opposition.',
            'Ends in communist victory and reunification of Vietnam.'
        ],
    },
    {
        key: 'iranian-revolution',
        icon: '💻',
        title: 'Iranian Revolution – 1979',
        summary: 'Overthrow of U.S.-backed Shah of Iran.',
        details: [
            'Establishment of an Islamic Republic under Ayatollah Khomeini.',
            'Shifted Iran toward theocratic rule and anti-Western policies.'
        ],
    },
    {
        key: 'fall-soviet-union',
        icon: '🕊️',
        title: 'Fall of the Soviet Union – 1991',
        summary: 'Economic stagnation, nationalist movements, and reforms under Gorbachev.',
        details: [
            'USSR dissolves into 15 independent republics.',
            'Marks the end of the Cold War and a global shift toward liberal democracy.'
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

const APWorldUnit8: React.FC = () => {
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
                    <h1 className="text-4xl font-bold text-green-800">AP World Unit 8: Cold War & Decolonization (c. 1900–present)</h1>
                    <p className="text-lg text-slate-600 mt-2">Superpower rivalry, independence movements, and global realignments.</p>
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
                        onClick={() => navigate('/ap-world-study-guide/unit/8/quiz')}
                        className={`px-6 py-3 font-semibold text-lg transition-colors ${location.pathname === '/ap-world-study-guide/unit/8/quiz' ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
                    >
                        Take Quiz
                    </button>
                </div>
                {/* Content */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    {activeTab === 'topics' && (
                        <div className="space-y-4">
                            {unit8Content.map((topic) => (
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

export default APWorldUnit8;
