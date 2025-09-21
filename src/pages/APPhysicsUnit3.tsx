import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit3Content = [
	{
		key: '3.1',
		title: '3.1 – Vector Fields',
		bullets: [
			{
				subtopic: 'Definition',
				points: [
					'A vector field assigns a vector (magnitude + direction) to every point in space',
					'Examples: gravitational field, electric field, magnetic field'
				],
			},
			{
				subtopic: 'Gravitational Field',
				points: [
					'Direction: points toward the mass creating the field',
					'Magnitude near Earth\'s surface: g ≈ 9.8 m/s²',
					'Equation: g = Fg/m'
				],
			},
			{
				subtopic: 'Electric Field',
				points: [
					'Direction: points toward negative charges and away from positive charges',
					'Equation: E = Fe/q'
				],
			},
		],
	},
	{
		key: '3.2',
		title: '3.2 – Fundamental Forces',
		bullets: [
			{
				subtopic: 'Four Fundamental Forces (weakest to strongest)',
				points: [
					'1. Gravitational Force: Always attractive; dominates at large mass & distance scales',
					'2. Weak Nuclear Force: Responsible for certain types of radioactive decay; short range; acts inside atomic nucleus',
					'3. Electromagnetic Force: Attractive or repulsive; acts between charged particles; much stronger than gravity at small scales',
					'4. Strong Nuclear Force: Holds protons and neutrons together in nucleus; strongest force but short range'
				],
			},
		],
	},
	{
		key: '3.3',
		title: '3.3 – Gravitational and Electric Forces',
		bullets: [
			{
				subtopic: 'Gravitational Force',
				points: [
					'Newton\'s Law of Universal Gravitation: Fg = G(m₁m₂)/r²',
					'G = 6.674 × 10⁻¹¹ N·m²/kg²',
					'Proportional to product of masses',
					'Inversely proportional to square of separation distance',
					'Example: Sun–planet attraction keeps planets in orbit'
				],
			},
			{
				subtopic: 'Electric Force',
				points: [
					'Coulomb\'s Law: Fe = k(q₁q₂)/r²',
					'k = 9 × 10⁹ N·m²/C²',
					'Can be attractive or repulsive depending on charge signs',
					'Proportional to product of charges',
					'Inversely proportional to square of separation distance'
				],
			},
		],
	},
	{
		key: '3.4',
		title: '3.4 – Gravitational Field / Acceleration Due to Gravity on Different Planets',
		bullets: [
			{
				subtopic: 'Gravitational Field Strength',
				points: [
					'g = Fg/m = GM/r²',
					'M = mass of planet/body, r = distance from center of planet'
				],
			},
			{
				subtopic: 'On Earth',
				points: [
					'g ≈ 9.81 m/s²'
				],
			},
			{
				subtopic: 'Variation',
				points: [
					'Different planets have different g due to differing mass and radius',
					'Higher M or smaller r → stronger gravity'
				],
			},
			{
				subtopic: 'Free Fall',
				points: [
					'If only gravity acts, object accelerates at g',
					'Weight W = mg depends on local g'
				],
			},
		],
	},
	{
		key: '3.5',
		title: '3.5 – Inertial vs. Gravitational Mass',
		bullets: [
			{
				subtopic: 'Inertial Mass',
				points: [
					'Measure of an object\'s resistance to acceleration',
					'Found from m = F/a'
				],
			},
			{
				subtopic: 'Gravitational Mass',
				points: [
					'Determines strength of gravitational interaction',
					'Found from Newton\'s Law of Gravitation by measuring weight relative to standard'
				],
			},
			{
				subtopic: 'Equivalence Principle',
				points: [
					'Experimental evidence shows inertial and gravitational mass are equal'
				],
			},
		],
	},
	{
		key: '3.6',
		title: '3.6 – Centripetal Acceleration and Centripetal Force',
		bullets: [
			{
				subtopic: 'Uniform Circular Motion',
				points: [
					'Speed is constant; velocity changes due to direction change',
					'Velocity change → constant inward acceleration'
				],
			},
			{
				subtopic: 'Centripetal Acceleration',
				points: [
					'ac = v²/r',
					'Direction: toward center of circle'
				],
			},
			{
				subtopic: 'Centripetal Force',
				points: [
					'Net inward force maintaining circular motion: Fc = mac = mv²/r',
					'Can be provided by: Tension (ball on string), Friction (car turning), Gravity (satellite orbiting)',
					'Key Note: Centripetal force changes direction of velocity, not its magnitude'
				],
			},
		],
	},
	{
		key: '3.7',
		title: '3.7 – Free-Body Diagrams for Objects in Uniform Circular Motion',
		bullets: [
			{
				subtopic: 'Steps',
				points: [
					'1. Identify object as the system',
					'2. Draw all external forces (gravity, normal, friction, tension, applied forces)',
					'3. Determine which force(s) supply the centripetal force',
					'4. Apply Newton\'s Second Law in radial direction: ΣFradial = mv²/r',
					'5. Apply Newton\'s Second Law in tangential direction if there\'s tangential acceleration'
				],
			},
			{
				subtopic: 'Common Cases',
				points: [
					'Vertical circle: tension/normal force changes throughout motion',
					'Banked curves: normal force has a radial component',
					'Flat curves: friction supplies radial force'
				],
			},
		],
	},
	{
		key: '3.8',
		title: '3.8 – Applications of Circular Motion and Gravitation',
		bullets: [
			{
				subtopic: 'Orbital Motion',
				points: [
					'Gravity acts as centripetal force: mv²/r = GMm/r² → v = √(GM/r)',
					'Used to determine satellite speeds'
				],
			},
			{
				subtopic: 'Banked Curves',
				points: [
					'Banking angle eliminates reliance on friction: tan θ = v²/(rg)'
				],
			},
			{
				subtopic: 'Vertical Loop Motion',
				points: [
					'Minimum speed at top to maintain contact: vmin = √(rg)'
				],
			},
			{
				subtopic: 'Other Applications',
				points: [
					'Planetary Orbits: Kepler\'s laws follow from Newton\'s Law of Gravitation + circular motion',
					'Rotating Space Stations: Artificial gravity via centripetal acceleration'
				],
			},
		],
	},
];

const APPhysicsUnit3 = () => {
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
						onClick={() => navigate('/ap-physics/unit/3/quiz')}
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
								🌍 AP Physics Unit 3: Circular Motion and Gravitation
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Vector fields, fundamental forces, centripetal motion, and gravitational interactions.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit3Content.map((topic) => (
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

export default APPhysicsUnit3;
