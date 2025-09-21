import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
	{
		question: 'The concentric zone model explains urban land use by describing',
		options: [
			'A. transportation corridors and sectors',
			'B. multiple nodes of development outside the core',
			'C. rings radiating out from the CBD with distinct uses',
			'D. grid patterns of suburban expansion',
			'E. satellite city clusters',
		],
		answer: 2,
		explanation:
			'The concentric zone model (Burgess) describes cities as a series of rings radiating from the central business district (CBD), each with different land uses.',
	},
	{
		question: 'In the multiple nuclei model, urban structure is characterized by:',
		options: [
			'A. single, centralized business district',
			'B. separate nuclei or nodes originating from the CBD',
			'C. expansion by concentric rings',
			'D. hierarchical diffusion of residential zones',
			'E. zoning based purely on land rent',
		],
		answer: 1,
		explanation:
			'The multiple nuclei model (Harris & Ullman) proposes that cities develop with several centers (nuclei) for different activities, not just one CBD.',
	},
	{
		question: 'A defining characteristic of edge cities is that they are:',
		options: [
			'A. located within CBD zoning',
			'B. former industrial zones in the city core',
			'C. centers of business and retail outside the CBD',
			'D. rural towns annexed by cities',
			'E. high-density residential suburbs',
		],
		answer: 2,
		explanation:
			'Edge cities are new business, shopping, and entertainment centers that develop on the outskirts of traditional downtowns, often near highways.',
	},
	{
		question: 'The pattern described in the graph best corresponds to:',
		options: [
			'A. Bid-rent gradient theory',
			'B. Galactic city model',
			'C. Sector model of urban land use',
			'D. Central place theory',
			'E. Gravity model of interaction',
		],
		answer: 0,
		explanation:
			'The bid-rent theory explains why land values and population density are highest near the CBD and decrease outward, matching the described pattern.',
	},
	{
		question:
			'What urban problem is commonly associated with rapid expansion of suburbs and edge cities?',
		options: [
			'A. Gentrification',
			'B. Urban sprawl',
			'C. Overurbanization',
			'D. Urban heat island',
			'E. Blockbusting',
		],
		answer: 1,
		explanation:
			'Urban sprawl is the uncontrolled outward expansion of cities, often caused by rapid suburban and edge city growth.',
	},
	{
		question: 'The urban heat island effect is primarily caused by:',
		options: [
			'A. excessive suburban development',
			'B. increased solar reflection by vegetation',
			'C. concentration of concrete and asphalt in urban cores',
			'D. population density decline toward the periphery',
			'E. new commercial nodes in edge cities',
		],
		answer: 2,
		explanation:
			'Urban heat islands occur because concrete and asphalt absorb and retain heat, making city centers warmer than surrounding areas.',
	},
	{
		question:
			'A city with multiple distinct centers of activity and no dominant CBD likely follows:',
		options: [
			'A. Concentric zone model',
			'B. Sector model',
			'C. Multiple nuclei model',
			'D. Galactic model',
			'E. Central place theory',
		],
		answer: 2,
		explanation:
			'The multiple nuclei model describes cities with several independent centers (nuclei) for different activities, rather than a single dominant CBD.',
	},
	{
		question: 'Which describes overurbanization in developing countries?',
		options: [
			'A. Population growth outpaces infrastructure and job creation',
			'B. Too few people moving from rural areas',
			'C. Excessive edge city development',
			'D. Centralizing all functions in the CBD',
			'E. Expansion into the wildland-urban interface',
		],
		answer: 0,
		explanation:
			'Overurbanization occurs when city population grows faster than the city’s ability to provide jobs, housing, and services, leading to slums and infrastructure strain.',
	},
	{
		question: 'This map best illustrates which urban model?',
		options: [
			'A. Concentric zone model',
			'B. Sector model',
			'C. Multiple nuclei model',
			'D. Galactic city model',
			'E. Urban hierarchy model',
		],
		answer: 3,
		explanation:
			'The galactic city model (peripheral model) shows a traditional downtown surrounded by edge cities and ring roads, forming new centers outside the core.',
	},
	{
		question:
			'One major environmental challenge related to expanding edge cities and suburban development is:',
		options: [
			'A. Gentrification of inner cities',
			'B. Increased transit-oriented growth',
			'C. Destruction of habitat at the wildland‑urban interface',
			'D. Formation of multiple CBDs',
			'E. Decline in global city status',
		],
		answer: 2,
		explanation:
			'Expanding suburbs and edge cities often destroy natural habitats at the boundary between developed and wild land, threatening biodiversity.',
	},
];

const APHumanGeographyUnit6Quiz = () => {
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
			onClick={() => navigate('/ap-human-geography/unit/6')}
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

export default APHumanGeographyUnit6Quiz;