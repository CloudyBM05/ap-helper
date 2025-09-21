import { useNavigate, useParams } from 'react-router-dom';

const questions = [
  { id: 'q2', label: 'Question 2' },
  { id: 'q3', label: 'Question 3' }
];

const APMacroShortFRQSetSelect = () => {
  const navigate = useNavigate();
  const { setId } = useParams();

  const getSetNumber = () => {
    if (setId === 'set1') return '1';
    if (setId === 'set2') return '2';
    return '';
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={() => navigate('/ap-macro-short-frq-select')}
          className="mb-8 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition self-start"
        >
          &larr; Back to Set Selection
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full text-blue-800">
          Select a Question (Set {getSetNumber()})
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {questions.map((q) => (
            <button
              key={q.id}
              onClick={() => navigate(`/ap-macro-practice-exam/short-frq/${setId}/${q.id}`)}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 border-blue-100 hover:border-cyan-400 hover:shadow-xl w-full"
            >
              <span className="text-2xl font-bold mb-2 text-blue-700">{q.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APMacroShortFRQSetSelect;
