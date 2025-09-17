import React, { useState } from 'react';

const answerKey = [
  'C','A','D','B','A','C','C','B','D','D',
  'A','B','D','C','D','D','B','C','B','A',
  'B','C','D','B','C','A','A','B','A','C',
  'A','B','D','C','C','C','B','C','A','D',
  'C','D','B','A','D','C','C','D','B','D',
  'B','C','C','D'
];

const APWorldPracticeExamMCQ = () => {
  const [answers, setAnswers] = useState(Array(55).fill(''));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (idx: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let correct = 0;
    for (let i = 0; i < 55; i++) {
      if (answers[i].toUpperCase() === answerKey[i]) correct++;
    }
    setScore(correct);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-2 flex flex-col md:flex-row gap-8 items-start justify-center">
      {/* PDF on the left */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-2xl mb-4">
          <h2 className="text-xl font-bold mb-2 text-green-700">College Board Official Exam PDF</h2>
          <iframe
            src="/APWorld-Exam1.pdf"
            title="AP World College Board Exam PDF"
            className="w-full h-[700px] rounded-lg border"
          />
          <div className="mt-2 text-sm text-slate-500 text-center">
            View the questions in the official PDF. Enter your answers on the right.
          </div>
        </div>
      </div>
      {/* MCQ on the right */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">Enter Your Answers</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {Array.from({ length: 55 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="font-semibold w-6">{idx + 1}.</span>
                  {['A', 'B', 'C', 'D'].map((choice) => (
                    <label key={choice} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={`q${idx}`}
                        value={choice}
                        checked={answers[idx] === choice}
                        onChange={() => handleChange(idx, choice)}
                        disabled={submitted}
                        className="accent-green-600"
                      />
                      <span className="text-xs">{choice}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
            {!submitted ? (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
              >
                Submit Answers
              </button>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700 mb-2">Score: {score} / 55</div>
                <div className="text-slate-600 mb-4">{((score / 55) * 100).toFixed(1)}%</div>
                <button
                  type="button"
                  className="mt-2 px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200 font-semibold"
                  onClick={() => { setAnswers(Array(55).fill('')); setSubmitted(false); setScore(0); }}
                >
                  Reset
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default APWorldPracticeExamMCQ;
