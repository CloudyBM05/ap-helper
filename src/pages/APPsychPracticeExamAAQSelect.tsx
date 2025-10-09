import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';

const aaqSets = [
  { id: 2025, label: 'Collegeboard 2025 Set 1', implemented: true, route: '/ap-psychology-practice-exam/aaq/2025-set-1', type: 'AAQ', numAnswers: 6, pdf: '/APPSY-AAQ1.pdf' },
  { id: 20252, label: 'Collegeboard 2025 Set 2', implemented: true, route: '/ap-psychology-practice-exam/aaq/2025-set-2', type: 'AAQ', numAnswers: 6, pdf: '/APPSY-AAQ2.pdf' },
];

const questions = [
  { id: 1, label: 'Question 1' },
  { id: 2, label: 'Question 2' },
];

const APPsychPracticeExamAAQSelect = () => {
  const navigate = useNavigate();
  const { isAuthenticated, getAuthHeaders } = useAuth();
  const [selectedSet, setSelectedSet] = useState<number | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [grading, setGrading] = useState(false);
  const [gradeResult, setGradeResult] = useState<string | null>(null);
  const [gradeError, setGradeError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Word and character count limits for AAQ (6 parts, shorter responses)
  const MIN_WORDS_PER_PART = 10;
  const MAX_WORDS_PER_PART = 100;
  const MAX_CHARS_PER_PART = 700;

  // localStorage key based on selected set
  const STORAGE_KEY = selectedSet ? `appsych-aaq-set${selectedSet}-answers` : '';

  // Load saved answers from localStorage when set is selected
  useEffect(() => {
    if (selectedSet && STORAGE_KEY) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsedAnswers = JSON.parse(saved);
          if (Array.isArray(parsedAnswers)) {
            setAnswers(parsedAnswers);
          }
        } catch (e) {
          console.error('Failed to load saved answers:', e);
        }
      }
    }
  }, [selectedSet, STORAGE_KEY]);

  // Initialize answers array when set changes
  useEffect(() => {
    const setObj = aaqSets.find(s => s.id === selectedSet);
    if (setObj && answers.length === 0) {
      setAnswers(Array(setObj.numAnswers).fill(''));
    }
  }, [selectedSet]);

  const handleBackToPracticeExams = () => {
    navigate('/practice-exams');
  };

  const handleSetClick = (set: { id: number; implemented: boolean; label: string }) => {
    if (set.implemented) {
      setSelectedSet(set.id);
    }
  };

  const handleQuestionClick = (questionId: number) => {
    if (selectedSet) {
      const setObj = aaqSets.find(s => s.id === selectedSet);
      if (setObj) {
        navigate(`${setObj.route}/${questionId}`);
      }
    }
  };

  const handleAnswerChange = (idx: number, value: string) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[idx] = value;
      // Auto-save to localStorage
      if (STORAGE_KEY) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
      }
      return copy;
    });
  };

  const handleGrade = async () => {
    // Check authentication
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    // Validate all answers
    const allFilled = answers.every(ans => ans.trim().length > 0);
    if (!allFilled) {
      setGradeError('Please fill in all answer parts before grading.');
      return;
    }

    // Validate word and character counts
    for (let i = 0; i < answers.length; i++) {
      const ans = answers[i].trim();
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

    setGrading(true);
    setGradeError(null);
    setGradeResult(null);
    let prompt_intro = '';
    if (selectedSet === 2025) {
      prompt_intro = `STRICT AP Psych grader. Award 1 pt ONLY if 100% correct with exact terminology. Vague/partial/generic = 0 pts. Random words = 0 pts.

Study: 127 students watched mock crime video, then read summary with misinformation (Low=20%, Med=50%, High=80% misleading sentences). Answered 40 MC questions. Results: High group 63% correct, Low 74%. Trust in summary affected resistance.

A. Method: Must say "experiment/experimental" (not study/observation)
B. Operational def: "80% misleading sentences" (not "lots")
C. Mean: High (63%) LOWER than Low (74%), shows misinformation reduced accuracy
D. Ethics: Name specific guideline (informed consent/debriefing/deception) + how applied
E. Generalizability: Discuss college students, lab setting, mock video (not vague "small sample")
F. Misinformation effect: Use Loftus + specific data (63% vs 74%)

Total /6. Be harsh.`;
    } else if (selectedSet === 20252) {
      prompt_intro = `STRICT AP Psych grader. Award 1 pt ONLY if 100% correct with exact terminology. Vague/partial/generic = 0 pts. Random words = 0 pts.

Study: 16 dog-owner pairs. 4 trials (owner cry, stranger cry, owner laugh, stranger laugh). Within-subjects, counterbalanced. Person-oriented behaviors = looking/touching/approaching/vocalizing at person. Results: Cry trials (42-46 behaviors) >> laugh (15-20). p<0.001. Dogs respond to emotion, not familiarity.

A. Method: "Experiment/experimental, within-subjects" (not observation)
B. Operational def: List all 4 behaviors (not vague "reactions")
C. TRICK: No "talking" trials exist. If answered = made up = 0 pts. Must catch error or discuss cry vs laugh
D. Ethics: Animal welfare/no harm/owner consent + how applied
E. Generalizability: 16 dogs, lab setting, breed limits (not vague "small")
F. Stimulus discrimination: Dogs differentiate cry/laugh OR explain NOT operant conditioning (no reinforcement, innate cues)

Total /6. Be harsh.`;
    }
    try {
      const authHeaders = getAuthHeaders();
      const response = await fetch('/api/grade-psych-frq', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...authHeaders
        },
        body: JSON.stringify({ answers, prompt_intro }),
      });
      
      if (response.status === 401) {
        setShowAuthModal(true);
        setGradeError('Authentication required. Please sign in to continue.');
        setGrading(false);
        return;
      }
      
      if (response.status === 429) {
        const errorData = await response.json().catch(() => ({}));
        setGradeError(errorData.error || 'Daily limit reached: You can only grade 1 FRQ per day (across all AP courses: APUSH, AP World, AP Gov, AP Psych). Please try again tomorrow.');
        setGrading(false);
        return;
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to contact AI grading service.');
      }
      
      const data = await response.json();
      let parsed = data.result;
      setGradeResult(
        parsed.map((g: { score: number; explanation: string }, i: number) =>
          `Part ${String.fromCharCode(65 + i)}: ${g.score}/1 - ${g.explanation}`
        ).join('\n') +
        (parsed.total !== undefined ? `\n\nTotal: ${parsed.total}/${selectedSet === 3030 ? 3 : 6}` : '')
      );
      
      // Clear localStorage on successful grading
      if (STORAGE_KEY) {
        localStorage.removeItem(STORAGE_KEY);
      }
      
    } catch (err: any) {
      setGradeError(err.message || 'Unknown error.');
    }
    setGrading(false);
  };

  React.useEffect(() => {
    const setObj = aaqSets.find(s => s.id === selectedSet);
    if (setObj) {
      setAnswers(Array(setObj.numAnswers).fill(''));
    }
  }, [selectedSet]);

  if (selectedSet) {
    const setObj = aaqSets.find(s => s.id === selectedSet);
    if (setObj && (setObj.id === 2025 || setObj.id === 20252 || setObj.id === 3030)) {
      const pdfFile = setObj.pdf;
      const setTitle = setObj.label + (setObj.type === 'EBQ' ? ' – Evidence-Based Question' : ' – Article Analysis');
      const answerLabels = setObj.numAnswers === 3 ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D', 'E', 'F'];
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
              className="mb-4 px-4 py-2 bg-white border border-yellow-300 rounded-lg font-semibold shadow-sm hover:bg-yellow-100 transition flex items-center gap-2"
            >
              &larr; Back to Set Selection
            </button>
            <h1 className="text-3xl font-bold mb-8 text-center w-full">
              {setTitle}
            </h1>
            <div className="flex flex-col md:flex-row gap-8 w-full">
              {/* PDF Viewer on the left */}
              <div className="flex-[1.5] min-w-[350px] max-w-2xl bg-white shadow-lg p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-4 text-center text-yellow-700">
                  Article PDF
                </h2>
                <iframe
                  src={pdfFile}
                  title={setTitle + ' PDF'}
                  className="w-full min-h-[700px] border rounded-lg"
                />
                <div className="text-xs text-slate-500 mt-2 text-center">
                  If the PDF does not load,{' '}
                  <a
                    href={pdfFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-yellow-700"
                  >
                    click here to open in a new tab
                  </a>.
                </div>
              </div>
              {/* EBQ/AAQ Answers on the right */}
              <div className="flex-1 max-w-2xl p-6 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4 text-center text-yellow-700">
                  Your Answers ({answerLabels.join('–')})
                </h2>
                <div className="w-full space-y-6">
                  {answerLabels.map((label, idx) => {
                    const answer = answers[idx] || '';
                    const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
                    const charCount = answer.length;
                    const wordExceeded = wordCount > MAX_WORDS_PER_PART;
                    const wordInsufficient = wordCount > 0 && wordCount < MIN_WORDS_PER_PART;
                    const charExceeded = charCount > MAX_CHARS_PER_PART;

                    return (
                      <div key={idx} className="w-full">
                        <label className="block font-semibold mb-2 text-yellow-700">{`Part ${label}`}</label>
                        <textarea
                          className="w-full min-h-[100px] border border-yellow-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                          placeholder={`Type your answer for Part ${label} here...`}
                          value={answer}
                          onChange={e => handleAnswerChange(idx, e.target.value)}
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
                  onClick={handleGrade}
                  className="mt-8 px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg shadow transition flex items-center gap-2"
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
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
        <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-8 text-center w-full">
            Select a Question for {setObj?.label}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {questions.map((question) => (
              <button
                key={question.id}
                onClick={() => handleQuestionClick(question.id)}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-yellow-100 hover:border-yellow-400 hover:shadow-xl"
              >
                <span className="text-2xl font-bold mb-2 text-yellow-700">
                  {question.label}
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setSelectedSet(null)}
            className="mt-8 px-6 py-2 bg-white border border-yellow-300 hover:border-yellow-500 text-yellow-700 hover:text-yellow-900 font-semibold rounded-lg shadow flex items-center gap-2 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={handleBackToPracticeExams}
          className="mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition self-start"
        >
          &larr; Back to Practice Exams
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full text-pink-700">
          Select AP Psychology Article Analysis Question Set
        </h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {aaqSets.map((set) => (
            <button
              key={set.id}
              onClick={() => handleSetClick(set)}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-pink-100 hover:border-pink-400 hover:shadow-xl"
            >
              <span className="text-2xl font-bold mb-2 text-pink-700">
                {set.label}
              </span>
              <span className="text-slate-600">
                Official AP Psychology AAQ 2025
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APPsychPracticeExamAAQSelect;
