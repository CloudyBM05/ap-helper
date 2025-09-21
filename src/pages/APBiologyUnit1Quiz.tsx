import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  // Question 1 - Individual Discrete Question
  {
    question: 'Which property of water allows insects like water striders to walk on its surface?',
    options: [
      'A. High specific heat',
      'B. Cohesion and surface tension',
      'C. Expansion upon freezing',
      'D. Universal solvent properties',
    ],
    answer: 1,
    explanation: 'Water\'s cohesion gives surface tension.',
    type: 'individual'
  },
  // Questions 2-3 - Stimulus-Based Mini-Set
  {
    question: 'Based on the passage, iodine is an example of a:',
    passage: 'Trace elements are required by living organisms in minute quantities. Iron (Fe) is a key component in hemoglobin for oxygen transport. Iodine (I) is essential for thyroid hormone synthesis.',
    options: [
      'A. Macromolecule',
      'B. Major element',
      'C. Trace element',
      'D. Inorganic compound',
    ],
    answer: 2,
    explanation: 'Iodine is needed in minute (trace) amounts.',
    type: 'stimulus',
    stimulusSet: 1,
    stimulusTitle: 'Questions 2-3. Stimulus-Based Mini-Set'
  },
  {
    question: 'The importance of iron in hemoglobin illustrates that:',
    passage: 'Trace elements are required by living organisms in minute quantities. Iron (Fe) is a key component in hemoglobin for oxygen transport. Iodine (I) is essential for thyroid hormone synthesis.',
    options: [
      'A. All macromolecules contain iron',
      'B. Iron acts as a trace element essential for a specific protein\'s function',
      'C. Iron is abundant in carbohydrates',
      'D. None of the above',
    ],
    answer: 1,
    explanation: 'Iron is essential for hemoglobin\'s function.',
    type: 'stimulus',
    stimulusSet: 1
  },
  // Question 4 - Individual Question
  {
    question: 'A neutral atom of nitrogen (atomic number 7) contains how many electrons and neutrons, respectively, in its most common isotope?',
    options: [
      'A. 7 electrons; 7 neutrons',
      'B. 7 electrons; 14 neutrons',
      'C. 14 electrons; 7 neutrons',
      'D. 7 electrons; 8 neutrons',
    ],
    answer: 0,
    explanation: 'Nitrogen atomic #7 → 7 protons/electrons; common isotope has 7 neutrons.',
    type: 'individual'
  },
  // Questions 5-6 - Stimulus-Based Mini-Set
  {
    question: 'The reaction described is an example of:',
    passage: 'A peptide bond forms between the carboxyl group of one amino acid and the amino group of another, releasing water in the process.',
    options: [
      'A. Hydrolysis',
      'B. Dehydration synthesis',
      'C. Ionic bond formation',
      'D. Hydrogen bonding',
    ],
    answer: 1,
    explanation: 'Loss of water during bond formation = dehydration synthesis.',
    type: 'stimulus',
    stimulusSet: 2,
    stimulusTitle: 'Questions 5-6. Stimulus-Based Mini-Set'
  },
  {
    question: 'A polypeptide becomes a functional protein when:',
    passage: 'A peptide bond forms between the carboxyl group of one amino acid and the amino group of another, releasing water in the process.',
    options: [
      'A. It forms a covalent bond only',
      'B. It folds into secondary, tertiary, or quaternary structures',
      'C. It remains as a linear chain of amino acids',
      'D. It binds to DNA',
    ],
    answer: 1,
    explanation: 'Functional proteins arise from folding into higher-order structures.',
    type: 'stimulus',
    stimulusSet: 2
  },
  // Question 7 - Individual Question
  {
    question: 'Which of the following correctly characterizes a phospholipid?',
    options: [
      'A. Nonpolar head, polar tail',
      'B. Single glycerol with three fatty acid chains',
      'C. Amphipathic molecule with hydrophilic head and hydrophobic tails',
      'D. Polymer of nucleotide monomers',
    ],
    answer: 2,
    explanation: 'Phospholipids: hydrophilic head + hydrophobic tails = amphipathic.',
    type: 'individual'
  },
  // Questions 8-9 - Stimulus-Based Mini-Set
  {
    question: 'What structural difference differentiates starch from cellulose?',
    passage: 'Starch is a glucose storage molecule in plants, while cellulose is a structural polymer found in plant cell walls. Both are polysaccharides.',
    options: [
      'A. Starch has α-glucose; cellulose has β-glucose',
      'B. Starch is made of fructose monomers; cellulose is made of glucose',
      'C. Both use β-glucose but differ in chain branching',
      'D. There is no structural difference.',
    ],
    answer: 0,
    explanation: 'Structural difference: α-glucose (starch) vs. β-glucose (cellulose).',
    type: 'stimulus',
    stimulusSet: 3,
    stimulusTitle: 'Questions 8-9. Stimulus-Based Mini-Set'
  },
  {
    question: 'Which statement accurately reflects their biological roles?',
    passage: 'Starch is a glucose storage molecule in plants, while cellulose is a structural polymer found in plant cell walls. Both are polysaccharides.',
    options: [
      'A. Starch provides structural support; cellulose stores energy',
      'B. Cellulose provides structural support; starch stores energy',
      'C. Both store energy in plants',
      'D. Neither is digestible by most animals',
    ],
    answer: 1,
    explanation: 'Starch stores energy; cellulose gives structural support.',
    type: 'stimulus',
    stimulusSet: 3
  },
  // Question 10 - Individual Question
  {
    question: 'A solution with a pH of 4 has:',
    options: [
      'A. 100 times higher [H⁺] than a solution of pH 6',
      'B. Equal [H⁺] to a solution of pH 6',
      'C. 2 times higher [H⁺] than a solution of pH 6',
      'D. 10 times lower [H⁺] than a solution of pH 6',
    ],
    answer: 0,
    explanation: 'pH scale is logarithmic: pH 4 has 10² = 100× higher [H⁺] than pH 6.',
    type: 'individual'
  },
];

const APBiologyUnit1Quiz = () => {
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
      onClick={() => navigate('/ap-biology/unit/1')}
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
            <h4 className="font-semibold text-gray-700 mb-2">Passage:</h4>                <p className="text-gray-800 italic whitespace-pre-line">"{q.passage}"</p>
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

export default APBiologyUnit1Quiz;
