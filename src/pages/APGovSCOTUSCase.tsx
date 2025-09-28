import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SCOTUS_SETS = [
  {
    id: 1,
    label: '2025 SCOTUS Case Set 1',
    file: 'APGOV-2025SC1.pdf',
    description: 'Practice AP Gov SCOTUS Case Analysis. Set 1.'
  },
  {
    id: 2,
    label: '2025 SCOTUS Case Set 2',
    file: 'APGOV-2025SC2.pdf',
    description: 'Practice AP Gov SCOTUS Case Analysis. Set 2.'
  }
];

const QUESTIONS = [
  { id: 'A', label: 'Part A' },
  { id: 'B', label: 'Part B' },
  { id: 'C', label: 'Part C' }
];

const AI_PROMPTS: Record<string, string> = {
  '1': `Grade an AP Gov SCOTUS Comparison, BE VERY STRICT\nWickard v. Filburn (1942): Congress regulated wheat production under the Agricultural Adjustment Act. Filburn grew extra wheat for personal use and claimed Congress had no authority. The Court ruled Congress could regulate it because of its indirect effect on interstate commerce.\n\nTasks:\nA. Identify the constitutional clause common to United States v. Lopez (1995) and Wickard v. Filburn (1942).\nB. Explain how the facts in Lopez and Wickard led to different holdings.\nC. Explain how the holding in Wickard reflects federalism.\n\nScoring Instructions:\n\n1 point per part (max 3).\n\nScore each part independently.\n\nGive a brief justification per response, based on accuracy and AP standards.`,
  '2': `Grade an AP Gov SCOTUS Comparison, BE VERY STRICT\nBush v. Vera (1996): Texas voters challenged congressional districts drawn after the 1990 census. The Supreme Court ruled the plan unconstitutional because race was the predominant factor in redistricting, applying strict scrutiny.\n\nTasks:\nA. Identify the constitutional clause that is the basis for the decisions in Shaw v. Reno (1993) and Bush v. Vera (1996).\nB. Explain how the facts in Shaw and Bush led to similar holdings.\nC. Explain how the decision in Bush v. Vera relates to the democratic ideal of republicanism.\n\nScoring Instructions:\n\n1 point per part (max 3).\n\nScore each part independently.\n\nGive a brief justification per response, based on accuracy and AP standards.`
};

const APGovSCOTUSCase: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const navigate = useNavigate();
  const set = SCOTUS_SETS.find(s => String(s.id) === setId) || SCOTUS_SETS[0];
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (id: string, value: string) => {
    setResponses(r => ({ ...r, [id]: value }));
  };

  const handleSubmit = async () => {
    setGrading(true);
    setError(null);
    setGrades(null);
    try {
      const aiPrompt = AI_PROMPTS[String(set.id)] || AI_PROMPTS['1'];
      const apiUrl = import.meta.env.DEV
        ? '/api/grade-apgov'
        : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-apgov';
      const answers = [responses['A'] || '', responses['B'] || '', responses['C'] || ''];
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
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
          `Part ${String.fromCharCode(65 + i)}: ${g.score}/1 - ${g.explanation}`
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
          onClick={() => navigate('/ap-gov-practice-exam/scotus-case')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          &larr; Back to Set Selection
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* PDF Viewer */}
          <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center">
              {set.label}
            </h2>
            <iframe
              src={`${import.meta.env.BASE_URL}${set.file}`}
              title={set.label}
              className="w-full flex-1 min-h-[1000px] border rounded-lg"
            />
            <div className="text-xs text-slate-500 mt-2 text-center">
              If the PDF does not load,{' '}
              <a
                href={`${import.meta.env.BASE_URL}${set.file}`}
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
          {/* SCOTUS Case Answers */}
          <div className="flex-1 max-w-2xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center">
              Your Responses
            </h2>
            <button
              className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              onClick={handleSubmit}
              disabled={grading}
            >
              {grading ? 'Grading...' : 'SUBMIT'}
            </button>
            <div className="w-full space-y-6">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="w-full">
                  <label className="block font-semibold mb-2">{q.label}</label>
                  <textarea
                    className="w-full min-h-[150px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={responses[q.id] || ''}
                    onChange={e => handleChange(q.id, e.target.value)}
                    placeholder={`Type your answer for ${q.label} here...`}
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

export default APGovSCOTUSCase;
