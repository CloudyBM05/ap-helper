import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit2Content = [
	{
		key: '2.1',
		title: '2.1: Population Distribution',
		bullets: [
			{
				subtopic: 'Major Population Clusters',
				points: [
					'South Asia: India, Bangladesh, Sri Lanka — near rivers (Ganges) and coasts.',
					'East Asia: China, Japan, Korea — near major rivers (Yangtze) and fertile plains.',
					'Southeast Asia: Thailand, Vietnam, Philippines — islands, deltas, and coastal regions.',
					'Europe: Dense populations near coal and iron reserves due to Industrial Revolution.',
				],
			},
			{
				subtopic: 'Factors Affecting Settlement Patterns',
				points: [
					'Physical Factors:',
					'Favorable climates (temperate).',
					'Landforms (flat, arable land).',
					'Access to water (rivers, oceans).',
					'Natural resources (minerals, fertile soil).',
					'Human Factors:',
					'Job opportunities and services.',
					'Cultural communities and acceptance.',
					'Historical trade routes and migration patterns.',
					'Political stability and security.',
				],
			},
			{
				subtopic: 'Population Distribution & Density',
				points: [
					'Population distribution: Pattern of where people live — can be dispersed or clustered.',
					'Arithmetic Density: Population ÷ Total Land Area. General measure of density, doesn’t account for usable land.',
					'Physiological Density: Population ÷ Arable (Farmable) Land. Measures strain on food-producing land.',
					'Agricultural Density: Farmers ÷ Arable Land. High: subsistence farming, low mechanization. Low: advanced agriculture, more machines.',
				],
			},
		],
	},
	{
		key: '2.2',
		title: '2.2: Consequences of Population Distribution',
		bullets: [
			{
				subtopic: 'Political',
				points: [
					'High population = more representation and political influence.',
					'Impacts voting districts (redistricting, gerrymandering).',
				],
			},
			{
				subtopic: 'Economic',
				points: [
					'High density: Large labor market. Economic diversity. Higher taxes, higher living costs.',
					'Low density: Fewer services, more self-reliance. Lower cost of living and fewer economic opportunities.',
				],
			},
			{
				subtopic: 'Social',
				points: [
					'High density: Better access to hospitals, schools, cultural activities.',
					'Low density: Fewer specialized services. Stronger sense of community.',
				],
			},
			{
				subtopic: 'Environmental',
				points: [
					'High density: more pollution, urban sprawl, loss of green space.',
					'Low density: preserved environments and ecosystems.',
				],
			},
			{
				subtopic: 'Carrying Capacity',
				points: [
					'The environment’s ability to support population without degradation.',
					'Exceeding it causes: food shortages, soil depletion, desertification.',
				],
			},
		],
	},
	{
		key: '2.3',
		title: '2.3: Population Composition',
		bullets: [
			{
				subtopic: 'Demographic Characteristics',
				points: ['Age, sex, ethnicity, income, occupation, education level.'],
			},
			{
				subtopic: 'Population Pyramid',
				points: [
					'Y-axis: Age cohorts.',
					'X-axis: % or number of males (left) and females (right).',
					'Used to assess development, needs, and future challenges.',
				],
			},
			{
				subtopic: 'Age Categories',
				points: [
					'0–14: Pre-reproductive.',
					'15–44: Reproductive.',
					'45+: Post-reproductive.',
				],
			},
			{
				subtopic: 'Sex Ratio',
				points: [
					'Sex Ratio = (Male births / Female births) × 100.',
					'100: more male births; <100: more female births.',
				],
			},
			{
				subtopic: 'Dependency Ratios',
				points: [
					'Measures economic burden on working-age population (15–64):',
					'Total Dependency Ratio: (0–14 + 65+) / (15–64) × 100.',
					'Child Dependency: (0–14) / (15–64) × 100.',
					'Elderly Dependency: (65+) / (15–64) × 100.',
				],
			},
		],
	},
	{
		key: '2.4',
		title: '2.4: Population Dynamics',
		bullets: [
			{
				subtopic: 'Key Rates',
				points: [
					'Crude Birth Rate (CBR): Births per 1,000 people.',
					'Crude Death Rate (CDR): Deaths per 1,000 people.',
					'Natural Increase Rate (NIR): NIR = CBR - CDR.',
				],
			},
			{
				subtopic: 'Doubling Time',
				points: ['Time it takes for population to double at current growth rate.'],
			},
			{
				subtopic: 'Total Fertility Rate (TFR)',
				points: [
					'Average children per woman.',
					'2.1 is replacement level:',
					'<2.1: shrinking population.',
					'2.1: growing population.',
				],
			},
			{
				subtopic: 'Infant Mortality Rate (IMR)',
				points: ['Infant deaths (<1 year) per 1,000 live births.'],
			},
			{
				subtopic: 'Influencing Factors',
				points: [
					'Health and education lower TFR and IMR.',
					'Urbanization and women’s rights lower fertility.',
					'Economic development reduces family size.',
					'Government policies can restrict or promote growth.',
				],
			},
		],
	},
	{
		key: '2.5',
		title: '2.5: The Demographic Transition Model (DTM)',
		bullets: [
			{
				subtopic: 'DTM Stages',
				points: [
					'Stage 1: High CBR, High CDR, Low NIR. Pre-industrial, subsistence, no countries today.',
					'Stage 2: High CBR, ↓ CDR, ↑↑ NIR. Tech advances reduce death rate, urbanizing (e.g., Afghanistan).',
					'Stage 3: ↓ CBR, ↓ CDR, Moderate NIR. Women’s rights, urban economy, family planning (e.g., Mexico).',
					'Stage 4: Low CBR, Low CDR, Low NIR. Aging population, stable growth (e.g., U.S., China).',
					'Stage 5: ↓↓↓ CBR, Low CDR, Negative NIR. Declining pop, economic strain (e.g., Japan, Germany).',
					'Migration not included in DTM but can influence NIR.',
				],
			},
			{
				subtopic: 'Epidemiologic Transition Model',
				points: [
					'Stage 1: Infectious diseases, famine.',
					'Stage 2: Fewer pandemics, sanitation.',
					'Stage 3: Degenerative (e.g., heart disease).',
					'Stage 4: Delayed degenerative (treatable).',
					'Stage 5: Reemergence of infectious disease due to evolution, urbanization, poverty.',
				],
			},
		],
	},
	{
		key: '2.6',
		title: '2.6: Malthusian Theory',
		bullets: [
			{
				subtopic: 'Malthus’ Argument',
				points: [
					'Pop grows exponentially; food grows arithmetically.',
					'Predicts crisis: famine, war, disease.',
				],
			},
			{
				subtopic: 'Reality',
				points: [
					'Underestimated technological advances in agriculture.',
					'Food supply increased faster than predicted.',
				],
			},
			{
				subtopic: 'Neo-Malthusians',
				points: [
					'Argue resource scarcity is still relevant.',
					'Concerned with depletion of water, land, and energy.',
				],
			},
		],
	},
	{
		key: '2.7',
		title: '2.7: Population Policies',
		bullets: [
			{
				subtopic: 'Pro-Natalist Policies',
				points: [
					'Encourage births (e.g., tax incentives, maternity leave).',
					'Used in countries with aging populations (e.g., France, Japan).',
				],
			},
			{
				subtopic: 'Anti-Natalist Policies',
				points: [
					'Discourage births (e.g., China’s One-Child Policy).',
					'Aim to reduce overpopulation and strain on resources.',
				],
			},
			{
				subtopic: 'Migration Policies',
				points: [
					'Influence who enters/leaves a country.',
					'Based on economic needs (e.g., labor shortages), national security, cultural or religious values.',
				],
			},
		],
	},
	{
		key: '2.8',
		title: '2.8: Women and Demographic Changes',
		bullets: [
			{
				subtopic: 'Development & Gender Equality',
				points: [
					'Economic development = more opportunities for women.',
					'Education delays marriage and childbirth.',
					'Healthcare access reduces IMR, TFR, and maternal mortality.',
				],
			},
			{
				subtopic: 'Impact of Inequality',
				points: [
					'Less access = higher fertility rates, greater health risks.',
				],
			},
			{
				subtopic: 'Migration Patterns',
				points: [
					'Women more likely to migrate internally (within country).',
					'Men traditionally migrate internationally, though this is changing.',
				],
			},
			{
				subtopic: 'Ravenstein’s Laws of Migration',
				points: [
					'Most migration = economic and short distance.',
					'Young adults most likely to migrate.',
					'Urban areas attract migrants.',
					'Migration often occurs in steps.',
				],
			},
			{
				subtopic: 'Gravity Model',
				points: [
					'Migration is related to population size and inversely related to distance.',
				],
			},
		],
	},
	{
		key: '2.9',
		title: '2.9: Aging Populations',
		bullets: [
			{
				subtopic: 'Causes',
				points: [
					'Low TFR, high life expectancy.',
					'Common in developed countries.',
				],
			},
			{
				subtopic: 'Challenges',
				points: [
					'Higher dependency ratio.',
					'Strain on healthcare, pensions.',
					'Fewer workers to support the economy.',
				],
			},
			{
				subtopic: 'Solutions',
				points: [
					'Pro-natalist incentives.',
					'Immigration to offset labor shortages.',
				],
			},
		],
	},
	{
		key: '2.10',
		title: '2.10: Causes of Migration',
		bullets: [
			{
				subtopic: 'Push Factors (make people leave)',
				points: [
					'Economic: unemployment, poverty.',
					'Political: war, persecution.',
					'Social: discrimination, lack of services.',
					'Environmental: natural disasters, pollution.',
				],
			},
			{
				subtopic: 'Pull Factors (attract people)',
				points: [
					'Economic: jobs, better wages.',
					'Political: stability, freedom.',
					'Social: education, healthcare.',
					'Environmental: favorable climate, safety.',
				],
			},
			{
				subtopic: 'Key Terms',
				points: [
					'Emigration: exiting a country.',
					'Immigration: entering a country.',
					'Intervening obstacles: barriers (e.g., visa laws).',
					'Intervening opportunities: better prospects that halt original plan.',
				],
			},
		],
	},
	{
		key: '2.11',
		title: '2.11: Forced and Voluntary Migration',
		bullets: [
			{
				subtopic: 'Forced Migration',
				points: [
					'Causes: war, human trafficking, ethnic cleansing.',
					'Refugees: cross borders for safety.',
					'IDPs: displaced within their own country.',
				],
			},
			{
				subtopic: 'Voluntary Migration',
				points: [
					'Chosen movement for better life.',
					'Types:',
					'Transnational: country to country.',
					'Step migration: moves in stages.',
					'Chain migration: follows family/community.',
					'Guest workers: temporary labor migrants.',
					'Transhumance: seasonal livestock movement.',
					'Rural-to-urban: job-seeking.',
					'Intra-regional: within region.',
					'Inter-regional: between regions.',
				],
			},
		],
	},
	{
		key: '2.12',
		title: '2.12: Effects of Migration',
		bullets: [
			{
				subtopic: 'Political',
				points: [
					'Citizenship debates.',
					'Policy changes based on migration flow.',
				],
			},
			{
				subtopic: 'Economic',
				points: [
					'Increases labor force and productivity.',
					'Brain drain from origin country.',
					'Boost to destination economy.',
				],
			},
			{
				subtopic: 'Cultural',
				points: [
					'Cultural blending, new ideas, and innovation.',
					'Sometimes leads to xenophobia or anti-immigrant sentiment.',
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

const APHumanGeographyUnit2 = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<'topics' | 'quiz'>('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	// When the user clicks the "Take Quiz" tab, immediately navigate to the quiz page
	const handleTabClick = (tab: 'topics' | 'quiz') => {
		if (tab === 'quiz') {
			navigate('/ap-human-geography/unit/2/quiz');
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
					<h1 className="text-4xl font-semibold text-emerald-800">
						AP Human Geography Unit 2: Population & Migration Patterns
					</h1>
					<p className="text-lg text-slate-600 mt-2">
						All the foundational concepts for AP Human Geography Unit 2.
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
							{unit2Content.map((section) => (
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

export default APHumanGeographyUnit2;
