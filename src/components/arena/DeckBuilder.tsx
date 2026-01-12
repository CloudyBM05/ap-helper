import React, { useState, useEffect } from 'react';
import { KnowledgeCard } from '../../types/knowledgeCards';
import { ArenaBattle, DeckCard } from '../../types/arena';
import KnowledgeCardComponent from '../KnowledgeCard';

interface DeckBuilderProps {
  availableCards: KnowledgeCard[];
  selectedBattle: ArenaBattle;
  onStartBattle: (deck: DeckCard[]) => void;
  onBack: () => void;
}

const DeckBuilder: React.FC<DeckBuilderProps> = ({
  availableCards,
  selectedBattle,
  onStartBattle,
  onBack
}) => {
  console.log('DeckBuilder received availableCards:', availableCards);
  console.log('Available cards length:', availableCards.length);
  
  const [selectedCards, setSelectedCards] = useState<DeckCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<KnowledgeCard[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [themeFilter, setThemeFilter] = useState<string>('all');
  const [rarityFilter, setRarityFilter] = useState<string>('all');

  const maxDeckSize = 8;
  const minDeckSize = selectedBattle.requiredCards || 3;

  // Filter cards based on battle restrictions
  useEffect(() => {
    console.log('DeckBuilder useEffect triggered');
    console.log('availableCards in useEffect:', availableCards);
    console.log('availableCards.length in useEffect:', availableCards.length);
    console.log('selectedBattle restrictions:', {
      restrictedToSubjects: selectedBattle.restrictedToSubjects,
      restrictedToThemes: selectedBattle.restrictedToThemes
    });
    
    let filtered = availableCards;

    // Apply battle restrictions
    if (selectedBattle.restrictedToSubjects) {
      console.log('Available cards before subject restriction:', filtered.length);
      console.log('Sample cards subjects:', filtered.slice(0, 5).map(card => ({ name: card.name, subjects: card.subjects })));
      console.log('Required subjects:', selectedBattle.restrictedToSubjects);
      
      filtered = filtered.filter(card => 
        card.subjects.some(subject => 
          selectedBattle.restrictedToSubjects!.some(reqSubject => 
            subject.toLowerCase() === reqSubject.toLowerCase()
          )
        )
      );
      console.log('After subject restriction filter:', filtered.length);
      console.log('Remaining cards:', filtered.slice(0, 5).map(card => ({ name: card.name, subjects: card.subjects })));
    }

    if (selectedBattle.restrictedToThemes) {
      filtered = filtered.filter(card => 
        selectedBattle.restrictedToThemes!.includes(card.theme || '')
      );
      console.log('After theme restriction filter:', filtered.length);
    }

    // Apply user filters
    if (subjectFilter !== 'all') {
      filtered = filtered.filter(card => 
        card.subjects.some(subject => subject.toLowerCase() === subjectFilter.toLowerCase())
      );
      console.log('After subject filter:', filtered.length);
    }

    if (themeFilter !== 'all') {
      filtered = filtered.filter(card => card.theme === themeFilter);
      console.log('After theme filter:', filtered.length);
    }

    if (rarityFilter !== 'all') {
      filtered = filtered.filter(card => card.rarity === rarityFilter);
      console.log('After rarity filter:', filtered.length);
    }

    console.log('Final filtered cards:', filtered.length);
    setFilteredCards(filtered);
  }, [availableCards, selectedBattle, subjectFilter, themeFilter, rarityFilter]);

  const calculateBattlePower = (card: KnowledgeCard) => {
    const stats = card.stats;
    const statSum = (stats.intelligence || 0) + (stats.influence || 0) + (stats.innovation || 0) + 
                    (stats.leadership || 0) + (stats.perseverance || 0) + (stats.charisma || 0);
    return Math.round(statSum / 6);
  };

  const calculateDeckSynergies = () => {
    const synergies: string[] = [];
    const subjectCount: Record<string, number> = {};
    const themeCount: Record<string, number> = {};

    selectedCards.forEach(card => {
      // Count first subject for simplicity
      if (card.subjects.length > 0) {
        const subject = card.subjects[0];
        subjectCount[subject] = (subjectCount[subject] || 0) + 1;
      }
      if (card.theme) {
        themeCount[card.theme] = (themeCount[card.theme] || 0) + 1;
      }
    });

    // Simple synergy detection - 3+ cards of same subject or theme
    Object.entries(subjectCount).forEach(([subject, count]) => {
      if (count >= 3) {
        synergies.push(`${subject.toUpperCase()} Mastery`);
      }
    });

    Object.entries(themeCount).forEach(([theme, count]) => {
      if (count >= 3) {
        synergies.push(`${theme} Unity`);
      }
    });

    return synergies;
  };

  const handleCardClick = (card: KnowledgeCard) => {
    const isSelected = selectedCards.some(selected => selected.id === card.id);
    
    if (isSelected) {
      setSelectedCards(selectedCards.filter(selected => selected.id !== card.id));
    } else if (selectedCards.length < maxDeckSize) {
      const deckCard: DeckCard = {
        ...card,
        isSelected: true,
        battlePower: calculateBattlePower(card)
      };
      setSelectedCards([...selectedCards, deckCard]);
    }
  };

  const handleStartBattle = () => {
    if (selectedCards.length >= minDeckSize) {
      onStartBattle(selectedCards);
    }
  };

  const totalDeckPower = selectedCards.reduce((sum, card) => sum + (card.battlePower || 0), 0);
  const activeSynergies = calculateDeckSynergies();
  const uniqueSubjects = new Set(availableCards.flatMap(card => card.subjects)).size;
  const uniqueThemes = new Set(availableCards.map(card => card.theme).filter(Boolean)).size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            ⚔️ Build Your Deck
          </h2>
          <p className="text-purple-200">
            Select {minDeckSize}-{maxDeckSize} cards for: <span className="font-bold text-white">{selectedBattle.name}</span>
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
        >
          ← Back to Arena
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Deck Builder Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Deck Status */}
          <div className="bg-white/5 p-4 rounded-xl border border-purple-400/30">
            <h3 className="text-white font-bold mb-3">📊 Deck Status</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Cards:</span>
                <span className={`font-bold ${selectedCards.length >= minDeckSize ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedCards.length}/{maxDeckSize}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Power:</span>
                <span className="text-yellow-400 font-bold">{totalDeckPower}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Synergies:</span>
                <span className="text-purple-400 font-bold">{activeSynergies.length}</span>
              </div>
            </div>

            {/* Active Synergies */}
            {activeSynergies.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-600/30">
                <div className="text-xs text-purple-400 font-bold mb-2">ACTIVE SYNERGIES:</div>
                {activeSynergies.map((synergy, index) => (
                  <div key={index} className="text-xs text-green-400 mb-1">
                    ✨ {synergy}
                  </div>
                ))}
              </div>
            )}

            {/* Start Battle Button */}
            <button
              onClick={handleStartBattle}
              disabled={selectedCards.length < minDeckSize}
              className={`
                w-full mt-4 px-4 py-3 font-bold rounded-lg transition-all
                ${selectedCards.length >= minDeckSize
                  ? 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {selectedCards.length >= minDeckSize 
                ? '⚔️ Start Battle!' 
                : `Need ${minDeckSize - selectedCards.length} more cards`
              }
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white/5 p-4 rounded-xl border border-purple-400/30">
            <h3 className="text-white font-bold mb-3">🔍 Filters</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400 block mb-1">Subject</label>
                <select 
                  value={subjectFilter} 
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full bg-black/30 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                >
                  <option value="all">All Subjects ({uniqueSubjects})</option>
                  {Array.from(new Set(availableCards.flatMap(card => card.subjects))).map(subject => (
                    <option key={subject} value={subject}>{subject.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">Theme</label>
                <select 
                  value={themeFilter} 
                  onChange={(e) => setThemeFilter(e.target.value)}
                  className="w-full bg-black/30 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                >
                  <option value="all">All Themes ({uniqueThemes})</option>
                  {Array.from(new Set(availableCards.map(card => card.theme).filter(Boolean))).map(theme => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-1">Rarity</label>
                <select 
                  value={rarityFilter} 
                  onChange={(e) => setRarityFilter(e.target.value)}
                  className="w-full bg-black/30 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                >
                  <option value="all">All Rarities</option>
                  <option value="common">Common</option>
                  <option value="uncommon">Uncommon</option>
                  <option value="rare">Rare</option>
                  <option value="epic">Epic</option>
                  <option value="legendary">Legendary</option>
                  <option value="mythical">Mythical</option>
                </select>
              </div>
            </div>
          </div>

          {/* Selected Cards Preview */}
          <div className="bg-white/5 p-4 rounded-xl border border-purple-400/30">
            <h3 className="text-white font-bold mb-3">🎯 Selected Cards</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {selectedCards.map((card, index) => (
                <div 
                  key={`${card.id}-${index}`}
                  className="flex items-center justify-between bg-black/30 p-2 rounded border border-gray-600/50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate">
                      {card.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {card.subjects[0]?.toUpperCase() || 'N/A'} • Power: {card.battlePower}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCardClick(card)}
                    className="text-red-400 hover:text-red-300 ml-2"
                    title="Remove from deck"
                  >
                    ✕
                  </button>
                </div>
              ))}
              {selectedCards.length === 0 && (
                <div className="text-gray-400 text-sm text-center py-4">
                  No cards selected
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-white font-bold">
              Available Cards ({filteredCards.length})
            </h3>
            <div className="text-sm text-gray-400">
              Click cards to add/remove from deck
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCards.map((card) => {
              const isSelected = selectedCards.some(selected => selected.id === card.id);
              const battlePower = calculateBattlePower(card);
              
              return (
                <div 
                  key={card.id}
                  className={`
                    relative cursor-pointer transition-all duration-200 transform
                    ${isSelected 
                      ? 'ring-4 ring-green-400 scale-105' 
                      : 'hover:scale-105'
                    }
                    ${selectedCards.length >= maxDeckSize && !isSelected 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                    }
                  `}
                  onClick={() => handleCardClick(card)}
                >
                  {/* Battle Power Badge */}
                  <div className="absolute top-2 right-2 z-10 bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    ⚔️ {battlePower}
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 left-2 z-10 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      ✓ Selected
                    </div>
                  )}

                  <KnowledgeCardComponent card={card} />
                </div>
              );
            })}
          </div>

          {filteredCards.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No cards match your filters</div>
              <button
                onClick={() => {
                  setSubjectFilter('all');
                  setThemeFilter('all');
                  setRarityFilter('all');
                }}
                className="text-purple-400 hover:text-purple-300 underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeckBuilder;
