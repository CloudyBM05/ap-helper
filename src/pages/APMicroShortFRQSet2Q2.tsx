import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questionPDF = '/APMicro-Short1Set2.pdf';

const answerParts = [
  { label: 'A', display: 'Part A' },
  { label: 'B', display: 'Part B' },
  { label: 'C', display: 'Part C' },
  { label: 'Di', display: 'Part D (i)' },
  { label: 'Dii', display: 'Part D (ii)' },
];

const gradingPrompt = `Grade the following AP Micro FRQ (2025, Q2 – Quartz labor market) using the rubric below. Be strict. No partial credit. No extra text.

Scoring Rubric:

A (1 pt):
+1: Identifies profit-maximizing quantity where MRP = MFC.

B (1 pt):
+1: Correct answer: Less than $15; explanation must reference MFC < wage = $15 using graph data.

C (1 pt):
+1: Correct wage bill: Wage × quantity at MFC = $25; must show math.

D(i) (1 pt):
+1: MRP increases; explanation must relate to higher price of output → higher MR → higher MRP.

D(ii) (1 pt):
+1: MFC increases; explanation must link to upward-sloping MFC curve with more hiring.

Output Format (required):
A: X/1 Explanation if point lost
B: X/1 Explanation if point lost
C: X/1 Explanation if point lost
D(i): X/1 Explanation if point lost
D(ii): X/1 Explanation if point lost
Total: X/5

Only score and rubric-based explanations. No praise, no suggestions. Be strict.`;

const APMicroShortFRQSet2Q2 = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({ A: '', B: '', C: '', Di: '', Dii: '' });
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleGrade = async () => {
    setGrading(true);
    setError(null);
    setGradeResult(null);
    const apiUrl = import.meta.env.DEV
      ? '/api/grade-saq'
      : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-saq';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: [answers.A, answers.B, answers.C, answers.Di, answers.Dii],
          prompt_intro: gradingPrompt,
          sources: '',
          questions: '',
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to contact AI grading service.');
      }
      const data = await response.json();
      setGradeResult(data.result || 'Failed to contact AI grading service.');
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred. Please try again.');
    }
    setGrading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/ap-microeconomics-practice-exam/short-frq/set2')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          &larr; Back to Set 2
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center text-fuchsia-700">
              AP Microeconomics Short FRQ – Set 2, Question 2
            </h2>
            <iframe
              src={questionPDF}
              title="AP Micro Short FRQ Set 2 Q2"
              className="w-full flex-1 min-h-[700px] border rounded-lg"
            />
            <div className="text-xs text-slate-500 mt-2 text-center">
              (If the PDF does not load,{' '}
              <a
                href={questionPDF}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                click here to open in a new tab
              </a>
              .)
            </div>
          </div>
          <div className="flex-1 max-w-2xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center text-fuchsia-700">
              Your Answers
            </h2>
            <button
              className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              onClick={handleGrade}
              disabled={grading}
            >
              {grading ? 'Grading...' : 'SUBMIT FOR AI GRADE'}
            </button>
            <div className="w-full space-y-6">
              {answerParts.map((part) => (
                <div key={part.label} className="w-full">
                  <label className="block font-semibold mb-2">{part.display}</label>
                  <textarea
                    className="w-full min-h-[120px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition bg-slate-50 text-slate-800 shadow"
                    name={part.label}
                    value={answers[part.label as keyof typeof answers]}
                    onChange={handleChange}
                    placeholder={`Type your answer for ${part.display} here...`}
                  />
                </div>
              ))}
            </div>
            {error && (
              <div className="mt-6 text-red-600 font-semibold">{error}</div>
            )}
            {gradeResult && (
              <div className="mt-8 w-full bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2 text-green-700">
                  AI Grading Results
                </h3>
                <pre className="whitespace-pre-wrap text-green-900">{gradeResult}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APMicroShortFRQSet2Q2;
