import React from 'react';
import { useNavigate } from 'react-router-dom';

const exams = [
  {
    id: '2012',
    label: 'Collegeboard 2012 Exam',
    description: 'Official AP Psychology MCQ from 2012',
    implemented: true
  },
  {
    id: 'princeton',
    label: 'Princeton Exam',
    description: 'AP Psychology MCQ - Princeton',
    implemented: true
  },
  {
    id: 'princeton2',
    label: 'Princeton Exam 2',
    description: 'AP Psychology MCQ - Princeton 2',
    implemented: true
  },
  // Add more exams here as needed
];

const APPsychMCQSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-4 py-2 text-yellow-600 hover:text-yellow-800 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full">Select AP Psychology MCQ Exam</h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => {
                if (exam.implemented) {
                  navigate(`/ap-psychology-practice-exam/mcq/${exam.id}`);
                } else {
                  alert(`${exam.label} is not implemented yet.`);
                }
              }}
              className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 ${exam.implemented ? 'border-yellow-100 hover:border-yellow-400 hover:shadow-xl' : 'border-gray-100'}`}
              disabled={!exam.implemented}
            >
              <span className={`text-2xl font-bold mb-2 ${exam.implemented ? 'text-yellow-700' : 'text-gray-400'}`}>{exam.label}</span>
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

export default APPsychMCQSelect;
