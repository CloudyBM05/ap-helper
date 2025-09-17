import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// AP World Unit 9 Quiz Data
const quizData = [
  {
    question: `"The world is more interconnected than ever before. Ideas, goods, and people flow across borders at unprecedented rates. This era of globalization offers great promise but also deep challenges."
— U.N. Development Report, 2000

Use the stimulus to answer the question:
Which of the following best contributed to the trends described in the excerpt?`,
    options: [
      'A) Mercantilist economic policies',
      'B) The formation of absolute monarchies',
      'C) Advancements in communication and transportation technologies',
      'D) The closing of national borders and isolationism',
    ],
    answer: 2,
    explanation: 'Advancements in communication and transportation technologies enabled the rapid movement of ideas, goods, and people, fueling globalization.'
  },
  {
    question: `"The world is more interconnected than ever before. Ideas, goods, and people flow across borders at unprecedented rates. This era of globalization offers great promise but also deep challenges."
— U.N. Development Report, 2000

Use the stimulus to answer the question:
Which of the following is a criticism often associated with the process described?`,
    options: [
      'A) It led to an increase in isolationism in the global South.',
      'B) It resulted in reduced technological access for most developing nations.',
      'C) It exacerbated global income inequality and exploited labor in developing countries.',
      'D) It caused a worldwide shift away from urbanization.',
    ],
    answer: 2,
    explanation: 'A common criticism of globalization is that it has increased inequality and exploited labor in developing countries.'
  },
  {
    question: `"The internet and digital communication technologies have transformed how we learn, work, and communicate. These tools are now essential infrastructure in the global economy."
— Technology Review, 2015

Use the stimulus to answer the question:
The developments in this excerpt most directly contributed to:`,
    options: [
      'A) A decline in the influence of multinational corporations',
      'B) A decrease in global migration',
      'C) The acceleration of cultural diffusion and exchange',
      'D) A collapse in global trade networks',
    ],
    answer: 2,
    explanation: 'Digital technologies have accelerated cultural diffusion and exchange by connecting people globally.'
  },
  {
    question: `"The internet and digital communication technologies have transformed how we learn, work, and communicate. These tools are now essential infrastructure in the global economy."
— Technology Review, 2015

Use the stimulus to answer the question:
One social consequence of the trends described was:`,
    options: [
      'A) The complete elimination of censorship in authoritarian states',
      'B) A narrowing of the global gender pay gap',
      'C) The rise of social media-fueled protest movements and political activism',
      'D) The decline of urbanization and digital literacy',
    ],
    answer: 2,
    explanation: 'Social media and digital communication enabled new forms of protest and activism worldwide.'
  },
  {
    question: `"The COVID-19 pandemic exposed inequalities in healthcare, vaccine access, and economic support around the world. Rich countries acquired vaccines quickly while poorer nations waited."
— World Health Organization report, 2021

Use the stimulus to answer the question:
The disparities described in this excerpt best reflect which broader pattern?`,
    options: [
      'A) Decreased global interdependence',
      'B) Equal redistribution of resources in global trade',
      'C) Unequal effects of globalization on developed and developing nations',
      'D) A reversal of migration patterns to wealthier countries',
    ],
    answer: 2,
    explanation: 'The pandemic highlighted how globalization can produce unequal outcomes for rich and poor nations.'
  },
  {
    question: `"The COVID-19 pandemic exposed inequalities in healthcare, vaccine access, and economic support around the world. Rich countries acquired vaccines quickly while poorer nations waited."
— World Health Organization report, 2021

Use the stimulus to answer the question:
Which of the following best characterizes a response to the issue described?`,
    options: [
      'A) The Non-Aligned Movement created its own vaccine supply chain.',
      'B) Multilateral organizations like COVAX attempted to provide global vaccine equity.',
      'C) Most countries rejected international health cooperation.',
      'D) Global health technology was evenly distributed through the IMF.',
    ],
    answer: 1,
    explanation: 'COVAX and similar organizations aimed to distribute vaccines more equitably worldwide.'
  },
  {
    question: `"We must act collectively to reduce emissions and keep global warming below 2°C. Climate change threatens biodiversity, agriculture, and the habitability of our planet."
— Paris Climate Agreement, 2015

Use the stimulus to answer the question:
The excerpt reflects which major global initiative?`,
    options: [
      'A) The Kyoto Protocol',
      'B) The World Trade Organization',
      'C) The Paris Climate Agreement',
      'D) Agenda 21',
    ],
    answer: 2,
    explanation: 'The Paris Climate Agreement is the global initiative referenced in the excerpt.'
  },
  {
    question: `"We must act collectively to reduce emissions and keep global warming below 2°C. Climate change threatens biodiversity, agriculture, and the habitability of our planet."
— Paris Climate Agreement, 2015

Use the stimulus to answer the question:
Which of the following is a significant challenge to the success of the initiative described?`,
    options: [
      'A) Lack of evidence linking emissions to climate change',
      'B) Lack of involvement from non-European countries',
      'C) Variability in national commitment and enforcement of emission targets',
      'D) Replacement of fossil fuels with nuclear power in all countries',
    ],
    answer: 2,
    explanation: 'A major challenge is that countries vary in their commitment and enforcement of emission targets.'
  },
  {
    question: `"We are tired of injustice and inequality. From Cairo to Minneapolis, from Delhi to Tehran, the people demand dignity, equality, and freedom."
— Global protester slogan collage, 2020

Use the stimulus to answer the question:
Which development most directly facilitated the global spread of protest movements?`,
    options: [
      'A) The collapse of the Soviet Union',
      'B) The rise of supranational empires',
      'C) The widespread adoption of social media platforms',
      'D) The abolition of state police forces',
    ],
    answer: 2,
    explanation: 'Social media enabled protest movements to spread rapidly and globally.'
  },
  {
    question: `"We are tired of injustice and inequality. From Cairo to Minneapolis, from Delhi to Tehran, the people demand dignity, equality, and freedom."
— Global protester slogan collage, 2020

Use the stimulus to answer the question:
Which of the following best describes the similarity between these movements?`,
    options: [
      'A) They are all led by international governments.',
      'B) They aim to restore monarchies.',
      'C) They challenge state power and demand social justice reforms.',
      'D) They oppose globalization and demand trade restrictions.',
    ],
    answer: 2,
    explanation: 'These protest movements challenge state power and demand social justice reforms.'
  },
];

const APWorldUnit9Quiz: React.FC = () => {
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
  const handleGoBack = () => navigate('/ap-world-study-guide/unit/9');

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
      onClick={handleGoBack}
    >
      <span className="text-xl">←</span> Back to Unit 9 Study Guide
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

export default APWorldUnit9Quiz;
