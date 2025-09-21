import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit2Content = [
	{
		key: '2.1',
		title: '2.1 – Demand',
		bullets: [
			{
				subtopic: 'Demand',
				points: [
					'The quantity of a good or service that consumers are willing and able to purchase at various price levels.',
				],
			},
			{
				subtopic: 'Law of Demand',
				points: [
					'There is an inverse relationship between price and quantity demanded.',
					'As price increases, demand decreases.',
					'As price decreases, demand increases.',
				],
			},
			{
				subtopic: 'Why demand slopes downward',
				points: [
					'Income Effect: As price drops, consumer purchasing power rises.',
					'Substitution Effect: Consumers switch to cheaper alternatives when price increases.',
					'Diminishing Marginal Utility: Each additional unit provides less satisfaction, so consumers won’t pay the same price for each one.',
				],
			},
			{
				subtopic: 'Determinants (Shifters) of Demand',
				points: [
					'Tastes and Preferences',
					'Related Goods:',
					'  Substitutes: Goods that can replace each other (↑ price of coffee → ↑ demand for tea).',
					'  Complements: Goods consumed together (↓ price of hamburgers → ↑ demand for buns).',
					'Income:',
					'  Normal Goods: Demand increases with higher income (e.g., Oreos).',
					'  Inferior Goods: Demand increases when income falls (e.g., off-brand cookies).',
					'Number of Buyers',
					'Expectations: About future prices or availability.',
				],
			},
		],
	},
	{
		key: '2.2',
		title: '2.2 – Supply',
		bullets: [
			{
				subtopic: 'Supply',
				points: [
					'The quantity of a good or service that producers are willing and able to offer at various price levels.',
				],
			},
			{
				subtopic: 'Law of Supply',
				points: [
					'There is a direct relationship between price and quantity supplied.',
					'As price increases, supply increases.',
					'As price decreases, supply decreases.',
				],
			},
			{
				subtopic: 'Why the Law of Supply Exists',
				points: [
					'Rising prices incentivize more production and cover increasing marginal costs.',
				],
			},
			{
				subtopic: 'Shifters of Supply',
				points: [
					'Resource Costs and Availability: ↑ costs → ↓ supply.',
					'Prices of Other Goods: Producers shift toward more profitable goods (e.g., wheat vs. corn).',
					'Technology: Advances reduce costs → ↑ supply.',
					'Taxes and Subsidies:',
					'  Taxes: Increase production costs → ↓ supply.',
					'  Subsidies: Reduce costs → ↑ supply.',
					'Expectations: If future prices are expected to rise, suppliers may withhold supply now.',
					'Number of Sellers: More sellers → ↑ market supply.',
				],
			},
		],
	},
	{
		key: '2.3',
		title: '2.3 – Price Elasticity of Demand (PED)',
		bullets: [
			{
				subtopic: 'PED Formula',
				points: [
					'',
				],
			},
			{
				subtopic: 'Interpretation',
				points: [
					'>1: Elastic demand (quantity is highly responsive to price).',
					'<1: Inelastic demand (quantity is not very responsive).',
					'=1: Unit elastic.',
					'=0: Perfectly inelastic.',
					'=∞: Perfectly elastic.',
				],
			},
			{
				subtopic: 'Characteristics of Elastic Demand',
				points: [
					'Many substitutes.',
					'Luxury items.',
					'Large portion of income.',
					'Not urgently needed.',
					'Flat demand curve.',
				],
			},
			{
				subtopic: 'Characteristics of Inelastic Demand',
				points: [
					'Few substitutes.',
					'Necessities.',
					'Small portion of income.',
					'Urgently needed.',
					'Steep demand curve.',
				],
			},
			{
				subtopic: 'Total Revenue (TR) Relationship',
				points: [
					'Elastic: Price ↑ → TR ↓.',
					'Inelastic: Price ↑ → TR ↑.',
				],
			},
			{
				subtopic: 'Midpoint Formula',
				points: [
					'(Q2−Q1)/(Q2+Q1)÷(P2−P1)/(P2+P1)',
				],
			},
		],
	},
	{
		key: '2.4',
		title: '2.4 – Price Elasticity of Supply (PES)',
		bullets: [
			{
				subtopic: 'PES Formula',
				points: [
					'',
				],
			},
			{
				subtopic: 'Interpretation',
				points: [
					'>1: Elastic supply.',
					'<1: Inelastic supply.',
					'=1: Unit elastic.',
					'=0: Perfectly inelastic.',
					'=∞: Perfectly elastic.',
				],
			},
			{
				subtopic: 'Elastic Supply Characteristics',
				points: [
					'Easy, low-cost production.',
					'Quick adjustment to market changes.',
					'Low barriers to entry.',
					'Long-run response.',
				],
			},
			{
				subtopic: 'Inelastic Supply Characteristics',
				points: [
					'Difficult, expensive production.',
					'High barriers to entry.',
					'Time constraints.',
					'Short-run limitations.',
				],
			},
		],
	},
	{
		key: '2.5',
		title: '2.5 – Other Elasticities',
		bullets: [
			{
				subtopic: 'Cross-Price Elasticity of Demand (XED)',
				points: [
					'',
					'Positive: Substitutes.',
					'Negative: Complements.',
				],
			},
			{
				subtopic: 'Income Elasticity of Demand (YED)',
				points: [
					'',
					'Positive (>1): Normal, income-elastic goods.',
					'Positive (<1): Normal, income-inelastic goods.',
					'Negative: Inferior goods.',
				],
			},
		],
	},
	{
		key: '2.6',
		title: '2.6 – Market Equilibrium, Consumer and Producer Surplus',
		bullets: [
			{
				subtopic: 'Equilibrium',
				points: [
					'Occurs when: Quantity supplied = quantity demanded (Qs = Qd).',
					'Market clears: No shortage or surplus.',
				],
			},
			{
				subtopic: 'Price Changes',
				points: [
					'Price below equilibrium: Shortage (Qs < Qd).',
					'Price above equilibrium: Surplus (Qs > Qd).',
				],
			},
			{
				subtopic: 'Consumer Surplus',
				points: [
					'Difference between what buyers are willing to pay and the actual price.',
				],
			},
			{
				subtopic: 'Producer Surplus',
				points: [
					'Difference between what sellers are paid and the minimum they’re willing to accept.',
				],
			},
			{
				subtopic: 'Shifts',
				points: [
					'Demand ↑: P ↑, Q ↑.',
					'Demand ↓: P ↓, Q ↓.',
					'Supply ↑: P ↓, Q ↑.',
					'Supply ↓: P ↑, Q ↓.',
				],
			},
			{
				subtopic: 'Double Shift Rule',
				points: [
					'When supply and demand both shift, either price or quantity is indeterminate without more information.',
				],
			},
			{
				subtopic: 'Deadweight Loss (DWL)',
				points: [
					'Lost efficiency due to market distortions (e.g., price controls, taxes).',
					'Formula: ½(base × height).',
				],
			},
		],
	},
	{
		key: '2.7',
		title: '2.7 – Market Disequilibrium and Changes in Equilibrium',
		bullets: [
			{
				subtopic: 'Market Disequilibrium',
				points: [
					'Shortage: Price below equilibrium, Qd > Qs.',
					'Surplus: Price above equilibrium, Qs > Qd.',
				],
			},
			{
				subtopic: 'Price Floors',
				points: [
					'Legal minimum price (e.g., minimum wage).',
					'Set above equilibrium → causes surplus.',
				],
			},
			{
				subtopic: 'Price Ceilings',
				points: [
					'Legal maximum price (e.g., rent control).',
					'Set below equilibrium → causes shortage.',
				],
			},
			{
				subtopic: 'Quota',
				points: [
					'Government-imposed quantity limit on how much can be produced or consumed.',
				],
			},
			{
				subtopic: 'License',
				points: [
					'Legal right to produce/sell a limited quantity.',
				],
			},
			{
				subtopic: 'Demand Price vs. Supply Price',
				points: [
					'Demand Price: Price consumers are willing to pay for a quantity.',
					'Supply Price: Price at which suppliers are willing to sell that quantity.',
				],
			},
		],
	},
	{
		key: '2.8',
		title: '2.8 – Government Intervention in Markets',
		bullets: [
			{
				subtopic: 'Types of Intervention',
				points: [
					'Price Controls: Floors and ceilings distort market outcomes.',
					'Taxes and Subsidies: Affect cost structures, incentives.',
					'Quotas and Licenses: Limit market quantities.',
				],
			},
			{
				subtopic: 'Quota Rent',
				points: [
					'The monetary difference between what consumers pay and what suppliers receive in a quota-restricted market.',
				],
			},
			{
				subtopic: 'Market Failures',
				points: [
					'Occur when the market doesn’t produce the efficient quantity of goods/services.',
				],
			},
		],
	},
	{
		key: '2.9',
		title: '2.9 – International Trade and Public Policy',
		bullets: [
			{
				subtopic: 'Quota Rent',
				points: [
					'Extra profit for producers due to artificially limited supply (from import quotas).',
				],
			},
			{
				subtopic: 'Tariffs',
				points: [
					'Taxes on imported/exported goods.',
					'Increase prices for consumers, reduce competition.',
				],
			},
			{
				subtopic: 'Import Quotas',
				points: [
					'Limit on the quantity of a good that can be imported.',
					'Protects domestic industries but reduces efficiency and consumer surplus.',
				],
			},
		],
	},
];

const APMicroUnit2 = () => {
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
						className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'topics' ? 'border-b-4 border-fuchsia-600 text-fuchsia-700' : 'text-slate-500 hover:text-fuchsia-600'}`}
					>
						Key Topics
					</button>
					<button
						// Change: navigate to quiz route instead of just setting tab
						onClick={() => navigate('/ap-microeconomics/unit/2/quiz')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'quiz' ? 'border-b-4 border-fuchsia-600 text-fuchsia-700' : 'text-slate-500 hover:text-fuchsia-600'}`}
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				{activeTab === 'topics' && (
					<>
						<div className="text-center mb-8">
							<h1 className="text-4xl font-bold text-fuchsia-700">
								AP Microeconomics Unit 2: Supply and Demand
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Demand, supply, elasticity, market equilibrium, government intervention, and trade.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit2Content.map((topic) => (
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
																			<li key={i} style={{ listStyle: 'none', marginLeft: '1.5rem' }}>{point.trim()}</li>
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
						<h2 className="text-2xl font-bold text-fuchsia-700 mb-4">Unit 2 Quiz</h2>
						<p className="text-lg text-slate-600">Quiz coming soon!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default APMicroUnit2;
// Cleaned encoding and removed any invisible or non-ASCII characters from this file.
