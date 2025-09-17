import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit5Content = [
	{
		key: '5.1',
		title: '5.1 – Meiosis',
		bullets: [
			{
				subtopic: 'Meiosis Overview',
				points: [
					'Meiosis reduces chromosome number from diploid (2n) to haploid (n)',
					'Essential for sexual reproduction and genetic diversity',
					'Consists of two sequential divisions: meiosis I and meiosis II',
					'Results in four genetically unique gametes from one diploid cell'
				],
			},
			{
				subtopic: 'Meiosis I',
				points: [
					'Prophase I: homologous chromosomes pair and crossing over occurs',
					'Metaphase I: paired chromosomes align at cell center',
					'Anaphase I: homologous chromosomes separate (not sister chromatids)',
					'Telophase I: nuclear envelopes reform around separated chromosomes'
				],
			},
			{
				subtopic: 'Meiosis II',
				points: [
					'Similar to mitosis but with haploid cells',
					'Sister chromatids separate during anaphase II',
					'Results in four haploid gametes',
					'No DNA replication between meiosis I and II'
				],
			},
		],
	},
	{
		key: '5.2',
		title: '5.2 – Meiosis and Genetic Diversity',
		bullets: [
			{
				subtopic: 'Sources of Genetic Variation',
				points: [
					'Crossing over (recombination) during prophase I',
					'Independent assortment of chromosomes during metaphase I',
					'Random fertilization of gametes',
					'These processes create unique combinations of alleles'
				],
			},
			{
				subtopic: 'Crossing Over',
				points: [
					'Exchange of genetic material between homologous chromosomes',
					'Occurs during prophase I of meiosis',
					'Creates recombinant chromosomes with new allele combinations',
					'Frequency depends on distance between genes'
				],
			},
		],
	},
	{
		key: '5.3',
		title: '5.3 – Mendelian Genetics',
		bullets: [
			{
				subtopic: 'Mendel\'s Laws',
				points: [
					'Law of Segregation: allele pairs separate during gamete formation',
					'Law of Independent Assortment: genes for different traits assort independently',
					'Law of Dominance: some alleles are dominant over others',
					'Foundation for understanding inheritance patterns'
				],
			},
			{
				subtopic: 'Basic Genetic Terms',
				points: [
					'Gene: unit of heredity coding for a trait',
					'Allele: alternative forms of a gene',
					'Homozygous: two identical alleles (AA or aa)',
					'Heterozygous: two different alleles (Aa)',
					'Phenotype: observable traits',
					'Genotype: genetic makeup'
				],
			},
		],
	},
	{
		key: '5.4',
		title: '5.4 – Non-Mendelian Genetics',
		bullets: [
			{
				subtopic: 'Incomplete Dominance',
				points: [
					'Neither allele is completely dominant',
					'Heterozygote shows blended phenotype',
					'Example: red × white flowers = pink flowers',
					'Genotype ratios still follow Mendel\'s laws'
				],
			},
			{
				subtopic: 'Codominance',
				points: [
					'Both alleles are expressed simultaneously',
					'Example: ABO blood types (AB shows both A and B)',
					'Heterozygote displays both parental phenotypes',
					'Different from incomplete dominance'
				],
			},
			{
				subtopic: 'Multiple Alleles',
				points: [
					'More than two alleles exist for a gene in a population',
					'Individual still has only two alleles',
					'Example: ABO blood system (A, B, O alleles)',
					'Creates more complex inheritance patterns'
				],
			},
		],
	},
	{
		key: '5.5',
		title: '5.5 – Environmental Effects on Phenotype',
		bullets: [
			{
				subtopic: 'Gene-Environment Interactions',
				points: [
					'Environment can influence gene expression',
					'Same genotype can produce different phenotypes',
					'Examples: temperature effects, nutrition effects',
					'Demonstrates that genes and environment both matter'
				],
			},
			{
				subtopic: 'Phenotypic Plasticity',
				points: [
					'Ability of one genotype to produce multiple phenotypes',
					'Adaptive response to environmental conditions',
					'Example: plant height varying with light conditions',
					'Common in many organisms'
				],
			},
		],
	},
	{
		key: '5.6',
		title: '5.6 – Chromosomal Inheritance',
		bullets: [
			{
				subtopic: 'Sex-Linked Inheritance',
				points: [
					'Genes located on sex chromosomes (X or Y)',
					'X-linked traits more common in males',
					'Examples: colorblindness, hemophilia',
					'Shows different inheritance patterns than autosomal genes'
				],
			},
			{
				subtopic: 'Chromosomal Disorders',
				points: [
					'Nondisjunction: failure of chromosomes to separate properly',
					'Results in abnormal chromosome numbers',
					'Examples: Down syndrome (trisomy 21), Turner syndrome (monosomy X)',
					'Can occur during meiosis I or meiosis II'
				],
			},
		],
	},
];

const APBiologyUnit5 = () => {
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState('topics');
	const navigate = useNavigate();

	const toggleTopic = (topicKey: string) => {
		setOpenTopic(openTopic === topicKey ? null : topicKey);
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
						onClick={() => navigate('/ap-biology/unit/5/quiz')}
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
								🧬 AP Biology Unit 5: Heredity
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Meiosis, Mendelian genetics, inheritance patterns, and chromosomal inheritance.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit5Content.map((topic) => (
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

export default APBiologyUnit5;
