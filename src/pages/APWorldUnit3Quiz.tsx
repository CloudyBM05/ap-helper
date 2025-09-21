import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// AP World Unit 3 Quiz Data
const quizData = [
  {
    question: `“Trade routes are secure, and commerce thrives, as merchants can now travel from China to the Mediterranean without fear. Markets are flourishing with luxury goods.”\n— Anonymous Persian merchant, 13th century CE\n\nWhich development best explains the context of the passage?`,
    options: [
      'A. The revival of Confucian civil service exams',
      'B. The political fragmentation of the Abbasid Caliphate',
      'C. Mongol control over Eurasian land routes',
      'D. Increased naval activity in the Indian Ocean',
    ],
    answer: 2,
    explanation: 'The Mongol Empire established control over the Silk Roads, creating a period of stability (Pax Mongolica) that allowed for safe passage and increased trade across Eurasia.'
  },
  {
    question: `“Trade routes are secure, and commerce thrives, as merchants can now travel from China to the Mediterranean without fear. Markets are flourishing with luxury goods.”\n— Anonymous Persian merchant, 13th century CE\n\nWhat was a direct result of the conditions described in the passage?`,
    options: [
      'A. The collapse of the Delhi Sultanate',
      'B. Decline of Silk Road cities like Samarkand and Kashgar',
      'C. Greater diffusion of gunpowder and paper-making technologies',
      'D. Disruption of trade due to religious conflicts',
    ],
    answer: 2,
    explanation: 'The security provided by Mongol rule enabled the spread of technologies such as gunpowder and papermaking from East Asia to the West.'
  },
  {
    question: `“The West African king traveled to Mecca bearing gifts of such quantity that the price of gold dropped in several cities along his route.”\n— Cairo merchant, 14th century\n\nWhich empire is most directly referenced in this description?`,
    options: [
      'A. Ghana',
      'B. Songhai',
      'C. Mali',
      'D. Aksum',
    ],
    answer: 2,
    explanation: 'The passage refers to Mansa Musa, the famous king of Mali, whose pilgrimage to Mecca is legendary for its display of wealth.'
  },
  {
    question: `“The West African king traveled to Mecca bearing gifts of such quantity that the price of gold dropped in several cities along his route.”\n— Cairo merchant, 14th century\n\nWhich of the following best explains the economic consequence described in the passage?`,
    options: [
      'A. The establishment of West African ports for Indian Ocean trade',
      'B. The devaluation of gold through oversupply',
      'C. The introduction of coin currency into Islamic territories',
      'D. The adoption of West African agriculture in Egypt',
    ],
    answer: 1,
    explanation: 'Mansa Musa distributed so much gold that it caused inflation and a drop in gold’s value in the regions he visited.'
  },
  {
    question: `Which of the following innovations most directly facilitated Indian Ocean trade during the period 1200–1450?`,
    options: [
      'A. Camel caravans and saddles',
      'B. Junks, lateen sails, and monsoon wind knowledge',
      'C. Pack animals and iron stirrups',
      'D. Wheeled carts and relay stations',
    ],
    answer: 1,
    explanation: 'Junks (large ships), lateen sails, and understanding of monsoon winds were crucial for successful Indian Ocean trade.'
  },
  {
    question: `Which city became a powerful commercial hub because of its control of a major maritime chokepoint?`,
    options: [
      'A. Mecca',
      'B. Malacca',
      'C. Baghdad',
      'D. Samarkand',
    ],
    answer: 1,
    explanation: 'Malacca controlled the Strait of Malacca, a key maritime chokepoint, and became a wealthy trading city by taxing passing ships.'
  },
  {
    question: `How did the introduction of the camel saddle affect trade in the Sahara?`,
    options: [
      'A. It led to the decline of Trans-Saharan trade',
      'B. It allowed merchants to bypass the desert entirely',
      'C. It enabled more efficient and larger trade caravans across the desert',
      'D. It discouraged nomadic pastoralism in North Africa',
    ],
    answer: 2,
    explanation: 'The camel saddle allowed merchants to carry more goods and travel longer distances, making Trans-Saharan trade more efficient and profitable.'
  },
  {
    question: `Which of the following best describes a diasporic community?`,
    options: [
      'A. A religious minority living in isolation',
      'B. A group forcibly displaced by a conquering empire',
      'C. A community formed by merchants living outside their homeland while maintaining cultural identity',
      'D. A society established in a new region through conquest',
    ],
    answer: 2,
    explanation: 'Diasporic communities are groups of people, often merchants, who settle far from their homeland but maintain their cultural identity.'
  },
  {
    question: `What was one long-term cultural consequence of the growth of trade along the Silk Roads and Indian Ocean networks?`,
    options: [
      'A. Decrease in urbanization across Asia',
      'B. The end of Confucian thought in China',
      'C. The rise of shared artistic styles and architectural influences',
      'D. Collapse of Islamic merchant activity',
    ],
    answer: 2,
    explanation: 'Trade led to the blending and spread of artistic and architectural styles across regions, a hallmark of cultural diffusion.'
  },
  {
    question: `Why were cities like Kashgar and Samarkand important to the Silk Roads?`,
    options: [
      'A. They were ports for Indian Ocean sea trade',
      'B. They were capitals of Mongol khanates',
      'C. They were religious centers for Buddhism',
      'D. They were key oasis towns that supported trade and cultural exchange',
    ],
    answer: 3,
    explanation: 'Kashgar and Samarkand were vital oasis cities that provided rest, supplies, and cultural exchange for merchants on the Silk Roads.'
  },
];

const APWorldUnit3Quiz: React.FC = () => {
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
  const handleGoBack = () => navigate('/ap-world-study-guide/unit/3');

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
      onClick={handleGoBack}
    >
      <span className="text-xl">←</span> Back to Unit 3 Study Guide
    </button>
  );

  // Helper to parse question
  const parseQuestion = (question: string) => {
    const match = question.match(/^“([\s\S]+?)”(?:\s*[—-—]\s*([^\r\n]+))?\s*([\s\S]*)$/);

    if (match) {
      const stimulus = `“${match[1]}”`;
      const source = match[2] ? match[2].trim() : null;
      const questionText = match[3] ? match[3].trim() : '';
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
                <>
                  <div className="mb-2 text-green-700 whitespace-pre-line">
                    {stimulus}
                  </div>
                  {source && <div className="mb-4 text-xs text-slate-500 italic">{source}</div>}
                </>
              )}
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
          <>
            <div className="mb-2 text-green-700 whitespace-pre-line">{stimulus}</div>
            {source && <div className="mb-4 text-xs text-slate-500 italic">{source}</div>}
          </>
        )}
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

export default APWorldUnit3Quiz;
