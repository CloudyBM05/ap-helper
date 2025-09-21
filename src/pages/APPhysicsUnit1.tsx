import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit1Content = [
	{
		key: '1.1',
		title: '1.1 – Position, Velocity, and Acceleration',
		bullets: [
			{
				subtopic: 'Distance vs Displacement',
				points: [
					'Distance: Total length of path traveled (scalar quantity)',
					'Displacement: Change in position from initial to final location (vector quantity)',
					'Units: meters (m), kilometers (km), miles (mi)',
					'Displacement represented as arrow from starting point to ending point'
				],
			},
			{
				subtopic: 'Scalar vs Vector Quantities',
				points: [
					'Scalar: Only magnitude (mass, temperature, time, speed, distance, energy, power)',
					'Vector: Magnitude + direction (displacement, velocity, acceleration, force, momentum)',
					'Vectors represented graphically as arrows: length = magnitude, direction = arrow orientation',
					'Vectors can be added/subtracted using vector algebra'
				],
			},
			{
				subtopic: 'Position',
				points: [
					'Location relative to a reference point; vector quantity',
					'Usually described using a coordinate system',
					'Position vs Time Graph: Slope = velocity, Y-intercept = initial position',
					'Straight-line slope → constant velocity, Curved slope → changing velocity (acceleration)'
				],
			},
			{
				subtopic: 'Speed vs Velocity',
				points: [
					'Speed: Scalar quantity, how fast an object moves, Formula: S = D/t, SI unit: m/s',
					'Velocity: Vector quantity, rate of change of position, Formula: V = Δx/t, SI unit: m/s',
					'Position–Time graph shows velocity, Velocity–Time graph shows acceleration'
				],
			},
			{
				subtopic: 'Acceleration',
				points: [
					'Rate of change of velocity over time (vector quantity)',
					'Formula: a = (vf - vi)/t, SI unit: m/s²',
					'Positive acceleration → speeding up, Negative acceleration → slowing down',
					'Uniform acceleration → constant over time, Non-uniform acceleration → changes over time'
				],
			},
			{
				subtopic: 'Free Fall',
				points: [
					'Special uniform acceleration case under gravity only',
					'g ≈ 9.8 m/s² downward',
					'Distance formula: d = ½gt²'
				],
			},
		],
	},
	{
		key: '1.2',
		title: '1.2 – BIG FIVE Equations for Uniformly Accelerated Motion',
		bullets: [
			{
				subtopic: 'Kinematic Equations',
				points: [
					'v = u + at',
					's = ut + ½at²',
					'v² = u² + 2as',
					's = ½(u + v)t',
					'a = (v - u)/t'
				],
			},
			{
				subtopic: 'Variables',
				points: [
					'u = initial velocity',
					'v = final velocity',
					'a = acceleration',
					's = displacement',
					't = time'
				],
			},
			{
				subtopic: 'Example Problem',
				points: [
					'Car accelerates at 5 m/s² from rest for 10 s:',
					'v = 0 + 5(10) = 50 m/s',
					's = 0(10) + ½(5)(100) = 250 m'
				],
			},
		],
	},
	{
		key: '1.3',
		title: '1.3 – Projectile Motion',
		bullets: [
			{
				subtopic: 'Basic Concepts',
				points: [
					'Object launched into the air, moving under gravity',
					'Path is parabolic',
					'Horizontal & vertical motions are independent',
					'g acts only vertically'
				],
			},
			{
				subtopic: 'Key Formulas',
				points: [
					'Max height: h = (v₀sinθ)²/2g',
					'Range: R = v₀²sin2θ/g',
					'Time of flight: depends on vertical motion'
				],
			},
			{
				subtopic: 'Angled Motion',
				points: [
					'Projectile launched at angle θ to the horizontal',
					'Horizontal velocity: vₓ = v₀cosθ (constant)',
					'Vertical velocity: vᵧ = v₀sinθ - gt (changes due to gravity)',
					'Time of flight: t = 2v₀sinθ/g'
				],
			},
		],
	},
	{
		key: '1.4',
		title: '1.4 – Representations of Motion',
		bullets: [
			{
				subtopic: 'Motion Descriptions',
				points: [
					'Motion can be described using words, diagrams, graphs, or equations',
					'Motion diagrams — series of images showing object position at equal time intervals',
					'Translating between representations is a core AP skill'
				],
			},
			{
				subtopic: 'Graphical Representations',
				points: [
					'Position–Time graphs — slope = velocity',
					'Velocity–Time graphs — slope = acceleration; area under curve = displacement',
					'Acceleration–Time graphs — area under curve = change in velocity'
				],
			},
			{
				subtopic: 'Vector Diagrams',
				points: [
					'Often used to break motion into components',
					'Units must always match the quantity (m, s, m/s, m/s²)',
					'Essential for analyzing two-dimensional motion'
				],
			},
		],
	},
];

const APPhysicsUnit1 = () => {
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
						onClick={() => navigate('/ap-physics/unit/1/quiz')}
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
								🏃‍♂️ AP Physics Unit 1: Kinematics
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Position, velocity, acceleration, and motion representations in one and two dimensions.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit1Content.map((topic) => (
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

export default APPhysicsUnit1;
