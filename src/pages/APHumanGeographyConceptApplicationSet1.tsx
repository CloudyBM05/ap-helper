import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FRQ_CONTENT = {
  title: 'Collegeboard 2025 Concept Application Set 1',
  description: 'Answer all parts (A–G) of the following AP Human Geography Concept Application. Each part tests a different concept. Written responses are AI-graded.',
  pdf: '/APHUG-CA1.pdf',
};

const PARTS = [
  { id: 'A', label: 'Part A' },
  { id: 'B', label: 'Part B' },
  { id: 'C', label: 'Part C' },
  { id: 'D', label: 'Part D' },
  { id: 'E', label: 'Part E' },
  { id: 'F', label: 'Part F' },
  { id: 'G', label: 'Part G' },
];

const GRADING_PROMPT = `Grade each part A–G = 1 pt. No partial. Use format: A. 1/1 – [justification ≤15 words].\nAward only if response fully matches criteria. Otherwise, 0/1. GRADE STRICT`;
const CRITERIA = [
  'A. Has borders, population, sovereignty, recognition.',
  'B. States clear function of supranational org (e.g., econ, political).',
  'C. Global effect of trade (e.g., interdependence, growth, diffusion).',
  'D. Explains deindustrialization’s impact (e.g., job loss, shift to service economy) with a core country example (e.g., U.S. Rust Belt).',
  'E. Resource disputes tied to land/sea boundaries.',
  'F. Org limits member control (e.g., policy, borders).',
  'G. Tech weakens sovereignty (info flow, dissent, culture spread).',
];

const APHumanGeographyConceptApplicationSet1 = () => {
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
      const answersArray = PARTS.map(part => answers[part.id] || "");
      const apiUrl = import.meta.env.DEV
        ? '/api/grade-aphug'
        : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-aphug';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answersArray,
          prompt_intro: GRADING_PROMPT,
          criteria: CRITERIA,
          sources: '',
          questions: ''
        })
      });
      if (!response.ok) throw new Error('Failed to contact AI grading service.');
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
        Array.isArray(parsed)
          ? parsed.map(g => typeof g === 'string' ? g : JSON.stringify(g))
          : [JSON.stringify(parsed)]
      );
    } catch (err) {
      setError('Failed to contact AI grading service.');
    }
    setGrading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/ap-human-geography-practice-exam/concept-application')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          &larr; Back to Set Selection
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* PDF Viewer */}
          <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col rounded-2xl border border-emerald-100">
            <h2 className="text-xl font-bold mb-4 text-center text-emerald-700">
              {FRQ_CONTENT.title}
            </h2>
            <p className="mb-4 text-slate-600 text-center">{FRQ_CONTENT.description}</p>
            <iframe
              src={FRQ_CONTENT.pdf}
              title={FRQ_CONTENT.title}
              className="w-full min-h-[1000px] border rounded-lg"
              style={{ border: 'none', minHeight: '1000px' }}
            />
            <div className="text-xs text-slate-500 mt-2 text-center">
              If the PDF does not load,{' '}
              <a
                href={FRQ_CONTENT.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-emerald-600"
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
          <div className="flex-1 max-w-2xl p-6 flex flex-col items-center rounded-2xl bg-white shadow-lg border border-emerald-100">
            <h2 className="text-xl font-bold mb-4 text-center text-emerald-700">
              Your Answers
            </h2>
            <button
              className="mb-4 px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold shadow hover:bg-emerald-700 transition"
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
                    className="w-full min-h-[120px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
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

export default APHumanGeographyConceptApplicationSet1;
