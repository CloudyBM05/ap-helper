import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following research methods compares individuals of different ages at a single point in time?',
    options: [
      'A. Case study',
      'B. Longitudinal study',
      'C. Naturalistic observation',
      'D. Cross-sectional study',
    ],
    answer: 3,
    explanation: 'A cross-sectional study compares people of different ages at one point in time.'
  },
  {
    question: 'According to Jean Piaget, which stage of cognitive development is characterized by egocentrism and an inability to understand conservation?',
    options: [
      'A. Sensorimotor',
      'B. Preoperational',
      'C. Concrete operational',
      'D. Formal operational',
    ],
    answer: 1,
    explanation: 'The preoperational stage (2–7 years) is marked by egocentrism and lack of conservation.'
  },
  {
    question: 'A child is shown a ball of clay that is flattened into a pancake shape. She insists that the flattened shape contains more clay than the ball. This child is likely in which of Piaget’s stages?',
    options: [
      'A. Sensorimotor',
      'B. Preoperational',
      'C. Concrete operational',
      'D. Formal operational',
    ],
    answer: 1,
    explanation: 'Failure to understand conservation is typical of the preoperational stage.'
  },
  {
    question: 'A securely attached infant will most likely:',
    options: [
      'A. Avoid contact with the caregiver upon return',
      'B. Be indifferent when the caregiver leaves',
      'C. Show distress when the caregiver leaves and seek comfort when they return',
      'D. Cry when left alone but refuse comfort from the caregiver',
    ],
    answer: 2,
    explanation: 'Secure attachment is shown by distress at separation and comfort-seeking at reunion.'
  },
  {
    question: 'Which parenting style is most consistently associated with high self-esteem and social competence in children?',
    options: [
      'A. Authoritarian',
      'B. Permissive',
      'C. Neglectful',
      'D. Authoritative',
    ],
    answer: 3,
    explanation: 'Authoritative parenting (high warmth, high control) leads to the best outcomes.'
  },
  {
    question: 'Which of the following best describes the concept of imprinting?',
    options: [
      'A. A child’s ability to take another’s perspective',
      'B. An infant\'s preference for familiar sounds',
      'C. A period in which exposure to certain stimuli produces normal development',
      'D. A rigid attachment process that occurs shortly after birth in some animals',
    ],
    answer: 3,
    explanation: 'Imprinting is a rigid attachment process seen in some animals soon after birth.'
  },
  {
    question: 'Which of the following theorists is most closely associated with the concept of the zone of proximal development?',
    options: [
      'A. Jean Piaget',
      'B. Erik Erikson',
      'C. Lawrence Kohlberg',
      'D. Lev Vygotsky',
    ],
    answer: 3,
    explanation: 'Lev Vygotsky developed the concept of the zone of proximal development.'
  },
  {
    question: 'According to Erik Erikson, adolescents are primarily focused on which developmental task?',
    options: [
      'A. Developing a sense of competence',
      'B. Achieving intimacy in relationships',
      'C. Forming a sense of identity',
      'D. Resolving trust vs. mistrust',
    ],
    answer: 2,
    explanation: 'Identity formation is the key task for adolescents in Erikson\'s theory.'
  },
  {
    question: 'Which term refers to a belief held by adolescents that others are constantly watching and judging them?',
    options: [
      'A. Personal fable',
      'B. Imaginary audience',
      'C. Egocentrism',
      'D. Spotlight effect',
    ],
    answer: 1,
    explanation: 'Imaginary audience is the belief that others are always watching and judging.'
  },
  {
    question: 'Which statement best reflects the concept of crystallized intelligence?',
    options: [
      'A. It increases with age and refers to accumulated knowledge',
      'B. It decreases with age and involves rapid problem-solving',
      'C. It is dependent on brain plasticity and synaptic pruning',
      'D. It is necessary for abstract reasoning and pattern recognition',
    ],
    answer: 0,
    explanation: 'Crystallized intelligence is accumulated knowledge and skills, which increase with age.'
  },
];

const APPsychUnit3Quiz = () => {
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
    setSelected(answers[current + 1] ?? null);
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
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-yellow-700 shadow transition flex items-center gap-2 z-20"
      onClick={() => navigate('/ap-psychology/unit/3')}
    >
      <span className="text-xl">←</span> Back to Study Guide
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        <h1 className="text-3xl font-bold mb-8 text-center text-yellow-700">Quiz Results</h1>
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
                <div className="text-yellow-700 mb-1">You did not answer this question.</div>
              ) : isCorrect ? (
                <div className="text-green-700 mb-1">Correct!</div>
              ) : (
                <div className="text-red-700 mb-1">Incorrect.</div>
              )}
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Explanation:</h4>
                <p className="text-yellow-800">{q.explanation}</p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
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
                  selected === idx ? 'bg-yellow-500 text-white border-yellow-600' : 'bg-white text-slate-800'
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
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
            onClick={handleNext}
            disabled={selected === null}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
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

export default APPsychUnit3Quiz;
