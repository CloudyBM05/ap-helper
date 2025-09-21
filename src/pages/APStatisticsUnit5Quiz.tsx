import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following best describes the purpose of a sampling distribution?',
    options: [
      'A) To identify the population distribution.',
      'B) To determine the exact value of a population parameter.',
      'C) To show how a statistic varies in repeated samples.',
      'D) To compare two population distributions.',
      'E) To estimate the margin of error in a census.',
    ],
    answer: 2,
    explanation: 'A sampling distribution shows how a sample statistic (like x̄ or p̂) varies across all possible samples of the same size from a population. This variability is crucial for making statistical inferences.'
  },
  {
    question: 'A statistic is said to be an unbiased estimator of a parameter if:',
    options: [
      'A) The standard deviation is zero.',
      'B) The center of the sampling distribution is far from the population parameter.',
      'C) The sample size is very large.',
      'D) The mean of the sampling distribution equals the parameter.',
      'E) The statistic changes very little from sample to sample.',
    ],
    answer: 3,
    explanation: 'An estimator is unbiased when the mean of its sampling distribution equals the true population parameter. For example, the sample mean x̄ is unbiased because E(x̄) = μ.'
  },
  {
    question: 'Which of the following statistics is most likely to be a biased estimator of the population parameter?',
    options: [
      'A) Sample mean',
      'B) Sample proportion',
      'C) Median of a random sample',
      'D) Range of a random sample',
      'E) Standard deviation of a random sample',
    ],
    answer: 3,
    explanation: 'The range is a poor estimator of any population parameter because it\'s highly variable and not centered at any meaningful population value. Sample mean, proportion, and median are generally unbiased estimators.'
  },
  {
    question: 'If X̄ is the sample mean from a simple random sample of size n, and μ is the population mean, then the expected value of X̄ is:',
    options: [
      'A) Less than μ',
      'B) Greater than μ',
      'C) Equal to μ',
      'D) Unrelated to μ',
      'E) Always 0',
    ],
    answer: 2,
    explanation: 'The expected value of the sample mean equals the population mean: E(X̄) = μ. This is what makes the sample mean an unbiased estimator of the population mean.'
  },
  {
    question: 'Which of the following statements about the sampling distribution of the sample proportion p̂ is correct?',
    options: [
      'A) It is always normally distributed.',
      'B) Its mean is equal to the sample proportion.',
      'C) It has a standard deviation that decreases as the sample size increases.',
      'D) It depends on the sample standard deviation.',
      'E) It only applies when np > 30.',
    ],
    answer: 2,
    explanation: 'The standard deviation of p̂ is √[p(1-p)/n], which decreases as n increases. The mean equals the population proportion p, not the sample proportion, and normality requires np ≥ 10 and n(1-p) ≥ 10.'
  },
  {
    question: 'A population is not normally distributed. Which condition must be met in order for the sampling distribution of the sample mean to be approximately normal?',
    options: [
      'A) The sample must be a convenience sample.',
      'B) The population must be symmetrical.',
      'C) The sample size must be at least 30.',
      'D) The sample size must be less than 10% of the population.',
      'E) The sample must contain no outliers.',
    ],
    answer: 2,
    explanation: 'The Central Limit Theorem states that for non-normal populations, the sampling distribution of x̄ becomes approximately normal when n ≥ 30, regardless of the population\'s shape.'
  },
  {
    question: 'According to the Central Limit Theorem, the sampling distribution of the sample mean will be approximately normal if:',
    options: [
      'A) The population distribution is normal, regardless of n.',
      'B) The sample size is small and the population is skewed.',
      'C) The sample standard deviation is small.',
      'D) The sample size is large enough, regardless of population shape.',
      'E) The sample mean equals the population mean.',
    ],
    answer: 3,
    explanation: 'The Central Limit Theorem guarantees that as sample size increases (typically n ≥ 30), the sampling distribution of the sample mean approaches normality, regardless of the original population\'s shape.'
  },
  {
    question: 'Suppose you take many random samples of size 50 from a population and calculate the sample mean each time. What will the standard deviation of these sample means be?',
    options: [
      'A) Equal to the population standard deviation',
      'B) Larger than the population standard deviation',
      'C) Equal to σ/√50',
      'D) Equal to √50/σ',
      'E) Cannot be determined without knowing the mean',
    ],
    answer: 2,
    explanation: 'The standard deviation of the sampling distribution of sample means (standard error) is σ/√n. With n = 50, this equals σ/√50, which is much smaller than the population standard deviation σ.'
  },
  {
    question: 'Which of the following increases the standard deviation of a sampling distribution of p̂?',
    options: [
      'A) Increasing the population size',
      'B) Decreasing the sample size',
      'C) Increasing the number of samples',
      'D) Increasing the population mean',
      'E) Decreasing the population proportion',
    ],
    answer: 1,
    explanation: 'The standard deviation of p̂ is √[p(1-p)/n]. Decreasing the sample size n increases this standard deviation, making the sampling distribution more spread out and less precise.'
  },
  {
    question: 'A sampling distribution has a mean of 10 and a standard deviation of 2. What is the approximate probability that a sample mean is greater than 14 if the sample size is large and the distribution is normal?',
    options: [
      'A) 0.500',
      'B) 0.3085',
      'C) 0.0228',
      'D) 0.8413',
      'E) 0.9772',
    ],
    answer: 2,
    explanation: 'Using the standard normal distribution: z = (14 - 10)/2 = 2. P(Z > 2) = 1 - P(Z ≤ 2) = 1 - 0.9772 = 0.0228. This represents the area in the right tail beyond 2 standard deviations.'
  },
];

const APStatisticsUnit5Quiz = () => {
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
      onClick={() => navigate('/ap-statistics/unit/5')}
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

export default APStatisticsUnit5Quiz;
