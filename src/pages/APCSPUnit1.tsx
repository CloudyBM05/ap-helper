import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit1Content = [
	{
		key: '1.1',
		title: '1.1 — Collaboration',
		bullets: [
			{
				subtopic: 'Role in Programming',
				points: [
					'Programming is both a collaborative and creative process, turning abstract ideas into real, functioning software.',
					'Many professional software projects involve teamwork, with individuals contributing to planning, designing, implementing, and testing.',
				],
			},
			{
				subtopic: 'When Collaboration Happens',
				points: [
					'Planning — brainstorming ideas, defining features, writing specifications.',
					'Designing — deciding algorithms, structuring data, planning user interfaces.',
					'Testing (Debugging) — finding and fixing problems through group code review.',
				],
			},
			{
				subtopic: 'Computing Innovations',
				points: [
					'Definition: Uses a computer program to take in data, transform data, and output data.',
					'Examples: video streaming platforms, ride-sharing apps, AI chatbots, GPS navigation systems.',
				],
			},
			{
				subtopic: 'Collaboration Tools',
				points: [
					'Version control systems (e.g., GitHub, GitLab).',
					'Real-time communication (e.g., Slack, Microsoft Teams).',
					'Shared file platforms (e.g., Google Drive, Dropbox).',
					'Project management boards (e.g., Trello, Jira).',
				],
			},
			{
				subtopic: 'Collaboration Methods',
				points: [
					'Peer-to-peer: work between two individuals.',
					'Small group / large group: multiple people working together on separate components.',
					'Peer instruction: explaining concepts to one another, discussing possible solutions, and learning from mistakes.',
				],
			},
		],
	},
	{
		key: '1.2',
		title: '1.2 — Program Function and Purpose',
		bullets: [
			{
				subtopic: 'Program Function',
				points: [
					'What a program does — the specific tasks it performs when run.',
					'Inputs: data or actions the program receives (from user, file, sensor, etc.).',
					'Processing: algorithms that transform inputs into results.',
					'Outputs: the information, visuals, or actions produced.',
					'Example: A weather app: Input: location → Processing: retrieve forecast data from API → Output: display temperature and precipitation forecast.',
				],
			},
			{
				subtopic: 'Program Purpose',
				points: [
					'Why the program exists — the problem it solves or the need it addresses.',
					'Entertainment (games, streaming).',
					'Productivity (word processors, spreadsheets).',
					'Data analysis (scientific research tools).',
					'Communication (messaging apps, email).',
				],
			},
			{
				subtopic: 'Determining Purpose and Function',
				points: [
					'Read program documentation or comments.',
					'Identify input and output behavior.',
					'Run the program with different inputs to observe changes.',
				],
			},
		],
	},
	{
		key: '1.3',
		title: '1.3 — Program Design and Development',
		bullets: [
			{
				subtopic: 'Iterative Development',
				points: [
					'Process of repeatedly designing, coding, testing, and refining a program.',
					'Benefits: Catches issues early, allows for gradual improvement, adapts to changing requirements.',
				],
			},
			{
				subtopic: 'Incremental Development',
				points: [
					'Building a program in small sections, testing each section before moving on.',
					'Prevents large-scale failures and makes debugging easier.',
				],
			},
			{
				subtopic: 'Development Stages',
				points: [
					'Planning: Define problem requirements, determine goals, constraints, and success criteria.',
					'Designing: Write pseudocode, create flowcharts, decide on data structures and algorithms.',
					'Implementation: Write the actual program code, follow language syntax and naming conventions.',
					'Testing & Debugging: Run test cases, identify and fix issues.',
					'Documentation: Write instructions, usage guides, and inline comments.',
				],
			},
			{
				subtopic: 'Benefits of Planning Before Coding',
				points: [
					'Reduces wasted time on rework.',
					'Makes code easier to maintain.',
					'Improves clarity for all team members.',
				],
			},
		],
	},
	{
		key: '1.4',
		title: '1.4 — Identifying and Correcting Errors',
		bullets: [
			{
				subtopic: 'Why Error Identification Matters',
				points: [
					'Prevents crashes, incorrect results, and unexpected program behavior.',
					'Improves user trust and program reliability.',
				],
			},
			{
				subtopic: 'Types of Errors',
				points: [
					'Syntax Error: Violates the rules of the programming language. Example: a ← expression, DISPLAY (A) // "A" is not the same as "a" — case sensitive. Detected before program runs.',
					'Runtime Error: Happens while the program is running. Example: DISPLAY (5 / 0) // Division by zero. Causes program to stop unexpectedly.',
					'Logic Error: Program runs but produces incorrect output due to flawed algorithm. Example: IF statements without ELSE IF can execute multiple conditions.',
					'Overflow Error: Number exceeds the storage range of its data type. Example: x ← 2000 * 365 // May exceed data type limits.',
				],
			},
			{
				subtopic: 'Debugging Process',
				points: [
					'Use test cases to check behavior.',
					'Add extra output statements to trace program flow.',
					'Check syntax carefully.',
					'Use language-specific debugging tools.',
				],
			},
		],
	},
];

const APCSPUnit1 = () => {
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
						onClick={() => navigate('/ap-csp-big-idea/1/quiz')}
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
								🎨 AP CSP Big Idea 1: Creative Development
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Collaboration, program function and purpose, design and development, and error identification.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit1Content.map((topic) => (
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

export default APCSPUnit1;
