import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TimelineEvent = {
	year: number | string;
	title: string;
	period: string;
	description: string;
};

// AP World Timeline Events (user-provided, periodized, concise)
const timelineEvents: TimelineEvent[] = [
	// Period 1: c. 1200-1450
	{ year: 750, title: 'The Abbasid Caliphate', period: 'Period 1', description: 'The Abbasid Caliphate, with its capital at Baghdad, was a golden age of Islamic culture, science, and trade. The empire was built around a sophisticated trade network, using receipts and credit, and became a center for learning and innovation. Its decline led to the rise of Turkic Muslim empires like the Seljuk.' },
	{ year: 960, title: 'The Song Dynasty', period: 'Period 1', description: 'The Song Dynasty in China was marked by Neo-Confucianism, a strict social hierarchy, and the practice of filial piety and footbinding. The bureaucracy expanded through merit-based exams. Major economic developments included the introduction of Champa Rice, expansion of the Grand Canal, and increased Eurasian trade.' },
	{ year: 1095, title: 'The Crusades', period: 'Period 1', description: 'A series of military campaigns by European Christians to reclaim the Holy Land from Muslim control. The Crusades increased cultural and economic exchanges between Europe and the Middle East, but also led to violence and religious tensions.' },
	{ year: 1206, title: 'Delhi Sultanate', period: 'Period 1', description: 'The Delhi Sultanate established Muslim rule in northern India, spreading Islam into South and Southeast Asia. The Rajput kingdoms resisted, helping preserve Hindu culture and traditions.' },
	{ year: 1206, title: 'Genghis Khan & Mongol Empire', period: 'Period 1', description: 'Genghis Khan unified the Mongol tribes and created the largest contiguous land empire in history. The Mongols were known for their military prowess, organization, and mobility. They promoted trade and cultural diffusion along the Silk Roads, but also caused widespread destruction.' },
	{ year: 1215, title: 'Magna Carta', period: 'Period 1', description: 'The Magna Carta was signed in England, establishing the principle that everyone, including the king, was subject to the law. It granted the right to a fair trial and influenced later legal systems.' },
	{ year: 1258, title: 'End of Abbasid Caliphate', period: 'Period 1', description: 'The Mongols captured and destroyed Baghdad, ending the Abbasid Caliphate. This marked a major shift in Islamic power and the decline of Baghdad as a center of learning.' },
	{ year: 1270, title: 'Yuan Dynasty', period: 'Period 1', description: 'The Yuan Dynasty, established by the Mongols under Kublai Khan, was the first foreign-ruled dynasty to govern all of China. It integrated Mongol and Chinese cultures and expanded trade.' },
	{ year: 1299, title: 'Ottoman Empire', period: 'Period 1', description: 'Founded by Osman Bey, the Ottoman Empire grew into a powerful Islamic state using gunpowder weapons. The devshirme system recruited Christian boys to serve as elite Janissary soldiers. The empire would last until the 20th century.' },
	{ year: 1324, title: 'Mansa Musa Pilgrimage', period: 'Period 1', description: 'Mansa Musa, the wealthy king of Mali, made a famous pilgrimage to Mecca, displaying the riches of West Africa and promoting Islamic scholarship and architecture throughout the region.' },
	{ year: 1325, title: 'Tenochtitlan Founded', period: 'Period 1', description: 'Tenochtitlan, the capital of the Aztec Empire, was founded on an island in Lake Texcoco. It became a major center of trade, culture, and power in Mesoamerica.' },
	{ year: 1325, title: 'Ibn Battuta’s Travels', period: 'Period 1', description: 'Ibn Battuta, a Moroccan explorer, traveled extensively across the Islamic world, documenting the cultures, societies, and trade networks of Africa, the Middle East, and Asia.' },
	{ year: 1346, title: 'Black Death', period: 'Period 1', description: 'The Black Death, a devastating plague, spread from Asia to Europe via the Silk Roads and Indian Ocean trade routes. It killed about one-third of the population in the Middle East and Europe, causing major social and economic changes.' },
	{ year: 1366, title: 'Ming Dynasty', period: 'Period 1', description: 'The Ming Dynasty replaced Mongol rule in China, restoring Han Chinese leadership. The Ming expanded China’s borders, rebuilt the Great Wall, and used gunpowder weapons to maintain order.' },
	{ year: 1405, title: 'Zheng He’s Voyages', period: 'Period 1', description: 'Zheng He, a Chinese admiral, led massive naval expeditions across the Indian Ocean, expanding China’s influence and enrolling other states in the tributary system.' },
	{ year: 1428, title: 'Aztec Empire', period: 'Period 1', description: 'The Aztec Empire, centered at Tenochtitlan, was known for its expansionist policies, military strength, and complex society. The Aztecs claimed heritage from earlier Mesoamerican civilizations.' },
	{ year: 1438, title: 'Inca Empire', period: 'Period 1', description: 'The Inca Empire in the Andes was highly organized, with a bureaucracy, unified language, and a vast road system. The Mit’a system required citizens to provide labor for state projects.' },
	{ year: 1440, title: 'East Africa States', period: 'Period 1', description: 'Swahili city-states in East Africa flourished as trade hubs, connecting Africa to the Indian Ocean world and facilitating cultural exchange.' },
	{ year: 1440, title: 'Printing Press Invented', period: 'Period 1', description: 'Johannes Gutenberg invented the printing press in Europe, making books more affordable and accessible, which helped spread literacy and new ideas.' },
	{ year: 1441, title: 'Start of Atlantic Slave Trade', period: 'Period 1', description: 'The Atlantic slave trade began, forcibly transporting millions of Africans to the Americas under brutal and inhumane conditions. This had lasting social and economic impacts.' },
	// Period 2: c. 1450-1750
	{ year: 1453, title: 'Ottoman Conquest of Constantinople', period: 'Period 2', description: 'The Ottomans captured Constantinople, ending the Byzantine Empire and transforming the city into Istanbul, a major center of Islamic culture and trade.' },
	{ year: 1464, title: 'Songhai Empire', period: 'Period 2', description: 'The Songhai Empire became the largest Islamic state in West Africa, thriving on trans-Saharan trade and Islamic scholarship.' },
	{ year: 1469, title: 'Birth of Sikhism', period: 'Period 2', description: 'Sikhism emerged in South Asia, blending elements of Islam and Hinduism and promoting equality and devotion.' },
	{ year: 1492, title: 'Spain Completes Reconquista', period: 'Period 2', description: 'The Christian kingdoms of Spain completed the Reconquista, ending centuries of Muslim rule in Iberia and reestablishing Christianity as the dominant religion.' },
	{ year: 1492, title: 'Columbus’ Voyage', period: 'Period 2', description: 'Christopher Columbus’s voyage to the Americas marked the beginning of European colonization and the Columbian Exchange, which transformed global trade, agriculture, and populations.' },
	{ year: 1498, title: 'Vasco da Gama Reaches India', period: 'Period 2', description: 'Portuguese explorer Vasco da Gama reached India by sea, opening direct maritime trade between Europe and Asia and establishing Portuguese influence in the Indian Ocean.' },
	{ year: 1501, title: 'Safavid Empire', period: 'Period 2', description: 'The Safavid Empire rose as the largest Shia Muslim state, often in conflict with the Sunni Ottoman Empire. It played a key role in shaping Persian culture and identity.' },
	{ year: 1517, title: 'Protestant Reformation', period: 'Period 2', description: 'Martin Luther’s 95 Theses sparked the Protestant Reformation, challenging the Catholic Church and leading to religious and political upheaval across Europe.' },
	{ year: 1518, title: 'First Enslaved Africans in Americas', period: 'Period 2', description: 'The first enslaved Africans arrived in the Americas, beginning centuries of forced labor and the development of plantation economies.' },
	{ year: 1526, title: 'Mughal Empire', period: 'Period 2', description: 'The Mughal Empire in India was known for religious tolerance under Akbar and later persecution under Aurangzeb. It supported the arts and left a lasting architectural legacy.' },
	{ year: 1545, title: 'Discovery of Silver at Potosi', period: 'Period 2', description: 'The discovery of silver at Potosi in the Andes fueled global trade and wealth for Spain, but also led to exploitation and harsh conditions for indigenous laborers.' },
	{ year: 1550, title: 'Scientific Revolution', period: 'Period 2', description: 'The Scientific Revolution brought major advances in science, challenging traditional beliefs and laying the groundwork for modern science.' },
	{ year: 1552, title: 'Russian Empire Emerges', period: 'Period 2', description: 'Ivan the Terrible expanded Russian territory and centralized power, laying the foundation for the Russian Empire.' },
	{ year: 1595, title: 'Invention of the Fluyt', period: 'Period 2', description: 'The Dutch invented the fluyt, a ship that revolutionized European shipping and trade by being more efficient and cost-effective.' },
	{ year: 1600, title: 'British East India Company', period: 'Period 2', description: 'The British East India Company was chartered to trade in Asia, eventually becoming a powerful force in India and shaping global commerce.' },
	{ year: 1600, title: 'Tokugawa Japan', period: 'Period 2', description: 'The Tokugawa shogunate established a rigid social order and national seclusion, isolating Japan from most foreign influence for over two centuries.' },
	{ year: 1607, title: 'Jamestown', period: 'Period 2', description: 'Jamestown, founded by the British, was the first permanent English settlement in North America, setting the stage for future colonization.' },
	{ year: 1632, title: 'Taj Mahal Construction', period: 'Period 2', description: 'Construction of the Taj Mahal began under Mughal emperor Shah Jahan, symbolizing the empire’s wealth and artistic achievement.' },
	{ year: 1643, title: 'Louis XIV Reign', period: 'Period 2', description: 'Louis XIV ruled France as an absolute monarch, centralizing power and building the Palace of Versailles.' },
	{ year: 1644, title: 'Qing Dynasty', period: 'Period 2', description: 'The Qing Dynasty, ruled by the Manchus, governed China with strict social divisions and a policy of isolationism.' },
	{ year: 1687, title: 'Newton’s Principia', period: 'Period 2', description: 'Isaac Newton published Principia Mathematica, laying the foundation for classical physics and the scientific method.' },
	{ year: 1689, title: 'Glorious Revolution', period: 'Period 2', description: 'The Glorious Revolution in England established parliamentary supremacy over the monarchy and influenced political thought.' },
	{ year: 1715, title: 'The Enlightenment', period: 'Period 2', description: 'The Enlightenment was an intellectual movement emphasizing reason, rights, and individualism, inspiring revolutions and reforms.' },
	// Period 3: c. 1750-1900
	{ year: 1756, title: '7 Years’ War', period: 'Period 3', description: 'The Seven Years’ War was a global conflict between Britain and France, reshaping colonial empires and increasing tensions that led to later revolutions.' },
	{ year: 1757, title: 'English Colonization in India', period: 'Period 3', description: 'The British began their dominance in India, eventually establishing direct colonial rule.' },
	{ year: 1760, title: 'First Industrial Revolution', period: 'Period 3', description: 'The First Industrial Revolution began in Britain, driven by the steam engine and new technologies. It transformed economies, societies, and the environment.' },
	{ year: 1765, title: 'American Revolution', period: 'Period 3', description: 'The American Revolution, inspired by Enlightenment ideas, led to independence from Britain and influenced other nations to seek self-government.' },
	{ year: 1789, title: 'French Revolution', period: 'Period 3', description: 'The French Revolution was caused by social inequality, economic hardship, and Enlightenment ideals. It led to the end of the monarchy and radical social change.' },
	{ year: 1791, title: 'Haitian Revolution', period: 'Period 3', description: 'The Haitian Revolution was the only successful slave revolt in history, resulting in the independence of Haiti from France.' },
	{ year: 1792, title: 'Beginning of Feminism', period: 'Period 3', description: 'Mary Wollstonecraft published "A Vindication of the Rights of Woman," becoming a symbol for the feminist movement.' },
	{ year: 1799, title: 'Napoleon’s Reign', period: 'Period 3', description: 'Napoleon Bonaparte rose to power in France, leading military campaigns across Europe and spreading revolutionary ideals.' },
	{ year: 1806, title: 'Latin American Revolutions', period: 'Period 3', description: 'A series of revolutions in Latin America, led by figures like Simon Bolivar, resulted in independence from European colonial powers.' },
	{ year: 1815, title: 'Congress of Vienna', period: 'Period 3', description: 'The Congress of Vienna reorganized Europe after the Napoleonic Wars, aiming to restore balance of power.' },
	{ year: 1839, title: 'Opium Wars', period: 'Period 3', description: 'The Opium Wars between Britain and China resulted in the Treaty of Nanjing and increased Western influence in China.' },
	{ year: 1834, title: 'Tanzimat Reforms', period: 'Period 3', description: 'The Tanzimat Reforms in the Ottoman Empire aimed to modernize and centralize the state.' },
	{ year: 1845, title: 'Irish Potato Famine', period: 'Period 3', description: 'A devastating famine in Ireland caused mass death and migration, especially to the Americas.' },
	{ year: 1848, title: 'Communist Manifesto', period: 'Period 3', description: 'Karl Marx and Friedrich Engels published the Communist Manifesto, influencing socialist and communist movements.' },
	{ year: 1848, title: 'Seneca Falls Convention', period: 'Period 3', description: 'The Seneca Falls Convention in the US was the first major women’s rights convention, calling for suffrage and equality.' },
	{ year: 1850, title: 'Taiping Rebellion', period: 'Period 3', description: 'The Taiping Rebellion was a massive civil war in China that weakened the Qing Dynasty.' },
	{ year: 1857, title: 'Sepoy Mutiny', period: 'Period 3', description: 'The Sepoy Mutiny in India was a failed uprising against British rule, leading to direct colonial control.' },
	{ year: 1859, title: 'Suez Canal Built', period: 'Period 3', description: 'The Suez Canal, built by Britain and Egypt, connected the Mediterranean and Red Seas, revolutionizing global trade.' },
	{ year: 1860, title: 'Social Darwinism', period: 'Period 3', description: 'The theory of Social Darwinism applied the idea of survival of the fittest to societies, influencing imperialism and racism.' },
	{ year: 1861, title: 'Russian Serfs Emancipated', period: 'Period 3', description: 'The emancipation of Russian serfs ended centuries of feudalism and began social reforms.' },
	{ year: 1863, title: 'Emancipation Proclamation (USA)', period: 'Period 3', description: 'Abraham Lincoln’s Emancipation Proclamation freed enslaved people in the Confederate states during the US Civil War.' },
	{ year: 1865, title: 'King Leopold rules Congo', period: 'Period 3', description: 'King Leopold II of Belgium ruled the Congo Free State, committing atrocities to extract rubber and other resources.' },
	{ year: 1868, title: 'Meiji Restoration', period: 'Period 3', description: 'The Meiji Restoration in Japan ended feudal rule, modernized the country, and made Japan a world power.' },
	{ year: 1870, title: 'Second Industrial Revolution', period: 'Period 3', description: 'The Second Industrial Revolution saw advances in steel, electricity, and chemicals, further transforming economies and societies.' },
	{ year: 1871, title: 'Unification of Germany', period: 'Period 3', description: 'Otto von Bismarck unified Germany, creating a powerful new European state.' },
	{ year: 1882, title: 'Chinese Exclusion Act', period: 'Period 3', description: 'The US passed the Chinese Exclusion Act, the first major law restricting immigration based on nationality.' },
	{ year: 1885, title: 'Berlin Conference', period: 'Period 3', description: 'The Berlin Conference regulated European colonization of Africa, starting the "Scramble for Africa."' },
	{ year: 1890, title: 'European Spheres of Influence in China', period: 'Period 3', description: 'European powers established spheres of influence in China, undermining Qing authority.' },
	{ year: 1898, title: 'Spanish-American War', period: 'Period 3', description: 'The US defeated Spain, acquiring territories like Guam, the Philippines, Puerto Rico, and Cuba.' },
	{ year: 1899, title: 'United Fruit Company', period: 'Period 3', description: 'The United Fruit Company played a major role in the economic and political affairs of Central America.' },
	{ year: 1899, title: 'Boxer Rebellion', period: 'Period 3', description: 'The Boxer Rebellion was an anti-foreigner uprising in China, suppressed by an international coalition.' },
	// Period 4: c. 1900 to present
	{ year: 1906, title: 'Muslim League Founded', period: 'Period 4', description: 'The Muslim League was founded in British India to advocate for the interests of Muslims, eventually leading to the creation of Pakistan.' },
	{ year: 1910, title: 'Mexican Revolution', period: 'Period 4', description: 'The Mexican Revolution was a complex conflict involving peasants, workers, and elites, leading to major social and land reforms.' },
	{ year: 1914, title: 'World War I', period: 'Period 4', description: 'World War I was a global conflict caused by militarism, alliances, imperialism, and nationalism. It introduced trench warfare and new technologies, and ended with the Treaty of Versailles.' },
	{ year: 1915, title: 'Armenian Genocide', period: 'Period 4', description: 'The Ottoman Empire carried out the Armenian Genocide, killing over a million Armenians during and after World War I.' },
	{ year: 1917, title: 'Russian Revolution', period: 'Period 4', description: 'The Russian Revolution overthrew the Tsar and established a communist government under the Bolsheviks.' },
	{ year: 1917, title: 'Zimmerman Telegram', period: 'Period 4', description: 'The Zimmerman Telegram was a secret message from Germany to Mexico, promising US territory in exchange for joining World War I against the US.' },
	{ year: 1920, title: 'League of Nations', period: 'Period 4', description: 'The League of Nations was created to promote peace after World War I, but it was weak and failed to prevent future conflicts.' },
	{ year: 1925, title: 'Reza Shah Pahlavi Rises', period: 'Period 4', description: 'Reza Shah Pahlavi modernized and westernized Iran, laying the groundwork for later political changes.' },
	{ year: 1929, title: 'The Great Depression', period: 'Period 4', description: 'The Great Depression was a worldwide economic crisis that led to mass unemployment, poverty, and political instability.' },
	{ year: 1933, title: 'New Deal by FDR', period: 'Period 4', description: 'Franklin D. Roosevelt’s New Deal introduced social programs and infrastructure projects to help the US recover from the Great Depression.' },
	{ year: 1939, title: 'World War II', period: 'Period 4', description: 'World War II was a global conflict between the Axis and Allied powers, resulting in massive destruction and the Holocaust.' },
	{ year: 1941, title: 'The Holocaust', period: 'Period 4', description: 'The Holocaust was the systematic genocide of six million Jews and millions of others by Nazi Germany during World War II.' },
	{ year: 1941, title: 'Stalin in Power', period: 'Period 4', description: 'Joseph Stalin led the Soviet Union through industrialization, World War II, and the early Cold War, using authoritarian methods.' },
	{ year: 1943, title: 'Green Revolution', period: 'Period 4', description: 'The Green Revolution introduced new agricultural technologies and high-yield crops, increasing food production worldwide.' },
	{ year: 1945, title: 'Chinese Communist Revolution', period: 'Period 4', description: 'The Chinese Communist Revolution, led by Mao Zedong, established the People’s Republic of China.' },
	{ year: 1945, title: 'Hiroshima & Nagasaki Bombing', period: 'Period 4', description: 'The US dropped atomic bombs on Hiroshima and Nagasaki, leading to Japan’s surrender and the end of World War II.' },
	{ year: 1945, title: 'United Nations Created', period: 'Period 4', description: 'The United Nations was founded to promote international peace, security, and cooperation.' },
	{ year: 1946, title: 'Philippines Independence', period: 'Period 4', description: 'The Philippines gained independence from the United States after World War II.' },
	{ year: 1947, title: 'Partition of India', period: 'Period 4', description: 'India gained independence from Britain, but was partitioned into India and Pakistan, leading to mass migrations and violence.' },
	{ year: 1947, title: 'Japanese Empire Ends', period: 'Period 4', description: 'Japan’s empire ended after World War II, and the country was occupied and reformed by the US.' },
	{ year: 1947, title: 'Truman Doctrine', period: 'Period 4', description: 'The Truman Doctrine established US policy of containing communism, shaping Cold War politics.' },
	{ year: 1948, title: 'Israel Founded', period: 'Period 4', description: 'The state of Israel was founded, leading to ongoing conflict in the Middle East.' },
	{ year: 1948, title: 'Berlin Blockade', period: 'Period 4', description: 'The Soviet Union blockaded West Berlin, prompting the Western Allies to organize the Berlin Airlift.' },
	{ year: 1948, title: 'World Health Organization', period: 'Period 4', description: 'The World Health Organization was established as a UN agency to promote global health.' },
	{ year: 1949, title: 'NATO Established', period: 'Period 4', description: 'NATO was created as a military alliance between the US and Western Europe to provide collective defense.' },
	{ year: 1950, title: 'Korean War', period: 'Period 4', description: 'The Korean War was fought between North and South Korea, with involvement from the US, UN, China, and USSR.' },
	{ year: 1953, title: 'Cuban Revolution', period: 'Period 4', description: 'Fidel Castro led the Cuban Revolution, overthrowing the Batista regime and establishing a communist state.' },
	{ year: 1955, title: 'Warsaw Pact', period: 'Period 4', description: 'The Warsaw Pact was a military alliance of communist countries led by the Soviet Union.' },
	{ year: 1955, title: 'Polio Vaccine Approved', period: 'Period 4', description: 'The approval of the polio vaccine was a major medical breakthrough, reducing the incidence of the disease worldwide.' },
	{ year: 1955, title: 'Vietnam War', period: 'Period 4', description: 'The Vietnam War was a conflict between communist North Vietnam and US-backed South Vietnam, with major Cold War implications.' },
	{ year: 1956, title: 'De-Stalinization', period: 'Period 4', description: 'Nikita Khrushchev led de-Stalinization in the USSR, reducing repression and promoting some reforms.' },
	{ year: 1958, title: 'Great Leap Forward', period: 'Period 4', description: 'Mao Zedong’s Great Leap Forward aimed to rapidly industrialize China, but led to famine and millions of deaths.' },
	{ year: 1961, title: 'Bay of Pigs', period: 'Period 4', description: 'The Bay of Pigs invasion was a failed US-backed attempt to overthrow Cuba’s communist government.' },
	{ year: 1962, title: 'Cuban Missile Crisis', period: 'Period 4', description: 'The Cuban Missile Crisis brought the US and USSR to the brink of nuclear war over Soviet missiles in Cuba.' },
	{ year: 1966, title: 'Cultural Revolution (China)', period: 'Period 4', description: 'Mao Zedong launched the Cultural Revolution to eliminate capitalist influences, causing chaos and persecution.' },
	{ year: 1979, title: 'Iranian Revolution', period: 'Period 4', description: 'The Iranian Revolution overthrew the Shah, establishing an Islamic Republic and reversing many modern reforms.' },
	{ year: 1989, title: 'Tiananmen Square Massacre', period: 'Period 4', description: 'Chinese government forces violently suppressed pro-democracy protests in Tiananmen Square, Beijing.' },
	{ year: 1989, title: 'Fall of Berlin Wall', period: 'Period 4', description: 'The Berlin Wall fell, symbolizing the end of the Cold War and the reunification of Germany.' },
	{ year: 1990, title: 'War in the Gulf', period: 'Period 4', description: 'Iraq invaded Kuwait, leading to the Persian Gulf War and a US-led coalition to liberate Kuwait.' },
	{ year: 1991, title: 'Fall of USSR', period: 'Period 4', description: 'The Soviet Union collapsed, ending the Cold War and creating new independent states.' },
	{ year: 1994, title: 'NAFTA', period: 'Period 4', description: 'The North American Free Trade Agreement eliminated most tariffs between the US, Canada, and Mexico.' },
	{ year: 2001, title: '9/11 Terrorist Attacks', period: 'Period 4', description: 'Al Qaeda terrorists attacked the US, leading to the War on Terror and invasions of Afghanistan and Iraq.' },
	{ year: 2003, title: 'US Invasion of Iraq', period: 'Period 4', description: 'The US and allies invaded Iraq, capturing Saddam Hussein and establishing a new government.' },
];

export default function APWorldTimeline() {
	const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
	const navigate = useNavigate();

	const EVENTS_PER_ROW = 5;
	const eventRows = [];
	for (let i = 0; i < timelineEvents.length; i += EVENTS_PER_ROW) {
		eventRows.push(timelineEvents.slice(i, i + EVENTS_PER_ROW));
	}

	return (
		<div className="min-h-screen py-12 px-4 bg-slate-50">
			<div className="max-w-7xl mx-auto">
				<button
					onClick={() => navigate(-1)}
					className="mb-8 px-4 py-2 text-blue-600 hover:text-blue-800 flex items-center gap-2"
				>
					← Back
				</button>
				<h1 className="text-3xl font-bold mb-8 text-center">AP World History Timeline</h1>
				<div className="space-y-16">
					{eventRows.map((row, rowIdx) => (
						<div key={rowIdx} className="relative flex flex-row">
							{/* Timeline and events (left) */}
							<div className="flex-1 pr-8">
								<div className="relative">
									{/* Horizontal line with arrows */}
									<div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-300 flex items-center pointer-events-none">
										<svg className="mr-[-2px]" width="18" height="12" viewBox="0 0 18 12">
											<polygon points="18,0 0,6 18,12" fill="#cbd5e1" />
										</svg>
										<div className="flex-1 h-1 bg-slate-300" />
										<svg className="ml-[-2px]" width="18" height="12" viewBox="0 0 18 12">
											<polygon points="0,0 18,6 0,12" fill="#cbd5e1" />
										</svg>
									</div>
									{/* Events */}
									<div className="relative flex justify-between items-center min-h-[120px]">
										{row.map((event) => (
											<div
												key={event.year + event.title}
												className="flex flex-col items-center w-40 cursor-pointer"
												onClick={() => setSelectedEvent(event)}
											>
												<div className="text-xs text-slate-500 mb-1">{event.period}</div>
												<div className="text-sm font-medium mb-2">{event.year}</div>
												<div
													className={`w-4 h-4 rounded-full border-2 ${
														selectedEvent?.year === event.year && selectedEvent?.title === event.title
															? 'bg-blue-600 border-blue-600'
															: 'bg-white border-blue-400'
													}`}
												/>
												<div className="text-xs text-center mt-2">{event.title}</div>
											</div>
										))}
									</div>
								</div>
							</div>
							{/* Description (right) */}
							<div className="w-[380px] min-w-[320px] max-w-[420px] ml-4">
								{selectedEvent && row.some(e => e.year === selectedEvent.year && e.title === selectedEvent.title) && (
									<div className="p-6 bg-white rounded-xl shadow-lg sticky top-24">
										<div className="text-sm text-slate-500 mb-1">{selectedEvent.period}</div>
										<h3 className="text-xl font-bold mb-2">
											{selectedEvent.year} – {selectedEvent.title}
										</h3>
										<p className="text-slate-600 leading-relaxed">
											{selectedEvent.description}
										</p>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
