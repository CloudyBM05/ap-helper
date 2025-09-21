import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit5Content = [
	{
		key: '5.1',
		title: '5.1 – Introduction to Factor Markets',
		bullets: [
			{
				subtopic: 'Factor Markets',
				points: [
					'Where firms buy resources (factors of production like labor, land, capital) to produce goods/services.',
					'The demand for factors is derived from the demand for the products those resources help produce.',
					'Example: If demand for pizza increases, the demand for pizza makers also increases.',
				],
			},
			{
				subtopic: 'Key Terms',
				points: [
					'Marginal Revenue Product (MRP):',
					'  The additional revenue a firm earns by hiring one more unit of a resource (e.g., one more worker).',
					'  Formula: MRP = MP × P (marginal product × price of output)',
					'Marginal Factor Cost (MFC):',
					'  The additional cost of hiring one more unit of a resource.',
					'  In perfect competition: MFC = wage',
				],
			},
			{
				subtopic: 'Least-Cost Rule (Cost-Minimizing Rule)',
				points: [
					'Firms choose the cheapest way to produce output using a combination of inputs:',
					'  MPL/PL = MPK/PK',
					'  (Marginal Product of Labor / Price of Labor = Marginal Product of Capital / Price of Capital)',
					'Buy more of the input with the higher MP per dollar, less of the one with lower return until the ratios are equal.',
				],
			},
		],
	},
	{
		key: '5.2',
		title: '5.2 – Changes in Factor Demand and Factor Supply',
		bullets: [
			{
				subtopic: 'Determinants of Labor Demand (DL) – R.O.D.',
				points: [
					'Resource Productivity – more productive = more demand.',
					'Other Resource Prices – substitutes or complements.',
					'Demand for Final Product – higher product demand = higher demand for workers.',
				],
			},
			{
				subtopic: 'Determinants of Labor Supply (SL) – P.I.N.',
				points: [
					'Personal Values – worker preferences, cultural factors.',
					'Intervention by Government – e.g., immigration policy, licensing laws.',
					'Number of Qualified Workers – more workers = more supply.',
				],
			},
			{
				subtopic: 'Labor Market Shifts',
				points: [
					'These factors shift the labor supply and demand curves, changing equilibrium wage and employment.',
				],
			},
		],
	},
	{
		key: '5.3',
		title: '5.3 – Profit-Maximizing Behavior in Perfectly Competitive Factor Markets',
		bullets: [
			{
				subtopic: 'Competitive Labor Markets',
				points: [
					'Many firms hire workers.',
					'Many workers supply labor.',
					'No single firm or worker can affect the wage → they are wage takers.',
				],
			},
			{
				subtopic: 'Hiring Rule',
				points: [
					'Hire workers until MRP = MFC.',
					'This is the profit-maximizing quantity of labor.',
					'If MRP > MFC, hire more.',
					'If MRP < MFC, hire fewer.',
				],
			},
			{
				subtopic: 'Graph',
				points: [
					'Market: standard S & D curve for labor determines equilibrium wage.',
					'Firm: MFC = wage (horizontal), demand is MRP curve.',
				],
			},
		],
	},
	{
		key: '5.4',
		title: '5.4 – Monopsonistic Labor Markets',
		bullets: [
			{
				subtopic: 'Monopsony',
				points: [
					'Only one buyer (employer) of labor, but many sellers (workers).',
					'Imperfect competition in labor market.',
					'Example: company town with only one major employer.',
				],
			},
			{
				subtopic: 'Characteristics',
				points: [
					'MFC > wage (firm must raise wage for all workers to hire one more).',
					'Firms hire less and pay lower wages than in perfectly competitive markets.',
					'Still hire where MRP = MFC, but wage is below that point on supply curve.',
				],
			},
		],
	},
];

const APMicroUnit5 = () => {
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
						onClick={() => {
							setActiveTab('quiz');
							navigate('/ap-microeconomics/unit/5/quiz');
						}}
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
								AP Microeconomics Unit 5: Factor Markets
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Factor markets, marginal revenue product, least-cost rule, labor market shifts, profit-maximizing behavior, and monopsony.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit5Content.map((topic) => (
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
					<></>
				)}
			</div>
		</div>
	);
};

export default APMicroUnit5;
