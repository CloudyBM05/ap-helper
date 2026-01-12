import React, { useState, useEffect } from 'react';
import { CardCollectionManager } from '../utils/cardCollectionManager';
import { UserCollection, KnowledgeCard, CardRarity, RARITY_CONFIG, CATEGORY_CONFIG } from '../types/knowledgeCards';
import KnowledgeCardComponent from '../components/KnowledgeCard';
import CardPackOpening from '../components/CardPackOpening';

interface CollectionsProps {
  userId: string;
}

const Collections: React.FC<CollectionsProps> = ({ userId }) => {
  const [collection, setCollection] = useState<UserCollection>(CardCollectionManager.getUserCollection(userId));
  const [ownedCards, setOwnedCards] = useState<KnowledgeCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<KnowledgeCard | null>(null);
  const [showPackOpening, setShowPackOpening] = useState(false);
  const [filterRarity, setFilterRarity] = useState<CardRarity | 'all'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCollection();
  }, [userId]);

  const loadCollection = () => {
    const userCollection = CardCollectionManager.getUserCollection(userId);
    console.log('Loading collection for user:', userId, 'Total cards:', userCollection.totalCards);
    console.log('User cards:', userCollection.cards);
    setCollection(userCollection);

    // Load owned cards
    const cards = userCollection.cards
      .map(userCard => CardCollectionManager.getCardById(userCard.cardId))
      .filter((card): card is KnowledgeCard => card !== undefined);

    console.log('Loaded card details:', cards.map(c => c?.name));
    setOwnedCards(cards);
  };

  const filteredCards = ownedCards.filter(card => {
    const matchesRarity = filterRarity === 'all' || card.rarity === filterRarity;
    const matchesCategory = filterCategory === 'all' || card.category === filterCategory;
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesRarity && matchesCategory && matchesSearch;
  });

  const rarityStats = CardCollectionManager.getCardsOwnedByRarity(collection);

  const handleCardClick = (card: KnowledgeCard) => {
    setSelectedCard(card);
  };

  const handlePackOpened = (cards: KnowledgeCard[]) => {
    loadCollection(); // Refresh the collection
    console.log('Opened cards:', cards);
  };

  const handleSetFavorite = (cardId: string) => {
    CardCollectionManager.setFavoriteCard(userId, cardId);
    loadCollection();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Knowledge Card Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover and collect famous people from AP subjects
          </p>
        </div>

        {/* Collection Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🎯</div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {collection.totalCards}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Cards</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">📈</div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {collection.completionPercentage}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Collection Complete</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🪙</div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {collection.scholarCoins}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Scholar Coins</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">⭐</div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {rarityStats.legendary + rarityStats.mythical}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Legendary+ Cards</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rarity Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Rarity Breakdown</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Object.entries(RARITY_CONFIG).map(([rarity, config]) => (
              <div key={rarity} className="text-center">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: config.borderColor }}
                >
                  {rarityStats[rarity as CardRarity]}
                </div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{config.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        {ownedCards.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={() => setShowPackOpening(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🎁 Open Card Packs
            </button>
            
            {/* Debug Coin Button */}
            <button
              onClick={() => {
                CardCollectionManager.addScholarCoins(userId, 500);
                loadCollection();
              }}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🪙 Add 500 Coins (Debug)
            </button>
          </div>
        )}

        {/* Filters */}
        {ownedCards.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Filter Collection</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                />
              </div>

              {/* Rarity Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rarity</label>
                <select
                  value={filterRarity}
                  onChange={(e) => setFilterRarity(e.target.value as CardRarity | 'all')}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <option value="all">All Rarities</option>
                  {Object.entries(RARITY_CONFIG).map(([rarity, config]) => (
                    <option key={rarity} value={rarity}>{config.name}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                >
                  <option value="all">All Categories</option>
                  {Object.entries(CATEGORY_CONFIG).map(([category, config]) => (
                    <option key={category} value={category}>{config.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map(card => (
            <KnowledgeCardComponent
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
              showStats={true}
              className="transform transition-all duration-300 hover:scale-105"
            />
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            {ownedCards.length === 0 ? (
              // New user onboarding
              <div className="max-w-md mx-auto">
                <div className="text-8xl mb-6">🎁</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Welcome to Knowledge Cards!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start your collection by claiming your free daily pack! Discover famous people from AP subjects and build your knowledge. Earn Scholar Coins from quizzes to unlock premium packs.
                </p>
                <button
                  onClick={() => setShowPackOpening(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg mr-4"
                >
                  🎁 Open Daily Free Pack!
                </button>
                
                <button
                  onClick={() => {
                    CardCollectionManager.addScholarCoins(userId, 500);
                    loadCollection();
                  }}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  🪙 Get Debug Coins
                </button>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Daily Pack: 2 Common Cards • FREE • Resets at Midnight
                </div>
              </div>
            ) : (
              // No cards match current filters
              <div>
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No cards found
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        )}

        {/* Card Detail Modal */}
        {selectedCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Card Details</h2>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>

              <KnowledgeCardComponent card={selectedCard} showStats={true} />

              {/* Biography */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Biography</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedCard.biography}</p>
              </div>

              {/* Achievements */}
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Major Achievements</h3>
                <ul className="list-disc list-inside space-y-1">
                  {selectedCard.achievements.map((achievement, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{achievement}</li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => handleSetFavorite(selectedCard.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    collection.favoriteCard === selectedCard.id
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {collection.favoriteCard === selectedCard.id ? '⭐ Favorite' : '☆ Set as Favorite'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Card Pack Opening Modal */}
        {showPackOpening && (
          <CardPackOpening
            userId={userId}
            onPackOpened={handlePackOpened}
            onClose={() => setShowPackOpening(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Collections;
