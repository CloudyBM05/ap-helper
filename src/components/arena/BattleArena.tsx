import React, { useState, useEffect } from 'react';
import { ArenaBattle, DeckCard, BattleState } from '../../types/arena';
import { BattleQuestion } from '../../types/arena';

interface BattleArenaProps {
  battle: ArenaBattle;
  deck: DeckCard[];
  battleState: BattleState;
  onBattleComplete: (victory: boolean, earnedCoins: number, earnedXP: number) => void;
  onUpdateBattleState: (state: BattleState) => void;
  onBack: () => void;
}

const BattleArena: React.FC<BattleArenaProps> = ({
  battle,
  deck,
  battleState,
  onBattleComplete,
  onUpdateBattleState,
  onBack
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [selectedCard, setSelectedCard] = useState<DeckCard | null>(null);
  const [usedCardPower, setUsedCardPower] = useState<number>(0);

  const currentQuestion = battle.questions[battleState.currentQuestionIndex];
  const isLastQuestion = battleState.currentQuestionIndex >= battle.questions.length - 1;

  // Timer effect
  useEffect(() => {
    if (currentQuestion && !showExplanation && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !showExplanation && selectedAnswer === null) {
      // Time's up - auto-submit wrong answer
      handleAnswerSubmit();
    }
  }, [timeRemaining, showExplanation, selectedAnswer]);

  // Initialize timer for new question
  useEffect(() => {
    if (currentQuestion) {
      setTimeRemaining(currentQuestion.timeLimit);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setSelectedCard(null);
      setUsedCardPower(0);
    }
  }, [battleState.currentQuestionIndex]);

  const calculateCardBonus = (card: DeckCard, question: BattleQuestion) => {
    let bonus = 0;
    
    // Subject match bonus
    if (card.subjects.includes(question.subject as any)) {
      bonus += card.battlePower ? card.battlePower * 0.5 : 5;
    }
    
    // Related card bonus
    if (question.relatedCards && question.relatedCards.includes(card.id)) {
      bonus += card.battlePower ? card.battlePower * 1.0 : 10;
    }
    
    // Theme bonuses
    if (card.theme === 'wizard') {
      bonus += 3; // Wizards get knowledge bonus
    } else if (card.theme === 'superhero') {
      bonus += 2; // Heroes get confidence bonus
    }
    
    return Math.round(bonus);
  };

  const handleCardUse = (card: DeckCard) => {
    if (battleState.cardsUsed.includes(card.id)) return;
    
    const bonus = calculateCardBonus(card, currentQuestion);
    setSelectedCard(card);
    setUsedCardPower(bonus);
    
    // Update battle state to mark card as used
    const updatedState = {
      ...battleState,
      cardsUsed: [...battleState.cardsUsed, card.id]
    };
    onUpdateBattleState(updatedState);
  };

  const handleAnswerSubmit = () => {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    let scoreGained = 0;
    let damageDealt = 0;

    if (isCorrect) {
      scoreGained = 100 + usedCardPower;
      damageDealt = 10 + Math.round(usedCardPower / 5);
    } else {
      // Wrong answer - take damage
      damageDealt = -5;
    }

    const updatedState = {
      ...battleState,
      score: battleState.score + scoreGained,
      playerHealth: Math.max(0, battleState.playerHealth + (isCorrect ? 0 : damageDealt)),
      enemyHealth: Math.max(0, battleState.enemyHealth - Math.max(0, damageDealt)),
      questionsAnswered: battleState.questionsAnswered + 1,
      correctAnswers: battleState.correctAnswers + (isCorrect ? 1 : 0)
    };

    onUpdateBattleState(updatedState);
    setShowExplanation(true);

    // Check for battle end conditions
    setTimeout(() => {
      if (updatedState.playerHealth <= 0) {
        // Player defeated
        onBattleComplete(false, 0, 10);
      } else if (updatedState.enemyHealth <= 0) {
        // Enemy defeated
        const coins = battle.rewards.scholarCoins;
        const xp = battle.rewards.experiencePoints;
        onBattleComplete(true, coins, xp);
      } else if (isLastQuestion) {
        // Battle complete based on score
        const victory = updatedState.correctAnswers > battle.questions.length / 2;
        const coins = victory ? battle.rewards.scholarCoins : Math.round(battle.rewards.scholarCoins * 0.3);
        const xp = victory ? battle.rewards.experiencePoints : Math.round(battle.rewards.experiencePoints * 0.5);
        onBattleComplete(victory, coins, xp);
      } else {
        // Next question
        setTimeout(() => {
          const nextState = {
            ...updatedState,
            currentQuestionIndex: updatedState.currentQuestionIndex + 1
          };
          onUpdateBattleState(nextState);
        }, 3000);
      }
    }, 2000);
  };

  const getTimeColor = () => {
    const percentage = timeRemaining / currentQuestion.timeLimit;
    if (percentage > 0.6) return 'text-green-400';
    if (percentage > 0.3) return 'text-yellow-400';
    return 'text-red-400';
  };

  const availableCards = deck.filter(card => !battleState.cardsUsed.includes(card.id));

  return (
    <div className="space-y-6">
      {/* Battle Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            ⚔️ {battle.name}
          </h2>
          <div className="text-purple-200">
            Question {battleState.currentQuestionIndex + 1} of {battle.questions.length}
          </div>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Forfeit Battle
        </button>
      </div>

      {/* Health Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 p-4 rounded-xl border border-blue-400/30">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-blue-400 font-bold">Player</h3>
            <span className="text-white font-bold">{battleState.playerHealth}/100</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-500"
              style={{ width: `${battleState.playerHealth}%` }}
            />
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-red-400/30">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-red-400 font-bold">
              {battle.boss ? battle.boss.name : 'Enemy'}
            </h3>
            <span className="text-white font-bold">{battleState.enemyHealth}/100</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 to-red-300 transition-all duration-500"
              style={{ width: `${battleState.enemyHealth}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Timer and Score */}
          <div className="flex justify-between items-center">
            <div className="bg-white/5 px-4 py-2 rounded-xl border border-purple-400/30">
              <span className="text-gray-300">Score: </span>
              <span className="text-yellow-400 font-bold">{battleState.score}</span>
              {usedCardPower > 0 && selectedCard && (
                <span className="text-green-400 ml-2">+{usedCardPower} ({selectedCard.name})</span>
              )}
            </div>
            <div className={`text-2xl font-bold ${getTimeColor()}`}>
              ⏰ {timeRemaining}s
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/5 p-6 rounded-xl border border-purple-400/30">
            <div className="mb-4">
              <div className="text-sm text-purple-400 mb-2">
                {currentQuestion.subject.toUpperCase()} • Difficulty: {currentQuestion.difficulty}/10
              </div>
              <h3 className="text-xl text-white font-medium leading-relaxed">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showResult = showExplanation;
                
                return (
                  <button
                    key={index}
                    onClick={() => !showExplanation && setSelectedAnswer(index)}
                    disabled={showExplanation}
                    className={`
                      w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                      ${showResult
                        ? isCorrect 
                          ? 'bg-green-600/20 border-green-400 text-green-100'
                          : isSelected
                            ? 'bg-red-600/20 border-red-400 text-red-100'
                            : 'bg-gray-600/20 border-gray-600 text-gray-300'
                        : isSelected
                          ? 'bg-blue-600/30 border-blue-400 text-blue-100'
                          : 'bg-white/5 border-gray-600 text-white hover:border-purple-400 hover:bg-white/10'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                        ${showResult && isCorrect
                          ? 'bg-green-500 text-white'
                          : showResult && isSelected && !isCorrect
                            ? 'bg-red-500 text-white'
                            : isSelected
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-600 text-gray-300'
                        }
                      `}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {showResult && isCorrect && (
                        <span className="text-green-400 ml-auto">✓</span>
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <span className="text-red-400 ml-auto">✗</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Submit Button */}
            {!showExplanation && (
              <button
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                className={`
                  mt-4 px-6 py-3 font-bold rounded-lg transition-all
                  ${selectedAnswer !== null
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Submit Answer
              </button>
            )}

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-900/30 border border-blue-400/50 rounded-lg">
                <h4 className="text-blue-400 font-bold mb-2">Explanation:</h4>
                <p className="text-blue-100 leading-relaxed">{currentQuestion.explanation}</p>
                
                {selectedAnswer === currentQuestion.correctAnswer ? (
                  <div className="mt-3 text-green-400 font-bold">
                    ✓ Correct! +{100 + usedCardPower} points
                    {usedCardPower > 0 && ` (${usedCardPower} card bonus)`}
                  </div>
                ) : (
                  <div className="mt-3 text-red-400 font-bold">
                    ✗ Incorrect. -5 health
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Cards Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 p-4 rounded-xl border border-purple-400/30">
            <h3 className="text-white font-bold mb-3">🎯 Your Cards</h3>
            
            {selectedCard && (
              <div className="mb-4 p-3 bg-green-900/30 border border-green-400/50 rounded-lg">
                <div className="text-green-400 font-bold text-sm mb-1">CARD ACTIVATED:</div>
                <div className="text-white font-medium">{selectedCard.name}</div>
                <div className="text-green-300 text-sm">+{usedCardPower} bonus power!</div>
              </div>
            )}

            <div className="space-y-3 max-h-80 overflow-y-auto">
              {availableCards.map((card) => {
                const bonus = calculateCardBonus(card, currentQuestion);
                const isRelevant = bonus > 5;
                
                return (
                  <div
                    key={card.id}
                    onClick={() => !showExplanation && handleCardUse(card)}
                    className={`
                      p-3 rounded-lg border cursor-pointer transition-all duration-200
                      ${isRelevant
                        ? 'border-yellow-400 bg-yellow-900/20 hover:bg-yellow-900/30'
                        : 'border-gray-600 bg-white/5 hover:bg-white/10'
                      }
                      ${showExplanation ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-white text-sm truncate">
                        {card.name}
                      </div>
                      <div className={`text-xs font-bold px-2 py-1 rounded ${
                        isRelevant ? 'bg-yellow-600 text-yellow-100' : 'bg-gray-600 text-gray-200'
                      }`}>
                        +{bonus}
                      </div>
                    </div>
                    <div className="text-xs text-gray-300">
                      {card.subjects[0]?.toUpperCase() || 'N/A'} • Power: {card.battlePower}
                    </div>
                    {isRelevant && (
                      <div className="text-xs text-yellow-300 mt-1">
                        Strong against this question! ⚡
                      </div>
                    )}
                  </div>
                );
              })}
              
              {availableCards.length === 0 && (
                <div className="text-gray-400 text-sm text-center py-4">
                  All cards used
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleArena;
