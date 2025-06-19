import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is AP Helper?',
          answer: 'AP Helper is a comprehensive AI-powered study platform designed to help students prepare for AP exams. We offer essay grading, practice exams, study guides, and various study tools for 20+ AP courses.'
        },
        {
          question: 'How accurate is the AI essay grading?',
          answer: 'Our AI grading system is trained on thousands of AP essays and official rubrics. While it provides highly accurate feedback that aligns with AP standards, we recommend using it as a practice tool alongside your teacher\'s guidance.'
        },
        {
          question: 'Which AP courses do you support?',
          answer: 'We support 20+ AP courses including Biology, Chemistry, Physics, Calculus, Statistics, US History, World History, English Language & Literature, Spanish, and many more. We\'re constantly adding new courses.'
        },
        {
          question: 'Is AP Helper free to use?',
          answer: 'We offer both free and premium features. Basic essay grading and some practice questions are free, while advanced features like unlimited practice exams and detailed analytics require a subscription.'
        }
      ]
    },
    {
      category: 'Essay Grading',
      questions: [
        {
          question: 'What types of essays can I submit?',
          answer: 'You can submit IWA (Individual Written Argument), IRR (Individual Research Report), DBQ (Document-Based Question), LEQ (Long Essay Question), SAQ (Short Answer Question), and other AP essay types.'
        },
        {
          question: 'How long does it take to get feedback?',
          answer: 'Our AI provides instant feedback within seconds of submission. You\'ll receive detailed scoring, suggestions for improvement, and rubric-based analysis immediately.'
        },
        {
          question: 'Can I submit the same essay multiple times?',
          answer: 'Yes! We encourage you to revise your essays based on our feedback and resubmit them to track your improvement over time.'
        }
      ]
    },
    {
      category: 'Practice Exams',
      questions: [
        {
          question: 'Are the practice questions from real AP exams?',
          answer: 'Our practice questions are created by AP experts and designed to match the style, difficulty, and content of real AP exams. We also include released questions from the College Board when available.'
        },
        {
          question: 'Can I take practice exams multiple times?',
          answer: 'Absolutely! You can retake practice exams as many times as you want. We track your progress and show improvement over time.'
        },
        {
          question: 'Do you provide explanations for answers?',
          answer: 'Yes, every practice question comes with detailed explanations for both correct and incorrect answers to help you understand the concepts better.'
        }
      ]
    },
    {
      category: 'Study Tools',
      questions: [
        {
          question: 'Can I create my own flashcards?',
          answer: 'Currently, we provide pre-made flashcard sets for all AP courses. Custom flashcard creation is a feature we\'re planning to add in the future.'
        },
        {
          question: 'Are the formula sheets official?',
          answer: 'Our formula sheets are based on official AP course descriptions and include all formulas and constants you\'ll need for your exams.'
        },
        {
          question: 'Can I download study materials for offline use?',
          answer: 'Yes, many of our study materials including formula sheets and reference guides can be downloaded as PDFs for offline studying.'
        }
      ]
    },
    {
      category: 'Technical',
      questions: [
        {
          question: 'What devices can I use AP Helper on?',
          answer: 'AP Helper works on all devices with a web browser - computers, tablets, and smartphones. We\'re also developing mobile apps for iOS and Android.'
        },
        {
          question: 'Do I need to create an account?',
          answer: 'You can try some features without an account, but creating a free account allows you to save your progress, track improvement, and access more features.'
        },
        {
          question: 'Is my data secure?',
          answer: 'Yes, we take data security seriously. All essays and personal information are encrypted and stored securely. We never share your data with third parties.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-600">
            Find answers to common questions about AP Helper and how to make the most of our platform.
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 px-6 py-4 border-b border-blue-100">
                <h2 className="text-xl font-bold text-slate-900">{category.category}</h2>
              </div>
              
              <div className="divide-y divide-slate-100">
                {category.questions.map((faq, questionIndex) => {
                  const itemIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openItems.includes(itemIndex);
                  
                  return (
                    <div key={questionIndex}>
                      <button
                        onClick={() => toggleItem(itemIndex)}
                        className="w-full px-6 py-4 text-left hover:bg-slate-50 transition-colors duration-200 flex items-center justify-between"
                      >
                        <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h2>
          <p className="text-slate-600 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
          >
            <span>Contact Support</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;