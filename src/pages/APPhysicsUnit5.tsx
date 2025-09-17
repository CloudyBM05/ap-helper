import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit5Content = [
	{
		key: '5.1',
		title: '5.1 – Momentum and Impulse',
		bullets: [
			{
				subtopic: 'Momentum (p)',
				points: [
					'Definition: A measure of an object\'s resistance to a change in motion; product of mass and velocity',
					'Formula: p = mv (p = momentum, m = mass, v = velocity)',
					'Units: kg·m/s',
					'Vector quantity — has both magnitude and direction',
					'Conserved in a closed system (no net external force)',
					'The total momentum before an event = total momentum after, in such systems'
				],
			},
			{
				subtopic: 'Impulse (J)',
				points: [
					'Definition: The change in momentum over a time interval due to a force',
					'Formula: J = FΔt (F = force, Δt = time interval)',
					'Units: N·s (newton-seconds), equivalent to kg·m/s',
					'Vector quantity',
					'Impulse is equal to the area under a Force–Time graph',
					'Relationship: Impulse = Change in Momentum (Δp)'
				],
			},
		],
	},
	{
		key: '5.2',
		title: '5.2 – Representations of Changes in Momentum',
		bullets: [
			{
				subtopic: 'Graphical Representations',
				points: [
					'Momentum changes can be represented in equations, graphs, or diagrams',
					'Vector diagrams show initial and final momentum directions and magnitudes',
					'Force–Time graphs: The slope does not matter; the area under the curve = impulse',
					'Shape can be rectangular (constant force) or curved (variable force)',
					'Graphical analysis is used to interpret changes in velocity, mass effects, and collision outcomes'
				],
			},
			{
				subtopic: 'Impulse–Momentum Theorem',
				points: [
					'J = Δp connects measurable force and time data to momentum change',
					'Allows calculation of momentum changes from force and time measurements',
					'Essential for analyzing collision and impact scenarios'
				],
			},
		],
	},
	{
		key: '5.3',
		title: '5.3 – Open and Closed Systems: Momentum',
		bullets: [
			{
				subtopic: 'System Types',
				points: [
					'Closed system: No net external forces; total momentum is conserved',
					'Open system: External forces present; momentum is not conserved'
				],
			},
			{
				subtopic: 'Examples',
				points: [
					'Closed: Two billiard balls colliding on a frictionless surface',
					'Open: A rolling ball slowing down due to friction'
				],
			},
			{
				subtopic: 'Real-World Considerations',
				points: [
					'In real-world cases, systems are rarely perfectly closed',
					'External forces like friction, air resistance, or applied forces must be considered',
					'Recognizing whether a system is open or closed is crucial for correct momentum calculations'
				],
			},
		],
	},
	{
		key: '5.4',
		title: '5.4 – Conservation of Linear Momentum',
		bullets: [
			{
				subtopic: 'Law of Conservation of Momentum',
				points: [
					'In an isolated system (no external forces): Total p_initial = Total p_final',
					'Fundamental principle governing all collisions and interactions',
					'Rooted in translational symmetry — the laws of physics are the same in all inertial frames'
				],
			},
			{
				subtopic: 'Types of Collisions',
				points: [
					'Elastic Collisions — Both total momentum and total kinetic energy are conserved. Objects bounce apart without loss of total kinetic energy',
					'Inelastic Collisions — Momentum is conserved, but kinetic energy is not; some is converted to heat, sound, deformation',
					'Perfectly Inelastic Collisions — A special case of inelastic collision where objects stick together after impact and move with a common velocity'
				],
			},
			{
				subtopic: 'Applications',
				points: [
					'Engineering: Vehicle crash safety, rockets, satellites',
					'Particle physics: Particle scattering experiments',
					'Astronomy: Planetary motion analysis',
					'Sports: Analysis of ball collisions and player interactions'
				],
			},
		],
	},
];

const APPhysicsUnit5 = () => {
	const [activeTab, setActiveTab] = useState('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const navigate = useNavigate();

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	return (
		<div className="min-h-screen bg-teal-50 text-slate-800">
			<div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
				<button
					onClick={() => navigate('/ap-physics-study-guide')}
					className="mb-6 px-4 py-2 rounded-lg bg-white text-teal-600 font-semibold hover:bg-teal-100 transition-colors shadow-sm flex items-center gap-2"
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
				<div className="flex justify-center border-b-2 border-teal-200 mb-8">
					<button
						onClick={() => setActiveTab('topics')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'topics'
								? 'border-b-4 border-teal-600 text-teal-700'
								: 'text-slate-500 hover:text-teal-600'
						}`}
					>
						Key Topics
					</button>
					<button
						onClick={() => navigate('/ap-physics/unit/5/quiz')}
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
							<h1 className="text-4xl font-bold text-teal-700">
								🎱 AP Physics Unit 5: Momentum
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Momentum, impulse, and conservation laws in isolated systems.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit5Content.map((topic) => (
									<div
										key={topic.key}
										className="border-b border-teal-200 last:border-b-0 pb-4"
									>
										<button
											onClick={() => toggleTopic(topic.key)}
											className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-teal-50 transition-colors"
										>
											<h3 className="text-xl font-semibold text-teal-700">
												{topic.title}
											</h3>
											<span className="text-2xl text-teal-400">
												{openTopic === topic.key ? '-' : '+'}
											</span>
										</button>
										{openTopic === topic.key && (
											<div className="p-4 bg-teal-50 rounded-b-lg">
												<div className="space-y-4">
													{topic.bullets.map((section, idx) => (
														<div key={idx}>
															<div className="font-semibold text-teal-800 mb-1">
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

export default APPhysicsUnit5;
