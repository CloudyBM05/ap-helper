import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PDF = '/APPhysics-TBR.pdf';
const PARTS = [
  { id: 'A', label: 'Part A - Energy bar charts' },
  { id: 'B', label: 'Part B - Derive k' },
  { id: 'C_i', label: 'Part C(i) - Total mechanical energy E' },
  { id: 'C_ii', label: 'Part C(ii) - Gravitational potential energy Ug' },
  { id: 'D', label: 'Part D - Compare speeds' }
];

const ANSWER_KEY = {
  'A': `Energy bar charts:
At x₀: All gravitational potential energy (Ug) at max; K=0, Us=0.
At x₆: Part of Ug converted to K, no spring energy yet.
At x₁₀ (given): Bars show K, Ug, Us consistent with provided chart.`,
  'B': `Derive k:
From conservation of energy between x₀ and x₁₂:
Mg(Dsinθ) = ½kDs²
Where Ds = compression distance of spring (distance from x₈ to x₁₂ along ramp).
If Ds = 4m (given from x₈ to x₁₂):
k = 2Mg(Dsinθ)/Ds²`,
  'C_i': `Total mechanical energy E: Flat horizontal line at constant value (sum of K+Ug+Us).`,
  'C_ii': `Ug: Decreases linearly with x from x₈ to x₁₂.`,
  'D': `Compare speeds: v₉ > v₈.
Reason: Moving downhill, Ug decreases, K increases, so speed is greater.`
};

const APPhysicsTranslationRepresentationsQ1 = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [showAnswers, setShowAnswers] = useState(false);

  const handleChange = (part: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [part]: value }));
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/ap-physics-practice-exam/translation-representations')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          &larr; Back to Translation Between Representations
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* PDF Viewer */}
          <div className="flex-[2] min-w-[500px] max-w-6xl bg-white shadow-lg p-6 flex flex-col rounded-2xl border border-teal-100">
            <h2 className="text-xl font-bold mb-4 text-center text-teal-700">
              AP Physics Translation Between Representations - Question 2: Ramp and Spring
            </h2>
            <iframe
              src={PDF}
              title="AP Physics Translation Between Representations"
              className="w-full min-h-[1100px] border rounded-lg"
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
          <div className="flex-1 max-w-2xl p-6 flex flex-col items-center rounded-2xl bg-white shadow-lg border border-teal-100">
            <h2 className="text-xl font-bold mb-4 text-center text-teal-700">
              Your Answers
            </h2>
            <button
              className="mb-4 px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold shadow hover:bg-teal-700 transition"
              onClick={toggleAnswers}
            >
              {showAnswers ? 'HIDE ANSWER KEY' : 'SHOW ANSWER KEY'}
            </button>
            <div className="w-full space-y-6">
              {PARTS.map((part) => (
                <div key={part.id} className="w-full">
                  <label className="block font-semibold mb-2 text-slate-700">{part.label}</label>
                  <textarea
                    className="w-full min-h-[120px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
                    value={answers[part.id] || ''}
                    onChange={e => handleChange(part.id, e.target.value)}
                    placeholder={`Type your answer for ${part.label} here...`}
                  />
                  {showAnswers && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-1">Answer Key:</h4>
                      <pre className="text-sm text-green-900 whitespace-pre-wrap font-mono">
                        {ANSWER_KEY[part.id as keyof typeof ANSWER_KEY]}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APPhysicsTranslationRepresentationsQ1;
