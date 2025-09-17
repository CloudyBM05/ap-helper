import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following best defines scarcity?',
    options: [
      'A) When goods have no price',
      'B) Unlimited resources and limited wants',
      'C) Limited resources and unlimited wants',
      'D) Market equilibrium is not reached',
      'E) A shortage of goods in the short run',
    ],
    answer: 2,
    explanation: 'Scarcity means resources are limited but wants are unlimited, forcing choices.'
  },
  {
    question: 'An economy is operating inside its production possibilities curve (PPC). This implies:',
    options: [
      'A) Resources are being used efficiently',
      'B) It is experiencing constant opportunity costs',
      'C) It can produce more of both goods',
      'D) It must sacrifice one good to produce more of another',
      'E) All opportunity costs are zero',
    ],
    answer: 2,
    explanation: 'Inside the PPC means resources are underutilized; more of both goods can be produced.'
  },
  {
    question: 'Which of the following is an example of a positive economic statement?',
    options: [
      'A) The government should reduce taxes on the wealthy',
      'B) College education is more valuable than trade school',
      'C) Increasing the minimum wage causes unemployment',
      'D) Everyone deserves free healthcare',
      'E) It is better to increase subsidies for renewable energy',
    ],
    answer: 2,
    explanation: 'Positive statements are objective and fact-based, like the effect of minimum wage on unemployment.'
  },
  {
    question: 'If a country can produce more of both goods than another country using the same resources, it has a(n):',
    options: [
      'A) Absolute advantage',
      'B) Comparative advantage',
      'C) Opportunity cost',
      'D) Specialization gain',
      'E) Law of diminishing marginal utility',
    ],
    answer: 0,
    explanation: 'Absolute advantage is producing more with the same resources.'
  },
  {
    question: 'The law of increasing opportunity cost implies that:',
    options: [
      'A) The PPC is a straight line',
      'B) More of one good can be produced without reducing another',
      'C) Resources are equally well suited to all tasks',
      'D) Producing more of one good causes increasing losses of another',
      'E) The economy is producing inefficiently',
    ],
    answer: 3,
    explanation: 'Increasing opportunity cost means more of one good requires giving up increasing amounts of another.'
  },
  {
    question: 'Which of the following would cause an outward shift in a country’s PPC?',
    options: [
      'A) Unemployment',
      'B) Increased consumer demand',
      'C) Decrease in labor supply',
      'D) Improved technology',
      'E) Rise in opportunity cost',
    ],
    answer: 3,
    explanation: 'Improved technology increases productive capacity, shifting the PPC outward.'
  },
  {
    question: 'A point on the production possibilities curve represents:',
    options: [
      'A) Unemployment',
      'B) An unattainable output',
      'C) Inefficiency',
      'D) Efficient use of resources',
      'E) A reduction in economic growth',
    ],
    answer: 3,
    explanation: 'Points on the PPC show efficient use of all resources.'
  },
  {
    question: 'A rational decision-maker will choose to do something when the:',
    options: [
      'A) Marginal cost exceeds the marginal benefit',
      'B) Marginal benefit exceeds the marginal cost',
      'C) Total benefit equals total cost',
      'D) Opportunity cost is greater than zero',
      'E) Sunk cost is ignored',
    ],
    answer: 1,
    explanation: 'Rational choices are made when marginal benefit > marginal cost.'
  },
  {
    question: 'Comparative advantage is based on:',
    options: [
      'A) Higher productivity',
      'B) Lower opportunity cost',
      'C) Access to more resources',
      'D) Lower absolute costs',
      'E) Perfect efficiency',
    ],
    answer: 1,
    explanation: 'Comparative advantage is determined by lower opportunity cost.'
  },
  {
    question: 'Which of the following statements is normative rather than positive?',
    options: [
      'A) A decrease in supply raises equilibrium price',
      'B) Education increases worker productivity',
      'C) The inflation rate was 3.2% last year',
      'D) The government should lower tuition costs',
      'E) Raising taxes decreases disposable income',
    ],
    answer: 3,
    explanation: 'Normative statements are opinion-based, like recommending lower tuition costs.'
  },
];

const APMicroUnit1Quiz = () => {
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
      onClick={() => navigate('/ap-microeconomics/unit/1')}
    >
      <span className="text-xl">←</span> Back to Unit 1
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

export default APMicroUnit1Quiz;
