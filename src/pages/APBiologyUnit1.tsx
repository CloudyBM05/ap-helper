import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit1Content = [
	{
		key: '1.1',
		title: '1.1 – Structure of Water and Hydrogen Bonding',
		bullets: [
			{
				subtopic: 'Water Molecule Structure',
				points: [
					'Water (H₂O): 2 hydrogen atoms covalently bonded to 1 oxygen atom',
					'Bent molecular shape due to lone pairs on oxygen',
					'Oxygen is more electronegative than hydrogen (polar covalent bonds)',
					'Results in partial negative charge (δ-) on oxygen, partial positive (δ+) on hydrogen'
				],
			},
			{
				subtopic: 'Hydrogen Bonding',
				points: [
					'Weak intermolecular force between polar molecules',
					'Forms between δ+ hydrogen and δ- oxygen of adjacent water molecules',
					'Each water molecule can form up to 4 hydrogen bonds',
					'Responsible for many of water\'s unique properties'
				],
			},
			{
				subtopic: 'Properties of Water',
				points: [
					'High specific heat: resists temperature change, stabilizes climate',
					'High heat of vaporization: cooling effect during evaporation',
					'Cohesion: water molecules stick together (surface tension)',
					'Adhesion: water molecules stick to other polar surfaces',
					'Universal solvent: dissolves ionic and polar substances'
				],
			},
			{
				subtopic: 'Water in Living Systems',
				points: [
					'Temperature regulation in organisms',
					'Transport medium in blood and xylem',
					'Participates in hydrolysis and dehydration synthesis reactions',
					'Ice is less dense than liquid water (insulates aquatic life)'
				],
			},
		],
	},
	{
		key: '1.2',
		title: '1.2 – Elements of Life',
		bullets: [
			{
				subtopic: 'Essential Elements',
				points: [
					'C, H, O, N make up 96% of living matter',
					'Carbon: backbone of organic molecules, forms 4 covalent bonds',
					'Nitrogen: component of amino acids and nucleic acids',
					'Phosphorus: found in ATP, nucleic acids, and phospholipids'
				],
			},
			{
				subtopic: 'Trace Elements',
				points: [
					'Required in small amounts but essential for life',
					'Iron (Fe): component of hemoglobin',
					'Iodine (I): component of thyroid hormones',
					'Calcium (Ca): muscle contraction, bone structure, cell signaling'
				],
			},
			{
				subtopic: 'Carbon Chemistry',
				points: [
					'Tetravalent: can form 4 covalent bonds',
					'Can form single, double, or triple bonds',
					'Forms chains, rings, and branched structures',
					'Basis for organic molecule diversity'
				],
			},
		],
	},
	{
		key: '1.3',
		title: '1.3 – Introduction to Biological Macromolecules',
		bullets: [
			{
				subtopic: 'Four Major Groups',
				points: [
					'Carbohydrates: energy storage and structural support',
					'Lipids: energy storage, cell membranes, signaling',
					'Proteins: enzymes, structure, transport, defense',
					'Nucleic acids: genetic information storage and transfer'
				],
			},
			{
				subtopic: 'Monomers and Polymers',
				points: [
					'Monomer: single unit building block',
					'Polymer: large molecule made of many monomers',
					'Polymerization: process of linking monomers together',
					'Dehydration synthesis: removes water to form bonds'
				],
			},
			{
				subtopic: 'Hydrolysis',
				points: [
					'Breaking polymers into monomers by adding water',
					'Opposite of dehydration synthesis',
					'Important in digestion and cellular metabolism',
					'Requires specific enzymes'
				],
			},
		],
	},
	{
		key: '1.4',
		title: '1.4 – Properties of Carbon',
		bullets: [
			{
				subtopic: 'Carbon Bonding',
				points: [
					'Electron configuration: 1s² 2s² 2p²',
					'4 valence electrons allow 4 covalent bonds',
					'Can bond with C, H, O, N, S, P and other elements',
					'Forms stable covalent bonds due to similar electronegativity'
				],
			},
			{
				subtopic: 'Structural Diversity',
				points: [
					'Linear chains: fatty acids, amino acid chains',
					'Branched structures: glycogen, some proteins',
					'Ring structures: glucose, benzene rings in amino acids',
					'Complex 3D structures: proteins, nucleic acids'
				],
			},
			{
				subtopic: 'Functional Groups',
				points: [
					'Hydroxyl (-OH): polar, hydrophilic, found in alcohols',
					'Carbonyl (C=O): polar, found in aldehydes and ketones',
					'Carboxyl (-COOH): acidic, releases H⁺ ions',
					'Amino (-NH₂): basic, accepts H⁺ ions',
					'Phosphate (-PO₄³⁻): acidic, energy transfer, found in ATP'
				],
			},
		],
	},
	{
		key: '1.5',
		title: '1.5 – Structure and Function of Biological Macromolecules',
		bullets: [
			{
				subtopic: 'Carbohydrates',
				points: [
					'Monosaccharides: glucose, fructose, galactose (C₆H₁₂O₆)',
					'Disaccharides: sucrose, lactose, maltose',
					'Polysaccharides: starch, glycogen (energy), cellulose, chitin (structure)',
					'Functions: immediate energy, energy storage, structural support'
				],
			},
			{
				subtopic: 'Lipids',
				points: [
					'Fats/oils: 1 glycerol + 3 fatty acids (triglycerides)',
					'Phospholipids: hydrophilic head, hydrophobic tails (cell membranes)',
					'Steroids: cholesterol, hormones (testosterone, estrogen)',
					'Functions: long-term energy storage, insulation, membrane structure'
				],
			},
			{
				subtopic: 'Proteins',
				points: [
					'Monomers: amino acids (20 different types)',
					'Primary structure: amino acid sequence',
					'Secondary structure: α-helices and β-pleated sheets',
					'Tertiary structure: 3D folding, Quaternary structure: multiple polypeptides'
				],
			},
			{
				subtopic: 'Nucleic Acids',
				points: [
					'DNA: double helix, A-T and G-C base pairs, deoxyribose sugar',
					'RNA: single strand, A-U and G-C base pairs, ribose sugar',
					'Nucleotides: phosphate + sugar + nitrogenous base',
					'Functions: genetic information storage (DNA), protein synthesis (RNA)'
				],
			},
		],
	},
	{
		key: '1.6',
		title: '1.6 – Nucleic Acids',
		bullets: [
			{
				subtopic: 'DNA Structure',
				points: [
					'Double helix held together by hydrogen bonds',
					'Antiparallel strands (5\' to 3\' direction)',
					'Complementary base pairing: A with T, G with C',
					'Major and minor grooves allow protein binding'
				],
			},
			{
				subtopic: 'RNA Structure',
				points: [
					'Single-stranded but can fold into complex shapes',
					'Ribose sugar has additional -OH group',
					'Uracil (U) replaces thymine (T)',
					'Types: mRNA, tRNA, rRNA, and others'
				],
			},
			{
				subtopic: 'Functions',
				points: [
					'DNA: stores genetic information, passed to offspring',
					'mRNA: carries genetic code from DNA to ribosomes',
					'tRNA: brings amino acids to ribosomes during translation',
					'rRNA: catalytic component of ribosomes'
				],
			},
		],
	},
];

const APBiologyUnit1 = () => {
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
						onClick={() => navigate('/ap-biology/unit/1/quiz')}
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
								🧬 AP Biology Unit 1: Chemistry of Life
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Water, carbon, biological macromolecules, and the molecular foundations of life.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit1Content.map((topic) => (
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

export default APBiologyUnit1;
