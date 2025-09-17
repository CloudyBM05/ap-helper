import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit5Content = [
	{
		key: '5.1',
		title: '5.1 Introduction to Agriculture',
		bullets: [
			{
				subtopic: 'Mediterranean Climate Agriculture',
				points: [
					'Dry-summer climate.',
					'Produces grapes, olives, figs, dates, tomatoes, zucchini, wheat, barley.',
					'Found in: Mediterranean Basin, parts of California and Oregon, central Chile, South Africa\'s Cape, and parts of southern/southwestern Australia.',
				],
			},
			{
				subtopic: 'Tropical Climate Agriculture',
				points: [
					'Hot and humid climate.',
					'Grows cassava, banana, sugar cane, sweet potato, papaya, rice, maize.',
				],
			},
			{
				subtopic: 'Intensive Agriculture',
				points: [
					'High inputs (labor, fertilizer, machinery) for high yields.',
					'Found in areas with high population density and expensive land.',
					'Maximizes productivity on smaller plots.',
				],
			},
			{
				subtopic: 'Market Gardening',
				points: [
					'Small-scale fruit and vegetable farming.',
					'Sold at local markets.',
					'Uses manual labor and smaller plots of land.',
				],
			},
			{
				subtopic: 'Plantation Agriculture',
				points: [
					'Large estates growing cash crops like cotton, coffee, sugar, tea.',
					'Typically export-oriented.',
					'Often linked to colonial histories.',
				],
			},
			{
				subtopic: 'Mixed Crop and Livestock Farming',
				points: [
					'Combines crops and animals on the same land.',
					'Crops may feed livestock; manure fertilizes fields.',
					'Balances labor demands throughout the year.',
				],
			},
			{
				subtopic: 'Extensive Agriculture',
				points: [
					'Low labor, capital, and fertilizer input per unit of land.',
					'Includes ranching, shifting cultivation.',
					'Often on marginal land or large open areas.',
				],
			},
			{
				subtopic: 'Shifting Cultivation (Slash and Burn)',
				points: [
					'Practiced in tropical forests.',
					'Trees cut and burned to create fertile ash layer.',
					'Fields abandoned after soil declines, new areas cleared.',
				],
			},
			{
				subtopic: 'Nomadic Herding (Pastoralism/Transhumance)',
				points: [
					'Seasonal movement of livestock between pastures.',
					'Often between highlands in summer and lowlands in winter.',
					'Practiced in arid and semi-arid areas.',
				],
			},
			{
				subtopic: 'Ranching',
				points: [
					'Raising animals (especially cattle and sheep) over large areas.',
					'Typically commercial, extensive.',
				],
			},
		],
	},
	{
		key: '5.2',
		title: '5.2 Settlement Patterns and Survey Methods',
		bullets: [
			{
				subtopic: 'Rural Settlement Patterns',
				points: [
					'Influenced by agriculture and land-use traditions.',
					'Types: clustered, dispersed, and linear.',
				],
			},
			{
				subtopic: 'Clustered Settlements',
				points: [
					'Homes and farms built close together.',
					'Common in Europe and New England.',
					'Encourages community cooperation.',
				],
			},
			{
				subtopic: 'Dispersed Settlements',
				points: [
					'Houses/farms spread out over large areas.',
					'Found in North America and areas with mechanized agriculture.',
				],
			},
			{
				subtopic: 'Linear Settlements',
				points: [
					'Structures built in a line, often along rivers, roads, or valleys.',
					'Influenced by transportation or physical geography.',
				],
			},
			{
				subtopic: 'Rural Survey Methods',
				points: [
					'Systems for dividing and organizing land:',
					'Metes and Bounds: Uses natural features; irregular boundaries (e.g., trees, rivers).',
					'Township and Range: Grid system; rectangular plots (originated in U.S. interior).',
					'Long Lot: Long, narrow plots stretching from roads/rivers (French influence, Louisiana, Quebec).',
				],
			},
		],
	},
	{
		key: '5.3',
		title: '5.3 Agricultural Origins and Diffusion',
		bullets: [
			{
				subtopic: 'Domestication',
				points: [
					'Human control of plant/animal reproduction.',
					'Leads to changes in traits favorable to humans.',
				],
			},
			{
				subtopic: 'Major Agricultural Hearths',
				points: [
					'Fertile Crescent (SW Asia): Wheat, barley, sheep, goats.',
					'Indus River Valley: Early irrigation, wheat, barley.',
					'Southeast Asia: Root crops, rice, bananas.',
					'Central America (Mesoamerica): Maize, beans, squash.',
				],
			},
			{
				subtopic: 'Columbian Exchange',
				points: [
					'Movement of crops, animals, diseases between Old and New Worlds.',
					'Maize, potatoes to Europe; horses, wheat, disease to Americas.',
				],
			},
			{
				subtopic: 'First Agricultural Revolution (Neolithic Revolution)',
				points: [
					'Transition from hunting/gathering to settled farming.',
					'Enabled rise of cities and civilizations.',
				],
			},
		],
	},
	{
		key: '5.4',
		title: '5.4 The Second Agricultural Revolution',
		bullets: [
			{
				subtopic: 'Second Agricultural Revolution',
				points: [
					'Coincided with Industrial Revolution.',
					'Mechanization: steel plow, seed drill.',
					'Improved transportation and storage.',
					'Led to commercial farming and urban migration.',
				],
			},
		],
	},
	{
		key: '5.5',
		title: '5.5 The Green Revolution',
		bullets: [
			{
				subtopic: 'Green Revolution',
				points: [
					'1950s–1980s; diffusion of high-yield crops (rice, wheat).',
					'Focused on developing countries (India, Mexico).',
				],
			},
			{
				subtopic: 'High-Yield Seeds',
				points: [
					'Engineered for productivity and resistance.',
					'Often need more water, fertilizer, and pesticides.',
				],
			},
			{
				subtopic: 'Mechanized Farming',
				points: [
					'Use of tractors, harvesters, irrigation systems.',
					'Increased efficiency but reduced rural labor demand.',
				],
			},
		],
	},
	{
		key: '5.6',
		title: '5.6 Agricultural Production Regions',
		bullets: [
			{
				subtopic: 'Subsistence Agriculture',
				points: [
					'For family consumption, not sale.',
					'Often intensive, labor-focused.',
				],
			},
			{
				subtopic: 'Commercial Agriculture',
				points: [
					'For profit.',
					'Includes monoculture and agribusiness.',
				],
			},
			{
				subtopic: 'Monocropping/Monoculture',
				points: [
					'Growing one crop year after year.',
					'Vulnerable to pests, disease, and soil depletion.',
				],
			},
			{
				subtopic: 'Bid-Rent Theory',
				points: [
					'Land closer to urban centers is more expensive.',
					'Perishable/intensive crops are near cities; extensive uses (e.g., grazing) are farther out.',
				],
			},
		],
	},
	{
		key: '5.7',
		title: '5.7 Spatial Organization of Agriculture',
		bullets: [
			{
				subtopic: 'Commodity Chain',
				points: [
					'Sequence from raw material to final product.',
					'Includes production, processing, distribution, and sale.',
				],
			},
			{
				subtopic: 'Economies of Scale',
				points: [
					'Larger operations reduce costs per unit.',
					'Incentivizes large-scale farming and agribusiness.',
				],
			},
		],
	},
	{
		key: '5.8',
		title: '5.8 Von Thünen Model',
		bullets: [
			{
				subtopic: "Von Thünen's Model of Agricultural Land Use",
				points: [
					'Based on distance to market, perishability, and transport cost:',
					'Market gardening/dairying (perishable, close to market)',
					'Forest (heavy transport cost)',
					'Grains/Field crops (light, less perishable)',
					'Ranching/livestock (requires most land)',
					'Assumes: Uniform land, isolated state, no transport barriers.',
					'Shows relationship between land cost and farming type.',
				],
			},
		],
	},
	{
		key: '5.9',
		title: '5.9 The Global Agricultural System',
		bullets: [
			{
				subtopic: 'Global Supply Chain',
				points: [
					'Worldwide network to produce, process, and distribute food.',
				],
			},
			{
				subtopic: 'Export Commodities',
				points: [
					'Goods grown for foreign markets (e.g., coffee, bananas, tea).',
					'Often at the expense of local food security.',
				],
			},
		],
	},
	{
		key: '5.10',
		title: '5.10 Consequences of Agricultural Practices',
		bullets: [
			{
				subtopic: 'Pollution',
				points: [
					'Fertilizer and pesticide runoff contaminates ecosystems.',
				],
			},
			{
				subtopic: 'Land Cover Change',
				points: [
					'Farmland lost to urban development or deforestation.',
				],
			},
			{
				subtopic: 'Desertification',
				points: [
					'Overuse of land in arid areas causes permanent soil degradation.',
				],
			},
			{
				subtopic: 'Soil Salinization',
				points: [
					'Salt build-up due to irrigation in arid zones, ruins soil fertility.',
				],
			},
			{
				subtopic: 'Conservation',
				points: [
					'Sustainable use of natural resources to ensure long-term availability.',
				],
			},
			{
				subtopic: 'Slash-and-Burn Agriculture',
				points: [
					'Removes forest vegetation via burning.',
					'Fertile ash layer short-lived; leads to deforestation.',
				],
			},
			{
				subtopic: 'Terrace Farming',
				points: [
					'Steps cut into hillsides for agriculture.',
					'Prevents erosion and allows farming on slopes.',
				],
			},
			{
				subtopic: 'Irrigation',
				points: [
					'Sprays water artificially over land.',
					'Boosts productivity but can cause salinization.',
				],
			},
			{
				subtopic: 'Deforestation',
				points: [
					'Cutting down forests for farmland or pasture.',
					'Reduces biodiversity and increases carbon emissions.',
				],
			},
			{
				subtopic: 'Pastoral Nomadism',
				points: [
					'Migratory herding of livestock.',
					'Adaptation to arid/semi-arid climates.',
				],
			},
		],
	},
	{
		key: '5.11',
		title: '5.11 Challenges of Contemporary Agriculture',
		bullets: [
			{
				subtopic: 'Biotechnology',
				points: [
					'Uses living organisms for agricultural innovation (e.g., drought-resistant crops).',
				],
			},
			{
				subtopic: 'GMOs',
				points: [
					'Engineered for productivity, pest resistance, shelf life.',
					'Controversial due to environmental and health concerns.',
				],
			},
			{
				subtopic: 'Aquaculture',
				points: [
					'Farming aquatic organisms.',
					'Helps meet seafood demand but can harm ecosystems.',
				],
			},
			{
				subtopic: 'Sustainability',
				points: [
					'Practices that preserve environmental, economic, and social resources.',
				],
			},
			{
				subtopic: 'Biodiversity',
				points: [
					'Variety of life forms.',
					'Threatened by monocultures, deforestation, and overuse of chemicals.',
				],
			},
			{
				subtopic: 'Fertilizers & Pesticides',
				points: [
					'Boost yields and prevent crop loss.',
					'Overuse leads to pollution and health risks.',
				],
			},
			{
				subtopic: 'Urban Farming',
				points: [
					'Food grown in cities (e.g., rooftop gardens, vertical farms).',
					'Increases food access and reduces food miles.',
				],
			},
			{
				subtopic: 'Community-Supported Agriculture (CSA)',
				points: [
					'Direct partnership between farmers and consumers.',
					'Promotes local, sustainable farming.',
				],
			},
			{
				subtopic: 'Value-Added Specialty Crops',
				points: [
					'Products enhanced to fetch higher prices (e.g., jam, organic certification).',
				],
			},
			{
				subtopic: 'Fair Trade',
				points: [
					'Ensures farmers in developing countries receive fair prices and wages.',
				],
			},
			{
				subtopic: 'Local-Food Movement',
				points: [
					'Encourages eating food grown nearby.',
					'Supports local economies and environmental health.',
				],
			},
			{
				subtopic: 'Food Insecurity',
				points: [
					'Inconsistent access to sufficient, nutritious food.',
				],
			},
			{
				subtopic: 'Food Desert',
				points: [
					'Area lacking affordable, healthy food options.',
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
					<div className="font-semibold text-emerald-800 mb-1">{section.subtopic}</div>
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

const APHumanGeographyUnit5 = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<'topics' | 'quiz'>('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	// When the user clicks the "Take Quiz" tab, immediately navigate to the quiz page
	const handleTabClick = (tab: 'topics' | 'quiz') => {
		if (tab === 'quiz') {
			navigate('/ap-human-geography/unit/5/quiz');
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
						AP Human Geography Unit 5: Agriculture & Rural Land Use
					</h1>
					<p className="text-lg text-slate-600 mt-2">
						Key concepts and processes for AP Human Geography Unit 5.
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
							{unit5Content.map((section) => (
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

export default APHumanGeographyUnit5;
