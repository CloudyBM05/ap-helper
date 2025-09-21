import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'A mass attached to a spring oscillates with a period of 2 seconds. If the mass is quadrupled, what is the new period?',
    options: [
      'A) 1 s',
      'B) 2 s',
      'C) 4 s',
      'D) 8 s',
    ],
    answer: 2,
    explanation: 'For a mass-spring system, T = 2π√(m/k). Period T ∝ √m, so if mass is quadrupled, T increases by √4 = 2. New period = 2 × 2 = 4 s.'
  },
  {
    question: 'The displacement of a particle in SHM is given by x = A cos(ωt + φ). Which of the following is true about the particle\'s velocity?',
    options: [
      'A) It is zero at maximum displacement',
      'B) It is maximum at maximum displacement',
      'C) It is constant throughout the motion',
      'D) It is zero at equilibrium position',
    ],
    answer: 0,
    explanation: 'Velocity v = -Aω sin(ωt + φ). At maximum displacement, the particle momentarily stops before changing direction, so velocity is zero at maximum displacement.'
  },
  {
    question: 'The force exerted by a spring on a mass undergoing SHM is given by F = -kx. What does the negative sign indicate?',
    options: [
      'A) The force increases displacement',
      'B) The force acts opposite to displacement',
      'C) The force is always positive',
      'D) The force acts perpendicular to displacement',
    ],
    answer: 1,
    explanation: 'The negative sign in F = -kx indicates that the restoring force always acts opposite to the displacement, pulling the mass back toward equilibrium.'
  },
  {
    question: 'A pendulum of length L has a period T = 2π√(L/g). If the length is decreased by a factor of 4, what happens to the period?',
    options: [
      'A) It doubles',
      'B) It halves',
      'C) It quadruples',
      'D) It remains the same',
    ],
    answer: 1,
    explanation: 'Since T = 2π√(L/g), period T ∝ √L. If length decreases by a factor of 4, then T decreases by √4 = 2, so the period halves.'
  },
  {
    question: 'Which of the following quantities remains constant throughout the simple harmonic motion of a mass on a spring?',
    options: [
      'A) Displacement',
      'B) Velocity',
      'C) Total Mechanical Energy',
      'D) Acceleration',
    ],
    answer: 2,
    explanation: 'In ideal SHM with no damping, the total mechanical energy (kinetic + potential) remains constant throughout the motion, even though it transforms between kinetic and potential energy.'
  },
  {
    question: 'If the amplitude of an oscillating mass on a spring is doubled, what happens to the maximum velocity?',
    options: [
      'A) It stays the same',
      'B) It doubles',
      'C) It quadruples',
      'D) It halves',
    ],
    answer: 1,
    explanation: 'Maximum velocity v_max = Aω. Since ω depends only on the spring constant and mass (not amplitude), doubling the amplitude A doubles the maximum velocity.'
  },
  {
    question: 'The angular frequency ω of a mass-spring system is related to the spring constant k and mass m by:',
    options: [
      'A) ω = √(m/k)',
      'B) ω = √(k/m)',
      'C) ω = k/m',
      'D) ω = m/k',
    ],
    answer: 1,
    explanation: 'For a mass-spring system, the angular frequency is ω = √(k/m), where k is the spring constant and m is the mass.'
  },
  {
    question: 'At what position in the motion is the kinetic energy of a simple harmonic oscillator maximum?',
    options: [
      'A) At maximum displacement',
      'B) At equilibrium position',
      'C) At half the amplitude',
      'D) Kinetic energy is constant throughout',
    ],
    answer: 1,
    explanation: 'Kinetic energy K = ½mv² is maximum when velocity is maximum, which occurs at the equilibrium position where displacement is zero.'
  },
  {
    question: 'The total mechanical energy of a mass-spring system undergoing SHM is E = ½kA². What happens to the total energy if the amplitude is tripled?',
    options: [
      'A) It stays the same',
      'B) It triples',
      'C) It increases by a factor of 6',
      'D) It increases by a factor of 9',
    ],
    answer: 3,
    explanation: 'Since E = ½kA², energy is proportional to the square of amplitude. If amplitude is tripled, energy increases by 3² = 9 times.'
  },
  {
    question: 'A pendulum\'s period depends on which of the following?',
    options: [
      'A) Mass of the bob only',
      'B) Length of the pendulum only',
      'C) Both mass and length',
      'D) Neither mass nor length',
    ],
    answer: 1,
    explanation: 'For a simple pendulum, T = 2π√(L/g). The period depends only on the length L and gravitational acceleration g, not on the mass of the bob.'
  },
];

const APPhysicsUnit6Quiz = () => {
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
      onClick={() => navigate('/ap-physics/unit/6')}
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

export default APPhysicsUnit6Quiz;
