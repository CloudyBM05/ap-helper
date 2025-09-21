import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const unit7Content = [
	{
		key: '7.1',
		title: '7.1 – Shifting Power after WWI',
		bullets: [
			'<strong>The Ottoman Empire</strong>',
			'<ul><li>Nicknamed “The Sick Man of Europe” by late 19th century due to decline.</li><li>Tanzimat reforms tried defensive industrialization but failed to stop decline.</li><li>Young Ottomans: Western-educated, pushed for liberal reforms → sultan briefly allowed constitution and parliament.</li><li>War threats caused Sultan to revert to authoritarian rule.</li><li>Young Turks (1908): Overthrew Sultan, pushed modernization along Western lines.</li><li>Secularized education and law.</li><li>Introduced elections.</li><li>Imposed Turkish nationalism, alienating ethnic minorities, especially Arabs.</li><li>Post-WWI: Empire disintegrated, carved into independent states by victorious powers.</li></ul>',
			'<strong>Russian Revolution</strong>',
			'<ul><li>Late 19th century industrialization under Tsar Alexander II and Nicholas II.</li><li>Growing middle class and working class unhappy with autocratic rule and poor industrial conditions.</li><li>1905 Revolution forced limited reforms (constitution, labor unions, parties), but Tsar ignored them.</li><li>WWI hardships reignited tensions → 1917 Revolution led by Lenin and Bolsheviks.</li><li>Bolsheviks overthrew Tsar, established communist Soviet Union.</li></ul>',
			'<strong>Collapse of Qing China</strong>',
			'<ul><li>Internal: Taiping Rebellion devastated population and treasury.</li><li>External: Lost Opium Wars and Sino-Japanese War; defeated by industrialized powers.</li><li>Boxer Rebellion (anti-foreigner) crushed by foreign troops; foreign powers imposed demands.</li><li>Revolutionary movement under Sun Yat-sen ended 2000+ years of imperial rule.</li><li>Provisional government short-lived; civil war followed.</li><li>Eventually, communist China formed under Mao Zedong.</li></ul>',
			'<strong>Mexican Revolution</strong>',
			'<ul><li>Dictator Porfirio Diaz ruled late 19th to early 20th century.</li><li>Social classes united against Diaz; Francisco Madero elected in 1910 but assassinated 1912.</li><li>Civil war followed, featuring leaders like Pancho Villa and Emiliano Zapata.</li><li>1917 Constitution introduced reforms (universal male suffrage, workers’ rights, church-state separation).</li><li>Revolution mostly confined to Mexico, less global impact compared to Russia/China.</li></ul>'
		]
	},
	{
		key: '7.2',
		title: '7.2 – Causes of WWI',
		bullets: [
			'<strong>Militarism</strong>',
			'<ul><li>Belief that states must build powerful militaries and use them aggressively.</li><li>Germany’s unification and rapid industrialization led to military buildup, threatening France.</li><li>Britain had large military due to empire but faced resource strains.</li></ul>',
			'<strong>Alliance System</strong>',
			'<ul><li>Two major alliances:</li><li>Triple Alliance: Germany, Italy, Austria-Hungary.</li><li>Triple Entente: Britain, France, Russia.</li><li>Alliances aimed for security but created a “buddy system” that escalated conflict risks.</li><li>Elaborate mobilization plans tied to railway timetables made war escalation difficult to stop once started.</li></ul>',
			'<strong>Imperialism</strong>',
			'<ul><li>Desire for empire expansion fueled competition and conflict.</li><li>Germany sought colonies, aggravating established imperial powers.</li><li>Conflict over colonial holdings fed into alliance tensions.</li></ul>',
			'<strong>Nationalism</strong>',
			'<ul><li>Intense pride and loyalty to nation-states.</li><li>Fueled suspicion and hostility toward rival nations.</li><li>Nationalism framed conflicts as defense of identity, making compromise harder.</li></ul>',
			'<strong>Trigger: Assassination</strong>',
			'<ul><li>Serbian nationalist Gavrilo Princip assassinated Austro-Hungarian Archduke Franz Ferdinand.</li><li>Nationalism led Serbia to see this as resistance; Austria-Hungary demanded harsh retaliation.</li><li>Alliances activated, mobilizations started, and a regional conflict exploded into WWI.</li></ul>'
		]
	},
	{
		key: '7.3',
		title: '7.3 – How WWI Was Fought',
		bullets: [
			'<strong>Total War</strong>',
			'<ul><li>Required mobilization of entire societies—military and civilian.</li><li>Civilians were targets; propaganda used to maintain morale and demonize enemies.</li><li>Nationalism intensified, portraying the war as a righteous cause.</li></ul>',
			'<strong>Military Technology & Trench Warfare</strong>',
			'<ul><li>New deadly tech: machine guns, chemical weapons, tanks.</li><li>Early war tactics (frontal assaults) caused huge casualties.</li><li>Trenches dug opposite each other led to stalemate and horrific conditions.</li><li>Barbed wire and machine guns made advances deadly; war bogged down for years.</li></ul>',
			'<strong>Global Involvement</strong>',
			'<ul><li>Imperial powers conscripted colonial troops and laborers (Africa, India, China, SE Asia, Australia, Canada, NZ).</li><li>Colonized peoples often reluctant but hoped war service would lead to independence or self-rule.</li><li>Disappointments would fuel later anti-colonial movements.</li></ul>',
			'<strong>War’s End</strong>',
			'<ul><li>Four years of brutal fighting.</li><li>U.S. initially neutral; joined Allies after German provocations (Lusitania sinking, Zimmerman telegram).</li><li>Fresh American troops and industry helped tip balance.</li><li>War ended 1918 with Treaty of Versailles.</li><li>Treaty punished Germany harshly, sowing seeds for WWII despite Wilson’s peace efforts.</li></ul>'
		]
	},
	{
		key: '7.4',
		title: '7.4 – Global Economy between the World Wars',
		bullets: [
			'<strong>German Hyperinflation</strong>',
			'<ul><li>Treaty of Versailles reparations and war debts crushed German economy.</li><li>Government printed money excessively → hyperinflation.</li><li>By 1923, prices skyrocketed (bread costing billions of marks).</li><li>Germany’s inability to pay reparations destabilized European economies.</li><li>U.S. lent money to stabilize Germany (Dawes Plan), aiding temporary recovery.</li></ul>',
			'<strong>Soviet Economics</strong>',
			'<ul><li>Lenin’s New Economic Policy (1923): limited capitalism allowed to revive economy.</li><li>Stalin took over in 1924, scrapped NEP.</li><li>Five Year Plans aimed rapid industrialization with brutal state control.</li><li>Collectivization merged farms; Kulaks (wealthier peasants) persecuted.</li><li>Ukraine hit hardest → famine (Holodomor) killed millions.</li></ul>',
			'<strong>The Great Depression</strong>',
			'<ul><li>U.S. stock market crash (1929) triggered global economic collapse.</li><li>European economies reliant on U.S. loans and investment suffered.</li><li>U.S. initially had limited government role in economy.</li><li>FDR’s New Deal introduced massive government intervention:</li><li>Public works programs.</li><li>Social security and retirement.</li><li>Healthcare for vulnerable groups.</li><li>Debate if New Deal ended Depression; WWII economic mobilization largely ended crisis.</li></ul>'
		]
	},
	{
		key: '7.5',
		title: '7.5 – Unresolved Tensions after WWI',
		bullets: [
			'<strong>The Mandate System</strong>',
			'<ul><li>Colonial powers kept their empires despite sacrifices by colonial soldiers.</li><li>New states like Turkey formed, but many colonies just changed imperial rulers.</li><li>At the Paris Peace Conference, Allied powers divided Ottoman and German colonies among themselves.</li><li>Woodrow Wilson promoted self-determination → many colonial peoples expected independence.</li><li>Britain and France rejected full independence for colonies → compromise: League of Nations Mandate System.</li><li>Mandates classified into three groups:</li><li>Class C: Least developed, treated like colonies (Pacific islands).</li><li>Class B: Larger populations but undeveloped (Germany’s African colonies).</li><li>Class A: Most developed, “ready” for independence but still controlled (Middle East territories like Iraq, Syria).</li><li>Colonial peoples felt betrayed → anti-colonial resistance grew.</li></ul>',
			'<strong>Japan Expands</strong>',
			'<ul><li>Only non-Western imperial power equal to Western states.</li><li>Invaded Manchuria (1931) for resources, violating League rules.</li><li>Left League of Nations after criticism, continued aggressive expansion.</li><li>Created puppet state Manchukuo; expanded Greater East Asia Co-Prosperity Sphere.</li></ul>',
			'<strong>Anti-Imperial Resistance</strong>',
			'<ul><li>Indian National Congress: Founded late 19th century, initially petitioned Britain peacefully.</li><li>Gandhi became leader in 1920s, promoted nonviolent protest.</li><li>India gained independence after WWII.</li><li>African National Congress: Founded in South Africa.</li><li>Advocated for equal rights, inspired by Pan-Africanism.</li><li>Fully effective after WWII.</li></ul>'
		]
	},
	{
		key: '7.6',
		title: '7.6 – Causes of WWII',
		bullets: [
			'<strong>Cause #1: Unsustainable Peace</strong>',
			'<ul><li>Treaty of Versailles harshly punished Germany → resentment.</li><li>Italy upset for not receiving promised territorial rewards.</li><li>Germany forced to pay reparations, demilitarize, accept “war guilt” → humiliation.</li></ul>',
			'<strong>Cause #2: Continued Imperialism</strong>',
			'<ul><li>Japan expanded into China and Pacific islands, ignoring League.</li><li>Italy invaded Ethiopia, formed formal African empire.</li><li>Germany under Hitler aggressively reclaimed lost territory (Rhineland, Austria, Czechoslovakia).</li><li>Britain and France appeased Hitler, encouraging further aggression.</li></ul>',
			'<strong>Cause #3: Economic Crisis</strong>',
			'<ul><li>Great Depression caused global unemployment, hunger.</li><li>Populations vulnerable to authoritarian leaders promising recovery (Hitler, Mussolini).</li></ul>',
			'<strong>Cause #4: Fascism/Totalitarianism</strong>',
			'<ul><li>Soviet Union: Stalin’s brutal dictatorship pushed global communism via forced industrialization and collectivization.</li><li>Italy: Mussolini’s fascist regime emphasized nationalism, state control, militarism.</li><li>Germany: Nazi Party under Hitler combined nationalism, racism, propaganda.</li><li>Blamed Jews, communists, socialists for Germany’s woes.</li><li>Policies improved economy initially but aimed at racial “purity” and territorial conquest.</li></ul>'
		]
	},
	{
		key: '7.7',
		title: '7.7 – Conducting WWII',
		bullets: [
			'<strong>Total War</strong>',
			'<ul><li>Mobilization of entire population, civilians targeted.</li><li>Triggered by Germany’s invasion of Poland (1939).</li><li>Britain and France declared war; Axis vs. Allies formed.</li><li>Axis: Germany, Italy, Japan (fascist states).</li><li>Allies: Britain, France, Soviet Union, U.S. (joined after Pearl Harbor 1941).</li><li>Early Soviet-German non-aggression pact broken by Germany in 1941.</li></ul>',
			'<strong>Mobilization & Propaganda</strong>',
			'<ul><li>Governments used propaganda to boost nationalism, demonize enemies, encourage enlistment and sacrifice.</li><li>Fascist states mobilized economies fully for war.</li><li>Democratic states relied on persuasion and cooperation (e.g., Churchill’s “people’s war”).</li></ul>',
			'<strong>Repression of Freedoms</strong>',
			'<ul><li>U.S.: Japanese Americans interned after Pearl Harbor.</li><li>Germany: Jews and others confined to ghettos and camps under Nuremberg Laws.</li></ul>',
			'<strong>Warfare Strategies & Technologies</strong>',
			'<ul><li>Blitzkrieg: Fast, combined air and ground attacks; made WWI trench warfare obsolete.</li><li>Firebombing: Devastated cities like Dresden and Tokyo, causing massive civilian deaths.</li><li>Atomic Bomb: Developed by U.S.; dropped on Hiroshima and Nagasaki, ending war in Pacific.</li></ul>',
			'<strong>Outcome</strong>',
			'<ul><li>Allied victory in Europe and Pacific.</li></ul>'
		]
	},
	{
		key: '7.8',
		title: '7.8 – Mass Atrocities (20th Century)',
		bullets: [
			'<strong>Causes of Mass Atrocities</strong>',
			'<ul><li>20th century saw unprecedented death tolls, largely civilian.</li><li>New technology enabled large-scale bombing and killing.</li><li>Extremist ideologies targeted entire groups for extermination.</li></ul>',
			'<strong>Armenian Genocide (1915–1916)</strong>',
			'<ul><li>Ottoman Empire, under Young Turks, targeted Armenian Christians.</li><li>Feared Armenian collaboration with enemies during WWI.</li><li>Mass killings and forced relocations → ~600,000 to 1 million Armenians killed.</li></ul>',
			'<strong>The Holocaust</strong>',
			'<ul><li>Nazi “Final Solution” aimed to create “pure” German race.</li><li>Targeted Jews, Roma, disabled, political enemies.</li><li>Nuremberg Laws deprived Jews of rights; ghettos and concentration camps used.</li><li>Auschwitz: Largest camp; up to 12,000 killed per day in gas chambers.</li><li>~6 million Jews and 5 million others murdered.</li></ul>',
			'<strong>Cambodian Genocide (late 1970s)</strong>',
			'<ul><li>Khmer Rouge under Pol Pot, backed by China, sought agrarian communist state.</li><li>Forced urban evacuations, targeted educated and Western-influenced.</li><li>~25% of Cambodia’s population died.</li></ul>'
		]
	}
];

const timelineData = [
	{
		key: 'wwi-begins',
		icon: '🌍',
		title: 'World War I Begins – 1914',
		summary: 'Sparked by the assassination of Archduke Franz Ferdinand in Sarajevo.',
		details: [
			'Fueled by militarism, alliances, imperialism, and nationalism (MAIN).',
			'Trench warfare and new technologies led to high casualties.'
		],
	},
	{
		key: 'treaty-versailles',
		icon: '⚖️',
		title: 'Treaty of Versailles – 1919',
		summary: 'Ended WWI; placed full blame on Germany.',
		details: [
			'Imposed heavy reparations and territorial losses.',
			'Created the League of Nations (weak without U.S. participation).',
			'Planted seeds for WWII through resentment and economic hardship.'
		],
	},
	{
		key: 'russian-revolution',
		icon: '💥',
		title: 'Russian Revolution – 1917',
		summary: 'Bolsheviks, led by Vladimir Lenin, overthrew the Tsarist regime.',
		details: [
			'Led to the creation of the communist Soviet Union (USSR).',
			'Withdrew Russia from WWI and triggered civil war between Reds and Whites.'
		],
	},
	{
		key: 'great-depression',
		icon: '📉',
		title: 'Global Great Depression – 1929',
		summary: 'U.S. stock market crash caused ripple effects worldwide.',
		details: [
			'Massive unemployment, bank failures, and social unrest.',
			'Hurt democracies; fueled extremist ideologies like fascism and communism.'
		],
	},
	{
		key: 'rise-fascism',
		icon: '🪖',
		title: 'Rise of Fascist Regimes – 1920s–1930s',
		summary: 'Benito Mussolini (Italy) and Adolf Hitler (Germany) came to power.',
		details: [
			'Fascism: nationalist, authoritarian, anti-democratic ideology.',
			'Promised to restore national pride and rebuild economies.',
			'Nazi Germany pursued expansionism and anti-Semitic policies.'
		],
	},
	{
		key: 'japan-manchuria',
		icon: '🇯🇵',
		title: 'Japanese Invasion of Manchuria – 1931',
		summary: 'First major aggressive act by a future Axis Power.',
		details: [
			'Japan seized resource-rich Manchuria, defying the League of Nations.',
			'Marked the beginning of Japanese imperialism in East Asia.'
		],
	},
	{
		key: 'spanish-civil-war',
		icon: '⚔️',
		title: 'Spanish Civil War – 1936–1939',
		summary: 'Conflict between Republican forces and Nationalists led by Francisco Franco.',
		details: [
			'Seen as a precursor to WWII, with Nazi Germany and Fascist Italy supporting Franco.',
			'Nationalist victory established a fascist dictatorship.'
		],
	},
	{
		key: 'wwii-begins',
		icon: '🔥',
		title: 'World War II Begins – 1939',
		summary: 'Germany invaded Poland, prompting Britain and France to declare war.',
		details: [
			'Blitzkrieg tactics overwhelmed much of Europe.',
			'Eventually included all major world powers, forming Axis vs. Allied alliances.'
		],
	},
	{
		key: 'holocaust',
		icon: '🕍',
		title: 'The Holocaust – 1941–1945',
		summary: 'Systematic genocide of 6 million Jews by Nazi Germany.',
		details: [
			'Also targeted Romani people, disabled individuals, and other minorities.',
			'Represents one of the most horrific crimes against humanity.'
		],
	},
	{
		key: 'atomic-bombings',
		icon: '💣',
		title: 'Atomic Bombings of Hiroshima & Nagasaki – 1945',
		summary: 'U.S. dropped atomic bombs to force Japan’s surrender in WWII.',
		details: [
			'Over 100,000 civilians killed instantly; many more from radiation.',
			'Marked the beginning of the nuclear age and Cold War tensions.'
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

const APWorldUnit7: React.FC = () => {
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
					<h1 className="text-4xl font-bold text-green-800">AP World Unit 7: Global Conflict (c. 1900–present)</h1>
					<p className="text-lg text-slate-600 mt-2">World wars, revolutions, and mass atrocities in the 20th century.</p>
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
						onClick={() => navigate('/ap-world-study-guide/unit/7/quiz')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${location.pathname === '/ap-world-study-guide/unit/7/quiz' ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				<div className="bg-white p-6 rounded-2xl shadow-lg">
					{activeTab === 'topics' && (
						<div className="space-y-4">
							{unit7Content.map((topic) => (
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

export default APWorldUnit7;
