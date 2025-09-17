import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit4Content = [
	{
		key: '4.1',
		title: '4.1 — The Internet',
		bullets: [
			{
				subtopic: 'Definition and Origin',
				points: [
					'<strong>The Internet:</strong> A global network of interconnected computer networks.',
					'Term comes from "interconnection of computer networks."',
					'Enables worldwide communication and data sharing.',
				],
			},
			{
				subtopic: 'Hardware Components',
				points: [
					'<strong>Routers:</strong> Devices that forward data along a network path.',
					'<strong>Servers:</strong> Computers that store and serve data to other devices.',
					'<strong>Cables & Wires:</strong> Physical infrastructure connecting devices.',
				],
			},
			{
				subtopic: 'Key Processes',
				points: [
					'<strong>Routing:</strong> The process of determining the path data takes from sender to receiver.',
					'Ensures data packets reach their intended destination efficiently.',
				],
			},
			{
				subtopic: 'Network Metrics',
				points: [
					'<strong>Bandwidth:</strong> Maximum amount of data that can be transmitted per second.',
					'Affects download/upload speed.',
					'Measured in bits per second (bps).',
				],
			},
			{
				subtopic: 'Internet Protocols',
				points: [
					'<strong>IP (Internet Protocol):</strong> Responsible for addressing and routing online requests.',
					'<strong>TCP (Transmission Control Protocol):</strong> Ensures reliable, ordered delivery of data packets.',
					'<strong>UDP (User Datagram Protocol):</strong> Allows faster transmission by sending messages without retransmission checks.',
					'UDP is useful when speed is more important than reliability.',
				],
			},
			{
				subtopic: 'Scalability',
				points: [
					'<strong>Scalability:</strong> The ability of a network or system to handle increasing workloads efficiently.',
					'Critical in software engineering for applications expecting high traffic or large datasets.',
					'Allows systems to grow without major redesign.',
				],
			},
		],
	},
	{
		key: '4.2',
		title: '4.2 — Fault Tolerance',
		bullets: [
			{
				subtopic: 'Definition',
				points: [
					'<strong>Fault Tolerance:</strong> The ability of a system to continue operating properly in the event of a failure.',
					'Essential for maintaining system reliability and availability.',
				],
			},
			{
				subtopic: 'Hardware Failure',
				points: [
					'Occurs when physical devices like computers or printers stop functioning correctly.',
					'Causes include electrical issues, improper installation, or component failure.',
					'Diagnosing hardware failures often requires specialized tools and expertise.',
				],
			},
			{
				subtopic: 'Operational Failure',
				points: [
					'Breakdowns in system or process operations.',
					'Examples include unexpected downtime or incorrect outputs due to software errors.',
					'Can significantly impact business profitability and reputation if not addressed promptly.',
				],
			},
			{
				subtopic: 'Environmental Factors',
				points: [
					'<strong>Natural Disasters:</strong> Physical damage to infrastructure can disrupt network activity.',
					'<strong>Solar Flares:</strong> Intense solar radiation can interfere with network operations and electronics.',
					'Environmental threats require robust backup systems and disaster recovery plans.',
				],
			},
			{
				subtopic: 'Cyberattacks',
				points: [
					'Malicious attempts to damage or disrupt systems, networks, and data.',
					'<strong>Common techniques:</strong> malware, ransomware, phishing, social engineering, DDoS attacks, SQL injection, MITM attacks.',
					'Objectives include stealing sensitive data, financial information, or disrupting services.',
					'Require comprehensive security measures and incident response plans.',
				],
			},
		],
	},
	{
		key: '4.3',
		title: '4.3 — Parallel and Distributed Computing',
		bullets: [
			{
				subtopic: 'Parallel Computing',
				points: [
					'Executes multiple tasks simultaneously on a single computer with multiple processors.',
					'<strong>Execution Time:</strong> Total time = sequential portion + longest parallel portion.',
					'<strong>Use Cases:</strong> Real-world simulations and modeling where multiple independent computations can occur simultaneously.',
					'<strong>Memory Model:</strong> Processors may share the same memory resources.',
				],
			},
			{
				subtopic: 'Distributed Computing',
				points: [
					'Uses multiple computers (nodes) to solve problems that are too large for a single computer.',
					'Can handle tasks that require excessive processing power or storage.',
					'Computers work together over a network to solve complex problems.',
					'Examples include cloud computing and large-scale data processing.',
				],
			},
			{
				subtopic: 'Key Differences',
				points: [
					'<strong>Parallel Computing:</strong> Single computer, multiple processors.',
					'<strong>Distributed Computing:</strong> Multiple computers working together over a network.',
					'Parallel computing shares memory; distributed computing uses separate memory for each node.',
					'Choice depends on problem size, available resources, and performance requirements.',
				],
			},
		],
	},
];

const APCSPUnit4 = () => {
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
						onClick={() => navigate('/ap-csp-big-idea/4/quiz')}
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
								🌐 AP CSP Big Idea 4: Computer Systems and Networks
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Internet infrastructure, fault tolerance, parallel computing, and distributed systems.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit4Content.map((topic) => (
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
																	<li key={i} dangerouslySetInnerHTML={{ __html: point }}></li>
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

export default APCSPUnit4;
