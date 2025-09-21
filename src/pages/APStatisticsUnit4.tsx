import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit4Content = [
	{
		key: '4.0',
		title: '4.0 – Unit 4 Overview: Probability, Random Variables, and Probability Distributions',
		bullets: [
			{
				subtopic: 'Goal',
				points: ['Quantify uncertainty in random processes.'],
			},
			{
				subtopic: 'Focuses on',
				points: [
					'Understanding probability rules.',
					'Using simulation to estimate outcomes.',
					'Working with random variables and probability distributions.',
				],
			},
		],
	},
	{
		key: '4.1',
		title: '4.1 – Introducing Statistics: Random and Non-Random Patterns?',
		bullets: [
			{
				subtopic: 'Random Process',
				points: [
					'A random process has a predictable set of outcomes, but which outcome occurs is uncertain.',
					'Patterns may appear random but can have streaks or clusters.',
					'Emphasis on long-run behavior rather than short-term streaks.',
				],
			},
		],
	},
	{
		key: '4.2',
		title: '4.2 – Estimating Probabilities Using Simulation',
		bullets: [
			{
				subtopic: 'Simulation',
				points: [
					'Simulation is used to model and understand random processes.',
					'Useful when theoretical probability is hard to calculate.',
				],
			},
			{
				subtopic: 'Steps for Simulation',
				points: [
					'Define the random process.',
					'Assign digits to represent outcomes.',
					'Simulate trials using random tools (e.g., random number table or generator).',
					'Record outcomes.',
					'Use relative frequency to estimate probability.',
				],
			},
			{
				subtopic: 'Law of Large Numbers',
				points: [
					'As the number of trials increases, simulated (empirical) probabilities approach theoretical values.',
				],
			},
		],
	},
	{
		key: '4.3',
		title: '4.3 – Introduction to Probability',
		bullets: [
			{
				subtopic: 'Sample Space (S)',
				points: ['All possible outcomes of a random process.'],
			},
			{
				subtopic: 'Event',
				points: ['A set of outcomes from the sample space.'],
			},
			{
				subtopic: 'Probability Rules',
				points: [
					'Probabilities range from 0 to 1.',
					'The sum of all possible outcomes = 1.',
					'Interpretation: Probability is the long-run proportion of times an event will occur.',
				],
			},
		],
	},
	{
		key: '4.4',
		title: '4.4 – Mutually Exclusive Events',
		bullets: [
			{
				subtopic: 'Mutually Exclusive (Disjoint)',
				points: [
					'Events that cannot happen at the same time.',
					'Example: Getting heads and tails on a single coin flip.',
					'If A and B are mutually exclusive: P(A∩B) = 0',
				],
			},
			{
				subtopic: 'Complement Rule',
				points: ['P(A^c) = 1 − P(A)'],
			},
			{
				subtopic: 'Visualization',
				points: ['Venn Diagrams are useful for visualizing disjoint and overlapping events.'],
			},
		],
	},
	{
		key: '4.5',
		title: '4.5 – Conditional Probability',
		bullets: [
			{
				subtopic: 'Conditional Probability',
				points: [
					'Probability of event B given that A has occurred.',
					'P(B|A) = P(A∩B) / P(A)',
					'Focuses on how one event affects the likelihood of another.',
					'Used frequently in real-world decision-making and medical testing.',
				],
			},
		],
	},
	{
		key: '4.6',
		title: '4.6 – Independent Events and Unions of Events',
		bullets: [
			{
				subtopic: 'Independent Events',
				points: [
					'One event does not affect the probability of the other.',
					'If A and B are independent: P(A∩B) = P(A) × P(B)',
					'Also: P(B|A) = P(B)',
				],
			},
			{
				subtopic: 'Union of Events (A or B)',
				points: [
					'P(A∪B) = P(A) + P(B) − P(A∩B)',
					'Always subtract the overlap to avoid double-counting.',
				],
			},
		],
	},
	{
		key: '4.7',
		title: '4.7 – Introduction to Random Variables and Probability Distributions',
		bullets: [
			{
				subtopic: 'Random Variable',
				points: ['A random variable assigns numerical values to outcomes of a random process.'],
			},
			{
				subtopic: 'Types',
				points: [
					'Discrete: Countable outcomes (e.g., number of heads).',
					'Continuous: Any value in an interval (e.g., height, time).',
				],
			},
			{
				subtopic: 'Probability Distribution',
				points: [
					'Shows all possible values of a random variable with their probabilities.',
					'Each probability: 0 ≤ P(xi) ≤ 1',
					'Sum of all probabilities: ΣP(xi) = 1',
				],
			},
		],
	},
	{
		key: '4.8',
		title: '4.8 – Mean and Standard Deviation of Random Variables',
		bullets: [
			{
				subtopic: 'Expected Value (Mean)',
				points: ['μ = Σxi·P(xi)'],
			},
			{
				subtopic: 'Variance and Standard Deviation',
				points: [
					'σ² = Σ(xi − μ)²·P(xi)',
					'σ = √σ²',
					'Measures center and spread of the probability distribution.',
				],
			},
		],
	},
	{
		key: '4.9',
		title: '4.9 – Combining Random Variables',
		bullets: [
			{
				subtopic: 'Combining Means',
				points: [
					'If T = G + H, then: μT = μG + μH',
					'If D = G − H, then: μD = μG − μH',
				],
			},
			{
				subtopic: 'Combining Variances (if independent)',
				points: [
					'Var(T) = Var(G) + Var(H)',
					'σT = √(σG² + σH²)',
				],
			},
		],
	},
	{
		key: '4.10',
		title: '4.10 – Introduction to the Binomial Distribution',
		bullets: [
			{
				subtopic: 'Binomial Setting (BINS)',
				points: [
					'B: Binary outcomes (success/failure)',
					'I: Independent trials',
					'N: Fixed number of trials',
					'S: Same probability of success for each trial',
				],
			},
			{
				subtopic: 'Binomial Probability Formula',
				points: [
					'P(X = k) = (n choose k) · p^k · (1 − p)^{n − k}',
					'n: number of trials',
					'k: number of successes',
					'p: probability of success',
				],
			},
		],
	},
	{
		key: '4.11',
		title: '4.11 – Parameters for a Binomial Distribution',
		bullets: [
			{
				subtopic: 'Mean (Expected Value)',
				points: ['μ = np'],
			},
			{
				subtopic: 'Standard Deviation',
				points: ['σ = √[np(1 − p)]'],
			},
			{
				subtopic: 'Usage',
				points: ['Used to describe the center and spread of a binomial distribution.'],
			},
		],
	},
	{
		key: '4.12',
		title: '4.12 – The Geometric Distribution',
		bullets: [
			{
				subtopic: 'Geometric Setting',
				points: [
					'Count number of trials until the first success.',
					'Still assumes independent trials with constant probability.',
				],
			},
			{
				subtopic: 'Geometric Probability',
				points: ['P(X = k) = (1 − p)^{k − 1} · p'],
			},
			{
				subtopic: 'Mean',
				points: ['μ = 1/p'],
			},
			{
				subtopic: 'Standard Deviation',
				points: ['σ = √[(1 − p)/p²]'],
			},
		],
	},
];

const APStatisticsUnit4 = () => {
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
						onClick={() => navigate('/ap-statistics/unit/4/quiz')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'quiz'
								? 'border-b-4 border-orange-500 text-orange-700'
								: 'text-slate-500 hover:text-orange-600'
						}`}
					>
						Take Quiz
					</button>
					{/* Add a quiz tab if you have a quiz page for AP Stats */}
				</div>
				{/* Content */}
				{activeTab === 'topics' && (
					<>
						<div className="text-center mb-8">
							<h1 className="text-4xl font-bold text-purple-700">
								AP Statistics Unit 4: Probability, Random Variables, and Probability Distributions
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Probability rules, simulation, random variables, binomial and geometric distributions.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit4Content.map((topic) => (
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

export default APStatisticsUnit4;
