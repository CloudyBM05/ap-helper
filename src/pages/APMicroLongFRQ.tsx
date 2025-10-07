import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';

const FRQ_CONTENT = {
  set1: {
    title: 'Collegeboard 2025 Long FRQ Set 1',
    description: 'Answer all parts (A-E) of the following AP Microeconomics Long FRQ. Each part tests a different concept.',
    pdf: '/APMicro-Long1.pdf',
    question: 'A market for widgets is perfectly competitive. The government introduces a per-unit tax. Analyze the effects on equilibrium price, quantity, consumer surplus, producer surplus, and deadweight loss.'
  },
  set2: {
    title: 'Collegeboard 2025 Long FRQ Set 2',
    description: 'Answer all parts (A-E) of the following AP Microeconomics Long FRQ. Each part tests a different concept.',
    pdf: '/APMicro-Long2.pdf',
    question: 'A monopolist faces a downward-sloping demand curve. The government imposes a price ceiling below equilibrium. Analyze the effects on output, profit, consumer surplus, and allocative efficiency.'
  }
};

const PARTS = [
  { id: 'A', label: 'Part A' },
  { id: 'B', label: 'Part B' },
  { id: 'C', label: 'Part C' },
  { id: 'D', label: 'Part D' },
  { id: 'E', label: 'Part E' }
];

const MICRO_FRQ_AI_PROMPT = `Grade the AP Micro FRQ (2025, Q1) using the rubric below. Be strict. No partial credit. No suggestions or praise.\n\nScoring:\n\nPart A (6 pts):\n\n+1: MR=MC labeled at QM\n+1: Price PM from demand at QM\n+1: ATC curve above PM at QM\n+1: Shaded deadweight loss\n+1: QS labeled\n+1: QS where P=MC\n\nPart C (1 pt):\n\n+1: Profit-max Q increases and correct marginal analysis (MC↓ → MR=MC at higher Q)\n\nPart D (1 pt):\n\n+1: Demand becomes more elastic, because of more substitutes\n\nPart E (2 pts):\n\ni. +1: Demand for labor ↑, explained by derived demand\nii. +1: Wage ↑ in short run, explained by reduced labor supply\n\nResponse format:\nPart A: X/6\nPart C: X/1\nPart D: X/1\nPart E: X/2\nTotal: X/10\n[1 short sentence for each point lost]`;
const MICRO_FRQ_AI_PROMPT_SET2 = `Grade the following AP Micro FRQ (2025, Q1 – Deskward) using the rubric below. Be strict. No partial credit. No extra comments.\n\nScoring Criteria:\n\nPart A (5 pts):\n\n+1: Market graph with PM and QM labeled\n+1: Firm graph with PF and QF labeled\n+1: PF = PM\n+1: ATC at PF (shows zero profit)\n+1: Correctly drawn side-by-side graphs\n\nPart B (1 pt):\n\n+1: Quantity stays the same in short run; fixed cost doesn’t affect MR=MC\n\nPart C (2 pts):\n\ni. +1: New price P* ↓ and quantity Q* ↑ shown on market graph\nii. +1: Area of government subsidy (rectangle under Q*, from old to new price) shaded\n\nPart D (1 pt):\n\n+1: Surplus, explained by quantity supplied > quantity demanded at floor price\n\nPart E (2 pts):\n\ni. +1: ATC = $80,000 ÷ 500 = $160\nii. +1: Diseconomies of scale (ATC ↑ to $180); costs per unit rising\n\nOutput Format:\nPart A: X/5\nPart B: X/1\nPart C: X/2\nPart D: X/1\nPart E: X/2\nTotal: X/11\n[1 sentence per deduction explaining the error]\n\nOnly return scores and rubric-based comments.`;

const APMicroLongFRQ = () => {
  const navigate = useNavigate();
  const { setId } = useParams();
  const frq = FRQ_CONTENT[(setId === 'set2' ? 'set2' : 'set1')];
  const { user, getIdToken } = useAuth();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [wordCounts, setWordCounts] = useState<{ [key: string]: number }>({});
  const [charCounts, setCharCounts] = useState<{ [key: string]: number }>({});
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const STORAGE_KEY = `apmicro-long-frq-${setId}`;

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed);
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
      const text = answers[part.id] || '';
      newWordCounts[part.id] = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      newCharCounts[part.id] = text.length;
    });
    setWordCounts(newWordCounts);
    setCharCounts(newCharCounts);
  }, [answers]);

  const handleChange = (part: string, value: string) => {
    // Long FRQ: 15-120 words per part, 800 chars max
    const chars = value.length;

    let validationError = '';
    if (chars > 800) {
      validationError = 'Character limit exceeded (800 max)';
    }

    setValidationErrors(prev => ({ ...prev, [part]: validationError }));
    setAnswers((prev) => ({ ...prev, [part]: value }));
  };

  const validateAnswers = (): boolean => {
    const errors: { [key: string]: string } = {};
    let hasError = false;

    PARTS.forEach(part => {
      const isDrawingPart =
        (setId === 'set1' && (part.id === 'A' || part.id === 'B')) ||
        (setId === 'set2' && (part.id === 'A' || part.id === 'C'));
      
      if (isDrawingPart) return; // Skip drawing parts

      const text = answers[part.id] || '';
      const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      const chars = text.length;

      if (words < 15) {
        errors[part.id] = 'Too short (min 15 words)';
        hasError = true;
      } else if (words > 120) {
        errors[part.id] = 'Too long (max 120 words)';
        hasError = true;
      } else if (chars > 800) {
        errors[part.id] = 'Character limit exceeded (800 max)';
        hasError = true;
      }
    });

    setValidationErrors(errors);
    return !hasError;
  };

  const handleSubmit = async () => {
    // Check authentication
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Validate answers
    if (!validateAnswers()) {
      setError('Please fix validation errors before submitting.');
      return;
    }

    setGrading(true);
    setError(null);
    setGrades(null);

    try {
      const token = await getIdToken();
      if (!token) {
        setError('Authentication failed. Please log in again.');
        setGrading(false);
        return;
      }

      const answersArray = PARTS.map(part => answers[part.id] || "");
      const prompt = setId === 'set1' ? MICRO_FRQ_AI_PROMPT : MICRO_FRQ_AI_PROMPT_SET2;

      const apiUrl = import.meta.env.DEV
        ? '/api/grade-apmicro-frq'
        : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-apmicro-frq';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          answers: answersArray,
          prompt_intro: prompt,
          sources: '',
          questions: ''
        })
      });

      if (response.status === 429) {
        const data = await response.json();
        setError(data.error || 'Daily limit reached. Try again tomorrow!');
        setGrading(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to contact AI grading service.');
      }

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
    const isDrawingPart =
      (setId === 'set1' && (partId === 'A' || partId === 'B')) ||
      (setId === 'set2' && (partId === 'A' || partId === 'C'));
    if (isDrawingPart) return 'text-slate-400';

    const count = wordCounts[partId] || 0;
    if (count < 15) return 'text-red-600';
    if (count > 120) return 'text-red-600';
    return 'text-green-600';
  };

  const getCharCountColor = (partId: string) => {
    const isDrawingPart =
      (setId === 'set1' && (partId === 'A' || partId === 'B')) ||
      (setId === 'set2' && (partId === 'A' || partId === 'C'));
    if (isDrawingPart) return 'text-slate-400';

    const count = charCounts[partId] || 0;
    if (count > 800) return 'text-red-600';
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
            onClick={() => navigate('/ap-microeconomics-practice-exam/long-frq')}
            className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
          >
            &larr; Back to Set Selection
          </button>
          <div className="flex flex-col md:flex-row justify-center items-start gap-8">
            {/* PDF Viewer */}
            <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col rounded-2xl border border-fuchsia-100">
              <h2 className="text-xl font-bold mb-4 text-center text-fuchsia-700">
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
              <div className="mt-4 text-xs text-slate-500 text-center">
                PDFs are for educational use only. All rights belong to their respective owners.
              </div>
            </div>
            {/* Answer boxes */}
            <div className="flex-1 max-w-2xl p-6 flex flex-col items-center rounded-2xl bg-white shadow-lg border border-fuchsia-100">
              <h2 className="text-xl font-bold mb-4 text-center text-fuchsia-700">
                Your Answers
              </h2>
              {!user && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
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
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                ℹ️ <strong>Daily Limit:</strong> 1 free AI grading per day (shared across all AP courses). Word limits: 15-120 words/part. Character limit: 800 chars/part.
              </div>
              <button
                className="mb-4 px-6 py-2 bg-fuchsia-600 text-white rounded-lg font-semibold shadow hover:bg-fuchsia-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={grading || !user}
              >
                {grading ? 'Grading...' : 'SUBMIT'}
              </button>
              <div className="w-full space-y-6">
                {PARTS.map((part) => {
                  const isDrawingPart =
                    (setId === 'set1' && (part.id === 'A' || part.id === 'B')) ||
                    (setId === 'set2' && (part.id === 'A' || part.id === 'C'));
                  return (
                    <div key={part.id} className="w-full">
                      <label className="block font-semibold mb-2 text-slate-700">{part.label}</label>
                      <textarea
                        className={`w-full min-h-[120px] border rounded-lg p-3 focus:outline-none focus:ring-2 transition ${
                          isDrawingPart
                            ? 'bg-slate-100 text-slate-400 border-slate-300'
                            : validationErrors[part.id]
                            ? 'border-red-500 focus:ring-red-400 bg-red-50'
                            : 'border-slate-300 focus:ring-fuchsia-400'
                        }`}
                        value={isDrawingPart ? 'Sorry, we cannot analyze or grade graph drawings. Please skip this part.' : (answers[part.id] || '')}
                        onChange={e => handleChange(part.id, e.target.value)}
                        placeholder={isDrawingPart ? undefined : `Type your answer for ${part.label} here...`}
                        disabled={grading || isDrawingPart}
                      />
                      {isDrawingPart && (
                        <div className="mt-2 text-sm text-fuchsia-700 font-semibold">We cannot analyze or grade graph drawings. Please skip this part.</div>
                      )}
                      {!isDrawingPart && (
                        <div className="mt-2 flex justify-between text-sm">
                          <span className={getWordCountColor(part.id)}>
                            {wordCounts[part.id] || 0} words (15-120 required)
                          </span>
                          <span className={getCharCountColor(part.id)}>
                            {charCounts[part.id] || 0}/800 chars
                          </span>
                        </div>
                      )}
                      {validationErrors[part.id] && (
                        <div className="mt-2 text-sm text-red-600 font-semibold">
                          ⚠️ {validationErrors[part.id]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-semibold">
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
                        <strong>Part {PARTS[i]?.id}:</strong> Score: {g.score || 'N/A'} - {g.explanation || JSON.stringify(g)}
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

export default APMicroLongFRQ;
