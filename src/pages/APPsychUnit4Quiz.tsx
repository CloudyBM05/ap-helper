import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following best illustrates the fundamental attribution error?',
    options: [
      'A. Maria believes she failed her test because the questions were unfair.',
      'B. Jorge assumes his classmate is lazy because she arrived late without considering traffic.',
      'C. Alicia takes full credit for her team’s success and blames the coach for losses.',
      'D. David thinks his success in math is due to his hard work.',
    ],
    answer: 1,
    explanation: 'The fundamental attribution error is overemphasizing personal traits and underestimating situational factors, as in assuming someone is lazy for being late.'
  },
  {
    question: 'According to the Elaboration Likelihood Model, which route to persuasion is most likely used when someone buys a product based on the attractiveness of the spokesperson?',
    options: [
      'A. Cognitive route',
      'B. Logical route',
      'C. Central route',
      'D. Peripheral route',
    ],
    answer: 3,
    explanation: 'The peripheral route relies on superficial cues like attractiveness rather than logic or content.'
  },
  {
    question: 'A person feels discomfort because they believe lying is wrong but tell a lie to avoid trouble. Which concept explains this discomfort?',
    options: [
      'A. Social facilitation',
      'B. Cognitive dissonance',
      'C. Fundamental attribution error',
      'D. Learned helplessness',
    ],
    answer: 1,
    explanation: 'Cognitive dissonance is the discomfort from holding conflicting beliefs and behaviors.'
  },
  {
    question: 'Which personality theory emphasizes reciprocal determinism, where behavior, environment, and cognition all influence each other?',
    options: [
      'A. Humanistic theory',
      'B. Social-cognitive theory',
      'C. Psychodynamic theory',
      'D. Trait theory',
    ],
    answer: 1,
    explanation: 'Social-cognitive theory (Bandura) emphasizes reciprocal determinism.'
  },
  {
    question: 'Which of the following is one of the Big Five personality traits?',
    options: [
      'A. Introversion',
      'B. Self-efficacy',
      'C. Agreeableness',
      'D. Locus of control',
    ],
    answer: 2,
    explanation: 'Agreeableness is one of the Big Five; the others are not.'
  },
  {
    question: 'According to Freud, which defense mechanism involves directing unacceptable impulses toward a safer substitute target?',
    options: [
      'A. Regression',
      'B. Displacement',
      'C. Reaction formation',
      'D. Rationalization',
    ],
    answer: 1,
    explanation: 'Displacement is redirecting impulses to a safer outlet.'
  },
  {
    question: 'A person with a high internal locus of control would most likely believe that:',
    options: [
      'A. Fate determines the outcome of most situations.',
      'B. Luck plays the biggest role in life.',
      'C. Their actions directly affect what happens to them.',
      'D. Most people are in control of others\' decisions.',
    ],
    answer: 2,
    explanation: 'Internal locus of control means believing you control your own outcomes.'
  },
  {
    question: 'Which of the following best illustrates the foot-in-the-door phenomenon?',
    options: [
      'A. Asking for a small favor first increases the likelihood of getting a bigger one later.',
      'B. A person denies a large request, so a smaller one is more likely to be accepted.',
      'C. Complying with a group even when you disagree internally.',
      'D. Changing your belief because you were persuaded by logical reasoning.',
    ],
    answer: 0,
    explanation: 'Foot-in-the-door is getting agreement to a small request to increase compliance with a larger one.'
  },
  {
    question: 'Which of the following is most associated with groupthink?',
    options: [
      'A. Encouraging diverse opinions before making a decision',
      'B. Group members suppress dissent to maintain harmony',
      'C. A group becoming more extreme after discussion',
      'D. Group members working less hard when in a team',
    ],
    answer: 1,
    explanation: 'Groupthink is when dissent is suppressed to maintain group harmony.'
  },
  {
    question: 'What does Maslow’s hierarchy of needs suggest must be met before achieving self-actualization?',
    options: [
      'A. Esteem and self-efficacy',
      'B. Achievement and recognition',
      'C. Basic physiological and safety needs',
      'D. Peer approval and social conformity',
    ],
    answer: 2,
    explanation: 'Basic physiological and safety needs must be met before self-actualization.'
  },
];

const APPsychUnit4Quiz = () => {
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

export default APPsychUnit4Quiz;
