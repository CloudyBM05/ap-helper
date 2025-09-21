import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Placeholder timeline data for AP Gov Unit 1
const timelineData = [
	{
		key: '1787',
		icon: '📜',
		title: '1787 – Constitutional Convention',
		summary: 'Delegates meet in Philadelphia to draft the U.S. Constitution.',
		details: [
			'The Articles of Confederation are replaced with a stronger federal framework.',
			'Key debates include representation, federalism, and the separation of powers.',
		],
	},
	{
		key: '1789',
		icon: '⚖️',
		title: '1789 – Ratification of the Constitution',
		summary: 'The Constitution is ratified and becomes the supreme law of the land.',
		details: [
			'Federalists and Anti-Federalists debate the need for a Bill of Rights.',
			'The new government structure is implemented.',
		],
	},
	{
		key: '1803',
		icon: '🔎',
		title: '1803 – Marbury v. Madison',
		summary: 'Establishes the principle of judicial review.',
		details: [
			'Supreme Court asserts its power to declare laws unconstitutional.',
		],
	},
];

const unit1Content = [
	{
		key: '1.1',
		title: '1.1 - Ideals of Democracy',
		subsections: [
			{
				heading: 'Core Tenets',
				points: [
					'The U.S. government is built on Enlightenment ideals of individual liberty and limited government.',
					'Natural Rights (John Locke): Life, liberty, and property are rights governments must protect.',
					'Social Contract (Rousseau): People agree to give up some freedoms for government protection; if the government violates this contract, the people can revolt.',
					'Popular Sovereignty: The government\'s power comes from the consent of the governed.',
					'Republicanism: A system of government by elected representatives, with power separated into three branches.',
				],
			},
			{
				heading: 'Enlightenment Philosophers',
				points: [
					'John Locke: Championed natural rights and the idea of a limited government.',
					'Thomas Hobbes: Argued that humans are inherently selfish and need a powerful government to prevent chaos.',
					'Baron de Montesquieu: Advocated for the separation of powers to prevent tyranny.',
				],
			},
		],
	},
	{
		key: '1.2',
		title: '1.2 - Types of Democracy',
		subsections: [
			{
				heading: 'Participatory Democracy',
				points: [
					'Emphasizes broad, direct involvement of citizens in politics.',
					'Examples: Town hall meetings, referendums, and initiatives.',
					'Potential Danger: Can lead to "mob rule" where the majority infringes on minority rights.',
				],
			},
			{
				heading: 'Pluralist Democracy',
				points: [
					'Power is distributed among various non-governmental groups (e.g., interest groups, unions).',
					'Promotes competition and compromise among groups, preventing any single group from dominating.',
					'Hyperspluralism: A negative outcome where too many competing groups cause government gridlock.',
				],
			},
			{
				heading: 'Elite Democracy',
				points: [
					'Power is held by a small number of educated and wealthy elites.',
					'Argument: Elites are better equipped to make complex decisions for the country.',
					'Examples in the U.S. System: The Electoral College and lifetime appointments for Supreme Court Justices.',
				],
			},
		],
	},
	{
		key: '1.3',
		title: '1.3 - Government Power and Individual Rights',
		subsections: [
			{
				heading: 'Federalists vs. Anti-Federalists',
				points: [
					'Federalists: Supported the Constitution, advocating for a strong central government, checks and balances, and a single executive. Authored the Federalist Papers (notably #10 and #51).',
					'Anti-Federalists: Opposed the Constitution without a Bill of Rights, fearing a strong central government would infringe on state sovereignty and individual liberties. Authored Brutus 1.',
				],
			},
			{
				heading: 'Key Concepts',
				points: [
					'James Madison ("Father of the Constitution"): Warned against the dangers of factions in Federalist No. 10 and designed the Madisonian Model to prevent tyranny.',
					'Tyranny of the Majority: The risk that a majority can use its power to override the rights and interests of the minority.',
					'Factions: Groups (like political parties or interest groups) that were feared by the founders but are protected under the First Amendment.',
				],
			},
		],
	},
	{
		key: '1.4',
		title: '1.4 - Challenges of The Articles of Confederation',
		subsections: [
			{
				heading: 'Weaknesses of the Articles',
				points: [
					'No executive branch to enforce laws.',
					'No national military or unified currency.',
					'Congress lacked the power to tax or regulate interstate commerce.',
					'Amending the Articles required a unanimous vote, making changes nearly impossible.',
				],
			},
			{
				heading: 'Shays\' Rebellion',
				points: [
					'An uprising of indebted farmers in Massachusetts who were losing their land.',
					'The rebellion highlighted the federal government\'s inability to respond to internal crises.',
					'It served as a major catalyst for the Constitutional Convention.',
				],
			},
		],
	},
	{
		key: '1.5',
		title: '1.5 - Ratification of the Constitution',
		subsections: [
			{
				heading: 'Constitutional Convention (1787)',
				points: [
					'Delegates met to address the failures of the Articles of Confederation.',
					'Virginia Plan: Proposed representation based on population, favoring large states.',
					'New Jersey Plan: Proposed equal representation for all states, favoring small states.',
					'Great Compromise (Connecticut Compromise): Created a bicameral legislature with the House (population-based) and the Senate (equal representation).',
				],
			},
			{
				heading: 'Key Compromises & Features',
				points: [
					'Three-Fifths Compromise: Counted slaves as 3/5 of a person for representation and taxation purposes.',
					'Electoral College: Established an indirect method for electing the president.',
					'Article V (Amending the Constitution): Requires supermajorities in Congress and the states, ensuring stability while allowing for adaptation.',
				],
			},
		],
	},
	{
		key: '1.6',
		title: '1.6 - Principles of American Government',
		subsections: [
			{
				heading: 'Six Core Principles',
				points: [
					'Popular Sovereignty',
					'Limited Government',
					'Separation of Powers',
					'Checks and Balances',
					'Federalism',
					'Judicial Review',
				],
			},
			{
				heading: 'Checks and Balances',
				points: [
					'A system where each branch of government can limit the powers of the others.',
					'Examples: The President can veto laws from Congress; Congress can impeach the President; the Supreme Court can declare laws unconstitutional.',
					'Designed to prevent tyranny and force slow, deliberate change.',
				],
			},
		],
	},
	{
		key: '1.7-1.9',
		title: '1.7-1.9 - Federalism',
		subsections: [
			{
				heading: 'Defining Federalism',
				points: [
					'Federalism: A system of shared power between national and state governments.',
					'Enumerated Powers: Powers explicitly given to the federal government (e.g., declare war, coin money).',
					'Reserved Powers (10th Amendment): Powers reserved for the states (e.g., education, policing).',
					'Concurrent Powers: Powers shared by both federal and state governments (e.g., taxation).',
				],
			},
			{
				heading: 'Landmark Supreme Court Cases',
				points: [
					'Marbury v. Madison (1803): Established the principle of judicial review.',
					'McCulloch v. Maryland (1819): Affirmed federal supremacy (Supremacy Clause) and the use of implied powers (Necessary and Proper Clause).',
					'U.S. v. Lopez (1995): Limited the scope of the federal government\'s power under the Commerce Clause, returning some power to the states.',
				],
			},
			{
				heading: 'Types of Federalism',
				points: [
					'Dual Federalism ("Layer Cake"): State and federal governments have distinct, separate roles. (Conservative preference)',
					'Cooperative Federalism ("Marble Cake"): State and federal governments work together and mix responsibilities. (Liberal preference)',
					'Devolution: The transfer of certain powers from the federal government back to the states. (Conservative preference)',
				],
			},
			{
				heading: 'Fiscal Federalism (Grants-in-Aid)',
				points: [
					'Categorical Grants: Federal funds given to states for a specific purpose (e.g., building an airport). Gives Congress more control.',
					'Block Grants: Federal funds given to states for a broad purpose (e.g., improving education). Gives states more freedom.',
				],
			},
		],
	},
];

const APGovUnit1: React.FC = () => {
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
						AP Gov Unit 1: Foundations of American Democracy
					</h1>
					<p className="text-lg text-slate-600 mt-2">
						Key concepts, documents, and debates that shaped the U.S. government.
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
						onClick={() => navigate('/ap-gov-study-guide/unit/1/quiz')}
						className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-red-600 transition-colors"
					>
						Take Quiz
					</button>
				</div>

				{/* Content */}
				<div className="bg-white p-6 rounded-2xl shadow-lg">
					{activeTab === 'topics' && (
						<div className="space-y-4">
							{unit1Content.map((topic) => (
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

export default APGovUnit1;
