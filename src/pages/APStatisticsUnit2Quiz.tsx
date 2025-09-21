import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which graph is most appropriate for comparing two categorical variables?',
    options: [
      'A) Histogram',
      'B) Scatterplot',
      'C) Segmented bar graph',
      'D) Stem-and-leaf plot',
      'E) Dotplot',
    ],
    answer: 2,
    explanation: 'A segmented bar graph is specifically designed to compare two categorical variables by showing conditional relative frequencies within each category using colored segments.'
  },
  {
    question: 'A value of r = −0.95 indicates:',
    options: [
      'A) Weak positive linear relationship',
      'B) Moderate positive linear relationship',
      'C) Strong positive linear relationship',
      'D) Weak negative linear relationship',
      'E) Strong negative linear relationship',
    ],
    answer: 4,
    explanation: 'A correlation coefficient of −0.95 is very close to −1, indicating a strong negative linear relationship where as one variable increases, the other decreases consistently.'
  },
  {
    question: 'What does a high-leverage point in a scatterplot do?',
    options: [
      'A) Increases correlation if aligned',
      'B) Always weakens the regression slope',
      'C) Has little impact on regression',
      'D) Lies close to the mean of x',
      'E) Is always an outlier in y',
    ],
    answer: 0,
    explanation: 'A high-leverage point is far from the mean in the x-direction and can significantly pull the regression line toward itself. If it aligns with the overall pattern, it can increase correlation.'
  },
  {
    question: 'Which description of a residual plot indicates a good linear model?',
    options: [
      'A) Rising pattern as x increases',
      'B) Funnel shape, narrowing as x increases',
      'C) Mostly residuals below zero',
      'D) Random scatter around zero with no pattern',
      'E) Distinct curve suggesting quadratic fit',
    ],
    answer: 3,
    explanation: 'A good linear model should produce residuals that are randomly scattered around zero with no discernible pattern. Any patterns suggest the linear model may not be appropriate.'
  },
  {
    question: 'If r² = 0.64, what percent of variation in y is explained by x?',
    options: [
      'A) 36%',
      'B) 64%',
      'C) 80%',
      'D) 0.64%',
      'E) 16%',
    ],
    answer: 1,
    explanation: 'The coefficient of determination (r²) directly represents the percentage of variation in the response variable explained by the explanatory variable. So r² = 0.64 means 64% of the variation is explained.'
  },
  {
    question: 'Given the regression line ŷ = 5 + 2x, the slope means:',
    options: [
      'A) When x = 0, predicted y = 5',
      'B) For every 1-unit increase in x, ŷ increases by 5',
      'C) For every 1-unit increase in x, ŷ increases by 2',
      'D) Predicted y is always twice x',
      'E) There is no intercept',
    ],
    answer: 2,
    explanation: 'The slope (coefficient of x) is 2, which means for every 1-unit increase in x, the predicted value of y increases by 2 units.'
  },
  {
    question: 'Which statement correctly differentiates joint and conditional relative frequencies?',
    options: [
      'A) Joint: overall sample proportion in one row; conditional: proportion in a cell',
      'B) Joint: cell proportion relative to row total; conditional: cell proportion relative to total',
      'C) Joint: cell proportion relative to overall; conditional: cell proportion restricted to a row or column total',
      'D) Joint: proportion within columns only; conditional: proportion across table marginal totals',
      'E) Joint and conditional frequencies are identical',
    ],
    answer: 2,
    explanation: 'Joint relative frequency is the proportion of the entire sample in a specific cell, while conditional relative frequency is the proportion within a specific row or column (restricted to a subset).'
  },
  {
    question: 'In a two-way table, if marginal distributions are the same across groups, then:',
    options: [
      'A) Strong association exists',
      'B) No association exists',
      'C) Joint frequencies must be equal',
      'D) Conditional frequencies vary',
      'E) The two variables are correlated',
    ],
    answer: 1,
    explanation: 'When marginal distributions are the same across groups, it indicates no association between the variables. The conditional distributions are similar, suggesting independence.'
  },
  {
    question: 'If every y-value is multiplied by −1, the correlation becomes:',
    options: [
      'A) Same sign and magnitude',
      'B) Opposite sign, same magnitude',
      'C) Larger in magnitude',
      'D) Closer to zero',
      'E) It changes unpredictably',
    ],
    answer: 1,
    explanation: 'Multiplying all y-values by −1 reverses the direction of the relationship but maintains the same strength. The correlation coefficient changes sign but keeps the same magnitude.'
  },
  {
    question: 'Which is an example of extrapolation?',
    options: [
      'A) Predicting y at x = 5 when data spans 0–10',
      'B) Calculating residuals for each data point',
      'C) Predicting y at x = 20 when data spans 0–10',
      'D) Using a segmented bar graph',
      'E) Computing r² from the scatterplot',
    ],
    answer: 2,
    explanation: 'Extrapolation means predicting outside the range of the original data. Predicting at x = 20 when data only goes from 0–10 is extrapolation and is risky because the relationship may not hold beyond the observed range.'
  },
];

const APStatisticsUnit2Quiz = () => {
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
      onClick={() => navigate('/ap-statistics/unit/2')}
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

export default APStatisticsUnit2Quiz;
