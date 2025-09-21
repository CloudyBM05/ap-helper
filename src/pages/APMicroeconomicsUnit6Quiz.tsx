import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'A market failure occurs when:',
    options: [
      'A) Prices are too high for consumers',
      'B) The government overregulates an industry',
      'C) The allocation of goods and services is inefficient',
      'D) A firm earns excessive profits',
      'E) Resources are perfectly allocated',
    ],
    answer: 2,
    explanation:
      'Market failure is when resources are not allocated efficiently, resulting in inefficiency in the allocation of goods and services.',
  },
  {
    question: 'Public goods are both:',
    options: [
      'A) Rival and excludable',
      'B) Nonrival and excludable',
      'C) Rival and nonexcludable',
      'D) Nonrival and nonexcludable',
      'E) Private and profitable',
    ],
    answer: 3,
    explanation:
      'Public goods are nonrival (one person’s use doesn’t reduce another’s) and nonexcludable (cannot prevent non-payers from using).',
  },
  {
    question: 'Which of the following is an example of a positive externality?',
    options: [
      'A) A factory pollutes a river',
      'B) A person gets vaccinated, reducing disease spread',
      'C) A driver causes a traffic jam',
      'D) A company lays off workers',
      'E) A business avoids taxes',
    ],
    answer: 1,
    explanation:
      'Vaccination benefits not only the individual but also others by reducing disease spread, a positive externality.',
  },
  {
    question: 'Externalities are best defined as:',
    options: [
      'A) Costs only producers face',
      'B) Benefits only consumers receive',
      'C) Unintended side effects of a market activity',
      'D) Government regulations on production',
      'E) Resource costs paid by the firm',
    ],
    answer: 2,
    explanation:
      'Externalities are unintended side effects (costs or benefits) of market activities that affect third parties.',
  },
  {
    question: 'When a negative externality is present in a market, the market will:',
    options: [
      'A) Overallocate resources to the good',
      'B) Underproduce the good',
      'C) Achieve allocative efficiency',
      'D) Eliminate marginal costs',
      'E) Provide it as a public good',
    ],
    answer: 0,
    explanation:
      'Negative externalities cause overproduction because the market does not account for external costs.',
  },
  {
    question: 'Pigouvian taxes are designed to:',
    options: [
      'A) Subsidize positive externalities',
      'B) Increase producer profits',
      'C) Correct market failure by internalizing external costs',
      'D) Encourage monopolies',
      'E) Reduce government intervention',
    ],
    answer: 2,
    explanation:
      'Pigouvian taxes are imposed to internalize external costs and correct market failures caused by negative externalities.',
  },
  {
    question: 'A subsidy on a good with positive externalities will:',
    options: [
      'A) Decrease its production',
      'B) Shift supply left',
      'C) Cause deadweight loss',
      'D) Increase production and consumption',
      'E) Eliminate marginal cost',
    ],
    answer: 3,
    explanation:
      'Subsidies encourage more production and consumption of goods with positive externalities.',
  },
  {
    question: 'A public good like national defense is:',
    options: [
      'A) Overprovided in free markets',
      'B) Prone to underproduction due to the free rider problem',
      'C) Priced efficiently by the private market',
      'D) Rival in consumption',
      'E) Fully excludable',
    ],
    answer: 1,
    explanation:
      'Public goods like national defense are underproduced in free markets because of the free rider problem.',
  },
  {
    question: 'The free rider problem occurs because:',
    options: [
      'A) People do not want public goods',
      'B) It costs too much to exclude users',
      'C) Public goods have high opportunity costs',
      'D) Marginal benefit equals marginal cost',
      'E) Private firms can profit off public goods',
    ],
    answer: 1,
    explanation:
      'The free rider problem exists because it is difficult or costly to exclude non-payers from public goods.',
  },
  {
    question: 'A government can fix a negative externality by:',
    options: [
      'A) Reducing output',
      'B) Increasing output',
      'C) Imposing a per-unit tax',
      'D) Subsidizing producers',
      'E) Providing free public goods',
    ],
    answer: 2,
    explanation:
      'A per-unit tax on producers can reduce output and internalize the external cost, correcting the negative externality.',
  },
];

const APMicroUnit6Quiz = () => {
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
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-fuchsia-700 shadow transition flex items-center gap-2 z-20"
      onClick={() => navigate('/ap-microeconomics/unit/6')}
    >
      <span className="text-xl">←</span> Back to Unit 6
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        <h1 className="text-3xl font-bold mb-8 text-center text-fuchsia-700">Quiz Results</h1>
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
                <div className="text-fuchsia-700 mb-1">You did not answer this question.</div>
              ) : isCorrect ? (
                <div className="text-green-700 mb-1">Correct!</div>
              ) : (
                <div className="text-red-700 mb-1">Incorrect.</div>
              )}
              <div className="mt-4 p-4 bg-fuchsia-50 rounded-lg">
                <h4 className="font-semibold text-fuchsia-900 mb-2">Explanation:</h4>
                <p className="text-fuchsia-800">{q.explanation}</p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-fuchsia-500 to-orange-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-fuchsia-600 hover:to-orange-500 transition-all duration-300"
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
                  selected === idx ? 'bg-fuchsia-500 text-white border-fuchsia-600' : 'bg-white text-slate-800'
                } ${crossedOut[current]?.includes(idx) ? 'line-through opacity-50' : ''}`}
                onClick={() => handleSelect(idx)}
                disabled={crossedOut[current]?.includes(idx)}
              >
                {opt}
              </button>
              <button
                type="button"
                className={`ml-2 px-2 py-1 rounded border text-xs ${crossedOut[current]?.includes(idx) ? 'bg-red-200 text-red-700 border-red-400' : 'bg-slate-100 text-slate-500 border-slate-300'}`}
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
            className="bg-gradient-to-r from-fuchsia-500 to-orange-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-fuchsia-600 hover:to-orange-500 transition-all duration-300"
            onClick={handleNext}
            disabled={selected === null}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-fuchsia-500 to-orange-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-fuchsia-600 hover:to-orange-500 transition-all duration-300"
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

export default APMicroUnit6Quiz;
