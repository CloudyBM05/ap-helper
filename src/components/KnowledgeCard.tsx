import React from 'react';
import { KnowledgeCard, RARITY_CONFIG, CATEGORY_CONFIG, THEME_CONFIG } from '../types/knowledgeCards';

interface KnowledgeCardProps {
  card: KnowledgeCard;
  onClick?: () => void;
  showStats?: boolean;
  compact?: boolean;
  className?: string;
}

const KnowledgeCardComponent: React.FC<KnowledgeCardProps> = ({ 
  card, 
  onClick, 
  showStats = false, 
  compact = false,
  className = ''
}) => {
  const rarityConfig = RARITY_CONFIG[card.rarity];
  const categoryConfig = CATEGORY_CONFIG[card.category];
  
  // Determine theme from card ID if not explicitly set
  const getThemeFromId = (id: string) => {
    if (id.startsWith('pirate-')) return 'pirate';
    if (id.startsWith('wizard-')) return 'wizard';
    if (id.startsWith('superhero-')) return 'superhero';
    if (id.startsWith('student-')) return 'student';
    if (id.startsWith('business-')) return 'business';
    if (id.startsWith('medieval-')) return 'medieval';
    if (id.startsWith('cyberpunk-')) return 'cyberpunk';
    if (id.startsWith('space-')) return 'space';
    return card.theme || 'standard';
  };
  
  const cardTheme = getThemeFromId(card.id);
  const themeConfig = THEME_CONFIG[cardTheme];

  const cardStyle = {
    background: cardTheme !== 'standard' 
      ? themeConfig.bgGradient 
      : `linear-gradient(135deg, ${rarityConfig.color}15 0%, ${rarityConfig.color}08 100%)`,
    border: cardTheme !== 'standard' 
      ? `3px ${themeConfig.borderStyle} ${rarityConfig.borderColor}`
      : `2px solid ${rarityConfig.borderColor}`,
    boxShadow: cardTheme !== 'standard'
      ? `0 4px 20px ${rarityConfig.glow}, 0 0 30px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.1)`
      : `0 4px 20px ${rarityConfig.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`
  };

  if (compact) {
    return (
      <div
        className={`relative p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl themed-card-${cardTheme} ${className}`}
        style={cardStyle}
        onClick={onClick}
      >
        <div className="flex items-center space-x-2">
          <div className="text-lg">{categoryConfig.icon}</div>
          <div className="flex-1">
            <div className="font-bold text-sm text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              {card.name}
            </div>
            <div className="text-xs text-white px-2 py-0.5 rounded mt-1" 
                 style={{ 
                   backgroundColor: 'rgba(255,255,255,0.15)',
                   textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                 }}>
              {rarityConfig.name}
              {cardTheme !== 'standard' && (
                <span className="ml-2 text-yellow-300">
                  {themeConfig.icon} {themeConfig.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const lifeYears = card.birthYear && card.deathYear 
    ? `${card.birthYear} - ${card.deathYear}`
    : card.birthYear 
      ? `${card.birthYear} - Present`
      : undefined;

  return (
    <div
      className={`relative bg-gradient-to-br from-gray-900 to-black rounded-xl p-3 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1 themed-card-${cardTheme} rarity-${card.rarity} group ${className}`}
      style={cardStyle}
      onClick={onClick}
    >
      {/* Large theme icon overlay */}
      {cardTheme !== 'standard' && (
        <div className="absolute top-4 right-4 text-6xl opacity-10 pointer-events-none select-none">
          {themeConfig.icon}
        </div>
      )}

      {/* Themed background layers and textures */}
      {cardTheme === 'pirate' && (
        <div className="absolute inset-0 rounded-xl opacity-15 pointer-events-none"
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23654321' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16zm16 0c0 8.837-7.163 16-16 16s-16-7.163-16-16 7.163-16 16-16 16 7.163 16 16z'/%3E%3C/g%3E%3C/svg%3E")` 
             }} />
      )}
      
      {cardTheme === 'wizard' && (
        <div className="absolute inset-0 rounded-xl opacity-20 pointer-events-none"
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B00FF' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30zm-15-15l15 15-15 15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
             }} />
      )}
      
      {cardTheme === 'cyberpunk' && (
        <div className="absolute inset-0 rounded-xl opacity-25 pointer-events-none"
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300ffff' fill-opacity='0.1'%3E%3Crect x='0' y='0' width='10' height='1'/%3E%3Crect x='0' y='5' width='15' height='1'/%3E%3Crect x='0' y='10' width='8' height='1'/%3E%3Crect x='0' y='15' width='12' height='1'/%3E%3C/g%3E%3C/svg%3E")` 
             }} />
      )}

      {/* Faint subject icon watermark */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl opacity-5 pointer-events-none select-none">
        {categoryConfig.icon}
      </div>

      {/* Animated themed border effect */}
      {cardTheme !== 'standard' && (
        <div className="absolute inset-0 rounded-xl pointer-events-none">
          {cardTheme === 'wizard' && (
            <div className="absolute inset-0 rounded-xl border-2 border-purple-400 animate-pulse opacity-30"></div>
          )}
          {cardTheme === 'superhero' && (
            <div className="absolute inset-0 rounded-xl border-2 border-yellow-400 animate-ping opacity-20"></div>
          )}
          {cardTheme === 'cyberpunk' && (
            <div className="absolute inset-0 rounded-xl border-2 border-cyan-400 animate-pulse opacity-40"></div>
          )}
          {cardTheme === 'space' && (
            <div className="absolute inset-0 rounded-xl border-2 border-blue-400 animate-pulse opacity-30"></div>
          )}
        </div>
      )}

      {/* Rarity-based visual effects */}
      {card.rarity === 'epic' && (
        <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>
      )}
      
      {card.rarity === 'legendary' && (
        <>
          <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-800"></div>
          </div>
          <div className="absolute inset-0 rounded-xl border-2 border-yellow-400/30 animate-pulse pointer-events-none"></div>
        </>
      )}
      
      {card.rarity === 'mythical' && (
        <>
          <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/25 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-600"></div>
          </div>
          <div className="absolute inset-0 rounded-xl border-2 border-purple-400/40 animate-pulse pointer-events-none"></div>
          <div className="absolute inset-2 rounded-lg border border-pink-400/20 animate-ping pointer-events-none"></div>
        </>
      )}

      {/* Rarity indicator with enhanced styling - more compact */}
      <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg z-20 ${
        card.rarity === 'mythical' ? 'animate-pulse' : ''
      }`} style={{ backgroundColor: rarityConfig.borderColor }}>
        {rarityConfig.name.toUpperCase()}
      </div>

      {/* Theme indicator - positioned to not interfere */}
      {cardTheme !== 'standard' && (
        <div className="absolute top-2 right-2 flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold text-white shadow-lg z-20"
             style={{ 
               backgroundColor: 'rgba(0,0,0,0.8)',
               border: `1px solid ${rarityConfig.borderColor}` 
             }}>
          <span className="text-xs">{themeConfig.icon}</span>
          <span className="text-xs">{themeConfig.name}</span>
        </div>
      )}

      {/* Category icon - moved to bottom left to avoid overlap */}
      <div className="absolute bottom-2 left-2 text-lg opacity-60">
        {categoryConfig.icon}
      </div>

      {/* Card content with natural spacing */}
      <div className="mt-3 relative z-10">
        <div className="flex items-start gap-2 mb-2">
          {/* Portrait in top left for Epic+ cards - smaller */}
          {(['epic', 'legendary', 'mythical'].includes(card.rarity)) && (
            <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-500 dark:from-gray-600 dark:to-gray-800 rounded-lg flex items-center justify-center border-2 shadow-lg flex-shrink-0"
                 style={{ borderColor: rarityConfig.borderColor }}>
              {card.imageUrl ? (
                <img 
                  src={card.imageUrl} 
                  alt={card.name} 
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-200 text-center">
                  <div className="text-lg">🎭</div>
                </div>
              )}
            </div>
          )}
          
          {/* Main content area - more compact */}
          <div className="flex-1 min-w-0">
            {/* Character Name - more compact */}
            <h3 className="text-lg font-bold text-white mb-1" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
              {card.name}
            </h3>
            
            {/* One-liner Fact - more compact */}
            <p className="text-xs text-white font-medium leading-relaxed mb-2 px-2 py-1 rounded-md" 
               style={{ 
                 backgroundColor: 'rgba(0,0,0,0.3)',
                 textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                 backdropFilter: 'blur(2px)'
               }}>
              {card.famousQuote ? 
                `"${card.famousQuote}"` : 
                card.description.split('.')[0] + '.'
              }
            </p>
          </div>
        </div>

        {/* "Power" / Special Ability - more compact */}
        {card.specialAbility && (
          <div className="mb-2 p-2 rounded-lg border border-yellow-400/40" 
               style={{ 
                 backgroundColor: 'rgba(0,0,0,0.25)',
                 backdropFilter: 'blur(4px)'
               }}>
            <div className="text-xs font-bold text-yellow-200 mb-1 flex items-center" 
                 style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              ⚡ {card.specialAbility.name}
            </div>
            <div className="text-xs text-yellow-100 leading-relaxed" 
                 style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
              {card.specialAbility.description}
            </div>
          </div>
        )}

        {/* Tiny AP Tags - more compact */}
        <div className="flex flex-wrap gap-1 justify-center mb-2">
          {card.subjects.slice(0, 2).map(subject => (
            <span
              key={subject}
              className="px-2 py-0.5 text-white rounded-full text-xs font-semibold border border-white/30"
              style={{ 
                backgroundColor: 'rgba(255,255,255,0.15)',
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                backdropFilter: 'blur(2px)'
              }}
            >
              {subject.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Life years - more compact */}
        {lifeYears && (
          <div className="text-center text-xs text-white mb-2" 
               style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}>
            {lifeYears}
          </div>
        )}

        {/* Stats - back to compact natural layout */}
        {showStats && (
          <div className="mt-3 p-2 rounded-lg border border-white/20" 
               style={{ 
                 backgroundColor: 'rgba(0,0,0,0.3)',
                 backdropFilter: 'blur(4px)'
               }}>
            <h4 className="text-xs font-bold text-white mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Stats:
            </h4>
            <div className="space-y-2">
              {Object.entries(card.stats).map(([stat, value]) => {
                if (value === undefined) return null;
                return (
                  <div key={stat} className="flex items-center gap-2">
                    <span className="text-xs text-white capitalize font-medium min-w-0 flex-shrink-0" 
                          style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      {stat}:
                    </span>
                    <div className="flex-1 flex items-center gap-1">
                      <div className="flex-1 h-2 bg-black/40 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${(value / 10) * 100}%` }}
                        >
                        </div>
                      </div>
                      <span className="text-xs font-bold text-white px-1 py-0.5 rounded text-center min-w-[1.5rem]" 
                            style={{ 
                              backgroundColor: 'rgba(255,255,255,0.2)',
                              textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                            }}>
                        {value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Time period - more compact */}
        {card.timesPeriod && (
          <div className="mt-2 text-xs text-white text-center" 
               style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            Era: {card.timesPeriod}
          </div>
        )}
      </div>

      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, ${rarityConfig.color} 0%, transparent 70%)` 
        }}
      />
    </div>
  );
};

export default KnowledgeCardComponent;
