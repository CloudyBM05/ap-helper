import React from 'react';
import { useNavigate } from 'react-router-dom';

const saqYears = [
	{ year: 2017, label: 'AP Exam 2017' },
	{ year: 2018, label: 'AP Exam 2018' },
	{ year: 2019, label: 'AP Exam 2019' },
	{ year: 2020, label: 'AP Exam 2020' },
	{ year: 2021, label: 'AP Exam 2021' },
	{ year: 2022, label: 'AP Exam 2022' },
	{ year: 2023, label: 'AP Exam 2023' },
	{ year: 2024, label: 'AP Exam 2024' },
	{ year: 2025, label: 'AP Exam 2025' },
];

const APUSHPracticeExamSAQSelect = () => {
	const navigate = useNavigate();
	// Debug: show this in the console to confirm the component is rendering
	console.log('APUSHPracticeExamSAQSelect component rendered');

	return (
		<div className='min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center'>
			<div className='w-full max-w-xl mx-auto flex flex-col items-center justify-center'>
				<h1 className='text-3xl font-bold mb-8 text-center w-full'>
					Select APUSH SAQ Exam
				</h1>
				<div className='grid grid-cols-1 gap-6 w-full'>
					{saqYears.map((exam) => (
						<button
							key={exam.year}
							onClick={() => {
								if (exam.year === 2025) {
									navigate(`/apush-practice-exam/saq/2025`);
								} else {
									alert(
										'Only 2025 SAQ is currently available. More years coming soon!'
									);
								}
							}}
							className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-400'
						>
							<span className='text-2xl font-bold text-blue-700 mb-2'>
								{exam.label}
							</span>
							<span className='text-slate-600'>
								Official APUSH SAQ from {exam.year}
							</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default APUSHPracticeExamSAQSelect;