import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';
import { MACRO_LONG_FRQ_AI_PROMPT } from '../data/macroLongFRQPrompt';

const FRQ_CONTENT = {
  set1: {
    title: '2025 AP Macroeconomics Long FRQ Set 1',
    description: 'Answer the written parts of the following AP Macroeconomics Long FRQ. Graphs and drawings cannot be graded.',
    pdf: '/APMacro-LongFRQ1Set1.pdf',
    parts: [
      { id: 'B(i)', label: 'Part B(i)' },
      { id: 'D', label: 'Part D' },
      { id: 'E(i)', label: 'Part E(i)' },
      { id: 'E(ii)', label: 'Part E(ii)' },
      { id: 'F', label: 'Part F' }
    ]
  }
};

const APMacroLongFRQ = () => {
  const navigate = useNavigate();
  const { setId } = useParams();
  const { user, getAuthHeaders } = useAuth();
  const frq = FRQ_CONTENT['set1'];

  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [wordCounts, setWordCounts] = useState<{ [key: string]: number }>({});
  const [charCounts, setCharCounts] = useState<{ [key: string]: number }>({});
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const STORAGE_KEY = 'apmacro-long-frq-set1';

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
    frq.parts.forEach(part => {
      const text = answers[part.id] || '';
      newWordCounts[part.id] = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      newCharCounts[part.id] = text.length;
    });
    setWordCounts(newWordCounts);
    setCharCounts(newCharCounts);
  }, [answers, frq.parts]);

  const handleChange = (part: string, value: string) => {
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
    frq.parts.forEach(part => {
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
      const answersArray = frq.parts.map(part => answers[part.id] || "");
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
          answers: answersArray,
          prompt_intro: MACRO_LONG_FRQ_AI_PROMPT
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
    const count = wordCounts[partId] || 0;
    if (count < 15 || count > 120) return 'text-red-600';
    return 'text-green-600';
  };

  const getCharCountColor = (partId: string) => {
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
            onClick={() => navigate('/ap-macroeconomics/practice-exam/long-frq')}
            className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
          >
            &larr; Back to Set Selection
          </button>
          <div className="flex flex-col md:flex-row justify-center items-start gap-8">
            {/* PDF Viewer */}
            <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col rounded-2xl border border-cyan-100">
              <h2 className="text-xl font-bold mb-4 text-center text-cyan-700">
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
                {frq.parts.map((part) => (
                  <div key={part.id} className="w-full">
                    <label className="block font-semibold mb-2 text-slate-700">{part.label}</label>
                    <textarea
                      className={`w-full min-h-[120px] border rounded-lg p-3 focus:outline-none focus:ring-2 transition ${
                        validationErrors[part.id]
                          ? 'border-red-500 focus:ring-red-400 bg-red-50'
                          : 'border-slate-300 focus:ring-cyan-400'
                      }`}
                      value={answers[part.id] || ''}
                      onChange={e => handleChange(part.id, e.target.value)}
                      placeholder={`Type your answer for ${part.label} here...`}
                      disabled={grading}
                    />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className={getWordCountColor(part.id)}>
                        {wordCounts[part.id] || 0} words (15-120 required)
                      </span>
                      <span className={getCharCountColor(part.id)}>
                        {charCounts[part.id] || 0}/800 chars
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
                        <strong>{frq.parts[i]?.label}:</strong> Score: {g.score || 'N/A'} - {g.explanation || JSON.stringify(g)}
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

export default APMacroLongFRQ;
