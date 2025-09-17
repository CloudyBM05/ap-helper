import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit1Content = [
	{
		key: '1.1',
		title: '1.1 – Scarcity',
		bullets: [
			{
				subtopic: 'Scarcity & Economic Problem',
				points: [
					'Economics is the study of how individuals, firms, and societies allocate scarce resources to satisfy unlimited wants.',
					'Scarcity means all factors of production (land, labor, capital, entrepreneurship) are limited, and choices must be made.',
					'The economic problem arises from the conflict between unlimited wants and limited resources.',
				],
			},
			{
				subtopic: 'Macroeconomics vs. Microeconomics',
				points: [
					'Macroeconomics studies the whole economy—inflation, unemployment, GDP.',
					'Microeconomics focuses on individual units—consumers, firms, industries.',
				],
			},
			{
				subtopic: 'Factors of Production',
				points: [
					'Land – natural resources like minerals, oil, water.',
					'Labor – human effort, both physical and mental.',
					'Capital – man-made resources (tools, buildings, machines).',
					'Entrepreneurship – individuals who innovate and take risks to combine resources.',
				],
			},
			{
				subtopic: 'Opportunity Cost & Trade-offs',
				points: [
					'Opportunity Cost: The value of the next best alternative when a choice is made.',
					'Example: Choosing to study instead of mowing your uncle’s lawn for $10/hour → the opportunity cost is $10.',
					'Trade-offs: Individuals, firms, and governments must choose between alternatives due to scarcity.',
				],
			},
		],
	},
	{
		key: '1.2',
		title: '1.2 – Opportunity Cost and the Production Possibilities Curve (PPC)',
		bullets: [
			{
				subtopic: 'PPC Basics',
				points: [
					'A model showing the maximum output combinations of two goods an economy can produce using all resources efficiently.',
					'Concave shape: due to increasing opportunity cost—resources are not equally efficient in producing all goods.',
				],
			},
			{
				subtopic: 'Key Concepts',
				points: [
					'Slope of PPC = opportunity cost of good on x-axis.',
					'Inverse slope = opportunity cost of good on y-axis.',
				],
			},
			{
				subtopic: 'Types of Opportunity Cost',
				points: [
					'Constant Opportunity Cost: straight-line PPC; resources are equally efficient.',
					'Increasing Opportunity Cost: bowed-out PPC; more of one good means giving up increasingly more of the other.',
					'Decreasing Opportunity Cost: not realistic in macroeconomics.',
				],
			},
			{
				subtopic: 'Efficiency',
				points: [
					'Productive efficiency: Producing on the PPC (maximum output).',
					'Allocative efficiency: Producing the optimal combination that gives society the most benefit.',
					'Market failure: When markets fail to reach allocative efficiency.',
				],
			},
			{
				subtopic: 'Economic Growth & Contraction',
				points: [
					'Growth: Outward shift of PPC due to more resources, better quality of resources, or technological advancements.',
					'Contraction: Inward shift from reduced output due to events like natural disasters, war, etc.',
				],
			},
		],
	},
	{
		key: '1.3',
		title: '1.3 – Comparative Advantage and Trade',
		bullets: [
			{
				subtopic: 'Absolute vs. Comparative Advantage',
				points: [
					'Absolute advantage: One country/person can produce more of a good using the same resources.',
					'Comparative advantage: The country/person with the lowest opportunity cost in producing a good.',
				],
			},
			{
				subtopic: 'Solving Problems',
				points: [
					'Output problem: Use formula give up / gain. Example: If France gives up 4 wine bottles to gain 2 cheeses, the opp. cost of 1 cheese = 2 wine.',
					'Input problem: Use formula gain / give up. Example: If Germany takes 3 hours to make 1 car and 2 hours to make 1 truck, calculate accordingly.',
				],
			},
			{
				subtopic: 'Trade & Terms of Trade',
				points: [
					'Nations specialize in goods they have a comparative advantage in and export those goods.',
					'Terms of Trade: Shows how much of one good a country must give up to receive another through trade. Must fall between the opportunity costs for both countries to benefit.',
				],
			},
		],
	},
	{
		key: '1.4',
		title: '1.4 – Demand',
		bullets: [
			{
				subtopic: 'Law of Demand',
				points: [
					'As price increases, quantity demanded decreases (inverse relationship), ceteris paribus (all else equal).',
				],
			},
			{
				subtopic: 'Movement vs. Shift',
				points: [
					'Change in price → movement along the demand curve (change in quantity demanded).',
					'Change in non-price determinant → shift of demand curve.',
				],
			},
			{
				subtopic: 'Determinants of Demand (INSECT)',
				points: [
					'I = Income: Normal goods: ↑ Income → ↑ Demand; Inferior goods: ↑ Income → ↓ Demand',
					'N = Number of consumers: More buyers → ↑ Demand',
					'S = Substitutes: Price of substitute ↑ → Demand for good ↑',
					'E = Expectations: If future prices expected to rise → Current demand ↑',
					'C = Complements: Price of complement ↑ → Demand ↓',
					'T = Tastes and Preferences: Favorable changes → ↑ Demand',
				],
			},
		],
	},
	{
		key: '1.5',
		title: '1.5 – Supply',
		bullets: [
			{
				subtopic: 'Law of Supply',
				points: [
					'As price increases, quantity supplied increases (direct relationship), ceteris paribus.',
				],
			},
			{
				subtopic: 'Movement vs. Shift',
				points: [
					'Change in price → movement along the curve (change in quantity supplied).',
					'Change in determinant → shift in the supply curve.',
				],
			},
			{
				subtopic: 'Determinants of Supply (ROTTEN)',
				points: [
					'R = Resources (input costs): ↑ Input prices → ↓ Supply',
					'O = Other goods’ prices: ↑ Price of alternative good → ↓ Supply of current good',
					'T = Taxes: ↑ Taxes → ↓ Supply',
					'T = Technology: ↑ Tech → ↑ Supply',
					'E = Expectations: If price expected to rise in future → ↓ Current supply',
					'N = Number of sellers: ↑ Sellers → ↑ Supply',
				],
			},
		],
	},
	{
		key: '1.6',
		title: '1.6 – Market Equilibrium',
		bullets: [
			{
				subtopic: 'Equilibrium',
				points: [
					'Occurs where quantity demanded = quantity supplied. Called the market-clearing price—no surplus or shortage.',
				],
			},
			{
				subtopic: 'Disequilibrium',
				points: [
					'Surplus: Qs > Qd → Price will fall.',
					'Shortage: Qd > Qs → Price will rise.',
				],
			},
			{
				subtopic: 'Changes in Equilibrium',
				points: [
					'Demand ↑ → Price ↑, Quantity ↑',
					'Demand ↓ → Price ↓, Quantity ↓',
					'Supply ↑ → Price ↓, Quantity ↑',
					'Supply ↓ → Price ↑, Quantity ↓',
				],
			},
			{
				subtopic: 'Graph Tips',
				points: [
					'Demand shifts → curve moves up/right or down/left.',
					'Supply shifts → curve moves right (increase) or left (decrease).',
				],
			},
		],
	},
];

const APMacroUnit1 = () => {
	const [activeTab, setActiveTab] = useState('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const navigate = useNavigate();

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	return (
		<div className="min-h-screen bg-slate-50 text-slate-800">
			<div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
				<button
					onClick={() => navigate('/ap-macroeconomics-study-guide')}
					className="mb-6 px-4 py-2 rounded-lg bg-white text-cyan-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2"
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
				<div className="flex justify-center border-b-2 border-slate-200 mb-8">
					<button
						onClick={() => setActiveTab('topics')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'topics'
								? 'border-b-4 border-cyan-600 text-cyan-700'
								: 'text-slate-500 hover:text-cyan-600'
						}`}
					>
						Key Topics
					</button>
					<button
						onClick={() => navigate('/ap-macroeconomics/unit/1/quiz')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'quiz'
								? 'border-b-4 border-cyan-600 text-cyan-700'
								: 'text-slate-500 hover:text-cyan-600'
						}`}
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				{activeTab === 'topics' && (
					<>
						<div className="text-center mb-8">
							<h1 className="text-4xl font-bold text-cyan-700">
								AP Macroeconomics Unit 1: Basic Economic Concepts
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Scarcity, opportunity cost, PPC, demand, supply, equilibrium, and trade.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit1Content.map((topic) => (
									<div
										key={topic.key}
										className="border-b border-slate-200 last:border-b-0 pb-4"
									>
										<button
											onClick={() => toggleTopic(topic.key)}
											className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
										>
											<h3 className="text-xl font-semibold text-cyan-700">
												{topic.title}
											</h3>
											<span className="text-2xl text-slate-500">
												{openTopic === topic.key ? '-' : '+'}
											</span>
										</button>
										{openTopic === topic.key && (
											<div className="p-4 bg-slate-50 rounded-b-lg">
												<div className="space-y-4">
													{topic.bullets.map((section, idx) => (
														<div key={idx}>
															<div className="font-semibold text-cyan-800 mb-1">
																{section.subtopic}
															</div>
															<ul className="list-disc ml-6 text-slate-700 space-y-1">
																{section.points.map((point, i) =>
																	point.startsWith('  ')
																		? (
																			<li
																				key={i}
																				style={{
																					listStyle: 'none',
																					marginLeft: '1.5rem',
																				}}
																			>
																				{point.trim()}
																			</li>
																		)
																		: (
																			<li key={i}>{point}</li>
																		)
																)}
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
				{activeTab === 'quiz' && (
					<div className="text-center mt-12">
						{/* Redirect to quiz page */}
						{(() => {
							navigate('/ap-macroeconomics/unit/1/quiz');
							return null;
						})()}
					</div>
				)}
			</div>
		</div>
	);
};

export default APMacroUnit1;
