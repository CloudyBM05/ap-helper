import React from 'react';
import { useNavigate } from 'react-router-dom';

const shortFrqSets = [
  {
    id: 'set1',
    label: 'Collegeboard 2025 Short Answer Set 1',
    description: 'Official AP Microeconomics Short FRQ, Collegeboard 2025, Set 1. Practice concise, exam-style short answer questions.'
  },
  {
    id: 'set2',
    label: 'Collegeboard 2025 Short Answer Set 2',
    description: 'Official AP Microeconomics Short FRQ, Collegeboard 2025, Set 2. Another set of targeted short answer questions.'
  }
];

const APMicroShortFRQSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={() => navigate('/practice-exams')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition self-start"
        >
          &larr; Back to Practice Exams
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full text-black">
          Select AP Microeconomics Short FRQ Set
        </h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {shortFrqSets.map((set) => (
            <button
              key={set.id}
              onClick={() => navigate(`/ap-microeconomics-practice-exam/short-frq/${set.id}`)}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-fuchsia-100 hover:border-cyan-400 hover:shadow-xl w-full"
            >
              <span className="text-2xl font-bold mb-2 text-fuchsia-700">{set.label}</span>
              <span className="text-slate-600">{set.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APMicroShortFRQSelect;
