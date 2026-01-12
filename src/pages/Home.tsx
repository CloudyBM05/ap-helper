import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Brain,
  MessageCircle,
  Lightbulb,
  Target
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      title: 'Socratic Learning',
      description: 'Discover concepts through guided questioning - learn by thinking, not memorizing.',
      icon: MessageCircle,
      link: '/socratic-learning',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'AI Graded FRQs',
      description: 'Get instant, detailed feedback on your FRQs, DBQs, and essays.',
      icon: GraduationCap,
      link: '/practice-exams',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Study Resources',
      description: 'Comprehensive study guides and practice materials for all AP courses.',
      icon: BookOpen,
      link: '/study-guides',
      color: 'from-purple-500 to-violet-600'
    }
  ];

  const socratics = [
    { icon: Lightbulb, title: 'Think, Don\'t Memorize', description: 'Discover concepts through guided questioning' },
    { icon: Brain, title: 'Deep Understanding', description: 'Build lasting knowledge through critical thinking' },
    { icon: MessageCircle, title: 'Personalized Dialogue', description: 'AI adapts to your learning pace and style' },
    { icon: Target, title: 'Concept Mastery', description: 'Track your understanding of key AP concepts' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Lightbulb className="w-4 h-4" />
              <span>Introducing Socratic Learning - Think, Don't Memorize</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-normal">
              Learn AP Like{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Socrates Taught
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Master AP concepts through <strong>guided questioning</strong> and <strong>critical thinking</strong>. 
              Our AI tutor doesn't give you answers - it helps you <em>discover</em> them.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/socratic-learning" 
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Start Socratic Learning</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/practice-exams"
                className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <GraduationCap className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Practice Exams</span>
              </Link>
              <Link
                to="/study-guides"
                className="group bg-gradient-to-r from-purple-500 to-violet-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Study Guides</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/70 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              The Socratic Method
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Meets Modern AI
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Experience a revolutionary approach to AP learning. Instead of passive memorization, 
              engage in meaningful dialogue that builds true understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-slate-100"
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{feature.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Socratic Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-normal">
              Why Socratic Learning{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Changes Everything
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Move beyond memorization to true understanding. Our AI tutor guides you to discover 
              concepts naturally, just like Socrates taught his students 2,500 years ago.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {socratics.map((socratic, index) => {
              const Icon = socratic.icon;
              return (
                <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/50">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                    {socratic.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{socratic.description}</p>
                </div>
              );
            })}
          </div>
          

        </div>
      </section>


    </div>
  );
};

export default Home;