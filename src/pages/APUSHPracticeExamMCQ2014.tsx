import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// To display your PDF, put it in the public folder:
// Example: c:\Users\Brandon\Downloads\project\public\apush-2014.pdf
// Then use: const PDF_URL = "/apush-2014.pdf";
// The public folder is at the root of your project, next to package.json and vite.config.ts

const PDF_URL = "/apush-2014.pdf";

// Example: 55 questions, 4 choices each (A-D)
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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
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

const APUSHPracticeExamMCQ2014 = () => {
  const [answers, setAnswers] = useState<(string | null)[]>(Array(NUM_QUESTIONS).fill(null));
  const [crossed, setCrossed] = useState<boolean[]>(
    Array(NUM_QUESTIONS).fill(false)
  );
  const navigate = useNavigate();

  const handleSelect = (qIdx: number, choice: string) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[qIdx] = choice;
      return copy;
    });
  };

  const handleCross = (qIdx: number) => {
    setCrossed((prev) => {
      const copy = [...prev];
      copy[qIdx] = !copy[qIdx];
      return copy;
    });
  };

  const handleSubmit = () => {
    // Use replace: false to push the results page onto the history stack
    navigate('/apush-practice-exam/mcq/2014/results', { state: { answers }, replace: false });
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-slate-50 flex flex-col items-center">
      {/* Stopwatch at the top, above the PDF/scantron layout */}
      <Stopwatch />
      {/* Main content: PDF left, Scantron right */}
      <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-start">
        {/* PDF Viewer */}
        <div className="flex-1 min-w-[500px] max-w-4xl bg-white shadow-lg p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-center">APUSH 2014 Official Exam PDF</h2>
          <iframe
            src={PDF_URL}
            title="APUSH 2014 Exam PDF"
            className="w-full flex-1 min-h-[900px] border rounded-lg"
          />
          <div className="text-xs text-slate-500 mt-2 text-center">
            If the PDF does not load, <a href={`${import.meta.env.BASE_URL}apush-2014.pdf`} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">click here to open in a new tab</a>.
          </div>
        </div>
        {/* Scantron */}
        <div className="flex-1 min-w-[400px] max-w-2xl bg-white shadow-lg p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4 text-center">Scantron</h2>
          <button
            className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
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
                            ${answers[qIdx] === c ? 'bg-blue-500 border-blue-700 text-white font-bold' : 'bg-white border-slate-300 text-slate-700'}
                            ${crossed[qIdx] ? 'border-red-500' : ''}
                            transition
                          `}
                          onClick={() => handleSelect(qIdx, c)}
                          onContextMenu={e => {
                            e.preventDefault();
                            handleCross(qIdx);
                          }}
                          title={crossed[qIdx] ? 'Marked in red (right click to unmark)' : 'Left click to select, right click to mark red'}
                        >
                          {c}
                        </button>
                      </td>
                    ))}
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
