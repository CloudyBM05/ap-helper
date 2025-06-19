import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const unit1Content = [
	{
		key: '1.2',
		title: '1.2 – Native American Peoples',
		bullets: [
			[
				'**Central and South America**',
				'**Aztecs:** In central Mexico they built sprawling cities with hierarchical governments, written language, advanced canals, and dramatic ritual offerings to their gods.',
				'**Mayans:** On the Yucatán Peninsula they engineered massive cities, complex waterworks, soaring stone temples, and revered rulers as divine scions.',
				'**Incas:** Across the Andes and Pacific coast, they governed some 16 million people in a well‑organized empire, terraced high‑altitude fields for potatoes, and managed an extensive road network.',
				'**Maize** was the powerhouse crop—its high yields drove population booms, sophisticated irrigation projects, and increasingly diverse social hierarchies.',
				'Even their gods ordered second helpings—there was no “leftover” in their vocabulary.',
				'',
				'**North American Native Peoples**',
				'**Southwest (Pueblo):** In today’s New Mexico and Arizona, Pueblo societies built permanent adobe and stone villages, cultivating corn, beans, and squash.',
				'**Great Plains & Basin (Nomads):** Small kin‑based bands roamed the plains hunting bison and gathering roots, valuing mobility and shared resources.',
				'**Pacific Northwest (Fishing Villages):** Tribes like the Chinook and Chumash fished salmon, crafted massive cedar plank houses, and built canoes for ocean voyages.',
				'**Mississippi Valley (Complex Societies):** The Hopewell (4–6 K people) and Cahokia (10–30 K people) harnessed fertile lands for agriculture, traded widely, and formed centralized leadership under powerful chiefs.',
				'**Northeast (Iroquois):** Living in lengthy communal longhouses, they grew the “Three Sisters” (corn, beans, squash) and organized into confederacies of allied villages.',
				'Their communal longhouses were so cozy you’d swear they invented “open floor plans” centuries before modern architects.',
			],
		],
	},
	{
		key: '1.3',
		title: '1.3 – European Exploration of the Americas',
		bullets: [
			[
				'**Motivations:** Europe’s post‑plague population surge, centralized monarchies funding luxury‑hungry elites, and merchants eager for a new route to Asian spices.',
				'**Challenges:** Overland routes across Afro‑Eurasia were controlled by Muslim powers, limiting direct European access to eastern markets.',
				'**Portugal’s Solution:** Under Prince Henry, they built coastal forts, deployed caravels, and adopted astrolabes and stern‑post rudders to sail around Africa into the Indian Ocean.',
				'**Spain’s Entry:** Ferdinand and Isabella unified Spain and backed Columbus’s westward voyage in 1492—accidentally landing in the Caribbean while chasing spices.',
				'Columbus’s gold discoveries taught Europe that you can find fortune by sailing uncharted seas, but you might still be seasick.',
			],
		],
	},
	{
		key: '1.4',
		title: '1.4 – The Columbian Exchange',
		bullets: [
			[
				'**Definition:** A vast transfer of plants, animals, minerals, people, and diseases between the Old and New Worlds.',
				'**Disease:** European smallpox and measles decimated Native populations (e.g., Hispaniola lost ~300 K people), while Europeans and Africans possessed greater immunity.',
				'**Crops:** New World staples—maize, potatoes, tomatoes, cacao, tobacco—transformed European diets; Old World grains, citrus, and rice enriched American fields.',
				'**Animals & Minerals:** Horses, pigs, and cattle reshaped the American landscape; American silver and gold bolstered Spain’s treasuries.',
				'**People:** Forced migrations included African slaves to the Americas and some Native Americans to Europe, underpinning brutal plantation economies.',
				'Even the pigs got so far they became the original globe‑trotting food bloggers.',
			],
		],
	},
	{
		key: '1.5',
		title: '1.5 – Labor Systems and Societal Restructuring',
		bullets: [
			[
				'**African Slavery:** Pre‑European African servitude was limited and non‑hereditary; Europeans transformed it into lifelong, inheritable bondage for New World plantations.',
				'**Encomienda:** Spanish settlers were granted land and forced native labor under a religious guise, but high native mortality soon led to imported African labor.',
				'**Caste System:** Spain imposed rigid social tiers—Peninsulares, Creoles, Mestizos, Mulattos, Africans, Native Americans—to regulate taxes and labor.',
				'**Economic Impact:** New World silver enriched European elites but often deepened peasant poverty.',
				'They called it “forced labor,” but it was more like “permanent vacation”—with none of the fun.',
			],
		],
	},
	{
		key: '1.6',
		title: '1.6 – Spanish Colonial Dominance in the Americas',
		bullets: [
			[
				'**Mission System:** Spain extended its reach by sending missionaries northward to convert Native Americans rather than conquering solely by force.',
				'**Cultural Exchange:** Spaniards traded metal tools, horses, and fur‑trade partnerships; some Europeans even married into native tribes to secure alliances.',
				'**Resistance:** The 1680 Pueblo Revolt briefly expelled Spanish priests, showcasing the power of unified indigenous action.',
				'**Debate on Conquest:** Advocates like Bartolomé de Las Casas condemned Spanish brutality, while others insisted on civilization’s mandate to conquer.',
				'That debate was so fierce, even the mission bells rang in protest.',
			],
		],
	},
];

const timelineData = [
	{
		key: 'pre1492',
		icon: '🌎',
		title: 'Pre-1492: Indigenous America',
		summary: 'Indigenous peoples across the Americas form complex and diverse societies.',
		details: [
			'Aztecs in Central Mexico with large cities and human sacrifice rituals',
			'Mayans on the Yucatan Peninsula with advanced astronomy and irrigation',
			'Incas in the Andes with terraced farming and a vast empire',
			'North American tribes like the Pueblo, Iroquois, Cahokia, and Chinook thrive with regionally adapted lifestyles',
		],
	},
	{
		key: '1492',
		icon: '🚢',
		title: '1492: Columbus Sails the Ocean Blue',
		summary: 'Columbus, funded by Spain, lands in the Caribbean and begins the Columbian Exchange.',
		details: [
			'Christopher Columbus, funded by Spain, lands in the Caribbean (San Salvador) and mistakenly believes he’s reached Asia.',
			'Begins the Columbian Exchange, linking the Old World (Europe, Africa, Asia) and the New World (Americas) through trade of plants, animals, people, and diseases.',
		],
	},
	{
		key: '1493-1500s',
		icon: '⚔️',
		title: '1493–1500s: Spanish Colonization Ramps Up',
		summary: 'Spanish conquistadors explore and conquer parts of the Americas.',
		details: [
			'Hernán Cortés defeats the Aztecs (1519–1521)',
			'Francisco Pizarro defeats the Inca (1532)',
			'Encomienda System is implemented—Spanish force Native Americans into labor under the guise of converting them to Christianity.',
		],
	},
	{
		key: '1500s',
		icon: '💀',
		title: '1500s: Columbian Exchange and Disease Impact',
		summary: 'Massive Native population decline due to smallpox and other European diseases.',
		details: [
			'Massive Native population decline due to smallpox and other European diseases.',
			'Europeans gain crops like maize and potatoes → population boom.',
			'Europeans introduce horses, cattle, and pigs to the Americas → reshaping Native life and the environment.',
		],
	},
	{
		key: '1520s-1600s',
		icon: '⛓️',
		title: '1520s–1600s: Slavery and Labor Systems Evolve',
		summary: 'Native labor dwindles; Europeans begin importing enslaved Africans.',
		details: [
			'Native labor dwindles due to disease and resistance → Europeans begin importing enslaved Africans to the Americas.',
			'Caste System in Spanish America develops:',
			'Peninsulares, Creoles, Mestizos, Mulattos, Africans, and Native Americans',
		],
	},
	{
		key: '1588',
		icon: '⚓️',
		title: '1588: Spanish Armada Defeated',
		summary: 'England defeats the Spanish Armada, shifting colonial power.',
		details: [
			'England defeats the Spanish Armada, signaling a shift in colonial power toward the English.',
		],
	},
	{
		key: 'late1500s-1607',
		icon: '🤝',
		title: 'Late 1500s–1607: Resistance and Cultural Blending',
		summary: 'Pueblo Revolt and cultural blending between Natives and Europeans.',
		details: [
			'Pueblo Revolt (1680) – Pueblo people resist forced religious conversion by the Spanish.',
			'Cultural blending occurs as Native Americans and Europeans adopt aspects of each other’s technologies, foods, and customs—but also clash due to very different worldviews.',
		],
	},
	{
		key: '1607',
		icon: '🏴',
		title: '1607: Founding of Jamestown (Unit 2 Begins)',
		summary: 'English establish Jamestown, ending Unit 1 and starting permanent English colonization.',
		details: [
			'The English establish Jamestown, Virginia, marking the end of Unit 1 and the beginning of permanent English colonization in North America.',
		],
	},
];

function renderBullet(bullet: string, idx: number) {
	// Underline topics (not bulleted, not bolded)
	if (
		bullet === 'Central and South America' ||
		bullet === 'North American Native Peoples'
	) {
		return (
			<p key={idx} className="underline font-semibold mt-4 mb-2">
				{bullet}
			</p>
		);
	}
	// Joke or normal paragraph (not bolded, not bulleted, not underlined)
	if (
		!bullet.startsWith('**') &&
		bullet.trim() !== ''
	) {
		return (
			<p key={idx} className="mt-2 mb-2">
				{bullet}
			</p>
		);
	}
	// Bullet with bolded first word if it matches **Word:** pattern
	const match = bullet.match(/^\*\*(.+?):\*\*(.*)/);
	if (match) {
		return (
			<li key={idx}>
				<span className="font-bold">{match[1]}:</span>
				{match[2]}
			</li>
		);
	}
	// Fallback for any other **Word** (not a topic, not a bullet)
	const matchTopic = bullet.match(/^\*\*(.+?)\*\*$/);
	if (matchTopic) {
		return (
			<p key={idx} className="underline font-semibold mt-4 mb-2">
				{matchTopic[1]}
			</p>
		);
	}
	return null;
}

const TIMELINE_ROW_LIMIT = 4; // Two rows, 4 events per row (8 events total for Unit 1 timeline)

const APUSHUnit = () => {
	const { unitId } = useParams<{ unitId: string }>();
	const [open, setOpen] = useState<Record<string, boolean>>({});
	const [selectedTimeline, setSelectedTimeline] = useState<string | null>(null);
	const navigate = useNavigate();

	if (unitId !== '1') {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<h1 className="text-3xl font-bold mb-4">Unit {unitId}</h1>
				<p className="text-xl text-slate-700">No content available for this unit yet.</p>
			</div>
		);
	}

	// Split timelineData into rows
	const timelineRows = [];
	for (let i = 0; i < timelineData.length; i += TIMELINE_ROW_LIMIT) {
		timelineRows.push(timelineData.slice(i, i + TIMELINE_ROW_LIMIT));
	}

	return (
		<div className="max-w-3xl mx-auto py-12">
			<h1 className="text-3xl font-bold mb-8 text-center">APUSH Unit 1 Study Guide</h1>

			{/* Subunits Section */}
			{unit1Content.map((subunit) => (
				<div key={subunit.key} className="mb-6 border rounded-xl bg-white shadow">
					<button
						className="w-full text-left px-6 py-4 font-semibold text-lg flex justify-between items-center focus:outline-none"
						onClick={() => setOpen((prev) => ({ ...prev, [subunit.key]: !prev[subunit.key] }))}
					>
						<span>{subunit.title}</span>
						<span className="ml-2">{open[subunit.key] ? '▲' : '▼'}</span>
					</button>
					{open[subunit.key] && (
						<div className="px-8 pb-6">
							{subunit.bullets.map((bullets, i) => (
								<ul key={i} className="list-disc pl-6 space-y-2">
									{bullets.map((b, idx) => renderBullet(b, idx))}
								</ul>
							))}
						</div>
					)}
				</div>
			))}

			{/* Timeline and Useful Study Tools Side-by-Side */}
			<div className="mt-24 flex flex-col items-center">
				{/* Timeline Section */}
				<div className="flex-1 min-w-[320px] max-w-2xl mb-8 md:mb-0 flex justify-center">
					<div className="w-full">
						<h2 className="text-2xl font-bold mb-8 flex items-center gap-2 justify-center">
							<span role="img" aria-label="calendar">📅</span> APUSH Unit 1 Timeline: 1491–1607
						</h2>
						<div className="flex flex-col gap-16">
							{timelineRows.map((row, rowIdx) => (
								<div
									key={rowIdx}
									className="relative flex items-center mb-12"
									style={{ minHeight: 120 }}
								>
									{/* Timeline events above the line */}
									{row.map((event, idx) => (
										<div
											key={event.key}
											className="relative flex flex-col items-center z-10"
											style={{
												width: `${100 / (row.length)}%`,
												marginLeft: idx === 0 ? 0 : 24,
												marginRight: idx === row.length - 1 ? 0 : 24,
											}}
										>
											<div className="mb-3 flex flex-col items-center">
												<div
													className="text-sm text-center cursor-pointer mb-2 font-semibold"
													style={{ width: 140, minHeight: 28 }}
													onClick={() => setSelectedTimeline(selectedTimeline === event.key ? null : event.key)}
												>
													{event.title}
												</div>
												<button
													className={`w-8 h-8 rounded-full border-4 flex items-center justify-center text-xl font-bold transition-colors duration-200
														${selectedTimeline === event.key ? 'bg-blue-500 border-blue-700 text-white' : 'bg-white border-blue-400 text-blue-600'}
													`}
													onClick={() => setSelectedTimeline(selectedTimeline === event.key ? null : event.key)}
													title={event.title}
												>
													{event.icon}
												</button>
												<div className="text-xs text-slate-500 mt-2">{event.summary}</div>
											</div>
										</div>
									))}
									{/* Horizontal line with arrows at both ends */}
									<div className="absolute left-0 right-0 top-[52px] h-2 bg-slate-300 z-0 flex items-center pointer-events-none">
										{/* Left arrowhead */}
										<svg
											className="mr-[-2px]"
											width="20"
											height="14"
											viewBox="0 0 20 14"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											style={{ flexShrink: 0 }}
										>
											<polygon points="20,0 0,7 20,14" fill="#94a3b8" />
										</svg>
										<div className="flex-1 h-2 bg-slate-300"></div>
										{/* Right arrowhead */}
										<svg
											className="ml-[-2px]"
											width="20"
											height="14"
											viewBox="0 0 20 14"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											style={{ flexShrink: 0 }}
										>
											<polygon points="0,0 20,7 0,14" fill="#94a3b8" />
										</svg>
									</div>
								</div>
							))}
						</div>
						{/* Timeline event details */}
						{selectedTimeline && (
							<div className="mt-4 mb-8 p-8 bg-slate-50 border rounded-xl shadow-lg">
								{(() => {
									const event = timelineData.find(e => e.key === selectedTimeline);
									if (!event) return null;
									return (
										<>
											<div className="flex items-center gap-3 mb-3">
												<span className="text-3xl">{event.icon}</span>
												<span className="font-bold text-xl">{event.title}</span>
											</div>
											<p className="mb-3 text-slate-700 text-lg">{event.summary}</p>
											<ul className="list-disc pl-8 space-y-2">
												{event.details.map((detail, i) => (
													<li key={i} className="text-slate-700 text-base">{detail}</li>
												))}
											</ul>
										</>
									);
								})()}
							</div>
						)}
						{/* Quiz Button */}
						<div className="flex justify-center mt-12">
							<button
								className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
								onClick={() => navigate('/apush-study-guide/unit/1/quiz')}
							>
								Quiz your knowledge
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default APUSHUnit;
