import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'The law of demand states that, all else equal, as the price of a good rises:',
    options: [
      'A) Demand increases',
      'B) Quantity demanded decreases',
      'C) Quantity supplied decreases',
      'D) Supply increases',
      'E) Demand remains constant',
    ],
    answer: 1,
    explanation: 'The law of demand states that as price rises, quantity demanded falls, all else equal.'
  },
  {
    question: 'Which of the following would cause the demand curve for coffee to shift rightward?',
    options: [
      'A) Increase in the price of tea (a substitute)',
      'B) Decrease in consumer income for a normal good',
      'C) Expectation that coffee prices will fall next week',
      'D) Increase in the price of coffee',
      'E) An increase in the price of cream (a complement)',
    ],
    answer: 0,
    explanation: 'A higher price for a substitute (tea) increases demand for coffee, shifting the curve right.'
  },
  {
    question: 'If the price of gasoline rises, and consumers buy more electric cars instead, this illustrates:',
    options: [
      'A) Income effect',
      'B) Substitution effect',
      'C) Law of diminishing marginal utility',
      'D) Law of supply',
      'E) Market equilibrium',
    ],
    answer: 1,
    explanation: 'The substitution effect is when consumers switch to alternatives as prices change.'
  },
  {
    question: 'The supply curve generally slopes upward because:',
    options: [
      'A) Producers want to supply less at higher prices',
      'B) Higher prices encourage producers to supply more',
      'C) Consumer income increases',
      'D) Demand increases at higher prices',
      'E) Marginal utility diminishes with increased quantity',
    ],
    answer: 1,
    explanation: 'Higher prices provide incentive for producers to supply more, so the supply curve slopes upward.'
  },
  {
    question: 'Which of the following would shift the supply curve for wheat leftward?',
    options: [
      'A) A new farming technology that increases yield',
      'B) A decrease in the price of fertilizer',
      'C) An increase in taxes on wheat producers',
      'D) An increase in the number of farmers growing wheat',
      'E) A decrease in demand for bread',
    ],
    answer: 2,
    explanation: 'Higher taxes increase costs, reducing supply and shifting the curve leftward.'
  },
  {
    question: 'If the price elasticity of demand for a good is less than 1, demand is:',
    options: [
      'A) Perfectly elastic',
      'B) Elastic',
      'C) Inelastic',
      'D) Unit elastic',
      'E) Perfectly inelastic',
    ],
    answer: 2,
    explanation: 'Elasticity less than 1 means demand is inelastic (not very responsive to price changes).'
  },
  {
    question: 'Cross-price elasticity of demand between two goods is positive. This means the goods are:',
    options: [
      'A) Complements',
      'B) Substitutes',
      'C) Inferior goods',
      'D) Normal goods',
      'E) Unrelated',
    ],
    answer: 1,
    explanation: 'Positive cross-price elasticity means the goods are substitutes.'
  },
  {
    question: 'At market equilibrium:',
    options: [
      'A) Quantity demanded exceeds quantity supplied',
      'B) Quantity supplied exceeds quantity demanded',
      'C) Quantity demanded equals quantity supplied',
      'D) Price is at its minimum',
      'E) Demand curve shifts rightward',
    ],
    answer: 2,
    explanation: 'Market equilibrium is where quantity demanded equals quantity supplied.'
  },
  {
    question: 'A price ceiling set below the equilibrium price will likely cause:',
    options: [
      'A) A surplus',
      'B) A shortage',
      'C) No change in the market',
      'D) Equilibrium price to rise',
      'E) Supply to increase',
    ],
    answer: 1,
    explanation: 'A price ceiling below equilibrium creates excess demand, resulting in a shortage.'
  },
  {
    question: 'Which of the following is an example of a quota?',
    options: [
      'A) A tax on imported cars',
      'B) A limit on the number of foreign workers allowed in a country',
      'C) A subsidy given to farmers',
      'D) A minimum wage law',
      'E) Price floor on agricultural goods',
    ],
    answer: 1,
    explanation: 'A quota is a limit on quantity, such as restricting the number of foreign workers.'
  },
];

const APMicroUnit2Quiz = () => {
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
      onClick={() => navigate('/ap-microeconomics/unit/2')}
    >
      <span className="text-xl">←</span> Back to Unit 2
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

export default APMicroUnit2Quiz;
