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
      id: 1,
      title: 'AP World History Practice Test',
      category: 'social',
      questions: 55,
      duration: 95,
      difficulty: 'Advanced',
      attempts: 21000,
      avgScore: 70,
      description: 'Comprehensive test covering all periods of World History with detailed explanations.',
      topics: ['Global Tapestry', 'Networks of Exchange', 'Empires', 'Revolutions', 'Modern World'],
      color: 'from-green-500 to-emerald-500',
      type: 'apworld'
    },
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
      color: 'from-blue-500 to-indigo-500',
      type: 'apush'
    },
    {
      id: 3,
      title: 'AP US Government Practice Test',
      category: 'social',
      questions: 55,
      duration: 100,
      difficulty: 'Advanced',
      attempts: 18400,
      avgScore: 75,
      description: 'Full-length AP Gov exam with all question types and instant feedback.',
      topics: ['MCQ Practice', 'Concept Application', 'Quantitative Analysis', 'SCOTUS Comparison', 'Argumentative Essay'],
      color: 'from-red-500 to-pink-500',
      type: 'apgov'
    },
    {
      id: 4,
      title: 'AP Psychology Practice Test',
      category: 'social',
      questions: 55,
      duration: 95,
      difficulty: 'Advanced',
      attempts: 12000,
      avgScore: 74,
      description: 'Full-length AP Psychology exam with MCQ, Article Analysis, and Evidence-Based questions.',
      topics: ['MCQ Practice', 'Article Analysis', 'Evidence-Based Question'],
      color: 'from-yellow-500 to-pink-500',
      type: 'appypsych'
    },
    {
      id: 5,
      title: 'AP Microeconomics Practice Test',
      category: 'social',
      questions: 60,
      duration: 95,
      difficulty: 'Advanced',
      attempts: 8000,
      avgScore: 73,
      description: 'Full-length AP Microeconomics exam with MCQ, Long FRQ, and Short FRQ options.',
      topics: ['MCQ Practice', 'Long FRQ', 'Short FRQ'],
      color: 'from-fuchsia-500 to-pink-500',
      type: 'apmicro'
    },
    {
      id: 6,
      title: 'AP Macroeconomics Practice Test',
      category: 'social',
      questions: 60,
      duration: 95,
      difficulty: 'Advanced',
      attempts: 5000,
      avgScore: 74,
      description: 'Full-length AP Macroeconomics exam with MCQ, Long FRQ, and Short FRQ options.',
      topics: ['MCQ Practice', 'Long FRQ', 'Short FRQ'],
      color: 'from-cyan-500 to-blue-500',
      type: 'apmacro'
    },
    {
      id: 7,
      title: 'AP Human Geography Practice Test',
      category: 'social',
      questions: 60,
      duration: 95,
      difficulty: 'Advanced',
      attempts: 6000,
      avgScore: 75,
      description: 'Full-length AP Human Geography exam with MCQ and free response options.',
      topics: [
        'Concept Application',
        'Spatial Relationships & Data Interpretation',
        'Scale Analysis & Synthesis'
      ],
      color: 'from-emerald-500 to-blue-500',
      type: 'aphug'
    },
    {
      id: 8,
      title: 'AP Statistics Practice Test',
      category: 'stem',
      questions: 40,
      duration: 90,
      difficulty: 'Advanced',
      attempts: 4200,
      avgScore: 72,
      description: 'Full-length AP Statistics exam with MCQ, shorter free response questions, and investigative task.',
      topics: [
        'MCQ Practice',
        'Shorter FRQs',
        'Investigative Task'
      ],
      color: 'from-purple-500 to-fuchsia-500',
      type: 'apstats'
    },
    {
      id: 9,
      title: 'AP Physics Practice Test',
      category: 'stem',
      questions: 50,
      duration: 90,
      difficulty: 'Advanced',
      attempts: 3800,
      avgScore: 71,
      description: 'Full-length AP Physics exam with MCQ and comprehensive free response questions covering all major physics concepts.',
      topics: [
        'MCQ Practice',
        'Mathematical Routines',
        'Translation Between Representations',
        'Experimental Design and Analysis',
        'Qualitative/Quantitative Translation'
      ],
      color: 'from-teal-500 to-cyan-500',
      type: 'apphysics'
    },
    {
      id: 10,
      title: 'AP Computer Science Principles Practice Test',
      category: 'stem',
      questions: 70,
      duration: 120,
      difficulty: 'Advanced',
      attempts: 5200,
      avgScore: 76,
      description: 'Full-length AP Computer Science Principles exam focusing on computational thinking, programming concepts, and data analysis.',
      topics: [
        'MCQ Practice',
        'Computational Thinking',
        'Programming Concepts',
        'Data Analysis',
        'Internet & Computing Systems'
      ],
      color: 'from-indigo-500 to-purple-500',
      type: 'apcsp'
    },
    {
      id: 11,
      title: 'AP Biology Practice Test',
      category: 'stem',
      questions: 60,
      duration: 90,
      difficulty: 'Advanced',
      attempts: 7800,
      avgScore: 73,
      description: 'Full-length AP Biology exam with MCQ and comprehensive free response questions covering all major biology concepts.',
      topics: [
        'MCQ Practice',
        'Long FRQ',
        'Short FRQ',
        'Evolution',
        'Ecology',
        'Cell Biology',
        'Genetics',
        'Molecular Biology'
      ],
      color: 'from-green-500 to-emerald-600',
      type: 'apbiology'
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
              <div
                className={`h-32 flex items-center justify-center relative bg-gradient-to-r ${exam.type !== 'apmicro' ? exam.color : ''}`}
                style={
                  exam.type === 'apmicro'
                    ? { background: 'linear-gradient(to right, #a21caf, #06b6d4)' }
                    : undefined
                }
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{exam.title}</h3>
                <p className="text-slate-600 mb-4">{exam.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {exam.topics.map((topic) => (
                    <span key={topic} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">{topic}</span>
                  ))}
                </div>
                {/* APUSH Free Response Options */}
                {exam.type === 'apush' && (
                  <div className="mb-4">
                    <div className="font-semibold text-slate-800 mb-2">APUSH Free Response (AI Graded):</div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-200"
                        onClick={() => navigate('/apush-practice-exam/dbq/select')}
                      >
                        DBQ (Document-Based Question)
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-teal-500 hover:to-teal-700 transition-all duration-200"
                        onClick={() => navigate('/apush-practice-exam/leq/select')}
                      >
                        LEQ (Long Essay Question)
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-500 hover:to-purple-700 transition-all duration-200"
                        onClick={() => navigate('/apush-practice-exam/saq/select')}
                      >
                        SAQ (Short Answer Question)
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">All free response questions are AI graded for instant feedback.</div>
                  </div>
                )}
                {/* AP Gov Free Response Options */}
                {exam.type === 'apgov' && (
                  <div className="mb-4">
                    <div className="font-semibold text-slate-800 mb-2">AP Gov Free Response (AI Graded):</div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-200"
                        onClick={() => navigate('/ap-gov-practice-exam/concept-application')}
                      >
                        Concept Application
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-teal-500 hover:to-teal-700 transition-all duration-200"
                        onClick={() => navigate('/ap-gov-practice-exam/quantitative-analysis')}
                      >
                        Quantitative Analysis
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-500 hover:to-purple-700 transition-all duration-200"
                        onClick={() => navigate('/ap-gov-practice-exam/scotus-case')}
                      >
                        SCOTUS Comparison
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-pink-400 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-500 hover:to-pink-700 transition-all duration-200"
                        onClick={() => navigate('/ap-gov-practice-exam/argumentative-essay')}
                      >
                        Argumentative Essay
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">All free response questions are AI graded for instant feedback.</div>
                  </div>
                )}
                {/* AP World Free Response Options */}
                {exam.type === 'apworld' && (
                  <div className="mb-4">
                    <div className="font-semibold text-slate-800 mb-2">AP World Free Response (AI Graded):</div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-200"
                        onClick={() => navigate('/apworld-practice-exam/dbq/select')}
                      >
                        DBQ (Document-Based Question)
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-teal-500 hover:to-teal-700 transition-all duration-200"
                        onClick={() => navigate('/apworld-practice-exam/leq/select')}
                      >
                        LEQ (Long Essay Question)
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-500 hover:to-purple-700 transition-all duration-200"
                        onClick={() => navigate('/apworld-practice-exam/saq/select')}
                      >
                        SAQ (Short Answer Question)
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">All free response questions are AI graded for instant feedback.</div>
                  </div>
                )}
                {/* AP Psychology Free Response Options */}
                {exam.type === 'appypsych' && (
                  <div className="mb-4">
                    <div className="font-semibold text-slate-800 mb-2">AP Psychology Free Response (AI Graded):</div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-200"
                        onClick={() => navigate('/ap-psychology-practice-exam/article-analysis')}
                      >
                        Article Analysis Question
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-pink-400 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-500 hover:to-pink-700 transition-all duration-200"
                        onClick={() => navigate('/ap-psychology-practice-exam/evidence-based')}
                      >
                        Evidence-Based Question
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">All free response questions are AI graded for instant feedback.</div>
                  </div>
                )}
                {/* AP Micro Free Response Options */}
                {exam.type === 'apmicro' && (
                  <div className="mb-4">
                    <div className="font-semibold text-slate-800 mb-2">AP Micro Free Response (AI Graded):</div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="w-full bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-fuchsia-500 hover:to-fuchsia-700 transition-all duration-200"
                        onClick={() => navigate('/ap-microeconomics-practice-exam/long-frq')}
                      >
                        Long FRQ
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-pink-400 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-500 hover:to-pink-700 transition-all duration-200"
                        onClick={() => navigate('/ap-microeconomics-practice-exam/short-frq')}
                      >
                        Short FRQ
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">All free response questions are AI graded for instant feedback.</div>
                  </div>
                )}
                {/* AP Macro Free Response Options */}
                {exam.type === 'apmacro' && (
                  <div className="mb-4">
                    <div className="font-semibold text-slate-800 mb-2">AP Macro Free Response (AI Graded):</div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-cyan-500 hover:to-cyan-700 transition-all duration-200"
                        onClick={() => navigate('/ap-macro-practice-exam/long-frq')}
                      >
                        Long FRQ
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-200"
                        onClick={() => navigate('/ap-macro-short-frq-select')}
                      >
                        Short FRQ
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">All free response questions are AI graded for instant feedback.</div>
                  </div>
                )}
                {/* AP Human Geography Free Response Options */}
                {exam.type === 'aphug' && (
                  <div className="mb-4">
                    <div className="font-semibold text-slate-800 mb-2">AP Human Geography Free Response (AI Graded):</div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="w-full bg-gradient-to-r from-emerald-400 to-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-500 hover:to-blue-600 transition-all duration-200"
                        onClick={() => navigate('/ap-human-geography-practice-exam/concept-application')}
                      >
                        Concept Application
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-500 hover:to-blue-500 transition-all duration-200"
                        onClick={() => navigate('/ap-human-geography-practice-exam/spatial-relationships')}
                      >
                        Spatial Relationships & Data Interpretation
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-emerald-500 to-blue-400 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-500 transition-all duration-200"
                        onClick={() => navigate('/ap-human-geography-practice-exam/scale-analysis')}
                      >
                        Scale Analysis & Synthesis
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">All free response questions are AI graded for instant feedback.</div>
                  </div>
                )}
                {/* AP Statistics Free Response Options */}
                {exam.type === 'apstats' && (
                  <div className="mb-4">
                    <div className="font-semibold text-slate-800 mb-2">AP Statistics Free Response (AI Graded):</div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="w-full bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-500 hover:to-purple-700 transition-all duration-200"
                        onClick={() => navigate('/ap-statistics-practice-exam/shorter-frq')}
                      >
                        Shorter FRQs
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-fuchsia-500 hover:to-fuchsia-700 transition-all duration-200"
                        onClick={() => navigate('/ap-statistics-practice-exam/investigative-task/select')}
                      >
                        Investigative Task
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">All free response questions are AI graded for instant feedback.</div>
                  </div>
                )}
                {/* AP Physics Free Response Options */}
                {exam.type === 'apphysics' && (
                  <div className="mb-4">
                    <div className="font-semibold text-slate-800 mb-2">AP Physics Free Response (AI Graded):</div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-teal-500 hover:to-teal-700 transition-all duration-200"
                        onClick={() => navigate('/ap-physics-practice-exam/mathematical-routines')}
                      >
                        Mathematical Routines
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-cyan-400 to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-cyan-500 hover:to-cyan-700 transition-all duration-200"
                        onClick={() => navigate('/ap-physics-practice-exam/translation-representations')}
                      >
                        Translation Between Representations
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-500 hover:to-blue-700 transition-all duration-200"
                        onClick={() => navigate('/ap-physics-practice-exam/experimental-design')}
                      >
                        Experimental Design and Analysis
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-indigo-400 to-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-indigo-500 hover:to-indigo-700 transition-all duration-200"
                        onClick={() => navigate('/ap-physics-practice-exam/qualitative-quantitative')}
                      >
                        Qualitative/Quantitative Translation
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">All free response questions are AI graded for instant feedback.</div>
                  </div>
                )}
                {/* AP Biology Free Response Options */}
                {exam.type === 'apbiology' && (
                  <div className="mb-4">
                    <div className="font-semibold text-slate-800 mb-2">AP Biology Free Response (AI Graded):</div>
                    <div className="flex flex-col gap-2">
                      <button
                        className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-500 hover:to-green-700 transition-all duration-200"
                        onClick={() => navigate('/ap-biology-practice-exam/long-frq')}
                      >
                        Long FRQ
                      </button>
                      <button
                        className="w-full bg-gradient-to-r from-emerald-400 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-emerald-500 hover:to-emerald-700 transition-all duration-200"
                        onClick={() => navigate('/ap-biology-practice-exam/short-frq')}
                      >
                        Short FRQ
                      </button>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">All free response questions are AI graded for instant feedback.</div>
                  </div>
                )}
                {/* MCQ Buttons for each exam type */}
                {exam.type === 'apworld' && (
                  <button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => navigate('/apworld-practice-exam/mcq/select')}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start MCQ Exam</span>
                  </button>
                )}
                {exam.type === 'apush' && (
                  <button
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => navigate('/apush-practice-exam/mcq/select')}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start MCQ Exam</span>
                  </button>
                )}
                {exam.type === 'apgov' && (
                  <button
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => navigate('/ap-gov-practice-exam/mcq/select')}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start MCQ Exam</span>
                  </button>
                )}
                {exam.type === 'appypsych' && (
                  <button
                    className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => navigate('/ap-psychology-practice-exam/mcq/select')}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start MCQ Exam</span>
                  </button>
                )}
                {exam.type === 'apmicro' && (
                  <button
                    className="w-full text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                    style={{ background: 'linear-gradient(to right, #a21caf, #06b6d4)' }}
                    onClick={() => navigate('/ap-microeconomics-practice-exam/mcq/select')}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start MCQ Exam</span>
                  </button>
                )}
                {exam.type === 'apmacro' && (
                  <button
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => navigate('/ap-macroeconomics-practice-exam/mcq/select')}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start MCQ Exam</span>
                  </button>
                )}
                {exam.type === 'apstats' && (
                  <button
                    className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-fuchsia-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => navigate('/ap-statistics-practice-exam/mcq/select')}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start MCQ Exam</span>
                  </button>
                )}
                {exam.type === 'aphug' && (
                  <button
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => navigate('/ap-human-geography-practice-exam/mcq/select')}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start MCQ Exam</span>
                  </button>
                )}
                {exam.type === 'apphysics' && (
                  <button
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => navigate('/ap-physics-practice-exam/mcq')}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start MCQ Exam</span>
                  </button>
                )}
                {exam.type === 'apcsp' && (
                  <button
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => navigate('/ap-csp-practice-exam/mcq')}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start MCQ Exam</span>
                  </button>
                )}
                {exam.type === 'apbiology' && (
                  <button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    onClick={() => navigate('/ap-biology-practice-exam/mcq/select')}
                  >
                    <Play className="w-5 h-5" />
                    <span>Start MCQ Exam</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeExams;