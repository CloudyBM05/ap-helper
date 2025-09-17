import React from 'react';
import { Shield, Lock, Eye, UserCheck, FileText, Clock } from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      icon: FileText,
      title: 'Information We Collect',
      content: [
        'Account information (name, email, grade level)',
        'Essay submissions and practice responses',
        'Usage data and learning progress',
        'Device and browser information',
        'Cookies and similar tracking technologies'
      ]
    },
    {
      icon: Eye,
      title: 'How We Use Your Information',
      content: [
        'Provide AI-powered essay grading and feedback',
        'Track your learning progress and improvement',
        'Personalize your study experience',
        'Send important updates and notifications',
        'Improve our services and develop new features'
      ]
    },
    {
      icon: Lock,
      title: 'Data Security',
      content: [
        'All data is encrypted in transit and at rest',
        'Regular security audits and penetration testing',
        'Secure cloud infrastructure with industry-leading providers',
        'Limited access controls for our team members',
        'Automatic data backups and disaster recovery'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        'Access and download your personal data',
        'Correct inaccurate information',
        'Delete your account and associated data',
        'Opt out of non-essential communications',
        'Request data portability to another service'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-600">
            Your privacy is important to us. This policy explains how we collect, use, 
            and protect your personal information.
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4 text-slate-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Last updated: December 2024</span>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Commitment to Privacy</h2>
          <p className="text-slate-600 mb-4">
            At AP Helper, we understand that your personal information and academic work are sensitive. 
            We're committed to protecting your privacy and being transparent about how we handle your data.
          </p>
          <p className="text-slate-600">
            This privacy policy applies to all users of AP Helper, including students, teachers, and parents. 
            By using our service, you agree to the collection and use of information in accordance with this policy.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Additional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Data Sharing</h3>
            <p className="text-slate-600 mb-4">
              We do not sell, trade, or rent your personal information to third parties. 
              We may share aggregated, anonymized data for research purposes.
            </p>
            <p className="text-slate-600">
              We only share personal data with service providers who help us operate 
              our platform, and they are bound by strict confidentiality agreements.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Data Retention</h3>
            <p className="text-slate-600 mb-4">
              We retain your account information and essay submissions for as long as 
              your account is active or as needed to provide our services.
            </p>
            <p className="text-slate-600">
              You can request deletion of your data at any time. Some information may 
              be retained for legal or security purposes as required by law.
            </p>
          </div>
        </div>

        {/* COPPA Compliance */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Student Privacy (COPPA Compliance)</h2>
          <p className="text-slate-600 mb-4">
            We comply with the Children's Online Privacy Protection Act (COPPA) and take special 
            care to protect the privacy of users under 13 years of age.
          </p>
          <ul className="space-y-2 text-slate-600">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>We require parental consent for users under 13</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>We collect only necessary information from young users</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Parents can review and delete their child's information</span>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Questions About Privacy?</h2>
          <p className="text-slate-600 mb-6">
            If you have any questions about this privacy policy or how we handle your data, 
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;