import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit8Content = [
	{
		key: '8.1',
		title: '8.1 – Responses to the Environment',
		bullets: [
			{
				subtopic: 'Thermoregulation',
				points: [
					'Endotherms: generate body heat internally via metabolism',
					'Ectotherms: rely on environmental heat; cannot internally regulate body temperature',
					'Temperature regulation is crucial for enzyme function and cellular processes',
					'Different strategies for maintaining optimal body temperature'
				],
			},
			{
				subtopic: 'Types of Behavior',
				points: [
					'Instinct: Inborn, unlearned behavior patterns',
					'Learning: Behavior changes due to experience and environmental interaction',
					'Imprinting: Rapid, irreversible learning during a critical period',
					'Examples include recognizing first moving object as mother, sexual imprinting, song imprinting'
				],
			},
			{
				subtopic: 'Learning Mechanisms',
				points: [
					'Habituation: Learned lack of response to repeated harmless stimuli',
					'Allows organisms to ignore non-threatening environmental changes',
					'Conserves energy by reducing unnecessary responses',
					'Can be reversed if stimulus becomes relevant again'
				],
			},
			{
				subtopic: 'Biological Rhythms',
				points: [
					'Circadian rhythms: internal clocks regulating daily activity cycles',
					'Found in both animals and plants',
					'Controlled by internal molecular clocks',
					'Can persist even without environmental cues'
				],
			},
		],
	},
	{
		key: '8.2',
		title: '8.2 – Energy Flow Through Ecosystems',
		bullets: [
			{
				subtopic: 'Communication & Social Behavior',
				points: [
					'Pheromones: Chemical signals affecting behavior in same-species members',
					'Agonistic behavior: Aggression due to competition for limited resources',
					'Dominance hierarchies: Pecking orders establish social ranking and reduce conflict',
					'Territoriality: Defense of limited resources like food and nesting sites'
				],
			},
			{
				subtopic: 'Cooperative Behavior',
				points: [
					'Altruism: Unselfish behavior benefiting group members at individual cost',
					'Can increase inclusive fitness through kin selection',
					'Examples include warning calls and cooperative breeding',
					'Benefits the survival of related individuals sharing genes'
				],
			},
			{
				subtopic: 'Symbiotic Relationships',
				points: [
					'Mutualism: Both species benefit (e.g., lichen - algae and fungi)',
					'Commensalism: One benefits, other unaffected (e.g., remora on shark)',
					'Parasitism: One benefits at the host\'s expense',
					'These relationships shape community structure and evolution'
				],
			},
			{
				subtopic: 'Plant Behavior',
				points: [
					'Photoperiodism: Flowering response to day/night length ratios',
					'Tropisms: Directional growth responses to environmental stimuli',
					'Phototropism: growth toward light sources',
					'Gravitropism: stems grow up (negative), roots grow down (positive)'
				],
			},
			{
				subtopic: 'Plant Response Mechanisms',
				points: [
					'Thigmotropism: response to touch (e.g., ivy climbing, tendrils wrapping)',
					'Allows plants to find support structures and maximize light exposure',
					'Controlled by differential growth responses',
					'Involves changes in cell elongation and division patterns'
				],
			},
		],
	},
	{
		key: '8.3',
		title: '8.3 – Population Ecology',
		bullets: [
			{
				subtopic: 'Levels of Ecological Organization',
				points: [
					'Biosphere: all living areas on Earth',
					'Ecosystem: interactions between living and nonliving components',
					'Community: populations of different species interacting in the same area',
					'Population: individuals of the same species capable of interbreeding'
				],
			},
			{
				subtopic: 'Primary Productivity',
				points: [
					'Gross productivity: total energy captured by photosynthesis',
					'Net productivity: energy remaining after organisms meet their own metabolic needs',
					'Cannot measure gross productivity directly due to concurrent respiration',
					'Net productivity determines energy available to other trophic levels'
				],
			},
			{
				subtopic: 'Trophic Levels',
				points: [
					'Producers → Primary consumers (herbivores) → Secondary consumers → Tertiary consumers',
					'Decomposers break down organic matter at all levels',
					'Energy transfer: approximately 10% passed to next trophic level',
					'Most energy is lost as heat during metabolic processes'
				],
			},
			{
				subtopic: 'Ecosystem Dynamics',
				points: [
					'Keystone species: Organisms critically shaping ecosystem dynamics',
					'Toxins bioaccumulate, affecting higher trophic levels more severely',
					'Ecological pyramids visualize energy flow, biomass, or population numbers',
					'Energy pyramids are always upright due to energy loss between levels'
				],
			},
			{
				subtopic: 'Biodiversity Measurement',
				points: [
					'Simpson\'s Diversity Index: Measures biodiversity in communities',
					'Formula: D = 1 - Σ(n/N)²',
					'n = number of individuals of a species; N = total number of organisms',
					'Higher values indicate greater diversity'
				],
			},
		],
	},
	{
		key: '8.4',
		title: '8.4 – Effect of Density on Populations',
		bullets: [
			{
				subtopic: 'Population Growth Metrics',
				points: [
					'Population growth rate: r = (births - deaths)/N',
					'r = reproductive rate, N = population size',
					'Positive r indicates growing population, negative r indicates decline',
					'Growth rate affects population trajectory over time'
				],
			},
			{
				subtopic: 'Carrying Capacity',
				points: [
					'Carrying capacity (K): Maximum individuals an environment can sustainably support',
					'Determined by available resources and environmental conditions',
					'Populations may temporarily exceed K but will decline due to resource depletion',
					'Can change over time due to environmental modifications'
				],
			},
			{
				subtopic: 'Limiting Factors',
				points: [
					'Density-independent factors: affect population regardless of size',
					'Examples include natural disasters, weather events, habitat destruction',
					'Density-dependent factors: affect populations more strongly as density increases',
					'Examples include disease transmission, competition for resources, predation'
				],
			},
			{
				subtopic: 'Growth Patterns',
				points: [
					'Exponential growth: J-shaped curve occurring in ideal, unlimited conditions',
					'Logistic growth: S-shaped curve as population approaches carrying capacity',
					'Most natural populations show logistic growth due to resource limitations',
					'Population overshoots can lead to crashes below carrying capacity'
				],
			},
		],
	},
	{
		key: '8.5',
		title: '8.5 – Community Ecology',
		bullets: [
			{
				subtopic: 'Ecological Succession',
				points: [
					'Ecological succession: Predictable sequence of community changes over time',
					'Occurs as species modify their environment, making it suitable for other species',
					'Results in increasing complexity and biodiversity over time',
					'Can be disrupted by disturbances that reset the process'
				],
			},
			{
				subtopic: 'Types of Succession',
				points: [
					'Primary succession: Occurs where no organisms previously existed',
					'Examples include volcanic islands, glacial retreat areas, new rock surfaces',
					'Pioneer species: First colonizers (e.g., lichens on bare rock)',
					'Secondary succession occurs in areas where life previously existed but was disturbed'
				],
			},
			{
				subtopic: 'Succession Stages',
				points: [
					'Pioneer stage: Hardy species that can survive harsh conditions',
					'Intermediate stages: Increasing diversity and complexity',
					'Climax community: Stable, mature community with high diversity',
					'Each stage modifies the environment for subsequent stages'
				],
			},
		],
	},
	{
		key: '8.6',
		title: '8.6 – Biodiversity',
		bullets: [
			{
				subtopic: 'Importance of Biodiversity',
				points: [
					'Higher biodiversity stabilizes ecosystems and enhances productivity',
					'Provides ecosystem services like pollination, water purification, climate regulation',
					'Ensures ecosystem resilience to environmental changes',
					'Source of medicines, food, and other resources for humans'
				],
			},
			{
				subtopic: 'Threats to Biodiversity',
				points: [
					'Habitat destruction and fragmentation',
					'Deforestation reducing forest ecosystems and carbon storage',
					'Pollution affecting air, water, and soil quality',
					'Desertification converting productive land to desert'
				],
			},
			{
				subtopic: 'Human Impact on Species',
				points: [
					'Introduction of nonnative invasive species',
					'Overharvesting of species beyond sustainable levels',
					'Climate change altering habitats and species distributions',
					'Reduction in biodiversity through direct and indirect human activities'
				],
			},
		],
	},
	{
		key: '8.7',
		title: '8.7 – Disruptions to Ecosystems',
		bullets: [
			{
				subtopic: 'Atmospheric Changes',
				points: [
					'Greenhouse effect: Global warming due to trapped heat from greenhouse gases',
					'Ozone depletion: Increased UV radiation reaching Earth\'s surface',
					'Both affect global climate patterns and ecosystem functioning',
					'Result from human activities like fossil fuel burning and chemical use'
				],
			},
			{
				subtopic: 'Pollution Effects',
				points: [
					'Acid rain: Harm to aquatic and terrestrial ecosystems',
					'Water pollution: Contamination affecting aquatic life and human health',
					'Air pollution: Affects respiratory health and ecosystem productivity',
					'Soil contamination: Reduces agricultural productivity and ecosystem health'
				],
			},
			{
				subtopic: 'Habitat Destruction',
				points: [
					'Deforestation: Loss of forest habitat and carbon sinks',
					'Reduces biodiversity and increases atmospheric CO₂',
					'Habitat fragmentation isolates populations and reduces gene flow',
					'Urban development converts natural habitats to human use'
				],
			},
			{
				subtopic: 'Disease and Species Introduction',
				points: [
					'Introduction and spread of diseases can disrupt native species',
					'Invasive species can outcompete native species for resources',
					'Disease emergence can affect both wildlife and human populations',
					'Global transportation facilitates rapid spread of pathogens and invasive species'
				],
			},
		],
	},
];

const APBiologyUnit8 = () => {
	const [activeTab, setActiveTab] = useState('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const navigate = useNavigate();

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
			<div className="max-w-4xl mx-auto p-6">
				{/* Back Button */}
				<button
					onClick={() => navigate('/ap-biology-study-guide')}
					className="mb-8 px-4 py-2 rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition flex items-center gap-2"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
							fill="currentColor"
							clipRule="evenodd"
						/>
					</svg>
					Back to Units
				</button>
				{/* Tabs */}
				<div className="flex justify-center border-b-2 border-green-200 mb-8">
					<button
						onClick={() => setActiveTab('topics')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'topics'
								? 'border-b-4 border-green-600 text-green-700'
								: 'text-slate-500 hover:text-green-600'
						}`}
					>
						Key Topics
					</button>
					<button
						onClick={() => navigate('/ap-biology/unit/8/quiz')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'quiz'
								? 'border-b-4 border-orange-500 text-orange-700'
								: 'text-slate-500 hover:text-orange-600'
						}`}
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				{activeTab === 'topics' && (
					<>
						<div className="text-center mb-8">
							<h1 className="text-4xl font-bold text-green-700">
								🌍 AP Biology Unit 8: Ecology
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Explore ecosystems, energy flow, population dynamics, and human impact on the environment
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit8Content.map((topic) => (
									<div
										key={topic.key}
										className="border-b border-green-200 last:border-b-0 pb-4"
									>
										<button
											onClick={() => toggleTopic(topic.key)}
											className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-green-50 transition-colors"
										>
											<h3 className="text-xl font-semibold text-green-700">
												{topic.title}
											</h3>
											<span className="text-2xl text-green-400">
												{openTopic === topic.key ? '-' : '+'}
											</span>
										</button>
										{openTopic === topic.key && (
											<div className="p-4 bg-green-50 rounded-b-lg">
												<div className="space-y-4">
													{topic.bullets.map((section, idx) => (
														<div key={idx}>
															<div className="font-semibold text-green-800 mb-1">
																{section.subtopic}
															</div>
															<ul className="list-disc ml-6 text-slate-700 space-y-1">
																{section.points.map((point, i) => (
																	<li key={i}>{point}</li>
																))}
															</ul>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default APBiologyUnit8;
