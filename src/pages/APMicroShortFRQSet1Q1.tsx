import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';

const PDF = '/APMicro-Short1Set1.pdf';
const PARTS = [
  { id: 'A', label: 'Part A' },
  { id: 'B', label: 'Part B' },
  { id: 'C', label: 'Part C' }
];

const GRADING_PROMPT = `Grade the following AP Microeconomics Short FRQ (Set 1, Question 1) using the standard AP rubric. Be strict and provide clear, concise explanations for each part.

Scoring Guidelines:
- Part A: 1 point for correct identification and explanation
- Part B: 1 point for correct analysis
- Part C: 1 point for correct application

Respond ONLY with a JSON array of objects, one per part: [{'score': 0 or 1, 'explanation': '...'}, ...] No extra text or formatting.`;

const APMicroShortFRQSet1Q1 = () => {
  const navigate = useNavigate();
  const { user, getIdToken } = useAuth();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [wordCounts, setWordCounts] = useState<{ [key: string]: number }>({});
  const [charCounts, setCharCounts] = useState<{ [key: string]: number }>({});
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const STORAGE_KEY = 'apmicro-short-frq-set1q1';

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
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

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
    });
    setValidationErrors(errors);
    return !hasError;
  };

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
          answers: PARTS.map(p => answers[p.id] || ''),
          prompt_intro: GRADING_PROMPT
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
            onClick={() => navigate('/ap-microeconomics-practice-exam/short-frq/set1')}
            className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
          >
            &larr; Back to Set 1
          </button>
          <div className="flex flex-col md:flex-row justify-center items-start gap-8">
            {/* PDF Viewer */}
            <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col rounded-2xl border border-fuchsia-100">
              <h2 className="text-xl font-bold mb-4 text-center text-fuchsia-700">
                Collegeboard 2025 Short FRQ Set 1 - Question 1
              </h2>
              <iframe
                src={PDF}
                title="Short FRQ Set 1 Q1"
                className="w-full min-h-[900px] border rounded-lg"
                style={{ border: 'none', minHeight: '400px' }}
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
            <div className="flex-1 max-w-2xl p-6 flex flex-col items-center rounded-2xl bg-white shadow-lg border border-fuchsia-100">
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
                className="mb-4 px-6 py-2 bg-fuchsia-600 text-white rounded-lg font-semibold shadow hover:bg-fuchsia-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                        validationErrors[part.id]
                          ? 'border-red-500 focus:ring-red-400 bg-red-50'
                          : 'border-slate-300 focus:ring-fuchsia-400'
                      }`}
                      value={answers[part.id] || ''}
                      onChange={e => handleChange(part.id, e.target.value)}
                      placeholder={`Type your answer for ${part.label} here...`}
                      disabled={grading}
                    />
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

export default APMicroShortFRQSet1Q1;
