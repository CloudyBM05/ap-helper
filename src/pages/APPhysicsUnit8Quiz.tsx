import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'The density ρ of a fluid is defined as:',
    options: [
      'A) Mass divided by volume',
      'B) Volume divided by mass',
      'C) Force per unit area',
      'D) Pressure times volume',
    ],
    answer: 0,
    explanation: 'Density is defined as mass divided by volume (ρ = m/V). This fundamental property determines many fluid behaviors including buoyancy.'
  },
  {
    question: 'A block of wood floats on water. According to Archimedes\' principle, the buoyant force on the block equals:',
    options: [
      'A) The weight of the block',
      'B) The weight of the water displaced by the block',
      'C) The volume of the block multiplied by gravity',
      'D) The weight of the block minus the weight of water displaced',
    ],
    answer: 1,
    explanation: 'Archimedes\' principle states that the buoyant force equals the weight of the fluid displaced by the object, not the weight of the object itself.'
  },
  {
    question: 'If the pressure at the surface of a fluid is P₀, what is the pressure at a depth h below the surface?',
    options: [
      'A) P₀',
      'B) P₀ + ρgh',
      'C) ρgh',
      'D) P₀/ρgh',
    ],
    answer: 1,
    explanation: 'Hydrostatic pressure increases with depth according to P = P₀ + ρgh, where P₀ is surface pressure, ρ is fluid density, g is gravity, and h is depth.'
  },
  {
    question: 'Pascal\'s principle states that:',
    options: [
      'A) Pressure increases with depth in a fluid',
      'B) Pressure applied to a confined fluid is transmitted equally in all directions',
      'C) Buoyant force equals the weight of displaced fluid',
      'D) Flow rate is constant in a pipe',
    ],
    answer: 1,
    explanation: 'Pascal\'s principle states that pressure applied to a confined fluid is transmitted undiminished equally in all directions. This is the basis for hydraulic systems.'
  },
  {
    question: 'Which of the following describes a fluid with high viscosity?',
    options: [
      'A) Flows easily like water',
      'B) Resists flow like honey',
      'C) Has very low density',
      'D) Has high compressibility',
    ],
    answer: 1,
    explanation: 'High viscosity means the fluid resists flow. Honey has much higher viscosity than water, making it flow more slowly under the same conditions.'
  },
  {
    question: 'In a horizontal pipe with varying cross-sectional areas, the fluid speed is faster where:',
    options: [
      'A) The cross-sectional area is larger',
      'B) The cross-sectional area is smaller',
      'C) Pressure is higher',
      'D) Fluid is more viscous',
    ],
    answer: 1,
    explanation: 'According to the continuity equation (A₁v₁ = A₂v₂), fluid speed is inversely related to cross-sectional area. Smaller area means faster speed.'
  },
  {
    question: 'Bernoulli\'s equation relates pressure, velocity, and elevation in a flowing fluid. According to Bernoulli\'s principle, if the velocity of a fluid increases, the pressure:',
    options: [
      'A) Increases',
      'B) Decreases',
      'C) Remains the same',
      'D) Changes unpredictably',
    ],
    answer: 1,
    explanation: 'Bernoulli\'s principle states that as fluid velocity increases, pressure decreases (assuming constant elevation). This explains phenomena like airplane wing lift.'
  },
  {
    question: 'A hydraulic lift uses Pascal\'s principle. If a small piston with area A₁ applies a force F₁, what force F₂ is exerted by the large piston with area A₂?',
    options: [
      'A) F₂ = F₁',
      'B) F₂ = (A₁/A₂) × F₁',
      'C) F₂ = (A₂/A₁) × F₁',
      'D) F₂ = F₁ × (A₁ + A₂)',
    ],
    answer: 2,
    explanation: 'In hydraulic systems, force multiplication occurs according to F₂/F₁ = A₂/A₁, so F₂ = (A₂/A₁) × F₁. Larger area produces proportionally larger force.'
  },
  {
    question: 'An object with density ρₒᵦⱼ is placed in a fluid with density ρfluid. The object will sink if:',
    options: [
      'A) ρₒᵦⱼ < ρfluid',
      'B) ρₒᵦⱼ = ρfluid',
      'C) ρₒᵦⱼ > ρfluid',
      'D) The densities do not affect sinking or floating',
    ],
    answer: 2,
    explanation: 'An object sinks if its density is greater than the fluid\'s density (ρₒᵦⱼ > ρfluid). If densities are equal, the object has neutral buoyancy.'
  },
  {
    question: 'Which of the following is TRUE regarding the center of buoyancy?',
    options: [
      'A) It is always at the geometric center of the object',
      'B) It acts at the centroid of the displaced fluid volume',
      'C) It acts at the bottom of the fluid container',
      'D) It is the same as the center of mass of the object',
    ],
    answer: 1,
    explanation: 'The center of buoyancy acts at the centroid of the displaced fluid volume, not the object itself. This is important for stability analysis of floating objects.'
  },
];

const APPhysicsUnit8Quiz = () => {
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
      onClick={() => navigate('/ap-physics/unit/8')}
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
              >
                {opt}
              </button>
              <button
                type="button"
                className="text-red-500 hover:text-red-700 font-bold text-xl w-8 h-8 flex items-center justify-center"
                onClick={() => handleCrossOut(idx)}
                title="Cross out this option"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
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

export default APPhysicsUnit8Quiz;
