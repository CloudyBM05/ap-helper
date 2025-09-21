import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const frqSets = [
  { id: 'set1', label: '2025 Collegeboard Short FRQ Set', route: '/ap-statistics-practice-exam/shorter-frq' },
];

const questions = [
  { id: 1, label: '2025 Collegeboard Short FRQ #1' },
  { id: 2, label: '2025 Collegeboard Short FRQ #2' },
  { id: 3, label: '2025 Collegeboard Short FRQ #3' },
  { id: 4, label: '2025 Collegeboard Short FRQ #4' },
  { id: 5, label: '2025 Collegeboard Short FRQ #5' },
];

const APStatisticsShortFRQSelect: React.FC = () => {
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
        if (questionId === 1) pdf = '/APSTAT-ShortFRQ1.pdf';
        else if (questionId === 2) pdf = '/APSTAT-ShortFRQ2.pdf';
        else if (questionId === 3) pdf = '/APSTAT-ShortFRQ3.pdf';
        else if (questionId === 4) pdf = '/APSTAT-ShortFRQ4.pdf';
        else if (questionId === 5) pdf = '/APSTAT-ShortFRQ5.pdf';
        navigate(`/ap-statistics-practice-exam/shorter-frq/${questionId}?set=${selectedSet}&pdf=${encodeURIComponent(pdf)}`);
      } else {
        // For other sets, fallback to default route
        navigate(`/ap-statistics-practice-exam/shorter-frq/${questionId}?set=${selectedSet}`);
      }
    }
  };

  if (selectedSet) {
    const set = frqSets.find(s => s.id === selectedSet);
    return (
      <div className='min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center'>
        <div className='w-full max-w-4xl mx-auto flex flex-col items-center justify-center'>
          <h1 className='text-3xl font-bold mb-8 text-center w-full text-purple-700'>
            Select a Question for {set?.label}
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
            {questions.map((question) => (
              <button
                key={question.id}
                onClick={() => handleQuestionClick(question.id)}
                className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-purple-100 hover:border-purple-400 hover:shadow-xl'
              >
                <span className='text-xl font-bold mb-2 text-purple-700'>
                  {question.label}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setSelectedSet(null)}
            className='mt-8 text-purple-600 hover:underline'
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
        <h1 className='text-3xl font-bold mb-8 text-center w-full text-purple-700'>
          Select AP Statistics Short FRQ Set
        </h1>
        <div className='grid grid-cols-1 gap-6 w-full'>
          {frqSets.map((set) => (
            <button
              key={set.id}
              onClick={() => handleSetClick(set)}
              className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-purple-100 hover:border-purple-400 hover:shadow-xl'
            >
              <span className='text-2xl font-bold mb-2 text-purple-700'>
                {set.label}
              </span>
              <span className='text-slate-500 text-sm mb-1'>Official AP Statistics Short FRQ 2025</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APStatisticsShortFRQSelect;
