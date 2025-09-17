import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit1Content = [
	{
		key: '1.1',
		title: '1.1 – Interaction of Heredity & Environment',
		bullets: [
			{
				subtopic: 'Nature vs. Nurture Debate',
				points: [
					'Heredity (Nature): Genetic inheritance influences traits like behavior, personality, and cognition.',
					'Environment (Nurture): Upbringing, education, social context, culture, and experiences.',
					'Interactionist Approach: Most psychological traits are shaped by a combination of genetic predispositions and environmental experiences.',
					'Exclusion: No need to know genotype, phenotype, DNA, chromosomes, or gene expression.',
				],
			},
			{
				subtopic: 'Evolutionary Perspective',
				points: [
					'Behavior and mental processes evolve to improve survival and reproductive success (natural selection).',
					'Traits that enhance adaptation are more likely to be passed on.',
				],
			},
			{
				subtopic: 'Eugenics Warning',
				points: [
					'A controversial and unethical application of evolutionary principles aiming to promote selective breeding based on perceived “superior” traits.',
				],
			},
			{
				subtopic: 'Research Methods for Nature vs. Nurture',
				points: [
					'Twin Studies: Compare identical vs. fraternal twins to determine genetic influences.',
					'Adoption Studies: Separate environmental from genetic factors.',
					'Family Studies: Examine traits shared among relatives.',
				],
			},
		],
	},
	{
		key: '1.2',
		title: '1.2 – Overview of the Nervous System',
		bullets: [
			{
				subtopic: 'Central Nervous System (CNS)',
				points: [
					'Composed of the brain and spinal cord.',
					'Directs all mental activity and coordinates bodily functions.',
				],
			},
			{
				subtopic: 'Peripheral Nervous System (PNS)',
				points: [
					'Connects the CNS to limbs and organs.',
					'Responsible for transmitting sensory and motor signals.',
				],
			},
			{
				subtopic: 'Autonomic Nervous System (ANS)',
				points: [
					'Controls involuntary bodily functions (e.g., heart rate, digestion).',
					'Sympathetic Nervous System: Activates fight-or-flight response.',
					'Parasympathetic Nervous System: Promotes rest, recovery, and digestion (rest-and-digest).',
				],
			},
			{
				subtopic: 'Somatic Nervous System',
				points: ['Regulates voluntary muscle movements and sensory information.'],
			},
		],
	},
	{
		key: '1.3',
		title: '1.3 – The Neuron & Neural Firing',
		bullets: [
			{
				subtopic: 'Types of Neural Cells',
				points: [
					'Neurons: Transmit electrical and chemical information.',
					'Glial Cells: Support, protect, and nourish neurons; assist in waste removal and insulation.',
				],
			},
			{
				subtopic: 'Reflex Arc',
				points: [
					'Demonstrates direct pathways in response to stimuli without brain involvement.',
					'Sensory Neurons: Detect stimuli and carry input to the CNS.',
					'Interneurons: Process information in the CNS.',
					'Motor Neurons: Carry output signals to muscles.',
				],
			},
			{
				subtopic: 'Neural Transmission Process',
				points: [
					'All-or-Nothing Principle: A neuron either fires or it doesn’t.',
					'Resting Potential: The baseline electrical charge of a neuron.',
					'Depolarization: Shift in charge that triggers firing.',
					'Refractory Period: Time during which the neuron can\'t fire again.',
					'Reuptake: Reabsorption of neurotransmitters.',
					'Threshold: Minimum stimulation required to trigger a neural impulse.',
				],
			},
			{
				subtopic: 'Disorders',
				points: [
					'Multiple Sclerosis: Damage to the myelin sheath disrupts transmission.',
					'Myasthenia Gravis: Affects neuromuscular communication.',
					'Exclusion: Sodium-potassium pump details are not tested.',
				],
			},
			{
				subtopic: 'Neurotransmitters',
				points: [
					'Excitatory or Inhibitory signals affect neuron firing.',
					'Dopamine: Movement, reward (linked to Parkinson’s, schizophrenia).',
					'Serotonin: Mood, sleep, appetite (linked to depression).',
					'Norepinephrine: Alertness and arousal.',
					'Glutamate: Major excitatory transmitter (memory).',
					'GABA: Major inhibitory transmitter (linked to anxiety).',
					'Endorphins: Pain relief and pleasure.',
					'Substance P: Transmits pain signals.',
					'Acetylcholine: Muscle movement, memory (linked to Alzheimer’s).',
				],
			},
			{
				subtopic: 'Hormones (Endocrine System)',
				points: [
					'Act like neurotransmitters but work more slowly.',
					'Adrenaline: Fight-or-flight.',
					'Leptin & Ghrelin: Hunger regulation.',
					'Melatonin: Sleep cycle.',
					'Oxytocin: Social bonding.',
					'Exclusion: Endocrine glands (except pituitary) are not tested.',
				],
			},
		],
	},
	{
		key: '1.4',
		title: '1.4 – Psychoactive Drugs',
		bullets: [
			{
				subtopic: 'Mechanisms of Action',
				points: [
					'Agonists: Mimic or enhance neurotransmitter action.',
					'Antagonists: Block or reduce neurotransmitter action.',
					'Reuptake Inhibitors: Prevent neurotransmitter reabsorption, increasing activity.',
				],
			},
			{
				subtopic: 'Types of Psychoactive Drugs',
				points: [
					'Stimulants: Increase neural activity (e.g., caffeine, cocaine).',
					'Depressants: Decrease neural activity (e.g., alcohol, barbiturates).',
					'Hallucinogens: Distort perception/cognition (e.g., marijuana, LSD).',
					'Opioids: Pain relief, euphoria (e.g., heroin, morphine).',
				],
			},
			{
				subtopic: 'Addiction and Withdrawal',
				points: [
					'Tolerance: Need increasing amounts for the same effect.',
					'Withdrawal: Physical and psychological symptoms when not using.',
				],
			},
		],
	},
	{
		key: '1.5',
		title: '1.5 – The Brain',
		bullets: [
			{
				subtopic: 'Brainstem',
				points: [
					'Controls survival functions: heartbeat, breathing (includes medulla).',
				],
			},
			{
				subtopic: 'Reticular Activating System',
				points: [
					'Regulates alertness and wakefulness.',
					'Involved in voluntary movement, learning, emotion.',
				],
			},
			{
				subtopic: 'Cerebellum',
				points: ['Coordinates movement, balance, and procedural memory.'],
			},
			{
				subtopic: 'Limbic System (Emotional/Memory Center)',
				points: [
					'Thalamus: Relay station for sensory input.',
					'Hypothalamus: Regulates hunger, thirst, temperature, sexual behavior.',
					'Pituitary Gland: Master hormone gland.',
					'Hippocampus: Formation of new memories.',
					'Amygdala: Emotional responses, especially fear/aggression.',
				],
			},
			{
				subtopic: 'Corpus Callosum',
				points: ['Connects the left and right hemispheres.'],
			},
			{
				subtopic: 'Cerebral Cortex (Outer Brain)',
				points: [
					'Divided into lobes:',
					'Occipital: Vision.',
					'Temporal: Auditory processing and language.',
					'Parietal: Sensory input, spatial reasoning.',
					'Frontal: Planning, judgment, speech (prefrontal cortex for executive functions).',
					'Motor Cortex: Movement control (in frontal lobe).',
					'Somatosensory Cortex: Touch processing (in parietal lobe).',
				],
			},
			{
				subtopic: 'Split Brain Research',
				points: [
					'Cutting corpus callosum reveals lateralization of function.',
					'Left = language, logic; Right = creativity, spatial skills.',
				],
			},
			{
				subtopic: 'Language Centers',
				points: [
					'Broca’s Area: Speech production.',
					'Wernicke’s Area: Language comprehension.',
					'Aphasia: Damage to either area disrupts language ability.',
				],
			},
			{
				subtopic: 'Plasticity',
				points: [
					'Brain’s ability to reorganize after injury or during development.',
				],
			},
			{
				subtopic: 'Brain Research Tools',
				points: [
					'EEG: Measures electrical activity.',
					'fMRI: Tracks blood flow for real-time activity.',
					'Lesioning: Damaging parts of the brain for research.',
					'Case Studies: In-depth studies of individuals with brain damage.',
				],
			},
		],
	},
	{
		key: '1.6',
		title: '1.6 – Sleep',
		bullets: [
			{
				subtopic: 'Consciousness',
				points: ['Awareness of internal and external experiences.'],
			},
			{
				subtopic: 'Circadian Rhythm',
				points: ['Internal biological clock (~24 hours).', 'Disrupted by jet lag, shift work.'],
			},
			{
				subtopic: 'Sleep Stages',
				points: [
					'NREM (Stages 1–3): Light to deep sleep. Stage 3 = deep sleep.',
					'REM Sleep: Rapid Eye Movement; vivid dreaming; paradoxical sleep (active brain, paralyzed body).',
					'REM Rebound: Increased REM after deprivation.',
				],
			},
			{
				subtopic: 'Dream Theories',
				points: [
					'Activation-Synthesis: Brain makes sense of random activity.',
					'Consolidation Theory: Sleep helps organize and store memories.',
				],
			},
			{
				subtopic: 'Sleep Functions',
				points: [
					'Memory consolidation.',
					'Body restoration and repair.',
				],
			},
			{
				subtopic: 'Common Sleep Disorders',
				points: [
					'Insomnia: Difficulty falling/staying asleep.',
					'Narcolepsy: Sudden sleep attacks.',
					'Sleep Apnea: Breathing stops repeatedly.',
					'Somnambulism: Sleepwalking.',
					'REM Sleep Behavior Disorder: Lack of muscle paralysis during REM.',
				],
			},
		],
	},
	{
		key: '1.7',
		title: '1.7 – Sensation and Perception',
		bullets: [
			{
				subtopic: 'General Sensation Concepts',
				points: [
					'Sensation: Detecting stimuli from the environment.',
					'Transduction: Converting stimuli into neural signals.',
					'Absolute Threshold: Minimum stimulation detectable 50% of the time.',
					'Just-Noticeable Difference (JND): Smallest detectable change.',
					'Weber’s Law: Change must be proportional to stimulus.',
					'Sensory Adaptation: Decreased sensitivity to constant stimulation.',
					'Sensory Interaction: Multiple senses working together (e.g., taste + smell).',
					'Synesthesia: One sense triggers another (e.g., seeing sounds).',
				],
			},
			{
				subtopic: 'Visual System',
				points: [
					'Retina: Contains photoreceptors (rods and cones).',
					'Rods: Night vision, peripheral, black-and-white.',
					'Cones: Color and detail; located in the fovea.',
					'Color Theories:',
					'  Trichromatic Theory: Blue, green, red cones.',
					'  Opponent-Process Theory: Red/green, blue/yellow, black/white cells.',
					'Afterimages: Visual impressions remain after stimulus removal.',
					'Blind Spot: Where optic nerve leaves retina.',
					'Accommodation: Lens adjustment to focus image.',
					'Disorders:',
					'  Color Blindness: Cone or ganglion cell malfunction.',
					'  Blindsight: Vision without awareness.',
					'  Prosopagnosia: Inability to recognize faces.',
				],
			},
			{
				subtopic: 'Auditory System',
				points: [
					'Sound: Vibration of air molecules.',
					'Pitch: Frequency.',
					'Loudness: Amplitude.',
					'Pitch Theories:',
					'  Place Theory: High pitches.',
					'  Frequency Theory: Low pitches.',
					'  Volley Principle: Intermediate.',
					'Sound Localization: Brain compares input from both ears.',
					'Hearing Loss:',
					'  Conduction Deafness: Damage to outer/middle ear.',
					'  Sensorineural Deafness: Inner ear or nerve damage.',
				],
			},
			{
				subtopic: 'Chemical Senses',
				points: [
					'Olfaction (Smell):',
					'  Bypasses thalamus; goes straight to olfactory bulb.',
					'  Pheromones: Chemical signals influencing behavior.',
					'Gustation (Taste):',
					'  Five main tastes: sweet, sour, salty, bitter, umami, and oleogustus (fat).',
					'  Taste sensitivity varies (supertasters vs. nontasters).',
					'  Smell and taste interact closely.',
				],
			},
			{
				subtopic: 'Touch & Pain',
				points: [
					'Touch: Detected by receptors in skin; includes pressure, temperature.',
					'Hot Sensation: Combination of cold and warm receptors.',
					'Pain: Body’s warning system.',
					'Gate Control Theory: Neural “gates” open/close to allow/block pain.',
					'Phantom Limb: Pain felt in a limb that no longer exists.',
				],
			},
			{
				subtopic: 'Vestibular & Kinesthetic Senses',
				points: [
					'Vestibular Sense: Balance and spatial orientation, detected by semicircular canals in inner ear.',
					'Kinesthesis: Senses position/movement of body parts; crucial for coordinated movement and body awareness.',
				],
			},
		],
	},
];

const APPsychUnit1 = () => {
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
						className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'topics' ? 'border-b-4 border-yellow-600 text-yellow-700' : 'text-slate-500 hover:text-yellow-600'}`}
					>
						Key Topics
					</button>
					<button
						onClick={() => navigate('/ap-psychology/unit/1/quiz')}
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
								AP Psychology Unit 1: Biological Bases & Foundations
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Key concepts in heredity, the nervous system, neural firing, drugs, the brain, sleep, and sensation/perception.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
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
																	point.startsWith('  ')
																		? (
																			<li
																				key={i}
																				style={{ listStyle: 'none', marginLeft: '1.5rem' }}
																			>
																				{point.trim()}
																			</li>
																		)
																		: (
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

export default APPsychUnit1;
