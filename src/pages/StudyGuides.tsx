import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const studyGuides = [
  {
    id: 'apush',
    title: 'AP US History Study Guide',
    description: 'Comprehensive guide for APUSH, including all units, timelines, and practice questions.',
    category: 'social',
    link: '/apush-study-guide',
    color: 'from-blue-500 to-indigo-500',
    tags: ['Units 1-9', 'Timelines', 'Practice Questions']
  },
  {
    id: 'apgov',
    title: 'AP US Government Study Guide',
    description: 'Comprehensive guide for AP GOV, including all units, foundational documents, and practice questions.',
    category: 'social',
    link: '/ap-gov-study-guide',
    color: 'from-red-500 to-orange-500',
    tags: ['Units 1-5', 'Foundational Docs', 'Practice Questions']
  },
  {
    id: 'apworld',
    title: 'AP World History Study Guide',
    description: 'Comprehensive guide for AP World, including all units, timelines, and practice questions.',
    category: 'social',
    link: '/ap-world-study-guide',
    color: 'from-green-500 to-emerald-500',
    tags: ['Units 1-9', 'Timelines', 'Practice Questions']
  },
  {
    id: 'appsych',
    title: 'AP Psychology Study Guide',
    description: 'Comprehensive guide for AP Psychology, including all units, key terms, and practice questions.',
    category: 'social',
    link: '/ap-psychology-study-guide',
    color: 'from-yellow-500 to-pink-500',
    tags: ['Units 1-5', 'Key Terms', 'Practice Questions']
  },
  {
    id: 'apmicro',
    title: 'AP Microeconomics Study Guide',
    description: 'Comprehensive guide for AP Microeconomics, including all units, key concepts, and practice questions.',
    category: 'social',
    link: '/ap-microeconomics-study-guide',
    color: 'from-fuchsia-500 to-cyan-500',
    tags: ['Units 1-6', 'Key Concepts', 'Practice Questions']
  },
  {
    id: 'apmacro',
    title: 'AP Macroeconomics Study Guide',
    description: 'Comprehensive guide for AP Macroeconomics, including all units, key concepts, and practice questions.',
    category: 'social',
    link: '/ap-macroeconomics-study-guide',
    color: 'from-cyan-500 to-fuchsia-500',
    tags: ['Units 1-6', 'Key Concepts', 'Practice Questions']
  },
  {
    id: 'aphug',
    title: 'AP Human Geography Study Guide',
    description: 'Comprehensive guide for AP Human Geography, including all units, key concepts, and practice questions.',
    category: 'social',
    link: '/ap-human-geography-study-guide',
    color: 'from-emerald-500 to-blue-500',
    tags: [
      'Units 1-7',
      'Key Concepts',
      'Practice Questions'
    ]
  },
  {
    id: 'apstats',
    title: 'AP Statistics Study Guide',
    description: 'Comprehensive guide for AP Statistics, including all units, statistical concepts, and practice problems.',
    category: 'stem',
    link: '/ap-statistics-study-guide',
    color: 'from-purple-500 to-indigo-500',
    tags: ['Units 1-9', 'Statistical Tests', 'Practice Problems']
  },
  {
    id: 'apphysics',
    title: 'AP Physics 1 Study Guide',
    description: 'Comprehensive guide for AP Physics 1, including mechanics, electricity & magnetism, and modern physics concepts.',
    category: 'stem',
    link: '/ap-physics-study-guide',
    color: 'from-teal-500 to-cyan-500',
    tags: ['Units 1-8', 'Kinematics', 'Forces', 'Energy']
  },
  {
    id: 'apcsp',
    title: 'AP Computer Science Principles Study Guide',
    description: 'Comprehensive guide for AP CSP, including computational thinking, programming concepts, and impact of computing.',
    category: 'stem',
    link: '/ap-computer-science-principles-study-guide',
    color: 'from-violet-500 to-purple-500',
    tags: ['Big Ideas 1-5', 'Programming', 'Data & Analysis', 'Algorithms']
  },
  {
    id: 'apcsa',
    title: 'AP Computer Science A Study Guide',
    description: 'Comprehensive guide for AP CSA, including Java programming, object-oriented design, and data structures.',
    category: 'stem',
    link: '/apcsa-study-guide',
    color: 'from-orange-500 to-red-500',
    tags: ['Units 1-4', 'Java Programming', 'OOP', 'Algorithms']
  },
  {
    id: 'apbiology',
    title: 'AP Biology Study Guide',
    description: 'Comprehensive guide for AP Biology, including all units, molecular biology, ecology, and laboratory practices.',
    category: 'stem',
    link: '/ap-biology-study-guide',
    color: 'from-lime-500 to-green-500',
    tags: ['Units 1-8', 'Cell Biology', 'Genetics', 'Evolution', 'Ecology']
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
                <div
                  className="h-28 flex items-center justify-center"
                  style={{
                    background:
                      guide.id === 'apush'
                        ? 'linear-gradient(to right, #3b82f6, #6366f1)' // blue-indigo
                        : guide.id === 'apgov'
                        ? 'linear-gradient(to right, #ef4444, #f59e42)' // red-orange
                        : guide.id === 'apworld'
                        ? 'linear-gradient(to right, #10b981, #059669)' // green-emerald
                        : guide.id === 'appsych'
                        ? 'linear-gradient(to right, #facc15, #ec4899)' // yellow-pink
                        : guide.id === 'apmicro'
                        ? 'linear-gradient(to right, #a21caf, #06b6d4)' // fuchsia-cyan
                        : guide.id === 'apmacro'
                        ? 'linear-gradient(to right, #06b6d4, #a21caf)' // cyan-fuchsia
                        : guide.id === 'aphug'
                        ? 'linear-gradient(to right, #34d399, #3b82f6)' // emerald-blue
                        : guide.id === 'apstats'
                        ? 'linear-gradient(to right, #8b5cf6, #6366f1)' // purple-indigo
                        : guide.id === 'apphysics'
                        ? 'linear-gradient(to right, #14b8a6, #06b6d4)' // teal-cyan
                        : guide.id === 'apcsp'
                        ? 'linear-gradient(to right, #8b5cf6, #a855f7)' // violet-purple
                        : guide.id === 'apcsa'
                        ? 'linear-gradient(to right, #f97316, #ef4444)' // orange-red
                        : guide.id === 'apbiology'
                        ? 'linear-gradient(to right, #84cc16, #22c55e)' // lime-green
                        : '#fff',
                  }}
                >
                  <BookOpen className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-bold text-blue-700">{guide.title}</span>
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