import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'A good is considered excludable if:',
    options: [
      'A) One person\'s use diminishes another’s ability to use it',
      'B) It is provided only by the government',
      'C) People can be prevented from using it',
      'D) It is available to everyone regardless of income',
      'E) Its marginal cost is zero',
    ],
    answer: 2,
    explanation: 'A good is excludable if people can be prevented from using it (e.g., by charging a price).'
  },
  {
    question: 'Which of the following is both non-rival and non-excludable?',
    options: [
      'A) A toll road during rush hour',
      'B) A fireworks display',
      'C) A college education',
      'D) A slice of pizza',
      'E) A gym membership',
    ],
    answer: 1,
    explanation: 'A fireworks display is a classic example of a public good: non-rival and non-excludable.'
  },
  {
    question: 'A positive externality results in:',
    options: [
      'A) Overproduction and overconsumption',
      'B) Overproduction and underconsumption',
      'C) Underproduction and overconsumption',
      'D) Underproduction and underconsumption',
      'E) Efficient allocation of resources',
    ],
    answer: 3,
    explanation: 'Positive externalities lead to underproduction and underconsumption relative to the socially optimal level.'
  },
  {
    question: 'To correct a negative externality, the government could:',
    options: [
      'A) Provide a subsidy',
      'B) Increase production',
      'C) Impose a tax equal to the external cost',
      'D) Eliminate the market',
      'E) Remove all price controls',
    ],
    answer: 2,
    explanation: 'A tax equal to the external cost (Pigovian tax) internalizes the negative externality.'
  },
  {
    question: 'The free rider problem is most associated with which type of good?',
    options: [
      'A) Private goods',
      'B) Club goods',
      'C) Common resources',
      'D) Public goods',
      'E) Inferior goods',
    ],
    answer: 3,
    explanation: 'Public goods are non-excludable, so people can benefit without paying (free rider problem).'
  },
  {
    question: 'A Pigouvian tax is used to:',
    options: [
      'A) Increase the profits of monopolies',
      'B) Subsidize private consumption',
      'C) Encourage firms to produce more output',
      'D) Internalize a negative externality',
      'E) Correct a budget deficit',
    ],
    answer: 3,
    explanation: 'A Pigouvian tax is designed to internalize a negative externality.'
  },
  {
    question: 'If the marginal social cost exceeds the marginal private cost, this indicates the presence of:',
    options: [
      'A) A public good',
      'B) A price ceiling',
      'C) A positive externality',
      'D) A negative externality',
      'E) Market equilibrium',
    ],
    answer: 3,
    explanation: 'A negative externality means the social cost is greater than the private cost.'
  },
  {
    question: 'Which of the following will result in a deadweight loss?',
    options: [
      'A) A competitive market reaching equilibrium',
      'B) A government tax that reduces output below the socially optimal level',
      'C) A firm that maximizes profits where MR = MC',
      'D) The absence of externalities',
      'E) The existence of economies of scale',
    ],
    answer: 1,
    explanation: 'A tax that reduces output below the optimal level creates deadweight loss.'
  },
  {
    question: 'A price ceiling set below equilibrium causes:',
    options: [
      'A) A surplus',
      'B) A shortage',
      'C) Allocative efficiency',
      'D) An increase in producer surplus',
      'E) No change in the market',
    ],
    answer: 1,
    explanation: 'A price ceiling below equilibrium leads to a shortage.'
  },
  {
    question: 'Which of the following is a common resource?',
    options: [
      'A) A Netflix subscription',
      'B) A bottle of soda',
      'C) A public park',
      'D) National defense',
      'E) A toll bridge',
    ],
    answer: 2,
    explanation: 'A public park is a common resource: rival but non-excludable.'
  },
];

const APMacroUnit6Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [crossedOut, setCrossedOut] = useState<number[][]>(Array(questions.length).fill(null).map(() => []));
  const navigate = useNavigate();

  const handleSelect = (idx: number) => {
    setSelected(idx);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setSelected(newAnswers[current + 1] ?? null);
    setCurrent((prev) => prev + 1);
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
      setSelected(answers[current - 1]);
    }
  };

  const handleSubmit = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers(Array(questions.length).fill(null));
    setSelected(null);
    setCurrent(0);
    setSubmitted(false);
    setCrossedOut(Array(questions.length).fill(null).map(() => []));
  };

  const handleCrossOut = (idx: number) => {
    setCrossedOut((prev) => {
      const copy = prev.map(arr => [...arr]);
      const arr = copy[current];
      if (arr.includes(idx)) {
        copy[current] = arr.filter(i => i !== idx);
      } else {
        copy[current] = [...arr, idx];
      }
      return copy;
    });
  };

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-cyan-700 shadow transition flex items-center gap-2 z-20"
      onClick={() => navigate('/ap-macroeconomics/unit/6')}
    >
      <span className="text-xl">←</span> Back to Unit 6
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        <h1 className="text-3xl font-bold mb-8 text-center text-cyan-700">Quiz Results</h1>
        {questions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = userAnswer === q.answer;
          return (
            <div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
              <div className="mb-2 text-slate-500">Question {idx + 1}</div>
              <div className="mb-2 font-semibold">{q.question}</div>
              <ul className="mb-2">
                {q.options.map((opt: string, i: number) => (
                  <li
                    key={i}
                    className={`px-3 py-1 rounded ${i === q.answer ? 'bg-green-100 font-bold' : ''} ${userAnswer === i && userAnswer !== q.answer ? 'bg-red-100' : ''}`}
                  >
                    {opt}
                    {i === q.answer && (
                      <span className="ml-2 text-green-700 font-semibold">(Correct)</span>
                    )}
                    {userAnswer === i && userAnswer !== q.answer && (
                      <span className="ml-2 text-red-700">(Your answer)</span>
                    )}
                  </li>
                ))}
              </ul>
              {userAnswer === null ? (
                <div className="text-cyan-700 mb-1">You did not answer this question.</div>
              ) : isCorrect ? (
                <div className="text-green-700 mb-1">Correct!</div>
              ) : (
                <div className="text-red-700 mb-1">Incorrect.</div>
              )}
              <div className="mt-4 p-4 bg-cyan-50 rounded-lg">
                <h4 className="font-semibold text-cyan-900 mb-2">Explanation:</h4>
                <p className="text-cyan-800">{q.explanation}</p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-cyan-600 hover:to-cyan-800 transition-all duration-300"
            onClick={handleRetake}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  if (current >= questions.length) {
    return null;
  }

  const q = questions[current];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 relative">
      {BackToGuideButton}
      <div style={{ height: 48 }} />
      <div className="mb-8">
        <div className="text-slate-500 mb-2">
          Question {current + 1} of {questions.length}
        </div>
        <div className="text-lg font-semibold mb-4">{q.question}</div>
        <div className="space-y-3">
          {q.options.map((opt: string, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg border w-full text-left transition-all duration-200 ${
                  selected === idx ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-white text-slate-800'
                } ${crossedOut[current]?.includes(idx) ? 'line-through opacity-50' : ''}`}
                onClick={() => handleSelect(idx)}
                disabled={crossedOut[current]?.includes(idx)}
              >
                {opt}
              </button>
              <button
                type="button"
                className={`ml-2 px-2 py-1 rounded border text-xs ${crossedOut[current]?.includes(idx) ? 'bg-red-200 text-red-700 border-red-400' : 'bg-slate-100 text-cyan-700 border-cyan-300'}`}
                onClick={() => handleCrossOut(idx)}
                aria-label="Cross out option"
              >
                {crossedOut[current]?.includes(idx) ? 'Uncross' : 'Cross out'}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-lg shadow hover:bg-slate-300 transition-all duration-300"
          onClick={handleBack}
          disabled={current === 0}
        >
          Back
        </button>
        {current < questions.length - 1 ? (
          <button
            className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-cyan-600 hover:to-cyan-800 transition-all duration-300"
            onClick={handleNext}
            disabled={selected === null}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-cyan-600 hover:to-cyan-800 transition-all duration-300"
            onClick={handleSubmit}
            disabled={selected === null}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default APMacroUnit6Quiz;
