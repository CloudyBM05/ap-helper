import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const APWorldPracticeExamSAQ2025: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, getAuthHeaders } = useAuth();
  const [answers, setAnswers] = useState(['', '', '']);
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get query params for set and pdf
  const searchParams = new URLSearchParams(location.search);
  const set = searchParams.get('set');
  const pdfParam = searchParams.get('pdf');

  const qId = parseInt(questionId || '1', 10);
  
  const STORAGE_KEY = `apworld-saq-2025-${set}-q${qId}-answers`;
  
  // Word and character count limits for SAQ
  const MIN_WORDS_PER_PART = 20;   // Minimum words per SAQ part
  const MAX_WORDS_PER_PART = 200;  // Maximum words per SAQ part
  const MAX_CHARS_PER_PART = 1200; // Maximum characters per SAQ part to prevent token abuse
  
  // Load saved answers from localStorage on mount or question change
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedAnswers = JSON.parse(saved);
        if (Array.isArray(parsedAnswers) && parsedAnswers.length === 3) {
          setAnswers(parsedAnswers);
        }
      } catch (e) {
        console.error('Failed to load saved answers:', e);
      }
    }
  }, [qId, set, STORAGE_KEY]);

  // Use PDF from query param if present
  const getPdfUrlForQuestion = (questionId: number) => {
    if (pdfParam) {
      return pdfParam;
    }
    // Set 2 PDF logic
    if (set === 'set2') {
      if (questionId === 1) return '/APWorld-pt2SAQ1.pdf';
      if (questionId === 2) return '/APWorld-pt2SAQ2.pdf';
      if (questionId === 3 || questionId === 4) return '/APWorld-pt2SAQ34.pdf';
    }
    // Set 1 fallback
    let pdfFile = '';
    if (questionId === 1) {
      pdfFile = '/APWorld2025-SAQ1.pdf';
    } else if (questionId === 2) {
      pdfFile = '/APWorld2025-SAQ2.pdf';
    } else if (questionId === 3) {
      pdfFile = '/APWorld2025-SAQ3.pdf';
    }
    if (pdfFile) {
      return `${import.meta.env.BASE_URL}${pdfFile}`;
    }
    return `${import.meta.env.BASE_URL}apworld-2025-SAQ.pdf`;
  };

  const pdfUrl = getPdfUrlForQuestion(qId);

  const handleBackClick = () => {
    navigate('/apworld-practice-exam/saq/select');
  };

  const handleChange = (idx: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    setAnswers(newAnswers);
    // Save to localStorage immediately
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAnswers));
  };

  const handleSubmit = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setError('Please log in to use AI grading. Click the "Login" button in the navigation bar.');
      return;
    }

    // Word count validation
    const wordCounts = answers.map(ans => ans.trim() ? ans.trim().split(/\s+/).length : 0);
    
    for (let i = 0; i < wordCounts.length; i++) {
      if (wordCounts[i] < MIN_WORDS_PER_PART) {
        setError(`Part ${String.fromCharCode(65 + i)} is too short. Please write at least ${MIN_WORDS_PER_PART} words. Current: ${wordCounts[i]} words.`);
        return;
      }
      if (wordCounts[i] > MAX_WORDS_PER_PART) {
        setError(`Part ${String.fromCharCode(65 + i)} exceeds the maximum length. Please keep it under ${MAX_WORDS_PER_PART} words. Current: ${wordCounts[i]} words.`);
        return;
      }
    }

    // Character count validation to prevent token abuse
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].trim().length > MAX_CHARS_PER_PART) {
        setError(`Part ${String.fromCharCode(65 + i)} exceeds the maximum character limit. Please reduce to under ${MAX_CHARS_PER_PART} characters. Current: ${answers[i].trim().length} characters.`);
        return;
      }
    }
    
    setGrading(true);
    setError(null);
    setGrades(null);

    let prompt_intro;
    if (set === 'set1' && qId === 1) {
      prompt_intro = `Grade an AP World SAQ — BE VERY STRICT\nSource: Jack Weatherford, 1988. The passage argues that the discovery of the Americas disrupted African trade networks, increased the slave trade, and harmed Indigenous peoples in the Americas.\nTasks:\nA. Identify one claim the author makes in the first paragraph about the effect of the discovery of the Americas on Africa.\nB. Describe one economic change in the Americas that resulted from the developments discussed in the second paragraph.\nC. Explain one reason why “American Indians” became “victims of the discovery of America,” as stated by the author.\n\nScoring Instructions:\n1 point per part (max 3)\nScore each part independently\nBe very strict: Only accept responses that are specific, historically accurate, and clearly relevant\nDo not award points for vague, general, or off-topic statements\nFor each part, include the score (0 or 1) and a brief justification.`;
    } else if (set === 'set1' && qId === 2) {
      prompt_intro = `Grade an AP World SAQ — BE VERY STRICT\nSource: Louise Otto-Peters, German writer, 1849. This was the first women’s newspaper in Germany, advocating for women’s rights, liberty, and social uplift during a time of political unrest and industrial change.\nTasks:\nA. Identify one likely audience for the claims that the author makes in the passage.\nB. Describe one historical context during the nineteenth century that explains the increased poverty and misery referred to in the fourth paragraph.\nC. Explain how one ideology or set of ideas likely influenced the author’s claims in the passage.\n\nScoring Instructions:\n1 point per part (max 3)\nScore each part independently\nBe very strict: Only award points for responses that are specific, historically accurate, and clearly relevant to the passage and time period\nDo not award credit for vague, general, or off-topic statements\nFor each part, include the score (0 or 1) and a brief justification`;
    } else if (set === 'set1' && qId === 3) {
      prompt_intro = `Grade an AP World SAQ — BE VERY STRICT\nTopic: Expansion, administration, and religious tolerance in Muslim empires (c. 1300–1600)\nTasks:\nA. Identify one technological or military factor that contributed to the expansion of Muslim empires such as the Ottoman, Safavid, or Mughal Empires during the period c. 1300–1600.\nB. Explain one way Muslim rulers during the same period used economic policies to generate revenue.\nC. Explain one reason why some Muslim rulers adopted tolerant policies toward religious or ethnic minorities in their states or empires.\n\nScoring Instructions:\n1 point per part (max 3)\nScore each part independently\nBe very strict: Only award points for responses that are specific, historically accurate, and directly relevant\nDo not award points for vague, general, or off-topic responses\nInclude a score and brief justification per part`;
    } else if (set === 'set1' && qId === 4) {
      prompt_intro = `Grade an AP World SAQ — BE VERY STRICT\nTopic: Political revolutions and ideological change, c. 1750–1900\nTasks:\nA. Identify one factor that contributed to the outbreak of revolutions in the period c. 1750–1900.\nB. Explain one way that revolutionary movements used ideologies in their attempts to change societies during this period.\nC. Explain one way in which revolutionary movements were challenged as they attempted to change societies during this period.\n\nScoring Instructions:\n1 point per part (max 3)\nScore each part independently\nBe very strict: Award points only for responses that are specific, historically accurate, and clearly relevant to the time period and question\nDo not award points for vague, general, or off-topic responses\nFor each part, give a score (0 or 1) and a brief justification`;
    } else if (set === 'set2' && qId === 1) {
      prompt_intro = `Grade an AP World SAQ — BE VERY STRICT\nSource: Tom Standage, 2006. The passage argues that industrialization shifted Britain’s tea supply from China to India, economically damaging Chinese tea producers and contributing to political instability.\nTasks:\nA. Identify one argument the author makes regarding tea production in the late 19th and early 20th centuries.\nB. Describe one likely reason for the change in tea imports to Britain, as outlined by the author.\nC. Explain how one additional piece of evidence, not included in the passage, would support the author’s claim that China “descended into a chaotic period” in the 19th and early 20th centuries.\n\nScoring Instructions:\n1 point per part (max 3)\nScore each part independently\nBe very strict: Award points only for responses that are specific, historically accurate, and directly relevant\nDo not award points for vague, general, or off-topic statements\nInclude a score (0 or 1) and a brief justification per part`;
    } else if (set === 'set2' && qId === 2) {
      prompt_intro = `Grade an AP World SAQ — BE VERY STRICT\nSource: George Padmore, 1956. Padmore, an Afro-Caribbean intellectual and former communist, calls on the U.S. to support African decolonization and reject European imperialism, warning against communism taking root in postcolonial Africa.\nTasks:\nA. Identify one reason United States officials were concerned about communism, as noted in the first paragraph.\nB. Describe the historical situation that resulted in the “system of colonialism” referred to in the second paragraph.\nC. Explain one way the source reflects the political situation in Africa during the second half of the twentieth century.\n\nScoring Instructions:\n1 point per part (max 3)\nScore each part independently\nBe very strict: Award points only for responses that are specific, historically accurate, and directly relevant\nDo not award points for vague, general, or off-topic claims\nInclude a score (0 or 1) and a brief justification for each part`;
    } else if (set === 'set2' && qId === 3) {
      prompt_intro = `Grade an AP World SAQ — BE VERY STRICT\nTasks:\nA. Identify one development that contributed to the spread of gunpowder technologies before circa 1500.\nB. Explain one way military technologies affected land-based empires’ development circa 1450–1750.\nC. Explain one way navigational technologies contributed to economic change circa 1450–1750.\n\nScoring Instructions:\nScore each part independently: 0 or 1 point each (max 3).\nBe very strict: Award points only for specific, historically accurate, and relevant answers.\nDo not award points for vague, general, or off-topic claims.\nInclude a score (0 or 1) and a brief justification for each part`;
    } else if (set === 'set2' && qId === 4) {
      prompt_intro = `Grade an AP World SAQ — BE VERY STRICT\nTasks:\nA. Identify one technological development in communication or transportation in the twentieth century.\nB. Explain one way nuclear technologies affected international relations in the second half of the twentieth century.\nC. Explain one way the spread of new technologies contributed to increased economic activity in the twentieth century.\n\nScoring Instructions:\nScore each part independently: 0 or 1 point each (max 3).\nBe very strict: Award points only for specific, historically accurate, and relevant answers.\nDo not award points for vague, general, or off-topic claims.\nInclude a score (0 or 1) and a brief justification for each part`;
    } else {
      prompt_intro =
        'You are an AP World teacher. Grade parts A, B, and C (0 or 1 point each) based on: (1) historically accurate info, (2) clarity, (3) correct use of “describe” (more than naming) and “explain” (why or how). Give a short explanation for each score.';
    }

    const apiUrl = import.meta.env.DEV
      ? '/api/grade-saq'
      : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-saq';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          answers,
          prompt_intro,
        }),
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
      if (data && data.grades) {
        setGrades(data.grades);
        // Clear saved answers after successful grading
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
    <div className='min-h-screen bg-slate-50 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        <button
          onClick={handleBackClick}
          className='mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition'
        >
          &larr; Back to SAQ Selection
        </button>
        <div className='flex flex-col md:flex-row justify-center items-start'>
          {/* PDF Viewer */}
          <div className='flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col'>
            <h2 className='text-xl font-bold mb-4 text-center text-green-700'>
              AP World 2025 SAQ - Question {questionId}
            </h2>
            <iframe
              src={pdfUrl}
              title={`AP World 2025 SAQ PDF - Question ${questionId}`}
              className='w-full flex-1 min-h-[1000px] border rounded-lg'
            />
            <div className='text-xs text-slate-500 mt-2 text-center'>
              If the PDF does not load,{' '}
              <a
                href={pdfUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='underline text-green-600'
              >
                click here to open in a new tab
              </a>
              .
            </div>
          </div>
          {/* SAQ Answers */}
          <div className='flex-1 max-w-2xl p-6 flex flex-col items-center'>
            <h2 className='text-xl font-bold mb-4 text-center text-green-800'>
              Your SAQ Answers for Question {questionId}
            </h2>
            <button
              className='mb-4 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition'
              onClick={handleSubmit}
              disabled={grading}
            >
              {grading ? 'Grading...' : 'SUBMIT'}
            </button>
            <div className='w-full space-y-6'>
              {[0, 1, 2].map((idx) => {
                const wordCount = answers[idx].trim() ? answers[idx].trim().split(/\s+/).length : 0;
                const charCount = answers[idx].trim().length;
                const isUnderMin = wordCount > 0 && wordCount < MIN_WORDS_PER_PART;
                const isOverMaxWords = wordCount > MAX_WORDS_PER_PART;
                const isOverMaxChars = charCount > MAX_CHARS_PER_PART;
                
                return (
                  <div key={idx} className='w-full'>
                    <label className='block font-semibold mb-2'>{`Part ${String.fromCharCode(65 + idx)}`}</label>
                    <textarea
                      className='w-full min-h-[150px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition'
                      value={answers[idx]}
                      onChange={(e) => handleChange(idx, e.target.value)}
                      placeholder={`Type your answer for Part ${String.fromCharCode(65 + idx)} here...`}
                      disabled={grading}
                    />
                    <div className='mt-1 text-sm'>
                      <div className={isOverMaxWords ? 'text-red-600 font-semibold' : isUnderMin ? 'text-orange-600' : 'text-slate-600'}>
                        Word count: {wordCount}
                        <span className='ml-2 text-slate-500'>(Min: {MIN_WORDS_PER_PART} | Max: {MAX_WORDS_PER_PART})</span>
                        {isOverMaxWords && <span className='ml-2'>⚠️ Exceeds maximum</span>}
                        {isUnderMin && <span className='ml-2'>⚠️ Below minimum</span>}
                      </div>
                      <div className={isOverMaxChars ? 'text-red-600 font-semibold mt-1' : 'text-slate-600 mt-1'}>
                        Character count: {charCount}
                        <span className='ml-2 text-slate-500'>(Max: {MAX_CHARS_PER_PART})</span>
                        {isOverMaxChars && <span className='ml-2'>⚠️ Exceeds maximum</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {error && (
              <div className='mt-6 text-red-600 font-semibold'>{error}</div>
            )}
            {grades && (
              <div className='mt-8 w-full bg-green-50 border border-green-200 rounded-lg p-4'>
                <h3 className='text-lg font-bold mb-2 text-green-700'>
                  AI Grading Results
                </h3>
                <ul className='list-disc pl-6 space-y-2'>
                  {grades.map((g, i) => (
                    <li key={i} className='text-green-900'>
                      {g}
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

export default APWorldPracticeExamSAQ2025;
