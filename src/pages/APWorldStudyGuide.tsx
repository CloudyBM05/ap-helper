import React from 'react';
import { useNavigate } from 'react-router-dom';

const worldUnits = [
  { unit: 1, period: '1200–1450', emoji: '🌏', title: 'Global Tapestry' },
  { unit: 2, period: '1200–1450', emoji: '🛤️', title: 'Networks of Exchange' },
  { unit: 3, period: '1450–1750', emoji: '🏰', title: 'Land-Based Empires' },
  { unit: 4, period: '1450–1750', emoji: '🚢', title: 'Transoceanic Interconnections' },
  { unit: 5, period: '1750–1900', emoji: '⚡', title: 'Revolutions' },
  { unit: 6, period: '1750–1900', emoji: '🏭', title: 'Consequences of Industrialization' },
  { unit: 7, period: '1900–present', emoji: '⚔️', title: 'Global Conflict' },
  { unit: 8, period: '1900–present', emoji: '🕊️', title: 'Cold War & Decolonization' },
  { unit: 9, period: '1900–present', emoji: '🌐', title: 'Globalization' },
];

const timeline = [
  { year: '1200', event: 'Rise of major world religions and empires' },
  { year: '1450', event: 'Start of global maritime exploration' },
  { year: '1750', event: 'Industrial Revolution begins' },
  { year: '1914', event: 'World War I' },
  { year: '1945', event: 'End of World War II; start of Cold War' },
  { year: '1991', event: 'End of Cold War; globalization accelerates' }
];

const studyTools = [
  {
    name: 'Practice Questions',
    link: '/apworld/practice-questions',
    description: 'Test your knowledge with AP World History practice questions.'
  },
  {
    name: 'Timeline Quiz',
    link: '/apworld/timeline-quiz',
    description: 'Quiz yourself on key events and periods.'
  },
  {
    name: 'Essay Prompts',
    link: '/apworld/essay-prompts',
    description: 'Practice writing historical arguments and DBQs.'
  }
];

const APWorldStudyGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/study-guides')}
          className="mb-8 px-4 py-2 rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition"
        >
          ← Back to Study Guides
        </button>
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">AP World History Units</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {worldUnits.map((unit) => (
            <div
              key={unit.unit}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-green-300"
              onClick={() => navigate(`/ap-world-study-guide/unit/${unit.unit}`)}
            >
              <div className="text-4xl mb-2">{unit.emoji}</div>
              <div className="text-lg font-bold text-green-700 mb-1">{`Unit ${unit.unit}`}</div>
              <div className="text-slate-600 mb-1">{unit.period}</div>
              <div className="text-slate-500">{unit.title}</div>
            </div>
          ))}
        </div>
        {/* Timeline and Study Tools Side by Side */}
        <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          {/* Timeline Box */}
          <div className="flex-1 flex items-stretch">
            <div
              className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-green-300 w-full"
              onClick={() => navigate('/apworld-timeline')}
            >
              <div className="text-4xl mb-2">🕰️</div>
              <div className="text-lg font-bold text-green-700 mb-1">AP World Timeline</div>
              <div className="text-slate-600 mb-1">All Periods</div>
              <div className="text-slate-500">Click to view a visual timeline of major events</div>
            </div>
          </div>
          {/* Other Useful Study Tools */}
          <div className="flex-1 flex items-stretch">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-green-100 w-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 text-green-800 text-center">Other Useful Study Tools</h2>
              <a
                href="https://library.fiveable.me/ap-world"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-700 hover:underline font-semibold"
              >
                Fiveable Notes
              </a>
              <a
                href="https://knowt.com/exams/AP/AP-World-History_Modern"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-700 hover:underline font-semibold"
              >
                Knowt notes
              </a>
              <a
                href="https://pie.yt/?v=https://youtu.be/w3572wc-D28?si=qbIRSozJzSr7jTeC&pieshare=1"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-700 hover:underline font-semibold"
              >
                AP World in 18 minutes
              </a>
              <a
                href="https://www.lumisource.io/ap/world-history/review/all"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-700 hover:underline font-semibold"
              >
                LumiSource AP World Notes
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APWorldStudyGuide;
