import React from 'react';

const Arena: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-white mb-4">
              ⚔️ Arena
            </h1>
            <p className="text-xl text-purple-200 max-w-2xl">
              Battle through AP exam questions with your Knowledge Cards
            </p>
          </div>

          {/* Coming Soon Card */}
          <div className="bg-white/10 backdrop-blur-md border border-purple-400/30 rounded-2xl p-12 max-w-2xl w-full">
            <div className="text-8xl mb-6">🚧</div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Coming Soon!
            </h2>
            <p className="text-lg text-purple-200 mb-6 leading-relaxed">
              The Arena feature is currently under development. Soon you'll be able to:
            </p>
            
            <div className="space-y-3 text-left mb-8">
              <div className="flex items-center text-purple-200">
                <span className="text-green-400 mr-3">⚡</span>
                Build custom decks from your Knowledge Card collection
              </div>
              <div className="flex items-center text-purple-200">
                <span className="text-green-400 mr-3">⚡</span>
                Battle through AP exam questions with strategic card play
              </div>
              <div className="flex items-center text-purple-200">
                <span className="text-green-400 mr-3">⚡</span>
                Earn rewards and unlock new cards through victories
              </div>
              <div className="flex items-center text-purple-200">
                <span className="text-green-400 mr-3">⚡</span>
                Compete in themed battles across different AP subjects
              </div>
            </div>

            <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-4 text-yellow-200">
              <div className="flex items-center justify-center">
                <span className="text-yellow-400 mr-2">💡</span>
                <span className="text-sm">
                  Focus on Card Selection and Socratic Tutor for now!
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Hint */}
          <div className="mt-8 text-center">
            <p className="text-purple-300 mb-4">
              While you wait, check out these available features:
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="/collections" 
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                📚 Collections
              </a>
              <a 
                href="/tutor" 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                🎓 Socratic Tutor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Arena;
