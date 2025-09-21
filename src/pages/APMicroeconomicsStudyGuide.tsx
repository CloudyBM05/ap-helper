import React from 'react';
import { useNavigate } from 'react-router-dom';

const apMicroUnits = [
	{ unit: 1, emoji: '📊', title: 'Basic Economic Concepts' },
	{ unit: 2, emoji: '💰', title: 'Supply and Demand' },
	{ unit: 3, emoji: '🏭', title: 'Production, Cost, and the Perfect Firm' },
	{ unit: 4, emoji: '👑', title: 'Imperfect Competition' },
	{ unit: 5, emoji: '🩺', title: 'Factor Markets' },
	{ unit: 6, emoji: '🚨', title: 'Market Failure and the Role of Government' },
];

const APMicroeconomicsStudyGuide = () => {
	const navigate = useNavigate();

	return (
		<div className="py-12">
			<div className="max-w-5xl mx-auto px-4">
				{/* Back Button */}
				<button
					onClick={() => navigate('/study-guides')}
					className="mb-8 px-4 py-2 rounded bg-fuchsia-100 text-fuchsia-700 font-semibold hover:bg-fuchsia-200 transition"
				>
					← Back to Study Guides
				</button>
				<h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
					AP Microeconomics Units
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{apMicroUnits.map((unit) => (
						<div
							key={unit.unit}
							className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-fuchsia-300"
							onClick={() => navigate(`/ap-microeconomics/unit/${unit.unit}`)}
						>
							<div className="text-4xl mb-2">{unit.emoji}</div>
							<div className="text-lg font-bold text-fuchsia-700 mb-1">{`Unit ${unit.unit}`}</div>
							<div className="text-slate-500">{unit.title}</div>
						</div>
					))}
				</div>
				{/* Other Useful Study Tools */}
				<div className="max-w-5xl mx-auto mt-12 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
					{/* Study Tools Box */}
					<div className="flex-1 flex items-stretch">
						<div className="bg-white rounded-2xl shadow p-6 space-y-4 border border-fuchsia-100 w-full flex flex-col justify-center">
							<h2 className="text-2xl font-bold mb-4 text-fuchsia-800 text-center">
								Other Useful Study Tools
							</h2>
							<a
								href="https://library.fiveable.me/ap-microeconomics"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-fuchsia-700 hover:underline font-bold text-lg mb-2"
							>
								Fiveable Micro Notes
							</a>
							<a
								href="https://knowt.com/exams/AP/AP-Microeconomics"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-fuchsia-700 hover:underline font-bold text-lg mb-2"
							>
								Knowt Micro Resources
							</a>
							<a
								href="https://www.youtube.com/watch?v=3ez10ADR_gM"
								target="_blank"
								rel="noopener noreferrer"
								className="block text-fuchsia-700 hover:underline font-bold text-lg"
							>
								AP Micro in 18 Minutes (YouTube)
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default APMicroeconomicsStudyGuide;
