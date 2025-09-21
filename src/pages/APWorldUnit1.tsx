import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit1Content = [
	{
		key: '1.1',
		title: '1.1 – Developments in East Asia (c. 1200–1450)',
		bullets: [
			[
				'<strong>State Building in Song China</strong>',
				'<ul><li>Song Dynasty maintained power through a centralized imperial bureaucracy, Confucian ideologies, and civil service exams.</li><li>Expanded imperial bureaucracy strengthened state control across China.</li></ul>',
				'<strong>Confucianism and Neo-Confucianism</strong>',
				'<ul><li>Confucianism emphasized filial piety, hierarchy (ruler&gt;subject, father&gt;son, etc.), and moral order.</li><li>Neo-Confucianism merged Confucian values with Buddhist and Daoist thought, offering a more spiritual interpretation.</li><li>Confucian revival was both continuity from Tang Dynasty and an innovation during Song rule.</li></ul>',
				'<strong>Role of Women</strong>',
				'<ul><li>Women’s rights declined:</li><ul><li>Property passed to husbands</li><li>Divorce and remarriage restricted</li><li>Subservient roles solidified</li></ul><li>Foot binding was widespread among elite families, signifying wealth and control over women.</li></ul>',
				'<strong>Civil Service Exam</strong>',
				'<ul><li>Based on Confucian classics.</li><li>Merit-based system ensured:</li><ul><li>Qualified bureaucracy</li><li>Reduced aristocratic privilege</li><li>Greater administrative efficiency</li></ul></ul>',
				'<strong>Chinese Influence on East Asia</strong>',
				'<ul><li><u>Korea:</u><ul><li>Maintained tributary relationship</li><li>Adopted Confucianism and civil service exam</li><li>Women’s roles became even more restricted</li></ul></li><li><u>Japan:</u><ul><li>Voluntarily adopted Chinese features (bureaucracy, Buddhism, writing) without being conquered</li></ul></li><li><u>Vietnam:</u><ul><li>Tributary to China but maintained more autonomy</li><li>Adopted Confucianism and Buddhism</li><li>Used Chinese civil service model</li><li>Women retained more freedom than in China</li></ul></li></ul>',
				'<strong>Buddhism in Song China</strong>',
				'<ul><li>Spread from South Asia; core beliefs:</li><ul><li>Four Noble Truths, Eightfold Path</li><li>Theravada (monk-centered), Mahayana (accessible, devotional), and Tibetan (mystical)</li><li>Mahayana became most dominant in East Asia</li></ul></ul>',
				'<strong>Economic Growth</strong>',
				'<ul><li>Commercialization: Produced goods beyond subsistence; participated in global trade</li><li>Used paper money, produced porcelain, silk, iron, steel</li><li>Iron/Steel: Advanced production for coins, tools, armor</li><li>Agricultural revolution with Champa rice (drought-resistant, fast-growing) → population boom</li><li>Transportation: Grand Canal expansion, compass, advanced shipbuilding (junk ships)</li></ul>',
			],
		],
	},
	{
		key: '1.2',
		title: '1.2 – Developments in Dar al-Islam (c. 1200–1450)',
		bullets: [
			[
				'<strong>Religious Foundations</strong>',
				'<ul><li>Judaism: Monotheistic, ethnic religion from the Middle East</li><li>Christianity: Salvation through Jesus, spread by apostles, adopted by Rome</li><li>Islam: Founded by Muhammad; emphasized righteous actions; spread rapidly to form Dar al-Islam</li></ul>',
				'<strong>New Islamic States</strong>',
				'<ul><li>Abbasid Caliphate:<ul><li>Arab Muslim dynasty, cultural flourishing</li><li>Declined by 1200</li></ul></li><li>Seljuk Empire:<ul><li>Turkic people originally hired by Abbasids, later seized power</li><li>Used Sharia law, held sultans as rulers</li></ul></li><li>Mamluk Sultanate (Egypt):<ul><li>Former slave soldiers (Turks) took over after Sultan’s death</li><li>Centralized Muslim state</li></ul></li><li>Delhi Sultanate (India):<ul><li>Established Muslim control in Northern India</li><li>Faced resistance from entrenched Hindu populations</li></ul></li></ul>',
				'<strong>Islamic Expansion</strong>',
				'<ul><li>Spread through:</li><ul><li>Military conquest (e.g., Delhi)</li><li>Trade networks</li><li>Missionary activity, especially via Sufi mystics</li></ul></ul>',
				'<strong>Intellectual Achievements</strong>',
				'<ul><li>Nasir al-Din al-Tusi:<ul><li>Advanced geometry; influenced Copernicus</li></ul></li><li>House of Wisdom in Baghdad:<ul><li>Intellectual hub of the Islamic world</li><li>Translated Greek works, innovated in astronomy, medicine, and math</li></ul></li></ul>',
			],
		],
	},
	{
		key: '1.3',
		title: '1.3 – State Building in South and Southeast Asia (c. 1200–1450)',
		bullets: [
			[
				'<strong>Belief Systems</strong>',
				'<ul><li>Hinduism:<ul><li>Polytheistic, caste system</li><li>Goal: reunite with Brahma through reincarnation</li></ul></li><li>Islam:<ul><li>Spread through conquest and elite adoption</li><li>Minor religion among India’s majority Hindu population</li></ul></li><li>Buddhism:<ul><li>Originally from India; declining in South Asia by 1200s</li></ul></li></ul>',
				'<strong>Religious Movements</strong>',
				'<ul><li>Bhakti Movement (Hinduism):<ul><li>Personal devotion to one god</li><li>Rejected caste hierarchy, open to all classes</li></ul></li><li>Sufism (Islam):<ul><li>Mystical, emotional form of Islam</li><li>Rejected rigid orthodoxy, appealed to masses</li></ul></li></ul>',
				'<strong>Spread of Religion in Southeast Asia</strong>',
				'<ul><li>Trade routes brought Hinduism, Islam, and Buddhism</li><li>Conquest and colonization (e.g., Delhi Sultanate)</li><li>Missionaries and local adaptation helped establish new syncretic traditions</li></ul>',
				'<strong>State Building in South Asia</strong>',
				'<ul><li>Delhi Sultanate:<ul><li>Struggled to impose Islam on Hindu-majority India</li><li>Faced resistance from Rajput kingdoms</li></ul></li><li>Vijayanagara Empire:<ul><li>Formed by Hindu converts who reconverted and resisted Muslim rule</li></ul></li></ul>',
				'<strong>Southeast Asian States</strong>',
				'<ul><li>Sea-based empires:<ul><li>Srivijaya:<ul><li>Buddhist</li><li>Controlled Strait of Malacca</li><li>Grew rich via trade taxes</li></ul></li><li>Majapahit:<ul><li>Hindu-Buddhist influence</li><li>Power via tributary networks</li></ul></li></ul></li><li>Land-based empires:<ul><li>Sinhala Dynasties: Indigenous rulers of Sri Lanka</li><li>Khmer Empire:<ul><li>Hindu roots, adopted Buddhist elements</li><li>Built Angkor Wat, showcasing religious syncretism</li></ul></li></ul></li></ul>',
			],
		],
	},
	{
		key: '1.4',
		title: '1.4 – State Building in the Americas (c. 1200–1450)',
		bullets: [
			[
				'<strong>Mesoamerican Civilizations</strong>',
				'<ul><li>Maya (250–900 CE):<ul><li>City-states, advanced math and astronomy, calendar</li><li>Hieroglyphic writing</li><li>Religion included human sacrifice to energize the sun</li><li>Declined due to resource depletion and conflict</li></ul></li><li>Aztecs (1345–1528 CE):<ul><li>Semi-nomadic Mexica rose via military and alliances</li><li>Capital: Tenochtitlán, built on a lake</li><li>Tributary system: conquered regions paid goods/labor</li><li>Economy: Chinampas (floating gardens), bustling markets</li><li>Expanded empire for religious reasons (human sacrifice)</li></ul></li></ul>',
				'<strong>Andean Civilizations</strong>',
				'<ul><li>Wari: predecessor to Inca, collapsed ~1000 CE</li><li>Inca Empire:<ul><li>Centralized bureaucracy</li><li>Religion connected to politics</li><li>Mit’a system: labor tax for public works (roads, mining)</li><li>Built extensive road systems, used quipus (knotted record-keeping)</li></ul></li></ul>',
				'<strong>North American Civilizations</strong>',
				'<ul><li>Mississippian Culture:<ul><li>First major civilization in North America</li><li>Based around agriculture and mound-building (e.g., Cahokia)</li><li>Matrilineal, hierarchical societies ruled by Great Sun</li></ul></li><li>Chaco & Mesa Verde:<ul><li>Southwest U.S.</li><li>Built cliff dwellings and developed water storage</li><li>Chaco used stone masonry and imported timber for construction</li></ul></li></ul>',
			],
		],
	},
	{
		key: '1.5',
		title: '1.5 – State Building in Africa (c. 1200–1450)',
		bullets: [
			[
				'<strong>East African Coast – Swahili Civilization</strong>',
				'<ul><li>Emerged in 8th century; thriving cities like Kilwa and Mombasa</li><li>Major Indian Ocean trade participants (gold, ivory, slaves)</li><li>Adopted Islam, especially among elites</li><li>Language: Swahili (Bantu + Arabic)</li></ul>',
				'<strong>Great Zimbabwe</strong>',
				'<ul><li>Inland empire, controlled gold trade</li><li>Built massive stone capital; largest ancient structure south of the pyramids</li><li>Agriculture + cattle herding</li><li>Did not convert to Islam</li></ul>',
				'<strong>West Africa – Hausa Kingdoms</strong>',
				'<ul><li>Independent city-states, linked via Trans-Saharan trade</li><li>Each had own king; rulers converted to Islam</li><li>Urbanized, commercialized middlemen for trade</li></ul>',
				'<strong>Ethiopia</strong>',
				'<ul><li>Christian kingdom, culturally distinct from Islamic neighbors</li><li>Built monumental stone churches</li><li>Traded across Mediterranean and Indian Ocean</li><li>Salt was a major commodity</li><li>Hierarchical monarchy</li></ul>',
				'<strong>Comparison: Swahili vs. Hausa</strong>',
				'<ul><li>Both:<ul><li>Urban, commercialized, trade-centric</li><li>Adopted Islam to connect to larger trade networks</li><li>Hierarchical systems under kings</li></ul></li><li>Differences:<ul><li>Swahili: Indian Ocean focus, maritime</li><li>Hausa: Trans-Saharan land trade</li></ul></li></ul>',
				'<strong>Europe (Contextual Comparison)</strong>',
				'<ul><li>Decentralized political structure post-Rome</li><li>Feudalism: land-based hierarchy of lords, vassals, knights</li><li>Serfs worked land, bound to manors</li><li>Gradual shift to centralization in late Middle Ages</li></ul>',
			],
		],
	},
];

// AP World Unit 1 Timeline Data
const timelineData = [
	{
		key: 'song',
		icon: '🈶',
		title: 'c. 960–1279 – Song Dynasty in China',
		summary: 'One of the most advanced empires in the world; expanded bureaucracy, promoted Neo-Confucianism, and led innovations in agriculture (like Champa rice) and industry (like steel production).',
		details: [],
	},
	{
		key: 'neo-confucianism',
		icon: '📜',
		title: 'c. 1100s–1300s – Rise of Neo-Confucianism',
		summary: 'A blend of Confucianism, Buddhism, and Daoism, became dominant ideology in Song China, reinforcing patriarchy and bureaucracy.',
		details: [],
	},
	{
		key: 'delhi',
		icon: '🕌',
		title: '1206 – Founding of the Delhi Sultanate (India)',
		summary: 'Muslim Turks establish Islamic rule in Northern India, beginning centuries of interaction between Islam and Hinduism.',
		details: [],
	},
	{
		key: 'genghis',
		icon: '⚔️',
		title: '1206 – Temujin Becomes Genghis Khan',
		summary: 'Unites the Mongol tribes; begins Mongol Empire, the largest land empire in world history.',
		details: [],
	},
	{
		key: 'trans-saharan',
		icon: '🐫',
		title: 'c. 1200–1450 – Flourishing of Trans-Saharan Trade',
		summary: 'Trade of gold, salt, and slaves between West Africa and North Africa; growth of empires like Mali.',
		details: [],
	},
	{
		key: 'pax-mongolica',
		icon: '💰',
		title: '1210s–1368 – Pax Mongolica ("Mongol Peace")',
		summary: 'Period of stability and safe trade across Eurasia under Mongol rule; enhanced Silk Roads and cultural exchange.',
		details: [],
	},
	{
		key: 'mali',
		icon: '🕌',
		title: 'c. 1230 – Rise of the Mali Empire',
		summary: 'West African empire that grew rich from Trans-Saharan trade; promoted Islam and education.',
		details: [],
	},
	{
		key: 'baghdad',
		icon: '📚',
		title: '1258 – Sack of Baghdad by Mongols',
		summary: 'Ends the Abbasid Caliphate; major blow to Islamic intellectual and political leadership.',
		details: [],
	},
	{
		key: 'marco-polo',
		icon: '🏯',
		title: '1271–1295 – Marco Polo’s Travels to Yuan China',
		summary: 'Venetian merchant visits Kublai Khan’s court, documents China’s wealth and grandeur in his famous travel writings.',
		details: [],
	},
	{
		key: 'majapahit',
		icon: '⛵',
		title: '1293 – Establishment of Majapahit Empire (Indonesia)',
		summary: 'Major Hindu-Buddhist sea-based empire in Southeast Asia; thrived on Indian Ocean trade.',
		details: [],
	},
	{
		key: 'swahili',
		icon: '🕌',
		title: '1300s – Spread of Islam in East Africa (Swahili Coast)',
		summary: 'Arab and Persian merchants bring Islam to coastal cities; results in creation of Swahili culture (blend of Bantu + Arabic).',
		details: [],
	},
	{
		key: 'mansa-musa',
		icon: '🧕',
		title: '1324 – Mansa Musa’s Hajj to Mecca',
		summary: 'King of Mali makes famous pilgrimage, spreading gold and promoting Islamic education and architecture across North Africa.',
		details: [],
	},
	{
		key: 'tenochtitlan',
		icon: '🕋',
		title: '1325 – Founding of Tenochtitlán (Aztec Empire)',
		summary: 'Capital city of the Aztecs, built on a lake in central Mexico; grew into a massive tribute empire.',
		details: [],
	},
	{
		key: 'ibn-battuta',
		icon: '🧳',
		title: '1325–1354 – Travels of Ibn Battuta',
		summary: 'Moroccan scholar travels across the Islamic world, from West Africa to India to China; documents customs, rulers, and societies.',
		details: [],
	},
	{
		key: 'zhu-xi',
		icon: '📖',
		title: 'c. 1330 – Compilation of the Zhu Xi Neo-Confucian curriculum',
		summary: 'Becomes the basis of the Chinese civil service exams; emphasized hierarchy and filial piety.',
		details: [],
	},
	{
		key: 'black-death',
		icon: '🦠',
		title: '1347–1351 – Black Death (Bubonic Plague)',
		summary: 'Spreads via Silk Roads and maritime trade from China to the Middle East and Europe; kills ⅓ to ½ of some regions\' populations.',
		details: [],
	},
	{
		key: 'aztec-rise',
		icon: '⛩️',
		title: 'c. 1350 – Rise of the Aztec Empire',
		summary: 'Mexica people establish dominance in Mesoamerica; empire built on military power and tribute, with human sacrifice central to religion.',
		details: [],
	},
	{
		key: 'inca-rise',
		icon: '🏔️',
		title: 'c. 1438 – Rise of the Inca Empire in the Andes',
		summary: 'Inca form a centralized empire with road systems, the mit’a labor system, and state religion; expands rapidly across South America.',
		details: [],
	},
];

// AP World Unit 1 Quiz Data
const quizData = [
	{
		question: `"The civil service exam system ensured a level of bureaucratic competence and was rooted in Confucian values, emphasizing the importance of hierarchy, merit, and social harmony."
Which of the following developments best explains the context for the civil service exam system in China during the Song dynasty?`,
		options: [
			'A. The spread of Islam across East Asia',
			'B. The influence of Mongol military tactics on Chinese government',
			'C. The revival and transformation of Confucianism into Neo-Confucianism',
			'D. The decline of trade networks like the Silk Roads',
		],
		answer: 'C',
		explanation: 'Neo-Confucianism, a revival and transformation of Confucian thought, became the dominant ideology in Song China. It justified the civil service exam system, emphasizing hierarchy, merit, and social harmony as core values for bureaucratic governance.',
	},
	{
		question: `"The Swahili city-states along the East African coast were bustling hubs of trade, adorned with grand mosques and infused with Arab and Islamic cultural elements."
What does this description suggest about Swahili coastal cities during the period 1200–1450?`,
		options: [
			'A. They were entirely isolated from outside influences.',
			'B. They adopted Hinduism as the primary religion due to Indian merchants.',
			'C. They were integrated into the Islamic world through trade.',
			'D. They rejected all foreign architectural influences.',
		],
		answer: 'C',
		explanation: 'The Swahili city-states were deeply connected to the Indian Ocean trade network, which brought Islamic religion, architecture, and culture to the region. Their prosperity and cosmopolitan character reflected this integration.',
	},
	{
		question: 'Which of the following best explains the success of the Mali Empire in West Africa during the 13th and 14th centuries?',
		options: [
			'A. Its dependence on Mongol protection through the Silk Roads',
			'B. Its exploitation of gold and salt trade through the Trans-Saharan network',
			'C. Its naval dominance over the Indian Ocean trade routes',
			'D. Its early industrialization and production of steel tools',
		],
		answer: 'B',
		explanation: 'Mali’s wealth and power came from controlling and taxing the lucrative gold and salt trade across the Sahara, which allowed it to flourish as a major empire in West Africa.',
	},
	{
		question: `"Our country, though small and remote, has always honored scholarship and upheld the Way of the Buddha."
—Letter from the Japanese emperor to the Tang emperor, 7th century
Which of the following does this quote best illustrate about East Asia before and during the period 1200–1450?`,
		options: [
			'A. China’s cultural dominance over its neighbors through a tribute system',
			'B. Japan’s total political submission to Chinese imperial rule',
			'C. The rejection of Confucian and Buddhist ideas by surrounding regions',
			'D. Korea’s military dominance over China in the early medieval period',
		],
		answer: 'A',
		explanation: 'The quote shows how China’s neighbors, like Japan, respected and adopted Chinese cultural and religious ideas through the tribute system, even while maintaining political independence.',
	},
	{
		question: 'The spread of Champa rice into China during the Song Dynasty is most directly an example of:',
		options: [
			'A. Bureaucratic corruption in the Chinese government',
			'B. The growing role of Confucianism in Chinese society',
			'C. Environmental and agricultural diffusion through trade',
			'D. The influence of the Mongols on agricultural practices',
		],
		answer: 'C',
		explanation: 'Champa rice was introduced to China from Vietnam, demonstrating how agricultural innovations spread through trade and contributed to population growth.',
	},
	{
		question: 'How did the Mongol Empire contribute to the increased exchange of goods and ideas during the 13th and 14th centuries?',
		options: [
			'A. They established a unified currency across Eurasia.',
			'B. They built oceanic naval trade networks to connect with Africa.',
			'C. They secured and unified trade routes, leading to greater cross-cultural contact.',
			'D. They banned long-distance trade to protect their own local economies.',
		],
		answer: 'C',
		explanation: 'The Mongols created the largest contiguous land empire in history, securing the Silk Roads and making travel and trade safer, which led to increased cross-cultural exchange (Pax Mongolica).',
	},
	{
		question: 'Which of the following best describes a continuity in South Asian religious culture during the period 1200–1450?',
		options: [
			'A. The decline of Hinduism and the complete adoption of Islam',
			'B. The persistence of caste structures reinforced by Hindu beliefs',
			'C. The rise of Christianity among Indian elites',
			'D. The replacement of Buddhism with Zoroastrianism',
		],
		answer: 'B',
		explanation: 'Despite the arrival of Islam and other changes, the caste system and Hindu beliefs remained central to South Asian society throughout this period.',
	},
	{
		question: 'The establishment of diasporic merchant communities in East Africa and Southeast Asia during the postclassical era most directly contributed to:',
		options: [
			'A. The decline of urbanization in coastal cities',
			'B. The growth of local animist religions',
			'C. Cultural syncretism and the spread of Islam',
			'D. A global economic depression',
		],
		answer: 'C',
		explanation: 'Diasporic communities of Muslim merchants helped spread Islam and blended local and foreign traditions, creating new syncretic cultures in port cities.',
	},
	{
		question: 'What was one major effect of the spread of the Black Death across Eurasia in the mid-14th century?',
		options: [
			'A. A significant population increase in China and Europe',
			'B. The Mongol Empire\'s expansion into sub-Saharan Africa',
			'C. Labor shortages and social unrest due to mass death',
			'D. The decline of oceanic trade routes in the Indian Ocean',
		],
		answer: 'C',
		explanation: 'The Black Death killed a huge portion of the population, leading to labor shortages, economic disruption, and social upheaval across Eurasia.',
	},
	{
		question: 'Which of the following developments in the Americas best illustrates state-building during 1200–1450?',
		options: [
			'A. The spread of Christianity through European missionaries',
			'B. The construction of road systems by the Inca to connect their empire',
			'C. The introduction of metal tools by Mongol invaders',
			'D. The rise of centralized city-states under the Umayyads',
		],
		answer: 'B',
		explanation: 'The Inca built an extensive road network to unify their vast Andean empire, a key example of state-building in the Americas during this era.',
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
				<div key={currentHeader + Math.random()} className="font-semibold text-green-700 mb-1 text-base">
					{currentHeader}
				</div>
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
			// Remove nested <ul> and <li> tags for sub-bullets
			// We'll just render the HTML for now, but could parse further for more control
			currentList.push(listMatch[1].replace(/<ul>/g, '<ul class=\'list-disc pl-6 space-y-1\'>').replace(/<li>/g, '<li class=\'text-slate-700 text-base leading-relaxed\'>'));
		} else {
			// fallback: treat as a header if it looks like one
			flush();
			result.push(
				<div key={bullet + Math.random()} className="font-semibold text-green-700 mb-1 text-base" dangerouslySetInnerHTML={{ __html: bullet }} />
			);
		}
	}
	flush();
	return result;
};

const APWorldUnit1: React.FC = () => {
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState('topics');
	const [quizTab, setQuizTab] = useState(false);
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
					<h1 className="text-4xl font-bold text-green-800">AP World Unit 1: The Global Tapestry (c. 1200–1450)</h1>
					<p className="text-lg text-slate-600 mt-2">From Song China to the rise of global networks and empires.</p>
				</div>
				{/* Tabs */}
				<div className="flex justify-center border-b-2 border-slate-200 mb-8">
					<button
						onClick={() => { setActiveTab('topics'); setQuizTab(false); }}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'topics' && !quizTab ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
					>
						Key Topics
					</button>
					<button
						onClick={() => { setActiveTab('timeline'); setQuizTab(false); }}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'timeline' && !quizTab ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
					>
						Timeline
					</button>
					<button
						onClick={() => navigate('/ap-world-study-guide/unit/1/quiz')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${window.location.pathname === '/ap-world-study-guide/unit/1/quiz' ? 'border-b-4 border-green-700 text-green-800' : 'text-slate-500 hover:text-green-700'}`}
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				<div className="bg-white p-6 rounded-2xl shadow-lg">
					{activeTab === 'topics' && (
						<div className="space-y-4">
							{unit1Content.map((topic) => (
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
												{parseBullets(topic.bullets[0])}
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
					{quizTab && (
						<div className="text-center text-red-600 font-semibold">Please use the new quiz page.</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default APWorldUnit1;
