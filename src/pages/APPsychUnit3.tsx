import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit3Content = [
	{
		key: '3.1',
		title: '3.1 Themes & Methods in Developmental Psychology',
		bullets: [
			{
				subtopic: 'Overview',
				points: [
					'Developmental psychology studies how people grow and change across the lifespan in physical, cognitive, emotional, and social domains.',
				],
			},
			{
				subtopic: 'Key Issues',
				points: [
					'Stability vs. Change – Do personality traits and intelligence stay constant or shift with age?',
					'Nature vs. Nurture – Are behaviors and traits more influenced by genetic makeup or the environment?',
					'Continuity vs. Stages – Is development a gradual process or does it happen in distinct stages?',
				],
			},
			{
				subtopic: 'Research Methods',
				points: [
					'Cross-sectional studies – Compare individuals of different ages at one point in time.',
					'Longitudinal studies – Follow the same individuals over a long period to observe developmental changes.',
				],
			},
		],
	},
	{
		key: '3.2',
		title: '3.2 Physical Development Across the Lifespan',
		bullets: [
			{
				subtopic: 'Prenatal Development',
				points: [
					'Teratogens (e.g., alcohol, drugs, viruses), maternal illness, genetic mutations, and environmental/hormonal factors.',
					'These factors can disrupt major physical and psychological milestones.',
					'Stages like zygote, embryo, fetus are excluded from AP testing.',
				],
			},
			{
				subtopic: 'Infancy and Childhood',
				points: [
					'Physical development follows a universal sequence but varies in timing.',
					'Includes gross motor (e.g., crawling) and fine motor (e.g., grasping) milestones.',
					'Infant reflexes (like the rooting reflex) indicate neurological health.',
					'Visual cliff experiments show early development of depth perception.',
					'Critical and sensitive periods are optimal times for acquiring skills like language.',
					'Imprinting in animals shows early survival-based attachments.',
				],
			},
			{
				subtopic: 'Adolescence',
				points: [
					'Marked by puberty and the adolescent growth spurt.',
					'Development of:',
					'  Primary sex characteristics (e.g., reproductive organs).',
					'  Secondary sex characteristics (e.g., body hair, deepening voice).',
					'Menarche (first menstruation) and spermarche (first ejaculation).',
				],
			},
			{
				subtopic: 'Adulthood',
				points: [
					'Decline in reproductive ability (e.g., menopause), sensory acuity, reaction time, mobility, and flexibility.',
				],
			},
		],
	},
	{
		key: '3.3',
		title: '3.3 Gender & Sexual Orientation',
		bullets: [
			{
				subtopic: 'Overview',
				points: [
					'Sex and gender influence social development, identity, and behavioral expectations.',
					'Shape how individuals interact with others and how they view themselves.',
					'Influence development across all life stages.',
				],
			},
		],
	},
	{
		key: '3.4',
		title: '3.4 Cognitive Development Across the Lifespan',
		bullets: [
			{
				subtopic: 'Piaget’s Theory',
				points: [
					'Schemas: Mental frameworks for understanding.',
					'Assimilation: Adding new info into an existing schema.',
					'Accommodation: Modifying schema to fit new info.',
					'Sensorimotor stage (birth–2 years): Learn through movement/senses; object permanence develops.',
					'Preoperational stage (2–7 years):',
					'  Use of mental symbols, pretend play.',
					'  Limited by egocentrism, animism, and lack of conservation.',
					'  Development of theory of mind begins.',
					'Concrete operational stage (7–11 years):',
					'  Think logically about concrete objects/events.',
					'  Gain conservation, reversibility; still struggle with abstract thinking.',
					'Formal operational stage (12+ years):',
					'  Capable of abstract and hypothetical thought.',
					'Piaget said not all reach this level.',
				],
			},
			{
				subtopic: 'Vygotsky’s Theory',
				points: [
					'Emphasizes social learning through scaffolding and interaction.',
					'Zone of Proximal Development: Area where learning occurs best with help.',
				],
			},
			{
				subtopic: 'Adulthood',
				points: [
					'Crystallized intelligence (facts, vocabulary) remains stable.',
					'Fluid intelligence (problem-solving, speed) declines with age.',
					'Cognitive disorders like dementia affect some adults.',
				],
			},
		],
	},
	{
		key: '3.5',
		title: '3.5 Communication & Language Development',
		bullets: [
			{
				subtopic: 'Language Structure',
				points: [
					'Language is a symbolic, rule-governed system made up of:',
					'  Phonemes (basic sounds)',
					'  Morphemes (units of meaning)',
					'  Syntax (grammar rules)',
					'Pragmatics are excluded from the exam.',
				],
			},
			{
				subtopic: 'Development Stages',
				points: [
					'Cooing → Babbling → One-word stage → Telegraphic speech',
					'Use of gestures like pointing occurs before verbal speech.',
					'Overgeneralization errors: Applying grammar rules too broadly (e.g., “I goed”).',
				],
			},
		],
	},
	{
		key: '3.6',
		title: '3.6 Social-Emotional Development Across the Lifespan',
		bullets: [
			{
				subtopic: 'Bronfenbrenner’s Ecological Model',
				points: [
					'Microsystem: Immediate contacts (family, school).',
					'Mesosystem: Interactions among microsystems.',
					'Exosystem: Indirect influences (e.g., parent’s job).',
					'Macrosystem: Cultural and societal norms.',
					'Chronosystem: Time-based life changes.',
				],
			},
			{
				subtopic: 'Parenting Styles',
				points: [
					'Authoritative (high control + warmth): Most positive outcomes.',
					'Authoritarian (high control, low warmth): Obedient but less socially competent children.',
					'Permissive (low control, high warmth): Impulsive children.',
				],
			},
			{
				subtopic: 'Attachment Styles',
				points: [
					'Secure: Consistent caregiving, confident exploration.',
					'Insecure: Avoidant, anxious, or disorganized behavior.',
					'Influenced by temperament and early caregiving.',
				],
			},
			{
				subtopic: 'Social Development',
				points: [
					'Separation anxiety occurs when caregivers leave.',
					'Harlow\'s monkey studies: Comfort is more important than food for attachment.',
					'Peer relationships grow from parallel play (side-by-side) to cooperative play.',
				],
			},
			{
				subtopic: 'Adolescence',
				points: [
					'Imaginary audience: Belief others constantly notice them.',
					'Personal fable: Belief in uniqueness of experience.',
				],
			},
			{
				subtopic: 'Adulthood',
				points: [
					'Defined by social clock; emerging adulthood (18–25) as transitional phase.',
					'Adult relationships often mirror childhood attachment styles.',
				],
			},
			{
				subtopic: 'Erikson’s Stages of Psychosocial Development',
				points: [
					'Trust vs. Mistrust',
					'Autonomy vs. Shame and Doubt',
					'Initiative vs. Guilt',
					'Industry vs. Inferiority',
					'Identity vs. Role Confusion',
					'Intimacy vs. Isolation',
					'Generativity vs. Stagnation',
					'Integrity vs. Despair',
				],
			},
			{
				subtopic: 'Adverse Childhood Experiences (ACEs)',
				points: [
					'Early trauma can lead to mental and physical health problems.',
					'Cultural definitions of ACEs vary.',
				],
			},
			{
				subtopic: 'Identity Development',
				points: [
					'Based on Marcia’s identity statuses: achievement, diffusion, foreclosure, moratorium.',
					'Shaped by factors like race, gender, religion, career.',
					'Possible selves: Mental representations of future versions of self.',
				],
			},
		],
	},
	{
		key: '3.7',
		title: '3.7 Classical Conditioning',
		bullets: [
			{
				subtopic: 'Core Concepts',
				points: [
					'Classical conditioning involves learning associations between stimuli:',
					'  Unconditioned stimulus (UCS): Naturally causes a response.',
					'  Unconditioned response (UCR): Reflexive response to UCS.',
					'  Conditioned stimulus (CS): Previously neutral, now elicits response.',
					'  Conditioned response (CR): Learned response to CS.',
					'Acquisition: Learning the CS-UCS association.',
					'Extinction: CR disappears when CS is no longer paired with UCS.',
					'Spontaneous recovery: Reappearance of CR after extinction.',
					'Generalization: Similar stimuli trigger same response.',
					'Discrimination: Differentiating between stimuli.',
					'Higher-order conditioning: New CS paired with old CS.',
				],
			},
			{
				subtopic: 'Applications',
				points: [
					'Emotional responses (e.g., fear) can be classically conditioned.',
					'Taste aversion: One-trial learning from illness.',
					'Biological preparedness: Innate readiness to learn associations.',
					'Habituation: Decreased response to repeated stimulus.',
				],
			},
			{
				subtopic: 'Exclusions',
				points: [
					'Expectancy theory and specific timing types of conditioning are excluded from the exam.',
				],
			},
		],
	},
	{
		key: '3.8',
		title: '3.8 Operant Conditioning',
		bullets: [
			{
				subtopic: 'Core Concepts',
				points: [
					'Learning is based on consequences:',
					'  Law of Effect: Reinforced behaviors are more likely to be repeated.',
				],
			},
			{
				subtopic: 'Types of Reinforcement and Punishment',
				points: [
					'Positive reinforcement: Add a pleasant stimulus.',
					'Negative reinforcement: Remove an unpleasant stimulus.',
					'Positive punishment: Add an unpleasant stimulus.',
					'Negative punishment: Remove a pleasant stimulus.',
				],
			},
			{
				subtopic: 'Reinforcers',
				points: [
					'Primary reinforcers: Naturally rewarding (e.g., food).',
					'Secondary reinforcers: Learned value (e.g., money).',
				],
			},
			{
				subtopic: 'Other Concepts',
				points: [
					'Shaping: Reinforce step-by-step approximations of desired behavior.',
					'Superstitious behavior: Accidental association between behavior and reinforcement.',
					'Learned helplessness: Belief that efforts won’t change outcome.',
					'Instinctive drift: Reverting to instinctual behavior.',
				],
			},
			{
				subtopic: 'Reinforcement Schedules',
				points: [
					'Continuous: Reward every time.',
					'Partial:',
					'  Fixed ratio: Every set number of responses.',
					'  Variable ratio: Random number of responses (most resistant).',
					'  Fixed interval: Every set amount of time.',
					'  Variable interval: Unpredictable time intervals.',
				],
			},
		],
	},
	{
		key: '3.9',
		title: '3.9 Social, Cognitive, & Neurological Factors in Learning',
		bullets: [
			{
				subtopic: 'Social Learning (Bandura)',
				points: [
					'Learn through observation, modeling, and vicarious conditioning.',
					'Observing consequences for others can influence your own behavior.',
				],
			},
			{
				subtopic: 'Cognitive Learning',
				points: [
					'Insight learning: Sudden realization of a solution.',
					'Latent learning: Learning occurs without immediate expression; becomes evident later.',
					'Cognitive maps: Mental representations of environments.',
				],
			},
		],
	},
];

const APPsychUnit3: React.FC = () => {
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState('topics');
	const navigate = useNavigate();

	const toggleTopic = (key: string) => {
		setOpenTopic((prev) => (prev === key ? null : key));
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
						onClick={() => navigate('/ap-psychology/unit/3/quiz')}
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
								AP Psychology Unit 3: Development & Learning
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Key concepts in development, learning, and socialization.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
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

export default APPsychUnit3;
