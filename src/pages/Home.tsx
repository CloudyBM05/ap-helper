import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  StickyNote,
  Brain,
  Star,
  CheckCircle,
  Zap,
  Target,
  Clock,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      title: 'Practice Exams',
      description: 'Take full-length AP practice exams and get instant feedback.',
      icon: GraduationCap,
      link: '/practice-exams',
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Study Guides',
      description: 'Comprehensive AP US History study guide and resources.',
      icon: BookOpen,
      link: '/study-guides',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const benefits = [
    { icon: Zap, title: 'Instant Feedback', description: 'Get results in seconds, not days' },
    { icon: Target, title: 'Rubric-Based', description: 'Aligned with official AP standards' },
    { icon: Clock, title: '24/7 Available', description: 'Study anytime, anywhere' },
    { icon: Users, title: 'Trusted Platform', description: 'Used by highschool students' },
    { icon: CheckCircle, title: 'Accurate Practice Exams', description: 'Realistic questions and scoring for AP success' },
    { icon: Award, title: 'Proven Results', description: 'Higher AP scores guaranteed' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      course: 'AP English Language',
      rating: 5,
      text: 'AP Helper transformed my essay writing. I went from a 3 to a 5 on my AP exam!',
      initials: 'SJ',
      color: 'from-blue-500 to-purple-500'
    },
    {
      name: 'Michael Chen',
      course: 'AP US History',
      rating: 5,
      text: 'The DBQ practice and feedback were incredibly detailed. This tool is a game-changer!',
      initials: 'MC',
      color: 'from-green-500 to-teal-500'
    },
    {
      name: 'Emma Rodriguez',
      course: 'AP Biology',
      rating: 5,
      text: 'The practice exams and study guides helped me master every unit. Highly recommend!',
      initials: 'ER',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-teal-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Master Your AP Exams
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500">
                with AP Helper
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Your comprehensive study companion featuring AI-powered essay grading, 
              practice exams, study guides, and personalized feedback 
              to help you achieve your best possible scores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/practice-exams" 
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Take Practice Exam</span>
                <Brain className="w-5 h-5" />
              </Link>
              <Link
                to="/study-guides"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <span>Study Guides</span>
                <BookOpen className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need for AP Success
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our comprehensive platform combines AI technology with proven study methods 
              to help you excel in every aspect of your AP preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className="group bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose AP Helper?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of students who have improved their AP scores with our 
              comprehensive study platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                    <p className="text-slate-600">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Student Success Stories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See how AP Helper has helped students achieve their AP goals and improve their scores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{testimonial.initials}</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Ace Your AP Exams?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who have improved their scores with AP Helper. 
            Start your journey to AP success today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/essay-grader" 
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <FileText className="w-5 h-5" />
              <span>Grade Your First Essay</span>
            </Link>
            <Link 
              to="/practice-exams" 
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Brain className="w-5 h-5" />
              <span>Take Practice Exam</span>
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;