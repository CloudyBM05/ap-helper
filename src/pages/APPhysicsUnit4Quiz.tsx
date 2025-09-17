import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'A person applies a constant force of 50 N to push a box 3 meters across a frictionless floor. How much work is done on the box?',
    options: [
      'A) 16.7 J',
      'B) 50 J',
      'C) 150 J',
      'D) 0 J',
    ],
    answer: 2,
    explanation: 'Work = Force × Distance = 50 N × 3 m = 150 J. Since the force is parallel to the displacement and the floor is frictionless, all the applied force contributes to work.'
  },
  {
    question: 'A block is pulled with a force of 40 N at an angle of 60° to the horizontal over a distance of 5 m. What is the work done by the force?',
    options: [
      'A) 100 J',
      'B) 200 J',
      'C) 80 J',
      'D) 40 J',
    ],
    answer: 0,
    explanation: 'Work = F × d × cos(θ) = 40 N × 5 m × cos(60°) = 40 × 5 × 0.5 = 100 J. Only the horizontal component of the force contributes to work.'
  },
  {
    question: 'An object of mass 2 kg is lifted vertically 4 meters. What is the change in its gravitational potential energy? (Use g = 9.8 m/s²)',
    options: [
      'A) 78.4 J',
      'B) 19.6 J',
      'C) 2 J',
      'D) 39.2 J',
    ],
    answer: 0,
    explanation: 'Change in gravitational potential energy = mgh = 2 kg × 9.8 m/s² × 4 m = 78.4 J.'
  },
  {
    question: 'The kinetic energy of an object is given by KE = ½mv². If the velocity of the object doubles, its kinetic energy:',
    options: [
      'A) Doubles',
      'B) Quadruples',
      'C) Halves',
      'D) Remains the same',
    ],
    answer: 1,
    explanation: 'Since KE = ½mv², if velocity doubles (v → 2v), then KE becomes ½m(2v)² = ½m(4v²) = 4(½mv²). The kinetic energy quadruples.'
  },
  {
    question: 'According to the work-energy theorem, the net work done on an object equals:',
    options: [
      'A) The total mechanical energy of the object',
      'B) The change in the object\'s kinetic energy',
      'C) The change in the object\'s potential energy',
      'D) The force times the distance moved',
    ],
    answer: 1,
    explanation: 'The work-energy theorem states that the net work done on an object equals the change in its kinetic energy: W_net = ΔKE.'
  },
  {
    question: 'A block slides down a frictionless incline. Which of the following statements is true about the mechanical energy?',
    options: [
      'A) Mechanical energy increases as the block moves down.',
      'B) Mechanical energy decreases as the block moves down.',
      'C) Mechanical energy is conserved.',
      'D) Mechanical energy is converted into heat.',
    ],
    answer: 2,
    explanation: 'On a frictionless incline, there are no nonconservative forces acting. Therefore, mechanical energy (KE + PE) is conserved throughout the motion.'
  },
  {
    question: 'A machine lifts a 100 kg load 2 meters in 5 seconds. What is the power output of the machine? (g = 9.8 m/s²)',
    options: [
      'A) 392 W',
      'B) 1960 W',
      'C) 20 W',
      'D) 490 W',
    ],
    answer: 0,
    explanation: 'Work = mgh = 100 kg × 9.8 m/s² × 2 m = 1960 J. Power = Work/time = 1960 J / 5 s = 392 W.'
  },
  {
    question: 'Which of the following statements correctly defines efficiency?',
    options: [
      'A) Efficiency = Input energy / Useful output energy',
      'B) Efficiency = Useful output energy / Input energy',
      'C) Efficiency = Total energy output / Total energy input',
      'D) Efficiency = Work done / Power',
    ],
    answer: 1,
    explanation: 'Efficiency is defined as the ratio of useful output energy to input energy: Efficiency = Useful output energy / Input energy. This measures how well energy is converted.'
  },
  {
    question: 'A block is pushed across a rough surface with a force of 60 N over 4 meters. If the friction force opposing motion is 10 N, what is the net work done on the block?',
    options: [
      'A) 200 J',
      'B) 240 J',
      'C) 160 J',
      'D) 100 J',
    ],
    answer: 0,
    explanation: 'Net force = Applied force - Friction force = 60 N - 10 N = 50 N. Net work = Net force × distance = 50 N × 4 m = 200 J.'
  },
  {
    question: 'A 2-kg object moves with a velocity of 3 m/s. What is its kinetic energy?',
    options: [
      'A) 3 J',
      'B) 6 J',
      'C) 9 J',
      'D) 18 J',
    ],
    answer: 2,
    explanation: 'Kinetic energy = ½mv² = ½ × 2 kg × (3 m/s)² = ½ × 2 × 9 = 9 J.'
  },
];

const APPhysicsUnit4Quiz = () => {
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
      onClick={() => navigate('/ap-physics/unit/4')}
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

export default APPhysicsUnit4Quiz;
