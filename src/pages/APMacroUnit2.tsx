import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit2Content = [
	{
		key: '2.1',
		title: '2.1 – Circular Flow and GDP',
		bullets: [
			{
				subtopic: 'Circular Flow Model',
				points: [
					'Describes the continuous movement of money, resources, goods, and services between:',
					'  Households (consumers and resource owners)',
					'  Firms (producers)',
					'  Product Market (where goods/services are sold)',
					'  Factor Market (where resources are bought/sold)',
					'  Government (taxes, spending, regulation)',
					'  Foreign sector (exports & imports in an open economy)',
					'In a closed economy, there is no international trade (X and M are excluded).',
				],
			},
			{
				subtopic: 'GDP (Gross Domestic Product)',
				points: [
					'Definition: The market value of all final goods and services produced within a country in a specific time period.',
					'Formula: GDP = C + I + G + (X - M)',
					'  C = Consumer spending',
					'  I = Investment (business capital, new construction, inventory changes)',
					'  G = Government spending (not transfer payments)',
					'  X - M = Net exports (exports – imports)',
				],
			},
			{
				subtopic: 'Other GDP Approaches',
				points: [
					'Aggregate Income = Wages + Rent + Interest + Profit',
					'Value-Added Approach: GDP equals the sum of value added at each stage of production.',
				],
			},
			{
				subtopic: 'Not Included in GDP',
				points: [
					'Illegal transactions',
					'Unpaid work (e.g., volunteer work, household work)',
					'Transfer payments (e.g., welfare, Social Security)',
					'Intermediate goods (to avoid double counting)',
					'Depreciation (not part of final output)',
				],
			},
		],
	},
	{
		key: '2.2',
		title: '2.2 – Limitations of GDP',
		bullets: [
			{
				subtopic: 'GDP Uses',
				points: [
					'Measures economic growth over time.',
					'Compares standard of living using GDP per capita.',
					'Helps track business cycles.',
					'Assists governments in policy formulation.',
					'Signals a nation’s strength to attract foreign investment.',
				],
			},
			{
				subtopic: 'GDP Limitations – "PIES"',
				points: [
					'Population – GDP doesn’t adjust for population size (use GDP per capita instead).',
					'Inequality – GDP doesn’t show income distribution.',
					'Environment – Ignores pollution, resource depletion, etc.',
					'Shadow Economy – Excludes black market or unreported economic activity.',
				],
			},
		],
	},
	{
		key: '2.3',
		title: '2.3 – Unemployment',
		bullets: [
			{
				subtopic: 'Key Definitions',
				points: [
					'Employed: Worked for pay for at least 1 hour/week.',
					'Unemployed: Not working but actively seeking work.',
					'Labor Force (LF) = Employed (E) + Unemployed (U)',
					'Labor Force Participation Rate (LFPR) = (LF / Adult population) × 100',
					'Unemployment Rate (UR) = (U / LF) × 100',
					'Out of Labor Force: Not seeking work (e.g., retirees, students)',
					'Discouraged Workers: Gave up looking → not counted as unemployed.',
				],
			},
			{
				subtopic: 'Types of Unemployment',
				points: [
					'Frictional – Between jobs or new entrants. Temporary.',
					'Seasonal – Based on predictable seasons (e.g., agriculture, tourism).',
					'Structural – Job mismatch due to technological changes or shifts in demand.',
					'Cyclical – Due to economic downturns. Focus of macroeconomic policy.',
				],
			},
			{
				subtopic: 'Full Employment',
				points: [
					'Occurs when cyclical unemployment = 0.',
					'Natural rate of unemployment = 4–6% in the U.S. (includes structural + frictional)',
				],
			},
		],
	},
	{
		key: '2.4',
		title: '2.4 – Price Indices and Inflation',
		bullets: [
			{
				subtopic: 'CPI (Consumer Price Index)',
				points: [
					'Measures average prices of a fixed basket of goods.',
					'Used to track consumer inflation.',
					'Formula: Inflation Rate = 100 × (CPI new - CPI old) / CPI old',
				],
			},
			{
				subtopic: 'Types of Price Changes',
				points: [
					'Inflation: General increase in price levels.',
					'Deflation: General decrease in price levels.',
					'Disinflation: Slower rate of inflation.',
				],
			},
			{
				subtopic: 'GDP Deflator vs. CPI',
				points: [
					'CPI: Only includes consumer goods, even if imported.',
					'GDP Deflator: Measures prices of all goods in GDP, excludes imports.',
				],
			},
			{
				subtopic: 'Nominal vs. Real Income',
				points: [
					'Nominal income: Income in current dollars (not adjusted).',
					'Real income: Nominal income adjusted for inflation.',
					'Formula: Real Income = Nominal Income / (CPI/100)',
				],
			},
			{
				subtopic: 'Problems with CPI',
				points: [
					'Substitution bias – Consumers may switch to cheaper alternatives.',
					'New goods bias – Doesn\'t quickly reflect new tech/products.',
					'Quality changes – May overstate inflation if improvements raise prices.',
				],
			},
		],
	},
	{
		key: '2.5',
		title: '2.5 – Costs of Inflation',
		bullets: [
			{
				subtopic: 'Expected Inflation',
				points: [
					'Nominal Interest Rate = Real Rate + Expected Inflation',
					'Borrowers & lenders can plan accordingly.',
				],
			},
			{
				subtopic: 'Unexpected Inflation',
				points: [
					'Hurts:',
					'  Lenders',
					'  Savers',
					'  Fixed-income earners (e.g., retirees)',
					'Helps:',
					'  Borrowers',
					'  Firms (if wages lag)',
					'  Real asset owners (e.g., real estate)',
				],
			},
			{
				subtopic: 'Other Costs',
				points: [
					'Menu costs – Firms must change listed prices frequently.',
					'Shoe-leather costs – People spend more time managing money.',
					'Loss of purchasing power – Dollar buys less.',
					'Wealth redistribution – Alters wealth/power between economic agents.',
				],
			},
		],
	},
	{
		key: '2.6',
		title: '2.6 – Real vs. Nominal GDP',
		bullets: [
			{
				subtopic: 'Nominal GDP',
				points: [
					'Current production * current prices.',
					'Reflects inflation and real growth together.',
				],
			},
			{
				subtopic: 'Real GDP',
				points: [
					'Current production * base year prices.',
					'Adjusted for inflation.',
				],
			},
			{
				subtopic: 'Formulas',
				points: [
					'Real GDP = (Nominal GDP / Price Index) × 100',
					'%Δ Real GDP = %Δ Nominal GDP - %Δ Price Index',
				],
			},
			{
				subtopic: 'Base Year & Price Index',
				points: [
					'Base Year: Year used for constant prices.',
					'Price Index: Relative measure of average prices (e.g., 125 means prices are 25% higher than base year).',
				],
			},
			{
				subtopic: 'GDP Deflator',
				points: [
					'A broader measure of price level than CPI.',
					'Includes all goods in GDP; excludes imports.',
				],
			},
		],
	},
	{
		key: '2.7',
		title: '2.7 – Business Cycles',
		bullets: [
			{
				subtopic: 'Phases of the Business Cycle',
				points: [
					'Expansion – Real GDP rises, unemployment falls.',
					'Peak – Economy hits max output; often leads to inflationary pressure.',
					'Contraction – Real GDP falls; rising unemployment.',
					'Trough – Economy bottoms out; sets the stage for recovery.',
				],
			},
			{
				subtopic: 'Other Terms',
				points: [
					'Recession – 2 consecutive quarters of declining real GDP.',
					'Depression – Extended and deep recession.',
					'Recovery – Early stage of expansion.',
				],
			},
		],
	},
];

const APMacroUnit2 = () => {
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
						onClick={() => navigate('/ap-macroeconomics/unit/2/quiz')}
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
								AP Macroeconomics Unit 2: Measuring Economic Performance
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Circular flow, GDP, unemployment, inflation, real vs. nominal, and
								business cycles.
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
							navigate('/ap-macroeconomics/unit/2/quiz');
							return null;
						})()}
					</div>
				)}
			</div>
		</div>
	);
};

export default APMacroUnit2;
