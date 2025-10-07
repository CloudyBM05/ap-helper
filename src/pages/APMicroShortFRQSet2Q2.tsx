import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';

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
  const { user, isAuthenticated, getAuthHeaders } = useAuth();
  const [answers, setAnswers] = useState({ A: '', B: '', C: '', Di: '', Dii: '' });
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [wordCounts, setWordCounts] = useState<{ [key: string]: number }>({});
  const [charCounts, setCharCounts] = useState<{ [key: string]: number }>({});
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const STORAGE_KEY = 'apmicro-short-frq-set2q2';

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
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (Object.keys(answers).filter(k => answers[k as keyof typeof answers]).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  // Update word and character counts
  useEffect(() => {
    const newWordCounts: { [key: string]: number } = {};
    const newCharCounts: { [key: string]: number } = {};
    answerParts.forEach(part => {
      const text = answers[part.label as keyof typeof answers] || '';
      newWordCounts[part.label] = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      newCharCounts[part.label] = text.length;
    });
    setWordCounts(newWordCounts);
    setCharCounts(newCharCounts);
  }, [answers]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const chars = value.length;

    let validationError = '';
    if (chars > 600) {
      validationError = 'Character limit exceeded (600 max)';
    }

    setValidationErrors(prev => ({ ...prev, [name]: validationError }));
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const validateAnswers = (): boolean => {
    const errors: { [key: string]: string } = {};
    let hasError = false;

    answerParts.forEach(part => {
      const text = answers[part.label as keyof typeof answers] || '';
      const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      const chars = text.length;

      if (words < 10) {
        errors[part.label] = 'Too short (min 10 words)';
        hasError = true;
      } else if (words > 80) {
        errors[part.label] = 'Too long (max 80 words)';
        hasError = true;
      } else if (chars > 600) {
        errors[part.label] = 'Character limit exceeded (600 max)';
        hasError = true;
      }
    });

    setValidationErrors(errors);
    return !hasError;
  };

  const handleGrade = async () => {
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
    setGradeResult(null);

    try {
      const token = await getIdToken();
      if (!token) {
        setError('Authentication failed. Please log in again.');
        setGrading(false);
        return;
      }

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
          answers: [answers.A, answers.B, answers.C, answers.Di, answers.Dii],
          prompt_intro: gradingPrompt,
          sources: '',
          questions: '',
        }),
      });

      if (response.status === 429) {
        const data = await response.json();
        setError(data.error || 'Daily limit reached. Try again tomorrow!');
        setGrading(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to contact AI grading service.');
      }

      const data = await response.json();
      if (data.result && Array.isArray(data.result)) {
        setGradeResult(data.result);
      } else {
        setError('Failed to parse grading results.');
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred. Please try again.');
    }
    setGrading(false);
  };

  const getWordCountColor = (partLabel: string) => {
    const count = wordCounts[partLabel] || 0;
    if (count < 10 || count > 80) return 'text-red-600';
    return 'text-green-600';
  };

  const getCharCountColor = (partLabel: string) => {
    const count = charCounts[partLabel] || 0;
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
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 w-full">
                ℹ️ <strong>Daily Limit:</strong> 1 free AI grading per day (shared across all AP courses). Word limits: 10-80 words/part. Character limit: 600 chars/part.
              </div>
              <button
                className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleGrade}
                disabled={grading || !user}
              >
                {grading ? 'Grading...' : 'SUBMIT FOR AI GRADE'}
              </button>
              <div className="w-full space-y-6">
                {answerParts.map((part) => (
                  <div key={part.label} className="w-full">
                    <label className="block font-semibold mb-2">{part.display}</label>
                    <textarea
                      className={`w-full min-h-[120px] border rounded-lg p-3 focus:outline-none focus:ring-2 transition shadow ${
                        validationErrors[part.label]
                          ? 'border-red-500 focus:ring-red-400 bg-red-50'
                          : 'border-slate-300 focus:ring-cyan-400 bg-slate-50'
                      }`}
                      name={part.label}
                      value={answers[part.label as keyof typeof answers]}
                      onChange={handleChange}
                      placeholder={`Type your answer for ${part.display} here...`}
                      disabled={grading}
                    />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className={getWordCountColor(part.label)}>
                        {wordCounts[part.label] || 0} words (10-80 required)
                      </span>
                      <span className={getCharCountColor(part.label)}>
                        {charCounts[part.label] || 0}/600 chars
                      </span>
                    </div>
                    {validationErrors[part.label] && (
                      <div className="mt-2 text-sm text-red-600 font-semibold">
                        ⚠️ {validationErrors[part.label]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-semibold w-full">
                  ⚠️ {error}
                </div>
              )}
              {gradeResult && (
                <div className="mt-8 w-full bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold mb-2 text-green-700">
                    AI Grading Results
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    {gradeResult.map((g, i) => (
                      <li key={i} className="text-green-900">
                        <strong>{answerParts[i]?.display}:</strong> Score: {g.score || 'N/A'} - {g.explanation || JSON.stringify(g)}
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

export default APMicroShortFRQSet2Q2;
