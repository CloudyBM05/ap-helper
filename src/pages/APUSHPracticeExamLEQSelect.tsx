import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const leqSets = [
	{ id: 1, label: 'APUSH 2025 - LEQ Set 1', route: '/apush-practice-exam/leq/1', description: 'Focuses on the debates over the role of government in the economy.' },
	{ id: 2, label: 'APUSH 2025 - LEQ Set 2', route: '/apush-practice-exam/leq/2', description: 'Examines the effects of westward expansion on American society.' },
];

const questions = [
	{ id: 2, label: 'Question 2' },
	{ id: 3, label: 'Question 3' },
	{ id: 4, label: 'Question 4' },
];

const APUSHPracticeExamLEQSelect: React.FC = () => {
	const navigate = useNavigate();
	const [selectedSet, setSelectedSet] = useState<number | null>(null);

	const handleSetClick = (set: { id: number; label: string; route: string }) => {
		setSelectedSet(set.id);
	};

	const handleQuestionClick = (questionId: number) => {
		if (selectedSet) {
			const set = leqSets.find(s => s.id === selectedSet);
			if (set) {
				navigate(`${set.route}/${questionId}`);
			}
		}
	};

	const handleBackToPracticeExams = () => {
		navigate('/practice-exams');
	};

	if (selectedSet) {
		const set = leqSets.find(s => s.id === selectedSet);
		return (
			<div className='min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center'>
				<div className='w-full max-w-xl mx-auto flex flex-col items-center justify-center'>
					<h1 className='text-3xl font-bold mb-8 text-center w-full text-blue-700'>
						Select a Question for {set?.label}
					</h1>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
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
						onClick={() => setSelectedSet(null)}
						className='mt-8 text-blue-600 hover:underline'
					>
						Back to LEQ set selection
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
					Select APUSH LEQ Exam Set
				</h1>
				<div className='grid grid-cols-1 gap-6 w-full'>
					{leqSets.map((set) => (
						<button
							key={set.id}
							onClick={() => handleSetClick(set)}
							className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-blue-100 hover:border-blue-400 hover:shadow-xl'
						>
							<span className='text-2xl font-bold mb-2 text-blue-700'>
								{set.label}
							</span>
							<span className='text-slate-500 text-sm mb-1'>{set.description}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default APUSHPracticeExamLEQSelect;
