import { useNavigate } from 'react-router-dom';

const apCSPBigIdeas = [
  { bigIdea: 1, emoji: '🎨', title: 'Creative Development' },
  { bigIdea: 2, emoji: '📊', title: 'Data' },
  { bigIdea: 3, emoji: '🤖', title: 'Algorithms and Programming' },
  { bigIdea: 4, emoji: '💻', title: 'Computer Systems and Networks' },
  { bigIdea: 5, emoji: '🌍', title: 'Impact of Computing' },
];

const APCSPStudyGuide = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/study-guides')}
          className="mb-8 px-4 py-2 rounded bg-violet-100 text-violet-700 font-semibold hover:bg-violet-200 transition"
        >
          ← Back to Study Guides
        </button>
        <h2 className="text-3xl font-bold text-violet-900 mb-8 text-center">
          AP Computer Science Principles Big Ideas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {apCSPBigIdeas.map((bigIdea) => (
            <div
              key={bigIdea.bigIdea}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-violet-300"
              onClick={() => {
                if (bigIdea.bigIdea === 1) {
                  navigate('/ap-csp-big-idea/1');
                } else if (bigIdea.bigIdea === 2) {
                  navigate('/ap-csp-big-idea/2');
                } else if (bigIdea.bigIdea === 3) {
                  navigate('/ap-csp-big-idea/3');
                } else if (bigIdea.bigIdea === 4) {
                  navigate('/ap-csp-big-idea/4');
                } else if (bigIdea.bigIdea === 5) {
                  navigate('/ap-csp-big-idea/5');
                }
              }}
            >
              <div className="text-4xl mb-2">{bigIdea.emoji}</div>
              <div className="text-lg font-bold text-violet-700 mb-1">{`Big Idea ${bigIdea.bigIdea}`}</div>
              <div className="text-slate-500">{bigIdea.title}</div>
            </div>
          ))}
        </div>
        {/* Other Useful Study Tools */}
        <div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="flex-1 flex items-stretch">
            <div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-violet-100 w-full flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 text-violet-800 text-center">
                Other Useful Study Tools
              </h2>
              <a
                href="https://knowt.com/exams/AP/AP-Computer-Science-Principles"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-violet-700 hover:underline font-bold text-lg mb-2"
              >
                Knowt Notes
              </a>
              <a
                href="https://www.khanacademy.org/computing/ap-computer-science-principles/ap-csp-exam-preparation"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-violet-700 hover:underline font-bold text-lg mb-2"
              >
                Khan Academy Notes
              </a>
              <a
                href="https://www.youtube.com/watch?v=wb3taZ5bjzw"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-violet-700 hover:underline font-bold text-lg mb-2"
              >
                Full YouTube Review
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APCSPStudyGuide;
