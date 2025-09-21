import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit5Content = [
	{
		key: '5.1',
		title: '5.1 – Health, Stress, and Coping',
		bullets: [
			{
				subtopic: 'Health Psychology & Stress',
				points: [
					'Explores the relationship between behavior, mental processes, and physical health.',
					'Stress contributes to vulnerability to both physical illnesses (e.g., hypertension, headaches, immune suppression) and mental disorders.',
				],
			},
			{
				subtopic: 'Types of Stressors',
				points: [
					'Eustress: Motivating, beneficial stress.',
					'Distress: Debilitating, harmful stress.',
					'Traumatic events: Sudden, overwhelming challenges.',
					'Daily hassles: Minor stressors that accumulate and impact well-being.',
					'Adverse Childhood Experiences (ACEs): Early traumatic events with lifelong effects.',
				],
			},
			{
				subtopic: 'General Adaptation Syndrome (GAS)',
				points: [
					'Hans Selye\'s model: Alarm stage (activation of sympathetic nervous system), resistance stage (prolonged effort), exhaustion stage (depletion, greatest risk of illness).',
				],
			},
			{
				subtopic: 'Tend-and-Befriend Theory',
				points: [
					'Particularly in women, stress may elicit a response to seek social support and protect others.',
				],
			},
			{
				subtopic: 'Coping Strategies',
				points: [
					'Problem-focused coping: Tackling the stressor directly through action.',
					'Emotion-focused coping: Managing emotional response to stress (e.g., relaxation, breathing techniques, meditation, medication).',
				],
			},
		],
	},
	{
		key: '5.2',
		title: '5.2 – Positive Psychology & Well-Being',
		bullets: [
			{
				subtopic: 'Positive Psychology',
				points: [
					'Focuses on factors that contribute to well-being, resilience, and human flourishing.',
					'Gratitude and positive emotions enhance subjective well-being.',
					'Using signature strengths or virtues (e.g., kindness, curiosity) increases happiness and life satisfaction.',
				],
			},
			{
				subtopic: 'Virtue Categories',
				points: [
					'Six core virtue categories of character strengths:',
					'  Wisdom',
					'  Courage',
					'  Humanity',
					'  Justice',
					'  Temperance',
					'  Transcendence',
				],
			},
			{
				subtopic: 'Posttraumatic Growth',
				points: [
					'Personal growth and resilience that emerge after experiencing trauma or stress.',
				],
			},
		],
	},
	{
		key: '5.3',
		title: '5.3 – Psychological Disorders: Diagnosis & Perspectives',
		bullets: [
			{
				subtopic: 'Defining Psychological Disorders',
				points: [
					'Identified using criteria such as level of dysfunction, subjective distress, and deviation from social norms.',
				],
			},
			{
				subtopic: 'Diagnosis & Classification',
				points: [
					'Diagnosis can help or harm depending on stigma and cultural context.',
					'Cultural sensitivity is crucial—consider stigma, discrimination, and norms.',
					'Requires specialized training and evidence-based diagnostic tools.',
				],
			},
			{
				subtopic: 'Classification Systems',
				points: [
					'DSM (Diagnostic and Statistical Manual of Mental Disorders) – APA.',
					'ICD (International Classification of Diseases) – WHO.',
				],
			},
			{
				subtopic: 'Perspectives on Causes',
				points: [
					'Eclectic approach: Integrates multiple perspectives.',
					'Behavioral: Learned associations and reinforcement history.',
					'Psychodynamic: Unconscious conflicts and childhood experiences.',
					'Humanistic: Barriers to self-actualization and support.',
					'Cognitive: Maladaptive beliefs and thought patterns.',
					'Evolutionary: Adaptive behaviors gone awry.',
					'Sociocultural: Dysfunctional social environments or inequality.',
					'Biological: Genetics, neurotransmitters, and brain function.',
				],
			},
			{
				subtopic: 'Interaction Models',
				points: [
					'Biopsychosocial model: Combines biological, psychological, and sociocultural influences.',
					'Diathesis-stress model: Inherited vulnerability + stress triggers disorder.',
				],
			},
		],
	},
	{
		key: '5.4',
		title: '5.4 – Major Categories of Disorders',
		bullets: [
			{
				subtopic: 'Neurodevelopmental Disorders',
				points: [
					'Begin in childhood; developmentally inappropriate behavior.',
					'Examples: ADHD, Autism Spectrum Disorder (ASD).',
					'Causes: Genetic, physiological, environmental.',
				],
			},
			{
				subtopic: 'Schizophrenic Spectrum Disorders',
				points: [
					'Disruptions in thoughts, perceptions, emotions, or behaviors.',
					'Positive symptoms: Delusions, hallucinations, disorganized speech, disorganized motor behavior (e.g., catatonia).',
					'Negative symptoms: Flat affect, social withdrawal, catatonic stupor.',
					'Causes: Genetic, prenatal factors, dopamine hypothesis (neurochemical imbalance).',
				],
			},
			{
				subtopic: 'Depressive Disorders',
				points: [
					'Persistent sadness, low energy, and cognitive dysfunction.',
					'Examples: Major depressive disorder, persistent depressive disorder.',
					'Causes: Multiple factors including biological, social, and cognitive.',
				],
			},
			{
				subtopic: 'Bipolar Disorders',
				points: [
					'Alternation between manic and depressive episodes.',
					'Bipolar I: At least one full manic episode.',
					'Bipolar II: Hypomania + major depressive episodes.',
				],
			},
			{
				subtopic: 'Anxiety Disorders',
				points: [
					'Excessive, persistent fear/anxiety that impairs functioning.',
					'Types:',
					'  Specific phobia: Fear of specific object/situation.',
					'  Agoraphobia: Fear of being unable to escape a situation.',
					'  Panic disorder: Sudden panic attacks.',
					'  Social anxiety disorder: Fear of negative social judgment.',
					'  GAD: Chronic, nonspecific anxiety.',
					'Cultural variations: Ataque de nervios, Taijin kyofusho.',
				],
			},
			{
				subtopic: 'Obsessive-Compulsive and Related Disorders',
				points: [
					'Obsessions: Intrusive thoughts.',
					'Compulsions: Repetitive behaviors to reduce obsession-related distress.',
					'Examples: OCD, hoarding disorder.',
				],
			},
			{
				subtopic: 'Dissociative Disorders',
				points: [
					'Detachment from self, memory, or consciousness.',
					'Examples: Dissociative amnesia, dissociative identity disorder.',
					'Often linked to trauma.',
				],
			},
			{
				subtopic: 'Trauma and Stressor-Related Disorders',
				points: [
					'Exposure to trauma causes lasting psychological distress.',
					'Symptoms: Hypervigilance, flashbacks, insomnia, detachment.',
					'Example: PTSD.',
				],
			},
			{
				subtopic: 'Feeding and Eating Disorders',
				points: [
					'Dysfunction in food intake or absorption.',
					'Examples: Anorexia nervosa, bulimia nervosa.',
				],
			},
			{
				subtopic: 'Personality Disorders',
				points: [
					'Chronic, inflexible patterns of behavior and thinking.',
					'Must deviate from cultural norms and cause impairment.',
					'Cluster A (odd/eccentric): Paranoid, schizoid, schizotypal.',
					'Cluster B (dramatic/emotional): Antisocial, borderline, histrionic, narcissistic.',
					'Cluster C (anxious/fearful): Avoidant, dependent, obsessive-compulsive.',
					'Causes: Combination of genetic, social, and cognitive factors.',
				],
			},
		],
	},
	{
		key: '5.5',
		title: '5.5 – Treatment of Psychological Disorders',
		bullets: [
			{
				subtopic: 'Trends in Treatment',
				points: [
					'Psychotherapy is generally effective (meta-analysis supports this).',
					'Evidence-based interventions are prioritized.',
					'Therapists should demonstrate cultural humility and build a strong therapeutic alliance.',
					'Deinstitutionalization movement led to more outpatient care and community-based treatment.',
					'Treatment today often combines medication and psychotherapy.',
				],
			},
			{
				subtopic: 'Ethical Principles (APA)',
				points: [
					'Nonmaleficence (do no harm)',
					'Fidelity and responsibility',
					'Integrity',
					'Respect for people’s rights and dignity',
				],
			},
			{
				subtopic: 'Therapeutic Techniques',
				points: [
					'Psychodynamic: Uncover unconscious content through free association and dream analysis.',
					'Cognitive: Challenge and restructure faulty thought patterns (e.g., cognitive triad).',
					'Applied behavior analysis: Uses conditioning principles (e.g., exposure therapy, aversion therapy, token economies).',
					'Biofeedback: Teaches clients to regulate physiological processes.',
					'Cognitive-behavioral therapy (CBT): Combines thought and behavior strategies; includes dialectical behavior therapy (DBT) and rational emotive behavior therapy (REBT).',
					'Humanistic therapy: Focuses on self-actualization via unconditional positive regard and active listening.',
					'Group therapy: Provides social support and shared experiences.',
				],
			},
			{
				subtopic: 'Hypnosis',
				points: [
					'Helpful for pain and anxiety management.',
					'Not reliable for memory retrieval or age regression.',
				],
			},
			{
				subtopic: 'Biological Treatments',
				points: [
					'Psychotropic medications: Antidepressants, antianxiety meds, antipsychotics, mood stabilizers (e.g., lithium).',
					'Often work by altering neurotransmitter activity.',
					'Tardive dyskinesia: A possible side effect of antipsychotics.',
				],
			},
			{
				subtopic: 'Somatic Interventions',
				points: [
					'Psychosurgery (rare), electroconvulsive therapy (ECT), transcranial magnetic stimulation (TMS).',
					'Lobotomy: Obsolete and no longer practiced.',
				],
			},
		],
	},
];

const APPsychUnit5: React.FC = () => {
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
						onClick={() => navigate('/ap-psychology/unit/5/quiz')}
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
								AP Psychology Unit 5: Mental & Physical Health
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Key concepts in health, stress, disorders, and treatment.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit5Content.map((topic) => (
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

export default APPsychUnit5;
