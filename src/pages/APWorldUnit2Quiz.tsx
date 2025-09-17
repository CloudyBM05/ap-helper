import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// AP World Unit 2 Quiz Data
const quizData = [
  {
    question: `“The Mongol Empire united much of Eurasia under a single political structure for the first time in history. This facilitated the safe passage of merchants, travelers, and envoys across thousands of miles of trade routes.”\n\nWhich of the following was a direct effect of the political unification of Eurasia under the Mongols?`,
    options: [
      'A. Increased cross-cultural interactions and the movement of goods and ideas',
      'B. A massive decrease in interregional trade due to Mongol taxation',
      'C. The collapse of Muslim empires due to Mongol intolerance',
      'D. The decline of Silk Roads due to religious conflict',
    ],
    answer: 0,
    explanation: 'The Mongol Empire created unprecedented stability and security across Eurasia, which directly led to increased cross-cultural interactions, trade, and the movement of people, goods, and ideas along the Silk Roads.'
  },
  {
    question: `“During the Pax Mongolica, scholars and artisans from Persia, China, and the Islamic world traveled across the empire, spreading technologies like papermaking, gunpowder, and medical knowledge.”\n\nWhich of the following best explains the Mongol attitude toward intellectual and cultural exchanges?`,
    options: [
      'A. Mongol rulers encouraged the movement of scholars and artisans to promote innovation and administration.',
      'B. Mongol policy prohibited cultural exchanges to maintain political control.',
      'C. Mongol elites rejected foreign knowledge and emphasized Mongol superiority.',
      'D. Mongol leaders promoted isolationism in conquered lands.',
    ],
    answer: 0,
    explanation: 'Mongol rulers actively promoted the movement of skilled people and ideas across their empire, believing that innovation and expertise from different cultures would strengthen their rule and administration.'
  },
  {
    question: `“Merchants along the Indian Ocean route used maritime technologies such as the astrolabe and lateen sail to travel between East Africa, South Asia, and Southeast Asia.”\n\nWhich factor most directly contributed to the expansion of the Indian Ocean trade network during the period 1200–1450?`,
    options: [
      'A. Improved understanding of monsoon winds and maritime technologies',
      'B. The conquest of Europe by Indian navies',
      'C. The construction of the Grand Canal in China',
      'D. The discovery of new ocean currents near Antarctica',
    ],
    answer: 0,
    explanation: 'The expansion of Indian Ocean trade was made possible by new maritime technologies and a better understanding of monsoon wind patterns, which allowed merchants to plan and complete long-distance sea voyages safely and efficiently.'
  },
  {
    question: `“The city of Malacca grew powerful by controlling the narrow Strait of Malacca and taxing merchant ships that passed through. Its strategic location turned it into a wealthy trading kingdom.”\n\nWhich of the following patterns is best illustrated by the rise of Malacca?`,
    options: [
      'A. Trade cities typically avoided taxation to encourage free markets.',
      'B. Land-based empires gained wealth by promoting Confucian ideas.',
      'C. Oceanic states used strategic geography to dominate trade routes.',
      'D. Maritime states declined in importance during the postclassical era.',
    ],
    answer: 2,
    explanation: 'Malacca’s rise demonstrates how maritime states could use their strategic locations to control and profit from trade routes, becoming powerful and wealthy by taxing passing merchants.'
  },
  {
    question: `“Chinese merchants who settled in Southeast Asia retained many of their customs and traditions, including language, religion, and family practices, while also adopting some elements of local cultures.”\n\nWhich term best describes the type of community formed by these merchants?`,
    options: [
      'A. Cultural assimilation zone',
      'B. Diasporic community',
      'C. Encomienda system',
      'D. Monastic order',
    ],
    answer: 1,
    explanation: 'Diasporic communities are formed when people settle far from their homeland but maintain their cultural traditions while also blending with local customs. Chinese merchant communities in Southeast Asia are a classic example.'
  },
  {
    question: `“The expansion of the Trans-Saharan trade network was driven by technological innovations such as the camel saddle, which allowed merchants to transport large quantities of goods across the desert.”\n\nWhich of the following most directly resulted from the expansion of Trans-Saharan trade?`,
    options: [
      'A. The decline of West African kingdoms',
      'B. The elimination of traditional nomadic lifestyles in the desert',
      'C. The spread of Christianity into North Africa',
      'D. The growth of powerful empires like Mali through gold and salt trade',
    ],
    answer: 3,
    explanation: 'The expansion of Trans-Saharan trade led to the rise of powerful West African empires like Mali, which grew wealthy and influential by controlling and taxing the gold and salt trade.'
  },
  {
    question: `“Mansa Musa’s pilgrimage to Mecca in 1324 displayed the immense wealth of the Mali Empire. Along the way, he distributed so much gold in Cairo that it caused inflation in Egypt.”\n\nWhich of the following broader trends does this account best illustrate?`,
    options: [
      'A. The wealth generated by participation in Afro-Eurasian trade networks',
      'B. The total domination of European merchants in African markets',
      'C. The growing independence of regional kingdoms from religious authority',
      'D. The rejection of Islam by African rulers',
    ],
    answer: 0,
    explanation: 'Mansa Musa’s journey and the impact of his wealth highlight how participation in transregional trade networks brought prosperity and global influence to African states.'
  },
  {
    question: `“Marco Polo described the grandeur of Kublai Khan’s court, the use of paper money, and the complexity of the Chinese postal system, astonishing his European readers.”\n\nWhat does Marco Polo’s account of Yuan China best reflect?`,
    options: [
      'A. Mongol efforts to erase Chinese culture',
      'B. Cultural diffusion and Eurasian exchange due to Mongol stability',
      'C. Rejection of trade and innovation in China',
      'D. Widespread technological decline in Asia',
    ],
    answer: 1,
    explanation: 'Marco Polo’s writings show how Mongol rule enabled cultural diffusion and exchange across Eurasia, making it possible for Europeans to learn about and be influenced by Chinese innovations.'
  },
  {
    question: `“The Black Death spread along trade routes from East Asia to Europe during the mid-14th century. It devastated populations and disrupted economies across Eurasia.”\n\nWhat was a significant long-term effect of the Black Death?`,
    options: [
      'A. Increased demand for labor and the weakening of feudal systems in Europe',
      'B. The total collapse of the Mongol Empire',
      'C. The collapse of Indian Ocean trade routes',
      'D. The unification of Europe under a single political empire',
    ],
    answer: 0,
    explanation: 'The Black Death killed millions, leading to labor shortages that weakened feudalism and shifted economic and social structures in Europe.'
  },
  {
    question: `“Kashgar and Samarkand served as major commercial hubs along the Silk Roads. They hosted merchants, scholars, and travelers, facilitating both trade and the diffusion of religions like Buddhism and Islam.”\n\nWhat role did cities like Kashgar and Samarkand play in Eurasian exchange networks?`,
    options: [
      'A. They were military bases used by the Mongols.',
      'B. They were centers of trade, cultural exchange, and religious diffusion.',
      'C. They acted as religious pilgrimage centers, but not trade hubs.',
      'D. They rejected foreign influence to maintain cultural purity.',
    ],
    answer: 1,
    explanation: 'Cities like Kashgar and Samarkand were vital crossroads for trade and cultural exchange, serving as melting pots for goods, ideas, and religions along the Silk Roads.'
  },
];

const APWorldUnit2Quiz: React.FC = () => {
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
  const handleGoBack = () => navigate('/ap-world-study-guide/unit/2');

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
      onClick={handleGoBack}
    >
      <span className="text-xl">←</span> Back to Unit 2 Study Guide
    </button>
  );

  // Helper to parse question
  const parseQuestion = (question: string) => {
    const match = question.match(/^“([\s\S]+?)”(?:\s*[—-—]\s*([^\r\n]+))?\s*([\s\S]*)$/);

    if (match) {
      const stimulus = `“${match[1]}”`; // Include the quotes
      const source = match[2] ? match[2].trim() : null;
      const questionText = match[3] ? match[3].trim() : '';
      return { stimulus, source, questionText };
    }
    // Return the original question if no stimulus is found
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

export default APWorldUnit2Quiz;
