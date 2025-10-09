import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setAnswers((prev) => ({ ...prev, [part]: value }));
  };

  const handleSubmit = async () => {
    setGrading(true);
    setError(null);
    setGrades(null);
    try {
      const answersArray = frq.parts.map(part => answers[part.id] || "");
      // Example API endpoint, replace with your actual endpoint
      const apiUrl = import.meta.env.DEV
        ? '/api/grade-ap-seminar'
        : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-ap-seminar';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: answersArray,
          prompt_intro: frq.prompt,
          sources: '',
          questions: ''
        })
      });
      if (!response.ok) {
        throw new Error('Failed to contact AI grading service.');
      }
      const data = await response.json();
      let parsed = [];
      try {
        parsed = data.result;
      } catch {
        setError('Failed to contact AI grading service.');
        setGrading(false);
        return;
      }
      setGrades(
        Array.isArray(parsed)
          ? parsed.map((g) => typeof g === 'string' ? g : JSON.stringify(g))
          : [JSON.stringify(parsed)]
      );
    } catch (err: any) {
      setError('Failed to contact AI grading service.');
    }
    setGrading(false);
  };

  return (
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
            <button
              className="mb-4 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
              onClick={handleSubmit}
              disabled={grading}
            >
              {grading ? 'Grading...' : 'SUBMIT'}
            </button>
            <div className="w-full space-y-6">
              {frq.parts.map((part) => (
                <div key={part.id} className="w-full">
                  <label className="block font-semibold mb-2 text-slate-700">{part.label}</label>
                  <textarea
                    className="w-full min-h-[120px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    value={answers[part.id] || ''}
                    onChange={e => handleChange(part.id, e.target.value)}
                    placeholder={`Type your answer for ${part.label} here...`}
                    disabled={grading}
                  />
                </div>
              ))}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default APBiologyShortFRQ;
