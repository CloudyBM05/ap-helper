// This is the "option page" for APUSH practice exams.
// It lets users pick between MCQ, DBQ, LEQ, and SAQ.
// When you click "Short Answer Questions with instant AI feedback", it should take you to the SAQ year selection page.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListChecks, FileText, PenTool, MessageCircle } from 'lucide-react';

const APUSHPracticeExamOptions = () => {
  const navigate = useNavigate();

  const options = [
    {
      label: 'APUSH MCQ',
      description: 'Multiple Choice Questions covering all periods.',
      icon: <ListChecks className="w-8 h-8 text-blue-600" />,
      onClick: () => navigate('/apush-practice-exam/mcq')
    },
    {
      label: 'FRQ (AI Graded) DBQ',
      description: 'Document-Based Question with instant AI feedback.',
      icon: <FileText className="w-8 h-8 text-green-600" />,
      onClick: () => navigate('/apush-practice-exam/dbq')
    },
    {
      label: 'FRQ (AI Graded) LEQ',
      description: 'Long Essay Question with instant AI feedback.',
      icon: <PenTool className="w-8 h-8 text-purple-600" />,
      onClick: () => {
        console.log("LEQ option clicked");
        navigate('/apush-practice-exam/leq/select');
      }
    },
    {
      label: 'FRQ (AI Graded) SAQ',
      description: 'Short Answer Questions with instant AI feedback.',
      icon: <MessageCircle className="w-8 h-8 text-teal-600" />,
      onClick: () => {
		console.log("SAQ option clicked");
        navigate('/apush-practice-exam/saq/select');
      }
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-4 py-2 text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center">APUSH Practice Exam Options</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={option.onClick}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-400"
            >
              {option.icon}
              <div className="text-lg font-bold text-blue-700 mt-4 mb-2">{option.label}</div>
              <div className="text-slate-600">{option.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APUSHPracticeExamOptions;
