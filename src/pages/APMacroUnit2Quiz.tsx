import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'According to the law of demand, holding everything else constant, an increase in the price of a good will:',
    options: [
      'A) Increase the quantity demanded',
      'B) Increase the demand',
      'C) Decrease the demand',
      'D) Decrease the quantity demanded',
      'E) Have no effect on demand or quantity demanded',
    ],
    answer: 3,
    explanation: 'The law of demand states that as price increases, the quantity demanded decreases, ceteris paribus.'
  },
  {
    question: 'If two goods are substitutes, an increase in the price of one will:',
    options: [
      'A) Increase the demand for the other',
      'B) Decrease the demand for the other',
      'C) Increase the quantity demanded of the other',
      'D) Shift the supply curve of the other to the left',
      'E) Cause no change in the market',
    ],
    answer: 0,
    explanation: 'When the price of a substitute rises, consumers switch to the other good, increasing its demand.'
  },
  {
    question: 'A decrease in consumer income will most likely lead to:',
    options: [
      'A) An increase in demand for normal goods',
      'B) A decrease in demand for inferior goods',
      'C) A decrease in demand for normal goods',
      'D) An increase in the quantity demanded for normal goods',
      'E) An increase in the supply of all goods',
    ],
    answer: 2,
    explanation: 'Normal goods see a decrease in demand when income falls; inferior goods see an increase.'
  },
  {
    question: 'A movement along the supply curve occurs when:',
    options: [
      'A) Technology improves',
      'B) The number of sellers increases',
      'C) Input costs decrease',
      'D) The price of the good itself changes',
      'E) Government imposes a tax on producers',
    ],
    answer: 3,
    explanation: 'A change in the price of the good itself causes a movement along the supply curve.'
  },
  {
    question: 'If the price of a good is below the equilibrium price, which of the following will occur?',
    options: [
      'A) A surplus will emerge, and price will fall',
      'B) Quantity supplied will exceed quantity demanded',
      'C) Quantity demanded will exceed quantity supplied',
      'D) There will be no incentive for price to change',
      'E) A surplus will emerge, and quantity demanded will rise',
    ],
    answer: 2,
    explanation: 'A price below equilibrium creates a shortage: quantity demanded exceeds quantity supplied.'
  },
  {
    question: 'Which of the following would shift the demand curve for pizza to the right?',
    options: [
      'A) A decrease in the price of pizza',
      'B) An increase in the price of hamburgers, a substitute',
      'C) An increase in the price of pizza ingredients',
      'D) A decrease in the price of soda, a complement',
      'E) B and D only',
    ],
    answer: 4,
    explanation: 'Both a higher price for a substitute (hamburgers) and a lower price for a complement (soda) increase demand for pizza.'
  },
  {
    question: 'Assume milk and cereal are complementary goods. What happens to the market for cereal if the price of milk increases?',
    options: [
      'A) Demand for cereal increases',
      'B) Quantity demanded of cereal increases',
      'C) Demand for cereal decreases',
      'D) Supply of cereal increases',
      'E) Quantity demanded of cereal remains unchanged',
    ],
    answer: 2,
    explanation: 'If the price of milk rises, people buy less milk and, as a result, less cereal. Demand for cereal decreases.'
  },
  {
    question: 'A price ceiling set below equilibrium will likely result in:',
    options: [
      'A) Surplus of the good',
      'B) Shortage of the good',
      'C) No change in the market',
      'D) An increase in producer surplus',
      'E) An increase in supply',
    ],
    answer: 1,
    explanation: 'A binding price ceiling (below equilibrium) causes a shortage because quantity demanded exceeds quantity supplied.'
  },
  {
    question: 'Producer surplus is best defined as:',
    options: [
      'A) The difference between the quantity supplied and the quantity demanded',
      'B) The difference between total revenue and total cost',
      'C) The area between the price and the supply curve',
      'D) The total amount producers receive from selling the good',
      'E) The amount producers lose due to a price ceiling',
    ],
    answer: 2,
    explanation: 'Producer surplus is the area above the supply curve and below the market price.'
  },
  {
    question: 'If the government imposes a binding price floor on corn, we should expect:',
    options: [
      'A) The market to clear at a lower price',
      'B) A shortage of corn',
      'C) A surplus of corn',
      'D) An increase in consumer surplus',
      'E) The price to remain at equilibrium',
    ],
    answer: 2,
    explanation: 'A binding price floor (above equilibrium) leads to a surplus because quantity supplied exceeds quantity demanded.'
  },
];

const APMacroUnit2Quiz = () => {
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
      onClick={() => navigate('/ap-macroeconomics/unit/2')}
    >
      <span className="text-xl">←</span> Back to Unit 2
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

export default APMacroUnit2Quiz;
