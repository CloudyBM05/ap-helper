import React from 'react';
import { useParams } from 'react-router-dom';
import APMacroPracticeExamMCQ2012 from './APMacroPracticeExamMCQ2012';
import APMacroPracticeExamMCQPrinceton from './APMacroPracticeExamMCQPrinceton';
import APMacroPracticeExamMCQ2010 from './APMacroPracticeExamMCQ2010';

const APMacroeconomicsMCQExam = () => {
  const { examId } = useParams();
  if (examId === 'cb2012') {
    return <APMacroPracticeExamMCQ2012 />;
  }
  if (examId === 'princeton') {
    return <APMacroPracticeExamMCQPrinceton />;
  }
  if (examId === 'cb2010') {
    return <APMacroPracticeExamMCQ2010 />;
  }
  // You can add more examId checks for other exams here
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4 text-cyan-700">AP Macroeconomics MCQ Exam</h1>
        <p className="mb-2 text-lg text-slate-700">Exam ID: <span className="font-mono text-fuchsia-600">{examId}</span></p>
        <p className="text-slate-500">This exam is not yet implemented.</p>
      </div>
    </div>
  );
};

export default APMacroeconomicsMCQExam;
