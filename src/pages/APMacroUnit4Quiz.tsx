import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following best describes the pricing power of a monopoly?',
    options: [
      'A) None, because monopolies are price takers',
      'B) Perfect, because monopolies face perfectly inelastic demand',
      'C) Significant, because they are the sole producer and face the market demand curve',
      'D) Limited, because they must advertise heavily',
      'E) None, because they are regulated by antitrust laws',
    ],
    answer: 2,
    explanation: 'A monopoly has significant pricing power because it is the only producer and faces the entire market demand curve.'
  },
  {
    question: 'In monopolistic competition, firms can earn economic profit in the short run because:',
    options: [
      'A) Firms are price takers',
      'B) Barriers to entry prevent new firms from entering',
      'C) Firms produce identical products',
      'D) Firms differentiate their products and face downward-sloping demand curves',
      'E) Marginal cost always exceeds price',
    ],
    answer: 3,
    explanation: 'Product differentiation gives firms some market power and allows for short-run profits.'
  },
  {
    question: 'What happens to a monopolist’s marginal revenue when it must lower price to sell more output?',
    options: [
      'A) Marginal revenue becomes greater than price',
      'B) Marginal revenue becomes equal to price',
      'C) Marginal revenue is constant',
      'D) Marginal revenue decreases faster than price',
      'E) Marginal revenue increases as output increases',
    ],
    answer: 3,
    explanation: 'For a monopolist, marginal revenue falls faster than price because lowering price applies to all units sold.'
  },
  {
    question: 'Which of the following is true for both monopolistic competition and monopoly in the long run?',
    options: [
      'A) Both firms earn positive economic profit',
      'B) Both operate at minimum ATC',
      'C) Both charge a price equal to marginal cost',
      'D) Both produce where marginal cost = marginal revenue',
      'E) Both are productively efficient',
    ],
    answer: 3,
    explanation: 'Both types of firms maximize profit by producing where MR = MC.'
  },
  {
    question: 'A firm in a monopolistically competitive industry will earn zero economic profit in the long run because:',
    options: [
      'A) It is a price taker',
      'B) The government regulates prices',
      'C) Firms are perfectly efficient',
      'D) New firms enter the market, shifting the demand curve left',
      'E) It minimizes average total cost',
    ],
    answer: 3,
    explanation: 'Entry of new firms shifts the demand curve left until only normal profit (zero economic profit) remains.'
  },
  {
    question: 'In oligopoly, mutual interdependence means that:',
    options: [
      'A) Firms act as price takers',
      'B) Firms collude openly in most markets',
      'C) Each firm\'s pricing and output decisions depend on the decisions of rival firms',
      'D) Firms always act independently',
      'E) All firms produce identical goods',
    ],
    answer: 2,
    explanation: 'Oligopolists must consider rivals\' reactions when making decisions.'
  },
  {
    question: 'Which of the following best illustrates price leadership in an oligopoly?',
    options: [
      'A) A single firm sets the price and others follow',
      'B) Government sets the market price',
      'C) Each firm charges a different price based on costs',
      'D) All firms take the market price as given',
      'E) Firms charge the same price due to antitrust regulation',
    ],
    answer: 0,
    explanation: 'Price leadership occurs when one firm sets the price and others follow its lead.'
  },
  {
    question: 'Which of the following conditions is necessary for price discrimination to occur?',
    options: [
      'A) All buyers must have the same willingness to pay',
      'B) The firm must be perfectly competitive',
      'C) The firm must be a price taker',
      'D) The firm must be able to prevent resale',
      'E) The firm must produce a homogeneous product',
    ],
    answer: 3,
    explanation: 'To price discriminate, a firm must prevent resale between buyers.'
  },
  {
    question: 'In the long-run equilibrium of monopolistic competition, which of the following is true?',
    options: [
      'A) Price = marginal cost',
      'B) Firms produce at minimum average total cost',
      'C) Firms earn positive economic profits',
      'D) Price > marginal cost and firms earn zero economic profit',
      'E) Firms are allocatively efficient',
    ],
    answer: 3,
    explanation: 'In the long run, monopolistic competitors earn zero economic profit but price remains above marginal cost.'
  },
  {
    question: 'A monopolist maximizes profit where:',
    options: [
      'A) MR = MC, and charges a price found on the marginal cost curve',
      'B) MR = MC, and charges a price found on the demand curve',
      'C) Price = MC',
      'D) Total revenue is at its maximum',
      'E) Average total cost is minimized',
    ],
    answer: 1,
    explanation: 'A monopolist sets output where MR = MC, but charges the price on the demand curve for that quantity.'
  },
];

const APMacroUnit4Quiz = () => {
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
      onClick={() => navigate('/ap-macroeconomics/unit/4')}
    >
      <span className="text-xl">←</span> Back to Unit 4
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

export default APMacroUnit4Quiz;
