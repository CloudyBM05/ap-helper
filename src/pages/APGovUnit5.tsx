import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit5Content = [
	{
		key: '5.1',
		title: '5.1: Voting Rights and Models of Behavior',
		subsections: [
			{
				heading: 'Constitutional and Legal Protections',
				points: [
					'Article I, Section 4: States determine voting logistics, but Congress can override.',
					'15th Amendment: Prohibits denial of vote based on race (Black male suffrage).',
					'17th Amendment: Citizens directly elect U.S. Senators.',
					'19th Amendment: Women granted suffrage.',
					'24th Amendment: Bans poll taxes.',
					'26th Amendment: Lowers voting age to 18.',
				],
			},
			{
				heading: 'Voting Models',
				points: [
					'Rational Choice Voting: Decisions based on personal interest and research.',
					'Retrospective Voting: Based on past performance of candidate or party.',
					'Prospective Voting: Based on expectations of future performance.',
					'Party-Line Voting: Voting exclusively for one party across the ballot.',
				],
			},
		],
	},
	{
		key: '5.2',
		title: '5.2: Voter Turnout',
		subsections: [
			{
				heading: 'Factors Influencing Turnout',
				points: [
					'Structural Barriers: ID laws, registration deadlines, weekday voting, etc.',
					"Political Efficacy: Belief that one's vote makes a difference.",
					'Demographics: Older, wealthier, and more educated people vote more.',
					'Type of Election: Higher turnout in presidential than midterms or local.',
				],
			},
			{
				heading: 'Voter Behavior Influencers',
				points: [
					'Party affiliation',
					'Candidate image',
					'Salient issues',
					'Ideology',
					'Socioeconomic factors (age, race, gender, income, education)',
				],
			},
		],
	},
	{
		key: '5.3',
		title: '5.3: Political Parties and Linkage Institutions',
		subsections: [
			{
				heading: 'Definition of Linkage Institutions',
				points: [
					'Connect citizens to the government (e.g., political parties, elections, media, interest groups).',
				],
			},
			{
				heading: 'Political Party Functions',
				points: [
					'Recruit and nominate candidates.',
					'Educate and mobilize voters.',
					'Create and promote a party platform.',
					'Provide campaign support (consulting, fundraising, data).',
					'Serve as watchdogs over other parties when out of power.',
				],
			},
		],
	},
	{
		key: '5.4',
		title: '5.4: Evolution of Political Parties',
		subsections: [
			{
				heading: 'Party Evolution',
				points: [
					'Candidate-centered campaigns now dominate over party-centered.',
					'Technology and social media have changed campaign strategies.',
					'Parties adapt platforms to appeal to shifting demographics and psychographics.',
				],
			},
			{
				heading: 'Demographic Shifts',
				points: [
					'Rise of diverse coalitions influences party positions.',
					'Younger, more diverse populations lean left.',
				],
			},
		],
	},
	{
		key: '5.5',
		title: '5.5: Third Parties',
		subsections: [
			{
				heading: 'Obstacles Faced',
				points: [
					'Winner-take-all electoral system limits third-party success.',
					'Major parties absorb third-party ideas.',
					'Limited media coverage and debate access.',
					'Lack of funding and resources.',
				],
			},
			{
				heading: 'Contributions',
				points: [
					'Bring attention to ignored issues.',
					'Influence major party platforms.',
				],
			},
		],
	},
	{
		key: '5.6',
		title: '5.6: Interest Groups in Policymaking',
		subsections: [
			{
				heading: 'Interest Groups',
				points: [
					'Advocate for specific policy interests.',
					'Educate the public and policymakers.',
					'Lobby government officials.',
					'Provide expert information and draft legislation.',
				],
			},
			{
				heading: 'Tools of Influence',
				points: [
					'Mobilize voters.',
					'Contribute to campaigns (via PACs).',
					'Use litigation (e.g., amicus curiae briefs).',
				],
			},
			{
				heading: 'Iron Triangle',
				points: [
					'Relationship between Congress, bureaucrats, and interest groups.',
				],
			},
			{
				heading: 'Issue Networks',
				points: [
					'Looser, temporary alliances to promote policy change.',
				],
			},
			{
				heading: 'Challenges',
				points: [
					'Inequities in access and resources.',
					'Free rider problem.',
				],
			},
		],
	},
	{
		key: '5.7',
		title: '5.7: Influencing Policy Outcomes',
		subsections: [
			{
				heading: 'Social Movements',
				points: [
					'Organized efforts for large-scale policy changes (e.g., Civil Rights, Women’s Rights).',
				],
			},
			{
				heading: 'Protests',
				points: [
					'Raise awareness and apply pressure (e.g., March for Our Lives, BLM).',
				],
			},
			{
				heading: 'Grassroots Mobilization',
				points: [
					'Local-level, community-based advocacy and participation.',
				],
			},
		],
	},
	{
		key: '5.8',
		title: '5.8: Electing the President',
		subsections: [
			{
				heading: 'Primary and Caucus Systems',
				points: [
					'Open Primary: Any registered voter can participate.',
					'Closed Primary: Only registered party members can vote.',
					'Caucus: Public discussion followed by a vote.',
				],
			},
			{
				heading: 'National Conventions',
				points: [
					'Formal nomination of party candidates.',
				],
			},
			{
				heading: 'Incumbency Advantage',
				points: [
					'Name recognition, experience, and fundraising base.',
				],
			},
			{
				heading: 'Electoral College',
				points: [
					'Electors chosen based on state popular vote.',
					'Winner-take-all in most states.',
					'Faithless electors can defy popular vote.',
					'Swing states play pivotal roles.',
				],
			},
		],
	},
	{
		key: '5.9',
		title: '5.9: Congressional Elections',
		subsections: [
			{
				heading: 'Structure',
				points: [
					'House: 2-year terms, entire chamber up for election every two years.',
					'Senate: 6-year terms, 1/3 up for reelection every two years.',
				],
			},
			{
				heading: 'Incumbency Advantage',
				points: [
					'Easier fundraising, name recognition, casework, and media coverage.',
				],
			},
			{
				heading: 'Primary Types',
				points: [
					'Open, closed, and caucuses.',
				],
			},
		],
	},
	{
		key: '5.10',
		title: '5.10: Campaigns and Strategy',
		subsections: [
			{
				heading: 'Modern Campaign Characteristics',
				points: [
					'Longer, costlier, and more complex.',
					'Reliance on consultants and polling.',
					'Use of social media and targeted advertisements.',
					'Canvassing, GOTV efforts.',
				],
			},
			{
				heading: 'Campaign Staff Roles',
				points: [
					'Campaign manager, data analyst, PR specialists, fundraisers.',
				],
			},
		],
	},
	{
		key: '5.11',
		title: '5.11: Campaign Finance',
		subsections: [
			{
				heading: 'Federal Election Commission (FEC)',
				points: [
					'Regulates campaign finance laws.',
					'Enforces contribution and spending limits.',
				],
			},
			{
				heading: 'Types of Money',
				points: [
					'Hard Money: Direct, regulated donations to candidates.',
					'Soft Money: Indirect, often unregulated, donations to parties or interest groups.',
				],
			},
			{
				heading: 'PACs',
				points: [
					'Connected PACs: Formed by interest groups; contributions from members.',
					'Non-connected PACs: Public donors; can donate directly to candidates.',
					'Super PACs: Unlimited donations; cannot coordinate with campaigns.',
				],
			},
			{
				heading: 'Citizens United v. FEC (2010)',
				points: [
					'Ruled corporate political spending is protected speech.',
					'Opened the door to Super PACs.',
				],
			},
		],
	},
	{
		key: '5.12',
		title: '5.12: The Role of the Media',
		subsections: [
			{
				heading: 'Linkage Institution',
				points: [
					'Connects public to government actions and policy debates.',
				],
			},
			{
				heading: 'Functions',
				points: [
					'Report news',
					'Act as watchdog (investigative journalism)',
					'Shape public opinion',
					'Provide electoral information',
				],
			},
			{
				heading: 'Horse-Race Journalism',
				points: [
					'Focuses on polls, not policies or platforms.',
				],
			},
		],
	},
	{
		key: '5.13',
		title: '5.13: Media and Political Behavior',
		subsections: [
			{
				heading: 'Changing Media Landscape',
				points: [
					'Rise of 24-hour cable news, digital platforms, and social media.',
					'Fragmentation of news sources.',
				],
			},
			{
				heading: 'Media Bias',
				points: [
					'Perceived or real ideological leanings influence coverage.',
					'Can lead to selective exposure and echo chambers.',
				],
			},
			{
				heading: 'Effects on Institutions and Behavior',
				points: [
					'Polarization and mistrust.',
					'Greater access to information, but also misinformation.',
					'Increased citizen engagement through digital platforms.',
				],
			},
		],
	},
];

// Add placeholder timeline data for Unit 5
const timelineData = [
	{
		key: '1965',
		icon: '🗳️',
		title: '1965 – Voting Rights Act',
		summary: 'Landmark legislation to end racial discrimination in voting.',
		details: ['Federal government enforces voting rights in the South.'],
	},
	{
		key: '1971',
		icon: '🔞',
		title: '1971 – 26th Amendment',
		summary: 'Lowers the voting age from 21 to 18.',
		details: ['Expands the electorate to millions of young Americans.'],
	},
];

const APGovUnit5: React.FC = () => {
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
					Back to Units
				</button>

				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-red-800">
						AP Gov Unit 5: Political Participation
					</h1>
					<p className="text-lg text-slate-600 mt-2">
						Voting, political parties, interest groups, and the media.
					</p>
				</div>

				{/* Tabs */}
				<div className="flex justify-center border-b-2 border-slate-200 mb-8">
					<button
						onClick={() => setActiveTab('topics')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'topics'
								? 'border-b-4 border-red-600 text-red-700'
								: 'text-slate-500 hover:text-red-600'
						}`}
					>
						Key Topics
					</button>
					<button
						onClick={() => setActiveTab('timeline')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'timeline'
								? 'border-b-4 border-red-600 text-red-700'
								: 'text-slate-500 hover:text-red-600'
						}`}
					>
						Timeline
					</button>
					<button
						onClick={() => navigate('/ap-gov-study-guide/unit/5/quiz')}
						className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-red-600 transition-colors"
					>
						Take Quiz
					</button>
				</div>

				{/* Content */}
				<div className="bg-white p-6 rounded-2xl shadow-lg">
					{activeTab === 'topics' && (
						<div className="space-y-4">
							{unit5Content.map((topic) => (
								<div
									key={topic.key}
									className="border-b border-slate-200 last:border-b-0 pb-4"
								>
									<button
										onClick={() => toggleTopic(topic.key)}
										className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
									>
										<h3 className="text-xl font-semibold text-red-700">
											{topic.title}
										</h3>
										<span className="text-2xl text-slate-500">
											{openTopic === topic.key ? '-' : '+'}
										</span>
									</button>
									{openTopic === topic.key && (
										<div className="p-4 bg-slate-50 rounded-b-lg">
											{topic.subsections.map((subsection, i) => (
												<div key={i} className="mb-4">
													<h4 className="text-base font-semibold text-red-700 mb-2">
														{subsection.heading}
													</h4>
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
										<h3 className="text-2xl font-bold text-red-800 mb-2">
											{event.title}
										</h3>
										<p className="text-lg text-slate-600 mb-4">
											{event.summary}
										</p>
										<ul className="space-y-2 list-disc pl-5">
											{event.details.map((detail, index) => (
												<li key={index} className="text-base text-slate-700">
													{detail}
												</li>
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

export default APGovUnit5;
