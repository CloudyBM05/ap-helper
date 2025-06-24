import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Use import.meta.env.BASE_URL for correct PDF path
const PDF_URL = `${import.meta.env.BASE_URL}apush-2014.pdf`;

const NUM_QUESTIONS = 55;
const CHOICES = ['A', 'B', 'C', 'D'];

// Correct answers for APUSH 2014 MCQ (index 0 = Q1)
const CORRECT_ANSWERS = [
  'C','B','D','B','C','B','B','A','C','A',
  'D','D','A','D','D','A','A','D','B','A',
  'D','C','A','C','C','A','D','A','B','C',
  'A','C','B','D','C','B','B','A','C','A',
  'C','B','C','A','D','B','A','D','A','B',
  'B','C','A','C','D'
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
    <div className="flex flex-col items-center mb-6">
      <div className="text-2xl font-mono mb-2">{formatTime(seconds)}</div>
      <div className="flex gap-2">
        <button
          className={`px-4 py-1 rounded bg-blue-600 text-white font-semibold ${running ? 'opacity-70' : ''}`}
          onClick={() => setRunning(true)}
          disabled={running}
        >
          Start
        </button>
        <button
          className="px-4 py-1 rounded bg-yellow-500 text-white font-semibold"
          onClick={() => setRunning(false)}
          disabled={!running}
        >
          Stop
        </button>
        <button
          className="px-4 py-1 rounded bg-slate-400 text-white font-semibold"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

const APUSHPracticeExamMCQ2014: React.FC = () => {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(NUM_QUESTIONS).fill(null));
  // Properly type and initialize crossed as boolean[][]
  const [crossed, setCrossed] = useState<boolean[][]>(
    () => Array.from({ length: NUM_QUESTIONS }, () => Array(CHOICES.length).fill(false))
  );
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen py-12 px-4 bg-slate-50 flex flex-col items-center">
      <Stopwatch />
      <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-start">
        {/* PDF on the left */}
        <div className="flex-1 min-w-[450px] max-w-3xl bg-white shadow-lg p-4 rounded-2xl flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2 text-center">2014 APUSH Practice Exam</h2>
          <iframe
            src={PDF_URL}
            width="100%"
            height="900px"
            title="APUSH 2014 Practice Exam PDF"
            style={{ border: 'none', minHeight: '600px' }}
          />
        </div>
        {/* Scantron */}
        <div className="flex-1 min-w-[400px] max-w-2xl bg-white shadow-lg p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-center">Scantron</h2>
          {!submitted && (
            <button
              className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          )}
          {submitted && (
            <div className="mb-4 text-center">
              <div className="text-lg font-bold text-green-700">
                You got {score} out of {NUM_QUESTIONS} correct ({((score / NUM_QUESTIONS) * 100).toFixed(1)}%)
              </div>
              <button
                className="mt-2 px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold shadow hover:bg-gray-700 transition"
                onClick={handleRestart}
              >
                Reset
              </button>
            </div>
          )}
          <div className="text-xs text-slate-500 mb-4 text-center w-full">
            <span>Left click to select an answer. Right click to mark an option in red.</span>
          </div>
          <div className="overflow-y-auto w-full max-h-[80vh]">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="text-left">#</th>
                  {CHOICES.map((c) => (
                    <th key={c} className="text-center">{c}</th>
                  ))}
                  {submitted && <th className="text-center">Correct</th>}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: NUM_QUESTIONS }).map((_, qIdx) => (
                  <tr key={qIdx}>
                    <td className="font-bold pr-2">{qIdx + 1}</td>
                    {CHOICES.map((c, cIdx) => (
                      <td key={c} className="text-center">
                        <button
                          type="button"
                          className={`
                            w-8 h-8 rounded-full border-2 flex items-center justify-center mx-auto
                            ${answers[qIdx] === c ? 'bg-blue-500 border-blue-700 text-white font-bold ring-2 ring-blue-400' : 'bg-white border-slate-300 text-slate-700'}
                            ${crossed[qIdx][cIdx] ? 'border-red-500 ring-2 ring-red-400' : ''}
                            ${submitted && CORRECT_ANSWERS[qIdx] === c ? 'bg-green-200 border-green-600 text-green-900 font-bold' : ''}
                            transition
                          `}
                          onClick={() => !submitted && handleSelect(qIdx, c)}
                          onContextMenu={e => {
                            e.preventDefault();
                            if (!submitted) handleCross(qIdx, c);
                          }}
                          title={crossed[qIdx][cIdx] ? 'Marked in red (right click to unmark)' : 'Left click to select, right click to mark red'}
                          disabled={submitted}
                        >
                          {c}
                        </button>
                      </td>
                    ))}
                    {submitted && (
                      <td className="text-center font-bold text-green-700">
                        {CORRECT_ANSWERS[qIdx]}
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
  );
};

export default APUSHPracticeExamMCQ2014;
