import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const saqYears = [
	{ year: 2025, label: 'AP Exam 2025 - Set 1', implemented: true, route: '/apush-practice-exam/saq/2025' },
	{ year: 20252, label: 'AP Exam 2025 - Set 2', implemented: true, route: '/apush-practice-exam/saq/2025-set-2' },
];

const questions = [
	{ id: 1, label: 'Question 1' },
	{ id: 2, label: 'Question 2' },
	{ id: 3, label: 'Question 3' },
	{ id: 4, label: 'Question 4' },
];

const APUSHPracticeExamSAQSelect = () => {
	const navigate = useNavigate();
	const [selectedYear, setSelectedYear] = useState<number | null>(null);

	const handleBackToPracticeExams = () => {
		navigate('/practice-exams');
	};

	const handleYearClick = (exam: {
		year: number;
		implemented: boolean;
		label: string;
	}) => {
		if (exam.implemented) {
			setSelectedYear(exam.year);
		}
	};

	const handleQuestionClick = (questionId: number) => {
		if (selectedYear) {
			const exam = saqYears.find(e => e.year === selectedYear);
			if (exam) {
				navigate(`${exam.route}/${questionId}`);
			}
		}
	};

	if (selectedYear) {
		const exam = saqYears.find(e => e.year === selectedYear);
		return (
			<div className='min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center'>
				<div className='w-full max-w-xl mx-auto flex flex-col items-center justify-center'>
					<h1 className='text-3xl font-bold mb-8 text-center w-full'>
						Select a Question for {exam?.label}
					</h1>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
						{questions.map((question) => (
							<button
								key={question.id}
								onClick={() => handleQuestionClick(question.id)}
								className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-blue-100 hover:border-blue-400 hover:shadow-xl'
							>
								<span className='text-2xl font-bold mb-2 text-blue-700'>
									{question.label}
								</span>
							</button>
						))}
					</div>
					<button
						onClick={() => setSelectedYear(null)}
						className='mt-8 text-blue-600 hover:underline'
					>
						Back to exam selection
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center'>
			<div className='w-full max-w-xl mx-auto flex flex-col items-center justify-center'>
				<button
					onClick={handleBackToPracticeExams}
					className='mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition self-start'
				>
					&larr; Back to Practice Exams
				</button>
				<h1 className='text-3xl font-bold mb-8 text-center w-full text-blue-700'>
					Select APUSH SAQ Exam
				</h1>
				<div className='grid grid-cols-1 gap-6 w-full'>
					{saqYears.map((exam) => (
						<button
							key={exam.year}
							onClick={() => handleYearClick(exam)}
							className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 ${
								exam.implemented
									? 'border-blue-100 hover:border-blue-400 hover:shadow-xl'
									: 'border-gray-100'
							}`}
							disabled={!exam.implemented}
						>
							<span
								className={`text-2xl font-bold mb-2 ${
									exam.implemented
										? 'text-blue-700'
										: 'text-gray-400'
								}`}
							>
								{exam.label}
							</span>
							<span
								className={`${exam.implemented ? 'text-slate-600' : 'text-gray-400'}`}
							>
								Official APUSH SAQ from {exam.year}
							</span>
							{!exam.implemented && (
								<span className='text-xs text-red-500 mt-2'>
									Coming Soon!
								</span>
							)}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default APUSHPracticeExamSAQSelect;