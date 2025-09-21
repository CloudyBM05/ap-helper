import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit7Content = [
	{
		key: '7.1',
		title: '7.1: The Industrial Revolution',
		bullets: [
			{
				subtopic: 'Origins',
				points: [
					'Began in late 18th-century Britain due to:',
					'Second Agricultural Revolution increasing food production and freeing labor',
					'Access to coal, iron, and waterways',
					'Political stability and capitalist investment',
					'Key inventions: steam engine, spinning jenny, power loom',
					'Shift from cottage industries to factory system and machine-based production',
				],
			},
			{
				subtopic: 'Social Changes',
				points: [
					'Urbanization: mass migration from rural to industrial cities',
					'New class structure: factory owners (bourgeoisie), middle class, working class',
					'Harsh working conditions: long hours, child labor, poor safety',
					'Women worked in factories but retained home roles',
				],
			},
			{
				subtopic: 'Population & Urban Growth',
				points: [
					'Population boom due to improved food supply and declining death rates',
					'Rapid, often unplanned city growth led to overcrowding and disease',
					'Later public health reforms improved conditions',
				],
			},
			{
				subtopic: 'Production Innovations',
				points: [
					'Assembly lines increased efficiency',
					'Interchangeable parts simplified manufacturing and repair',
					'Factories clustered near transport hubs like rivers and railroads',
				],
			},
			{
				subtopic: 'Global Impact',
				points: [
					'Industrial powers needed raw materials and markets, fueling imperialism',
					'Colonies supplied resources and served as markets (e.g., British India, Belgian Congo)',
					'Industrialization shifted global power dynamics',
				],
			},
		],
	},
	{
		key: '7.2',
		title: '7.2: Economic Sectors and Industrial Location',
		bullets: [
			{
				subtopic: 'Economic Sectors',
				points: [
					'Primary: raw materials (farming, mining)',
					'Secondary: manufacturing (cars, textiles)',
					'Tertiary: services (retail, healthcare)',
					'Quaternary: knowledge/research (IT, R&D)',
					'Quinary: leadership (CEOs, government)',
				],
			},
			{
				subtopic: 'Industrial Location Factors',
				points: [
					'Least Cost Theory: minimize transportation, labor, and agglomeration costs',
					'Break-of-bulk points where transport modes change (ports, airports)',
					'Containerization improved global shipping efficiency',
					'Market proximity important for bulky or perishable goods',
					'Labor access influences outsourcing to semiperiphery countries (China, Mexico)',
				],
			},
			{
				subtopic: 'Global Production Patterns (World Systems Theory)',
				points: [
					'Core: wealthy, advanced economies focused on services and tech (US, Germany)',
					'Semiperiphery: emerging economies with mixed sectors (Brazil, India, China)',
					'Periphery: poor, resource-exporting countries (Congo, Haiti)',
					'Core exploits periphery resources; semiperiphery bridges the gap',
				],
			},
			{
				subtopic: 'Commodity Chains',
				points: [
					'Entire process from raw material to consumer product',
					'Sows who profits and who does labor (often core profits, periphery provides labor)',
					'Example: coffee grown in Ethiopia, processed in Italy, sold in US',
				],
			},
			{
				subtopic: 'Deindustrialization',
				points: [
					'Decline of manufacturing in core countries due to globalization, automation',
					'Job losses and population decline in factory towns (Rust Belt US, UK steel towns)',
					'Shift toward service and knowledge sectors',
				],
			},
		],
	},
	{
		key: '7.3',
		title: '7.3: Measuring Development',
		bullets: [
			{
				subtopic: 'Economic Indicators',
				points: [
					'GDP, GNP, GNI measure economic output/income',
					'Per capita values adjust for population size',
					'Sectoral structure indicates development stage (primary to quaternary)',
					'Formal economy (regulated) vs informal economy (unregulated, untaxed)',
				],
			},
			{
				subtopic: 'Social Indicators',
				points: [
					'Literacy rate, life expectancy, fertility rate, infant mortality',
					'Access to healthcare and education reflects quality of life',
				],
			},
			{
				subtopic: 'Gender-Based Measures',
				points: [
					'Gender Inequality Index (GII): reproductive health, empowerment, labor participation',
					'Gender Development Index (GDI): compares life expectancy, education, income by gender',
				],
			},
			{
				subtopic: 'Human Development Index (HDI)',
				points: [
					'Composite measure of health, education, and income',
					'Ranks countries on a development scale',
				],
			},
			{
				subtopic: 'Multidimensional Poverty Index (MPI)',
				points: [
					'Includes education, health, living standards to capture poverty beyond income',
				],
			},
			{
				subtopic: 'Environmental Indicators',
				points: [
					'Environmental Performance Index (EPI) measures sustainability efforts',
					'Includes air/water quality, biodiversity, climate policies',
					'Highlights environmental costs of economic growth',
				],
			},
		],
	},
	{
		key: '7.4',
		title: '7.4: Women and Economic Development',
		bullets: [
			{
				subtopic: 'Changing Roles with Development',
				points: [
					'Women shift from unpaid labor (household, agriculture) to formal employment',
					'More education and skills training, later marriage, lower fertility',
					'Family roles and social expectations evolve, increased childcare needs',
				],
			},
			{
				subtopic: 'Workforce Inequality',
				points: [
					'Persistent gender wage gap: women earn less than men for similar work',
					'Glass ceiling limits women in leadership roles',
					'Occupational segregation: women clustered in care/service jobs',
					'Women carry most unpaid care work, limiting formal job availability',
				],
			},
			{
				subtopic: 'Microloans & Empowerment',
				points: [
					'Small loans help women start or grow businesses, improving independence',
					'Common in developing regions (South Asia, Africa, Latin America)',
					'Typical businesses: crafts, small farming, tailoring, food stands',
				],
			},
			{
				subtopic: 'Global Gender Equality Efforts',
				points: [
					'Millennium Development Goals (MDGs) targeted gender equality and maternal health',
					'Sustainable Development Goals (SDGs) continue gender equality focus (Goal 5)',
				],
			},
			{
				subtopic: 'Barriers to Equality',
				points: [
					'Discrimination in hiring/promotions',
					'Unequal education access',
					'Limited credit/financial access',
					'Societal stereotypes and workplace harassment',
				],
			},
		],
	},
	{
		key: '7.5',
		title: '7.5: Theories of Economic and Social Development',
		bullets: [
			{
				subtopic: 'Why Study Theories?',
				points: [
					'Explain uneven global wealth and development',
					'Understand historical and current inequalities',
				],
			},
			{
				subtopic: "Rostow's Stages of Growth",
				points: [
					'Traditional Society: subsistence agriculture, little tech',
					'Preconditions for Takeoff: infrastructure and education develop',
					'Takeoff: industrialization and urban growth begin',
					'Drive to Maturity: diversified, stable economy with tech and skilled labor',
					'High Mass Consumption: consumer-focused economy, dominant services',
					'Criticism: ignores colonial history and external pressures',
				],
			},
			{
				subtopic: "Wallerstein's World Systems Theory",
				points: [
					'Core: wealthy, developed, control finance and trade (e.g., US, Germany)',
					'Semiperiphery: developing, mixed economies (e.g., India, Brazil)',
					'Periphery: poor, resource-exporting, dependent (e.g., Sub-Saharan Africa)',
					'Global inequality maintained by exploitation of periphery by core',
				],
			},
			{
				subtopic: 'Dependency Theory',
				points: [
					'Poor countries trapped by reliance on rich countries for goods and capital',
					'Colonial history created dependent economic structures',
					'Modern aid and loans often perpetuate dependence',
				],
			},
			{
				subtopic: 'Commodity Dependence',
				points: [
					'Economies reliant on few natural resources are unstable and vulnerable',
					'Examples: Venezuela (oil), Zambia (copper), Ivory Coast (cocoa)',
				],
			},
			{
				subtopic: 'Connecting Theories',
				points: [
					'Rostow: internal economic development stages',
					'Wallerstein & Dependency: global power and inequality structures',
					'Commodity dependence: economic risks tied to specialization',
				],
			},
		],
	},
	{
		key: '7.6',
		title: '7.6: International Trade and Globalization',
		bullets: [
			{
				subtopic: 'Why Trade Happens',
				points: [
					'Comparative advantage: countries specialize in producing goods at lower opportunity cost',
					'Complementarity: countries trade goods/services that complement each other (e.g., oil for cars)',
				],
			},
			{
				subtopic: 'Neoliberal Policies',
				points: [
					'Emphasize deregulation, privatization, free trade, and austerity',
					'Criticized for increasing inequality and harming local environments',
				],
			},
			{
				subtopic: 'Trade Blocs and Organizations',
				points: [
					'EU: political/economic union with shared currency (Eurozone)',
					'WTO: regulates international trade rules',
					'Mercosur: South American trade bloc',
					'OPEC: oil supply coordination',
					'USMCA (formerly NAFTA): North American trade agreement',
				],
			},
			{
				subtopic: 'Government Role in Trade',
				points: [
					'Tariffs protect local industries',
					'Infrastructure investments improve trade flow',
					'Subsidies or restrictions support or limit certain sectors',
				],
			},
			{
				subtopic: 'Global Interdependence & Risks',
				points: [
					'Financial crises spread globally (e.g., 2008 recession, Greece debt crisis)',
					'IMF loans often come with conditions impacting spending and policies',
					'Microfinance promotes grassroots economic inclusion',
					'Global supply chains increase efficiency but raise vulnerability to disruptions (e.g., pandemics)',
				],
			},
		],
	},
	{
		key: '7.7',
		title: '7.7: Global Economic Changes and Production',
		bullets: [
			{
				subtopic: 'Outsourcing & Offshoring',
				points: [
					'Outsourcing: hiring external firms abroad (e.g., US call centers in India)',
					'Offshoring: moving company production to another country',
					'NICs (Newly Industrialized Countries) like India, China, Brazil grow manufacturing and services',
					'New Asian Tigers (South Korea, Taiwan, Singapore, Hong Kong) rapidly industrialize',
					'Core countries shift from manufacturing to services and tech, causing job loss in industrial centers (Rust Belt)',
				],
			},
			{
				subtopic: 'Special Economic Zones (SEZs) & Export-Processing Zones (EPZs)',
				points: [
					'SEZs: tax/investment-friendly zones near ports, e.g., Shenzhen, China',
					'EPZs: export-focused areas with often lower labor/environmental standards, e.g., Kenya',
					'Free-trade zones promote foreign investment and job creation but mostly low-wage and dependent',
				],
			},
			{
				subtopic: 'International Division of Labor',
				points: [
					'Core: high-skill, research, design jobs (US, Germany, Japan)',
					'Semi-Periphery/Periphery: low-wage manufacturing, data entry, call centers',
					'Firms use Weber’s Least Cost Theory to minimize labor, transportation, and resource costs',
				],
			},
			{
				subtopic: 'Modern Production Models',
				points: [
					'Post-Fordist: flexible, small-batch, tech-driven production (e.g., custom clothing)',
					'Just-in-Time: low inventory, parts delivered as needed—efficient but vulnerable to disruption',
					'Economies of scale reduce costs with higher production (e.g., Amazon warehouses)',
					'Agglomeration: industry clusters (Silicon Valley) create shared benefits',
					'Multiplier effect: one industry’s growth spurs related sectors',
				],
			},
			{
				subtopic: 'Growth Poles & Regional Development',
				points: [
					'Concentrated economic hubs stimulate nearby growth (e.g., Songdo, South Korea; Silicon Valley)',
				],
			},
		],
	},
	{
		key: '7.8',
		title: '7.8: Sustainable Development',
		bullets: [
			{
				subtopic: 'What Is Sustainable Development?',
				points: [
					'Meeting today’s needs without harming future generations',
					'Balances environmental protection, economic viability, social equity',
					'Tackles resource depletion, pollution, climate change, mass consumption',
					'Principles include intergenerational equity, precautionary action, polluter pays, and differentiated responsibility',
				],
			},
			{
				subtopic: 'Sustainable Strategies in Practice',
				points: [
					'Efficient resource use: recycling, water conservation',
					'Renewable energy adoption',
					'Sustainable agriculture and ecotourism',
					'Smart urban planning and social services access',
				],
			},
			{
				subtopic: 'Ecotourism',
				points: [
					'Nature-focused tourism supporting conservation and local communities',
					'Preserves biodiversity, educates travelers, boosts local economies',
					'Examples: Galápagos, Maasai Mara, Great Barrier Reef',
				],
			},
			{
				subtopic: 'Renewable Energy',
				points: [
					'Solar, wind, hydroelectric, geothermal, biomass',
					'Reduces fossil fuel dependency and emissions',
					'Supports sustainable industrialization and is increasingly affordable',
				],
			},
			{
				subtopic: 'UN Sustainable Development Goals (SDGs)',
				points: [
					'17 global goals established in 2015, targeting poverty, inequality, climate, etc.',
					'Relevant to this unit: Clean energy, sustainable cities, responsible consumption, climate action',
					'Examples: microloans, public transit investment, clean water/energy projects, green tech promotion',
					'SDGs measure sustainable progress globally, complementing economic indicators like HDI',
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

const APHumanGeographyUnit7 = () => {
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
						AP Human Geography Unit 7: Industrial & Economic Development
					</h1>
					<p className="text-lg text-slate-600 mt-2">
						All the key concepts for AP Human Geography Unit 7.
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
							navigate('/ap-human-geography/unit/7/quiz');
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
							{unit7Content.map((section) => (
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

export default APHumanGeographyUnit7;
