import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following is a potential risk associated with crowdsourcing?',
    options: [
      'A) It always leads to accurate results.',
      'B) It requires private information to be publicly shared.',
      'C) The combination of multiple perspectives cannot produce greater insight.',
      'D) Unless independently verified, the results may be inaccurate.'
    ],
    answer: 3,
    type: 'single',
    explanation: 'Crowdsourcing can be valuable for gathering diverse perspectives and scaling processing power, but the results may be inaccurate unless they are independently verified. The quality of crowdsourced contributions can vary significantly.'
  },
  {
    question: 'Which of the following is an example of Personally Identifiable Information (PII)?',
    options: [
      'A) A favorite color',
      'B) A social security number',
      'C) A favorite book',
      'D) A favorite hobby'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Personally Identifiable Information (PII) includes data that can be used to identify a specific individual, such as social security numbers, addresses, medical information, or financial information. Personal preferences like favorite colors, books, or hobbies are not considered PII.'
  },
  {
    question: 'What is the primary purpose of encryption in cybersecurity?',
    options: [
      'A) To speed up data transmission',
      'B) To convert data into a coded format to prevent unauthorized access',
      'C) To store data in a compressed format',
      'D) To increase the size of data packets'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Encryption transforms data into a coded format that can only be read by someone who has the proper decryption key. This prevents unauthorized access to sensitive information during transmission or storage.'
  },
  {
    question: 'Which of the following is a characteristic of open-source software?',
    options: [
      'A) It is available for free and can be modified by anyone.',
      'B) It requires a paid subscription for access.',
      'C) Its source code is proprietary and cannot be accessed.',
      'D) It is only available for a limited time.'
    ],
    answer: 0,
    type: 'single',
    explanation: 'Open-source software is freely shared, updated, and supported by anyone. The source code is publicly available, allowing developers to modify and improve the software. This expands access to computing capabilities for everyone.'
  },
  {
    question: 'Which of the following is a method used to secure data during transmission over the internet?',
    options: [
      'A) Public key encryption',
      'B) Data compression',
      'C) Data fragmentation',
      'D) Data replication'
    ],
    answer: 0,
    type: 'single',
    explanation: 'Public key encryption uses published algorithms but secret keys for secure communication. It allows secure data transmission over the internet by ensuring that only the intended recipient can decrypt the data.'
  },
  {
    question: 'Which of the following is an example of a computing innovation that has had a positive impact on education?',
    options: [
      'A) Social media platforms used for entertainment',
      'B) Online learning platforms providing access to education',
      'C) Gaming consoles used for recreational purposes',
      'D) Streaming services offering movies and shows'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Online learning platforms have revolutionized education by providing access to educational resources and courses regardless of geographical location. This has democratized education and enabled digital communication tools to facilitate learning.'
  },
  {
    question: 'What is the digital divide?',
    options: [
      'A) The gap between the number of devices used by different individuals',
      'B) The disparity in access to technology and the internet among different groups',
      'C) The difference in internet speeds across various regions',
      'D) The variation in software preferences among users'
    ],
    answer: 1,
    type: 'single',
    explanation: 'The digital divide refers to unequal access to technology and internet resources among different groups of people. This affects access to information, markets, knowledge, and cultural exchange, highlighting disparities in technological access.'
  },
  {
    question: 'Which of the following is a potential ethical concern related to the use of artificial intelligence?',
    options: [
      'A) AI systems always make unbiased decisions.',
      'B) AI can perpetuate existing biases if not properly designed.',
      'C) AI eliminates the need for human oversight.',
      'D) AI systems are immune to errors.'
    ],
    answer: 1,
    type: 'single',
    explanation: 'AI algorithms may reflect unintentional or intentional human biases. Since AI programs increasingly influence real-world decisions like job applications and credit approvals, biased algorithms can unintentionally discriminate against groups of people.'
  },
  {
    question: 'Which of the following is a method used to protect data from unauthorized access?',
    options: [
      'A) Using weak passwords',
      'B) Implementing multifactor authentication',
      'C) Sharing passwords with others',
      'D) Disabling firewalls'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Multifactor authentication is a security method that requires multiple forms of verification before granting access to an account or system. This significantly improves security compared to using passwords alone.'
  },
  {
    question: 'Which of the following is a characteristic of cloud computing?',
    options: [
      'A) Data is stored on local devices only.',
      'B) Access to data is limited to specific locations.',
      'C) Data is stored on remote servers and accessible via the internet.',
      'D) Data cannot be shared with others.'
    ],
    answer: 2,
    type: 'single',
    explanation: 'Cloud computing stores documents and data on remote servers that are accessible via the Internet. This facilitates collaboration and communication across different locations and allows for flexible access to data and applications.'
  }
];

const APCSPUnit5Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | number[] | null>(null);
  const [answers, setAnswers] = useState<(number | number[] | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [crossedOut, setCrossedOut] = useState<number[][]>(Array(questions.length).fill(null).map(() => []));
  const navigate = useNavigate();

  const handleSelect = (idx: number) => {
    const question = questions[current];
    if (question.type === 'multi') {
      const currentSelection = Array.isArray(selected) ? selected : [];
      if (currentSelection.includes(idx)) {
        setSelected(currentSelection.filter(i => i !== idx));
      } else {
        setSelected([...currentSelection, idx]);
      }
    } else {
      setSelected(idx);
    }
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    
    // Set up selection for next question
    const nextAnswer = newAnswers[current + 1];
    if (questions[current + 1]?.type === 'multi') {
      setSelected(Array.isArray(nextAnswer) ? nextAnswer : []);
    } else {
      setSelected(typeof nextAnswer === 'number' ? nextAnswer : null);
    }
    setCurrent((prev) => prev + 1);
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
      const prevAnswer = answers[current - 1];
      if (questions[current - 1]?.type === 'multi') {
        setSelected(Array.isArray(prevAnswer) ? prevAnswer : []);
      } else {
        setSelected(typeof prevAnswer === 'number' ? prevAnswer : null);
      }
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

  const isAnswerCorrect = (userAnswer: number | number[] | null, correctAnswer: number | number[]) => {
    if (userAnswer === null) return false;
    if (Array.isArray(correctAnswer)) {
      if (!Array.isArray(userAnswer)) return false;
      return correctAnswer.length === userAnswer.length && 
             correctAnswer.every(ans => userAnswer.includes(ans));
    } else {
      return userAnswer === correctAnswer;
    }
  };

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-violet-700 shadow transition flex items-center gap-2 z-20"
      onClick={() => navigate('/ap-csp-big-idea/5')}
    >
      <span className="text-xl">←</span> Back to Study Guide
    </button>
  );

  if (submitted) {
    const correctCount = answers.reduce((count: number, answer, idx) => {
      return count + (isAnswerCorrect(answer, questions[idx].answer) ? 1 : 0);
    }, 0);

    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        <h1 className="text-3xl font-bold mb-8 text-center text-violet-700">Quiz Results</h1>
        <div className="text-center mb-8 p-6 bg-violet-50 rounded-xl">
          <div className="text-2xl font-bold text-violet-800">
            Score: {correctCount} / {questions.length} ({Math.round((correctCount / questions.length) * 100)}%)
          </div>
        </div>
        {questions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = isAnswerCorrect(userAnswer, q.answer);
          return (
            <div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
              <div className="mb-2 text-slate-500">
                Question {idx + 1} {q.type === 'multi' ? '(Multi-Select)' : '(Single-Select)'}
              </div>
              <div className="mb-2 font-semibold whitespace-pre-line">{q.question}</div>
              <ul className="mb-2">
                {q.options.map((opt: string, i: number) => {
                  const isCorrectOption = Array.isArray(q.answer) ? q.answer.includes(i) : q.answer === i;
                  const isUserOption = Array.isArray(userAnswer) ? userAnswer.includes(i) : userAnswer === i;
                  const isWrongUserOption = isUserOption && !isCorrectOption;
                  
                  return (
                    <li
                      key={i}
                      className={`px-3 py-1 rounded ${
                        isCorrectOption ? 'bg-green-100 font-bold' : ''
                      } ${isWrongUserOption ? 'bg-red-100' : ''}`}
                    >
                      {opt}
                      {isCorrectOption && (
                        <span className="ml-2 text-green-700 font-semibold">(Correct)</span>
                      )}
                      {isWrongUserOption && (
                        <span className="ml-2 text-red-700">(Your answer)</span>
                      )}
                    </li>
                  );
                })}
              </ul>
              {userAnswer === null || (Array.isArray(userAnswer) && userAnswer.length === 0) ? (
                <div className="text-violet-700 mb-1">You did not answer this question.</div>
              ) : isCorrect ? (
                <div className="text-green-700 mb-1">Correct!</div>
              ) : (
                <div className="text-red-700 mb-1">Incorrect.</div>
              )}
              <div className="mt-4 p-4 bg-violet-50 rounded-lg">
                <h4 className="font-semibold text-violet-900 mb-2">Explanation:</h4>
                <p className="text-violet-800">{q.explanation}</p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-violet-500 to-purple-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-violet-600 hover:to-purple-500 transition-all duration-300"
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
  const isValidSelection = q.type === 'multi' 
    ? (Array.isArray(selected) && selected.length === (Array.isArray(q.answer) ? q.answer.length : 1))
    : selected !== null;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 relative">
      {BackToGuideButton}
      <div style={{ height: 48 }} />
      <div className="mb-8">
        <div className="text-slate-500 mb-2">
          Question {current + 1} of {questions.length}
          {q.type === 'multi' && (
            <span className="ml-2 text-violet-600 font-semibold">
              (Select {Array.isArray(q.answer) ? q.answer.length : 2} answers)
            </span>
          )}
        </div>
        <div className="text-lg font-semibold mb-4 whitespace-pre-line">{q.question}</div>
        <div className="space-y-3">
          {q.options.map((opt: string, idx: number) => {
            const isSelected = q.type === 'multi' 
              ? (Array.isArray(selected) && selected.includes(idx))
              : selected === idx;
            
            return (
              <div key={idx} className="flex items-center gap-2">
                <button
                  type="button"
                  className={`px-4 py-2 rounded-lg border w-full text-left transition-all duration-200 ${
                    isSelected ? 'bg-violet-500 text-white border-violet-600' : 'bg-white text-slate-800'
                  } ${crossedOut[current]?.includes(idx) ? 'line-through opacity-50' : ''}`}
                  onClick={() => handleSelect(idx)}
                  disabled={crossedOut[current]?.includes(idx)}
                >
                  {opt}
                </button>
                <button
                  type="button"
                  className={`ml-2 px-2 py-1 rounded border text-xs ${
                    crossedOut[current]?.includes(idx) 
                      ? 'bg-red-200 text-red-700 border-red-400' 
                      : 'bg-slate-100 text-slate-500 border-slate-300'
                  }`}
                  onClick={() => handleCrossOut(idx)}
                  aria-label="Cross out option"
                >
                  {crossedOut[current]?.includes(idx) ? 'Uncross' : 'Cross out'}
                </button>
              </div>
            );
          })}
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
            className="bg-gradient-to-r from-violet-500 to-purple-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-violet-600 hover:to-purple-500 transition-all duration-300"
            onClick={handleNext}
            disabled={!isValidSelection}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-violet-500 to-purple-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-violet-600 hover:to-purple-500 transition-all duration-300"
            onClick={handleSubmit}
            disabled={!isValidSelection}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default APCSPUnit5Quiz;
