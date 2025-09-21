import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
	{
		question: "According to Ravenstein’s Laws of Migration, most migrants travel",
		options: [
			"A. long distances to major urban centers",
			"B. from high-income to low-income countries",
			"C. for short distances within the same country",
			"D. primarily via air travel",
			"E. to rural areas for farmland"
		],
		answer: 2,
		explanation:
			"Ravenstein’s Laws state that most migration occurs over short distances within the same country, often to nearby urban areas. Long-distance moves are less common."
	},
	{
		question: "A country’s natural increase rate (NIR) reflects changes in population excluding",
		options: [
			"A. births",
			"B. deaths",
			"C. migration",
			"D. doubling time",
			"E. dependency ratio"
		],
		answer: 2,
		explanation:
			"NIR is calculated as births minus deaths, not including migration. Migration is a separate factor in population change."
	},
	{
		question: "The demographic transition model’s Stage 2 is characterized by",
		options: [
			"A. high birth and high death rates",
			"B. declining birth rates and low death rates",
			"C. high birth rates and falling death rates",
			"D. low birth and increasing death rates",
			"E. stabilized birth and death rates"
		],
		answer: 2,
		explanation:
			"Stage 2 features high birth rates and rapidly declining death rates, leading to a population boom."
	},
	{
		question: "Which of the following is an example of an intervening obstacle in migration?",
		options: [
			"A. A job opening in a nearby city (Intervening opportunity)",
			"B. A crossing fee at the national border",
			"C. A cultural community in the destination country",
			"D. Family ties in the new location",
			"E. A language barrier"
		],
		answer: 1,
		explanation:
			"A crossing fee at a border is a clear intervening obstacle—something that hinders or prevents migration."
	},
	{
		question: "A country with an aging population is likely to experience",
		options: [
			"A. high NIR",
			"B. a wide base in its population pyramid",
			"C. increasing dependency ratio",
			"D. rapid urbanization",
			"E. high fertility rates"
		],
		answer: 2,
		explanation:
			"An aging population means more elderly dependents, raising the dependency ratio and straining social services."
	},
	{
		question: "Which best describes Malthusian theory?",
		options: [
			"A. Food production always exceeds population growth",
			"B. Population grows geometrically; food grows arithmetically",
			"C. Populations control themselves naturally",
			"D. Migration reduces population pressure",
			"E. Government policies are the main checks on population"
		],
		answer: 1,
		explanation:
			"Malthus argued that population increases exponentially while food supply grows linearly, leading to potential shortages."
	},
	{
		question:
			"Look at the following chart:\n\nCountry Crude Birth Rate (per 1,000) Crude Death Rate (per 1,000)\nA 15 9\nB 35 12\n\nBased on this data, which country has a higher NIR?",
		options: [
			"A. Country A",
			"B. Country B",
			"C. They have the same NIR",
			"D. Insufficient data",
			"E. They both have negative NIR"
		],
		answer: 1,
		explanation:
			"Country B: NIR = 35 - 12 = 23. Country A: NIR = 15 - 9 = 6. Country B has a higher NIR."
	},
	{
		question: "Which of these is a pull factor for voluntary migration?",
		options: [
			"A. Civil conflict",
			"B. Famine",
			"C. Employment opportunities",
			"D. Drought",
			"E. Ethnic persecution"
		],
		answer: 2,
		explanation:
			"Employment opportunities attract (pull) migrants to a new location. The others are push factors."
	},
	{
		question: "Which option correctly matches a population policy with its type?",
		options: [
			"A. China’s One-Child Policy – pro-natalist",
			"B. India’s sterilization campaign – anti-natalist",
			"C. Sweden’s parental leave incentives – restrictive",
			"D. Japan’s aging benefits – pronatalist",
			"E. France’s high child tax – pro-natalist"
		],
		answer: 1,
		explanation:
			"India’s sterilization campaign aimed to reduce births, making it anti-natalist."
	},
	{
		question: "The demographic equation summarizes population change by combining:",
		options: [
			"A. births and deaths",
			"B. births, deaths, and migration",
			"C. births and net migration",
			"D. migration and death rates",
			"E. fertility, mortality, and doubling time"
		],
		answer: 1,
		explanation:
			"The demographic equation is: (Births - Deaths) + Net Migration. It includes all three."
	}
];

const APHumanGeographyUnit2Quiz = () => {
	const [current, setCurrent] = useState(0);
	const [selected, setSelected] = useState<number | null>(null);
	const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
	const [submitted, setSubmitted] = useState(false);
	const [crossedOut, setCrossedOut] = useState<number[][]>(Array(questions.length).fill(null).map(() => []));
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
			const copy = prev.map(arr => [...arr]);
			const arr = copy[current];
			if (arr.includes(idx)) {
				copy[current] = arr.filter(i => i !== idx);
			} else {
				copy[current] = [...arr, idx];
			}
			return copy;
		});
	};

	const BackToGuideButton = (
		<button
			className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-emerald-700 shadow transition flex items-center gap-2 z-20"
			onClick={() => navigate('/ap-human-geography/unit/2')}
		>
			<span className="text-xl">←</span> Back to Study Guide
		</button>
	);

	if (submitted) {
		return (
			<div className="max-w-3xl mx-auto py-12 px-4 relative">
				{BackToGuideButton}
				<div style={{ height: 48 }} />
				<h1 className="text-3xl font-bold mb-8 text-center text-emerald-700">Quiz Results</h1>
				{questions.map((q, idx) => {
					const userAnswer = answers[idx];
					const isCorrect = userAnswer === q.answer;
					return (
						<div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
							<div className="mb-2 text-slate-500">Question {idx + 1}</div>
							<div className="mb-2 font-semibold">{q.question}</div>
							<ul className="mb-2">
								{q.options.map((opt: string, i: number) => (
									<li
										key={i}
										className={`px-3 py-1 rounded ${i === q.answer ? 'bg-green-100 font-bold' : ''} ${userAnswer === i && userAnswer !== q.answer ? 'bg-red-100' : ''}`}
									>
										{opt}
										{i === q.answer && (
											<span className="ml-2 text-green-700 font-semibold">(Correct)</span>
										)}
										{userAnswer === i && userAnswer !== q.answer && (
											<span className="ml-2 text-red-700">(Your answer)</span>
										)}
									</li>
								))}
							</ul>
							{userAnswer === null ? (
								<div className="text-emerald-700 mb-1">You did not answer this question.</div>
							) : isCorrect ? (
								<div className="text-green-700 mb-1">Correct!</div>
							) : (
								<div className="text-red-700 mb-1">Incorrect.</div>
							)}
							<div className="mt-4 p-4 bg-emerald-50 rounded-lg">
								<h4 className="font-semibold text-emerald-900 mb-2">Explanation:</h4>
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
									selected === idx ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-slate-800'
								} ${crossedOut[current]?.includes(idx) ? 'line-through opacity-50' : ''}`}
								onClick={() => handleSelect(idx)}
								disabled={crossedOut[current]?.includes(idx)}
							>
								{opt}
							</button>
							<button
								type="button"
								className={`ml-2 px-2 py-1 rounded border text-xs ${crossedOut[current]?.includes(idx) ? 'bg-red-200 text-red-700 border-red-400' : 'bg-slate-100 text-slate-500 border-slate-300'}`}
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

export default APHumanGeographyUnit2Quiz;
