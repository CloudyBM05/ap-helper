import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit3Content = [
	{
		key: '3.1',
		title: '3.1 – Gunpowder Empires 🧨',
		bullets: [
			'<strong>What They Were</strong>',
			'<ul><li>Large, land-based empires that relied heavily on gunpowder weaponry for expansion.</li><li>They gained and maintained power through military conquest and centralized authority.</li></ul>',
			'<strong>The Big Players</strong>',
			'<ul><li><u>Ottoman Empire:</u><ul><li>Founded in the 14th century after the fall of the Mongols.</li><li>Controlled strategic trade chokepoint: the Dardanelles.</li><li>Used gunpowder to conquer Constantinople in 1453 (renamed Istanbul).</li><li>Mehmed II used cannons to blast the city\'s walls—significant symbol of Islamic power over Christian Byzantium.</li></ul></li><li><u>Safavid Empire:</u><ul><li>Founded early 1500s by Shah Ismael, declared Shia Islam as the state religion.</li><li>Opposed Sunni Ottomans and Mughals.</li><li>Expanded rapidly under Shah Abbas using gunpowder weapons.</li><li>Highly centralized and religiously distinctive empire.</li></ul></li><li><u>Mughal Empire:</u><ul><li>Founded by Babur in the 16th century, replacing the Delhi Sultanate.</li><li>Used gunpowder cannons and skilled cavalry.</li><li>Akbar the Great expanded the empire and promoted religious tolerance.</li><li>Became the most prosperous empire of the 16th century.</li></ul></li><li><u>Qing Dynasty:</u><ul><li>Founded by the Manchus (non-Han) after the decline of the Ming Dynasty.</li><li>Launched a 40-year campaign of conquest.</li><li>Conquered Taiwan, Mongolia, and parts of Central Asia.</li></ul></li></ul>',
			'<strong>Inter-State Rivalries</strong>',
			'<ul><li><u>Safavid-Mughal Conflict:</u><ul><li>Both sought control of Persian Gulf and Central Asia.</li><li>Fueled by religious differences: Shia vs. Sunni.</li><li>No clear victor after decades of conflict.</li></ul></li><li><u>Songhai-Moroccan Conflict:</u><ul><li>Songhai controlled trans-Saharan trade but was weakened internally.</li><li>Morocco invaded with gunpowder weapons and won easily.</li><li>Marked the end of the Songhai Empire.</li></ul></li></ul>'
		]
	},
	{
		key: '3.2',
		title: '3.2 – Consolidating and Legitimizing Power 🏰',
		bullets: [
			'<strong>Key Concepts</strong>',
			'<ul><li>Legitimize: Showing people you deserve power.</li><li>Consolidate: Grabbing and keeping that power.</li></ul>',
			'<strong>Bureaucracies and Militaries</strong>',
			'<ul><li>As empires expanded, bureaucracies grew larger to manage territories.</li><li><u>Ottoman Devshirme System:</u><ul><li>Enslaved Christian boys converted to Islam and trained for government or military service.</li><li>Created elite soldiers: Janissaries—loyal and disciplined.</li></ul></li></ul>',
			'<strong>Religious, Artistic, and Architectural Legitimization</strong>',
			'<ul><li><u>Religion:</u><ul><li>Europe: Divine Right of Kings—God chose the monarch.</li><li>Aztecs: Grand human sacrifices signaled ruler\'s power.</li></ul></li><li><u>Art:</u><ul><li>Qing (Kangxi): Imperial portraits showing Confucian values to appeal to Han Chinese.</li></ul></li><li><u>Architecture:</u><ul><li>Versailles (France): Louis XIV built a massive palace to demonstrate power and force nobles to live under his eye.</li><li>Inca Sun Temple: Covered in gold; linked rulers directly to gods.</li></ul></li></ul>',
			'<strong>Financing Imperial Expansion</strong>',
			'<ul><li><u>Zamindar System (Mughals):</u><ul><li>Local elites collected taxes for the central government.</li><li>Extended Mughal authority and ensured loyalty.</li></ul></li><li><u>Tax Farming (Ottomans):</u><ul><li>Tax rights auctioned to the highest bidder.</li><li>Helped the Ottomans fund their expansion without central government managing collection.</li><li>Gave tax farmers incentive to collect more than required, enriching themselves.</li></ul></li></ul>'
		]
	},
	{
		key: '3.3',
		title: '3.3 – Continuity and Change in Belief Systems ⛪🕌🕉',
		bullets: [
			'<strong>Christianity in Europe</strong>',
			'<ul><li><u>Pre-Reformation:</u><ul><li>Catholic Church extremely powerful and wealthy.</li><li>Corruption: sale of indulgences (forgiveness for money), simony (selling church offices).</li></ul></li><li><u>Protestant Reformation:</u><ul><li>Martin Luther wrote the 95 Theses, attacking corruption.</li><li>Argued that salvation is by faith alone, not indulgences.</li><li>Excommunicated by the Church.</li><li>Used the printing press to spread his ideas.</li></ul></li><li><u>Counter-Reformation:</u><ul><li>Catholic Church responded with Council of Trent.</li><li>Reforms: no more indulgences or simony.</li><li>Still kept core Catholic doctrines.</li></ul></li><li>Split between Catholics and Protestants became permanent.</li><li>Led to religious wars across Europe until 1648.</li></ul>',
			'<strong>Islam in the Middle East</strong>',
			'<ul><li>Ottoman (Sunni) vs. Safavid (Shia) rivalry intensified sectarian division.</li><li>Both used religion to legitimize and challenge each other\'s rule.</li></ul>',
			'<strong>South Asia</strong>',
			'<ul><li><u>Bhakti Movement (Hinduism):</u><ul><li>Emphasized direct, personal devotion to a god.</li><li>Rejected caste system and ritualism.</li><li>Mystical, emotionally charged worship like Sufism.</li></ul></li><li><u>Sikhism:</u><ul><li>Blended elements of Hinduism and Islam.</li><li>Monotheistic, believed in reincarnation.</li><li>Rejected caste system and gender hierarchies.</li><li>Represented both continuity (shared ideas) and change (new faith entirely).</li></ul></li></ul>'
		]
	}
];

const timelineData = [
	{
		key: 'fall-constantinople',
		icon: '🏰',
		title: '1453 – Fall of Constantinople',
		summary: 'Ottomans, led by Mehmed II, captured Constantinople with gunpowder cannons. Renamed it Istanbul, establishing it as an Islamic capital. Marked the end of the Byzantine Empire and start of Ottoman expansion.',
		details: [
			'Ottomans, led by Mehmed II, captured Constantinople with gunpowder cannons.',
			'Renamed it Istanbul, establishing it as an Islamic capital.',
			'Marked the end of the Byzantine Empire and start of Ottoman expansion.'
		],
	},
	{
		key: 'safavid-empire',
		icon: '🕌',
		title: '1501 – Founding of the Safavid Empire',
		summary: 'Shah Ismail unified Persia under Shi’a Islam, creating tension with Sunni neighbors. Strengthened Persian identity and created a Shia theocracy.',
		details: [
			'Shah Ismail unified Persia under Shi’a Islam, creating tension with Sunni neighbors.',
			'Strengthened Persian identity and created a Shia theocracy.'
		],
	},
	{
		key: 'mughal-empire',
		icon: '🎇',
		title: '1526 – Establishment of the Mughal Empire',
		summary: 'Babur conquered Delhi using gunpowder weapons, founding the Mughal Empire. Initiated a golden age of Islamic rule in India.',
		details: [
			'Babur conquered Delhi using gunpowder weapons, founding the Mughal Empire.',
			'Initiated a golden age of Islamic rule in India.'
		],
	},
	{
		key: 'inca-sun-temple',
		icon: '☀️',
		title: '1533 – Inca Sun Temple Constructed',
		summary: 'Built in Cusco, this temple symbolized divine legitimacy. Inca rulers used gold-covered walls to demonstrate their connection to the sun god.',
		details: [
			'Built in Cusco, this temple symbolized divine legitimacy.',
			'Inca rulers used gold-covered walls to demonstrate their connection to the sun god.'
		],
	},
	{
		key: 'akbar',
		icon: '👑',
		title: '1556–1605 – Reign of Akbar the Great',
		summary: 'Akbar expanded the Mughal Empire and promoted religious tolerance. Created centralized rule with zamindar taxation and imperial bureaucracy.',
		details: [
			'Akbar expanded the Mughal Empire and promoted religious tolerance.',
			'Created centralized rule with zamindar taxation and imperial bureaucracy.'
		],
	},
	{
		key: 'versailles',
		icon: '🏩',
		title: '1588 – Palace of Versailles Constructed',
		summary: 'Louis XIV centralized French power by building this extravagant palace. Nobles were forced to live there, consolidating royal control.',
		details: [
			'Louis XIV centralized French power by building this extravagant palace.',
			'Nobles were forced to live there, consolidating royal control.'
		],
	},
	{
		key: 'songhai',
		icon: '⚔️',
		title: '1591 – Battle of Tondibi: Fall of Songhai Empire',
		summary: 'Moroccan forces, using gunpowder, defeated the Songhai Empire in West Africa. Marked the collapse of one of Africa’s greatest empires due to military technology.',
		details: [
			'Moroccan forces, using gunpowder, defeated the Songhai Empire in West Africa.',
			'Marked the collapse of one of Africa’s greatest empires due to military technology.'
		],
	},
	{
		key: 'thirty-years-war',
		icon: '🔥',
		title: '1618–1648 – Thirty Years’ War',
		summary: 'Religious war between Catholics & Protestants in Europe. Ended with the Peace of Westphalia, affirming state sovereignty and religious freedom.',
		details: [
			'Religious war between Catholics & Protestants in Europe.',
			'Ended with the Peace of Westphalia, affirming state sovereignty and religious freedom.'
		],
	},
	{
		key: 'qing',
		icon: '🐉',
		title: '1644 – Qing Dynasty Begins',
		summary: 'Manchu invaders toppled the Ming Dynasty, forming the Qing Dynasty. Launched expansion campaigns into Taiwan, Mongolia, and Tibet. Not ethnically Han, but adopted Confucian values to rule.',
		details: [
			'Manchu invaders toppled the Ming Dynasty, forming the Qing Dynasty.',
			'Launched expansion campaigns into Taiwan, Mongolia, and Tibet.',
			'Not ethnically Han, but adopted Confucian values to rule.'
		],
	},
	{
		key: 'martin-luther',
		icon: '📜',
		title: '1517 – Martin Luther’s 95 Theses',
		summary: 'Martin Luther criticized Catholic Church corruption (indulgences, simony). Sparked the Protestant Reformation and fractured Western Christianity.',
		details: [
			'Martin Luther criticized Catholic Church corruption (indulgences, simony).',
			'Sparked the Protestant Reformation and fractured Western Christianity.'
		],
	},
	{
		key: 'council-trent',
		icon: '🔧',
		title: '1545–1563 – Council of Trent (Catholic Reforms)',
		summary: 'The Catholic Counter-Reformation addressed Church abuses. Reaffirmed doctrines but reined in corruption to regain followers.',
		details: [
			'The Catholic Counter-Reformation addressed Church abuses.',
			'Reaffirmed doctrines but reined in corruption to regain followers.'
		],
	},
	{
		key: 'sikhism',
		icon: '🖉',
		title: 'Late 1600s – Rise of Sikhism',
		summary: 'Blended Islam & Hinduism in Northern India. Rejected caste & emphasized equality, monotheism, and reincarnation. Became a distinct religion under growing Mughal pressure.',
		details: [
			'Blended Islam & Hinduism in Northern India.',
			'Rejected caste & emphasized equality, monotheism, and reincarnation.',
			'Became a distinct religion under growing Mughal pressure.'
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

const APWorldUnit3: React.FC = () => {
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState('topics');
	const navigate = useNavigate();

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
					<h1 className="text-4xl font-bold text-green-800">AP World Unit 3: Land-Based Empires (c. 1450–1750)</h1>
					<p className="text-lg text-slate-600 mt-2">Gunpowder Empires, consolidation of power, and changing belief systems.</p>
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
						onClick={() => navigate('/ap-world-study-guide/unit/3/quiz')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${window.location.pathname === '/ap-world-study-guide/unit/3/quiz' ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				<div className="bg-white p-6 rounded-2xl shadow-lg">
					{activeTab === 'topics' && (
						<div className="space-y-4">
							{unit3Content.map((topic) => (
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

export default APWorldUnit3;
