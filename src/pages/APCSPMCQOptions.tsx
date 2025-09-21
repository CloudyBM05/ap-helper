// AP Computer Science Principles MCQ Selection Page
// Lets users pick between Collegeboard 2016 Exam and Collegeboard Practice Book Exam MCQ sets

import { useNavigate } from 'react-router-dom';

const exams = [
  {
    id: '2016',
    label: 'Collegeboard 2016 Exam',
    description: 'Official AP Computer Science Principles MCQ set from 2016.',
    implemented: true
  },
  {
    id: 'practice-book',
    label: 'Collegeboard Practice Book Exam',
    description: 'Official AP Computer Science Principles Practice Book MCQ set.',
    implemented: true
  }
];

const APCSPMCQOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-4 py-2 text-violet-600 hover:text-violet-800 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full text-violet-900">
          Select AP Computer Science Principles MCQ Exam
        </h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => navigate(`/ap-csp-practice-exam/mcq/${exam.id}`)}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-violet-100 hover:border-violet-400 hover:shadow-xl w-full"
            >
              <span className="text-2xl font-bold mb-2 text-violet-700">{exam.label}</span>
              <span className="text-slate-600">{exam.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APCSPMCQOptions;
