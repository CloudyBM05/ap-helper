import React from 'react';
import { useNavigate } from 'react-router-dom';

const apGovUnits = [
	{
		number: 1,
		emoji: '📚',
		title: 'Foundations of American Democracy',
		description: 'Principles, Constitution, federalism',
	},
	{
		number: 2,
		emoji: '⚖️',
		title: 'Interactions Among Branches',
		description: 'Congress, presidency, courts, bureaucracy',
	},
	{
		number: 3,
		emoji: '🗽',
		title: 'Civil Liberties & Rights',
		description: 'Freedoms, rights, Supreme Court',
	},
	{
		number: 4,
		emoji: '💬',
		title: 'Political Ideologies & Beliefs',
		description: 'Opinion, ideology, socialization',
	},
	{
		number: 5,
		emoji: '🗳️',
		title: 'Political Participation',
		description: 'Elections, parties, media',
	},
	{
		number: 'all-cases',
		emoji: '📦',
		title: 'All Required Cases',
		description: 'Summary of all required cases',
	},
];

const APGovStudyGuide: React.FC = () => {
	const navigate = useNavigate();

	const handleUnitClick = (unitNumber: number | string) => {
		navigate(`/ap-gov-unit/${unitNumber}`);
	};

	return (
		<div className="py-12">
			<div className="max-w-5xl mx-auto px-4">
				<button
					onClick={() => navigate('/study-guides')}
					className="mb-8 px-4 py-2 rounded bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition"
				>
					&larr; Back to Study Guides
				</button>
				<h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">AP US Government Units</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
					{apGovUnits.map((unit) => (
						<div
							key={unit.number}
							className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-red-300"
							onClick={() => handleUnitClick(unit.number)}
						>
							<div className="text-4xl mb-2">{unit.emoji}</div>
							<div className="text-lg font-bold text-red-700 mb-1">{typeof unit.number === 'number' ? `Unit ${unit.number}` : unit.title}</div>
							<div className="text-slate-500">{unit.title}</div>
							{unit.description && <div className="text-slate-400 text-sm mt-1">{unit.description}</div>}
						</div>
					))}
				</div>
			</div>

			{/* Other Useful Study Tools */}
			<div className="max-w-5xl mx-auto mt-12">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
					<div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center border border-red-100 h-full min-h-[120px] col-span-1 sm:col-span-2 lg:col-span-3">
						<h2 className="text-3xl font-bold mb-4 text-red-800 text-center">Other Useful Study Tools</h2>
						<a
							href="https://knowt.com/exams/AP/AP-United-States-Government-and-Politics"
							target="_blank"
							rel="noopener noreferrer"
							className="block text-red-700 hover:underline font-bold text-lg mb-2"
						>
							Knowt AP Gov Resources
						</a>
						<a
							href="https://www.rcboe.org/cms/lib/GA01903614/Centricity/Domain/2849/AP%20Government%20Review%20Packet.pdf"
							target="_blank"
							rel="noopener noreferrer"
							className="block text-red-700 hover:underline font-bold text-lg mb-2"
						>
							AP Government Study Guide (PDF)
						</a>
						<a
							href="https://youtu.be/gXMfrPczfqY?si=1fZOa3gh-czBGjgs"
							target="_blank"
							rel="noopener noreferrer"
							className="block text-red-700 hover:underline font-bold text-lg"
						>
							AP Gov Speed Review in 14 Minutes (YouTube)
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default APGovStudyGuide;

// Make sure your router points '/ap-gov-unit/all-cases' to APGovCases
// Example:
// import APGovCases from './APGovCases';
// <Route path="/ap-gov-unit/all-cases" element={<APGovCases />} />
