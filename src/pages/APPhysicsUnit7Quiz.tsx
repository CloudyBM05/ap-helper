import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'An object rotates about a fixed axis with an angular velocity of 4 rad/s. If the angular acceleration is 2 rad/s², what is its angular velocity after 3 seconds?',
    options: [
      'A) 2 rad/s',
      'B) 6 rad/s',
      'C) 10 rad/s',
      'D) 12 rad/s',
    ],
    answer: 2,
    explanation: 'Using the rotational kinematics equation: ωf = ωi + αt = 4 + 2 × 3 = 10 rad/s.'
  },
  {
    question: 'Which of the following best describes the moment of inertia?',
    options: [
      'A) The force causing rotation',
      'B) The angular displacement of a rotating object',
      'C) The resistance of an object to change in rotational motion',
      'D) The angular velocity of a rotating object',
    ],
    answer: 2,
    explanation: 'Moment of inertia measures an object\'s resistance to changes in rotational motion, analogous to mass in linear motion.'
  },
  {
    question: 'A disk and a hoop, both with the same mass and radius, roll down an incline without slipping. Which reaches the bottom first?',
    options: [
      'A) The disk',
      'B) The hoop',
      'C) Both at the same time',
      'D) Cannot be determined',
    ],
    answer: 0,
    explanation: 'The disk has a smaller moment of inertia than the hoop, so it converts potential energy to kinetic energy more efficiently and reaches the bottom first.'
  },
  {
    question: 'The torque τ acting on a rotating object is related to its angular acceleration α and moment of inertia I by:',
    options: [
      'A) τ = Iα',
      'B) τ = ma',
      'C) τ = I/α',
      'D) τ = mrα',
    ],
    answer: 0,
    explanation: 'This is the rotational analog of Newton\'s second law: τ = Iα, where torque equals moment of inertia times angular acceleration.'
  },
  {
    question: 'If the radius of a rotating object doubles but its angular velocity remains the same, what happens to the linear velocity of a point on its edge?',
    options: [
      'A) It remains the same',
      'B) It doubles',
      'C) It halves',
      'D) It quadruples',
    ],
    answer: 1,
    explanation: 'Linear velocity v = rω. If radius doubles and angular velocity stays the same, then linear velocity doubles.'
  },
  {
    question: 'Which of the following quantities is conserved when no external torque acts on a system?',
    options: [
      'A) Angular velocity',
      'B) Angular displacement',
      'C) Angular momentum',
      'D) Torque',
    ],
    answer: 2,
    explanation: 'Angular momentum is conserved when no external torque acts on a system, similar to how linear momentum is conserved when no external force acts.'
  },
  {
    question: 'What is the relationship between linear velocity v and angular velocity ω for a point at radius r on a rotating object?',
    options: [
      'A) v = ω/r',
      'B) v = rω',
      'C) v = r/ω',
      'D) v = ω²r',
    ],
    answer: 1,
    explanation: 'The linear velocity of a point on a rotating object is v = rω, where r is the distance from the axis of rotation and ω is the angular velocity.'
  },
  {
    question: 'A figure skater spins with arms extended and then pulls her arms in close to her body. What happens to her angular velocity and moment of inertia?',
    options: [
      'A) Angular velocity decreases; moment of inertia increases',
      'B) Angular velocity increases; moment of inertia decreases',
      'C) Both increase',
      'D) Both decrease',
    ],
    answer: 1,
    explanation: 'When the skater pulls her arms in, her moment of inertia decreases. By conservation of angular momentum (L = Iω), her angular velocity must increase.'
  },
  {
    question: 'A rigid body rotates through an angular displacement of 3 radians in 2 seconds. What is its average angular velocity?',
    options: [
      'A) 0.67 rad/s',
      'B) 1.5 rad/s',
      'C) 3 rad/s',
      'D) 6 rad/s',
    ],
    answer: 1,
    explanation: 'Average angular velocity = angular displacement / time = 3 radians / 2 seconds = 1.5 rad/s.'
  },
  {
    question: 'The center of mass of a uniform rod lies:',
    options: [
      'A) At one end of the rod',
      'B) At its geometric center',
      'C) At the point where it is hung',
      'D) Outside the rod',
    ],
    answer: 1,
    explanation: 'For a uniform rod (constant density), the center of mass is located at its geometric center, which is the midpoint of the rod.'
  },
];

const APPhysicsUnit7Quiz = () => {
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
      onClick={() => navigate('/ap-physics/unit/7')}
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

export default APPhysicsUnit7Quiz;
