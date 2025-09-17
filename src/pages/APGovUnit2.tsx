import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit2Content = [
    {
        key: '2.1',
        title: '2.1 - Structure, Powers, and Functions of Congress',
        subsections: [
            {
                heading: 'Congress = Bicameral Legislature',
                points: [
                    'Established by Article I of the Constitution',
                ],
            },
            {
                heading: 'Senate',
                points: [
                    '2 senators per state',
                    'Serve 6-year terms',
                    'Must be at least 30 years old',
                    'Framers intended Senate to be more insulated from public opinion',
                    'More constitutional responsibilities (treaties, confirming appointments, impeachment trials)',
                ],
            },
            {
                heading: 'House of Representatives (HoR)',
                points: [
                    'Representation based on state population',
                    '435 members total (capped by law)',
                    'Serve 2-year terms',
                    'Must be at least 25 years old',
                    'Closer to the people, more responsive',
                    'Reapportioned every 10 years after census',
                ],
            },
            {
                heading: 'Congressional Powers',
                points: [
                    'Enumerated Powers (Article I, Section 8): Power of the purse (federal budget), Taxation and tariffs, Coining money, Declaring war, raising armed forces',
                    'Implied Powers: Derived from the Necessary and Proper Clause (Elastic Clause), allows passage of laws needed to carry out enumerated powers',
                ],
            },
            {
                heading: 'Legislative Process',
                points: [
                    'A bill must pass both chambers in identical form to be sent to the president',
                    'Senate: Unlimited debate, relaxed structure',
                    'HoR: Strict debate rules, 1 hour per member, more structured',
                ],
            },
        ],
    },
    {
        key: '2.2',
        title: '2.2 - Congressional Organization and Policymaking',
        subsections: [
            {
                heading: 'Leadership in the House',
                points: [
                    'Speaker of the House: Controls legislative agenda, assigns bills and committee roles',
                    'Majority/Minority Leaders: Manage party strategy',
                    'Majority/Minority Whips: Enforce party discipline',
                ],
            },
            {
                heading: 'Leadership in the Senate',
                points: [
                    'President of the Senate: Vice President, breaks ties',
                    'President Pro Tempore: Senior member of the majority party',
                    'Majority Leader: Controls floor schedule and legislative priorities',
                ],
            },
            {
                heading: 'Committee Types',
                points: [
                    'Standing Committees: Permanent, focus on consistent issues (e.g., Appropriations, Ways and Means)',
                    'Select Committees: Temporary, investigate specific issues',
                    'Joint Committees: House + Senate members (e.g., Library, Printing)',
                    'Conference Committees: Resolve differences in House and Senate versions of a bill',
                ],
            },
            {
                heading: 'HoR Workflow',
                points: [
                    'House Rules Committee: Controls flow of legislation to the floor',
                    'Committee of the Whole: Speeds up debate; requires only 100 members',
                    'Discharge Petition: Forces a bill out of committee with majority support',
                ],
            },
            {
                heading: 'Senate Workflow',
                points: [
                    'Filibuster: Unlimited debate to delay/kill a bill',
                    'Cloture: 60-vote threshold to end filibuster',
                    'Unanimous Consent: Speed up process if no objections',
                ],
            },
            {
                heading: 'Bill Process Notes',
                points: [
                    'Non-germane riders: Unrelated provisions added to bills',
                    'Pork-barrel legislation: Money earmarked for local projects',
                    'Logrolling: Vote trading among legislators',
                ],
            },
            {
                heading: 'Federal Budget',
                points: [
                    'Mandatory Spending: Required by law (e.g., Social Security)',
                    'Discretionary Spending: Leftover funds allocated through the annual budget process',
                    'Deficit Spending: Spending more than revenue, leads to debt',
                ],
            },
            {
                heading: 'Extra',
                points: [
                    'Committee Jurisdiction: Defined policy areas for committees',
                    'Markup Sessions: Committees revise bills before full floor vote',
                ],
            },
        ],
    },
    {
        key: '2.3',
        title: '2.3 - Congressional Behavior',
        subsections: [
            {
                heading: 'Models of Representation',
                points: [
                    'Delegate: Vote based on constituents',
                    'Trustee: Vote based on personal judgment',
                    'Politico: Mix of both, depending on issue',
                ],
            },
            {
                heading: 'Influencing Factors',
                points: [
                    'Partisanship: Increased ideological divisions lead to polarization',
                    'Divided Government: President and Congress controlled by different parties, leads to gridlock (slow/inactive government)',
                    'Lame Duck President: Outgoing president with little influence',
                ],
            },
            {
                heading: 'Elections and Incumbency',
                points: [
                    'Advantages of incumbents: Name recognition, Fundraising networks, Constituent services, Safe districts from gerrymandering',
                ],
            },
            {
                heading: 'Redistricting',
                points: [
                    'Based on census, redrawing districts to reflect population',
                    'Baker v. Carr: Established "one person, one vote"',
                    'Gerrymandering: Drawing lines to favor parties or groups',
                    'Shaw v. Reno: Racial gerrymandering ruled unconstitutional',
                ],
            },
        ],
    },
    {
        key: '2.4',
        title: '2.4 - Presidential Powers',
        subsections: [
            {
                heading: 'Policy Agenda',
                points: [
                    'What the president promises to do if elected',
                ],
            },
            {
                heading: 'Formal Powers (Article II)',
                points: [
                    'Veto (including pocket veto)',
                    'Commander in Chief',
                    'Grant pardons',
                    'Make treaties (with Senate approval)',
                ],
            },
            {
                heading: 'Informal Powers',
                points: [
                    'Executive Orders: Directive with force of law',
                    'Executive Agreements: Agreements with other nations (not treaties)',
                    'Signing Statements: Interpret how a law will be enforced',
                    'Bargaining and Persuasion: Using influence to shape policy',
                ],
            },
        ],
    },
    {
        key: '2.5',
        title: '2.5 - Checks on the President',
        subsections: [
            {
                heading: 'Appointments',
                points: [
                    'Ambassadors, cabinet members, federal judges',
                    'Require Senate confirmation (except White House staff)',
                ],
            },
            {
                heading: 'Checks on Appointments',
                points: [
                    'Advice and Consent: Senate must approve major appointments',
                    'Borking: Intense scrutiny or rejection of nominees',
                ],
            },
        ],
    },
    {
        key: '2.6',
        title: '2.6 - Expansion of Presidential Power',
        subsections: [
            {
                heading: 'Federalist 70 (Hamilton)',
                points: [
                    'Argued for single executive for accountability and decisiveness',
                    'Multiple executives = confusion, no accountability',
                ],
            },
            {
                heading: 'Growth of Power',
                points: [
                    'Use of executive orders',
                    'Presidential access to media and public',
                ],
            },
        ],
    },
    {
        key: '2.7',
        title: '2.7 - Presidential Communication',
        subsections: [
            {
                heading: 'Bully Pulpit',
                points: [
                    'Using presidency to promote agenda through public visibility',
                ],
            },
            {
                heading: 'State of the Union',
                points: [
                    'Required annual update to Congress',
                ],
            },
            {
                heading: 'Technology Evolution',
                points: [
                    'From newspapers → radio → TV → social media',
                ],
            },
        ],
    },
    {
        key: '2.8',
        title: '2.8 - Judicial Branch',
        subsections: [
            {
                heading: 'Structure',
                points: [
                    '3 levels: SCOTUS, Courts of Appeals, District Courts',
                ],
            },
            {
                heading: 'SCOTUS',
                points: [
                    'Established in Article III',
                    'Lifetime appointments',
                    'Original vs. appellate jurisdiction',
                ],
            },
            {
                heading: 'Judiciary Act of 1789',
                points: [
                    'Created lower courts',
                ],
            },
            {
                heading: 'Judicial Review',
                points: [
                    'Power to declare laws unconstitutional',
                    'Established in Marbury v. Madison',
                ],
            },
            {
                heading: 'Federalist 78 (Hamilton)',
                points: [
                    'Advocated for life terms for independence',
                    'Judiciary is the "least dangerous branch"',
                ],
            },
        ],
    },
    {
        key: '2.9',
        title: '2.9 - Legitimacy of Judicial Branch',
        subsections: [
            {
                heading: 'Judicial Review',
                points: [
                    'Allows courts to shape national policy',
                ],
            },
            {
                heading: 'Precedent & Stare Decisis',
                points: [
                    'Use past rulings as guidance',
                ],
            },
            {
                heading: 'Constructionism',
                points: [
                    'Strict: Literal interpretation',
                    'Loose: Flexible, evolving interpretation',
                ],
            },
        ],
    },
    {
        key: '2.10',
        title: '2.10 - Checks on the Judiciary',
        subsections: [
            {
                heading: 'Judicial Activism',
                points: [
                    'Courts shape policy broadly',
                ],
            },
            {
                heading: 'Judicial Restraint',
                points: [
                    'Strictly interpret Constitution',
                ],
            },
            {
                heading: 'Checks on Judiciary',
                points: [
                    'Congress can alter court jurisdiction, pass laws',
                    'Amend Constitution to override decisions',
                    'President appoints judges',
                    'Executive may ignore rulings',
                ],
            },
        ],
    },
    {
        key: '2.12',
        title: '2.12 - Federal Bureaucracy',
        subsections: [
            {
                heading: 'What It Is',
                points: [
                    'Millions of civil servants carrying out executive functions',
                    'Operates under Executive Branch',
                ],
            },
            {
                heading: 'Structure',
                points: [
                    'Cabinet Departments: Led by secretaries (e.g., Defense, Education)',
                    'Agencies: Implement department goals',
                    'Independent Regulatory Commissions: Not under presidential control',
                    'Government Corporations: Hybrid (e.g., USPS)',
                ],
            },
            {
                heading: 'Iron Triangle',
                points: [
                    'Bureaucracy ↔ Congress ↔ Interest Groups cooperation',
                ],
            },
            {
                heading: 'Issue Networks',
                points: [
                    'Looser alliances, more debate and disagreement',
                ],
            },
            {
                heading: 'Civil Service Reform',
                points: [
                    'Spoils System: Old system based on political loyalty',
                    'Pendleton Act: Merit-based hiring',
                ],
            },
        ],
    },
    {
        key: '2.13',
        title: '2.13 - Rule-Making & Implementation',
        subsections: [
            {
                heading: 'Delegated Discretionary Authority',
                points: [
                    'Bureaucracy can decide how to implement laws',
                ],
            },
            {
                heading: 'Rule-Making Authority',
                points: [
                    'Bureaucrats make policies/regulations to enforce laws',
                ],
            },
            {
                heading: 'Key Agencies',
                points: [
                    'DHS: Border and terrorism security',
                    'DOT: Transportation safety',
                    'DOE: Federal education standards',
                    'EPA: Environmental protection',
                    'SEC: Financial regulation',
                    'FEC: Enforce campaign finance laws',
                ],
            },
            {
                heading: 'Notice-and-Comment Rulemaking',
                points: [
                    'Rules proposed in Federal Register',
                    'Public comment period',
                    'Final rule issued after revision',
                ],
            },
        ],
    },
    {
        key: '2.14-2.15',
        title: '2.14-2.15 - Bureaucratic Accountability',
        subsections: [
            {
                heading: 'Congressional Oversight',
                points: [
                    'Committee hearings',
                    'Appropriations (funding control)',
                ],
            },
            {
                heading: 'Presidential Control',
                points: [
                    'Appoint heads of agencies',
                    'Issue executive orders',
                ],
            },
            {
                heading: 'Compliance Monitoring',
                points: [
                    'Agencies ensure legal compliance by public and businesses',
                ],
            },
            {
                heading: 'Judicial Checks',
                points: [
                    'Courts can rule actions unconstitutional',
                    'Citizens can sue agencies',
                ],
            },
        ],
    },
];

// Add placeholder timeline data for Unit 2
const timelineData = [
  {
    key: '1789',
    icon: '🏛️',
    title: '1789 – First Congress Convenes',
    summary: 'The first U.S. Congress meets under the new Constitution.',
    details: [
      'Establishes the legislative branch and sets precedents for congressional procedure.'
    ],
  },
  {
    key: '1913',
    icon: '🗳️',
    title: '1913 – 17th Amendment',
    summary: 'Direct election of U.S. Senators is established.',
    details: [
      'Shifts Senate selection from state legislatures to the people.'
    ],
  },
];

const APGovUnit2: React.FC = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleTopic = (key: string) => {
    setOpenTopic(openTopic === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => navigate('/ap-gov-study-guide')}
          className="mb-6 px-4 py-2 rounded-lg bg-white text-red-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Units
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-800">AP Gov Unit 2: Interactions Among Branches of Government</h1>
          <p className="text-lg text-slate-600 mt-2">Structure, powers, and functions of Congress, the presidency, and the courts.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b-2 border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'topics' ? 'border-b-4 border-red-600 text-red-700' : 'text-slate-500 hover:text-red-600'}`}
          >
            Key Topics
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'timeline' ? 'border-b-4 border-red-600 text-red-700' : 'text-slate-500 hover:text-red-600'}`}
          >
            Timeline
          </button>
          <button
            onClick={() => navigate('/ap-gov-study-guide/unit/2/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-red-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit2Content.map((topic) => (
                <div key={topic.key} className="border-b border-slate-200 last:border-b-0 pb-4">
                  <button
                    onClick={() => toggleTopic(topic.key)}
                    className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-red-700">{topic.title}</h3>
                    <span className="text-2xl text-slate-500">{openTopic === topic.key ? '-' : '+'}</span>
                  </button>
                  {openTopic === topic.key && (
                    <div className="p-4 bg-slate-50 rounded-b-lg">
                      {topic.subsections.map((subsection, i) => (
                        <div key={i} className="mb-4">
                          <h4 className="text-base font-semibold text-red-700 mb-2">{subsection.heading}</h4>
                          <ul className="list-disc pl-6 space-y-2 text-slate-700 leading-relaxed">
                            {subsection.points.map((point, j) => (
                              <li key={j}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="relative border-l-4 border-red-200 ml-4 pl-8 space-y-12">
              {timelineData.map((event) => (
                <div key={event.key} className="relative">
                  <div className="absolute -left-11 -top-1 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl shadow-md">
                    {event.icon}
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl shadow-md">
                    <h3 className="text-2xl font-bold text-red-800 mb-2">{event.title}</h3>
                    <p className="text-lg text-slate-600 mb-4">{event.summary}</p>
                    <ul className="space-y-2 list-disc pl-5">
                      {event.details.map((detail, index) => (
                        <li key={index} className="text-base text-slate-700">{detail}</li>
                      ))}
                    </ul>
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

export default APGovUnit2;
