import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PDF_URL = `${import.meta.env.BASE_URL}APGOV-PrincetonExam.pdf`;
const NUM_QUESTIONS = 60;
const CHOICES = ['A', 'B', 'C', 'D', 'E'];
const CORRECT_ANSWERS = [
  'E','D','A','E','D','A','A','E','C','C',
  'B','A','C','A','E','B','E','D','B','C',
  'A','E','E','B','C','B','B','A','C','B',
  'B','A','A','C','D','A','C','B','D','E',
  'E','D','C','D','E','C','B','E','D','B',
  'C','E','D','E','A','D','A','B','D','C'
];

const Stopwatch: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const handleReset = () => {
    setSeconds(0);
    setRunning(false);
  };

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center mb-6 bg-white p-4 rounded-xl shadow-md border border-slate-200">
      <div className="text-4xl font-bold font-mono mb-3 text-slate-700">{formatTime(seconds)}</div>
      <div className="flex gap-3">
        <button
          className="px-5 py-2 rounded-lg bg-green-500 text-white font-semibold shadow-sm hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setRunning(true)}
          disabled={running}
        >
          Start
        </button>
        <button
          className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold shadow-sm hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setRunning(false)}
          disabled={!running}
        >
          Stop
        </button>
        <button
          className="px-5 py-2 rounded-lg bg-slate-500 text-white font-semibold shadow-sm hover:bg-slate-600 transition-colors"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const APGovPracticeExamPrinceton: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<(string | null)[]>(Array(NUM_QUESTIONS).fill(null));
  const [crossed, setCrossed] = useState<boolean[][]>(
    Array.from({ length: NUM_QUESTIONS }, () => Array(CHOICES.length).fill(false))
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qIdx: number, choice: string) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[qIdx] = choice;
      return copy;
    });
  };

  const handleCross = (qIdx: number, choice: string) => {
    setCrossed((prev) => {
      const copy = prev.map(arr => [...arr]);
      const cIdx = CHOICES.indexOf(choice);
      copy[qIdx][cIdx] = !copy[qIdx][cIdx];
      return copy;
    });
  };

  const handleSubmit = () => {
    let correct = 0;
    for (let i = 0; i < NUM_QUESTIONS; i++) {
      if (answers[i] && answers[i] === CORRECT_ANSWERS[i]) correct++;
    }
    setScore(correct);
    setSubmitted(true);
  };

  const handleRestart = () => {
    setAnswers(Array(NUM_QUESTIONS).fill(null));
    setCrossed(Array.from({ length: NUM_QUESTIONS }, () => Array(CHOICES.length).fill(false)));
    setSubmitted(false);
    setScore(0);
  };

  const getButtonClass = (qIdx: number, c: string, cIdx: number) => {
    const baseClass = 'w-9 h-9 rounded-full border-2 flex items-center justify-center mx-auto transition-all duration-200';

    if (submitted) {
      const isCorrectAnswer = CORRECT_ANSWERS[qIdx] === c;
      const isSelectedAnswer = answers[qIdx] === c;

      if (isCorrectAnswer) {
        return `${baseClass} bg-green-500 border-green-700 text-white font-bold`;
      }
      if (isSelectedAnswer && !isCorrectAnswer) {
        return `${baseClass} bg-red-500 border-red-700 text-white font-bold`;
      }
      return `${baseClass} bg-white border-slate-300 text-slate-700 opacity-60`;
    }

    if (crossed[qIdx][cIdx]) {
      return `${baseClass} bg-red-200 border-red-400 ring-2 ring-red-300`;
    }

    if (answers[qIdx] === c) {
      return `${baseClass} bg-blue-500 border-blue-700 text-white font-bold ring-2 ring-blue-300`;
    }

    return `${baseClass} bg-white border-slate-300 hover:bg-slate-200 text-slate-700`;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-slate-100 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 px-4 py-2 bg-white text-blue-600 rounded-lg shadow hover:bg-slate-50 transition-colors flex items-center gap-2 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back
      </button>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">AP Gov Princeton Review MCQ Practice Exam</h1>
            <p className="mt-2 text-lg text-slate-600">60 Questions | 80 Minutes</p>
        </div>
        <Stopwatch />
        <div className="mt-8 w-full flex flex-col md:flex-row gap-8 justify-start items-start">
          {/* PDF on the left */}
          <div className="flex-[3] min-w-[450px] max-w-5xl bg-white shadow-xl rounded-2xl flex flex-col items-center border border-slate-200">
            <div className="w-full p-4 bg-slate-50 rounded-t-2xl border-b border-slate-200">
                <h2 className="text-xl font-bold text-center text-slate-700">Princeton Review AP Gov Practice Exam Document</h2>
            </div>
            <iframe
              src={PDF_URL}
              width="100%"
              height="900px"
              title="AP Gov Princeton Practice Exam PDF"
              className="rounded-b-2xl"
              style={{ border: 'none', minHeight: '800px' }}
            />
          </div>
          {/* Scantron */}
          <div className="flex-1 min-w-[400px] max-w-md bg-white shadow-xl p-6 rounded-2xl border border-slate-200 self-stretch">
            <div className="p-4 bg-slate-50 rounded-t-xl border-b border-slate-200 -m-6 mb-6">
                <h2 className="text-2xl font-bold mb-1 text-center text-slate-800">Digital Scantron</h2>
            </div>
            {!submitted && (
              <div className="text-center">
                <button
                  className="mb-4 w-full px-6 py-3 bg-blue-600 text-white text-lg rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
                  onClick={handleSubmit}
                >
                  Grade My Exam
                </button>
              </div>
            )}
            {submitted && (
              <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
                <div className="text-2xl font-bold text-blue-800">
                  Your Score: {score} / {NUM_QUESTIONS}
                </div>
                <div className="text-xl font-semibold text-blue-700 mt-1">
                  ({((score / NUM_QUESTIONS) * 100).toFixed(1)}%)
                </div>
                <div className="mt-4 flex gap-3 justify-center">
                    <button
                        className="px-6 py-2 bg-slate-600 text-white rounded-lg font-semibold shadow hover:bg-slate-700 transition"
                        onClick={handleRestart}
                    >
                        Try Again
                    </button>
                </div>
              </div>
            )}
            <div className="text-sm text-slate-500 mb-4 text-center w-full">
              <span>Left-click to select an answer. Right-click to cross out an option.</span>
            </div>
            <div className="overflow-y-auto w-full max-h-[75vh]">
              <table className="w-full border-separate" style={{ borderSpacing: '0 0.5rem' }}>
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-2 text-left text-sm font-semibold text-slate-600 rounded-l-lg">#</th>
                    {CHOICES.map((c) => (
                      <th key={c} className="p-2 text-center text-sm font-semibold text-slate-600">{c}</th>
                    ))}
                    {submitted && <th className="p-2 text-center text-sm font-semibold text-slate-600 rounded-r-lg">Result</th>}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: NUM_QUESTIONS }).map((_, qIdx) => (
                    <tr key={qIdx} className="hover:bg-slate-50">
                      <td className="font-bold p-2 text-slate-700">{qIdx + 1}</td>
                      {CHOICES.map((c, cIdx) => (
                        <td key={c} className="text-center p-1">
                          <button
                            type="button"
                            className={getButtonClass(qIdx, c, cIdx)}
                            onClick={() => !submitted && handleSelect(qIdx, c)}
                            onContextMenu={e => {
                              e.preventDefault();
                              if (!submitted) handleCross(qIdx, c);
                            }}
                            title={crossed[qIdx][cIdx] ? 'Unmark option' : 'Cross out option'}
                            disabled={submitted}
                          >
                            {c}
                          </button>
                        </td>
                      ))}
                      {submitted && (
                        <td className="text-center font-bold p-2">
                          {answers[qIdx] === CORRECT_ANSWERS[qIdx] ? (
                            <span className="text-green-500">✔</span>
                          ) : (
                            <span className="text-red-500">✖</span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APGovPracticeExamPrinceton;
