import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit2Content = [
	{
		key: '2.1',
		title: '2.1 – Cell Structure and Function',
		bullets: [
			{
				subtopic: 'Prokaryotic Cells',
				points: [
					'Small, simple cells including bacteria and archaea',
					'No membrane-bound organelles',
					'Circular DNA located in the nucleoid (not in nucleus)',
					'Surrounded by plasma membrane and usually a cell wall (peptidoglycan)',
					'Contain small ribosomes (70S)',
					'May have flagella (motility) and capsules (protection)'
				],
			},
			{
				subtopic: 'Eukaryotic Cells',
				points: [
					'Larger, complex cells including animals, plants, fungi, protists',
					'Membrane-bound organelles allow compartmentalization',
					'Linear DNA enclosed in a nucleus',
					'Large ribosomes (80S)',
					'Complex internal membrane systems'
				],
			},
			{
				subtopic: 'Microscopes',
				points: [
					'Light microscope: living or stained cells (up to 1,000×)',
					'Electron microscope: ultrastructure of organelles, high resolution'
				],
			},
		],
	},
	{
		key: '2.2',
		title: '2.2 – Cell Size',
		bullets: [
			{
				subtopic: 'Surface Area-to-Volume Ratio (SA:V)',
				points: [
					'As cell volume increases, SA:V decreases',
					'Lower SA:V reduces efficiency of nutrient/waste exchange',
					'Smaller cells → higher SA:V → more efficient exchange'
				],
			},
			{
				subtopic: 'Applications to Organisms',
				points: [
					'Small organisms lose heat faster (greater efficiency of exchange)',
					'Larger organisms have adaptations (folded membranes, circulatory systems) to maintain exchange efficiency',
					'Limits maximum cell size in most organisms'
				],
			},
		],
	},
	{
		key: '2.3',
		title: '2.3 – Plasma Membrane',
		bullets: [
			{
				subtopic: 'Structure',
				points: [
					'Phospholipid bilayer: hydrophilic heads outward, hydrophobic tails inward',
					'Fluid Mosaic Model: dynamic arrangement of phospholipids, proteins, and carbohydrates',
					'Membrane is fluid and flexible'
				],
			},
			{
				subtopic: 'Proteins',
				points: [
					'Peripheral proteins: loosely attached, cell signaling/recognition',
					'Integral proteins: amphipathic, embedded in bilayer',
					'Transmembrane proteins: span entire membrane, transport functions'
				],
			},
			{
				subtopic: 'Functions',
				points: [
					'Adhesion proteins: form intercellular junctions',
					'Receptor proteins: bind signaling molecules (e.g., hormones)',
					'Transport proteins: channels/pumps for solute movement',
					'Glycoproteins/glycolipids: cell recognition, immune response'
				],
			},
			{
				subtopic: 'Semipermeability',
				points: [
					'Only certain molecules cross freely; others need transport mechanisms'
				],
			},
		],
	},
	{
		key: '2.4',
		title: '2.4 – Membrane Permeability',
		bullets: [
			{
				subtopic: 'Factors Influencing Permeability',
				points: [
					'Molecule size (small molecules cross more easily)',
					'Polarity/charge (nonpolar pass freely; polar/charged need transport)'
				],
			},
			{
				subtopic: 'Examples',
				points: [
					'Small nonpolar molecules (O₂, CO₂) diffuse freely',
					'Water moves via aquaporins',
					'Ions (Na⁺, K⁺) require ion channels'
				],
			},
		],
	},
	{
		key: '2.5',
		title: '2.5 – Membrane Transport',
		bullets: [
			{
				subtopic: 'Passive Transport (no energy required)',
				points: [
					'Moves substances down concentration gradient',
					'Includes diffusion, facilitated diffusion, osmosis'
				],
			},
			{
				subtopic: 'Active Transport (requires energy/ATP)',
				points: [
					'Moves substances against concentration gradient',
					'Example: sodium-potassium pump (3 Na⁺ out, 2 K⁺ in)'
				],
			},
			{
				subtopic: 'Bulk Transport',
				points: [
					'Endocytosis (engulfing materials) and exocytosis (secretion)'
				],
			},
		],
	},
	{
		key: '2.6',
		title: '2.6 – Facilitated Diffusion',
		bullets: [
			{
				subtopic: 'Mechanism',
				points: [
					'Passive transport with help of membrane proteins',
					'Substances move down concentration gradient but require assistance'
				],
			},
			{
				subtopic: 'Channel Proteins',
				points: [
					'Allow passage of ions/molecules',
					'Aquaporins (water transport)',
					'Ion channels for Na⁺, K⁺, Ca²⁺'
				],
			},
			{
				subtopic: 'Carrier Proteins',
				points: [
					'Change shape to transport molecules (e.g., glucose transporters)',
					'Glucose channels'
				],
			},
		],
	},
	{
		key: '2.7',
		title: '2.7 – Osmosis',
		bullets: [
			{
				subtopic: 'Definition',
				points: [
					'Movement of water across a semipermeable membrane',
					'Driven by solute concentration differences'
				],
			},
			{
				subtopic: 'Tonicity',
				points: [
					'Isotonic: solute concentration equal inside/outside',
					'Hypertonic: higher solute concentration outside → water leaves cell (shrivels, plasmolysis in plants)',
					'Hypotonic: lower solute concentration outside → water enters cell (lysis in animals; turgid in plants)'
				],
			},
			{
				subtopic: 'Water Potential (Ψ)',
				points: [
					'Ψ = Ψp (pressure) + Ψs (solute)',
					'Adding solutes decreases water potential (more negative)',
					'Formula for solute potential: Ψs = −iCRT'
				],
			},
		],
	},
	{
		key: '2.8',
		title: '2.8 – Mechanisms of Transport',
		bullets: [
			{
				subtopic: 'Simple Diffusion',
				points: [
					'Small, nonpolar molecules directly through membrane'
				],
			},
			{
				subtopic: 'Facilitated Diffusion',
				points: [
					'Via transport proteins'
				],
			},
			{
				subtopic: 'Active Transport',
				points: [
					'Requires ATP (primary) or energy from another gradient (secondary)'
				],
			},
			{
				subtopic: 'Endocytosis',
				points: [
					'Pinocytosis: uptake of liquids',
					'Phagocytosis: uptake of solids',
					'Receptor-mediated: uses receptors and clathrin-coated pits'
				],
			},
			{
				subtopic: 'Exocytosis',
				points: [
					'Vesicles fuse with membrane to release substances'
				],
			},
			{
				subtopic: 'Bulk Flow',
				points: [
					'One-way movement of fluids due to pressure (e.g., blood in vessels, xylem/phloem in plants)'
				],
			},
			{
				subtopic: 'Dialysis',
				points: [
					'Diffusion of solutes across selective membranes (example: kidney dialysis)'
				],
			},
		],
	},
	{
		key: '2.9',
		title: '2.9 – Cell Compartmentalization',
		bullets: [
			{
				subtopic: 'Advantages of Compartmentalization',
				points: [
					'Increases efficiency by separating incompatible processes',
					'Allows specialized conditions within organelles'
				],
			},
			{
				subtopic: 'Major Organelles',
				points: [
					'Nucleus: stores DNA, produces rRNA in nucleolus',
					'Ribosomes: protein synthesis (free-floating or ER-bound)',
					'Rough ER: protein synthesis/processing',
					'Smooth ER: lipid synthesis, detoxification',
					'Golgi apparatus: modifies/packages proteins into vesicles',
					'Mitochondria: ATP production, cristae increase surface area',
					'Lysosomes: contain hydrolytic enzymes, apoptosis',
					'Vacuoles: storage (central vacuole in plants)',
					'Peroxisomes: detoxification, breakdown of H₂O₂',
					'Cytoskeleton: microtubules (tubulin, division/movement), microfilaments (actin, motility)',
					'Cilia/flagella: locomotion'
				],
			},
		],
	},
	{
		key: '2.10',
		title: '2.10 – Origins of Cell Compartmentalization',
		bullets: [
			{
				subtopic: 'Endosymbiotic Theory',
				points: [
					'Eukaryotic organelles (mitochondria, chloroplasts) originated from engulfed prokaryotic cells',
					'Evidence: double membranes, own DNA, ribosomes, reproduce independently'
				],
			},
			{
				subtopic: 'Internal Membranes',
				points: [
					'Likely arose from infoldings of plasma membrane → ER, nucleus'
				],
			},
		],
	},
	{
		key: '2.11',
		title: '2.11 – Origins of Cell Compartmentalization (continued)',
		bullets: [
			{
				subtopic: 'Evolution of Organelles',
				points: [
					'More efficient metabolic pathways',
					'Ability to maintain different internal environments (e.g., pH, ionic concentration)',
					'Evolution of multicellularity and specialization'
				],
			},
		],
	},
];

const APBiologyUnit2 = () => {
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
						onClick={() => navigate('/ap-biology/unit/2/quiz')}
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
								🔬 AP Biology Unit 2: Cell Structure and Function
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Understanding prokaryotic and eukaryotic cells, membrane structure, and transport mechanisms
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit2Content.map((topic) => (
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

export default APBiologyUnit2;
