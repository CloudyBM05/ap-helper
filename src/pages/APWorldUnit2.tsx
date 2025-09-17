import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit2Content = [
	{
		key: '2.1',
		title: '2.1 – The Silk Roads',
		bullets: [
			'<strong>Definition & Purpose</strong>',
			'<ul><li>Vast trade network linking East Asia to Europe via Central Asia.</li><li>Specialized in luxury goods: silk, porcelain, spices, gems.</li><li>Facilitated not just trade, but cultural, religious, and technological exchange.</li></ul>',
			'<strong>Causes of Expansion</strong>',
			'<ul><li><u>Commercial Innovations:</u><ul><li>Rise of money economies in China: paper money allowed easier, safer trade.</li><li>"Flying money": Chinese credit system like checks.</li><li>Banking Houses in Europe mimicked Chinese financial innovations.</li></ul></li><li><u>Transportation Advancements:</u><ul><li>Caravanserai: roadside inns for merchants; promoted safety and cultural diffusion.</li><li>Camel saddles improved overland transport of goods and people.</li></ul></li></ul>',
			'<strong>Effects of Expansion</strong>',
			'<ul><li><u>New Trading Cities:</u><ul><li>Kashgar: agricultural hub, Islamic scholarly center.</li><li>Samarkand: key Silk Road city; known for cultural exchange and mosques.</li></ul></li><li><u>Increased Demand:</u><ul><li>High demand for silk, porcelain, spices → rise in production.</li><li>Led to Proto-industrialization in China: goods made for export, not just local use.</li></ul></li><li><u>Cultural Diffusion:</u><ul><li>Spread of Islam by Muslim merchants, Buddhism by monks, and other beliefs along the route.</li></ul></li></ul>'
		]
	},
	{
		key: '2.2',
		title: '2.2 – The Mongol Empire and the Making of the Modern World',
		bullets: [
			'<strong>Rise of the Mongol Empire</strong>',
			'<ul><li>Nomadic herders from the Gobi Desert; expert horsemen and archers.</li><li>Temujin (Genghis Khan) united Mongol tribes; launched conquests from China to Persia and Russia.</li></ul>',
			'<strong>Military advantages</strong>',
			'<ul><li>Organized in units (10s, 100s, 1,000s) → strong command structure.</li><li>Superior bows and cavalry.</li><li>Brutal tactics followed by tolerant and organized rule.</li></ul>',
			'<strong>Pax Mongolica (Mongol Peace)</strong>',
			'<ul><li>Empire united almost all of Eurasia → safe, efficient Silk Roads.</li><li>Infrastructure improvements: bridges, roads.</li></ul>',
			'<strong>Communication systems</strong>',
			'<ul><li>Yam system: relay stations with horses and messengers.</li><li>Encouraged diplomatic exchange, artisan migration, and trade.</li></ul>',
			'<strong>Cultural and Technological Transfers</strong>',
			'<ul><li>Mongols relocated artisans, doctors, engineers to areas in need.</li><li>Uyghur script adopted for administration.</li><li>Spread of medical knowledge (from Greeks, Arabs to Europe), gunpowder, paper, and printing technology, Islamic mathematics and astronomy to Europe.</li></ul>',
			'<strong>Yuan Dynasty</strong>',
			'<ul><li>Kublai Khan founded Yuan Dynasty in China.</li><li>Claimed Mandate of Heaven, adopted Confucian-style governance.</li><li>Maintained Mongol identity while embracing Chinese culture.</li></ul>'
		]
	},
	{
		key: '2.3',
		title: '2.3 – Indian Ocean Trade Network',
		bullets: [
			'<strong>Definition</strong>',
			'<ul><li>Maritime trade routes connecting East Africa, the Middle East, India, and Southeast Asia.</li></ul>',
			'<strong>Causes of Expansion</strong>',
			'<ul><li>Decline of Mongols/Silk Roads → shift to sea trade.</li><li>Money economies and credit systems (like bills of exchange) eased transactions.</li><li>Maritime Technologies:<ul><li>Compass, astrolabe, lateen sails, dhows, and junk ships.</li><li>Knowledge of monsoon winds enabled planned voyages.</li></ul></li></ul>',
			'<strong>Types of Goods</strong>',
			'<ul><li>Unlike the Silk Roads, Indian Ocean trade moved both luxury and bulk goods.</li><li>Luxury: spices, silk, porcelain.</li><li>Common: cotton textiles, grain, timber.</li></ul>',
			'<strong>Rise of Trade Cities</strong>',
			'<ul><li>Swahili City-States (East Africa): grew rich via gold, ivory, and slave trade.</li><li>Malacca: controlled Strait of Malacca; taxed ships = immense wealth.</li><li>Gujarat: Indian port between Middle East and China; traded cotton and indigo for silver/gold.</li></ul>',
			'<strong>Diasporic Communities</strong>',
			'<ul><li>Permanent merchant communities abroad helped expand trade:<ul><li>Arab/Persian merchants in East Africa.</li><li>Chinese merchants in Southeast Asia.</li></ul></li></ul>',
			'<strong>Cultural Transfers</strong>',
			'<ul><li>Spread of Islam, especially friendly to trade.</li><li>Zheng He’s Voyages (Ming Dynasty):<ul><li>7 massive expeditions with large treasure fleets.</li><li>Spread Chinese influence; demonstrated power.</li><li>Carried gunpowder tech, increased global awareness of China.</li></ul></li></ul>'
		]
	},
	{
		key: '2.4',
		title: '2.4 – Trans-Saharan Trade Routes',
		bullets: [
			'<strong>Definition</strong>',
			'<ul><li>Trade routes connecting North Africa and the Mediterranean to West Africa across the Sahara.</li></ul>',
			'<strong>Causes of Expansion</strong>',
			'<ul><li>Camels and saddles made long-distance desert travel feasible.</li><li>Caravanserai provided security and rest stops.</li><li>Merchants traveled in caravans (large groups for safety).</li></ul>',
			'<strong>Key Goods</strong>',
			'<ul><li>Gold, salt, slaves, kola nuts, horses.</li><li>Specialization by region promoted interdependence and trade.</li></ul>',
			'<strong>Growth of Empires</strong>',
			'<ul><li>Empire of Mali:<ul><li>Converted to Islam → connected to Dar al-Islam and easier trade.</li><li>Mansa Musa’s hajj (1324):<ul><li>Spread gold across Egypt, devaluing currency temporarily.</li><li>Built mosques and universities; promoted Islamic learning.</li></ul></li></ul></li></ul>',
			'<strong>Comparison: Mali vs. Malacca</strong>',
			'<ul><li>Both controlled key trade routes.</li><li>Grew rich and powerful by taxing/trading along those routes.</li></ul>'
		]
	},
	{
		key: '2.5',
		title: '2.5 – Cultural Effects of Trade',
		bullets: [
			'<strong>Cultural Diffusion</strong>',
			'<ul><li><u>Buddhism:</u><ul><li>Spread along Silk Roads; mixed with Daoism in China → Chan Buddhism.</li><li>Became Zen Buddhism in Japan.</li></ul></li><li><u>Islam:</u><ul><li>Spread via merchants and missionaries.</li><li>Many African and Southeast Asian rulers converted to join Islamic trade networks.</li></ul></li><li><u>Swahili Culture:</u><ul><li>Result of Islam + Bantu languages and cultures = Swahili language and city-states.</li></ul></li></ul>',
			'<strong>Literary and Artistic Transfers</strong>',
			'<ul><li>Greek/Roman philosophy preserved and translated by Muslim scholars (House of Wisdom).</li><li>Ideas later transmitted to Europe → influenced the Renaissance.</li></ul>',
			'<strong>Scientific/Tech Innovations</strong>',
			'<ul><li>Papermaking & movable type from China → Europe.</li><li>Gunpowder tech spread by Mongols → transformed global warfare.</li></ul>',
			'<strong>Effects on Cities</strong>',
			'<ul><li>Cities flourished as trade hubs:<ul><li>Hangzhou: major port city in China.</li><li>Samarkand & Kashgar: vital Silk Road cities.</li></ul></li><li>Decline of major cities:<ul><li>Baghdad: sacked by Mongols (1258) → end of Abbasid power.</li><li>Constantinople: fell to Ottomans (1453) → renamed Istanbul.</li></ul></li></ul>',
			'<strong>Increased Interregional Travel</strong>',
			'<ul><li>Due to Pax Mongolica and stability of routes.</li><li><u>Ibn Battuta:</u> Traveled across Dar al-Islam; recorded cultural insights.</li><li><u>Marco Polo:</u> From Venice to Yuan China; described Kublai Khan\'s court and Chinese wealth.</li><li><u>Margery Kempe:</u> English mystic; pilgrimages across Christian Europe and Holy Land.</li></ul>'
		]
	},
	{
		key: '2.6',
		title: '2.6 – Environmental Effects of Trade',
		bullets: [
			'<strong>Diffusion of Crops</strong>',
			'<ul><li><u>Bananas:</u> Originated in Southeast Asia → reached East Africa via Indian Ocean trade. Allowed Bantu people to migrate to new areas.</li><li><u>Champa Rice:</u> From Vietnam → China. Drought-resistant, double harvest → population boom.</li><li><u>Citrus Fruits:</u> Spread from South/Southeast Asia → Middle East and Europe via Muslim traders.</li></ul>',
			'<strong>Diffusion of Disease</strong>',
			'<ul><li><u>Black Death (Bubonic Plague):</u> Originated in Northern China. Spread rapidly via Mongol trade routes (Silk Roads, Indian Ocean).</li><li>Effects:<ul><li>⅓ of Middle East died.</li><li>Up to 50% of Europe perished.</li><li>Massive social, economic, and religious consequences.</li></ul></li></ul>'
		]
	}
];

// AP World Unit 2 Timeline Data
const timelineData = [
	{
		key: 'silk-roads',
		icon: '🧵',
		title: '1200 – Expansion of the Silk Roads resumes',
		summary: 'Trade across Central Asia grows as demand for luxury goods like Chinese silk and porcelain increases.',
		details: [
			'Innovations like caravanserais, paper money, and credit systems help merchants travel further and safer.'
		],
	},
	{
		key: 'genghis-khan',
		icon: '⚔️',
		title: '1206 – Temujin becomes Genghis Khan',
		summary: 'Unites the Mongol tribes and begins conquests across Central Asia, northern China, and Persia.',
		details: [
			'Launches one of the largest and most effective empires in world history.'
		],
	},
	{
		key: 'pax-mongolica',
		icon: '🌏',
		title: 'c. 1220–1260 – Pax Mongolica ("Mongol Peace")',
		summary: 'Trade, communication, and cultural diffusion flourish across Eurasia due to Mongol control of most of the Silk Roads.',
		details: [
			'Infrastructure like roads and bridges are repaired; Yam system allows for fast communication.'
		],
	},
	{
		key: 'baghdad',
		icon: '🔥',
		title: '1258 – Sack of Baghdad by Mongols',
		summary: 'Mongols destroy Baghdad and end the Abbasid Caliphate.',
		details: [
			'A key center of Islamic culture, science, and learning is lost.'
		],
	},
	{
		key: 'marco-polo',
		icon: '🧳',
		title: '1271–1295 – Marco Polo travels to China',
		summary: 'Venetian merchant travels the Silk Roads and visits the court of Kublai Khan (Yuan Dynasty).',
		details: [
			'His writings introduce Europe to the wealth and complexity of China and the East.'
		],
	},
	{
		key: 'ottoman',
		icon: '🕌',
		title: '1299 – Founding of the Ottoman Empire',
		summary: 'Though mostly significant later, the Ottomans begin to rise just as the Mongol Empire begins to decline.',
		details: [],
	},
	{
		key: 'trans-saharan',
		icon: '🐫',
		title: 'c. 1300–1400 – Expansion of Trans-Saharan Trade',
		summary: 'West African empires like Mali dominate gold-salt trade.',
		details: [
			'Use of camels and caravanserais expands long-distance trade between North and West Africa.'
		],
	},
	{
		key: 'mansa-musa',
		icon: '💰',
		title: '1324 – Mansa Musa’s Hajj',
		summary: 'Ruler of Mali makes a pilgrimage to Mecca.',
		details: [
			'His enormous wealth (especially in gold) shocks the Islamic world and brings attention to West Africa.'
		],
	},
	{
		key: 'ibn-battuta',
		icon: '🌍',
		title: '1325–1354 – Ibn Battuta’s travels',
		summary: 'Moroccan Muslim scholar travels throughout Dar-al-Islam, including West Africa, India, and Southeast Asia.',
		details: [
			'Records detailed descriptions of cultural, legal, and religious practices across regions.'
		],
	},
	{
		key: 'black-death',
		icon: '🦠',
		title: 'c. 1340s – Black Death spreads across Eurasia',
		summary: 'Originates in northern China, spreads via trade routes across the Mongol Empire, killing millions.',
		details: [
			'Up to 1/3 of the Middle East and ½ of Europe’s population dies.',
			'Weakens feudal systems and changes labor relations in Europe.'
		],
	},
	{
		key: 'zheng-he',
		icon: '🚢',
		title: '1405–1433 – Zheng He\'s voyages',
		summary: 'Ming Dynasty sends Zheng He, a Muslim admiral, on 7 voyages across the Indian Ocean to establish tribute relationships and display China\'s power.',
		details: [
			'Uses large “treasure ships” and spreads Chinese culture and goods as far as East Africa.'
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

const APWorldUnit2: React.FC = () => {
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
					<h1 className="text-4xl font-bold text-green-800">AP World Unit 2: Networks of Exchange (c. 1200–1450)</h1>
					<p className="text-lg text-slate-600 mt-2">Silk Roads, Mongols, Indian Ocean, Trans-Saharan, and the global web of trade and culture.</p>
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
						onClick={() => navigate('/ap-world-study-guide/unit/2/quiz')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${window.location.pathname === '/ap-world-study-guide/unit/2/quiz' ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				<div className="bg-white p-6 rounded-2xl shadow-lg">
					{activeTab === 'topics' && (
						<div className="space-y-4">
							{unit2Content.map((topic) => (
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

export default APWorldUnit2;
