import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'You are testing whether the observed distribution of four categories matches a claimed distribution of 20%, 30%, 25%, and 25%. Which of the following is the correct degrees of freedom to use for the chi-square goodness-of-fit test?',
    options: [
      'A) 2',
      'B) 3',
      'C) 4',
      'D) Depends on sample size',
      'E) Depends on expected counts',
    ],
    answer: 1,
    explanation: 'Degrees of freedom for goodness-of-fit test = (number of categories − 1) = 4 − 1 = 3. The degrees of freedom depend only on the number of categories, not on sample size or expected counts.'
  },
  {
    question: 'In a chi-square goodness-of-fit analysis, the test statistic is',
    options: [
      'A) ∑(Ei−Oi)²/Ei, and larger values indicate better fit.',
      'B) ∑(Oi−Ei)²/Ei, and larger values cast doubt on the claimed distribution.',
      'C) ∑(Oi−Ei)²/Oi, and smaller values indicate poor fit.',
      'D) ∑|Oi−Ei|/Ei, and larger values indicate better fit.',
      'E) ∑(Oi−Ei)²/Ei, and smaller values invalidate the null.',
    ],
    answer: 1,
    explanation: 'Chi-square statistic = ∑(Oi−Ei)²/Ei. Larger values indicate a poor fit (larger differences between observed and expected counts), which casts doubt on the claimed distribution.'
  },
  {
    question: 'Which of the following conditions is not required for a valid chi-square test for independence?',
    options: [
      'A) Random sampling',
      'B) All expected counts ≥ 5',
      'C) Sample size < 10% of population',
      'D) The variables are both quantitative',
      'E) Observations are independent',
    ],
    answer: 3,
    explanation: 'Variables must be categorical, not quantitative. Chi-square tests are specifically designed for categorical data. Random sampling, expected counts ≥ 5, independence, and sample size < 10% of population are all required conditions.'
  },
  {
    question: 'A contingency table has 4 rows and 3 columns. For a chi-square test of independence, the degrees of freedom is',
    options: [
      'A) 3',
      'B) 4',
      'C) 6',
      'D) 9',
      'E) 12',
    ],
    answer: 2,
    explanation: 'Degrees of freedom for test of independence = (rows − 1)(columns − 1) = (4 − 1)(3 − 1) = 3 × 2 = 6.'
  },
  {
    question: 'True or False: In a chi-square test for homogeneity, the objective is to compare how multiple populations differ in the distribution of a single categorical variable.',
    options: [
      'A) True, and the null hypothesis is all populations share the same distribution.',
      'B) True, but the null hypothesis is that distributions are different.',
      'C) False, the test for homogeneity compares means between groups.',
      'D) False, homogeneity refers to checking within one population only.',
      'E) False, homogeneity compares numerical variables across populations.',
    ],
    answer: 0,
    explanation: 'True. Chi-square test for homogeneity compares distributions of a categorical variable across multiple populations. The null hypothesis states that all populations have the same distribution.'
  },
  {
    question: 'You conduct a chi-square test of independence between gender (male/female) and preference (A/B/C) with a total sample size of 300. All expected cell counts are above 5. The resulting chi-square statistic is 12.59 on df=2, with P‑value ≈ 0.002. Which conclusion is appropriate at the 5% level?',
    options: [
      'A) Fail to reject H₀; no association.',
      'B) Reject H₀; strong evidence of association.',
      'C) Fail to reject H₀; weak evidence only.',
      'D) Reject H₀; expected counts are too small.',
      'E) Fail to reject H₀; chi-square too small.',
    ],
    answer: 1,
    explanation: 'P-value ≈ 0.002 < 0.05, so we reject H₀. There is strong evidence of an association between gender and preference at the 5% significance level.'
  },
  {
    question: 'In which scenario would you most appropriately use a chi-square goodness-of-fit test?',
    options: [
      'A) To see if two quantitative variables are linearly related.',
      'B) To test whether the proportions across categories differ from known values.',
      'C) To compare means across several groups.',
      'D) To assess independence between two categorical variables in one sample.',
      'E) To compare distributions of a categorical variable across two samples.',
    ],
    answer: 1,
    explanation: 'Goodness-of-fit test checks if observed proportions in categories differ from known (theoretical) proportions. It tests one categorical variable against a claimed distribution.'
  },
  {
    question: 'When performing a chi-square test for goodness-of-fit with 5 categories, what\'s the minimum expected count per category needed for valid results?',
    options: [
      'A) At least 30',
      'B) At least 10',
      'C) At least 5',
      'D) At least 1',
      'E) None; expected counts don\'t matter',
    ],
    answer: 2,
    explanation: 'Expected counts should be at least 5 for each category to ensure the chi-square approximation is valid. This is a key condition for all chi-square tests.'
  },
  {
    question: 'What does a large chi-square statistic indicate in a goodness-of-fit test?',
    options: [
      'A) The observed data closely match the expected distribution.',
      'B) Observed and expected counts differ substantially.',
      'C) There is too much random sampling error.',
      'D) The null hypothesis should be retained.',
      'E) The test is invalid because expected counts are small.',
    ],
    answer: 1,
    explanation: 'A large chi-square statistic means observed counts differ substantially from expected counts, suggesting poor fit between the data and the claimed distribution. This provides evidence against the null hypothesis.'
  },
  {
    question: 'In a chi-square test for homogeneity, you are comparing survey responses (Agree/Disagree/Neutral) across three different schools. Which statement is correct?',
    options: [
      'A) This is a test of independence because one sample includes all schools.',
      'B) Use df = (rows − 1)(columns − 1) = (3 − 1)(3 − 1) = 4.',
      'C) The null hypothesis: the categorical distribution is the same across the schools.',
      'D) Expected counts are based on row totals only.',
      'E) This analysis cannot be done using a chi-square test.',
    ],
    answer: 2,
    explanation: 'In a homogeneity test, the null hypothesis states that the distribution of the categorical variable (survey responses) is the same across all groups (schools). We\'re comparing multiple populations on one categorical variable.'
  },
];

const APStatisticsUnit8Quiz = () => {
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
      onClick={() => navigate('/ap-statistics/unit/8')}
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

export default APStatisticsUnit8Quiz;
