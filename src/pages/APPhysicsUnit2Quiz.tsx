import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'A box is at rest on a horizontal surface. Which of the following pairs of forces constitute a Newton\'s third law force pair?',
    options: [
      'A) The normal force exerted by the surface on the box and the weight of the box',
      'B) The weight of the box and the normal force exerted by the box on the surface',
      'C) The normal force exerted by the surface on the box and the normal force exerted by the box on the surface',
      'D) The weight of the box and the normal force exerted by the surface on the box',
    ],
    answer: 2,
    explanation: 'Newton\'s third law states that forces come in action-reaction pairs. The normal force exerted by the surface on the box and the normal force exerted by the box on the surface are equal and opposite forces acting on different objects, making them a third law pair.'
  },
  {
    question: 'An object is moving at constant velocity in a straight line. According to Newton\'s first law, what can be concluded about the net force acting on the object?',
    options: [
      'A) The net force is in the direction of motion',
      'B) The net force is opposite to the direction of motion',
      'C) The net force is zero',
      'D) The net force is perpendicular to the direction of motion',
    ],
    answer: 2,
    explanation: 'Newton\'s first law states that an object in motion remains in motion at constant velocity unless acted upon by a net external force. If the velocity is constant (not changing), the net force must be zero.'
  },
  {
    question: 'Two objects, A and B, have masses mA = 2 kg and mB = 4 kg. They are connected by a massless string and pulled horizontally across a frictionless surface by a force of 12 N applied to object A. What is the acceleration of the system?',
    options: [
      'A) 1 m/s²',
      'B) 2 m/s²',
      'C) 3 m/s²',
      'D) 4 m/s²',
    ],
    answer: 1,
    explanation: 'The total mass of the system is mA + mB = 2 kg + 4 kg = 6 kg. Using Newton\'s second law: F = ma, so a = F/m = 12 N / 6 kg = 2 m/s².'
  },
  {
    question: 'A book rests on a table. The force exerted by the book on the table is 10 N downward. According to Newton\'s third law, what is the force exerted by the table on the book?',
    options: [
      'A) 0 N',
      'B) 5 N upward',
      'C) 10 N downward',
      'D) 10 N upward',
    ],
    answer: 3,
    explanation: 'Newton\'s third law states that for every action, there is an equal and opposite reaction. If the book exerts 10 N downward on the table, the table must exert 10 N upward on the book.'
  },
  {
    question: 'A 5 kg object is pulled across a horizontal surface with a constant velocity by a horizontal force of 20 N. What is the coefficient of kinetic friction between the object and the surface?',
    options: [
      'A) 0.2',
      'B) 0.4',
      'C) 0.5',
      'D) 0.8',
    ],
    answer: 1,
    explanation: 'Since the object moves at constant velocity, the net force is zero. The applied force (20 N) equals the kinetic friction force. Kinetic friction = μk × Normal force = μk × mg = μk × 5 kg × 10 m/s² = 50μk. Setting this equal to 20 N: 50μk = 20, so μk = 0.4.'
  },
  {
    question: 'Which of the following best describes inertia?',
    options: [
      'A) The tendency of an object to speed up when a force is applied',
      'B) The tendency of an object to resist changes in its state of motion',
      'C) The force required to stop a moving object',
      'D) The acceleration produced by a given force',
    ],
    answer: 1,
    explanation: 'Inertia is the tendency of an object to resist changes in its state of motion. This is the fundamental concept behind Newton\'s first law of motion.'
  },
  {
    question: 'A 10 kg block is on an inclined plane that makes a 30° angle with the horizontal. If there is no friction, what is the component of the weight parallel to the incline?',
    options: [
      'A) 50 N',
      'B) 87 N',
      'C) 100 N',
      'D) 173 N',
    ],
    answer: 0,
    explanation: 'The component of weight parallel to the incline is mg sin θ = 10 kg × 10 m/s² × sin(30°) = 100 N × 0.5 = 50 N.'
  },
  {
    question: 'Two forces of 6 N and 8 N act on an object. What is the maximum possible magnitude of their resultant?',
    options: [
      'A) 2 N',
      'B) 10 N',
      'C) 14 N',
      'D) 48 N',
    ],
    answer: 2,
    explanation: 'The maximum resultant occurs when the forces are in the same direction. In this case, the maximum magnitude is 6 N + 8 N = 14 N.'
  },
  {
    question: 'A car is traveling around a circular track at constant speed. Which statement about the forces acting on the car is correct?',
    options: [
      'A) No net force acts on the car since its speed is constant',
      'B) A net force acts toward the center of the circle',
      'C) A net force acts tangent to the circle',
      'D) A net force acts away from the center of the circle',
    ],
    answer: 1,
    explanation: 'Even though the speed is constant, the velocity is changing direction, so there is acceleration toward the center of the circle. By Newton\'s second law, this requires a net force toward the center (centripetal force).'
  },
  {
    question: 'A box is pushed across a rough horizontal surface at constant velocity. If the applied force is 50 N at an angle of 37° above the horizontal, what is the magnitude of the friction force?',
    options: [
      'A) 30 N',
      'B) 40 N',
      'C) 50 N',
      'D) 60 N',
    ],
    answer: 1,
    explanation: 'Since the box moves at constant velocity, the net force is zero. The horizontal component of the applied force equals the friction force. Horizontal component = 50 N × cos(37°) = 50 N × 0.8 = 40 N.'
  },
];

const APPhysicsUnit2Quiz = () => {
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
      onClick={() => navigate('/ap-physics/unit/2')}
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

export default APPhysicsUnit2Quiz;
