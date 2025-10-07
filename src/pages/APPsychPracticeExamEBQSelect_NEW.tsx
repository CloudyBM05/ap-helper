import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';

const ebqSets = [
  {
    id: 1,
    label: 'Collegeboard 2025 Set 1',
    description: 'Official College Board Evidence-Based Question Set 1',
    pdf: '/APPSY-EBQ1.pdf',
    route: '/ap-psychology-practice-exam/ebq/2025-set-1',
  },
  {
    id: 2,
    label: 'Collegeboard 2025 Set 2',
    description: 'Official College Board Evidence-Based Question Set 2',
    pdf: '/APPSY-EBQ2.pdf',
    route: '/ap-psychology-practice-exam/ebq/2025-set-2',
  },
];

const APPsychPracticeExamEBQSelect = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getAuthHeaders } = useAuth();
  const [selectedSet, setSelectedSet] = useState<number | null>(null);
  const [ebqAnswers, setEbqAnswers] = useState(['', '', '']);
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState<string | null>(null);
  const [gradeError, setGradeError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Word and character count limits for EBQ (A, B, C - 3 parts, subparts  require detailed evidence + explanation)
  const MIN_WORDS_PER_PART = 15;
  const MAX_WORDS_PER_PART = 150;
  const MAX_CHARS_PER_PART = 1000;

  // localStorage key based on selected set
  const STORAGE_KEY = selectedSet ? `appsych-ebq-set${selectedSet}-answers` : '';

  // Load saved answers from localStorage when set is selected
  useEffect(() => {
    if (selectedSet && STORAGE_KEY) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsedAnswers = JSON.parse(saved);
          if (Array.isArray(parsedAnswers) && parsedAnswers.length === 3) {
            setEbqAnswers(parsedAnswers);
          }
        } catch (e) {
          console.error('Failed to load saved answers:', e);
        }
      }
    }
  }, [selectedSet, STORAGE_KEY]);

  const handleEBQAnswerChange = (idx: number, value: string) => {
    setEbqAnswers((prev) => {
      const copy = [...prev];
      copy[idx] = value;
      // Auto-save to localStorage
      if (STORAGE_KEY) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
      }
      return copy;
    });
  };

  const handleEBQGrade = async () => {
    // Check authentication
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Validate all answers
    const allFilled = ebqAnswers.every(ans => ans.trim().length > 0);
    if (!allFilled) {
      setGradeError('Please fill in all answer parts (A, B, C) before grading.');
      return;
    }

    // Validate word and character counts
    for (let i = 0; i < ebqAnswers.length; i++) {
      const ans = ebqAnswers[i].trim();
      const wordCount = ans.split(/\s+/).filter(Boolean).length;
      const charCount = ans.length;

      if (wordCount < MIN_WORDS_PER_PART) {
        setGradeError(`Part ${String.fromCharCode(65 + i)}: Please write at least ${MIN_WORDS_PER_PART} words (currently ${wordCount} words).`);
        return;
      }
      if (wordCount > MAX_WORDS_PER_PART) {
        setGradeError(`Part ${String.fromCharCode(65 + i)}: Please keep your answer under ${MAX_WORDS_PER_PART} words (currently ${wordCount} words).`);
        return;
      }
      if (charCount > MAX_CHARS_PER_PART) {
        setGradeError(`Part ${String.fromCharCode(65 + i)}: Please keep your answer under ${MAX_CHARS_PER_PART} characters (currently ${charCount} characters).`);
        return;
      }
    }

    // Check daily usage limit for AP Psych FRQs (1 per day across all types)
    const today = new Date().toISOString().split('T')[0];
    const usageKey = 'appsych-frq-last-graded';
    const lastGraded = localStorage.getItem(usageKey);
    
    if (lastGraded === today) {
      setGradeError('Daily limit reached: You can only grade 1 AP Psychology FRQ per day (across all FRQ types: AAQ, EBQ). Please try again tomorrow.');
      return;
    }

    setGrading(true);
    setGradeError(null);
    setGradeResult(null);
    let prompt_intro = '';
    if (selectedSet === 1) {
      prompt_intro = `You are a strict AP Psychology grader. Grade the following response to Question 2 (the Evidence-Based Free Response Question) from the 2025 AP Psychology Exam. Use the official FRQ rubric.\n\nGrade each part:\n\nA: 1 point for a specific, defensible claim based in psychological science.\n\nB(i): 1 point for specific, relevant evidence from one source.\n\nB(ii): 1 point for correct explanation using a relevant psychological concept.\n\nC(i): 1 point for specific, relevant evidence from a different source than B(i).\n\nC(ii): 1 point for correct explanation using a different psychological concept than B(ii).\n\nFor each subpart, award the point only if the response is fully correct, clearly explained, and uses appropriate psychological terminology.\nDo not award points for vague, unsupported, or conceptually inaccurate answers.\nFor Parts B and C, confirm that the correct source is cited (by number or embedded).\nAfter scoring, provide a brief explanation per point (e.g., "Point earned: explanation is clear and uses social facilitation"), then give a total score out of 5.\nDo not give feedback or suggestions.\n\nCompressed Source Summary:\nSource 1 (Markus, 1978):\n45 men were timed while dressing in unfamiliar clothing (lab coat, socks, shoes) under 3 conditions: alone, watched by a confederate (audience), or near a non-watching confederate (incidental audience).\n\nWell-learned tasks (e.g., removing shoes) were done faster with audience present.\n\nNew/difficult tasks (e.g., tying lab coat) were done slower with audience.\n\nShows social facilitation and impairment depending on task type.\n\nSource 2 (Huguet et al., 2014):\n11 baboons did touchscreen operant conditioning trials.\n\nIn conflict trials, male baboons had slower response times when high-ranking males were present.\n\nPerformance was worse with social presence, especially under stress.\n\nSuggests social interference under pressure and hierarchy.\n\nSource 3 (Claypoole et al., 2019):\n132 undergrads did a vigilance task (monitoring numbers) for 24 minutes.\n\nParticipants with electronic or evaluative observers detected more correct targets.\n\nNo difference between alone and non-evaluative presence.\n\nSuggests social evaluation improves vigilance.\n\n Prompt:\nA. Propose a specific and defensible claim based in psychological science that responds to the question:\n"Does the presence of others improve performance?"\n\nB.\ni. Support your claim with specific, relevant evidence from one source.\nii. Explain how the evidence supports your claim using a psychological theory or concept.\n\nC.\ni. Support your claim with specific, relevant evidence from a different source than in B.\nii. Explain how this second piece of evidence supports your claim using a different psychological theory or concept than in B(ii).`;
    } else if (selectedSet === 2) {
      prompt_intro = `You are a strict AP Psychology grader. Grade the following response to Question 2 (the Evidence-Based Free Response Question) from the 2025 AP Psychology Exam. Use the official FRQ rubric.\n\nGrade each part:\n\nA: 1 point for a specific, defensible claim based in psychological science.\n\nB(i): 1 point for specific, relevant evidence from one source.\n\nB(ii): 1 point for correct explanation using a relevant psychological concept.\n\nC(i): 1 point for specific, relevant evidence from a different source than B(i).\n\nC(ii): 1 point for correct explanation using a different psychological concept than B(ii).\n\nFor each subpart, award the point only if the response is fully correct, clearly explained, and uses appropriate psychological terminology.\n\nDo not award points for vague, unsupported, or conceptually inaccurate answers.\n\nFor Parts B and C, confirm that the correct source is cited (by number or embedded).\n\nAfter scoring, provide a brief explanation per point (e.g., "Point earned: explanation is clear and uses social facilitation"), then give a total score out of 5.\n\nDo not give feedback or suggestions.\n\nCompressed Source Summary:\n\nSource 1 (Markus, 1978):\n45 men timed dressing in unfamiliar clothes in 3 conditions (alone, observed, incidental audience).\n\nFaster on well-learned tasks when watched (social facilitation).\n\nSlower on difficult tasks when watched (social impairment).\n\nSource 2 (Huguet et al., 2014):\n11 baboons did touchscreen tasks.\n\nSlower performance in presence of dominant baboons (especially under conflict).\n\nShows social interference from hierarchy and pressure.\n\nSource 3 (Claypoole et al., 2019):\n132 students did vigilance tasks.\n\nEvaluative observers improved performance.\n\nNon-evaluative presence = no effect.\n\nShows social evaluation enhances vigilance.\n\nPrompt:\nA. Propose a specific and defensible claim based in psychological science that responds to the question:\n"Does the presence of others improve performance?"\n\nB.\ni. Support your claim with specific, relevant evidence from one source.\nii. Explain how the evidence supports your claim using a psychological theory or concept.\n\nC.\ni. Support your claim with specific, relevant evidence from a different source than in B.\nii. Explain how this second piece of evidence supports your claim using a different psychological theory or concept than in B(ii).`;
    }
    try {
      const authHeaders = getAuthHeaders();
      const response = await fetch('/api/grade-psych-frq', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify({ answers: ebqAnswers, prompt_intro }),
      });
      
      if (response.status === 401) {
        setShowAuthModal(true);
        setGradeError('Authentication required. Please sign in to continue.');
        setGrading(false);
        return;
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to contact AI grading service.');
      }
      
      const data = await response.json();
      const parsed = data.result;
      setGradeResult(
        parsed.map((g: { score: number; explanation: string }, i: number) =>
          `Part ${String.fromCharCode(65 + i)}: ${g.score}/1 - ${g.explanation}`
        ).join('\n') +
        (parsed.total !== undefined ? `\n\nTotal: ${parsed.total}/5` : '')
      );
      
      // Clear localStorage on successful grading
      if (STORAGE_KEY) {
        localStorage.removeItem(STORAGE_KEY);
      }
      // Update daily usage limit
      localStorage.setItem(usageKey, today);
      
    } catch (err: any) {
      setGradeError(err.message || 'Unknown error.');
    }
    setGrading(false);
  };

  if (selectedSet) {
    const setObj = ebqSets.find(s => s.id === selectedSet);
    if (setObj) {
      return (
        <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
          <AuthModal 
            isOpen={showAuthModal} 
            onClose={() => setShowAuthModal(false)}
            onSuccess={() => {
              setShowAuthModal(false);
              // Retry grading if user was trying to grade
            }}
          />
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center">
            <button
              onClick={() => setSelectedSet(null)}
              className="mb-4 px-4 py-2 bg-white border border-pink-300 rounded-lg font-semibold shadow-sm hover:bg-pink-100 transition flex items-center gap-2"
            >
              &larr; Back to Set Selection
            </button>
            <h1 className="text-3xl font-bold mb-8 text-center w-full">
              {setObj.label} – Evidence-Based Question
            </h1>
            <div className="flex flex-col md:flex-row gap-8 w-full">
              {/* PDF Viewer on the left */}
              <div className="flex-[1.5] min-w-[350px] max-w-2xl bg-white shadow-lg p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-4 text-center text-pink-700">
                  EBQ PDF
                </h2>
                <iframe
                  src={setObj.pdf}
                  title={setObj.label + ' PDF'}
                  className="w-full min-h-[700px] border rounded-lg"
                />
                <div className="text-xs text-slate-500 mt-2 text-center">
                  If the PDF does not load,{' '}
                  <a
                    href={setObj.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-pink-700"
                  >
                    click here to open in a new tab
                  </a>.
                </div>
              </div>
              {/* EBQ answer boxes for Set 1 and Set 2 */}
              {(setObj.id === 1 || setObj.id === 2) ? (
                <div className="flex-1 max-w-2xl p-6 flex flex-col items-center">
                  <h2 className="text-xl font-semibold mb-4 text-center text-pink-700">
                    Your Answers (A–C)
                  </h2>
                  <div className="w-full space-y-6">
                    {[0,1,2].map((idx) => {
                      const answer = ebqAnswers[idx] || '';
                      const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
                      const charCount = answer.length;
                      const wordExceeded = wordCount > MAX_WORDS_PER_PART;
                      const wordInsufficient = wordCount > 0 && wordCount < MIN_WORDS_PER_PART;
                      const charExceeded = charCount > MAX_CHARS_PER_PART;

                      return (
                        <div key={idx} className="w-full">
                          <label className="block font-semibold mb-2 text-pink-700">{`Part ${String.fromCharCode(65 + idx)}`}</label>
                          <textarea
                            className="w-full min-h-[100px] border border-pink-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                            placeholder={`Type your answer for Part ${String.fromCharCode(65 + idx)} here...`}
                            value={answer}
                            onChange={e => handleEBQAnswerChange(idx, e.target.value)}
                          />
                          <div className="flex justify-between text-xs mt-1">
                            <span className={wordInsufficient ? 'text-orange-600 font-semibold' : wordExceeded ? 'text-red-600 font-semibold' : 'text-slate-500'}>
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
                  <button
                    onClick={handleEBQGrade}
                    className="mt-8 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow transition flex items-center gap-2"
                    disabled={grading}
                  >
                    {grading ? 'Grading...' : 'GRADE'}
                  </button>
                  {gradeResult && (
                    <div className="mt-6 w-full bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                      <strong>Grading Result:</strong>
                      <pre className="whitespace-pre-wrap text-sm mt-2">{gradeResult}</pre>
                    </div>
                  )}
                  {gradeError && (
                    <div className="mt-6 w-full bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                      <strong>Error:</strong> {gradeError}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 max-w-2xl p-6 flex flex-col items-center justify-center">
                  <div className="text-lg text-slate-700 text-center">EBQ answer entry and grading coming soon.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={() => navigate('/practice-exams')}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition self-start"
        >
          &larr; Back to Practice Exams
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full text-pink-700">
          Select AP Psychology Evidence-Based Question Set
        </h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {ebqSets.map((set) => (
            <button
              key={set.id}
              onClick={() => setSelectedSet(set.id)}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-pink-100 hover:border-pink-400 hover:shadow-xl"
            >
              <span className="text-2xl font-bold mb-2 text-pink-700">{set.label}</span>
              <span className="text-slate-600">Official AP Psychology EBQ 2025</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APPsychPracticeExamEBQSelect;
