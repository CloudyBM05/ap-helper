import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following is the correct syntax for declaring a variable in AP CSP pseudocode?',
    options: [
      'A) x = 5',
      'B) x ← 5',
      'C) int x = 5',
      'D) var x = 5'
    ],
    answer: 1,
    type: 'single',
    explanation: 'In AP CSP pseudocode, the assignment operator is represented by ← (arrow), not the equals sign. The equals sign is used for equality comparisons.'
  },
  {
    question: 'What is the main advantage of using data abstraction when working with lists?',
    options: [
      'A) It makes the program run faster',
      'B) It allows you to work with collections of data without worrying about the specific storage details',
      'C) It reduces the amount of memory used',
      'D) It prevents errors in the program'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Data abstraction allows programmers to work with collections of related data (like lists) without needing to understand the specific details of how the data is stored in memory. This simplifies program design and makes code more manageable.'
  },
  {
    question: 'Which of the following expressions would be evaluated first according to the order of operations?',
    options: [
      'A) 5 + 3 * 2',
      'B) (5 + 3) * 2',
      'C) 5 * 3 + 2',
      'D) 5 + 3 + 2'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Parentheses have the highest precedence in the order of operations (PEMDAS). In option B, (5 + 3) would be evaluated first, giving 8, then multiplied by 2 for a result of 16. In the other options, multiplication would be performed before addition.'
  },
  {
    question: 'What is the key difference between a string "123" and the number 123?',
    options: [
      'A) There is no difference',
      'B) The string uses more memory',
      'C) The string cannot be used in mathematical calculations without conversion',
      'D) The number cannot be displayed on screen'
    ],
    answer: 2,
    type: 'single',
    explanation: 'Strings are text values, even if they contain digits. The string "123" cannot be used in mathematical calculations without first being converted to a numeric type. The number 123 can be used directly in calculations.'
  },
  {
    question: 'Select TWO valid Boolean expressions:',
    options: [
      'A) x > 5',
      'B) name = "John"',
      'C) temperature ≤ 32',
      'D) score + 10'
    ],
    answer: [0, 2],
    type: 'multi',
    explanation: 'Boolean expressions evaluate to true or false. Options A and C use relational operators (>, ≤) that produce Boolean results. Option B uses an assignment operator, and option D (score + 10) is a mathematical expression that produces a number, not a Boolean value.'
  },
  {
    question: 'What is the purpose of the curly braces {} in conditional statements?',
    options: [
      'A) To make the code look prettier',
      'B) To group statements that should execute together when the condition is true',
      'C) To indicate the end of the program',
      'D) To create a loop'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Curly braces {} are used to group multiple statements together into a block. In conditional statements, they define which statements should execute when the condition is true. Without braces, only the first statement after the IF would be part of the conditional.'
  },
  {
    question: 'When would you use nested conditionals?',
    options: [
      'A) When you want to repeat code multiple times',
      'B) When a decision depends on the result of a previous decision',
      'C) When you want to store multiple values',
      'D) When you want to create a procedure'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Nested conditionals are used when you need to make a decision that depends on the outcome of a previous decision. For example, you might first check if a number is positive, and then check if it\'s less than 10. The second check only makes sense if the first condition is true.'
  },
  {
    question: 'What is the main advantage of using a REPEAT UNTIL loop instead of duplicating code?',
    options: [
      'A) It makes the program shorter and easier to maintain',
      'B) It makes the program run faster',
      'C) It uses less memory',
      'D) It prevents all errors'
    ],
    answer: 0,
    type: 'single',
    explanation: 'Loops allow you to repeat code without duplicating it. This makes programs shorter, easier to read, and easier to maintain. If you need to change the repeated code, you only need to modify it in one place instead of multiple locations.'
  },
  {
    question: 'Select TWO benefits of using procedures (functions):',
    options: [
      'A) Code reusability',
      'B) Better organization of code',
      'C) Automatic error detection',
      'D) Faster program execution'
    ],
    answer: [0, 1],
    type: 'multi',
    explanation: 'Procedures provide code reusability (can be called multiple times) and better organization (break large programs into smaller parts). However, procedures do not automatically detect errors or make programs run faster - proper testing and optimization are still necessary.'
  },
  {
    question: 'What is the key requirement for binary search to work effectively?',
    options: [
      'A) The list must contain only numbers',
      'B) The list must be sorted',
      'C) The list must have an even number of elements',
      'D) The list must be stored in memory'
    ],
    answer: 1,
    type: 'single',
    explanation: 'Binary search requires a sorted list to work. The algorithm repeatedly divides the search space in half by comparing the target value to the middle element. If the list is not sorted, binary search cannot determine which half of the list to eliminate, making the algorithm ineffective.'
  }
];

const APCSPUnit3Quiz = () => {
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
      onClick={() => navigate('/ap-csp-big-idea/3')}
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

export default APCSPUnit3Quiz;
