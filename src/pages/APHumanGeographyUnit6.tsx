import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit6Content = [
	{
		key: '6.1',
		title: '6.1 – The Origin and Influences of Urbanization',
		bullets: [
			{
				subtopic: 'Urbanization',
				points: [
					'Growth of cities from increased migration, industrialization, population growth, and transportation development.',
				],
			},
			{
				subtopic: 'Suburbanization',
				points: [
					'Emerged with the rise of cars, highways, and desire for space, influencing city sprawl.',
				],
			},
			{
				subtopic: 'Urban Hearths (first cities)',
				points: [
					'Mesopotamia, Nile Valley, Indus Valley, Yellow River, Mesoamerica.',
					'Developed due to agriculture, irrigation, centralized governance, and trade.',
				],
			},
			{
				subtopic: 'Site vs. Situation',
				points: [
					'Site = physical characteristics (rivers, natural resources).',
					'Situation = spatial relationships (trade routes, region).',
				],
			},
			{
				subtopic: 'Central Place Theory (Christaller)',
				points: [
					'Explains the distribution of services based on settlement size and hexagonal market areas.',
				],
			},
			{
				subtopic: 'Urban Hierarchy',
				points: [
					'Hamlet → Village → Town → City → Megacity.',
				],
			},
			{
				subtopic: 'Wirth’s Theory',
				points: [
					'Cities = large size, density, social heterogeneity.',
				],
			},
			{
				subtopic: 'Development Factors',
				points: [
					'Geographic (terrain, resources).',
					'Infrastructure (roads, ports).',
					'Economic base (agriculture, industry).',
					'Rural dispersion varies with land productivity.',
				],
			},
		],
	},
	{
		key: '6.2',
		title: '6.2 – Cities Across the World',
		bullets: [
			{
				subtopic: 'Urbanization Drivers',
				points: [
					'Jobs, infrastructure, education, services, rural-to-urban migration.',
				],
			},
			{
				subtopic: 'Urban Classifications',
				points: [
					'Urban Area: 50,000+',
					'Urban Cluster: 2,500–50,000',
					'MSA (Metropolitan Statistical Area), Micropolitan, PSA.',
				],
			},
			{
				subtopic: 'Megacities (10M+)',
				points: [
					'Often in Global South (Lagos, Mumbai), face informal housing, pollution, congestion.',
				],
			},
			{
				subtopic: 'Metacities (20M+)',
				points: [
					'Scale issues + regional dominance (Tokyo, Shanghai).',
				],
			},
			{
				subtopic: 'Global Cities',
				points: [
					'Hubs for finance, culture, connectivity (NYC, London, Singapore).',
				],
			},
			{
				subtopic: 'Suburbanization & Urban Sprawl',
				points: [
					'Driven by highways, car culture, cheaper land.',
					'Results in low-density development, infrastructure strain, car dependence.',
				],
			},
			{
				subtopic: 'Edge Cities',
				points: [
					'Suburban business hubs near highways (Tysons Corner).',
				],
			},
			{
				subtopic: 'Boomburbs',
				points: [
					'Rapidly growing suburban cities (Irvine, CA).',
				],
			},
			{
				subtopic: 'Exurbs',
				points: [
					'Wealthy outer suburbs, rural feel.',
				],
			},
			{
				subtopic: 'Garden City Movement (Ebenezer Howard)',
				points: [
					'Planned towns with greenbelts, radial design.',
				],
			},
		],
	},
	{
		key: '6.3',
		title: '6.3 – Cities and Globalization',
		bullets: [
			{
				subtopic: 'Wirth’s Urban Traits',
				points: [
					'Large population, high density, diverse population = distinct city life.',
				],
			},
			{
				subtopic: 'Global/World Cities',
				points: [
					'Centers for multinational HQs, finance, media (London, NYC, Tokyo).',
					'Strong connectivity via air, sea, digital infrastructure.',
				],
			},
			{
				subtopic: 'Urban Hierarchy',
				points: [
					'Hamlet → Village → Town → City → Metropolis → Megalopolis → Global City.',
				],
			},
			{
				subtopic: 'City Classifications',
				points: [
					'Alpha: Major global influence (NYC).',
					'Beta: Regional importance (Sydney).',
					'Gamma: Emerging global roles (Vancouver).',
				],
			},
			{
				subtopic: 'Cities as Nodes',
				points: [
					'Urban areas spread tech, culture, innovation.',
					'Key links in globalization networks (e.g., Singapore’s shipping + finance).',
				],
			},
			{
				subtopic: 'Size ≠ Influence',
				points: [
					'Some large cities lack global role (e.g., Kinshasa).',
					'Some small cities are influential (e.g., Geneva).',
				],
			},
		],
	},
	{
		key: '6.4',
		title: '6.4 The Size and Distribution of Cities',
		bullets: [
			{
				subtopic: 'City growth factors',
				points: [
					'Physical geography (e.g., rivers, flat terrain), transportation (e.g., highways, ports), economic opportunity, and historical or political factors.',
				],
			},
			{
				subtopic: 'Urban Hierarchy',
				points: [
					'Ranks settlements by services and population (e.g., town < city < metropolis).',
				],
			},
			{
				subtopic: 'Rank-Size Rule',
				points: [
					'Predicts city populations using a 1/n model; often applies in developed countries.',
				],
			},
			{
				subtopic: 'Primate Cities',
				points: [
					'Dominate in size and function (e.g., Paris, Mexico City); efficient but can cause inequality.',
				],
			},
			{
				subtopic: 'Central Place Theory',
				points: [
					'Explains spatial city distribution using concepts like range, threshold, and market area.',
				],
			},
			{
				subtopic: 'Gravity Model',
				points: [
					'Predicts city interaction based on population and distance.',
				],
			},
		],
	},
	{
		key: '6.5',
		title: '6.5 The Internal Structure of Cities',
		bullets: [
			{
				subtopic: 'Urban models',
				points: [
					'Burgess Model: concentric rings; income increases outward.',
					'Hoyt Model: sectors along transport routes; wealthier areas expand from CBD.',
					'Multiple Nuclei Model: several centers (e.g., business, housing); realistic for sprawling cities.',
					'Galactic Model: edge cities, beltways, and decentralized CBD—common in car-reliant suburbs.',
				],
			},
			{
				subtopic: 'Global Models',
				points: [
					'Latin America: spine of elite housing, shantytowns on the periphery.',
					'Southeast Asia: port-based cities, urban villages.',
					'Sub-Saharan Africa: three CBDs—colonial, traditional, market-based.',
				],
			},
			{
				subtopic: 'Bid-Rent Theory',
				points: [
					'Land value drops with distance from CBD; explains density and income distribution.',
				],
			},
		],
	},
	{
		key: '6.6',
		title: '6.6 Density and Land Use',
		bullets: [
			{
				subtopic: 'Population Density Types',
				points: [
					'Arithmetic: overall population per land area.',
					'Physiological: population per farmable land—shows pressure on agriculture.',
					'Agricultural: farmers per farmable land—shows farming efficiency.',
				],
			},
			{
				subtopic: 'Housing Density',
				points: [
					'Low: large lots, suburban sprawl.',
					'Medium: townhomes, transition areas.',
					'High: apartments in downtowns or dense cities.',
				],
			},
			{
				subtopic: 'Urban Land Use',
				points: [
					'Influenced by income, infrastructure, cultural values, and development.',
					'Infilling and redevelopment increase density over time.',
					'Bid-Rent Curve explains why commercial land sits near CBD and residential further out.',
				],
			},
			{
				subtopic: 'Impacts',
				points: [
					'Social: crowding vs. vibrancy.',
					'Economic: high land values in dense areas.',
					'Political: zoning conflicts, service demands.',
				],
			},
		],
	},
	{
		key: '6.7',
		title: '6.7: Infrastructure and Urban Development',
		bullets: [
			{
				subtopic: 'Infrastructure Definition',
				points: [
					'The fundamental systems and physical structures of a city: transportation, utilities, and social services.',
				],
			},
			{
				subtopic: 'Examples',
				points: [
					'Transportation: Roads, subways, airports.',
					'Utilities: Water supply, electricity, internet.',
					'Social Services: Schools, hospitals, parks.',
				],
			},
			{
				subtopic: 'Infrastructure determines:',
				points: [
					'Who can access resources and services.',
					'The efficiency of economic activity.',
					'The general quality of life.',
				],
			},
			{
				subtopic: 'Infrastructure and Economic Development',
				points: [
					'Well-developed infrastructure = improved job access, mobility, and trade.',
					'Example: Good roads shorten commutes, expand trade.',
					'Example: Reliable internet boosts tech and digital economies.',
				],
			},
			{
				subtopic: 'In developing countries:',
				points: [
					'Infrastructure may lag behind rapid urban growth.',
					'Limited roads, electricity, and public transit hinder development.',
					'Investment in infrastructure is often used as an economic growth strategy.',
				],
			},
			{
				subtopic: 'Social Inequality and Spatial Patterns',
				points: [
					'Infrastructure is unevenly distributed based on socio-political priorities.',
					'Wealthier areas often receive better services (clean water, transit, healthcare).',
					'Poorer areas suffer from neglect, overcrowding, and health issues.',
				],
			},
			{
				subtopic: 'Squatter Settlements',
				points: [
					'Informal housing built without legal claims.',
					'Usually found on the urban periphery in developing countries.',
					'Lack basic services like clean water, sanitation, and power.',
				],
			},
			{
				subtopic: 'Political Power and Infrastructure',
				points: [
					'Infrastructure investment reflects political power and decision-making.',
					'Influencing factors: Political favoritism in distributing services.',
					'Zoning and land-use laws shape how cities grow.',
				],
			},
			{
				subtopic: 'Forward Capitals',
				points: [
					'Capital cities are relocated to promote balanced development.',
					'Examples: Brazil: Rio de Janeiro → Brasília; Nigeria: Lagos → Abuja; Tanzania: Dar es Salaam → Dodoma.',
				],
			},
			{
				subtopic: 'Urban Growth & Sustainability Issues',
				points: [
					'Challenges with rapid urban growth: Aging infrastructure can\'t handle population surges.',
					'Leads to traffic congestion, blackouts, pollution, and poor water systems.',
				],
			},
			{
				subtopic: 'Primate Cities',
				points: [
					'One city dominates a country demographically and economically.',
					'Can create regional imbalance and strain infrastructure.',
				],
			},
			{
				subtopic: 'Smart Growth',
				points: [
					'Focus on sustainable energy, efficient transit, and equity.',
					'Aims to contain urban sprawl and protect the environment.',
				],
			},
		],
	},
	{
		key: '6.8',
		title: '6.8: Urban Sustainability',
		bullets: [
			{
				subtopic: 'Goals of Urban Sustainability',
				points: [
					'Make cities environmentally sustainable, socially inclusive, and economically viable for the long term.',
					'Reduce urban sprawl, promote walkability, and improve public transport.',
					'Encourage mixed-use development and strong community ties.',
				],
			},
			{
				subtopic: 'Sustainable Urban Design Strategies',
				points: [
					'Mixed-Use Development: Combines housing, retail, and offices in one walkable area.',
					'Walkability: Pedestrian-friendly infrastructure (sidewalks, compact blocks).',
					'Transit-Oriented Development (TOD): Developments centered around public transit stations.',
					'Smart Growth: Compact, infill development.',
				],
			},
			{
				subtopic: 'Notable Models and Policies',
				points: [
					'New Urbanism: A planning movement against urban sprawl. Features: Pedestrian-centered design, mixed land use, diverse housing, public spaces.',
					'Transect Zoning: Gradual change in density from city center to edge.',
					'Urban Revitalization: Redevelops underused urban areas.',
					'Greenbelts: Protected natural zones around cities.',
					'Slow-Growth Cities: Cities that restrict growth to prevent infrastructure strain and resource depletion.',
				],
			},
			{
				subtopic: 'Urban Sprawl and Its Problems',
				points: [
					'Definition: Low-density, car-dependent expansion.',
					'Consequences: Environmental degradation, traffic, pollution.',
					'High infrastructure cost and inefficient land use.',
					'Inequitable housing and poor access to services.',
				],
			},
			{
				subtopic: 'Sprawl vs. Sustainability',
				points: [
					'Sprawl = expansion and inefficiency.',
					'Sustainability = compact, walkable, and efficient city design.',
				],
			},
			{
				subtopic: 'Pros and Cons of These Strategies',
				points: [
					'Benefits: Reduces sprawl, improves health, strengthens community identity.',
					'Enhances green space and promotes equity (in theory).',
					'Criticisms: Gentrification can increase housing costs. Risk of income-based segregation. Sometimes erases local history/culture. Not always affordable or accessible for low-income groups.',
				],
			},
		],
	},
	{
		key: '6.9',
		title: '6.9: Urban Data',
		bullets: [
			{
				subtopic: 'Purpose of Urban Data',
				points: [
					'Helps analyze urban change and its effects on communities.',
					'Informs planning, policy-making, and identifies inequality.',
				],
			},
			{
				subtopic: 'Quantitative Data',
				points: [
					'Numerical data (e.g., statistics, surveys).',
					'Identify trends in population, housing, income, and services.',
					'Allocate public resources and measure inequality.',
					'Sources: Census data (most important), government surveys, economic reports.',
					'Example: Income maps or age breakdowns by neighborhood.',
				],
			},
			{
				subtopic: 'Census Data Deep Dive',
				points: [
					'Offers large-scale demographic information.',
					'Tracks: Population changes, housing trends (ownership vs. rental), household types and density.',
					'Often used to guide infrastructure and school planning, reveal segregation and inequity.',
				],
			},
			{
				subtopic: 'Mapping Spatial Patterns',
				points: [
					'Data helps visualize segregation, income disparity, and service access.',
					'Examples: Crime heat maps, transit access by income level, racial segregation in urban neighborhoods.',
				],
			},
			{
				subtopic: 'Qualitative Data',
				points: [
					'Non-numerical, descriptive data from people’s lived experiences.',
					'Sources: Interviews, focus groups, oral histories, photos, participatory maps drawn by community members.',
					'Uses: Reveals how residents feel about changes (e.g., gentrification), adds context to numerical trends, shows how different groups perceive space differently.',
				],
			},
			{
				subtopic: 'Field Studies & Urban Mapping',
				points: [
					'Field Studies: Direct observation or interaction in communities.',
					'Participatory Mapping: Communities map areas of safety, neglect, or conflict.',
					'Example: Youth mapping danger zones in a city.',
				],
			},
			{
				subtopic: 'Combining Quantitative & Qualitative Data',
				points: [
					'Quantitative: “How many?” “What percent?”',
					'Qualitative: “Why?” “How do people feel?”',
					'AP Exam Tip: Always try to use both data types for a well-rounded answer. Use qualitative examples to explain numerical trends in FRQs.',
				],
			},
			{
				subtopic: 'Applications in Policy and Planning',
				points: [
					'Urban data helps guide decisions in public transportation, housing development, social equity programs.',
					'Geographers and planners use data to promote smart growth, sustainability, social equity and inclusivity.',
				],
			},
		],
	},
	{
		key: '6.10',
		title: '6.10: Challenges of Urban Sustainability',
		bullets: [
			{
				subtopic: 'Environmental Issues',
				points: [
					'Air and water pollution from traffic, industry, and waste.',
					'Urban Heat Island effect raises city temperatures.',
					'Waste management challenges due to high population density.',
				],
			},
			{
				subtopic: 'Infrastructure Strain',
				points: [
					'Aging, underfunded infrastructure struggles with growing populations.',
					'Inadequate public transit leads to traffic congestion and emissions.',
					'High energy demand, often from nonrenewable sources.',
				],
			},
			{
				subtopic: 'Social and Economic Problems',
				points: [
					'Housing affordability crisis pushes low-income residents out.',
					'Gentrification revitalizes neighborhoods but displaces long-term residents.',
					'Food deserts limit access to healthy food in poor urban areas.',
					'Homelessness reflects housing and social service gaps.',
				],
			},
			{
				subtopic: 'Sustainability Solutions',
				points: [
					'Smart Growth promotes dense, mixed-use, walkable development.',
					'New Urbanism focuses on human-scale, pedestrian-friendly neighborhoods.',
					'Green infrastructure (green roofs, rain gardens) mitigates heat and runoff.',
					'Investment in public transit reduces car dependence.',
				],
			},
			{
				subtopic: 'Natural Hazards',
				points: [
					'Cities vulnerable to flooding, storms, and heat waves worsened by climate change.',
					'Resilience planning and infrastructure upgrades are essential.',
				],
			},
			{
				subtopic: 'Barriers',
				points: [
					'Funding, political will, and public resistance slow sustainability efforts.',
				],
			},
		],
	},
	{
		key: '6.11',
		title: '6.11: Urban Sustainability Strategies',
		bullets: [
			{
				subtopic: 'Goals',
				points: [
					'Balance environmental health, economic vitality, and social equity.',
				],
			},
			{
				subtopic: 'Key Strategies',
				points: [
					'Urban Growth Boundaries limit sprawl and protect farmland.',
					'Transit-Oriented Development focuses growth near public transit.',
					'Mixed-use zoning creates walkable communities.',
					'Infill development revitalizes vacant urban spaces.',
					'Green building and renewable energy reduce environmental impact.',
				],
			},
			{
				subtopic: 'Social Equity Efforts',
				points: [
					'Affordable housing programs combat displacement and homelessness.',
					'Environmental justice addresses disproportionate pollution in marginalized communities.',
					'Food security improved via urban agriculture and local markets.',
				],
			},
			{
				subtopic: 'Measuring Success',
				points: [
					'Metrics include carbon emissions, transit use, green space access, and housing affordability.',
				],
			},
			{
				subtopic: 'Challenges',
				points: [
					'High upfront costs, political conflicts, and risks of gentrification require careful management.',
					'Coordination across agencies is necessary for effective planning.',
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

const APHumanGeographyUnit6 = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<'topics' | 'quiz'>('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
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
						AP Human Geography Unit 6: Cities & Urban Land Use
					</h1>
					<p className="text-lg text-slate-600 mt-2">
						Key concepts and processes for AP Human Geography Unit 6.
					</p>
				</div>
				<div className="flex justify-center border-b-2 border-slate-200 mb-8">
					<button
						onClick={() => setActiveTab('topics')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'topics'
								? 'border-b-4 border-emerald-600 text-emerald-700'
								: 'text-slate-500 hover:text-emerald-600'
						}`}
					>
						Key Topics
					</button>
					<button
						onClick={() => {
							navigate('/ap-human-geography/unit/6/quiz');
						}}
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
							{unit6Content.map((section) => (
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

export default APHumanGeographyUnit6;
