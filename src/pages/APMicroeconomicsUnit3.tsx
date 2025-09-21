import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit3Content = [
	{
		key: '3.1',
		title: '3.1 – The Production Function',
		bullets: [
			{
				subtopic: 'Production Function',
				points: [
					'Describes the relationship between the quantity of inputs used and the resulting quantity of output produced.',
					'Uses the factors of production: land, labor, capital, entrepreneurship.',
				],
			},
			{
				subtopic: 'Key Concepts',
				points: [
					'Fixed Input: Quantity cannot change in the short run (e.g., factory size).',
					'Variable Input: Quantity can change (e.g., number of workers).',
					'Short Run: At least one input is fixed.',
					'Long Run: All inputs are variable.',
					'Marginal Product (MP): Change in output from adding one more unit of input.',
					'Marginal Product of Labor (MPL) = ∆Output / ∆Labor.',
				],
			},
			{
				subtopic: 'Diminishing Marginal Returns',
				points: [
					'As more units of a variable input are added, the marginal product decreases after a certain point.',
				],
			},
			{
				subtopic: 'Output',
				points: ['Total production.'],
			},
			{
				subtopic: 'Capital',
				points: ['Tools, machinery, and buildings used in production.'],
			},
			{
				subtopic: 'Rental Rate',
				points: ['The cost of using capital.'],
			},
		],
	},
	{
		key: '3.2',
		title: '3.2 – Short-Run Production Costs',
		bullets: [
			{
				subtopic: 'Short Run',
				points: ['At least one input is fixed.'],
			},
			{
				subtopic: 'Cost Concepts',
				points: [
					'Fixed Cost (FC): Does not change with output (e.g., rent, ovens).',
					'Variable Cost (VC): Changes with output (e.g., ingredients, labor).',
					'Total Cost (TC) = FC + VC.',
					'Marginal Cost (MC): Cost of producing one more unit = ∆TC / ∆Q.',
				],
			},
			{
				subtopic: 'Average Cost Formulas',
				points: [
					'Average Fixed Cost (AFC) = FC / Q.',
					'Average Variable Cost (AVC) = VC / Q.',
					'Average Total Cost (ATC) = TC / Q = AFC + AVC.',
					'MC intersects both AVC and ATC at their minimum points.',
				],
			},
		],
	},
	{
		key: '3.3',
		title: '3.3 – Long-Run Production Costs',
		bullets: [
			{
				subtopic: 'Long Run',
				points: [
					'All inputs are variable, and firms can adjust all resources to minimize cost.',
				],
			},
			{
				subtopic: 'Long-Run Average Total Cost (LRATC)',
				points: [
					'Shows the lowest possible cost to produce each quantity in the long run.',
				],
			},
			{
				subtopic: 'Scale of Production',
				points: [
					'Economies of Scale:',
					'  LRATC ↓ as output ↑.',
					'  Caused by specialization, bulk buying, more efficient capital use.',
					'Diseconomies of Scale:',
					'  LRATC ↑ as output ↑.',
					'  Caused by management inefficiencies, communication breakdowns.',
					'Constant Returns to Scale:',
					'  Output and input grow proportionally.',
					'  If all inputs double, output also doubles → LRATC remains constant.',
				],
			},
		],
	},
	{
		key: '3.4',
		title: '3.4 – Types of Profit',
		bullets: [
			{
				subtopic: 'Profit',
				points: ['The firm’s remaining revenue after subtracting costs.'],
			},
			{
				subtopic: 'Types of Profit',
				points: [
					'Accounting Profit = Total Revenue - Explicit Costs.',
					'Explicit Costs: Actual money paid (e.g., wages, rent).',
					'Economic Profit = Total Revenue - Explicit Costs - Implicit Costs.',
					'Implicit Costs: Opportunity costs of resources already owned (e.g., foregone salary).',
				],
			},
			{
				subtopic: 'Marginal Revenue (MR)',
				points: ['Additional revenue from selling one more unit.'],
			},
		],
	},
	{
		key: '3.5',
		title: '3.5 – Profit Maximization',
		bullets: [
			{
				subtopic: 'Profit Maximizing Rule',
				points: [
					'Firms maximize profit where MR = MC.',
					'If MR > MC → produce more.',
					'If MR < MC → produce less.',
					'At MR = MC: Revenue from last unit equals the cost to produce it.',
					'Ensures maximum efficiency and profitability.',
				],
			},
		],
	},
	{
		key: '3.6',
		title: '3.6 – Firm’s Short-Run Decision to Produce and Long-Run Decisions to Enter or Exit a Market',
		bullets: [
			{
				subtopic: 'Short-Run Decisions',
				points: [
					'Shutdown Rule:',
					'  If Price ≥ AVC → firm produces.',
					'  If Price < AVC → firm shuts down (can\'t cover variable costs).',
					'Firms can make: Profit, Loss, or Break-even.',
				],
			},
			{
				subtopic: 'Long-Run Decisions',
				points: [
					'Exit Rule:',
					'  If Price < ATC, firm exits the market.',
					'Normal Profit:',
					'  In the long run, perfectly competitive firms make zero economic profit (TR = TC).',
				],
			},
			{
				subtopic: 'Entry/Exit Dynamics',
				points: [
					'If firms make economic profit → new firms enter → supply ↑ → price ↓.',
					'If firms face losses → firms exit → supply ↓ → price ↑.',
				],
			},
		],
	},
	{
		key: '3.7',
		title: '3.7 – Perfect Competition',
		bullets: [
			{
				subtopic: 'Perfect Competition Characteristics',
				points: [
					'Many firms, each too small to affect market price.',
					'Identical products (homogeneous).',
					'Free entry and exit in the long run.',
					'Perfect information: Buyers and sellers know all prices and products.',
				],
			},
			{
				subtopic: 'Firms are Price Takers',
				points: [
					'Cannot influence price; must accept the market equilibrium price.',
				],
			},
			{
				subtopic: 'Revenue in Perfect Competition',
				points: [
					'Price = MR = AR.',
					'Firm’s demand curve is perfectly elastic (horizontal).',
				],
			},
			{
				subtopic: 'Profit in Short Run',
				points: ['Can earn positive profit, zero profit, or a loss.'],
			},
			{
				subtopic: 'Profit in Long Run',
				points: [
					'Always zero economic profit due to free entry/exit.',
					'Firms only earn normal profit (covering all costs including opportunity costs).',
				],
			},
		],
	},
];

const APMicroUnit3 = () => {
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
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'topics'
								? 'border-b-4 border-fuchsia-600 text-fuchsia-700'
								: 'text-slate-500 hover:text-fuchsia-600'
						}`}
					>
						Key Topics
					</button>
					<button
						// Change: navigate to quiz route instead of just setting tab
						onClick={() => navigate('/ap-microeconomics/unit/3/quiz')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'quiz'
								? 'border-b-4 border-fuchsia-600 text-fuchsia-700'
								: 'text-slate-500 hover:text-fuchsia-600'
						}`}
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				{activeTab === 'topics' && (
					<>
						<div className="text-center mb-8">
							<h1 className="text-4xl font-bold text-fuchsia-700">
								AP Microeconomics Unit 3: Production, Costs, and Perfect Competition
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Production function, costs, profit, profit maximization, market entry/exit, and perfect competition.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit3Content.map((topic) => (
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
																	point.startsWith('  ') ? (
																		<li
																			key={i}
																			style={{
																				listStyle: 'none',
																				marginLeft: '1.5rem',
																			}}
																		>
																			{point.trim()}
																		</li>
																	) : (
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
							Unit 3 Quiz
						</h2>
						<p className="text-lg text-slate-600">Quiz coming soon!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default APMicroUnit3;
