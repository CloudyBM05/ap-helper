import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit1Content = [
	{
		key: '1.0',
		title: '1.0 – Unit 1 Overview: Exploring One-Variable Data',
		bullets: [
			{
				subtopic: 'Focus',
				points: ['Understanding and analyzing one-variable data.'],
			},
			{
				subtopic: 'Key Goals',
				points: [
					'Learn how to represent, summarize, and interpret data for a single variable.',
					'Distinguish between categorical and quantitative data.',
				],
			},
			{
				subtopic: 'Importance',
				points: [
					'This unit forms the basis for more advanced topics in AP Stats.',
				],
			},
		],
	},
	{
		key: '1.1',
		title: '1.1 – Introducing Statistics: What Can We Learn from Data?',
		bullets: [
			{
				subtopic: 'Statistics',
				points: [
					'The science of collecting, analyzing, and drawing conclusions from data.',
				],
			},
			{
				subtopic: 'Individuals',
				points: [
					'Objects described by the data (e.g., people, animals, objects).',
				],
			},
			{
				subtopic: 'Variables',
				points: [
					'Characteristics measured on individuals.',
					'Can be categorical or quantitative.',
				],
			},
			{
				subtopic: 'Purpose',
				points: [
					'To use data to make informed decisions and identify patterns or relationships.',
				],
			},
		],
	},
	{
		key: '1.2',
		title: '1.2 – The Language of Variation: Variables',
		bullets: [
			{
				subtopic: 'Categorical Variables',
				points: [
					'Describe qualities or categories (e.g., eye color, type of car).',
				],
			},
			{
				subtopic: 'Quantitative Variables',
				points: [
					'Measured with numerical values (e.g., height, GPA).',
				],
			},
			{
				subtopic: 'Discrete',
				points: [
					'Countable values (e.g., number of siblings).',
				],
			},
			{
				subtopic: 'Continuous',
				points: [
					'Any value in a range (e.g., time, weight).',
				],
			},
			{
				subtopic: 'Parameter vs. Statistic',
				points: [
					'Parameter: Numerical summary of a population.',
					'Statistic: Numerical summary of a sample.',
				],
			},
			{
				subtopic: 'Importance',
				points: [
					'Knowing the type of variable influences what graphs and analyses are appropriate.',
				],
			},
		],
	},
	{
		key: '1.3',
		title: '1.3 – Representing a Categorical Variable with Tables',
		bullets: [
			{
				subtopic: 'Frequency Table',
				points: [
					'Counts how many individuals fall into each category.',
				],
			},
			{
				subtopic: 'Relative Frequency Table',
				points: [
					'Proportions or percentages instead of raw counts.',
				],
			},
			{
				subtopic: 'Tables help identify',
				points: [
					'Most/least common categories.',
					'Distribution of responses.',
				],
			},
		],
	},
	{
		key: '1.4',
		title: '1.4 – Representing a Categorical Variable with Graphs',
		bullets: [
			{
				subtopic: 'Bar Graph',
				points: [
					'Used for categorical variables.',
					'Height = frequency or relative frequency.',
					'Bars do not touch.',
				],
			},
			{
				subtopic: 'Pie Chart',
				points: [
					'Shares percentage each category contributes to the whole.',
				],
			},
			{
				subtopic: 'Use these graphs to',
				points: [
					'Visualize comparisons among categories.',
					'Identify dominant or rare categories.',
				],
			},
		],
	},
	{
		key: '1.5',
		title: '1.5 – Representing a Quantitative Variable with Graphs',
		bullets: [
			{
				subtopic: 'Dot Plot',
				points: ['Shows individual data points.'],
			},
			{
				subtopic: 'Stem-and-Leaf Plot',
				points: [
					'Preserves actual data values while showing distribution.',
				],
			},
			{
				subtopic: 'Histogram',
				points: [
					'Best for larger datasets.',
					'Shows frequency of values within bins/intervals.',
					'Bars touch.',
				],
			},
			{
				subtopic: 'Choose graph type',
				points: [
					'Based on data size and detail needed.',
				],
			},
		],
	},
	{
		key: '1.6',
		title: '1.6 – Describing the Distribution of a Quantitative Variable',
		bullets: [
			{
				subtopic: 'SOCS',
				points: [
					'Shape: Symmetric, skewed right, skewed left, unimodal, bimodal, uniform.',
					'Outliers: Values that fall far from the overall pattern.',
					'Center: Typically described using mean or median.',
					'Spread: Refers to how much the data varies (e.g., range, IQR, standard deviation).',
					'Shape informs choice of center/spread:',
					'Skewed → median & IQR.',
					'Symmetric → mean & standard deviation.',
				],
			},
		],
	},
	{
		key: '1.7',
		title: '1.7 – Summary Statistics for a Quantitative Variable',
		bullets: [
			{
				subtopic: 'Measures of Center',
				points: [
					'Mean: Average (sensitive to outliers).',
					'Median: Middle value (resistant to outliers).',
				],
			},
			{
				subtopic: 'Measures of Spread',
				points: [
					'Range = Max – Min (sensitive to outliers).',
					'IQR = Q3 – Q1 (middle 50% of data).',
					'Standard Deviation (s): Measures average distance from the mean.',
				],
			},
			{
				subtopic: 'Percentiles',
				points: [
					'Indicate relative standing (e.g., 90th percentile means better than 90%).',
				],
			},
			{
				subtopic: 'Quartiles',
				points: [
					'Q1 = 25th percentile.',
					'Q2 = 50th percentile = median.',
					'Q3 = 75th percentile.',
				],
			},
		],
	},
	{
		key: '1.8',
		title: '1.8 – Graphical Representations of Summary Statistics',
		bullets: [
			{
				subtopic: 'Five-Number Summary',
				points: [
					'Minimum, Q1, Median, Q3, Maximum.',
				],
			},
			{
				subtopic: 'Boxplot (Box-and-Whisker Plot)',
				points: [
					'Graphically displays five-number summary.',
					'Useful for comparing distributions.',
				],
			},
			{
				subtopic: 'Modified Boxplot',
				points: [
					'Shares outliers as individual points.',
					'Identifies outliers using fences:',
					'Lower Fence = Q1 − 1.5(IQR)',
					'Upper Fence = Q3 + 1.5(IQR)',
				],
			},
		],
	},
	{
		key: '1.9',
		title: '1.9 – Comparing Distributions of a Quantitative Variable',
		bullets: [
			{
				subtopic: 'Compare using SOCS',
				points: [
					'Shape: Is one distribution more skewed?',
					'Center: Which has a higher mean or median?',
					'Spread: Which has more variability?',
					'Outliers: Are there extreme values in either group?',
				],
			},
			{
				subtopic: 'Visual Comparison',
				points: [
					'Use side-by-side boxplots or dual histograms for visual comparison.',
				],
			},
			{
				subtopic: 'Context',
				points: [
					'Always use context in comparative statements (e.g., "The median age of cats is higher than that of dogs").',
				],
			},
		],
	},
	{
		key: '1.10',
		title: '1.10 – The Normal Distribution',
		bullets: [
			{
				subtopic: 'Normal Distribution',
				points: [
					'Symmetric, unimodal, bell-shaped curve.',
					'Defined by mean (μ) and standard deviation (σ).',
				],
			},
			{
				subtopic: 'Empirical Rule (68-95-99.7 Rule)',
				points: [
					'68% of data within 1 SD of mean.',
					'95% within 2 SDs.',
					'99.7% within 3 SDs.',
				],
			},
			{
				subtopic: 'Z-Score',
				points: [
					'Formula: z = (x − μ)/σ',
					'Measures how many standard deviations a value is from the mean.',
				],
			},
			{
				subtopic: 'Applications',
				points: [
					'Use z-scores to find probabilities, percentiles, and compare data values.',
					'Technology tools: TI-84, Desmos, and statistical software can compute areas under normal curve.',
				],
			},
		],
	},
];

const APStatisticsUnit1 = () => {
	const [activeTab, setActiveTab] = useState('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const navigate = useNavigate();

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	return (
		<div className="min-h-screen bg-purple-50 text-slate-800">
			<div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
				<button
					onClick={() => navigate('/ap-statistics-study-guide')}
					className="mb-6 px-4 py-2 rounded-lg bg-white text-purple-600 font-semibold hover:bg-purple-100 transition-colors shadow-sm flex items-center gap-2"
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
				<div className="flex justify-center border-b-2 border-purple-200 mb-8">
					<button
						onClick={() => setActiveTab('topics')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'topics'
								? 'border-b-4 border-purple-600 text-purple-700'
								: 'text-slate-500 hover:text-purple-600'
						}`}
					>
						Key Topics
					</button>
					<button
						onClick={() => navigate('/ap-statistics/unit/1/quiz')}
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
							<h1 className="text-4xl font-bold text-purple-700">
								AP Statistics Unit 1: Exploring One-Variable Data
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Data types, graphs, summary statistics, normal distribution, and
								comparing distributions.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit1Content.map((topic) => (
									<div
										key={topic.key}
										className="border-b border-purple-200 last:border-b-0 pb-4"
									>
										<button
											onClick={() => toggleTopic(topic.key)}
											className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-purple-50 transition-colors"
										>
											<h3 className="text-xl font-semibold text-purple-700">
												{topic.title}
											</h3>
											<span className="text-2xl text-purple-400">
												{openTopic === topic.key ? '-' : '+'}
											</span>
										</button>
										{openTopic === topic.key && (
											<div className="p-4 bg-purple-50 rounded-b-lg">
												<div className="space-y-4">
													{topic.bullets.map((section, idx) => (
														<div key={idx}>
															<div className="font-semibold text-purple-800 mb-1">
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

export default APStatisticsUnit1;
