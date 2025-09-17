import React from 'react';
import { useNavigate } from 'react-router-dom';

const apPsychUnits = [
  { unit: 1, emoji: '🧠', title: 'Biological Bases of Behavior' },
  { unit: 2, emoji: '🧩', title: 'Cognition' },
  { unit: 3, emoji: '👶📘', title: 'Development & Learning' },
  { unit: 4, emoji: '👥', title: 'Social Psychology & Personality' },
  { unit: 5, emoji: '💊', title: 'Mental & Physical Health' },
];

const APPsychologyStudyGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/study-guides')}
          className="mb-8 px-4 py-2 rounded bg-yellow-100 text-yellow-700 font-semibold hover:bg-yellow-200 transition"
        >
          ← Back to Study Guides
        </button>
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">AP Psychology Units</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {apPsychUnits.map((unit) => (
            <div
              key={unit.unit}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer border border-yellow-300"
              onClick={() => {
                if (unit.unit === 1) navigate('/ap-psychology/unit/1');
                else if (unit.unit === 2) navigate('/ap-psychology/unit/2');
                else if (unit.unit === 3) navigate('/ap-psychology/unit/3');
                else if (unit.unit === 4) navigate('/ap-psychology/unit/4');
                else if (unit.unit === 5) navigate('/ap-psychology/unit/5');
              }}
            >
              <div className="text-4xl mb-2">{unit.emoji}</div>
              <div className="text-lg font-bold text-yellow-700 mb-1">{`Unit ${unit.unit}`}</div>
              <div className="text-slate-500">{unit.title}</div>
            </div>
          ))}
        </div>
        {/* Other Useful Study Tools */}
        <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="flex-1 flex items-stretch">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-yellow-100 w-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 text-yellow-800 text-center">Other Useful Study Tools</h2>
              <a
                href="https://library.fiveable.me/ap-psych"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-yellow-700 hover:underline font-semibold"
              >
                Fiveable AP Psych Notes
              </a>
              <a
                href="https://knowt.com/exams/AP/AP-Psychology"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-yellow-700 hover:underline font-semibold"
              >
                Knowt AP Psychology Cram Sheets & Flashcards
              </a>
              <a
                href="https://www.doveslibrary.com/history-and-social-sciences/ap-psychology?"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-yellow-700 hover:underline font-semibold"
              >
                Scholarly Wings AP Psychology Notes
              </a>
              <a
                href="https://pie.yt/?v=https://youtu.be/jQG8XhKgGn4?si=NBqrK1t7yMG7Jrbo&pieshare=1"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-yellow-700 hover:underline font-semibold"
              >
                AP Psychology FULL Course Review [UPDATED FOR 2025 EXAM]
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APPsychologyStudyGuide;
