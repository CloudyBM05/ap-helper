import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which variable is categorical?',
    options: [
      'A) Height in inches',
      'B) Number of languages spoken',
      'C) Favorite pizza topping',
      'D) Time to run 100\u202fm',
      'E) Temperature in \u00b0F',
    ],
    answer: 2,
    explanation: 'A categorical variable describes qualities or categories, not numbers. "Favorite pizza topping" is a category, while the others are quantitative.'
  },
  {
    question: 'Which graph is best for showing the median, quartiles, and potential outliers of a quantitative dataset?',
    options: [
      'A) Histogram',
      'B) Bar chart',
      'C) Boxplot',
      'D) Pie chart',
      'E) Dotplot',
    ],
    answer: 2,
    explanation: 'A boxplot is designed to show the median, quartiles, and outliers for quantitative data.'
  },
  {
    question: 'A dataset has mean = 50, median = 60. This suggests the distribution is:',
    options: [
      'A) Symmetric',
      'B) Uniform',
      'C) Skewed right',
      'D) Skewed left',
      'E) Bimodal',
    ],
    answer: 3,
    explanation: 'If the mean is less than the median, the distribution is left-skewed (skewed left).'
  },
  {
    question: 'Which measure is least affected by a single extreme outlier?',
    options: [
      'A) Mean',
      'B) Range',
      'C) Standard deviation',
      'D) Median',
      'E) Sum of values',
    ],
    answer: 3,
    explanation: 'The median is resistant to outliers, while mean, range, and standard deviation are not.'
  },
  {
    question: 'A distribution described as “unimodal and symmetric” could reasonably be summarized by:',
    options: [
      'A) Median and IQR',
      'B) Mean and SD',
      'C) Median and range',
      'D) Mode and median',
      'E) Mode and IQR',
    ],
    answer: 1,
    explanation: 'For unimodal, symmetric distributions, the mean and standard deviation are the best summary statistics.'
  },
  {
    question: 'In a histogram, downward skew means:',
    options: [
      'A) Mean > median',
      'B) Median > mean',
      'C) Mean = median',
      'D) Doesn’t affect mean vs median',
      'E) Mean < mode',
    ],
    answer: 1,
    explanation: 'Downward (left) skew means the median is greater than the mean.'
  },
  {
    question: 'A dotplot and stem‑and‑leaf plot both show:',
    options: [
      'A) Only summary statistics',
      'B) Distribution shape and outliers',
      'C) Only the mean and median',
      'D) Only categorized data',
      'E) Percentiles only',
    ],
    answer: 1,
    explanation: 'Both dotplots and stem-and-leaf plots show the shape of the distribution and potential outliers.'
  },
  {
    question: 'A five‑number summary includes all EXCEPT:',
    options: [
      'A) Minimum',
      'B) Q1',
      'C) Mode',
      'D) Q3',
      'E) Maximum',
    ],
    answer: 2,
    explanation: 'The five-number summary is minimum, Q1, median, Q3, and maximum. Mode is not included.'
  },
  {
    question: 'Which is NOT a quantitative variable?',
    options: [
      'A) Number of pages in a book',
      'B) Annual income',
      'C) Types of fruit in a basket',
      'D) Time taken to solve a puzzle',
      'E) Age in years',
    ],
    answer: 2,
    explanation: '"Types of fruit in a basket" is categorical, not quantitative.'
  },
  {
    question: 'After adding 5 to each data point in a dataset:',
    options: [
      'A) Mean and median increase by 5; SD unchanged',
      'B) Mean unchanged; median increases by 5; SD increases by 5',
      'C) Mean increases by 5; median unchanged; SD unchanged',
      'D) Mean increases by 5; median increases by 5; SD increases by 5',
      'E) Only SD increases',
    ],
    answer: 0,
    explanation: 'Adding a constant to every value increases the mean and median by that constant, but does not change the standard deviation.'
  },
];

const APStatisticsUnit1Quiz = () => {
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
      onClick={() => navigate('/ap-statistics/unit/1')}
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

export default APStatisticsUnit1Quiz;
