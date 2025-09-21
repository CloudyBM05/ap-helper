import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Marginal product of labor is defined as:',
    options: [
      'A) Total output divided by the number of workers',
      'B) The increase in total output from hiring one more unit of labor',
      'C) Output per dollar spent on labor',
      'D) The total cost of employing one more worker',
      'E) Labor productivity divided by total fixed costs',
    ],
    answer: 1,
    explanation: 'Marginal product of labor is the additional output produced by hiring one more worker.'
  },
  {
    question: 'Diminishing marginal returns occur when:',
    options: [
      'A) Output decreases as inputs increase',
      'B) Total cost increases as output increases',
      'C) Marginal product increases as additional workers are hired',
      'D) Marginal product decreases as additional units of labor are added',
      'E) Average total cost falls as output increases',
    ],
    answer: 3,
    explanation: 'Diminishing marginal returns means each additional worker adds less to output than the previous one.'
  },
  {
    question: 'Which of the following is always true about fixed costs in the short run?',
    options: [
      'A) They vary as output changes',
      'B) They are equal to total cost minus variable cost',
      'C) They include wages paid to workers',
      'D) They decrease as production increases',
      'E) They are eliminated when output is zero',
    ],
    answer: 1,
    explanation: 'Fixed costs do not change with output and are equal to total cost minus variable cost.'
  },
  {
    question: 'If marginal cost is rising and is above average total cost, then:',
    options: [
      'A) Average total cost is rising',
      'B) Average total cost is falling',
      'C) Marginal cost must be decreasing',
      'D) Average variable cost is zero',
      'E) Fixed costs are increasing',
    ],
    answer: 0,
    explanation: 'When MC is above ATC, ATC is rising.'
  },
  {
    question: 'A firm should shut down in the short run if:',
    options: [
      'A) Price falls below average total cost',
      'B) Price equals marginal cost',
      'C) Price falls below average fixed cost',
      'D) Price falls below average variable cost',
      'E) Marginal cost exceeds marginal revenue',
    ],
    answer: 3,
    explanation: 'A firm should shut down if it cannot cover its variable costs in the short run.'
  },
  {
    question: 'In a perfectly competitive market, individual firms:',
    options: [
      'A) Can set prices to maximize profits',
      'B) Produce a differentiated product',
      'C) Face perfectly inelastic demand',
      'D) Are price takers',
      'E) Will advertise to increase demand',
    ],
    answer: 3,
    explanation: 'Firms in perfect competition are price takers—they accept the market price.'
  },
  {
    question: 'What is the shape of the marginal cost (MC) curve in the short run?',
    options: [
      'A) Horizontal line',
      'B) Downward sloping',
      'C) U-shaped',
      'D) Vertical line',
      'E) Constant upward slope',
    ],
    answer: 2,
    explanation: 'The MC curve is typically U-shaped due to initially increasing, then diminishing, marginal returns.'
  },
  {
    question: 'If a firm’s total revenue is greater than its total cost, then the firm:',
    options: [
      'A) Is incurring a loss',
      'B) Is earning zero economic profit',
      'C) Should shut down',
      'D) Is earning a positive economic profit',
      'E) Is operating at its efficient scale',
    ],
    answer: 3,
    explanation: 'If total revenue exceeds total cost, the firm earns a positive economic profit.'
  },
  {
    question: 'When marginal product is negative, what happens to total product?',
    options: [
      'A) It increases at a decreasing rate',
      'B) It increases at an increasing rate',
      'C) It remains constant',
      'D) It begins to decline',
      'E) It rises more slowly than average product',
    ],
    answer: 3,
    explanation: 'A negative marginal product means total product is falling.'
  },
  {
    question: 'In the long run, perfectly competitive firms will:',
    options: [
      'A) Earn economic profit due to barriers to entry',
      'B) Produce at the point where marginal cost equals average variable cost',
      'C) Experience diminishing returns to scale',
      'D) Exit the market if price falls below average total cost',
      'E) Earn zero economic profit and produce at the lowest point of ATC',
    ],
    answer: 4,
    explanation: 'In the long run, entry and exit drive economic profit to zero, and firms produce at the lowest ATC.'
  },
];

const APMacroUnit3Quiz = () => {
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
      onClick={() => navigate('/ap-macroeconomics/unit/3')}
    >
      <span className="text-xl">←</span> Back to Unit 3
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

export default APMacroUnit3Quiz;
