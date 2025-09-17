// AP Microeconomics MCQ Selection Page
// Lets users pick between Collegeboard 2012, Collegeboard 2011, and Princeton Exam MCQ sets

import React from 'react';
import { useNavigate } from 'react-router-dom';

const exams = [
  {
    id: '2012',
    label: 'Collegeboard 2012 MCQ',
    description: 'Official AP Microeconomics MCQ set from 2012.',
    implemented: true
  },
  {
    id: '2011',
    label: 'Collegeboard 2011 MCQ',
    description: 'Official AP Microeconomics MCQ set from 2011.',
    implemented: true
  },
  {
    id: 'princeton',
    label: 'Princeton Exam MCQ',
    description: 'Princeton Review AP Microeconomics MCQ set.',
    implemented: true
  }
];

const APMicroeconomicsMCQOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-4 py-2 text-fuchsia-600 hover:text-cyan-600 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full text-black">
          Select AP Microeconomics MCQ Exam
        </h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => navigate(`/ap-microeconomics-practice-exam/mcq/${exam.id}`)}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-fuchsia-100 hover:border-cyan-400 hover:shadow-xl w-full"
            >
              <span className="text-2xl font-bold mb-2 text-fuchsia-700">{exam.label}</span>
              <span className="text-slate-600">{exam.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APMicroeconomicsMCQOptions;
