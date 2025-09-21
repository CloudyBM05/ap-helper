import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const leqSets = [
  {
    id: 1,
    label: 'AP World Collegeboard 2025 - LEQ Set 1',
    set: 'set1',
    pdf: '/APWorld-pt1LEQ.pdf',
    description: 'Official LEQ Set from 2025'
  },
  {
    id: 2,
    label: 'AP World Collegeboard 2025 - LEQ Set 2',
    set: 'set2',
    pdf: '/APWorld-pt2LEQ.pdf',
    description: 'Official LEQ Set from 2025'
  },
];

const questions = [
  { id: 2, label: 'Question 2' },
  { id: 3, label: 'Question 3' },
  { id: 4, label: 'Question 4' },
];

const APWorldPracticeExamLEQSelect: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSet, setSelectedSet] = useState<number | null>(null);

  const handleSetClick = (set: { id: number; label: string; set: string; pdf: string }) => {
    setSelectedSet(set.id);
  };

  const handleQuestionClick = (questionId: number) => {
    if (selectedSet) {
      const set = leqSets.find(s => s.id === selectedSet);
      if (set) {
        navigate(`/apworld-practice-exam/leq/2025?set=${set.set}&pdf=${set.pdf}&question=${questionId}`);
      }
    }
  };

  const handleBackToPracticeExams = () => {
    navigate('/practice-exams');
  };

  if (selectedSet) {
    const set = leqSets.find(s => s.id === selectedSet);
    return (
      <div className='min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center'>
        <div className='w-full max-w-xl mx-auto flex flex-col items-center justify-center'>
          <h1 className='text-3xl font-bold mb-8 text-center w-full text-green-700'>
            Select a Question for {set?.label}
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
            {questions.map((question) => (
              <button
                key={question.id}
                onClick={() => handleQuestionClick(question.id)}
                className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-green-100 hover:border-green-400 hover:shadow-xl'
              >
                <span className='text-2xl font-bold mb-2 text-green-700'>
                  {question.label}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setSelectedSet(null)}
            className='mt-8 text-green-600 hover:underline'
          >
            Back to LEQ set selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center'>
      <div className='w-full max-w-xl mx-auto flex flex-col items-center justify-center'>
        <button
          onClick={handleBackToPracticeExams}
          className='mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition self-start'
        >
          &larr; Back to Practice Exams
        </button>
        <h1 className='text-3xl font-bold mb-8 text-center w-full text-green-700'>
          Select AP World LEQ Exam Set
        </h1>
        <div className='grid grid-cols-1 gap-6 w-full'>
          {leqSets.map((set) => (
            <button
              key={set.id}
              onClick={() => handleSetClick(set)}
              className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-green-100 hover:border-green-400 hover:shadow-xl'
            >
              <span className='text-2xl font-bold mb-2 text-green-700'>
                {set.label}
              </span>
              <span className='text-slate-500 text-sm mb-1'>{set.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APWorldPracticeExamLEQSelect;
