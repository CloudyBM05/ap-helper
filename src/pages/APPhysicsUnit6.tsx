import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit6Content = [
	{
		key: '6.1',
		title: '6.1 – Period of Simple Harmonic Oscillators',
		bullets: [
			{
				subtopic: 'Definition of SHM (Simple Harmonic Motion)',
				points: [
					'Type of periodic motion where the restoring force is directly proportional to the displacement from equilibrium and directed toward equilibrium',
					'Acceleration is proportional to displacement and always points toward equilibrium',
					'Motion is periodic and repetitive',
					'Velocity: maximum at equilibrium, minimum at extreme positions',
					'Displacement, velocity, and acceleration are sinusoidal functions of time',
					'Period is independent of amplitude for ideal SHM'
				],
			},
			{
				subtopic: 'Examples of SHM',
				points: [
					'Mass on a vertical spring',
					'Pendulum swinging back and forth (small-angle approximation)'
				],
			},
			{
				subtopic: 'Mathematical Equations of Motion',
				points: [
					'Displacement: x = A cos(ωt + φ)',
					'Velocity: v = -Aω sin(ωt + φ)',
					'Acceleration: a = -Aω² cos(ωt + φ)',
					'Variables: A = amplitude, ω = angular frequency, t = time, φ = phase angle'
				],
			},
			{
				subtopic: 'Force in SHM',
				points: [
					'Governed by Hooke\'s Law: F = -kx',
					'k = spring constant (higher k = stiffer spring)',
					'Force is a vector with magnitude and direction',
					'Unit: Newton (N)',
					'Force causes acceleration, can change direction of motion, or deform an object'
				],
			},
			{
				subtopic: 'Amplitude',
				points: [
					'Maximum displacement from equilibrium',
					'Units: meters (m) for mechanical waves, volts (V) for electromagnetic waves',
					'Determines energy and intensity of motion',
					'Larger amplitude can affect the force in the system'
				],
			},
			{
				subtopic: 'Period (T) and Frequency (f)',
				points: [
					'Period (T): time for one complete cycle (s)',
					'T = 1/f (inversely proportional to frequency)',
					'Frequency (f): cycles per second (Hz)',
					'f = 1/T (directly proportional to energy of motion)'
				],
			},
			{
				subtopic: 'Effect of Mass and Spring Constant',
				points: [
					'For springs: Larger mass → longer period (slower oscillation)',
					'Larger k → shorter period (faster oscillation)',
					'Mass affects spring oscillators but not pendulums (in ideal cases)'
				],
			},
			{
				subtopic: 'Pendulums',
				points: [
					'Weight suspended from pivot swings due to gravity',
					'Period equation: T = 2π√(L/g)',
					'L = length of pendulum, g = acceleration due to gravity',
					'Period depends on length and gravity, not mass',
					'Used in clocks, seismometers, timing devices',
					'Assumes small angles for SHM approximation'
				],
			},
		],
	},
	{
		key: '6.2',
		title: '6.2 – Energy of a Simple Harmonic Oscillator',
		bullets: [
			{
				subtopic: 'Total Mechanical Energy',
				points: [
					'Constant in ideal SHM (no damping)',
					'E_total = ½kA²',
					'Depends on amplitude A and spring constant k'
				],
			},
			{
				subtopic: 'Kinetic Energy (K)',
				points: [
					'K = ½mv²',
					'Maximum at equilibrium position (velocity maximum)',
					'Zero at extreme displacements'
				],
			},
			{
				subtopic: 'Potential Energy (U)',
				points: [
					'Elastic potential energy in the spring: U = ½kx²',
					'Maximum at extreme positions (displacement maximum)',
					'Zero at equilibrium'
				],
			},
			{
				subtopic: 'Energy Transformation in SHM',
				points: [
					'At extreme positions: All energy is potential',
					'At equilibrium: All energy is kinetic',
					'Energy oscillates between kinetic and potential, but total remains constant'
				],
			},
			{
				subtopic: 'Amplitude\'s Role in Energy',
				points: [
					'Total energy ∝ A² (doubling amplitude quadruples total energy)',
					'Larger amplitude → more energy stored in both potential and kinetic forms'
				],
			},
		],
	},
];

const APPhysicsUnit6 = () => {
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
						onClick={() => navigate('/ap-physics/unit/6/quiz')}
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
								🎶 AP Physics Unit 6: Simple Harmonic Motion
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Oscillations, periods, energy in harmonic systems.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit6Content.map((topic) => (
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

export default APPhysicsUnit6;
