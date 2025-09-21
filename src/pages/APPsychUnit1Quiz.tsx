import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
	{
		question:
			'Neural transmission across the synapse is affected by a drug that blocks the reuptake of serotonin. How would this drug most directly affect the serotonin signal at the receiving neuron?',
		options: [
			'A. Inhibits production of serotonin in the presynaptic neuron',
			'B. Increases the amount of serotonin remaining in the synaptic gap',
			'C. Prevents serotonin from binding to postsynaptic receptors',
			'D. Increases the degradation of serotonin in the synapse',
		],
		answer: 1,
		explanation:
			'Blocking reuptake means serotonin stays longer in the synaptic gap, increasing its effect at the postsynaptic neuron.',
	},
	{
		question:
			'A researcher wants to test the function of the medulla in maintaining basic life functions. Which method is most appropriate for this study?',
		options: [
			'A. Administering a questionnaire to assess breathing patterns',
			'B. Lesioning the medulla in lab rats and observing physiological responses',
			'C. Having participants meditate while monitoring heart rate',
			'D. Conducting an fMRI study during exercise',
		],
		answer: 1,
		explanation: 'Lesioning the medulla allows direct observation of its role in vital functions.',
	},
	{
		question:
			'Which structure is primarily responsible for balancing arousal and multitasking in voluntary movement and attention?',
		options: [
			'A. Cerebellum',
			'B. Thalamus',
			'C. Reticular formation',
			'D. Hippocampus',
		],
		answer: 2,
		explanation: 'The reticular formation regulates arousal and attention.',
	},
	{
		question:
			'Twin studies are particularly useful in investigating the relative influence of genetic and environmental factors because they allow comparison between:',
		options: [
			'A. Identical twins who share the same genes and environment',
			'B. Identical and fraternal twins who share similar environments but different genetics',
			'C. Adopted twins raised apart and siblings raised together',
			'D. Fraternal twins raised apart and unrelated adopted children raised together',
		],
		answer: 1,
		explanation:
			'Comparing identical and fraternal twins helps separate genetic from environmental influences.',
	},
	{
		question: 'Damage to Broca’s area would most likely result in:',
		options: [
			'A. Difficulty understanding spoken language',
			'B. An inability to form coherent speech despite knowing what you want to say',
			'C. Inability to recognize faces',
			'D. Loss of balance and coordination',
		],
		answer: 1,
		explanation: 'Broca’s area is responsible for speech production; damage impairs forming speech.',
	},
	{
		question:
			'A student falls asleep while studying and enters REM sleep quickly. According to REM rebound, what is most likely to occur the next night after sleep deprivation?',
		options: [
			'A. Longer periods spent in deep NREM sleep',
			'B. Increased occurrences of REM sleep',
			'C. No visual dreams reported',
			'D. Delayed entry into any REM sleep',
		],
		answer: 1,
		explanation: 'REM rebound is the increased amount of REM sleep after deprivation.',
	},
	{
		question:
			'What is the main difference between the sympathetic and parasympathetic divisions of the autonomic nervous system?',
		options: [
			'A. Sympathetic conserves energy, parasympathetic expends energy',
			'B. Sympathetic activates fight-or-flight response, parasympathetic promotes rest-and-digest processes',
			'C. Sympathetic controls voluntary behavior, parasympathetic controls involuntary behavior',
			'D. Sympathetic regulates reflex actions, parasympathetic regulates hormonal secretion',
		],
		answer: 1,
		explanation: 'Sympathetic = fight-or-flight; parasympathetic = rest-and-digest.',
	},
	{
		question:
			'Which statement best reflects neuroplasticity in the adult brain?',
		options: [
			'A. Brain damage always results in permanent loss of function',
			'B. Brain regions responsible for function do not change after birth',
			'C. Remaining brain structures can reorganize to assume lost functions',
			'D. Neuroplasticity only occurs during childhood',
		],
		answer: 2,
		explanation: 'Neuroplasticity allows the adult brain to reorganize and adapt.',
	},
	{
		question:
			'Which type of neuron carries information from the spinal cord to the muscles to invoke movement?',
		options: [
			'A. Sensory neuron',
			'B. Interneuron',
			'C. Motor neuron',
			'D. Glial cell',
		],
		answer: 2,
		explanation: 'Motor neurons carry signals from the CNS to muscles.',
	},
	{
		question:
			'If a person experiences chronic stress resulting in frequent headaches, high blood pressure, and lower immune function, which stage of Selye’s General Adaptation Syndrome (GAS) are they most likely in?',
		options: [
			'A. Alarm reaction',
			'B. Resistance',
			'C. Exhaustion',
			'D. Homeostasis',
		],
		answer: 2,
		explanation:
			'The exhaustion stage is marked by depleted resources and health problems.',
	},
];

const APPsychUnit1Quiz = () => {
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
			className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-yellow-700 shadow transition flex items-center gap-2 z-20"
			onClick={() => navigate('/ap-psychology/unit/1')}
		>
			<span className="text-xl">←</span> Back to Study Guide
		</button>
	);

	if (submitted) {
		return (
			<div className="max-w-3xl mx-auto py-12 px-4 relative">
				{BackToGuideButton}
				<div style={{ height: 48 }} />
				<h1 className="text-3xl font-bold mb-8 text-center text-yellow-700">Quiz Results</h1>
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
								<div className="text-yellow-700 mb-1">You did not answer this question.</div>
							) : isCorrect ? (
								<div className="text-green-700 mb-1">Correct!</div>
							) : (
								<div className="text-red-700 mb-1">Incorrect.</div>
							)}
							<div className="mt-4 p-4 bg-yellow-50 rounded-lg">
								<h4 className="font-semibold text-yellow-900 mb-2">Explanation:</h4>
								<p className="text-yellow-800">{q.explanation}</p>
							</div>
						</div>
					);
				})}
				<div className="flex justify-center mt-8">
					<button
						className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
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
									selected === idx ? 'bg-yellow-500 text-white border-yellow-600' : 'bg-white text-slate-800'
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
						className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
						onClick={handleNext}
						disabled={selected === null}
					>
						Next
					</button>
				) : (
					<button
						className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
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

export default APPsychUnit1Quiz;
