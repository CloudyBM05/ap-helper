import React from 'react';
import { useNavigate } from 'react-router-dom';

const APWorldPracticeExamDBQSelect: React.FC = () => {
  const navigate = useNavigate();

  const dbqSets = [
    {
      id: 'set1',
      title: 'Collegeboard 2025 DBQ Set 1',
      description: 'Focuses on global interactions and change over time in world history.',
      pdf: '/APWorld-pt1DBQ.pdf',
      color: 'text-green-700',
      buttonColor: 'bg-green-600 hover:bg-green-700',
    },
    {
      id: 'set2',
      title: 'Collegeboard 2025 DBQ Set 2',
      description: 'Examines the impact of technology, empire, and cultural exchange.',
      pdf: '/APWorld-pt2DBQ.pdf',
      color: 'text-teal-700',
      buttonColor: 'bg-teal-600 hover:bg-teal-700',
    },
  ];

  const handleSelect = (setId: string, pdf: string) => {
    navigate(`/apworld-practice-exam/dbq/2025?set=${setId}&pdf=${pdf}`);
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={() => navigate('/practice-exams')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition self-start"
        >
          &larr; Back to Practice Exam Options
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full text-green-700">
          Select AP World DBQ Set
        </h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {dbqSets.map((set) => (
            <button
              key={set.id}
              onClick={() => handleSelect(set.id, set.pdf)}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-green-100 hover:border-green-400 hover:shadow-xl"
            >
              <span className="text-2xl font-bold mb-2 text-green-700">
                {set.title}
              </span>
              <span className="text-slate-500 text-sm mb-1">{set.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APWorldPracticeExamDBQSelect;
