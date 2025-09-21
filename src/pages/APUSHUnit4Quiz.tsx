import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Type definitions
interface Unit4QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Unit4QuizGroup {
  stimulus: string;
  text: string;
  questions: Unit4QuizQuestion[];
}

interface FlatUnit4QuizQuestion {
  stimulus: string;
  text: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

// Group questions by stimulus, matching Unit 1's structure
const unit4QuizGroups: Unit4QuizGroup[] = [
	{
		stimulus: "Jefferson’s First Inaugural Address (1801)",
		text: "“We are all Republicans, we are all Federalists. … The minority possess their equal rights, which equal law must protect, and to violate would be oppression. … I deem the essential principles of our government … the support of state governments in all their rights … a well-disciplined militia, our best reliance in peace and for the first moments of war.”",
		questions: [
			{
				question: "1. Jefferson’s emphasis on “support of state governments” reflects which political principle?",
				options: [
					"A) Strong central government",
					"B) Strict interpretation of the Constitution",
					"C) Mercantilism",
					"D) Loose constructionism"
				],
				answer: 1,
				explanation: "Jefferson believed in a strict interpretation of the Constitution and strong state governments, limiting federal power."
			},
			{
				question: "2. Jefferson's election in 1800 was often referred to as a 'Revolution' because it:",
				options: [
					"A) Ended the Articles of Confederation",
					"B) Marked the first peaceful transfer of power between parties",
					"C) Led to the end of the War of 1812",
					"D) Led to increased power for the Federalist Party"
				],
				answer: 1,
				explanation: "The election of 1800 was the first time in U.S. history that power shifted peacefully between political parties, setting a democratic precedent."
			}
		]
	},
	{
		stimulus: "Excerpt from Marbury v. Madison (1803)",
		text: "“It is emphatically the province and duty of the judicial department to say what the law is … a law repugnant to the Constitution is void.”",
		questions: [
			{
				question: "3. What important precedent was established in Marbury v. Madison?",
				options: [
					"A) Nullification",
					"B) Judicial Review",
					"C) The supremacy of state law",
					"D) Right to a speedy trial"
				],
				answer: 1,
				explanation: "Marbury v. Madison established the Supreme Court's authority to declare laws unconstitutional—judicial review."
			},
			{
				question: "4. Which Chief Justice is most closely associated with expanding the power of the federal government during this era?",
				options: [
					"A) Roger Taney",
					"B) Samuel Chase",
					"C) John Jay",
					"D) John Marshall"
				],
				answer: 3,
				explanation: "John Marshall, as Chief Justice, issued decisions that strengthened the federal government and the judiciary."
			}
		]
	},
	{
		stimulus: "Excerpt on the Louisiana Purchase (1803)",
		text: "“The purchase of Louisiana from France … will double the territory of the United States, offering land for expansion and settlement. Yet, it raises constitutional concerns among those with strict interpretations.”",
		questions: [
			{
				question: "5. Why did Jefferson struggle with the decision to purchase Louisiana?",
				options: [
					"A) He believed France would not sell it.",
					"B) He thought Britain would go to war over it.",
					"C) He was unsure if the Constitution allowed the federal government to acquire land.",
					"D) He feared it would lead to a slave rebellion."
				],
				answer: 2,
				explanation: "Jefferson was a strict constructionist and doubted whether the Constitution gave the president power to buy land."
			},
			{
				question: "6. What was one major result of the Louisiana Purchase?",
				options: [
					"A) It led directly to war with Britain.",
					"B) It provided land for Native American tribes to settle.",
					"C) It doubled the size of the United States.",
					"D) It abolished slavery in new territories."
				],
				answer: 2,
				explanation: "The Louisiana Purchase doubled the size of the U.S., opening vast new lands for settlement."
			}
		]
	},
	{
		stimulus: "Henry Clay's American System",
		text: "“Let us bind the Union together through federally-funded roads, tariffs to support our industry, and a national bank to stabilize our currency.”",
		questions: [
			{
				question: "7. The purpose of Henry Clay’s American System was to:",
				options: [
					"A) Expand slavery westward",
					"B) Unite the national economy",
					"C) Promote free trade",
					"D) Eliminate federal influence"
				],
				answer: 1,
				explanation: "The American System aimed to unify the national economy through tariffs, a national bank, and internal improvements."
			},
			{
				question: "8. Which region opposed tariffs and internal improvements the most during this period?",
				options: [
					"A) Northeast",
					"B) South",
					"C) West",
					"D) Mid-Atlantic"
				],
				answer: 1,
				explanation: "The South opposed tariffs and federal spending on infrastructure, fearing economic harm to their agricultural exports."
			}
		]
	},
	{
		stimulus: "South Carolina Ordinance of Nullification (1832)",
		text: "“We hold these tariffs to be unconstitutional … and the state of South Carolina declares these laws null and void within our boundaries.”",
		questions: [
			{
				question: "9. What constitutional principle was South Carolina using to justify this action?",
				options: [
					"A) Judicial supremacy",
					"B) Elastic clause",
					"C) State sovereignty",
					"D) Separation of powers"
				],
				answer: 2,
				explanation: "South Carolina claimed the right of state sovereignty and nullification to reject federal laws they deemed unconstitutional."
			},
			{
				question: "10. What was President Jackson’s response to South Carolina’s actions during the Nullification Crisis?",
				options: [
					"A) He supported their right to nullify.",
					"B) He ignored the crisis.",
					"C) He passed the Force Bill to assert federal authority.",
					"D) He repealed the tariffs immediately."
				],
				answer: 2,
				explanation: "Jackson responded forcefully, passing the Force Bill to assert federal authority and enforce tariff laws."
			}
		]
	}
];

// Flatten questions for navigation, but keep group info for rendering
const allQuestions: FlatUnit4QuizQuestion[] = unit4QuizGroups.reduce((acc: FlatUnit4QuizQuestion[], group) => {
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

const APUSHUnit4Quiz: React.FC = () => {
	const [current, setCurrent] = useState(0);
	const [selected, setSelected] = useState<number | null>(null);
	const [answers, setAnswers] = useState<(number | null)[]>(Array(allQuestions.length).fill(null));
	const [submitted, setSubmitted] = useState(false);
	const [crossedOut, setCrossedOut] = useState<number[][]>(Array(allQuestions.length).fill(null).map(() => []));
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
		navigate('/apush-study-guide/unit/4');
	};

	const handleBack = () => {
		if (current > 0) {
			setCurrent((prev) => prev - 1);
			setSelected(answers[current - 1]);
		}
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
			className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
			onClick={handleGoBack}
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
						<div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
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
							<div className="mt-4 p-4 bg-blue-50 rounded-lg">
								<h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
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

	// Always show the current group's stimulus and text
	// Find the group for the current question
	let groupIdx = 0, qIdx = current, count = 0;
	for (let i = 0; i < unit4QuizGroups.length; i++) {
		const group = unit4QuizGroups[i];
		if (qIdx < group.questions.length) {
			groupIdx = i;
			break;
		} else {
			qIdx -= group.questions.length;
		}
	}
	const group = unit4QuizGroups[groupIdx];
	const q = group.questions[qIdx];

	return (
		<div className="max-w-2xl mx-auto py-12 px-4 relative">
			{BackToGuideButton}
			<div style={{ height: 48 }} /> {/* Add vertical space below the button */}
			<div className="mb-8">
				{/* Always show the stimulus box for the group */}
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
									selected === idx ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-slate-800'
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

export default APUSHUnit4Quiz;
