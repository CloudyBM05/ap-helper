import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';

const ARGUMENT_SETS = [
  {
    id: 1,
    label: '2025 Argumentative Essay Set 1',
    file: 'APGOV-2025AE1.pdf',
    description: 'Practice AP Gov Argumentative Essay. Set 1.'
  },
  {
    id: 2,
    label: '2025 Argumentative Essay Set 2',
    file: 'APGOV-2025AE2.pdf',
    description: 'Practice AP Gov Argumentative Essay. Set 2.'
  }
];

const AI_PROMPTS: Record<string, string> = {
  '1': `Grade an AP Gov Argument Essay (FRQ #4) — BE VERY STRICT\nPrompt:\nSocial media has changed the way many Americans communicate about politics.\nDevelop an argument about whether the use of social media has helped or hindered participatory democracy.\nUse at least one piece of evidence from one of the following:\n\nFirst Amendment\n\nFederalist No. 10\n\n“Letter from a Birmingham Jail”\n\n\ud83d\udccb Scoring Instructions (Max 6 points):\nRow A — Claim/Thesis (0–1 pt)\n\nDefensible claim that responds to the prompt and establishes a line of reasoning.\n\nRow B — Evidence (0–3 pts)\n\n1 pt: One relevant piece of evidence.\n\n2 pts: Two relevant pieces OR one specific & relevant piece that supports the claim.\n\n3 pts: Two specific and relevant pieces of evidence that support the claim.\n  One must be from a required document.\n\nRow C — Reasoning (0–1 pt)\n\nUses reasoning (e.g., causation, comparison) to explain how/why evidence supports the claim.\n\nRow D — Alternate Perspective (0–1 pt)\n\nIdentifies AND rebut/refutes an opposing perspective.\n (Must have earned the thesis point in Row A to get this.)\n\nScoring Instructions:\n\nScore each part independently.\n\nGive a brief justification per response, based on accuracy and AP standards.`,
  '2': `Grade an AP Gov Argument Essay (FRQ #4) — BE VERY STRICT\nPrompt:\nThere is continued debate over how to best preserve the democratic ideal of limited government.\nDevelop an argument about whether an elected legislature or an independent judiciary is more effective in preserving limited government.\nUse at least one piece of evidence from one of the following:\n\nFederalist No. 51\n\nFederalist No. 78\n\nArticle I of the Constitution\n\n\ud83d\udccb Scoring Instructions (Max 6 points):\nRow A — Claim/Thesis (0–1 pt)\n\nMust make a defensible claim answering the prompt and establish a line of reasoning.\n\nRow B — Evidence (0–3 pts)\n\n1 pt: One relevant piece of evidence.\n\n2 pts: Two relevant pieces or one specific and relevant piece that supports the claim.\n\n3 pts: Two specific and relevant pieces that support the claim. One must come from a required document.\n\nRow C — Reasoning (0–1 pt)\n\nExplains how/why evidence supports the claim using reasoning (e.g., causation, comparison, principle of limited gov).\n\nRow D — Alternate Perspective (0–1 pt)\n\nIdentifies and refutes/rebuts an opposing view. (Requires a valid thesis in Row A.)\nScoring Instructions:\n\nScore each part independently.\n\nGive a brief justification per response, based on accuracy and AP standards.`
};

const APGovArgumentativeEssay: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, getAuthHeaders } = useAuth();
  const set = ARGUMENT_SETS.find(s => String(s.id) === setId) || ARGUMENT_SETS[0];
  const [response, setResponse] = useState('');
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const STORAGE_KEY = `apgov-argumentative-essay-set${set.id}-answer`;
  
  // Word and character count limits for Argumentative Essay
  const MIN_WORDS = 150;
  const MAX_WORDS = 600;
  const MAX_CHARS = 4000;

  // Load saved answer from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setResponse(saved);
      } catch (e) {
        console.error('Failed to load saved answer:', e);
      }
    }
  }, [STORAGE_KEY]);

  const handleSubmit = async () => {
    // Check authentication
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Validate answer is filled
    if (!response.trim()) {
      setError('Please write your essay before submitting.');
      return;
    }

    // Word count validation
    const wordCount = response.trim().split(/\s+/).length;
    if (wordCount < MIN_WORDS) {
      setError(`Your essay is too short. Please write at least ${MIN_WORDS} words. Current: ${wordCount} words.`);
      return;
    }
    if (wordCount > MAX_WORDS) {
      setError(`Your essay exceeds the maximum length. Please keep it under ${MAX_WORDS} words. Current: ${wordCount} words.`);
      return;
    }

    // Character count validation
    if (response.length > MAX_CHARS) {
      setError(`Your essay exceeds the maximum character limit. Please reduce to under ${MAX_CHARS} characters.`);
      return;
    }

    setGrading(true);
    setError(null);
    setGrades(null);

    try {
      const aiPrompt = AI_PROMPTS[String(set.id)] || AI_PROMPTS['1'];
      const apiUrl = import.meta.env.DEV
        ? '/api/grade-apgov'
        : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-apgov';
      const answers = [response];
      
      const responseApi = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          answers,
          prompt_intro: aiPrompt,
          sources: '',
          questions: ''
        })
      });

      if (!responseApi.ok) {
        const errorData = await responseApi.json();
        if (responseApi.status === 429) {
          throw new Error(errorData.error || 'Daily limit reached. You can submit 1 assignment for AI grading per day.');
        }
        throw new Error(errorData.error || 'Failed to contact AI grading service.');
      }

      const data = await responseApi.json();
      let parsed = [];
      try {
        parsed = data.result;
      } catch {
        setError('Failed to contact AI grading service.');
        setGrading(false);
        return;
      }
      
      setGrades(parsed);
      
      // Clear saved answer after successful grading
      localStorage.removeItem(STORAGE_KEY);
    } catch (err: any) {
      setError(err.message || 'Unknown error.');
    }
    setGrading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
        }}
      />
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/ap-gov-practice-exam/argumentative-essay')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          &larr; Back to Set Selection
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* PDF Viewer */}
          <div className="flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-center">
              {set.label}
            </h2>
            <iframe
              src={`${import.meta.env.BASE_URL}${set.file}`}
              title={set.label}
              className="w-full flex-1 min-h-[1000px] border rounded-lg"
            />
            <div className="text-xs text-slate-500 mt-2 text-center">
              If the PDF does not load,{' '}
              <a
                href={`${import.meta.env.BASE_URL}${set.file}`}
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
          {/* Argumentative Essay Response */}
          <div className="flex-1 max-w-2xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center">
              Your Response
            </h2>
            <textarea
              className="w-full min-h-[300px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-2"
              value={response}
              onChange={e => {
                const newValue = e.target.value;
                setResponse(newValue);
                localStorage.setItem(STORAGE_KEY, newValue);
              }}
              placeholder="Type your argumentative essay here..."
              disabled={grading}
            />
            <div className='w-full space-y-1 mb-4'>
              {(() => {
                const wordCount = response.trim() ? response.trim().split(/\s+/).length : 0;
                const charCount = response.length;
                const isUnderMin = wordCount > 0 && wordCount < MIN_WORDS;
                const isOverMaxWords = wordCount > MAX_WORDS;
                const isOverMaxChars = charCount > MAX_CHARS;
                
                return (
                  <>
                    <div className={`text-sm ${isOverMaxWords ? 'text-red-600 font-semibold' : isUnderMin ? 'text-orange-600' : 'text-slate-600'}`}>
                      Word count: {wordCount}
                      <span className='ml-2 text-slate-500'>
                        (Min: {MIN_WORDS} | Max: {MAX_WORDS})
                      </span>
                      {isOverMaxWords && <span className='ml-2'>⚠️ Exceeds maximum word count</span>}
                      {isUnderMin && <span className='ml-2'>⚠️ Below minimum word count</span>}
                    </div>
                    <div className={`text-sm ${isOverMaxChars ? 'text-red-600 font-semibold' : 'text-slate-600'}`}>
                      Character count: {charCount}
                      <span className='ml-2 text-slate-500'>
                        (Max: {MAX_CHARS})
                      </span>
                      {isOverMaxChars && <span className='ml-2'>⚠️ Exceeds maximum character limit</span>}
                    </div>
                  </>
                );
              })()}
            </div>
            <button
              className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
              onClick={handleSubmit}
              disabled={grading}
            >
              {grading ? 'Grading...' : 'SUBMIT'}
            </button>
            {error && (
              <div className={`mt-6 w-full font-semibold ${error.includes('Daily limit') ? 'text-orange-600 bg-orange-50 border border-orange-200 rounded-lg p-4' : 'text-red-600'}`}>
                {error.includes('Daily limit') && (
                  <div className='flex items-center mb-2'>
                    <span className='text-orange-500 mr-2'>⏰</span>
                    <span className='font-bold'>Rate Limit Reached</span>
                  </div>
                )}
                {error}
                {error.includes('Daily limit') && (
                  <div className='mt-2 text-sm text-orange-700'>
                    This helps keep the service available for everyone. Try again tomorrow!
                  </div>
                )}
              </div>
            )}
            {grades && (
              <div className="mt-8 w-full bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2 text-green-700">
                  AI Grading Results
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {grades.map((g, i) => (
                    <li key={i} className="text-green-900">
                      {typeof g === 'string' ? g : JSON.stringify(g)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APGovArgumentativeEssay;
