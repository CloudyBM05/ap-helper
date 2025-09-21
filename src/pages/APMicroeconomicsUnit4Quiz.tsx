import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: "A monopolist's marginal revenue is less than price because:",
    options: [
      'A) The monopolist is a price taker',
      'B) The demand curve is perfectly elastic',
      'C) The monopolist must lower price on all units to sell an additional unit',
      'D) There are many substitutes in the market',
      'E) The monopolist produces at minimum ATC',
    ],
    answer: 2,
    explanation: 'A monopolist must lower the price on all units to sell an additional unit, so MR < price.'
  },
  {
    question: 'In monopolistic competition, firms can earn economic profits in the short run, but not in the long run because:',
    options: [
      'A) Price equals marginal cost',
      'B) Demand is perfectly inelastic',
      'C) There are barriers to entry',
      'D) New firms enter the market, driving down demand for each firm',
      'E) Firms become allocatively efficient',
    ],
    answer: 3,
    explanation: 'Entry of new firms in the long run drives down demand and profits for each firm.'
  },
  {
    question: 'If a monopolist perfectly price discriminates, then:',
    options: [
      'A) Consumer surplus is maximized',
      'B) Producer surplus decreases',
      'C) Deadweight loss is eliminated',
      'D) Marginal cost is greater than marginal revenue',
      'E) Price is greater than marginal cost for all units',
    ],
    answer: 2,
    explanation: 'Perfect price discrimination eliminates deadweight loss; all surplus goes to the producer.'
  },
  {
    question: 'A firm in monopolistic competition maximizes profit by producing the quantity where:',
    options: [
      'A) MR = MC',
      'B) MC = ATC',
      'C) Demand = ATC',
      'D) MR = AVC',
      'E) Price = MC',
    ],
    answer: 0,
    explanation: 'Profit is maximized where marginal revenue equals marginal cost.'
  },
  {
    question: 'In the long run, a monopolistically competitive firm will:',
    options: [
      'A) Produce at minimum ATC',
      'B) Earn positive economic profits',
      'C) Operate where price equals marginal cost',
      'D) Produce with excess capacity',
      'E) Produce at the efficient scale',
    ],
    answer: 3,
    explanation: 'Monopolistic competitors produce with excess capacity in the long run.'
  },
  {
    question: 'Which of the following is a key characteristic of an oligopoly?',
    options: [
      'A) Price-taking behavior',
      'B) Many small firms',
      'C) No barriers to entry',
      'D) Mutual interdependence',
      'E) Perfect information',
    ],
    answer: 3,
    explanation: 'Oligopolies are characterized by mutual interdependence among firms.'
  },
  {
    question: 'Which of the following conditions must be met for price discrimination to be effective?',
    options: [
      'A) The firm must be in perfect competition',
      'B) All consumers must pay the same price',
      'C) The firm must be able to prevent resale between consumers',
      'D) The good must have no substitutes',
      'E) The market must be regulated by the government',
    ],
    answer: 2,
    explanation: 'Preventing resale between consumers is necessary for price discrimination.'
  },
  {
    question: 'Compared to perfect competition, monopoly results in:',
    options: [
      'A) Higher quantity and lower prices',
      'B) Lower quantity and higher prices',
      'C) Allocative efficiency',
      'D) Productive efficiency',
      'E) Consumer surplus maximization',
    ],
    answer: 1,
    explanation: 'Monopoly produces less and charges higher prices than perfect competition.'
  },
  {
    question: 'Which of the following statements is true about a natural monopoly?',
    options: [
      'A) It occurs when fixed costs are low',
      'B) It is allocatively efficient',
      'C) It has decreasing average total cost over a large range of output',
      'D) It produces at MR = ATC',
      'E) It faces a horizontal demand curve',
    ],
    answer: 2,
    explanation: 'Natural monopolies have decreasing ATC over a large output range due to high fixed costs.'
  },
  {
    question: 'In a prisoner’s dilemma scenario in oligopoly, firms often:',
    options: [
      'A) Cooperate to reach a socially optimal outcome',
      'B) Choose the dominant strategy even if it leads to a worse joint outcome',
      'C) Set price equal to marginal cost',
      'D) Always collude legally',
      'E) Produce zero economic profit',
    ],
    answer: 1,
    explanation: 'Firms often choose the dominant strategy, even if it leads to a worse joint outcome.'
  },
];

const APMicroUnit4Quiz = () => {
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
      onClick={() => navigate('/ap-microeconomics/unit/4')}
    >
      <span className="text-xl">←</span> Back to Unit 4
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

export default APMicroUnit4Quiz;
