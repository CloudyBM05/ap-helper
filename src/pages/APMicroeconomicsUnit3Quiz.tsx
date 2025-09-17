import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'The law of diminishing marginal returns states that, beyond some point:',
    options: [
      'A) Marginal product will increase at an increasing rate',
      'B) Total product will fall',
      'C) Marginal product of an input will decline as more of that input is used',
      'D) Total product and marginal product rise together',
      'E) Average product will always be less than marginal product',
    ],
    answer: 2,
    explanation: 'Diminishing marginal returns means that as more of a variable input is added, the marginal product eventually decreases.'
  },
  {
    question: 'Which of the following is a variable cost for a firm in the short run?',
    options: [
      'A) Rent on a factory building',
      'B) Insurance premiums',
      'C) Payments for raw materials',
      'D) Loan interest',
      'E) Depreciation on machinery',
    ],
    answer: 2,
    explanation: 'Variable costs change with output, such as payments for raw materials.'
  },
  {
    question: 'The marginal cost (MC) curve intersects the average total cost (ATC) curve at:',
    options: [
      'A) The lowest point on the marginal cost curve',
      'B) The highest point on the average variable cost curve',
      'C) The lowest point on the average total cost curve',
      'D) The highest point on the total product curve',
      'E) A point where total cost is minimized',
    ],
    answer: 2,
    explanation: 'MC intersects ATC at ATC’s minimum point.'
  },
  {
    question: 'In the short run, fixed costs:',
    options: [
      'A) Vary with output',
      'B) Are irrelevant to production decisions',
      'C) Can be avoided',
      'D) Do not change as output changes',
      'E) Always exceed variable costs',
    ],
    answer: 3,
    explanation: 'Fixed costs do not change as output changes in the short run.'
  },
  {
    question: 'In the long run, all costs are:',
    options: [
      'A) Sunk',
      'B) Variable',
      'C) Fixed',
      'D) Marginal',
      'E) Decreasing',
    ],
    answer: 1,
    explanation: 'In the long run, firms can adjust all inputs, so all costs are variable.'
  },
  {
    question: 'A perfectly competitive firm maximizes profit by producing the quantity where:',
    options: [
      'A) Price = Average total cost',
      'B) Marginal cost = Average variable cost',
      'C) Price = Marginal cost',
      'D) Total cost = Total revenue',
      'E) Marginal revenue = Average total cost',
    ],
    answer: 2,
    explanation: 'Profit is maximized where price equals marginal cost in perfect competition.'
  },
  {
    question: 'If a firm in perfect competition is earning positive economic profit, what will happen in the long run?',
    options: [
      'A) Firms will exit the market',
      'B) Price will rise',
      'C) New firms will enter the market',
      'D) Demand will shift left',
      'E) The government will regulate prices',
    ],
    answer: 2,
    explanation: 'Positive economic profit attracts new firms, increasing supply and lowering price.'
  },
  {
    question: 'Which of the following is true in long-run equilibrium in a perfectly competitive market?',
    options: [
      'A) Firms produce at minimum average variable cost',
      'B) Firms earn positive economic profits',
      'C) Price equals marginal cost and minimum average total cost',
      'D) Firms produce at the profit-maximizing level of output where MR < MC',
      'E) Firms experience economies of scale',
    ],
    answer: 2,
    explanation: 'In long-run equilibrium, price equals MC and minimum ATC.'
  },
  {
    question: 'A firm continues to operate in the short run even at a loss as long as:',
    options: [
      'A) Price > Average total cost',
      'B) Total revenue > Total cost',
      'C) Price > Average variable cost',
      'D) Marginal cost > Average cost',
      'E) Fixed costs exceed variable costs',
    ],
    answer: 2,
    explanation: 'As long as price covers AVC, the firm can cover variable costs and minimize losses.'
  },
  {
    question: 'Which of the following is a characteristic of a perfectly competitive market?',
    options: [
      'A) Few sellers',
      'B) Differentiated products',
      'C) Significant barriers to entry',
      'D) Price-taking behavior',
      'E) Firms advertise to increase demand',
    ],
    answer: 3,
    explanation: 'Perfect competition features price-taking behavior by firms.'
  },
];

const APMicroUnit3Quiz = () => {
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
      onClick={() => navigate('/ap-microeconomics/unit/3')}
    >
      <span className="text-xl">←</span> Back to Unit 3
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

export default APMicroUnit3Quiz;
