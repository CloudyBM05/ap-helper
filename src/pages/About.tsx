import React from 'react';
import { GraduationCap, Target, Users, Award, Heart, Lightbulb } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, value: '50K+', label: 'Students Helped' },
    { icon: Award, value: '95%', label: 'Score Improvement' },
    { icon: GraduationCap, value: '20+', label: 'AP Courses' },
    { icon: Target, value: '4.9', label: 'Average Rating' }
  ];

  const founder = {
    name: 'Brandon Hsieh',
    role: 'Founder & CEO',
    background:
      'Founder of AP Helper who built the platform to provide personalized AI feedback for AP exams.',
    initials: 'BH',
    color: 'from-blue-500 to-teal-500'
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            About AP Helper
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're on a mission to democratize AP exam preparation by making high-quality, 
            AI-powered study tools accessible to every student, regardless of their background 
            or resources.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-600 mb-6">
                Every student deserves access to excellent AP exam preparation. We believe that 
                with the right tools and guidance, any student can achieve their academic goals 
                and unlock opportunities for their future.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Student-First Approach</h3>
                  <p className="text-slate-600">Everything we build is designed with students in mind</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Empowering Success</h3>
            </div>
          </div>
        </div>

        {/* Stats */}
        {/*
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
        */}

        {/* Story Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-slate-600 mb-6">
              AP Helper was born from a simple observation: too many talented students were 
              struggling with AP exams not because they lacked ability, but because they 
              lacked access to quality preparation resources and personalized feedback.
            </p>
            <p className="text-slate-600 mb-6">
              Our founder, Brandon Hsieh, studied for his own AP courses and noticed 
              that there were countless students who would benefit from personalized 
              feedback on their essays and short answer questions. He himself needed
              this kind of feedback to improve his score. However, providing this level of 
              individual attention to every student was impossible in traditional classroom settings.
            </p>
            <p className="text-slate-600">
              That's when we realized AI could bridge this gap. By combining advanced natural 
              language processing with deep knowledge of AP rubrics and standards, we could 
              provide every student with the personalized feedback they need to succeed.
            </p>
          </div>
        </div>

        {/* Team Section - simplified to a single Founder profile */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Founder & CEO</h2>
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-md">
              <div className={`w-24 h-24 bg-gradient-to-br ${founder.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <span className="text-white font-bold text-2xl">{founder.initials}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{founder.name}</h3>
              <p className="text-blue-600 font-semibold mb-3">{founder.role}</p>
              <p className="text-slate-600">{founder.background}</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Excellence</h3>
              <p className="text-slate-600">
                We strive for the highest quality in everything we do, from our AI algorithms 
                to our user experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Accessibility</h3>
              <p className="text-slate-600">
                Quality education should be available to everyone, regardless of their 
                economic background or geographic location.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Innovation</h3>
              <p className="text-slate-600">
                We continuously push the boundaries of what's possible in educational 
                technology to better serve our students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;