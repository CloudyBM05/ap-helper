import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit7Content = [
	{
		key: '7.1',
		title: '7.1 – Rotational Kinematics',
		bullets: [
			{
				subtopic: 'Definition of Rotational Motion',
				points: [
					'Motion of an object around an axis or fixed point (also called circular motion)',
					'Axis of rotation may pass through or outside the object',
					'Related to inertia — greater inertia means greater resistance to changes in velocity, requiring more force to alter motion'
				],
			},
			{
				subtopic: 'Key Quantities in Rotational Motion',
				points: [
					'Angular Displacement (θ): Change in rotation angle; measured in radians',
					'Formula: θ = s/r where s = arc length, r = radius',
					'Angular Velocity (ω): Rate of change of angular displacement; measured in rad/s',
					'Formula: ω = θ/t',
					'Angular Acceleration (α): Rate of change of angular velocity; measured in rad/s²',
					'Formula: α = (ωf - ωi)/t'
				],
			},
			{
				subtopic: 'Relationship Between Linear and Angular Motion',
				points: [
					'Linear Velocity: v = rω',
					'The speed of a point on a rotating object depends on angular velocity and radius',
					'Linear Acceleration: a = rα',
					'Acceleration at a point depends on angular acceleration and radius'
				],
			},
			{
				subtopic: 'Applications of Rotational Kinematics',
				points: [
					'Used in physics and engineering: mechanics, astronomy, robotics',
					'Analogous to linear kinematics equations, but with angular variables'
				],
			},
		],
	},
	{
		key: '7.2',
		title: '7.2 – Torque and Angular Acceleration',
		bullets: [
			{
				subtopic: 'Torque (τ)',
				points: [
					'Definition: The rotational equivalent of force; causes an object to rotate about an axis',
					'Formula: τ = r × F where r = distance from axis of rotation to line of force, F = force applied',
					'Units: N·m (SI), ft·lb (US customary)',
					'Right-Hand Rule: Curl fingers in direction of rotation; thumb points in direction of torque vector'
				],
			},
			{
				subtopic: 'Moment of Inertia (I)',
				points: [
					'Definition: Resistance of an object to changes in rotational motion',
					'Depends on both mass and how mass is distributed relative to the axis of rotation'
				],
			},
			{
				subtopic: 'Newton\'s Second Law for Rotation',
				points: [
					'Rotational analog: Στ = Iα',
					'Similar to Fnet = ma for linear motion',
					'Larger moment of inertia or smaller torque → smaller angular acceleration'
				],
			},
			{
				subtopic: 'Practical Example',
				points: [
					'Opening a door: pushing farther from the hinges (larger r) increases torque for the same force'
				],
			},
		],
	},
	{
		key: '7.3',
		title: '7.3 – Angular Momentum and Torque',
		bullets: [
			{
				subtopic: 'Angular Momentum (L)',
				points: [
					'Related to torque through: τ = ΔL/Δt',
					'Measures the rotational motion\'s quantity of movement',
					'Dependent on moment of inertia and angular velocity'
				],
			},
			{
				subtopic: 'Connection Between Torque and Angular Momentum',
				points: [
					'Torque changes angular momentum over time',
					'Zero net torque → angular momentum is constant (conservation principle)'
				],
			},
			{
				subtopic: 'Implications',
				points: [
					'If no external torque acts on a system, it maintains the same angular momentum',
					'Explains phenomena like a spinning skater pulling in their arms to spin faster'
				],
			},
		],
	},
	{
		key: '7.4',
		title: '7.4 – Conservation of Angular Momentum',
		bullets: [
			{
				subtopic: 'Definition',
				points: [
					'Angular momentum is conserved when no external torque acts on a system',
					'Formula: L_initial = L_final',
					'Or: I_i ω_i = I_f ω_f'
				],
			},
			{
				subtopic: 'Applications',
				points: [
					'Figure skaters spinning faster by reducing radius of rotation',
					'Planetary motion in astronomy — planets speed up when closer to the Sun'
				],
			},
			{
				subtopic: 'Center of Mass (COM)',
				points: [
					'Point where all the mass of an object/system can be considered to be concentrated',
					'For symmetrical objects: at geometric center',
					'Can be outside the physical material if mass is unevenly distributed',
					'Moves as if all mass were concentrated there',
					'Conserved if no external forces act',
					'Formula: COM = (m₁r₁ + m₂r₂ + ... + mₙrₙ)/(m₁ + m₂ + ... + mₙ)'
				],
			},
			{
				subtopic: 'Practical Examples',
				points: [
					'Balancing objects',
					'Analyzing motion of systems like planets, satellites, or rotating machinery'
				],
			},
		],
	},
];

const APPhysicsUnit7 = () => {
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
						onClick={() => navigate('/ap-physics/unit/7/quiz')}
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
								🔧 AP Physics Unit 7: Torque & Rotational Motion
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Angular kinematics, torque, angular momentum, and rotational dynamics.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit7Content.map((topic) => (
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

export default APPhysicsUnit7;
