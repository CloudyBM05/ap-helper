import React from 'react';
import { useNavigate } from 'react-router-dom';

const taskSets = [
  { id: 'set1', label: '2025 Collegeboard Investigative Task', route: '/ap-statistics-practice-exam/investigative-task' },
];

const APStatisticsInvestigativeTaskSelect: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToPracticeExams = () => {
    navigate('/practice-exams');
  };

  const handleSetClick = () => {
    // Navigate directly to the investigative task
    const pdf = '/APSTAT-IT.pdf';
    navigate(`/ap-statistics-practice-exam/investigative-task/1?set=set1&pdf=${encodeURIComponent(pdf)}`);
  };

  return (
    <div className='min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center'>
      <div className='w-full max-w-xl mx-auto flex flex-col items-center justify-center'>
        <button
          onClick={handleBackToPracticeExams}
          className='mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition self-start'
        >
          &larr; Back to Practice Exams
        </button>
        <h1 className='text-3xl font-bold mb-8 text-center w-full text-purple-700'>
          Select AP Statistics Investigative Task Set
        </h1>
        <div className='grid grid-cols-1 gap-6 w-full'>
          {taskSets.map((set) => (
            <button
              key={set.id}
              onClick={handleSetClick}
              className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-purple-100 hover:border-purple-400 hover:shadow-xl'
            >
              <span className='text-2xl font-bold mb-2 text-purple-700'>
                {set.label}
              </span>
              <span className='text-slate-500 text-sm mb-1'>Official AP Statistics Investigative Task 2025</span>
              <span className='text-slate-500 text-xs'>These are comprehensive statistical investigations</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APStatisticsInvestigativeTaskSelect;
