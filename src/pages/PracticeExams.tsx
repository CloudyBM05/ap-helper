import React, { useState } from 'react';
import { Brain, Clock, Target, Play, CheckCircle, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PracticeExams = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'stem', name: 'STEM & Math' },
    { id: 'english', name: 'English' },
    { id: 'social', name: 'Social Studies' },
    { id: 'languages', name: 'Languages' },
    { id: 'arts', name: 'Arts' }
  ];

  // Only keep AP US History Practice Test
  const practiceExams = [
    {
      id: 2,
      title: 'AP US History Practice Test',
      category: 'social',
      questions: 55,
      duration: 95,
      difficulty: 'Advanced',
      attempts: 31200,
      avgScore: 72,
      description: 'Comprehensive test covering all periods of US History with detailed explanations.',
      topics: ['Colonial Era', 'Civil War', 'Industrial Age', 'Modern America'],
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  const filteredExams = selectedCategory === 'all' 
    ? practiceExams 
    : practiceExams.filter(exam => exam.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Practice AP Exams
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Take full-length practice exams for 20+ AP courses. Get instant scoring, 
            detailed explanations, and track your progress over time.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">20+</h3>
            <p className="text-slate-600">AP Courses</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">1000+</h3>
            <p className="text-slate-600">Practice Questions</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">150K+</h3>
            <p className="text-slate-600">Tests Taken</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">4.8</h3>
            <p className="text-slate-600">Average Rating</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
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

        {/* Practice Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className={`h-32 bg-gradient-to-r ${exam.color} relative`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                {/* Removed the Advanced tag */}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{exam.title}</h3>
                <p className="text-slate-600 mb-4">{exam.description}</p>
                
                <div className="grid grid-cols-1 gap-2 mb-4 text-sm text-slate-600">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">Multiple Real MCQ's</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">AI Graded: SAQ, DBQ, and LEQ</span>
                  </div>
                </div>
                
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300 flex items-center justify-center space-x-2"
                  onClick={() => navigate('/apush-practice-exam/mcq/select')}
                >
                  <Play className="w-5 h-5" />
                  <span>Start Practice Exam</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Practice Exam Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Timed Practice</h3>
              <p className="text-slate-600">Simulate real exam conditions with accurate timing</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Instant Scoring</h3>
              <p className="text-slate-600">Get immediate results with detailed explanations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">Progress Tracking</h3>
              <p className="text-slate-600">Monitor improvement across multiple attempts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeExams;