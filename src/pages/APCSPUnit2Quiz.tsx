import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'What is the smallest unit of digital information?',
    options: [
      'A) Byte',
      'B) Bit',
      'C) Pixel',
      'D) Sample',
    ],
    answer: 1,
    type: 'single',
    explanation: 'A bit is the smallest unit of digital information, representing a single binary value (0 or 1). Bytes consist of 8 bits, while pixels and samples are larger data units used for specific purposes.'
  },
  {
    question: 'Which binary number correctly represents decimal 13?',
    options: [
      'A) 1010₂',
      'B) 1101₂',
      'C) 1110₂',
      'D) 1001₂',
    ],
    answer: 1,
    type: 'single',
    explanation: '1101₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13₁₀. This follows the binary place value system where each position represents a power of 2.'
  },
  {
    question: 'What is the primary difference between lossless and lossy compression?',
    options: [
      'A) Lossless preserves exact original data; lossy discards some data for size reduction.',
      'B) Lossless adds data for security; lossy removes metadata.',
      'C) Lossless is used only for images; lossy only for text.',
      'D) Lossless uses binary; lossy uses decimal.',
    ],
    answer: 0,
    type: 'single',
    explanation: 'Lossless compression allows perfect reconstruction of the original data, while lossy compression permanently removes some data to achieve greater size reduction. This is the fundamental distinction between the two approaches.'
  },
  {
    question: 'Which color depth does an RGB representation typically use per channel?',
    options: [
      'A) 4 bits',
      'B) 8 bits',
      'C) 16 bits',
      'D) 24 bits',
    ],
    answer: 1,
    type: 'single',
    explanation: 'RGB typically uses 8 bits per channel (Red, Green, Blue), allowing 256 values (0-255) for each color component. This gives a total of 24 bits per pixel (8×3) and enables over 16 million possible colors.'
  },
  {
    question: 'Select TWO true statements about data compression:',
    options: [
      'A) Lossless compression is used for audio and video files.',
      'B) Text files must use lossless compression to maintain accuracy.',
      'C) Lossy compression can significantly reduce file size at the expense of some quality.',
      'D) Lossy compression always makes files larger.',
    ],
    answer: [1, 2],
    type: 'multi',
    explanation: 'Text files require lossless compression to preserve exact content since any change could alter meaning. Lossy compression trades some quality for significant size reduction, making it useful for media files where perfect accuracy is not critical.'
  },
  {
    question: 'When visualizing data, which TWO graph types are suitable for showing trends over time?',
    options: [
      'A) Bar graph',
      'B) Pie chart',
      'C) Line graph',
      'D) Scatter plot',
    ],
    answer: [2, 3],
    type: 'multi',
    explanation: 'Line graphs explicitly show trends over time by connecting data points chronologically. Scatter plots can also reveal trends over time when one axis represents time, often with trend lines to highlight patterns.'
  },
  {
    question: 'Passage: A company collects daily temperature readings from 1,000 sensors. They sample sensor data every minute, store each reading as an 8-bit value (0–255), and compress the stored readings before sending them to the cloud.\n\nWhat is the advantage of sampling the analog sensor data at regular intervals?',
    options: [
      'A) It converts values into bits for storage.',
      'B) It ensures continuity in the data log.',
      'C) It avoids overflow errors.',
      'D) It extracts statistical trends directly.',
    ],
    answer: 0,
    type: 'single',
    explanation: 'Sampling converts continuous analog signals into discrete digital values that can be represented as bits and stored in computer systems. This digitization process is essential for computer processing and storage.'
  },
  {
    question: 'Why might the company choose lossless compression for this stored sensor data?',
    options: [
      'A) To eliminate all data and save the most space.',
      'B) To ensure no sensor reading is incorrectly altered.',
      'C) To remove redundant color information.',
      'D) To average minute-by-minute variation.',
    ],
    answer: 1,
    type: 'single',
    explanation: 'Lossless compression preserves the exact accuracy of sensor readings, which is crucial for scientific data where even small changes could affect analysis results. Any alteration of sensor values could compromise data integrity.'
  },
  {
    question: 'If they used lossy compression, what might happen to the sensor values?',
    options: [
      'A) Values could be slightly changed, losing some precision.',
      'B) The analog signal would become amplified.',
      'C) Overflow errors would occur more frequently.',
      'D) The data would become unreadable.',
    ],
    answer: 0,
    type: 'single',
    explanation: 'Lossy compression removes some data permanently, which could slightly alter sensor values and reduce precision. While the data remains readable, the exact original measurements would be lost.'
  },
  {
    question: 'A data scientist plots sensor readings over time and notices clusters of points around two temperature ranges. Which graph type is most effective for identifying such clusters and relationships?',
    options: [
      'A) Picture graph',
      'B) Bar graph',
      'C) Line graph',
      'D) Scatter plot',
    ],
    answer: 3,
    type: 'single',
    explanation: 'Scatter plots are ideal for identifying clusters and relationships in data by plotting individual data points. They make it easy to visualize patterns, correlations, and groupings that might not be apparent in other graph types.'
  },
];

const APCSPUnit2Quiz = () => {
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
      onClick={() => navigate('/ap-csp-big-idea/2')}
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

export default APCSPUnit2Quiz;
