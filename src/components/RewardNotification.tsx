import React, { useEffect } from 'react';
import { KnowledgeCard, RARITY_CONFIG, CATEGORY_CONFIG } from '../types/knowledgeCards';

interface RewardNotificationProps {
  card?: KnowledgeCard | null;
  scholarCoins?: number;
  onDismiss: () => void;
  show: boolean;
}

const RewardNotification: React.FC<RewardNotificationProps> = ({ 
  card, 
  scholarCoins = 0, 
  onDismiss, 
  show 
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000); // Auto-dismiss after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  if (!show) return null;

  return (
    <div className="fixed top-20 right-6 z-50 animate-slide-in-right">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-2 border-green-400 p-6 max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-green-600 dark:text-green-400">
            🎉 Reward Earned!
          </h3>
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            ×
          </button>
        </div>

        {/* Scholar Coins Reward */}
        {scholarCoins > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="text-2xl">🪙</div>
              <div>
                <div className="font-semibold text-yellow-800 dark:text-yellow-200">
                  +{scholarCoins} Scholar Coins
                </div>
                <div className="text-sm text-yellow-600 dark:text-yellow-300">
                  Great job on the quiz!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Card Reward */}
        {card && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              New Card Unlocked!
            </div>
            <div 
              className="p-4 rounded-lg border-2"
              style={{
                borderColor: RARITY_CONFIG[card.rarity].borderColor,
                background: `linear-gradient(135deg, ${RARITY_CONFIG[card.rarity].color}15 0%, ${RARITY_CONFIG[card.rarity].color}08 100%)`
              }}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">
                  {CATEGORY_CONFIG[card.category].icon}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 dark:text-gray-200">
                    {card.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {card.description}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: RARITY_CONFIG[card.rarity].borderColor }}
                    >
                      {RARITY_CONFIG[card.rarity].name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {CATEGORY_CONFIG[card.category].name}
                    </span>
                  </div>
                </div>
              </div>
              
              {card.famousQuote && (
                <div className="mt-3 p-2 bg-white dark:bg-gray-700 rounded border-l-2 border-gray-300 dark:border-gray-600">
                  <div className="text-xs italic text-gray-600 dark:text-gray-400">
                    &quot;{card.famousQuote}&quot;
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex space-x-3">
          <button
            onClick={onDismiss}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Awesome!
          </button>
          {card && (
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              onClick={() => {
                // This could navigate to the collections page
                onDismiss();
              }}
            >
              View Collection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardNotification;
