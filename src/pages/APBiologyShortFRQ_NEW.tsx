import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';
import { BIOLOGY_SHORT_FRQ1_AI_PROMPT, BIOLOGY_SHORT_FRQ2_AI_PROMPT, BIOLOGY_SHORT_FRQ3_AI_PROMPT, BIOLOGY_SHORT_FRQ4_AI_PROMPT } from '../data/biologyLongFRQPrompt';

const FRQ_CONTENT = {
  set1: {
    title: '2025 AP Biology Short FRQ Set 1',
    description: 'Answer the written parts of the following AP Biology Short FRQ. Graphs and drawings cannot be graded.',
    pdf: '/APBio-Short1.pdf',
    prompt: BIOLOGY_SHORT_FRQ1_AI_PROMPT,
    parts: [
      { id: 'A', label: 'Part A' },
      { id: 'B', label: 'Part B' },
      { id: 'C', label: 'Part C' },
      { id: 'D', label: 'Part D' }
    ]
  },
  set2: {
    title: '2025 AP Biology Short FRQ Set 2',
    description: 'Answer the written parts of the following AP Biology Short FRQ. Graphs and drawings cannot be graded.',
    pdf: '/APBio-Short2.pdf',
    prompt: BIOLOGY_SHORT_FRQ2_AI_PROMPT,
    parts: [
      { id: 'A', label: 'Part A' },
      { id: 'B', label: 'Part B' },
      { id: 'C', label: 'Part C' },
      { id: 'D', label: 'Part D' }
    ]
  },
  set3: {
    title: '2025 AP Biology Short FRQ Set 3',
    description: 'Answer the written parts of the following AP Biology Short FRQ. Graphs and drawings cannot be graded.',
    pdf: '/APBio-Short3.pdf',
    prompt: BIOLOGY_SHORT_FRQ3_AI_PROMPT,
    parts: [
      { id: 'A', label: 'Part A' },
      { id: 'B', label: 'Part B' },
      { id: 'C', label: 'Part C' },
      { id: 'D', label: 'Part D' }
    ]
  },
  set4: {
    title: '2025 AP Biology Short FRQ Set 4',
    description: 'Answer the written parts of the following AP Biology Short FRQ. Graphs and drawings cannot be graded.',
    pdf: '/APBio-Short4.pdf',
    prompt: BIOLOGY_SHORT_FRQ4_AI_PROMPT,
    parts: [
      { id: 'A', label: 'Part A' },
      { id: 'B', label: 'Part B' },
      { id: 'C', label: 'Part C' },
      { id: 'D', label: 'Part D' }
    ]
  }
};

const APBiologyShortFRQ = () => {
  const navigate = useNavigate();
  const { setId } = useParams();
  const frq = FRQ_CONTENT[setId as keyof typeof FRQ_CONTENT];
  const { isAuthenticated, getAuthHeaders } = useAuth();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Word and character count limits for Short FRQ (concise biological explanations)
  const MIN_WORDS_PER_PART = 15;   // Minimum words per part
  const MAX_WORDS_PER_PART = 100;  // Maximum words per part  
  const MAX_CHARS_PER_PART = 700;  // Maximum characters per part

  const STORAGE_KEY = `apbio-short-frq-${setId}-answers`;

  // Load saved answers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedAnswers = JSON.parse(saved);
        setAnswers(parsedAnswers);
      } catch (e) {
        console.error('Failed to load saved answers:', e);
      }
    }
  }, [STORAGE_KEY]);

  if (!frq) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Exam not found</h1>
          <button
            onClick={() => navigate('/ap-biology-practice-exam/short-frq')}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Back to Selection
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (part: string, value: string) => {
    setAnswers((prev) => {
      const updated = { ...prev, [part]: value };
      // Auto-save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmit = async () => {
    // Check authentication
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Validate all answers are filled
    const allFilled = frq.parts.every(part => answers[part.id]?.trim().length > 0);
    if (!allFilled) {
      setError('Please fill in all answer parts before grading.');
      return;
    }

    // Word and character count validation
    for (const part of frq.parts) {
      const ans = answers[part.id] || '';
      const wordCount = ans.trim().split(/\s+/).filter(Boolean).length;
      const charCount = ans.length;

      if (wordCount < MIN_WORDS_PER_PART) {
        setError(`${part.label}: Please write at least ${MIN_WORDS_PER_PART} words (currently ${wordCount} words).`);
        return;
      }
      if (wordCount > MAX_WORDS_PER_PART) {
        setError(`${part.label}: Please keep your answer under ${MAX_WORDS_PER_PART} words (currently ${wordCount} words).`);
        return;
      }
      if (charCount > MAX_CHARS_PER_PART) {
        setError(`${part.label}: Please keep your answer under ${MAX_CHARS_PER_PART} characters (currently ${charCount} characters).`);
        return;
      }
    }

    setGrading(true);
    setError(null);
    setGrades(null);

    try {
      const answersArray = frq.parts.map(part => answers[part.id] || "");
      const apiUrl = import.meta.env.DEV
        ? '/api/grade-apbio-frq'
        : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-apbio-frq';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          answers: answersArray,
          prompt_intro: frq.prompt
        })
      });

      if (response.status === 401) {
        setShowAuthModal(true);
        setError('Authentication required. Please sign in to continue.');
        setGrading(false);
        return;
      }

      if (response.status === 429) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.error || 'Daily limit reached: You can only grade 1 FRQ per day (across all AP courses). Please try again tomorrow.');
        setGrading(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to contact AI grading service.');
      }

      const data = await response.json();
      if (data.result && Array.isArray(data.result)) {
        setGrades(data.result);
        // Clear localStorage on successful grading
        localStorage.removeItem(STORAGE_KEY);
      } else {
        setError('Failed to parse grading results.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to contact AI grading service.');
    }
    setGrading(false);
  };

  return (
    <>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          // Retry grading if user was trying to grade
        }}
      />
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/ap-biology-practice-exam/short-frq')}
            className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
          >
            &larr; Back to Set Selection
          </button>
          <div className="flex flex-col md:flex-row justify-center items-start gap-8">
            {/* PDF Viewer */}
            <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col rounded-2xl border border-green-100">
              <h2 className="text-xl font-bold mb-4 text-center text-green-700">
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
                  className="underline text-green-600"
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
            <div className="flex-1 max-w-2xl p-6 flex flex-col items-center rounded-2xl bg-white shadow-lg border border-green-100">
              <h2 className="text-xl font-bold mb-4 text-center text-green-700">
                Your Answers
              </h2>
              {!isAuthenticated && (
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
                className="mb-4 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={grading || !isAuthenticated}
              >
                {grading ? 'Grading...' : 'SUBMIT'}
              </button>
              <div className="w-full space-y-6">
                {frq.parts.map((part) => {
                  const answer = answers[part.id] || '';
                  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
                  const charCount = answer.length;
                  const wordExceeded = wordCount > MAX_WORDS_PER_PART;
                  const wordInsufficient = wordCount > 0 && wordCount < MIN_WORDS_PER_PART;
                  const charExceeded = charCount > MAX_CHARS_PER_PART;

                  return (
                    <div key={part.id} className="w-full">
                      <label className="block font-semibold mb-2 text-slate-700">{part.label}</label>
                      <textarea
                        className="w-full min-h-[120px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        value={answer}
                        onChange={e => handleChange(part.id, e.target.value)}
                        placeholder={`Type your answer for ${part.label} here...`}
                        disabled={grading}
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span className={wordInsufficient ? 'text-orange-600 font-semibold' : wordExceeded ? 'text-red-600 font-semibold' : wordCount >= MIN_WORDS_PER_PART ? 'text-green-600' : 'text-slate-500'}>
                          {wordCount} / {MAX_WORDS_PER_PART} words {wordInsufficient && `(min ${MIN_WORDS_PER_PART})`}
                        </span>
                        <span className={charExceeded ? 'text-red-600 font-semibold' : 'text-slate-500'}>
                          {charCount} / {MAX_CHARS_PER_PART} characters
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {error && (
                <div className="mt-6 w-full bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                  <strong>Error:</strong> {error}
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
                        <strong>{frq.parts[i]?.label}:</strong> Score: {g.score || 'N/A'}/1 - {g.explanation || JSON.stringify(g)}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-green-300">
                    <strong className="text-green-900">
                      Total: {grades.reduce((sum, g) => sum + (g.score || 0), 0)}/{grades.length}
                    </strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default APBiologyShortFRQ;
