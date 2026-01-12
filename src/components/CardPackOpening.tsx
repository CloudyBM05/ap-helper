import React, { useState, useEffect } from 'react';
import { KnowledgeCard, CardPack } from '../types/knowledgeCards';
import { CARD_PACKS } from '../data/knowledgeCardsData';
import { CardCollectionManager } from '../utils/cardCollectionManager';
import KnowledgeCardComponent from './KnowledgeCard';

interface CardPackOpeningProps {
  userId: string;
  onPackOpened?: (cards: KnowledgeCard[]) => void;
  onClose?: () => void;
}

const CardPackOpening: React.FC<CardPackOpeningProps> = ({ userId, onPackOpened, onClose }) => {
  const [selectedPack, setSelectedPack] = useState<CardPack | null>(null);
  const [openedCards, setOpenedCards] = useState<KnowledgeCard[]>([]);
  const [isOpening, setIsOpening] = useState(false);
  const [revealedCards, setRevealedCards] = useState<boolean[]>([]);
  const [userCollection, setUserCollection] = useState(CardCollectionManager.getUserCollection(userId));
  const [showPackSelection, setShowPackSelection] = useState(true);
  const [dailyPackAvailable, setDailyPackAvailable] = useState(CardCollectionManager.isDailyPackAvailable(userId));
  const [timeUntilReset, setTimeUntilReset] = useState(CardCollectionManager.getDailyPackTimeUntilReset());

  useEffect(() => {
    // Update collection and daily pack status
    setUserCollection(CardCollectionManager.getUserCollection(userId));
    setDailyPackAvailable(CardCollectionManager.isDailyPackAvailable(userId));
    setTimeUntilReset(CardCollectionManager.getDailyPackTimeUntilReset());
    
    // Update timer every minute
    const timer = setInterval(() => {
      setDailyPackAvailable(CardCollectionManager.isDailyPackAvailable(userId));
      setTimeUntilReset(CardCollectionManager.getDailyPackTimeUntilReset());
    }, 60000);
    
    return () => clearInterval(timer);
  }, [userId]);

  const handleOpenPack = async (pack: CardPack) => {
    // Check daily pack availability
    if (pack.id === 'daily-pack' && !dailyPackAvailable) {
      alert(`Daily pack already claimed! Next pack available in ${timeUntilReset}`);
      return;
    }
    
    if (userCollection.scholarCoins < pack.price) {
      alert(`Not enough Scholar Coins! You need ${pack.price} coins but only have ${userCollection.scholarCoins}.`);
      return;
    }

    setSelectedPack(pack);
    setIsOpening(true);
    setShowPackSelection(false);
    console.log('Pack opening started for:', pack.name);

    try {
      const cards = CardCollectionManager.openCardPack(userId, pack.id);
      console.log('Cards received from pack opening:', cards);
      if (cards && cards.length > 0) {
        setOpenedCards(cards);
        setRevealedCards(new Array(cards.length).fill(false));
        console.log('Set opened cards:', cards, 'Revealed array:', new Array(cards.length).fill(false));
        
        // Update collection after opening
        setUserCollection(CardCollectionManager.getUserCollection(userId));
        setDailyPackAvailable(CardCollectionManager.isDailyPackAvailable(userId));
        
        // Trigger callback
        onPackOpened?.(cards);
      } else {
        console.error('No cards received from pack opening');
        alert('No cards received from pack opening. Please try again.');
        setIsOpening(false);
        setShowPackSelection(true);
      }
    } catch (error) {
      console.error('Error opening pack:', error);
      alert('Error opening pack: ' + error);
      setIsOpening(false);
      setShowPackSelection(true);
    }
  };

  const revealCard = (index: number) => {
    setRevealedCards(prev => {
      const newRevealed = [...prev];
      newRevealed[index] = true;
      return newRevealed;
    });
  };

  const revealAllCards = () => {
    setRevealedCards(new Array(openedCards.length).fill(true));
  };

  const handleClose = () => {
    setSelectedPack(null);
    setOpenedCards([]);
    setIsOpening(false);
    setRevealedCards([]);
    setShowPackSelection(true);
    onClose?.();
  };

  // Debug logging
  console.log('CardPackOpening render state:', {
    showPackSelection,
    isOpening,
    openedCardsLength: openedCards.length,
    selectedPack: selectedPack?.name,
    dailyPackAvailable
  });

  if (showPackSelection) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Card Packs
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <div className="text-yellow-500 text-2xl">🪙</div>
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Scholar Coins: {userCollection.scholarCoins}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CARD_PACKS.map((pack: CardPack) => {
              // Determine pack tier styling based on highest rarity with significant drop rate
              const hasHighMythical = pack.rarityDropRates.mythical >= 5;
              const hasLegendary = pack.rarityDropRates.legendary >= 10;
              const hasEpic = pack.rarityDropRates.epic >= 15;
              const hasRare = pack.rarityDropRates.rare >= 10;
              
              let packBorderColor = 'border-gray-300';
              let packGradient = 'from-gray-50 to-gray-100';
              let packTextColor = 'text-gray-800';
              
              if (hasHighMythical) {
                packBorderColor = 'border-pink-400';
                packGradient = 'from-pink-50 to-purple-100';
                packTextColor = 'text-pink-800';
              } else if (hasLegendary) {
                packBorderColor = 'border-orange-400';
                packGradient = 'from-orange-50 to-yellow-100';
                packTextColor = 'text-orange-800';
              } else if (hasEpic) {
                packBorderColor = 'border-purple-400';
                packGradient = 'from-purple-50 to-blue-100';
                packTextColor = 'text-purple-800';
              } else if (hasRare) {
                packBorderColor = 'border-blue-400';
                packGradient = 'from-blue-50 to-indigo-100';
                packTextColor = 'text-blue-800';
              }

              return (
                <div
                  key={pack.id}
                  className={`bg-gradient-to-br ${packGradient} dark:from-blue-900/20 dark:to-purple-900/20 border-2 ${packBorderColor} dark:border-blue-700 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  onClick={() => handleOpenPack(pack)}
                >
                  <h3 className={`text-xl font-bold ${packTextColor} dark:text-gray-200 mb-2`}>
                    {pack.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {pack.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium">Cards: </span>
                      <span className="text-gray-600 dark:text-gray-400">{pack.cardCount}</span>
                    </div>
                    {pack.id === 'daily-pack' && (
                      <div className="text-sm">
                        {dailyPackAvailable ? (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">DAILY FREE ✨</span>
                        ) : (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">Reset in {timeUntilReset}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1 mb-4">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Drop Rates:</div>
                    {Object.entries(pack.rarityDropRates).map(([rarity, rate]) => {
                      if (rate === 0) return null; // Don't show 0% rates
                      
                      const rarityColors = {
                        common: 'text-gray-600',
                        uncommon: 'text-green-600',
                        rare: 'text-blue-600',
                        epic: 'text-purple-600',
                        legendary: 'text-orange-600',
                        mythical: 'text-pink-600'
                      };
                      return (
                        <div key={rarity} className={`text-xs ${rarityColors[rarity as keyof typeof rarityColors]}`}>
                          {rate}% {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className="text-yellow-500">🪙</div>
                      <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        {pack.price}
                      </span>
                      {pack.id === 'daily-pack' && <span className="text-blue-600 font-bold text-sm ml-1">FREE</span>}
                    </div>
                    
                    {pack.id === 'daily-pack' && !dailyPackAvailable ? (
                      <span className="text-gray-500 text-sm font-medium">Already claimed</span>
                    ) : userCollection.scholarCoins < pack.price ? (
                      <span className="text-red-500 text-sm font-medium">Not enough coins</span>
                    ) : (
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Open Pack
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (isOpening && openedCards.length > 0) {
    console.log('Rendering pack opening results. IsOpening:', isOpening, 'Cards:', openedCards.length);
    const allRevealed = revealedCards.every(revealed => revealed);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              Pack Opening Results
            </h2>
            <div className="flex space-x-4">
              {!allRevealed && (
                <button
                  onClick={revealAllCards}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Reveal All
                </button>
              )}
              <button
                onClick={handleClose}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          <div className="mb-6 text-center">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {selectedPack?.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Click cards to reveal them!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openedCards.map((card, index) => (
              <div key={`${card.id}-${index}`} className="relative">
                {!revealedCards[index] ? (
                  <div
                    className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 flex items-center justify-center min-h-[200px]"
                    onClick={() => revealCard(index)}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">❓</div>
                      <div className="text-white font-semibold">Click to reveal!</div>
                    </div>
                  </div>
                ) : (
                  <div className="animate-flip-in">
                    <KnowledgeCardComponent
                      card={card}
                      showStats={true}
                      className="h-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Remaining Scholar Coins: {userCollection.scholarCoins}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for any other state
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-8 max-w-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Pack opening state: isOpening={String(isOpening)}, cards={openedCards.length}, showSelection={String(showPackSelection)}
          </p>
          <button
            onClick={handleClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPackOpening;
