import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit8Content = [
	{
		key: '8.1',
		title: '8.1 – Internal Structure and Density',
		bullets: [
			{
				subtopic: 'Fluids',
				points: [
					'Include both liquids and gases',
					'They flow and take the shape of their container',
					'Liquids have definite volume but no fixed shape; gases have no fixed volume or shape'
				],
			},
			{
				subtopic: 'Density (ρ)',
				points: [
					'Defined as mass per unit volume: ρ = m/V',
					'Units: kg/m³',
					'A key property for determining buoyancy and fluid pressure'
				],
			},
			{
				subtopic: 'Viscosity',
				points: [
					'Measure of a fluid\'s resistance to flow or shear stress',
					'Higher viscosity → flows slower (e.g., honey vs water)',
					'Important factor in determining flow characteristics'
				],
			},
			{
				subtopic: 'Compressibility',
				points: [
					'Describes how much a fluid\'s volume changes under pressure',
					'Gases are highly compressible, liquids are nearly incompressible',
					'Fluid behavior depends on temperature, pressure, dissolved substances, and suspended particles'
				],
			},
		],
	},
	{
		key: '8.2',
		title: '8.2 – Pressure',
		bullets: [
			{
				subtopic: 'Definition and Formula',
				points: [
					'Pressure: Force per unit area exerted perpendicular to a surface',
					'Formula: P = F/A',
					'Units: pascals (Pa) → 1 Pa = 1 N/m²'
				],
			},
			{
				subtopic: 'Hydrostatic Pressure (fluid at rest)',
				points: [
					'Increases with depth: P = ρgh (where h is the depth)',
					'Acts equally in all directions at a given depth (Pascal\'s principle)',
					'Independent of container shape, only depends on depth'
				],
			},
			{
				subtopic: 'Types of Pressure',
				points: [
					'Gauge pressure – relative to atmospheric pressure',
					'Absolute pressure – gauge pressure + atmospheric pressure',
					'Measured using manometers and pressure gauges'
				],
			},
			{
				subtopic: 'Applications of Pressure',
				points: [
					'Pascal\'s Principle – pressure applied to a confined fluid is transmitted undiminished',
					'Used in hydraulic systems for force multiplication: F₂/F₁ = A₂/A₁',
					'Ideal Gas Law (for gases): PV = nRT relates pressure, volume, temperature, and amount of gas'
				],
			},
		],
	},
	{
		key: '8.3',
		title: '8.3 – Fluids and Newton\'s Laws',
		bullets: [
			{
				subtopic: 'Buoyancy',
				points: [
					'Upward force a fluid exerts on an immersed object',
					'Archimedes\' Principle: Buoyant force equals the weight of displaced fluid',
					'Formula: Fb = ρfluid × g × Vdisplaced',
					'Floating: weight < buoyant force; Sinking: weight > buoyant force',
					'Neutral buoyancy: weight = buoyant force',
					'Apparent weight is reduced by the buoyant force'
				],
			},
			{
				subtopic: 'Center of Buoyancy',
				points: [
					'Point where buoyant force acts',
					'Located at the centroid of the displaced fluid volume',
					'Important for stability analysis of floating objects'
				],
			},
			{
				subtopic: 'Fluid Forces and Motion',
				points: [
					'Fluids exert net forces due to pressure differences (Newton\'s 2nd law)',
					'Fluid drag and resistance are influenced by viscosity and flow type',
					'Reynolds Number determines flow regime (laminar vs turbulent) based on fluid velocity, density, and viscosity'
				],
			},
			{
				subtopic: 'Flow Types',
				points: [
					'Laminar flow – smooth, parallel layers of fluid',
					'Turbulent flow – chaotic, irregular motion with mixing',
					'Flow type affects drag, heat transfer, and energy losses'
				],
			},
		],
	},
	{
		key: '8.4',
		title: '8.4 – Fluids and Conservation Laws',
		bullets: [
			{
				subtopic: 'Continuity Equation (mass conservation)',
				points: [
					'In steady flow: ρ₁A₁v₁ = ρ₂A₂v₂',
					'For incompressible fluids, density is constant → A₁v₁ = A₂v₂',
					'Fluid speed increases where cross-sectional area decreases'
				],
			},
			{
				subtopic: 'Bernoulli\'s Principle (energy conservation)',
				points: [
					'In streamline flow, increase in velocity → decrease in pressure (and vice versa)',
					'Explains lift in airplane wings, fluid jets, and venturi effect',
					'Energy is conserved along a streamline in ideal fluid flow'
				],
			},
			{
				subtopic: 'Pascal\'s Principle and Hydraulics',
				points: [
					'Allows force multiplication in systems like car brakes, lifts, and heavy machinery',
					'Pressure is constant throughout a confined fluid',
					'Small force on small area creates large force on large area'
				],
			},
			{
				subtopic: 'Applications in Real Life',
				points: [
					'Aviation – wing design for lift and drag reduction',
					'Marine engineering – ship/submarine buoyancy and stability',
					'Pipelines and irrigation – optimizing flow rates and minimizing loss',
					'Biomedical – blood flow analysis, heart valve design, drug delivery systems',
					'Meteorology – weather pattern prediction via fluid flow models'
				],
			},
			{
				subtopic: 'Problem-Solving Strategies',
				points: [
					'Identify knowns/unknowns, sketch diagrams',
					'Choose correct principles (Archimedes, continuity, Bernoulli)',
					'Ensure unit consistency',
					'Check physical reasonableness of results'
				],
			},
		],
	},
];

const APPhysicsUnit8 = () => {
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
						onClick={() => navigate('/ap-physics/unit/8/quiz')}
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
								💧 AP Physics Unit 8: Fluids
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Pressure, buoyancy, flow dynamics, and conservation laws in fluid systems.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit8Content.map((topic) => (
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

export default APPhysicsUnit8;
