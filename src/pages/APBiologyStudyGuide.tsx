import { useNavigate } from 'react-router-dom';

const apBiologyUnits = [
  { unit: 1, emoji: '🧬', title: 'Chemistry of Life' },
  { unit: 2, emoji: '🔬', title: 'Cell Structure and Function' },
  { unit: 3, emoji: '⚡', title: 'Cellular Energetics' },
  { unit: 4, emoji: '📞', title: 'Cell Communication and Cell Cycle' },
  { unit: 5, emoji: '🧬', title: 'Heredity' },
  { unit: 6, emoji: '🔄', title: 'Gene Expression and Regulation' },
  { unit: 7, emoji: '🌱', title: 'Natural Selection' },
  { unit: 8, emoji: '🌍', title: 'Ecology' },
];

const APBiologyStudyGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/study-guides')}
          className="mb-8 px-4 py-2 rounded bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition"
        >
          ← Back to Study Guides
        </button>
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          AP Biology Study Guide
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {apBiologyUnits.map((unit) => (
            <div
              key={unit.unit}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-green-300"
              onClick={() => {
                if (unit.unit === 1) {
                  navigate('/ap-biology/unit/1');
                } else if (unit.unit === 2) {
                  navigate('/ap-biology/unit/2');
                } else if (unit.unit === 3) {
                  navigate('/ap-biology/unit/3');
                } else if (unit.unit === 4) {
                  navigate('/ap-biology/unit/4');
                } else if (unit.unit === 5) {
                  navigate('/ap-biology/unit/5');
                } else if (unit.unit === 6) {
                  navigate('/ap-biology/unit/6');
                } else if (unit.unit === 7) {
                  navigate('/ap-biology/unit/7');
                } else if (unit.unit === 8) {
                  navigate('/ap-biology/unit/8');
                }
              }}
            >
              <div className="text-4xl mb-2">{unit.emoji}</div>
              <div className="text-lg font-bold text-green-700 mb-1">{`Unit ${unit.unit}`}</div>
              <div className="text-slate-500">{unit.title}</div>
            </div>
          ))}
        </div>
        {/* Other Useful Study Tools */}
        <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="flex-1 flex items-stretch">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-green-100 w-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 text-green-800 text-center">
                Other Useful Study Tools
              </h2>
              <a
                href="https://apcentral.collegeboard.org/courses/ap-biology"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-700 hover:underline font-bold text-lg mb-2"
              >
                Official College Board Course
              </a>
              <a
                href="https://www.khanacademy.org/science/ap-biology"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-700 hover:underline font-bold text-lg mb-2"
              >
                Khan Academy AP Biology
              </a>
              <a
                href="https://www.bozemanscience.com/ap-biology"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-700 hover:underline font-bold text-lg mb-2"
              >
                Bozeman Science AP Biology
              </a>
              <a
                href="https://www.youtube.com/watch?v=KSAPc5NwLYU"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-green-700 hover:underline font-bold text-lg mb-2"
              >
                All 8 Units in 15 minutes Youtube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APBiologyStudyGuide;
