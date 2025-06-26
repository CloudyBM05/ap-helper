import React, { useState } from 'react';

// Use import.meta.env.BASE_URL for correct PDF path, always ensure trailing slash
const PDF_URL = `${import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : import.meta.env.BASE_URL + '/'}apush-2025-SAQ.pdf`;

const APUSHPracticeExamSAQ2025: React.FC = () => {
  const [answers, setAnswers] = useState(["", "", ""]);
  const [grading, setGrading] = useState(false);
  const [grades, setGrades] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (idx: number, value: string) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[idx] = value;
      return copy;
    });
  };

  const handleSubmit = async () => {
    setGrading(true);
    setError(null);
    setGrades(null);

    // Define prompt, sources, and questions for 2025 SAQ Q1
    const prompt_intro = "You are an APUSH teacher. Grade parts A, B, and C (0 or 1 point each) based on: (1) historically accurate info, (2) clarity, (3) correct use of “describe” (more than naming) and “explain” (why or how). Give a short explanation for each score.";
    const sources = "Wilentz: The Revolution expanded democracy more than expected; Jeffersonians weakened elite control after 1800.\nBouton: Elites created a government to block democracy; even Democratic-Republicans kept those limits.";
    const questions = "A. Describe one key difference in how Wilentz and Bouton view early U.S. politics.\nB. Explain one 1789–1820 event not mentioned that supports Wilentz.\nC. Explain one 1789–1820 event not mentioned that supports Bouton.";

    try {
      const response = await fetch("https://ap-helper.fly.dev/api/grade-saq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ answers, prompt_intro, sources, questions })
      });

      if (!response.ok) {
        throw new Error("Failed to contact AI grading service.");
      }

      const data = await response.json();
      let parsed: { score: number; explanation: string }[] = [];
      try {
        const parsedResult = data.result;
        parsed = parsedResult;
      } catch {
        setError("AI response could not be parsed. Please try again.");
        setGrading(false);
        return;
      }
      setGrades(parsed.map((g, i) => `SAQ ${String.fromCharCode(65 + i)}: ${g.score}/1 - ${g.explanation}`));
    } catch (err: any) {
      setError(err.message || "Unknown error.");
    }
    setGrading(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 justify-center items-center">
      {/* PDF Viewer */}
      <div className="flex-[1.3] min-w-[400px] max-w-3xl bg-white shadow-lg p-6 flex flex-col md:ml-24 md:mr-8">
        <h2 className="text-xl font-bold mb-4 text-center">APUSH 2025 SAQ PDF</h2>
        <iframe
          src={PDF_URL}
          title="APUSH 2025 SAQ PDF"
          className="w-full flex-1 min-h-[750px] border rounded-lg"
        />
        <div className="text-xs text-slate-500 mt-2 text-center">
          If the PDF does not load, <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">click here to open in a new tab</a>.
        </div>
      </div>
      {/* SAQ Answers */}
      <div className="flex-1 max-w-xl p-6 flex flex-col items-center md:ml-8 md:mr-24">
        <h2 className="text-xl font-bold mb-4 text-center">Your SAQ Answers</h2>
        <button
          className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          onClick={handleSubmit}
          disabled={grading}
        >
          {grading ? "Grading..." : "SUBMIT"}
        </button>
        <div className="w-full space-y-6">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="w-full">
              <label className="block font-semibold mb-2">{`SAQ ${idx + 1}`}</label>
              <textarea
                className="w-full min-h-[120px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={answers[idx]}
                onChange={e => handleChange(idx, e.target.value)}
                placeholder={`Type your answer for SAQ ${idx + 1} here...`}
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
            <h3 className="text-lg font-bold mb-2 text-green-700">AI Grading Results</h3>
            <ul className="list-disc pl-6 space-y-2">
              {grades.map((g, i) => (
                <li key={i} className="text-green-900">{g}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default APUSHPracticeExamSAQ2025;
