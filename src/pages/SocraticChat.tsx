import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Bot, User, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { sessionManager } from '../utils/sessionManager';
import { APUSH_UNIT1_CONTENT } from '../utils/apushContent';
import { userMemoryManager, ConversationMemory } from '../utils/userMemory';
import { useAuth } from '../hooks/useAuth';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface Quiz {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface UnitTopic {
  key: string;
  title: string;
  keyFacts: string[];
}

interface UnitTopicsData {
  unit: string;
  course: string;
  overview: string;
  topics: UnitTopic[];
}

const SocraticChat = () => {
  const { course, unit } = useParams<{ course: string; unit: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading, getAuthHeaders } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationMemory, setConversationMemory] = useState<ConversationMemory | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const [unitTopics, setUnitTopics] = useState<UnitTopic[]>([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // Always scroll to bottom for new messages
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  // Define utility functions before useEffects to avoid hoisting issues
  const getUnitInfo = () => {
    if (course === 'apush') {
      const unitData = {
        'unit1': { title: 'APUSH Unit 1: Colonial Period and Independence', period: '1491–1800', emoji: '🌎' },
        'unit2': { title: 'APUSH Unit 2: Early Republic', period: '1800–1848', emoji: '🇺🇸' },
        'unit3': { title: 'APUSH Unit 3: Civil War and Reconstruction', period: '1844–1877', emoji: '⚔️' },
        'unit4': { title: 'APUSH Unit 4: The Gilded Age', period: '1865–1898', emoji: '🏭' },
        'unit5': { title: 'APUSH Unit 5: Imperialism and World War I', period: '1890–1920', emoji: '🌍' },
        'unit6': { title: 'APUSH Unit 6: Prosperity, Depression, and the New Deal', period: '1920–1945', emoji: '📈' },
        'unit7': { title: 'APUSH Unit 7: World War II and Early Cold War', period: '1940–1963', emoji: '🕊️' },
        'unit8': { title: 'APUSH Unit 8: Civil Rights and Social Change', period: '1945–1980', emoji: '✊' },
        'unit9': { title: 'APUSH Unit 9: Entering the 21st Century', period: '1980–Present', emoji: '💻' }
      };
      return unitData[unit as keyof typeof unitData] || { title: `APUSH ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
    }
    if (course === 'apgov') {
      const unitData = {
        'unit1': { title: 'AP Gov Unit 1: Foundations of Democracy', period: 'Constitutional Framework', emoji: '📜' },
        'unit2': { title: 'AP Gov Unit 2: Interactions Among Branches', period: 'Government Structure', emoji: '🏛️' },
        'unit3': { title: 'AP Gov Unit 3: Civil Liberties and Rights', period: 'Individual Rights', emoji: '⚖️' },
        'unit4': { title: 'AP Gov Unit 4: Political Ideologies and Beliefs', period: 'Public Opinion', emoji: '💭' },
        'unit5': { title: 'AP Gov Unit 5: Political Participation', period: 'Democratic Process', emoji: '🗳️' }
      };
      return unitData[unit as keyof typeof unitData] || { title: `AP Gov ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
    }
    if (course === 'apworld' || course === 'world') {
      const unitData = {
        'unit1': { title: 'AP World Unit 1: Global Trade Networks', period: '1200–1450 CE', emoji: '🛤️' },
        'unit2': { title: 'AP World Unit 2: Early Modern Global Connections', period: '1450–1750 CE', emoji: '🌍' },
        'unit3': { title: 'AP World Unit 3: Industrial Age and Imperialism', period: '1750–1900 CE', emoji: '🏭' },
        'unit4': { title: 'AP World Unit 4: The Modern World', period: '1900–Present', emoji: '🌐' },
        'unit5': { title: 'AP World Unit 5: Revolutions and Independence', period: '1750–1900 CE', emoji: '🔥' },
        'unit6': { title: 'AP World Unit 6: Consequences of Industrialization', period: '1750–1900 CE', emoji: '🏗️' },
        'unit7': { title: 'AP World Unit 7: Global Conflict', period: '1900–Present', emoji: '⚔️' },
        'unit8': { title: 'AP World Unit 8: Cold War and Decolonization', period: '1900–Present', emoji: '🕊️' },
        'unit9': { title: 'AP World Unit 9: Globalization', period: '1900–Present', emoji: '🌏' }
      };
      return unitData[unit as keyof typeof unitData] || { title: `AP World ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
    }
    if (course === 'apbiology') {
      const unitData = {
        'unit1': { title: 'AP Biology Unit 1: Chemistry of Life', period: 'Biochemistry Foundations', emoji: '🧬' },
        'unit2': { title: 'AP Biology Unit 2: Cell Structure and Function', period: 'Cellular Biology', emoji: '🔬' },
        'unit3': { title: 'AP Biology Unit 3: Cellular Energetics', period: 'Metabolism & Energy', emoji: '⚡' },
        'unit4': { title: 'AP Biology Unit 4: Cell Communication', period: 'Signaling Pathways', emoji: '📡' },
        'unit5': { title: 'AP Biology Unit 5: Heredity', period: 'Genetics & Inheritance', emoji: '🧬' },
        'unit6': { title: 'AP Biology Unit 6: Gene Expression', period: 'Molecular Biology', emoji: '🔄' },
        'unit7': { title: 'AP Biology Unit 7: Natural Selection', period: 'Evolution Mechanisms', emoji: '🌱' },
        'unit8': { title: 'AP Biology Unit 8: Ecology', period: 'Environmental Interactions', emoji: '🌍' }
      };
      return unitData[unit as keyof typeof unitData] || { title: `AP Biology ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
    }
    if (course === 'appsychology') {
      const unitData = {
        'unit1': { title: 'AP Psychology Unit 1: Scientific Foundations', period: 'Psychology as Science', emoji: '🧠' },
        'unit2': { title: 'AP Psychology Unit 2: Biological Bases', period: 'Brain & Behavior', emoji: '🔬' },
        'unit3': { title: 'AP Psychology Unit 3: Sensation and Perception', period: 'Sensory Processing', emoji: '👁️' },
        'unit4': { title: 'AP Psychology Unit 4: Learning', period: 'Conditioning & Memory', emoji: '📚' },
        'unit5': { title: 'AP Psychology Unit 5: Cognitive Psychology', period: 'Thinking & Memory', emoji: '🧩' },
        'unit6': { title: 'AP Psychology Unit 6: Developmental Psychology', period: 'Lifespan Changes', emoji: '👶' },
        'unit7': { title: 'AP Psychology Unit 7: Personality', period: 'Individual Differences', emoji: '👥' },
        'unit8': { title: 'AP Psychology Unit 8: Abnormal Behavior', period: 'Mental Health', emoji: '🔄' },
        'unit9': { title: 'AP Psychology Unit 9: Treatment of Disorders', period: 'Therapeutic Approaches', emoji: '💊' },
        'unit10': { title: 'AP Psychology Unit 10: Social Psychology', period: 'Group Behavior', emoji: '👫' }
      };
      return unitData[unit as keyof typeof unitData] || { title: `AP Psychology ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
    }
    if (course === 'apmicro') {
      const unitData = {
        'unit1': { title: 'AP Microeconomics Unit 1: Basic Economic Concepts', period: 'Economic Foundations', emoji: '📊' },
        'unit2': { title: 'AP Microeconomics Unit 2: Supply and Demand', period: 'Market Forces', emoji: '📈' },
        'unit3': { title: 'AP Microeconomics Unit 3: Production and Perfect Competition', period: 'Firm Behavior', emoji: '🏭' },
        'unit4': { title: 'AP Microeconomics Unit 4: Imperfect Competition', period: 'Market Structures', emoji: '🏢' },
        'unit5': { title: 'AP Microeconomics Unit 5: Factor Markets', period: 'Resource Markets', emoji: '👥' },
        'unit6': { title: 'AP Microeconomics Unit 6: Market Failures and Government', period: 'Government Intervention', emoji: '🏛️' }
      };
      return unitData[unit as keyof typeof unitData] || { title: `AP Microeconomics ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
    }
    if (course === 'apmacro') {
      const unitData = {
        'unit1': { title: 'AP Macroeconomics Unit 1: Basic Economic Concepts', period: 'Economic Systems', emoji: '🌍' },
        'unit2': { title: 'AP Macroeconomics Unit 2: Economic Indicators and Business Cycle', period: 'Measuring Economy', emoji: '📊' },
        'unit3': { title: 'AP Macroeconomics Unit 3: National Income and Price Determination', period: 'GDP & Inflation', emoji: '💰' },
        'unit4': { title: 'AP Macroeconomics Unit 4: Financial Sector', period: 'Money & Banking', emoji: '🏦' },
        'unit5': { title: 'AP Macroeconomics Unit 5: Long-run Consequences of Stabilization Policies', period: 'Policy Effects', emoji: '🏛️' },
        'unit6': { title: 'AP Macroeconomics Unit 6: Open Economy-International Trade and Finance', period: 'Global Economics', emoji: '🌏' }
      };
      return unitData[unit as keyof typeof unitData] || { title: `AP Macroeconomics ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
    }
    if (course === 'aphug') {
      const unitData = {
        'unit1': { title: 'AP Human Geography Unit 1: Thinking Geographically', period: 'Maps & Spatial Concepts', emoji: '🗺️' },
        'unit2': { title: 'AP Human Geography Unit 2: Population and Migration Patterns', period: 'Demographic Transitions', emoji: '👥' },
        'unit3': { title: 'AP Human Geography Unit 3: Cultural Patterns and Processes', period: 'Language & Religion', emoji: '🎭' },
        'unit4': { title: 'AP Human Geography Unit 4: Political Patterns and Processes', period: 'Governance & Boundaries', emoji: '🏛️' },
        'unit5': { title: 'AP Human Geography Unit 5: Agriculture and Rural Land-Use', period: 'Food Production', emoji: '🌾' },
        'unit6': { title: 'AP Human Geography Unit 6: Cities and Urban Land-Use', period: 'Urbanization Patterns', emoji: '🏙️' },
        'unit7': { title: 'AP Human Geography Unit 7: Industrial and Economic Development', period: 'Global Economy', emoji: '🏭' }
      };
      return unitData[unit as keyof typeof unitData] || { title: `AP Human Geography ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
    }
    if (course === 'apstat') {
      const unitData = {
        'unit1': { title: 'AP Statistics Unit 1: Exploring One-Variable Data', period: 'Descriptive Statistics', emoji: '📊' },
        'unit2': { title: 'AP Statistics Unit 2: Exploring Two-Variable Data', period: 'Correlation & Regression', emoji: '📈' },
        'unit3': { title: 'AP Statistics Unit 3: Collecting Data', period: 'Sampling & Experiments', emoji: '🎯' },
        'unit4': { title: 'AP Statistics Unit 4: Probability, Random Variables, and Probability Distributions', period: 'Foundations of Inference', emoji: '🎲' },
        'unit5': { title: 'AP Statistics Unit 5: Sampling Distributions', period: 'Central Limit Theorem', emoji: '📋' },
        'unit6': { title: 'AP Statistics Unit 6: Inference for Categorical Data: Proportions', period: 'One & Two Proportions', emoji: '🔍' },
        'unit7': { title: 'AP Statistics Unit 7: Inference for Quantitative Data: Means', period: 'One & Two Means', emoji: '📏' },
        'unit8': { title: 'AP Statistics Unit 8: Inference for Categorical Data: Chi-Square', period: 'Goodness of Fit & Independence', emoji: '🧮' },
        'unit9': { title: 'AP Statistics Unit 9: Inference for Quantitative Data: Slopes', period: 'Linear Regression', emoji: '📉' }
      };
      return unitData[unit as keyof typeof unitData] || { title: `AP Statistics ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
    }
    if (course === 'apcsp') {
      const unitData = {
        'unit1': { title: 'AP Computer Science Principles Unit 1: Creative Development', period: 'Programming & Innovation', emoji: '💻' },
        'unit2': { title: 'AP Computer Science Principles Unit 2: Data', period: 'Collection, Organization & Analysis', emoji: '📊' },
        'unit3': { title: 'AP Computer Science Principles Unit 3: Algorithms and Programming', period: 'Logic & Implementation', emoji: '🔢' },
        'unit4': { title: 'AP Computer Science Principles Unit 4: Computer Systems and Networks', period: 'Hardware & Connectivity', emoji: '🌐' },
        'unit5': { title: 'AP Computer Science Principles Unit 5: Impact of Computing', period: 'Society, Ethics & Security', emoji: '🔒' }
      };
      return unitData[unit as keyof typeof unitData] || { title: `AP Computer Science Principles ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
    }
    return { title: 'Unknown Unit', period: '', emoji: '📚' };
  };

  // Fallback topics when API fails - COMPLETE FOR ALL UNITS
  const getFallbackTopics = (course: string, unit: string): UnitTopic[] => {
    console.log('Getting fallback topics for:', course, unit);
    
    if (course === 'apush') {
      if (unit === 'unit1') {
        return [
          { key: 'nativeAmericans', title: 'Pre-Columbian Native American Societies', keyFacts: ['Diverse complex societies', 'Aztec, Inca, Maya civilizations', 'Cahokia larger than London', 'Tenochtitlan had 200,000+ people', 'Three Sisters agriculture'] },
          { key: 'europeanMotivations', title: 'European Motivations for Exploration', keyFacts: ['God, Gold, and Glory', 'Economic desire for spices', 'Religious spread of Christianity', 'Political nation-building', 'Technological navigation advances'] },
          { key: 'spanishColonization', title: 'Spanish Colonization and Conquest', keyFacts: ['Cortés conquered Aztecs', 'Encomienda forced labor system', 'Superior horses and weapons', '90% Native Americans died from disease', 'Cultural and religious conversion'] },
          { key: 'columbianExchange', title: 'The Columbian Exchange', keyFacts: ['Biological exchange between continents', 'Horses and diseases to Americas', 'Corn and potatoes to Europe', '90% Native population decline', 'Environmental transformation'] },
          { key: 'earlyEnglish', title: 'Early English Colonization Attempts', keyFacts: ['Roanoke Lost Colony 1587', 'Virginia Company founded Jamestown', 'Hostile environment challenges', 'Search for gold and trade', 'Competition with Spanish empire'] }
        ];
      } else if (unit === 'unit2') {
        return [
          { key: 'jeffersonianDemocracy', title: 'Jeffersonian Democracy and Republican Ideals', keyFacts: ['Strict vs loose constitutional interpretation', 'Agrarian vision vs industrial development', 'States rights vs federal power', 'Louisiana Purchase doubled nation size', 'Individual liberty and limited government'] },
          { key: 'warOf1812', title: 'War of 1812 and National Identity', keyFacts: ['British impressment and trade restrictions', 'Battle of New Orleans and Washington DC', 'Increased nationalism and Era of Good Feelings', 'End of Federalist Party', 'Native American resistance ended'] },
          { key: 'marketRevolution', title: 'Market Revolution and Economic Change', keyFacts: ['Transportation revolution with canals and roads', 'Industrial development in Northeast', 'Agricultural commercialization in South', 'Rise of wage labor and factories', 'Growth of cities and urbanization'] },
          { key: 'westwardExpansion', title: 'Westward Expansion and Manifest Destiny', keyFacts: ['Indian Removal Act and Trail of Tears', 'Texas annexation and Mexican-American War', 'California Gold Rush migration', 'Oregon Trail and westward movement', 'Conflict over slavery in territories'] },
          { key: 'reformMovements', title: 'Reform Movements and Social Change', keyFacts: ['Second Great Awakening religious revival', 'Abolitionist movement and Underground Railroad', 'Seneca Falls Convention for women rights', 'Temperance movement against alcohol', 'Educational reform and public schools'] }
        ];
      } else if (unit === 'unit3') {
        return [
          { key: 'sectionalTension', title: 'Sectional Conflict and Compromise', keyFacts: ['Missouri Compromise 1820', 'Compromise of 1850', 'Kansas-Nebraska Act popular sovereignty', 'Bleeding Kansas violence', 'Dred Scott v. Sandford decision'] },
          { key: 'slaveryDebate', title: 'Slavery and Anti-Slavery Movements', keyFacts: ['Abolitionists like Garrison and Douglass', 'Underground Railroad and Harriet Tubman', 'Uncle Toms Cabin by Stowe', 'Free Soil Party opposition', 'John Browns raid on Harpers Ferry'] },
          { key: 'civilWar', title: 'The Civil War 1861-1865', keyFacts: ['Fort Sumter and secession', 'Union advantages in industry and population', 'Emancipation Proclamation 1863', 'Gettysburg and turning point battles', 'Total war strategy by Sherman'] },
          { key: 'reconstruction', title: 'Reconstruction and Its Legacy', keyFacts: ['Presidential vs Radical Reconstruction', '13th, 14th, 15th Amendments', 'Freedmens Bureau assistance', 'Black Codes and Jim Crow laws', 'Compromise of 1877 ended Reconstruction'] },
          { key: 'economicChanges', title: 'Economic and Social Changes', keyFacts: ['Industrial growth during war', 'Railroad expansion westward', 'New immigrant communities', 'Womens roles during wartime', 'Urbanization and labor changes'] }
        ];
      } else if (unit === 'unit4') {
        return [
          { key: 'industrialization', title: 'Industrialization and Economic Growth', keyFacts: ['Steel industry and Andrew Carnegie', 'Railroad expansion and consolidation', 'Corporate monopolies and trusts', 'New business practices and efficiency', 'Technology and innovation surge'] },
          { key: 'newImmigration', title: 'New Immigration and Urbanization', keyFacts: ['Southern and Eastern Europeans', 'Ellis Island processing center', 'Urban tenements and overcrowding', 'Ethnic neighborhoods and communities', 'Nativism and Chinese Exclusion Act'] },
          { key: 'laborMovement', title: 'Labor Movement and Class Conflict', keyFacts: ['Knights of Labor and AFL', 'Great Railroad Strike of 1877', 'Haymarket Affair and violence', 'Homestead and Pullman strikes', 'Industrial working conditions'] },
          { key: 'politicalCorruption', title: 'Politics and Reform in the Gilded Age', keyFacts: ['Political machines and Boss Tweed', 'Pendleton Act civil service reform', 'Presidential elections and issues', 'Populist Party and farmers', 'Currency and tariff debates'] },
          { key: 'culturalChanges', title: 'Cultural and Social Changes', keyFacts: ['Rise of consumer culture', 'Public education expansion', 'New entertainment and sports', 'Womens rights movement growth', 'Social Darwinism ideology'] }
        ];
      } else if (unit === 'unit5') {
        return [
          { key: 'imperialism', title: 'American Imperialism and Expansion', keyFacts: ['Spanish-American War and Cuba', 'Acquisition of Philippines and Hawaii', 'Monroe Doctrine and Roosevelt Corollary', 'Dollar Diplomacy and foreign investment', 'Open Door Policy in China'] },
          { key: 'progressiveEra', title: 'Progressive Era Reforms', keyFacts: ['Muckrakers expose social problems', 'Settlement houses and Jane Addams', 'Workplace safety and regulations', 'Conservation and national parks', 'Food and drug safety laws'] },
          { key: 'presidentialLeadership', title: 'Progressive Presidents', keyFacts: ['Theodore Roosevelt trust-busting', 'Taft and continued reforms', 'Wilson and New Freedom agenda', '16th, 17th, 18th, 19th Amendments', 'Federal Reserve System creation'] },
          { key: 'worldWarI', title: 'World War I and American Society', keyFacts: ['Neutrality and submarine warfare', 'Zimmermann Telegram and declaration', 'Home front mobilization efforts', 'Espionage Act and civil liberties', 'Red Scare and Palmer Raids'] },
          { key: 'socialReform', title: 'Social Reform and Rights Movements', keyFacts: ['Womens suffrage and 19th Amendment', 'Prohibition and moral reform', 'NAACP formation and civil rights', 'Immigration restrictions and quotas', 'Urban reform and city planning'] }
        ];
      } else if (unit === 'unit6') {
        return [
          { key: 'twentiesCulture', title: '1920s Cultural Changes', keyFacts: ['Jazz Age and Harlem Renaissance', 'Radio and mass entertainment', 'Automobiles transform society', 'Flappers and changing gender roles', 'Consumer culture and advertising'] },
          { key: 'economicProsperity', title: 'Economic Prosperity and Problems', keyFacts: ['Stock market speculation boom', 'Industrial productivity increases', 'Unequal wealth distribution', 'Agricultural struggles continue', 'Consumer credit and installments'] },
          { key: 'greatDepression', title: 'The Great Depression', keyFacts: ['Stock Market Crash October 1929', 'Bank failures and unemployment', 'Dust Bowl and migration', 'Hoover response inadequate', 'Social and psychological impact'] },
          { key: 'newDeal', title: 'New Deal Programs and Policies', keyFacts: ['FDR and First Hundred Days', 'Relief, Recovery, Reform strategy', 'Social Security and labor rights', 'Public works and job creation', 'Supreme Court and constitutional crisis'] },
          { key: 'worldWarII', title: 'World War II and Home Front', keyFacts: ['Pearl Harbor and entry into war', 'War production and economy', 'Japanese American internment', 'Women in workforce', 'African American Double Victory'] }
        ];
      } else if (unit === 'unit7') {
        return [
          { key: 'worldWarII', title: 'World War II Global Conflict', keyFacts: ['European and Pacific theaters', 'D-Day invasion and victory', 'Holocaust and genocide', 'Atomic bombs on Japan', 'Allied victory and costs'] },
          { key: 'coldWarOrigins', title: 'Origins of the Cold War', keyFacts: ['Yalta and Potsdam conferences', 'Iron Curtain and division of Europe', 'Truman Doctrine and containment', 'Marshall Plan economic aid', 'Berlin Blockade and airlift'] },
          { key: 'domesticPolicies', title: 'Post-War Domestic Policies', keyFacts: ['GI Bill and veterans benefits', 'Suburban growth and baby boom', 'Truman Fair Deal programs', 'Labor strikes and Taft-Hartley', 'Red Scare and McCarthyism'] },
          { key: 'civilRights', title: 'Early Civil Rights Movement', keyFacts: ['Jackie Robinson breaks color barrier', 'Brown v. Board education decision', 'Montgomery Bus Boycott', 'Little Rock Central High crisis', 'NAACP legal strategy'] },
          { key: 'eisenhowerEra', title: 'Eisenhower and 1950s Society', keyFacts: ['Interstate Highway System', 'Suburban prosperity and conformity', 'Television and mass culture', 'Space Race begins', 'Modern Republicanism policies'] }
        ];
      } else if (unit === 'unit8') {
        return [
          { key: 'civilRightsMovement', title: 'Civil Rights Movement', keyFacts: ['Martin Luther King Jr leadership', 'Freedom Riders and sit-ins', 'March on Washington 1963', 'Civil Rights Act 1964', 'Voting Rights Act 1965'] },
          { key: 'greatSociety', title: 'Great Society and Liberal Reform', keyFacts: ['LBJ War on Poverty', 'Medicare and Medicaid programs', 'Immigration Act of 1965', 'Environmental protection laws', 'Education and urban renewal'] },
          { key: 'vietnamWar', title: 'Vietnam War and Conflict', keyFacts: ['Escalation under JFK and LBJ', 'Draft and anti-war protests', 'Tet Offensive turning point', 'My Lai Massacre scandal', 'Vietnamization and withdrawal'] },
          { key: 'counterculture', title: 'Counterculture and Social Change', keyFacts: ['Youth rebellion and hippies', 'Music and cultural revolution', 'Feminist movement and NOW', 'Environmental movement begins', 'Sexual revolution and lifestyle'] },
          { key: 'conservativeResponse', title: 'Conservative Response and Backlash', keyFacts: ['Nixon Southern Strategy', 'Law and order campaigns', 'Religious right mobilization', 'Watergate scandal and resignation', 'Economic stagflation problems'] }
        ];
      } else if (unit === 'unit9') {
        return [
          { key: 'reaganRevolution', title: 'Reagan Revolution and Conservatism', keyFacts: ['Supply-side economics and tax cuts', 'Deregulation of industries', 'Military buildup and Cold War', 'Social conservative agenda', 'Iran-Contra scandal'] },
          { key: 'coldWarEnd', title: 'End of Cold War', keyFacts: ['Soviet Union collapse 1991', 'Berlin Wall fall 1989', 'Nuclear arms reduction', 'Democracy spreads globally', 'US as sole superpower'] },
          { key: 'economicChanges', title: 'Economic and Technological Changes', keyFacts: ['Computer and internet revolution', 'Globalization and trade', 'Service economy growth', 'Income inequality increases', 'Financial markets expansion'] },
          { key: 'politicalPolarization', title: 'Political Polarization', keyFacts: ['Clinton impeachment crisis', 'Bush v Gore election 2000', 'Partisan media growth', 'Culture wars issues', 'Gridlock and dysfunction'] },
          { key: 'modernChallenges', title: 'Modern Challenges and Issues', keyFacts: ['9/11 attacks and terrorism', 'Iraq and Afghanistan wars', '2008 financial crisis', 'Obama presidency and change', 'Trump presidency and populism'] }
        ];
      }
    }

    if (course === 'apgov') {
      if (unit === 'unit1') {
        return [
          { key: 'enlightenment', title: 'Enlightenment Ideals and Democratic Theory', keyFacts: ['Natural rights philosophy', 'Social contract theory', 'Separation of powers', 'Popular sovereignty', 'Individual vs government rights'] },
          { key: 'articles', title: 'Articles of Confederation and Early Challenges', keyFacts: ['Weak central government design', 'No executive or federal courts', 'Revenue and commerce problems', 'Shays\' Rebellion highlighted issues', 'Need for stronger union'] },
          { key: 'convention', title: 'Constitutional Convention and Compromises', keyFacts: ['Great Compromise bicameral legislature', 'Three-Fifths Compromise slavery', 'Electoral College for president', 'Federalists vs Anti-Federalists', 'Federalist Papers ratification'] },
          { key: 'federalism', title: 'Federalism and Division of Powers', keyFacts: ['Enumerated and implied powers', 'Supremacy Clause federal preemption', 'Tenth Amendment reserved powers', 'Necessary and Proper Clause', 'Dual to cooperative federalism'] },
          { key: 'billOfRights', title: 'Bill of Rights and Individual Liberties', keyFacts: ['First ten amendments', 'Protection from government', 'First Amendment freedoms', 'Due process protections', 'Incorporation doctrine to states'] }
        ];
      } else if (unit === 'unit2') {
        return [
          { key: 'congress', title: 'Congress: Structure and Powers', keyFacts: ['House and Senate differences', 'Leadership and committee system', 'Legislative process and bills', 'Oversight and investigation powers', 'Impeachment and confirmation roles'] },
          { key: 'presidency', title: 'The Presidency: Powers and Roles', keyFacts: ['Constitutional and informal powers', 'Commander-in-Chief role', 'Executive orders and agreements', 'Appointment and removal powers', 'Presidential leadership styles'] },
          { key: 'judiciary', title: 'Federal Court System', keyFacts: ['Supreme Court and lower courts', 'Judicial review power', 'Life tenure and independence', 'Case selection and jurisdiction', 'Constitutional interpretation methods'] },
          { key: 'bureaucracy', title: 'Federal Bureaucracy and Administration', keyFacts: ['Cabinet departments and agencies', 'Civil service and merit system', 'Rulemaking and implementation', 'Iron triangles and issue networks', 'Bureaucratic accountability'] },
          { key: 'checksBalances', title: 'Checks and Balances in Action', keyFacts: ['Veto power and override', 'Senate confirmation process', 'Judicial review of laws', 'Congressional oversight', 'Informal power relationships'] }
        ];
      } else if (unit === 'unit3') {
        return [
          { key: 'firstAmendment', title: 'First Amendment Freedoms', keyFacts: ['Freedom of speech and press', 'Religious establishment and exercise', 'Assembly and petition rights', 'Symbolic speech protection', 'Prior restraint limitations'] },
          { key: 'dueProcess', title: 'Due Process and Criminal Rights', keyFacts: ['Fourth Amendment search and seizure', 'Fifth Amendment self-incrimination', 'Sixth Amendment right to counsel', 'Eighth Amendment cruel punishment', 'Exclusionary rule applications'] },
          { key: 'civilRights', title: 'Civil Rights and Equal Protection', keyFacts: ['14th Amendment equal protection', 'Brown v Board school desegregation', 'Civil Rights Act enforcement', 'Affirmative action policies', 'Disability and LGBTQ rights'] },
          { key: 'privacyRights', title: 'Privacy Rights and Personal Liberty', keyFacts: ['Griswold contraception decision', 'Roe v Wade abortion rights', 'Lawrence sodomy law ruling', 'Technology and surveillance', 'Balancing security and privacy'] },
          { key: 'selectiveIncorporation', title: 'Selective Incorporation Process', keyFacts: ['Bill of Rights applies to states', 'Case-by-case incorporation', 'McDonald gun rights decision', 'State vs federal protections', 'Supreme Court interpretation'] }
        ];
      } else if (unit === 'unit4') {
        return [
          { key: 'politicalSocialization', title: 'Political Socialization and Beliefs', keyFacts: ['Family and early influences', 'Education and peer groups', 'Media and information sources', 'Personal experiences shape views', 'Generational differences'] },
          { key: 'publicOpinion', title: 'Public Opinion and Polling', keyFacts: ['Scientific polling methods', 'Sampling and margin of error', 'Question wording effects', 'Push polls and bias', 'Opinion measurement challenges'] },
          { key: 'politicalIdeology', title: 'Political Ideologies and Beliefs', keyFacts: ['Liberal vs conservative spectrum', 'Libertarian and authoritarian views', 'Economic and social issues', 'Party identification trends', 'Ideology and voting behavior'] },
          { key: 'politicalCulture', title: 'American Political Culture', keyFacts: ['Individual liberty emphasis', 'Equality of opportunity ideal', 'Limited government preference', 'Rule of law principles', 'Democratic participation values'] },
          { key: 'demographicInfluences', title: 'Demographic Influences on Politics', keyFacts: ['Race and ethnicity effects', 'Gender gap in voting', 'Age and generational differences', 'Education and income correlations', 'Geographic regional variations'] }
        ];
      } else if (unit === 'unit5') {
        return [
          { key: 'votingRights', title: 'Voting Rights and Participation', keyFacts: ['Expansion of suffrage over time', '15th, 19th, 26th Amendments', 'Voting Rights Act protections', 'Voter registration requirements', 'Voter turnout patterns'] },
          { key: 'elections', title: 'Elections and Electoral Process', keyFacts: ['Primary and general elections', 'Electoral College system', 'Campaign finance regulations', 'Redistricting and gerrymandering', 'Ballot access and third parties'] },
          { key: 'politicalParties', title: 'Political Parties and Functions', keyFacts: ['Two-party system dominance', 'Party organization levels', 'Candidate recruitment and support', 'Platform development', 'Party identification decline'] },
          { key: 'interestGroups', title: 'Interest Groups and Lobbying', keyFacts: ['Types and functions of groups', 'Lobbying strategies and tactics', 'PACs and campaign contributions', 'Revolving door phenomenon', 'Regulation of lobbying'] },
          { key: 'mediaInfluence', title: 'Media and Political Communication', keyFacts: ['Traditional vs new media', 'Horse race vs issue coverage', 'Media bias perceptions', 'Social media impact', 'Information bubbles and polarization'] }
        ];
      }
    }

    if (course === 'apworld' || course === 'world') {
      if (unit === 'unit1') {
        return [
          { key: 'silkRoads', title: 'The Silk Roads and Overland Trade', keyFacts: ['Connected China to Mediterranean', 'Traded silk, spices, and ideas', 'Spread Buddhism and Islam', 'Caravanserai provided safety', 'Declined due to taxes and politics'] },
          { key: 'indianOcean', title: 'Indian Ocean Maritime Trading Network', keyFacts: ['Connected East Africa to Southeast Asia', 'Monsoon winds enabled sailing', 'Spread Islam to new regions', 'Swahili city-states flourished', 'Chinese treasure fleets explored'] },
          { key: 'mongols', title: 'The Mongol Empire and Its Impact', keyFacts: ['Largest contiguous land empire', 'Connected East and West', 'Promoted religious tolerance', 'Facilitated trade and communication', 'Split into four khanates'] },
          { key: 'transSaharan', title: 'Trans-Saharan Trade Networks', keyFacts: ['Connected North and West Africa', 'Gold and salt were key goods', 'Spread Islam into West Africa', 'Great empires: Ghana, Mali, Songhai', 'Timbuktu became learning center'] },
          { key: 'culturalExchange', title: 'Cultural and Technological Exchange', keyFacts: ['Paper-making spread from China', 'Gunpowder diffused westward', 'Arabic numerals spread', 'Religious ideas traveled routes', 'Black Death followed trade paths'] }
        ];
      } else if (unit === 'unit2') {
        return [
          { key: 'europeanExploration', title: 'European Maritime Exploration', keyFacts: ['Portuguese pioneered Atlantic routes', 'Spanish conquered Aztec and Inca', 'Dutch and English trading companies', 'Motivated by Gold, God, Glory', 'New navigation technology'] },
          { key: 'columbianExchange', title: 'The Columbian Exchange', keyFacts: ['Biological exchange Old/New Worlds', 'Diseases devastated Native Americans', 'New crops transformed Old World', 'Animals changed New World societies', 'Cultural exchange accelerated'] },
          { key: 'atlanticSlave', title: 'Atlantic Slave Trade System', keyFacts: ['Triangular trade system', '12-15 million Africans transported', 'Plantation agriculture developed', 'African societies disrupted', 'Resistance and cultural preservation'] },
          { key: 'landEmpires', title: 'Land-Based Empires', keyFacts: ['Ottoman Empire in Mediterranean', 'Safavid Persia established Shia Islam', 'Mughal Empire unified India', 'Qing Dynasty expanded China', 'All used gunpowder weapons'] },
          { key: 'globalTrade', title: 'Expansion of Global Trade', keyFacts: ['Manila galleons crossed Pacific', 'Joint-stock companies financed trade', 'European trading posts established', 'Silver flowed to China', 'Proto-industrialization began'] }
        ];
      } else if (unit === 'unit3') {
        return [
          { key: 'industrialRevolution', title: 'The Industrial Revolution', keyFacts: ['Started in Britain with textiles', 'Steam power revolutionized transport', 'Factory system replaced handicrafts', 'Urbanization and new classes', 'Spread to Western Europe'] },
          { key: 'newImperialism', title: 'New Imperialism and Colonization', keyFacts: ['Europeans colonized Africa and Asia', 'Berlin Conference divided Africa', 'Economic motives for raw materials', 'Technological advantages in warfare', 'Civilizing mission ideology'] },
          { key: 'nationalism', title: 'Rise of Nationalism', keyFacts: ['German and Italian unification', 'Latin American independence', 'Ethnic nationalism in empires', 'Cultural nationalism emerged', 'Challenge to multi-ethnic empires'] },
          { key: 'abolition', title: 'Abolition and Reform Movements', keyFacts: ['British abolished slave trade', 'Russian serfdom ended 1861', 'Women\'s rights movements', 'Prison and education reforms', 'Religious revival movements'] },
          { key: 'globalMigration', title: 'Global Migration Patterns', keyFacts: ['European migration to Americas', 'Asian indentured labor', 'Rural to urban migration', 'Chinese and Indian diaspora', 'Refugee movements from conflicts'] }
        ];
      } else if (unit === 'unit4') {
        return [
          { key: 'globalConflicts', title: 'Global Conflicts and Total War', keyFacts: ['WWI industrialized warfare', 'WWII global scale conflict', 'Cold War ideological struggle', 'Proxy wars in developing world', 'Nuclear weapons changed warfare'] },
          { key: 'decolonization', title: 'Decolonization Movements', keyFacts: ['Indian independence through non-violence', 'African independence movements', 'Vietnamese nationalist struggle', 'Arab nationalism emerged', 'Legacy of artificial borders'] },
          { key: 'economicSystems', title: 'Competing Economic Systems', keyFacts: ['Capitalism vs communism', 'Marshall Plan rebuilt Europe', 'Soviet five-year plans', 'Chinese economic reforms', 'Globalization and free trade'] },
          { key: 'humanRights', title: 'Human Rights and Social Movements', keyFacts: ['Universal Declaration 1948', 'Civil rights in United States', 'Apartheid ended in South Africa', 'Women\'s liberation movements', 'Environmental awareness grew'] },
          { key: 'globalChallenges', title: 'Contemporary Global Challenges', keyFacts: ['Terrorism changed security', 'Economic inequality persists', 'Climate change requires cooperation', 'Technology revolution continues', 'Pandemic responses tested coordination'] }
        ];
      } else if (unit === 'unit5') {
        return [
          { key: 'enlightenmentRevolutions', title: 'Enlightenment and Political Revolutions', keyFacts: ['American Revolution inspired others', 'French Revolution and human rights', 'Haitian Revolution ended slavery', 'Latin American independence movements', 'Nationalist revolutions in Europe'] },
          { key: 'industrialSpread', title: 'Spread of Industrialization', keyFacts: ['From Britain to continental Europe', 'Railroad networks connected regions', 'Factory system and urbanization', 'New social classes emerged', 'Environmental consequences'] },
          { key: 'socialReform', title: 'Social Reform and Abolition', keyFacts: ['Abolition of slavery movements', 'Women\'s rights advocacy', 'Prison and education reform', 'Labor movement organization', 'Religious revival movements'] },
          { key: 'nationalism', title: 'Nationalism and Nation-Building', keyFacts: ['German and Italian unification', 'Ottoman Empire challenges', 'Ethnic nationalism in Austria-Hungary', 'Pan-Slavism and Pan-Arabism', 'Cultural nationalism movements'] },
          { key: 'economicImperialism', title: 'Economic Imperialism and Resistance', keyFacts: ['European economic penetration', 'Unequal treaties in Asia', 'Raw materials extraction', 'Indigenous resistance movements', 'Modernization attempts'] }
        ];
      } else if (unit === 'unit6') {
        return [
          { key: 'massProduction', title: 'Mass Production and Consumer Culture', keyFacts: ['Assembly line methods', 'Standardized products', 'Department stores emerged', 'Advertising and marketing', 'Middle class consumption'] },
          { key: 'urbanization', title: 'Urbanization and Social Changes', keyFacts: ['Rural to urban migration', 'Working class neighborhoods', 'Public health improvements', 'New forms of entertainment', 'Family structure changes'] },
          { key: 'laborMovements', title: 'Labor Organization and Strikes', keyFacts: ['Trade unions formation', 'Socialist and anarchist movements', 'International labor solidarity', 'Government labor regulations', 'Working conditions improvements'] },
          { key: 'newImperialism', title: 'New Imperialism and Scramble for Africa', keyFacts: ['Berlin Conference 1884-85', 'Technological military advantages', 'Economic competition for markets', 'Civilizing mission ideology', 'Resistance and adaptation'] },
          { key: 'globalMigration', title: 'Global Migration Patterns', keyFacts: ['European emigration to Americas', 'Asian contract labor systems', 'Refugee movements from conflicts', 'Cultural communities in diaspora', 'Xenophobia and restrictions'] }
        ];
      } else if (unit === 'unit7') {
        return [
          { key: 'worldWarOne', title: 'World War I and Total War', keyFacts: ['Alliance system and causes', 'Trench warfare and technology', 'Total war mobilization', 'Russian Revolution and exit', 'German defeat and armistice'] },
          { key: 'interbellum', title: 'Interwar Period and Economic Crisis', keyFacts: ['Treaty of Versailles consequences', 'Great Depression global impact', 'Rise of fascism and militarism', 'League of Nations weaknesses', 'Democratic governments challenged'] },
          { key: 'worldWarTwo', title: 'World War II and Holocaust', keyFacts: ['Axis expansion and Blitzkrieg', 'Holocaust and genocide', 'Pacific theater and atomic bombs', 'Allied victory and costs', 'Resistance movements worldwide'] },
          { key: 'coldWarOrigins', title: 'Origins of the Cold War', keyFacts: ['Ideological differences intensify', 'Nuclear weapons and deterrence', 'Division of Germany and Europe', 'Marshall Plan and economic aid', 'NATO and Warsaw Pact formation'] },
          { key: 'decolonizationBegins', title: 'Beginning of Decolonization', keyFacts: ['Indian independence and partition', 'Indonesian nationalist struggle', 'African independence movements', 'Mandates and trusteeship', 'Non-aligned movement emergence'] }
        ];
      } else if (unit === 'unit8') {
        return [
          { key: 'coldWarConflicts', title: 'Cold War Proxy Conflicts', keyFacts: ['Korean War division', 'Vietnam War and domino theory', 'Cuban Missile Crisis', 'Soviet intervention in Afghanistan', 'Proxy wars in Africa'] },
          { key: 'decolonizationComplete', title: 'Completion of Decolonization', keyFacts: ['African independence movements', 'Algerian War and violence', 'Congo crisis and intervention', 'Apartheid in South Africa', 'Palestine-Israel conflict'] },
          { key: 'developmentModels', title: 'Economic Development Models', keyFacts: ['Import substitution industrialization', 'Green Revolution agriculture', 'Dependency theory critique', 'Modernization theory application', 'Resource nationalism'] },
          { key: 'socialMovements', title: 'Global Social Movements', keyFacts: ['Civil rights in United States', 'Student protests of 1968', 'Feminist movements worldwide', 'Environmental awareness growth', 'Human rights organizations'] },
          { key: 'culturalExchange', title: 'Cultural Exchange and Resistance', keyFacts: ['Western cultural influence', 'Local cultural preservation', 'Popular music and media', 'Religious fundamentalism rise', 'Cultural syncretism'] }
        ];
      } else if (unit === 'unit9') {
        return [
          { key: 'endColdWar', title: 'End of Cold War', keyFacts: ['Soviet Union collapse', 'German reunification', 'Eastern European revolutions', 'Nuclear disarmament treaties', 'United States sole superpower'] },
          { key: 'economicGlobalization', title: 'Economic Globalization', keyFacts: ['Free trade agreements', 'Multinational corporations', 'Financial markets integration', 'Economic inequality growth', 'Anti-globalization movements'] },
          { key: 'technologicalRevolution', title: 'Technological Revolution', keyFacts: ['Internet and digital communication', 'Mobile technology spread', 'Biotechnology advances', 'Space exploration continued', 'Information society emergence'] },
          { key: 'environmentalChallenges', title: 'Environmental and Health Challenges', keyFacts: ['Climate change awareness', 'Ozone depletion addressed', 'Pandemic responses (AIDS, COVID)', 'Sustainable development goals', 'International environmental treaties'] },
          { key: 'contemporaryConflicts', title: 'Contemporary Global Conflicts', keyFacts: ['Terrorism and 9/11', 'Wars in Iraq and Afghanistan', 'Ethnic conflicts and genocide', 'Migration and refugee crises', 'International humanitarian intervention'] }
        ];
      }
    }

    if (course === 'apbiology') {
      if (unit === 'unit1') {
        return [
          { key: 'waterBonds', title: 'Water and Hydrogen Bonds', keyFacts: ['Water is polar and forms hydrogen bonds', 'High specific heat regulates temperature', 'Cohesion and adhesion enable transport', 'Universal solvent for biological reactions', 'Ice is less dense than liquid water'] },
          { key: 'macromolecules', title: 'Biological Macromolecules', keyFacts: ['Carbohydrates provide energy and structure', 'Lipids form membranes and store energy', 'Proteins perform diverse cellular functions', 'Nucleic acids store genetic information', 'Polymers form through dehydration synthesis'] },
          { key: 'enzymes', title: 'Enzymes and Catalysis', keyFacts: ['Enzymes lower activation energy', 'Active site determines specificity', 'Temperature and pH affect enzyme function', 'Competitive and noncompetitive inhibition', 'Enzyme regulation controls metabolic pathways'] },
          { key: 'carbonChemistry', title: 'Carbon and Organic Chemistry', keyFacts: ['Carbon forms four covalent bonds', 'Functional groups determine properties', 'Isomers have different structures/functions', 'Carbon chains form diverse molecules', 'Organic molecules are carbon-based'] },
          { key: 'pHBuffers', title: 'pH and Biological Buffers', keyFacts: ['pH measures hydrogen ion concentration', 'Acids donate protons, bases accept protons', 'Buffers resist pH changes', 'Biological systems require stable pH', 'Enzyme function depends on optimal pH'] }
        ];
      } else if (unit === 'unit2') {
        return [
          { key: 'cellMembrane', title: 'Cell Membrane Structure and Function', keyFacts: ['Phospholipid bilayer with embedded proteins', 'Selective permeability controls transport', 'Fluid mosaic model describes structure', 'Cholesterol affects membrane fluidity', 'Membrane proteins have diverse functions'] },
          { key: 'prokaryoteEukaryote', title: 'Prokaryotic vs Eukaryotic Cells', keyFacts: ['Prokaryotes lack membrane-bound nucleus', 'Eukaryotes have compartmentalized organelles', 'Both have ribosomes and genetic material', 'Size differences and complexity levels', 'Evolutionary relationship between cell types'] },
          { key: 'organelles', title: 'Organelles and Their Functions', keyFacts: ['Nucleus contains DNA and controls cell', 'Mitochondria produce ATP through respiration', 'Ribosomes synthesize proteins', 'ER and Golgi process and transport proteins', 'Lysosomes digest cellular waste'] },
          { key: 'cytoskeleton', title: 'Cytoskeleton and Cell Movement', keyFacts: ['Microfilaments, microtubules, intermediate filaments', 'Provides structure and enables movement', 'Motor proteins transport organelles', 'Cilia and flagella enable cell locomotion', 'Dynamic structure that can reorganize'] },
          { key: 'cellTransport', title: 'Membrane Transport Mechanisms', keyFacts: ['Passive transport requires no energy', 'Active transport requires ATP', 'Diffusion and osmosis move substances', 'Endocytosis and exocytosis transport large molecules', 'Concentration gradients drive transport'] }
        ];
      } else if (unit === 'unit3') {
        return [
          { key: 'cellularRespiration', title: 'Cellular Respiration', keyFacts: ['Glucose + O2 → CO2 + H2O + ATP', 'Glycolysis, Krebs cycle, electron transport', 'Occurs in mitochondria (mostly)', 'Produces approximately 30-32 ATP molecules', 'Links to carbon and energy cycles'] },
          { key: 'photosynthesis', title: 'Photosynthesis', keyFacts: ['CO2 + H2O + light → glucose + O2', 'Light reactions and Calvin cycle', 'Occurs in chloroplasts', 'Converts solar energy to chemical energy', 'Foundation of most food chains'] },
          { key: 'enzymesMetabolism', title: 'Enzymes and Metabolic Pathways', keyFacts: ['Enzymes catalyze biochemical reactions', 'Allosteric regulation controls pathways', 'Feedback inhibition prevents overproduction', 'Cofactors and coenzymes assist enzymes', 'Metabolic pathways are interconnected'] },
          { key: 'atp', title: 'ATP and Energy Transfer', keyFacts: ['ATP is the universal energy currency', 'Hydrolysis releases energy for work', 'Phosphorylation stores energy', 'Coupled reactions drive unfavorable processes', 'Constant synthesis and breakdown cycle'] },
          { key: 'metabolicRegulation', title: 'Regulation of Metabolism', keyFacts: ['Allosteric regulation and feedback loops', 'Competitive and noncompetitive inhibition', 'Covalent modification of enzymes', 'Compartmentalization of metabolic pathways', 'Hormonal control of metabolism'] }
        ];
      } else if (unit === 'unit4') {
        return [
          { key: 'cellSignaling', title: 'Cell Signaling Overview', keyFacts: ['Reception, transduction, response pathway', 'Local and long-distance signaling', 'Signal molecules and receptor specificity', 'Amplification of cellular responses', 'Termination of signaling pathways'] },
          { key: 'signalTransduction', title: 'Signal Transduction Pathways', keyFacts: ['Protein kinases and phosphatases', 'Second messengers amplify signals', 'Protein conformational changes', 'Cascade of molecular interactions', 'Multiple pathways can interact'] },
          { key: 'cellCommunication', title: 'Types of Cell Communication', keyFacts: ['Direct contact through gap junctions', 'Local signaling via paracrine factors', 'Long-distance signaling via hormones', 'Synaptic signaling in nervous system', 'Quorum sensing in bacteria'] },
          { key: 'receptors', title: 'Cellular Receptors', keyFacts: ['Surface receptors for hydrophilic signals', 'Intracellular receptors for lipid-soluble signals', 'Receptor specificity determines response', 'Receptor activation triggers pathways', 'Desensitization prevents overstimulation'] },
          { key: 'cellularResponse', title: 'Cellular Responses to Signals', keyFacts: ['Changes in gene expression', 'Enzyme activation or inhibition', 'Cytoskeletal rearrangement', 'Cell division or death', 'Metabolic pathway regulation'] }
        ];
      } else if (unit === 'unit5') {
        return [
          { key: 'mendelianGenetics', title: 'Mendelian Genetics', keyFacts: ['Law of segregation and independent assortment', 'Dominant and recessive alleles', 'Homozygous and heterozygous genotypes', 'Punnett squares predict inheritance', 'Test crosses reveal unknown genotypes'] },
          { key: 'nonMendelian', title: 'Non-Mendelian Inheritance Patterns', keyFacts: ['Incomplete dominance and codominance', 'Multiple alleles and polygenic traits', 'Sex-linked inheritance patterns', 'Linkage and recombination frequency', 'Epistasis affects phenotype expression'] },
          { key: 'chromosomes', title: 'Chromosomes and Inheritance', keyFacts: ['Homologous chromosomes carry same genes', 'Crossing over increases genetic variation', 'Independent assortment of chromosomes', 'Sex chromosomes determine gender', 'Chromosome abnormalities cause disorders'] },
          { key: 'meiosis', title: 'Meiosis and Genetic Variation', keyFacts: ['Reduces chromosome number by half', 'Crossing over and independent assortment', 'Two divisions produce four gametes', 'Creates genetic diversity', 'Nondisjunction causes abnormalities'] },
          { key: 'pedigrees', title: 'Pedigree Analysis', keyFacts: ['Family trees show inheritance patterns', 'Autosomal dominant and recessive patterns', 'X-linked inheritance patterns', 'Carrier identification in pedigrees', 'Probability calculations for offspring'] }
        ];
      } else if (unit === 'unit6') {
        return [
          { key: 'dnaStructure', title: 'DNA Structure and Replication', keyFacts: ['Double helix with complementary bases', 'Antiparallel strands and hydrogen bonds', 'Semiconservative replication', 'DNA polymerase and proofreading', 'Replication fork and leading/lagging strands'] },
          { key: 'transcription', title: 'Transcription', keyFacts: ['DNA → RNA synthesis', 'RNA polymerase reads DNA template', 'Promoter regions initiate transcription', 'RNA processing in eukaryotes', 'Alternative splicing increases diversity'] },
          { key: 'translation', title: 'Translation', keyFacts: ['RNA → protein synthesis', 'Ribosomes read mRNA codons', 'tRNA brings amino acids to ribosomes', 'Start and stop codons control translation', 'Polypeptide folding determines function'] },
          { key: 'geneRegulation', title: 'Gene Regulation', keyFacts: ['Operons control bacterial gene expression', 'Enhancers and silencers in eukaryotes', 'Transcription factors control expression', 'Epigenetic modifications affect genes', 'MicroRNA post-transcriptional control'] },
          { key: 'mutations', title: 'Mutations and Genetic Variation', keyFacts: ['Point mutations and chromosomal changes', 'Silent, missense, and nonsense mutations', 'Mutagenic agents cause DNA damage', 'DNA repair mechanisms prevent errors', 'Mutations can be beneficial or harmful'] }
        ];
      } else if (unit === 'unit7') {
        return [
          { key: 'naturalSelection', title: 'Natural Selection', keyFacts: ['Variation, inheritance, selection, time', 'Differential reproductive success', 'Directional, stabilizing, disruptive selection', 'Sexual selection affects mating success', 'Natural selection acts on phenotypes'] },
          { key: 'evolution', title: 'Evidence for Evolution', keyFacts: ['Fossil record shows change over time', 'Homologous structures indicate common ancestry', 'Biogeography supports evolution', 'Molecular evidence from DNA/protein comparisons', 'Direct observation of evolution'] },
          { key: 'speciation', title: 'Speciation and Reproductive Isolation', keyFacts: ['Reproductive barriers prevent gene flow', 'Allopatric and sympatric speciation', 'Prezygotic and postzygotic barriers', 'Adaptive radiation creates diversity', 'Coevolution between species'] },
          { key: 'populationGenetics', title: 'Population Genetics', keyFacts: ['Hardy-Weinberg equilibrium conditions', 'Allele and genotype frequencies', 'Genetic drift affects small populations', 'Gene flow homogenizes populations', 'Founder effect and bottleneck effect'] },
          { key: 'phylogeny', title: 'Phylogeny and Classification', keyFacts: ['Evolutionary trees show relationships', 'Shared derived characteristics', 'Molecular clocks estimate divergence times', 'Three-domain system of classification', 'Cladistics uses synapomorphies'] }
        ];
      } else if (unit === 'unit8') {
        return [
          { key: 'ecosystemEnergy', title: 'Energy Flow in Ecosystems', keyFacts: ['Primary producers capture solar energy', 'Energy flows through trophic levels', '10% rule of energy transfer', 'Food chains and food webs', 'Decomposers recycle nutrients'] },
          { key: 'biogeochemicalCycles', title: 'Biogeochemical Cycles', keyFacts: ['Carbon cycle links atmosphere and biosphere', 'Nitrogen cycle requires bacterial conversion', 'Phosphorus cycle lacks atmospheric component', 'Water cycle drives other cycles', 'Human activities disrupt natural cycles'] },
          { key: 'populationEcology', title: 'Population Ecology', keyFacts: ['Exponential and logistic growth models', 'Carrying capacity limits population size', 'Density-dependent and independent factors', 'Life history strategies r and K', 'Population pyramids show age structure'] },
          { key: 'communityEcology', title: 'Community Interactions', keyFacts: ['Competition reduces resource availability', 'Predation shapes population dynamics', 'Mutualism benefits both species', 'Parasitism harms one species', 'Succession changes community structure'] },
          { key: 'biodiversity', title: 'Biodiversity and Conservation', keyFacts: ['Species, genetic, and ecosystem diversity', 'Habitat destruction threatens species', 'Climate change affects distributions', 'Conservation strategies protect biodiversity', 'Ecosystem services benefit humans'] }
        ];
      }
    }

    if (course === 'apmicro') {
      if (unit === 'unit1') {
        return [
          { key: 'scarcity', title: 'Scarcity and Choice', keyFacts: ['Resources are limited but wants unlimited', 'Opportunity cost is next best alternative', 'Trade-offs exist in every decision', 'Economic efficiency maximizes benefit', 'All societies face the economic problem'] },
          { key: 'ppf', title: 'Production Possibilities Frontier', keyFacts: ['Shows maximum production combinations', 'Curved shape shows increasing costs', 'Points inside curve are inefficient', 'Outward shifts indicate growth', 'Illustrates opportunity cost concept'] },
          { key: 'economicSystems', title: 'Economic Systems and Markets', keyFacts: ['Market systems use price signals', 'Command systems use central planning', 'Mixed economies combine both approaches', 'Specialization increases efficiency', 'Comparative advantage drives trade'] },
          { key: 'marginalAnalysis', title: 'Marginal Analysis', keyFacts: ['Marginal benefit vs marginal cost', 'Optimal decisions at MB = MC', 'Thinking at the margin', 'Diminishing marginal returns', 'Rational decision making framework'] },
          { key: 'economicModels', title: 'Economic Models and Assumptions', keyFacts: ['Ceteris paribus assumption', 'Models simplify complex reality', 'Positive vs normative statements', 'Rational self-interest behavior', 'Predictions based on assumptions'] }
        ];
      } else if (unit === 'unit2') {
        return [
          { key: 'demandCurve', title: 'Law of Demand and Consumer Behavior', keyFacts: ['Higher price leads to lower quantity', 'Demand curve slopes downward', 'Income and substitution effects', 'Determinants shift demand curve', 'Consumer surplus measures benefit'] },
          { key: 'supplyCurve', title: 'Law of Supply and Producer Behavior', keyFacts: ['Higher price leads to higher quantity', 'Supply curve slopes upward', 'Production costs affect supply', 'Technology shifts supply curve', 'Producer surplus measures benefit'] },
          { key: 'marketEquilibrium', title: 'Market Equilibrium', keyFacts: ['Equilibrium where supply meets demand', 'Market clearing eliminates shortages', 'Price signals coordinate markets', 'Changes cause new equilibrium', 'Efficiency maximizes total surplus'] },
          { key: 'elasticity', title: 'Price Elasticity of Demand', keyFacts: ['Measures responsiveness to price', 'Elastic vs inelastic demand', 'Affects total revenue changes', 'Determinants include substitutes', 'Cross-price elasticity measures'] },
          { key: 'marketEfficiency', title: 'Market Efficiency and Welfare', keyFacts: ['Free markets maximize welfare', 'Dead weight loss from inefficiency', 'Consumer and producer surplus', 'Allocative efficiency achieved', 'Pareto optimal outcomes'] }
        ];
      } else if (unit === 'unit3') {
        return [
          { key: 'productionFunction', title: 'Production and Costs', keyFacts: ['Production function relates inputs/outputs', 'Short run has fixed inputs', 'Long run all inputs variable', 'Diminishing marginal returns', 'Total, average, marginal relationships'] },
          { key: 'costCurves', title: 'Cost Structure and Curves', keyFacts: ['Fixed costs constant with output', 'Variable costs change with output', 'Marginal cost is additional cost', 'U-shaped average cost curves', 'Economies and diseconomies of scale'] },
          { key: 'perfectCompetition', title: 'Perfect Competition Market', keyFacts: ['Many small price-taking firms', 'Identical products sold', 'Perfect information available', 'No barriers to entry/exit', 'Price equals marginal revenue'] },
          { key: 'profitMaximization', title: 'Profit Maximization Rules', keyFacts: ['Maximize where MR = MC', 'Economic vs accounting profit', 'Shutdown if P < AVC', 'Break even when P = ATC', 'Long run zero economic profit'] },
          { key: 'supplyCurve', title: 'Firm and Market Supply', keyFacts: ['Firm supply is MC above AVC', 'Market supply sums all firms', 'Entry/exit in long run', 'Constant vs increasing cost industries', 'Producer surplus areas'] }
        ];
      } else if (unit === 'unit4') {
        return [
          { key: 'monopolyPower', title: 'Monopoly Market Structure', keyFacts: ['Single seller with barriers', 'Price maker not price taker', 'Downward sloping demand curve', 'MR less than price', 'Can earn economic profits'] },
          { key: 'monopolyPricing', title: 'Monopoly Pricing and Output', keyFacts: ['Profit max where MR = MC', 'Price from demand curve', 'Creates deadweight loss', 'Higher price than competition', 'Lower output than efficient'] },
          { key: 'priceDiscrimination', title: 'Price Discrimination', keyFacts: ['Different prices for same product', 'First, second, third degree types', 'Requires market separation', 'Captures consumer surplus', 'Can improve efficiency'] },
          { key: 'oligopoly', title: 'Oligopoly and Game Theory', keyFacts: ['Few large interdependent firms', 'Strategic decision making', 'Game theory analyzes choices', 'Collusion vs competition', 'Nash equilibrium outcomes'] },
          { key: 'monopolisticCompetition', title: 'Monopolistic Competition', keyFacts: ['Many firms with differentiated products', 'Some pricing power from differences', 'Easy entry and exit', 'Short run profits possible', 'Long run zero economic profit'] }
        ];
      } else if (unit === 'unit5') {
        return [
          { key: 'derivedDemand', title: 'Factor Demand Theory', keyFacts: ['Factor demand derives from product demand', 'Marginal revenue product determines demand', 'MRP = MP × MR formula', 'Hire where MRP = factor price', 'Value of marginal product concept'] },
          { key: 'laborMarkets', title: 'Labor Markets and Wages', keyFacts: ['Labor supply reflects opportunity cost', 'Backward bending supply possible', 'Equilibrium determines wage rate', 'Human capital affects productivity', 'Education increases earning potential'] },
          { key: 'wageFactors', title: 'Factors Affecting Wages', keyFacts: ['Productivity determines wage levels', 'Education and training matter', 'Compensating differentials exist', 'Geographic mobility affects wages', 'Discrimination creates gaps'] },
          { key: 'monopsony', title: 'Monopsony in Labor Markets', keyFacts: ['Single buyer of labor', 'Faces upward sloping supply', 'MFC greater than wage', 'Hires less than competitive market', 'Lower wages than competition'] },
          { key: 'capitalMarkets', title: 'Capital and Land Markets', keyFacts: ['Capital earns based on productivity', 'Interest rate is price of capital', 'Present value guides investment', 'Land supply perfectly inelastic', 'Economic rent to land owners'] }
        ];
      } else if (unit === 'unit6') {
        return [
          { key: 'marketFailures', title: 'Types of Market Failure', keyFacts: ['Externalities affect third parties', 'Public goods non-rival and non-excludable', 'Monopoly power reduces efficiency', 'Information asymmetries cause problems', 'Common resources over-used'] },
          { key: 'externalities', title: 'Externalities and Solutions', keyFacts: ['Negative externalities like pollution', 'Positive externalities like education', 'Private vs social costs differ', 'Pigouvian taxes internalize costs', 'Coase theorem private solutions'] },
          { key: 'publicGoods', title: 'Public Goods and Free Riders', keyFacts: ['Cannot exclude non-payers', 'One use doesn\'t reduce others', 'Free rider problem exists', 'Government provision may help', 'Examples: defense, lighthouses'] },
          { key: 'informationProblems', title: 'Information Economics', keyFacts: ['Asymmetric information problems', 'Adverse selection drives out quality', 'Moral hazard changes behavior', 'Principal-agent problems', 'Signaling helps overcome gaps'] },
          { key: 'governmentPolicy', title: 'Government Intervention', keyFacts: ['Taxes and subsidies correct failures', 'Regulation sets market rules', 'Antitrust prevents monopoly abuse', 'Government failure also possible', 'Cost-benefit analysis guides policy'] }
        ];
      }
    }

    if (course === 'apmacro') {
      if (unit === 'unit1') {
        return [
          { key: 'economicSystems', title: 'Economic Systems and Resource Allocation', keyFacts: ['Traditional, command, and market systems', 'Mixed economies combine approaches', 'Property rights affect efficiency', 'Role of government varies by system', 'Resource allocation mechanisms differ'] },
          { key: 'comparativeAdvantage', title: 'Comparative Advantage and Trade', keyFacts: ['Absolute vs comparative advantage', 'Opportunity cost determines trade patterns', 'Specialization increases total output', 'Trade benefits all parties', 'Production possibilities and trade-offs'] },
          { key: 'marginalAnalysis', title: 'Marginal Analysis and Decision Making', keyFacts: ['Marginal benefit vs marginal cost', 'Optimal decisions at MB = MC', 'Thinking at the margin principle', 'Diminishing marginal utility', 'Rational choice theory'] },
          { key: 'marketFailures', title: 'Market Failures and Government Role', keyFacts: ['Externalities affect third parties', 'Public goods provision problems', 'Market power distorts outcomes', 'Information asymmetries exist', 'Government intervention rationale'] },
          { key: 'economicGoals', title: 'Macroeconomic Goals and Trade-offs', keyFacts: ['Full employment objective', 'Price stability importance', 'Economic growth promotion', 'Equity vs efficiency trade-offs', 'Policy goal conflicts'] }
        ];
      } else if (unit === 'unit2') {
        return [
          { key: 'gdpMeasurement', title: 'GDP and National Income Accounting', keyFacts: ['GDP measures total production value', 'Expenditure vs income approaches', 'Real vs nominal GDP distinction', 'GDP deflator and inflation', 'Limitations of GDP measurement'] },
          { key: 'unemploymentTypes', title: 'Unemployment Types and Measurement', keyFacts: ['Frictional unemployment is temporary', 'Structural unemployment from changes', 'Cyclical unemployment varies with economy', 'Natural rate of unemployment', 'Labor force participation rate'] },
          { key: 'inflationMeasurement', title: 'Inflation and Price Indices', keyFacts: ['CPI measures consumer prices', 'PPI tracks producer prices', 'Core inflation excludes volatiles', 'Hyperinflation destroys currency', 'Deflation causes economic problems'] },
          { key: 'businessCycles', title: 'Business Cycles and Economic Fluctuations', keyFacts: ['Expansion, peak, recession, trough phases', 'Leading, lagging, coincident indicators', 'Recessions defined as GDP decline', 'Recovery and growth patterns', 'Economic shocks cause cycles'] },
          { key: 'economicIndicators', title: 'Economic Indicators and Analysis', keyFacts: ['Leading indicators predict changes', 'Lagging indicators confirm trends', 'Real vs nominal distinctions', 'Index numbers and base years', 'Data limitations and revisions'] }
        ];
      } else if (unit === 'unit3') {
        return [
          { key: 'aggregateDemand', title: 'Aggregate Demand Model', keyFacts: ['AD shows total spending at price levels', 'Wealth, interest, international effects', 'Consumer, investment, government, exports', 'AD curve slopes downward', 'Shifts vs movements along curve'] },
          { key: 'aggregateSupply', title: 'Aggregate Supply Model', keyFacts: ['Short-run AS shows price-output relationship', 'Long-run AS is vertical at potential', 'Input prices affect SRAS position', 'Productivity shifts LRAS curve', 'Supply shocks cause stagflation'] },
          { key: 'macroEquilibrium', title: 'Macroeconomic Equilibrium', keyFacts: ['Equilibrium where AD meets AS', 'Short vs long-run equilibrium', 'Recessionary and inflationary gaps', 'Self-correcting mechanisms exist', 'Policy can speed adjustment'] },
          { key: 'multiplierEffects', title: 'Multiplier Effects and Spending', keyFacts: ['Spending creates ripple effects', 'MPC determines multiplier size', 'Investment multiplier amplifies changes', 'Tax multiplier is smaller', 'Crowding out reduces effects'] },
          { key: 'phillipsCurve', title: 'Phillips Curve Trade-offs', keyFacts: ['Short-run inflation-unemployment trade-off', 'Long-run curve is vertical', 'Expectations affect curve position', 'Supply shocks shift curve', 'Natural rate of unemployment'] }
        ];
      } else if (unit === 'unit4') {
        return [
          { key: 'moneyFunctions', title: 'Functions and Types of Money', keyFacts: ['Medium of exchange function', 'Store of value over time', 'Unit of account measurement', 'M1, M2, M3 money supplies', 'Commodity vs fiat money'] },
          { key: 'bankingSystem', title: 'Banking System and Money Creation', keyFacts: ['Fractional reserve banking system', 'Money multiplier process', 'Required vs excess reserves', 'Bank lending creates money', 'Reserve ratio affects multiplier'] },
          { key: 'federalReserve', title: 'Federal Reserve System', keyFacts: ['Central bank of United States', 'Board of Governors leadership', 'Regional Federal Reserve banks', 'Dual mandate: employment and prices', 'Independence from political pressure'] },
          { key: 'monetaryPolicy', title: 'Monetary Policy Tools', keyFacts: ['Open market operations primary tool', 'Discount rate for bank borrowing', 'Reserve requirements for banks', 'Forward guidance communication', 'Quantitative easing programs'] },
          { key: 'policyTransmission', title: 'Monetary Policy Transmission', keyFacts: ['Interest rates affect investment', 'Exchange rates impact trade', 'Asset prices influence wealth', 'Credit availability matters', 'Expectations shape behavior'] }
        ];
      } else if (unit === 'unit5') {
        return [
          { key: 'fiscalPolicy', title: 'Fiscal Policy and Government Spending', keyFacts: ['Expansionary vs contractionary policy', 'Automatic vs discretionary measures', 'Government purchases vs transfers', 'Built-in stabilizers exist', 'Timing and implementation lags'] },
          { key: 'crowdingOut', title: 'Crowding Out Effects', keyFacts: ['Government borrowing raises rates', 'Higher rates reduce private investment', 'Complete vs partial crowding out', 'International capital flows', 'Long-term growth effects'] },
          { key: 'governmentDebt', title: 'Government Debt and Deficits', keyFacts: ['Annual deficit vs accumulated debt', 'Debt-to-GDP ratio matters', 'Interest payments on debt', 'Sustainability concerns exist', 'Intergenerational equity issues'] },
          { key: 'supplySide', title: 'Supply-side Economics', keyFacts: ['Tax cuts can boost growth', 'Incentive effects on work', 'Laffer curve tax revenue', 'Long-run growth focus', 'Distributional effects vary'] },
          { key: 'policyPolitics', title: 'Political Economy of Policy', keyFacts: ['Political constraints on policy', 'Special interests influence', 'Time inconsistency problems', 'Electoral cycle effects', 'Coordination challenges exist'] }
        ];
      } else if (unit === 'unit6') {
        return [
          { key: 'internationalTrade', title: 'International Trade Theory', keyFacts: ['Comparative advantage drives trade', 'Gains from trade benefit all', 'Trade creation vs diversion', 'Factor endowments matter', 'Trade agreements reduce barriers'] },
          { key: 'exchangeRates', title: 'Exchange Rates and Currency', keyFacts: ['Floating vs fixed rate systems', 'Supply and demand determine rates', 'Purchasing power parity theory', 'Real vs nominal exchange rates', 'Currency appreciation and depreciation'] },
          { key: 'balanceOfPayments', title: 'Balance of Payments Accounting', keyFacts: ['Current account tracks goods/services', 'Capital account tracks investments', 'Balance of payments must balance', 'Current account deficits concern', 'Reserve changes balance accounts'] },
          { key: 'tradePolicies', title: 'Trade Policies and Protection', keyFacts: ['Tariffs raise import prices', 'Quotas limit import quantities', 'Subsidies help domestic producers', 'Trade wars harm all parties', 'WTO promotes free trade'] },
          { key: 'globalInterdependence', title: 'Global Economic Interdependence', keyFacts: ['Financial markets are connected', 'Economic crises spread globally', 'Multinational corporations expand', 'Technology enables globalization', 'Environmental externalities global'] }
        ];
      }
    }

    if (course === 'aphug') {
      if (unit === 'unit1') {
        return [
          { key: 'geographicPerspectives', title: 'Geographic Perspectives and Scale', keyFacts: ['Geographic perspective examines spatial relationships', 'Scale affects how patterns appear', 'Local to global scales interconnect', 'Relative vs absolute location', 'Context influences human decisions'] },
          { key: 'mapsAndSpatialData', title: 'Maps and Spatial Data Analysis', keyFacts: ['Reference maps show locations', 'Thematic maps display patterns', 'GPS and GIS enable analysis', 'Map projections distort differently', 'Quantitative and qualitative data'] },
          { key: 'spatialConcepts', title: 'Spatial Concepts and Relationships', keyFacts: ['Distance decay affects interaction', 'Time-space compression changes access', 'Diffusion spreads phenomena', 'Spatial association reveals patterns', 'Boundaries create inclusion/exclusion'] },
          { key: 'humanEnvironmentInteraction', title: 'Human-Environment Interaction', keyFacts: ['Environmental determinism vs possibilism', 'Cultural ecology adaptation strategies', 'Environmental modification changes landscapes', 'Sustainability balances development', 'Climate influences settlement'] },
          { key: 'fieldworkMethods', title: 'Geographic Fieldwork and Methods', keyFacts: ['Field observation provides primary data', 'Surveys collect human geographic data', 'Remote sensing monitors changes', 'Spatial statistics analyze relationships', 'Participant observation reveals culture'] }
        ];
      } else if (unit === 'unit2') {
        return [
          { key: 'populationDistribution', title: 'Population Distribution and Density', keyFacts: ['Population clusters in favorable areas', 'Arithmetic vs physiological density', 'Carrying capacity limits growth', 'Ecumene represents inhabited areas', 'Environment affects distribution'] },
          { key: 'demographicTransition', title: 'Demographic Transition Model', keyFacts: ['Stage 1: High birth and death rates', 'Stage 2: Death rates fall rapidly', 'Stage 3: Birth rates decline', 'Stage 4: Low rates, stable population', 'Stage 5: Population decline possible'] },
          { key: 'populationComposition', title: 'Population Composition and Structure', keyFacts: ['Population pyramids show age-sex structure', 'Dependency ratios indicate burden', 'Life expectancy reflects development', 'Gender differences in demographics', 'Aging populations face challenges'] },
          { key: 'migrationTypes', title: 'Types and Patterns of Migration', keyFacts: ['Voluntary vs forced migration', 'Internal vs international migration', 'Step migration occurs in stages', 'Return and circular migration', 'Chain migration follows networks'] },
          { key: 'migrationTheories', title: 'Migration Theories and Factors', keyFacts: ['Push factors encourage leaving', 'Pull factors attract to destinations', 'Intervening obstacles impede movement', 'Distance decay reduces likelihood', 'Networks facilitate movement'] }
        ];
      } else if (unit === 'unit3') {
        return [
          { key: 'cultureComponents', title: 'Components of Culture', keyFacts: ['Culture includes beliefs and practices', 'Material vs nonmaterial culture', 'Cultural traits form complexes', 'Culture hearths are innovation centers', 'Cultural diffusion spreads ideas'] },
          { key: 'culturalDiffusion', title: 'Cultural Diffusion and Change', keyFacts: ['Expansion diffusion spreads from origin', 'Relocation diffusion moves with people', 'Hierarchical diffusion follows rankings', 'Contagious diffusion spreads by contact', 'Stimulus diffusion adapts ideas'] },
          { key: 'languagePatterns', title: 'Language Families and Geography', keyFacts: ['Indo-European family dominates Europe', 'Sino-Tibetan includes Chinese languages', 'Language isolates have no relatives', 'Lingua francas facilitate communication', 'Language extinction threatens diversity'] },
          { key: 'religionGeography', title: 'Religion and Sacred Spaces', keyFacts: ['Universalizing religions seek converts', 'Ethnic religions tie to cultures', 'Religious landscapes reflect beliefs', 'Pilgrimage creates sacred geography', 'Religious conflicts have territorial aspects'] },
          { key: 'culturalLandscapes', title: 'Cultural Landscapes and Identity', keyFacts: ['Cultural landscapes show interaction', 'Traditional landscapes reflect history', 'Postmodern landscapes mix elements', 'Place attachment creates connections', 'Globalization affects identity'] }
        ];
      } else if (unit === 'unit4') {
        return [
          { key: 'politicalPower', title: 'Political Power and Territory', keyFacts: ['States exercise territorial sovereignty', 'Nations share cultural identity', 'Nation-states align boundaries', 'Multinational states contain nations', 'Stateless nations lack control'] },
          { key: 'boundaryTypes', title: 'Political Boundaries and Borders', keyFacts: ['Antecedent boundaries exist before settlement', 'Subsequent boundaries follow settlement', 'Superimposed boundaries ignore patterns', 'Relic boundaries no longer function', 'Different boundary types exist'] },
          { key: 'stateShapes', title: 'State Shapes and Territorial Issues', keyFacts: ['Compact states have circular shapes', 'Elongated states are stretched', 'Prorupted states have projections', 'Fragmented states are broken', 'Perforated states surround others'] },
          { key: 'geopolitics', title: 'Geopolitics and Global Power', keyFacts: ['Heartland theory emphasizes continental power', 'Rimland theory focuses on coasts', 'Superpowers dominate globally', 'Buffer states separate powers', 'Shatterbelt regions face instability'] },
          { key: 'governanceScales', title: 'Scales of Governance and Devolution', keyFacts: ['Federal systems divide power', 'Unitary systems centralize power', 'Devolution transfers power locally', 'Supranational organizations transcend states', 'Local governance addresses communities'] }
        ];
      } else if (unit === 'unit5') {
        return [
          { key: 'agricultureOrigins', title: 'Origins and Diffusion of Agriculture', keyFacts: ['Neolithic Revolution 10,000 years ago', 'Multiple agricultural hearths', 'Fertile Crescent earliest center', 'Seed vs vegetative agriculture', 'Domestication changed species'] },
          { key: 'agricultureSystems', title: 'Agricultural Production Systems', keyFacts: ['Subsistence agriculture feeds family', 'Commercial agriculture sells to market', 'Intensive agriculture maximizes land', 'Extensive agriculture uses large areas', 'Mixed farming combines crops/livestock'] },
          { key: 'vonThunenModel', title: 'Von Thünen Model of Agricultural Land Use', keyFacts: ['Distance to market determines use', 'Intensive crops near markets', 'Extensive grazing in outer zones', 'Transportation costs affect profitability', 'Assumptions rarely met in reality'] },
          { key: 'greenRevolution', title: 'Green Revolution and Modernization', keyFacts: ['High-yield varieties increased production', 'Chemical inputs widely used', 'Mechanization replaced labor', 'Irrigation expanded cultivation', 'Environmental costs emerged'] },
          { key: 'foodSecurity', title: 'Food Security and Sustainability', keyFacts: ['Food security requires adequate nutrition', 'Undernourishment affects millions', 'Food deserts lack fresh food access', 'Organic farming avoids chemicals', 'Sustainable agriculture balances needs'] }
        ];
      } else if (unit === 'unit6') {
        return [
          { key: 'urbanization', title: 'Urbanization Processes and Patterns', keyFacts: ['Urbanization concentrates population', 'First urban revolution created cities', 'Second revolution with industrialization', 'Megacities exceed 10 million', 'Urban primacy concentrates population'] },
          { key: 'cityHierarchies', title: 'Urban Hierarchies and Systems', keyFacts: ['Central place theory explains spacing', 'Range is maximum service distance', 'Threshold is minimum demand', 'Rank-size rule describes distribution', 'Primate cities dominate systems'] },
          { key: 'urbanModels', title: 'Models of Urban Structure', keyFacts: ['Concentric zone model shows rings', 'Sector model follows corridors', 'Multiple nuclei has several centers', 'Galactic city includes edge cities', 'Latin American model reflects history'] },
          { key: 'urbanChallenges', title: 'Urban Challenges and Planning', keyFacts: ['Urban sprawl consumes land', 'Infrastructure strain affects services', 'Housing shortages create settlements', 'Traffic congestion reduces mobility', 'Environmental degradation affects health'] },
          { key: 'sustainableCities', title: 'Sustainable Urban Development', keyFacts: ['Smart growth concentrates development', 'Transit-oriented reduces car dependence', 'Green infrastructure provides services', 'Mixed-use combines functions', 'Urban agriculture increases access'] }
        ];
      } else if (unit === 'unit7') {
        return [
          { key: 'industrialRevolution', title: 'Industrial Revolution and Location', keyFacts: ['First revolution used coal/steam', 'Second added electricity/oil', 'Third features information technology', 'Weber model explains location', 'Agglomeration creates clusters'] },
          { key: 'economicSectors', title: 'Economic Sectors and Employment', keyFacts: ['Primary sector extracts resources', 'Secondary sector manufactures', 'Tertiary sector provides services', 'Quaternary handles information', 'Quinary includes high-level services'] },
          { key: 'developmentTheories', title: 'Development Theories and Models', keyFacts: ['Rostow model shows stages', 'Dependency theory emphasizes exploitation', 'World-systems divides core-periphery', 'Semi-periphery countries exist', 'Commodity dependence limits options'] },
          { key: 'developmentIndicators', title: 'Development Indicators and Measurement', keyFacts: ['GDP per capita measures output', 'HDI combines multiple indicators', 'GII measures gender inequality', 'GNI adjusts for income flows', 'PPP accounts for cost differences'] },
          { key: 'globalTrade', title: 'Global Trade and Economic Geography', keyFacts: ['Comparative advantage drives specialization', 'Trade blocs reduce barriers', 'TNCs span multiple countries', 'Global supply chains connect places', 'Just-in-time reduces inventory'] }
        ];
      }
    }

    if (course === 'apstat') {
      if (unit === 'unit1') {
        return [
          { key: 'descriptiveStatistics', title: 'Describing Distributions of Data', keyFacts: ['Center, spread, and shape describe distributions', 'Mean and median measure center', 'Standard deviation measures spread', 'Histograms and boxplots visualize data', 'Outliers affect measures differently'] },
          { key: 'graphicalDisplays', title: 'Graphical Displays of Data', keyFacts: ['Dotplots show individual values', 'Histograms show frequency distribution', 'Boxplots highlight quartiles and outliers', 'Stemplots preserve data values', 'Choose appropriate display for data'] },
          { key: 'summarizingData', title: 'Summarizing Distributions Numerically', keyFacts: ['Five-number summary includes quartiles', 'IQR measures spread in middle 50%', 'Mean and standard deviation for symmetric', 'Median and IQR for skewed', 'Z-scores standardize values'] },
          { key: 'comparingDistributions', title: 'Comparing Distributions', keyFacts: ['Compare center, spread, shape, outliers', 'Side-by-side boxplots useful', 'Standardizing allows comparison', 'Context matters for interpretation', 'Relative position within distribution'] },
          { key: 'normalDistributions', title: 'Normal Distributions', keyFacts: ['Bell-shaped, symmetric distribution', 'Empirical rule gives percentages', 'Standard normal has mean 0, SD 1', 'Z-scores find areas and percentiles', 'Normal probability plots check normality'] }
        ];
      } else if (unit === 'unit2') {
        return [
          { key: 'scatterplots', title: 'Examining Relationships with Scatterplots', keyFacts: ['Scatterplots display two quantitative variables', 'Look for direction, form, and strength', 'Linear relationships form straight line', 'Outliers affect correlation calculations', 'Explanatory vs response variables'] },
          { key: 'correlation', title: 'Correlation and Association', keyFacts: ['Correlation measures linear association', 'Values range from -1 to +1', 'Correlation has no units', 'Correlation does not imply causation', 'Outliers can dramatically affect r'] },
          { key: 'leastSquares', title: 'Least-Squares Regression', keyFacts: ['Regression line minimizes squared residuals', 'Slope shows change in y per unit x', 'Y-intercept is y when x equals zero', 'Residuals show prediction errors', 'Use line only within data range'] },
          { key: 'residualAnalysis', title: 'Assessing the Regression Model', keyFacts: ['Residual plots check model conditions', 'Random scatter indicates good fit', 'Patterns suggest model problems', 'R-squared measures variation explained', 'Standard error measures typical error'] },
          { key: 'transformations', title: 'Transforming Data and Re-expressing', keyFacts: ['Logarithmic transforms straighten curves', 'Power transformations change relationships', 'Transformations can linearize data', 'Choose transformation based on pattern', 'Interpret results in original context'] }
        ];
      } else if (unit === 'unit3') {
        return [
          { key: 'samplingMethods', title: 'Sampling and Surveys', keyFacts: ['Simple random sample gives equal chance', 'Stratified sampling uses subgroups', 'Cluster sampling selects groups', 'Systematic sampling uses pattern', 'Convenience sampling often biased'] },
          { key: 'biasAndVariability', title: 'Sources of Bias in Sampling', keyFacts: ['Voluntary response bias affects results', 'Undercoverage excludes population members', 'Nonresponse bias from missing data', 'Response bias from question wording', 'Large samples reduce sampling variability'] },
          { key: 'experiments', title: 'Designing Experiments', keyFacts: ['Experiments establish causation', 'Random assignment reduces confounding', 'Control groups provide comparison', 'Replication increases reliability', 'Blocking controls for variables'] },
          { key: 'experimentalDesign', title: 'Experimental Design Principles', keyFacts: ['Randomization eliminates bias', 'Control reduces confounding variables', 'Replication increases precision', 'Double-blind prevents bias', 'Placebo effect affects responses'] },
          { key: 'observationalStudies', title: 'Observational Studies vs Experiments', keyFacts: ['Observational studies observe existing conditions', 'Experiments impose treatments', 'Confounding variables affect observational studies', 'Correlation does not prove causation', 'Lurking variables hide true relationships'] }
        ];
      } else if (unit === 'unit4') {
        return [
          { key: 'probabilityRules', title: 'Basic Probability Rules', keyFacts: ['Probability ranges from 0 to 1', 'Addition rule for mutually exclusive events', 'Multiplication rule for independent events', 'Complement rule: P(A) + P(A^c) = 1', 'Conditional probability uses given information'] },
          { key: 'randomVariables', title: 'Random Variables and Distributions', keyFacts: ['Discrete variables have countable values', 'Continuous variables have interval values', 'Probability distributions assign probabilities', 'Expected value is long-run average', 'Standard deviation measures variability'] },
          { key: 'binomialDistribution', title: 'Binomial Distribution', keyFacts: ['Fixed number of independent trials', 'Two possible outcomes per trial', 'Constant probability of success', 'Mean equals np, variance equals np(1-p)', 'Use for counting successes'] },
          { key: 'geometricDistribution', title: 'Geometric Distribution', keyFacts: ['Counts trials until first success', 'Independent trials with constant probability', 'Memoryless property applies', 'Mean equals 1/p', 'Models waiting time scenarios'] },
          { key: 'normalModel', title: 'Normal Distribution as Model', keyFacts: ['Continuous, bell-shaped distribution', 'Determined by mean and standard deviation', 'Areas under curve give probabilities', '68-95-99.7 rule for intervals', 'Central Limit Theorem connects to sampling'] }
        ];
      } else if (unit === 'unit5') {
        return [
          { key: 'samplingDistributions', title: 'Sampling Distributions', keyFacts: ['Distribution of sample statistics', 'Center equals population parameter', 'Spread decreases with sample size', 'Shape approaches normal for large n', 'Describes variability in sampling'] },
          { key: 'centralLimitTheorem', title: 'Central Limit Theorem', keyFacts: ['Sample means approach normal distribution', 'Applies regardless of population shape', 'Mean equals population mean', 'Standard error equals σ/√n', 'Larger samples give better approximation'] },
          { key: 'samplingDistributionMean', title: 'Sampling Distribution of Sample Mean', keyFacts: ['Unbiased estimator of population mean', 'Standard error decreases with sample size', 'Normal for large n or normal population', 'Distribution centers at μ', 'Used for inference about means'] },
          { key: 'samplingDistributionProportion', title: 'Sampling Distribution of Sample Proportion', keyFacts: ['Approximately normal for large samples', 'Mean equals population proportion p', 'Standard error equals √[p(1-p)/n]', 'Success-failure condition: np ≥ 10, n(1-p) ≥ 10', 'Used for inference about proportions'] },
          { key: 'biasAndVariability', title: 'Bias and Variability in Sampling', keyFacts: ['Bias is systematic error in estimation', 'Variability is random error in sampling', 'Unbiased estimators center at parameter', 'Lower variability gives more precise estimates', 'Larger samples reduce variability but not bias'] }
        ];
      } else if (unit === 'unit6') {
        return [
          { key: 'confidenceIntervals', title: 'Confidence Intervals for Proportions', keyFacts: ['Interval estimate for population proportion', 'Confidence level indicates reliability', 'Margin of error depends on sample size', 'Larger samples give narrower intervals', 'Interpret in context of problem'] },
          { key: 'conditionsForInference', title: 'Conditions for Inference', keyFacts: ['Random sampling or assignment required', 'Independence of observations necessary', '10% condition for sampling without replacement', 'Success-failure condition for normality', 'Check conditions before proceeding'] },
          { key: 'oneProportion', title: 'One-Proportion z-Procedures', keyFacts: ['Test claims about single proportion', 'Use sample proportion as test statistic', 'Compare to hypothesized value', 'Calculate p-value from standard normal', 'Make conclusion in context'] },
          { key: 'twoProportions', title: 'Two-Proportion z-Procedures', keyFacts: ['Compare proportions from two groups', 'Pool proportions under null hypothesis', 'Use difference in sample proportions', 'Standard error accounts for both samples', 'Test for significant difference'] },
          { key: 'errorTypes', title: 'Type I and Type II Errors', keyFacts: ['Type I error rejects true null hypothesis', 'Type II error fails to reject false null', 'Significance level sets Type I error rate', 'Power is probability of rejecting false null', 'Trade-off exists between error types'] }
        ];
      } else if (unit === 'unit7') {
        return [
          { key: 'tDistribution', title: 'The t-Distribution', keyFacts: ['Used when population standard deviation unknown', 'More variable than standard normal', 'Degrees of freedom determine shape', 'Approaches normal as df increases', 'Thicker tails than z-distribution'] },
          { key: 'oneSampleT', title: 'One-Sample t-Procedures', keyFacts: ['Confidence intervals for population mean', 'Hypothesis tests for population mean', 'Requires random sample and normality', 'Use sample standard deviation', 'Robust to moderate departures from normality'] },
          { key: 'twoSampleT', title: 'Two-Sample t-Procedures', keyFacts: ['Compare means from two independent groups', 'Assumes equal or unequal variances', 'Degrees of freedom calculated differently', 'Pooled procedures when variances equal', 'Welch approximation for unequal variances'] },
          { key: 'pairedT', title: 'Paired t-Procedures', keyFacts: ['Use when observations are naturally paired', 'Analyze differences within pairs', 'Reduces variability from individual differences', 'More powerful than two-sample procedures', 'Common in before-after studies'] },
          { key: 'robustness', title: 'Robustness of t-Procedures', keyFacts: ['t-procedures robust to non-normality', 'Central Limit Theorem helps for large samples', 'Outliers can seriously affect results', 'Check conditions with graphs and statistics', 'Consider transformations for severe skewness'] }
        ];
      } else if (unit === 'unit8') {
        return [
          { key: 'chiSquareGOF', title: 'Chi-Square Goodness of Fit Test', keyFacts: ['Tests if sample fits theoretical distribution', 'Expected counts must be at least 5', 'Degrees of freedom equal categories minus 1', 'Large chi-square suggests poor fit', 'Use for categorical data analysis'] },
          { key: 'chiSquareIndependence', title: 'Chi-Square Test for Independence', keyFacts: ['Tests association between two categorical variables', 'Uses contingency table format', 'Expected counts calculated from marginal totals', 'Degrees of freedom = (rows-1)(columns-1)', 'Significant result suggests dependence'] },
          { key: 'chiSquareHomogeneity', title: 'Chi-Square Test for Homogeneity', keyFacts: ['Compares distributions across populations', 'Tests if proportions equal across groups', 'Similar calculation to independence test', 'Different sampling design and interpretation', 'Useful for comparing treatments'] },
          { key: 'expectedCounts', title: 'Calculating Expected Counts', keyFacts: ['Expected count = (row total × column total) / grand total', 'Represents count under null hypothesis', 'All expected counts should be at least 5', 'Low expected counts require combining categories', 'Critical for valid chi-square tests'] },
          { key: 'chiSquareDistribution', title: 'The Chi-Square Distribution', keyFacts: ['Right-skewed distribution for positive values', 'Shape determined by degrees of freedom', 'Mean equals degrees of freedom', 'Used for goodness of fit and independence', 'Always one-tailed tests in this context'] }
        ];
      } else if (unit === 'unit9') {
        return [
          { key: 'regressionConditions', title: 'Conditions for Regression Inference', keyFacts: ['Linear relationship between variables', 'Independent observations required', 'Normal distribution of residuals', 'Equal variance of residuals', 'Check with residual plots'] },
          { key: 'slopeInference', title: 'Inference for Regression Slope', keyFacts: ['Test if true slope equals zero', 'Confidence interval for true slope', 'Use t-distribution with n-2 degrees freedom', 'Standard error of slope from software', 'Significant slope suggests linear relationship'] },
          { key: 'regressionTTest', title: 'T-Test for Correlation and Slope', keyFacts: ['Test for significant linear relationship', 'Null hypothesis: slope = 0 or r = 0', 'T-statistic follows t-distribution', 'Same p-value for slope and correlation tests', 'Reject null suggests linear association'] },
          { key: 'predictionIntervals', title: 'Prediction vs Confidence Intervals', keyFacts: ['Confidence interval for mean response', 'Prediction interval for individual response', 'Prediction intervals always wider', 'Both depend on distance from mean x', 'Extrapolation beyond data dangerous'] },
          { key: 'transformationsRegression', title: 'Transformations in Regression', keyFacts: ['Linearize curved relationships', 'Log transformations common', 'Power transformations for other patterns', 'Transform back for interpretation', 'Check linearity after transformation'] }
        ];
      }
    }

    if (course === 'apcsp') {
      if (unit === 'unit1') {
        return [
          { key: 'creativeDevelopment', title: 'Creative Development Process', keyFacts: ['Iterative development cycle improves programs', 'User feedback guides design decisions', 'Testing identifies and fixes bugs', 'Collaboration enhances creativity', 'Documentation makes code maintainable'] },
          { key: 'programmingFundamentals', title: 'Programming Fundamentals', keyFacts: ['Variables store and manipulate data', 'Functions organize code into reusable blocks', 'Control structures direct program flow', 'Data types determine variable capabilities', 'Syntax rules govern program structure'] },
          { key: 'designThinking', title: 'Design Thinking and Planning', keyFacts: ['User-centered design meets real needs', 'Wireframes and prototypes visualize ideas', 'Planning reduces development time', 'Accessibility ensures inclusive design', 'Iterative improvement refines solutions'] },
          { key: 'collaboration', title: 'Collaboration in Development', keyFacts: ['Version control manages code changes', 'Pair programming improves code quality', 'Code reviews catch errors and improve style', 'Documentation facilitates team understanding', 'Communication prevents misunderstandings'] },
          { key: 'innovation', title: 'Innovation and Technology', keyFacts: ['Technology enables creative expression', 'Innovation solves real-world problems', 'Existing technologies inspire new solutions', 'Constraints often spark creativity', 'Digital tools democratize creation'] }
        ];
      } else if (unit === 'unit2') {
        return [
          { key: 'dataCollection', title: 'Data Collection Methods', keyFacts: ['Sensors automatically gather environmental data', 'Surveys collect user preferences and opinions', 'Web scraping extracts online information', 'APIs provide structured data access', 'Data quality affects analysis accuracy'] },
          { key: 'dataOrganization', title: 'Data Organization and Representation', keyFacts: ['Databases organize data for efficient retrieval', 'Tables use rows and columns structure', 'Data formats include CSV, JSON, and XML', 'Metadata describes data characteristics', 'Normalization reduces data redundancy'] },
          { key: 'dataAnalysis', title: 'Data Analysis and Insights', keyFacts: ['Filtering isolates relevant data subsets', 'Sorting arranges data by specified criteria', 'Aggregation summarizes large datasets', 'Visualization reveals patterns and trends', 'Statistical analysis quantifies relationships'] },
          { key: 'dataPrivacy', title: 'Data Privacy and Security', keyFacts: ['Personal data requires protection measures', 'Encryption secures data transmission', 'Access controls limit data exposure', 'Data anonymization protects individual privacy', 'Legal regulations govern data usage'] },
          { key: 'bigDataImpact', title: 'Big Data and Societal Impact', keyFacts: ['Big data enables predictive analytics', 'Data-driven decisions improve outcomes', 'Bias in data leads to unfair results', 'Data ownership raises ethical questions', 'Surveillance capabilities affect privacy'] }
        ];
      } else if (unit === 'unit3') {
        return [
          { key: 'algorithmicThinking', title: 'Algorithmic Thinking', keyFacts: ['Algorithms are step-by-step problem solutions', 'Decomposition breaks problems into parts', 'Pattern recognition identifies similarities', 'Abstraction focuses on essential features', 'Algorithms can solve similar problems'] },
          { key: 'programmingLanguages', title: 'Programming Languages and Tools', keyFacts: ['High-level languages are human-readable', 'Different languages suit different purposes', 'IDEs provide development environments', 'Libraries extend language capabilities', 'Syntax varies across programming languages'] },
          { key: 'controlStructures', title: 'Control Structures and Logic', keyFacts: ['Sequence executes instructions in order', 'Selection chooses between alternatives', 'Iteration repeats instructions', 'Boolean logic controls program flow', 'Conditional statements implement decisions'] },
          { key: 'dataStructures', title: 'Data Structures and Variables', keyFacts: ['Lists store ordered collections of items', 'Arrays provide indexed data access', 'Variables hold values that can change', 'Data types define variable capabilities', 'Scope determines variable accessibility'] },
          { key: 'algorithmEfficiency', title: 'Algorithm Efficiency and Optimization', keyFacts: ['Running time measures algorithm speed', 'Space complexity indicates memory usage', 'Different algorithms solve same problems', 'Optimization improves performance', 'Trade-offs exist between time and space'] }
        ];
      } else if (unit === 'unit4') {
        return [
          { key: 'computerSystems', title: 'Computer Systems Architecture', keyFacts: ['CPU executes program instructions', 'Memory stores data and programs', 'Input/output devices interface with users', 'Operating systems manage hardware resources', 'Hardware and software work together'] },
          { key: 'networks', title: 'Networks and the Internet', keyFacts: ['Internet connects global computer networks', 'Protocols enable communication standards', 'IP addresses identify network devices', 'Routers direct network traffic', 'Bandwidth affects data transmission speed'] },
          { key: 'internetProtocols', title: 'Internet Protocols and Standards', keyFacts: ['HTTP transfers web page content', 'TCP/IP ensures reliable data delivery', 'DNS translates domain names to addresses', 'Packets carry data across networks', 'Standards enable global interoperability'] },
          { key: 'cybersecurity', title: 'Cybersecurity Fundamentals', keyFacts: ['Authentication verifies user identity', 'Encryption protects data confidentiality', 'Firewalls block unauthorized access', 'Malware threatens system security', 'Security requires multiple layers'] },
          { key: 'digitalDivide', title: 'Digital Divide and Access', keyFacts: ['Unequal access limits opportunities', 'Geographic location affects connectivity', 'Economic factors influence technology access', 'Digital literacy affects effective usage', 'Policy decisions impact internet access'] }
        ];
      } else if (unit === 'unit5') {
        return [
          { key: 'computingInnovations', title: 'Computing Innovations and Society', keyFacts: ['Computing transforms how we work and live', 'Innovations create new opportunities and challenges', 'Technology adoption varies across populations', 'Digital systems enable global collaboration', 'Computing solutions address societal problems'] },
          { key: 'ethicalComputing', title: 'Ethical Issues in Computing', keyFacts: ['Privacy concerns arise from data collection', 'Algorithmic bias affects fairness', 'Intellectual property protects digital creations', 'Digital rights and responsibilities matter', 'Ethical decision-making guides technology use'] },
          { key: 'legalIssues', title: 'Legal and Policy Issues', keyFacts: ['Copyright protects creative digital works', 'Fair use allows limited content usage', 'Digital piracy violates intellectual property', 'Government regulations affect technology', 'International laws vary across countries'] },
          { key: 'socialImpact', title: 'Social Impact of Computing', keyFacts: ['Social media changes communication patterns', 'Automation affects employment markets', 'Digital platforms enable new business models', 'Technology can increase or decrease inequality', 'Computing influences political processes'] },
          { key: 'globalImpact', title: 'Global Impact and Digital Citizenship', keyFacts: ['Internet enables global information sharing', 'Digital citizenship requires responsible behavior', 'Technology bridges and creates cultural divides', 'Global collaboration solves complex problems', 'Digital footprints have lasting consequences'] }
        ];
      }
    }

    return [];
  };

  // Function to fetch unit topics from backend
  const fetchUnitTopics = useCallback(async () => {
    if (!course || !unit) return;
    
    try {
      setTopicsLoading(true);
      
      // Always use deployed backend - it's ready and working
      const API_BASE = 'https://ap-helper-2d9f117e9bdb.herokuapp.com';

      const url = `${API_BASE}/api/unit-topics?course=${encodeURIComponent(course)}&unit=${encodeURIComponent(unit)}`;

      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(user ? getAuthHeaders() : {})
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UnitTopicsData = await response.json();
      console.log(`Topics loaded for ${course} ${unit}:`, data.topics?.length || 0, 'topics');
      
      // If API returns no topics, use fallback topics for known courses
      if (!data.topics || data.topics.length === 0) {
        if (course === 'apush' || course === 'apgov' || course === 'apworld' || course === 'world' || course === 'apbiology' || course === 'appsychology' || course === 'apmicro' || course === 'apmacro' || course === 'aphug' || course === 'apstat' || course === 'apcsp') {
          console.log('API returned no topics, providing fallback topics for', course, unit);
          const fallbackTopics = getFallbackTopics(course, unit);
          setUnitTopics(fallbackTopics);
        } else {
          setUnitTopics([]);
        }
      } else {
        setUnitTopics(data.topics);
      }
    } catch (error) {
      console.error('Error fetching unit topics:', error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.warn('Request timeout - server may be slow');
        } else if (error.message.includes('Failed to fetch')) {
          console.warn('Network error - server may be unavailable');
        }
      }
      
      // Instead of setting empty array, let's provide fallback topics for known courses
      if (course === 'apush' || course === 'apgov' || course === 'apworld' || course === 'world' || course === 'apbiology' || course === 'appsychology' || course === 'apmicro' || course === 'apmacro' || course === 'aphug' || course === 'apstat') {
        console.log('Providing fallback topics for', course, unit);
        const fallbackTopics = getFallbackTopics(course, unit);
        setUnitTopics(fallbackTopics);
      } else {
        setUnitTopics([]);
      }
    } finally {
      setTopicsLoading(false);
    }
  }, [course, unit, user, getAuthHeaders]);

  // Welcome message function
  const getWelcomeMessage = (course: string, unit: string) => {
    if (course === 'apush') {
      const unitInfo = getUnitInfo();
      const welcomeMessages = {
        'unit1': "Welcome to APUSH Unit 1: Colonial Period and Independence (1491–1800)! 🌎\n\nI'm your Socratic AI tutor. I'll guide your learning through questions rather than giving direct answers.\n\nKey topics: Pre-Columbian societies • European exploration • Spanish colonization • Columbian Exchange • Early English attempts\n\nWhat interests you most about this period, or what do you already know about European exploration?",
        'unit2': "Welcome to APUSH Unit 2: Early Republic (1800–1848)! 🇺🇸\n\nI'm your Socratic AI tutor. I'll guide your learning through thoughtful questions and discussion.\n\nKey topics: Jeffersonian democracy • War of 1812 • Market Revolution • Westward expansion • Reform movements • Sectional tensions\n\nWhat would you like to explore about this era of American growth and change?",
        'unit3': "Welcome to APUSH Unit 3: Civil War and Reconstruction (1844–1877)! ⚔️\n\nI'm your Socratic AI tutor. Let's explore this pivotal period through guided discussion.\n\nKey topics: Sectional conflict • Kansas-Nebraska Act • Lincoln • Civil War • Emancipation • Reconstruction policies\n\nWhat aspect of this transformative era interests you most?",
        'unit4': "Welcome to APUSH Unit 4: The Gilded Age (1865–1898)! 🏭\n\nI'm your Socratic AI tutor. Let's examine this era of rapid change and growth.\n\nKey topics: Industrialization • Immigration • Urbanization • Labor movements • Political corruption • Agrarian discontent\n\nWhat would you like to discover about America's industrial transformation?",
        'unit5': "Welcome to APUSH Unit 5: Imperialism and World War I (1890–1920)! 🌍\n\nI'm your Socratic AI tutor. Let's explore America's emergence as a world power.\n\nKey topics: Spanish-American War • Progressive Era • World War I • Wilson's foreign policy • Social reform\n\nWhat interests you about America's growing role on the world stage?",
        'unit6': "Welcome to APUSH Unit 6: Prosperity, Depression, and the New Deal (1920–1945)! 📈\n\nI'm your Socratic AI tutor. Let's examine this era of boom, bust, and recovery.\n\nKey topics: 1920s culture • Great Depression • New Deal programs • World War II • Social changes\n\nWhat aspect of this dramatic period would you like to explore?",
        'unit7': "Welcome to APUSH Unit 7: World War II and Early Cold War (1940–1963)! 🕊️\n\nI'm your Socratic AI tutor. Let's discuss America's role as a global superpower.\n\nKey topics: World War II • Holocaust • Atomic bomb • Cold War origins • Containment • Nuclear arms race\n\nWhat would you like to learn about this pivotal era in world history?",
        'unit8': "Welcome to APUSH Unit 8: Civil Rights and Social Change (1945–1980)! ✊\n\nI'm your Socratic AI tutor. Let's explore this era of social transformation and activism.\n\nKey topics: Civil Rights Movement • Great Society • Vietnam War • Counterculture • Women's Liberation • Conservative backlash\n\nWhat aspect of this dynamic period of change interests you most?",
        'unit9': "Welcome to APUSH Unit 9: Entering the 21st Century (1980–Present)! 💻\n\nI'm your Socratic AI tutor. Let's examine recent American history and its ongoing impact.\n\nKey topics: Reagan Revolution • End of Cold War • Technology revolution • 9/11 • Political polarization • Modern challenges\n\nWhat would you like to discuss about America's recent history and current issues?"
      };
      return welcomeMessages[unit as keyof typeof welcomeMessages] || `Welcome to ${unitInfo.title}! I'm your Socratic AI tutor, ready to help you explore this historical period through guided questions and discussion.`;
    }
    if (course === 'apgov') {
      const unitInfo = getUnitInfo();
      const welcomeMessages = {
        'unit1': "Welcome to AP Government Unit 1: Foundations of Democracy! 📜\n\nI'm your Socratic AI tutor. I'll guide your understanding of American democracy through thoughtful questions and discussion.\n\nKey topics: Enlightenment ideals • Articles of Confederation • Constitutional Convention • Federalism • Separation of powers • Bill of Rights\n\nWhat do you already know about the founding principles of American government, or what would you like to explore first?",
        'unit2': "Welcome to AP Government Unit 2: Interactions Among Branches! 🏛️\n\nI'm your Socratic AI tutor. Let's explore how the three branches of government work together and check each other's power.\n\nKey topics: Congress • Presidency • Federal courts • Bureaucracy • Checks and balances • Inter-branch relations\n\nWhat interests you most about how our government is structured, or what questions do you have about how it operates?",
        'unit3': "Welcome to AP Government Unit 3: Civil Liberties and Civil Rights! ⚖️\n\nI'm your Socratic AI tutor. Let's examine how individual freedoms are protected and how rights have expanded over time.\n\nKey topics: First Amendment freedoms • Due process • Equal protection • Civil rights movement • Supreme Court cases\n\nWhat do you think is the difference between civil liberties and civil rights, or what specific rights interest you most?",
        'unit4': "Welcome to AP Government Unit 4: Political Ideologies and Beliefs! 💭\n\nI'm your Socratic AI tutor. Let's explore how Americans form their political opinions and what they believe about government's role.\n\nKey topics: Political culture • Political socialization • Public opinion • Ideologies • Party identification • Demographics\n\nWhat influences your own political beliefs, or what would you like to understand about how people form their political views?",
        'unit5': "Welcome to AP Government Unit 5: Political Participation! 🗳️\n\nI'm your Socratic AI tutor. Let's examine how citizens participate in democracy through voting, campaigns, and civic engagement.\n\nKey topics: Voting rights • Elections • Campaigns • Political parties • Interest groups • Media\n\nWhat do you think motivates people to vote, or what questions do you have about how elections and campaigns work?"
      };
      return welcomeMessages[unit as keyof typeof welcomeMessages] || `Welcome to ${unitInfo.title}! I'm your Socratic AI tutor, ready to help you explore American government through guided questions and discussion.`;
    }
    if (course === 'apworld' || course === 'world') {
      const unitInfo = getUnitInfo();
      const welcomeMessages = {
        'unit1': "Welcome to AP World Unit 1: Global Trade Networks (1200–1450 CE)! 🛤️\n\nI'm your Socratic AI tutor. I'll guide your understanding of global connections through thoughtful questions and discussion.\n\nKey topics: Silk Roads • Indian Ocean trade • Mongol Empire • Trans-Saharan trade • Cultural exchange\n\nWhat do you already know about how different civilizations connected before 1450, or what would you like to explore first?",
        'unit2': "Welcome to AP World Unit 2: Early Modern Global Connections (1450–1750 CE)! 🌍\n\nI'm your Socratic AI tutor. Let's explore how European exploration created the first truly global trade networks.\n\nKey topics: European exploration • Columbian Exchange • Atlantic slave trade • Land-based empires • Global trade expansion\n\nWhat interests you most about this age of exploration, or what questions do you have about how the world became more connected?",
        'unit3': "Welcome to AP World Unit 3: Industrial Age and Imperialism (1750–1900 CE)! 🏭\n\nI'm your Socratic AI tutor. Let's examine how industrialization transformed society and created new forms of empire.\n\nKey topics: Industrial Revolution • New imperialism • Nationalism • Abolition movements • Global migration\n\nWhat would you like to understand about how industrialization changed the world, or what specific aspect interests you most?",
        'unit4': "Welcome to AP World Unit 4: The Modern World (1900–Present)! 🌐\n\nI'm your Socratic AI tutor. Let's explore global conflicts, decolonization, and contemporary challenges.\n\nKey topics: Global conflicts • Decolonization • Economic systems • Human rights • Global challenges\n\nWhat do you want to learn about the modern world, or what current global issue interests you most?",
        'unit5': "Welcome to AP World Unit 5: Revolutions and Independence (1750–1900 CE)! 🔥\n\nI'm your Socratic AI tutor. Let's examine the age of revolutions and movements for independence.\n\nKey topics: Political revolutions • Industrial spread • Social reform • Nationalism • Economic imperialism\n\nWhat interests you about this era of revolutionary change and independence movements?",
        'unit6': "Welcome to AP World Unit 6: Consequences of Industrialization (1750–1900 CE)! 🏗️\n\nI'm your Socratic AI tutor. Let's explore how industrialization transformed society worldwide.\n\nKey topics: Mass production • Urbanization • Labor movements • New imperialism • Global migration\n\nWhat would you like to understand about industrialization's impact on the world?",
        'unit7': "Welcome to AP World Unit 7: Global Conflict (1900–Present)! ⚔️\n\nI'm your Socratic AI tutor. Let's examine the era of total war and global conflict.\n\nKey topics: World War I • Interwar crisis • World War II • Cold War origins • Early decolonization\n\nWhat aspect of 20th-century global conflict interests you most?",
        'unit8': "Welcome to AP World Unit 8: Cold War and Decolonization (1900–Present)! 🕊️\n\nI'm your Socratic AI tutor. Let's explore the Cold War era and the end of colonialism.\n\nKey topics: Cold War conflicts • Decolonization completion • Development models • Social movements • Cultural exchange\n\nWhat would you like to learn about this transformative period in world history?",
        'unit9': "Welcome to AP World Unit 9: Globalization (1900–Present)! 🌏\n\nI'm your Socratic AI tutor. Let's examine our interconnected modern world.\n\nKey topics: End of Cold War • Economic globalization • Technological revolution • Environmental challenges • Contemporary conflicts\n\nWhat aspects of our globalized world interest you most?"
      };
      return welcomeMessages[unit as keyof typeof welcomeMessages] || `Welcome to ${unitInfo.title}! I'm your Socratic AI tutor, ready to help you explore world history through guided questions and discussion.`;
    }
    if (course === 'apbiology') {
      const unitInfo = getUnitInfo();
      const welcomeMessages = {
        'unit1': "Welcome to AP Biology Unit 1: Chemistry of Life! 🧬\n\nI'm your Socratic AI tutor. I'll guide your understanding of biochemistry through scientific inquiry and questions.\n\nKey topics: Water and hydrogen bonds • Biological macromolecules • Enzymes and catalysis • Carbon chemistry • pH and buffers\n\nWhat do you already know about the chemical basis of life, or what would you like to explore first?",
        'unit2': "Welcome to AP Biology Unit 2: Cell Structure and Function! 🔬\n\nI'm your Socratic AI tutor. Let's explore the fundamental unit of life through guided questions and analysis.\n\nKey topics: Cell membrane structure • Prokaryotic vs eukaryotic cells • Organelles and functions • Cytoskeleton • Membrane transport\n\nWhat interests you most about cellular organization, or what questions do you have about how cells work?",
        'unit3': "Welcome to AP Biology Unit 3: Cellular Energetics! ⚡\n\nI'm your Socratic AI tutor. Let's examine how cells capture, transform, and use energy for life processes.\n\nKey topics: Cellular respiration • Photosynthesis • Enzyme regulation • ATP and energy transfer • Metabolic pathways\n\nWhat would you like to understand about how cells obtain and use energy, or what aspect interests you most?",
        'unit4': "Welcome to AP Biology Unit 4: Cell Communication! 📡\n\nI'm your Socratic AI tutor. Let's explore how cells send, receive, and respond to information.\n\nKey topics: Cell signaling overview • Signal transduction pathways • Types of cell communication • Cellular receptors • Response mechanisms\n\nWhat do you want to learn about how cells communicate, or what questions do you have about signaling pathways?",
        'unit5': "Welcome to AP Biology Unit 5: Heredity! 🧬\n\nI'm your Socratic AI tutor. Let's examine how traits are passed from generation to generation through guided scientific inquiry.\n\nKey topics: Mendelian genetics • Non-Mendelian inheritance • Chromosomes and inheritance • Meiosis and variation • Pedigree analysis\n\nWhat interests you about inheritance patterns, or what would you like to explore about genetics?",
        'unit6': "Welcome to AP Biology Unit 6: Gene Expression! 🔄\n\nI'm your Socratic AI tutor. Let's explore how genetic information flows from DNA to proteins.\n\nKey topics: DNA structure and replication • Transcription • Translation • Gene regulation • Mutations and variation\n\nWhat would you like to understand about how genes work, or what aspect of molecular biology interests you most?",
        'unit7': "Welcome to AP Biology Unit 7: Natural Selection! 🌱\n\nI'm your Socratic AI tutor. Let's examine the mechanisms that drive evolutionary change through scientific analysis.\n\nKey topics: Natural selection mechanisms • Evidence for evolution • Speciation processes • Population genetics • Phylogeny and classification\n\nWhat interests you about evolution, or what questions do you have about how species change over time?",
        'unit8': "Welcome to AP Biology Unit 8: Ecology! 🌍\n\nI'm your Socratic AI tutor. Let's explore the interactions between organisms and their environment.\n\nKey topics: Energy flow in ecosystems • Biogeochemical cycles • Population ecology • Community interactions • Biodiversity and conservation\n\nWhat aspects of ecology interest you most, or what would you like to learn about environmental interactions?"
      };
      return welcomeMessages[unit as keyof typeof welcomeMessages] || `Welcome to ${unitInfo.title}! I'm your Socratic AI tutor, ready to help you explore biology through guided questions and scientific inquiry.`;
    }
    if (course === 'appsychology') {
      const unitInfo = getUnitInfo();
      const welcomeMessages = {
        'unit1': "Welcome to AP Psychology Unit 1: Scientific Foundations of Psychology! 🧠\n\nI'm your Socratic AI tutor. I'll guide your understanding of psychology as a science through inquiry and critical thinking.\n\nKey topics: History of psychology • Research methods • Statistical concepts • Ethical guidelines • Major perspectives\n\nWhat do you already know about psychology as a science, or what would you like to explore first?",
        'unit2': "Welcome to AP Psychology Unit 2: Biological Bases of Behavior! 🔬\n\nI'm your Socratic AI tutor. Let's explore how biology influences behavior and mental processes.\n\nKey topics: Nervous system structure • Brain anatomy and function • Neurotransmitters • Endocrine system • Genetics and behavior\n\nWhat interests you about the relationship between brain and behavior, or what questions do you have?",
        'unit3': "Welcome to AP Psychology Unit 3: Sensation and Perception! 👁️\n\nI'm your Socratic AI tutor. Let's examine how we sense and interpret our world through guided analysis.\n\nKey topics: Sensory processes • Visual perception • Auditory processing • Other senses • Perceptual organization\n\nWhat would you like to understand about how we perceive reality, or what aspect interests you most?",
        'unit4': "Welcome to AP Psychology Unit 4: Learning! 📚\n\nI'm your Socratic AI tutor. Let's explore how experience changes behavior through various learning mechanisms.\n\nKey topics: Classical conditioning • Operant conditioning • Observational learning • Cognitive learning • Learning principles\n\nWhat do you want to learn about how we acquire new behaviors, or what questions do you have?",
        'unit5': "Welcome to AP Psychology Unit 5: Cognitive Psychology! 🧩\n\nI'm your Socratic AI tutor. Let's examine thinking, memory, and mental processes through scientific inquiry.\n\nKey topics: Memory processes • Problem solving • Decision making • Language and thought • Intelligence\n\nWhat interests you about how the mind processes information, or what would you like to explore?",
        'unit6': "Welcome to AP Psychology Unit 6: Developmental Psychology! 👶\n\nI'm your Socratic AI tutor. Let's explore human development across the lifespan through guided questions.\n\nKey topics: Physical development • Cognitive development • Social development • Moral development • Aging processes\n\nWhat aspects of human development interest you most, or what questions do you have about growth and change?",
        'unit7': "Welcome to AP Psychology Unit 7: Personality! 👥\n\nI'm your Socratic AI tutor. Let's examine individual differences and personality theories through critical analysis.\n\nKey topics: Personality theories • Trait approaches • Assessment methods • Personality disorders • Cultural influences\n\nWhat would you like to understand about personality, or what interests you about individual differences?",
        'unit8': "Welcome to AP Psychology Unit 8: Abnormal Behavior! 🔄\n\nI'm your Socratic AI tutor. Let's explore mental health and psychological disorders through scientific understanding.\n\nKey topics: Defining abnormality • Anxiety disorders • Mood disorders • Schizophrenia • Other disorders\n\nWhat do you want to learn about psychological disorders, or what questions do you have about mental health?",
        'unit9': "Welcome to AP Psychology Unit 9: Treatment of Psychological Disorders! 💊\n\nI'm your Socratic AI tutor. Let's examine therapeutic approaches and treatment methods through guided inquiry.\n\nKey topics: Psychotherapy approaches • Biomedical treatments • Treatment effectiveness • Ethical considerations • Community mental health\n\nWhat interests you about psychological treatment, or what would you like to explore about therapy?",
        'unit10': "Welcome to AP Psychology Unit 10: Social Psychology! 👫\n\nI'm your Socratic AI tutor. Let's explore how social situations influence behavior and mental processes.\n\nKey topics: Social cognition • Attitudes and persuasion • Conformity and obedience • Group behavior • Prejudice and discrimination\n\nWhat aspects of social psychology interest you most, or what questions do you have about human social behavior?"
      };
      return welcomeMessages[unit as keyof typeof welcomeMessages] || `Welcome to ${unitInfo.title}! I'm your Socratic AI tutor, ready to help you explore psychology through guided questions and scientific inquiry.`;
    }
    if (course === 'apmicro') {
      const unitInfo = getUnitInfo();
      const welcomeMessages = {
        'unit1': "Welcome to AP Microeconomics Unit 1: Basic Economic Concepts! 📊\n\nI'm your Socratic AI tutor. I'll guide your understanding of fundamental economic principles through inquiry and analysis.\n\nKey topics: Scarcity and choice • Opportunity cost • Production possibilities • Economic systems • Marginal analysis\n\nWhat do you already know about economics, or what economic concepts would you like to explore first?",
        'unit2': "Welcome to AP Microeconomics Unit 2: Supply and Demand! 📈\n\nI'm your Socratic AI tutor. Let's explore how markets work and how prices are determined through guided analysis.\n\nKey topics: Demand and consumer behavior • Supply and producer decisions • Market equilibrium • Price elasticity • Market efficiency\n\nWhat interests you about how markets function, or what questions do you have about supply and demand?",
        'unit3': "Welcome to AP Microeconomics Unit 3: Production, Cost, and Perfect Competition! 🏭\n\nI'm your Socratic AI tutor. Let's examine how firms make production decisions in competitive markets.\n\nKey topics: Production functions • Costs of production • Perfect competition • Profit maximization • Supply curve derivation\n\nWhat would you like to understand about firm behavior, or what aspect of production costs interests you most?",
        'unit4': "Welcome to AP Microeconomics Unit 4: Imperfect Competition! 🏢\n\nI'm your Socratic AI tutor. Let's explore different market structures and how firms with market power behave.\n\nKey topics: Monopoly markets • Price discrimination • Oligopoly behavior • Monopolistic competition • Strategic interactions\n\nWhat do you want to learn about market power, or what questions do you have about different market structures?",
        'unit5': "Welcome to AP Microeconomics Unit 5: Factor Markets! 👥\n\nI'm your Socratic AI tutor. Let's examine how firms hire inputs like labor and how wages are determined.\n\nKey topics: Derived demand • Labor markets • Wage determination • Monopsony power • Capital and land markets\n\nWhat interests you about factor markets, or what would you like to explore about wage determination?",
        'unit6': "Welcome to AP Microeconomics Unit 6: Market Failures and Government Intervention! 🏛️\n\nI'm your Socratic AI tutor. Let's explore when markets don't work efficiently and what governments can do about it.\n\nKey topics: Types of market failure • Externalities • Public goods • Information asymmetries • Government policy solutions\n\nWhat aspects of market failure interest you most, or what questions do you have about government intervention?"
      };
      return welcomeMessages[unit as keyof typeof welcomeMessages] || `Welcome to ${unitInfo.title}! I'm your Socratic AI tutor, ready to help you explore microeconomics through guided questions and economic analysis.`;
    }
    if (course === 'apmacro') {
      const unitInfo = getUnitInfo();
      const welcomeMessages = {
        'unit1': "Welcome to AP Macroeconomics Unit 1: Basic Economic Concepts! 🌍\n\nI'm your Socratic AI tutor. I'll guide your understanding of economic systems and fundamental macroeconomic principles.\n\nKey topics: Economic systems • Comparative advantage • Marginal analysis • Market failures • Economic goals\n\nWhat do you already know about how economies are organized, or what macroeconomic concepts would you like to explore first?",
        'unit2': "Welcome to AP Macroeconomics Unit 2: Economic Indicators and Business Cycle! 📊\n\nI'm your Socratic AI tutor. Let's explore how economists measure economic performance and understand economic fluctuations.\n\nKey topics: GDP measurement • Unemployment types • Inflation measurement • Business cycles • Economic indicators\n\nWhat interests you about measuring economic performance, or what questions do you have about the business cycle?",
        'unit3': "Welcome to AP Macroeconomics Unit 3: National Income and Price Determination! 💰\n\nI'm your Socratic AI tutor. Let's examine how national income and price levels are determined through aggregate supply and demand.\n\nKey topics: Aggregate demand • Aggregate supply • Macroeconomic equilibrium • Multiplier effects • Phillips curve\n\nWhat would you like to understand about how the overall economy works, or what aspect of economic equilibrium interests you most?",
        'unit4': "Welcome to AP Macroeconomics Unit 4: Financial Sector! 🏦\n\nI'm your Socratic AI tutor. Let's explore money, banking, and how the Federal Reserve influences the economy.\n\nKey topics: Money functions • Banking system • Federal Reserve • Monetary policy • Policy transmission\n\nWhat do you want to learn about money and banking, or what questions do you have about how monetary policy works?",
        'unit5': "Welcome to AP Macroeconomics Unit 5: Long-run Consequences of Stabilization Policies! 🏛️\n\nI'm your Socratic AI tutor. Let's examine the long-term effects of government fiscal and monetary policies.\n\nKey topics: Fiscal policy • Crowding out • Government debt • Supply-side economics • Policy politics\n\nWhat interests you about government economic policies, or what would you like to explore about policy consequences?",
        'unit6': "Welcome to AP Macroeconomics Unit 6: Open Economy-International Trade and Finance! 🌏\n\nI'm your Socratic AI tutor. Let's explore how countries interact economically through trade and finance.\n\nKey topics: International trade • Exchange rates • Balance of payments • Trade policies • Global interdependence\n\nWhat aspects of international economics interest you most, or what questions do you have about global trade?"
      };
      return welcomeMessages[unit as keyof typeof welcomeMessages] || `Welcome to ${unitInfo.title}! I'm your Socratic AI tutor, ready to help you explore macroeconomics through guided questions and economic analysis.`;
    }
    if (course === 'aphug') {
      const unitInfo = getUnitInfo();
      const welcomeMessages = {
        'unit1': "Welcome to AP Human Geography Unit 1: Thinking Geographically! 🗺️\n\nI'm your Socratic AI tutor. I'll guide your exploration of geographic perspectives and spatial thinking through inquiry.\n\nKey topics: Geographic perspectives • Maps and spatial data • Scale analysis • Human-environment interaction • Fieldwork methods\n\nWhat do you already know about geography as a way of thinking, or what geographic concepts would you like to explore first?",
        'unit2': "Welcome to AP Human Geography Unit 2: Population and Migration Patterns! 👥\n\nI'm your Socratic AI tutor. Let's examine population distribution, demographic changes, and human migration patterns.\n\nKey topics: Population distribution • Demographic transition • Population composition • Migration types • Push and pull factors\n\nWhat interests you about population patterns, or what questions do you have about human migration?",
        'unit3': "Welcome to AP Human Geography Unit 3: Cultural Patterns and Processes! 🎭\n\nI'm your Socratic AI tutor. Let's explore how culture shapes landscapes and creates spatial patterns around the world.\n\nKey topics: Culture components • Cultural diffusion • Language geography • Religion and sacred spaces • Cultural landscapes\n\nWhat would you like to understand about culture and geography, or what aspect of cultural patterns interests you most?",
        'unit4': "Welcome to AP Human Geography Unit 4: Political Patterns and Processes! 🏛️\n\nI'm your Socratic AI tutor. Let's examine political geography, from state formation to boundary disputes.\n\nKey topics: Political power and territory • Boundaries and borders • State shapes • Geopolitics • Governance scales\n\nWhat do you want to learn about political geography, or what questions do you have about how politics shapes space?",
        'unit5': "Welcome to AP Human Geography Unit 5: Agriculture and Rural Land-Use! 🌾\n\nI'm your Socratic AI tutor. Let's explore agricultural systems, food production, and rural landscapes through geographic analysis.\n\nKey topics: Agriculture origins • Agricultural systems • Von Thünen model • Green Revolution • Food security\n\nWhat interests you about agriculture and food systems, or what would you like to explore about rural geography?",
        'unit6': "Welcome to AP Human Geography Unit 6: Cities and Urban Land-Use! 🏙️\n\nI'm your Socratic AI tutor. Let's examine urban geography, city development, and the challenges of urbanization.\n\nKey topics: Urbanization processes • Urban hierarchies • Urban structure models • Urban challenges • Sustainable cities\n\nWhat aspects of urban geography interest you most, or what questions do you have about cities and urban life?",
        'unit7': "Welcome to AP Human Geography Unit 7: Industrial and Economic Development! 🏭\n\nI'm your Socratic AI tutor. Let's explore industrial location, economic development, and global trade patterns through geographic lens.\n\nKey topics: Industrial location • Economic sectors • Development theories • Development indicators • Global trade\n\nWhat would you like to understand about economic geography, or what interests you about global development patterns?"
      };
      return welcomeMessages[unit as keyof typeof welcomeMessages] || `Welcome to ${unitInfo.title}! I'm your Socratic AI tutor, ready to help you explore human geography through guided questions and spatial analysis.`;
    }
    if (course === 'apstat') {
      const unitInfo = getUnitInfo();
      const welcomeMessages = {
        'unit1': "Welcome to AP Statistics Unit 1: Exploring One-Variable Data! 📊\n\nI'm your Socratic AI tutor. I'll guide your exploration of statistical thinking and data analysis through inquiry.\n\nKey topics: Describing distributions • Graphical displays • Numerical summaries • Comparing distributions • Normal distributions\n\nWhat do you already know about statistics, or what interests you about analyzing data?",
        'unit2': "Welcome to AP Statistics Unit 2: Exploring Two-Variable Data! 📈\n\nI'm your Socratic AI tutor. Let's examine relationships between variables and correlation through guided analysis.\n\nKey topics: Scatterplots • Correlation • Least-squares regression • Residual analysis • Data transformations\n\nWhat interests you about relationships between variables, or what questions do you have about correlation and regression?",
        'unit3': "Welcome to AP Statistics Unit 3: Collecting Data! 🎯\n\nI'm your Socratic AI tutor. Let's explore how to gather data properly through surveys and experiments.\n\nKey topics: Sampling methods • Bias in sampling • Experimental design • Principles of experimentation • Observational studies vs experiments\n\nWhat would you like to understand about data collection, or what aspect of surveys and experiments interests you most?",
        'unit4': "Welcome to AP Statistics Unit 4: Probability, Random Variables, and Probability Distributions! 🎲\n\nI'm your Socratic AI tutor. Let's explore the foundations of probability and statistical inference.\n\nKey topics: Probability rules • Random variables • Binomial distribution • Geometric distribution • Normal distribution as model\n\nWhat do you want to learn about probability, or what questions do you have about randomness and distributions?",
        'unit5': "Welcome to AP Statistics Unit 5: Sampling Distributions! 📋\n\nI'm your Socratic AI tutor. Let's examine how sample statistics behave and the Central Limit Theorem.\n\nKey topics: Sampling distributions • Central Limit Theorem • Distribution of sample means • Distribution of sample proportions • Bias and variability\n\nWhat interests you about sampling distributions, or what would you like to explore about the Central Limit Theorem?",
        'unit6': "Welcome to AP Statistics Unit 6: Inference for Categorical Data: Proportions! 🔍\n\nI'm your Socratic AI tutor. Let's explore statistical inference for proportions through hypothesis testing and confidence intervals.\n\nKey topics: Confidence intervals for proportions • Conditions for inference • One-proportion z-procedures • Two-proportion z-procedures • Type I and II errors\n\nWhat aspects of statistical inference interest you most, or what questions do you have about hypothesis testing?",
        'unit7': "Welcome to AP Statistics Unit 7: Inference for Quantitative Data: Means! 📏\n\nI'm your Socratic AI tutor. Let's examine inference procedures for means using the t-distribution.\n\nKey topics: t-distribution • One-sample t-procedures • Two-sample t-procedures • Paired t-procedures • Robustness of procedures\n\nWhat would you like to understand about inference for means, or what interests you about the t-distribution?",
        'unit8': "Welcome to AP Statistics Unit 8: Inference for Categorical Data: Chi-Square! 🧮\n\nI'm your Socratic AI tutor. Let's explore chi-square tests for categorical data analysis.\n\nKey topics: Chi-square goodness of fit • Chi-square independence test • Chi-square homogeneity test • Expected counts • Chi-square distribution\n\nWhat do you want to learn about chi-square tests, or what questions do you have about analyzing categorical data?",
        'unit9': "Welcome to AP Statistics Unit 9: Inference for Quantitative Data: Slopes! 📉\n\nI'm your Socratic AI tutor. Let's examine inference for linear regression and correlation.\n\nKey topics: Conditions for regression inference • Inference for slope • t-test for correlation • Prediction vs confidence intervals • Transformations in regression\n\nWhat interests you about regression inference, or what would you like to explore about statistical relationships?"
      };
      return welcomeMessages[unit as keyof typeof welcomeMessages] || `Welcome to ${unitInfo.title}! I'm your Socratic AI tutor, ready to help you explore statistics through guided questions and data analysis.`;
    }
    if (course === 'apcsp') {
      const unitInfo = getUnitInfo();
      const welcomeMessages = {
        'unit1': "Welcome to AP Computer Science Principles Unit 1: Creative Development! 💻\n\nI'm your Socratic AI tutor. I'll guide your exploration of programming and innovation through inquiry and hands-on thinking.\n\nKey topics: Creative development process • Programming fundamentals • Design thinking • Collaboration in development • Innovation and technology\n\nWhat interests you about programming and creative development, or what would you like to explore about the development process?",
        'unit2': "Welcome to AP Computer Science Principles Unit 2: Data! 📊\n\nI'm your Socratic AI tutor. Let's explore how data is collected, organized, and analyzed to gain insights and solve problems.\n\nKey topics: Data collection methods • Data organization • Data analysis and insights • Data privacy and security • Big data and societal impact\n\nWhat would you like to understand about data and its role in computing, or what questions do you have about data analysis?",
        'unit3': "Welcome to AP Computer Science Principles Unit 3: Algorithms and Programming! 🔢\n\nI'm your Socratic AI tutor. Let's examine algorithmic thinking, programming concepts, and how to implement solutions through code.\n\nKey topics: Algorithmic thinking • Programming languages and tools • Control structures • Data structures and variables • Algorithm efficiency\n\nWhat interests you about algorithms and programming logic, or what programming concepts would you like to explore?",
        'unit4': "Welcome to AP Computer Science Principles Unit 4: Computer Systems and Networks! 🌐\n\nI'm your Socratic AI tutor. Let's explore how computer systems work and how they connect to form global networks.\n\nKey topics: Computer systems architecture • Networks and the Internet • Internet protocols • Cybersecurity fundamentals • Digital divide and access\n\nWhat do you want to learn about computer systems and networks, or what questions do you have about how the Internet works?",
        'unit5': "Welcome to AP Computer Science Principles Unit 5: Impact of Computing! 🔒\n\nI'm your Socratic AI tutor. Let's examine the societal, ethical, and global implications of computing technologies.\n\nKey topics: Computing innovations and society • Ethical issues in computing • Legal and policy issues • Social impact of computing • Global impact and digital citizenship\n\nWhat interests you about the impact of computing on society, or what ethical questions about technology would you like to explore?"
      };
      return welcomeMessages[unit as keyof typeof welcomeMessages] || `Welcome to ${unitInfo.title}! I'm your Socratic AI tutor, ready to help you explore computer science principles through guided questions and computational thinking.`;
    }
    return "Welcome! I'm your Socratic AI tutor, ready to help you learn through guided discussion.";
  };

  useEffect(() => {
    // Only auto-scroll on new messages, with a slight delay to ensure rendering is complete
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  // Redirect to login if not authenticated
  useEffect(() => {
    // Remove authentication requirement for Socratic chat
    // if (!authLoading && !isAuthenticated) {
    //   navigate('/login');
    //   return;
    // }
  }, [authLoading, isAuthenticated, navigate]);

  // Fetch unit topics when component loads
  useEffect(() => {
    if (course && unit && !authLoading) {
      fetchUnitTopics();
    }
  }, [course, unit, authLoading, fetchUnitTopics]);

  // Initialize conversation with welcome message and memory system
  useEffect(() => {
    if ((course === 'apush' || course === 'apgov' || course === 'apworld' || course === 'world' || course === 'apbiology' || course === 'appsychology' || course === 'apmicro' || course === 'apmacro' || course === 'aphug' || course === 'apstat') && unit && !authLoading) {
      // Handle authenticated users with memory system
      if (user) {
        const userId = user.uid; // Use Firebase user ID

        // Initialize user account and memory system
        userMemoryManager.loadUserData(userId);
        userMemoryManager.createOrGetUser(userId);
        
        // Load or create conversation memory
        let memory = userMemoryManager.loadConversationMemory(userId, course, unit);
        if (!memory) {
          memory = userMemoryManager.createConversationMemory(userId, course, unit);
        }
        setConversationMemory(memory);

        // Load previous messages if they exist
        if (memory.messages.length > 0) {
          const loadedMessages = memory.messages.map(msg => ({
            id: msg.id,
            content: msg.content,
            sender: msg.sender,
            timestamp: msg.timestamp
          }));
          setMessages(loadedMessages);
          return; // Don't show welcome message if we have previous conversation
        }

        // Start session tracking
        sessionManager.startChatSession(userId, course, unit);
      }

      // Show welcome message for both authenticated and unauthenticated users
      // Only if there are no previous messages loaded
      if (messages.length === 0) {
        const welcomeMessage: Message = {
          id: '1',
          content: getWelcomeMessage(course, unit),
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
      }
    }
  }, [course, unit, user, authLoading, messages.length]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Update memory with user message
    if (conversationMemory && user) {
      const detectedTopic = detectTopic(inputMessage);
      userMemoryManager.addMessage(user.uid, course!, unit!, {
        id: userMessage.id,
        content: userMessage.content,
        sender: userMessage.sender,
        timestamp: userMessage.timestamp,
        topic: detectedTopic
      });
      
      // Update topic progress
      if (detectedTopic) {
        userMemoryManager.updateTopicProgress(user.uid, course!, unit!, detectedTopic, {
          introduced: true,
          questionsAsked: [...(conversationMemory.topicProgress[detectedTopic]?.questionsAsked || []), inputMessage]
        });
      }
    }
    
    setInputMessage('');
    setIsLoading(true);

    try {
      // This is where we'll call our AI API
      const aiResponse = await getSocraticResponse(inputMessage, messages);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Update memory with AI response
      if (conversationMemory && user) {
        userMemoryManager.addMessage(user.uid, course!, unit!, {
          id: aiMessage.id,
          content: aiMessage.content,
          sender: aiMessage.sender,
          timestamp: aiMessage.timestamp
        });
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Detect topic from user input
  const detectTopic = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('native') || input.includes('indigenous') || input.includes('cahokia') || input.includes('pueblo')) {
      return 'nativeAmericans';
    } else if (input.includes('motivation') || input.includes('why') || input.includes('god') || input.includes('gold') || input.includes('glory')) {
      return 'europeanMotivations';
    } else if (input.includes('spanish') || input.includes('conquistador') || input.includes('encomienda') || input.includes('cortés') || input.includes('pizarro')) {
      return 'spanishColonization';
    } else if (input.includes('exchange') || input.includes('disease') || input.includes('crops') || input.includes('animals') || input.includes('columbian')) {
      return 'columbianExchange';
    }
    
    return 'general';
  };

  // Call our AI API for Socratic responses
  const getSocraticResponse = async (userInput: string, conversationHistory: Message[]): Promise<string> => {
    try {
      // Detect topic for better content targeting
      const detectedTopic = detectTopic(userInput);
      
      // Update session with detected topic (only if user is logged in)
      if (user) {
        try {
          sessionManager.updateChatSession(user.uid, course!, unit!, detectedTopic);
        } catch (sessionError) {
          console.warn('Session manager error (non-critical):', sessionError);
        }
      }

      // Always use deployed backend - it's ready and working
      const API_BASE = 'https://ap-helper-2d9f117e9bdb.herokuapp.com';

      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${API_BASE}/api/chat/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user ? getAuthHeaders() : {})
        },
        body: JSON.stringify({
          message: userInput,
          conversationHistory: conversationHistory,
          course: course,
          unit: unit,
          userId: user?.uid || 'anonymous',
          detectedTopic: detectedTopic
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Handle progress updates from AI
      if (data.progressUpdate && Object.keys(data.progressUpdate).length > 0 && user) {
        Object.entries(data.progressUpdate).forEach(([topic, updates]: [string, any]) => {
          userMemoryManager.updateTopicProgress(user.uid, course!, unit!, topic, {
            introduced: updates.introduced || false,
            practiced: updates.practiced || false,
            mastered: updates.mastered || false,
            conceptsLearned: updates.concepts_learned || updates.conceptsLearned || [],
            ready_for_assessment: updates.ready_for_assessment || false,
            advanced_thinking: updates.advanced_thinking || false,
            questionsAsked: updates.questionsAsked || []
          });
        });
        
        // Update overall progress if provided
        if (data.overallProgress !== undefined) {
          const updatedMemory = userMemoryManager.loadConversationMemory(user.uid, course!, unit!);
          if (updatedMemory) {
            updatedMemory.overallProgress.completionPercentage = data.overallProgress;
            updatedMemory.overallProgress.readyForAssessment = data.readyForFinalAssessment || false;
            setConversationMemory(updatedMemory);
          }
        }
        
        // Refresh conversation memory to show updated progress
        const updatedMemory = userMemoryManager.loadConversationMemory(user.uid, course!, unit!);
        if (updatedMemory) {
          setConversationMemory(updatedMemory);
        }
      }
      
      // Handle quiz if provided
      if (data.quiz) {
        setCurrentQuiz(data.quiz);
      }
      
      return data.response;
    } catch (error) {
      console.error('Error calling AI API:', error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return "I'm taking a bit longer than usual to respond. Let me try to give you a helpful answer about this topic instead.";
        }
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          return "I'm having trouble connecting to the server right now. Please check your internet connection and try again.";
        }
      }
      
      // Fallback to topic-specific Socratic questions
      return getFallbackSocraticResponse(userInput);
    }
  };

  // Fallback Socratic responses when API is unavailable
  const getFallbackSocraticResponse = (userInput: string): string => {
    const topic = detectTopic(userInput);
    const topicData = APUSH_UNIT1_CONTENT.topics[topic as keyof typeof APUSH_UNIT1_CONTENT.topics];
    
    if (topicData && topicData.socraticQuestions.length > 0) {
      const randomQuestion = topicData.socraticQuestions[Math.floor(Math.random() * topicData.socraticQuestions.length)];
      return `That's an interesting point! ${randomQuestion} What evidence can you think of to support your reasoning?`;
    }
    
    return "That's a thoughtful observation! What led you to that conclusion? Can you think of any specific examples or evidence that supports your thinking?";
  };

  // Quiz handling functions
  const handleQuizAnswer = async (selectedAnswer: number) => {
    if (!currentQuiz) return;
    
    setQuizAnswer(selectedAnswer);
    setShowQuizResult(true);
    
    try {
      // Always use deployed backend - it's ready and working
      const API_BASE = 'https://ap-helper-2d9f117e9bdb.herokuapp.com';
        
      const response = await fetch(`${API_BASE}/api/quiz/answer`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        },
        body: JSON.stringify({
          userId: user?.uid,
          topic: detectTopic(messages[messages.length - 1]?.content || ''),
          selectedAnswer: selectedAnswer,
          correctAnswer: currentQuiz.correct,
          course: course,
          unit: unit
        })
      });
      
      const result = await response.json();
      
      // Update progress based on quiz result
      if (result.progressUpdate && Object.keys(result.progressUpdate).length > 0 && user) {
        Object.entries(result.progressUpdate).forEach(([topic, updates]) => {
          userMemoryManager.updateTopicProgress(user.uid, course!, unit!, topic, updates as any);
        });
        
        // Refresh conversation memory
        const updatedMemory = userMemoryManager.loadConversationMemory(user.uid, course!, unit!);
        if (updatedMemory) {
          setConversationMemory(updatedMemory);
        }
      }
      
      // Add quiz result as AI message
      setTimeout(() => {
        const resultMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: result.message + (selectedAnswer === currentQuiz.correct ? '' : `\n\n💡 ${currentQuiz.explanation}`),
          sender: 'ai',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, resultMessage]);
        
        // Clear quiz after showing result
        setTimeout(() => {
          setCurrentQuiz(null);
          setQuizAnswer(null);
          setShowQuizResult(false);
        }, 3000);
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting quiz answer:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const unitInfo = getUnitInfo();

  // Show loading while auth is being checked
  if (authLoading) {
    return (
      <div className="h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-slate-600 mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // Remove login requirement - allow unauthenticated access
  // Show login required message if not authenticated
  // if (!isAuthenticated) {
  //   return (
  //     <div className="h-screen bg-slate-50 flex items-center justify-center">
  //       <div className="text-center">
  //         <h2 className="text-xl font-semibold text-slate-900 mb-2">Login Required</h2>
  //         <p className="text-slate-600 mb-4">Please log in to access the Socratic tutor.</p>
  //         <button 
  //           onClick={() => navigate('/login')}
  //           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  //         >
  //           Go to Login
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // Restart conversation function
  const handleRestartClick = () => {
    setShowRestartConfirm(true);
  };

  const confirmRestart = () => {
    // Clear current messages
    setMessages([]);
    setInputMessage('');
    setCurrentQuiz(null);
    setQuizAnswer(null);
    setShowQuizResult(false);
    setShowRestartConfirm(false);
    
    // Clear memory from localStorage and reset progress
    if (user && course && unit) {
      const memoryKey = `memory_${user.uid}_${course}_${unit}`;
      localStorage.removeItem(memoryKey);
      
      // Create fresh conversation memory
      const newMemory = userMemoryManager.createConversationMemory(user.uid, course, unit);
      setConversationMemory(newMemory);
      
      // Start new session
      sessionManager.startChatSession(user.uid, course, unit);
      
      // Show fresh welcome message
      const welcomeMessage: Message = {
        id: '1',
        content: getWelcomeMessage(course, unit),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const cancelRestart = () => {
    setShowRestartConfirm(false);
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/socratic-learning')}
              className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Units</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="text-2xl">{unitInfo.emoji}</div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">{unitInfo.title}</h1>
                <p className="text-sm text-slate-600">{unitInfo.period}</p>
              </div>
            </div>

            <button
              onClick={handleRestartClick}
              className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border border-slate-200 hover:border-orange-200"
              title="Start fresh conversation and reset progress"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl mx-auto w-full min-h-0 max-h-[calc(100vh-140px)]">
        {/* Progress Sidebar */}
        <div className="w-80 bg-white border-r border-slate-200 p-4 overflow-y-auto flex-shrink-0">
          <div className="space-y-4">
            {/* Quick Start Guide */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                💡 Need Help Getting Started?
              </h3>
              <p className="text-xs text-blue-800 mb-2">Try saying:</p>
              <div className="space-y-1">
                <button 
                  onClick={() => setInputMessage("I don't know anything about this")}
                  className="block w-full text-left text-xs bg-white border border-blue-200 rounded px-2 py-1 hover:bg-blue-100 transition-colors"
                >
                  "I don't know anything about this"
                </button>
                <button 
                  onClick={() => setInputMessage("Can you explain what happened?")}
                  className="block w-full text-left text-xs bg-white border border-blue-200 rounded px-2 py-1 hover:bg-blue-100 transition-colors"
                >
                  "Can you explain what happened?"
                </button>
                <button 
                  onClick={() => setInputMessage("Please help me understand")}
                  className="block w-full text-left text-xs bg-white border border-blue-200 rounded px-2 py-1 hover:bg-blue-100 transition-colors"
                >
                  "Please help me understand"
                </button>
              </div>
              <p className="text-xs text-blue-700 mt-2 italic">These will get you helpful overviews instead of just questions!</p>
            </div>

            {/* Unit Topics List */}
            <div>
              <h3 className="text-md font-semibold text-slate-900 mb-3 flex items-center gap-2">
                📚 {unit?.toUpperCase()} Topics
              </h3>
              
              <div className="space-y-2">
                {topicsLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-xs text-slate-500 mt-2">Loading topics...</p>
                  </div>
                ) : unitTopics.length > 0 ? (
                  unitTopics.map((topic, index) => {
                    // Check if this topic has been discussed in conversation memory
                    const topicProgress = conversationMemory?.topicProgress?.[topic.key];
                    const isActive = topicProgress?.introduced || false;
                    const isMastered = topicProgress?.mastered || false;
                    
                    return (
                      <div 
                        key={topic.key} 
                        className={`p-3 border rounded-lg transition-all duration-200 hover:shadow-sm cursor-pointer ${
                          isActive 
                            ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                        onClick={() => setInputMessage(`Tell me about ${topic.title.toLowerCase()}`)}
                        title={`Click to ask about ${topic.title}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mt-1 ${
                            isMastered 
                              ? 'bg-green-500 text-white' 
                              : isActive 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-slate-200 text-slate-600'
                          }`}>
                            {isMastered ? '✓' : index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className={`text-sm font-medium leading-tight mb-1 ${
                              isActive ? 'text-blue-900' : 'text-slate-900'
                            }`}>
                              {topic.title}
                            </h5>
                            <div className={`text-xs ${isActive ? 'text-blue-700' : 'text-slate-600'} mb-2`}>
                              {topic.keyFacts.length} key concepts
                            </div>
                            
                            {/* Show progress indicator */}
                            {isActive && (
                              <div className={`text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 ${
                                isMastered 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {isMastered ? '🎓 Mastered' : '📖 In Progress'}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center text-slate-500 text-sm py-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                    <div className="text-2xl mb-2">🤖✨</div>
                    <p className="font-medium text-slate-700">Socratic AI Ready</p>
                    <p className="text-xs mt-1 text-slate-600">Advanced AI tutor available for all topics</p>
                    <p className="text-xs mt-1 text-blue-600">Start chatting below to explore any concept!</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-md font-semibold text-slate-900 mb-3">Learning Progress</h3>
              
              {conversationMemory && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-slate-600">{unit?.toUpperCase()} Mastery Progress</span>
                    <span className="font-medium text-slate-900">
                      {Math.round(conversationMemory.overallProgress.completionPercentage)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        conversationMemory.overallProgress.completionPercentage >= 80 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : conversationMemory.overallProgress.completionPercentage >= 50
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                          : 'bg-gradient-to-r from-slate-400 to-blue-500'
                      }`}
                      style={{ width: `${conversationMemory.overallProgress.completionPercentage}%` }}
                    />
                  </div>
                  
                  {/* Completion Status */}
                  {conversationMemory.overallProgress.completionPercentage >= 80 && (
                    <div className="mt-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🎓</span>
                        <span className="font-semibold text-green-800">{unit?.toUpperCase()} Mastery Achieved!</span>
                      </div>
                      <p className="text-sm text-green-700 mb-3">
                        Congratulations! You've mastered most of {unit?.toUpperCase()}. You're ready for the comprehensive assessment.
                      </p>
                      <button
                        onClick={() => {
                          if (course === 'apush') {
                            navigate(`/apush-study-guide/unit/${unit?.replace('unit', '')}/quiz`);
                          } else if (course === 'apgov') {
                            navigate(`/ap-gov-unit/${unit?.replace('unit', '')}`);
                          }
                        }}
                        className="w-full px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-md"
                      >
                        Take Final Assessment →
                      </button>
                    </div>
                  )}
                  
                  {/* Progress Milestones */}
                  {conversationMemory.overallProgress.completionPercentage < 80 && (
                    <div className="mt-3 text-xs text-slate-500">
                      {conversationMemory.overallProgress.completionPercentage < 25 && "🌱 Just getting started - keep exploring!"}
                      {conversationMemory.overallProgress.completionPercentage >= 25 && conversationMemory.overallProgress.completionPercentage < 50 && "📚 Building understanding - great progress!"}
                      {conversationMemory.overallProgress.completionPercentage >= 50 && conversationMemory.overallProgress.completionPercentage < 80 && "🎯 Almost there - pushing toward mastery!"}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-900 mb-2">Learning Topics</h4>
              <div className="space-y-2">
                {conversationMemory && Object.entries(conversationMemory.topicProgress).length > 0 ? 
                  Object.entries(conversationMemory.topicProgress).map(([key, progress]) => {
                    const status = progress?.mastered ? 'mastered' : progress?.practiced ? 'practiced' : progress?.introduced ? 'introduced' : 'not-started';
                    
                    return (
                      <div key={key} className="bg-white border border-slate-200 rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <div className={`w-4 h-4 rounded-full mt-0.5 flex-shrink-0 flex items-center justify-center ${
                            status === 'mastered' ? 'bg-green-500' :
                            status === 'practiced' ? 'bg-blue-500' :
                            status === 'introduced' ? 'bg-yellow-500' :
                            'bg-slate-300'
                          }`}>
                            {status === 'mastered' && <span className="text-white text-xs">✓</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="text-sm font-medium text-slate-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                              <span className={`text-xs font-medium px-2 py-1 rounded ${
                                status === 'mastered' ? 'bg-green-100 text-green-700' :
                                status === 'practiced' ? 'bg-blue-100 text-blue-700' :
                                status === 'introduced' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                {status === 'mastered' ? 'Mastered' :
                                 status === 'practiced' ? 'Practiced' :
                                 status === 'introduced' ? 'Learning' :
                                 'Not Started'}
                              </span>
                            </div>
                            <div className="text-xs text-slate-600">
                              📚 Concepts learned: {progress?.conceptsLearned?.length || 0}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }) : (
                    <div className="text-center text-slate-500 text-sm py-4">
                      Start learning to see your progress here!
                    </div>
                  )
                }
              </div>
            </div>

            {conversationMemory?.overallProgress.strongAreas && conversationMemory.overallProgress.strongAreas.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-slate-900 mb-3">Strong Areas</h4>
                <div className="space-y-1">
                  {conversationMemory.overallProgress.strongAreas.map(area => (
                    <div key={area} className="text-sm text-green-700 bg-green-50 px-3 py-1 rounded-full">
                      ✓ {APUSH_UNIT1_CONTENT.topics[area as keyof typeof APUSH_UNIT1_CONTENT.topics]?.title || area}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {conversationMemory?.overallProgress.needsReview && conversationMemory.overallProgress.needsReview.length > 0 && (
              <div>
                <h4 className="text-md font-medium text-slate-900 mb-3">Needs Review</h4>
                <div className="space-y-1">
                  {conversationMemory.overallProgress.needsReview.map(area => (
                    <div key={area} className="text-sm text-orange-700 bg-orange-50 px-3 py-1 rounded-full">
                      ⚠ {APUSH_UNIT1_CONTENT.topics[area as keyof typeof APUSH_UNIT1_CONTENT.topics]?.title || area}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Unit Quiz Link */}
            <div className="border-t pt-4">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">📝</span>
                  <h4 className="text-md font-semibold text-emerald-900">{unit?.toUpperCase()} Comprehensive Quiz</h4>
                </div>
                <p className="text-sm text-emerald-800 mb-3">
                  Ready to test your knowledge? Take the official {course?.toUpperCase()} {unit?.toUpperCase()} {course === 'apush' ? 'quiz with document-based questions and detailed explanations' : 'study guide with comprehensive content and practice questions'}.
                </p>
                <button
                  onClick={() => {
                    if (course === 'apush') {
                      navigate(`/apush-study-guide/unit/${unit?.replace('unit', '')}/quiz`);
                    } else if (course === 'apgov') {
                      navigate(`/ap-gov-unit/${unit?.replace('unit', '')}`);
                    } else if (course === 'apworld' || course === 'world') {
                      navigate(`/ap-world-study-guide/unit/${unit?.replace('unit', '')}`);
                    } else if (course === 'apbiology') {
                      navigate(`/ap-biology/unit/${unit?.replace('unit', '')}`);
                    } else if (course === 'appsychology') {
                      navigate(`/ap-psychology/unit/${unit?.replace('unit', '')}`);
                    } else if (course === 'apmicro') {
                      navigate(`/ap-microeconomics/unit/${unit?.replace('unit', '')}`);
                    } else {
                      // Fallback for any other courses
                      console.log(`Navigation not implemented for course: ${course}`);
                      alert(`Study guide for ${course?.toUpperCase()} ${unit?.toUpperCase()} is coming soon!`);
                    }
                  }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
                >
                  Take {unit?.toUpperCase()} {course === 'apush' ? 'Quiz' : 'Study Guide'} →
                </button>
                <p className="text-xs text-emerald-700 mt-2 text-center">
                  {course === 'apush' ? '10 questions • Historical documents • Instant feedback' : 'Comprehensive content • Practice questions • Key concepts'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          <div className="flex-1 px-4 py-3 overflow-y-auto min-h-0">
            <div className="space-y-3 pb-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
              )}
              
              <div
                className={`max-w-xl px-3 py-2 rounded-2xl text-sm ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-slate-900 rounded-bl-sm shadow-sm border'
                }`}
              >
                <div className="leading-relaxed">
                  {message.sender === 'ai' ? (
                    <ReactMarkdown 
                      components={{
                        // Customize how different markdown elements are rendered with explicit styling
                        strong: ({...props}) => <strong style={{ fontWeight: 'bold', color: '#1e293b' }} className="font-extrabold" {...props} />,
                        em: ({...props}) => <em className="italic" {...props} />,
                        ul: ({...props}) => <ul className="list-disc list-inside space-y-1 my-2" {...props} />,
                        ol: ({...props}) => <ol className="list-decimal list-inside space-y-1 my-2" {...props} />,
                        li: ({...props}) => <li className="ml-2" {...props} />,
                        p: ({...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        h3: ({...props}) => <h3 style={{ fontWeight: 'bold' }} className="font-extrabold text-lg mb-2" {...props} />,
                        h4: ({...props}) => <h4 style={{ fontWeight: 'bold' }} className="font-extrabold text-base mb-1" {...props} />
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
                <p className={`text-xs mt-1 opacity-75 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-slate-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-slate-600" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="bg-white text-slate-900 rounded-2xl rounded-bl-sm shadow-sm border px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {/* Quiz Component */}
          {currentQuiz && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">?</span>
                </div>
                <h4 className="font-semibold text-blue-900">Quick Knowledge Check!</h4>
              </div>
              
              <p className="text-sm text-blue-800 mb-3 font-medium">{currentQuiz.question}</p>
              
              <div className="space-y-2">
                {currentQuiz.options.map((option, index) => {
                  let buttonClass = "w-full text-left px-3 py-2 text-sm rounded-xl border transition-all duration-200";
                  
                  if (showQuizResult) {
                    if (index === currentQuiz.correct) {
                      buttonClass += " bg-green-100 border-green-300 text-green-800";
                    } else if (index === quizAnswer && index !== currentQuiz.correct) {
                      buttonClass += " bg-red-100 border-red-300 text-red-800";
                    } else {
                      buttonClass += " bg-gray-100 border-gray-200 text-gray-600";
                    }
                  } else {
                    buttonClass += " bg-white border-blue-200 text-blue-900 hover:bg-blue-100 hover:border-blue-300";
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => !showQuizResult && handleQuizAnswer(index)}
                      disabled={showQuizResult}
                      className={buttonClass}
                    >
                      {String.fromCharCode(65 + index)}. {option}
                    </button>
                  );
                })}
              </div>
              
              {showQuizResult && (
                <div className="mt-3 text-xs text-blue-700">
                  {quizAnswer === currentQuiz.correct ? "🎉 Correct! Great job!" : "❌ Not quite right, but keep learning!"}
                </div>
              )}
            </div>
          )}
            </div>
            <div ref={messagesEndRef} />
          </div>
        </div>
      
      </div> {/* Close main flex container */}

      {/* Restart Confirmation Modal */}
      {showRestartConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Restart Conversation?</h3>
            </div>
            
            <p className="text-slate-600 mb-6">
              This will clear your entire conversation history and reset all learning progress for this unit. 
              You'll start completely fresh with a new welcome message.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelRestart}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmRestart}
                className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded-lg transition-colors"
              >
                Yes, Restart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t shadow-lg flex-shrink-0 max-h-32">
        <div className="max-w-7xl mx-auto flex">
          <div className="w-80 flex-shrink-0"></div> {/* Spacer for sidebar */}
          <div className="flex-1 px-4 py-3">
            <div className="flex gap-3 items-end">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts or ask a question..."
                className="w-full px-3 py-2 border border-slate-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={1}
                style={{ minHeight: '40px', maxHeight: '80px' }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-3 py-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-10"
            >
              <Send className="w-4 h-4" />
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocraticChat;
