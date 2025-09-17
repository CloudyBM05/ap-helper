import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
	{
		question: 'Folk culture spreads primarily through which type of diffusion?',
		options: [
			'A. Contagious',
			'B. Hierarchical',
			'C. Relocation',
			'D. Stimulus',
			'E. Diffusion by design',
		],
		answer: 2,
		explanation:
			'Folk culture is most often spread by relocation diffusion, as people physically move and bring their traditions with them. This is different from popular culture, which spreads more rapidly and broadly.',
	},
	{
		question: 'Compared to folk culture, popular culture typically',
		options: [
			'A. changes more slowly over time',
			'B. encourages regional diversity',
			'C. represents cultural homogeneity',
			'D. is rooted in non-Western values',
			'E. is limited to minority groups',
		],
		answer: 2,
		explanation:
			'Popular culture tends to make different places more similar (homogeneous) as trends and products spread widely, reducing regional differences.',
	},
	{
		question: 'Which example best illustrates assimilation?',
		options: [
			'A. Immigrants live together, maintain their culture',
			'B. Children educated to adopt dominant language and customs',
			'C. A country protects religious diversity',
			'D. A culture blends traits but retains uniqueness',
			'E. Minority groups influence dominant culture',
		],
		answer: 1,
		explanation:
			'Assimilation occurs when a group adopts the dominant culture’s traits, often losing their original culture. Educating children to adopt the dominant language and customs is a clear example.',
	},
	{
		question:
			'A cultural innovation arises in a major city, then spreads to smaller towns across the country. This scenario is an example of',
		options: [
			'A. Contagious diffusion',
			'B. Stimulus diffusion',
			'C. Hierarchical diffusion',
			'D. Relocation diffusion',
			'E. Reverse hierarchical diffusion',
		],
		answer: 2,
		explanation:
			'Hierarchical diffusion is when an idea or innovation spreads from larger or more influential places (like major cities) to smaller or less influential places.',
	},
	{
		question:
			'The differing mosque styles in Morocco and China best exemplify:',
		options: [
			'A. Islam is restricted to the Middle East',
			'B. Cultural convergence through universalizing religion',
			'C. Cultural divergence due to local adaptation',
			'D. Ethnic religion resisting global diffusion',
			'E. Lack of diffusion impact in peripheral areas',
		],
		answer: 2,
		explanation:
			'Cultural divergence occurs when a universalizing religion like Islam adapts to local traditions and environments, resulting in different architectural styles.',
	},
	{
		question:
			'The process by which Islam diffused west through conquest and east via trade routes and missionaries is best described as:',
		options: [
			'A. Contagious diffusion',
			'B. Relocation diffusion',
			'C. Hierarchical diffusion',
			'D. Stimulus diffusion',
			'E. Mixed diffusion (hierarchical + relocation)',
		],
		answer: 4,
		explanation:
			'Islam spread westward by conquest (hierarchical diffusion) and eastward by trade and missionaries (relocation diffusion), so it is best described as mixed diffusion.',
	},
	{
		question:
			'A subtitled billboard in Ireland displays road signs in Gaelic and English. This sign best illustrates:',
		options: [
			'A. A political border marker',
			'B. Promotion of a traditional language amid global English dominance',
			'C. Official adoption of English only',
			'D. A unified linguistic identity',
			'E. A digital campaign only in English',
		],
		answer: 1,
		explanation:
			'Displaying both Gaelic and English promotes the traditional language and helps preserve cultural identity in the face of global English dominance.',
	},
	{
		question: 'Which pairing of religion and hearth region is correct?',
		options: [
			'A. Buddhism – East Asia',
			'B. Christianity – Latin America',
			'C. Islam – Central Asia',
			'D. Hinduism – South Asia',
			'E. Judaism – Eastern Europe',
		],
		answer: 3,
		explanation:
			'Hinduism originated in South Asia (the Indian subcontinent). The other pairings are incorrect.',
	},
	{
		question: 'Which best illustrates the diffusion of popular culture today?',
		options: [
			'A. A fashion trend begins in a major city and spreads to rural areas',
			'B. Migration of a religion by believers',
			'C. A musician touring cities globally',
			'D. Linguistic slang used in government schools',
			'E. A traditional dance preserved in ethnic communities',
		],
		answer: 0,
		explanation:
			'Popular culture often spreads from urban centers to rural areas, as with fashion trends that start in cities and move outward.',
	},
	{
		question:
			'According to the unit’s themes, a lingua franca is:',
		options: [
			'A. An ethnic language retained in rural areas',
			'B. A language used internationally for communication across linguistic groups',
			'C. A constructed language used by isolated groups',
			'D. A language enforced by colonial rule',
			'E. A language only used within formal institutions',
		],
		answer: 1,
		explanation:
			'A lingua franca is a language used for communication between speakers of different native languages, often for trade or diplomacy (e.g., English globally, Swahili in East Africa).',
	},
];

const APHumanGeographyUnit3Quiz = () => {
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
			onClick={() => navigate('/ap-human-geography/unit/3')}
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
								{crossedOut[current]?.includes(idx)
									? 'Uncross'
									: 'Cross out'}
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

export default APHumanGeographyUnit3Quiz;
