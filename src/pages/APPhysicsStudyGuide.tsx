import { useNavigate } from 'react-router-dom';

const apPhysicsUnits = [
  { unit: 1, emoji: '🏃‍♂️', title: 'Kinematics' },
  { unit: 2, emoji: '🏋️', title: 'Dynamics (Forces)' },
  { unit: 3, emoji: '🎡', title: 'Circular Motion & Gravitation' },
  { unit: 4, emoji: '🔋', title: 'Energy' },
  { unit: 5, emoji: '🎱', title: 'Momentum' },
  { unit: 6, emoji: '🎶', title: 'Simple Harmonic Motion' },
  { unit: 7, emoji: '🔧', title: 'Torque & Rotational Motion' },
  { unit: 8, emoji: '💧', title: 'Fluids' },
];

const APPhysicsStudyGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/study-guides')}
          className="mb-8 px-4 py-2 rounded bg-teal-100 text-teal-700 font-semibold hover:bg-teal-200 transition"
        >
          ← Back to Study Guides
        </button>
        <h2 className="text-3xl font-bold text-teal-900 mb-8 text-center">
          AP Physics Units
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {apPhysicsUnits.map((unit) => (
            <div
              key={unit.unit}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-teal-300"
              onClick={() => {
                if (unit.unit === 1) {
                  navigate('/ap-physics/unit/1');
                } else if (unit.unit === 2) {
                  navigate('/ap-physics/unit/2');
                } else if (unit.unit === 3) {
                  navigate('/ap-physics/unit/3');
                } else if (unit.unit === 4) {
                  navigate('/ap-physics/unit/4');
                } else if (unit.unit === 5) {
                  navigate('/ap-physics/unit/5');
                } else if (unit.unit === 6) {
                  navigate('/ap-physics/unit/6');
                } else if (unit.unit === 7) {
                  navigate('/ap-physics/unit/7');
                } else if (unit.unit === 8) {
                  navigate('/ap-physics/unit/8');
                }
                // Add more navigation for other units as you create their pages
              }}
            >
              <div className="text-4xl mb-2">{unit.emoji}</div>
              <div className="text-lg font-bold text-teal-700 mb-1">{`Unit ${unit.unit}`}</div>
              <div className="text-slate-500">{unit.title}</div>
            </div>
          ))}
        </div>
        {/* Other Useful Study Tools */}
        <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="flex-1 flex items-stretch">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-teal-100 w-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 text-teal-800 text-center">
                Other Useful Study Tools
              </h2>
              <a
                href="https://library.fiveable.me/ap-physics-1"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-teal-700 hover:underline font-bold text-lg mb-2"
              >
                Fiveable AP Physics 1 Notes
              </a>
              <a
                href="https://www.simplestudies.org/groups/ap-physics-1"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-teal-700 hover:underline font-bold text-lg mb-2"
              >
                Simple Studies AP Physics 1
              </a>
              <a
                href="https://www.khanacademy.org/science/ap-physics-1"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-teal-700 hover:underline font-bold text-lg mb-2"
              >
                Khan Academy AP Physics 1
              </a>
              <a
                href="https://www.youtube.com/playlist?list=PLX2gX-ftPVXUPiQM-2VZ4oA0UxzjXZWgE"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-teal-700 hover:underline font-bold text-lg mb-2"
              >
                YouTube: AP Physics 1 Playlist
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APPhysicsStudyGuide;