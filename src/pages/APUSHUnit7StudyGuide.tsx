import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TimelineEvent {
    key: string;
    icon: string;
    title: string;
    summary: string;
    details: string[];
}

const unit7Content = [
    {
        key: '7.2',
        title: '7.2 – Imperial Expansion',
        bullets: [[
            '**What is Imperialism?**',
            "Defined as a country's political, economic, and military expansion over others.",
            'U.S. initially denied being an empire, but its actions suggested otherwise.',
            '',
            '**Early U.S. Imperialist Moves**',
            'Alaska Purchase (1867) by William Seward for $7.2 million, mocked as “Seward’s Folly” until gold was discovered.',
            '',
            '**Reasons for Imperialism**',
            'Strategic: Establish naval bases; support the Panama Canal project.',
            'Ideological: Social Darwinism and “White Man’s Burden” to civilize others.',
            'Economic: Secure overseas markets and raw materials.',
            'Political: Compete with imperial powers like Britain, France, Japan.',
            '',
            '**Imperialist Arguments**',
            'Advocated for global economic dominance and expansion.',
            'Josiah Strong supported racial/religious motives (Anglo-Saxonism).',
            'Alfred Thayer Mahan argued for a strong navy to access foreign markets.',
            'Brooks Adams predicted America would become a world power.',
            '',
            '**Anti-Imperialist League**',
            'Opposed expansion on grounds of self-determination, anti-war, and racism.',
            'Raised constitutional concerns: Did rights apply in colonies?',
            "Echoed Washington's Farewell Address on foreign entanglements.",
            '',
            '**Big Stick Diplomacy (Theodore Roosevelt)**',
            '"Speak softly and carry a big stick": Combine diplomacy and military might.',
            'Helped Panama secede from Colombia to build the Panama Canal.',
            'Roosevelt Corollary: US can intervene in Latin America to protect stability.',
            'Mediated Russo-Japanese War, sent Great White Fleet to show U.S. strength.',
        ]],
    },
    {
        key: '7.3',
        title: '7.3 – The Spanish-American War',
        bullets: [[
            '**Causes of War**',
            'American interest in Cuba, a Spanish colony.',
            'Cuban nationalists resisted Spain (1895).',
            'Yellow Journalism (Pulitzer & Hearst) exaggerated Spanish atrocities.',
            'U.S.S. Maine exploded in Havana Harbor → Blamed on Spain.',
            'Jingoism (war-focused patriotism) grew.',
            '',
            '**Key Events and Outcomes**',
            'Teller Amendment: US won’t annex Cuba.',
            'Short war ("A Splendid Little War"); key win at San Juan Hill.',
            'Treaty of Paris (1898): US gained Guam, Puerto Rico, Philippines.',
            'Led to anti-imperialism backlash.',
            '',
            '**New U.S. Territories**',
            'Cuba: Platt Amendment allowed U.S. intervention and Guantanamo Bay.',
            'Puerto Rico: Limited self-rule; citizenship in 1917 (Foraker Act).',
            'Philippines: Bought for $20M. Emilio Aguinaldo led revolt; U.S. suppressed rebellion. Independence granted in 1946.',
            '',
            '**Pacific Expansion**',
            'Hawaii annexed in 1898 despite resistance from Queen Liliuokalani.',
            'Driven by sugar interests and military strategy.',
            'Signaled larger imperial ambitions.',
            '',
            '**China & the Open Door**',
            'Open Door Policy (John Hay): Equal trade rights in China.',
            'Boxer Rebellion: Anti-foreigner uprising; U.S. joined suppression effort.',
        ]],
    },
    {
        key: '7.4',
        title: '7.4 – The Dawn of Progressivism',
        bullets: [[
            '**Progressive Movement Basics**',
            'Sought to fix issues from industrialization, urbanization, immigration.',
            'Not radical: Wanted to reform capitalism, not replace it.',
            'Opposed laissez-faire policies.',
            'Middle-class driven but diverse.',
            '',
            '**Progressive Concerns**',
            "Corporate power, labor conflict, political machines, Jim Crow laws, women's rights, temperance.",
            "Belief: Government must act for society's good.",
            '',
            '**Muckrakers**',
            'Exposed corruption:',
            'Upton Sinclair – The Jungle (meat industry).',
            'Ida Tarbell – Standard Oil.',
            'Jacob Riis – How the Other Half Lives (tenements).',
            '',
            '**Political Reforms**',
            'Secret ballot, direct election of senators (17th Amendment).',
            'Amendments:',
            '  • 16th: Income tax.',
            '  • 17th: Direct election of senators.',
            '  • 18th: Prohibition.',
            '  • 19th: Women’s suffrage.',
            '',
            '**Feminism & Labor**',
            'National Consumers League, Child Labor Committee.',
            'Muller v. Oregon: Protected 10-hr workdays for women.',
            'Triangle Shirtwaist Fire: Led to safety reforms.',
            'Fordism: Assembly line model.',
            'Collective bargaining, IWW (Industrial Workers of the World).',
            '',
            '**Women’s Rights Movements**',
            'NAWSA (Carrie Chapman Catt): State-by-state strategy.',
            'National Woman\'s Party (Alice Paul): National amendment.',
            'Led to 19th Amendment (1920).',
            '',
            '**Temperance**',
            'WCTU, Anti-Saloon League pushed for Prohibition.',
            '',
            '**Roosevelt’s Square Deal**',
            '3 C’s: Control corporations, Consumer protection, Conservation.',
            'Trust busting (Sherman Antitrust Act).',
            'Passed Meat Inspection Act, Pure Food & Drug Act.',
            'Conservationists: John Muir, Gifford Pinchot.',
            '',
            '**Taft & Party Split**',
            "Continued reforms; Dollar Diplomacy encouraged U.S. investments abroad.",
            'Scandals (Ballinger-Pinchot) alienated progressives.',
            'Led to 1912 split:',
            '  • Bull Moose Party (Roosevelt).',
            '  • New Nationalism vs. New Freedom (Wilson).',
            '  • Eugene Debs ran as a Socialist.',
            '',
            '**Wilson’s Reforms**',
            'Attacked "Triple Wall of Privilege": Tariffs, banks, trusts.',
            'Underwood Tariff (cuts).',
            'Clayton Antitrust Act, FTC.',
            'Federal Reserve Act.',
            'Other: Adamson Act (8-hr workday), Child Labor Act, Federal Farm Loan Act.',
            '',
            '**Race & Progressivism**',
            'Progressives mostly ignored Black civil rights.',
            'Booker T. Washington: Economic independence, Tuskegee Institute.',
            'W.E.B. Du Bois: Immediate equality, Niagara Movement, NAACP.',
            'Ida B. Wells: Anti-lynching, suffrage.',
            '',
            '**Diplomacy**',
            'Wilson promoted democracy abroad but still intervened (Mexico).',
            'Roosevelt: Panama Canal, Big Stick Policy, Roosevelt Corollary.',
        ]],
    },
    {
        key: '7.5',
        title: '7.5 – World War I',
        bullets: [[
            '**Causes of War (MAIN)**',
            'Militarism, Alliances, Imperialism, Nationalism.',
            'Spark: Archduke Franz Ferdinand assassinated (1914).',
            'Allied Powers: Britain, France, Russia.',
            'Central Powers: Germany, Austria-Hungary, Italy.',
            '',
            '**U.S. Neutrality**',
            'Wanted peace, but:',
            'Lusitania sinking (1915).',
            'Zimmermann Telegram (Germany to Mexico).',
            'Germany resumed unrestricted sub warfare.',
            '',
            '**U.S. Enters the War (1917)**',
            'Wilson: Make the world “safe for democracy”.',
            '“War to end all wars”.',
            '',
            '**War Effort**',
            'Selective Service Act: Draft.',
            'AEF led by John J. Pershing.',
            'Turned tide on Western Front.',
            '',
            '**Treaty of Versailles**',
            'Armistice: November 11, 1918.',
            'Wilson’s 14 Points: Self-determination, League of Nations.',
            'France and Britain wanted punishment and reparations for Germany.',
            'U.S. Senate (led by Henry Cabot Lodge) refused to ratify.',
        ]],
    },
    {
        key: '7.6',
        title: '7.6 – World War I at Home',
        bullets: [[
            '**Total War & Mobilization**',
            'Increased income taxes, liberty bonds.',
            'Created agencies:',
            '  • War Industries Board.',
            '  • National War Labor Board.',
            '  • Food Administration.',
            '',
            '**Workforce Changes**',
            'Great Migration: African Americans moved north for jobs.',
            'Urbanization intensified.',
            '',
            '**Civil Liberties**',
            'Espionage Act (1917), Sedition Act (1918).',
            'Eugene Debs jailed.',
            'Schenck v. U.S.: Free speech limited during wartime.',
            '',
            '**Propaganda & Pandemic**',
            'Committee on Public Information led by George Creel.',
            'Spanish Flu outbreak killed millions; media downplayed it.',
            '',
            '**Red Scare**',
            'Fear of communism after Russian Revolution.',
            'Palmer Raids: Mass arrests of suspected radicals.',
            'Rise in nativism, xenophobia.',
            '',
            '**Immigration Policies**',
            'Emergency Quota Act (1921), National Origins Act (1924).',
            'Targeted Eastern/Southern Europeans and Asians.',
            'Anti-German backlash: German culture censored.',
            '',
            '**Race Relations**',
            'Race riots, Tulsa Massacre (1921).',
            'KKK resurgence.',
            'W.E.B. Du Bois vs. Booker T. Washington.',
            'Rise of NAACP, Cultural pluralism promoted tolerance.',
            '',
            '**Puerto Rico & Foreign Policy**',
            'Puerto Ricans were citizens but couldn’t vote; still drafted.',
            'Gentlemen’s Agreement: Japan limited emigration.',
            'Anti-Asian land laws in California.',
        ]],
    },
    {
        key: '7.7',
        title: '7.7 – Technology',
        bullets: [[
            '**Henry Ford and the Automobile**',
            'Introduced the Model T, the first affordable car.',
            'Assembly line (1913) revolutionized production efficiency.',
            'Allowed unskilled labor to replace skilled labor.',
            '',
            '**Efficiency & Industry**',
            'Prices dropped across industries due to faster production.',
            'Great Steel Strike backlash led to anti-union sentiment.',
            '',
            '**Scientific Management**',
            'Frederick Taylor introduced time studies to streamline labor.',
            'Applied efficiency principles to all industries.',
            '',
            '**Social Impacts of Automobiles**',
            '1920s: Americans owned 80% of world’s cars.',
            'Boosted suburban growth and reshaped cities like LA and Houston.',
            '',
            '**Consumerism and Mass Production**',
            'Spread to appliances: radios, toasters, etc.',
            'Rising standard of living and booming advertising industry.',
            '',
            '**Prohibition**',
            'Support: discipline, order, anti-German sentiment, temperance.',
            'Opposition: tax revenue loss, crime, corruption increased.',
            '',
            '**Advertising Evolution**',
            'Psychology-based ads influenced by Freud.',
            'Appealed to emotion and self-image.',
            '',
            '**Radio and Cinema**',
            '600 radio stations by 1923; unified national culture.',
            'Films like The Jazz Singer ushered in sound era.',
            '',
            '**Culture and Identity**',
            'Harlem Renaissance pushed back against cultural erasure.',
            'Media unintentionally highlighted racial/regional divides.',
        ]],
    },
    {
        key: '7.8',
        title: '7.8 – Culture',
        bullets: [[
            '**Urbanization and Women**',
            'Over 50% lived in cities by 1920.',
            'Women gained nursing, teaching, and factory work.',
            'Flappers challenged social norms.',
            '',
            '**Immigration and Nativism**',
            'Southern/Eastern Europeans & Asians faced backlash.',
            'Laws:',
            'Emergency Quota Act (1921): 3% cap based on 1910 census',
            'National Origins Act (1924): stricter limits',
            '',
            '**The Great Migration & Harlem Renaissance**',
            'Black Americans moved North (e.g., Harlem).',
            'Jazz and literature flourished: Hughes, Ellington, Zora Neale Hurston.',
            '',
            '**Lost Generation**',
            'Disillusioned authors like Fitzgerald and Hemingway criticized materialism and WWI.',
            '',
            '**Urban vs Rural Divide**',
            'Modernists (urban): embraced science/evolution.',
            'Fundamentalists (rural): defended traditional values.',
            '',
            '**Scopes Monkey Trial (1925)**',
            'John Scopes tried for teaching evolution.',
            'Darrow vs Bryan — symbolic modernism win, but Scopes was convicted.',
        ]],
    },
    {
        key: '7.9',
        title: '7.9 – The Great Depression (Part 1)',
        bullets: [[
            '**Stock Market Crash (1929)**',
            'Black Tuesday: October 29, 1929.',
            'Preceded by over-speculation and buying on margin.',
            '',
            '**Economic Weaknesses**',
            'Farm overproduction → debt crisis.',
            'Hawley-Smoot Tariff (1930) worsened global trade.',
            'Wealth inequality and over-reliance on credit.',
            '',
            '**Impacts**',
            'Mass unemployment and homelessness.',
            'Rise of Hoovervilles (shantytowns).',
        ]],
    },
    {
        key: '7.10',
        title: '7.10 – The Great Depression (Part 2)',
        bullets: [[
            '**1932 Election**',
            'FDR (Democrat) defeats Hoover (Republican).',
            'Promises government intervention.',
            '',
            '**New Deal Goals**',
            'Relief for the needy.',
            'Recovery for the economy.',
            'Reform of institutions.',
            '',
            '**Major Programs**',
            'CCC: environmental work',
            'PWA/TVA: infrastructure and electricity',
            'NIRA: minimum wage, hours',
            'SEC: regulate stock market',
            'Social Security Act (1935): retirement safety net',
            '',
            '**Criticisms**',
            'Too liberal for conservatives, too conservative for radicals.',
            'Court-packing plan faced backlash.',
            '',
            '**Legacy**',
            'Institutional reforms.',
            'Democratic coalition expanded to Black voters and laborers.',
        ]],
    },
    {
        key: '7.11',
        title: '7.11 – Entering the War',
        bullets: [[
            '**Isolationism**',
            'America First Committee opposed war.',
            'Harding’s “Return to Normalcy” reflected isolationist mood.',
            '',
            '**Policies**',
            'Fordney-McCumber and Smoot-Hawley Tariffs raised trade barriers.',
            'Kellogg-Briand Pact (no war, but no enforcement).',
            '',
            '**Global Threats**',
            'Rise of fascist powers: Mussolini, Hitler, Japanese militarists.',
            'U.S. stayed neutral in Spanish Civil War.',
            '',
            '**FDR\'s Strategy**',
            'Lend-Lease, Destroyers-for-Bases, Cash and Carry.',
            'Believed in Four Freedoms.',
            '',
            '**Pearl Harbor (Dec 7, 1941)**',
            'Japan’s surprise attack killed 2,400+ Americans.',
            'U.S. declares war on Japan; Germany declares war on U.S.',
            '',
            '**Atlantic Charter**',
            'FDR + Churchill’s vision: self-determination, free trade, UN.',
        ]],
    },
    {
        key: '7.12',
        title: '7.12 – The Homefront',
        bullets: [[
            '**Mobilization**',
            'War Production Board, OPA, War Labor Board.',
            'GDP rose by 15%, ended Great Depression.',
            '',
            '**Labor & Women**',
            'Women filled factory roles (“Rosie the Riveter”).',
            'Rationing and war bonds common.',
            '',
            '**Double V Campaign**',
            'Black Americans fought racism at home and fascism abroad.',
            'Executive Order 8022 banned racial discrimination in defense jobs.',
            '',
            '**Japanese Internment**',
            'Executive Order 9066 created internment camps.',
            'Korematsu v. U.S. (1944) upheld it as constitutional.',
            'Formal apology in 1988.',
        ]],
    },
    {
        key: '7.13',
        title: '7.13 – The Fighting',
        bullets: [[
            '**U.S. Joins WWII**',
            'Motivation: fascism, Holocaust.',
            'Bataan Death March highlighted Japanese brutality.',
            '',
            '**Military Strategies**',
            'Eisenhower led D-Day and documented Holocaust camps.',
            'Navajo code talkers, Ghost Army, and fake leaks tricked Nazis.',
            '',
            '**Pacific Theater**',
            'Midway (1942): turning point after breaking Japanese code.',
            'Island hopping strategy successful.',
            '',
            '**European Theater**',
            'Tehran Conference: second front agreement.',
            'D-Day (June 6, 1944): invasion of Normandy.',
            'Battle of the Bulge: Hitler’s last stand.',
            'V-E Day: May 7, 1945.',
            '',
            '**End of WWII**',
            'Atomic bombs dropped on Hiroshima & Nagasaki.',
            'V-J Day: September 2, 1945.',
            'GI Bill supported veterans postwar.',
        ]],
    },
    {
        key: '7.14',
        title: '7.14 – Consequences of WWII',
        bullets: [[
            '**U.S. as Superpower**',
            'No destruction at home = rapid postwar prosperity.',
            'Used industrial power + atomic bombs = global dominance.',
            '',
            '**Impact on Minorities**',
            'Bracero Program: Mexican farm laborers came during war.',
            'Zoot Suit Riots: anti-Mexican violence.',
            'Double V Campaign led to postwar civil rights movement.',
            'Women stayed in workforce longer.',
            '',
            '**Postwar Diplomacy**',
            'Yalta Conference: Germany divided; promised free elections in Europe.',
            'Stalin broke promises, increasing U.S.–Soviet tensions.',
            '',
            '**Economic Framework**',
            'Bretton Woods set up capitalist trade systems.',
            'Marshall Plan: aid to Europe to stop communism.',
            '',
            '**United Nations**',
            'Replaced League of Nations.',
            'Peacekeeping authority and real enforcement power.',
            '',
            '**Legacy**',
            'U.S. emerged as global leader.',
            'Shaped Cold War era diplomacy and economic policy.',
        ]],
    },
];

export const timelineDataUnit7: TimelineEvent[] = [
    {
        key: '1898a',
        icon: '🏝️',
        title: '1898 – Annexation of Hawaii',
        summary: 'The U.S. overthrew Queen Liliʻuokalani and annexed Hawaii to secure a naval base at Pearl Harbor and strengthen U.S. presence in the Pacific.',
        details: [],
    },
    {
        key: '1898b',
        icon: '💣',
        title: '1898 – Spanish-American War',
        summary: 'Fought between the U.S. and Spain; triggered by the explosion of the USS Maine and American support for Cuban independence. Marked the emergence of the U.S. as a global power.',
        details: [],
    },
    {
        key: '1898c',
        icon: '📜',
        title: '1898–1900 – U.S. Drives Spain from Cuba & Philippines / Treaty of Paris',
        summary: 'The U.S. military expelled Spanish forces from Cuba and the Philippines.',
        details: [
            'The Treaty of Paris (1898) officially ended the war. Spain ceded Guam, Puerto Rico, and the Philippines to the U.S.',
        ],
    },
    {
        key: '1902',
        icon: '🇨🇺',
        title: '1902 – Platt Amendment',
        summary: 'This gave the U.S. the right to intervene in Cuban affairs and maintain a naval base at Guantanamo Bay, making Cuba a U.S. protectorate in practice.',
        details: [],
    },
    {
        key: '1903',
        icon: '✈️',
        title: '1903 – Wright Brothers',
        summary: 'Orville and Wilbur Wright achieved the first powered, controlled flight at Kitty Hawk, North Carolina—ushering in the era of modern aviation.',
        details: [],
    },
    {
        key: '1904',
        icon: '💪',
        title: '1904 – Roosevelt Corollary',
        summary: 'An extension of the Monroe Doctrine. President Theodore Roosevelt asserted that the U.S. would act as a "police power" in Latin America to stabilize economic affairs if they couldn\'t pay international debts.',
        details: [],
    },
    {
        key: '1917',
        icon: '🕊️',
        title: '1917 – U.S. Enters World War I',
        summary: 'Entered the war on the Allied side due to unrestricted German submarine warfare and the Zimmermann Telegram.',
        details: [
            'Congress passed the Espionage Act (1917) and Sedition Act (1918) to silence anti-war dissent and suppress criticism of the government.',
        ],
    },
    {
        key: '1918',
        icon: '📝',
        title: '1918 – Wilson’s Fourteen Points',
        summary: 'Woodrow Wilson’s plan for postwar peace included the creation of the League of Nations.',
        details: [
            'The U.S. Senate rejected the League due to fears of losing sovereignty; Wilson refused to compromise.',
        ],
    },
    {
        key: '1919',
        icon: '⚖️',
        title: '1919 – Schenck v. United States',
        summary: 'Supreme Court ruled that free speech could be restricted during wartime if it presents a "clear and present danger"—upholding the Espionage Act.',
        details: [],
    },
    {
        key: '1920',
        icon: '🗳️',
        title: '1920 – Women’s Suffrage (19th Amendment)',
        summary: 'Granted women the right to vote after decades of activism, marking a major expansion of democratic participation.',
        details: [],
    },
    {
        key: '1920s-a',
        icon: '🟥',
        title: '1920s – Red Scare',
        summary: 'Fear of communist revolution led to anti-immigrant hysteria, mass arrests (Palmer Raids), and suppression of labor activism.',
        details: [],
    },
    {
        key: '1920s-b',
        icon: '🍻',
        title: '1920s – Prohibition',
        summary: 'The 18th Amendment banned the manufacture and sale of alcohol.',
        details: [
            'Led to the rise of organized crime, speakeasies, and eventually was repealed by the 21st Amendment in 1933.',
        ],
    },
    {
        key: '1929',
        icon: '📉',
        title: '1929 – Stock Market Crash',
        summary: 'The stock market collapsed on Black Tuesday, October 29, 1929.',
        details: [
            'Marked the beginning of the Great Depression, the worst economic crisis in U.S. history.',
        ],
    },
    {
        key: '1932',
        icon: '🇺🇸',
        title: '1932 – FDR Elected President',
        summary: 'Franklin D. Roosevelt won a landslide victory over Herbert Hoover.',
        details: [
            'His First 100 Days introduced the New Deal, a set of programs aimed at relief, recovery, and reform.',
        ],
    },
    {
        key: '1935',
        icon: '🏛️',
        title: '1935 – Social Security Act',
        summary: 'Part of the Second New Deal. Established a pension system for retirees, unemployment insurance, and aid for the disabled—still a foundation of U.S. welfare policy today.',
        details: [],
    },
    {
        key: '1939',
        icon: '🇪🇺',
        title: '1939 – WWII Begins in Europe',
        summary: 'Germany invaded Poland on September 1, 1939.',
        details: [
            'Britain and France declared war on Germany, marking the official start of WWII in Europe.',
        ],
    },
    {
        key: '1941',
        icon: '💥',
        title: '1941 – Attack on Pearl Harbor',
        summary: 'Japan launched a surprise attack on the U.S. naval base in Hawaii on December 7, 1941.',
        details: [
            'Led the U.S. to declare war on Japan, officially entering World War II.',
        ],
    },
    {
        key: '1944',
        icon: '🇫🇷',
        title: '1944 – D-Day',
        summary: 'On June 6, 1944, Allied forces launched the largest amphibious invasion in history on the beaches of Normandy, France.',
        details: [
            'Marked the beginning of the end for Nazi Germany as the Allies began liberating Western Europe.',
        ],
    },
    {
        key: '1945a',
        icon: '🤝',
        title: '1945 – Yalta Conference',
        summary: 'FDR, Churchill, and Stalin met to plan the postwar world order. They agreed to divide Germany, create the UN, and allow free elections in Eastern Europe (a promise Stalin later broke).',
        details: [],
    },
    {
        key: '1945b',
        icon: '⚛️',
        title: '1945 – Atomic Bombs Dropped',
        summary: 'The U.S. dropped atomic bombs on Hiroshima and Nagasaki to force Japan’s surrender, ending WWII and ushering in the nuclear age.',
        details: [],
    },
];

const APUSHUnit7StudyGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleTopic = (key: string) => {
    setOpenTopic(openTopic === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/apush-study-guide')}
          className="mb-6 px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Units
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800">Unit 7: The Early 20th Century (1890-1945)</h1>
          <p className="text-lg text-slate-600 mt-2">Explore the key events, people, and concepts of this period.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b-2 border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'topics' ? 'border-b-4 border-blue-600 text-blue-700' : 'text-slate-500 hover:text-blue-600'}`}
          >
            Key Topics
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'timeline' ? 'border-b-4 border-blue-600 text-blue-700' : 'text-slate-500 hover:text-blue-600'}`}
          >
            Timeline
          </button>
          <button
            onClick={() => navigate('/apush-study-guide/unit/7/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-blue-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit7Content.map((topic) => (
                <div key={topic.key} className="border-b border-slate-200 last:border-b-0 pb-4">
                  <button
                    onClick={() => toggleTopic(topic.key)}
                    className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-blue-700">{topic.title}</h3>
                    <span className="text-2xl text-slate-500">{openTopic === topic.key ? '-' : '+'}</span>
                  </button>
                  {openTopic === topic.key && (
                    <div className="p-4 bg-slate-50 rounded-b-lg">
                      {(() => {
                        const items = topic.bullets[0];
                        const groupedItems = [];
                        let currentGroup: { heading: string; points: string[] } | null = null;

                        for (const item of items) {
                          if (item.startsWith('**') && item.endsWith('**')) {
                            if (currentGroup) {
                              groupedItems.push(currentGroup);
                            }
                            currentGroup = { heading: item, points: [] };
                          } else if (item === '') {
                            if (currentGroup) {
                              groupedItems.push(currentGroup);
                              currentGroup = null;
                            }
                          } else if (currentGroup) {
                            currentGroup.points.push(item);
                          }
                        }
                        if (currentGroup) {
                          groupedItems.push(currentGroup);
                        }

                        return groupedItems.map((group, i) => (
                          <div key={i} className="mb-4">
                            <h4
                              className="text-lg font-semibold text-blue-800"
                              dangerouslySetInnerHTML={{ __html: group.heading.replace(/\*\*(.*?)\*\*/g, '$1') }}
                            />
                            <ul className="mt-2 space-y-2 pl-5">
                              {group.points.map((point, j) => {
                                if (point.trim().startsWith('•')) {
                                  return (
                                    <li key={j} className="text-base text-slate-700 leading-relaxed">
                                      <ul className="list-disc pl-5">
                                        <li dangerouslySetInnerHTML={{ __html: point.trim().substring(1).trim() }} />
                                      </ul>
                                    </li>
                                  );
                                }
                                if (point.endsWith(':')) {
                                  return <p key={j} className="text-base text-slate-700 leading-relaxed font-semibold" dangerouslySetInnerHTML={{ __html: point }} />;
                                }
                                return <li key={j} className="text-base text-slate-700 leading-relaxed list-disc" dangerouslySetInnerHTML={{ __html: point }} />;
                              })}
                            </ul>
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {activeTab === 'timeline' && (
            <div className="relative border-l-4 border-blue-200 ml-4 pl-8 space-y-12">
              {timelineDataUnit7.map((event, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-11 h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-2xl text-white shadow-md">
                    {event.icon}
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl shadow-md ml-4">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">{event.title}</h3>
                    <p className="text-lg text-slate-600 mb-4">{event.summary}</p>
                    {event.details && event.details.length > 0 && (
                      <ul className="space-y-2 list-disc pl-5">
                        {event.details.map((detail, i) => (
                          <li key={i} className="text-base text-slate-700" dangerouslySetInnerHTML={{ __html: detail.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default APUSHUnit7StudyGuide;
