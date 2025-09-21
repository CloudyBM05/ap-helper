import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'In a perfectly competitive labor market, the wage rate is determined by:',
    options: [
      'A) Individual employers negotiating with workers',
      'B) The marginal product of labor',
      'C) Government regulation',
      'D) The intersection of market demand and supply for labor',
      'E) The monopsonist\'s willingness to pay',
    ],
    answer: 3,
    explanation: 'In a perfectly competitive labor market, the wage is set by the intersection of the market demand and supply for labor.'
  },
  {
    question: 'A firm will hire additional workers as long as:',
    options: [
      'A) Marginal cost is greater than marginal revenue',
      'B) The wage rate exceeds average product',
      'C) The marginal revenue product of labor is greater than or equal to the wage',
      'D) Total revenue increases',
      'E) Average variable cost is falling',
    ],
    answer: 2,
    explanation: 'Firms hire workers up to the point where the marginal revenue product of labor equals the wage.'
  },
  {
    question: 'If the marginal product of labor is decreasing, the marginal revenue product of labor is:',
    options: [
      'A) Increasing',
      'B) Decreasing',
      'C) Constant',
      'D) Greater than the wage rate',
      'E) Equal to the wage rate',
    ],
    answer: 1,
    explanation: 'If marginal product falls, so does marginal revenue product (assuming price is constant).'
  },
  {
    question: 'In a monopsony labor market, compared to a competitive labor market, employment and wages are:',
    options: [
      'A) Higher employment and higher wages',
      'B) Lower employment and higher wages',
      'C) Lower employment and lower wages',
      'D) Higher employment and lower wages',
      'E) Equal in both markets',
    ],
    answer: 2,
    explanation: 'A monopsonist hires fewer workers and pays a lower wage than a competitive market.'
  },
  {
    question: 'The marginal product of labor (MPL) is defined as:',
    options: [
      'A) Total output divided by the number of workers',
      'B) The change in output from hiring one more unit of capital',
      'C) The additional output produced by an additional unit of labor',
      'D) Wage divided by price',
      'E) The total value of labor hired',
    ],
    answer: 2,
    explanation: 'MPL is the extra output from hiring one more worker.'
  },
  {
    question: 'The marginal revenue product (MRP) of labor can be calculated as:',
    options: [
      'A) Price × Average Product',
      'B) Wage × Quantity',
      'C) Marginal Product × Marginal Cost',
      'D) Marginal Product × Price of Output',
      'E) Marginal Cost × Total Output',
    ],
    answer: 3,
    explanation: 'MRP = Marginal Product × Price of Output.'
  },
  {
    question: 'A firm that hires labor in a perfectly competitive product market and a perfectly competitive labor market will maximize profit by hiring labor until:',
    options: [
      'A) Marginal product = marginal cost',
      'B) Wage = marginal product',
      'C) Marginal cost = average variable cost',
      'D) Marginal revenue product = wage',
      'E) Marginal product = average product',
    ],
    answer: 3,
    explanation: 'Profit maximization occurs where MRP = wage.'
  },
  {
    question: 'Which of the following will cause the demand for labor to increase?',
    options: [
      'A) A decrease in the wage rate',
      'B) A fall in the price of the output produced by labor',
      'C) An increase in worker productivity',
      'D) An increase in the supply of labor',
      'E) A decline in marginal product of labor',
    ],
    answer: 2,
    explanation: 'Higher productivity increases the value of labor, shifting demand right.'
  },
  {
    question: 'In the long run, if a firm replaces labor with capital due to rising wages, this is an example of:',
    options: [
      'A) Diminishing marginal returns',
      'B) The output effect',
      'C) The substitution effect',
      'D) The income effect',
      'E) Allocative efficiency',
    ],
    answer: 2,
    explanation: 'The substitution effect: firms substitute capital for labor as wages rise.'
  },
  {
    question: 'A monopsonist hires workers where:',
    options: [
      'A) The wage equals marginal factor cost',
      'B) The demand for labor equals marginal product',
      'C) Marginal factor cost equals marginal revenue product',
      'D) Price equals average total cost',
      'E) Marginal product equals marginal cost',
    ],
    answer: 2,
    explanation: 'A monopsonist hires where marginal factor cost equals marginal revenue product.'
  },
];

const APMacroUnit5Quiz = () => {
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
      onClick={() => navigate('/ap-macroeconomics/unit/5')}
    >
      <span className="text-xl">←</span> Back to Unit 5
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

export default APMacroUnit5Quiz;
