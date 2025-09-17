import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// AP World Unit 5 Quiz Data (flat array, Unit 4 style)
const quizData = [
  {
    question: `"The colonies of North America have refused to pay taxes imposed without representation. We seek to establish a government where the people have a voice, based on the principles of liberty and equality."
— Colonial American political pamphlet, 1775

Use the stimulus to answer the question:
What Enlightenment idea is most clearly reflected in this excerpt?`,
    options: [
      'A) Divine right of kings',
      'B) Popular sovereignty',
      'C) Social Darwinism',
      'D) Mercantilism',
    ],
    answer: 1,
    explanation: 'The excerpt’s demand for a government where "the people have a voice" directly reflects the Enlightenment principle of popular sovereignty, which asserts that political authority is derived from the consent of the governed.'
  },
  {
    question: `"The colonies of North America have refused to pay taxes imposed without representation. We seek to establish a government where the people have a voice, based on the principles of liberty and equality."
— Colonial American political pamphlet, 1775

Use the stimulus to answer the question:
Which historical event does this excerpt most directly relate to?`,
    options: [
      'A) The French Revolution',
      'B) The American Revolution',
      'C) The Haitian Revolution',
      'D) The Opium Wars',
    ],
    answer: 1,
    explanation: 'The pamphlet, dated 1775 and discussing taxes and representation for North American colonies, directly addresses the core issues that led to the American Revolution.'
  },
  {
    question: `"Liberty, equality, fraternity! We demand the end of monarchy and privileges for the nobility. All men must have equal rights before the law."
— Declaration of the Rights of Man and Citizen, France, 1789

Use the stimulus to answer the question:
Which social group most benefited from the principles expressed in this document?`,
    options: [
      'A) The French aristocracy',
      'B) The common bourgeoisie and peasants',
      'C) The Catholic clergy',
      'D) Absolute monarchs',
    ],
    answer: 1,
    explanation: 'The Declaration aimed to abolish the hereditary privileges of the aristocracy and clergy, thereby granting more rights and power to the Third Estate, which included the common bourgeoisie and peasants.'
  },
  {
    question: `"Liberty, equality, fraternity! We demand the end of monarchy and privileges for the nobility. All men must have equal rights before the law."
— Declaration of the Rights of Man and Citizen, France, 1789

Use the stimulus to answer the question:
Which of the following was a long-term impact of this revolutionary ideology?`,
    options: [
      'A) Restoration of feudal privileges',
      'B) Spread of nationalist and democratic movements globally',
      'C) Decline of European imperialism',
      'D) Establishment of theocracy in Europe',
    ],
    answer: 1,
    explanation: 'The ideals of the French Revolution, particularly liberty and equality, inspired numerous nationalist and democratic movements across Europe and the world throughout the 19th century.'
  },
  {
    question: `"The slaves of Saint-Domingue have risen up against their masters, demanding freedom and equality. Their fight is just, inspired by the ideals of the French Revolution."
— Letter from Haitian revolutionary leader Toussaint Louverture, 1793

Use the stimulus to answer the question:
Which of the following was a major consequence of the Haitian Revolution?`,
    options: [
      'A) Reinforcement of slavery in the Caribbean',
      'B) Establishment of the first black-led republic in the Americas',
      'C) Restoration of French colonial rule',
      'D) Expansion of European colonial empires',
    ],
    answer: 1,
    explanation: 'The Haitian Revolution was the first successful slave revolt in history, leading to the creation of Haiti as the first independent black-led republic in the Americas.'
  },
  {
    question: `"The slaves of Saint-Domingue have risen up against their masters, demanding freedom and equality. Their fight is just, inspired by the ideals of the French Revolution."
— Letter from Haitian revolutionary leader Toussaint Louverture, 1793

Use the stimulus to answer the question:
The Haitian Revolution most directly challenged which global institution?`,
    options: [
      'A) The institution of monarchy',
      'B) The institution of chattel slavery',
      'C) The system of mercantilism',
      'D) The global missionary movement',
    ],
    answer: 1,
    explanation: 'The Haitian Revolution was a direct and successful challenge to the institution of chattel slavery, as enslaved people fought for and won their freedom.'
  },
  {
    question: `"The Qing government has been forced to sign treaties that grant foreign powers control over ports and trade. This weakens our sovereignty and threatens our culture."
— Chinese official, post-Opium Wars, 1842

Use the stimulus to answer the question:
The treaties referred to in this statement are known as:`,

    options: [
      'A) The Treaty of Versailles',
      'B) The Treaty of Nanjing',
      'C) The Treaty of Tordesillas',
      'D) The Treaty of Westphalia',
    ],
    answer: 1,
    explanation: 'The Treaty of Nanjing (1842) was the first of the "unequal treaties" signed by China after its defeat in the First Opium War, ceding territory and opening ports to foreign trade.'
  },
  {
    question: `"The Qing government has been forced to sign treaties that grant foreign powers control over ports and trade. This weakens our sovereignty and threatens our culture."
— Chinese official, post-Opium Wars, 1842

Use the stimulus to answer the question:
One major effect of these treaties was:`,

    options: [
      'A) Strengthening of the Qing dynasty’s power',
      'B) Increase in European spheres of influence in China',
      'C) The collapse of British imperialism',
      'D) The abolition of the opium trade',
    ],
    answer: 1,
    explanation: 'The unequal treaties forced China to open its markets and territory to foreign powers, leading to the creation of spheres of influence controlled by various European nations.'
  },
  {
    question: `"Japan must abandon its feudal ways and adopt Western technology and government systems to avoid colonization and become a strong nation."
— Meiji reformer speech, 1870

Use the stimulus to answer the question:
This statement reflects which historical process?`,
    options: [
      'A) The Tokugawa Shogunate',
      'B) The Meiji Restoration',
      'C) The Boxer Rebellion',
      'D) The Taiping Rebellion',
    ],
    answer: 1,
    explanation: 'The speech captures the core idea of the Meiji Restoration, a period when Japan underwent rapid, state-sponsored industrialization and modernization to resist Western imperialism.'
  },
  {
    question: `"Japan must abandon its feudal ways and adopt Western technology and government systems to avoid colonization and become a strong nation."
— Meiji reformer speech, 1870

Use the stimulus to answer the question:
One significant result of this process was:`,

    options: [
      'A) Japan’s withdrawal from international trade',
      'B) Japan’s rise as an imperial power by the early 20th century',
      'C) Restoration of samurai political dominance',
      'D) Japan’s colonization by Western powers',
    ],
    answer: 1,
    explanation: 'By successfully modernizing its economy and military, Japan transformed itself into a major industrial and imperial power by the early 1900s, capable of competing with Western nations.'
  }
];

const APWorldUnit5Quiz: React.FC = () => {
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
  const handleGoBack = () => navigate('/ap-world-study-guide/unit/5');

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
      onClick={handleGoBack}
    >
      <span className="text-xl">←</span> Back to Unit 5 Study Guide
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

export default APWorldUnit5Quiz;
