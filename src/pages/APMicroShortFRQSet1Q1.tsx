import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PDF = '/APMicro-Short1Set1.pdf';
const PARTS = [
  { id: 'A', label: 'Part A' },
  { id: 'B', label: 'Part B' },
  { id: 'C', label: 'Part C' }
];

const APMicroShortFRQSet1Q1 = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (part: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [part]: value }));
  };

  const handleSubmit = async () => {
    setGrading(true);
    setError(null);
    setGrades(null);
    try {
      // Placeholder for AI grading integration
      setGrades(PARTS.map(part => `Part ${part.id}: 1/1 - Example explanation for grading.`));
    } catch (err: any) {
      setError('Failed to contact AI grading service.');
    }
    setGrading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/ap-microeconomics-practice-exam/short-frq/set1')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          &larr; Back to Set 1
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* PDF Viewer */}
          <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col rounded-2xl border border-fuchsia-100">
            <h2 className="text-xl font-bold mb-4 text-center text-fuchsia-700">
              Collegeboard 2025 Short FRQ Set 1 - Question 1
            </h2>
            <iframe
              src={PDF}
              title="Short FRQ Set 1 Q1"
              className="w-full min-h-[900px] border rounded-lg"
              style={{ border: 'none', minHeight: '400px' }}
            />
            <div className="text-xs text-slate-500 mt-2 text-center">
              If the PDF does not load,{' '}
              <a
                href={PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                click here to open in a new tab
              </a>
              .
            </div>
            <div className="mt-4 text-xs text-slate-500 text-center">
              PDFs are for educational use only. All rights belong to their respective owners.
            </div>
          </div>
          {/* Answer boxes */}
          <div className="flex-1 max-w-2xl p-6 flex flex-col items-center rounded-2xl bg-white shadow-lg border border-fuchsia-100">
            <h2 className="text-xl font-bold mb-4 text-center text-fuchsia-700">
              Your Answers
            </h2>
            <button
              className="mb-4 px-6 py-2 bg-fuchsia-600 text-white rounded-lg font-semibold shadow hover:bg-fuchsia-700 transition"
              onClick={handleSubmit}
              disabled={grading}
            >
              {grading ? 'Grading...' : 'SUBMIT'}
            </button>
            <div className="w-full space-y-6">
              {PARTS.map((part) => (
                <div key={part.id} className="w-full">
                  <label className="block font-semibold mb-2 text-slate-700">{part.label}</label>
                  <textarea
                    className="w-full min-h-[120px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                    value={answers[part.id] || ''}
                    onChange={e => handleChange(part.id, e.target.value)}
                    placeholder={`Type your answer for ${part.label} here...`}
                    disabled={grading}
                  />
                </div>
              ))}
            </div>
            {error && (
              <div className="mt-6 text-red-600 font-semibold">{error}</div>
            )}
            {grades && (
              <div className="mt-8 w-full bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2 text-green-700">
                  Grading Results
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {grades.map((g, i) => (
                    <li key={i} className="text-green-900">
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APMicroShortFRQSet1Q1;
