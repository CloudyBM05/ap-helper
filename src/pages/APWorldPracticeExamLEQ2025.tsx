import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const APWorldPracticeExamLEQ2025: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const set = searchParams.get('set');
  const pdf = searchParams.get('pdf');
  const question = searchParams.get('question');
  const { isAuthenticated, getAuthHeaders } = useAuth();
  const [answer, setAnswer] = useState('');
  const [grading, setGrading] = useState(false);
  const [grade, setGrade] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const STORAGE_KEY = `apworld-leq-2025-${set}-q${question}-answer`;
  
  // Word count limits for LEQ
  const MIN_WORDS = 200;  // Minimum for a reasonable LEQ
  const MAX_WORDS = 1000; // Maximum to prevent spam
  const MAX_CHARACTERS = 6000; // Maximum characters to prevent token abuse

  // Load saved answer from localStorage on mount or question change
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setAnswer(saved);
      } catch (e) {
        console.error('Failed to load saved answer:', e);
      }
    }
  }, [set, question, STORAGE_KEY]);

  // Helper function to count words
  const countWords = (text: string): number => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const wordCount = countWords(answer);

  const getPrompt = () => {
    if (set === 'set1' && searchParams.get('question') === '2') {
      return `You are a strict AP World History teacher using the official LEQ rubric. Grade the following essay out of 6 points. Use the rubric below. Be strict: do not award points unless the response clearly meets the standard.\nA. Thesis (0–1 pt):\n Gives a historically defensible thesis with a line of reasoning. Must be in intro or conclusion.\nB. Context (0–1 pt):\n Describes broader relevant historical context (before/during/after prompt timeframe). Not just a phrase.\nC. Evidence (0–2 pts):\n 1 pt: Cites specific, relevant historical evidence.\n 2 pts: Uses that evidence to support the argument.\nD. Analysis/Reasoning (0–2 pts):\n 1 pt: Uses historical reasoning (comparison, causation, or continuity/change).\n 2 pts: Shows complex understanding (e.g., nuance, multiple variables, corroboration, qualification).\nNow grade this LEQ. For each category, give a score based off how many points the section is worth and a brief justification.\nLEQ Prompt:\n In the period circa 1200–1450, Buddhism, Hinduism, and Confucianism included ideas about social structures, gender roles, and political authority that influenced societies across Asia. Develop an argument that evaluates the extent to which one or more of these belief systems shaped societies and/or political systems in Asia during this period.`;
    } else if (set === 'set1' && searchParams.get('question') === '3') {
      return `You are a strict AP World History teacher using the official LEQ rubric. Grade the following essay out of 6 points. Use the rubric below. Be strict: do not award points unless the response clearly meets the standard.\nA. Thesis (0–1 pt):\n Gives a historically defensible thesis with a line of reasoning. Must be in intro or conclusion.\nB. Context (0–1 pt):\n Describes broader relevant historical context (before/during/after prompt timeframe). Not just a phrase.\nC. Evidence (0–2 pts):\n 1 pt: Cites specific, relevant historical evidence.\n 2 pts: Uses that evidence to support the argument.\nD. Analysis/Reasoning (0–2 pts):\n 1 pt: Uses historical reasoning (comparison, causation, or continuity/change).\n 2 pts: Shows complex understanding (e.g., nuance, multiple variables, corroboration, qualification).\nNow grade this LEQ. For each category, give a score based off how many points the section is worth and a brief justification.\nLEQ Prompt:\n In the period circa 1450 to 1750, economic, political, and religious rivalries led many imperial states around the world to expand their territories and influence. Develop an argument that evaluates the extent to which economic rivalries were the primary motivation for the expansion of European empires during this period.`;
    } else if (set === 'set1' && searchParams.get('question') === '4') {
      return `You are a strict AP World History teacher using the official LEQ rubric. Grade the following essay out of 6 points. Use the rubric below. Be strict: do not award points unless the response clearly meets the standard.\nA. Thesis (0–1 pt):\nGives a historically defensible thesis with a line of reasoning. Must be in intro or conclusion.\nB. Context (0–1 pt):\nDescribes broader relevant historical context (before/during/after prompt timeframe). Not just a phrase.\nC. Evidence (0–2 pts):\n1 pt: Cites specific, relevant historical evidence.\n2 pts: Uses that evidence to support the argument.\nD. Analysis/Reasoning (0–2 pts):\n1 pt: Uses historical reasoning (comparison, causation, or continuity/change).\n2 pts: Shows complex understanding (e.g., nuance, multiple variables, corroboration, qualification).\nNow grade this LEQ. For each category, give a score based off how many points the section is worth and a brief justification.\nLEQ Prompt:\nDuring the twentieth century, medical and scientific discoveries affected life expectancies, access to resources, and social and economic structures, which reshaped individual lives as well as entire societies. Develop an argument that evaluates the extent to which medical and scientific discoveries benefited individuals and/or societies during this period.`;
    } else if (set === 'set2' && searchParams.get('question') === '2') {
      return `You are a strict AP World History teacher using the official LEQ rubric. Grade the following essay out of 6 points. Use the rubric below. Be strict: do not award points unless the response clearly meets the standard.\nA. Thesis (0–1 pt):\n Gives a historically defensible thesis with a line of reasoning. Must be in intro or conclusion.\nB. Context (0–1 pt):\n Describes broader relevant historical context (before/during/after prompt timeframe). Not just a phrase.\nC. Evidence (0–2 pts):\n 1 pt: Cites specific, relevant historical evidence.\n 2 pts: Uses that evidence to support the argument.\nD. Analysis/Reasoning (0–2 pts):\n 1 pt: Uses historical reasoning (comparison, causation, or continuity/change).\n 2 pts: Shows complex understanding (e.g., nuance, multiple variables, corroboration, qualification).\nNow grade this LEQ. For each category, give a score based off how many points the section is worth and a brief justification.\nLEQ Prompt:\n In the period circa 1450 to 1750, new connections between world regions led to the movement or transfer of people, animals, plants, and pathogens. Develop an argument that evaluates the extent to which such movements or transfers led to demographic, cultural, or social changes across the Atlantic region during this period.`;
    } else if (set === 'set2' && searchParams.get('question') === '3') {
      return `You are a strict AP World History teacher using the official LEQ rubric. Grade the following essay out of 6 points. Use the rubric below. Be strict: do not award points unless the response clearly meets the standard.\nA. Thesis (0–1 pt):\n Gives a historically defensible thesis with a line of reasoning. Must be in intro or conclusion.\nB. Context (0–1 pt):\n Describes broader relevant historical context (before/during/after prompt timeframe). Not just a phrase.\nC. Evidence (0–2 pts):\n 1 pt: Cites specific, relevant historical evidence.\n 2 pts: Uses that evidence to support the argument.\nD. Analysis/Reasoning (0–2 pts):\n 1 pt: Uses historical reasoning (comparison, causation, or continuity/change).\n 2 pts: Shows complex understanding (e.g., nuance, multiple variables, corroboration, qualification).\nNow grade this LEQ. For each category, give a score based off how many points the section is worth and a brief justification.\nLEQ Prompt:\n During the eighteenth century, Enlightenment philosophers developed new ideas about individual rights and the role of governments. Develop an argument that evaluates the extent to which Enlightenment ideas encouraged movements for political change and/or social reform during the period circa 1750 to 1900.`;
    } else if (set === 'set2' && searchParams.get('question') === '4') {
      return `You are a strict AP World History teacher using the official LEQ rubric. Grade the following essay out of 6 points. Use the rubric below. Be strict: do not award points unless the response clearly meets the standard.\nA. Thesis (0–1 pt):\n Gives a historically defensible thesis with a line of reasoning. Must be in intro or conclusion.\nB. Context (0–1 pt):\n Describes broader relevant historical context (before/during/after prompt timeframe). Not just a phrase.\nC. Evidence (0–2 pts):\n 1 pt: Cites specific, relevant historical evidence.\n 2 pts: Uses that evidence to support the argument.\nD. Analysis/Reasoning (0–2 pts):\n 1 pt: Uses historical reasoning (comparison, causation, or continuity/change).\n 2 pts: Shows complex understanding (e.g., nuance, multiple variables, corroboration, qualification).\nNow grade this LEQ. For each category, give a score based off how many points the section is worth and a brief justification.\nLEQ Prompt:\n During the twentieth century, competing political and economic interests along with intense nationalism contributed to global conflicts. Develop an argument that evaluates the extent to which nationalism was the most important factor contributing to global conflict during this period.`;
    } else if (set === 'set1') {
      return `Grade an AP World LEQ — BE VERY STRICT\nPrompt: Answer question 2, 3, or 4 from the provided LEQ set.\nScoring: Use the official AP World LEQ rubric. Award points only if the response fully meets criteria — no partial credit, no leniency.\nLEQ PDF: APWorld-pt1LEQ.pdf`;
    } else if (set === 'set2') {
      return `Grade an AP World LEQ — BE VERY STRICT\nPrompt: Answer question 2, 3, or 4 from the provided LEQ set.\nScoring: Use the official AP World LEQ rubric. Award points only if the response fully meets criteria — no partial credit, no leniency.\nLEQ PDF: APWorld-pt2LEQ.pdf`;
    }
    return 'Grade an AP World LEQ using the official rubric.';
  };

  const handleBackClick = () => {
    navigate('/apworld-practice-exam/leq/select');
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setError('Please write an essay before submitting.');
      return;
    }

    // Check word count
    const currentWordCount = countWords(answer);
    if (currentWordCount < MIN_WORDS) {
      setError(`Your essay is too short. Minimum ${MIN_WORDS} words required (you have ${currentWordCount} words).`);
      return;
    }
    if (currentWordCount > MAX_WORDS) {
      setError(`Your essay is too long. Maximum ${MAX_WORDS} words allowed (you have ${currentWordCount} words).`);
      return;
    }

    // Check character count to prevent token abuse
    const characterCount = answer.trim().length;
    if (characterCount > MAX_CHARACTERS) {
      setError(`Your essay is too long. Maximum ${MAX_CHARACTERS} characters allowed (you have ${characterCount} characters).`);
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      setError('Please log in to use AI grading. Click the "Login" button in the navigation bar.');
      return;
    }
    
    setGrading(true);
    setError(null);
    setGrade(null);
    const prompt_intro = getPrompt();
    const apiUrl = import.meta.env.DEV
      ? '/api/grade-leq'
      : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-leq';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ answer, prompt_intro }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          throw new Error(errorData.error || 'Daily limit reached. You can submit 1 FRQ for AI grading per day.');
        }
        if (response.status === 401) {
          setError('Please log in to use AI grading. Click the "Login" button in the navigation bar.');
          return;
        }
        throw new Error(errorData.error || 'An unknown error occurred.');
      }
      
      const data = await response.json();
      if (data && data.grade) {
        setGrade(data.grade);
        // Clear saved answer after successful grading
        localStorage.removeItem(STORAGE_KEY);
      } else {
        setError('Failed to contact AI grading service.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to contact AI grading service.');
    } finally {
      setGrading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={handleBackClick}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition"
        >
          &larr; Back to LEQ Selection
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* PDF Viewer */}
          <div className="flex-1 bg-white shadow-lg p-6 flex flex-col min-w-[400px] max-w-5xl">
            <h2 className="text-xl font-bold mb-4 text-center text-green-700">
              AP World LEQ 2025 - {set === 'set1' ? 'Set 1' : 'Set 2'}
            </h2>
            {pdf ? (
              <iframe
                src={pdf}
                title={`AP World LEQ PDF - ${set}`}
                className="w-full flex-1 min-h-[800px] border rounded-lg"
              />
            ) : (
              <div className="text-center p-8">PDF not available for this set yet.</div>
            )}
            <div className="text-xs text-slate-500 mt-2 text-center">
              If the PDF does not load,{' '}
              <a
                href={pdf || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-green-600"
              >
                click here to open in a new tab
              </a>
              .
            </div>
          </div>
          {/* LEQ Answer */}
          <div className="flex-1 max-w-2xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center text-green-800">
              Your LEQ Answer
            </h2>
            <textarea
              className="w-full min-h-[500px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                // Save to localStorage immediately as user types
                localStorage.setItem(STORAGE_KEY, e.target.value);
              }}
              placeholder="Type your LEQ essay here..."
              disabled={grading}
            />
            <div className='w-full mt-2 text-sm text-slate-600'>
              <div>
                Word count: {wordCount}
                <span className='ml-2 text-slate-500'>(Min: {MIN_WORDS} | Max: {MAX_WORDS})</span>
              </div>
              <div className='mt-1'>
                Character count: {answer.trim().length}
                <span className='ml-2 text-slate-500'>(Max: {MAX_CHARACTERS})</span>
              </div>
            </div>
            <button
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
              onClick={handleSubmit}
              disabled={!answer.trim() || grading}
            >
              {grading ? 'Grading...' : 'SUBMIT FOR AI GRADE'}
            </button>
            {error && (
              <div className="mt-6 text-red-600 font-semibold">{error}</div>
            )}
            {grade && (
              <div className="mt-8 w-full bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-2 text-green-700">
                  AI Grading Results
                </h3>
                <p className="whitespace-pre-wrap">{grade}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APWorldPracticeExamLEQ2025;
