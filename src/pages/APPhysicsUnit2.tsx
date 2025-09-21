import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit2Content = [
	{
		key: '2.1',
		title: '2.1 – Systems',
		bullets: [
			{
				subtopic: 'Definition of a System',
				points: [
					'A set of objects chosen for analysis',
					'The "system" can be one object or multiple interacting objects'
				],
			},
			{
				subtopic: 'System Boundaries',
				points: [
					'Boundaries determine which forces are considered internal and which are external',
					'Internal forces → forces objects in the system exert on each other; these do not change the system\'s total momentum',
					'External forces → forces exerted by objects outside the system; these can change the system\'s total momentum'
				],
			},
			{
				subtopic: 'Choosing a System in Problem-Solving',
				points: [
					'Choose boundaries to simplify calculations',
					'In Newton\'s Laws problems, decide whether to treat interacting objects as separate systems (analyze individually) or a combined system (analyze together)',
					'The net external force is always calculated based on the defined system. Misidentifying the system boundary can lead to wrong free-body diagrams.'
				],
			},
		],
	},
	{
		key: '2.2',
		title: '2.2 – The Gravitational Field',
		bullets: [
			{
				subtopic: 'Gravity Basics',
				points: [
					'Every mass attracts every other mass',
					'The gravitational field at a point is the force per unit mass experienced by a small test mass',
					'Near Earth\'s surface: g ≈ 9.8 m/s² downward'
				],
			},
			{
				subtopic: 'Newton\'s Law of Gravitation',
				points: [
					'F = G(m₁m₂)/r²',
					'G = 6.67 × 10⁻¹¹ N·m²/kg²',
					'm₁, m₂ = interacting masses',
					'r = center-to-center separation'
				],
			},
			{
				subtopic: 'Gravitational vs Inertial Mass',
				points: [
					'Gravitational mass: Determines gravitational attraction strength; measured by comparing weights to a standard mass',
					'Inertial mass: Measure of resistance to acceleration; found by applying a known force and measuring acceleration: m = F/a',
					'Equivalence Principle: Inertial and gravitational masses are experimentally identical'
				],
			},
		],
	},
	{
		key: '2.3',
		title: '2.3 – Contact Forces',
		bullets: [
			{
				subtopic: 'Normal Force (F_N)',
				points: [
					'Perpendicular to a surface',
					'Balances the component of weight perpendicular to the surface'
				],
			},
			{
				subtopic: 'Friction',
				points: [
					'Static friction (f_s): resists the start of motion; f_s ≤ μ_s F_N',
					'Kinetic friction (f_k): resists ongoing motion; f_k = μ_k F_N',
					'Coefficients (μ_s, μ_k) depend on surface materials'
				],
			},
			{
				subtopic: 'Tension',
				points: [
					'Force in ropes, cables, strings when pulled taut',
					'Same magnitude throughout an ideal (massless, frictionless) rope'
				],
			},
			{
				subtopic: 'Other Contact Forces',
				points: [
					'Compression: Force in a solid object being pushed inward along its length',
					'Applied Force: Any external force intentionally applied to an object',
					'Contact forces often have both normal and frictional components'
				],
			},
		],
	},
	{
		key: '2.4',
		title: '2.4 – Newton\'s First Law (Law of Inertia)',
		bullets: [
			{
				subtopic: 'Statement',
				points: [
					'An object at rest remains at rest, and an object in motion remains in motion at constant velocity, unless acted on by a net external force'
				],
			},
			{
				subtopic: 'Inertia',
				points: [
					'Resistance to changes in motion',
					'Greater mass = greater inertia'
				],
			},
			{
				subtopic: 'Inertial Reference Frames',
				points: [
					'Frames of reference not accelerating',
					'Newton\'s First Law only holds true in inertial frames'
				],
			},
			{
				subtopic: 'Examples',
				points: [
					'Car passengers lurch forward when brakes are applied (body resists change in velocity)',
					'Satellites continue moving in space unless acted on by forces'
				],
			},
		],
	},
	{
		key: '2.5',
		title: '2.5 – Newton\'s Third Law and Free-Body Diagrams',
		bullets: [
			{
				subtopic: 'Newton\'s Third Law',
				points: [
					'For every action force, there is an equal and opposite reaction force',
					'Forces come in pairs: Equal in magnitude, Opposite in direction, Act on different objects',
					'Action–reaction pairs do not cancel because they act on different bodies'
				],
			},
			{
				subtopic: 'Free-Body Diagrams (FBDs)',
				points: [
					'Visual representations of all forces acting on the chosen system',
					'Steps: 1) Choose system, 2) Draw object as a dot/box, 3) Draw and label all external forces with correct directions, 4) Do not include forces the system exerts on other objects'
				],
			},
			{
				subtopic: 'Common Forces in FBDs',
				points: [
					'Gravity (F_g), normal force (F_N), tension (T), friction (f), applied force (F_app)'
				],
			},
		],
	},
	{
		key: '2.6',
		title: '2.6 – Newton\'s Second Law (Law of Acceleration)',
		bullets: [
			{
				subtopic: 'Statement',
				points: [
					'ΣF = ma',
					'Acceleration is directly proportional to the net force and inversely proportional to mass'
				],
			},
			{
				subtopic: 'Vector Nature',
				points: [
					'Acceleration occurs in the direction of the net force',
					'Equation applies separately to x- and y-components'
				],
			},
			{
				subtopic: 'Problem-Solving Process',
				points: [
					'1) Draw FBD',
					'2) Break forces into components',
					'3) Apply ΣF_x = ma_x, ΣF_y = ma_y',
					'4) Solve for unknowns',
					'Special Case: Equilibrium - If a = 0, net force is zero in both directions'
				],
			},
		],
	},
	{
		key: '2.7',
		title: '2.7 – Applications of Newton\'s Second Law',
		bullets: [
			{
				subtopic: 'Projectile Motion',
				points: [
					'Horizontal motion: constant velocity',
					'Vertical motion: constant acceleration due to gravity',
					'Analyzed separately in x and y'
				],
			},
			{
				subtopic: 'Inclined Planes',
				points: [
					'Break weight into components:',
					'Parallel to incline: mg sin θ',
					'Perpendicular to incline: mg cos θ',
					'Adjust F_N and friction accordingly'
				],
			},
			{
				subtopic: 'Circular Motion',
				points: [
					'Net force toward center = centripetal force',
					'F_c = mv²/r'
				],
			},
			{
				subtopic: 'Complex Systems',
				points: [
					'Tension in Multiple-Object Systems: Apply Newton\'s Second Law to each object separately',
					'Elevators: Apparent weight changes - Accelerating upward: F_N > mg, Accelerating downward: F_N < mg',
					'Friction in Motion: Compare applied force to f_s to determine if motion starts; Once moving, use f_k for acceleration'
				],
			},
		],
	},
];

const APPhysicsUnit2 = () => {
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
						onClick={() => navigate('/ap-physics/unit/2/quiz')}
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
								⚖️ AP Physics Unit 2: Dynamics
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Forces, Newton's laws, and applications in one and two dimensions.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit2Content.map((topic) => (
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

export default APPhysicsUnit2;
