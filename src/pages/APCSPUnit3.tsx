import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit3Content = [
	{
		key: '3.1',
		title: '3.1 — Variables and Assignments',
		bullets: [
			{
				subtopic: 'Variables',
				points: [
					'Named placeholders for values a program will use.',
					'Can store numbers (integers, floats), text, or Boolean values.',
					'Used in expressions (mathematical or textual).',
					'Names should be descriptive for clarity.',
					'<strong>Data abstraction:</strong> You don\'t need to know how or where values are stored in memory to use variables.',
				],
			},
			{
				subtopic: 'Assignment Statements',
				points: [
					'Use = in most languages (or ← in pseudocode) to store a value in a variable.',
					'<strong>Syntax:</strong> variable on the left, value/expression on the right.',
					'Right-hand side is evaluated first, then assigned to left-hand variable.',
					'Overwrites previous variable value.',
					'<code>score ← 10<br/>score ← 11  // old value (10) is lost</code>',
				],
			},
			{
				subtopic: 'Expressions',
				points: [
					'Calculations or operations producing a single value.',
					'<strong>Order of operations (PEMDAS):</strong> Parentheses → Exponents → Multiplication → Division → Addition → Subtraction.',
				],
			},
		],
	},
	{
		key: '3.2',
		title: '3.2 — Data Abstraction',
		bullets: [
			{
				subtopic: 'Abstraction Concept',
				points: [
					'<strong>Abstraction = information hiding.</strong>',
					'Related variables can be bundled (e.g., in lists) to simplify program design.',
					'Allows hierarchical thinking about program data.',
					'Avoids having separate variables for each value.',
				],
			},
			{
				subtopic: 'List Example',
				points: [
					'<code>colorList ← ["red", "blue", "green"]</code>',
					'Access elements via index: <code>colorList[1] = "red"</code>',
					'Enable processing multiple values efficiently.',
				],
			},
		],
	},
	{
		key: '3.3',
		title: '3.3 — Mathematical Expressions',
		bullets: [
			{
				subtopic: 'Variables in Calculations',
				points: [
					'Variables can be part of mathematical calculations.',
					'Follows order of operations.',
					'The result can be stored in variables or displayed directly.',
				],
			},
			{
				subtopic: 'Expression Components',
				points: [
					'Addition, subtraction, multiplication, division, exponents.',
					'Parentheses for grouping operations.',
				],
			},
		],
	},
	{
		key: '3.4',
		title: '3.4 — Strings',
		bullets: [
			{
				subtopic: 'String Definition',
				points: [
					'<strong>Strings = text values enclosed in quotes</strong> ("Hello").',
					'Can include letters, digits, symbols.',
					'Numbers inside strings are treated as text (cannot be used in calculations unless converted).',
				],
			},
			{
				subtopic: 'Important Note',
				points: [
					'<code>Example: "123" is not equal to number 123</code>',
				],
			},
		],
	},
	{
		key: '3.5',
		title: '3.5 — Boolean Expressions',
		bullets: [
			{
				subtopic: 'Boolean Values',
				points: [
					'<strong>Boolean values:</strong> only true or false.',
					'Require only one bit for storage.',
					'Often used in decision-making (if statements, loops).',
				],
			},
			{
				subtopic: 'Relational Operators',
				points: [
					'= (equal), ≠ (not equal).',
					'&lt; (less than), &gt; (greater than).',
					'≤ (less than or equal), ≥ (greater than or equal).',
				],
			},
		],
	},
	{
		key: '3.6',
		title: '3.6 — Conditionals',
		bullets: [
			{
				subtopic: 'Control Program Flow',
				points: [
					'Control program flow based on conditions.',
					'Executes code only if condition is true.',
					'<strong>Syntax:</strong> IF (condition) { statements }',
					'Curly braces {} group the conditional block.',
					'Indentation improves readability.',
				],
			},
		],
	},
	{
		key: '3.7',
		title: '3.7 — Nested Conditionals',
		bullets: [
			{
				subtopic: 'Nested Structure',
				points: [
					'An if statement inside another if.',
					'Used when a decision depends on the result of a prior decision.',
				],
			},
			{
				subtopic: 'Example',
				points: [
					'<code>IF (x > 0) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;IF (x < 10) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DISPLAY("x is between 1 and 9")<br/>&nbsp;&nbsp;&nbsp;&nbsp;}<br/>}</code>',
				],
			},
		],
	},
	{
		key: '3.8',
		title: '3.8 — Iteration',
		bullets: [
			{
				subtopic: 'Loop Purpose',
				points: [
					'Loops repeat code until a condition is met.',
					'Allows repeated execution without duplicating code.',
				],
			},
			{
				subtopic: 'Repeat Until Loop',
				points: [
					'Runs until the condition is true.',
					'Similar to while loops in many languages.',
				],
			},
		],
	},
	{
		key: '3.9',
		title: '3.9 — Developing Algorithms',
		bullets: [
			{
				subtopic: 'Algorithm Definition',
				points: [
					'<strong>Algorithm:</strong> step-by-step instructions to solve a problem.',
					'Can be reused, combined, or modified for different problems.',
				],
			},
			{
				subtopic: 'Common Algorithms',
				points: [
					'Find max/min from numbers.',
					'Calculate sum and average (keep track of count for average).',
				],
			},
			{
				subtopic: 'Problem Types',
				points: [
					'<strong>Decision problems:</strong> yes/no answers.',
					'<strong>Optimization problems:</strong> best possible solution.',
				],
			},
		],
	},
	{
		key: '3.10',
		title: '3.10 — Lists',
		bullets: [
			{
				subtopic: 'List Definition',
				points: [
					'<strong>List = collection of items in a single variable.</strong>',
					'Can store numbers, strings, or both (depending on language).',
					'Elements accessed via index starting at position 1 (AP pseudocode).',
					'Also called arrays in some languages.',
				],
			},
			{
				subtopic: 'Built-in List Operations',
				points: [
					'<strong>INSERT(list, i, value):</strong> insert at index i (shifts elements right).',
					'<strong>APPEND(list, value):</strong> add to end of list.',
					'<strong>REMOVE(list, i):</strong> remove element at index i (shifts elements left).',
					'<strong>LENGTH(list):</strong> number of elements in the list.',
				],
			},
			{
				subtopic: 'Traversing a List',
				points: [
					'<strong>FOR EACH loop:</strong>',
					'<code>FOR EACH item IN myList {<br/>&nbsp;&nbsp;&nbsp;&nbsp;// process item<br/>}</code>',
					'Used for tasks like summing all values, finding max/min, searching.',
				],
			},
		],
	},
	{
		key: '3.11',
		title: '3.11 — Binary Search',
		bullets: [
			{
				subtopic: 'Linear Search',
				points: [
					'Checks elements one by one from start to end.',
				],
			},
			{
				subtopic: 'Binary Search',
				points: [
					'Requires sorted list.',
					'Compares target to middle element.',
					'Eliminates half of remaining possibilities each step (divide and conquer).',
					'More efficient than linear search for large datasets.',
				],
			},
		],
	},
	{
		key: '3.12',
		title: '3.12 — Calling Procedures',
		bullets: [
			{
				subtopic: 'Procedure Definition',
				points: [
					'<strong>Procedure = named block of code, executed only when called.</strong>',
					'Can be called by main program or another procedure.',
					'Control returns to calling location after execution.',
					'<strong>Procedural abstraction:</strong> you only need to know procedure name, parameters, and expected output.',
				],
			},
		],
	},
	{
		key: '3.13',
		title: '3.13 — Developing Procedures',
		bullets: [
			{
				subtopic: 'Parameters vs Arguments',
				points: [
					'<strong>Parameters:</strong> variables passed into procedure for customization.',
					'<strong>Arguments:</strong> actual values sent to procedure.',
					'Same procedure can handle different values each time.',
				],
			},
			{
				subtopic: 'Return Statements',
				points: [
					'End procedure early.',
					'Send a value back to the caller.',
				],
			},
		],
	},
	{
		key: '3.14',
		title: '3.14 — Libraries',
		bullets: [
			{
				subtopic: 'Library Definition',
				points: [
					'<strong>Library:</strong> collection of prewritten code.',
					'<strong>API:</strong> Application Programming Interface — documentation on how to use library functions.',
				],
			},
			{
				subtopic: 'Benefits',
				points: [
					'Reuse tested code.',
					'Save development time.',
				],
			},
		],
	},
	{
		key: '3.15',
		title: '3.15 — Random Values',
		bullets: [
			{
				subtopic: 'Random Number Generators',
				points: [
					'Require a range (start, end).',
					'<code>Example: RANDOM(1, 10) → number between 1 and 10 inclusive</code>',
					'Commonly used in games, simulations, and sampling.',
				],
			},
		],
	},
	{
		key: '3.16',
		title: '3.16 — Simulations',
		bullets: [
			{
				subtopic: 'Simulation Definition',
				points: [
					'<strong>Simulation:</strong> program that models real-world systems for testing and prediction.',
				],
			},
			{
				subtopic: 'Examples',
				points: [
					'Traffic modeling.',
					'Solar activity modeling.',
				],
			},
			{
				subtopic: 'Advantages',
				points: [
					'Can test scenarios without real-world risk or cost.',
					'Visualizes system behavior.',
					'Require significant design effort.',
				],
			},
		],
	},
	{
		key: '3.17',
		title: '3.17 — Algorithmic Efficiency',
		bullets: [
			{
				subtopic: 'Efficiency Measures',
				points: [
					'<strong>Time:</strong> how long to execute.',
					'<strong>Space:</strong> memory required.',
					'Efficiency grows in importance for large datasets.',
				],
			},
			{
				subtopic: 'Determining Efficiency',
				points: [
					'<strong>Mathematically:</strong> complexity analysis.',
					'<strong>Experimentally:</strong> timing with various inputs.',
				],
			},
		],
	},
	{
		key: '3.18',
		title: '3.18 — Undecidable Problems',
		bullets: [
			{
				subtopic: 'Decidable vs Undecidable',
				points: [
					'<strong>Decidable:</strong> algorithm exists to give correct yes/no answer for all inputs.',
					'<strong>Example of decidable:</strong> checking if a number is prime.',
					'<strong>Undecidable:</strong> no algorithm exists to answer correctly for all cases.',
				],
			},
			{
				subtopic: 'Heuristic Approach',
				points: [
					'Some problems can only be solved with a heuristic approach.',
					'Produces a good-enough solution, but not guaranteed optimal.',
				],
			},
		],
	},
];

const APCSPUnit3 = () => {
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
						onClick={() => navigate('/ap-csp-big-idea/3/quiz')}
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
								💻 AP CSP Big Idea 3: Algorithms and Programming
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Variables, conditionals, loops, procedures, lists, search algorithms, and algorithmic efficiency.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit3Content.map((topic) => (
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

export default APCSPUnit3;
