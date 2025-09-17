import { useNavigate } from 'react-router-dom';

const exams = [
  {
    id: 'collegeboard-2025-set-j',
    label: 'Collegeboard 2025 Set J',
    description: 'Official AP Physics Mathematical Routines FRQ',
    implemented: true
  }
];

const APPhysicsMathematicalRoutines = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-50 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 px-4 py-2 text-teal-600 hover:text-teal-800 flex items-center gap-2"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold mb-8 text-center w-full">Select AP Physics Mathematical Routines FRQ</h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => {
                if (exam.implemented) {
                  // Navigate to the question page
                  navigate('/ap-physics-practice-exam/mathematical-routines/q1');
                } else {
                  alert(`${exam.label} is not implemented yet.`);
                }
              }}
              className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 ${exam.implemented ? 'border-teal-100 hover:border-teal-400 hover:shadow-xl' : 'border-gray-100'}`}
              disabled={!exam.implemented}
            >
              <span className={`text-2xl font-bold mb-2 ${exam.implemented ? 'text-teal-700' : 'text-gray-400'}`}>
                {exam.label}
              </span>
              <span className={`${exam.implemented ? 'text-slate-600' : 'text-gray-400'}`}>{exam.description}</span>
              {!exam.implemented && <span className="text-xs text-red-500 mt-2">Coming Soon!</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APPhysicsMathematicalRoutines;
