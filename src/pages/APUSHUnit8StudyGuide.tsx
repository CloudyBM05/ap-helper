import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the types for your data
interface TimelineEvent {
  key: string;
  icon: string;
  title: string;
  summary: string;
  details: string[];
}

interface ContentSection {
  key: string;
  title: string;
  bullets: string[];
}

// Placeholder data for Unit 8
export const unit8Content: ContentSection[] = [
    {
        key: '8.2',
        title: '8.2 The Cold War',
        bullets: [
            '**Emergence of the Cold War**',
            'Ideological conflict arose between the U.S. (democratic capitalism) and the Soviet Union (authoritarian communism) after WWII.',
            'Roots of mistrust traced back to the 1917 Russian Revolution.',
            'Disagreements over postwar settlements in Eastern Europe, especially at Yalta and Potsdam Conferences.',
            'U.S. viewed Soviet influence as expansionist and a threat to global democracy.',
            '',
            '**Containment Policy**',
            'George Kennan’s Long Telegram inspired U.S. foreign policy of “containment” of communism.',
            'Truman Doctrine (1947): Promised aid to Greece and Turkey to resist communism.',
            'Marshall Plan (1947): $13 billion in aid to rebuild Western Europe and strengthen capitalist democracies.',
            '',
            '**Major Confrontations and Alliances**',
            'Berlin Blockade (1948): Stalin blocked West Berlin access; U.S. responded with Berlin Airlift.',
            'NATO (1949): Military alliance of Western democracies.',
            'Warsaw Pact (1955): Soviet-led military alliance in Eastern Europe.',
            'Arms race escalated with both sides building nuclear arsenals (mutually assured destruction doctrine).',
            '',
            '**Proxy Wars**',
            'Korean War (1950–1953): North Korea (communist) invaded South Korea (capitalist). U.S. and UN intervened; war ended in armistice at 38th parallel.',
            'Proxy wars became the main form of superpower conflict without direct combat.',
            '',
            '**Truman’s Domestic and Global Role**',
            'Promoted civil rights: desegregated armed forces (Executive Order 9981) and formed Committee on Civil Rights.',
            'Proposed Fair Deal (expansion of New Deal): health insurance, higher minimum wage, civil rights, public housing.',
            'Faced pushback from Southern Democrats (Dixiecrats) and conservatives.',
            '',
            '**Global Role Shift**',
            'U.S. became permanent UN Security Council member.',
            'Bretton Woods (1944): Created IMF and World Bank to stabilize global economy.',
            'National Security Act of 1947: Created Department of Defense, CIA, NSC.',
        ],
    },
    {
        key: '8.3',
        title: '8.3 The Red Scare',
        bullets: [
            '**Second Red Scare**',
            'Post-WWII anti-communist panic fueled by Cold War tensions.',
            'Paranoia over domestic communist infiltration intensified by Soviet atomic bomb (1949) and China’s communist revolution (1949).',
            '',
            '**Government Actions**',
            'Truman’s Loyalty Program: Loyalty oaths and background checks for federal employees.',
            'Taft-Hartley Act (1947): Restricted labor unions and allowed anti-communist oaths.',
            'HUAC (House Un-American Activities Committee): Investigated suspected communists, especially in Hollywood.',
            '',
            '**Cultural Impact**',
            'Hollywood Ten: Writers and directors blacklisted for refusing to testify.',
            'McCarthyism: Senator Joseph McCarthy claimed to have lists of communists in government; few claims had evidence.',
            'McCarthy’s downfall after televised hearings exposed his bullying tactics.',
            '',
            '**Espionage and Hysteria**',
            'Julius and Ethel Rosenberg: Convicted and executed (1953) for allegedly passing atomic secrets to USSR.',
            'Red Scare affected public trust, civil liberties, and the legitimacy of dissent.',
            '',
            '**Long-term Effects**',
            'Labor unions weakened; civil liberties curtailed.',
            'Public became more skeptical of government and fearful of expressing dissent.',
            'U.S.–Soviet relations deteriorated even further.',
        ],
    },
    {
        key: '8.4',
        title: '8.4 Economy After 1945',
        bullets: [
            '**Postwar Economic Boom**',
            'WWII productivity and savings led to consumer spending surge.',
            'GI Bill (Servicemen’s Readjustment Act of 1944) funded education, housing, and business loans for veterans.',
            'Government infrastructure spending (e.g., Interstate Highway System).',
            '',
            '**Baby Boom and Suburbanization**',
            'Birth rate soared; more than 50 million babies born between 1945–1960.',
            'Demand for housing led to suburban expansion (e.g., Levittown).',
            'Interstate Highway Act (1956): Enabled mass suburban migration, political power shift to South and West.',
            '',
            '**Sun Belt Migration**',
            'Millions moved to warmer states (e.g., California, Texas, Florida).',
            'Economic opportunities in defense, aerospace, and oil industries.',
            'Led to increased political representation for Sun Belt states.',
            '',
            '**Global Economic Dominance**',
            'U.S. emerged as world’s wealthiest nation.',
            'Growth driven by defense spending, technological innovation, and strong consumer demand.',
            'Worker productivity and education improvements expanded the middle class.',
        ],
    },
    {
        key: '8.5',
        title: '8.5 Changes in American Culture After 1945',
        bullets: [
            '**Mass Culture**',
            'Television became a staple in 90% of households by 1960.',
            'Limited networks meant a homogenized national culture.',
            'Advertising surged with rise of disposable income and consumer credit (credit cards).',
            'Rock and roll became the soundtrack of youth rebellion (e.g., Elvis Presley).',
            '',
            '**Conformity and Rebellion**',
            'McCarthyism fueled cultural pressure to conform to patriotic, anti-communist norms.',
            'The Beat Generation (e.g., Jack Kerouac, Allen Ginsberg) criticized consumerism and conformity.',
            'J.D. Salinger’s "The Catcher in the Rye" reflected youth alienation and critique of mainstream values.',
            '',
            '**Consumerism**',
            'Mass production and new technologies led to abundance.',
            'Middle-class families embraced consumer goods as part of American Dream.',
            'Gender roles emphasized domesticity for women, especially in suburbs.',
        ],
    },
    {
        key: '8.6',
        title: '8.6 Civil Rights Movement',
        bullets: [
            '**Roots of the Movement**',
            'Jim Crow laws enforced racial segregation across the South.',
            'Voter suppression through poll taxes, literacy tests, and violence.',
            'Plessy v. Ferguson (1896): “Separate but equal” doctrine legitimized segregation.',
            '',
            '**Early Federal Support**',
            'Truman’s Executive Order 9981 (1948): Desegregated the military.',
            'Created Committee on Civil Rights to investigate racial discrimination.',
            '',
            '**Legal Challenges**',
            'Brown v. Board of Education (1954): Overturned Plessy, ruled school segregation unconstitutional.',
            'Southern resistance included "Southern Manifesto" and use of state troops to block integration.',
            '',
            '**Little Rock Nine (1957)**',
            'Arkansas governor used National Guard to block black students from entering Little Rock High School.',
            'Eisenhower sent federal troops to enforce integration.',
            '',
            '**Limited Progress**',
            'Civil rights advances met with strong backlash.',
            'Federal action was slow; major civil rights laws wouldn’t come until the 1960s.',
        ],
    },
    {
        key: '8.7',
        title: '8.7 The United States as a World Power',
        bullets: [
            '**Decolonization and Cold War Rivalry**',
            'Dozens of nations in Africa, Asia, and Latin America gained independence after WWII.',
            'U.S. and USSR vied for influence in these nations—capitalism vs. communism.',
            '',
            '**Latin America**',
            'Guatemala (1954): CIA-backed coup removed leftist president who threatened U.S. business interests (United Fruit Company).',
            'Cuba (1959): Fidel Castro established a communist regime. U.S. responded with Bay of Pigs invasion (failed) and Cuban Missile Crisis.',
            '',
            '**Middle East**',
            'Iran (1953): U.S. helped overthrow elected Prime Minister Mossadegh to secure oil interests and install pro-U.S. Shah.',
            'Suez Crisis (1956): U.S. criticized British-French-Israeli attack; issued Eisenhower Doctrine to aid Middle East nations resisting communism.',
            'OPEC (1960): Oil-rich nations formed cartel to control prices and assert independence.',
            '',
            '**Asia and Cold War Fronts**',
            'China (1949): Mao Zedong’s communists won civil war; U.S. refused to recognize communist government until 1979.',
            'Vietnam: Divided at 17th parallel; U.S. backed South to prevent spread of communism (domino theory).',
            '',
            '**U.S. Covert Operations**',
            'CIA conducted operations in Guatemala, Iran, Congo, and more to ensure pro-Western regimes.',
            '',
            '**Eisenhower’s Legacy**',
            'Promoted brinkmanship (threat of nuclear war) over containment.',
            'Eisenhower warned against the "military-industrial complex" gaining too much influence.',
            'NSC-68 and Korean War sparked huge defense budget increases.',
            'Eisenhower Doctrine expanded U.S. intervention to the Middle East.',
        ],
    },
    {
        key: '8.8',
        title: '8.8 The Vietnam War',
        bullets: [
            '**Geopolitical Context**',
            'Vietnam split at the 17th parallel:',
            '  - North Vietnam (Ho Chi Minh, communist)',
            '  - South Vietnam (U.S.-backed, democratic)',
            'Part of the broader Cold War ideological struggle.',
            '',
            '**Domino Theory**',
            'Eisenhower’s idea: If one nation falls to communism, others will follow.',
            'Justified U.S. involvement in Southeast Asia.',
            '',
            '**U.S. Escalation**',
            'From aiding France to direct military involvement after the French exit.',
            'Gulf of Tonkin Incident (1964): Alleged attack → Gulf of Tonkin Resolution, gave LBJ war powers without Congress declaring war.',
            'Kennedy: Sent military advisers.',
            'Johnson: Sent combat troops.',
            '',
            '**Impact on U.S.**',
            'Split public: Hawks (pro-war) vs. Doves (anti-war)',
            'Anti-war protests grew, especially among youth.',
            'Undermined Great Society spending and progress.',
            '',
            '**Credibility Gap**',
            'Public distrust widened due to TV coverage vs. government claims.',
            'Tet Offensive (1968): Shattered illusion of progress.',
            '',
            '**Vietnamization**',
            'Nixon’s policy: Gradually pull out U.S. troops, supply South Vietnam.',
            'Marked U.S. shift from direct military to indirect support.',
            '',
            '**Key Terms**',
            'Ho Chi Minh – Communist leader of North Vietnam.',
            'Gulf of Tonkin Resolution – Blank check for Johnson.',
            'Credibility Gap – Discrepancy between government reports & reality.',
        ],
    },
    {
        key: '8.9',
        title: '8.9 Lyndon Johnson & The Great Society',
        bullets: [
            '**LBJ’s Vision: Great Society**',
            'Build on FDR’s New Deal, focused on ending poverty and racial injustice.',
            'War on Poverty: Head Start, Job Corps, Economic Opportunity Act.',
            '',
            '**Major Legislation**',
            'Medicare – Healthcare for 65+',
            'Medicaid – Healthcare for poor/disabled',
            'Elementary and Secondary Education Act – Funding for schools',
            'Immigration Act of 1965 – Ended national-origin quotas',
            '',
            '**Environmental Legislation**',
            'Inspired by “Silent Spring”, led to Clean Air Act, Water Quality Act',
            '',
            '**Civil Rights Expansion**',
            'Used political capital to pass major civil rights laws (see 8.10)',
            '',
            '**Criticism**',
            'Seen as expensive and inefficient',
            'Vietnam War sapped funding and focus',
            'Helped spark conservative backlash',
            '',
            '**The Warren Court (liberal rulings)**',
            'Gideon v. Wainwright: Right to attorney if can’t afford',
            'Griswold v. Connecticut: Right to privacy → birth control legal',
            'Engel v. Vitale: No mandatory prayer in schools',
            'Baker v. Carr: Reapportionment for fairer district representation',
        ],
    },
    {
        key: '8.10',
        title: '8.10 Civil Rights Movement',
        bullets: [
            '**Key Early Events**',
            'Montgomery Bus Boycott (1955): Rosa Parks + MLK rise to prominence',
            'Sit-ins (1960): Student-led; pushed desegregation of lunch counters',
            '',
            '**Tactics**',
            'Nonviolence (MLK) vs. Militant Resistance (Malcolm X, Black Panthers)',
            'Civil disobedience, marches, media attention',
            '',
            '**Key Legislation**',
            'Civil Rights Act (1964): Banned segregation & job discrimination',
            'Voting Rights Act (1965): Banned literacy tests & voter suppression',
            '',
            '**Key Court Cases**',
            'Loving v. Virginia (1967): Legalized interracial marriage',
            '',
            '**Radicalization**',
            'Watts Riots (1965) & race riots post-MLK assassination',
            'Shift toward Black Power',
        ],
    },
    {
        key: '8.11',
        title: '8.11 Civil Rights and Its Inspirations',
        bullets: [
            '**Women’s Movement**',
            'The Feminine Mystique (Betty Friedan): Exposed women’s dissatisfaction',
            'NOW (1966): National Organization for Women; push for ERA',
            'Title IX (1972): Banned sex discrimination in education',
            'Roe v. Wade (1973): Legalized abortion; privacy rights',
            'Phyllis Schlafly: Led opposition to Equal Rights Amendment (STOP ERA)',
            '',
            '**Latino Rights**',
            'Cesar Chavez & Dolores Huerta: United Farm Workers',
            'Nonviolent boycotts (e.g. grapes), improved conditions for farmworkers',
            '',
            '**Native American Rights**',
            'AIM (American Indian Movement): Alcatraz occupation → attention',
            'Self-Determination Act (1975): Greater tribal control over governance',
            '',
            '**Gay Rights**',
            'Stonewall Riots (1969): Start of modern LGBTQ+ movement',
            'Homosexuality depathologized in 1970s',
        ],
    },
    {
        key: '8.12',
        title: '8.12 Youth Culture in the 1960s',
        bullets: [
            '**Youth Reaction to Vietnam**',
            'SDS (Students for a Democratic Society): Antiwar, participatory democracy',
            'Port Huron Statement: Criticized Cold War & social injustice',
            'Kent State Massacre (1970): Guardsmen killed 4 student protestors',
            '',
            '**Counterculture (Hippie Movement)**',
            'Anti-materialism, peace, communal living',
            'Music: Bob Dylan, Janis Joplin, Jimi Hendrix',
            'Woodstock Festival (1969): Symbol of the movement',
            'Haight-Ashbury: San Francisco hippie hub',
            '',
            '**Drugs & Sexual Revolution**',
            'LSD, marijuana, birth control promoted',
            'Pushback against 1950s conformity',
            '',
            '**Decline**',
            'Drug abuse, commercialization, arrests eroded momentum by 1970s',
        ],
    },
    {
        key: '8.13',
        title: '8.13 Environmental Policies',
        bullets: [
            '**Global Trigger**',
            'OPEC Oil Crisis (1973): Arab states cut oil to U.S. → shortages & price spikes',
            'Showed U.S. dependency on foreign energy',
            '',
            '**Nuclear Energy Debate**',
            'Initially seen as alternative',
            'Three Mile Island (1979) meltdown → public fear',
            '',
            '**Environmental Awakening**',
            'Rachel Carson’s Silent Spring (1962): DDT dangers',
            'First Earth Day (1970)',
            'Environmental disasters: Cuyahoga River fire',
            '',
            '**Government Response**',
            'EPA (1970): Created by Nixon to regulate pollution',
            'Clean Air Act: National air quality standards',
        ],
    },
    {
        key: '8.14',
        title: '8.14 Rise of Conservatism in America',
        bullets: [
            '**Why the Shift Right?**',
            'Reaction to:',
            '  - Great Society “big government”',
            '  - Social unrest (civil rights, feminism, anti-war)',
            '  - Counterculture & declining morals (in conservative eyes)',
            '',
            '**Conservative Figures & Groups**',
            'Young Americans for Freedom (YAF): Student conservatives',
            'John Birch Society: Anti-communist conspiracists',
            'William F. Buckley: Conservative intellectual, “National Review”',
            '',
            '**New Right Coalition**',
            'Blend of economic, religious, and social conservatism',
            'Focus on “family values,” anti-abortion, school prayer',
            '',
            '**Religious Right**',
            'Moral Majority (Jerry Falwell), Focus on the Family',
            'Triggered by Roe v. Wade (1973)',
            '',
            '**National Events Fueling Conservatism**',
            'Watergate Scandal (1974) → distrust in government',
            'Stagflation & 1970s economic issues',
            'Bakke v. UC Regents (1978): Quotas unconstitutional, but race can be considered',
            '',
            '**Climax**',
            'Conservative backlash culminated in Reagan’s 1980 victory',
        ],
    },
];

export const timelineDataUnit8: TimelineEvent[] = [
  {
    key: '1945',
    icon: '🤝',
    title: 'Yalta & Potsdam Conferences (1945)',
    summary: 'Allied leaders met to shape post-WWII Europe, but disagreements over Poland and Germany laid the groundwork for Cold War tensions.',
    details: [
      '**Yalta:** FDR, Churchill, and Stalin agreed to divide Germany into occupation zones.',
      '**Potsdam:** Truman, Attlee, and Stalin met; deep divisions emerged over Soviet influence in Eastern Europe.',
    ],
  },
  {
    key: '1947',
    icon: '🇺🇸',
    title: 'Truman Doctrine (1947)',
    summary: 'President Truman declared that the U.S. would support any nation resisting communism, establishing the policy of containment.',
    details: [
      'Initially provided $400 million in aid to Greece and Turkey.',
      'Marked a formal declaration of the Cold War from the American side.',
    ],
  },
    {
    key: '1947-2',
    icon: '📜',
    title: 'Taft-Hartley Act (1947)',
    summary: 'A federal law that restricted the activities and power of labor unions, including an anti-communist oath.',
    details: [
      'Outlawed the "closed shop" (requiring union membership for employment).',
      'Allowed states to pass "right-to-work" laws.',
    ],
  },
  {
    key: '1948',
    icon: '✈️',
    title: 'Berlin Airlift (1948-1949)',
    summary: 'In response to a Soviet blockade of West Berlin, the U.S. and its allies supplied the city by air for nearly a year.',
    details: [
      'A major victory for containment without direct military conflict.',
      'Showcased American logistical power and resolve.',
    ],
  },
  {
    key: '1949',
    icon: '🛡️',
    title: 'NATO Formed (1949)',
    summary: 'The North Atlantic Treaty Organization was created as a mutual defense pact among Western nations against Soviet aggression.',
    details: [
      'Marked the first peacetime military alliance in U.S. history.',
      'Solidified the division of Europe into two armed camps.',
    ],
  },
  {
    key: '1950',
    icon: '⚔️',
    title: 'Korean War (1950-1953)',
    summary: 'A proxy war fought between communist North Korea (backed by China and the USSR) and capitalist South Korea (backed by the U.S. and UN).',
    details: [
      'Ended in a stalemate with the border at the 38th parallel.',
      'Led to a massive increase in U.S. military spending (NSC-68).',
    ],
  },
  {
    key: '1954',
    icon: '⚖️',
    title: 'Brown v. Board of Education (1954)',
    summary: 'The Supreme Court unanimously ruled that racial segregation in public schools was unconstitutional, overturning "separate but equal."',
    details: [
      'A landmark victory for the Civil Rights Movement.',
      'Met with massive resistance in the South.',
    ],
  },
    {
    key: '1954-2',
    icon: '🇬🇹',
    title: 'CIA Coup in Guatemala (1954)',
    summary: 'The CIA orchestrated a coup to overthrow the democratically elected president, Jacobo Árbenz, to protect U.S. corporate interests.',
    details: [
      'Árbenz had nationalized land owned by the United Fruit Company.',
      'Installed a military dictatorship, leading to decades of instability.',
    ],
  },
    {
    key: '1955',
    icon: '🚌',
    title: 'Montgomery Bus Boycott (1955-1956)',
    summary: 'Sparked by Rosa Parks\\\' arrest, African Americans boycotted public buses for over a year, leading to their desegregation.',
    details: [
      'Brought Martin Luther King Jr. to national prominence.',
      'Demonstrated the power of nonviolent mass protest.',
    ],
  },
  {
    key: '1955-2',
    icon: '🛡️',
    title: 'Warsaw Pact Formed (1955)',
    summary: 'The Soviet Union and its Eastern European satellite states formed a rival military alliance in response to NATO.',
    details: [
      'Formalized the military division of the Eastern Bloc.',
      'Ensured Soviet control over its sphere of influence.',
    ],
  },
  {
    key: '1956',
    icon: '🚗',
    title: 'Interstate Highway Act (1956)',
    summary: 'Authorized the construction of a 41,000-mile network of interstate highways, transforming American transportation and society.',
    details: [
      'Fueled suburbanization and the growth of the Sun Belt.',
      'Justified as a national defense measure for evacuating cities.',
    ],
  },
  {
    key: '1957',
    icon: '🏫',
    title: 'Little Rock Nine (1957)',
    summary: 'President Eisenhower sent federal troops to enforce the integration of nine African American students into Little Rock Central High School.',
    details: [
      'A crucial test of federal power against states\\\' resistance to desegregation.',
      'Drew national attention to the struggle for civil rights.',
    ],
  },
    {
    key: '1959',
    icon: '🇨🇺',
    title: 'Cuban Revolution (1959)',
    summary: 'Fidel Castro overthrew the U.S.-backed dictator Batista, establishing a communist state 90 miles from Florida.',
    details: [
      'A major Cold War setback for the United States.',
      'Led to years of conflict, including the Bay of Pigs and Cuban Missile Crisis.',
    ],
  },
  {
    key: '1960',
    icon: '✈️',
    title: 'U-2 Incident (1960)',
    summary: 'A U.S. U-2 spy plane was shot down over the Soviet Union, derailing a planned summit between Eisenhower and Khrushchev.',
    details: [
      'Increased mistrust and tensions between the superpowers.',
      'Eisenhower was forced to admit the U.S. was spying.',
    ],
  },
  {
    key: '1961',
    icon: '🇨🇺',
    title: 'Bay of Pigs Invasion (1961)',
    summary: 'A failed CIA-sponsored invasion of Cuba by Cuban exiles intended to overthrow Fidel Castro.',
    details: [
      'A major embarrassment for the Kennedy administration.',
      'Strengthened Castro\\\'s position and pushed him closer to the USSR.',
    ],
  },
  {
    key: '1962',
    icon: '🚀',
    title: 'Cuban Missile Crisis (1962)',
    summary: 'A 13-day standoff between the U.S. and the Soviet Union over the placement of nuclear missiles in Cuba.',
    details: [
      'The closest the world has ever come to nuclear war.',
      'Resulted in a U.S. naval blockade and a secret deal to remove the missiles.',
    ],
  },
  {
    key: '1963',
    icon: '🕊️',
    title: 'March on Washington (1963)',
    summary: 'A massive civil rights demonstration in Washington D.C., where Martin Luther King Jr. delivered his "I Have a Dream" speech.',
    details: [
      'Advocated for civil and economic rights for African Americans.',
      'Helped build momentum for the Civil Rights Act of 1964.',
    ],
  },
  {
    key: '1964',
    icon: '📜',
    title: 'Civil Rights Act of 1964',
    summary: 'A landmark law that outlawed discrimination based on race, color, religion, sex, or national origin.',
    details: [
      'Ended segregation in public places and banned employment discrimination.',
      'A crowning achievement of the Civil Rights Movement.',
    ],
  },
  {
    key: '1965',
    icon: '🗳️',
    title: 'Voting Rights Act of 1965',
    summary: 'Outlawed discriminatory voting practices, such as literacy tests and poll taxes, that had disenfranchised African Americans.',
    details: [
      'Dramatically increased black voter registration and participation in the South.',
      'Enforced the 15th Amendment.',
    ],
  },
  {
    key: '1968',
    icon: '💥',
    title: 'Tet Offensive (1968)',
    summary: 'A major military campaign by North Vietnam and the Viet Cong that turned American public opinion against the war in Vietnam.',
    details: [
      'Although a military defeat for the communists, it was a psychological victory.',
      'Showed that the U.S. was not winning the war as claimed.',
    ],
  },
  {
    key: '1968-2',
    icon: '💔',
    title: 'Assassination of MLK Jr. (1968)',
    summary: 'The assassination of Martin Luther King Jr. in Memphis, Tennessee, sparked riots across the country and marked a turning point in the Civil Rights Movement.',
    details: [
      'Led to the passage of the Fair Housing Act of 1968.',
      'Robbed the movement of its most prominent leader.',
    ],
  },
  {
    key: '1969',
    icon: '🏳️‍🌈',
    title: 'Stonewall Riots (1969)',
    summary: 'A series of spontaneous demonstrations by members of the gay community in response to a police raid at the Stonewall Inn in New York City.',
    details: [
      'Considered the single most important event leading to the gay liberation movement.',
      'Marked the beginning of a new era of LGBTQ+ activism.',
    ],
  },
  {
    key: '1972',
    icon: '🇨🇳',
    title: 'Nixon Visits China (1972)',
    summary: 'President Nixon\\\'s historic visit to communist China opened up diplomatic and economic relations between the two countries.',
    details: [
      'A key move in Nixon\\\'s strategy of détente with the Soviet Union.',
      'Ended 25 years of no communication between the U.S. and China.',
    ],
  },
  {
    key: '1973',
    icon: '⚖️',
    title: 'Roe v. Wade (1973)',
    summary: 'The Supreme Court ruled that a state law that banned abortions was unconstitutional, establishing a woman\\\'s right to an abortion.',
    details: [
      'Based on the right to privacy under the 14th Amendment.',
      'Remains one of the most controversial Supreme Court decisions.',
    ],
  },
  {
    key: '1973-2',
    icon: '📜',
    title: 'War Powers Act (1973)',
    summary: 'A federal law intended to check the president\\\'s power to commit the U.S. to an armed conflict without the consent of Congress.',
    details: [
      'Passed in response to the Vietnam War.',
      'Requires the president to notify Congress within 48 hours of committing armed forces.',
    ],
  },
  {
    key: '1979',
    icon: '🇮🇷',
    title: 'Iran Hostage Crisis (1979-1981)',
    summary: 'A group of Iranian students stormed the U.S. Embassy in Tehran, taking 52 American diplomats and citizens hostage for 444 days.',
    details: [
      'A major foreign policy crisis for the Carter administration.',
      'The hostages were released moments after Ronald Reagan was sworn in as president.',
    ],
  },
];

const APUSHUnit8StudyGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleTopic = (key: string) => {
    setOpenTopic(openTopic === key ? null : key);
  };

  const renderBullets = (bullets: string[]) => {
    const items: JSX.Element[] = [];
    let currentList: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        items.push(
          <ul key={`list-${items.length}`} className="list-disc pl-5 mt-2 space-y-1">
            {currentList.map((point, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: point }} />
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    bullets.forEach((item, index) => {
      if (item.startsWith('**') && item.endsWith('**')) {
        flushList();
        items.push(
          <h4 key={`header-${index}`} className="text-lg font-semibold text-blue-800 mt-4 mb-2"
              dangerouslySetInnerHTML={{ __html: item.replace(/\*\*/g, '') }} />
        );
      } else if (item.trim() === '') {
        flushList();
        if (items.length > 0 && items[items.length - 1].type !== 'div') {
             items.push(<div key={`spacer-${index}`} className="h-4" />);
        }
      } else {
        currentList.push(item);
      }
    });

    flushList();
    return items;
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
          <h1 className="text-4xl font-bold text-blue-800">Unit 8: The Cold War and the Civil Rights Movement (1945-1980)</h1>
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
            onClick={() => navigate('/apush-study-guide/unit/8/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-blue-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit8Content.map((topic) => (
                <div key={topic.key} className="border-b border-slate-200 last:border-b-0 pb-4">
                  <button
                    onClick={() => toggleTopic(topic.key)}
                    className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-blue-700">{topic.title}</h3>
                    <span className="text-2xl text-slate-500">{openTopic === topic.key ? '−' : '+'}</span>
                  </button>
                  {openTopic === topic.key && (
                    <div className="p-4 bg-slate-50 rounded-b-lg text-base text-slate-700 leading-relaxed">
                      {renderBullets(topic.bullets)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {activeTab === 'timeline' && (
            <div className="relative border-l-4 border-blue-200 ml-4 pl-8 space-y-12">
              {timelineDataUnit8.map((event, index) => (
                <div key={`${event.key}-${index}`} className="relative">
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

export default APUSHUnit8StudyGuide;
