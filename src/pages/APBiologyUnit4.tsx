import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit4Content = [
	{
		key: '4.1',
		title: '4.1 – Cell Communication',
		bullets: [
			{
				subtopic: 'Unicellular Organism Responses',
				points: [
					'Unicellular organisms detect and respond to environmental signals',
					'Taxis: movement in response to a stimulus',
					'Positive taxis: movement toward the stimulus',
					'Negative taxis: movement away from the stimulus'
				],
			},
			{
				subtopic: 'Behavioral Responses',
				points: [
					'Innate behavioral responses (taxes/instincts): automatic responses to environmental cues',
					'Chemotaxis: movement in response to chemical signals',
					'These responses are genetically programmed and do not require learning',
					'Critical for survival in changing environments'
				],
			},
		],
	},
	{
		key: '4.2',
		title: '4.2 – Introduction to Signal Transduction',
		bullets: [
			{
				subtopic: 'Multicellular Communication',
				points: [
					'Multicellular organisms coordinate activities via cell communication',
					'Essential for proper development, growth, and homeostasis',
					'Allows coordination between different tissues and organs',
					'Enables responses to environmental changes'
				],
			},
			{
				subtopic: 'Types of Signaling',
				points: [
					'Cell-to-cell contact (direct physical interaction)',
					'Cell signaling molecules (ligands) that bind to receptors',
					'Short-range signaling: affects nearby cells',
					'Long-range signaling: affects distant cells throughout the organism'
				],
			},
			{
				subtopic: 'Signal Transduction Process',
				points: [
					'Signal transduction: conversion of an external signal into a cellular response',
					'Three steps: 1) Ligand binds specific receptor 2) Activation of signal transduction pathway 3) Cellular response occurs',
					'Plasma membrane receptors are required for ligands that cannot enter the cell',
					'Highly specific binding ensures accurate signaling'
				],
			},
		],
	},
	{
		key: '4.3',
		title: '4.3 – Signal Transduction Pathways',
		bullets: [
			{
				subtopic: 'Membrane Receptor Types',
				points: [
					'Ligand-gated ion channels: open/close in response to ligand',
					'Example: acetylcholine → Na⁺ influx → muscle contraction',
					'Catalytic (enzyme-linked) receptors: ligand binding activates enzymatic activity inside the cell',
					'G-protein-linked receptors: ligand binding activates G-proteins (GTP/GDP)'
				],
			},
			{
				subtopic: 'Signal Amplification',
				points: [
					'G-protein-linked receptors trigger secondary messengers like cAMP',
					'Signal transduction cascades amplify the signal',
					'One activated receptor can activate many G-proteins',
					'Each G-protein can activate multiple enzymes, creating amplification'
				],
			},
		],
	},
	{
		key: '4.4',
		title: '4.4 – Feedback',
		bullets: [
			{
				subtopic: 'Homeostasis',
				points: [
					'Homeostasis: maintenance of stable internal conditions',
					'Essential for proper cellular and organismal function',
					'Requires constant monitoring and adjustment',
					'Example: blood glucose regulation via insulin and glucagon'
				],
			},
			{
				subtopic: 'Feedback Mechanisms',
				points: [
					'Negative feedback: end product inhibits the pathway (feedback inhibition)',
					'Most common type of feedback in biological systems',
					'Positive feedback: end product stimulates further pathway activity',
					'Less common but important in certain processes (e.g., blood clotting)'
				],
			},
			{
				subtopic: 'Glucose Regulation Example',
				points: [
					'Insulin: hormone that lowers blood glucose levels',
					'Glucagon: hormone that raises blood glucose levels',
					'Pancreas monitors blood glucose and releases appropriate hormone',
					'Demonstrates negative feedback control of homeostasis'
				],
			},
		],
	},
	{
		key: '4.5',
		title: '4.5 – Cell Cycle',
		bullets: [
			{
				subtopic: 'Cell Cycle Overview',
				points: [
					'The cell cycle: period from one cell division to the next',
					'Ensures accurate transmission of genetic material',
					'Allows for growth and repair of tissues',
					'Tightly regulated to prevent errors'
				],
			},
			{
				subtopic: 'Interphase',
				points: [
					'Interphase: cell growth and DNA replication phase',
					'G1 phase: cell grows, produces organelles, proteins, and enzymes',
					'S phase: DNA is replicated; chromosomes form sister chromatids held by centromeres',
					'G2 phase: cell prepares for mitosis; organelles and proteins synthesized'
				],
			},
			{
				subtopic: 'Mitosis',
				points: [
					'Mitosis: division of the nucleus, followed by cytokinesis',
					'Results in two genetically identical daughter cells',
					'Critical for growth, repair, and asexual reproduction',
					'Must be precisely coordinated to maintain chromosome number'
				],
			},
		],
	},
	{
		key: '4.6',
		title: '4.6 – Regulation of the Cell Cycle',
		bullets: [
			{
				subtopic: 'Cell Cycle Checkpoints',
				points: [
					'Checkpoints ensure proper cell division',
					'G1/S checkpoint: checks for DNA damage before replication',
					'G2/M checkpoint: ensures DNA replication is complete before mitosis',
					'Metaphase checkpoint: ensures all chromosomes are properly attached to spindle'
				],
			},
			{
				subtopic: 'Cyclins and CDKs',
				points: [
					'Cyclins and cyclin-dependent kinases (CDKs) regulate progression',
					'Inactive CDKs bind cyclins → form active complexes → promote cell cycle progression',
					'Separation of CDKs and cyclins → inhibits progression',
					'Different cyclin-CDK complexes control different phases'
				],
			},
			{
				subtopic: 'DNA Damage Response',
				points: [
					'DNA damage activates checkpoints → can pause cycle for repair or trigger apoptosis',
					'p53 protein: "guardian of the genome" - detects DNA damage',
					'If damage is repairable, cycle pauses for repair',
					'If damage is severe, apoptosis is triggered to eliminate the cell'
				],
			},
			{
				subtopic: 'Research Origins',
				points: [
					'Checkpoint mechanisms originally studied in yeast',
					'Yeast provided simple model system for cell cycle research',
					'Many cell cycle genes are conserved across species',
					'Nobel Prize awarded for cell cycle discoveries'
				],
			},
		],
	},
	{
		key: '4.7',
		title: '4.7 – Cancer & Purpose of Mitosis',
		bullets: [
			{
				subtopic: 'Cancer Biology',
				points: [
					'Cancer: uncontrolled cell growth and division',
					'Cells may invade other tissues (metastasis)',
					'Results from mutations in genes controlling cell division',
					'Loss of normal cell cycle control mechanisms'
				],
			},
			{
				subtopic: 'Cancer-Related Genes',
				points: [
					'Oncogenes: mutated proto-oncogenes that promote cancer',
					'Proto-oncogenes normally promote controlled cell division',
					'Tumor suppressor genes: encode proteins that inhibit uncontrolled growth',
					'Can trigger apoptosis when cells become cancerous'
				],
			},
			{
				subtopic: 'Mitosis Stages',
				points: [
					'Prophase: chromosomes condense, nuclear envelope disappears',
					'Metaphase: chromosomes align at metaphase plate; spindle fibers attach',
					'Anaphase: sister chromatids separate and move to opposite poles',
					'Telophase: nuclear envelopes reform; chromosomes decondense'
				],
			},
			{
				subtopic: 'Cytokinesis and Purpose',
				points: [
					'Cytokinesis: cytoplasm divides, forming two identical daughter cells',
					'Purpose of mitosis: Produces genetically identical daughter cells',
					'Maintains proper chromosome number in daughter cells',
					'Supports growth, tissue repair, and asexual reproduction'
				],
			},
		],
	},
];

const APBiologyUnit4 = () => {
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
						onClick={() => navigate('/ap-biology/unit/4/quiz')}
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
								📞 AP Biology Unit 4: Cell Communication and Cell Cycle
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Signal transduction, cell cycle regulation, and the molecular basis of cell division.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit4Content.map((topic) => (
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

export default APBiologyUnit4;
