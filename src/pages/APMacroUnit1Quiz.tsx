import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
	{
		question: 'Which of the following best explains why scarcity exists?',
		options: [
			'A) Resources are unlimited, but people\'s wants are limited.',
			'B) Resources are limited and can be used for only one purpose.',
			'C) Resources are limited, and human wants are unlimited.',
			'D) Prices are too high for many people to afford basic goods.',
			'E) Governments fail to allocate resources efficiently.',
		],
		answer: 2,
		explanation: 'Scarcity exists because resources are limited, but human wants are unlimited. This fundamental economic problem forces societies to make choices about how to allocate resources.'
	},
	{
		question: 'In economics, opportunity cost is best defined as:',
		options: [
			'A) The monetary cost of all alternatives',
			'B) The value of all possible alternatives forgone',
			'c) The value of the best alternative forgone',
			'D) The total resources used to produce a good',
			'E) The difference between fixed and variable costs',
		],
		answer: 2,
		explanation: 'Opportunity cost is the value of the next best alternative that is forgone when a choice is made.'
	},
	{
		question: 'Which of the following would cause a production possibilities curve (PPC) to shift outward?',
		options: [
			'A) A reduction in available labor',
			'B) A decrease in capital goods production',
			'C) An increase in consumer spending',
			'D) A technological advancement in production',
			'E) A shift from market to command economy',
		],
		answer: 3,
		explanation: 'A technological advancement increases the productive capacity of an economy, shifting the PPC outward.'
	},
	{
		question: 'If a country is operating inside its production possibilities curve, it indicates:',
		options: [
			'A) The country is experiencing inflation.',
			'B) Resources are being used efficiently.',
			'c) The country has achieved maximum production.',
			'D) There is underemployment or inefficiency.',
			'E) The country needs more capital investment.',
		],
		answer: 3,
		explanation: 'Operating inside the PPC means resources are not fully employed or are used inefficiently.'
	},
	{
		question: 'If a country chooses to produce more capital goods than consumer goods, the likely result is:',
		options: [
			'A) Slower economic growth in the future',
			'B) Increased unemployment',
			'C) A shift inward of the PPC',
			'D) Greater economic growth in the future',
			'E) A reduction in opportunity costs',
		],
		answer: 3,
		explanation: 'Producing more capital goods increases future productive capacity, leading to greater economic growth.'
	},
	{
		question: 'Which of the following is a positive economic statement?',
		options: [
			'A) The government should raise the minimum wage.',
			'B) The rich should pay more taxes.',
			'C) An increase in the gas tax will reduce gas consumption.',
			'D) The economy is better off when trade is restricted.',
			'E) Education is more valuable than entertainment.',
		],
		answer: 2,
		explanation: 'A positive economic statement is objective and testable, such as the effect of a gas tax on consumption.'
	},
	{
		question: 'A bowed-out (concave) production possibilities curve illustrates:',
		options: [
			'A) Constant opportunity cost',
			'B) Decreasing opportunity cost',
			'C) Increasing opportunity cost',
			'D) Full employment of all resources',
			'E) Economic stagnation',
		],
		answer: 2,
		explanation: 'A concave PPC shows increasing opportunity cost because resources are not equally efficient in all uses.'
	},
	{
		question: 'Which of the following is true about a competitive market in equilibrium?',
		options: [
			'A) Quantity demanded always exceeds quantity supplied.',
			'B) Price is determined only by producers.',
			'C) There are no shortages or surpluses.',
			'D) The government sets the price to balance the market.',
			'E) Consumers cannot affect market outcomes.',
		],
		answer: 2,
		explanation: 'In equilibrium, quantity demanded equals quantity supplied, so there are no shortages or surpluses.'
	},
	{
		question: 'In a PPC diagram, what does a movement from a point inside the curve to a point on the curve represent?',
		options: [
			'A) An increase in opportunity costs',
			'B) A trade-off between two goods',
			'C) Economic growth',
			'D) An improvement in efficiency',
			'E) A decrease in available resources',
		],
		answer: 3,
		explanation: 'Moving from inside to on the PPC means resources are being used more efficiently.'
	},
	{
		question: 'Which of the following is most likely to shift the entire PPC inward?',
		options: [
			'A) Discovery of new natural resources',
			'B) War that destroys factories and infrastructure',
			'C) An increase in the labor force',
			'D) Improved education and training programs',
			'E) Technological innovation in agriculture',
		],
		answer: 1,
		explanation: 'War that destroys productive resources reduces an economy’s capacity, shifting the PPC inward.'
	},
];

const APMacroUnit1Quiz = () => {
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
		setSelected(newAnswers[current + 1] ?? null);
		setCurrent((prev) => prev + 1);
	};

	const handleBack = () => {
		if (current > 0) {
			setCurrent((prev) => prev - 1);
			setSelected(answers[current - 1]);
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
			className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-cyan-700 shadow transition flex items-center gap-2 z-20"
			onClick={() => navigate('/ap-macroeconomics/unit/1')}
		>
			<span className="text-xl">←</span> Back to Unit 1
		</button>
	);

	if (submitted) {
		return (
			<div className="max-w-3xl mx-auto py-12 px-4 relative">
				{BackToGuideButton}
				<div style={{ height: 48 }} />
				<h1 className="text-3xl font-bold mb-8 text-center text-cyan-700">Quiz Results</h1>
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
								<div className="text-cyan-700 mb-1">You did not answer this question.</div>
							) : isCorrect ? (
								<div className="text-green-700 mb-1">Correct!</div>
							) : (
								<div className="text-red-700 mb-1">Incorrect.</div>
							)}
							<div className="mt-4 p-4 bg-cyan-50 rounded-lg">
								<h4 className="font-semibold text-cyan-900 mb-2">Explanation:</h4>
								<p className="text-cyan-800">{q.explanation}</p>
							</div>
						</div>
					);
				})}
				<div className="flex justify-center mt-8">
					<button
						className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-cyan-600 hover:to-cyan-800 transition-all duration-300"
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
									selected === idx ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-white text-slate-800'
								} ${crossedOut[current]?.includes(idx) ? 'line-through opacity-50' : ''}`}
								onClick={() => handleSelect(idx)}
								disabled={crossedOut[current]?.includes(idx)}
							>
								{opt}
							</button>
							<button
								type="button"
								className={`ml-2 px-2 py-1 rounded border text-xs ${crossedOut[current]?.includes(idx) ? 'bg-red-200 text-red-700 border-red-400' : 'bg-slate-100 text-cyan-700 border-cyan-300'}`}
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
						className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-cyan-600 hover:to-cyan-800 transition-all duration-300"
						onClick={handleNext}
						disabled={selected === null}
					>
						Next
					</button>
				) : (
					<button
						className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-cyan-600 hover:to-cyan-800 transition-all duration-300"
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

export default APMacroUnit1Quiz;
