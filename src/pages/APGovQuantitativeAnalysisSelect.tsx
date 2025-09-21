import React from 'react';
import { useNavigate } from 'react-router-dom';

const QUANT_SETS = [
  {
    id: 1,
    label: '2025 Quantitative Analysis Set 1',
    description: 'Practice AP Gov Quantitative Analysis. Set 1.'
  },
  {
    id: 2,
    label: '2025 Quantitative Analysis Set 2',
    description: 'Practice AP Gov Quantitative Analysis. Set 2.'
  }
];

const APGovQuantitativeAnalysisSelect: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToPracticeExams = () => {
    navigate('/practice-exams');
  };

  const handleSetClick = (setId: number) => {
    navigate(`/ap-gov-practice-exam/quantitative-analysis/${setId}`);
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={handleBackToPracticeExams}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition self-start"
        >
          &larr; Back to Practice Exams
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full text-red-700">
          Select AP Gov Quantitative Analysis Set
        </h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {QUANT_SETS.map((set) => (
            <button
              key={set.id}
              onClick={() => handleSetClick(set.id)}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-red-100 hover:border-red-400 hover:shadow-xl"
            >
              <span className="text-2xl font-bold mb-2 text-red-700">
                {set.label}
              </span>
              <span className="text-slate-600">
                {set.description}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APGovQuantitativeAnalysisSelect;
