import React from 'react';
import { useNavigate } from 'react-router-dom';

const apHugUnits = [
  { unit: 1, emoji: '🧠', title: 'Thinking Geographically' },
  { unit: 2, emoji: '👶', title: 'Population & Migration Patterns & Processes' },
  { unit: 3, emoji: '🎭', title: 'Cultural Patterns & Processes' },
  { unit: 4, emoji: '🏛️', title: 'Political Patterns & Processes' },
  { unit: 5, emoji: '🌾', title: 'Agriculture & Rural Land Use' },
  { unit: 6, emoji: '🌆', title: 'Cities & Urban Land Use' },
  { unit: 7, emoji: '🏭', title: 'Industrial & Economic Development' },
];

const APHumanGeographyStudyGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/study-guides')}
          className="mb-8 px-4 py-2 rounded bg-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-200 transition"
        >
          ← Back to Study Guides
        </button>
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
          AP Human Geography Units
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {apHugUnits.map((unit) => (
            <div
              key={unit.unit}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-emerald-300"
              onClick={() => navigate(`/ap-human-geography/unit/${unit.unit}`)}
            >
              <div className="text-4xl mb-2">{unit.emoji}</div>
              <div className="text-lg font-bold text-emerald-700 mb-1">{`Unit ${unit.unit}`}</div>
              <div className="text-slate-500">{unit.title}</div>
            </div>
          ))}
        </div>
        {/* Other Useful Study Tools */}
        <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          {/* Study Tools Box */}
          <div className="flex-1 flex items-stretch">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-emerald-100 w-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 text-emerald-800 text-center">
                Other Useful Study Tools
              </h2>
              <a
                href="https://knowt.com/exams/AP/AP-Human-Geography"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-emerald-700 hover:underline font-bold text-lg mb-2"
              >
                Knowt Notes
              </a>
              <a
                href="https://library.fiveable.me/ap-hug"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-emerald-700 hover:underline font-bold text-lg mb-2"
              >
                Fiveable Notes
              </a>
              <a
                href="https://www.youtube.com/watch?v=rsAB035QIw4&pp=0gcJCfwAo7VqN5tD"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-emerald-700 hover:underline font-bold text-lg mb-2"
              >
                45 Minutes Youtube Review
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APHumanGeographyStudyGuide;
