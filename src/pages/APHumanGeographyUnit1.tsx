import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit1Content = [
	{
		key: '1.1',
		title: '1.1: Introduction to Maps',
		bullets: [
			{
				subtopic: 'Reference Maps vs. Thematic Maps',
				points: [
					'Reference Maps: Focused on locating and navigating geographic spaces.',
					'Political Maps: Display boundaries like countries, states, and cities.',
					'Topographic Maps: Use contour lines to show elevation and landforms.',
					'Road Maps: Show transportation networks—highways, roads, airports, etc.',
					'Thematic Maps: Show a particular theme or pattern using geographic space.',
					'Choropleth Maps: Use colors or shading to show data like population density or income.',
					'Isoline Maps: Use lines to connect points of equal value (e.g., temperature, rainfall).',
					'Dot Distribution Maps: Use dots to show the frequency of a variable (e.g., crop yields).',
					'Cartograms: Distort size/shape of areas based on data (e.g., larger countries if they have more population) — not technically maps because they distort spatial reality.',
				],
			},
			{
				subtopic: 'Important Map Features',
				points: [
					'Latitude: Horizontal lines measuring distance north or south of the Equator.',
					'Longitude: Vertical lines measuring distance east or west of the Prime Meridian.',
					'Equator: 0° latitude — divides Northern and Southern Hemispheres.',
					'Prime Meridian: 0° longitude — divides Eastern and Western Hemispheres.',
					'International Date Line: Near 180° longitude — crossing it changes the date.',
					'Hemispheres:',
					'Northern/Southern: Divided by the Equator.',
					'Eastern/Western: Divided by the Prime Meridian.',
				],
			},
			{
				subtopic: 'Time Zones',
				points: [
					'Typically spaced every 15° of longitude (360° ÷ 24 hours = 15° per hour).',
					'Local time varies based on position relative to Prime Meridian (Greenwich Mean Time).',
				],
			},
			{
				subtopic: 'Map Projection Distortions',
				points: [
					'Mercator Projection: Preserves shape and direction — useful for navigation. Distorts size near the poles (e.g., Greenland appears huge).',
					'Robinson Projection: Balanced approach — slight distortions in shape, size, and distance. Often used in classrooms for visual appeal.',
					'Polar Projection (Azimuthal): Great for airline routes over poles. Distorts at the equator and further away from center.',
					'Interrupted Projection (Goode’s Homolosine): Minimizes distortion of land area and shape. Oceans are split, making it less useful for global sea navigation.',
				],
			},
		],
	},
	{
		key: '1.2',
		title: '1.2: Geographic Data',
		bullets: [
			{
				subtopic: 'Technologies to Collect Geospatial Data',
				points: [
					'GIS (Geographic Information Systems): Captures, stores, analyzes, and displays spatial or geographic data. Used for mapping crime patterns, planning urban development, etc.',
					'Remote Sensing: Uses satellites and aircraft to gather data (e.g., deforestation, weather patterns).',
					'GPS (Global Positioning System): Network of satellites that provides absolute location on Earth.',
					'Field Observation: Firsthand data collection (e.g., surveys, interviews, landscape analysis).',
				],
			},
		],
	},
	{
		key: '1.3',
		title: '1.3: The Power of Geographic Data',
		bullets: [
			{
				subtopic: 'Qualitative vs. Quantitative Data',
				points: [
					'Qualitative Data: Descriptive, subjective, based on interviews, observations, cultural narratives.',
					'Example: Photos of street art, interviews with locals.',
					'Quantitative Data: Numerical, objective, statistically analyzable.',
					'Example: Census data, temperature measurements, population figures.',
				],
			},
			{
				subtopic: 'Spatial Analysis',
				points: [
					'Geographers look for patterns, trends, and relationships in spatial data.',
					'Example: Analyzing urban sprawl, comparing school district funding by ZIP code.',
					'Helps reveal causality (e.g., how income levels relate to access to healthcare).',
				],
			},
		],
	},
	{
		key: '1.4',
		title: '1.4: Spatial Concepts',
		bullets: [
			{
				subtopic: '5 Themes of Geography',
				points: [
					'Location: Where is it?',
					'Place: What is it like there? (Physical + human characteristics)',
					'Human-Environment Interaction: How do humans interact with the environment?',
					'Movement: How and why do people, goods, and ideas move?',
					'Region: How and why are places similar or different?',
				],
			},
			{
				subtopic: 'Key Spatial Terms',
				points: [
					'Absolute Distance: Exact distance using units (miles, kilometers).',
					'Relative Distance: How far something feels or seems based on context or time.',
					'Absolute Location: Precise coordinates (e.g., 40.7128° N, 74.0060° W).',
					'Relative Location: Described by location relative to other places (e.g., “next to the school”).',
				],
			},
			{
				subtopic: 'Distribution Concepts',
				points: [
					'Density: Number of objects per unit area (e.g., people per square mile).',
					'Concentration:',
					'Clustered: Objects close together.',
					'Dispersed: Objects spread apart.',
					'Pattern: Geometric arrangement (e.g., linear, grid, irregular).',
				],
			},
		],
	},
	{
		key: '1.5',
		title: '1.5: Human-Environment Interaction',
		bullets: [
			{
				subtopic: 'Environmental Determinism',
				points: [
					'Belief that the environment shapes human societies.',
					'Example: Tropical climates produce "lazy" societies; cold climates breed innovation — now largely discredited for being overly simplistic and Eurocentric.',
				],
			},
			{
				subtopic: 'Possibilism',
				points: [
					'Environment sets limits, but humans can adapt and modify it.',
					'Example: Skyscrapers in desert cities like Dubai; terraced farming in mountainous regions.',
				],
			},
			{
				subtopic: 'Cultural Landscapes',
				points: [
					'The visible imprint of human activity on the environment.',
					'Economic: Factories, farmland.',
					'Social: Religious buildings, schools.',
					'Political: Government buildings, borders.',
				],
			},
			{
				subtopic: 'Sustainability',
				points: [
					'Meeting present needs without compromising future generations.',
					'Emphasis on resource conservation, renewable energy, and pollution reduction.',
				],
			},
		],
	},
	{
		key: '1.6',
		title: '1.6: Scales of Analysis',
		bullets: [
			{
				subtopic: 'Types of Scale',
				points: [
					'Cartographic Scale: Ratio of map distance to real-world distance (e.g., 1 inch = 1 mile).',
					'Geographic/Analytical Scale:',
					'Local: Neighborhoods, towns.',
					'Regional: States, provinces, world regions.',
					'Global: Entire planet.',
				],
			},
			{
				subtopic: 'Large vs. Small Scale',
				points: [
					'Large Scale: Shows small area in detail (e.g., city map).',
					'Small Scale: Shows large area with less detail (e.g., world map).',
				],
			},
			{
				subtopic: 'Importance of Scale in Geography',
				points: [
					'Issues like climate change, poverty, or disease require understanding at multiple scales.',
					'What happens locally can affect globally, and vice versa (e.g., global supply chains, pandemics).',
				],
			},
		],
	},
	{
		key: '1.7',
		title: '1.7: Regional Analysis',
		bullets: [
			{
				subtopic: 'Regionalization',
				points: [
					'Process of grouping places with similar characteristics.',
					'Helps organize geographic information and identify patterns.',
				],
			},
			{
				subtopic: 'Types of Regions',
				points: [
					'Formal (Uniform) Region: Defined by one or more measurable, shared traits. Examples: Countries (e.g., Brazil), climate zones (e.g., the Sahara), language areas.',
					'Functional (Nodal) Region: Organized around a node (focal point) and connected by movement or function. Examples: Pizza delivery zone, metropolitan area (e.g., New York and suburbs).',
					'Perceptual (Vernacular) Region: Based on personal or cultural perception; not scientifically measurable. Examples: “The Midwest,” “The Bible Belt,” “Silicon Valley.”',
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

const APHumanGeographyUnit1 = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<'topics' | 'quiz'>('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	// Redirect to quiz page immediately when quiz tab is clicked
	const handleTabClick = (tab: 'topics' | 'quiz') => {
		if (tab === 'quiz') {
			navigate('/ap-human-geography/unit/1/quiz');
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
						AP Human Geography Unit 1: Thinking Geographically
					</h1>
					<p className="text-lg text-slate-600 mt-2">
						All the foundational concepts for AP Human Geography Unit 1.
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
							{unit1Content.map((section) => (
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

export default APHumanGeographyUnit1;
