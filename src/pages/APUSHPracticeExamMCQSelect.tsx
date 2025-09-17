import React from 'react';
import { useNavigate } from 'react-router-dom';

const exams = [
	{ id: '2015', label: 'AP Exam 2015', description: 'Official APUSH MCQ from 2015', implemented: true },
	{ id: 'ap-helper', label: 'AP-Helper Original', description: 'A custom exam created by AP-Helper.', implemented: true },
	{ id: 'marco-apush', label: 'Marco-APUSH Exam', description: 'Due to copyright, we cannot host the PDF. We provide a link and a scantron.', implemented: true },
	{ id: 'princeton', label: 'Princeton Review Exam', description: 'A 55-question exam from the Princeton Review.', implemented: true },
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
					{exams.map((exam) => (
						<button
							key={exam.id}
							onClick={() => {
								if (exam.implemented) {
									navigate(`/apush-practice-exam/mcq/${exam.id}`);
								} else {
									alert(`${exam.label} is not implemented yet.`);
								}
							}}
							className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 ${exam.implemented ? 'border-blue-100 hover:border-blue-400 hover:shadow-xl' : 'border-gray-100'}`}
							disabled={!exam.implemented}
						>
							<span className={`text-2xl font-bold mb-2 ${exam.implemented ? 'text-blue-700' : 'text-gray-400'}`}>{exam.label}</span>
							<span className={`${exam.implemented ? 'text-slate-600' : 'text-gray-400'}`}>{exam.description}</span>
							{!exam.implemented && <span className="text-xs text-red-500 mt-2">Coming Soon!</span>}
						</button>
					))}
				</div>
				{/* In the future, expand exams array with additional test options */}
			</div>
		</div>
	);
};

export default APUSHPracticeExamMCQSelect;
