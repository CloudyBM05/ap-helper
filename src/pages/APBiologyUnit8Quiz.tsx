import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following explains this observation?',
    passage: 'A nocturnal rodent is placed in constant darkness for several weeks. Researchers observe that the rodent continues to be active for roughly 24 hours each day.',
    options: [
      'A. The rodent is ectothermic and relies on external temperatures.',
      'B. The rodent\'s internal circadian rhythm persists without environmental cues.',
      'C. The rodent has been habituated to darkness.',
      'D. The rodent is undergoing imprinting behavior.'
    ],
    answer: 1,
    explanation: 'Circadian rhythms persist without environmental cues. The rodent continues its 24-hour activity cycle because its internal circadian rhythm is maintained independently of external light conditions.',
    type: 'stimulus',
    stimulusSet: 1,
    stimulusTitle: 'Questions 1. Circadian Rhythms'
  },
  {
    question: 'In a simplified forest ecosystem, the energy available to secondary consumers is measured at 1,000 kcal. According to the 10% rule, how much energy would have been available to the producers?',
    options: [
      'A. 10,000 kcal',
      'B. 100,000 kcal',
      'C. 10 kcal',
      'D. 100 kcal'
    ],
    answer: 1,
    explanation: '10% of energy transfers per trophic level; 1,000 kcal → 10,000 → 100,000 kcal at producer level. Working backwards: secondary consumers (1,000 kcal) ← primary consumers (10,000 kcal) ← producers (100,000 kcal).',
    type: 'individual'
  },
  {
    question: 'A botanist notices that the roots of seedlings planted upside-down still grow downward into the soil. Which tropism is responsible?',
    options: [
      'A. Phototropism',
      'B. Gravitropism',
      'C. Thigmotropism',
      'D. Circadian rhythm'
    ],
    answer: 1,
    explanation: 'Roots respond to gravity (gravitropism). Gravitropism is the growth response to gravity where roots exhibit positive gravitropism (growing toward gravity/downward) while stems show negative gravitropism.',
    type: 'individual'
  },
  {
    question: 'A population of bacteria in ideal conditions doubles every hour. Which type of growth curve does this population most closely follow?',
    options: [
      'A. Logistic growth',
      'B. Exponential growth',
      'C. Density-independent growth',
      'D. Secondary succession'
    ],
    answer: 1,
    explanation: 'Exponential (J-shaped) growth occurs in ideal conditions. The doubling pattern described is characteristic of exponential growth where the rate of increase is proportional to the current population size.',
    type: 'individual'
  },
  {
    question: 'A clownfish lives among the tentacles of a sea anemone. The clownfish gains protection from predators, and the anemone gains cleaning of debris. This is an example of:',
    options: [
      'A. Parasitism',
      'B. Commensalism',
      'C. Mutualism',
      'D. Predation'
    ],
    answer: 2,
    explanation: 'Both species benefit; mutualism. The clownfish benefits from protection, while the anemone benefits from cleaning services. Both organisms gain advantages from the relationship.',
    type: 'individual'
  },
  {
    question: 'Using Simpson\'s Diversity Index formula D = 1 - Σ(n/N)², calculate the diversity index.',
    passage: 'In a small pond, the species distribution is measured. The total number of organisms is 100. Species A has 40 individuals, species B has 30, and species C has 30.',
    options: [
      'A. 0.58',
      'B. 0.67',
      'C. 0.72',
      'D. 0.80'
    ],
    answer: 1,
    explanation: 'D = 1 - [(40/100)² + (30/100)² + (30/100)²] = 1 - [0.16 + 0.09 + 0.09] = 1 - 0.34 = 0.66 ≈ 0.67. Higher values indicate greater diversity.',
    type: 'stimulus',
    stimulusSet: 2,
    stimulusTitle: 'Questions 6. Biodiversity Index'
  },
  {
    question: 'Which of the following is a density-independent factor that can limit population growth?',
    options: [
      'A. Disease spread more easily in crowded populations',
      'B. Food scarcity as population increases',
      'C. Tornado destroying a habitat',
      'D. Predation on the weakest individuals'
    ],
    answer: 2,
    explanation: 'Natural disasters affect populations regardless of density (density-independent). Density-independent factors affect populations regardless of their size or density, while the other options are density-dependent factors.',
    type: 'individual'
  },
  {
    question: 'In a grassland ecosystem, removal of a single herbivorous species leads to a dramatic decrease in plant species diversity. This herbivore is considered:',
    options: [
      'A. An invasive species',
      'B. A keystone species',
      'C. A pioneer species',
      'D. A decomposer'
    ],
    answer: 1,
    explanation: 'Keystone species have a disproportionately large effect on community structure. The herbivore\'s removal causing dramatic changes in plant diversity indicates it plays a crucial role in maintaining ecosystem balance.',
    type: 'individual'
  },
  {
    question: 'A barren volcanic island is slowly colonized by lichens, mosses, grasses, and eventually shrubs and trees. Which term describes the earliest stage of colonization?',
    options: [
      'A. Secondary succession',
      'B. Primary succession',
      'C. Climax community',
      'D. Pioneer degradation'
    ],
    answer: 1,
    explanation: 'Primary succession begins in areas without previous life; lichens are pioneer species. Primary succession occurs in areas where no organisms previously existed, and lichens are typical pioneer species.',
    type: 'individual'
  },
  {
    question: 'Which of the following is most directly associated with the enhancement of the greenhouse effect?',
    options: [
      'A. Overfishing',
      'B. Deforestation',
      'C. Ozone layer depletion',
      'D. Acid rain'
    ],
    answer: 1,
    explanation: 'Deforestation increases CO₂ in the atmosphere, enhancing the greenhouse effect. Deforestation reduces the number of trees that absorb CO₂ and releases stored carbon when trees are cut down.',
    type: 'individual'
  }
];

const APBiologyUnit8Quiz = () => {
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
      onClick={() => navigate('/ap-biology/unit/8')}
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

export default APBiologyUnit8Quiz;
