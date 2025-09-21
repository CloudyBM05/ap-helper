import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'A standard six-sided die is rolled once. What is the probability of rolling a number greater than 4?',
    options: [
      'A) 1/6',
      'B) 1/3',
      'C) 1/2',
      'D) 2/3',
      'E) 5/6',
    ],
    answer: 1,
    explanation: 'The numbers greater than 4 on a six-sided die are 5 and 6. That gives us 2 favorable outcomes out of 6 possible outcomes, so P = 2/6 = 1/3.'
  },
  {
    question: 'Two events A and B are mutually exclusive. Which of the following must be true?',
    options: [
      'A) P(A and B) = 1',
      'B) P(A or B) = 0',
      'C) P(A and B) = 0',
      'D) P(A | B) = 1',
      'E) P(B | A) = P(B)',
    ],
    answer: 2,
    explanation: 'Mutually exclusive (disjoint) events cannot occur at the same time, which means the probability of both events occurring together is zero: P(A and B) = 0.'
  },
  {
    question: 'The complement of an event A consists of:',
    options: [
      'A) The event that A and B both occur',
      'B) The event that A does not occur',
      'C) The event that A and B do not occur',
      'D) The event that A or B occurs',
      'E) The event that P(A) = 0',
    ],
    answer: 1,
    explanation: 'The complement of event A, denoted as A^c or A\', consists of all outcomes in the sample space where event A does not occur. By definition, P(A) + P(A^c) = 1.'
  },
  {
    question: 'In a simulation using random digits to represent tossing a fair coin, what would be a reasonable assignment of digits?',
    options: [
      'A) 0–4 = Heads, 5–9 = Tails',
      'B) 1–5 = Heads, 6–10 = Tails',
      'C) 0 = Heads, 1–9 = Tails',
      'D) Even = Heads, Odd = Tails',
      'E) 1 = Heads, 2 = Tails',
    ],
    answer: 0,
    explanation: 'For a fair coin, each outcome should have equal probability (0.5). Using digits 0-4 for heads and 5-9 for tails gives each outcome 5 digits out of 10, which represents the 50% probability correctly.'
  },
  {
    question: 'P(A) = 0.6, P(B) = 0.5, and P(A and B) = 0.3. What is P(A or B)?',
    options: [
      'A) 0.8',
      'B) 0.9',
      'C) 0.6',
      'D) 0.3',
      'E) 1.1',
    ],
    answer: 0,
    explanation: 'Using the union rule: P(A or B) = P(A) + P(B) - P(A and B) = 0.6 + 0.5 - 0.3 = 0.8. We subtract the intersection to avoid double-counting the overlap.'
  },
  {
    question: 'Events A and B are independent if and only if:',
    options: [
      'A) P(A) = P(B)',
      'B) P(A and B) = P(A) × P(B)',
      'C) P(A or B) = 1',
      'D) P(A | B) = 1',
      'E) P(A) = 1 – P(B)',
    ],
    answer: 1,
    explanation: 'Two events are independent if and only if P(A and B) = P(A) × P(B). This is the definition of independence - the occurrence of one event does not affect the probability of the other.'
  },
  {
    question: 'Suppose 70% of students at a school have a laptop. If 3 students are randomly selected, what is the probability all 3 have laptops?',
    options: [
      'A) 0.7',
      'B) 0.21',
      'C) 0.343',
      'D) 0.49',
      'E) 0.027',
    ],
    answer: 2,
    explanation: 'Assuming independence, we multiply the individual probabilities: P(all 3 have laptops) = 0.7 × 0.7 × 0.7 = 0.7³ = 0.343 or 34.3%.'
  },
  {
    question: 'A simulation is used to estimate the probability of flipping 3 heads in a row. What would indicate a well-designed simulation?',
    options: [
      'A) Only 10 trials are done',
      'B) It uses a single outcome',
      'C) Random digits 1–3 = Heads, 4–6 = Tails',
      'D) Each trial consists of 3 coin flips',
      'E) The outcomes are not recorded',
    ],
    answer: 3,
    explanation: 'A well-designed simulation should model the actual process. Since we want the probability of 3 heads in a row, each trial should consist of 3 coin flips, and we should repeat this many times to get a good estimate.'
  },
  {
    question: 'Which of the following violates the rules of probability?',
    options: [
      'A) P(A) = 0.4, P(B) = 0.3, P(A and B) = 0.1',
      'B) P(A) = 0.6, P(B) = 0.5, P(A and B) = 0.4',
      'C) P(A) = 0.9, P(B) = 0.5, P(A or B) = 1',
      'D) P(A) = 0.7, P(A and B) = 0.2',
      'E) P(A) = 1.1',
    ],
    answer: 4,
    explanation: 'Probability values must be between 0 and 1, inclusive. P(A) = 1.1 violates this fundamental rule since probabilities cannot exceed 1 (100%).'
  },
  {
    question: 'A probability model has three outcomes: A, B, and C. If P(A) = 0.4 and P(B) = 0.5, what is P(C)?',
    options: [
      'A) 0.1',
      'B) 0.0',
      'C) 0.9',
      'D) 1.0',
      'E) Cannot be determined',
    ],
    answer: 0,
    explanation: 'The sum of all probabilities in a probability model must equal 1. Since P(A) + P(B) + P(C) = 1, we have 0.4 + 0.5 + P(C) = 1, so P(C) = 1 - 0.4 - 0.5 = 0.1.'
  },
];

const APStatisticsUnit4Quiz = () => {
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
    setCurrent(current + 1);
    setSelected(answers[current + 1]);
  };

  const handleBack = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setCurrent(current - 1);
    setSelected(answers[current - 1]);
  };

  const handleSubmit = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setSubmitted(true);
  };

  const handleRetake = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
    setCrossedOut(Array(questions.length).fill(null).map(() => []));
  };

  const handleCrossOut = (idx: number) => {
    setCrossedOut(prev => {
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
      onClick={() => navigate('/ap-statistics/unit/4')}
    >
      <span className="text-xl">←</span> Back to Study Guide
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

export default APStatisticsUnit4Quiz;
