import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// AP World Unit 1 Quiz Data (flat array, no stimulus)
const quizData = [
  {
    question: `"The civil service exam system ensured a level of bureaucratic competence and was rooted in Confucian values, emphasizing the importance of hierarchy, merit, and social harmony."
Which of the following developments best explains the context for the civil service exam system in China during the Song dynasty?`,
    options: [
      'A. The spread of Islam across East Asia',
      'B. The influence of Mongol military tactics on Chinese government',
      'C. The revival and transformation of Confucianism into Neo-Confucianism',
      'D. The decline of trade networks like the Silk Roads',
    ],
    answer: 2,
    explanation: 'Neo-Confucianism, a revival and transformation of Confucian thought, became the dominant ideology in Song China. It justified the civil service exam system, emphasizing hierarchy, merit, and social harmony as core values for bureaucratic governance.'
  },
  {
    question: `"The Swahili city-states along the East African coast were bustling hubs of trade, adorned with grand mosques and infused with Arab and Islamic cultural elements."
What does this description suggest about Swahili coastal cities during the period 1200–1450?`,
    options: [
      'A. They were entirely isolated from outside influences.',
      'B. They adopted Hinduism as the primary religion due to Indian merchants.',
      'C. They were integrated into the Islamic world through trade.',
      'D. They rejected all foreign architectural influences.',
    ],
    answer: 2,
    explanation: 'The Swahili city-states were deeply connected to the Indian Ocean trade network, which brought Islamic religion, architecture, and culture to the region. Their prosperity and cosmopolitan character reflected this integration.'
  },
  {
    question: 'Which of the following best explains the success of the Mali Empire in West Africa during the 13th and 14th centuries?',
    options: [
      'A. Its dependence on Mongol protection through the Silk Roads',
      'B. Its exploitation of gold and salt trade through the Trans-Saharan network',
      'C. Its naval dominance over the Indian Ocean trade routes',
      'D. Its early industrialization and production of steel tools',
    ],
    answer: 1,
    explanation: 'Mali’s wealth and power came from controlling and taxing the lucrative gold and salt trade across the Sahara, which allowed it to flourish as a major empire in West Africa.'
  },
  {
    question: `"Our country, though small and remote, has always honored scholarship and upheld the Way of the Buddha."
—Letter from the Japanese emperor to the Tang emperor, 7th century
Which of the following does this quote best illustrate about East Asia before and during the period 1200–1450?`,
    options: [
      'A. China’s cultural dominance over its neighbors through a tribute system',
      'B. Japan’s total political submission to Chinese imperial rule',
      'C. The rejection of Confucian and Buddhist ideas by surrounding regions',
      'D. Korea’s military dominance over China in the early medieval period',
    ],
    answer: 0,
    explanation: 'The quote shows how China’s neighbors, like Japan, respected and adopted Chinese cultural and religious ideas through the tribute system, even while maintaining political independence.'
  },
  {
    question: 'The spread of Champa rice into China during the Song Dynasty is most directly an example of:',
    options: [
      'A. Bureaucratic corruption in the Chinese government',
      'B. The growing role of Confucianism in Chinese society',
      'C. Environmental and agricultural diffusion through trade',
      'D. The influence of the Mongols on agricultural practices',
    ],
    answer: 2,
    explanation: 'Champa rice was introduced to China from Vietnam, demonstrating how agricultural innovations spread through trade and contributed to population growth.'
  },
  {
    question: 'How did the Mongol Empire contribute to the increased exchange of goods and ideas during the 13th and 14th centuries?',
    options: [
      'A. They established a unified currency across Eurasia.',
      'B. They built oceanic naval trade networks to connect with Africa.',
      'C. They secured and unified trade routes, leading to greater cross-cultural contact.',
      'D. They banned long-distance trade to protect their own local economies.',
    ],
    answer: 2,
    explanation: 'The Mongols created the largest contiguous land empire in history, securing the Silk Roads and making travel and trade safer, which led to increased cross-cultural exchange (Pax Mongolica).'
  },
  {
    question: 'Which of the following best describes a continuity in South Asian religious culture during the period 1200–1450?',
    options: [
      'A. The decline of Hinduism and the complete adoption of Islam',
      'B. The persistence of caste structures reinforced by Hindu beliefs',
      'C. The rise of Christianity among Indian elites',
      'D. The replacement of Buddhism with Zoroastrianism',
    ],
    answer: 1,
    explanation: 'Despite the arrival of Islam and other changes, the caste system and Hindu beliefs remained central to South Asian society throughout this period.'
  },
  {
    question: 'The establishment of diasporic merchant communities in East Africa and Southeast Asia during the postclassical era most directly contributed to:',
    options: [
      'A. The decline of urbanization in coastal cities',
      'B. The growth of local animist religions',
      'C. Cultural syncretism and the spread of Islam',
      'D. A global economic depression',
    ],
    answer: 2,
    explanation: 'Diasporic communities of Muslim merchants helped spread Islam and blended local and foreign traditions, creating new syncretic cultures in port cities.'
  },
  {
    question: 'What was one major effect of the spread of the Black Death across Eurasia in the mid-14th century?',
    options: [
      'A. A significant population increase in China and Europe',
      'B. The Mongol Empire\'s expansion into sub-Saharan Africa',
      'C. Labor shortages and social unrest due to mass death',
      'D. The decline of oceanic trade routes in the Indian Ocean',
    ],
    answer: 2,
    explanation: 'The Black Death killed a huge portion of the population, leading to labor shortages, economic disruption, and social upheaval across Eurasia.'
  },
  {
    question: 'Which of the following developments in the Americas best illustrates state-building during 1200–1450?',
    options: [
      'A. The spread of Christianity through European missionaries',
      'B. The construction of road systems by the Inca to connect their empire',
      'C. The introduction of metal tools by Mongol invaders',
      'D. The rise of centralized city-states under the Umayyads',
    ],
    answer: 1,
    explanation: 'The Inca built an extensive road network to unify their vast Andean empire, a key example of state-building in the Americas during this era.'
  },
];

// AP World Quiz Component (APUSH style)
const APWorldUnit1Quiz: React.FC = () => {
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
  const handleGoBack = () => navigate('/ap-world-study-guide/unit/1');

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
      onClick={handleGoBack}
    >
      <span className="text-xl">←</span> Back to Study Guide
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        <h1 className="text-3xl font-bold mb-8 text-center">Quiz Results</h1>
        {quizData.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = userAnswer === q.answer;
          // Extract stimulus (first quoted text) and author/source/date if present
          const match = q.question.match(/"([^"]+)"(?:\s*[—-]\s*([^\n]+))?/);
          const stimulus = match ? match[1] : null;
          let info = null;
          if (match && match[2]) {
            info = match[2].trim();
          } else {
            const afterQuote = q.question.split('"')[2];
            if (afterQuote) {
              const infoMatch = afterQuote.match(/[—-]\s*(.+)/);
              if (infoMatch) info = infoMatch[1].trim();
            }
          }
          return (
            <div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
              <div className="mb-2 text-slate-500">Question {idx + 1}</div>
              {stimulus && (
                <>
                  <div className="mb-2 text-green-700">"{stimulus}"</div>
                  {info && <div className="mb-2 text-xs text-slate-500 italic">{info}</div>}
                </>
              )}
              <div className="mb-2 font-semibold">{q.question.replace(/"([^"]+)"(?:\s*[—-]\s*[^\n]+)?/, '').trim()}</div>
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
  // Extract stimulus (first quoted text) and author/source/date if present
  const match = q.question.match(/"([^"]+)"(?:\s*[—-]\s*([^\n]+))?/);
  const stimulus = match ? match[1] : null;
  // Try to extract author/source/date from the line after the quote or after a dash
  let info = null;
  if (match && match[2]) {
    info = match[2].trim();
  } else {
    // Try to extract from a line after the quote, e.g. —Letter from the Japanese emperor to the Tang emperor, 7th century
    const afterQuote = q.question.split('"')[2];
    if (afterQuote) {
      const infoMatch = afterQuote.match(/[—-]\s*(.+)/);
      if (infoMatch) info = infoMatch[1].trim();
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 relative">
      {BackToGuideButton}
      <div style={{ height: 48 }} />
      <div className="mb-8">
        {stimulus && (
          <>
            <div className="mb-2 text-green-700">"{stimulus}"</div>
            {info && <div className="mb-4 text-xs text-slate-500 italic">{info}</div>}
          </>
        )}
        <div className="text-slate-500 mb-2">
          Question {current + 1} of {quizData.length}
        </div>
        <div className="text-lg font-semibold mb-4 whitespace-pre-line">{q.question.replace(/"([^"]+)"(?:\s*[—-]\s*[^\n]+)?/, '').trim()}</div>
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

export default APWorldUnit1Quiz;