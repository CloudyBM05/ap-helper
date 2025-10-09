import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';

const FRQ_CONTENT = {
  title: 'Collegeboard 2025 Spatial Relationships Set 1',
  description: 'Answer all parts (A–G) of the following AP Human Geography Spatial Relationships & Data Interpretation. Each part tests a different concept. Written responses are AI-graded.',
  pdf: '/APHUG-Data1.pdf',
};

const PARTS = [
  { id: 'A', label: 'Part A' },
  { id: 'B', label: 'Part B' },
  { id: 'C', label: 'Part C' },
  { id: 'D', label: 'Part D' },
  { id: 'E', label: 'Part E' },
  { id: 'F', label: 'Part F' },
  { id: 'G', label: 'Part G' },
];

const GRADING_PROMPT = `Grade each part A–G = 1 pt. No partial. Use format: A. 1/1 – [justification ≤15 words].\nAward only if response fully matches criteria. Otherwise, 0/1. GRADE STRICT`;
const CRITERIA = [
  'A. Identifies recent low/declining fertility trend via pyramid\'s narrow base.',
  'B. States females outnumber males in age 80+ cohort.',
  'C. Names and describes urbanization process (e.g., rural-to-urban migration, industrialization).',
  'D. Names factor lowering MDC population (e.g., aging, low fertility, emigration).',
  'E. Explains how pyramid predicts future needs (e.g., elderly care, schools, workforce).',
  'F. Explains pyramid lacks immigration data—shows only age/sex, not nativity.',
  'G. States degree (low/moderate/high) and explains pronatalist impact on population growth.',
];

const APHumanGeographySpatialRelationshipsSet1 = () => {
  const navigate = useNavigate();
  const { user, getAuthHeaders } = useAuth();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [wordCounts, setWordCounts] = useState<{ [key: string]: number }>({});
  const [charCounts, setCharCounts] = useState<{ [key: string]: number }>({});
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('aphug-spatial-relationships-set1');
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
      localStorage.setItem('aphug-spatial-relationships-set1', JSON.stringify(answers));
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
    if (chars > 500) {
      validationError = 'Character limit exceeded (500 max)';
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
      } else if (words > 60) {
        errors[part.id] = 'Too long (max 60 words)';
        hasError = true;
      } else if (chars > 500) {
        errors[part.id] = 'Character limit exceeded (500 max)';
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
      const answersArray = PARTS.map(part => answers[part.id] || "");
      const apiUrl = import.meta.env.DEV
        ? '/api/grade-aphug-frq'
        : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-aphug-frq';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          answers: answersArray,
          prompt_intro: GRADING_PROMPT,
          criteria: CRITERIA,
          sources: '',
          questions: ''
        })
      });
      if (response.status === 429) {
        const errorData = await response.json();
        setError(errorData.error || 'Daily usage limit reached. Please try again tomorrow.');
        setGrading(false);
        return;
      }
      if (!response.ok) {
        throw new Error('Failed to contact AI grading service.');
      }
      const data = await response.json();
      // Defensive: always set grades as array
      let result = data.result;
      if (Array.isArray(result)) {
        setGrades(result);
      } else if (typeof result === 'string') {
        // Split by newlines if possible
        setGrades(result.split(/\r?\n/).filter((line) => line.trim() !== ''));
      } else {
        setGrades(["Grading failed: Unexpected response format."]);
      }
    } catch (err) {
      setError('Failed to contact AI grading service.');
    }
    setGrading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/ap-human-geography-practice-exam/spatial-relationships')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          &larr; Back to Set Selection
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col rounded-2xl border border-emerald-100">
            <h2 className="text-xl font-bold mb-4 text-center text-emerald-700">
              {FRQ_CONTENT.title}
            </h2>
            <p className="mb-4 text-slate-600 text-center">{FRQ_CONTENT.description}</p>
            <iframe
              src={FRQ_CONTENT.pdf}
              title={FRQ_CONTENT.title}
              className="w-full min-h-[1000px] border rounded-lg"
              style={{ border: 'none', minHeight: '1000px' }}
            />
            <div className="text-xs text-slate-500 mt-2 text-center">
              If the PDF does not load,{' '}
              <a
                href={FRQ_CONTENT.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-emerald-600"
              >
                click here to open in a new tab
              </a>
              .
            </div>
          </div>
          <div className="flex-1 max-w-2xl p-6 flex flex-col items-center rounded-2xl bg-white shadow-lg border border-emerald-100">
            <h2 className="text-xl font-bold mb-4 text-center text-emerald-700">
              Your Answers
            </h2>
            <>
              <button
                className="mb-4 px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold shadow hover:bg-emerald-700 transition"
                onClick={handleSubmit}
                disabled={grading}
              >
                {grading ? 'Grading...' : 'SUBMIT'}
              </button>
              <div className="w-full space-y-6">
                {PARTS.map((part) => {
                  const wordCount = wordCounts[part.id] || 0;
                  const charCount = charCounts[part.id] || 0;
                  const validationError = validationErrors[part.id];
                  const isValid = wordCount >= 10 && wordCount <= 60 && charCount <= 500;
                  const borderColor = !answers[part.id] 
                    ? 'border-slate-300' 
                    : validationError 
                      ? 'border-red-400'
                      : isValid 
                        ? 'border-green-400'
                        : 'border-yellow-400';
                  
                  return (
                    <div key={part.id} className="w-full">
                      <label className="block font-semibold mb-2 text-slate-700">{part.label}</label>
                      <textarea
                        className={`w-full min-h-[120px] border ${borderColor} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition`}
                        value={answers[part.id] || ''}
                        onChange={(e) => handleChange(part.id, e.target.value)}
                        placeholder={`Type your answer for ${part.label} here...`}
                        disabled={grading}
                      />
                      <div className="mt-1 text-sm flex justify-between items-center">
                        <span className={wordCount < 10 ? 'text-red-500' : wordCount > 60 ? 'text-orange-500' : 'text-green-600'}>
                          Words: {wordCount}/60 (min: 10)
                        </span>
                        <span className={charCount > 500 ? 'text-red-500' : 'text-slate-500'}>
                          Characters: {charCount}/500
                        </span>
                      </div>
                      {validationError && (
                        <div className="mt-1 text-sm text-red-600 font-semibold">{validationError}</div>
                      )}
                    </div>
                  );
                })}
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
          </div>
        </div>
      </div>
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
};

export default APHumanGeographySpatialRelationshipsSet1;
