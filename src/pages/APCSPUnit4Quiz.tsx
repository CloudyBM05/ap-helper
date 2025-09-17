import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following best describes the role of a router in a network?',
    options: [
      'A) It stores large amounts of data and serves it to users.',
      'B) It forwards data packets along a path from sender to receiver.',
      'C) It measures the speed of the internet connection.',
      'D) It encrypts messages for secure communication.'
    ],
    answer: 1,
    type: 'single',
    explanation: 'A router forwards data packets along a path from sender to receiver. Routers are responsible for determining the best path for data to travel through the network to reach its destination.'
  },
  {
    question: 'Which statement about TCP and UDP is correct?',
    options: [
      'A) TCP is faster than UDP because it does not check for missing packets.',
      'B) UDP ensures reliable delivery of data packets, while TCP does not.',
      'C) TCP establishes a connection and ensures reliable delivery, while UDP is faster but less reliable.',
      'D) UDP is used exclusively for email transmission.'
    ],
    answer: 2,
    type: 'single',
    explanation: 'TCP establishes a connection and ensures reliable delivery, while UDP is faster but less reliable. TCP includes error checking and retransmission, while UDP prioritizes speed over reliability by not checking for missing packets.'
  },
  {
    question: 'Bandwidth in a network primarily affects:',
    options: [
      'A) The physical distance between devices.',
      'B) How quickly data can be transmitted.',
      'C) The number of devices that can be connected.',
      'D) The type of IP addresses used.'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Bandwidth primarily affects how quickly data can be transmitted. It represents the maximum amount of data that can be sent per second, directly impacting download and upload speeds.'
  },
  {
    question: 'What is the main advantage of a scalable system?',
    options: [
      'A) It requires less energy.',
      'B) It can handle a growing workload efficiently without major redesign.',
      'C) It eliminates all network latency.',
      'D) It guarantees zero data loss during transmission.'
    ],
    answer: 1,
    type: 'single',
    explanation: 'A scalable system can handle a growing workload efficiently without major redesign. This allows the system to accommodate increasing traffic, users, or data without requiring fundamental architectural changes.'
  },
  {
    question: 'Which of the following is an example of a fault-tolerant feature in a network?',
    options: [
      'A) A single server storing all website data.',
      'B) Multiple backup servers replicating data across different locations.',
      'C) Reducing bandwidth to prevent overload.',
      'D) Using TCP instead of UDP for all communication.'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Multiple backup servers replicating data across different locations is an example of fault tolerance. This ensures that if one server fails, the system can continue operating using the backup servers.'
  },
  {
    question: 'Which type of failure would a solar flare most likely cause in a network?',
    options: [
      'A) Hardware failure',
      'B) Operational failure',
      'C) Software bug',
      'D) Cyberattack'
    ],
    answer: 0,
    type: 'single',
    explanation: 'A solar flare would most likely cause hardware failure. Intense solar radiation can interfere with electronic components and network hardware, causing physical damage to devices.'
  },
  {
    question: 'Which of the following statements about parallel computing is true?',
    options: [
      'A) It uses multiple computers over a network to solve a single problem.',
      'B) Tasks are executed sequentially to avoid errors.',
      'C) Multiple processors within a single computer perform tasks simultaneously.',
      'D) It is slower than sequential computing for all problems.'
    ],
    answer: 2,
    type: 'single',
    explanation: 'Parallel computing involves multiple processors within a single computer performing tasks simultaneously. This allows for faster execution of tasks that can be divided into parallel components.'
  },
  {
    question: 'Distributed computing is often used instead of parallel computing when:',
    options: [
      'A) The problem can be solved faster by a single processor.',
      'B) Multiple independent computers are needed due to storage or processing constraints.',
      'C) Only one computer is available but with multiple cores.',
      'D) No network is available to connect computers.'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Distributed computing is used when multiple independent computers are needed due to storage or processing constraints. This approach is necessary when a single computer cannot handle the computational or storage requirements of the problem.'
  },
  {
    question: 'Which of the following scenarios demonstrates a real-world application of distributed computing?',
    options: [
      'A) Running a simulation on a supercomputer with 16 cores.',
      'B) Processing search queries across multiple data centers in the cloud.',
      'C) Calculating the sum of a list of numbers on a single desktop.',
      'D) Rendering a video using a single GPU.'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Processing search queries across multiple data centers in the cloud demonstrates distributed computing. This involves multiple separate computers working together over a network to handle search requests efficiently.'
  },
  {
    question: 'Why is fault tolerance important in modern internet systems?',
    options: [
      'A) It guarantees infinite bandwidth.',
      'B) It ensures that a system can continue operating even if some components fail.',
      'C) It prevents all cyberattacks completely.',
      'D) It allows all devices to connect without using IP addresses.'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Fault tolerance ensures that a system can continue operating even if some components fail. This is crucial for maintaining system availability and reliability in the face of hardware failures, network issues, or other disruptions.'
  }
];

const APCSPUnit4Quiz = () => {
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
      onClick={() => navigate('/ap-csp-big-idea/4')}
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

export default APCSPUnit4Quiz;
