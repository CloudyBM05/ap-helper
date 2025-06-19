import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Star } from 'lucide-react';

const studyGuides = [
  {
    id: 'apush',
    title: 'AP US History Study Guide',
    description: 'Comprehensive guide for APUSH, including all units, timelines, and practice questions.',
    category: 'social',
    emoji: '🇺🇸',
    link: '/apush-study-guide',
    color: 'from-blue-500 to-indigo-500',
    tags: ['Units 1-9', 'Timelines', 'Practice Questions'],
    rating: 4.9,
    reviews: 1200
  }
];

const categories = [
  { id: 'all', name: 'All Courses' },
  { id: 'stem', name: 'STEM & Math' },
  { id: 'english', name: 'English' },
  { id: 'social', name: 'Social Studies' },
  { id: 'languages', name: 'Languages' },
  { id: 'arts', name: 'Arts' }
];

const StudyGuides: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const filteredGuides =
    selectedCategory === 'all'
      ? studyGuides
      : studyGuides.filter((guide) => guide.category === selectedCategory);

  return (
    <div className="min-h-screen py-12 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Study Guides</h1>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:text-blue-600 hover:bg-blue-50 shadow-md'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredGuides.length === 0 ? (
            <div className="col-span-full text-center text-slate-500">No study guides available.</div>
          ) : (
            filteredGuides.map((guide) => (
              <div
                key={guide.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-blue-100 hover:border-blue-400 overflow-hidden flex flex-col"
                onClick={() => navigate(guide.link)}
              >
                {/* Color banner with icon */}
                <div className={`h-28 bg-gradient-to-r ${guide.color} flex items-center justify-center`}>
                  <BookOpen className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-2">{guide.emoji}</span>
                    <span className="text-lg font-bold text-blue-700">{guide.title}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="font-semibold text-yellow-600">{guide.rating}</span>
                    <span className="ml-2 text-xs text-slate-500">{guide.reviews} reviews</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {guide.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-slate-600 mb-4">{guide.description}</div>
                  <button
                    className="mt-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition"
                    onClick={e => {
                      e.stopPropagation();
                      navigate(guide.link);
                    }}
                  >
                    Study
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyGuides;