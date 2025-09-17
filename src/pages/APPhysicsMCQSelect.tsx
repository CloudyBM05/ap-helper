import { useNavigate } from 'react-router-dom';

interface Exam {
  id: string;
  label: string;
  description: string;
  implemented: boolean;
  isOutdated: boolean;
  isExternal?: boolean;
  externalUrl?: string;
}

const exams: Exam[] = [
  {
    id: 'collegeboard-2017',
    label: 'Collegeboard 2017 Exam',
    description: 'Official AP Physics MCQ from 2017 (Outdated)',
    implemented: true,
    isOutdated: true
  },
  {
    id: 'mit-workbook',
    label: 'MIT Workbook',
    description: 'AP Physics MCQ - MIT Problems',
    implemented: true,
    isOutdated: false,
    isExternal: true,
    externalUrl: 'https://web.mit.edu/~yczeng/Public/WORKBOOK%201%20FULL.pdf'
  },
  {
    id: 'physics-lab',
    label: 'Physics Lab',
    description: 'MCQ and FRQ Practice',
    implemented: true,
    isOutdated: false,
    isExternal: true,
    externalUrl: 'https://physicslab.app/courses/559004/lectures/51787138'
  }
];

const APPhysicsMCQSelect = () => {
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
        <h1 className="text-3xl font-bold mb-8 text-center w-full">Select AP Physics MCQ Exam</h1>
        <div className="grid grid-cols-1 gap-6 w-full">
          {exams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => {
                if (exam.implemented) {
                  if (exam.isExternal && exam.externalUrl) {
                    window.open(exam.externalUrl, '_blank');
                  } else {
                    navigate(`/ap-physics-practice-exam/mcq/${exam.id}`);
                  }
                } else {
                  alert(`${exam.label} is not implemented yet.`);
                }
              }}
              className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 ${exam.implemented ? 'border-teal-100 hover:border-teal-400 hover:shadow-xl' : 'border-gray-100'}`}
              disabled={!exam.implemented}
            >
              <span className={`text-2xl font-bold mb-2 ${exam.implemented ? 'text-teal-700' : 'text-gray-400'}`}>
                {exam.label}
                {exam.isOutdated && (
                  <span className="text-sm text-yellow-600 ml-2">(Outdated)</span>
                )}
                {exam.isExternal && (
                  <span className="text-sm text-blue-600 ml-2">🔗</span>
                )}
              </span>
              <span className={`${exam.implemented ? 'text-slate-600' : 'text-gray-400'}`}>{exam.description}</span>
              {exam.isOutdated && (
                <span className="text-xs text-yellow-600 mt-2">
                  Note: This exam is from 2017 and may not reflect current standards
                </span>
              )}
              {exam.isExternal && (
                <span className="text-xs text-blue-600 mt-2">
                  Opens in new tab
                </span>
              )}
              {!exam.implemented && <span className="text-xs text-red-500 mt-2">Coming Soon!</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APPhysicsMCQSelect;
