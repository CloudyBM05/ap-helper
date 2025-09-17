import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// AP World Unit 4 Quiz Data
const quizData = [
  {
    question: `"I discovered a land of limitless riches; the natives are gentle and naive, and can be made good servants… There are many spices and gold, and the land is fertile."
— Christopher Columbus, letter describing the Americas (1493)

Use the stimulus to answer the question:
Which motivation for European exploration is most reflected in this excerpt?`,
    options: [
      'A) Religious conversion',
      'B) Economic gain',
      'C) Scientific curiosity',
      'D) Diplomatic alliances',
    ],
    answer: 1,
    explanation: 'Columbus emphasizes the riches and resources of the Americas, reflecting the economic motivations behind European exploration.'
  },
  {
    question: `"I discovered a land of limitless riches; the natives are gentle and naive, and can be made good servants… There are many spices and gold, and the land is fertile."
— Christopher Columbus, letter describing the Americas (1493)

Use the stimulus to answer the question:
Columbus’s description of the natives reflects which attitude common among Europeans during early colonization?`,
    options: [
      'A) Respect for indigenous cultures',
      'B) Intention to enslave and exploit',
      'C) Fear of native military power',
      'D) Desire for equal trade partnerships',
    ],
    answer: 1,
    explanation: 'Columbus’s words show a view of the natives as naive and suitable for servitude, reflecting exploitative attitudes.'
  },
  {
    question: `"By this treaty, Spain and Portugal have agreed to divide all newly discovered lands outside Europe along a meridian 370 leagues west of the Cape Verde islands. Lands to the west belong to Spain; those to the east to Portugal."
— Treaty of Tordesillas summary (1494)

Use the stimulus to answer the question:
The Treaty of Tordesillas primarily aimed to:`,
    options: [
      'A) Prevent war between Spain and Portugal over new territories',
      'B) Create a trade alliance between Spain and Portugal',
      'C) Establish a free-trade zone in the Americas',
      'D) Recognize indigenous sovereignty over new lands',
    ],
    answer: 0,
    explanation: 'The treaty was designed to avoid conflict between Spain and Portugal by dividing new lands between them.'
  },
  {
    question: `"By this treaty, Spain and Portugal have agreed to divide all newly discovered lands outside Europe along a meridian 370 leagues west of the Cape Verde islands. Lands to the west belong to Spain; those to the east to Portugal."
— Treaty of Tordesillas summary (1494)

Use the stimulus to answer the question:
Which present-day country was most directly influenced by this treaty?`,
    options: [
      'A) Brazil',
      'B) Mexico',
      'C) Argentina',
      'D) United States',
    ],
    answer: 0,
    explanation: 'Brazil was colonized by Portugal as a result of the treaty’s division of territory.'
  },
  {
    question: `"The Spanish have transported vast quantities of silver from their mines in the Americas, which are now being exchanged for silk, spices, and porcelain in Asia. This silver trade has connected the New and Old Worlds in a global economy."
— 16th-century European merchant report

Use the stimulus to answer the question:
This statement best illustrates the importance of:`,
    options: [
      'A) The Atlantic slave trade',
      'B) The Manila Galleon trade route',
      'C) The Silk Road',
      'D) The Indian Ocean spice trade',
    ],
    answer: 1,
    explanation: 'The Manila Galleon route connected the Americas and Asia, facilitating the global silver trade.'
  },
  {
    question: `"The Spanish have transported vast quantities of silver from their mines in the Americas, which are now being exchanged for silk, spices, and porcelain in Asia. This silver trade has connected the New and Old Worlds in a global economy."
— 16th-century European merchant report

Use the stimulus to answer the question:
The silver mentioned in this excerpt was primarily mined in:`,
    options: [
      'A) The Philippines',
      'B) Peru and Mexico',
      'C) India',
      'D) Africa',
    ],
    answer: 1,
    explanation: 'Most of the silver traded globally by Spain came from mines in Peru (notably Potosí) and Mexico.'
  },
  {
    question: `"Our emperor Akbar abolished the jizya tax on non-Muslims and promoted tolerance among different faiths. This policy has led to greater unity within the empire."
— Mughal court record (late 16th century)

Use the stimulus to answer the question:
Akbar’s policy described here reflects:`,
    options: [
      'A) Religious intolerance and persecution',
      'B) Efforts to unify a diverse empire through tolerance',
      'C) Enforcement of strict Islamic law',
      'D) Isolation from other religious communities',
    ],
    answer: 1,
    explanation: 'Akbar’s abolition of the jizya and promotion of tolerance helped unify the Mughal Empire.'
  },
  {
    question: `"Our emperor Akbar abolished the jizya tax on non-Muslims and promoted tolerance among different faiths. This policy has led to greater unity within the empire."
— Mughal court record (late 16th century)

Use the stimulus to answer the question:
This policy most directly contributed to:`,
    options: [
      'A) The decline of the Mughal Empire',
      'B) Increased internal stability and expansion',
      'C) Rebellion by Hindu groups',
      'D) Loss of trade relationships',
    ],
    answer: 1,
    explanation: 'Akbar’s policy of tolerance led to greater stability and allowed the Mughal Empire to expand.'
  },
  {
    question: `"Our new observations show that the Earth revolves around the Sun, challenging the old idea that the Earth is the center of the universe. This discovery is shaking the foundations of accepted knowledge."
— Galileo Galilei, early 17th century

Use the stimulus to answer the question:
Galileo’s observation challenged which worldview?`,
    options: [
      'A) The heliocentric model',
      'B) The geocentric model',
      'C) The theory of gravity',
      'D) The divine right of kings',
    ],
    answer: 1,
    explanation: 'Galileo’s support for heliocentrism challenged the geocentric model, which held that the Earth was the center of the universe.'
  },
  {
    question: `"Our new observations show that the Earth revolves around the Sun, challenging the old idea that the Earth is the center of the universe. This discovery is shaking the foundations of accepted knowledge."
— Galileo Galilei, early 17th century

Use the stimulus to answer the question:
The Scientific Revolution promoted:`,
    options: [
      'A) Faith over reason',
      'B) Experimentation and observation',
      'C) Religious dogma as ultimate truth',
      'D) Decline of European intellectual thought',
    ],
    answer: 1,
    explanation: 'The Scientific Revolution emphasized experimentation and observation as the basis for knowledge.'
  },
];

const APWorldUnit4Quiz: React.FC = () => {
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
  const handleGoBack = () => navigate('/ap-world-study-guide/unit/4');

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
      onClick={handleGoBack}
    >
      <span className="text-xl">←</span> Back to Unit 4 Study Guide
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

export default APWorldUnit4Quiz;
