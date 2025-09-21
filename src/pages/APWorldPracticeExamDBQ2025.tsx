import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const APWorldPracticeExamDBQ2025: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const set = searchParams.get('set');
  const pdf = searchParams.get('pdf');
  const [answer, setAnswer] = useState('');
  const [grading, setGrading] = useState(false);
  const [grade, setGrade] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getPrompt = () => {
    if (set === 'set1') {
      return `Grade an AP World DBQ — BE VERY VERY STRICT\nPrompt: Evaluate the extent to which new transportation and/or communication technologies affected African societies from circa 1850 to 1960.\n\nDocument Summaries:\nDoc 1 (1896): Temne leaders protest British-imposed hut tax to fund roads/rail in Sierra Leone.\nDoc 2 (1899): Photo of Bechuana mine workers returning home, seen as respected for working in cities.\nDoc 3 (1900): Telegrams on Ashanti resistance to telegraph line repairs; British military response.\nDoc 4 (1908): British tourist brochure describes Egypt’s modernization and Westernization via rail and shipping.\nDoc 5 (1914): British report links railway-based urbanization and mining labor to the spread of tuberculosis.\nDoc 6 (1915): Colonial officials praise rail for boosting trade, labor shifts, cocoa exports, and telegraph expansion in Gold Coast.\nDoc 7 (2004 memoir): Nigerian historian reflects on how British rail transformed Ibadan economically, socially, and ethnically.\n\nScoring Instructions: Use AP World DBQ Rubric AND BE VERY VERY STRICT\nAward points in each category:\nThesis (0–1 pt) – Clear, defensible, specific claim.\nContextualization (0–1 pt) – Broad historical link to the prompt (e.g., colonialism, imperialism, industrialization).\nEvidence (0–3 pts):\n1 pt = 3 described docs\n2 pts = 6 docs used to support argument\n+1 pt = Outside evidence beyond the docs\nAnalysis/Reasoning (0–2 pts):\n1 pt = 3 documents sourced (POV, purpose, situation, or audience linked to argument)\n1 pt = Demonstrates complex understanding (multiple causes, perspectives, connections, etc.)`;
    } else if (set === 'set2') {
      return `Grade an AP World DBQ — BE VERY STRICT\nPrompt: Evaluate the extent to which industrialization created new opportunities and/or challenges for women from c. 1850–1950.\n\nDocument Snapshots:\nDoc 1: Russian labor organizer praises illiterate woman leader in cigarette factory (1890s)\nDoc 2: Ottoman silk factory photo with women workers under male supervision (1902)\nDoc 3: Chinese exile He-Yin Zhen criticizes factory labor for women (1907)\nDoc 4: Russian report (1912) says women took over men’s farming and leadership roles due to male factory labor\nDoc 5: Japanese textile worker describes factory abuse and deception (1913+)\nDoc 6: South African garment worker details job loss, hardship, and rejection of rural life (1930s–40s)\nDoc 7: South African memoir (1985) recalls Black women taking on many roles due to land loss and urban migration\n\nScoring Instructions (STRICT):\nGrade using the AP World DBQ rubric. Award points only if the response fully meets criteria — no partial credit, no leniency.\n\nCategory Breakdown:\nThesis (0–1 pt): Must clearly answer the prompt with a specific, historically defensible claim and a line of reasoning. Must be in the intro or conclusion only.\nContextualization (0–1 pt): Must describe relevant broader historical background — not just a phrase or vague reference.\nEvidence (0–3 pts):\n1 pt: Accurately describes content from at least 3 documents.\n2 pts: Describes at least 6 documents and uses them to support an argument.\n+1 pt: Provides and uses one specific piece of outside evidence beyond what’s in the documents. Must be clearly explained and relevant.\nAnalysis/Reasoning (0–2 pts):\n1 pt: For 3 documents, explains how or why POV, purpose, historical situation, or audience is relevant to the argument.\n1 pt: Demonstrates complex understanding of the issue — e.g., multiple perspectives, cause/effect, continuity/change, nuance, or connections across time or region. Must be embedded in argument.`;
    }
    return 'Grade an AP World DBQ using the official rubric.';
  };

  const handleBackClick = () => {
    navigate('/apworld-practice-exam/dbq/select');
  };

  const handleSubmit = async () => {
    setGrading(true);
    setError(null);
    setGrade(null);
    const prompt_intro = getPrompt();
    const apiUrl = import.meta.env.DEV
      ? '/api/grade-dbq'
      : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-dbq';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer, prompt_intro }),
      });
      const data = await response.json();
      if (data && data.grade) {
        setGrade(data.grade);
      } else {
        setError('Failed to contact AI grading service.');
      }
    } catch (err) {
      setError('Failed to contact AI grading service.');
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
          &larr; Back to DBQ Selection
        </button>
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          {/* PDF Viewer */}
          <div className="flex-1 bg-white shadow-lg p-6 flex flex-col min-w-[400px] max-w-5xl">
            <h2 className="text-xl font-bold mb-4 text-center text-green-700">
              AP World DBQ 2025 - {set === 'set1' ? 'Set 1' : 'Set 2'}
            </h2>
            {pdf ? (
              <iframe
                src={pdf}
                title={`AP World DBQ PDF - ${set}`}
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
          {/* DBQ Answer */}
          <div className="flex-1 max-w-2xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center text-green-800">
              Your DBQ Answer
            </h2>
            <textarea
              className="w-full min-h-[500px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your DBQ essay here..."
              disabled={grading}
            />
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

export default APWorldPracticeExamDBQ2025;
