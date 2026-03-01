import React from 'react';
import { useNavigate } from 'react-router-dom';

const apcsaUnits = [
  { unit: 1, emoji: '🚀', title: 'Primitive Types' },
  { unit: 2, emoji: '🔄', title: 'Using Objects' },
  { unit: 3, emoji: '🏗️', title: 'Boolean Expressions and if Statements' },
  { unit: 4, emoji: '🗃️', title: 'Iteration' },
];

const APCSAStudyGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/study-guides')}
          className="mb-8 px-4 py-2 rounded bg-orange-100 text-orange-700 font-semibold hover:bg-orange-200 transition"
        >
          ← Back to Study Guides
        </button>
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">AP Computer Science A Units</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {apcsaUnits.map((unit) => (
            <div
              key={unit.unit}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-orange-300"
              onClick={() => navigate(`/apcsa-study-guide/unit/${unit.unit}`)}
            >
              <div className="text-4xl mb-2">{unit.emoji}</div>
              <div className="text-lg font-bold text-orange-700 mb-1">{`Unit ${unit.unit}`}</div>
              <div className="text-slate-500">{unit.title}</div>
            </div>
          ))}
        </div>

        {/* Study Tools */}
        <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          {/* Other Useful Study Tools */}
          <div className="flex-1 flex items-stretch">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-orange-100 w-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 text-orange-800 text-center">Other Useful Study Tools</h2>
              <a
                href="https://knowt.com/exams/AP/AP-Computer-Science-A"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-orange-700 hover:underline font-semibold"
              >
                Knowt: AP CSA Study Guides & Practice Exams
              </a>
              <a
                href="https://www.khanacademy.org/computing/ap-computer-science-a"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-orange-700 hover:underline font-semibold"
              >
                Khan Academy: AP Computer Science A
              </a>
              <a
                href="https://www.youtube.com/watch?v=iOKGpj5M0cI"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-orange-700 hover:underline font-semibold"
              >
                AP CSA Full Review (YouTube Video)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APCSAStudyGuide;
