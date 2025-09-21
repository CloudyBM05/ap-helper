import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// AP World Unit 7 Quiz Data
const quizData = [
  {
    question: `"The assassination of the Austrian Archduke has plunged Europe into a war the likes of which the world has never seen. The alliances formed in peace have now become chains pulling all into the abyss of conflict." — British newspaper, August 1914\n\nUse the stimulus to answer the question:\nWhich of the following was a long-term cause of the war described in this excerpt?`,
    options: [
      'A) Decolonization movements in Africa',
      'B) Mercantilist economic rivalries',
      'C) Militarism and interlocking alliances in Europe',
      'D) The rise of communism in Russia',
    ],
    answer: 2,
    explanation: 'Militarism and complex alliances were long-term causes that set the stage for World War I.'
  },
  {
    question: `"The assassination of the Austrian Archduke has plunged Europe into a war the likes of which the world has never seen. The alliances formed in peace have now become chains pulling all into the abyss of conflict." — British newspaper, August 1914\n\nUse the stimulus to answer the question:\nWhich of the following was an immediate effect of the war referenced?`,
    options: [
      'A) The rise of fascism in Latin America',
      'B) The collapse of the Ottoman and Austro-Hungarian Empires',
      'C) A rapid global economic recovery',
      'D) The success of the League of Nations',
    ],
    answer: 1,
    explanation: 'The war led to the collapse of several empires, including the Ottoman and Austro-Hungarian.'
  },
  {
    question: `"The capitalist class crushes the workers beneath the weight of profit. The proletariat must rise up and seize the means of production. The era of kings and czars is over." — Vladimir Lenin, 1917\n\nUse the stimulus to answer the question:\nWhich of the following best describes the ideology expressed in the excerpt?`,
    options: [
      'A) Democratic liberalism',
      'B) Fascism',
      'C) Communism',
      'D) Nationalism',
    ],
    answer: 2,
    explanation: 'Lenin’s words reflect communist ideology, calling for proletarian revolution.'
  },
  {
    question: `"The capitalist class crushes the workers beneath the weight of profit. The proletariat must rise up and seize the means of production. The era of kings and czars is over." — Vladimir Lenin, 1917\n\nUse the stimulus to answer the question:\nWhich of the following was an immediate outcome of the ideas expressed in this document?`,
    options: [
      'A) The abdication of Tsar Nicholas II and the Bolshevik takeover',
      'B) The assassination of Archduke Franz Ferdinand',
      'C) The surrender of Germany in World War I',
      'D) The beginning of the Cultural Revolution in China',
    ],
    answer: 0,
    explanation: 'Lenin’s ideas led to the Russian Revolution and the Bolshevik takeover.'
  },
  {
    question: `"The New York Stock Exchange has collapsed. Millions are unemployed, and panic spreads as banks fail. Breadlines grow longer, and desperation is everywhere." — U.S. radio report, 1929\n\nUse the stimulus to answer the question:\nWhich of the following global trends resulted from the situation described?`,
    options: [
      'A) Increased support for democratic governments',
      'B) Growth of extremist ideologies such as fascism and communism',
      'C) The end of industrial capitalism',
      'D) Widespread support for free-market liberalism',
    ],
    answer: 1,
    explanation: 'The Great Depression led to the rise of extremist ideologies in many countries.'
  },
  {
    question: `"The New York Stock Exchange has collapsed. Millions are unemployed, and panic spreads as banks fail. Breadlines grow longer, and desperation is everywhere." — U.S. radio report, 1929\n\nUse the stimulus to answer the question:\nWhich of the following nations responded by implementing a fascist regime in the aftermath?`,
    options: [
      'A) France',
      'B) United States',
      'C) Germany',
      'D) Soviet Union',
    ],
    answer: 2,
    explanation: 'Germany responded to the Depression with the rise of the Nazi (fascist) regime.'
  },
  {
    question: `"Germany's territorial ambitions cannot be ignored. Our people need living space, and we must reverse the humiliation of Versailles. We will rebuild Germany into the great power it once was." — Adolf Hitler, speech, 1933\n\nUse the stimulus to answer the question:\nWhat was one primary goal of Hitler’s foreign policy as reflected in this excerpt?`,
    options: [
      'A) Promote international peace',
      'B) Prevent industrialization',
      'C) Expand German territory in Europe',
      'D) Increase economic cooperation with Britain',
    ],
    answer: 2,
    explanation: 'Hitler’s foreign policy aimed to expand German territory (Lebensraum) in Europe.'
  },
  {
    question: `"Germany's territorial ambitions cannot be ignored. Our people need living space, and we must reverse the humiliation of Versailles. We will rebuild Germany into the great power it once was." — Adolf Hitler, speech, 1933\n\nUse the stimulus to answer the question:\nWhich of the following actions best exemplifies the territorial ambitions stated?`,
    options: [
      'A) Germany’s appeasement at the Munich Conference',
      'B) The Nazi-Soviet Non-Aggression Pact',
      'C) Germany’s invasion of Poland in 1939',
      'D) The Berlin Airlift',
    ],
    answer: 2,
    explanation: 'The invasion of Poland in 1939 was a direct result of Hitler’s territorial ambitions.'
  },
  {
    question: `"The Jews are being systematically transported and exterminated. The world must know the scale of this horror before it's too late." — Letter from a Polish resistance fighter, 1942\n\nUse the stimulus to answer the question:\nThe event described in this document is best known as:`,
    options: [
      'A) The Balfour Declaration',
      'B) The Armenian Genocide',
      'C) The Holocaust',
      'D) The Nuremberg Trials',
    ],
    answer: 2,
    explanation: 'The systematic extermination of Jews during World War II is known as the Holocaust.'
  },
  {
    question: `"The Jews are being systematically transported and exterminated. The world must know the scale of this horror before it's too late." — Letter from a Polish resistance fighter, 1942\n\nUse the stimulus to answer the question:\nWhat was the most significant long-term outcome of the event described?`,
    options: [
      'A) Creation of the League of Nations',
      'B) Implementation of the Marshall Plan',
      'C) Founding of the state of Israel and the Universal Declaration of Human Rights',
      'D) Collapse of the Austro-Hungarian Empire',
    ],
    answer: 2,
    explanation: 'The Holocaust led to the founding of Israel and the Universal Declaration of Human Rights.'
  },
];

const APWorldUnit7Quiz: React.FC = () => {
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
  const handleGoBack = () => navigate('/ap-world-study-guide/unit/7');

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
      onClick={handleGoBack}
    >
      <span className="text-xl">←</span> Back to Unit 7 Study Guide
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

export default APWorldUnit7Quiz;
