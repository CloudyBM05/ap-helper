import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FRQ_CONTENT = {
  set1: {
    title: 'Collegeboard 2025 Set 1',
    description: 'Official AP Macroeconomics Long FRQ, 2025, Set 1. Practice with real exam-style free response questions. Written parts are AI-graded.',
    pdf: '/APMacro-LongFRQ1Set1.pdf',
    aiPrompt: `You are a strict AP Macroeconomics grader. Grade only the written parts of this 2025 AP Macro FRQ on the economy of Vortania. Do not grade any graphs or drawing instructions.\n\nAward 1 point for each correct answer with a complete, accurate explanation. Do not award a point if the response is incorrect, the explanation is missing, vague, or uses incorrect logic. Follow AP rubric standards.\n\nGrade the following parts only:\n\nB(i): Must say real output increases in the short run and explain that aggregate demand rises due to investment spending (residential construction).\n\nD: Must say net exports decrease, with explanation that appreciation of the Vortanian crown makes exports more expensive.\n\nE(i): Must say CFA moves into surplus, and explain that a current account deficit from lower net exports causes capital inflows.\n\nE(ii): Must say employment decreases, and explain that a fall in net exports lowers AD, reducing output and jobs.\n\nF: Must say the central bank should sell Vortanian crowns, and explain that selling increases supply and depreciates the currency.\n\nRespond in full sentences, one per part, like this:\n\nB(i): 1/1 – The response correctly states that real output increases due to higher investment spending shifting aggregate demand right.\n\nD: 0/1 – The answer is incorrect; it wrongly states net exports rise without linking to appreciation of the currency.\n\n(etc.)\n\nAt the end, include a sentence with the final score:\nTotal Score: X/5`
  },
  set2: {
    title: 'Collegeboard Set 2',
    description: 'Official AP Macroeconomics Long FRQ, Collegeboard Set 2. Practice with real exam-style free response questions. Written parts are AI-graded.',
    pdf: '/APMacro-LongFRQSet2.pdf',
    aiPrompt: `You are a strict AP Macroeconomics grader. Grade only the written parts of this 2025 AP Macro FRQ on the economy of Barrikos. Ignore all instructions involving graphs or drawings.\n\nAward 1 point for each correct response with a complete, well-explained answer. No credit for incomplete logic, wrong terminology, or missing reasoning. Follow AP Macro rubric standards.\n\nGrade the following parts only:\n\nA: Must say the actual unemployment rate is 7% and explain that it's cyclical (6%) + structural (1%).\n\nC: Must name an expansionary fiscal policy (increase spending or cut taxes), and explain it shifts AD right to lower cyclical unemployment.\n\nD(i): Must say the budget moves into deficit, and explain it happens due to increased government spending or reduced tax revenue.\n\nE: Must say CFA moves into surplus, and explain it’s because higher real interest rates attract capital inflows.\n\nF: Must say the currency will appreciate, and explain it’s due to increased demand for domestic currency from capital inflows.\n\nRespond in full sentences, one per part, like this:\n\nA: 1/1 – The response correctly identifies the unemployment rate as 7%, summing 6% cyclical and 1% structural unemployment.\n\nC: 1/1 – The answer identifies expansionary fiscal policy and explains it reduces cyclical unemployment by increasing aggregate demand.\n\n(etc.)\n\nAt the end, include a sentence with the final score:\nTotal Score: X/5`
  }
};

const PARTS_SET = {
  set1: ['B(i)', 'D', 'E(i)', 'E(ii)', 'F'],
  set2: ['A', 'C', 'D(i)', 'E', 'F']
};

const APMacroPracticeExamLongFRQExam = () => {
  const navigate = useNavigate();
  const { setId } = useParams();
  const frq = FRQ_CONTENT[setId === 'set2' ? 'set2' : 'set1'];
  const parts = PARTS_SET[setId === 'set2' ? 'set2' : 'set1'];
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
      const answersArray = parts.map((part) => answers[part] || '');
      const apiUrl = import.meta.env.PROD
        ? '/api/grade-saq'
        : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-saq';

      const requestBody = {
        answers: answersArray,
        prompt_intro: frq.aiPrompt,
        sources: '',
        questions: ''
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setGrades(data.result);
    } catch (err: any) {
      setError('Failed to contact AI grading service.');
    }
    setGrading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/ap-macroeconomics-practice-exam/long-frq')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          &larr; Back to Set Selection
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col rounded-2xl border border-blue-100">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
              {frq.title}
            </h2>
            <p className="mb-4 text-slate-600 text-center">{frq.description}</p>
            <iframe
              src={frq.pdf}
              title={frq.title}
              className="w-full min-h-[1000px] border rounded-lg"
              style={{ border: 'none', minHeight: '1000px' }}
            />
            <div className="text-xs text-slate-500 mt-2 text-center">
              If the PDF does not load,{' '}
              <a
                href={frq.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                click here to open in a new tab
              </a>
              .
            </div>
          </div>
          <div className="flex-1 max-w-2xl p-6 flex flex-col items-center rounded-2xl bg-white shadow-lg border border-blue-100">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
              Your Answers
            </h2>
            {frq.aiPrompt ? (
              <>
                <button
                  className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                  onClick={handleSubmit}
                  disabled={grading}
                >
                  {grading ? 'Grading...' : 'SUBMIT'}
                </button>
                <div className="w-full space-y-6">
                  {parts.map((part) => (
                    <div key={part} className="w-full">
                      <label className="block font-semibold mb-2 text-slate-700">{part}</label>
                      <textarea
                        className="w-full min-h-[120px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        value={answers[part] || ''}
                        onChange={(e) => handleChange(part, e.target.value)}
                        placeholder={`Type your answer for ${part} here...`}
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
              </>
            ) : (
              <div className="text-center text-slate-500 font-semibold py-12">
                Sorry, AI grading is not available for this set. Please complete your response on paper.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APMacroPracticeExamLongFRQExam;
