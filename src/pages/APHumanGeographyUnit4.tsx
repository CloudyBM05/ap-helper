import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit4Content = [
	{
		key: '4.1',
		title: '4.1: Introduction to Political Geography',
		bullets: [
			{
				subtopic: 'Sovereignty',
				points: [
					'The authority of a state to govern itself without external interference.',
				],
			},
			{
				subtopic: 'What is a State? Must have:',
				points: [
					'Defined borders',
					'Permanent population',
					'Sovereign government',
					'Recognition from other states',
					'195 recognized states by both the U.S. and U.N.',
				],
			},
			{
				subtopic: 'Types of political entities',
				points: [
					'State: Independent country',
					'Nation: Group of people with shared culture/history',
					'Nation-State: Borders align with a single national group (e.g., Japan)',
					'Stateless Nation: A nation without a state (e.g., Kurds)',
					'Multinational State: Multiple national groups (e.g., U.S., Russia)',
					'Multi-State Nation: National group spread across countries (e.g., Koreans)',
					'Autonomous Region: High self-governance (e.g., Hong Kong)',
					'Semi-Autonomous Region: Partial self-governance (e.g., Nunavut)',
				],
			},
			{
				subtopic: 'Territoriality',
				points: [
					'The attempt by groups to control land through boundaries and sovereignty.',
					'Political lines/boundaries shape control and can change the meaning of territory.',
				],
			},
		],
	},
	{
		key: '4.2',
		title: '4.2: Political Entities',
		bullets: [
			{
				subtopic: 'Nation',
				points: ['A group sharing culture, language, and a homeland.'],
			},
			{
				subtopic: 'Self-determination',
				points: ['Right for nations to govern themselves.'],
			},
			{
				subtopic: 'Nation-State',
				points: ["Nation’s homeland matches state's borders."],
			},
			{
				subtopic: 'Multinational States',
				points: ['Countries with multiple national groups (e.g., Canada).'],
			},
			{
				subtopic: 'Multi-State Nation',
				points: [
					'A nation that exists across borders (e.g., Kurds, Koreans).',
				],
			},
			{
				subtopic: 'Autonomous vs. Semi-Autonomous Regions',
				points: [
					'Autonomous: Full self-rule',
					'Semi-Autonomous: Partial control, still subordinate to central gov.',
				],
			},
		],
	},
	{
		key: '4.3',
		title: '4.3: Political Power & Territoriality',
		bullets: [
			{
				subtopic: 'Evolution of the modern state',
				points: ['Over 600 years through war, economy, and identity.'],
			},
			{
				subtopic: 'Nationalism',
				points: [
					'Loyalty to the nation over a king; emerged with Enlightenment.',
				],
			},
			{
				subtopic: 'Core Area Theory',
				points: ['Nations form around resource-rich “core” regions.'],
			},
			{
				subtopic: 'Imperialism vs. Colonialism',
				points: [
					'Imperialism: Political/economic control',
					'Colonialism: Physical settlement + exploitation',
				],
			},
			{
				subtopic: 'Post-WWII Decolonization',
				points: ['Former colonies in Africa/Asia gain independence.'],
			},
			{
				subtopic: 'Devolution',
				points: [
					'Central gov. gives power to regional units (e.g., Spain’s Basque Region).',
				],
			},
			{
				subtopic: 'Regionalism',
				points: ['Preference for regional autonomy (e.g., Catalonia).'],
			},
			{
				subtopic: 'Superimposed Boundaries',
				points: [
					'Drawn by external powers, often ignoring cultural divides.',
				],
			},
			{
				subtopic: 'Rwanda Genocide',
				points: [
					'Legacy of Belgian colonial favoritism toward Tutsis.',
				],
			},
		],
	},
	{
		key: '4.4',
		title: '4.4: Defining Boundaries',
		bullets: [
			{
				subtopic: 'Boundary Types',
				points: [
					'Defined: Legal documentation (treaty, deed)',
					'Delimited: Drawn on map',
					'Demarcated: Physical marks (walls, signs)',
					'Administered: How it is managed and enforced',
				],
			},
			{
				subtopic: 'Political Boundaries',
				points: [
					'Relic: No longer exists but leaves impact (e.g., Berlin Wall)',
					'Antecedent: Established before population (e.g., U.S.–Canada)',
					'Subsequent: After settlement, reflects cultural landscape',
					'Consequent: Drawn to accommodate cultural/ethnic boundaries',
					'Superimposed: Imposed by outsiders (e.g., Africa)',
					'Geometric: Straight lines, not based on culture/landforms (e.g., U.S. western borders)',
				],
			},
			{
				subtopic: 'Geopolitical Theories',
				points: [
					'Organic Theory (Ratzel): States grow like living organisms',
					'Heartland Theory (Mackinder): Control East Europe = Control the world',
					'Rimland Theory (Spykman): Coastal power > inland power',
				],
			},
		],
	},
	{
		key: '4.5',
		title: '4.5: Political Boundaries and Disputes',
		bullets: [
			{
				subtopic: 'Boundary Dispute Types',
				points: [
					'Definitional: Conflicting interpretation of documents/maps',
					'Locational: Disagreement about actual boundary location',
					'Operational: Disputes about function/admin (e.g., immigration)',
					'Allocational: Conflict over natural resources',
				],
			},
			{
				subtopic: 'State Morphology (Shapes)',
				points: [
					'Compact: Efficient (e.g., Poland)',
					'Elongated: Long/narrow (e.g., Chile)',
					'Prorupted: With a projecting extension (e.g., Thailand)',
					'Perforated: Contains another state (e.g., South Africa surrounds Lesotho)',
					'Fragmented: Scattered parts (e.g., Indonesia)',
					'Enclave: Surrounded by another state but not part of it',
					'Exclave: Part of a country separated from the main area',
					'Landlocked States: Lack access to sea, causing economic disadvantages',
				],
			},
			{
				subtopic: 'Law of the Sea (UNCLOS)',
				points: [
					'Territorial Sea: 12 nautical miles (sovereign)',
					'Contiguous Zone: 12–24 miles (limited control)',
					'EEZ (Exclusive Economic Zone): Up to 200 miles (resource rights)',
					'High Seas: Beyond EEZ, open to all nations',
				],
			},
		],
	},
	{
		key: '4.6',
		title: '4.6: Internal Boundaries and Gerrymandering',
		bullets: [
			{
				subtopic: 'Voting Districts',
				points: ['Geographic areas for electing representatives.'],
			},
			{
				subtopic: 'Reapportionment',
				points: ['Redistribution of seats in House based on census.'],
			},
			{
				subtopic: 'Redistricting',
				points: ['Redrawing district boundaries within a state.'],
			},
			{
				subtopic: 'Gerrymandering',
				points: [
					'Drawing boundaries to favor one party.',
					'Packing: Concentrating opposition into one district.',
					'Cracking: Splitting opposition across districts.',
				],
			},
			{
				subtopic: 'Consequences',
				points: [
					'Reduces competition',
					'Strengthens partisanship',
					'Dilutes minority representation',
				],
			},
		],
	},
	{
		key: '4.7',
		title: '4.7: Forms of Governance',
		bullets: [
			{
				subtopic: 'Unitary States',
				points: [
					'Centralized authority',
					'Small countries (e.g., France)',
					'Can be democratic or authoritarian',
				],
			},
			{
				subtopic: 'Federal States',
				points: [
					'Power shared between national and regional govs',
					'Large/diverse countries (e.g., U.S., India)',
					'Better for representing minorities',
				],
			},
			{
				subtopic: 'Democracy',
				points: ['Free press, elections, multiple parties'],
			},
			{
				subtopic: 'Autocracy',
				points: ['Single ruler/party, suppressed dissent (e.g., China)'],
			},
			{
				subtopic: 'Anocracy',
				points: ['Hybrid of democracy and autocracy'],
			},
			{
				subtopic: 'Apartheid (South Africa)',
				points: ['Institutionalized racial segregation until 1991'],
			},
		],
	},
	{
		key: '4.8',
		title: '4.8: Devolution',
		bullets: [
			{
				subtopic: 'Definition',
				points: ['Power shifts from central gov to subnational units'],
			},
			{
				subtopic: 'Devolution Causes',
				points: [
					'Physical Geography: Isolation (e.g., islands, mountains)',
					'Ethnic Separatism: Discrimination → demands for autonomy',
					'Civil War/Ethnic Cleansing: Yugoslavia’s breakup into 7 states',
					'Balkanization: Fragmentation into hostile units',
					'Cold War Legacy: Proxy wars, Satellite states dominated by USSR',
					'Terrorism: Used to promote devolution (e.g., Al-Qaeda)',
					'Irredentism: Movement to reunite a "lost" territory (e.g., Russia/Crimea)',
					'Regionalism Examples: Spain’s Basque & Catalonia, Canada’s Nunavut',
				],
			},
		],
	},
	{
		key: '4.9',
		title: '4.9: Supranationalism and Challenges to Sovereignty',
		bullets: [
			{
				subtopic: 'Supranationalism',
				points: [
					'3+ states form an alliance for common goals.',
					'Examples: UN, EU, NATO, ASEAN, WTO, USMCA',
				],
			},
			{
				subtopic: 'Benefits',
				points: [
					'Trade',
					'Environmental agreements',
					'Military protection',
					'Shared technology',
				],
			},
			{
				subtopic: 'Challenges',
				points: ['Must give up some sovereignty'],
			},
			{
				subtopic: 'Transnational Corporations (TNCs)',
				points: [
					'Operate globally',
					'Exploit lower taxes, weaker laws',
					'Undermine state authority',
				],
			},
			{
				subtopic: 'Technology & Sovereignty',
				points: [
					'Aids protestors (social media)',
					'Helps expose abuse',
					'Can be censored by autocratic regimes',
				],
			},
		],
	},
	{
		key: '4.10',
		title: '4.10: Centripetal and Centrifugal Forces',
		bullets: [
			{
				subtopic: 'Centrifugal Forces',
				points: [
					'Pull a state apart',
					'Ethnic divisions',
					'Unequal development',
					'Reiligious/language differences',
					'Poor infrastructure',
					'Can result in: Civil wars, Stateless nations, Failed states',
				],
			},
			{
				subtopic: 'Centripetal Forces',
				points: [
					'Unify a state',
					'Common language',
					'National identity (e.g., flags, holidays, education)',
					'Economic equality/infrastructure',
					'Free/fair elections',
				],
			},
			{
				subtopic: 'Failed States',
				points: [
					'Government unable to provide basic services',
				],
			},
			{
				subtopic: 'Stateless Nations',
				points: [
					'National group seeks self-rule (e.g., Palestinians)',
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

const APHumanGeographyUnit4 = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<'topics' | 'quiz'>('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	// When the user clicks the "Take Quiz" tab, immediately navigate to the quiz page
	const handleTabClick = (tab: 'topics' | 'quiz') => {
		if (tab === 'quiz') {
			navigate('/ap-human-geography/unit/4/quiz');
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
						AP Human Geography Unit 4: Political Patterns & Processes
					</h1>
					<p className="text-lg text-slate-600 mt-2">
						Key concepts and processes for AP Human Geography Unit 4.
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
							{unit4Content.map((section) => (
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

export default APHumanGeographyUnit4;
