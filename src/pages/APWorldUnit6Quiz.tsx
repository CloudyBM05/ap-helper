import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// AP World Unit 6 Quiz Data
const quizData = [
  {
    question: `"The assassination of Archduke Franz Ferdinand has ignited a chain reaction of alliances, plunging Europe into war. Our nations must prepare for a conflict that could reshape the world order." — European diplomat, June 1914\n\nUse the stimulus to answer the question:\nWhich of the following was a major consequence of the event described?`,
    options: [
      'A) The start of World War I',
      'B) The Russian Revolution',
      'C) The signing of the Treaty of Versailles',
      'D) The Great Depression',
    ],
    answer: 0,
    explanation: 'The assassination of Archduke Franz Ferdinand triggered World War I.'
  },
  {
    question: `"The assassination of Archduke Franz Ferdinand has ignited a chain reaction of alliances, plunging Europe into war. Our nations must prepare for a conflict that could reshape the world order." — European diplomat, June 1914\n\nUse the stimulus to answer the question:\nWhich of the following best describes the system of alliances mentioned?`,
    options: [
      'A) Isolationism among European nations',
      'B) A complex web of treaties binding countries to defend each other',
      'C) Economic trade agreements',
      'D) A global peace organization',
    ],
    answer: 1,
    explanation: 'A complex web of alliances obligated countries to defend each other, escalating the conflict.'
  },
  {
    question: `"The Bolsheviks have seized power and aim to establish a communist state based on Marxist principles. The old regime has been overthrown, and a new era begins." — Russian newspaper, 1917\n\nUse the stimulus to answer the question:\nWhich event is described in this excerpt?`,
    options: [
      'A) The Russian Revolution',
      'B) The Industrial Revolution',
      'C) The Meiji Restoration',
      'D) The Chinese Cultural Revolution',
    ],
    answer: 0,
    explanation: 'The Bolshevik seizure of power in 1917 marks the Russian Revolution.'
  },
  {
    question: `"The Bolsheviks have seized power and aim to establish a communist state based on Marxist principles. The old regime has been overthrown, and a new era begins." — Russian newspaper, 1917\n\nUse the stimulus to answer the question:\nWhich leader was most directly associated with this movement?`,
    options: [
      'A) Joseph Stalin',
      'B) Vladimir Lenin',
      'C) Mao Zedong',
      'D) Nicholas II',
    ],
    answer: 1,
    explanation: 'Vladimir Lenin led the Bolsheviks during the Russian Revolution.'
  },
  {
    question: `"The stock market crash has led to widespread unemployment and economic hardship. Governments worldwide are struggling to respond to the crisis." — Newspaper headline, 1929\n\nUse the stimulus to answer the question:\nThis event is known as:`,
    options: [
      'A) The Great Depression',
      'B) The Cold War',
      'C) The Industrial Revolution',
      'D) The Opium Wars',
    ],
    answer: 0,
    explanation: 'The 1929 stock market crash triggered the Great Depression.'
  },
  {
    question: `"The stock market crash has led to widespread unemployment and economic hardship. Governments worldwide are struggling to respond to the crisis." — Newspaper headline, 1929\n\nUse the stimulus to answer the question:\nOne political consequence of this event was:`,
    options: [
      'A) Strengthening of democratic governments worldwide',
      'B) Rise of totalitarian regimes in several countries',
      'C) The start of World War I',
      'D) The spread of communism in Latin America',
    ],
    answer: 1,
    explanation: 'The Great Depression led to the rise of totalitarian regimes in countries like Germany and Italy.'
  },
  {
    question: `"Western powers have imposed treaties forcing China to open ports and cede territory after military defeat. Our sovereignty is compromised, and foreign influence grows." — Qing official, 1842\n\nUse the stimulus to answer the question:\nWhich conflict led to the situation described in the excerpt?`,
    options: [
      'A) The Opium Wars',
      'B) The Boxer Rebellion',
      'C) The Taiping Rebellion',
      'D) The Sino-Japanese War',
    ],
    answer: 0,
    explanation: 'The Opium Wars resulted in unequal treaties that compromised China’s sovereignty.'
  },
  {
    question: `"Western powers have imposed treaties forcing China to open ports and cede territory after military defeat. Our sovereignty is compromised, and foreign influence grows." — Qing official, 1842\n\nUse the stimulus to answer the question:\nOne major impact of these treaties was:`,
    options: [
      'A) The strengthening of Qing dynasty control',
      'B) Establishment of foreign spheres of influence in China',
      'C) China\'s colonization of Japan',
      'D) The abolition of the opium trade',
    ],
    answer: 1,
    explanation: 'The treaties established foreign spheres of influence in China.'
  },
  {
    question: `"To survive in this age, Japan must rapidly modernize by adopting Western technology, military practices, and political institutions." — Meiji reformer, 1870\n\nUse the stimulus to answer the question:\nWhich process is described in this statement?`,
    options: [
      'A) The Tokugawa Shogunate',
      'B) The Meiji Restoration',
      'C) The Sino-Japanese War',
      'D) The Boxer Rebellion',
    ],
    answer: 1,
    explanation: 'The Meiji Restoration was Japan’s rapid modernization and Westernization.'
  },
  {
    question: `"To survive in this age, Japan must rapidly modernize by adopting Western technology, military practices, and political institutions." — Meiji reformer, 1870\n\nUse the stimulus to answer the question:\nA significant outcome of this process was:`,
    options: [
      'A) Japan’s transformation into an imperial power',
      'B) Japan’s colonization by Western nations',
      'C) The restoration of feudal samurai rule',
      'D) Japan’s withdrawal from global affairs',
    ],
    answer: 0,
    explanation: 'Japan’s modernization led to its emergence as an imperial power.'
  },
];

const APWorldUnit6Quiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quizData.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [crossedOut, setCrossedOut] = useState<number[][]>(Array(quizData.length).fill(null).map(() => []));
  const navigate = useNavigate();

  const handleSelect = (idx: number) => {
    setSelected(idx);
  };

  const handleCrossOut = (idx: number) => {
    setCrossedOut((prev) => {
      const copy = prev.map(arr => [...arr]);
      const arr = copy[current];
      if (arr.includes(idx)) {
        copy[current] = arr.filter(i => i !== idx);
      } else {
        copy[current] = [...arr, idx];
        if (selected === idx) setSelected(null);
      }
      return copy;
    });
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setSelected(null);
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
  const handleGoBack = () => navigate('/ap-world-study-guide/unit/6');

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
      onClick={handleGoBack}
    >
      <span className="text-xl">←</span> Back to Unit 6 Study Guide
    </button>
  );

  // Helper to parse question
  const parseQuestion = (question: string) => {
    const match = question.match(/^"([\s\S]+?)"(?:\s*[—-—]\s*([^\r\n]+))?\s*([\s\S]*)$/);
    if (match) {
      const stimulus = `"${match[1]}"`;
      const source = match[2] ? match[2].trim() : null;
      const questionText = match[3] ? match[3].replace(/^\d+\.\s*/, '').trim() : '';
      return { stimulus, source, questionText };
    }
    return { stimulus: null, source: null, questionText: question };
  };

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        <h1 className="text-3xl font-bold mb-8 text-center">Quiz Results</h1>
        {quizData.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = userAnswer === q.answer;
          const { stimulus, source, questionText } = parseQuestion(q.question);
          return (
            <div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
              <div className="mb-2 text-slate-500">Question {idx + 1}</div>
              {stimulus && (
                <div className="mb-2 text-green-700 whitespace-pre-line">{stimulus}</div>
              )}
              {source && <div className="mb-4 text-xs text-slate-500 italic">{source}</div>}
              <div className="mb-2 font-semibold">{questionText}</div>
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
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                <p className="text-blue-800">{q.explanation}</p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
            onClick={handleGoBack}
          >
            Go Back to Unit
          </button>
        </div>
      </div>
    );
  }

  if (current >= quizData.length) {
    return null;
  }

  const q = quizData[current];
  const { stimulus, source, questionText } = parseQuestion(q.question);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 relative">
      {BackToGuideButton}
      <div style={{ height: 48 }} />
      <div className="mb-8">
        {stimulus && (
          <div className="mb-2 text-green-700 whitespace-pre-line">{stimulus}</div>
        )}
        {source && <div className="mb-4 text-xs text-slate-500 italic">{source}</div>}
        <div className="text-slate-500 mb-2">
          Question {current + 1} of {quizData.length}
        </div>
        <div className="text-lg font-semibold mb-4 whitespace-pre-line">{questionText}</div>
        <div className="space-y-3">
          {q.options.map((opt: string, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg border w-full text-left transition-all duration-200 text-base
                  ${selected === idx ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-slate-800'}
                  ${crossedOut[current]?.includes(idx) ? 'line-through opacity-50' : ''}
                `}
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
        {current < quizData.length - 1 ? (
          <button
            className="bg-gradient-to-r from-green-600 to-green-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-green-700 hover:to-green-500 transition-all duration-300"
            onClick={handleNext}
            disabled={selected === null}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
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

export default APWorldUnit6Quiz;
