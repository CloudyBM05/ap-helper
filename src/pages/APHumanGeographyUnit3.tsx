import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit3Content = [
	{
		key: '3.1',
		title: '3.1: Introduction to Culture',
		bullets: [
			{
				subtopic: 'Definition of Culture',
				points: [
					'Shared system of beliefs, values, norms, customs, language, religion, art, and practices of a group.',
					'Influences social behavior, identity, worldview, and interactions with others and the environment.',
				],
			},
			{
				subtopic: 'Cultural Landscape',
				points: [
					'The physical and visual imprint of a culture on the environment.',
					'Includes architecture, land use, agricultural patterns, urban layout, and monuments.',
				],
			},
			{
				subtopic: 'Influence of Culture on Society',
				points: [
					'Shapes laws, norms, and daily behavior.',
					'Affects economic structures (e.g., labor practices, markets), education systems, and family roles.',
					'Influences how communities respond to challenges (e.g., climate, disasters, modernization).',
					'Creates a sense of identity, community, and continuity across generations.',
				],
			},
			{
				subtopic: 'Relativism vs. Ethnocentrism',
				points: [
					'Cultural Relativism: Promotes understanding cultures on their own terms. Encourages appreciation of cultural diversity. Used in anthropology and sociology to avoid bias.',
					'Ethnocentrism: Judging other cultures by one’s own cultural standards. Can lead to stereotyping, prejudice, and cultural misunderstanding. Often promotes belief in cultural superiority.',
				],
			},
		],
	},
	{
		key: '3.2',
		title: '3.2: Cultural Landscapes',
		bullets: [
			{
				subtopic: 'Definition of Cultural Landscape',
				points: [
					'The visible result of human interaction with the physical environment.',
					'Reflects societal values, beliefs, and history through land use, buildings, spatial organization.',
				],
			},
			{
				subtopic: 'Postmodern Architecture',
				points: [
					'Emerged in late 20th century.',
					'Rejects the uniform, functional style of modernism.',
					'Features irony, historical references, ornamentation, and context-based design.',
					'Emphasizes individuality, culture, and environment in building design.',
				],
			},
			{
				subtopic: 'How Culture Shapes Land Use',
				points: [
					'Religious Beliefs: Sacred sites (temples, shrines, churches) dictate space use. Natural spaces often preserved for religious or spiritual purposes.',
					'Economic Practices: Agrarian cultures prioritize farmland. Industrialized cultures develop factories, infrastructure, and urban centers.',
					'Community Norms: Some emphasize communal land ownership (e.g., tribal societies). Others focus on private property and individual land rights.',
					'Aesthetic Values: Some cultures value harmony with nature → promote green spaces, eco-cities. Others favor monumental architecture, dense urban growth.',
				],
			},
			{
				subtopic: 'Culture and Resource Use',
				points: [
					'Resource Allocation: Based on cultural priorities (e.g., farming vs. conservation).',
					'Land Use Patterns: Spiritual cultures may preserve land. Technologically advanced cultures invest in infrastructure and innovation hubs.',
					'Community Structure: Collectivist cultures → shared farming, open public land. Individualistic cultures → fenced properties, zoning.',
					'Policy and Governance: Zoning laws and environmental policies reflect cultural values on land preservation or industrialization.',
				],
			},
		],
	},
	{
		key: '3.3',
		title: '3.3: Cultural Patterns',
		bullets: [
			{
				subtopic: 'Language and Sense of Place',
				points: [
					'Language reflects and shapes cultural identity.',
					'Local dialects and expressions tie people to a location.',
					'Helps maintain cultural heritage and community solidarity.',
					'Signage, literature, and media in native languages reinforce cultural belonging.',
				],
			},
			{
				subtopic: 'Religion and Sense of Place',
				points: [
					'Creates sacred spaces (churches, mosques, temples) that anchor communities.',
					'Rituals and pilgrimages foster spiritual and communal connections to the land.',
					'Religious teachings guide ethical behavior and environmental stewardship.',
				],
			},
			{
				subtopic: 'Ethnicity and Sense of Place',
				points: [
					'Ethnic identity influences festivals, cuisine, language, and social customs.',
					'Ethnic enclaves create cultural microcosms (e.g., Chinatown, Little Italy).',
					'Public art, architecture, and businesses reflect ethnic heritage.',
					'Shared identity fosters pride, unity, and rootedness.',
				],
			},
			{
				subtopic: 'Centripetal vs. Centrifugal Forces',
				points: [
					'Centripetal Forces (Unifying): Promote societal cohesion and solidarity. Examples: Shared Religion, Common Language, Cultural Events, Community Institutions, Public Spaces.',
					'Centrifugal Forces (Divisive): Undermine unity, lead to fragmentation or conflict. Examples: Ethnic Discrimination, Cultural Clashes, Religious Intolerance, Stereotyping & Prejudice, Exclusionary Practices.',
					'Ethnicity as Centripetal Force: Shared traditions, languages, and celebrations strengthen unity. Community centers, ethnic schools, and cultural organizations build solidarity. Common history and folklore reinforce belonging.',
					'Ethnicity as Centrifugal Force: Racial or ethnic discrimination can create alienation. Historical grievances between ethnic groups may erupt in civil conflict. Ethnic rivalries can lead to social unrest and violence.',
					'Religion as Centripetal Force: Brings people together for worship, festivals, charity. Sacred stories and rituals reinforce shared identity and values. Places of worship double as community support hubs.',
					'Religion as Centrifugal Force: Religious exclusivity may isolate or marginalize others. Fundamentalism can create divisions even within religious groups. Historical conflicts (e.g., Crusades, sectarian strife) demonstrate religion’s divisive potential.',
				],
			},
		],
	},
	{
		key: '3.4',
		title: '3.4: Types of Cultural Diffusion',
		bullets: [
			{
				subtopic: 'Cultural Diffusion',
				points: [
					'The spread of cultural elements (beliefs, traits, customs) from their place of origin to new areas.',
				],
			},
			{
				subtopic: 'Types of Diffusion',
				points: [
					'Relocation Diffusion: People move and bring their culture with them. Example: Mexican food in the U.S. Southwest.',
					'Expansion Diffusion: Culture spreads outward from a source while remaining strong at the origin.',
					'Contagious Diffusion: Rapid, widespread diffusion like a wave. Example: Internet memes, viral trends.',
					'Hierarchical Diffusion: Spread from authority or influential people downward. Example: Fashion trends starting in Paris and spreading to other cities.',
					'Stimulus Diffusion: Core idea spreads but is adapted or modified. Example: McDonald’s in India serving veggie burgers due to Hindu dietary restrictions.',
				],
			},
			{
				subtopic: 'Barriers to Diffusion',
				points: [
					'Physical: Mountains, oceans.',
					'Cultural: Language, religion, customs.',
					'Political: Government censorship, closed borders.',
				],
			},
		],
	},
	{
		key: '3.5',
		title: '3.5: Historical Causes of Diffusion',
		bullets: [
			{
				subtopic: 'Colonialism & Imperialism',
				points: [
					'Spread of European culture, language, religion, architecture globally.',
					'Often displaced or marginalized indigenous cultures.',
					'Examples: English in India, Catholicism in Latin America.',
				],
			},
			{
				subtopic: 'Trade',
				points: [
					'Silk Road, Trans-Saharan trade routes, Indian Ocean trade spread religion (Islam, Buddhism), language (Arabic), and food (spices, tea).',
					'Cultural syncretism (blending) occurred along trade routes.',
				],
			},
			{
				subtopic: 'Migration',
				points: [
					'Voluntary or forced (e.g., slavery, diaspora).',
					'Brings music, language, food, religion to new areas.',
					'Example: African influences in Caribbean music.',
				],
			},
			{
				subtopic: 'Technology',
				points: [
					'Printing press → faster spread of religion and literacy.',
					'Internet/social media → near-instant cultural diffusion.',
				],
			},
		],
	},
	{
		key: '3.6',
		title: '3.6: Contemporary Causes of Diffusion',
		bullets: [
			{
				subtopic: 'Globalization',
				points: [
					'Increased interconnectedness → accelerated cultural diffusion.',
					'Can create global culture but also provoke cultural resistance.',
				],
			},
			{
				subtopic: 'Technology',
				points: [
					'Internet, social media, mobile devices make culture global (music, fashion, slang).',
					'Example: K-pop or American pop culture going viral.',
				],
			},
			{
				subtopic: 'Media',
				points: [
					'TV, film, streaming platforms spread cultural values and norms globally.',
					'Example: American TV shows popular in multiple countries.',
				],
			},
			{
				subtopic: 'Politics',
				points: [
					'Government policies can either promote (e.g., national language) or resist (e.g., China’s censorship) cultural diffusion.',
				],
			},
			{
				subtopic: 'Economics',
				points: [
					'Global companies like McDonald\'s, Coca-Cola, and Apple spread corporate culture.',
					'Supply chains encourage intercultural interactions.',
				],
			},
			{
				subtopic: 'Urbanization',
				points: [
					'Diverse populations in cities promote cultural blending (e.g., New York’s food scene).',
				],
			},
		],
	},
	{
		key: '3.7',
		title: '3.7: Diffusion of Religion and Language',
		bullets: [
			{
				subtopic: 'Religion',
				points: [
					'Universalizing Religions: Seek to convert others, open to all people. Examples: Christianity, Islam, Buddhism.',
					'Spread through: Relocation Diffusion (Missionaries), Contagious Diffusion (Word of mouth, trade routes), Hierarchical Diffusion (Emperor Constantine converting to Christianity).',
					'Ethnic Religions: Tied to specific people/places; don’t actively seek converts. Examples: Judaism, Hinduism, Shinto. Spread mostly through relocation (diaspora).',
					'Syncretism: Blending of religious beliefs. Example: Voodoo (West African + Catholic).',
				],
			},
			{
				subtopic: 'Language',
				points: [
					'Lingua Franca: A common language used for trade between speakers of different languages. Example: English globally, Swahili in East Africa.',
					'Colonialism and Language: European colonizers imposed languages—French, Spanish, Portuguese, English—on colonized people. Many African and Asian countries use colonial languages officially.',
					'Creolization: When a pidgin language (simple trade language) becomes a native language with fuller grammar and vocabulary. Example: Haitian Creole (French + African languages).',
					'Language Revival: Efforts to bring back endangered or dead languages. Examples: Hebrew in Israel, Irish Gaelic in Ireland.',
				],
			},
		],
	},
];

function renderBullets(bullets: any[]) {
	return (
		<div className="space-y-4">
			{bullets.map((section: any, idx: number) => (
				<div key={idx}>
					<div className="font-semibold text-emerald-800 mb-1">
						{section.subtopic}
					</div>
					<ul className="list-disc ml-6 text-slate-700 space-y-1">
						{section.points.map((point: string, i: number) => (
							<li key={i}>{point}</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
}

const APHumanGeographyUnit3 = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<'topics' | 'quiz'>('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	// When the user clicks the "Take Quiz" tab, immediately navigate to the quiz page
	const handleTabClick = (tab: 'topics' | 'quiz') => {
		if (tab === 'quiz') {
			navigate('/ap-human-geography/unit/3/quiz');
		} else {
			setActiveTab('topics');
		}
	};

	return (
		<div className="min-h-screen bg-slate-50 text-slate-800">
			<div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
				<button
					onClick={() => navigate('/ap-human-geography-study-guide')}
					className="mb-6 px-4 py-2 rounded-lg bg-white text-emerald-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
					Back to Units
				</button>
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-emerald-800">
						AP Human Geography Unit 3: Cultural Patterns & Processes
					</h1>
					<p className="text-lg text-slate-600 mt-2">
						Key concepts and processes for AP Human Geography Unit 3.
					</p>
				</div>
				<div className="flex justify-center border-b-2 border-slate-200 mb-8">
					<button
						onClick={() => handleTabClick('topics')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'topics'
								? 'border-b-4 border-emerald-600 text-emerald-700'
								: 'text-slate-500 hover:text-emerald-600'
						}`}
					>
						Key Topics
					</button>
					<button
						onClick={() => handleTabClick('quiz')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'quiz'
								? 'border-b-4 border-emerald-600 text-emerald-700'
								: 'text-slate-500 hover:text-emerald-600'
						}`}
					>
						Take Quiz
					</button>
				</div>
				<div className="bg-white p-6 rounded-2xl shadow-lg">
					{activeTab === 'topics' && (
						<div className="space-y-4">
							{unit3Content.map((section) => (
								<div
									key={section.key}
									className="border-b border-slate-200 last:border-b-0 pb-4"
								>
									<button
										onClick={() => toggleTopic(section.key)}
										className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
									>
										<h3 className="text-xl font-semibold text-emerald-700">
											{section.title}
										</h3>
										<span className="text-2xl text-slate-500">
											{openTopic === section.key ? '-' : '+'}
										</span>
									</button>
									{openTopic === section.key && (
										<div className="p-4 bg-slate-50 rounded-b-lg">
											{renderBullets(section.bullets)}
										</div>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default APHumanGeographyUnit3;
