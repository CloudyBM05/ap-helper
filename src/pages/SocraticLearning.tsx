import { useState } from 'react';
import { Link } from 'react-router-dom';

const SocraticLearning = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 'apworld',
      title: 'AP World History',
      description: 'Explore global patterns and processes from 1200 CE to present',
      category: 'social',
      color: 'from-green-500 to-emerald-500',
      units: [
        { id: 1, emoji: '🏛️', title: 'The Global Tapestry', period: 'c. 1200-1450' },
        { id: 2, emoji: '🛤️', title: 'Networks of Exchange', period: 'c. 1200-1450' },
        { id: 3, emoji: '👑', title: 'Land-Based Empires', period: 'c. 1450-1750' },
        { id: 4, emoji: '🌊', title: 'Transoceanic Interconnections', period: 'c. 1450-1750' },
        { id: 5, emoji: '⚡', title: 'Revolutions', period: 'c. 1750-1900' },
        { id: 6, emoji: '🏭', title: 'Consequences of Industrialization', period: 'c. 1750-1900' },
        { id: 7, emoji: '💥', title: 'Global Conflict', period: 'c. 1900-present' },
        { id: 8, emoji: '❄️', title: 'Cold War and Decolonization', period: 'c. 1900-present' },
        { id: 9, emoji: '🌐', title: 'Globalization', period: 'c. 1900-present' }
      ]
    },
    {
      id: 'apush',
      title: 'AP US History',
      description: 'Discover the American story through critical thinking and analysis',
      category: 'social',
      color: 'from-blue-500 to-indigo-500',
      units: [
        { id: 1, emoji: '🌎', title: 'World/Exploration', period: '1491–1607' },
        { id: 2, emoji: '⚓️', title: 'Colonization/Atlantic World', period: '1607–1754' },
        { id: 3, emoji: '🦅', title: 'American Revolution/New Nation', period: '1754–1800' },
        { id: 4, emoji: '🚂', title: 'Expansion/Industrialization Begins', period: '1800–1848' },
        { id: 5, emoji: '⚔️', title: 'Civil War', period: '1844–1877' },
        { id: 6, emoji: '🏭', title: 'Gilded Age/Industry', period: '1865–1898' },
        { id: 7, emoji: '🌍', title: 'World Wars/Global Power', period: '1890–1945' },
        { id: 8, emoji: '☢️', title: 'Cold War', period: '1945–1980' },
        { id: 9, emoji: '🌐', title: 'Globalization/Technology', period: '1980–Present' }
      ]
    },
    {
      id: 'apgov',
      title: 'AP Government',
      description: 'Understand American democracy through Socratic dialogue',
      category: 'social',
      color: 'from-red-500 to-orange-500',
      units: [
        { id: 1, emoji: '📜', title: 'Foundations of Democracy', period: 'Constitutional Framework' },
        { id: 2, emoji: '🏛️', title: 'Interactions Among Branches', period: 'Government Structure' },
        { id: 3, emoji: '⚖️', title: 'Civil Liberties and Rights', period: 'Individual Rights' },
        { id: 4, emoji: '🗳️', title: 'Political Participation', period: 'Democratic Process' },
        { id: 5, emoji: '💭', title: 'Political Ideologies and Beliefs', period: 'Public Opinion' }
      ]
    },
    {
      id: 'apbiology',
      title: 'AP Biology',
      description: 'Explore life through scientific inquiry and critical thinking',
      category: 'stem',
      color: 'from-emerald-500 to-teal-500',
      units: [
        { id: 1, emoji: '🧬', title: 'Chemistry of Life', period: 'Biochemistry Foundations' },
        { id: 2, emoji: '🔬', title: 'Cell Structure and Function', period: 'Cellular Biology' },
        { id: 3, emoji: '⚡', title: 'Cellular Energetics', period: 'Metabolism & Energy' },
        { id: 4, emoji: '📡', title: 'Cell Communication', period: 'Signaling Pathways' },
        { id: 5, emoji: '🧬', title: 'Heredity', period: 'Genetics & Inheritance' },
        { id: 6, emoji: '🔄', title: 'Gene Expression', period: 'Molecular Biology' },
        { id: 7, emoji: '🌱', title: 'Natural Selection', period: 'Evolution Mechanisms' },
        { id: 8, emoji: '🌍', title: 'Ecology', period: 'Environmental Interactions' }
      ]
    },
    {
      id: 'appsychology',
      title: 'AP Psychology',
      description: 'Understand the mind and behavior through scientific psychology',
      category: 'stem',
      color: 'from-purple-500 to-pink-500',
      units: [
        { id: 1, emoji: '🧠', title: 'Scientific Foundations', period: 'Psychology as Science' },
        { id: 2, emoji: '🔬', title: 'Biological Bases', period: 'Brain & Behavior' },
        { id: 3, emoji: '👁️', title: 'Sensation and Perception', period: 'Sensory Processing' },
        { id: 4, emoji: '📚', title: 'Learning', period: 'Conditioning & Memory' },
        { id: 5, emoji: '🧩', title: 'Cognitive Psychology', period: 'Thinking & Memory' },
        { id: 6, emoji: '👶', title: 'Developmental Psychology', period: 'Lifespan Changes' },
        { id: 7, emoji: '👥', title: 'Personality', period: 'Individual Differences' },
        { id: 8, emoji: '🔄', title: 'Abnormal Behavior', period: 'Mental Health' },
        { id: 9, emoji: '💊', title: 'Treatment of Disorders', period: 'Therapeutic Approaches' },
        { id: 10, emoji: '👫', title: 'Social Psychology', period: 'Group Behavior' }
      ]
    },
    {
      id: 'apmicro',
      title: 'AP Microeconomics',
      description: 'Master market dynamics, consumer behavior, and economic decision-making',
      category: 'stem',
      color: 'from-green-500 to-blue-500',
      units: [
        { id: 1, emoji: '📊', title: 'Basic Economic Concepts', period: 'Scarcity & Choice' },
        { id: 2, emoji: '📈', title: 'Supply and Demand', period: 'Market Forces' },
        { id: 3, emoji: '🏭', title: 'Production, Cost & Perfect Competition', period: 'Firm Behavior' },
        { id: 4, emoji: '🏢', title: 'Imperfect Competition', period: 'Monopoly & Oligopoly' },
        { id: 5, emoji: '👷', title: 'Factor Markets', period: 'Labor & Capital' },
        { id: 6, emoji: '⚖️', title: 'Market Failures & Government Intervention', period: 'Policy Solutions' }
      ]
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

  const filteredCourses =
    selectedCategory === 'all'
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const selectedCourseData = courses.find(course => course.id === selectedCourse);

  return (
    <div className="min-h-screen py-12 px-4 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {!selectedCourse ? (
          // Course Selection View
          <>
            <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">Socratic Learning</h1>
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
              {filteredCourses.length === 0 ? (
                <div className="col-span-full text-center text-slate-500">No courses available.</div>
              ) : (
                filteredCourses.map((course) => {
                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-blue-100 hover:border-blue-400 overflow-hidden flex flex-col"
                    onClick={() => setSelectedCourse(course.id)}
                  >
                    {/* Color banner with icon */}
                    <div
                      className={`h-28 bg-gradient-to-r ${course.color} flex items-center justify-center`}
                    >
                      <div className="text-5xl">🤖</div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-lg font-bold text-blue-700">{course.title}</span>
                      </div>
                      <div className="text-slate-600 mb-4">{course.description}</div>
                      <button
                        className="mt-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourse(course.id);
                        }}
                      >
                        Explore Units
                      </button>
                    </div>
                  </div>
                );
                })
              )}
            </div>
          </>
        ) : (
          // Unit Selection View
          selectedCourseData && (
            <div className="py-12">
              <div className="max-w-5xl mx-auto px-4">
                {/* Back Button */}
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="mb-8 px-4 py-2 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition"
                >
                  ← Back to Courses
                </button>
                <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">{selectedCourseData.title} Units</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {selectedCourseData.units.map((unit) => (
                    <Link
                      key={unit.id}
                      to={`/socratic-chat/${selectedCourseData.id}/unit${unit.id}`}
                      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-blue-300"
                    >
                      <div className="text-4xl mb-2">{unit.emoji}</div>
                      <div className="text-lg font-bold text-blue-700 mb-1">{`Unit ${unit.id}`}</div>
                      <div className="text-slate-600 mb-1">{unit.period}</div>
                      <div className="text-slate-500">{unit.title}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SocraticLearning;
