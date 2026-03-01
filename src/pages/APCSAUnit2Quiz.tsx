import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Original stimuli with multiple questions per stimulus group
const unit2QuizQuestions = [
	{
		id: 1,
		stimulus: 'Object Creation and Method Calls',
		text: 'Consider the following Java code segment:\n\nString word = new String("PROGRAMMING");\nint len = word.length();\nString part = word.substring(3, 7);\nSystem.out.println(part);',
		questions: [
			{
				question: "What is the output of this code?",
				options: [
					'A) GRAM',
					'B) PROG',
					'C) RAMM',
					'D) OGRAMMING'
				],
				answer: 0,
				explanation: "word.substring(3, 7) extracts characters from index 3 up to (but not including) index 7. In 'PROGRAMMING', indices 3, 4, 5, 6 correspond to 'G', 'R', 'A', 'M', so the output is 'GRAM'."
			},
			{
				question: "What is stored in the variable len?",
				options: [
					'A) 10',
					'B) 11',
					'C) 12',
					'D) The memory address of the string'
				],
				answer: 1,
				explanation: "The length() method returns the number of characters in the string. 'PROGRAMMING' has 11 characters, so len stores 11."
			}
		]
	},
	{
		id: 2,
		stimulus: 'String Methods and Comparison',
		text: 'Consider the following code segment:\n\nString s1 = "Hello";\nString s2 = new String("Hello");\nString s3 = "Hello";\nSystem.out.println(s1 == s2);\nSystem.out.println(s1.equals(s2));\nSystem.out.println(s1 == s3);',
		questions: [
			{
				question: "What is the first output (s1 == s2)?",
				options: [
					'A) true',
					'B) false',
					'C) Compilation error',
					'D) Runtime error'
				],
				answer: 1,
				explanation: "s1 references a string literal in the string pool, while s2 references a new String object in heap memory. The == operator compares references, not content, so it returns false."
			},
			{
				question: "What is the second output (s1.equals(s2))?",
				options: [
					'A) true',
					'B) false',
					'C) Compilation error',
					'D) Runtime error'
				],
				answer: 0,
				explanation: "The equals() method compares the actual content of the strings. Both s1 and s2 contain 'Hello', so equals() returns true."
			},
			{
				question: "What is the third output (s1 == s3)?",
				options: [
					'A) true',
					'B) false',
					'C) Compilation error',
					'D) Runtime error'
				],
				answer: 0,
				explanation: "Both s1 and s3 are string literals with the same value. Java optimizes this by storing identical string literals in the string pool, so both variables reference the same object. Thus == returns true."
			}
		]
	},
	{
		id: 3,
		stimulus: "Math Class Methods and Random Numbers",
		text: "Consider the following code that uses Math class methods:\n\ndouble x = -4.7;\nint result1 = (int)Math.abs(x);\ndouble result2 = Math.pow(3, 2);\nint randomNum = (int)(Math.random() * 10);",
		questions: [
			{
				question: "What is stored in result1?",
				options: [
					'A) -4',
					'B) 4',
					'C) -5',
					'D) 5'
				],
				answer: 1,
				explanation: "Math.abs(-4.7) returns 4.7 (absolute value). Casting to int truncates the decimal, giving us 4."
			},
			{
				question: "What is stored in result2?",
				options: [
					'A) 6',
					'B) 9',
					'C) 9.0',
					'D) Compilation error'
				],
				answer: 2,
				explanation: "Math.pow(3, 2) calculates 3 raised to the power of 2, which is 9. Since pow() returns a double, result2 stores 9.0."
			},
			{
				question: "What range of values can randomNum contain?",
				options: [
					'A) 0 to 9',
					'B) 1 to 10',
					'C) 0 to 10',
					'D) 1 to 9'
				],
				answer: 0,
				explanation: "Math.random() returns a value from 0.0 (inclusive) to 1.0 (exclusive). Multiplying by 10 gives 0.0 to 9.999..., and casting to int truncates, giving us integers from 0 to 9."
			}
		]
	},
	{
		id: 4,
		stimulus: 'Wrapper Classes and Autoboxing',
		text: 'Consider the following code segment that demonstrates wrapper classes:\n\nInteger num1 = 42;\nint num2 = num1;\nDouble decimal = new Double(3.14);\ndouble value = decimal.doubleValue();\nString numStr = "123";\nint converted = Integer.parseInt(numStr);',
		questions: [
			{
				question: "What concept is demonstrated in the line 'Integer num1 = 42;'?",
				options: [
					'A) Unboxing',
					'B) Autoboxing',
					'C) Type casting',
					'D) String conversion'
				],
				answer: 1,
				explanation: "Autoboxing automatically converts the primitive int value 42 to an Integer object. Java handles this conversion automatically."
			},
			{
				question: "What concept is demonstrated in the line 'int num2 = num1;'?",
				options: [
					'A) Unboxing',
					'B) Autoboxing',
					'C) Type casting',
					'D) String conversion'
				],
				answer: 0,
				explanation: "Unboxing automatically converts the Integer object num1 to its primitive int value. Java extracts the int value from the wrapper object automatically."
			},
			{
				question: "What is stored in the variable converted?",
				options: [
					'A) The string "123"',
					'B) The integer 123',
					'C) A compilation error occurs',
					'D) The memory address of the string'
				],
				answer: 1,
				explanation: "Integer.parseInt() converts the string '123' to its integer equivalent 123. This is a common way to convert string representations of numbers to actual numeric values."
			}
		]
	}
];

// Flatten questions to yield 10 questions. Each question entry will include its full stimulus and text.
const allQuestions = unit2QuizQuestions.reduce((acc: any[], group) => {
	group.questions.forEach((q) => {
		acc.push({
			stimulus: group.stimulus,
			text: group.text,
			...q
		});
	});
	return acc;
}, []);

const APCSAUnit2Quiz: React.FC = () => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(allQuestions.length).fill(null));
	const [showExplanations, setShowExplanations] = useState<boolean[]>(new Array(allQuestions.length).fill(false));
	const [isQuizComplete, setIsQuizComplete] = useState(false);
	const navigate = useNavigate();

	const currentQuestion = allQuestions[currentQuestionIndex];

	const handleAnswerSelect = (answerIndex: number) => {
		const newSelectedAnswers = [...selectedAnswers];
		newSelectedAnswers[currentQuestionIndex] = answerIndex;
		setSelectedAnswers(newSelectedAnswers);

		const newShowExplanations = [...showExplanations];
		newShowExplanations[currentQuestionIndex] = true;
		setShowExplanations(newShowExplanations);
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < allQuestions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			setIsQuizComplete(true);
		}
	};

	const handlePrevQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const calculateScore = () => {
		let correct = 0;
		selectedAnswers.forEach((answer, index) => {
			if (answer === allQuestions[index].answer) {
				correct++;
			}
		});
		return correct;
	};

	const getScoreColor = (score: number, total: number) => {
		const percentage = (score / total) * 100;
		if (percentage >= 80) return 'text-green-600';
		if (percentage >= 60) return 'text-yellow-600';
		return 'text-red-600';
	};

	if (isQuizComplete) {
		const score = calculateScore();
		return (
			<div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
				<div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full text-center">
					<div className="text-6xl mb-4">🎉</div>
					<h2 className="text-3xl font-bold text-orange-800 mb-4">Quiz Complete!</h2>
					<div className="text-6xl font-bold mb-2 text-orange-600">{score}/{allQuestions.length}</div>
					<div className={`text-2xl font-semibold mb-6 ${getScoreColor(score, allQuestions.length)}`}>
						{Math.round((score / allQuestions.length) * 100)}%
					</div>
					<div className="space-y-4">
						<button
							onClick={() => {
								setCurrentQuestionIndex(0);
								setSelectedAnswers(new Array(allQuestions.length).fill(null));
								setShowExplanations(new Array(allQuestions.length).fill(false));
								setIsQuizComplete(false);
							}}
							className="w-full py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
						>
							Retake Quiz
						</button>
						<button
							onClick={() => navigate('/apcsa-study-guide/unit/2')}
							className="w-full py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
						>
							Back to Unit 2
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-50 text-slate-800">
			<div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
				{/* Header */}
				<div className="text-center mb-8">
					<button
						onClick={() => navigate('/apcsa-study-guide/unit/2')}
						className="mb-4 px-4 py-2 rounded-lg bg-white text-orange-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2 mx-auto"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
						</svg>
						Back to Unit 2
					</button>
					<h1 className="text-4xl font-bold text-orange-800">AP CSA Unit 2 Quiz: Using Objects</h1>
					<p className="text-lg text-slate-600 mt-2">Test your understanding of objects, methods, and Java classes.</p>
				</div>

				{/* Progress Bar */}
				<div className="mb-8">
					<div className="flex justify-between text-sm text-slate-600 mb-2">
						<span>Question {currentQuestionIndex + 1} of {allQuestions.length}</span>
						<span>{Math.round(((currentQuestionIndex + 1) / allQuestions.length) * 100)}% Complete</span>
					</div>
					<div className="w-full bg-slate-200 rounded-full h-2">
						<div 
							className="bg-orange-600 h-2 rounded-full transition-all duration-300"
							style={{ width: `${((currentQuestionIndex + 1) / allQuestions.length) * 100}%` }}
						></div>
					</div>
				</div>

				{/* Question Card */}
				<div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
					{/* Stimulus */}
					<div className="mb-6 p-4 bg-slate-50 rounded-lg">
						<h3 className="font-semibold text-orange-800 mb-2">{currentQuestion.stimulus}</h3>
						<div className="bg-slate-800 text-green-400 p-4 rounded font-mono text-sm whitespace-pre-line">
							{currentQuestion.text}
						</div>
					</div>

					{/* Question */}
					<h3 className="text-xl font-semibold text-slate-800 mb-4">
						{currentQuestion.question}
					</h3>

					{/* Answer Options */}
					<div className="space-y-3 mb-6">
						{currentQuestion.options.map((option: string, index: number) => {
							const isSelected = selectedAnswers[currentQuestionIndex] === index;
							const isCorrect = index === currentQuestion.answer;
							const showResult = showExplanations[currentQuestionIndex];
							
							let buttonClass = 'w-full p-4 text-left rounded-lg border-2 transition-colors ';
							
							if (showResult) {
								if (isCorrect) {
									buttonClass += 'border-green-500 bg-green-50 text-green-800';
								} else if (isSelected) {
									buttonClass += 'border-red-500 bg-red-50 text-red-800';
								} else {
									buttonClass += 'border-slate-200 bg-slate-50 text-slate-600';
								}
							} else {
								if (isSelected) {
									buttonClass += 'border-orange-500 bg-orange-50 text-orange-800';
								} else {
									buttonClass += 'border-slate-200 hover:border-orange-300 text-slate-700 hover:bg-slate-50';
								}
							}

							return (
								<button
									key={index}
									onClick={() => handleAnswerSelect(index)}
									disabled={showExplanations[currentQuestionIndex]}
									className={buttonClass}
								>
									<div className="flex items-center">
										<span className="font-semibold mr-3">
											{showResult && isCorrect && '✓ '}
											{showResult && isSelected && !isCorrect && '✗ '}
										</span>
										{option}
									</div>
								</button>
							);
						})}
					</div>

					{/* Explanation */}
					{showExplanations[currentQuestionIndex] && (
						<div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
							<h4 className="font-semibold text-orange-800 mb-2">Explanation:</h4>
							<p className="text-orange-700">{currentQuestion.explanation}</p>
						</div>
					)}
				</div>

				{/* Navigation */}
				<div className="flex justify-between">
					<button
						onClick={handlePrevQuestion}
						disabled={currentQuestionIndex === 0}
						className="px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-slate-200 text-slate-700 hover:bg-slate-300 disabled:hover:bg-slate-200"
					>
						Previous
					</button>
					
					{showExplanations[currentQuestionIndex] && (
						<button
							onClick={handleNextQuestion}
							className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
						>
							{currentQuestionIndex === allQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default APCSAUnit2Quiz;
