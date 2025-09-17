import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following best explains why the dialysis bag with 0.0 M sucrose increased in mass?',
    passage: 'A student investigates osmosis by placing dialysis bags containing different sucrose solutions into beakers of distilled water. The percent change in mass after 30 minutes is shown.\n\nSucrose Molarity | % Change in Mass\n0.0 M | +18%\n0.2 M | +10%\n0.4 M | +2%\n0.6 M | –8%\n0.8 M | –15%',
    options: [
      'A. Water moved out of the bag because it was hypertonic.',
      'B. Water moved into the bag because the solution inside was hypertonic.',
      'C. Water moved into the bag because the solution inside was hypotonic.',
      'D. Sucrose diffused into the bag from the water.',
    ],
    answer: 2,
    explanation: 'The 0.0 M sucrose solution (pure water) inside the bag is hypotonic compared to any solute concentration, so water moves into the bag from the distilled water outside.',
    type: 'stimulus',
    stimulusSet: 1,
    stimulusTitle: 'Questions 1-3. Stimulus-Based Mini-Set'
  },
  {
    question: 'At approximately what molarity of sucrose is the solution inside the bag isotonic with the beaker water?',
    passage: 'A student investigates osmosis by placing dialysis bags containing different sucrose solutions into beakers of distilled water. The percent change in mass after 30 minutes is shown.\n\nSucrose Molarity | % Change in Mass\n0.0 M | +18%\n0.2 M | +10%\n0.4 M | +2%\n0.6 M | –8%\n0.8 M | –15%',
    options: [
      'A. 0.2 M',
      'B. 0.3 M',
      'C. 0.4 M',
      'D. 0.6 M',
    ],
    answer: 1,
    explanation: 'Isotonic conditions occur when there is no net water movement (0% change in mass). Looking at the data, this would occur between 0.2 M (+10%) and 0.4 M (+2%), approximately at 0.3 M.',
    type: 'stimulus',
    stimulusSet: 1
  },
  {
    question: 'If the experiment was repeated at a higher temperature, what would most likely happen?',
    passage: 'A student investigates osmosis by placing dialysis bags containing different sucrose solutions into beakers of distilled water. The percent change in mass after 30 minutes is shown.\n\nSucrose Molarity | % Change in Mass\n0.0 M | +18%\n0.2 M | +10%\n0.4 M | +2%\n0.6 M | –8%\n0.8 M | –15%',
    options: [
      'A. Water movement would slow down, reducing mass change.',
      'B. Osmosis would not occur because temperature prevents diffusion.',
      'C. The rate of water movement would increase due to higher kinetic energy.',
      'D. The direction of water movement would reverse.',
    ],
    answer: 2,
    explanation: 'Higher temperature increases the kinetic energy of water molecules, causing them to move faster and increasing the rate of osmosis and diffusion.',
    type: 'stimulus',
    stimulusSet: 1
  },
  {
    question: 'Which organelle is primarily responsible for synthesizing proteins that will be secreted from the cell?',
    options: [
      'A. Free ribosomes',
      'B. Ribosomes bound to the rough ER',
      'C. Smooth ER',
      'D. Golgi apparatus',
    ],
    answer: 1,
    explanation: 'Ribosomes bound to the rough ER synthesize proteins destined for secretion, the plasma membrane, or organelles. These proteins enter the ER lumen for processing.',
    type: 'individual'
  },
  {
    question: 'A mutation prevents a lysosome from functioning properly. Which of the following would most likely result?',
    options: [
      'A. The cell would be unable to produce ATP.',
      'B. The cell would accumulate large amounts of waste or damaged organelles.',
      'C. The cell would be unable to synthesize proteins.',
      'D. The cell would lose the ability to regulate ion gradients.',
    ],
    answer: 1,
    explanation: 'Lysosomes contain hydrolytic enzymes that break down waste materials and damaged organelles. Without functional lysosomes, these materials would accumulate in the cell.',
    type: 'individual'
  },
  {
    question: 'Which feature allows phospholipids to form bilayers spontaneously in water?',
    passage: 'The diagram shows a phospholipid bilayer containing embedded proteins, cholesterol, and carbohydrate chains attached to lipids and proteins.',
    options: [
      'A. Hydrophobic tails and hydrophilic heads',
      'B. Strong covalent bonds between adjacent phospholipids',
      'C. Hydrogen bonding between lipid tails',
      'D. Ionic interactions between phosphate groups',
    ],
    answer: 0,
    explanation: 'Phospholipids are amphipathic molecules with hydrophilic heads that interact with water and hydrophobic tails that avoid water, causing spontaneous bilayer formation.',
    type: 'stimulus',
    stimulusSet: 2,
    stimulusTitle: 'Questions 6-7. Stimulus-Based Mini-Set'
  },
  {
    question: 'Cholesterol molecules are interspersed within the phospholipid bilayer. What is their function?',
    passage: 'The diagram shows a phospholipid bilayer containing embedded proteins, cholesterol, and carbohydrate chains attached to lipids and proteins.',
    options: [
      'A. They increase membrane fluidity at low temperatures and reduce fluidity at high temperatures.',
      'B. They serve as channels for facilitated diffusion.',
      'C. They attach carbohydrate chains for cell recognition.',
      'D. They increase membrane permeability to large polar molecules.',
    ],
    answer: 0,
    explanation: 'Cholesterol acts as a membrane fluidity buffer, preventing membranes from becoming too fluid at high temperatures and too rigid at low temperatures.',
    type: 'stimulus',
    stimulusSet: 2
  },
  {
    question: 'Which of the following best describes the endosymbiotic theory?',
    options: [
      'A. Eukaryotic cells evolved when small prokaryotes engulfed other cells that became organelles.',
      'B. Organelles are formed by the Golgi apparatus packaging proteins into vesicles.',
      'C. Ribosomes evolved into mitochondria after increasing in complexity.',
      'D. Viruses inserted DNA into prokaryotic cells to create eukaryotic nuclei.',
    ],
    answer: 0,
    explanation: 'The endosymbiotic theory proposes that mitochondria and chloroplasts originated from free-living prokaryotes that were engulfed by early eukaryotic cells.',
    type: 'individual'
  },
  {
    question: 'Which cellular structure is common to both prokaryotes and eukaryotes?',
    options: [
      'A. Nucleus',
      'B. Mitochondria',
      'C. Endoplasmic reticulum',
      'D. Ribosomes',
    ],
    answer: 3,
    explanation: 'Ribosomes are found in both prokaryotic and eukaryotic cells for protein synthesis, though they differ in size (70S in prokaryotes, 80S in eukaryotes).',
    type: 'individual'
  },
  {
    question: 'A researcher adds a toxin that blocks vesicle fusion with the plasma membrane. Which cellular process would be most directly inhibited?',
    options: [
      'A. Exocytosis of neurotransmitters',
      'B. Osmosis across the cell membrane',
      'C. Simple diffusion of oxygen',
      'D. Active transport of sodium ions',
    ],
    answer: 0,
    explanation: 'Exocytosis requires vesicles to fuse with the plasma membrane to release their contents. Blocking this fusion would directly prevent exocytosis.',
    type: 'individual'
  },
];

const APBiologyUnit2Quiz = () => {
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
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-green-700 shadow transition flex items-center gap-2 z-20"
      onClick={() => navigate('/ap-biology/unit/2')}
    >
      <span className="text-xl">←</span> Back to Study Guide
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        <h1 className="text-3xl font-bold mb-8 text-center text-green-700">Quiz Results</h1>
        {questions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = userAnswer === q.answer;
          return (
            <div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
              {q.stimulusTitle && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h3 className="font-bold text-blue-800">{q.stimulusTitle}</h3>
                </div>
              )}
              {q.passage && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-semibold text-gray-700 mb-2">Passage:</h4>
                  <p className="text-gray-800 italic whitespace-pre-line">"{q.passage}"</p>
                </div>
              )}
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
                <div className="text-green-700 mb-1">You did not answer this question.</div>
              ) : isCorrect ? (
                <div className="text-green-700 mb-1">Correct!</div>
              ) : (
                <div className="text-red-700 mb-1">Incorrect.</div>
              )}
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Explanation:</h4>
                <p className="text-green-800">{q.explanation}</p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-green-500 to-lime-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-lime-500 transition-all duration-300"
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
        {q.stimulusTitle && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h3 className="font-bold text-blue-800">{q.stimulusTitle}</h3>
          </div>
        )}
        {q.passage && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">Passage:</h4>
            <p className="text-gray-800 italic whitespace-pre-line">"{q.passage}"</p>
          </div>
        )}
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
                  selected === idx ? 'bg-green-500 text-white border-green-600' : 'bg-white text-slate-800'
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
            className="bg-gradient-to-r from-green-500 to-lime-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-lime-500 transition-all duration-300"
            onClick={handleNext}
            disabled={selected === null}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-green-500 to-lime-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-lime-500 transition-all duration-300"
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

export default APBiologyUnit2Quiz;
