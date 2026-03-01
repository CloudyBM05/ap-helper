import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Original stimuli with multiple questions per stimulus group
const unit3QuizQuestions = [
	{
		id: 1,
		stimulus: 'Boolean Expression Analysis',
		text: 'Consider the following Java code segment:\n\nint x = 15;\nint y = 20;\nboolean result1 = x > 10 && y < 25;\nboolean result2 = x == 15 || y > 30;\nboolean result3 = !(x < y);\nSystem.out.println(result1);\nSystem.out.println(result2);\nSystem.out.println(result3);',
		questions: [
			{
				question: "What is the value of result1?",
				options: [
					'A) true',
					'B) false',
					'C) Compilation error',
					'D) Runtime error'
				],
				answer: 0,
				explanation: "result1 = x > 10 && y < 25 evaluates to 15 > 10 && 20 < 25, which is true && true, resulting in true."
			},
			{
				question: "What is the value of result2?",
				options: [
					'A) true',
					'B) false',
					'C) Compilation error',
					'D) Runtime error'
				],
				answer: 0,
				explanation: "result2 = x == 15 || y > 30 evaluates to 15 == 15 || 20 > 30, which is true || false, resulting in true. Due to short-circuit evaluation, once the first condition is true, the result is true."
			},
			{
				question: "What is the value of result3?",
				options: [
					'A) true',
					'B) false',
					'C) Compilation error',
					'D) Runtime error'
				],
				answer: 1,
				explanation: "result3 = !(x < y) evaluates to !(15 < 20), which is !(true), resulting in false. The NOT operator reverses the boolean value."
			}
		]
	},
	{
		id: 2,
		stimulus: 'Conditional Statement Flow',
		text: 'Consider the following code that processes a student grade:\n\nint score = 75;\nString grade;\nif (score >= 90) {\n    grade = "A";\n} else if (score >= 80) {\n    grade = "B";\n} else if (score >= 70) {\n    grade = "C";\n} else {\n    grade = "F";\n}\nSystem.out.println(grade);',
		questions: [
			{
				question: "What is the output of this code?",
				options: [
					'A) A',
					'B) B',
					'C) C',
					'D) F'
				],
				answer: 2,
				explanation: "With score = 75, the conditions are evaluated top-down: 75 >= 90 is false, 75 >= 80 is false, but 75 >= 70 is true. So grade = 'C' is executed, and 'C' is printed."
			},
			{
				question: "If the score were changed to 85, what would be the output?",
				options: [
					'A) A',
					'B) B',
					'C) C',
					'D) F'
				],
				answer: 1,
				explanation: "With score = 85, the first condition (85 >= 90) is false, but the second condition (85 >= 80) is true. So grade = 'B' is executed, and the remaining conditions are skipped."
			}
		]
	},
	{
		id: 3,
		stimulus: "String Comparison and Object Equality",
		text: "Consider the following code segment:\n\nString str1 = 'Hello';\nString str2 = new String('Hello');\nString str3 = 'Hello';\nboolean test1 = str1 == str2;\nboolean test2 = str1.equals(str2);\nboolean test3 = str1 == str3;\nif (test1) {\n    System.out.println('Reference equal');\n}\nif (test2) {\n    System.out.println('Content equal');\n}",
		questions: [
			{
				question: "What is the value of test1?",
				options: [
					'A) true',
					'B) false',
					'C) Compilation error',
					'D) Runtime error'
				],
				answer: 1,
				explanation: "test1 = str1 == str2 compares references. str1 refers to a string literal in the string pool, while str2 refers to a new String object in heap memory. Different references result in false."
			},
			{
				question: "What is the value of test2?",
				options: [
					'A) true',
					'B) false',
					'C) Compilation error',
					'D) Runtime error'
				],
				answer: 0,
				explanation: "test2 = str1.equals(str2) compares content. Both str1 and str2 contain the string 'Hello', so the equals method returns true."
			},
			{
				question: "What output will this code produce?",
				options: [
					'A) Reference equal',
					'B) Content equal',
					'C) Both lines of output',
					'D) No output'
				],
				answer: 1,
				explanation: "Only test2 is true, so only the second if statement executes, printing 'Content equal'. The first if statement doesn't execute because test1 is false."
			}
		]
	},
	{
		id: 4,
		stimulus: 'De Morgan\'s Law and Boolean Algebra',
		text: 'Consider the following boolean expressions:\n\nint a = 5, b = 10, c = 15;\nboolean expr1 = !(a > b || c < a);\nboolean expr2 = (a <= b && c >= a);\nboolean expr3 = !(a > 3 && b < 20);\nboolean expr4 = (a <= 3 || b >= 20);',
		questions: [
			{
				question: "What is the value of expr1?",
				options: [
					'A) true',
					'B) false',
					'C) Compilation error',
					'D) Cannot be determined'
				],
				answer: 0,
				explanation: "expr1 = !(a > b || c < a) = !(5 > 10 || 15 < 5) = !(false || false) = !(false) = true."
			},
			{
				question: "Which expression is equivalent to expr1 using De Morgan's Law?",
				options: [
					'A) (a > b && c < a)',
					'B) (a <= b && c >= a)',
					'C) (a <= b || c >= a)',
					'D) (a > b || c < a)'
				],
				answer: 1,
				explanation: "Using De Morgan's Law, !(a > b || c < a) becomes (!(a > b) && !(c < a)), which simplifies to (a <= b && c >= a). This is expr2."
			},
			{
				question: "Are expr3 and expr4 equivalent?",
				options: [
					'A) Yes, they are equivalent',
					'B) No, they are not equivalent',
					'C) Cannot be determined',
					'D) Only when all variables are positive'
				],
				answer: 0,
				explanation: "expr3 = !(a > 3 && b < 20) and expr4 = (a <= 3 || b >= 20). Using De Morgan's Law, expr3 becomes (!(a > 3) || !(b < 20)) = (a <= 3 || b >= 20), which is exactly expr4."
			}
		]
	}
];

// Flatten questions to yield 10 questions. Each question entry will include its full stimulus and text.
const allQuestions = unit3QuizQuestions.reduce((acc: any[], group) => {
	group.questions.forEach((q) => {
		acc.push({
			stimulus: group.stimulus,
			text: group.text,
			...q
		});
	});
	return acc;
}, []);

const APCSAUnit3Quiz: React.FC = () => {
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
							onClick={() => navigate('/apcsa-study-guide/unit/3')}
							className="w-full py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
						>
							Back to Unit 3
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
						onClick={() => navigate('/apcsa-study-guide/unit/3')}
						className="mb-4 px-4 py-2 rounded-lg bg-white text-orange-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2 mx-auto"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
						</svg>
						Back to Unit 3
					</button>
					<h1 className="text-4xl font-bold text-orange-800">AP CSA Unit 3 Quiz: Boolean Expressions and if Statements</h1>
					<p className="text-lg text-slate-600 mt-2">Test your understanding of conditional logic and boolean expressions.</p>
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

export default APCSAUnit3Quiz;
