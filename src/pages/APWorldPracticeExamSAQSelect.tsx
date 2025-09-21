import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const saqSets = [
  { id: 'set1', label: 'College Board 2025 SAQ Set 1', route: '/apworld-practice-exam/saq' },
  { id: 'set2', label: 'College Board 2025 SAQ Set 2', route: '/apworld-practice-exam/saq' },
];

const questions = [
  { id: 1, label: 'Question 1' },
  { id: 2, label: 'Question 2' },
  { id: 3, label: 'Question 3' },
  { id: 4, label: 'Question 4' },
];

const APWorldPracticeExamSAQSelect: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSet, setSelectedSet] = useState<string | null>(null);

  const handleBackToPracticeExams = () => {
    navigate('/practice-exams');
  };

  const handleSetClick = (set: { id: string; label: string; route: string }) => {
    setSelectedSet(set.id);
  };

  const handleQuestionClick = (questionId: number) => {
    if (selectedSet) {
      // For set1, pass PDF info for each question
      if (selectedSet === 'set1') {
        let pdf = '';
        if (questionId === 1) pdf = '/APWorld-pt1SAQ1.pdf';
        else if (questionId === 2) pdf = '/APWorld-pt1SAQ2.pdf';
        else if (questionId === 3 || questionId === 4) pdf = '/APWorld-pt1SAQ34.pdf';
        navigate(`/apworld-practice-exam/saq/${questionId}?set=${selectedSet}&pdf=${encodeURIComponent(pdf)}`);
      } else {
        // For set2, fallback to default route
        navigate(`/apworld-practice-exam/saq/${questionId}?set=${selectedSet}`);
      }
    }
  };

  if (selectedSet) {
    const set = saqSets.find(s => s.id === selectedSet);
    return (
      <div className='min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center'>
        <div className='w-full max-w-xl mx-auto flex flex-col items-center justify-center'>
          <h1 className='text-3xl font-bold mb-8 text-center w-full text-green-700'>
            Select a Question for {set?.label}
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
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
            Back to set selection
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
          Select AP World SAQ Set
        </h1>
        <div className='grid grid-cols-1 gap-6 w-full'>
          {saqSets.map((set) => (
            <button
              key={set.id}
              onClick={() => handleSetClick(set)}
              className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-green-100 hover:border-green-400 hover:shadow-xl'
            >
              <span className='text-2xl font-bold mb-2 text-green-700'>
                {set.label}
              </span>
              <span className='text-slate-500 text-sm mb-1'>Official AP World SAQ 2025</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APWorldPracticeExamSAQSelect;
