import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const pdfUrl = '/APMicro-Short1Set2.pdf';

const shortFrqQuestions = [
  { id: 'q2', label: 'Question 2' },
  { id: 'q3', label: 'Question 3' },
];

const APMicroShortFRQSet2Select = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={() => navigate('/ap-microeconomics-practice-exam/short-frq')}
          className="mb-8 px-4 py-2 text-fuchsia-600 hover:text-cyan-600 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full text-black">
          Select AP Microeconomics Short FRQ Set 2 Question
        </h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {shortFrqQuestions.map((q) => (
            <button
              key={q.id}
              onClick={() => navigate(`/ap-microeconomics-practice-exam/short-frq/set2/${q.id}`)}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-fuchsia-100 hover:border-cyan-400 hover:shadow-xl w-full"
            >
              <span className="text-2xl font-bold mb-2 text-fuchsia-700">{q.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APMicroShortFRQSet2Select;
