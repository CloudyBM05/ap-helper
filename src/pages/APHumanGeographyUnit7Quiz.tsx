import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
	{
		question: 'Which indicator is directly used in computing the Human Development Index (HDI)?',
		options: [
			'A. Percentage of population employed in agriculture',
			'B. Internet penetration rate',
			'C. Life expectancy at birth',
			'D. GDP growth rate',
			'E. Trade balance',
		],
		answer: 2,
		explanation:
			'Life expectancy at birth is one of the three main indicators used in the HDI, along with mean years of schooling and GNI per capita. It directly measures the health component of human development.',
	},
	{
		question: 'An industry operating near its market because the final product weighs more than raw materials is known as a:',
		options: [
			'A. Bulk-gaining industry',
			'B. Bulk-reducing industry',
			'C. Footloose industry',
			'D. Labor-intensive industry',
			'E. Break-bulk industry',
		],
		answer: 0,
		explanation:
			'Bulk-gaining industries locate near their markets because the finished product is heavier or bulkier than the inputs, making transportation costs higher after production.',
	},
	{
		question: 'The theory that development occurs in stages—from traditional to mass-consumption—is known as:',
		options: [
			'A. Dependency theory',
			'B. World‑systems theory',
			'C. Rostow’s Stages of Economic Growth',
			'D. Spatial inequality model',
			'E. Uneven and combined development',
		],
		answer: 2,
		explanation:
			'Rostow’s model describes development as a linear process through five stages, from traditional society to high mass consumption.',
	},
	{
		question: 'According to Wallerstein’s World Systems Theory, countries like India and Brazil fit into which category?',
		options: [
			'A. Core',
			'B. Periphery',
			'C. Semi-periphery',
			'D. Fast world',
			'E. Commodity-dependent economies',
		],
		answer: 2,
		explanation:
			'Semi-periphery countries like India and Brazil have characteristics of both core and periphery, acting as a buffer and often experiencing rapid development.',
	},
	{
		question: 'Which concept explains how core countries benefit at the expense of peripheral economies through unequal exchange?',
		options: [
			'A. Complementarity',
			'B. Comparative advantage',
			'C. Dependency theory',
			'D. Rostow’s progression model',
			'E. Accelerated globalization',
		],
		answer: 2,
		explanation:
			'Dependency theory argues that core countries exploit peripheral ones through unequal economic relationships, maintaining global inequality.',
	},
	{
		question: 'Clustering of firms in similar industries in a specific location—e.g., Silicon Valley—is referred to as:',
		options: [
			'A. Break-bulk clustering',
			'B. Economies of agglomeration',
			'C. Deindustrialization',
			'D. Outsourcing',
			'E. Deglomeration',
		],
		answer: 1,
		explanation:
			'Economies of agglomeration occur when firms benefit from being close to each other, sharing resources, labor, and knowledge.',
	},
	{
		question: 'An export-processing zone is most likely established to:',
		options: [
			'A. Promote subsistence agriculture',
			'B. Attract foreign investment with few regulations',
			'C. Support cottage industries',
			'D. Increase domestic agricultural output',
			'E. Control commodity dependence',
		],
		answer: 1,
		explanation:
			'Export-processing zones (EPZs) are designed to attract foreign companies by offering relaxed regulations and tax incentives, boosting exports and investment.',
	},
	{
		question: 'A country with a high HDI and low Gender Inequality Index (GII) score suggests:',
		options: [
			'A. Poor education but strong economy',
			'B. Low life expectancy but gender equality',
			'C. High human development and relatively equitable gender opportunities',
			'D. High commodity exports but low service sector',
			'E. Strong primary sector but weak tertiary sector',
		],
		answer: 2,
		explanation:
			'A high HDI and low GII indicate both high overall development and relatively equal opportunities for men and women.',
	},
	{
		question: 'The shift of global manufacturing from Europe to East Asia illustrates:',
		options: [
			'A. Fordism',
			'B. New international division of labor (NIDL)',
			'C. Footloose industry expansion',
			'D. Dependency resurgence',
			'E. Backwash effects only',
		],
		answer: 1,
		explanation:
			'The new international division of labor describes the global shift of manufacturing to regions with lower labor costs, such as East Asia.',
	},
	{
		question: 'What is a common environmental strategy aimed at mitigating industrialization’s negative impact while promoting economic growth?',
		options: [
			'A. Industrial agglomeration',
			'B. Free trade agreements',
			'C. Sustainable development policies (e.g., ecotourism)',
			'D. Subsidies for cottage industries',
			'E. Creating commodity-dependent export economies',
		],
		answer: 2,
		explanation:
			'Sustainable development policies seek to balance economic growth with environmental protection, such as through ecotourism or green technology.',
	},
];

const APHumanGeographyUnit7Quiz = () => {
	const [current, setCurrent] = useState(0);
	const [selected, setSelected] = useState<number | null>(null);
	const [answers, setAnswers] = useState<(number | null)[]>(
		Array(questions.length).fill(null)
	);
	const [submitted, setSubmitted] = useState(false);
	const [crossedOut, setCrossedOut] = useState<number[][]>(
		Array(questions.length).fill(null).map(() => [])
	);
	const navigate = useNavigate();

	const handleSelect = (idx: number) => {
		setSelected(idx);
	};

	const handleNext = () => {
		const newAnswers = [...answers];
		newAnswers[current] = selected;
		setAnswers(newAnswers);
		setSelected(answers[current + 1] ?? null);
		setCurrent((prev) => prev + 1);
	};

	const handleBack = () => {
		if (current > 0) {
			setCurrent((prev) => prev - 1);
			setSelected(answers[current - 1] ?? null);
		}
	};

	const handleSubmit = () => {
		const newAnswers = [...answers];
		newAnswers[current] = selected;
		setAnswers(newAnswers);
		setSubmitted(true);
	};

	const handleRetake = () => {
		setAnswers(Array(questions.length).fill(null));
		setSelected(null);
		setCurrent(0);
		setSubmitted(false);
		setCrossedOut(Array(questions.length).fill(null).map(() => []));
	};

	const handleCrossOut = (idx: number) => {
		setCrossedOut((prev) => {
			const copy = prev.map((arr) => [...arr]);
			const arr = copy[current];
			if (arr.includes(idx)) {
				copy[current] = arr.filter((i) => i !== idx);
			} else {
				copy[current] = [...arr, idx];
			}
			return copy;
		});
	};

	const BackToGuideButton = (
		<button
			className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-emerald-700 shadow transition flex items-center gap-2 z-20"
			onClick={() => navigate('/ap-human-geography/unit/7')}
		>
			<span className="text-xl">←</span> Back to Study Guide
		</button>
	);

	if (submitted) {
		return (
			<div className="max-w-3xl mx-auto py-12 px-4 relative">
				{BackToGuideButton}
				<div style={{ height: 48 }} />
				<h1 className="text-3xl font-bold mb-8 text-center text-emerald-700">
					Quiz Results
				</h1>
				{questions.map((q, idx) => {
					const userAnswer = answers[idx];
					const isCorrect = userAnswer === q.answer;
					return (
						<div
							key={idx}
							className="mb-8 p-6 rounded-xl border bg-white shadow"
						>
							<div className="mb-2 text-slate-500">Question {idx + 1}</div>
							<div className="mb-2 font-semibold">{q.question}</div>
							<ul className="mb-2">
								{q.options.map((opt: string, i: number) => (
									<li
										key={i}
										className={`px-3 py-1 rounded ${
											i === q.answer ? 'bg-green-100 font-bold' : ''
										} ${
											userAnswer === i && userAnswer !== q.answer
												? 'bg-red-100'
												: ''
										}`}
									>
										{opt}
										{i === q.answer && (
											<span className="ml-2 text-green-700 font-semibold">
												(Correct)
											</span>
										)}
										{userAnswer === i && userAnswer !== q.answer && (
											<span className="ml-2 text-red-700">
												(Your answer)
											</span>
										)}
									</li>
								))}
							</ul>
							{userAnswer === null ? (
								<div className="text-emerald-700 mb-1">
									You did not answer this question.
								</div>
							) : isCorrect ? (
								<div className="text-green-700 mb-1">Correct!</div>
							) : (
								<div className="text-red-700 mb-1">Incorrect.</div>
							)}
							<div className="mt-4 p-4 bg-emerald-50 rounded-lg">
								<h4 className="font-semibold text-emerald-900 mb-2">
									Explanation:
								</h4>
								<p className="text-emerald-800">{q.explanation}</p>
							</div>
						</div>
					);
				})}
				<div className="flex justify-center mt-8">
					<button
						className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300"
						onClick={handleRetake}
					>
						Retake Quiz
					</button>
				</div>
			</div>
		);
	}

	if (current >= questions.length) {
		return null;
	}

	const q = questions[current];

	return (
		<div className="max-w-2xl mx-auto py-12 px-4 relative">
			{BackToGuideButton}
			<div style={{ height: 48 }} />
			<div className="mb-8">
				<div className="text-slate-500 mb-2">
					Question {current + 1} of {questions.length}
				</div>
				<div className="text-lg font-semibold mb-4">{q.question}</div>
				<div className="space-y-3">
					{q.options.map((opt: string, idx: number) => (
						<div key={idx} className="flex items-center gap-2">
							<button
								type="button"
								className={`px-4 py-2 rounded-lg border w-full text-left transition-all duration-200 ${
									selected === idx
										? 'bg-emerald-500 text-white border-emerald-600'
										: 'bg-white text-slate-800'
								} ${
									crossedOut[current]?.includes(idx)
										? 'line-through opacity-50'
										: ''
								}`}
								onClick={() => handleSelect(idx)}
								disabled={crossedOut[current]?.includes(idx)}
							>
								{opt}
							</button>
							<button
								type="button"
								className={`ml-2 px-2 py-1 rounded border text-xs ${
									crossedOut[current]?.includes(idx)
										? 'bg-red-200 text-red-700 border-red-400'
										: 'bg-slate-100 text-slate-500 border-slate-300'
								}`}
								onClick={() => handleCrossOut(idx)}
								aria-label="Cross out option"
							>
								{crossedOut[current]?.includes(idx) ? 'Uncross' : 'Cross out'}
							</button>
						</div>
					))}
				</div>
			</div>
			<div className="flex justify-between mt-8">
				<button
					className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-lg shadow hover:bg-slate-300 transition-all duration-300"
					onClick={handleBack}
					disabled={current === 0}
				>
					Back
				</button>
				{current < questions.length - 1 ? (
					<button
						className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300"
						onClick={handleNext}
						disabled={selected === null}
					>
						Next
					</button>
				) : (
					<button
						className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300"
						onClick={handleSubmit}
						disabled={selected === null}
					>
						Submit
					</button>
				)}
			</div>
		</div>
	);
};

export default APHumanGeographyUnit7Quiz;
