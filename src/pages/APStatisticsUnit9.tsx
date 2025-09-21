import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit9Content = [
	{
		key: '9.0',
		title: '9.0 – Unit 9 Overview: Slopes',
		bullets: [
			{
				subtopic: 'Slope Inference in Regression',
				points: [
					'Focus on inference related to the slope (β) in linear regression.',
					'Understand the sampling distribution of the sample slope b.',
					'Model slope inference using the t-distribution with degrees of freedom df = n − 2.',
					'Conditions and assumptions for inference on slope critical to validity.',
					'Explore confidence intervals and hypothesis tests on regression slope.',
					'Use technology to compute standard errors, test statistics, and confidence intervals.',
					'Interpretation of slope results in context is key to meaningful conclusions.',
				],
			},
		],
	},
	{
		key: '9.1',
		title: '9.1 – Introducing Statistics: Do Those Points Align?',
		bullets: [
			{
				subtopic: 'Population Regression Model',
				points: [
					'μy = α + βx, where β is the true slope, α the intercept.',
					'The sampling distribution of the sample slope b is approximately normal when:',
					'  • True relationship is linear.',
					'  • Standard deviation of y, σy, is constant for all x.',
					'  • Residuals y at each x are approximately normally distributed.',
					'Since σb (true standard deviation of b) is unknown, estimate it with the standard error sb.',
					'The test statistic: t = (b − β) / sb follows a t-distribution with df = n − 2.',
					'The standard error sb is often provided in statistical software output.',
				],
			},
		],
	},
	{
		key: '9.2',
		title: '9.2 – Confidence Intervals for the Slope of a Regression Model',
		bullets: [
			{
				subtopic: 'Confidence Interval for Slope',
				points: [
					'Confidence interval for true slope β based on: b ± t* × sb',
					't* is the critical t-value at the desired confidence level with df = n − 2.',
					'Conditions for valid confidence intervals:',
					'  • Random sampling.',
					'  • Approximately linear scatterplot pattern.',
					'  • No clear pattern in residuals plot.',
					'  • Residuals approximately normally distributed.',
					'  • Sample size less than 10% of population.',
					'Use statistical software or calculator functions (e.g., LinRegTInt on TI-84) for computation.',
					'Example 9.1: SAT verbal vs. math scores:',
					'  • Regression equation from output (intercept and slope).',
					'  • 95% CI for slope: (0.64, 0.89).',
					'  • Because 0 is not in the interval, strong evidence for a linear relationship.',
					'  • Interpretation: Each 1-point increase in verbal SAT corresponds to an increase of 0.64 to 0.89 in math SAT on average.',
				],
			},
		],
	},
	{
		key: '9.3',
		title: '9.3 – Justifying a Claim About the Slope of a Regression Model Based on a Confidence Interval',
		bullets: [
			{
				subtopic: 'Interpreting the Confidence Interval',
				points: [
					'If a confidence interval for β excludes 0, it indicates evidence of a linear relationship.',
					'Inclusion of 0 means no convincing evidence for linear association.',
					'The confidence interval provides a range of plausible values for the true slope.',
				],
			},
		],
	},
	{
		key: '9.4',
		title: '9.4 – Setting Up a Test for the Slope of a Regression Model',
		bullets: [
			{
				subtopic: 'Hypothesis Test Framework',
				points: [
					'Null hypothesis H₀: β = 0 (no linear relationship).',
					'Alternative hypothesis Hₐ: β ≠ 0, or one-sided alternative as appropriate.',
					'Conditions for inference:',
					'  • Random sample.',
					'  • Linear relationship visible in scatterplot.',
					'  • Residual plot shows no pattern.',
					'  • Residuals approximately normal.',
					'  • Sample size less than 10% of population.',
					'Small P-value means observed data unlikely if no relationship exists, so reject H₀.',
				],
			},
		],
	},
	{
		key: '9.5',
		title: '9.5 – Carrying Out a Test for the Slope of a Regression Model',
		bullets: [
			{
				subtopic: 'Test Statistic and Interpretation',
				points: [
					'Compute test statistic: t = (b − 0) / sb',
					'Find degrees of freedom: df = n − 2.',
					'Calculate P-value using t-distribution.',
					'Compare P-value to significance level (e.g., 0.05) to decide whether to reject H₀.',
					'Interpret results in context, noting that statistical significance does not guarantee strong association.',
					'Example 9.3: Tennis players’ serving speeds before and after new racket:',
					'  • Hypotheses: H₀: β = 0, Hₐ: β > 0.',
					'  • All conditions met (random sample, linearity, residuals normal, etc.).',
					'  • Calculator output: very small P-value (0.00019).',
					'  • Conclusion: Very strong evidence of a positive linear relationship.',
					'  • Interpretation: Regression line slope ≈ 1, intercept ≈ 8.76.',
					'  • New racket increases serve speed by 8.76 mph on average, regardless of old speed.',
					'  • Increase is additive (same mph increase across players).',
				],
			},
		],
	},
	{
		key: '9.6',
		title: '9.6 – Skills Focus: Selecting an Appropriate Inference Procedure',
		bullets: [
			{
				subtopic: 'Best Practices for Slope Inference',
				points: [
					'Identify if inference is for slope in linear regression.',
					'Verify conditions for validity of inference.',
					'Use correct degrees of freedom (n − 2) for t-distribution.',
					'Choose between confidence interval or hypothesis test based on research question.',
					'Use technology for precise calculations (standard error, t-values, P-values).',
					'Interpret confidence intervals and hypothesis test results clearly and contextually.',
					'Distinguish between statistical significance and strength of relationship.',
				],
			},
		],
	},
];

function getBulletItems(points: (string | JSX.Element)[]) {
	const items: JSX.Element[] = [];
	let subItems: JSX.Element[] = [];
	points.forEach((point, i) => {
		if (typeof point === 'string' && /^\s*•/.test(point)) {
			subItems.push(
				<li key={`sub-${i}`}>{point.replace(/^\s*•\s*/, '')}</li>
			);
		} else {
			if (subItems.length > 0 && items.length > 0) {
				const last = items.pop();
				items.push(
					<li key={`main-${i-1}`}>
						{last && (last as any).props ? (last as any).props.children : last}
						<ul className="list-disc ml-8">{subItems}</ul>
					</li>
				);
				subItems = [];
			}
			items.push(
				<li key={i}>{typeof point === 'string' ? point.replace(/^\s*•\s*/, '') : point}</li>
			);
		}
	});
	if (subItems.length > 0 && items.length > 0) {
		const last = items.pop();
		items.push(
			<li key={`main-last`}>
				{last && (last as any).props ? (last as any).props.children : last}
				<ul className="list-disc ml-8">{subItems}</ul>
			</li>
		);
	}
	return items;
}

const APStatisticsUnit9 = () => {
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
						onClick={() => navigate('/ap-statistics/unit/9/quiz')}
						className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-purple-600 transition-colors"
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				{activeTab === 'topics' && (
					<>
						<div className="text-center mb-8">
							<h1 className="text-4xl font-bold text-purple-700">
								AP Statistics Unit 9: Inference for Quantitative Data – Slopes
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Inference for regression slope: confidence intervals, hypothesis tests, and interpretation in context.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit9Content.map((topic) => (
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
																{getBulletItems(section.points)}
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

export default APStatisticsUnit9;
