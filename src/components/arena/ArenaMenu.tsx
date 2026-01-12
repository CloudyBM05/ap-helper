import React from 'react';
import { ArenaBattle } from '../../types/arena';

interface ArenaMenuProps {
  battles: ArenaBattle[];
  userLevel: number;
  scholarCoins: number;
  experience: number;
  onBattleSelect: (battle: ArenaBattle) => void;
  onViewCollection: () => void;
}

const ArenaMenu: React.FC<ArenaMenuProps> = ({
  battles,
  userLevel,
  scholarCoins,
  experience,
  onBattleSelect,
  onViewCollection
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'hard': return 'bg-orange-500/20 text-orange-400 border-orange-500';
      case 'expert': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🟠';
      case 'expert': return '🔴';
      default: return '⚪';
    }
  };

  const isUnlocked = (battle: ArenaBattle) => {
    // Simple unlock logic - can be made more complex
    const requiredLevel = battle.difficulty === 'easy' ? 1 : 
                         battle.difficulty === 'medium' ? 3 :
                         battle.difficulty === 'hard' ? 6 : 10;
    return userLevel >= requiredLevel;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Welcome to the Arena, Scholar! ⚔️
        </h2>
        <p className="text-purple-200 text-lg max-w-3xl mx-auto">
          Choose your battle wisely. Each victory brings you closer to mastering the AP subjects. 
          Use your knowledge cards strategically to answer questions and defeat your opponents!
        </p>
      </div>

      {/* Battle Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {battles.map((battle) => {
          const unlocked = isUnlocked(battle);
          
          return (
            <div
              key={battle.id}
              className={`
                relative p-6 rounded-xl border-2 transition-all duration-300
                ${unlocked 
                  ? 'bg-white/5 border-purple-400/30 hover:border-purple-400 hover:bg-white/10 cursor-pointer transform hover:scale-105'
                  : 'bg-gray-800/20 border-gray-600/30 cursor-not-allowed opacity-50'
                }
              `}
              onClick={() => unlocked && onBattleSelect(battle)}
            >
              {/* Locked Overlay */}
              {!unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl z-10">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🔒</div>
                    <div className="text-white font-bold">
                      Level {battle.difficulty === 'easy' ? 1 : 
                             battle.difficulty === 'medium' ? 3 :
                             battle.difficulty === 'hard' ? 6 : 10} Required
                    </div>
                  </div>
                </div>
              )}

              {/* Battle Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`
                    inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border
                    ${getDifficultyColor(battle.difficulty)}
                  `}>
                    {getDifficultyIcon(battle.difficulty)} {battle.difficulty.toUpperCase()}
                  </span>
                </div>
                <div className="text-2xl">
                  {battle.boss ? battle.boss.avatar : '🎯'}
                </div>
              </div>

              {/* Battle Info */}
              <h3 className="text-xl font-bold text-white mb-2">{battle.name}</h3>
              <p className="text-gray-300 text-sm mb-4 min-h-[3rem]">
                {battle.description}
              </p>

              {/* Battle Stats */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subject:</span>
                  <span className="text-white font-medium">{battle.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Questions:</span>
                  <span className="text-white font-medium">{battle.questions.length}</span>
                </div>
                {battle.requiredCards && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Min Cards:</span>
                    <span className="text-white font-medium">{battle.requiredCards}</span>
                  </div>
                )}
              </div>

              {/* Rewards */}
              <div className="mt-4 pt-4 border-t border-gray-600/30">
                <div className="text-xs text-gray-400 mb-2">Rewards:</div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-400">
                      💰 {battle.rewards.scholarCoins}
                    </span>
                    <span className="text-blue-400">
                      ⭐ {battle.rewards.experiencePoints} XP
                    </span>
                  </div>
                  {battle.rewards.cardPacks && battle.rewards.cardPacks.length > 0 && (
                    <span className="text-purple-400">📦 Card Pack</span>
                  )}
                </div>
              </div>

              {/* Boss Info */}
              {battle.boss && (
                <div className="mt-3 p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                  <div className="text-xs text-red-400 font-bold mb-1">BOSS BATTLE</div>
                  <div className="text-sm text-white font-medium">{battle.boss.name}</div>
                  <div className="text-xs text-gray-300 mt-1">{battle.boss.description}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={onViewCollection}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors"
        >
          📚 View Collection
        </button>
        <button className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded-lg transition-colors">
          🛒 Card Shop (Coming Soon)
        </button>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
          📊 Arena Stats (Coming Soon)
        </button>
      </div>
    </div>
  );
};

export default ArenaMenu;
