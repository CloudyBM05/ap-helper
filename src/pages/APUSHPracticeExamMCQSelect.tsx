import React from 'react';
import { useNavigate } from 'react-router-dom';

const examYears = [
	{ year: 2014, label: 'AP Exam 2014' },
	{ year: 2015, label: 'AP Exam 2015' },
	{ year: 2016, label: 'AP Exam 2016' },
	{ year: 2017, label: 'AP Exam 2017' },
	{ year: 2018, label: 'AP Exam 2018' },
	// Additional exam years can be added here in the future
];

const APUSHPracticeExamMCQSelect = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
			<div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
				<button
					onClick={() => navigate(-1)}
					className="mb-8 px-4 py-2 text-blue-600 hover:text-blue-800 flex items-center gap-2"
				>
					← Back
				</button>
				<h1 className="text-3xl font-bold mb-8 text-center w-full">Select APUSH MCQ Exam</h1>
				<div className="grid grid-cols-1 gap-6 w-full">
					{examYears.map((exam) => (
						<button
							key={exam.year}
							onClick={() => {
								if (exam.year === 2014) {
									navigate('/apush-practice-exam/mcq/2014');
								} else {
									alert('Only 2014 is implemented. Add routes/components for other years.');
								}
							}}
							className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-400"
						>
							<span className="text-2xl font-bold text-blue-700 mb-2">{exam.label}</span>
							<span className="text-slate-600">Official APUSH MCQ from {exam.year}</span>
						</button>
					))}
				</div>
				{/* In the future, expand examYears array with additional test options */}
			</div>
		</div>
	);
};

export default APUSHPracticeExamMCQSelect;
