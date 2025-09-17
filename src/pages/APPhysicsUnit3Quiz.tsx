import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Two ice skaters, initially at rest, push off each other on frictionless ice. Skater A has mass 50 kg, skater B has mass 70 kg. Which statement about their momenta after push-off is correct?',
    options: [
      'A) Both have equal momentum in opposite directions',
      'B) Skater A has greater momentum than skater B',
      'C) Skater B has greater momentum than skater A',
      'D) Both have zero momentum because total momentum must be zero',
    ],
    answer: 0,
    explanation: 'By conservation of momentum, the total momentum must remain zero. Since they start at rest, the momenta after push-off must be equal in magnitude but opposite in direction to sum to zero.'
  },
  {
    question: 'A 3 kg ball moving at 4 m/s collides head-on and sticks to a stationary 7 kg ball. What is their speed immediately after collision?',
    options: [
      'A) 1.2 m/s',
      'B) 1.5 m/s',
      'C) 3.0 m/s',
      'D) 4.0 m/s',
    ],
    answer: 0,
    explanation: 'Using conservation of momentum: m₁v₁ + m₂v₂ = (m₁ + m₂)v_final. So 3×4 + 7×0 = (3+7)×v_final. 12 = 10×v_final, therefore v_final = 1.2 m/s.'
  },
  {
    question: 'A constant force of 10 N acts on a 2 kg object initially at rest for 3 seconds. What is the impulse delivered to the object?',
    options: [
      'A) 3 Ns',
      'B) 6 Ns',
      'C) 10 Ns',
      'D) 30 Ns',
    ],
    answer: 3,
    explanation: 'Impulse = Force × time = 10 N × 3 s = 30 Ns. Impulse is the product of force and the time over which it acts.'
  },
  {
    question: 'An object\'s momentum changes from 20 kg·m/s to 50 kg·m/s over 5 seconds. What is the average force applied?',
    options: [
      'A) 6 N',
      'B) 14 N',
      'C) 70 N',
      'D) 250 N',
    ],
    answer: 0,
    explanation: 'Using the impulse-momentum theorem: F·Δt = Δp. So F = Δp/Δt = (50-20)/(5) = 30/5 = 6 N.'
  },
  {
    question: 'Which of the following statements about impulse and momentum is true?',
    options: [
      'A) Impulse is the rate of change of momentum',
      'B) Impulse and momentum are both vector quantities',
      'C) Impulse is only defined for elastic collisions',
      'D) Momentum is conserved only when impulse is zero',
    ],
    answer: 1,
    explanation: 'Both impulse and momentum are vector quantities with both magnitude and direction. Impulse equals the change in momentum (not the rate of change), and it applies to all types of collisions.'
  },
  {
    question: 'Two carts collide elastically on a frictionless track. Cart A has mass 1 kg, velocity 4 m/s; cart B has mass 2 kg, velocity 0 m/s. What is the velocity of cart A after the collision?',
    options: [
      'A) -1.33 m/s',
      'B) 1.33 m/s',
      'C) 2.67 m/s',
      'D) 4 m/s',
    ],
    answer: 0,
    explanation: 'For elastic collision: v₁f = ((m₁-m₂)/(m₁+m₂))v₁i + ((2m₂)/(m₁+m₂))v₂i = ((1-2)/(1+2))×4 + ((2×2)/(1+2))×0 = (-1/3)×4 = -1.33 m/s. The negative sign indicates direction reversal.'
  },
  {
    question: 'In a perfectly inelastic collision, what is always true?',
    options: [
      'A) Kinetic energy is conserved',
      'B) Objects bounce off without deforming',
      'C) The two objects stick together after collision',
      'D) Momentum is not conserved',
    ],
    answer: 2,
    explanation: 'In a perfectly inelastic collision, the objects stick together and move as one combined mass after collision. Momentum is still conserved, but kinetic energy is not.'
  },
  {
    question: 'The impulse-momentum theorem states that the impulse applied to an object equals:',
    options: [
      'A) The change in its velocity',
      'B) The change in its acceleration',
      'C) The change in its momentum',
      'D) The net external force on it',
    ],
    answer: 2,
    explanation: 'The impulse-momentum theorem states that impulse (J) equals the change in momentum: J = Δp = m·Δv. This is a fundamental relationship in mechanics.'
  },
  {
    question: 'A force-time graph shows a force of 20 N applied steadily for 4 seconds on a mass at rest. What is the change in momentum of the mass?',
    options: [
      'A) 5 kg·m/s',
      'B) 80 kg·m/s',
      'C) 20 kg·m/s',
      'D) 4 kg·m/s',
    ],
    answer: 1,
    explanation: 'The change in momentum equals the impulse, which is the area under the force-time graph. For constant force: Δp = F×t = 20 N × 4 s = 80 kg·m/s.'
  },
  {
    question: 'Two ice skaters of equal mass approach each other with equal speed and collide perfectly inelastically. What is their velocity immediately after the collision?',
    options: [
      'A) Zero',
      'B) Equal to their initial speed',
      'C) Twice their initial speed',
      'D) Depends on external forces',
    ],
    answer: 0,
    explanation: 'Since they have equal masses and equal but opposite velocities, the total momentum before collision is zero. By conservation of momentum, the total momentum after collision must also be zero, so their combined velocity is zero.'
  },
];

const APPhysicsUnit3Quiz = () => {
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
      onClick={() => navigate('/ap-physics/unit/3')}
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

export default APPhysicsUnit3Quiz;
