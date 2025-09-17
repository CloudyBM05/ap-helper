import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'What is the primary mechanism by which natural selection operates?',
    options: [
      'A. Random changes in allele frequencies',
      'B. Differential survival and reproduction of individuals',
      'C. Migration between populations',
      'D. Mutation rates'
    ],
    answer: 1,
    explanation: 'Natural selection operates through differential survival and reproduction of individuals. Individuals with traits that increase their fitness are more likely to survive and reproduce, passing these advantageous traits to their offspring.',
    type: 'individual'
  },
  {
    question: 'Which of the following is NOT a requirement for Hardy-Weinberg equilibrium?',
    options: [
      'A. No mutations',
      'B. Random mating',
      'C. Large population size',
      'D. Directional selection'
    ],
    answer: 3,
    explanation: 'Directional selection is NOT a requirement for Hardy-Weinberg equilibrium. In fact, any form of selection (directional, stabilizing, or disruptive) would violate the "no selection" condition required for Hardy-Weinberg equilibrium.',
    type: 'individual'
  },
  {
    question: 'In a population where the frequency of allele A is 0.6 and allele a is 0.4, what is the expected frequency of heterozygotes under Hardy-Weinberg equilibrium?',
    options: [
      'A. 0.16',
      'B. 0.24',
      'C. 0.36',
      'D. 0.48'
    ],
    answer: 3,
    explanation: 'The frequency of heterozygotes (Aa) is calculated as 2pq, where p = 0.6 and q = 0.4. Therefore, 2pq = 2(0.6)(0.4) = 0.48 or 48%.',
    type: 'individual'
  },
  {
    question: 'Which type of selection favors intermediate phenotypes?',
    options: [
      'A. Directional selection',
      'B. Stabilizing selection',
      'C. Disruptive selection',
      'D. Sexual selection'
    ],
    answer: 1,
    explanation: 'Stabilizing selection favors intermediate phenotypes and selects against extreme values. This type of selection reduces variation in the population and maintains the status quo.',
    type: 'individual'
  },
  {
    question: 'Genetic drift has the strongest effect in which type of population?',
    options: [
      'A. Large populations',
      'B. Small populations',
      'C. Populations with high gene flow',
      'D. Populations under strong selection'
    ],
    answer: 1,
    explanation: 'Genetic drift has the strongest effect in small populations. In small populations, random sampling events can cause significant changes in allele frequencies, while large populations are more resistant to drift.',
    type: 'individual'
  },
  {
    question: 'What is the founder effect?',
    options: [
      'A. The increase in genetic diversity when a population grows',
      'B. The loss of genetic diversity when a small group establishes a new population',
      'C. The gain of new alleles through mutation',
      'D. The mixing of alleles between populations'
    ],
    answer: 1,
    explanation: 'The founder effect is the loss of genetic diversity that occurs when a small group of individuals becomes separated from a larger population and establishes a new population. The new population has reduced genetic diversity compared to the original population.',
    type: 'individual'
  },
  {
    question: 'Based on the passage, which factor is most likely to maintain genetic variation in a population?',
    passage: 'In many natural populations, multiple alleles for a given trait persist over time despite natural selection. Research has shown that in some cases, rare alleles actually have a fitness advantage simply because they are rare. This phenomenon, known as frequency-dependent selection, can occur when predators develop search images for common prey types, making rare variants less likely to be caught.',
    options: [
      'A. Genetic drift',
      'B. Gene flow',
      'C. Frequency-dependent selection',
      'D. Mutation'
    ],
    answer: 2,
    explanation: 'According to the passage, frequency-dependent selection maintains genetic variation by giving rare alleles a fitness advantage. This prevents any single allele from becoming fixed in the population.',
    type: 'stimulus',
    stimulusSet: 1,
    stimulusTitle: 'Questions 7-8. Maintaining Genetic Variation'
  },
  {
    question: 'What type of selection is described in the passage?',
    passage: 'In many natural populations, multiple alleles for a given trait persist over time despite natural selection. Research has shown that in some cases, rare alleles actually have a fitness advantage simply because they are rare. This phenomenon, known as frequency-dependent selection, can occur when predators develop search images for common prey types, making rare variants less likely to be caught.',
    options: [
      'A. Directional selection',
      'B. Stabilizing selection',
      'C. Disruptive selection',
      'D. Frequency-dependent selection'
    ],
    answer: 3,
    explanation: 'The passage explicitly describes frequency-dependent selection, where the fitness of an allele depends on its frequency in the population. Rare alleles have higher fitness because they are less likely to be recognized and caught by predators.',
    type: 'stimulus',
    stimulusSet: 1
  },
  {
    question: 'Gene flow between populations tends to:',
    options: [
      'A. Increase genetic differences between populations',
      'B. Decrease genetic differences between populations',
      'C. Have no effect on genetic differences',
      'D. Only affect small populations'
    ],
    answer: 1,
    explanation: 'Gene flow between populations tends to decrease genetic differences between populations. When individuals migrate and reproduce, they introduce alleles from one population to another, making the populations more genetically similar.',
    type: 'individual'
  },
  {
    question: 'Which of the following best describes allopatric speciation?',
    options: [
      'A. Speciation occurring within the same geographic area',
      'B. Speciation resulting from geographic isolation',
      'C. Speciation caused only by genetic drift',
      'D. Speciation that occurs very rapidly'
    ],
    answer: 1,
    explanation: 'Allopatric speciation occurs when populations become geographically isolated from each other. Over time, these separated populations may evolve differently and eventually become reproductively isolated, forming new species.',
    type: 'individual'
  },
  {
    question: 'What is evolutionary fitness?',
    options: [
      'A. Physical strength and endurance',
      'B. Ability to survive in harsh environments',
      'C. Reproductive success relative to other individuals',
      'D. Intelligence and problem-solving ability'
    ],
    answer: 2,
    explanation: 'Evolutionary fitness is reproductive success relative to other individuals in the population. It is measured by the number of surviving offspring that an individual produces, not by physical characteristics like strength.',
    type: 'individual'
  },
  {
    question: 'Based on the data presented, what can be concluded about the population?',
    passage: 'A researcher studied a population of beetles and found the following genotype frequencies: AA = 0.36, Aa = 0.48, aa = 0.16. The researcher calculated that if the population were in Hardy-Weinberg equilibrium, the expected frequencies would be: AA = 0.36, Aa = 0.48, aa = 0.16.',
    options: [
      'A. The population is evolving',
      'B. The population is in Hardy-Weinberg equilibrium',
      'C. Genetic drift is occurring',
      'D. Migration is affecting the population'
    ],
    answer: 1,
    explanation: 'Since the observed genotype frequencies match the Hardy-Weinberg expected frequencies exactly, the population is in Hardy-Weinberg equilibrium. This suggests that the population is not currently evolving with respect to this particular gene.',
    type: 'stimulus',
    stimulusSet: 2,
    stimulusTitle: 'Questions 12-13. Population Genetics Analysis'
  },
  {
    question: 'What are the allele frequencies in this population?',
    passage: 'A researcher studied a population of beetles and found the following genotype frequencies: AA = 0.36, Aa = 0.48, aa = 0.16. The researcher calculated that if the population were in Hardy-Weinberg equilibrium, the expected frequencies would be: AA = 0.36, Aa = 0.48, aa = 0.16.',
    options: [
      'A. A = 0.6, a = 0.4',
      'B. A = 0.4, a = 0.6',
      'C. A = 0.36, a = 0.16',
      'D. A = 0.8, a = 0.2'
    ],
    answer: 0,
    explanation: 'The frequency of allele A can be calculated as the frequency of AA plus half the frequency of Aa: 0.36 + (0.48/2) = 0.36 + 0.24 = 0.6. The frequency of allele a is 1 - 0.6 = 0.4.',
    type: 'stimulus',
    stimulusSet: 2
  },
  {
    question: 'Which mechanism of evolution introduces new alleles into a population?',
    options: [
      'A. Natural selection',
      'B. Genetic drift',
      'C. Gene flow',
      'D. Mutation'
    ],
    answer: 3,
    explanation: 'Mutation is the only mechanism that introduces completely new alleles into a population. While gene flow can introduce alleles that are new to a particular population, these alleles already existed in other populations.',
    type: 'individual'
  },
  {
    question: 'Artificial selection differs from natural selection in that:',
    options: [
      'A. Artificial selection works faster than natural selection',
      'B. Humans choose which traits are favored in artificial selection',
      'C. Artificial selection only works on domesticated species',
      'D. Natural selection is more powerful than artificial selection'
    ],
    answer: 1,
    explanation: 'In artificial selection, humans choose which traits are favored and which individuals get to reproduce. In natural selection, environmental factors determine which traits are advantageous for survival and reproduction.',
    type: 'individual'
  }
];

const APBiologyUnit7Quiz = () => {
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
      onClick={() => navigate('/ap-biology/unit/7')}
    >
      <span className="text-xl">←</span> Back to Study Guide
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Quiz Results</h1>
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.answer;
            return (
              <div key={idx} className={`p-6 rounded-lg border-2 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
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
                <div className="font-semibold mb-4">Question {idx + 1}: {q.question}</div>
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className={`p-2 rounded ${
                      optIdx === q.answer ? 'bg-green-200 border-2 border-green-500' :
                      optIdx === userAnswer ? 'bg-red-200 border-2 border-red-500' :
                      'bg-gray-100'
                    }`}>
                      {opt}
                      {optIdx === q.answer && <span className="ml-2 text-green-700 font-bold">✓ Correct</span>}
                      {optIdx === userAnswer && optIdx !== q.answer && <span className="ml-2 text-red-700 font-bold">✗ Your answer</span>}
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                  <strong>Explanation:</strong> {q.explanation}
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <div className="text-2xl font-bold mb-4">
            Score: {answers.filter((answer, idx) => answer === questions[idx].answer).length} / {questions.length}
          </div>
        </div>
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

export default APBiologyUnit7Quiz;
