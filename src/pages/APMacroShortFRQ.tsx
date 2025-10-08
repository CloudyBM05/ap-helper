import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';

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
  const { user, getAuthHeaders } = useAuth();

  const isQ2S1 = setId === 'set1' && questionId === 'q2';
  const isQ3S1 = setId === 'set1' && questionId === 'q3';
  const isQ2S2 = setId === 'set2' && questionId === 'q2';
  const isQ3S2 = setId === 'set2' && questionId === 'q3';

  const PARTS = isQ2S1
    ? [
        { id: 'A', label: 'Part A', isGraph: false },
        { id: 'B', label: 'Part B', isGraph: false },
        { id: 'C', label: 'Part C (Graph - Not Graded)', isGraph: true },
        { id: 'D', label: 'Part D', isGraph: false }
      ]
    : isQ3S1
    ? [
        { id: 'A', label: 'Part A', isGraph: false },
        { id: 'B', label: 'Part B (Show work)', isGraph: false },
        { id: 'C', label: 'Part C (Graph - Not Graded)', isGraph: true },
        { id: 'D', label: 'Part D (Show work)', isGraph: false }
      ]
    : isQ2S2
    ? [
        { id: 'A', label: 'Part A', isGraph: false },
        { id: 'B', label: 'Part B (Graph - Not Graded)', isGraph: true },
        { id: 'C1', label: 'Part C (i): Bond Prices', isGraph: false },
        { id: 'C2', label: 'Part C (ii): Price Level & Explanation', isGraph: false }
      ]
    : isQ3S2
    ? [
        { id: 'A', label: 'Part A (Graph - Not Graded)', isGraph: true },
        { id: 'B', label: 'Part B (Graph - Not Graded)', isGraph: true },
        { id: 'C', label: 'Part C (Show work)', isGraph: false },
        { id: 'D', label: 'Part D', isGraph: false }
      ]
    : [
        { id: 'A', label: 'Part A', isGraph: false },
        { id: 'B', label: 'Part B', isGraph: false },
        { id: 'C', label: 'Part C', isGraph: false }
      ];

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [wordCounts, setWordCounts] = useState<{ [key: string]: number }>({});
  const [charCounts, setCharCounts] = useState<{ [key: string]: number }>({});
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const PDF = getPdfForSetAndQuestion(setId, questionId);
  const setNumber = setId === 'set1' ? '1' : '2';
  const questionNumber = questionId ? questionId.replace('q', '') : '';
  const STORAGE_KEY = `apmacro-short-frq-${setId}-${questionId}`;

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved answers:', e);
      }
    }
  }, [STORAGE_KEY]);

  // Save to localStorage
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers, STORAGE_KEY]);

  // Update word and character counts
  useEffect(() => {
    const newWordCounts: { [key: string]: number } = {};
    const newCharCounts: { [key: string]: number } = {};
    PARTS.forEach(part => {
      if (!part.isGraph) {
        const text = answers[part.id] || '';
        newWordCounts[part.id] = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        newCharCounts[part.id] = text.length;
      }
    });
    setWordCounts(newWordCounts);
    setCharCounts(newCharCounts);
  }, [answers, PARTS]);

  const handleChange = (part: string, value: string) => {
    const chars = value.length;
    let validationError = '';
    if (chars > 600) {
      validationError = 'Character limit exceeded (600 max)';
    }
    setValidationErrors(prev => ({ ...prev, [part]: validationError }));
    setAnswers((prev) => ({ ...prev, [part]: value }));
  };

  const validateAnswers = (): boolean => {
    const errors: { [key: string]: string } = {};
    let hasError = false;
    PARTS.forEach(part => {
      if (!part.isGraph) {
        const text = answers[part.id] || '';
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        const chars = text.length;
        if (words < 10) {
          errors[part.id] = 'Too short (min 10 words)';
          hasError = true;
        } else if (words > 80) {
          errors[part.id] = 'Too long (max 80 words)';
          hasError = true;
        } else if (chars > 600) {
          errors[part.id] = 'Character limit exceeded (600 max)';
          hasError = true;
        }
      }
    });
    setValidationErrors(errors);
    return !hasError;
  };

  let prompt_intro = 'You are an AP Macroeconomics teacher grading a student\'s free-response question. Grade each part of the response and provide a score and a brief explanation.';

  if (isQ2S1) {
    prompt_intro = `You are an official AP Macroeconomics FRQ grader. Grade the student response to Question 2 using the official AP scoring rubric. Be extremely strict. Only award points for complete, accurate answers. Do not give partial credit unless explicitly allowed in AP scoring guidelines.

Question Summary:
Two countries (L and A) are in short-run equilibrium below full employment. They both use monetary policy to close the gap.

Part A: What open-market operation should Country L use to move toward full employment?
Part B: What specific monetary policy action should Country A implement to increase output?
Part C: The student is asked to draw a labeled reserve market graph showing the effect on the policy rate.
✅ DO NOT grade the graph. If a graph is shown, respond: "Graph not graded."
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
✅ DO NOT grade the graph. If a graph is shown, respond: "Graph not graded."
Part D: Given MPC = 0.8 and potential GDP = $1,150, calculate and state the minimum required change in government spending to close the output gap. Show work.

Scoring Criteria:

A (1 pt): States equal and explains it's because it's the base year.

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
✅ DO NOT grade the graph. If a graph is shown, respond: "Graph not graded."
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
✅ DO NOT grade the graph. If a graph is shown, respond: "Graph not graded."
Part B:
Thailand, a trading partner of Nepal, experiences an increase in real income. On the graph in Part A, show the short-run effect of this on real output and the price level in Nepal. Label the new short-run equilibrium real output Y₂ and price level PL₂.
✅ DO NOT grade the graph. If a graph is shown, respond: "Graph not graded."
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

  const handleSubmit = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (!validateAnswers()) {
      setError('Please fix validation errors before submitting.');
      return;
    }
    setGrading(true);
    setError(null);
    setGrades(null);
    try {
      const authHeaders = getAuthHeaders();
      if (!Object.keys(authHeaders).length) {
        setError('Authentication failed. Please log in again.');
        setGrading(false);
        return;
      }
      const apiUrl = import.meta.env.DEV
        ? '/api/grade-apmacro-frq'
        : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-apmacro-frq';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify({
          answers: PARTS.map(p => answers[p.id] || ''),
          prompt_intro: prompt_intro
        })
      });
      if (response.status === 429) {
        const data = await response.json();
        setError(data.error || 'Daily limit reached. Try again tomorrow!');
        setGrading(false);
        return;
      }
      if (!response.ok) throw new Error('Failed to contact AI grading service.');
      const data = await response.json();
      if (data.result && Array.isArray(data.result)) {
        setGrades(data.result);
      } else {
        setError('Failed to parse grading results.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to contact AI grading service.');
    }
    setGrading(false);
  };

  const getWordCountColor = (partId: string) => {
    const count = wordCounts[partId] || 0;
    if (count < 10 || count > 80) return 'text-red-600';
    return 'text-green-600';
  };

  const getCharCountColor = (partId: string) => {
    const count = charCounts[partId] || 0;
    if (count > 600) return 'text-red-600';
    return 'text-slate-600';
  };

  return (
    <>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
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
              {!user && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 w-full">
                  🔒 <strong>Authentication required</strong> to use AI grading. Please{' '}
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="underline font-semibold hover:text-yellow-900"
                  >
                    log in
                  </button>{' '}
                  to continue.
                </div>
              )}
              <button
                className="mb-4 px-6 py-2 bg-cyan-600 text-white rounded-lg font-semibold shadow hover:bg-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={grading || !user}
              >
                {grading ? 'Grading...' : 'SUBMIT'}
              </button>
              <div className="w-full space-y-6">
                {PARTS.map((part) => (
                  <div key={part.id} className="w-full">
                    <label className="block font-semibold mb-2 text-slate-700">{part.label}</label>
                    <textarea
                      className={`w-full min-h-[120px] border rounded-lg p-3 focus:outline-none focus:ring-2 transition ${
                        part.isGraph
                          ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed'
                          : validationErrors[part.id]
                          ? 'border-red-500 focus:ring-red-400 bg-red-50'
                          : 'border-slate-300 focus:ring-cyan-400'
                      }`}
                      value={answers[part.id] || ''}
                      onChange={e => handleChange(part.id, e.target.value)}
                      placeholder={part.isGraph ? 'Graphs cannot be graded by AI' : `Type your answer for ${part.label} here...`}
                      disabled={grading || part.isGraph}
                    />
                    {!part.isGraph && (
                      <>
                        <div className="mt-2 flex justify-between text-sm">
                          <span className={getWordCountColor(part.id)}>
                            {wordCounts[part.id] || 0} words (10-80 required)
                          </span>
                          <span className={getCharCountColor(part.id)}>
                            {charCounts[part.id] || 0}/600 chars
                          </span>
                        </div>
                        {validationErrors[part.id] && (
                          <div className="mt-2 text-sm text-red-600 font-semibold">
                            ⚠️ {validationErrors[part.id]}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-semibold w-full">
                  ⚠️ {error}
                </div>
              )}
              {grades && (
                <div className="mt-8 w-full bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2 text-green-700">
                    Grading Results
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {grades.map((g, i) => (
                      <li key={i} className="text-green-900">
                        <strong>{PARTS[i]?.label}:</strong> Score: {g.score || 'N/A'} - {g.explanation || JSON.stringify(g)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default APMacroShortFRQ;
