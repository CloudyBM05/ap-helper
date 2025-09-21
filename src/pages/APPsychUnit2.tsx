import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit2Content = [
	{
		key: '2.1',
		title: '2.1 – Perception',
		bullets: [
			{
				subtopic: 'Perception Defined',
				points: [
					'The process of organizing and interpreting sensory input to make it meaningful.',
				],
			},
			{
				subtopic: 'Bottom-Up vs. Top-Down Processing',
				points: [
					'Bottom-Up: Data-driven; perception starts with sensory input.',
					'Top-Down: Experience/expectation-driven; influenced by beliefs, memories, and prior knowledge.',
				],
			},
			{
				subtopic: 'Perceptual Sets and Schemas',
				points: [
					'Schemas: Mental frameworks that guide perception.',
					'Perceptual Sets: Expectations that influence what we perceive.',
					'Influenced by context, culture, and experience.',
				],
			},
			{
				subtopic: 'Gestalt Principles',
				points: [
					'Closure: Filling in gaps to create whole objects.',
					'Figure-Ground: Differentiating a figure from its background.',
					'Proximity: Grouping nearby items together.',
					'Similarity: Grouping similar items together.',
				],
			},
			{
				subtopic: 'Attention Mechanisms',
				points: [
					'Selective Attention: Focusing on specific stimuli (e.g., cocktail party effect).',
					'Inattentional Blindness: Failing to perceive visible objects when attention is elsewhere.',
					'Change Blindness: Not noticing changes in a visual stimulus.',
				],
			},
			{
				subtopic: 'Depth Perception',
				points: [
					'Binocular Cues:',
					'  Retinal Disparity: Difference in images between the two eyes.',
					'  Convergence: Degree to which eyes turn inward to focus.',
					'Monocular Cues (used for 2D depth):',
					'  Relative size, interposition, linear perspective, texture gradient, relative clarity.',
				],
			},
			{
				subtopic: 'Perceptual Constancy',
				points: [
					'Recognizing objects as unchanging despite changes in sensory input (e.g., size, shape, color).',
				],
			},
			{
				subtopic: 'Apparent Movement',
				points: [
					'Illusory motion perception (e.g., animation, stroboscopic motion).',
				],
			},
		],
	},
	{
		key: '2.2',
		title: '2.2 – Thinking, Problem-Solving, Judgments, & Decision-Making',
		bullets: [
			{
				subtopic: 'Concepts and Prototypes',
				points: [
					'Concepts: Mental groupings of similar objects, events, or people.',
					'Prototypes: The best or most typical example of a concept.',
				],
			},
			{
				subtopic: 'Schemas and Cognitive Adaptation',
				points: [
					'Schemas: Mental structures for organizing knowledge.',
					'Assimilation: Fitting new info into existing schema.',
					'Accommodation: Modifying schema to fit new info.',
				],
			},
			{
				subtopic: 'Problem-Solving Strategies',
				points: [
					'Algorithms: Step-by-step procedures that guarantee solutions.',
					'Heuristics: Mental shortcuts; quicker but more error-prone.',
					'Representativeness: Based on similarity to prototype/stereotype.',
					'Availability: Based on how easily examples come to mind.',
				],
			},
			{
				subtopic: 'Decision-Making Biases',
				points: [
					'Mental Set: Relying on familiar problem-solving methods.',
					'Priming: Recent exposure influencing response.',
					'Framing: How choices are presented influences decisions.',
					'Gambler’s Fallacy: Belief that chance events are self-correcting.',
					'Sunk-Cost Fallacy: Continuing because of previous investment.',
				],
			},
			{
				subtopic: 'Executive Functions',
				points: [
					'Planning, organizing, monitoring, and executing goal-directed behavior.',
					'Involves working memory and cognitive flexibility.',
				],
			},
			{
				subtopic: 'Creativity',
				points: [
					'Divergent Thinking: Generating many solutions.',
					'Convergent Thinking: Narrowing to one solution.',
					'Functional Fixedness: Inability to see alternative uses.',
				],
			},
		],
	},
	{
		key: '2.3',
		title: '2.3 – Introduction to Memory',
		bullets: [
			{
				subtopic: 'Types of Memory',
				points: [
					'Explicit (Declarative):',
					'  Episodic: Events and personal experiences.',
					'  Semantic: Facts and knowledge.',
					'Implicit (Non-Declarative):',
					'  Procedural: Skills and habits.',
					'  Prospective: Remembering future tasks.',
				],
			},
			{
				subtopic: 'Biological Basis – Long-Term Potentiation (LTP)',
				points: [
					'Strengthening of synapses with repeated stimulation; biological mechanism of learning.',
				],
			},
			{
				subtopic: 'Working Memory Model (Baddeley & Hitch)',
				points: [
					'Central Executive: Controls attention and coordinates tasks.',
					'Phonological Loop: Verbal and auditory info.',
					'Visuospatial Sketchpad: Visual and spatial data.',
				],
			},
			{
				subtopic: 'Multi-Store Model (Atkinson-Shiffrin)',
				points: [
					'Sensory Memory: Very brief (iconic for vision, echoic for sound).',
					'Short-Term Memory (STM): Limited capacity and duration.',
					'Long-Term Memory (LTM): Unlimited capacity and duration.',
				],
			},
			{
				subtopic: 'Levels of Processing Theory',
				points: [
					'Depth of encoding affects memory:',
					'  Structural (shallow) → appearance.',
					'  Phonemic → sound.',
					'  Semantic (deep) → meaning.',
				],
			},
		],
	},
	{
		key: '2.4',
		title: '2.4 – Encoding Memories',
		bullets: [
			{
				subtopic: 'Encoding Strategies',
				points: [
					'Processes that determine how info is stored and later retrieved.',
					'Deeper encoding → better retention.',
				],
			},
			{
				subtopic: 'Mnemonic Devices',
				points: [
					'Memory aids using vivid imagery or organizational strategies (e.g., method of loci, acronyms).',
				],
			},
			{
				subtopic: 'Chunking',
				points: [
					'Breaking info into meaningful units (e.g., phone numbers).',
				],
			},
			{
				subtopic: 'Hierarchies and Categories',
				points: [
					'Organizing information improves encoding.',
				],
			},
			{
				subtopic: 'Spacing Effect',
				points: [
					'Massed Practice: Cramming (less effective).',
					'Distributed Practice: Spaced out over time (more effective).',
				],
			},
			{
				subtopic: 'Serial Position Effect',
				points: [
					'Primacy Effect: Better recall for first items.',
					'Recency Effect: Better recall for last items.',
				],
			},
		],
	},
	{
		key: '2.5',
		title: '2.5 – Storing Memories',
		bullets: [
			{
				subtopic: 'Memory Storage Systems',
				points: [
					'Sensory: Immediate, brief recording.',
					'Short-Term/Working: Limited capacity.',
					'Long-Term: Possibly permanent, extensive capacity.',
				],
			},
			{
				subtopic: 'Rehearsal Techniques',
				points: [
					'Maintenance Rehearsal: Simple repetition.',
					'Elaborative Rehearsal: Linking info to meaning or prior knowledge.',
				],
			},
			{
				subtopic: 'Autobiographical Memory',
				points: [
					'Enhanced when memories are personally meaningful.',
					'Highly Superior Autobiographical Memory (HSAM): Rare condition, biologically distinct.',
				],
			},
			{
				subtopic: 'Disruptions to Storage',
				points: [
					'Amnesia:',
					'  Retrograde: Inability to remember past events.',
					'  Anterograde: Inability to form new memories.',
					'Alzheimer’s Disease: Progressive memory loss.',
					'Infantile Amnesia: Inability to recall early childhood memories.',
				],
			},
		],
	},
	{
		key: '2.6',
		title: '2.6 – Retrieving Memories',
		bullets: [
			{
				subtopic: 'Types of Retrieval',
				points: [
					'Recall: Retrieving without cues (e.g., essays).',
					'Recognition: Identifying from options (e.g., multiple-choice).',
				],
			},
			{
				subtopic: 'Retrieval Cues',
				points: [
					'Context-Dependent: Better recall in the same environment.',
					'State-Dependent: Same physical/emotional state improves recall.',
					'Mood-Congruent: Current mood influences memory retrieval.',
				],
			},
			{
				subtopic: 'Enhancing Retrieval',
				points: [
					'Retrieval Practice: Actively recalling info improves long-term retention.',
					'Testing Effect: Self-testing enhances learning.',
					'Metacognition: Thinking about your own thinking improves regulation of memory use.',
				],
			},
		],
	},
	{
		key: '2.7',
		title: '2.7 – Forgetting & Other Memory Challenges',
		bullets: [
			{
				subtopic: 'Ebbinghaus Forgetting Curve',
				points: ['Rapid memory loss after learning, then levels off.'],
			},
			{
				subtopic: 'Causes of Forgetting',
				points: [
					'Encoding Failure: Info never entered long-term memory.',
				],
			},
			{
				subtopic: 'Interference',
				points: [
					'Proactive: Old info interferes with new.',
					'Retroactive: New info interferes with old.',
				],
			},
			{
				subtopic: 'Retrieval Failure',
				points: [
					'Info is in memory but cannot be accessed (tip-of-the-tongue phenomenon).',
				],
			},
			{
				subtopic: 'Freudian Repression',
				points: [
					'Motivated forgetting to protect ego from distress (not empirically supported but historically influential).',
				],
			},
			{
				subtopic: 'Memory Inaccuracy',
				points: [
					'Misinformation Effect: Post-event information alters memory.',
					'Source Amnesia: Forgetting where info came from.',
					'Constructive Memory: Memory is not a perfect recording; it\'s reconstructed during retrieval.',
					'Imagination Inflation: Imagining events increases belief they occurred.',
				],
			},
		],
	},
	{
		key: '2.8',
		title: '2.8 – Intelligence and Achievement',
		bullets: [
			{
				subtopic: 'Defining Intelligence',
				points: [
					'Debate between:',
					'  g: General intelligence.',
					'  Multiple Intelligences: e.g., Gardner’s theory.',
				],
			},
			{
				subtopic: 'Measuring Intelligence',
				points: [
					'IQ (Intelligence Quotient) = Mental Age ÷ Chronological Age × 100 (original formula).',
					'Modern IQ tests used for academic placement and support.',
				],
			},
			{
				subtopic: 'Psychometric Properties of Tests',
				points: [
					'Standardization: Uniform procedures.',
					'Reliability: Consistent results.',
					'  Test-retest, Split-half.',
					'Validity: Measures what it’s supposed to.',
					'  Construct Validity, Predictive Validity.',
				],
			},
			{
				subtopic: 'Socio-Cultural Considerations',
				points: [
					'Stereotype Threat: Worry about confirming a stereotype lowers performance.',
					'Stereotype Lift: Positive expectations improve performance.',
					'Flynn Effect: IQ scores rise over generations due to environmental improvements.',
				],
			},
			{
				subtopic: 'Group Differences',
				points: [
					'Greater variation within groups than between them.',
					'Poverty, access to education, and systemic inequities affect IQ.',
				],
			},
			{
				subtopic: 'Achievement vs. Aptitude',
				points: [
					'Achievement Tests: Measure what you’ve learned.',
					'Aptitude Tests: Predict future performance.',
				],
			},
			{
				subtopic: 'Mindset Theory (Carol Dweck)',
				points: [
					'Fixed Mindset: Intelligence is static.',
					'Growth Mindset: Intelligence can develop through effort.',
				],
			},
		],
	},
];

const APPsychUnit2 = () => {
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState('topics');
	const navigate = useNavigate();

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	return (
		<div className="min-h-screen bg-slate-50 text-slate-800">
			<div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
				<button
					onClick={() => navigate('/ap-psychology-study-guide')}
					className="mb-6 px-4 py-2 rounded-lg bg-white text-yellow-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2"
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
				{/* Tabs */}
				<div className="flex justify-center border-b-2 border-slate-200 mb-8">
					<button
						onClick={() => setActiveTab('topics')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'topics'
								? 'border-b-4 border-yellow-600 text-yellow-700'
								: 'text-slate-500 hover:text-yellow-600'
						}`}
					>
						Key Topics
					</button>
					<button
						onClick={() => navigate('/ap-psychology/unit/2/quiz')}
						className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-yellow-600 transition-colors"
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				{activeTab === 'topics' && (
					<>
						<div className="text-center mb-8">
							<h1 className="text-4xl font-bold text-yellow-700">
								AP Psychology Unit 2: Cognition, Memory, and Intelligence
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Key concepts in perception, thinking, memory, and intelligence.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit2Content.map((topic) => (
									<div
										key={topic.key}
										className="border-b border-slate-200 last:border-b-0 pb-4"
									>
										<button
											onClick={() => toggleTopic(topic.key)}
											className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
										>
											<h3 className="text-xl font-semibold text-yellow-700">
												{topic.title}
											</h3>
											<span className="text-2xl text-slate-500">
												{openTopic === topic.key ? '-' : '+'}
											</span>
										</button>
										{openTopic === topic.key && (
											<div className="p-4 bg-slate-50 rounded-b-lg">
												<div className="space-y-4">
													{topic.bullets.map((section, idx) => (
														<div key={idx}>
															<div className="font-semibold text-yellow-800 mb-1">
																{section.subtopic}
															</div>
															<ul className="list-disc ml-6 text-slate-700 space-y-1">
																{section.points.map((point, i) =>
																	point.startsWith('  ') ? (
																		<li
																			key={i}
																			style={{
																				listStyle: 'none',
																				marginLeft: '1.5rem',
																			}}
																		>
																			{point.trim()}
																		</li>
																	) : (
																		<li key={i}>{point}</li>
																	)
																)}
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

export default APPsychUnit2;
