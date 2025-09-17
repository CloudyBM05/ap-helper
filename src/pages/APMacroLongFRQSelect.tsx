import React from 'react';
import { useNavigate } from 'react-router-dom';

const frqSets = [
	{
		id: 'set1',
		label: '2025 AP Macro Long FRQ Set 1',
		description:
			'Official AP Macroeconomics Long FRQ, 2025, Set 1. Practice with real exam-style free response questions. Written parts are AI-graded.',
	},
];

const APMacroLongFRQSelect = () => {
	const navigate = useNavigate();

	return (
		<div className='min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center'>
			<div className='w-full max-w-xl mx-auto flex flex-col items-center justify-center'>
				<button
					onClick={() => navigate('/practice-exams')}
					className='mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition self-start'
				>
					&larr; Back to Practice Exams
				</button>
				<h1 className='text-3xl font-bold mb-8 text-center w-full text-blue-800'>
					Select AP Macroeconomics Long FRQ Set
				</h1>
				<div className='grid grid-cols-1 gap-6 w-full'>
					{frqSets.map((set) => (
						<button
							key={set.id}
							onClick={() =>
								navigate(
									`/ap-macroeconomics-practice-exam/long-frq/${set.id}`
								)
							}
							className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-blue-100 hover:border-cyan-400 hover:shadow-xl w-full'
						>
							<span className='text-2xl font-bold mb-2 text-blue-700'>
								{set.label}
							</span>
							<span className='text-slate-600'>{set.description}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default APMacroLongFRQSelect;
