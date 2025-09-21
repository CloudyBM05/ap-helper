import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PARTS = [
  { id: 'A', label: 'Part A' },
  { id: 'B', label: 'Part B' },
  { id: 'C', label: 'Part C' },
];

const PDF = '/APSTAT-ShortFRQ2.pdf';

const aiPrompt = `STRICT AI PROMPT (TOKEN-EFFICIENT, GRADER-FRIENDLY):\nYou are a strict AP Statistics grader. Evaluate each part of the 2025 AP Statistics FRQ below.\nFormat — BE STRICT:\n\nLabel each part (A, B, C)\n\nOutput score as "1/1" or "0/1"\n\nGive brief, justification-based explanation only if needed to understand the score (max 2 lines)\n\nUse minimal words. No restating questions. No intros or conclusions. No grading philosophy.\n\nAssume the diagram is visible.\n\nQuestion Content (Summary for Model):\nAphid damage on cabbage plants. Field divided into 25 equal regions, 5 rows (A–E), river is 100m south (closer to row E).\nThree sampling methods proposed:\n\nMethod I: Check all plants in region 3 (near farmer's house, far from river)\n\nMethod II: Randomly select a row (e.g., row E), check all plants in it\n\nMethod III: Randomly select one region from each row\n\nTasks:\nA. Is method I appropriate? Explain.\nB. Farmer chooses row E using method II. Does it overestimate/underestimate? Justify.\nC. Describe how to implement method III using the diagram.`;

const APStatisticsShortFRQ2: React.FC = () => {
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
      const answersArray = PARTS.map((part) => answers[part.id] || '');
      const apiUrl = import.meta.env.DEV
        ? '/api/grade-saq'
        : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-saq';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answersArray,
          prompt_intro: aiPrompt,
          sources: '',
          questions: ''
        })
      });
      if (!response.ok) {
        throw new Error('Failed to contact AI grading service.');
      }
      const data = await response.json();
      let parsed = [];
      try {
        parsed = data.result;
      } catch {
        setError('Failed to contact AI grading service.');
        setGrading(false);
        return;
      }
      setGrades(
        parsed.map((g: any, i: number) =>
          `${PARTS[i].label}: ${g.score}/1 - ${g.explanation}`
        )
      );
    } catch (err: any) {
      setError('Failed to contact AI grading service.');
    }
    setGrading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/ap-statistics-practice-exam/shorter-frq')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          &larr; Back to Set 1
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* PDF Viewer */}
          <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col rounded-2xl border border-purple-100">
            <h2 className="text-xl font-bold mb-4 text-center text-purple-700">
              2025 Collegeboard Short FRQ Set 1 - Question 2
            </h2>
            <iframe
              src={PDF}
              title="AP Statistics Short FRQ #2 PDF"
              className="w-full min-h-[1200px] border rounded-lg"
              style={{ border: 'none', minHeight: '600px' }}
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
          <div className="flex-1 max-w-2xl p-6 flex flex-col items-center rounded-2xl bg-white shadow-lg border border-purple-100">
            <h2 className="text-xl font-bold mb-4 text-center text-purple-700">
              Your Answers
            </h2>
            <button
              className="mb-4 px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition"
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
                    className="w-full min-h-[120px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
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

export default APStatisticsShortFRQ2;
