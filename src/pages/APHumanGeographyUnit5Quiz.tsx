import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
	{
		question: 'Which of the following is NOT a characteristic of subsistence agriculture?',
		options: [
			'A. Producing food primarily for personal or family consumption',
			'B. Growing a variety of crops, including staples and vegetables',
			'C. Selling most of the harvest in local markets',
			'D. Low input of machinery and chemicals',
			'E. Often practiced in rural areas of LDCs',
		],
		answer: 2,
		explanation:
			'Subsistence agriculture is focused on growing food for the farmer’s own use, not for sale. Selling most of the harvest is a characteristic of commercial, not subsistence, agriculture.',
	},
	{
		question: 'Terrace farming is most commonly used in',
		options: [
			'A. arid lowlands',
			'B. coastal plains',
			'C. mountainous slopes',
			'D. river deltas',
			'E. tropical rainforests',
		],
		answer: 2,
		explanation:
			'Terrace farming is a method used to create flat areas on steep slopes, making it ideal for mountainous regions where flat land is scarce.',
	},
	{
		question: 'The Green Revolution primarily involved',
		options: [
			'A. Transition to organic farming methods',
			'B. Expansion of subsistence agriculture in LDCs',
			'C. Development of high-yield seed varieties and increased chemical inputs',
			'D. Adoption of permaculture and landscape restoration',
			'E. Elimination of agricultural trade barriers',
		],
		answer: 2,
		explanation:
			'The Green Revolution was marked by the introduction of high-yield crops, synthetic fertilizers, and pesticides, greatly increasing food production.',
	},
	{
		question: 'Which best describes extensive agriculture?',
		options: [
			'A. Large land area, minimal labor input',
			'B. Small plots with high productivity',
			'C. Plantation-based monoculture farming',
			'D. Market gardening near urban centers',
			'E. Crop rotation on small rural farms',
		],
		answer: 0,
		explanation:
			'Extensive agriculture uses large areas of land with relatively little labor or capital per acre, such as ranching or grain farming.',
	},
	{
		question: 'In the Von Thünen model, why is dairy and market gardening located closest to the central city?',
		options: [
			'A. Because those products are cheapest',
			'B. Due to low land costs near the market',
			'C. Because dairy and perishable goods spoil quickly',
			'D. Due to labor availability',
			'E. Because those activities require the most land',
		],
		answer: 2,
		explanation:
			'Dairy and market gardening are closest to the city because their products are perishable and need to reach consumers quickly before spoiling.',
	},
	{
		question: 'Which sequence correctly matches the rings of the Von Thünen model (nearest to farthest from city)?',
		options: [
			'A. Dairy/market gardening → forestry → grains → livestock',
			'B. Livestock → grains → forestry → dairy/market gardening',
			'C. Forestry → dairy/market gardening → livestock → grains',
			'D. Grains → forestry → dairy/market gardening → livestock',
			'E. Forestry → livestock → dairy → grains',
		],
		answer: 0,
		explanation:
			'The classic Von Thünen model places dairy/market gardening closest, then forestry, then grains, and livestock farthest from the city.',
	},
	{
		question: 'Which challenge is directly associated with shifting cultivation?',
		options: [
			'A. Rising cost of farm labor',
			'B. Mechanization and monocropping',
			'C. Rapid soil fertility loss due to slash-and-burn',
			'D. Overreliance on imported seeds',
			'E. Urban encroachment on farmland',
		],
		answer: 2,
		explanation:
			'Shifting cultivation (slash-and-burn) quickly depletes soil nutrients, requiring farmers to move to new plots frequently.',
	},
	{
		question: 'Which description correctly pairs the survey method with its pattern?',
		options: [
			'A. Metes & bounds → regular geometric grid',
			'B. Township and range → long narrow plots along waterways',
			'C. French long-lot → long thin parcels oriented along rivers',
			'D. Township and range → irregular shapes based on terrain',
			'E. Metes & bounds → uniform rectangular fields',
		],
		answer: 2,
		explanation:
			'The French long-lot system creates long, narrow plots along rivers to maximize access to water. Township and range is a grid, metes and bounds is irregular.',
	},
	{
		question: 'Plantation agriculture is typically classified as',
		options: [
			'A. Subsistence agriculture',
			'B. Extensive agriculture',
			'C. Intensive subsistence',
			'D. Mixed crop/livestock',
			'E. Market gardening',
		],
		answer: 1,
		explanation:
			'Plantation agriculture uses large areas and often a single crop, making it extensive. It is usually commercial, not subsistence.',
	},
	{
		question: 'Which is NOT a negative consequence of modern agriculture?',
		options: [
			'A. Soil salinization from irrigation',
			'B. Increased biodiversity on large monocropped farms',
			'C. Pollution from pesticide runoff',
			'D. Desertification due to overgrazing',
			'E. Loss of soil fertility from intensive cropping',
		],
		answer: 1,
		explanation:
			'Large monocropped farms usually reduce biodiversity, not increase it. The other options are all negative impacts of modern agriculture.',
	},
];

const APHumanGeographyUnit5Quiz = () => {
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
			onClick={() => navigate('/ap-human-geography/unit/5')}
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

export default APHumanGeographyUnit5Quiz;
