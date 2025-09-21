import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PDF = '/APPhysics-EDA.pdf';
const PARTS = [
  { id: 'A', label: 'Part A - Procedure' },
  { id: 'B', label: 'Part B - Graph/analysis' },
  { id: 'C_i', label: 'Part C(i) - Vertical and horizontal axes' },
  { id: 'C_ii', label: 'Part C(ii) - Plot data from table' },
  { id: 'C_iii', label: 'Part C(iii) - Best-fit straight line' },
  { id: 'D', label: 'Part D - Calculate M' }
];

const ANSWER_KEY = {
  'A': `Procedure:
• Hang meterstick from pivot at center.
• Hang block at various known distances from pivot; measure spring scale reading.
• Use torque equation to relate readings to block mass.
• Repeat, vary distances to reduce uncertainty.`,
  'B': `Graph/analysis:
• Plot torque (spring force × lever arm) vs. block distance from pivot.
• Slope → m₀g; from that, find m₀.`,
  'C_i': `Vertical axis: FT sinθ (or directly FT) depending on rearrangement.
Horizontal axis: 1/sinθ.`,
  'C_ii': `Plot data from table.`,
  'C_iii': `Best-fit straight line.`,
  'D': `Calculate M:
From slope = Mg/2 → M = 2×slope/g.
Using given data: slope ≈ 4.0 N → M ≈ 0.82 kg.`
};

const APPhysicsExperimentalDesignQ1 = () => {
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
          onClick={() => navigate('/ap-physics-practice-exam/experimental-design')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          &larr; Back to Experimental Design & Analysis
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* PDF Viewer */}
          <div className="flex-[2] min-w-[500px] max-w-6xl bg-white shadow-lg p-6 flex flex-col rounded-2xl border border-teal-100">
            <h2 className="text-xl font-bold mb-4 text-center text-teal-700">
              AP Physics Experimental Design & Analysis - Question 3: Meterstick
            </h2>
            <iframe
              src={PDF}
              title="AP Physics Experimental Design & Analysis"
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

export default APPhysicsExperimentalDesignQ1;
