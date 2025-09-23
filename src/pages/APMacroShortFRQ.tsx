import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const getPdfForSetAndQuestion = (setId: string | undefined, questionId: string | undefined) => {
  if (setId === 'set1') {
    if (questionId === 'q2') return '/APMacro-Short1Set1.pdf';
    if (questionId === 'q3') return '/APMacro-Short2Set1.pdf';
  }
  if (setId === 'set2') {
    if (questionId === 'q2') return '/APMacro-Short1Set2.pdf';
    if (questionId === 'q3') return '/APMacro-Short2Set2.pdf';
  }
  return '';
};

const APMacroShortFRQ = () => {
  const navigate = useNavigate();
  const { setId, questionId } = useParams();

  const isQ2S1 = setId === 'set1' && questionId === 'q2';
  const isQ3S1 = setId === 'set1' && questionId === 'q3';
  const isQ2S2 = setId === 'set2' && questionId === 'q2';
  const isQ3S2 = setId === 'set2' && questionId === 'q3';

  const PARTS = isQ2S1
    ? [
        { id: 'A', label: 'Part A' },
        { id: 'B', label: 'Part B' },
        { id: 'C', label: 'Part C (Graph - Not Graded)' },
        { id: 'D', label: 'Part D' }
      ]
    : isQ3S1
    ? [
        { id: 'A', label: 'Part A' },
        { id: 'B', label: 'Part B (Show work)' },
        { id: 'C', label: 'Part C (Graph - Not Graded)' },
        { id: 'D', label: 'Part D (Show work)' }
      ]
    : isQ2S2
    ? [
        { id: 'A', label: 'Part A' },
        { id: 'B', label: 'Part B (Graph - Not Graded)' },
        { id: 'C1', label: 'Part C (i): Bond Prices' },
        { id: 'C2', label: 'Part C (ii): Price Level & Explanation' }
      ]
    : isQ3S2
    ? [
        { id: 'A', label: 'Part A (Graph - Not Graded)' },
        { id: 'B', label: 'Part B (Graph - Not Graded)' },
        { id: 'C', label: 'Part C (Show work)' },
        { id: 'D', label: 'Part D' }
      ]
    : [
        { id: 'A', label: 'Part A' },
        { id: 'B', label: 'Part B' },
        { id: 'C', label: 'Part C' }
      ];

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const PDF = getPdfForSetAndQuestion(setId, questionId);
  const setNumber = setId === 'set1' ? '1' : '2';
  const questionNumber = questionId ? questionId.replace('q', '') : '';

  const handleChange = (part: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [part]: value }));
  };

  const handleSubmit = async () => {
    setGrading(true);
    setError(null);
    setGrades(null);

    let prompt_intro = 'You are an AP Macroeconomics teacher grading a student\'s free-response question. Grade each part of the response and provide a score and a brief explanation.';

    if (isQ2S1) {
      prompt_intro = `You are an official AP Macroeconomics FRQ grader. Grade the student response to Question 2 using the official AP scoring rubric. Be extremely strict. Only award points for complete, accurate answers. Do not give partial credit unless explicitly allowed in AP scoring guidelines.

Question Summary:
Two countries (L and A) are in short-run equilibrium below full employment. They both use monetary policy to close the gap.

Part A: What open-market operation should Country L use to move toward full employment?
Part B: What specific monetary policy action should Country A implement to increase output?
Part C: The student is asked to draw a labeled reserve market graph showing the effect on the policy rate.
✅ DO NOT grade the graph. If a graph is shown, respond: “Graph not graded.”
Part D: If no policy is taken in Country A, what happens to short-run aggregate supply in the long run? Does it increase, decrease, or stay the same? Explain.

Scoring Criteria:

A (1 pt): Identifies open-market purchase.

B (1 pt): Identifies valid expansionary monetary policy (e.g., decrease discount rate, reserve requirement, or open-market purchase).

C (0 pts): ❌ Do not evaluate or comment on drawing.

D (2 pts): 1 pt for saying SRAS will increase; 1 pt for explaining it increases due to falling input prices/wages that restore long-run equilibrium.`;
    } else if (isQ3S1) {
      prompt_intro = `You are an official AP Macroeconomics FRQ grader. Grade the student response to Question 3 using the official AP rubric. Be extremely strict. Only award points for complete, correct, and fully explained answers.

Question Summary:
Real and nominal GDP are analyzed in a table for 2021 and 2022. 2021 is the base year.

Part A: Was real GDP in 2021 greater than, less than, or equal to nominal GDP in 2021? Explain.
Part B: Calculate real GDP in 2022 using 2021 prices. Student must show correct work.
Part C: Student is asked to draw an AD/AS graph with Y₁, PL₁, and YF labeled.
✅ DO NOT grade the graph. If a graph is shown, respond: “Graph not graded.”
Part D: Given MPC = 0.8 and potential GDP = $1,150, calculate and state the minimum required change in government spending to close the output gap. Show work.

Scoring Criteria:

A (1 pt): States equal and explains it's because it’s the base year.

B (1 pt): Correct real GDP calculation:
Real GDP = (50×11) + (70×4) + (30×12) = 550 + 280 + 360 = $1,190

C (0 pts): ❌ Do not evaluate or comment on drawing.

D (2 pts):

1 pt for correct multiplier: 1 / (1 − 0.8) = 5

1 pt for correct ΔG calculation: Gap = 1,150 − 1,190 = −40 ⇒ ΔG = −40 ÷ 5 = −8
→ Required $8 decrease in government spending.`;
    } else if (isQ2S2) {
      prompt_intro = `You are an official AP Macroeconomics FRQ grader. Grade the student response to Question 2 using the official AP rubric. Be very strict. Do not award points for vague or partially correct answers.

Question Summary:
The economy of Jenland is currently above full employment.

Part A: With ample reserves in the banking system, what specific monetary policy should the central bank use to return to full employment?
Part B: The student is asked to draw a labeled reserve market graph showing the effect on the policy rate.
✅ DO NOT grade the graph. If a graph is shown, respond: “Graph not graded.”
Part C: Based on the interest rate change:

i. What happens to the price of previously issued bonds?

ii. What happens to the price level? Explain.

Scoring Criteria:
A (1 pt): Identifies a contractionary monetary policy (e.g., open-market sale, increase in reserve requirement or discount rate).
B (0 pts): ❌ Do not evaluate or comment on drawing.
C (2 pts):
i. 1 pt for correctly stating bond prices decrease.
ii. 1 pt for stating price level decreases and 1 pt for explanation: higher interest rates ↓ investment ↓ AD ↓ PL.`;
    } else if (isQ3S2) {
      prompt_intro = `You are an official AP Macroeconomics FRQ grader. Grade the student response to Question 3 using the official AP rubric. Be very strict. Do not award points for vague or partially correct answers.

Question Summary:
Nepal is in long-run macroeconomic equilibrium and has an open economy.
Part A:
Draw a correctly labeled graph of aggregate demand, short-run aggregate supply, and long-run aggregate supply for Nepal. Show:
i. The current equilibrium real output and price level, labeled Y₁ and PL₁.
ii. The full-employment output, labeled YF.
✅ DO NOT grade the graph. If a graph is shown, respond: “Graph not graded.”
Part B:
Thailand, a trading partner of Nepal, experiences an increase in real income. On the graph in Part A, show the short-run effect of this on real output and the price level in Nepal. Label the new short-run equilibrium real output Y₂ and price level PL₂.
✅ DO NOT grade the graph. If a graph is shown, respond: “Graph not graded.”
Part C:
At the short-run equilibrium from Part B, Nepal is experiencing a 400 million rupee output gap. The marginal propensity to consume is 0.75. Calculate the minimum change and state the direction of change in government spending required to close the output gap in the short run. Show your work.
Part D:
Assume instead that no discretionary policy actions are taken. Explain how automatic stabilizers in the short run would reduce the effect of the change in real output shown in Part B.
Scoring Criteria:
A (0 pts): ❌ Do not evaluate or comment on drawing.
B (0 pts): ❌ Do not evaluate or comment on drawing.
C (2 pts):
✅ 1 pt for correct calculation: multiplier = 1 / (1 – 0.75) = 4; required change = 400 ÷ 4 = 100 million rupees
✅ 1 pt for correctly stating increase in government spending
D (1 pt):
✅ 1 pt for stating that automatic stabilizers (e.g., progressive taxes or unemployment benefits) increase government spending or reduce taxes automatically in downturns, which increases AD and reduces the output gap`;
    }

    try {
      const apiUrl = import.meta.env.PROD
        ? '/api/grade-saq'
        : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-saq';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: PARTS.map(p => answers[p.id] || ''),
          prompt_intro: prompt_intro,
          criteria: [],
          sources: '',
          questions: ''
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setGrades(data.result);
    } catch (error) {
      setError('Failed to contact AI grading service.');
      console.error(error);
    }
    setGrading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate(`/ap-macro-practice-exam/short-frq/${setId}`)}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          &larr; Back to Set {setNumber}
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* PDF Viewer */}
          <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col rounded-2xl border border-cyan-100">
            <h2 className="text-xl font-bold mb-4 text-center text-cyan-700">
              Collegeboard 2025 Short FRQ Set {setNumber} - Question {questionNumber}
            </h2>
            <iframe
              src={PDF}
              title={`Short FRQ Set ${setNumber} Q${questionNumber}`}
              className="w-full min-h-[1100px] border rounded-lg"
              style={{ border: 'none' }}
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
          <div className="flex-1 max-w-2xl p-6 flex flex-col items-center rounded-2xl bg-white shadow-lg border border-cyan-100">
            <h2 className="text-xl font-bold mb-4 text-center text-cyan-700">
              Your Answers
            </h2>
            <button
              className="mb-4 px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold shadow hover:bg-cyan-700 transition"
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
                    className="w-full min-h-[120px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    value={answers[part.id] || ''}
                    onChange={e => handleChange(part.id, e.target.value)}
                    placeholder={`Type your answer for ${part.label} here...`}
                    disabled={grading || ((isQ2S1 || isQ3S1 || isQ2S2) && (part.id === 'B' && (isQ2S2 || isQ3S2) ? true : part.id === 'C')) || (isQ3S2 && (part.id === 'A' || part.id === 'B'))}
                  />
                </div>
              ))}
            </div>
            {error && (
              <div className="mt-6 text-red-600 font-semibold">{error}</div>
            )}
            {grades && (
              <div className="mt-6 w-full p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">Grading Results</h3>
                {grades.map((grade, index) => (
                  <p key={index} className="text-green-700">{grade}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APMacroShortFRQ;
