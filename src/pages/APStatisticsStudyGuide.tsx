import React from 'react';
import { useNavigate } from 'react-router-dom';

const apStatsUnits = [
  { unit: 1, emoji: '📊', title: 'Exploring One-Variable Data' },
  { unit: 2, emoji: '🔗', title: 'Exploring Two-Variable Data' },
  { unit: 3, emoji: '🧪', title: 'Collecting Data' },
  { unit: 4, emoji: '🎲', title: 'Probability, Random Variables, and Probability Distributions' },
  { unit: 5, emoji: '📈', title: 'Sampling Distributions' },
  { unit: 6, emoji: '📏', title: 'Inference for Categorical Data: Proportions' },
  { unit: 7, emoji: '📐', title: 'Inference for Quantitative Data: Means' },
  { unit: 8, emoji: '🟪', title: 'Inference for Categorical Data: Chi-Square' },
  { unit: 9, emoji: '📉', title: 'Inference for Quantitative Data: Slopes' },
];

const APStatisticsStudyGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/study-guides')}
          className="mb-8 px-4 py-2 rounded bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200 transition"
        >
          ← Back to Study Guides
        </button>
        <h2 className="text-3xl font-bold text-purple-900 mb-8 text-center">
          AP Statistics Units
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {apStatsUnits.map((unit) => (
            <div
              key={unit.unit}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-purple-300"
              onClick={() => {
                if (unit.unit === 1) {
                  navigate('/ap-statistics/unit/1');
                } else if (unit.unit === 2) {
                  navigate('/ap-statistics/unit/2');
                } else if (unit.unit === 3) {
                  navigate('/ap-statistics/unit/3');
                } else if (unit.unit === 4) {
                  navigate('/ap-statistics/unit/4');
                } else if (unit.unit === 5) {
                  navigate('/ap-statistics/unit/5');
                } else if (unit.unit === 6) {
                  navigate('/ap-statistics/unit/6');
                } else if (unit.unit === 7) {
                  navigate('/ap-statistics/unit/7');
                } else if (unit.unit === 8) {
                  navigate('/ap-statistics/unit/8');
                } else if (unit.unit === 9) {
                  navigate('/ap-statistics/unit/9');
                }
                // Add more navigation for other units as you create their pages
              }}
            >
              <div className="text-4xl mb-2">{unit.emoji}</div>
              <div className="text-lg font-bold text-purple-700 mb-1">{`Unit ${unit.unit}`}</div>
              <div className="text-slate-500">{unit.title}</div>
            </div>
          ))}
        </div>
        {/* Interactive Study Tools */}
        <div className="max-w-5xl mx-auto mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4 text-center">
            🤖 AI-Powered Socratic Learning
          </h2>
          <p className="text-center mb-6 text-purple-100">
            Engage with our interactive Socratic AI tutor for deeper understanding of statistical concepts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/socratic-learning')}
              className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              📚 Browse All Units
            </button>
            <button
              onClick={() => navigate('/socratic-chat/apstat/unit1')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors border border-purple-400"
            >
              🧮 Start with Unit 1
            </button>
          </div>
          <p className="text-center mt-4 text-sm text-purple-200">
            Available for all 9 units • Personalized learning • Progress tracking
          </p>
        </div>

        {/* Other Useful Study Tools */}
        <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="flex-1 flex items-stretch">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-purple-100 w-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 text-purple-800 text-center">
                Other Useful Study Tools
              </h2>
              <a
                href="https://library.fiveable.me/ap-stats"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-purple-700 hover:underline font-bold text-lg mb-2"
              >
                Fiveable AP Stats Notes
              </a>
              <a
                href="https://www.simplestudies.org/groups/ap-statistics"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-purple-700 hover:underline font-bold text-lg mb-2"
              >
                Simple Studies AP Stats
              </a>
              <a
                href="https://www.khanacademy.org/math/ap-statistics"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-purple-700 hover:underline font-bold text-lg mb-2"
              >
                Khan Academy AP Statistics
              </a>
              <a
                href="https://www.youtube.com/playlist?list=PL6334s8hsQG0-paS6qXI5_Mt7gsfZwoE9"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-purple-700 hover:underline font-bold text-lg mb-2"
              >
                YouTube: AP Statistics Playlist
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APStatisticsStudyGuide;
