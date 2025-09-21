import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit3Content = [
	{
		key: '3.1',
		title: '3.1 – Enzymes',
		bullets: [
			{
				subtopic: 'Bioenergetics',
				points: [
					'Study of how cells obtain and use energy'
				],
			},
			{
				subtopic: 'Thermodynamics Principles',
				points: [
					'First Law: Energy cannot be created or destroyed, only transferred. Cells must harvest energy from environment (e.g., sunlight, food)',
					'Second Law: Energy transfer increases disorder (entropy). Cells require constant energy input to maintain order and prevent entropy-driven decay',
					'Exergonic (release energy) and endergonic (require input of energy) reactions can be coupled to allow cellular processes to proceed'
				],
			},
			{
				subtopic: 'Enzymes as Catalysts',
				points: [
					'Speed up reactions by lowering activation energy',
					'Do not change starting/ending energy states, only reaction rate',
					'Facilitate formation of transition state'
				],
			},
			{
				subtopic: 'Enzyme Specificity',
				points: [
					'Each enzyme acts on a specific substrate',
					'Substrate + enzyme form an enzyme-substrate complex at the active site',
					'Enzymes remain unchanged after the reaction (reusable)'
				],
			},
			{
				subtopic: 'Induced Fit Model',
				points: [
					'Enzyme slightly changes shape to accommodate substrate → improves catalytic efficiency',
					'Function requires strict biological conditions (temperature, pH, ionic balance)'
				],
			},
			{
				subtopic: 'Helpers',
				points: [
					'Cofactors: non-protein enzyme helpers',
					'Inorganic ions (Mg²⁺, Fe²⁺)',
					'Organic molecules (coenzymes, e.g., vitamins)'
				],
			},
		],
	},
	{
		key: '3.2',
		title: '3.2 – Environmental Impacts on Enzyme Function',
		bullets: [
			{
				subtopic: 'Temperature',
				points: [
					'Increasing temperature → faster collisions → faster reaction rate (to a point)',
					'Excessive heat → enzyme denaturation (loss of 3D structure)',
					'Sometimes reversible if returned to optimal temperature'
				],
			},
			{
				subtopic: 'pH',
				points: [
					'Enzymes function best at optimal pH',
					'Too acidic/basic → disrupt hydrogen bonds → alter enzyme shape and function'
				],
			},
			{
				subtopic: 'Concentration of Substrates/Products',
				points: [
					'Increased substrate concentration → faster reaction until saturation point',
					'Saturation = all enzymes are occupied, so reaction cannot increase further'
				],
			},
			{
				subtopic: 'Enzyme Regulation',
				points: [
					'Enzyme activity controlled by molecules binding at active site or allosteric site',
					'Competitive inhibition: molecule binds active site, blocking substrate. Overcome by adding more substrate',
					'Noncompetitive (allosteric) inhibition: inhibitor binds allosteric site, changes enzyme shape → reaction stops. Cannot be overcome by substrate increase'
				],
			},
		],
	},
	{
		key: '3.3',
		title: '3.3 – Cellular Energy',
		bullets: [
			{
				subtopic: 'ATP (Adenosine Triphosphate)',
				points: [
					'Structure = adenosine + 3 phosphate groups',
					'Bonds between phosphates store large amounts of energy'
				],
			},
			{
				subtopic: 'Hydrolysis',
				points: [
					'ATP → ADP + Pi + energy (used for cellular work)'
				],
			},
			{
				subtopic: 'Reaction Coupling',
				points: [
					'Exergonic ATP hydrolysis powers endergonic reactions (e.g., biosynthesis of macromolecules)'
				],
			},
			{
				subtopic: 'Sources of ATP',
				points: [
					'Cellular respiration: breakdown of glucose → ATP',
					'Autotrophs: glucose produced via photosynthesis',
					'Heterotrophs: glucose obtained from food'
				],
			},
		],
	},
	{
		key: '3.4',
		title: '3.4 – Photosynthesis',
		bullets: [
			{
				subtopic: 'Equation',
				points: [
					'6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂'
				],
			},
			{
				subtopic: 'Evolutionary Importance',
				points: [
					'Early prokaryotic photosynthesis → oxygenated Earth\'s atmosphere',
					'Laid foundation for eukaryotic photosynthesis'
				],
			},
			{
				subtopic: 'Two Stages',
				points: [
					'Light reactions (thylakoid membranes): capture light, produce ATP & NADPH',
					'Calvin Cycle (stroma): use ATP, NADPH, and CO₂ to synthesize glucose'
				],
			},
			{
				subtopic: 'Chloroplast Structure',
				points: [
					'Stroma: fluid-filled interior',
					'Grana: stacks of thylakoids',
					'Thylakoid lumen: inside space of thylakoid',
					'Pigments: chlorophyll a, chlorophyll b, carotenoids'
				],
			},
			{
				subtopic: 'Photosystems',
				points: [
					'PSII (P680): captures light, drives photolysis of water → O₂ released, electrons freed',
					'PSI (P700): receives electrons, passes them to NADP⁺ → NADPH'
				],
			},
			{
				subtopic: 'Light Reactions',
				points: [
					'Photons excite electrons in PSII → passed down ETC, pump protons into lumen → proton gradient → ATP synthase makes ATP',
					'Electrons replenished via photolysis of water',
					'Electrons from PSII → PSI → reduce NADP⁺ → NADPH'
				],
			},
			{
				subtopic: 'Light-Independent Reactions (Calvin Cycle)',
				points: [
					'Occur in stroma',
					'Use ATP + NADPH + CO₂ → build glucose',
					'Carbon fixation: CO₂ → organic molecules'
				],
			},
			{
				subtopic: 'Special Adaptations',
				points: [
					'CAM plants: open stomata at night, store CO₂ as acids, release CO₂ during day',
					'C₄ plants: spatial separation of carbon fixation to minimize photorespiration'
				],
			},
		],
	},
	{
		key: '3.5',
		title: '3.5 – Cellular Respiration',
		bullets: [
			{
				subtopic: 'Equation',
				points: [
					'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP'
				],
			},
			{
				subtopic: 'Two Types',
				points: [
					'Aerobic respiration: requires oxygen → yields ~30–32 ATP',
					'Anaerobic respiration/fermentation: no oxygen → yields 2 ATP'
				],
			},
		],
	},
	{
		key: '3.6',
		title: '3.6 – Stages of Cellular Respiration',
		bullets: [
			{
				subtopic: 'Stage 1: Glycolysis',
				points: [
					'Occurs in cytoplasm',
					'Glucose (6C) → 2 pyruvate (3C each)',
					'Net products: 2 ATP, 2 NADH, 2 pyruvate',
					'Does not require oxygen'
				],
			},
			{
				subtopic: 'Stage 2: Formation of Acetyl-CoA',
				points: [
					'Pyruvate transported to mitochondria',
					'Converted to acetyl-CoA (2C) + CO₂ released',
					'Produces 2 NADH per glucose',
					'Catalyzed by pyruvate dehydrogenase complex (PDC)'
				],
			},
			{
				subtopic: 'Stage 3: Krebs Cycle (Citric Acid Cycle)',
				points: [
					'Occurs in mitochondrial matrix',
					'Each acetyl-CoA combines with oxaloacetate → citrate',
					'Products per turn (per acetyl-CoA): 1 ATP, 3 NADH, 1 FADH₂, 2 CO₂',
					'Per glucose (2 turns): 2 ATP, 6 NADH, 2 FADH₂, 4 CO₂'
				],
			},
			{
				subtopic: 'Stage 4: Oxidative Phosphorylation',
				points: [
					'Electron Transport Chain (ETC): NADH & FADH₂ donate electrons to carriers embedded in mitochondrial cristae',
					'Electrons move down ETC → final electron acceptor is oxygen → forms water',
					'Proton gradient established as H⁺ pumped into intermembrane space',
					'Chemiosmosis: Protons flow back through ATP synthase → drive phosphorylation of ADP → ATP',
					'ATP yield: Glycolysis NADH = 1.5 ATP each, All other NADH = 2.5 ATP each, FADH₂ = 1.5 ATP each',
					'Total ~30–32 ATP per glucose'
				],
			},
		],
	},
	{
		key: '3.7',
		title: '3.7 – Fitness',
		bullets: [
			{
				subtopic: 'Photosynthesis vs. Cellular Respiration',
				points: [
					'Both rely on proton gradients & ATP synthase',
					'Respiration: protons pumped into intermembrane space, flow back into matrix',
					'Photosynthesis: protons pumped into thylakoid lumen, flow back into stroma',
					'Krebs cycle oxidizes carbohydrates → CO₂',
					'Calvin cycle reduces CO₂ → carbohydrates'
				],
			},
			{
				subtopic: 'Anaerobic Respiration (Fermentation)',
				points: [
					'Without O₂, ETC halts',
					'Glycolysis continues → 2 ATP',
					'Pyruvate accepts electrons from NADH → regenerates NAD⁺',
					'Products: Lactic acid (animals, bacteria), Ethanol + CO₂ (yeast)',
					'Short-term solution, toxic byproducts'
				],
			},
			{
				subtopic: 'Muscle Fermentation',
				points: [
					'During exercise, oxygen demand exceeds supply',
					'Muscles switch to anaerobic respiration → lactic acid buildup → cramps'
				],
			},
		],
	},
];

const APBiologyUnit3 = () => {
	const [activeTab, setActiveTab] = useState('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const navigate = useNavigate();

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	return (
		<div className="min-h-screen bg-green-50 text-slate-800">
			<div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
				<button
					onClick={() => navigate('/ap-biology-study-guide')}
					className="mb-6 px-4 py-2 rounded-lg bg-white text-green-600 font-semibold hover:bg-green-100 transition-colors shadow-sm flex items-center gap-2"
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
						onClick={() => navigate('/ap-biology/unit/3/quiz')}
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
								⚡ AP Biology Unit 3: Cellular Energetics
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Enzymes, photosynthesis, cellular respiration, and the energy transformations that drive life.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit3Content.map((topic) => (
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

export default APBiologyUnit3;
