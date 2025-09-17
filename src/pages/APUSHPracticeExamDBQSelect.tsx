import React from 'react';
import { useNavigate } from 'react-router-dom';

const APUSHPracticeExamDBQSelect: React.FC = () => {
	const navigate = useNavigate();

	const handleSelect = (setId: string) => {
		navigate(`/apush-practice-exam/dbq/${setId}`);
	};

	return (
		<div className='min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center'>
			<div className='w-full max-w-xl mx-auto flex flex-col items-center justify-center'>
				<button
					onClick={() => navigate('/practice-exams')}
					className='mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition self-start'
				>
					&larr; Back to Practice Exam Options
				</button>
				<h1 className='text-3xl font-bold mb-8 text-center w-full text-blue-700'>
					Select APUSH DBQ Set
				</h1>
				<div className='grid grid-cols-1 gap-6 w-full'>
					<button
						className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl'
						onClick={() => handleSelect('1')}
					>
						<span className='text-2xl font-bold mb-2 text-blue-700'>DBQ 2025 Set 1</span>
						<span className='text-slate-500 text-sm mb-1'>Focuses on the debates over the role of government in the economy.</span>
					</button>
					<button
						className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl'
						onClick={() => handleSelect('2')}
					>
						<span className='text-2xl font-bold mb-2 text-blue-700'>DBQ 2025 Set 2</span>
						<span className='text-slate-500 text-sm mb-1'>Examines the effects of westward expansion on American society.</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default APUSHPracticeExamDBQSelect;
