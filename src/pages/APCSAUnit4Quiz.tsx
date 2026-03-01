import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Original stimuli with multiple questions per stimulus group
const unit4QuizQuestions = [
	{
		id: 1,
		stimulus: 'while Loop Analysis',
		text: 'Consider the following Java code segment:\n\nint x = 10;\nint count = 0;\nwhile (x > 0) {\n    count++;\n    x -= 2;\n}\nSystem.out.println(count);',
		questions: [
			{
				question: "What is the output of this code?",
				options: [
					'A) 4',
					'B) 5',
					'C) 6',
					'D) 10'
				],
				answer: 1,
				explanation: "The loop runs while x > 0. Starting with x=10, it decrements by 2 each time: x=10→8→6→4→2→0. The loop executes 5 times, so count=5."
			},
			{
				question: "If the initial value of x were changed to 11, what would be the output?",
				options: [
					'A) 5',
					'B) 6',
					'C) 7',
					'D) 11'
				],
				answer: 1,
				explanation: "With x=11, the sequence is: x=11→9→7→5→3→1→-1. The loop runs 6 times because it continues while x > 0, and stops when x becomes -1."
			}
		]
	},
	{
		id: 2,
		stimulus: 'for Loop and String Processing',
		text: 'Consider the following code segment:\n\nString word = "HELLO";\nint vowelCount = 0;\nfor (int i = 0; i < word.length(); i++) {\n    char ch = word.charAt(i);\n    if (ch == \'A\' || ch == \'E\' || ch == \'I\' || ch == \'O\' || ch == \'U\') {\n        vowelCount++;\n    }\n}\nSystem.out.println(vowelCount);',
		questions: [
			{
				question: "What is the output of this code?",
				options: [
					'A) 1',
					'B) 2',
					'C) 3',
					'D) 4'
				],
				answer: 1,
				explanation: "The code counts uppercase vowels in 'HELLO'. The characters are H-E-L-L-O. Only 'E' and 'O' are vowels, so vowelCount = 2."
			},
			{
				question: "How many times does the for loop execute?",
				options: [
					'A) 4',
					'B) 5',
					'C) 6',
					'D) Depends on the number of vowels'
				],
				answer: 1,
				explanation: "The for loop executes word.length() times. Since 'HELLO' has 5 characters, the loop executes exactly 5 times, regardless of vowel count."
			}
		]
	},
	{
		id: 3,
		stimulus: "Nested Loop Pattern",
		text: "Consider the following nested loop structure:\n\nfor (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= 2; j++) {\n        System.out.print(i + \", \" + j + \" \");\n    }\n    System.out.println();\n}",
		questions: [
			{
				question: "How many times does the inner loop execute in total?",
				options: [
					'A) 2',
					'B) 3',
					'C) 5',
					'D) 6'
				],
				answer: 3,
				explanation: "The outer loop runs 3 times, and for each iteration, the inner loop runs 2 times. Total inner loop executions = 3 × 2 = 6."
			},
			{
				question: "What is printed on the first line of output?",
				options: [
					'A) 1, 1 1, 2',
					'B) 1, 1 2, 1',
					'C) 1, 2 1, 1',
					'D) 2, 1 1, 1'
				],
				answer: 0,
				explanation: "In the first iteration of the outer loop (i=1), the inner loop runs twice: first with j=1 printing '1, 1 ', then with j=2 printing '1, 2 '. So the first line is '1, 1 1, 2 '."
			},
			{
				question: "How many lines of output will this code produce?",
				options: [
					'A) 2',
					'B) 3',
					'C) 5',
					'D) 6'
				],
				answer: 1,
				explanation: "The outer loop runs 3 times, and each iteration ends with System.out.println(), which creates a new line. Therefore, 3 lines of output are produced."
			}
		]
	},
	{
		id: 4,
		stimulus: 'Algorithm Analysis and Efficiency',
		text: 'Consider these two code segments that accomplish the same task:\n\nSegment A:\nString result = "";\nfor (int i = 0; i < n; i++) {\n    result += "x";\n}\n\nSegment B:\nStringBuilder sb = new StringBuilder();\nfor (int i = 0; i < n; i++) {\n    sb.append("x");\n}\nString result = sb.toString();',
		questions: [
			{
				question: "What is the time complexity of Segment A?",
				options: [
					'A) O(1) - Constant time',
					'B) O(n) - Linear time',
					'C) O(n²) - Quadratic time',
					'D) O(log n) - Logarithmic time'
				],
				answer: 2,
				explanation: "Segment A has O(n²) time complexity because string concatenation creates new string objects each time. With each iteration, it must copy all previous characters plus the new one, resulting in quadratic growth."
			},
			{
				question: "What is the time complexity of Segment B?",
				options: [
					'A) O(1) - Constant time',
					'B) O(n) - Linear time',
					'C) O(n²) - Quadratic time',
					'D) O(log n) - Logarithmic time'
				],
				answer: 1,
				explanation: "Segment B has O(n) time complexity because StringBuilder.append() operates in constant time by maintaining a resizable buffer. The total time grows linearly with n."
			},
			{
				question: "Which approach is more efficient for large values of n?",
				options: [
					'A) Segment A is more efficient',
					'B) Segment B is more efficient',
					'C) They have the same efficiency',
					'D) Efficiency depends on the specific value of n'
				],
				answer: 1,
				explanation: "Segment B (StringBuilder) is much more efficient for large values of n because it has linear O(n) complexity compared to Segment A's quadratic O(n²) complexity."
			}
		]
	}
];

// Flatten questions to yield 10 questions. Each question entry will include its full stimulus and text.
const allQuestions = unit4QuizQuestions.reduce((acc: any[], group) => {
	group.questions.forEach((q) => {
		acc.push({
			stimulus: group.stimulus,
			text: group.text,
			...q
		});
	});
	return acc;
}, []);

const APCSAUnit4Quiz: React.FC = () => {
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
							onClick={() => navigate('/apcsa-study-guide/unit/4')}
							className="w-full py-3 bg-slate-600 text-white rounded-lg font-semibold hover:bg-slate-700 transition-colors"
						>
							Back to Unit 4
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
						onClick={() => navigate('/apcsa-study-guide/unit/4')}
						className="mb-4 px-4 py-2 rounded-lg bg-white text-orange-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2 mx-auto"
					>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
						</svg>
						Back to Unit 4
					</button>
					<h1 className="text-4xl font-bold text-orange-800">AP CSA Unit 4 Quiz: Iteration</h1>
					<p className="text-lg text-slate-600 mt-2">Test your understanding of loops, iteration, and algorithm analysis.</p>
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

export default APCSAUnit4Quiz;
