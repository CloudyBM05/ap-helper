import React from 'react';
import { useNavigate } from 'react-router-dom';

const exams = [
  {
    id: 'collegeboard',
    label: 'College Board Official Exam',
    description: 'Official AP World History MCQ from the College Board.',
    pdf: '/APWorld-Exam1.pdf',
    implemented: true
  },
  {
    id: 'princeton',
    label: 'Princeton Review Exam',
    description: 'A 55-question AP World exam from the Princeton Review.',
    pdf: '/APWorld-Exam2.pdf',
    implemented: true
  },
  {
    id: 'cracked1',
    label: 'Cracked AP World Practice Exam 1',
    description: 'A full-length practice exam from Cracked AP World.',
    pdf: '/APWorld-Exam3.pdf',
    implemented: true
  },
  {
    id: 'cracked2',
    label: 'Cracked AP World Practice Exam 2',
    description: 'A second full-length practice exam from Cracked AP World.',
    pdf: '/APWorld-Exam4.pdf',
    implemented: true
  }
];

const APWorldPracticeExamMCQSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-4 py-2 text-green-600 hover:text-green-800 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full">Select AP World MCQ Exam</h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {exams.map((exam) => (
            exam.id === 'collegeboard' ? (
              <button
                key={exam.id}
                onClick={() => navigate('/apworld-practice-exam/mcq/collegeboard')}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-green-100 hover:border-green-400 hover:shadow-xl w-full"
              >
                <span className="text-2xl font-bold mb-2 text-green-700">{exam.label}</span>
                <span className="text-slate-600">{exam.description}</span>
              </button>
            ) : exam.id === 'princeton' ? (
              <button
                key={exam.id}
                onClick={() => navigate('/apworld-practice-exam/mcq/princeton')}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-green-100 hover:border-green-400 hover:shadow-xl w-full"
              >
                <span className="text-2xl font-bold mb-2 text-green-700">{exam.label}</span>
                <span className="text-slate-600">{exam.description}</span>
              </button>
            ) : exam.id === 'cracked1' ? (
              <button
                key={exam.id}
                onClick={() => navigate('/apworld-practice-exam/mcq/cracked')}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-green-100 hover:border-green-400 hover:shadow-xl w-full"
              >
                <span className="text-2xl font-bold mb-2 text-green-700">{exam.label}</span>
                <span className="text-slate-600">{exam.description}</span>
              </button>
            ) : exam.id === 'cracked2' ? (
              <button
                key={exam.id}
                onClick={() => navigate('/apworld-practice-exam/mcq/cracked2')}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-green-100 hover:border-green-400 hover:shadow-xl w-full"
              >
                <span className="text-2xl font-bold mb-2 text-green-700">{exam.label}</span>
                <span className="text-slate-600">{exam.description}</span>
              </button>
            ) : (
              <a
                key={exam.id}
                href={exam.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-green-100 hover:border-green-400 hover:shadow-xl w-full"
              >
                <span className="text-2xl font-bold mb-2 text-green-700">{exam.label}</span>
                <span className="text-slate-600">{exam.description}</span>
              </a>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default APWorldPracticeExamMCQSelect;
