import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit4Content = [
	{
		key: '4.1',
		title: '4.1 – Introduction to Imperfectly Competitive Markets',
		bullets: [
			{
				subtopic: 'Imperfect Competition',
				points: [
					'Includes all market structures that are not perfect competition.',
					'Firms can be price makers (have some control over prices).',
				],
			},
			{
				subtopic: 'Barriers to Entry',
				points: [
					'Legal restrictions (patents, licenses)',
					'High startup costs',
					'Control over scarce resources',
					'Economies of scale',
					'Geography',
				],
			},
			{
				subtopic: 'Market Structure Comparison',
				points: [
					'Structure | # of Firms | Product Type | Price Control | Barriers to Entry',
					'Perfect Competition | Many | Standardized | None | None',
					'Monopolistic Competition | Many | Differentiated | Some | Few',
					'Monopoly | One | Unique | Total | High',
					'Oligopoly | Few | Standard or Differentiated | Some | High',
				],
			},
		],
	},
	{
		key: '4.2',
		title: '4.2 – Monopolies',
		bullets: [
			{
				subtopic: 'Monopoly',
				points: [
					'Single seller, no close substitutes.',
					'Price makers: firm sets price based on demand.',
					'Demand curve is downward sloping, unlike perfect competition.',
					'Profit-maximizing output: where MR = MC.',
					'Price: found by going up to the demand curve at the MR = MC quantity.',
					'No supply curve because price ≠ MC.',
					'Allocatively inefficient: because P > MC.',
					'Productively inefficient: does not produce at minimum ATC.',
				],
			},
			{
				subtopic: 'Natural Monopoly',
				points: [
					'Occurs when high fixed costs and economies of scale make it most efficient for one firm to exist.',
					'ATC declines over entire output range.',
					'Government regulation can force pricing at ATC = D to avoid monopoly pricing.',
				],
			},
		],
	},
	{
		key: '4.3',
		title: '4.3 – Price Discrimination',
		bullets: [
			{
				subtopic: 'Price Discrimination',
				points: [
					'Charging different prices for the same product to different consumers.',
				],
			},
			{
				subtopic: 'Conditions Needed',
				points: [
					'Market power (not a price taker)',
					'Ability to segment the market',
					'No resale between consumers',
				],
			},
			{
				subtopic: 'Types',
				points: [
					'Imperfect: different prices based on willingness to pay (e.g., coupons, student discounts).',
					'Perfect: each customer pays exactly what they’re willing to—no consumer surplus, no deadweight loss.',
				],
			},
			{
				subtopic: 'Effect',
				points: ['All surplus becomes producer surplus.'],
			},
		],
	},
	{
		key: '4.4',
		title: '4.4 – Monopolistic Competition',
		bullets: [
			{
				subtopic: 'Characteristics',
				points: [
					'Many sellers, differentiated products.',
					'Acts like monopoly in short run, perfect competition in long run.',
					'Uses advertising to differentiate products and reduce elasticity.',
					'Profit in short run, normal profit in long run.',
				],
			},
			{
				subtopic: 'Efficiency',
				points: [
					'Allocatively inefficient: P ≠ MC.',
					'Productively inefficient: not at minimum ATC.',
					'Downward-sloping demand curve.',
					'Produces where MR = MC, sets price up to demand.',
				],
			},
			{
				subtopic: 'Long Run Adjustment',
				points: [
					'Profits attract new firms → demand curve shifts left.',
					'Firms enter until demand = ATC → normal profit (zero economic profit).',
					'Long-run equilibrium is tangent between demand and ATC.',
				],
			},
		],
	},
	{
		key: '4.5',
		title: '4.5 – Oligopoly and Game Theory',
		bullets: [
			{
				subtopic: 'Oligopoly',
				points: [
					'Few large firms dominate the market.',
					'Products may be standardized or differentiated.',
					'Interdependence: firms\' actions affect one another.',
					'Collusion: agreement among firms to restrict output or fix prices.',
					'Cartel: formal organization of colluding firms (e.g., OPEC).',
					'Behaves similarly to a monopoly in terms of output and price (but graph not usually required).',
				],
			},
			{
				subtopic: 'Game Theory',
				points: [
					'Payoff matrix: shows outcomes of decisions between firms.',
					'Dominant strategy: best decision for a firm no matter what the other does.',
					'Nash Equilibrium: outcome where no player can improve their outcome by changing their strategy unilaterally.',
				],
			},
		],
	},
];

const APMicroUnit4 = () => {
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
						onClick={() => navigate('/ap-microeconomics/unit/4/quiz')}
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
								AP Microeconomics Unit 4: Imperfect Competition
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Market structures, monopolies, price discrimination, monopolistic competition, oligopoly, and game theory.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit4Content.map((topic) => (
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
						<h2 className="text-2xl font-bold text-fuchsia-700 mb-4">Unit 4 Quiz</h2>
						<p className="text-lg text-slate-600">Quiz coming soon!</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default APMicroUnit4;
