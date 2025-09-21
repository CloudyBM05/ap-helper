import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Type definitions
interface Unit3QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Unit3QuizGroup {
  stimulus: string;
  text: string;
  questions: Unit3QuizQuestion[];
}

interface FlatUnit3QuizQuestion {
  stimulus: string;
  text: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

// Group questions by stimulus
const unit3QuizGroups: Unit3QuizGroup[] = [
	{
		stimulus: "Resolution introduced by Richard Henry Lee, June 7, 1776",
		text: "“That these United Colonies are, and of right ought to be, free and independent States; that they are absolved from all allegiance to the British Crown...”",
		questions: [
			{
				question: '1. The excerpt above represents which major development in colonial history?',
				options: [
					'A. The ratification of the Constitution',
					'B. The outbreak of the French and Indian War',
					'C. The formal decision to seek independence',
					'D. The establishment of the Bill of Rights',
				],
				answer: 2,
				explanation:
					'C. This resolution was the formal proposal for independence, leading to the Declaration of Independence.',
			},
			{
				question: '2. Which Enlightenment idea most directly influenced the sentiment in the excerpt?',
				options: [
					'A. Checks and balances',
					'B. Natural rights',
					'C. Judicial review',
					'D. Social Darwinism',
				],
				answer: 1,
				explanation:
					'B. The idea of natural rights (life, liberty, property) was central to the Declaration and Lee’s resolution.',
			},
		]
	},
	{
		stimulus: "Samuel Adams, Letter to James Warren, 1772",
		text: "“In the late war, your old father and brothers, as well as myself, were compelled to take up arms... The British Parliament has undertaken to give and grant our money without our consent. ...They are not our representatives.”",
		questions: [
			{
				question: '3. What is the main grievance expressed in this excerpt?',
				options: [
					'A. The taxation of imported goods',
					'B. The lack of colonial representation in Parliament',
					'C. The failure to protect colonial soldiers',
					'D. British abolition of colonial slavery',
				],
				answer: 1,
				explanation:
					'B. Adams is protesting “taxation without representation,” a key colonial grievance.',
			},
			{
				question: '4. Which British law most directly sparked this type of colonial protest?',
				options: [
					'A. The Proclamation of 1763',
					'B. The Intolerable Acts',
					'C. The Sugar Act',
					'D. The Stamp Act',
				],
				answer: 3,
				explanation:
					'D. The Stamp Act was the first direct tax on the colonies and led to widespread protest.',
			},
		]
	},
	{
		stimulus: "Lord Cornwallis, after the Battle of Yorktown, 1781",
		text: "“I have the mortification to inform your Excellency that I have been forced to surrender to the combined forces of the enemy...”",
		questions: [
			{
				question: '5. The event described above marked:',
				options: [
					'A. The start of the French and Indian War',
					'B. The British retreat from the Boston Massacre',
					'C. The effective end of the Revolutionary War',
					'D. The signing of the Treaty of Paris',
				],
				answer: 2,
				explanation:
					'C. The surrender at Yorktown effectively ended major fighting in the Revolutionary War.',
			},
			{
				question: '6. What foreign power was critical to the victory described in the excerpt?',
				options: [
					'A. Spain',
					'B. France',
					'C. The Netherlands',
					'D. Russia',
				],
				answer: 1,
				explanation: 'B. French troops and their naval blockade were decisive at Yorktown.',
			},
		]
	},
	{
		stimulus: "United States Constitution, Article V",
		text: "“...no State, without its consent, shall be deprived of its equal suffrage in the Senate.”",
		questions: [
			{
				question: '7. The above passage reflects which compromise made during the Constitutional Convention?',
				options: [
					'A. Missouri Compromise',
					'B. Great Compromise',
					'C. Three-Fifths Compromise',
					'D. Compromise of 1850',
				],
				answer: 1,
				explanation:
					'B. The Great Compromise gave all states equal representation in the Senate.',
			},
			{
				question: '8. Which of the following groups would have been most likely to support this clause?',
				options: [
					'A. Large population states',
					'B. Southern slaveholding elites',
					'C. Smaller states concerned about representation',
					'D. Anti-Federalists seeking a weak federal government',
				],
				answer: 2,
				explanation:
					'C. Smaller states wanted equal representation to protect their interests.',
			},
		]
	},
	{
		stimulus: "George Washington, 1787 Constitutional Convention",
		text: "“We must raise a standard to which the wise and honest can repair; the event is in the hand of God.”",
		questions: [
			{
				question: '9. What was the context of Washington’s speech quoted above?',
				options: [
					'A. His farewell address',
					'B. His inauguration as first president',
					'C. The ratification of the Articles of Confederation',
					'D. The debate over creating a stronger federal government',
				],
				answer: 3,
				explanation:
					'D. Washington was urging delegates to create a stronger national government at the Constitutional Convention.',
			},
			{
				question: '10. Which event most directly exposed the weaknesses of the Articles of Confederation and led to the meeting referenced in the quote?',
				options: [
					'A. Boston Tea Party',
					'B. Shays’s Rebellion',
					'C. Whiskey Rebellion',
					'D. XYZ Affair',
				],
				answer: 1,
				explanation:
					'B. Shays’s Rebellion highlighted the inability of the federal government to maintain order, prompting calls for a new constitution.',
			},
		]
	},
];

// Flatten questions for navigation, but keep group info for rendering
const allQuestions: FlatUnit3QuizQuestion[] = unit3QuizGroups.reduce((acc: FlatUnit3QuizQuestion[], group) => {
	group.questions.forEach((q) => {
		acc.push({
			stimulus: group.stimulus,
			text: group.text,
			question: q.question,
			options: q.options,
			answer: q.answer,
			explanation: q.explanation
		});
	});
	return acc;
}, []);

const APUSHUnit3Quiz: React.FC = () => {
	const [current, setCurrent] = useState(0);
	const [selected, setSelected] = useState<number | null>(null);
	const [answers, setAnswers] = useState<(number | null)[]>(
		Array(allQuestions.length).fill(null)
	);
	const [submitted, setSubmitted] = useState(false);
	const [crossedOut, setCrossedOut] = useState<number[][]>(
		Array(allQuestions.length).fill(null).map(() => [])
	);
	const navigate = useNavigate();

	const handleSelect = (idx: number) => {
		setSelected(idx);
	};

	const handleNext = () => {
		const newAnswers = [...answers];
		newAnswers[current] = selected;
		setAnswers(newAnswers);
		setSelected(null);
		setCurrent((prev) => prev + 1);
	};

	const handleSubmit = () => {
		const newAnswers = [...answers];
		newAnswers[current] = selected;
		setAnswers(newAnswers);
		setSubmitted(true);
	};

	const handleGoBack = () => {
		navigate('/apush-study-guide/unit/3');
	};

	const handleBack = () => {
		if (current > 0) {
			setCurrent((prev) => prev - 1);
			setSelected(answers[current - 1]);
		}
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
			className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
			onClick={() => navigate('/apush-study-guide/unit/3')}
		>
			<span className="text-xl">←</span> Back to Study Guide
		</button>
	);

	if (submitted) {
		return (
			<div className="max-w-3xl mx-auto py-12 px-4 relative">
				{BackToGuideButton}
				<div style={{ height: 48 }} /> {/* Add vertical space below the button */}
				<h1 className="text-3xl font-bold mb-8 text-center">Quiz Results</h1>
				{allQuestions.map((q, idx) => {
					const userAnswer = answers[idx];
					const isCorrect = userAnswer === q.answer;
					return (
						<div
							key={idx}
							className="mb-8 p-6 rounded-xl border bg-white shadow"
						>
							<div className="mb-2 text-slate-500">Question {idx + 1}</div>
							<div className="mb-2 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
								<div className="font-semibold text-blue-800 mb-1">{q.stimulus}</div>
								{q.text && <div className="text-slate-700">{q.text}</div>}
							</div>
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
								<div className="text-yellow-700 mb-1">
									You did not answer this question.
								</div>
							) : isCorrect ? (
								<div className="text-green-700 mb-1">Correct!</div>
							) : (
								<div className="text-red-700 mb-1">Incorrect.</div>
							)}
							<div className="mt-4 p-4 bg-blue-50 rounded-lg">
								<h4 className="font-semibold text-blue-900 mb-2">
									Explanation:
								</h4>
								<p className="text-blue-800">{q.explanation}</p>
							</div>
						</div>
					);
				})}
				<div className="flex justify-center mt-8">
					<button
						className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
						onClick={handleGoBack}
					>
						Go Back to Unit
					</button>
				</div>
			</div>
		);
	}

	if (current >= allQuestions.length) {
		return null; // Fallback for invalid state
	}

	// Find the group for the current question
	let groupIdx = 0, qIdx = current;
	for (let i = 0; i < unit3QuizGroups.length; i++) {
		const group = unit3QuizGroups[i];
		if (qIdx < group.questions.length) {
			groupIdx = i;
			break;
		} else {
			qIdx -= group.questions.length;
		}
	}
	const group = unit3QuizGroups[groupIdx];
	const q = group.questions[qIdx];

	return (
		<div className="max-w-2xl mx-auto py-12 px-4 relative">
			{BackToGuideButton}
			<div style={{ height: 48 }} /> {/* Add vertical space below the button */}
			<div className="mb-8">
				{/* Always show the stimulus box */}
				<div className="mb-4">
					<div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-t-lg">
						<div className="font-semibold text-blue-800 mb-1">{group.stimulus}</div>
						<div className="text-slate-700">{group.text}</div>
					</div>
				</div>
				<div className="text-slate-500 mb-2">
					Question {current + 1} of {allQuestions.length}
				</div>
				<div className="text-lg font-semibold mb-4">{q.question}</div>
				<div className="space-y-3">
					{q.options.map((opt: string, idx: number) => (
						<div key={idx} className="flex items-center gap-2">
							<button
								type="button"
								className={`px-4 py-2 rounded-lg border w-full text-left transition-all duration-200 ${
									selected === idx
										? 'bg-blue-500 text-white border-blue-600'
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
				{current < allQuestions.length - 1 ? (
					<button
						className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
						onClick={handleNext}
						disabled={selected === null}
					>
						Next
					</button>
				) : (
					<button
						className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
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

export default APUSHUnit3Quiz;
