import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'In cellular respiration, glucose is broken down through which three main stages?',
    passage: 'Cellular respiration is a crucial process that allows cells to extract energy from glucose and other organic molecules. This multi-step process involves the systematic breakdown of glucose molecules to produce ATP, the primary energy currency of cells.',
    options: [
      'A. Glycolysis, citric acid cycle, and electron transport chain',
      'B. Photosynthesis, glycolysis, and fermentation',
      'C. Calvin cycle, light reactions, and ATP synthesis',
      'D. Glycolysis, fermentation, and oxidative phosphorylation'
    ],
    answer: 0,
    explanation: 'Cellular respiration consists of three main stages: glycolysis (glucose breakdown to pyruvate), the citric acid cycle (pyruvate oxidation), and the electron transport chain (ATP synthesis through oxidative phosphorylation).',
    type: 'stimulus',
    stimulusSet: 1,
    stimulusTitle: 'Questions 1-3. Cellular Respiration Process'
  },
  {
    question: 'Where does glycolysis occur in the cell?',
    passage: 'Cellular respiration is a crucial process that allows cells to extract energy from glucose and other organic molecules. This multi-step process involves the systematic breakdown of glucose molecules to produce ATP, the primary energy currency of cells.',
    options: [
      'A. Mitochondrial matrix',
      'B. Cytoplasm',
      'C. Inner mitochondrial membrane',
      'D. Nucleus'
    ],
    answer: 1,
    explanation: 'Glycolysis occurs in the cytoplasm of the cell and does not require oxygen. It breaks down glucose into two pyruvate molecules, producing a small amount of ATP and NADH.',
    type: 'stimulus',
    stimulusSet: 1
  },
  {
    question: 'What is the primary function of the electron transport chain?',
    passage: 'Cellular respiration is a crucial process that allows cells to extract energy from glucose and other organic molecules. This multi-step process involves the systematic breakdown of glucose molecules to produce ATP, the primary energy currency of cells.',
    options: [
      'A. To break down glucose into pyruvate',
      'B. To oxidize pyruvate in the mitochondrial matrix',
      'C. To generate ATP through oxidative phosphorylation',
      'D. To convert ADP back to glucose'
    ],
    answer: 2,
    explanation: 'The electron transport chain uses the energy from electrons (carried by NADH and FADH2) to pump protons across the inner mitochondrial membrane, creating a gradient that drives ATP synthesis through chemiosmosis.',
    type: 'stimulus',
    stimulusSet: 1
  },
  {
    question: 'What happens to pyruvate before it enters the citric acid cycle?',
    options: [
      'A. It is converted to lactate',
      'B. It is oxidized to acetyl-CoA',
      'C. It is reduced to ethanol',
      'D. It is phosphorylated to form glucose'
    ],
    answer: 1,
    explanation: 'Before entering the citric acid cycle, pyruvate is oxidized to acetyl-CoA in the mitochondrial matrix. This step also produces NADH and releases CO2.',
    type: 'individual'
  },
  {
    question: 'In the absence of oxygen, which process allows cells to continue producing ATP?',
    options: [
      'A. Aerobic respiration',
      'B. Photosynthesis',
      'C. Fermentation',
      'D. Protein synthesis'
    ],
    answer: 2,
    explanation: 'Fermentation allows cells to continue producing ATP through glycolysis when oxygen is not available. It regenerates NAD+ needed for glycolysis to continue.',
    type: 'individual'
  },
  {
    question: 'Which molecules carry electrons to the electron transport chain?',
    passage: 'The electron transport chain is located in the inner mitochondrial membrane and consists of four protein complexes. As electrons move through these complexes, energy is released and used to pump protons from the mitochondrial matrix to the intermembrane space.',
    options: [
      'A. ATP and ADP',
      'B. NADH and FADH2',
      'C. Glucose and pyruvate',
      'D. Oxygen and carbon dioxide'
    ],
    answer: 1,
    explanation: 'NADH and FADH2 are electron carriers produced during glycolysis, pyruvate oxidation, and the citric acid cycle. They donate electrons to the electron transport chain to generate ATP.',
    type: 'stimulus',
    stimulusSet: 2,
    stimulusTitle: 'Questions 6-7. Electron Transport Chain'
  },
  {
    question: 'What is the role of oxygen in cellular respiration?',
    passage: 'The electron transport chain is located in the inner mitochondrial membrane and consists of four protein complexes. As electrons move through these complexes, energy is released and used to pump protons from the mitochondrial matrix to the intermembrane space.',
    options: [
      'A. It breaks down glucose in glycolysis',
      'B. It serves as the final electron acceptor in the electron transport chain',
      'C. It produces NADH in the citric acid cycle',
      'D. It converts pyruvate to acetyl-CoA'
    ],
    answer: 1,
    explanation: 'Oxygen serves as the final electron acceptor at the end of the electron transport chain, allowing the chain to continue functioning and enabling maximum ATP production through aerobic respiration.',
    type: 'stimulus',
    stimulusSet: 2
  },
  {
    question: 'Which process produces the most ATP per glucose molecule?',
    options: [
      'A. Glycolysis',
      'B. Citric acid cycle',
      'C. Electron transport chain and oxidative phosphorylation',
      'D. Fermentation'
    ],
    answer: 2,
    explanation: 'The electron transport chain and oxidative phosphorylation produce approximately 32-34 ATP molecules per glucose, which is much more than glycolysis (2 ATP) or the citric acid cycle (2 ATP).',
    type: 'individual'
  },
  {
    question: 'What is the net gain of ATP from glycolysis?',
    options: [
      'A. 1 ATP',
      'B. 2 ATP',
      'C. 4 ATP',
      'D. 6 ATP'
    ],
    answer: 1,
    explanation: 'Glycolysis produces 4 ATP but consumes 2 ATP in the initial steps, resulting in a net gain of 2 ATP molecules per glucose molecule.',
    type: 'individual'
  },
  {
    question: 'In which part of the mitochondrion does the citric acid cycle occur?',
    options: [
      'A. Outer mitochondrial membrane',
      'B. Inner mitochondrial membrane',
      'C. Intermembrane space',
      'D. Mitochondrial matrix'
    ],
    answer: 3,
    explanation: 'The citric acid cycle (Krebs cycle) occurs in the mitochondrial matrix, where acetyl-CoA is completely oxidized to produce NADH, FADH2, ATP, and CO2.',
    type: 'individual'
  },
];

const APBiologyUnit3Quiz = () => {
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
      onClick={() => navigate('/ap-biology/unit/3')}
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

export default APBiologyUnit3Quiz;
