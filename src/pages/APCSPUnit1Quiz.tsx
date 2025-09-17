import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'What is a primary benefit of collaboration in programming projects?',
    options: [
      'A) It allows one person to develop all code independently.',
      'B) It increases code quality through shared ideas and peer review.',
      'C) It guarantees that no errors will be present.',
      'D) It reduces the need for planning.',
    ],
    answer: 1,
    type: 'single',
    explanation: 'Collaboration brings diverse perspectives and enables peer review, which significantly improves code quality by catching errors and suggesting improvements that individual developers might miss.'
  },
  {
    question: 'Which stage of software development is best suited for peer debugging?',
    options: [
      'A) Planning',
      'B) Implementation',
      'C) Testing',
      'D) Deployment',
    ],
    answer: 2,
    type: 'single',
    explanation: 'The testing stage is ideal for peer debugging because this is when code is actively executed and issues are identified. Multiple people can help analyze problems and suggest solutions.'
  },
  {
    question: 'A computing innovation takes in data, transforms it, and outputs results. Which example fits this model?',
    options: [
      'A) A static webpage with only text',
      'B) A calculator app converting currencies based on user input',
      'C) A photo saved locally',
      'D) A printed book',
    ],
    answer: 1,
    type: 'single',
    explanation: 'A currency calculator app takes input data (currency amounts), processes it (applies conversion rates), and outputs results (converted amounts), perfectly fitting the computing innovation model.'
  },
  {
    question: 'Which tool most directly supports students exchanging code and tracking version history?',
    options: [
      'A) Google Docs',
      'B) GitHub',
      'C) Microsoft PowerPoint',
      'D) Zoom',
    ],
    answer: 1,
    type: 'single',
    explanation: 'GitHub is specifically designed for version control and code collaboration, allowing developers to track changes, merge code from multiple contributors, and maintain project history.'
  },
  {
    question: 'What type of error occurs when variable names are misspelled or mis-cased?',
    options: [
      'A) Runtime error',
      'B) Logic error',
      'C) Syntax error',
      'D) Overflow error',
    ],
    answer: 2,
    type: 'single',
    explanation: 'Syntax errors occur when code violates the programming language rules, including incorrect variable names, misspellings, or case sensitivity issues. These are caught before the program runs.'
  },
  {
    question: 'Select TWO benefits of pair programming in AP CSP projects:',
    options: [
      'A) Reduces real-time code feedback',
      'B) Promotes shared understanding of code',
      'C) Promotes error detection by having another person review',
      'D) Requires fewer test cases',
    ],
    answer: [1, 2],
    type: 'multi',
    explanation: 'Pair programming promotes shared understanding as both developers work together on the same code, and enables immediate error detection through continuous peer review during development.'
  },
  {
    question: 'Which TWO stages of software development often involve collaboration?',
    options: [
      'A) Debugging',
      'B) Lunch break',
      'C) Design',
      'D) Data type declaration',
    ],
    answer: [0, 2],
    type: 'multi',
    explanation: 'Debugging benefits from multiple perspectives to identify and solve problems, while design requires collaborative decision-making about program structure, algorithms, and user interfaces.'
  },
  {
    question: 'Which TWO are common debugging techniques in programming?',
    options: [
      'A) Writing extra output statements',
      'B) Ignoring failing test cases',
      'C) Creating test cases',
      'D) Disabling error messages',
    ],
    answer: [0, 2],
    type: 'multi',
    explanation: 'Writing extra output statements helps trace program execution and identify where problems occur. Creating test cases helps systematically check program behavior and catch errors.'
  },
  {
    question: 'Passage: A team of students is building a weather-tracking app. They define tempList to store hourly temperatures. One member implements a function to find the maximum temperature. After collaborative planning, they write code. Another partner tests various cases and finds that when tempList is empty, the function crashes.\n\nWhat best describes the type of error that caused the crash when tempList is empty?',
    options: [
      'A) Syntax error',
      'B) Overflow error',
      'C) Runtime error',
      'D) Logic error',
    ],
    answer: 2,
    type: 'single',
    explanation: 'This is a runtime error because the program compiled successfully but crashed during execution when trying to find the maximum of an empty list. The program cannot handle this unexpected condition at runtime.'
  },
  {
    question: 'A student writes this pseudocode:\na ← 95\nIF (a > 90) DISPLAY("A")\nIF (a > 80) DISPLAY("B")\nIF (a > 70) DISPLAY("C")\n\nWhich is the best fix to ensure only one grade prints?',
    options: [
      'A) Change all IF to nested IF/ELSE IF',
      'B) Change IFs to DISPLAY statements',
      'C) Remove IF for 80 check',
      'D) Write syntax differently',
    ],
    answer: 0,
    type: 'single',
    explanation: 'Using IF/ELSE IF creates a mutually exclusive structure where only the first true condition executes, preventing multiple grades from printing. The current code prints A, B, and C because all conditions are true for a score of 95.'
  },
];

const APCSPUnit1Quiz = () => {
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
      onClick={() => navigate('/ap-csp-big-idea/1')}
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

export default APCSPUnit1Quiz;
