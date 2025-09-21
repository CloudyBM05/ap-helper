import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit3Content = [
	{
		key: '3.1',
		title: '3.1 – The Bill of Rights',
		subsections: [
			{
				heading: 'Overview',
				points: [
					'The Bill of Rights contains the first 10 amendments to the U.S. Constitution.',
					'Protects civil liberties—guarantees that protect citizens from arbitrary government interference.',
					'Created due to Anti-Federalist concerns about central government overreach.',
					'James Madison initially opposed a Bill of Rights but compromised to support ratification.',
					'Drew inspiration from Virginia Declaration of Rights, English Bill of Rights, and Magna Carta.',
					'Originally protected citizens only from the federal government; 14th Amendment later applied it to states.',
				],
			},
			{
				heading: 'Summary of Amendments',
				points: [
					'1st: Religion, speech, press, assembly, petition',
					'2nd: Bear arms',
					'3rd: No quartering soldiers',
					'4th: No unreasonable searches/seizures',
					'5th: Rights of accused (due process, self-incrimination, double jeopardy)',
					'6th: Right to a speedy, public trial',
					'7th: Right to jury in civil trials',
					'8th: No cruel/unusual punishment, excessive bail',
					'9th: Other rights retained by people',
					'10th: Powers not delegated to federal government go to states',
				],
			},
		],
	},
	{
		key: '3.2',
		title: '3.2 – 1st Amendment: Religion',
		subsections: [
			{
				heading: 'Establishment Clause',
				points: [
					'No government-endorsed religion',
					'Jefferson’s "Wall of Separation" between church and state',
				],
			},
			{
				heading: 'Free Exercise Clause',
				points: ['Individuals can practice religion freely'],
			},
			{
				heading: 'Key Cases',
				points: [
					'Engel v. Vitale (1962): No state-sponsored prayer in schools',
					'Wisconsin v. Yoder (1972): Amish exempt from compulsory school beyond 8th grade',
					'Employment Division v. Smith (1990): Religious belief doesn’t excuse illegal actions',
				],
			},
		],
	},
	{
		key: '3.3',
		title: '3.3 – Freedom of Speech',
		subsections: [
			{
				heading: 'Limits and Protections',
				points: [
					'Free speech is not absolute; limits include time, place, and manner.',
					'Tinker v. Des Moines (1969): Students have right to symbolic speech if not disruptive',
					'Schenck v. U.S. (1919): Speech creating "clear and present danger" is not protected',
					'Brandenburg Test: Modern standard; must incite imminent lawless action to be restricted',
					'Defamation, obscenity, and fighting words often not protected',
				],
			},
		],
	},
	{
		key: '3.4',
		title: '3.4 – Freedom of the Press',
		subsections: [
			{
				heading: 'Press Protections',
				points: [
					'Crucial for holding government accountable',
					'Prior Restraint: Government tries to stop publication before it happens',
					'New York Times v. United States (1971): Pentagon Papers case; court ruled against Nixon, citing 1st Amendment',
					'High standard must be met to censor the press (real and imminent threat)',
				],
			},
		],
	},
	{
		key: '3.5',
		title: '3.5 – Second Amendment',
		subsections: [
			{
				heading: 'Right to Bear Arms',
				points: [
					'Debates focus on whether the right is tied to militia service or individual liberty',
					'McDonald v. Chicago (2010): Incorporated the 2nd Amendment to apply to the states',
				],
			},
		],
	},
	{
		key: '3.6',
		title: '3.6 – Individual Freedom vs. Public Safety',
		subsections: [
			{
				heading: 'Balancing Rights',
				points: [
					'Courts balance individual rights with need for public safety',
					'Eighth Amendment: Death penalty is controversial but not inherently unconstitutional',
					'Second Amendment: Gun regulation debates (e.g., after Sandy Hook)',
					'Fourth Amendment: Protection from unreasonable searches',
					'Patriot Act: Post-9/11 surveillance, controversial use of metadata',
				],
			},
		],
	},
	{
		key: '3.7',
		title: '3.7 – Selective Incorporation',
		subsections: [
			{
				heading: 'Incorporation Doctrine',
				points: [
					'Process by which SCOTUS applies Bill of Rights to states via the 14th Amendment',
					'"Selective" because done case-by-case',
					'McDonald v. Chicago: Incorporated 2nd Amendment',
					'Amendments incorporated: 1st, 2nd, 4th, 5th, 6th, 8th',
				],
			},
		],
	},
];

// Add placeholder timeline data for Unit 3
const timelineData = [
	{
		key: '1791',
		icon: '📜',
		title: '1791 – Bill of Rights Ratified',
		summary: 'The first 10 amendments to the Constitution are adopted.',
		details: ['Protects civil liberties and limits government power.'],
	},
	{
		key: '1962',
		icon: '🛐',
		title: '1962 – Engel v. Vitale',
		summary: 'Supreme Court rules school-sponsored prayer unconstitutional.',
		details: ['Establishes precedent for separation of church and state.'],
	},
	{
		key: '1971',
		icon: '📰',
		title: '1971 – Lemon v. Kurtzman',
		summary: 'Establishes Lemon Test for government involvement with religion.',
		details: ['Sets guidelines for separation of church and state.'],
	},
];

const APGovUnit3: React.FC = () => {
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
						AP Gov Unit 3: Civil Liberties and Civil Rights
					</h1>
					<p className="text-lg text-slate-600 mt-2">
						The Bill of Rights, Supreme Court cases, and the expansion of rights.
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
						onClick={() => navigate('/ap-gov-study-guide/unit/3/quiz')}
						className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-red-600 transition-colors"
					>
						Take Quiz
					</button>
				</div>

				{/* Content */}
				<div className="bg-white p-6 rounded-2xl shadow-lg">
					{activeTab === 'topics' && (
						<div className="space-y-4">
							{unit3Content.map((topic) => (
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

export default APGovUnit3;
