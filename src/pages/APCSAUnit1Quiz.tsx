import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Original stimuli with multiple questions per stimulus group
const unit1QuizQuestions = [
	{
		id: 1,
		stimulus: 'Code Segment Analysis - Variable Declaration and Operations',
		text: 'Consider the following Java code segment:\n\nint x = 7;\nint y = 2;\ndouble z = x / y;\nSystem.out.println(z);',
		questions: [
			{
				question: "What is the output of this code?",
				options: [
					'A) 3.5',
					'B) 3.0',
					'C) 3',
					'D) Compilation error'
				],
				answer: 1,
				explanation: "Since both x and y are integers, the division x / y performs integer division, resulting in 3. Even though z is a double, the result of the integer division (3) is then converted to 3.0 when assigned to z."
			},
			{
				question: "To make this code output 3.5, which change would be most appropriate?",
				options: [
					'A) Change z to an int variable',
					'B) Cast the result: double z = (double)(x / y);',
					'C) Change the calculation: double z = (double)x / y;',
					'D) Use modulo instead: double z = x % y;'
				],
				answer: 2,
				explanation: "By casting x to double before division, the operation becomes floating-point division: (double)x / y makes 7.0 / 2, which equals 3.5."
			}
		]
	},
	{
		id: 2,
		stimulus: 'String Methods and Object Behavior',
		text: 'Consider the following code that demonstrates String methods:\n\nString s = "COMPUTER";\nSystem.out.println(s.substring(2, 5));\nSystem.out.println(s.length());\nSystem.out.println(s.equals("computer"));',
		questions: [
			{
				question: "What does s.substring(2, 5) return?",
				options: [
					'A) "COM"',
					'B) "MPU"',
					'C) "MPUT"',
					'D) "PUT"'
				],
				answer: 1,
				explanation: "substring(2, 5) extracts characters from index 2 up to but not including index 5. In 'COMPUTER', indices 2, 3, 4 are 'M', 'P', 'U', so it returns 'MPU'."
			},
			{
				question: "What does s.equals('computer') return and why?",
				options: [
					'A) true, because Java ignores case in string comparison',
					'B) false, because the equals method is case-sensitive',
					'C) Compilation error, because equals expects an object parameter',
					'D) true, because both contain the same letters'
				],
				answer: 1,
				explanation: "The equals method in Java is case-sensitive. 'COMPUTER' and 'computer' have the same letters but different cases, so equals returns false."
			}
		]
	},
	{
		id: 3,
		stimulus: "Math Class and Random Number Generation",
		text: "Consider code using the Math class for calculations and random number generation:\n\ndouble value = Math.sqrt(16);\nint random1 = (int)(Math.random() * 10);\nint random2 = (int)(Math.random() * 5) + 1;",
		questions: [
			{
				question: "What range of values can random1 produce?",
				options: [
					'A) 1 to 10 inclusive',
					'B) 0 to 10 inclusive',
					'C) 0 to 9 inclusive',
					'D) 1 to 9 inclusive'
				],
				answer: 2,
				explanation: "Math.random() produces values from 0.0 (inclusive) to 1.0 (exclusive). Multiplying by 10 gives 0.0 to 9.999..., and casting to int truncates to 0-9 inclusive."
			},
			{
				question: "What range of values can random2 produce?",
				options: [
					'A) 0 to 5 inclusive',
					'B) 1 to 5 inclusive',
					'C) 1 to 6 inclusive',
					'D) 0 to 6 inclusive'
				],
				answer: 1,
				explanation: "(int)(Math.random() * 5) produces 0-4, then adding 1 shifts the range to 1-5 inclusive. This is a common pattern for generating random integers in a specific range."
			}
		]
	},
	{
		id: 4,
		stimulus: 'Compound Assignment Operators and Variable Modification',
		text: 'Examine the following sequence of operations using compound assignment:\n\nint x = 10;\nx += 5;    // Step 1\nx *= 2;    // Step 2\nx %= 7;    // Step 3\nSystem.out.println(x);',
		questions: [
			{
				question: "What is the value of x after Step 1?",
				options: [
					'A) 10',
					'B) 15',
					'C) 5',
					'D) 50'
				],
				answer: 1,
				explanation: "x += 5 is equivalent to x = x + 5. Starting with x = 10, after Step 1: x = 10 + 5 = 15."
			},
			{
				question: "What is the final printed value after Step 3?",
				options: [
					'A) 30',
					'B) 2',
					'C) 7',
					'D) 0'
				],
				answer: 1,
				explanation: "After Step 1: x = 15. After Step 2: x *= 2 makes x = 30. After Step 3: x %= 7 gives remainder when 30 is divided by 7, which is 2 (30 = 4*7 + 2)."
			}
		]
	},
	{
		id: 5,
		stimulus: 'Method Calls and Parameter Matching',
		text: 'Consider the following method definition and potential method calls:\n\npublic static void printSum(int a, int b) {\n    System.out.println(a + b);\n}',
		questions: [
			{
				question: "Which of the following is a valid method call?",
				options: [
					'A) printSum(2);',
					'B) printSum(2, 3);',
					'C) printSum(2.0, 3.0);',
					'D) int x = printSum(2, 3);'
				],
				answer: 1,
				explanation: "printSum(2, 3); is correct because it provides exactly two integer arguments as required by the method signature. The other options have wrong number of parameters, wrong types, or try to assign a void return."
			},
			{
				question: "What is true about void methods?",
				options: [
					'A) They always return an integer',
					'B) They cannot have parameters',
					'C) They perform actions but don\'t return values',
					'D) They must use the return keyword'
				],
				answer: 2,
				explanation: "Void methods perform actions (like printing) but do not return any value. They can have parameters and do not need a return statement unless exiting early."
			}
		]
	}
];

// Flatten questions to yield multiple questions. Each question entry will include its full stimulus and text.
const allQuestions = unit1QuizQuestions.reduce((acc: any[], group) => {
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

// Now allQuestions is a flattened array of questions.
const APCSAUnit1Quiz: React.FC = () => {
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
		navigate('/apcsa-study-guide/unit/1');
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
			className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-orange-700 shadow transition flex items-center gap-2 z-20"
			onClick={() => navigate('/apcsa-study-guide/unit/1')}
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
							<div className="mb-2 bg-orange-50 border-l-4 border-orange-400 p-4 rounded">
								<div className="font-semibold text-orange-800 mb-1">{q.stimulus}</div>
								<div className="text-slate-700 whitespace-pre-line">{q.text}</div>
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
							<div className="mt-4 p-4 bg-orange-50 rounded-lg">
								<h4 className="font-semibold text-orange-900 mb-2">Explanation:</h4>
								<p className="text-orange-800">{q.explanation}</p>
							</div>
						</div>
					);
				})}
				<div className="flex justify-center mt-8">
					<button
						className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
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

	const q = allQuestions[current];

	return (
		<div className="max-w-2xl mx-auto py-12 px-4 relative">
			{BackToGuideButton}
			<div style={{ height: 48 }} /> {/* Add vertical space below the button */}
			<div className="mb-8">
				{/* Always show the stimulus box */}
				<div className="mb-4">
					<div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-t-lg">
						<div className="font-semibold text-orange-800 mb-1">{q.stimulus}</div>
						<div className="text-slate-700 whitespace-pre-line">{q.text}</div>
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
									selected === idx ? 'bg-orange-500 text-white border-orange-600' : 'bg-white text-slate-800'
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
						className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
						onClick={handleNext}
						disabled={selected === null}
					>
						Next
					</button>
				) : (
					<button
						className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300"
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

export default APCSAUnit1Quiz;
