import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit5Content = [
	{
		key: '5.1',
		title: '5.1 — Beneficial and Harmful Effects',
		bullets: [
			{
				subtopic: 'Impact of the Internet and Software',
				points: [
					'Programs and apps can be shared globally, influencing society positively or negatively.',
					'Innovations may have unforeseen consequences beyond the original design intent.',
				],
			},
			{
				subtopic: 'Key Technologies and Effects',
				points: [
					'World Wide Web: Originally for scientists to share research.',
					'Targeted advertising: Helps consumers find products and businesses reach audiences efficiently.',
					'Social media: Enables global event streaming and can influence social change.',
					'Machine learning & data mining: Identify patterns in data for new innovations.',
					'Online learning: Enabled by digital communication tools.',
				],
			},
			{
				subtopic: 'Challenges',
				points: [
					'Developers cannot always predict negative uses of their software.',
				],
			},
		],
	},
	{
		key: '5.2',
		title: '5.2 — Digital Divide',
		bullets: [
			{
				subtopic: 'Cloud Computing',
				points: [
					'Stores documents and data on remote servers accessible via the Internet.',
					'Facilitates collaboration and communication across locations.',
				],
			},
			{
				subtopic: 'Digital Divide',
				points: [
					'Unequal access to technology affects access to information, markets, knowledge, and cultural exchange.',
					'Technology connects people globally but also highlights disparities in access.',
				],
			},
		],
	},
	{
		key: '5.3',
		title: '5.3 — Computing Bias',
		bullets: [
			{
				subtopic: 'Bias in Software and Algorithms',
				points: [
					'Algorithms may reflect unintentional or intentional human biases.',
					'AI programs increasingly influence real-world decisions (job applications, credit approvals, crime mapping).',
				],
			},
			{
				subtopic: 'Consequences',
				points: [
					'Biased algorithms can unintentionally discriminate against groups of people.',
				],
			},
		],
	},
	{
		key: '5.4',
		title: '5.4 — Crowdsourcing',
		bullets: [
			{
				subtopic: 'Definition',
				points: [
					'Leveraging contributions from large groups of people via the Internet.',
				],
			},
			{
				subtopic: 'Applications',
				points: [
					'Problem-solving, funding, employment, and scientific research.',
					'Citizen scientists can analyze data, identify patterns, or donate computing time.',
				],
			},
			{
				subtopic: 'Benefits',
				points: [
					'Scales processing capability at minimal cost.',
				],
			},
		],
	},
	{
		key: '5.5',
		title: '5.5 — Legal and Ethical Concerns',
		bullets: [
			{
				subtopic: 'Intellectual Property (IP)',
				points: [
					'Creators own computational artifacts they produce.',
					'Using others\' material requires citation or permission.',
				],
			},
			{
				subtopic: 'Peer-to-Peer Networks',
				points: [
					'Can facilitate illegal file sharing.',
				],
			},
			{
				subtopic: 'Data Collection and Surveillance',
				points: [
					'Devices that monitor (voice assistants, cameras) may raise ethical and legal issues.',
				],
			},
			{
				subtopic: 'Creative Commons',
				points: [
					'Licenses allow creators to specify how their works may be shared or reused.',
				],
			},
			{
				subtopic: 'Open-Source Software',
				points: [
					'Freely shared, updated, and supported by anyone.',
					'Expands access to computing capabilities for everyone.',
				],
			},
			{
				subtopic: 'Open Access',
				points: [
					'Public databases provide opportunities for research and problem-solving in many fields.',
				],
			},
		],
	},
	{
		key: '5.6',
		title: '5.6 — Safe Computing',
		bullets: [
			{
				subtopic: 'Search Trends and Analytics',
				points: [
					'Track popular topics and searches for marketing, business insights, and trend analysis.',
				],
			},
			{
				subtopic: 'Data Mining and Machine Learning',
				points: [
					'Analyze large datasets to predict behavior and generate AI insights.',
				],
			},
			{
				subtopic: 'Personally Identifiable Information (PII)',
				points: [
					'Includes addresses, social security numbers, medical, or financial information.',
					'Used to personalize online experiences but requires protection.',
				],
			},
			{
				subtopic: 'Privacy',
				points: [
					'Digital footprints: data left behind online.',
					'Browsers provide private/incognito modes to limit tracking.',
				],
			},
			{
				subtopic: 'Protecting Data',
				points: [
					'Cybersecurity is critical to prevent unauthorized access to devices, networks, and data.',
					'Strong passwords and multifactor authentication improve security.',
				],
			},
			{
				subtopic: 'Cybersecurity Threats',
				points: [
					'Phishing: fake emails/websites to steal information.',
					'Malware: viruses attach to files; keylogging software records keystrokes.',
				],
			},
			{
				subtopic: 'Cryptography',
				points: [
					'Encryption transforms data into coded formats; decryption restores it.',
					'Public key encryption uses published algorithms but secret keys for secure communication.',
				],
			},
			{
				subtopic: 'Securing the Internet',
				points: [
					'Trust model: digital certificates from Certificate Authorities validate secure websites.',
					'Certificates verify encryption keys and enable secure online transactions.',
				],
			},
		],
	},
];

const APCSPUnit5 = () => {
	const [activeTab, setActiveTab] = useState('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const navigate = useNavigate();

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	return (
		<div className="min-h-screen bg-violet-50 text-slate-800">
			<div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
				<button
					onClick={() => navigate('/ap-computer-science-principles-study-guide')}
					className="mb-6 px-4 py-2 rounded-lg bg-white text-violet-600 font-semibold hover:bg-violet-100 transition-colors shadow-sm flex items-center gap-2"
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
					Back to Big Ideas
				</button>
				{/* Tabs */}
				<div className="flex justify-center border-b-2 border-violet-200 mb-8">
					<button
						onClick={() => setActiveTab('topics')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'topics'
								? 'border-b-4 border-violet-600 text-violet-700'
								: 'text-slate-500 hover:text-violet-600'
						}`}
					>
						Key Topics
					</button>
					<button
						onClick={() => navigate('/ap-csp-big-idea/5/quiz')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'quiz'
								? 'border-b-4 border-orange-500 text-orange-700'
								: 'text-slate-500 hover:text-orange-600'
						}`}
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				{activeTab === 'topics' && (
					<>
						<div className="text-center mb-8">
							<h1 className="text-4xl font-bold text-violet-700">
								🌐 AP CSP Big Idea 5: Impact of Computing
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Beneficial and harmful effects, digital divide, computing bias, crowdsourcing, legal and ethical concerns, and safe computing practices.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit5Content.map((topic) => (
									<div
										key={topic.key}
										className="border-b border-violet-200 last:border-b-0 pb-4"
									>
										<button
											onClick={() => toggleTopic(topic.key)}
											className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-violet-50 transition-colors"
										>
											<h3 className="text-xl font-semibold text-violet-700">
												{topic.title}
											</h3>
											<span className="text-2xl text-violet-400">
												{openTopic === topic.key ? '-' : '+'}
											</span>
										</button>
										{openTopic === topic.key && (
											<div className="p-4 bg-violet-50 rounded-b-lg">
												<div className="space-y-4">
													{topic.bullets.map((section, idx) => (
														<div key={idx}>
															<div className="font-semibold text-violet-800 mb-1">
																{section.subtopic}
															</div>
															<ul className="list-disc ml-6 text-slate-700 space-y-1">
																{section.points.map((point, i) => (
																	<li key={i}>{point}</li>
																))}
															</ul>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default APCSPUnit5;
