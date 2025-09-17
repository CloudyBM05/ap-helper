import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'A confidence interval is constructed to estimate a population proportion. Which of the following best describes what a 95% confidence level means?',
    options: [
      'A) 95% of sample proportions fall within the interval.',
      'B) The population proportion falls in this interval with 95% probability.',
      'C) 95% of all intervals from repeated samples will capture the population proportion.',
      'D) 95% of the data fall within 2 standard deviations of the mean.',
      'E) There is a 95% chance the sample proportion is correct.',
    ],
    answer: 2,
    explanation: 'A 95% confidence level means that if we repeated the sampling process many times and constructed intervals using the same method, 95% of those intervals would contain the true population proportion. The population proportion is fixed but unknown.'
  },
  {
    question: 'Which of the following conditions must be checked before performing a one-proportion z-interval?',
    options: [
      'A) Randomness, Normality, Equal Variance',
      'B) Randomness, Independence, np ≥ 10 and nq ≥ 10',
      'C) Randomness, Normal Population, Sample Size > 30',
      'D) Large sample size, Equal variance, Random assignment',
      'E) Simple random sample, n ≥ 30, Normal distribution',
    ],
    answer: 1,
    explanation: 'For a one-proportion z-interval, we need: (1) Random sample, (2) Independence (10% condition), and (3) Normality condition (np ≥ 10 and n(1-p) ≥ 10). These ensure the sampling distribution is approximately normal.'
  },
  {
    question: 'A 95% confidence interval for a proportion is (0.25, 0.35). What does this suggest about the null hypothesis H₀: p = 0.40?',
    options: [
      'A) Fail to reject H₀ because 0.40 is outside the interval.',
      'B) Reject H₀ because 0.40 is not plausible given the interval.',
      'C) Cannot make a conclusion without a p-value.',
      'D) 0.40 is likely the true proportion.',
      'E) The confidence interval does not apply to this test.',
    ],
    answer: 1,
    explanation: 'Since 0.40 falls outside the 95% confidence interval (0.25, 0.35), this suggests that 0.40 is not a plausible value for the population proportion. We would reject H₀: p = 0.40 at the α = 0.05 level.'
  },
  {
    question: 'Which of the following changes would result in a narrower confidence interval for a proportion?',
    options: [
      'A) Decrease the sample size',
      'B) Increase the sample size',
      'C) Increase the confidence level',
      'D) Increase the population proportion',
      'E) Decrease the z-score used in the formula',
    ],
    answer: 1,
    explanation: 'Increasing the sample size decreases the margin of error because the standard error decreases as n increases (SE = √[p̂(1-p̂)/n]). This results in a narrower, more precise confidence interval.'
  },
  {
    question: 'Which of the following correctly describes a Type I error in hypothesis testing about a proportion?',
    options: [
      'A) Failing to reject a false null hypothesis',
      'B) Rejecting a true null hypothesis',
      'C) Rejecting a false alternative hypothesis',
      'D) Accepting a false alternative hypothesis',
      'E) Using a significance level that\'s too low',
    ],
    answer: 1,
    explanation: 'A Type I error occurs when we reject the null hypothesis when it is actually true. The probability of making a Type I error is α (the significance level). This is also called a "false positive."'
  },
  {
    question: 'A test is performed at the 0.05 significance level, and the p-value is 0.03. What is the correct conclusion?',
    options: [
      'A) Fail to reject the null hypothesis because 0.03 < 0.05',
      'B) Reject the null hypothesis because 0.03 > 0.05',
      'C) Reject the null hypothesis because 0.03 < 0.05',
      'D) Fail to reject the null hypothesis because 0.03 is small',
      'E) Increase the sample size to verify results',
    ],
    answer: 2,
    explanation: 'When the p-value (0.03) is less than the significance level α (0.05), we reject the null hypothesis. The p-value represents the probability of getting results as extreme or more extreme if H₀ were true.'
  },
  {
    question: 'When conducting a 2-proportion z-test, which condition justifies the use of the pooled proportion in the standard error formula?',
    options: [
      'A) When the sample sizes are equal',
      'B) When both samples are independent',
      'C) When the null hypothesis assumes p₁ = p₂',
      'D) When both sample proportions are below 0.5',
      'E) When the population proportions are unknown',
    ],
    answer: 2,
    explanation: 'The pooled proportion is used when the null hypothesis assumes p₁ = p₂ (no difference between proportions). Under this assumption, we can combine both samples to get a better estimate of the common proportion.'
  },
  {
    question: 'What is the correct formula for the standard deviation of a sampling distribution of the sample proportion p̂?',
    options: [
      'A) √(pq/n)',
      'B) √[p(1–p)/n]',
      'C) p(1–p)/n',
      'D) √(p² + q²)',
      'E) √[(p̂)(1–p̂)]',
    ],
    answer: 1,
    explanation: 'The standard deviation (standard error) of the sampling distribution of p̂ is √[p(1-p)/n], where p is the population proportion and n is the sample size. This measures the variability of sample proportions.'
  },
  {
    question: 'The power of a hypothesis test is:',
    options: [
      'A) The probability of rejecting a true null hypothesis',
      'B) The probability of failing to reject a true null hypothesis',
      'C) The probability of rejecting a false null hypothesis',
      'D) The probability of making a Type I error',
      'E) Equal to 1 – α',
    ],
    answer: 2,
    explanation: 'Power is the probability of correctly rejecting a false null hypothesis. It equals 1 - β, where β is the probability of a Type II error. Higher power means the test is better at detecting true effects.'
  },
  {
    question: 'A researcher uses a significance level of 0.10 instead of 0.05. Which of the following is a likely result?',
    options: [
      'A) Higher probability of a Type II error',
      'B) Higher probability of a Type I error',
      'C) Decreased power of the test',
      'D) Smaller critical value',
      'E) No impact on the test result',
    ],
    answer: 1,
    explanation: 'Using α = 0.10 instead of α = 0.05 increases the significance level, which directly increases the probability of making a Type I error (rejecting a true null hypothesis). It also increases the power of the test.'
  },
];

const APStatisticsUnit6Quiz = () => {
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
      onClick={() => navigate('/ap-statistics/unit/6')}
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

export default APStatisticsUnit6Quiz;
