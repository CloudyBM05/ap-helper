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
					'Economics is the study of how individuals, organizations, and societies allocate scarce resources to meet unlimited wants.',
					'Scarcity is the fundamental economic problem: limited resources vs. unlimited wants.',
					'Applies to all resources, even air and water.',
					'Forces consumers, businesses, and governments to make choices.',
				],
			},
			{
				subtopic: 'Microeconomics vs. Macroeconomics',
				points: [
					'Microeconomics: Focuses on individual units (households, firms) and their decision-making.',
					'Macroeconomics: Studies the economy as a whole (national production, inflation, unemployment).',
				],
			},
			{
				subtopic: 'Factors of Production',
				points: [
					'Land: Natural resources (e.g., water, oil, minerals).',
					'Labor: Human effort—physical and mental work.',
					'Capital: Man-made tools/equipment and money used in production.',
					'  Physical capital: Machinery, buildings.',
					'  Human capital: Skills, education, training.',
					'Entrepreneurship: Innovation and risk-taking to combine resources for production.',
				],
			},
			{
				subtopic: 'Trade-offs & Opportunity Cost',
				points: [
					'Trade-offs: Giving up one thing to gain another.',
					'Opportunity Cost: The value of the next best alternative foregone.',
				],
			},
			{
				subtopic: 'Positive vs. Normative Economics',
				points: [
					'Positive: Objective, fact-based (e.g., “Increasing income leads to higher spending”).',
					'Normative: Subjective, opinion-based (e.g., “The government should raise taxes on the rich”).',
				],
			},
		],
	},
	{
		key: '1.2',
		title: '1.2 – Resource Allocation and Economic Systems',
		bullets: [
			{
				subtopic: 'Three Fundamental Economic Questions',
				points: [
					'What goods and services will be produced?',
					'How will they be produced?',
					'For whom will they be produced?',
				],
			},
			{
				subtopic: 'Types of Economic Systems',
				points: [
					'Centrally-Planned Economy:',
					'  Government answers the three economic questions.',
					'  Sets prices and wages; little consumer sovereignty or innovation.',
					'Market Economy:',
					'  Decisions guided by market prices and consumer choices.',
					'  Encourages innovation and variety but leads to income inequality.',
					'Mixed Economy:',
					'  Combines aspects of both systems.',
					'  Private property is protected, but the government intervenes to meet societal goals.',
				],
			},
		],
	},
	{
		key: '1.3',
		title: '1.3 – Production Possibilities Curve (PPC)',
		bullets: [
			{
				subtopic: 'PPC & Opportunity Cost',
				points: [
					'PPC: A graph showing the maximum combination of two goods that can be produced using available resources and technology.',
					'Trade-offs and Opportunity Cost: Moving along the curve shows the cost of shifting resources from one good to another.',
				],
			},
			{
				subtopic: 'Shape of the PPC',
				points: [
					'Linear PPC: Constant opportunity cost.',
					'Curved PPC: Increasing opportunity cost (resources are not perfectly interchangeable).',
				],
			},
			{
				subtopic: 'Efficiency',
				points: [
					'Productive Efficiency: Producing on the curve (no wasted resources).',
					'Allocative Efficiency: Producing the combination of goods most desired by society.',
				],
			},
			{
				subtopic: 'Economic Growth & PPC Shifts',
				points: [
					'Shown by an outward shift in the PPC.',
					'Caused by technological advances, increase in quantity/quality of resources.',
					'Determinants: Resource availability (population, land use), technology and productivity changes, trade and specialization.',
				],
			},
		],
	},
	{
		key: '1.4',
		title: '1.4 – Comparative Advantage and Trade',
		bullets: [
			{
				subtopic: 'Absolute vs. Comparative Advantage',
				points: [
					'Absolute Advantage: Ability to produce more of a good with the same resources than someone else.',
					'Comparative Advantage: Ability to produce a good at a lower opportunity cost.',
				],
			},
			{
				subtopic: 'Specialization and Trade',
				points: [
					'Nations/firms should specialize in producing goods where they have a comparative advantage.',
					'Leads to increased total output and mutual gains from trade.',
				],
			},
			{
				subtopic: 'Terms of Trade',
				points: [
					'The agreed-upon rate of exchange between goods.',
					'Trade is beneficial if the terms fall between each country’s opportunity cost.',
				],
			},
			{
				subtopic: 'Goods Types',
				points: [
					'Capital Goods: Used to make other goods (e.g., machines).',
					'Consumer Goods: Directly used by consumers (e.g., food, clothing).',
				],
			},
		],
	},
	{
		key: '1.5',
		title: '1.5 – Cost-Benefit Analysis',
		bullets: [
			{
				subtopic: 'Explicit vs. Implicit Costs',
				points: [
					'Explicit Costs: Out-of-pocket expenses (e.g., tuition fees, rent).',
					'Implicit Costs: Opportunity costs of using owned resources (e.g., time, lost income).',
				],
			},
			{
				subtopic: 'Cost-Benefit Analysis',
				points: [
					'Decision-making process that compares the costs and benefits of a choice.',
					'Used to evaluate whether the benefits of an action outweigh the costs.',
				],
			},
		],
	},
	{
		key: '1.6',
		title: '1.6 – Marginal Analysis and Consumer Choice',
		bullets: [
			{
				subtopic: 'Utility & Marginal Utility',
				points: [
					'Utility: A measure of satisfaction or pleasure from consuming a good or service.',
					'Measured in utils.',
					'Marginal Utility (MU): Additional satisfaction from consuming one more unit.',
				],
			},
			{
				subtopic: 'Law of Diminishing Marginal Utility',
				points: [
					'As consumption increases, the additional utility from each extra unit decreases.',
				],
			},
			{
				subtopic: 'Marginal Utility per Dollar & Optimal Consumption',
				points: [
					'Formula: MU / P (marginal utility divided by price).',
					'Helps compare value gained per dollar across different goods.',
					'Optimal Consumption Rule: Consumers maximize utility when MUx/Px = MUy/Py across all goods.',
					'Ensures money is spent where it provides the most satisfaction.',
				],
			},
		],
	},
];

const APMicroUnit1 = () => {
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
						onClick={() => navigate('/ap-microeconomics/unit/1/quiz')}
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
								AP Microeconomics Unit 1: Basic Economic Concepts
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Scarcity, opportunity cost, PPC, economic systems, comparative
								advantage, and marginal analysis.
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
						{/* Redirect to quiz page */}
						{(() => {
							navigate('/ap-microeconomics/unit/1/quiz');
							return null;
						})()}
					</div>
				)}
			</div>
		</div>
	);
};

export default APMicroUnit1;
