import React, { useState, useEffect } from 'react';
import { CardCollectionManager } from '../utils/cardCollectionManager';
import { UserCollection, KnowledgeCard, RARITY_CONFIG } from '../types/knowledgeCards';

interface UserRewardsWidgetProps {
  userId: string;
  className?: string;
}

const UserRewardsWidget: React.FC<UserRewardsWidgetProps> = ({ userId, className = '' }) => {
  const [collection, setCollection] = useState<UserCollection | null>(null);
  const [recentCards, setRecentCards] = useState<KnowledgeCard[]>([]);
  const [showRecentCards, setShowRecentCards] = useState(false);

  useEffect(() => {
    loadUserData();
  }, [userId]);

  const loadUserData = () => {
    const userCollection = CardCollectionManager.getUserCollection(userId);
    setCollection(userCollection);
    
    const recent = CardCollectionManager.getRecentCards(userId, 3);
    setRecentCards(recent);
  };

  if (!collection) {
    return <div>Loading...</div>;
  }

  const favoriteCard = collection.favoriteCard 
    ? CardCollectionManager.getCardById(collection.favoriteCard)
    : null;

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Card Collection
        </h2>
        <div className="flex items-center space-x-1">
          <div className="text-yellow-500 text-lg">🪙</div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            {collection.scholarCoins}
          </span>
        </div>
      </div>

      {/* Collection Progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Collection Progress
          </span>
          <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
            {collection.completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${collection.completionPercentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          {collection.totalCards} cards collected
        </div>
      </div>

      {/* Favorite Card */}
      {favoriteCard && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            ⭐ Favorite Card
          </h3>
          <div 
            className="p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105"
            style={{
              borderColor: RARITY_CONFIG[favoriteCard.rarity].borderColor,
              background: `linear-gradient(135deg, ${RARITY_CONFIG[favoriteCard.rarity].color}15 0%, ${RARITY_CONFIG[favoriteCard.rarity].color}08 100%)`
            }}
          >
            <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
              {favoriteCard.name}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {favoriteCard.description}
            </div>
          </div>
        </div>
      )}

      {/* Recent Cards */}
      {recentCards.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Recent Cards
            </h3>
            <button
              onClick={() => setShowRecentCards(!showRecentCards)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {showRecentCards ? 'Hide' : 'Show'}
            </button>
          </div>
          
          {showRecentCards && (
            <div className="space-y-2">
              {recentCards.map(card => (
                <div 
                  key={card.id}
                  className="p-2 rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: RARITY_CONFIG[card.rarity].borderColor }}
                    />
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-800 dark:text-gray-200">
                        {card.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {RARITY_CONFIG[card.rarity].name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Achievement Badges */}
      {collection.achievementBadges.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            🏆 Achievements
          </h3>
          <div className="flex flex-wrap gap-1">
            {collection.achievementBadges.slice(0, 3).map((badge, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium"
              >
                {badge}
              </span>
            ))}
            {collection.achievementBadges.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                +{collection.achievementBadges.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Last obtained card info */}
      {collection.lastCardObtained && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Last card obtained: {new Date(collection.lastCardObtained.date).toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRewardsWidget;
