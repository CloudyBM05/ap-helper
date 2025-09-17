import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit6Content = [
	{
		key: '6.1',
		title: '6.1 – DNA and RNA Structure',
		bullets: [
			{
				subtopic: 'DNA Nucleotides',
				points: [
					'DNA is composed of nucleotides, each containing a five-carbon sugar (deoxyribose), a phosphate group, and a nitrogenous base',
					'Four nitrogenous bases: Adenine (A) and Guanine (G) are purines (double-ringed)',
					'Cytosine (C) and Thymine (T) are pyrimidines (single-ringed)',
					'Prokaryotes and eukaryotes may have plasmids: small, circular, double-stranded DNA molecules'
				],
			},
			{
				subtopic: 'DNA Structure',
				points: [
					'DNA nucleotides form a sugar-phosphate backbone via covalent bonds',
					'DNA is double-stranded, forming a double helix (Watson, Crick, Franklin)',
					'Base pairing rules: A–T (2 hydrogen bonds), C–G (3 hydrogen bonds)',
					'Strands are complementary and antiparallel (5′ opposite 3′)'
				],
			},
			{
				subtopic: 'DNA Organization',
				points: [
					'Genome: all DNA in an organism',
					'Chromosomes are discrete DNA segments',
					'DNA wraps around histones → nucleosomes',
					'Euchromatin: loose, active DNA; Heterochromatin: condensed, inactive DNA'
				],
			},
			{
				subtopic: 'RNA Differences',
				points: [
					'RNA is single-stranded',
					'Sugar is ribose (not deoxyribose)',
					'Uracil (U) replaces thymine',
					'Various types: mRNA, rRNA, tRNA with different functions'
				],
			},
		],
	},
	{
		key: '6.2',
		title: '6.2 – DNA Replication',
		bullets: [
			{
				subtopic: 'Replication Process',
				points: [
					'DNA replication produces two identical DNA molecules (semiconservative)',
					'Each new molecule contains one original and one new strand',
					'Replication begins at origins of replication forming a replication fork',
					'Process is highly accurate with proofreading mechanisms'
				],
			},
			{
				subtopic: 'Key Enzymes',
				points: [
					'Helicase: unwinds double helix',
					'Topoisomerase: prevents tangling',
					'RNA primase: synthesizes RNA primers',
					'DNA polymerase: adds nucleotides to 3′ end',
					'DNA ligase: joins Okazaki fragments on lagging strand'
				],
			},
			{
				subtopic: 'Strand Synthesis',
				points: [
					'Leading strand synthesized continuously (5′ → 3′)',
					'Lagging strand synthesized in fragments (Okazaki fragments)',
					'Both strands grow in 5′ → 3′ direction',
					'Telomeres are protective ends of chromosomes'
				],
			},
		],
	},
	{
		key: '6.3',
		title: '6.3 – Transcription and RNA Processing',
		bullets: [
			{
				subtopic: 'Transcription Overview',
				points: [
					'DNA → RNA (transcription)',
					'RNA polymerase synthesizes RNA from DNA template (antisense strand)',
					'RNA is built 5′ → 3′',
					'Transcription begins at promoters and start site'
				],
			},
			{
				subtopic: 'RNA Types',
				points: [
					'mRNA: carries protein-coding information',
					'rRNA: forms ribosomes',
					'tRNA: delivers amino acids; anticodon pairs with mRNA codon',
					'Each type has specific structure and function'
				],
			},
			{
				subtopic: 'RNA Processing in Eukaryotes',
				points: [
					'Introns (noncoding) removed by spliceosome',
					'Exons (coding) retained and joined together',
					'5′ cap (GTP) and 3′ poly(A) tail added',
					'Processing prepares mRNA for translation'
				],
			},
			{
				subtopic: 'Prokaryote vs Eukaryote',
				points: [
					'Prokaryotes: polycistronic transcripts (multiple genes)',
					'Eukaryotes: monocistronic (single gene per transcript)',
					'Prokaryotes lack RNA processing steps',
					'Eukaryotic processing occurs in nucleus'
				],
			},
		],
	},
	{
		key: '6.4',
		title: '6.4 – Translation',
		bullets: [
			{
				subtopic: 'Translation Overview',
				points: [
					'mRNA → protein on ribosomes (cytoplasm or rough ER)',
					'Codon: 3 mRNA nucleotides → specific amino acid',
					'Universal genetic code with some exceptions',
					'Process converts nucleotide sequence to amino acid sequence'
				],
			},
			{
				subtopic: 'tRNA Structure and Function',
				points: [
					'3′ end carries amino acid',
					'Anticodon pairs with mRNA codon',
					'Wobble: flexible pairing at third codon position',
					'Each tRNA is specific for one amino acid'
				],
			},
			{
				subtopic: 'Translation Phases',
				points: [
					'Initiation: ribosome attaches to mRNA; AUG start codon recruits methionine-tRNA',
					'Elongation: amino acids linked into polypeptide',
					'Termination: stop codon halts translation; polypeptide released',
					'Process requires energy from GTP and ATP'
				],
			},
		],
	},
	{
		key: '6.5',
		title: '6.5 – Regulation of Gene Expression',
		bullets: [
			{
				subtopic: 'Levels of Regulation',
				points: [
					'Pre-transcriptional: before transcription; DNA packaging, transcription factors, epigenetic changes',
					'Transcriptional: operons in bacteria (structural genes, promoter, operator, regulatory gene)',
					'Post-transcriptional: RNA interference (RNAi) binds mRNA → prevents translation',
					'Post-translational: protein already made but regulated before use'
				],
			},
			{
				subtopic: 'Bacterial Operons',
				points: [
					'Operon: cluster of genes under common control',
					'Repressor binds operator → blocks transcription',
					'Activator proteins enhance transcription',
					'Allows coordinated gene expression'
				],
			},
			{
				subtopic: 'Eukaryotic Regulation',
				points: [
					'Chromatin structure affects gene accessibility',
					'Transcription factors bind to enhancers and silencers',
					'Alternative splicing creates protein variants',
					'MicroRNAs regulate post-transcriptional processes'
				],
			},
		],
	},
	{
		key: '6.6',
		title: '6.6 – Gene Expression and Cell Specialization',
		bullets: [
			{
				subtopic: 'Development Process',
				points: [
					'Morphogenesis: organized cell development shaping tissues/organs',
					'Fertilization triggers rapid cell divisions',
					'Cell differentiation creates specialized cell types',
					'Same genome but different gene expression patterns'
				],
			},
			{
				subtopic: 'Developmental Genes',
				points: [
					'Homeotic genes control cell fate',
					'Hox genes are a subset guiding body plan',
					'Master regulatory genes control cascades of other genes',
					'Mutations in these genes cause dramatic developmental changes'
				],
			},
			{
				subtopic: 'Cell Specialization',
				points: [
					'Different cell types express different sets of genes',
					'Tissue-specific transcription factors',
					'Environmental signals influence development',
					'Stem cells maintain potential for differentiation'
				],
			},
		],
	},
	{
		key: '6.7',
		title: '6.7 – Mutations',
		bullets: [
			{
				subtopic: 'Mutation Types',
				points: [
					'Mutations: errors in genetic code',
					'Causes: DNA damage (chemical/radiation) or repair errors',
					'Can be spontaneous or induced',
					'May be beneficial, harmful, or neutral'
				],
			},
			{
				subtopic: 'Point Mutations',
				points: [
					'Nonsense → premature stop codon',
					'Missense → amino acid change',
					'Silent → codon change but same amino acid',
					'Base substitutions affect single nucleotides'
				],
			},
			{
				subtopic: 'Gene Rearrangements',
				points: [
					'Insertions/deletions → frameshift',
					'Duplications → extra gene copy',
					'Inversions → orientation of chromosomal segment changes',
					'Translocations → chromosome segments swapped',
					'Transposons → mobile DNA elements interrupting genes'
				],
			},
			{
				subtopic: 'Genetic Exchange',
				points: [
					'Bacteria: conjugation increases diversity',
					'Viruses: protein capsid + DNA/RNA genome',
					'Lytic cycle: immediate replication',
					'Lysogenic cycle: genome integration',
					'Transduction: viral transfer of bacterial DNA',
					'Retroviruses: RNA → DNA via reverse transcriptase'
				],
			},
		],
	},
	{
		key: '6.8',
		title: '6.8 – Biotechnology',
		bullets: [
			{
				subtopic: 'Genetic Engineering',
				points: [
					'Recombinant DNA: DNA from multiple sources combined',
					'Genetic engineering: transfer of genes to produce desired products/organisms',
					'Transformation: bacteria acquire foreign DNA',
					'Transfection: eukaryotic cells acquire foreign DNA'
				],
			},
			{
				subtopic: 'Laboratory Techniques',
				points: [
					'PCR (Polymerase Chain Reaction): amplifies DNA billions-fold',
					'Gel electrophoresis: separates DNA/RNA by size/charge',
					'DNA sequencing: determines nucleotide order',
					'Enables custom plasmids and gene studies'
				],
			},
			{
				subtopic: 'Applications',
				points: [
					'RFLPs (Restriction Fragment Length Polymorphisms): DNA length differences among individuals',
					'Used in medicine, agriculture, and research',
					'Gene therapy and genetic testing',
					'Production of pharmaceuticals in modified organisms'
				],
			},
		],
	},
];

const APBiologyUnit6 = () => {
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
						onClick={() => navigate('/ap-biology/unit/6/quiz')}
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
								🔄 AP Biology Unit 6: Gene Expression and Regulation
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								DNA structure, replication, transcription, translation, and gene regulation.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit6Content.map((topic) => (
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

export default APBiologyUnit6;
