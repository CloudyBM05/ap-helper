import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following is not a required condition for conducting inference on the slope of a least-squares regression line?',
    options: [
      'A) The residuals are approximately normally distributed.',
      'B) The sample data were collected randomly.',
      'C) The sample size must be greater than 30.',
      'D) The relationship between the variables is linear.',
      'E) The residual plot shows no clear pattern.',
    ],
    answer: 2,
    explanation: 'There\'s no hard rule requiring n > 30. Inference is possible with smaller samples if conditions are met (especially normality of residuals). The others are part of the LINE assumptions: Linear, Independent, Normal, Equal spread (constant variance).'
  },
  {
    question: 'In a simple linear regression, the slope of the least-squares line was found to be 2.4 with a standard error of 0.5. For a sample size of 22, what is the correct 95% confidence interval for the true slope?',
    options: [
      'A) (1.4, 3.4)',
      'B) (1.5, 3.3)',
      'C) (1.3, 3.5)',
      'D) (1.6, 3.2)',
      'E) (1.7, 3.1)',
    ],
    answer: 0,
    explanation: 'Degrees of freedom = n - 2 = 20. Critical value t* ≈ 2.086 for df = 20 at 95%. CI = 2.4 ± 2.086(0.5) = 2.4 ± 1.043 → (1.357, 3.443), which is closest to choice A.'
  },
  {
    question: 'Suppose a 95% confidence interval for the slope of a regression line is (–0.1, 1.2). What can be concluded?',
    options: [
      'A) The slope is significantly different from 1.',
      'B) The data provides strong evidence of a negative linear relationship.',
      'C) The slope is exactly 0.5.',
      'D) There is not convincing evidence of a linear relationship.',
      'E) There is not sufficient evidence to conclude a positive linear relationship.',
    ],
    answer: 3,
    explanation: 'Since 0 is inside the interval, the slope might be zero, meaning no relationship. Therefore, we cannot reject the null hypothesis that β = 0, indicating insufficient evidence of a linear relationship.'
  },
  {
    question: 'You are testing the hypothesis H₀: β = 0 versus Hₐ: β ≠ 0. Which of the following best describes the meaning of the P-value from your regression output?',
    options: [
      'A) The probability that the slope is exactly 0.',
      'B) The probability of obtaining a sample slope as extreme or more extreme than the observed, assuming the true slope is 0.',
      'C) The probability of a Type II error.',
      'D) The probability that there is a strong linear relationship between the variables.',
      'E) The probability that the sample was randomly selected.',
    ],
    answer: 1,
    explanation: 'This is the textbook definition of a P-value — the probability of observing your data (or more extreme) under the assumption that the null hypothesis is true.'
  },
  {
    question: 'What distribution does the test statistic for the slope of a regression line follow?',
    options: [
      'A) Normal with mean 0 and standard deviation 1',
      'B) Standard normal distribution',
      'C) t-distribution with n – 1 degrees of freedom',
      'D) t-distribution with n – 2 degrees of freedom',
      'E) Chi-square distribution with 1 degree of freedom',
    ],
    answer: 3,
    explanation: 'Since two parameters are estimated (slope and intercept), the degrees of freedom = n - 2. The test statistic follows a t-distribution with n - 2 degrees of freedom.'
  },
  {
    question: 'Which of the following would invalidate the use of a t-distribution to construct a confidence interval for the slope?',
    options: [
      'A) Sample size is 15',
      'B) The residuals appear slightly skewed',
      'C) A residual plot shows a clear curved pattern',
      'D) The slope is close to 0',
      'E) The scatterplot shows moderate variability',
    ],
    answer: 2,
    explanation: 'A clear curved pattern in the residuals violates the linearity condition, which is fundamental for regression inference. Minor skewness is tolerable, but a curved pattern indicates the linear model is inappropriate.'
  },
  {
    question: 'Suppose a regression line has the form ŷ = 5.1 + 0.87x. What is the best interpretation of the slope in context?',
    options: [
      'A) When x = 0, y is predicted to be 0.87.',
      'B) On average, y increases by 0.87 units for each increase of 1 unit in x.',
      'C) The correlation between x and y is 0.87.',
      'D) For every 0.87 unit increase in x, y increases by 1.',
      'E) 87% of the variation in y is explained by the model.',
    ],
    answer: 1,
    explanation: 'The slope represents the rate of change in y per 1 unit increase in x. So for each 1-unit increase in x, y increases by 0.87 units on average.'
  },
  {
    question: 'Which of the following scenarios would most likely produce a confidence interval for the slope that contains 0?',
    options: [
      'A) A strong positive linear relationship',
      'B) A small sample size and high variability in the data',
      'C) A low standard error for the slope estimate',
      'D) A tight clustering of points around a linear trend',
      'E) A high t-score for the slope estimate',
    ],
    answer: 1,
    explanation: 'Small sample size and high variability both increase the standard error, which widens the confidence interval, making it more likely to include 0 (indicating no significant relationship).'
  },
  {
    question: 'What is the standard error of the slope (SEb) primarily influenced by?',
    options: [
      'A) The slope of the regression line',
      'B) The sample mean of the y-values',
      'C) The strength of the correlation between x and y',
      'D) The variability in the residuals and the spread of the x-values',
      'E) The value of the t-statistic used',
    ],
    answer: 3,
    explanation: 'SEb = s/√Σ(xi - x̄)², where s is the residual standard error and Σ(xi - x̄)² represents the spread of x-values. Both residual variability and x-spread directly affect the standard error.'
  },
  {
    question: 'Which of the following statements is true regarding inference for the slope of a regression line?',
    options: [
      'A) A slope of 0 indicates a perfect linear relationship.',
      'B) A significant P-value means the slope is negative.',
      'C) A confidence interval for the slope that does not contain 0 suggests a statistically significant relationship.',
      'D) Inference for slope requires that x values are normally distributed.',
      'E) The slope must be positive for the regression line to be useful.',
    ],
    answer: 2,
    explanation: 'If 0 is not in the confidence interval, we can reject H₀: β = 0, meaning the slope is significantly different from 0, indicating a statistically significant linear relationship.'
  },
];

const APStatisticsUnit7Quiz = () => {
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
      onClick={() => navigate('/ap-statistics/unit/7')}
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

export default APStatisticsUnit7Quiz;
