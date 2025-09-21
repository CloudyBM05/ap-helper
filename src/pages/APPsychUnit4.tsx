import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit4Content = [
	{
		key: '4.1',
		title: '4.1 – Attribution, Person Perception, and Social Comparison',
		bullets: [
			{
				subtopic: 'Attribution Theory',
				points: [
					'Explains how people interpret their own and others\' behaviors.',
					'Dispositional attributions: Explain behavior based on internal traits like personality or intelligence.',
					'Situational attributions: Attribute behavior to external factors or context.',
				],
			},
			{
				subtopic: 'Explanatory Styles',
				points: [
					'Optimistic: Positive events are internal/stable; negative ones are external/unstable.',
					'Pessimistic: Positive events are external/unstable; negative ones are internal/stable.',
				],
			},
			{
				subtopic: 'Attribution Biases',
				points: [
					'Actor/observer bias: Own behavior = situational; others\' behavior = dispositional.',
					'Fundamental attribution error: Overemphasis on internal traits to explain others\' behavior.',
					'Self-serving bias: Success = internal cause; failure = external cause.',
				],
			},
			{
				subtopic: 'Locus of Control',
				points: [
					'Internal: Belief in control over life events.',
					'External: Belief that fate or external forces determine outcomes.',
				],
			},
			{
				subtopic: 'Person Perception',
				points: [
					'Mere exposure effect: Repeated exposure to something increases liking.',
					'Self-fulfilling prophecy: Expectations influence behavior in a way that confirms the expectation.',
				],
			},
			{
				subtopic: 'Social Comparison Theory',
				points: [
					'Upward comparison: Compare self to someone better off.',
					'Downward comparison: Compare self to someone worse off.',
					'Relative deprivation: Feeling of being deprived based on others\' perceived advantages.',
				],
			},
		],
	},
	{
		key: '4.2',
		title: '4.2 – Stereotypes, Attitudes, and Cognitive Dissonance',
		bullets: [
			{
				subtopic: 'Stereotypes & Implicit Attitudes',
				points: [
					'Stereotypes are mental shortcuts about groups that reduce mental effort but can promote bias.',
					'Implicit attitudes are unconscious beliefs that may influence behavior without awareness.',
				],
			},
			{
				subtopic: 'Common Social Biases',
				points: [
					'Just-world phenomenon: Belief that people get what they deserve.',
					'Out-group homogeneity bias: Viewing members of other groups as all the same.',
					'In-group bias: Favoring one\'s own group.',
					'Ethnocentrism: Judging other cultures by the standards of one\'s own.',
					'Belief perseverance: Continuing to believe something despite contradicting evidence.',
					'Confirmation bias: Seeking out info that supports existing beliefs.',
				],
			},
			{
				subtopic: 'Cognitive Dissonance',
				points: [
					'Occurs when behavior and attitude conflict.',
					'Creates discomfort, motivating a change in belief or behavior for consistency.',
				],
			},
		],
	},
	{
		key: '4.3',
		title: '4.3 – Social Influence, Group Dynamics, and Prosocial Behavior',
		bullets: [
			{
				subtopic: 'Social Norms & Influence',
				points: [
					'Social norms are expectations that guide behavior in society.',
					'Social influence theory explains how individuals conform due to:',
					'  Normative influence: Desire to fit in.',
					'  Informational influence: Belief that others are correct.',
				],
			},
			{
				subtopic: 'Persuasion Strategies',
				points: [
					'Elaboration likelihood model (ELM):',
					'  Central route: Logical, fact-based arguments.',
					'  Peripheral route: Cues like attractiveness or emotion.',
					'Foot-in-the-door: Small request leads to compliance with a larger request.',
					'Door-in-the-face: Large request denied, followed by a smaller request that\'s more likely accepted.',
				],
			},
			{
				subtopic: 'Conformity & Obedience',
				points: [
					'Conformity: Adjusting behavior to align with group norms.',
					'Obedience: Following authority figure instructions.',
				],
			},
			{
				subtopic: 'Cultural Influence',
				points: [
					'Individualism: Emphasizes independence and self-expression.',
					'Collectivism: Emphasizes group harmony and interdependence.',
					'Multiculturalism: Encourages embracing cultural diversity.',
				],
			},
			{
				subtopic: 'Group Dynamics',
				points: [
					'Group polarization: Opinions become more extreme after discussion.',
					'Groupthink: Desire for harmony suppresses dissent and critical thinking.',
					'Diffusion of responsibility: Less personal accountability in groups.',
					'Social loafing: People put in less effort when in a group.',
					'Deindividuation: Loss of self-awareness in a crowd.',
					'Social facilitation: Improved performance on simple tasks when others are present.',
					'False consensus effect: Overestimating how many others share your beliefs.',
					'Superordinate goals: Shared goals that require cooperation.',
					'Social traps: Acting in self-interest harms the group.',
					'Industrial-Organizational (I/O) psychology: Studies workplace motivation, leadership, job satisfaction, and burnout.',
				],
			},
			{
				subtopic: 'Prosocial Behavior',
				points: [
					'Prosocial behavior refers to actions intended to benefit others.',
					'Altruism: Helping others selflessly, sometimes at a cost.',
					'Social reciprocity norm: Expectation to return favors/help.',
					'Social responsibility norm: Helping those in need regardless of reward.',
					'Bystander effect: Presence of others reduces likelihood of individual help due to:',
					'  Diffusion of responsibility',
					'  Pluralistic ignorance',
				],
			},
		],
	},
	{
		key: '4.4',
		title: '4.4 – Psychodynamic & Humanistic Theories of Personality',
		bullets: [
			{
				subtopic: 'Psychodynamic Theory (Freud)',
				points: [
					'Personality is shaped by unconscious conflicts and desires.',
					'Ego defense mechanisms: Unconscious ways to reduce anxiety:',
					'  Denial: Refusing to accept reality.',
					'  Displacement: Shifting emotion to a safer target.',
					'  Projection: Attributing one’s own issues to others.',
					'  Rationalization: Justifying behaviors.',
					'  Reaction formation: Acting opposite of true feelings.',
					'  Regression: Returning to earlier developmental stage.',
					'  Repression: Pushing distressing memories into unconscious.',
					'  Sublimation: Channeling impulses into acceptable behaviors.',
					'Assessment: Uses projective tests (e.g., Rorschach, TAT).',
				],
			},
			{
				subtopic: 'Humanistic Theory',
				points: [
					'Emphasizes free will, self-concept, and personal growth.',
					'Key ideas:',
					'  Unconditional positive regard (Rogers): Acceptance without conditions.',
					'  Self-actualization (Maslow): Fulfilling one’s potential.',
				],
			},
		],
	},
	{
		key: '4.5',
		title: '4.5 – Social-Cognitive & Trait Theories of Personality',
		bullets: [
			{
				subtopic: 'Social-Cognitive Theory',
				points: [
					'Personality develops through interaction between behavior, environment, and cognition (reciprocal determinism).',
					'Key concepts:',
					'  Self-concept: Beliefs about who we are.',
					'  Self-efficacy: Belief in our ability to succeed.',
					'  Self-esteem: Overall sense of personal value.',
				],
			},
			{
				subtopic: 'Trait Theories',
				points: [
					'Describe personality in terms of consistent patterns.',
					'Big Five (OCEAN) traits:',
					'  Openness: Creativity and willingness to try new things.',
					'  Conscientiousness: Organization and dependability.',
					'  Extraversion: Sociability and assertiveness.',
					'  Agreeableness: Compassion and cooperation.',
					'  Neuroticism: Emotional instability and anxiety.',
					'Assessment tools: Use factor analysis and inventories (e.g., MMPI).',
				],
			},
		],
	},
	{
		key: '4.6',
		title: '4.6 – Motivation',
		bullets: [
			{
				subtopic: 'Motivation Theories',
				points: [
					'Drive-reduction theory: Behavior is driven by the need to maintain homeostasis.',
					'Arousal theory: We seek optimal arousal; moderate arousal = best performance (Yerkes-Dodson law).',
					'Self-determination theory: Motivation can be intrinsic (internal satisfaction) or extrinsic (external rewards).',
					'Incentive theory: We’re motivated by external rewards or punishments.',
					'Instincts: Fixed, innate behaviors (more applicable to animals than humans).',
				],
			},
			{
				subtopic: 'Lewin’s Motivational Conflicts',
				points: [
					'Approach-approach: Two attractive options.',
					'Approach-avoidance: One option with pros and cons.',
					'Avoidance-avoidance: Two unattractive options.',
				],
			},
			{
				subtopic: 'Sensation-Seeking Theory',
				points: [
					'Individuals differ in need for stimulation.',
					'Types:',
					'  Thrill-seeking',
					'  Experience seeking',
					'  Disinhibition',
					'  Boredom susceptibility',
				],
			},
			{
				subtopic: 'Eating Motivation',
				points: [
					'Ghrelin: Increases hunger.',
					'Leptin: Signals fullness.',
					'Controlled by the hypothalamus.',
					'Influenced by external cues like food presence and social context.',
				],
			},
		],
	},
	{
		key: '4.7',
		title: '4.7 – Emotion',
		bullets: [
			{
				subtopic: 'Emotion Overview',
				points: [
					'Emotion is a complex psychological and physiological response involving:',
					'  Subjective experience',
					'  Physiological arousal',
					'  Expressive behavior',
				],
			},
			{
				subtopic: 'Theories of Emotion',
				points: [
					'James-Lange: Physical response precedes emotion.',
					'Cannon-Bard: Physical and emotional responses occur simultaneously.',
					'Schachter-Singer (Two-Factor): Emotion = arousal + cognitive label.',
					'Facial-feedback hypothesis: Facial expressions can influence emotional experience (research is mixed).',
				],
			},
			{
				subtopic: 'Broaden-and-Build Theory',
				points: [
					'Positive emotions broaden cognitive flexibility and social resources.',
					'Negative emotions narrow attention and problem-solving.',
				],
			},
			{
				subtopic: 'Universality & Display Rules',
				points: [
					'Some emotions (happiness, sadness, anger, fear, surprise, disgust) may be universal, but cultural research is mixed.',
					'Display rules: Culture-specific norms about how and when emotions should be expressed.',
					'Elicitors of emotion vary across:',
					'  Culture',
					'  Gender',
					'  Age',
					'  Socioeconomic status',
				],
			},
		],
	},
];

const TABS = [
	{ label: 'Key Topics', value: 'topics' },
	{ label: 'Take Quiz', value: 'quiz' },
];

const APPsychUnit4: React.FC = () => {
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
						onClick={() => navigate('/ap-psychology/unit/4/quiz')}
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
								AP Psychology Unit 4: Social Psychology & Personality
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Key concepts in social thinking, group behavior, personality,
								motivation, and emotion.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
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

export default APPsychUnit4;
