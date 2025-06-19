import React from 'react';
import { useNavigate } from 'react-router-dom';

const apushUnits = [
  { unit: 1, period: '1491–1607', emoji: '🌎', title: 'World/Exploration' },
  { unit: 2, period: '1607–1754', emoji: '⚓️', title: 'Colonization/Atlantic World' },
  { unit: 3, period: '1754–1800', emoji: '🦅', title: 'American Revolution/New Nation' },
  { unit: 4, period: '1800–1848', emoji: '🚂', title: 'Expansion/Industrialization Begins' },
  { unit: 5, period: '1844–1877', emoji: '⚔️', title: 'Civil War' },
  { unit: 6, period: '1865–1898', emoji: '🏭', title: 'Gilded Age/Industry' },
  { unit: 7, period: '1890–1945', emoji: '🌍', title: 'World Wars/Global Power' },
  { unit: 8, period: '1945–1980', emoji: '☢️', title: 'Cold War' },
  { unit: 9, period: '1980–Present', emoji: '🌐', title: 'Globalization/Technology' },
];

const APUSHStudyGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/apush-study-guide')}
          className="mb-8 px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition"
        >
          ← Back to All APUSH Units
        </button>
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">AP US History Units</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {apushUnits.map((unit) => (
            <div
              key={unit.unit}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/apush-study-guide/unit/${unit.unit}`)}
            >
              <div className="text-4xl mb-2">{unit.emoji}</div>
              <div className="text-lg font-bold text-blue-700 mb-1">{`Unit ${unit.unit}`}</div>
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
              className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-xl transition-all duration-300 border-2 border-blue-300 w-full"
              onClick={() => navigate('/apush-timeline')}
            >
              <div className="text-4xl mb-2">🕰️</div>
              <div className="text-lg font-bold text-blue-700 mb-1">APUSH Timeline</div>
              <div className="text-slate-600 mb-1">All Periods</div>
              <div className="text-slate-500">Click to view a visual timeline of major events</div>
            </div>
          </div>
          {/* Other Useful Study Tools */}
          <div className="flex-1 flex items-stretch">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-blue-100 w-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 text-blue-800 text-center">Other Useful Study Tools</h2>
              <a
                href="https://docs.google.com/document/d/1GZZ2Zpjh1DF7p0JAKJg0IOYGDW9FPhIm3eYTNTVGXoo/view?tab=t.0#heading=h.k3w3s8gurfz9"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-700 hover:underline font-semibold"
              >
                APUSH Review Resources (Google Doc)
              </a>
              <a
                href="https://knowt.com/exams/AP/AP-United-States-History-"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-700 hover:underline font-semibold"
              >
                Knowt: APUSH Study Guides & Practice Exams
              </a>
              <a
                href="https://www.barronseduc.com/blogs/ap/post/how-to-study-for-ap-us-history-exam"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-700 hover:underline font-semibold"
              >
                Barron's: How to Study for the APUSH Exam
              </a>
              <a
                href="https://youtu.be/7zGAMelb3YM?si=9TGCV8_EA8_djERT"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-700 hover:underline font-semibold"
              >
                APUSH in 30 Min (YouTube Video)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APUSHStudyGuide;