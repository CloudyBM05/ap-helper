import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit7Content = [
	{
		key: '7.1',
		title: '7.1 – Introduction to Natural Selection',
		bullets: [
			{
				subtopic: 'Evolution Definition',
				points: [
					'Evolution = change in a population over time',
					'Natural selection operates on individuals but is observed in populations',
					'Process occurs across generations through differential reproduction',
					'Foundation for understanding all biological diversity'
				],
			},
			{
				subtopic: 'Darwin\'s Key Observations',
				points: [
					'Each species produces more offspring than can survive',
					'Offspring compete for limited resources',
					'Organisms within a population vary in their traits',
					'These observations led to the theory of natural selection'
				],
			},
			{
				subtopic: 'Evolutionary Fitness',
				points: [
					'Evolutionary fitness = reproductive success',
					'Traits enhancing survival/reproduction are passed on',
					'Fitness depends on environmental factors',
					'Selected traits vary across generations as environments change'
				],
			},
		],
	},
	{
		key: '7.2',
		title: '7.2 – Natural Selection',
		bullets: [
			{
				subtopic: 'Historical Perspectives',
				points: [
					'Darwin vs Lamarck: different mechanisms proposed',
					'Lamarck: acquired traits can be inherited (incorrect)',
					'Darwin: natural selection acts on heritable variation',
					'Modern synthesis combines Darwin\'s ideas with genetics'
				],
			},
			{
				subtopic: 'Evidence for Evolution',
				points: [
					'Paleontology: fossil records show major lines of evolution',
					'Fossils dated via rock layers, radioactive isotopes (C-14), and geography',
					'Biogeography: related species in separated regions',
					'Embryology: vertebrates share features like gill slits'
				],
			},
			{
				subtopic: 'Morphological and Molecular Evidence',
				points: [
					'Homologous structures: similar structures indicate common ancestry',
					'Analogous structures: evolve independently for similar functions',
					'Molecular biology: DNA/protein similarities confirm evolutionary relationships',
					'Evolution is ongoing: DNA changes and fossil record show continual evolution'
				],
			},
		],
	},
	{
		key: '7.3',
		title: '7.3 – Artificial Selection',
		bullets: [
			{
				subtopic: 'Human-Directed Evolution',
				points: [
					'Humans selectively breed species to enhance desired traits',
					'Similar to natural selection but driven by human preference',
					'Not driven by environmental pressures like natural selection',
					'Examples: dog breeds, crop varieties, livestock'
				],
			},
			{
				subtopic: 'Comparison to Natural Selection',
				points: [
					'Same mechanisms: variation, heritability, differential reproduction',
					'Different selective pressure: human choice vs. environment',
					'Faster results due to directed breeding programs',
					'Demonstrates power of selection to create dramatic changes'
				],
			},
		],
	},
	{
		key: '7.4',
		title: '7.4 – Population Genetics',
		bullets: [
			{
				subtopic: 'Genetic Variability',
				points: [
					'Genetic variability = foundation of evolution',
					'Differences in traits among individuals within populations',
					'Natural selection favors individuals with higher fitness',
					'More variation increases likelihood of beneficial traits'
				],
			},
			{
				subtopic: 'Peppered Moths Example',
				points: [
					'Before industrialization: 50% light, 50% dark morphs',
					'Post-pollution: 90% dark alleles due to selective predation',
					'Light moths more visible on dark, polluted trees',
					'Classic example of natural selection in action'
				],
			},
		],
	},
	{
		key: '7.5',
		title: '7.5 – Hardy-Weinberg Equilibrium',
		bullets: [
			{
				subtopic: 'Hardy-Weinberg Principle',
				points: [
					'Genotype frequencies in a population remain constant if no evolutionary forces act',
					'Equation: p² + 2pq + q² = 1',
					'p² = homozygous dominant, 2pq = heterozygotes, q² = homozygous recessive',
					'Null hypothesis for detecting evolutionary change'
				],
			},
			{
				subtopic: 'Five Conditions for Equilibrium',
				points: [
					'Large population (reduces genetic drift)',
					'No mutations (no new alleles introduced)',
					'No migration (no gene flow between populations)',
					'Random mating (no mate choice based on genotype)',
					'No natural selection (all genotypes equally viable)'
				],
			},
		],
	},
	{
		key: '7.6',
		title: '7.6 – Evidence of Evolution',
		bullets: [
			{
				subtopic: 'Multiple Lines of Evidence',
				points: [
					'Fossil record shows progression of life forms over time',
					'Molecular data reveals genetic relationships',
					'Morphological comparisons show structural similarities',
					'Embryology demonstrates developmental similarities'
				],
			},
			{
				subtopic: 'Strongest Evidence',
				points: [
					'Molecular similarities often provide the most compelling evidence',
					'DNA and protein sequences show degrees of relatedness',
					'Biogeography explains distribution patterns',
					'All evidence converges on the same evolutionary relationships'
				],
			},
		],
	},
	{
		key: '7.7',
		title: '7.7 – Common Ancestry',
		bullets: [
			{
				subtopic: 'Universal Common Ancestor',
				points: [
					'All life shares a common ancestor',
					'Evidence from molecular biology, biochemistry, and genetics',
					'Universal genetic code supports common origin',
					'Fundamental cellular processes are conserved'
				],
			},
			{
				subtopic: 'Phylogenetic Representations',
				points: [
					'Phylogenetic trees visualize evolutionary relationships',
					'Cladograms emphasize branching order',
					'Phylogenetic trees: branch lengths may vary; show divergence times',
					'Forks = common ancestor nodes'
				],
			},
		],
	},
	{
		key: '7.8',
		title: '7.8 – Continuing Evolution',
		bullets: [
			{
				subtopic: 'Ongoing Process',
				points: [
					'Evolution occurs constantly, not just in the past',
					'Small genetic changes accumulate over time',
					'Observed in DNA changes and allele frequency shifts',
					'Modern examples demonstrate continued evolution'
				],
			},
			{
				subtopic: 'Contemporary Examples',
				points: [
					'Antibiotic resistance in bacteria',
					'Pesticide resistance in insects',
					'Industrial melanism in moths',
					'Evolution of HIV within individual hosts'
				],
			},
		],
	},
	{
		key: '7.9',
		title: '7.9 – Phylogeny',
		bullets: [
			{
				subtopic: 'Evolutionary Relationships',
				points: [
					'Phylogeny studies evolutionary relationships among species',
					'Data sources: fossil record, molecular sequences',
					'Trees begin with common ancestor, branch to show divergence',
					'Modern techniques use DNA sequencing for accuracy'
				],
			},
			{
				subtopic: 'Tree Construction',
				points: [
					'Molecular clocks estimate divergence times',
					'Parsimony principle: simplest explanation preferred',
					'Bootstrap analysis tests reliability of branches',
					'Multiple genes provide better resolution'
				],
			},
		],
	},
	{
		key: '7.10',
		title: '7.10 – Speciation',
		bullets: [
			{
				subtopic: 'Speciation Process',
				points: [
					'Speciation = formation of new species through reproductive isolation',
					'Pre-zygotic isolation: prevents fertilization',
					'Post-zygotic isolation: hybrid cannot reproduce',
					'Reproductive isolation is key to species definition'
				],
			},
			{
				subtopic: 'Types of Evolution',
				points: [
					'Divergent evolution: species evolve differently from common ancestor',
					'Convergent evolution: unrelated species evolve similar traits',
					'Punctuated equilibrium: rapid change after long stasis',
					'Coevolution: species evolve in response to each other'
				],
			},
			{
				subtopic: 'Speciation Mechanisms',
				points: [
					'Allopatric speciation: geographic isolation leads to divergence',
					'Sympatric speciation: new species arise without geographic isolation',
					'Polyploidy common in plant speciation',
					'Behavioral isolation can drive speciation'
				],
			},
		],
	},
	{
		key: '7.11',
		title: '7.11 – Variations in Populations',
		bullets: [
			{
				subtopic: 'Sources of Variation',
				points: [
					'Mutations introduce new alleles',
					'Recombination creates new gene combinations',
					'Gene flow brings alleles from other populations',
					'Sexual reproduction maintains genetic diversity'
				],
			},
			{
				subtopic: 'Types of Natural Selection',
				points: [
					'Directional selection: favors one extreme trait',
					'Stabilizing selection: eliminates extreme traits, favors intermediate',
					'Disruptive selection: favors multiple extremes',
					'Balancing selection maintains multiple alleles'
				],
			},
			{
				subtopic: 'Other Evolutionary Forces',
				points: [
					'Sexual selection: mate choice favors traits enhancing reproductive success',
					'Genetic drift: random allele frequency changes',
					'Bottleneck effect: population crash reduces diversity',
					'Founder effect: small founding population lacks diversity'
				],
			},
		],
	},
	{
		key: '7.12',
		title: '7.12 – Origins of Life',
		bullets: [
			{
				subtopic: 'Common Ancestor',
				points: [
					'Life likely evolved from a common ancestor',
					'Early evolution involved simple self-replicating molecules',
					'RNA-world hypothesis: RNA preceded DNA as genetic material',
					'Transition from RNA to DNA-protein world'
				],
			},
			{
				subtopic: 'Developmental Evolution',
				points: [
					'Morphogenesis: embryonic development shaped by gene expression',
					'Homeotic/Hox genes control body plan development',
					'Gene regulation critical for cellular differentiation',
					'Evolutionary changes in development create new forms'
				],
			},
		],
	},
	{
		key: '7.13',
		title: '7.13 – Origin of Life on Earth',
		bullets: [
			{
				subtopic: 'Early Earth Conditions',
				points: [
					'Early atmosphere: methane (CH₄), ammonia (NH₃), hydrogen (H₂), water (H₂O)',
					'Very little oxygen (O₂) in early atmosphere',
					'Reducing atmosphere favored organic molecule formation',
					'Energy sources: lightning, UV radiation, volcanic activity'
				],
			},
			{
				subtopic: 'Origin Hypotheses',
				points: [
					'Oparin & Haldane: primitive atmosphere facilitated organic molecule formation',
					'Miller-Urey experiment: simulated early Earth with electrical sparks',
					'Amino acids and organic molecules formed under these conditions',
					'RNA likely preceded DNA as the first genetic material'
				],
			},
			{
				subtopic: 'From Molecules to Life',
				points: [
					'Self-replicating molecules were first "living" systems',
					'Membrane formation created the first cells',
					'Metabolism evolved to harness energy',
					'Photosynthesis changed Earth\'s atmosphere'
				],
			},
		],
	},
];

const APBiologyUnit7 = () => {
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState('topics');
	const navigate = useNavigate();

	const toggleTopic = (topicKey: string) => {
		setOpenTopic(openTopic === topicKey ? null : topicKey);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
			<div className="container mx-auto px-4 py-8">
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
						onClick={() => navigate('/ap-biology/unit/7/quiz')}
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
								🌱 AP Biology Unit 7: Natural Selection
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Evolution, natural selection, population genetics, speciation, and the origin of life.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit7Content.map((topic) => (
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

export default APBiologyUnit7;
