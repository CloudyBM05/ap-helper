import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// AP World Unit 8 Quiz Data
const quizData = [
  {
    question: `"From Stettin in the Baltic to Trieste in the Adriatic, an iron curtain has descended across the Continent. Behind that line lie all the capitals of the ancient states of Central and Eastern Europe."
— Winston Churchill, “Iron Curtain” Speech, 1946

Use the stimulus to answer the question:
The excerpt best reflects which broader historical development?`,
    options: [
      'A) The start of the decolonization process',
      'B) The growing divide between communist and capitalist blocs',
      'C) The economic reconstruction of Europe',
      'D) The global financial crisis of the 1930s',
    ],
    answer: 1,
    explanation: 'Churchill’s “iron curtain” metaphor refers to the division of Europe into communist and capitalist spheres after World War II.'
  },
  {
    question: `"From Stettin in the Baltic to Trieste in the Adriatic, an iron curtain has descended across the Continent. Behind that line lie all the capitals of the ancient states of Central and Eastern Europe."
— Winston Churchill, “Iron Curtain” Speech, 1946

Use the stimulus to answer the question:
What was the immediate effect of the conditions described in the excerpt?`,
    options: [
      'A) The outbreak of World War II',
      'B) Creation of the League of Nations',
      'C) Formation of rival military alliances',
      'D) European unification under NATO',
    ],
    answer: 2,
    explanation: 'The “iron curtain” division led to the formation of NATO and the Warsaw Pact, rival military alliances.'
  },
  {
    question: `"We intend to assist free peoples who are resisting attempted subjugation by armed minorities or by outside pressures. Our policy is containment."
— Harry S. Truman, Address to Congress, 1947

Use the stimulus to answer the question:
Which of the following Cold War strategies is reflected in the excerpt?`,
    options: [
      'A) Détente',
      'B) Containment',
      'C) Rollback',
      'D) Appeasement',
    ],
    answer: 1,
    explanation: 'Truman’s speech outlines the U.S. policy of containment, aimed at stopping the spread of communism.'
  },
  {
    question: `"We intend to assist free peoples who are resisting attempted subjugation by armed minorities or by outside pressures. Our policy is containment."
— Harry S. Truman, Address to Congress, 1947

Use the stimulus to answer the question:
Which of the following events best represents an application of this policy?`,
    options: [
      'A) U.S. withdrawal from Vietnam',
      'B) Marshall Plan aid to Western Europe',
      'C) Soviet invasion of Afghanistan',
      'D) Cuban Missile Crisis',
    ],
    answer: 1,
    explanation: 'The Marshall Plan was part of the U.S. containment strategy, providing aid to prevent the spread of communism.'
  },
  {
    question: `"We reject colonialism and imperialism. We will not be aligned with either the capitalist West or the communist East. We will build our own future."
— Statement from the Bandung Conference, 1955

Use the stimulus to answer the question:
Which movement is reflected in the excerpt?`,
    options: [
      'A) The Non-Aligned Movement',
      'B) Pan-Islamism',
      'C) NATO expansion',
      'D) The Warsaw Pact',
    ],
    answer: 0,
    explanation: 'The Bandung Conference was a founding moment for the Non-Aligned Movement, which rejected alignment with either Cold War bloc.'
  },
  {
    question: `"We reject colonialism and imperialism. We will not be aligned with either the capitalist West or the communist East. We will build our own future."
— Statement from the Bandung Conference, 1955

Use the stimulus to answer the question:
Which of the following best describes the goals of the countries represented at this conference?`,
    options: [
      'A) Full economic integration with the West',
      'B) Adoption of Marxist ideology',
      'C) Political independence and neutrality in the Cold War',
      'D) Military alignment with the Soviet Union',
    ],
    answer: 2,
    explanation: 'The Non-Aligned Movement sought political independence and neutrality during the Cold War.'
  },
  {
    question: `"The Red Guards have been mobilized to destroy the Four Olds: old customs, old culture, old habits, and old ideas. We must purify China of reactionary thought."
— Mao Zedong, Chinese Cultural Revolution directive, 1966

Use the stimulus to answer the question:
The policy described in the excerpt most directly led to:`,
    options: [
      'A) China’s economic liberalization',
      'B) Restoration of traditional Confucian values',
      'C) Widespread persecution of intellectuals',
      'D) The reunification of Taiwan and mainland China',
    ],
    answer: 2,
    explanation: 'The Cultural Revolution led to the persecution of intellectuals and destruction of traditional culture.'
  },
  {
    question: `"The Red Guards have been mobilized to destroy the Four Olds: old customs, old culture, old habits, and old ideas. We must purify China of reactionary thought."
— Mao Zedong, Chinese Cultural Revolution directive, 1966

Use the stimulus to answer the question:
Which broader Cold War pattern does this excerpt reflect?`,
    options: [
      'A) The spread of U.S.-style capitalism in East Asia',
      'B) Anti-colonial resistance in sub-Saharan Africa',
      'C) The use of ideological purity campaigns by authoritarian regimes',
      'D) Cultural blending in post-colonial states',
    ],
    answer: 2,
    explanation: 'Authoritarian regimes during the Cold War often used ideological campaigns to maintain control.'
  },
  {
    question: `"Let every nation know… that the torch has been passed to a new generation… willing to pay any price, bear any burden… to assure the survival and success of liberty."
— John F. Kennedy, Inaugural Address, 1961

Use the stimulus to answer the question:
This statement most directly reflects the United States' role as:`,
    options: [
      'A) A neutral bystander in the Cold War',
      'B) A champion of anti-colonial movements',
      'C) A global promoter of democratic capitalism',
      'D) A reluctant participant in world affairs',
    ],
    answer: 2,
    explanation: 'Kennedy’s speech reflects the U.S. self-image as a global leader promoting democracy and capitalism.'
  },
  {
    question: `"Let every nation know… that the torch has been passed to a new generation… willing to pay any price, bear any burden… to assure the survival and success of liberty."
— John F. Kennedy, Inaugural Address, 1961

Use the stimulus to answer the question:
Which Cold War event best exemplified the sentiments in this speech?`,
    options: [
      'A) The Berlin Conference',
      'B) The Cuban Missile Crisis',
      'C) The collapse of the Soviet Union',
      'D) The formation of the European Union',
    ],
    answer: 1,
    explanation: 'The Cuban Missile Crisis was a defining moment of U.S. resolve to defend liberty during the Cold War.'
  },
];

const APWorldUnit8Quiz: React.FC = () => {
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
  const handleGoBack = () => navigate('/ap-world-study-guide/unit/8');

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
      onClick={handleGoBack}
    >
      <span className="text-xl">←</span> Back to Unit 8 Study Guide
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

export default APWorldUnit8Quiz;
