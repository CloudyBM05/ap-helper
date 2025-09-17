import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
	{
		question: 'A nation‑state is best defined as a political entity where',
		options: [
			'A. multiple national groups exist within one state',
			'B. state borders align closely with a single cultural group',
			'C. a nation exists across multiple states',
			'D. a cultural group lacks any political representation',
			'E. sovereignty is shared with a higher authority',
		],
		answer: 1,
		explanation:
			'A nation-state is a country whose political boundaries closely match the distribution of a single cultural or ethnic group, such as Japan or Iceland.',
	},
	{
		question: 'Which type of political entity describes the Kurds, who share a common identity but have no recognized state?',
		options: [
			'A. Nation-state',
			'B. Stateless nation',
			'C. Multinational state',
			'D. Autonomous region',
			'E. Supranational organization',
		],
		answer: 1,
		explanation:
			'A stateless nation is a cultural group with a shared identity but no independent, recognized country of their own. The Kurds are a classic example.',
	},
	{
		question: 'Devolution refers to:',
		options: [
			'A. The consolidation of political power at the national level',
			'B. The transfer of power from central government to regional/local governments',
			'C. Redrawing of boundaries to reflect cultural divisions',
			'D. Establishment of a unitary system',
			'E. Forming a supranational organization',
		],
		answer: 1,
		explanation:
			'Devolution is when a central government grants more autonomy or power to regional or local governments, as seen in the UK with Scotland and Wales.',
	},
	{
		question: 'The region of Catalonia within Spain is an example of:',
		options: [
			'A. Irredentism',
			'B. Ethnonationalism',
			'C. Autonomous region',
			'D. Stateless nation',
			'E. Fragmented state',
		],
		answer: 2,
		explanation:
			'Catalonia is an autonomous region within Spain, meaning it has its own parliament and some legislative authority, but is not fully independent.',
	},
	{
		question: 'Which element is a centrifugal force in Spain’s context?',
		options: [
			'A. Shared language of Castilian Spanish',
			'B. Catalan autonomy and separatist sentiment',
			'C. National holidays celebrated across the country',
			'D. Constitution guaranteeing regional rights',
			'E. Use of EU for dispute resolution',
		],
		answer: 1,
		explanation:
			'Centrifugal forces divide a state. Catalan autonomy and separatist movements challenge Spanish unity, making them centrifugal.',
	},
	{
		question: 'Which best describes an allocational boundary dispute?',
		options: [
			'A. Disagreement over mapping of the border line',
			'B. Dispute about crossing rules',
			'C. Conflict over shared resources (e.g., oil beneath border)',
			'D. Aological disputes over boundary interpretation',
			'E. Tensions arising from ethnic groups split by borders',
		],
		answer: 2,
		explanation:
			'Allocational disputes are conflicts over resources that straddle a boundary, such as oil, water, or minerals.',
	},
	{
		question: 'Which state morphology best describes Chile—with its long, narrow shape spanning over 4,000 km along the Pacific coast?',
		options: [
			'A. Compact',
			'B. Elongated',
			'C. Prorupted',
			'D. Fragmented',
			'E. Perforated',
		],
		answer: 1,
		explanation:
			'Chile is an elongated state, meaning it is much longer in one direction than the other. This can create challenges for communication and governance.',
	},
	{
		question: 'NATO is classified as a form of:',
		options: [
			'A. Unilateralism',
			'B. Federalism',
			'C. Supranationalism',
			'D. Autocracy',
			'E. Stateless coalition',
		],
		answer: 2,
		explanation:
			'NATO is a supranational organization—an alliance of multiple countries that work together for mutual benefit, sometimes giving up some sovereignty.',
	},
	{
		question: 'A key trade-off of supranational membership is:',
		options: [
			'A. Increased cultural independence',
			'B. Strengthened national sovereignty',
			'C. Loss of some decision-making authority',
			'D. Reduced access to markets',
			'E. Elimination of regional autonomy',
		],
		answer: 2,
		explanation:
			'Countries in supranational organizations (like the EU or NATO) must sometimes give up some control over their own decisions in exchange for benefits like security or trade.',
	},
	{
		question: 'Which boundary type arose from colonial drawing in Africa that ignored existing cultural divisions?',
		options: [
			'A. Antecedent',
			'B. Subsequent',
			'C. Superimposed',
			'D. Relic',
			'E. Consequent',
		],
		answer: 2,
		explanation:
			'Superimposed boundaries are drawn by outside powers, often with little regard for existing cultural or ethnic divisions. Many African borders are superimposed.',
	},
];

const APHumanGeographyUnit4Quiz = () => {
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
			onClick={() => navigate('/ap-human-geography/unit/4')}
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

export default APHumanGeographyUnit4Quiz;
