import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: "Which phase of the General Adaptation Syndrome (GAS) is associated with the body’s heightened resistance to stress after the initial reaction?",
    options: [
      "A. Alarm",
      "B. Exhaustion",
      "C. Resistance",
      "D. Recovery",
    ],
    answer: 2,
    explanation: "The resistance phase is when the body adapts and remains on alert after the initial alarm reaction."
  },
  {
    question: "Which of the following best describes a positive symptom of schizophrenia?",
    options: [
      "A. Flat affect",
      "B. Catatonic stupor",
      "C. Delusions",
      "D. Lack of motivation",
    ],
    answer: 2,
    explanation: "Delusions are a positive symptom (an added experience), while the others are negative symptoms (loss of normal function)."
  },
  {
    question: "Which of the following disorders is characterized by intrusive thoughts and repetitive behaviors aimed at reducing anxiety?",
    options: [
      "A. Generalized anxiety disorder",
      "B. Panic disorder",
      "C. Obsessive-compulsive disorder",
      "D. Major depressive disorder",
    ],
    answer: 2,
    explanation: "Obsessive-compulsive disorder involves obsessions (intrusive thoughts) and compulsions (repetitive behaviors)."
  },
  {
    question: "Which of the following pairs correctly matches the therapeutic technique with the theoretical perspective it is based on?",
    options: [
      "A. Free association – Behavioral",
      "B. Systematic desensitization – Cognitive",
      "C. Dream analysis – Psychodynamic",
      "D. Cognitive restructuring – Humanistic",
    ],
    answer: 2,
    explanation: "Dream analysis is a psychodynamic technique. The others are mismatched."
  },
  {
    question: "Which of the following scenarios best illustrates the use of problem-focused coping?",
    options: [
      "A. Meditating to feel less anxious about a big test",
      "B. Ignoring a health diagnosis to avoid stress",
      "C. Seeking emotional support from a friend",
      "D. Creating a study plan to better prepare for an exam",
    ],
    answer: 3,
    explanation: "Problem-focused coping involves taking direct action to address the source of stress, such as making a study plan."
  },
  {
    question: "Which of the following is a major advantage of using the DSM-5 for diagnosing psychological disorders?",
    options: [
      "A. It provides a single theoretical explanation for disorders.",
      "B. It eliminates cultural bias in diagnoses.",
      "C. It standardizes diagnostic criteria for clinicians.",
      "D. It explains the unconscious causes of symptoms.",
    ],
    answer: 2,
    explanation: "The DSM-5 provides standardized diagnostic criteria, improving reliability among clinicians."
  },
  {
    question: "Which of the following disorders involves episodes of mania alternating with depression?",
    options: [
      "A. Major depressive disorder",
      "B. Generalized anxiety disorder",
      "C. Bipolar disorder",
      "D. Schizophrenia",
    ],
    answer: 2,
    explanation: "Bipolar disorder is characterized by alternating periods of mania and depression."
  },
  {
    question: "A person who feels persistent, nonspecific worry most days for over 6 months without a clear cause may be diagnosed with:",
    options: [
      "A. Social anxiety disorder",
      "B. Generalized anxiety disorder",
      "C. Panic disorder",
      "D. Posttraumatic stress disorder",
    ],
    answer: 1,
    explanation: "Generalized anxiety disorder involves chronic, nonspecific worry for at least 6 months."
  },
  {
    question: "According to the diathesis-stress model, a psychological disorder results from:",
    options: [
      "A. Repression of childhood trauma",
      "B. A combination of biological vulnerability and environmental stress",
      "C. Low levels of serotonin in the brain",
      "D. Negative thinking patterns reinforced by society",
    ],
    answer: 1,
    explanation: "The diathesis-stress model states that disorders result from a predisposition (diathesis) and environmental stress."
  },
  {
    question: "Which of the following best reflects the goal of humanistic therapy?",
    options: [
      "A. Replacing irrational beliefs with logical thinking",
      "B. Resolving unconscious conflicts through dream interpretation",
      "C. Teaching new behaviors through conditioning",
      "D. Promoting self-acceptance and personal growth",
    ],
    answer: 3,
    explanation: "Humanistic therapy focuses on self-acceptance and personal growth."
  },
];

const APPsychUnit5Quiz = () => {
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
    setSelected(answers[current + 1] ?? null);
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
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-yellow-700 shadow transition flex items-center gap-2 z-20"
      onClick={() => navigate('/ap-psychology-study-guide')}
    >
      <span className="text-xl">←</span> Back to Study Guide
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        <h1 className="text-3xl font-bold mb-8 text-center text-yellow-700">Quiz Results</h1>
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
                <div className="text-yellow-700 mb-1">You did not answer this question.</div>
              ) : isCorrect ? (
                <div className="text-green-700 mb-1">Correct!</div>
              ) : (
                <div className="text-red-700 mb-1">Incorrect.</div>
              )}
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Explanation:</h4>
                <p className="text-yellow-800">{q.explanation}</p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
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
                  selected === idx ? 'bg-yellow-500 text-white border-yellow-600' : 'bg-white text-slate-800'
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
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
            onClick={handleNext}
            disabled={selected === null}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
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

export default APPsychUnit5Quiz;
