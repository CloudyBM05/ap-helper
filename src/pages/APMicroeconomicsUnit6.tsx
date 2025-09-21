import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit6Content = [
	{
		key: '6.1',
		title: '6.1 – Socially Efficient and Inefficient Market Outcomes',
		bullets: [
			{
				subtopic: 'Social Efficiency & Allocative Efficiency',
				points: [
					'Social efficiency: occurs when resources are allocated optimally — society’s marginal social benefit = marginal social cost (MSB = MSC).',
					'Allocative efficiency: the optimal quantity of output is produced from society’s point of view.',
				],
			},
			{
				subtopic: 'Efficient Conditions by Market',
				points: [
					'Perfectly Competitive Market: Supply = Demand, MB = MC',
					'Perfectly Competitive Firm: Price = MC',
					'Perfectly Competitive Labor Market: Wage = MRP',
				],
			},
			{
				subtopic: 'Causes of Market Failure',
				points: [
					'Market Power (e.g., monopoly/monopsony)',
					'Asymmetric Information (buyers/sellers lack key info)',
					'Externalities (spillover costs or benefits)',
					'Public Goods (nonrival and nonexcludable → underproduced)',
				],
			},
			{
				subtopic: 'Government Tools to Correct Market Failures',
				points: [
					'Taxes (reduce negative externalities)',
					'Subsidies (encourage positive externalities)',
					'Regulations',
					'Public provisions (direct gov’t production)',
				],
			},
			{
				subtopic: 'Market Failure Definition',
				points: [
					'Market failure exists when firms produce where MPC = MPB (private cost = private benefit), but society wants MSC = MSB.',
				],
			},
		],
	},
	{
		key: '6.2',
		title: '6.2 – Externalities',
		bullets: [
			{
				subtopic: 'Externality Definition',
				points: [
					'Externality: cost or benefit imposed on people not directly involved in the transaction.',
					'Occurs when MSB ≠ MSC.',
				],
			},
			{
				subtopic: 'Types of Externalities',
				points: [
					'Negative Externality (e.g., pollution, smoking): MSC > MPC',
					'Solution: Per-unit tax to shift supply left (reduce quantity).',
					'Positive Externality (e.g., education, vaccines): MSB > MPB',
					'Solution: Subsidy to shift demand right (increase quantity).',
				],
			},
		],
	},
	{
		key: '6.3',
		title: '6.3 – Public and Private Goods',
		bullets: [
			{
				subtopic: 'Key Characteristics',
				points: [
					'Rivalrous: one person’s consumption prevents others (e.g., pizza).',
					'Nonrivalrous: one person’s use doesn’t reduce another’s (e.g., fireworks).',
					'Excludable: non-payers can be excluded (e.g., movie ticket).',
					'Nonexcludable: can’t stop non-payers (e.g., air, national defense).',
				],
			},
			{
				subtopic: 'Types of Goods',
				points: [
					'Private Goods: Yes rival, yes excludable (food, shoes, cars).',
					'Public Goods: No rival, no excludable (national defense, lighthouses).',
					'Common Resources: Yes rival, no excludable (fish in ocean, public parks).',
					'Club Goods: No rival, yes excludable (Netflix, private schools).',
				],
			},
			{
				subtopic: 'Free Rider Problem',
				points: [
					'Free rider problem: people consume without paying → leads to underproduction of public goods.',
					'Gov’t can subsidize or directly provide public goods to fix this issue.',
				],
			},
		],
	},
	{
		key: '6.4',
		title: '6.4 – Government Intervention in Different Market Structures',
		bullets: [
			{
				subtopic: 'Why Government Intervenes',
				points: [
					'Market Power',
					'Externalities',
					'Public Goods (nonrival + nonexcludable)',
				],
			},
			{
				subtopic: 'Tools of Intervention',
				points: [
					'Taxes',
					'Per-unit tax: increases MC, ATC, AVC, lowers output.',
					'Lump-sum tax: increases ATC, doesn’t affect MC → no change in output.',
					'Subsidies',
					'Per-unit subsidy: lowers MC, ATC, AVC → encourages more production.',
					'Lump-sum subsidy: lowers ATC, no effect on output.',
					'Regulations: enforce standards, reduce externalities, ensure fairness.',
					'Price Controls:',
					'Price Ceiling: max legal price (below equilibrium). Causes shortages in perfect competition. In monopoly, becomes new MR curve, lowering output and price.',
					'Price Floor: min legal price (above equilibrium). Causes surpluses in perfect competition. In monopsony, raises wages and employment.',
				],
			},
			{
				subtopic: 'Antitrust Policies',
				points: [
					'Prevent monopolies',
					'Promote competition',
					'Enforced via: Lawsuits, mergers review, price controls or breakups.',
				],
			},
		],
	},
	{
		key: '6.5',
		title: '6.5 – Inequality',
		bullets: [
			{
				subtopic: 'Income Distribution',
				points: [
					'Measures how income is shared across percentiles (e.g., top 10% vs bottom 50%).',
				],
			},
			{
				subtopic: 'Tools for Measuring Inequality',
				points: [
					'Lorenz Curve: compares actual distribution to perfect equality.',
					'Gini Coefficient: Formula: A / (A + B). Ranges from 0 (perfect equality) to 1 (perfect inequality).',
				],
			},
			{
				subtopic: 'Causes of Inequality',
				points: [
					'Supply & demand in labor market',
					'Education/human capital',
					'Discrimination',
					'Inheritance',
					'Bargaining power',
				],
			},
			{
				subtopic: 'Government Solutions',
				points: [
					'Taxes and Transfers',
					'Progressive taxes: higher income → higher % tax (reduces inequality)',
					'Proportional taxes: same % for all (neutral effect)',
					'Regressive taxes: lower income → higher % burden (increases inequality)',
					'Welfare programs, scholarships, minimum wage, income protection, etc.',
				],
			},
		],
	},
];

const APMicroUnit6 = () => {
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
					onClick={() => navigate('/ap-microeconomics-study-guide')}
					className="mb-6 px-4 py-2 rounded-lg bg-white text-fuchsia-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2"
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
						className={
							`px-6 py-3 font-semibold text-lg transition-colors ` +
							(activeTab === 'topics'
								? 'border-b-4 border-fuchsia-600 text-fuchsia-700'
								: 'text-slate-500 hover:text-fuchsia-600')
						}
					>
						Key Topics
					</button>
					<button
						onClick={() => {
							setActiveTab('quiz');
							navigate('/ap-microeconomics/unit/6/quiz');
						}}
						className={
							`px-6 py-3 font-semibold text-lg transition-colors ` +
							(activeTab === 'quiz'
								? 'border-b-4 border-fuchsia-600 text-fuchsia-700'
								: 'text-slate-500 hover:text-fuchsia-600')
						}
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				{activeTab === 'topics' && (
					<>
						<div className="text-center mb-8">
							<h1 className="text-4xl font-bold text-fuchsia-700">
								AP Microeconomics Unit 6: Market Failure and the Role of Government
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Social efficiency, externalities, public goods, government intervention, and inequality.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit6Content.map((topic) => (
									<div
										key={topic.key}
										className="border-b border-slate-200 last:border-b-0 pb-4"
									>
										<button
											onClick={() => toggleTopic(topic.key)}
											className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
										>
											<h3 className="text-xl font-semibold text-fuchsia-700">
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
															<div className="font-semibold text-fuchsia-800 mb-1">
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
						<h2 className="text-2xl font-bold text-fuchsia-700 mb-4">
							Unit 6 Quiz
						</h2>
						<p className="text-lg text-slate-600">Quiz coming soon!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default APMicroUnit6;
