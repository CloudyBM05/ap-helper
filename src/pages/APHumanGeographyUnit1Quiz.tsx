import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
	{
		question: "Every map projection distorts the Earth’s surface because",
		options: [
			'A. mapmakers purposefully change data to suit user needs',
			'B. latitudes and longitudes converge at the poles',
			'c. map scale varies from one region to another',
			'D. you cannot flatten a curved surface without distortion',
			'E. geographic symbols misrepresent terrain features',
		],
		answer: 3,
		explanation:
			'All map projections must distort some aspect of the Earth’s surface because it is impossible to perfectly flatten a sphere onto a plane. This is a geometric limitation, not a result of mapmaker intent or scale changes.',
	},
	{
		question: "The formal name of geographic projection distortion that affects relative sizes of countries is",
		options: [
			'A. projection error',
			'B. area distortion',
			'C. directional drift',
			'D. scale compression',
			'E. cognitive bias',
		],
		answer: 1,
		explanation:
			'Area distortion refers to the misrepresentation of the relative sizes of regions or countries on a map projection. This is a key issue in projections like Mercator, where high-latitude areas appear much larger than they are.',
	},
	{
		question: "Tobler’s First Law of Geography predicts that",
		options: [
			'A. distant places interact more than nearby ones',
			'B. absolute distance has no effect on interaction',
			'C. near places tend to have more interaction than far ones',
			'D. place names affect diffusion patterns',
			'E. regions are homogeneous by default',
		],
		answer: 2,
		explanation:
			'Tobler’s First Law states: “Everything is related to everything else, but near things are more related than distant things.” This means spatial interaction is stronger between places that are closer together.',
	},
	{
		question: "A dot map showing locations of earthquakes best illustrates which spatial concept?",
		options: [
			'A. scale',
			'B. density',
			'C. distribution',
			'D. region',
			'E. connectivity',
		],
		answer: 2,
		explanation:
			'Distribution refers to the arrangement of phenomena across space. A dot map showing earthquake locations visually represents the spatial distribution of those events.',
	},
	{
		question: "The theory that physical environment offers possibilities and constraints, but does not determine human actions is called",
		options: [
			'A. environmental determinism',
			'B. possibilism',
			'C. spatial diffusion',
			'D. cultural ecology',
			'E. site-situation contrast',
		],
		answer: 1,
		explanation:
			'Possibilism argues that while the environment sets certain limits, humans have the agency to adapt, innovate, and choose from many possible courses of action. This contrasts with environmental determinism, which claims the environment dictates outcomes.',
	},
	{
		question: "Time‑space compression refers to",
		options: [
			'A. the increasing relative distance between places',
			'B. slower movement as distances grow',
			'C. faster communication and travel reducing effective distance',
			'D. compression of time zones by globalization',
			'E. overlap of time cycles and spatial cycles',
		],
		answer: 2,
		explanation:
			'Time-space compression describes how advances in technology and transportation make places feel closer together by reducing the time it takes to communicate or travel between them.',
	},
	{
		question: "A map showing average income by county using color gradations is known as a",
		options: [
			'A. chloropleth map',
			'B. cartogram',
			'C. dot distribution map',
			'D. reference map',
			'E. proportional symbol map',
		],
		answer: 0,
		explanation:
			'A choropleth map uses color shading to represent data values (like income) for predefined areas. This is a common way to visualize regional differences.',
	},
	{
		question: "Which best defines a vernacular (perceptual) region?",
		options: [
			'A. A region defined by formal boundaries and uniform characteristics',
			'B. A functional region tied to a specific service',
			'C. An area defined by vague cultural perceptions',
			'D. A climate-based formal region',
			'E. A political region created by treaties',
		],
		answer: 2,
		explanation:
			'A vernacular or perceptual region is defined by people’s beliefs, feelings, or cultural identity, rather than strict boundaries or measurable traits. Examples include “the Midwest” or “the South.”',
	},
	{
		question: "Which tool allows you to layer and analyze multiple types of geographic data (e.g., roads, population, elevation)?",
		options: [
			'A. Choropleth map',
			'B. Remote sensing',
			'C. GPS',
			'D. GIS',
			'E. Cartogram',
		],
		answer: 3,
		explanation:
			'GIS (Geographic Information Systems) allow users to combine, layer, and analyze many types of spatial data, making it a powerful tool for geographic analysis.',
	},
	{
		question: "The difference between absolute location and relative location is that",
		options: [
			'A. absolute is exact latitude/longitude; relative describes location in relation to other features',
			'B. absolute uses street addresses, relative uses coordinates',
			'C. absolute changes over time; relative is fixed',
			'D. absolute is distance-based, relative is scale-based',
			'E. absolute refers to spatial hierarchy, relative to pattern',
		],
		answer: 0,
		explanation:
			'Absolute location is a precise point (like coordinates), while relative location describes a place’s position compared to other features or places.',
	},
];

const APHumanGeographyUnit1Quiz = () => {
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
			className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-emerald-700 shadow transition flex items-center gap-2 z-20"
			onClick={() => navigate('/ap-human-geography/unit/1')}
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

export default APHumanGeographyUnit1Quiz;
