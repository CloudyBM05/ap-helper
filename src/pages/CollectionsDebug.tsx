import React from 'react';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const CollectionsDebug: React.FC = () => {
  const [authUser, setAuthUser] = React.useState<any>(null);
  const [authLoading, setAuthLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      setAuthLoading(false);
      console.log('Auth state changed:', user?.uid || 'Not authenticated');
    });
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Collections Debug Page
        </h1>
        
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">System Status</h2>
          <div className="space-y-2">
            <p>✅ Page loaded successfully</p>
            <p>✅ Basic styling working</p>
            <p>✅ React component rendering</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Authentication Status</h2>
          <div className="space-y-2">
            <p>Loading: {authLoading ? 'Yes' : 'No'}</p>
            <p>User: {authUser ? authUser.email || authUser.uid : 'Not authenticated'}</p>
            <p>
              <Link to="/collections" className="text-blue-600 hover:text-blue-800 underline mr-4">
                Go to Collections Page
              </Link>
              <Link to="/collections-test" className="text-green-600 hover:text-green-800 underline">
                Go to Test Page (No Auth Required)
              </Link>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Testing Card System</h2>
          <div className="space-y-4">
            <button 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                console.log('Testing localStorage...');
                try {
                  localStorage.setItem('test', 'works');
                  const test = localStorage.getItem('test');
                  console.log('localStorage test:', test);
                  alert('localStorage is working!');
                } catch (error) {
                  console.error('localStorage error:', error);
                  alert('localStorage failed: ' + error);
                }
              }}
            >
              Test LocalStorage
            </button>

            <button 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors ml-4"
              onClick={() => {
                try {
                  // Test importing the card collection manager
                  import('../utils/cardCollectionManager').then((module) => {
                    console.log('CardCollectionManager loaded:', module);
                    const collection = module.CardCollectionManager.getUserCollection('debug-user');
                    console.log('Collection created:', collection);
                    alert('Card system is working! Check console for details.');
                  });
                } catch (error) {
                  console.error('Card system error:', error);
                  alert('Card system failed: ' + error);
                }
              }}
            >
              Test Card System
            </button>

            <button 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors ml-4"
              onClick={() => {
                try {
                  import('../data/knowledgeCardsData').then((module) => {
                    console.log('Card data loaded:', module.KNOWLEDGE_CARDS_DATABASE.length, 'cards');
                    console.log('Card packs:', module.CARD_PACKS.length, 'packs');
                    alert(`Loaded ${module.KNOWLEDGE_CARDS_DATABASE.length} cards and ${module.CARD_PACKS.length} packs!`);
                  });
                } catch (error) {
                  console.error('Card data error:', error);
                  alert('Card data failed: ' + error);
                }
              }}
            >
              Test Card Data
            </button>

            <button 
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors ml-4"
              onClick={() => {
                try {
                  import('../utils/cardCollectionManager').then((module) => {
                    const testUserId = 'test-user-123';
                    
                    // Give the test user some coins
                    module.CardCollectionManager.addScholarCoins(testUserId, 500);
                    
                    // Try to open a pack
                    const newCards = module.CardCollectionManager.openCardPack(testUserId, 'starter-pack');
                    
                    console.log('Pack opening result:', newCards);
                    
                    if (newCards && newCards.length > 0) {
                      alert(`Successfully opened pack! Got ${newCards.length} new cards!`);
                    } else {
                      alert(`Pack opening failed or no new cards received`);
                    }
                  });
                } catch (error) {
                  console.error('Pack opening error:', error);
                  alert('Pack opening failed: ' + error);
                }
              }}
            >
              Test Pack Opening
            </button>

            <button 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors ml-4"
              onClick={() => {
                try {
                  import('../utils/cardCollectionManager').then((module) => {
                    const testUserId = 'test-user-123';
                    
                    // Add debug coins
                    module.CardCollectionManager.addScholarCoins(testUserId, 1000);
                    
                    console.log('Added 1000 coins for debugging');
                    alert('Added 1000 Scholar Coins for debugging! You can now test different packs.');
                  });
                } catch (error) {
                  console.error('Add coins error:', error);
                  alert('Add coins failed: ' + error);
                }
              }}
            >
              Add Debug Coins (1000)
            </button>

            <button 
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors ml-4"
              onClick={() => {
                try {
                  import('../utils/cardCollectionManager').then((module) => {
                    const testUserId = 'test-user-123';
                    
                    // Check daily pack availability
                    const isAvailable = module.CardCollectionManager.isDailyPackAvailable(testUserId);
                    const timeUntilReset = module.CardCollectionManager.getDailyPackTimeUntilReset();
                    
                    console.log('Daily pack available:', isAvailable);
                    console.log('Time until reset:', timeUntilReset);
                    
                    if (isAvailable) {
                      // Try to open daily pack
                      const newCards = module.CardCollectionManager.openCardPack(testUserId, 'daily-pack');
                      
                      if (newCards && newCards.length > 0) {
                        alert(`Success! Opened daily pack and got ${newCards.length} cards! Next pack in ${timeUntilReset}`);
                      } else {
                        alert(`Failed to open daily pack`);
                      }
                    } else {
                      alert(`Daily pack already claimed! Next pack available in ${timeUntilReset}`);
                    }
                  });
                } catch (error) {
                  console.error('Daily pack error:', error);
                  alert('Daily pack test failed: ' + error);
                }
              }}
            >
              Test Daily Pack
            </button>

            <button 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors ml-4"
              onClick={() => {
                try {
                  import('../utils/cardCollectionManager').then((module) => {
                    const testUserId = 'test-user-123';
                    
                    // Get the user's collection
                    const collection = module.CardCollectionManager.getUserCollection(testUserId);
                    
                    console.log('User Collection:', collection);
                    console.log('Cards owned:', collection.cards);
                    console.log('Total cards:', collection.totalCards);
                    
                    // Get card details
                    const cardDetails = collection.cards.map(userCard => {
                      const card = module.CardCollectionManager.getCardById(userCard.cardId);
                      return { userCard, card };
                    });
                    
                    console.log('Card Details:', cardDetails);
                    alert(`Collection Debug: ${collection.totalCards} cards owned. Check console for details.`);
                  });
                } catch (error) {
                  console.error('Collection debug error:', error);
                  alert('Collection debug failed: ' + error);
                }
              }}
            >
              Debug Collection Data
            </button>

            <button 
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors ml-4"
              onClick={() => {
                try {
                  // Clear the test user's collection
                  localStorage.removeItem('ap_helper_card_collection');
                  alert('Collection cleared! You can now test with a fresh start.');
                } catch (error) {
                  console.error('Clear collection error:', error);
                  alert('Clear collection failed: ' + error);
                }
              }}
            >
              Clear Collection
            </button>

            <button 
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors ml-4"
              onClick={() => {
                try {
                  import('../utils/cardCollectionManager').then((module) => {
                    const testUserId = 'test-user-123';
                    
                    console.log('=== TESTING COMPLETE FLOW ===');
                    
                    // 1. Check initial state
                    console.log('1. Initial state:');
                    const initialCollection = module.CardCollectionManager.getUserCollection(testUserId);
                    console.log('  Initial cards:', initialCollection.totalCards);
                    
                    // 2. Open pack
                    console.log('2. Opening starter-pack...');
                    const newCards = module.CardCollectionManager.openCardPack(testUserId, 'starter-pack');
                    console.log('  Cards received:', newCards?.length || 0);
                    console.log('  Card names:', newCards?.map(c => c.name) || []);
                    
                    // 3. Check final state
                    console.log('3. Final state:');
                    const finalCollection = module.CardCollectionManager.getUserCollection(testUserId);
                    console.log('  Final cards:', finalCollection.totalCards);
                    console.log('  UserCard objects:', finalCollection.cards);
                    
                    // 4. Try to load card details
                    console.log('4. Loading card details:');
                    const cardDetails = finalCollection.cards.map(userCard => {
                      const card = module.CardCollectionManager.getCardById(userCard.cardId);
                      console.log(`  ${userCard.cardId} -> ${card?.name || 'NOT FOUND'}`);
                      return card;
                    });
                    
                    alert(`Test complete! Check console. Got ${newCards?.length || 0} cards, collection has ${finalCollection.totalCards} total.`);
                  });
                } catch (error) {
                  console.error('Complete flow test error:', error);
                  alert('Complete flow test failed: ' + error);
                }
              }}
            >
              Test Complete Flow
            </button>

            <button 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors ml-4"
              onClick={() => {
                try {
                  import('../utils/cardCollectionManager').then((module) => {
                    const testUserId = 'test-user-123';
                    
                    // Add lots of coins for testing
                    module.CardCollectionManager.addScholarCoins(testUserId, 10000);
                    
                    console.log('=== TESTING PERCENTAGE ACCURACY ===');
                    
                    // Test daily pack 20 times
                    const results = {
                      common: 0, uncommon: 0, rare: 0, epic: 0, legendary: 0, mythical: 0
                    };
                    
                    for (let i = 0; i < 20; i++) {
                      const cards = module.CardCollectionManager.openCardPack(testUserId, 'daily-pack');
                      if (cards) {
                        cards.forEach(card => {
                          results[card.rarity]++;
                        });
                      }
                    }
                    
                    const total = Object.values(results).reduce((sum, count) => sum + count, 0);
                    console.log('Daily Pack Results (20 packs, 40 cards total):');
                    console.log('Expected: 85% common (34 cards), 15% uncommon (6 cards)');
                    console.log('Actual:', results);
                    console.log('Percentages:', {
                      common: `${((results.common / total) * 100).toFixed(1)}%`,
                      uncommon: `${((results.uncommon / total) * 100).toFixed(1)}%`,
                      rare: `${((results.rare / total) * 100).toFixed(1)}%`,
                      epic: `${((results.epic / total) * 100).toFixed(1)}%`,
                      legendary: `${((results.legendary / total) * 100).toFixed(1)}%`,
                      mythical: `${((results.mythical / total) * 100).toFixed(1)}%`
                    });
                    
                    alert(`Percentage test complete! Check console for detailed results. Expected vs actual should be close.`);
                  });
                } catch (error) {
                  console.error('Percentage test error:', error);
                  alert('Percentage test failed: ' + error);
                }
              }}
            >
              Test Pack Percentages
            </button>

            <button 
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors ml-4"
              onClick={() => {
                try {
                  import('../utils/cardCollectionManager').then((module) => {
                    const testUserId = 'test-user-123';
                    
                    // Add some themed variants directly for testing
                    const themedCards = [
                      'pirate-george-washington',
                      'pirate-abraham-lincoln',
                      'wizard-einstein',
                      'wizard-newton',
                      'superhero-washington',
                      'superhero-einstein',
                      'student-einstein',
                      'student-curie',
                      'business-george-washington',
                      'medieval-abraham-lincoln',
                      'cyberpunk-albert-einstein',
                      'space-george-washington'
                    ];
                    
                    console.log('Adding themed cards to collection...');
                    
                    themedCards.forEach(cardId => {
                      const result = module.CardCollectionManager.addCardToCollection(testUserId, cardId);
                      console.log('Added themed card:', cardId, result ? 'success' : 'failed/duplicate');
                    });
                    
                    alert(`Added ${themedCards.length} themed variant cards to collection! Check your collection to see the themes.`);
                  });
                } catch (error) {
                  console.error('Add themed cards error:', error);
                  alert('Add themed cards failed: ' + error);
                }
              }}
            >
              Add Sample Themed Cards
            </button>

            <button 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors ml-4"
              onClick={() => {
                try {
                  import('../utils/cardCollectionManager').then((module) => {
                    const testUserId = 'test-user-123';
                    // Clear by overwriting with a new empty collection
                    const emptyCollection = {
                      userId: testUserId,
                      cards: [],
                      totalCards: 0,
                      scholarCoins: 0,
                      completionPercentage: 0,
                      favoriteCard: undefined,
                      achievementBadges: [],
                      lastCardObtained: undefined,
                      dailyPackClaims: { totalClaimed: 0 }
                    };
                    module.CardCollectionManager.saveCollection(emptyCollection);
                    console.log('Collection cleared for user:', testUserId);
                    alert('Collection cleared! You can now start fresh.');
                  });
                } catch (error) {
                  console.error('Clear collection error:', error);
                  alert('Clear collection failed: ' + error);
                }
              }}
            >
              Clear Collection
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Next Steps</h2>
          <p className="text-gray-600">
            Click the test buttons above to verify each component is working. 
            Check the browser console for detailed logs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollectionsDebug;
