import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which sampling method involves splitting the population into groups and then randomly selecting entire groups?',
    options: [
      'A) Systematic sampling',
      'B) Stratified sampling',
      'C) Simple random sampling',
      'D) Cluster sampling',
      'E) Voluntary response sampling',
    ],
    answer: 3,
    explanation: 'Cluster sampling divides the population into heterogeneous groups (clusters) and then randomly selects entire clusters to include in the sample. This is different from stratified sampling, which samples from within each group.'
  },
  {
    question: 'In which sampling technique does every individual have exactly the same chance of being chosen?',
    options: [
      'A) Convenience sample',
      'B) Cluster sample',
      'C) Matched pairs design',
      'D) Stratified random sample',
      'E) Simple random sample',
    ],
    answer: 4,
    explanation: 'Simple random sampling (SRS) gives every individual in the population an equal chance of being selected. Other methods may give equal chances within groups, but not across the entire population.'
  },
  {
    question: 'What is a main disadvantage of voluntary response sampling?',
    options: [
      'A) It is the most expensive',
      'B) It requires random assignment',
      'C) Respondents tend to have strong opinions',
      'D) It always meets the independence assumption',
      'E) It ensures proportional representation',
    ],
    answer: 2,
    explanation: 'Voluntary response sampling attracts people with strong opinions who are motivated to respond, creating bias. Those with moderate views or no strong feelings are less likely to participate.'
  },
  {
    question: 'Which bias occurs when selected individuals fail to respond?',
    options: [
      'A) Undercoverage bias',
      'B) Non-response bias',
      'C) Response bias',
      'D) Wording bias',
      'E) Convenience bias',
    ],
    answer: 1,
    explanation: 'Non-response bias occurs when individuals who are selected for the sample do not respond or participate. This can skew results if non-responders differ systematically from responders.'
  },
  {
    question: 'An experiment compares two treatments: caffeine vs. placebo. Neither participants nor researchers know who gets which treatment. This is called:',
    options: [
      'A) Single-blind',
      'B) Double-blind',
      'C) Block design',
      'D) Matched-pairs design',
      'E) Completely randomized design',
    ],
    answer: 1,
    explanation: 'Double-blind means neither the subjects nor the researchers evaluating the outcomes know which treatment each subject received. This prevents both placebo effects and evaluator bias.'
  },
  {
    question: 'What is the main purpose of random assignment in experiments?',
    options: [
      'A) To control for confounding variables',
      'B) To increase the sample size',
      'C) To reduce variability within groups',
      'D) To ensure equal sample size per group',
      'E) To avoid voluntary response',
    ],
    answer: 0,
    explanation: 'Random assignment helps create roughly equivalent groups by distributing confounding variables equally across treatment groups, making it more likely that observed differences are due to the treatment.'
  },
  {
    question: 'In a matched pairs design, subjects are:',
    options: [
      'A) Divided into homogeneous strata',
      'B) Paired based on similarity before treatment',
      'C) Randomly assigned to clusters',
      'D) Surveyed using systematic intervals',
      'E) Observed without manipulation',
    ],
    answer: 1,
    explanation: 'Matched pairs design pairs subjects based on similar characteristics, then randomly assigns one from each pair to each treatment. This controls for variables that might affect the outcome.'
  },
  {
    question: 'Which sampling method is likely to produce undercoverage bias?',
    options: [
      'A) Random-digit dialing (if phones unlisted are omitted)',
      'B) Stratified random sampling',
      'C) Cluster sampling with equal clusters',
      'D) Systematic sampling across full roster',
      'E) Simple random sampling',
    ],
    answer: 0,
    explanation: 'Random-digit dialing that omits unlisted numbers creates undercoverage bias because people with unlisted numbers are systematically excluded from the sampling frame, potentially missing important population segments.'
  },
  {
    question: 'What is the primary difference between observational studies and experiments?',
    options: [
      'A) Observational studies use random sampling, experiments do not',
      'B) Experiments use treatments, observational studies do not',
      'C) Observational studies always estimate causation',
      'D) Experiments cannot use blocking',
      'E) Experiments are always double-blind',
    ],
    answer: 1,
    explanation: 'The key difference is that experiments actively apply treatments to subjects, while observational studies simply observe subjects without manipulating any variables. This is why experiments can establish causation while observational studies generally cannot.'
  },
  {
    question: 'How many of the \'CRCR\' principles must be met in a well-designed experiment?',
    options: [
      'A) All four: Comparison, Random assignment, Control, Replication',
      'B) Only Random assignment and Control',
      'C) Only Comparison and Random assignment',
      'D) Only Blocking and Matching',
      'E) Comparison, Control, and Blinding',
    ],
    answer: 0,
    explanation: 'All four CRCR principles are essential for a well-designed experiment: Comparison (between treatments), Random assignment (to reduce confounding), Control (of other variables), and Replication (sufficient sample size).'
  },
];

const APStatisticsUnit3Quiz = () => {
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
      onClick={() => navigate('/ap-statistics/unit/3')}
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

export default APStatisticsUnit3Quiz;
