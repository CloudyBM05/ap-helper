import React from 'react';
import { useNavigate } from 'react-router-dom';

const exams = [
  { id: '2022', label: '2022 College Board MCQ', description: 'Official AP Human Geography MCQ from 2022', implemented: true },
  { id: 'princeton', label: 'Princeton Book Exam', description: 'A full-length exam from the Princeton Review.', implemented: true },
];

const APHumanGeographyMCQSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-4 py-2 text-emerald-600 hover:text-emerald-800 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full text-emerald-700">Select AP Human Geography MCQ Exam</h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => navigate(`/ap-human-geography-practice-exam/mcq/${exam.id}`)}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-emerald-100 hover:border-emerald-400 hover:shadow-xl"
            >
              <span className="text-2xl font-bold mb-2 text-emerald-700">{exam.label}</span>
              <span className="text-slate-600">{exam.description}</span>
            </button>
          ))}
          <a
            href="https://www.dropbox.com/scl/fo/hr1413nach7smeti8wrpt/ACIhQTbMHmxAv8IcxWJQjMY?rlkey=i387uux6np56729uac1aja0zp&e=1&dl=0"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-emerald-100 hover:border-emerald-400 hover:shadow-xl w-full"
          >
            <span className="text-2xl font-bold mb-2 text-emerald-700">Link to 5 Additional Practice Exams</span>
            <span className="text-slate-600">External Dropbox folder with 5 more AP Human Geography practice exams.</span>
          </a>
        </div>
        {/* In the future, expand exams array with additional test options */}
      </div>
    </div>
  );
};

export default APHumanGeographyMCQSelect;
