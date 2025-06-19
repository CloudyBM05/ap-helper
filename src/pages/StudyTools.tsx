import React, { useState } from 'react';
import { 
  Zap, 
  BookOpen, 
  Calculator, 
  Shuffle, 
  Download,
  Play,
  Star,
  Clock
} from 'lucide-react';

const StudyTools = () => {
  const [selectedTool, setSelectedTool] = useState('flashcards');

  const tools = [
    { id: 'flashcards', name: 'Flashcards', icon: Zap },
    { id: 'quiz', name: 'Quiz Generator', icon: Shuffle },
    { id: 'formulas', name: 'Formula Sheets', icon: Calculator },
    { id: 'references', name: 'Reference Guides', icon: BookOpen }
  ];

  const flashcardSets = [
    {
      id: 1,
      title: 'AP Biology Vocabulary',
      cards: 250,
      subject: 'Biology',
      difficulty: 'Intermediate',
      rating: 4.8,
      users: 15600,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 2,
      title: 'AP US History Key Terms',
      cards: 180,
      subject: 'History',
      difficulty: 'Advanced',
      rating: 4.7,
      users: 12300,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 3,
      title: 'AP Chemistry Formulas',
      cards: 95,
      subject: 'Chemistry',
      difficulty: 'Advanced',
      rating: 4.9,
      users: 8900,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 4,
      title: 'AP Spanish Vocabulary',
      cards: 320,
      subject: 'Spanish',
      difficulty: 'Intermediate',
      rating: 4.6,
      users: 7200,
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const formulaSheets = [
    {
      id: 1,
      title: 'AP Calculus Formula Sheet',
      subject: 'Calculus',
      pages: 4,
      downloads: 25600,
      topics: ['Derivatives', 'Integrals', 'Series', 'Applications'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 2,
      title: 'AP Statistics Reference',
      subject: 'Statistics',
      pages: 3,
      downloads: 18900,
      topics: ['Distributions', 'Tests', 'Confidence Intervals', 'Regression'],
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 3,
      title: 'AP Physics Equations',
      subject: 'Physics',
      pages: 5,
      downloads: 14200,
      topics: ['Mechanics', 'Electricity', 'Magnetism', 'Waves'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 4,
      title: 'AP Chemistry Constants',
      subject: 'Chemistry',
      pages: 2,
      downloads: 16800,
      topics: ['Constants', 'Equations', 'Periodic Trends', 'Thermodynamics'],
      color: 'from-orange-500 to-amber-500'
    }
  ];

  const renderFlashcards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flashcardSets.map((set) => (
        <div key={set.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
          <div className={`h-24 bg-gradient-to-r ${set.color} relative`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute bottom-3 left-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{set.title}</h3>
            <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
              <span>{set.cards} cards</span>
              <span className="px-2 py-1 bg-slate-100 rounded-full">{set.difficulty}</span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-slate-600">{set.rating}</span>
              </div>
              <span className="text-sm text-slate-500">{set.users.toLocaleString()} users</span>
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Study Now</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderQuizGenerator = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Generate Custom Quiz</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Select AP Course
          </label>
          <select className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300">
            <option>AP Biology</option>
            <option>AP Chemistry</option>
            <option>AP Physics</option>
            <option>AP Calculus</option>
            <option>AP Statistics</option>
            <option>AP US History</option>
            <option>AP World History</option>
            <option>AP English Language</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Number of Questions
          </label>
          <select className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300">
            <option>10 Questions</option>
            <option>20 Questions</option>
            <option>30 Questions</option>
            <option>50 Questions</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Difficulty Level
          </label>
          <select className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300">
            <option>Mixed Difficulty</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Time Limit
          </label>
          <select className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300">
            <option>No Time Limit</option>
            <option>15 Minutes</option>
            <option>30 Minutes</option>
            <option>45 Minutes</option>
            <option>60 Minutes</option>
          </select>
        </div>
      </div>
      
      <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center space-x-2">
        <Shuffle className="w-5 h-5" />
        <span>Generate Quiz</span>
      </button>
    </div>
  );

  const renderFormulaSheets = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {formulaSheets.map((sheet) => (
        <div key={sheet.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
          <div className={`h-24 bg-gradient-to-r ${sheet.color} relative`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute bottom-3 left-4">
              <Calculator className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{sheet.title}</h3>
            <p className="text-slate-600 mb-4">{sheet.pages} pages • {sheet.downloads.toLocaleString()} downloads</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {sheet.topics.map((topic, index) => (
                <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                  {topic}
                </span>
              ))}
            </div>
            
            <button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (selectedTool) {
      case 'flashcards':
        return renderFlashcards();
      case 'quiz':
        return renderQuizGenerator();
      case 'formulas':
        return renderFormulaSheets();
      case 'references':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Reference Guides Coming Soon</h3>
            <p className="text-slate-600">We're working on comprehensive reference guides for all AP courses.</p>
          </div>
        );
      default:
        return renderFlashcards();
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Study Tools
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Enhance your AP preparation with our collection of study tools. Create flashcards, 
            generate custom quizzes, and access formula sheets for all AP courses.
          </p>
        </div>

        {/* Tool Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedTool === tool.id
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:text-blue-600 hover:bg-blue-50 shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tool.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tool Content */}
        <div className="mb-12">
          {renderContent()}
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Study Tool Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Interactive Learning</h3>
              <p className="text-slate-600">Engage with dynamic flashcards and quizzes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Progress Tracking</h3>
              <p className="text-slate-600">Monitor your learning progress over time</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Offline Access</h3>
              <p className="text-slate-600">Download materials for studying anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyTools;