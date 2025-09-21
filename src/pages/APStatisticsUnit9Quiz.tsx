import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'The parameter β in a regression model represents:',
    options: [
      'A) The intercept of the true regression line',
      'B) The slope of the true regression line',
      'C) The sample slope of the regression line',
      'D) The correlation coefficient',
    ],
    answer: 1,
    explanation: 'The parameter β (beta) represents the true population slope of the regression line. It describes the true change in the response variable for each one-unit increase in the explanatory variable.'
  },
  {
    question: 'Which condition is NOT necessary to perform inference on the slope of a least squares regression line?',
    options: [
      'A) The relationship between x and y is linear',
      'B) The residuals are approximately normally distributed',
      'C) The population slope β equals zero',
      'D) The observations are independent and randomly sampled',
    ],
    answer: 2,
    explanation: 'We do not require that the population slope β equals zero - this would be our null hypothesis that we are testing! The other conditions (linearity, normal residuals, independence) are all necessary assumptions for valid inference.'
  },
  {
    question: 'When the population standard deviation of the slope is unknown, the sampling distribution of the slope estimate follows:',
    options: [
      'A) A normal distribution',
      'B) A t-distribution with df = n – 1',
      'C) A t-distribution with df = n – 2',
      'D) A chi-square distribution',
    ],
    answer: 2,
    explanation: 'When the population standard deviation is unknown (which is almost always the case), we use the t-distribution with degrees of freedom = n - 2. We lose 2 degrees of freedom because we estimate both the slope and intercept from the data.'
  },
  {
    question: 'A 95% confidence interval for the slope β of a regression line with n = 20 data points uses a critical value t* with degrees of freedom equal to:',
    options: [
      'A) 18',
      'B) 19',
      'C) 20',
      'D) 21',
    ],
    answer: 0,
    explanation: 'For regression inference, degrees of freedom = n - 2 = 20 - 2 = 18. We subtract 2 because we estimate both the slope and intercept parameters from the sample data.'
  },
  {
    question: 'Suppose the 95% confidence interval for the slope of a regression line is (0.3, 1.2). What conclusion can be made?',
    options: [
      'A) There is no evidence of a linear relationship',
      'B) We are 95% confident that the true slope lies between 0.3 and 1.2',
      'C) The null hypothesis β = 0 is accepted',
      'D) The slope is likely negative',
    ],
    answer: 1,
    explanation: 'A confidence interval gives us a range of plausible values for the parameter. We are 95% confident that the true population slope β lies between 0.3 and 1.2. Since this interval does not contain 0, we also have evidence of a linear relationship.'
  },
  {
    question: 'Which of the following hypotheses corresponds to testing for no linear relationship between x and y?',
    options: [
      'A) H0: β = 1 vs. Ha: β ≠ 1',
      'B) H0: β = 0 vs. Ha: β ≠ 0',
      'C) H0: β = 0 vs. Ha: β > 0',
      'D) H0: β ≠ 0 vs. Ha: β = 0',
    ],
    answer: 1,
    explanation: 'No linear relationship means the slope is zero (β = 0). So we test H0: β = 0 (no linear relationship) versus Ha: β ≠ 0 (there is a linear relationship). This is typically a two-sided test.'
  },
  {
    question: 'In a hypothesis test for slope, a small p-value indicates:',
    options: [
      'A) Strong evidence that there is no linear relationship',
      'B) Strong evidence that the slope is zero',
      'C) Strong evidence that there is a linear relationship',
      'D) That the sample size is too small',
    ],
    answer: 2,
    explanation: 'A small p-value provides strong evidence against the null hypothesis. Since H0: β = 0 (no linear relationship), a small p-value gives strong evidence that there IS a linear relationship between the variables.'
  },
  {
    question: 'Which of the following is NOT a condition to check before performing inference on a regression slope?',
    options: [
      'A) Random sampling or assignment',
      'B) Approximately linear relationship',
      'C) Large sample size (n > 30) is required',
      'D) Residuals should be approximately normally distributed',
    ],
    answer: 2,
    explanation: 'Large sample size (n > 30) is NOT required for regression inference. The t-procedures work for any sample size as long as the other conditions are met: random sampling, linear relationship, normal residuals, and independence.'
  },
  {
    question: 'The standard error of the slope estimate in a regression is:',
    options: [
      'A) The standard deviation of the response variable y',
      'B) The standard deviation of the explanatory variable x',
      'C) The estimated standard deviation of the sampling distribution of the slope b',
      'D) The correlation coefficient between x and y',
    ],
    answer: 2,
    explanation: 'The standard error of the slope is the estimated standard deviation of the sampling distribution of the sample slope b. It measures how much the slope estimate varies from sample to sample.'
  },
  {
    question: 'In the regression equation ŷ = 4 + 3x, the interpretation of the slope 3 is:',
    options: [
      'A) For each 1-unit increase in x, y decreases by 3 on average',
      'B) For each 1-unit increase in x, y increases by 3 on average',
      'C) The average value of y when x = 3',
      'D) The average value of y when x = 4',
    ],
    answer: 1,
    explanation: 'The slope 3 means that for each 1-unit increase in x, the predicted value of y increases by 3 units on average. The slope always represents the change in y per unit change in x.'
  },
];

const APStatisticsUnit9Quiz = () => {
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
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
    setSubmitted(false);
    setCrossedOut(Array(questions.length).fill(null).map(() => []));
  };

  const handleCrossOut = (idx: number) => {
    const newCrossedOut = [...crossedOut];
    if (newCrossedOut[current].includes(idx)) {
      newCrossedOut[current] = newCrossedOut[current].filter((i) => i !== idx);
    } else {
      newCrossedOut[current] = [...newCrossedOut[current], idx];
    }
    setCrossedOut(newCrossedOut);
    if (selected === idx) {
      setSelected(null);
    }
  };

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-fuchsia-700 shadow transition flex items-center gap-2 z-20"
      onClick={() => navigate('/ap-statistics/unit/9')}
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

export default APStatisticsUnit9Quiz;
