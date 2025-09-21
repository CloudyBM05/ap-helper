import { Link } from 'react-router-dom';
import { Mail, MessageSquare, Clock } from 'lucide-react';

const Contact = () => {
  const supportEmail = 'aphelper25@gmail.com';

  // Keep only the Email contact info
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: supportEmail,
      description: 'Send us an email anytime'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Have questions about AP Helper? Need technical support? Want to share feedback?
            We'd love to hear from you — please email us and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Email Contact Card (replaces form) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact via Email</h2>
              <p className="text-slate-600 mb-6">Please email us with your name, a brief subject, and your message.</p>
              <a
                href={`mailto:${supportEmail}`}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
              >
                <span>Email aphelper25@gmail.com</span>
              </a>
              <p className="text-slate-500 text-sm mt-4">For urgent technical issues, include "URGENT" in the subject line.</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{info.title}</h3>
                      <p className="text-blue-600 font-semibold mb-1">{info.content}</p>
                      <p className="text-slate-600 text-sm">{info.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Response Time */}
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-slate-900">Response Time</h3>
              </div>
              <p className="text-slate-600">We typically respond to all inquiries within 24 hours during business days. For urgent technical issues, we aim to respond within 4 hours.</p>
            </div>

            {/* FAQ Link */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="font-bold text-slate-900 mb-2">Quick Answers</h3>
              <p className="text-slate-600 mb-4">Check our FAQ section for instant answers to common questions.</p>
              <Link to="/faq" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold">
                <span>Visit FAQ</span>
                <MessageSquare className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;