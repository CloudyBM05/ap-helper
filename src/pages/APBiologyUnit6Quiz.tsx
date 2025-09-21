import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following best describes the structure of DNA?',
    options: [
      'A. Single-stranded helix with ribose sugar',
      'B. Double-stranded helix with deoxyribose sugar and antiparallel strands',
      'C. Single-stranded linear molecule with phosphate groups',
      'D. Double-stranded helix with ribose sugar and parallel strands'
    ],
    answer: 1,
    explanation: 'DNA has a double-stranded helix structure with deoxyribose sugar and antiparallel strands (one runs 5\' to 3\', the other runs 3\' to 5\'). This structure was first described by Watson, Crick, and Franklin.',
    type: 'individual'
  },
  {
    question: 'During DNA replication, which enzyme is responsible for unwinding the double helix?',
    options: [
      'A. DNA polymerase',
      'B. DNA ligase',
      'C. DNA helicase',
      'D. DNA primase'
    ],
    answer: 2,
    explanation: 'DNA helicase is responsible for unwinding the double helix by breaking the hydrogen bonds between complementary base pairs, creating replication forks where DNA synthesis can begin.',
    type: 'individual'
  },
  {
    question: 'Which base pairing rules apply to DNA?',
    options: [
      'A. A pairs with U, G pairs with C',
      'B. A pairs with T, G pairs with C',
      'C. A pairs with G, T pairs with C',
      'D. A pairs with C, T pairs with G'
    ],
    answer: 1,
    explanation: 'In DNA, adenine (A) pairs with thymine (T) via 2 hydrogen bonds, and guanine (G) pairs with cytosine (C) via 3 hydrogen bonds. This is known as Chargaff\'s base pairing rules.',
    type: 'individual'
  },
  {
    question: 'What is the role of RNA polymerase in transcription?',
    options: [
      'A. It unwinds the DNA double helix',
      'B. It synthesizes RNA from a DNA template',
      'C. It joins Okazaki fragments together',
      'D. It proofreads newly synthesized DNA'
    ],
    answer: 1,
    explanation: 'RNA polymerase synthesizes RNA from a DNA template during transcription. It reads the template strand in the 3\' to 5\' direction and synthesizes RNA in the 5\' to 3\' direction.',
    type: 'individual'
  },
  {
    question: 'During translation, which site of the ribosome contains the growing protein chain?',
    options: [
      'A. A site (aminoacyl)',
      'B. P site (peptidyl)',
      'C. E site (exit)',
      'D. T site (termination)'
    ],
    answer: 1,
    explanation: 'The P site (peptidyl site) of the ribosome contains the tRNA with the growing protein chain. The A site receives incoming aminoacyl-tRNAs, and the E site is where empty tRNAs exit.',
    type: 'individual'
  },
  {
    question: 'Which of the following is an example of post-transcriptional modification in eukaryotes?',
    options: [
      'A. Addition of histone proteins',
      'B. 5\' capping and 3\' polyadenylation',
      'C. DNA methylation',
      'D. Chromatin condensation'
    ],
    answer: 1,
    explanation: '5\' capping and 3\' polyadenylation are post-transcriptional modifications that occur to pre-mRNA in eukaryotes. The 5\' cap and poly-A tail help protect the mRNA and facilitate translation.',
    type: 'individual'
  },
  {
    question: 'Based on the information provided, what would be the effect of a nonsense mutation in a gene?',
    passage: 'Gene X normally codes for a protein that is 300 amino acids long. A single nucleotide change in the middle of the gene creates a stop codon where there should be a codon for an amino acid. This type of mutation is called a nonsense mutation.',
    options: [
      'A. The protein would be longer than normal',
      'B. The protein would be truncated (shorter than normal)',
      'C. The protein would have one different amino acid',
      'D. The protein would be completely unchanged'
    ],
    answer: 1,
    explanation: 'A nonsense mutation creates a premature stop codon, resulting in a truncated (shortened) protein. Since the stop codon appears in the middle of the gene, translation would terminate early, producing a protein shorter than the normal 300 amino acids.',
    type: 'stimulus',
    stimulusSet: 1,
    stimulusTitle: 'Questions 7-8. Gene Mutations and Protein Synthesis'
  },
  {
    question: 'If this nonsense mutation occurred in an essential gene, what would be the most likely outcome for the cell?',
    passage: 'Gene X normally codes for a protein that is 300 amino acids long. A single nucleotide change in the middle of the gene creates a stop codon where there should be a codon for an amino acid. This type of mutation is called a nonsense mutation.',
    options: [
      'A. The cell would function normally',
      'B. The cell would produce more of the protein',
      'C. The cell would likely die or malfunction',
      'D. The cell would switch to producing a different protein'
    ],
    answer: 2,
    explanation: 'If a nonsense mutation occurs in an essential gene, the truncated protein would likely be non-functional, causing the cell to die or malfunction since it cannot perform the essential function normally carried out by the complete protein.',
    type: 'stimulus',
    stimulusSet: 1
  },
  {
    question: 'What is the primary difference between euchromatin and heterochromatin?',
    options: [
      'A. Euchromatin contains DNA, heterochromatin contains RNA',
      'B. Euchromatin is loosely packed and transcriptionally active, heterochromatin is tightly packed and inactive',
      'C. Euchromatin is found in prokaryotes, heterochromatin is found in eukaryotes',
      'D. Euchromatin replicates during S phase, heterochromatin replicates during G2 phase'
    ],
    answer: 1,
    explanation: 'Euchromatin is loosely packed chromatin that is transcriptionally active (genes can be expressed), while heterochromatin is tightly packed chromatin that is transcriptionally inactive (genes are silenced).',
    type: 'individual'
  },
  {
    question: 'Which of the following best describes the lac operon in E. coli?',
    options: [
      'A. It is constitutively expressed regardless of environmental conditions',
      'B. It is an inducible operon that is activated when lactose is present',
      'C. It is a repressible operon that is turned off when lactose is present',
      'D. It only functions during DNA replication'
    ],
    answer: 1,
    explanation: 'The lac operon is an inducible operon that is activated when lactose is present. When lactose (or allolactose) binds to the lac repressor, it causes the repressor to release from the operator, allowing transcription of genes needed for lactose metabolism.',
    type: 'individual'
  }
];

const APBiologyUnit6Quiz = () => {
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
      onClick={() => navigate('/ap-biology/unit/6')}
    >
      <span className="text-xl">←</span> Back to Study Guide
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
            🧬 Unit 6 Quiz Results
          </h1>
          
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-green-600 mb-2">
              {answers.filter((answer, idx) => answer === questions[idx].answer).length}/{questions.length}
            </div>
            <div className="text-xl text-slate-600">
              {Math.round((answers.filter((answer, idx) => answer === questions[idx].answer).length / questions.length) * 100)}% Correct
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.answer;
              
              return (
                <div key={idx} className={`p-4 rounded-lg border-2 ${isCorrect ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'}`}>
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <span className={`text-lg ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    Question {idx + 1}
                  </div>
                  
                  {q.type === 'stimulus' && q.stimulusTitle && (
                    <div className="bg-blue-50 p-3 rounded mb-3">
                      <div className="font-semibold text-blue-800 mb-1">{q.stimulusTitle}</div>
                      <div className="text-sm text-blue-700 italic">{q.passage}</div>
                    </div>
                  )}
                  
                  <div className="text-slate-800 mb-3">{q.question}</div>
                  
                  <div className="space-y-1 mb-3">
                    {q.options.map((option, optIdx) => (
                      <div key={optIdx} className={`p-2 rounded text-sm ${
                        optIdx === q.answer ? 'bg-green-200 font-semibold' : 
                        optIdx === userAnswer && optIdx !== q.answer ? 'bg-red-200' : 
                        'bg-slate-100'
                      }`}>
                        {option}
                        {optIdx === q.answer && <span className="ml-2 text-green-700">← Correct</span>}
                        {optIdx === userAnswer && optIdx !== q.answer && <span className="ml-2 text-red-700">← Your answer</span>}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              className="bg-gradient-to-r from-green-500 to-lime-400 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-lime-500 transition-all duration-300"
              onClick={handleRetake}
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[current];
  const isStimulus = currentQuestion.type === 'stimulus';
  const showStimulusTitle = isStimulus && currentQuestion.stimulusSet && 
    (current === 0 || !questions[current - 1] || questions[current - 1].stimulusSet !== currentQuestion.stimulusSet);

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 relative">
      {BackToGuideButton}
      <div style={{ height: 48 }} />
      
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-700">🧬 Unit 6: Gene Expression Quiz</h1>
          <div className="text-slate-500 font-semibold">
            {current + 1} / {questions.length}
          </div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
          <div
            className="bg-gradient-to-r from-green-500 to-lime-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        {showStimulusTitle && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border-l-4 border-blue-400">
            <h3 className="font-bold text-blue-800 mb-2">{currentQuestion.stimulusTitle}</h3>
            <div className="text-blue-700 text-sm italic leading-relaxed">
              {currentQuestion.passage}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <div key={idx} className="flex items-center">
                <button
                  type="button"
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    selected === idx
                      ? 'border-green-500 bg-green-100 text-green-800'
                      : crossedOut[current]?.includes(idx)
                      ? 'border-red-300 bg-red-50 text-red-600 line-through opacity-60'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-green-400 hover:bg-green-50'
                  }`}
                  onClick={() => handleSelect(idx)}
                  disabled={crossedOut[current]?.includes(idx)}
                >
                  {option}
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
    </div>
  );
};

export default APBiologyUnit6Quiz;
