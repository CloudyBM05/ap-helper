import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit4Content = [
	{
		key: '4.1',
		title: '4.1 - American Attitudes about Government and Politics',
		subsections: [
			{
				heading: 'Core American Values',
				points: [
					'Individualism: Emphasis on self-reliance; less communal than other cultures.',
					'Equality of Opportunity: All Americans deserve the same chance to pursue life, liberty, and happiness.',
					'Free Enterprise: Prefers minimal government interference in economic markets.',
					'Rule of Law: Everyone is equal before the law; laws govern society, not individuals.',
					'Limited Government: Power is checked by the Constitution, separation of powers, and checks and balances.',
				],
			},
			{
				heading: 'Competing Interpretations',
				points: [
					'Conservatives: Prefer smaller government and preservation of traditions. Emphasize meritocracy and equality (not equity). Want minimal business regulation.',
					'Liberals: Support reforms and expanded government roles for justice and equity. Support equity over equality. Favor government regulation of businesses.',
				],
			},
		],
	},
	{
		key: '4.2',
		title: '4.2 - Political Socialization',
		subsections: [
			{
				heading: 'Definition',
				points: ['How individuals acquire political beliefs and ideology.'],
			},
			{
				heading: 'Major Influences',
				points: [
					'Family: Political views are often inherited from parents.',
					'Schooling: Civic education, exposure to democratic values.',
					'Peers: Influence from friends and social groups.',
					'Media: Constant exposure shapes ideology; includes cable news, social media, pundits.',
					'Civic/Religious Groups: Teach values and social norms; influence policy views.',
					'Globalization: Cultural diffusion from immigration and media shapes perspectives.',
				],
			},
		],
	},
	{
		key: '4.3',
		title: '4.3 - Ideology Changes',
		subsections: [
			{
				heading: 'Generational Effects',
				points: [
					'Silent Generation: Conservative, pro-religion, anti-counterculture, Cold War loyal.',
					'Baby Boomers: Slightly more liberal, affected by Vietnam and Watergate.',
					'Gen X: More diverse, liberal-leaning, grew up with early internet.',
					'Millennials: Very liberal, diverse, support social justice and inclusive policy.',
				],
			},
			{
				heading: 'Life Cycle Effects',
				points: [
					"People's political views shift based on their stage of life (college, family, retirement).",
				],
			},
		],
	},
	{
		key: '4.4',
		title: '4.4 - Influence of Political Events on Ideology',
		subsections: [
			{
				heading: 'Key Events by Generation',
				points: [
					'Silent Generation: Great Depression & New Deal — trust in government.',
					'Boomers: Vietnam & Watergate — distrust in government, shift to conservatism.',
					'Millennials: 9/11 — fostered desire for international cooperation.',
				],
			},
			{
				heading: 'Political Events',
				points: [
					'Shape ideologies across generations; responses may vary.',
				],
			},
		],
	},
	{
		key: '4.5',
		title: '4.5 - Measuring Public Opinion',
		subsections: [
			{
				heading: 'Types of Polls',
				points: [
					'Opinion Polls: Measure views on topics/issues.',
					'Benchmark Polls: Baseline for campaigns.',
					'Tracking Polls: Monitor opinion changes.',
					'Entrance/Exit Polls: Taken at voting sites.',
				],
			},
			{
				heading: 'Accuracy of Polls',
				points: [
					'Must use random and representative samples.',
					'Sampling error must be considered.',
					'Neutral language in questions is crucial.',
				],
			},
			{
				heading: 'Survey Techniques',
				points: [
					'Mass Surveys: Quantitative data from large groups.',
					'Focus Groups: Qualitative insights from small groups.',
				],
			},
		],
	},
	{
		key: '4.6',
		title: '4.6 - Measuring Public Opinion Data',
		subsections: [
			{
				heading: 'Influence on Elections',
				points: [
					'Debate Placement: Depends on polling.',
					'Bandwagon Effect: People support those polling well.',
					'Fundraising: Strong poll numbers attract donors.',
				],
			},
			{
				heading: 'Impact on Policy',
				points: [
					'Politicians align with majority opinion to secure support.',
				],
			},
			{
				heading: 'Poll Reliability Issues',
				points: [
					'2016 Election: Polling failed due to biases.',
					'Social Desirability Bias: Voters give acceptable answers.',
					'Non-response Bias: Certain groups avoid participation.',
					'Partisan Polls: Bias from sponsor or media outlet.',
				],
			},
		],
	},
	{
		key: '4.7',
		title: '4.7 - Ideologies of Political Parties',
		subsections: [
			{
				heading: 'Ideology Spectrum',
				points: [
					'Conservative: Traditional values, small government, pro-crime enforcement.',
					'Liberal: Social justice, equality, government intervention in economy.',
				],
			},
			{
				heading: 'Party Structure',
				points: [
					'Party in the Electorate: Voters.',
					'Party in Organization: Activists and workers.',
					'Party in Government: Elected officials.',
				],
			},
			{
				heading: 'Republican Party (GOP)',
				points: [
					'Limited government, traditional values, tough on crime, lower taxes.',
				],
			},
			{
				heading: 'Democratic Party',
				points: [
					'Economic equality, social justice, expansive healthcare, progressive reform.',
				],
			},
		],
	},
	{
		key: '4.8',
		title: '4.8 - Ideologies & Policymaking',
		subsections: [
			{
				heading: 'Voting Drives Policy',
				points: [
					'More liberal voters = liberal policies, etc.',
				],
			},
			{
				heading: 'Policy Examples',
				points: [
					'English Language Debate: Conservatives want it official; Liberals see it as culturally oppressive.',
					'Multiculturalism vs. Assimilation: Conservatives = assimilation; Liberals = multiculturalism.',
				],
			},
			{
				heading: 'Legislation Examples',
				points: [
					'Conservative: Personal Responsibility and Work Opportunity Act — limits welfare.',
					'Liberal: DREAM Act and DACA — protect immigrant youth.',
				],
			},
		],
	},
	{
		key: '4.9',
		title: '4.9 - Ideologies and Economic Policy',
		subsections: [
			{
				heading: 'Fiscal Policy',
				points: [
					'Government taxing/spending — controlled by Congress.',
				],
			},
			{
				heading: 'Monetary Policy',
				points: [
					'Money supply — controlled by the Fed.',
				],
			},
			{
				heading: 'Liberal',
				points: [
					'Favors Keynesian economics — more government spending in downturns.',
					'Skeptical of monetary policy’s speed.',
				],
			},
			{
				heading: 'Conservative',
				points: [
					'Favors supply-side economics — lower taxes, fewer regulations.',
					'Prefers monetary policy tools.',
				],
			},
			{
				heading: 'Libertarian',
				points: [
					'Opposes almost all economic regulation.',
					'Supports only protection of property and voluntary trade.',
				],
			},
		],
	},
	{
		key: '4.10',
		title: '4.10 - Ideologies and Social Policy',
		subsections: [
			{
				heading: 'Libertarians',
				points: [
					'Minimal government in all areas.',
					'Pro-privacy: pro-legalization, pro-choice, anti-education mandates.',
				],
			},
			{
				heading: 'Liberals',
				points: [
					'Favor privacy in personal life: pro-choice, same-sex marriage, legal marijuana.',
					'Support government in education, health, economy.',
				],
			},
			{
				heading: 'Conservatives',
				points: [
					'Favor government intervention on issues like abortion and marriage.',
					'Support less interference in gun rights and religious expression.',
				],
			},
			{
				heading: 'Important Note',
				points: [
					'No ideology is consistently pro- or anti-government on all issues. Each chooses intervention based on value alignment.',
				],
			},
		],
	},
];

// Add placeholder timeline data for Unit 4
const timelineData = [
	{
		key: '1936',
		icon: '📊',
		title: '1936 – Literary Digest Poll Fiasco',
		summary: 'A famous polling error highlights the importance of scientific polling.',
		details: [
			'Incorrectly predicted the outcome of the presidential election due to sampling bias.',
		],
	},
	{
		key: '1965',
		icon: '🗳️',
		title: '1965 – Voting Rights Act',
		summary: 'Landmark legislation to end racial discrimination in voting.',
		details: [
			'Federal government enforces voting rights in the South.',
		],
	},
];

const APGovUnit4: React.FC = () => {
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
						AP Gov Unit 4: American Political Ideologies and Beliefs
					</h1>
					<p className="text-lg text-slate-600 mt-2">
						Political socialization, ideology, and the role of government in
						society.
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
						onClick={() => navigate('/ap-gov-study-guide/unit/4/quiz')}
						className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-red-600 transition-colors"
					>
						Take Quiz
					</button>
				</div>

				{/* Content */}
				<div className="bg-white p-6 rounded-2xl shadow-lg">
					{activeTab === 'topics' && (
						<div className="space-y-4">
							{unit4Content.map((topic) => (
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
												<li
													key={index}
													className="text-base text-slate-700"
												>
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

export default APGovUnit4;
