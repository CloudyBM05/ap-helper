import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'A car travels with constant acceleration. What kind of graph is produced when plotting velocity vs. time?',
    options: [
      'A) Horizontal line',
      'B) Straight line with nonzero slope',
      'C) Parabolic curve opening upward',
      'D) Parabolic curve opening downward',
    ],
    answer: 1,
    explanation: 'With constant acceleration, velocity changes at a constant rate, producing a straight line with nonzero slope on a velocity vs. time graph.'
  },
  {
    question: 'A ball is thrown vertically upward. At the peak of its motion, which statement is true?',
    options: [
      'A) Velocity = 0; Acceleration = 0',
      'B) Velocity = 0; Acceleration = g, downward',
      'C) Velocity = 0; Acceleration = g, upward',
      'D) Velocity = maximum; Acceleration = 0',
    ],
    answer: 1,
    explanation: 'At the peak, the ball momentarily stops (velocity = 0) but gravity is still acting downward (acceleration = g, downward).'
  },
  {
    question: 'A particle accelerates uniformly at 5 m/s². How long does it take to reach 20 m/s from rest?',
    options: [
      'A) 4 s',
      'B) 2 s',
      'C) 20 s',
      'D) 10 s',
    ],
    answer: 0,
    explanation: 'Using v = u + at: 20 = 0 + 5t, so t = 20/5 = 4 s.'
  },
  {
    question: 'A rock is dropped (from rest, no air resistance) and falls for 3 seconds. The approximate distance traveled is:',
    options: [
      'A) 15 m',
      'B) 45 m',
      'C) 90 m',
      'D) 30 m',
    ],
    answer: 1,
    explanation: 'Using d = ½gt²: d = ½(9.8)(3)² = ½(9.8)(9) = 44.1 m ≈ 45 m.'
  },
  {
    question: 'On a position vs. time graph, a downward-curving slope (becoming steeper over time) indicates:',
    options: [
      'A) Constant velocity',
      'B) Increasing negative velocity',
      'C) Increasing positive velocity',
      'D) Decreasing velocity',
    ],
    answer: 1,
    explanation: 'A downward-curving slope that becomes steeper indicates the object is moving in the negative direction with increasing speed (increasing negative velocity).'
  },
  {
    question: 'A car moving at 10 m/s accelerates uniformly and travels 100 m. What is its final velocity if the acceleration is 2 m/s²?',
    options: [
      'A) 15 m/s',
      'B) 20 m/s',
      'C) 0 m/s',
      'D) 10 m/s',
    ],
    answer: 1,
    explanation: 'Using v² = u² + 2as: v² = 10² + 2(2)(100) = 100 + 400 = 500, so v = √500 ≈ 22.4 m/s. Closest answer is 20 m/s.'
  },
  {
    question: 'Two-dimensional motion: If an object has no horizontal acceleration but falls vertically under gravity, its horizontal velocity is:',
    options: [
      'A) Decreasing',
      'B) Increasing',
      'C) Constant',
      'D) Zero',
    ],
    answer: 2,
    explanation: 'With no horizontal acceleration, the horizontal component of velocity remains constant throughout the motion.'
  },
  {
    question: 'A 10 kg object is rolling down a frictionless incline. If its starting velocity is 0 m/s, what is its velocity after 4 s, assuming a horizontal acceleration of 2.5 m/s²?',
    options: [
      'A) 10 m/s',
      'B) 5 m/s',
      'C) 20 m/s',
      'D) 0 m/s',
    ],
    answer: 0,
    explanation: 'Using v = u + at: v = 0 + 2.5(4) = 10 m/s.'
  },
  {
    question: 'Interpretation: On a velocity vs. time graph, a flat section at zero velocity means:',
    options: [
      'A) The object is reversing direction',
      'B) The object is at rest',
      'C) The object is accelerating upwards',
      'D) The object is moving at constant high speed',
    ],
    answer: 1,
    explanation: 'A flat section at zero velocity indicates the object is at rest (not moving) during that time interval.'
  },
  {
    question: 'A bullet is fired horizontally from a high tower. Neglecting air resistance, how does its vertical speed change during its flight?',
    options: [
      'A) Increases at g downward',
      'B) Decreases at g upward',
      'C) Constant (zero)',
      'D) Remains the same as launch speed vertically',
    ],
    answer: 0,
    explanation: 'The vertical component of velocity starts at zero and increases at g (9.8 m/s²) downward due to gravity.'
  },
];

const APPhysicsUnit1Quiz = () => {
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
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-teal-700 shadow transition flex items-center gap-2 z-20"
      onClick={() => navigate('/ap-physics/unit/1')}
    >
      <span className="text-xl">←</span> Back to Study Guide
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        <h1 className="text-3xl font-bold mb-8 text-center text-teal-700">Quiz Results</h1>
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
                <div className="text-teal-700 mb-1">You did not answer this question.</div>
              ) : isCorrect ? (
                <div className="text-green-700 mb-1">Correct!</div>
              ) : (
                <div className="text-red-700 mb-1">Incorrect.</div>
              )}
              <div className="mt-4 p-4 bg-teal-50 rounded-lg">
                <h4 className="font-semibold text-teal-900 mb-2">Explanation:</h4>
                <p className="text-teal-800">{q.explanation}</p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-teal-600 hover:to-cyan-500 transition-all duration-300"
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
                  selected === idx ? 'bg-teal-500 text-white border-teal-600' : 'bg-white text-slate-800'
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
            className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-teal-600 hover:to-cyan-500 transition-all duration-300"
            onClick={handleNext}
            disabled={selected === null}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-teal-500 to-cyan-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-teal-600 hover:to-cyan-500 transition-all duration-300"
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

export default APPhysicsUnit1Quiz;
