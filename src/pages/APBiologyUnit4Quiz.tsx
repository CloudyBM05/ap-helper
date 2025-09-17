import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following is a characteristic of G-protein-coupled receptors (GPCRs)?',
    options: [
      'A. They act as enzymes that phosphorylate proteins.',
      'B. They bind to ligands and directly open ion channels.',
      'C. They activate intracellular signaling pathways through G-proteins.',
      'D. They are found exclusively in prokaryotic cells.'
    ],
    answer: 2,
    explanation: 'G-protein-coupled receptors activate intracellular signaling pathways through G-proteins when a ligand binds to them. This activation leads to various cellular responses through secondary messenger systems.',
    type: 'individual'
  },
  {
    question: 'In the context of signal transduction, what role does cyclic AMP (cAMP) typically serve?',
    options: [
      'A. It acts as a ligand that binds to receptors.',
      'B. It functions as a secondary messenger that amplifies the signal.',
      'C. It directly activates G-proteins.',
      'D. It is involved in the synthesis of phospholipids.'
    ],
    answer: 1,
    explanation: 'Cyclic AMP functions as a secondary messenger that amplifies the signal in many signal transduction pathways. It is produced when G-proteins activate adenylyl cyclase, and it can activate protein kinase A to phosphorylate target proteins.',
    type: 'individual'
  },
  {
    question: 'Which phase of the cell cycle is characterized by DNA replication?',
    options: [
      'A. G1 phase',
      'B. S phase',
      'C. G2 phase',
      'D. M phase'
    ],
    answer: 1,
    explanation: 'DNA replication occurs during the S phase of the cell cycle. During this phase, each chromosome is duplicated to form sister chromatids joined at the centromere.',
    type: 'individual'
  },
  {
    question: 'What is the primary function of tumor suppressor genes?',
    options: [
      'A. They promote cell division and growth.',
      'B. They repair damaged DNA.',
      'C. They inhibit cell division and prevent tumor formation.',
      'D. They encode for proteins that activate oncogenes.'
    ],
    answer: 2,
    explanation: 'Tumor suppressor genes inhibit cell division and prevent tumor formation. They encode proteins that regulate the cell cycle and can trigger apoptosis when cells become damaged or potentially cancerous.',
    type: 'individual'
  },
  {
    question: 'During which stage of mitosis do sister chromatids separate and move toward opposite poles?',
    options: [
      'A. Prophase',
      'B. Metaphase',
      'C. Anaphase',
      'D. Telophase'
    ],
    answer: 2,
    explanation: 'Sister chromatids separate and move toward opposite poles during anaphase. This is when the spindle fibers shorten, pulling the sister chromatids apart to ensure each daughter cell receives an identical set of chromosomes.',
    type: 'individual'
  },
  {
    question: 'Which of the following is an example of a ligand-gated ion channel receptor?',
    options: [
      'A. Insulin receptor',
      'B. Acetylcholine receptor at neuromuscular junctions',
      'C. Epidermal growth factor receptor',
      'D. Estrogen receptor'
    ],
    answer: 1,
    explanation: 'The acetylcholine receptor at neuromuscular junctions is an example of a ligand-gated ion channel receptor. When acetylcholine binds, the channel opens to allow sodium ions to flow in, leading to muscle contraction.',
    type: 'individual'
  },
  {
    question: 'What is the consequence of a mutation in a proto-oncogene?',
    passage: 'Proto-oncogenes are normal genes that regulate cell growth and division. When functioning properly, they help control when cells should divide and when they should stop dividing. However, mutations can alter their function and lead to uncontrolled cell growth.',
    options: [
      'A. It can lead to uncontrolled cell division and cancer.',
      'B. It causes the gene to become inactive.',
      'C. It enhances the function of tumor suppressor genes.',
      'D. It prevents DNA replication.'
    ],
    answer: 0,
    explanation: 'A mutation in a proto-oncogene can lead to uncontrolled cell division and cancer. When proto-oncogenes are mutated, they become oncogenes that promote excessive cell division and can contribute to tumor formation.',
    type: 'stimulus',
    stimulusSet: 1,
    stimulusTitle: 'Questions 7-8. Cancer and Cell Cycle Control'
  },
  {
    question: 'Which checkpoint in the cell cycle ensures that DNA replication has been completed correctly before mitosis?',
    passage: 'Proto-oncogenes are normal genes that regulate cell growth and division. When functioning properly, they help control when cells should divide and when they should stop dividing. However, mutations can alter their function and lead to uncontrolled cell growth.',
    options: [
      'A. G1/S checkpoint',
      'B. G2/M checkpoint',
      'C. Metaphase checkpoint',
      'D. Anaphase checkpoint'
    ],
    answer: 1,
    explanation: 'The G2/M checkpoint ensures that DNA replication has been completed correctly before mitosis begins. This checkpoint verifies that all DNA has been properly replicated and that there are no DNA damage issues before the cell proceeds to mitosis.',
    type: 'stimulus',
    stimulusSet: 1
  },
  {
    question: 'What is the role of cyclin-dependent kinases (CDKs) in the cell cycle?',
    options: [
      'A. They degrade cyclins to stop the cell cycle.',
      'B. They phosphorylate target proteins to drive the cell cycle forward.',
      'C. They repair damaged DNA.',
      'D. They inhibit the activity of tumor suppressor genes.'
    ],
    answer: 1,
    explanation: 'Cyclin-dependent kinases (CDKs) phosphorylate target proteins to drive the cell cycle forward. When CDKs bind to cyclins, they become active and can phosphorylate specific proteins that promote progression through different phases of the cell cycle.',
    type: 'individual'
  },
  {
    question: 'Which of the following events occurs during telophase of mitosis?',
    options: [
      'A. Chromosomes condense and become visible.',
      'B. Chromosomes align at the metaphase plate.',
      'C. Nuclear envelopes re-form around separated chromatids.',
      'D. Sister chromatids are pulled apart toward opposite poles.'
    ],
    answer: 2,
    explanation: 'Nuclear envelopes re-form around separated chromatids during telophase. This is the final stage of mitosis where the nuclear membranes reform around each set of chromosomes, and the chromosomes begin to decondense.',
    type: 'individual'
  },
];

const APBiologyUnit4Quiz = () => {
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
      onClick={() => navigate('/ap-biology/unit/4')}
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

export default APBiologyUnit4Quiz;
