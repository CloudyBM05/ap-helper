import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PDF_URL = "/apush-2014.pdf";
const CHOICES = ['A', 'B', 'C', 'D'];
const CORRECT_ANSWERS = [
  'C','B','D','B','C','B','B','A','C','A',
  'D','D','A','D','D','A','A','D','B','A',
  'D','C','A','C','C','A','D','A','B','C',
  'A','C','B','D','C','B','B','A','C','A',
  'C','B','C','A','D','B','A','D','A','B',
  'B','C','A','C','D'
];

const APUSHPracticeExamMCQ2014Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers: (string | null)[] = location.state?.answers || [];

  const numCorrect = answers.reduce(
    (acc, ans, idx) => acc + (ans === CORRECT_ANSWERS[idx] ? 1 : 0),
    0
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 justify-center items-center">
      {/* PDF Viewer */}
      <div className="flex-[1.3] min-w-[500px] max-w-4xl bg-white shadow-lg p-6 flex flex-col md:ml-32 md:mr-12 mb-8 md:mb-0">
        <h2 className="text-xl font-bold mb-4 text-center">APUSH 2014 Official Exam PDF</h2>
        <iframe
          src={PDF_URL}
          title="APUSH 2014 Exam PDF"
          className="w-full flex-1 min-h-[900px] border rounded-lg"
        />
        <div className="text-xs text-slate-500 mt-2 text-center">
          If the PDF does not load, <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">click here to open in a new tab</a>.
        </div>
      </div>
      {/* Results Table */}
      <div className="flex-1 max-w-xl p-6 flex flex-col items-center md:ml-12 md:mr-32 bg-white rounded-2xl shadow-lg h-[90vh]">
        <h1 className="text-3xl font-bold mb-6 text-center">APUSH 2014 MCQ Results</h1>
        <div className="mb-6 text-center">
          <span className="text-2xl font-bold text-blue-700">{numCorrect}</span>
          <span className="text-lg text-slate-700"> / {CORRECT_ANSWERS.length} correct</span>
          <div className="text-lg text-slate-600 mt-2">
            Score: <span className="font-bold">{((numCorrect / CORRECT_ANSWERS.length) * 100).toFixed(1)}%</span>
          </div>
        </div>
        <div className="overflow-y-auto w-full" style={{ maxHeight: "60vh" }}>
          <table className="w-full border border-slate-200 rounded text-sm">
            <thead>
              <tr>
                <th className="p-2 border-b text-left">#</th>
                <th className="p-2 border-b text-center">Your Answer</th>
                <th className="p-2 border-b text-center">Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              {CORRECT_ANSWERS.map((correct, idx) => {
                const user = answers[idx];
                const isCorrect = user === correct;
                return (
                  <tr key={idx} className={isCorrect ? 'bg-green-50' : 'bg-red-50'}>
                    <td className="p-2 font-bold">{idx + 1}</td>
                    <td className="p-2 text-center">
                      {user ? (
                        <span className={isCorrect ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>
                          {user}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">No answer</span>
                      )}
                    </td>
                    <td className="p-2 text-center font-bold">{correct}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button
          className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
          onClick={() => navigate(-1)}
        >
          Back to Exam
        </button>
      </div>
    </div>
  );
};

export default APUSHPracticeExamMCQ2014Results;
