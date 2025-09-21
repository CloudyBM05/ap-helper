import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit4Content = [
	{
		key: '4.1',
		title: '4.1 – Open and Closed Systems: Energy',
		bullets: [
			{
				subtopic: 'Energy Definition in Systems',
				points: [
					'Energy is the ability to do work or produce change',
					'In mechanics, we focus on mechanical energy (sum of kinetic + potential energy)'
				],
			},
			{
				subtopic: 'Open Systems',
				points: [
					'Exchange both energy and matter with their surroundings',
					'Example: boiling pot of water without a lid (heat and water vapor escape)'
				],
			},
			{
				subtopic: 'Closed Systems',
				points: [
					'Exchange energy only with surroundings, not matter',
					'Example: a sealed, insulated container (may transfer heat or work, but no matter leaves/enters)'
				],
			},
			{
				subtopic: 'Mechanical Energy',
				points: [
					'Kinetic energy (KE): energy of motion → KE = ½mv²',
					'Potential energy (PE): stored energy due to position/configuration → PE = mgh (gravitational)',
					'Total mechanical energy: E = K + U (K = kinetic, U = potential)'
				],
			},
		],
	},
	{
		key: '4.2',
		title: '4.2 – Work and Mechanical Energy',
		bullets: [
			{
				subtopic: 'Work',
				points: [
					'Definition: Transfer of energy that occurs when a force is applied over a distance',
					'Formula: W = Fd (force × displacement) — valid when force is parallel to motion',
					'Units: Joules (J) → 1 J = 1 N·m'
				],
			},
			{
				subtopic: 'Work at an Angle',
				points: [
					'Use W = Fd cos θ where θ is the angle between the force and displacement vectors',
					'Example: F = 50 N, d = 2 m, θ = 30° → W = 86.6 J'
				],
			},
			{
				subtopic: 'Mechanical Energy',
				points: [
					'Sum of KE and PE: E = K + U',
					'KE: ½mv²',
					'PE: mgh (g = 9.8 m/s²)',
					'In a closed system with no nonconservative forces (like friction), mechanical energy is conserved'
				],
			},
			{
				subtopic: 'Work-Energy Theorem',
				points: [
					'Statement: Net work done on an object = change in kinetic energy',
					'Formula: W_net = ΔKE',
					'Alternate: W_total = ΔK',
					'Explains that systems gain or lose KE through work exchange with surroundings'
				],
			},
		],
	},
	{
		key: '4.3',
		title: '4.3 – Conservation of Energy, the Work-Energy Principle, and Power',
		bullets: [
			{
				subtopic: 'Conservation of Mechanical Energy',
				points: [
					'In absence of nonconservative forces (friction, air resistance), E_total stays constant',
					'K_i + U_i = K_f + U_f',
					'This is the simplest form of total energy conservation law'
				],
			},
			{
				subtopic: 'Including Nonconservative Forces',
				points: [
					'If forces like friction or applied forces do work:',
					'K_i + U_i + W_other = K_f + U_f',
					'Example: Friction does negative work, reducing total mechanical energy'
				],
			},
			{
				subtopic: 'Power',
				points: [
					'Definition: Rate at which work is done or energy is transferred',
					'Formula: P = W/t',
					'Units: watts (W) → 1 W = 1 J/s',
					'Other units: horsepower (hp), kilowatts (kW)'
				],
			},
			{
				subtopic: 'Power Example',
				points: [
					'Lifting 50 kg, 2 m high, in 5 s:',
					'W = mgh = (50)(9.8)(2) = 980 J',
					'P = 980/5 = 196 W'
				],
			},
			{
				subtopic: 'Power vs Energy',
				points: [
					'Energy: total capacity to do work',
					'Power: how fast work is done (energy per time)',
					'A 100 W bulb for 10 hrs uses more energy than a 50 W bulb for the same time'
				],
			},
			{
				subtopic: 'Efficiency',
				points: [
					'Measures how well input energy is converted into useful output energy',
					'Efficiency = Useful Output Energy / Input Energy',
					'A high-power device isn\'t necessarily more efficient—depends on energy conversion losses'
				],
			},
		],
	},
];

const APPhysicsUnit4 = () => {
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
						onClick={() => navigate('/ap-physics/unit/4/quiz')}
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
								⚡ AP Physics Unit 4: Energy
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Work, energy conservation, power, and mechanical systems.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit4Content.map((topic) => (
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

export default APPhysicsUnit4;
