import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TimelineEvent = {
	year: number;
	title: string;
	period: string;
	description: string;
};

const timelineEvents: TimelineEvent[] = [
	// Period 1 (1491-1607)
	{
		year: 1492,
		title: "Columbus arrives in the New World",
		period: "Period 1",
		description: "Christopher Columbus's arrival in the Caribbean marked the beginning of sustained European-American contact and the Columbian Exchange. This pivotal moment led to profound changes in both hemispheres through the exchange of crops, animals, diseases, and cultures."
	},
	{
		year: 1587,
		title: "Roanoke Island (Lost Colony)",
		period: "Period 1",
		description: "England's first attempt at colonization in North America mysteriously disappeared. When supplies finally arrived three years later, the settlers had vanished, leaving only the word 'CROATOAN' carved into a fence post. This failure highlighted the challenges of early colonization."
	},
	{
		year: 1588,
		title: "English defeat Spanish Armada",
		period: "Period 1",
		description: "England's victory over the Spanish Armada marked a turning point in European power dynamics. This naval triumph weakened Spanish dominance in the Atlantic and strengthened England's ability to establish colonies in North America."
	},

	// Period 2 (1607-1754)
	{
		year: 1607,
		title: "Jamestown founded",
		period: "Period 2",
		description: "First permanent English settlement in North America, established by the Virginia Company. The colony struggled initially but eventually flourished with tobacco cultivation."
	},
	{
		year: 1609,
		title: "Starving Time at Jamestown",
		period: "Period 2",
		description: "Severe winter where only 60 of 500 colonists survived. The period demonstrated the harsh realities of early colonization and led to reforms in colonial management."
	},
	{
		year: 1620,
		title: "Mayflower lands in Plymouth",
		period: "Period 2",
		description: "Pilgrims established Plymouth Colony after signing the Mayflower Compact, setting a precedent for self-governance in the colonies."
	},
	{
		year: 1649,
		title: "Maryland Toleration Act",
		period: "Period 2",
		description: "Mandated religious tolerance for Christians in Maryland, marking an important step toward religious freedom in colonial America."
	},
	{
		year: 1688,
		title: "Glorious Revolution",
		period: "Period 2",
		description: "Bloodless revolution in England that affected colonial politics and established Parliamentary supremacy over the monarchy."
	},
	{
		year: 1692,
		title: "Salem Witch Trials",
		period: "Period 2",
		description: "Mass hysteria led to 19 executions for witchcraft in colonial Massachusetts, highlighting religious extremism and social tensions."
	},

	// Period 3 (1754-1800)
	{
		year: 1754,
		title: "Seven Years' War begins",
		period: "Period 3",
		description: "Global conflict between Britain and France that reshaped colonial North America and led to increased tensions between Britain and its colonies."
	},
	{
		year: 1763,
		title: "Proclamation of 1763",
		period: "Period 3",
		description: "British decree prohibiting colonial settlement west of the Appalachian Mountains, causing resentment among colonists."
	},
	{
		year: 1765,
		title: "Stamp Act",
		period: "Period 3",
		description: "First direct British tax on American colonists, requiring printed materials to carry a tax stamp. Led to widespread protests and boycotts."
	},
	{
		year: 1770,
		title: "Boston Massacre",
		period: "Period 3",
		description: "Incident in which British soldiers killed five colonists in Boston, fueling anti-British sentiments and propaganda."
	},
	{
		year: 1773,
		title: "Boston Tea Party",
		period: "Period 3",
		description: "Colonists, protesting against the Tea Act, dumped an entire shipment of tea sent by the East India Company into Boston Harbor."
	},
	{
		year: 1775,
		title: "Battles of Lexington and Concord",
		period: "Period 3",
		description: "First military engagements of the American Revolutionary War, resulting in a British retreat to Boston."
	},
	{
		year: 1776,
		title: "Declaration of Independence",
		period: "Period 3",
		description: "Document declaring the thirteen American colonies independent from British rule, asserting individual rights and the principle of government by consent."
	},
	{
		year: 1777,
		title: "Battle of Saratoga",
		period: "Period 3",
		description: "Turning point in the Revolutionary War, leading to French support for the American cause."
	},
	{
		year: 1777,
		title: "Articles of Confederation drafted",
		period: "Period 3",
		description: "First constitution of the United States, creating a confederation of sovereign states with a weak central government."
	},
	{
		year: 1788,
		title: "George Washington elected",
		period: "Period 3",
		description: "George Washington unanimously elected as the first President of the United States, setting precedents for the office."
	},
	{
		year: 1778,
		title: "Franco-American Alliance",
		period: "Period 3",
		description: "Military alliance between France and the United States during the Revolutionary War, crucial for American victory."
	},
	{
		year: 1781,
		title: "Battle of Yorktown",
		period: "Period 3",
		description: "Decisive victory by American and French forces against the British, leading to the end of the Revolutionary War."
	},
	{
		year: 1798,
		title: "XYZ Affair",
		period: "Period 3",
		description: "Diplomatic incident between the United States and France that led to an undeclared naval war, the Quasi-War."
	},
	{
		year: 1783,
		title: "Treaty of Paris",
		period: "Period 3",
		description: "Agreement that officially ended the Revolutionary War, recognizing the independence of the American colonies."
	},
	{
		year: 1787,
		title: "Constitutional Convention",
		period: "Period 3",
		description: "Meeting where the U.S. Constitution was drafted, creating a stronger federal government with checks and balances."
	},
	{
		year: 1789,
		title: "George Washington inaugurated as President",
		period: "Period 3",
		description: "George Washington's inauguration as the first President under the new Constitution, establishing the executive department of the government."
	},

	// Period 4 (1800-1848)
	{
		year: 1800,
		title: "Thomas Jefferson elected",
		period: "Period 4",
		description: "Election of Thomas Jefferson, marking the first peaceful transfer of power between political parties in the U.S."
	},
	{
		year: 1803,
		title: "Louisiana Purchase",
		period: "Period 4",
		description: "Acquisition of the Louisiana territory from France, which doubled the size of the United States and opened up land for westward expansion."
	},
	{
		year: 1804,
		title: "Lewis and Clark Expedition",
		period: "Period 4",
		description: "Exploratory expedition to map the newly acquired western territory and find a water route to the Pacific."
	},
	{
		year: 1812,
		title: "War of 1812 begins",
		period: "Period 4",
		description: "Conflict between the United States and Britain over maritime rights, impressment of American sailors, and territorial expansion."
	},
	{
		year: 1815,
		title: "Battle of New Orleans",
		period: "Period 4",
		description: "Major American victory in the War of 1812, fought after the peace treaty was signed, boosting American morale."
	},
	{
		year: 1820,
		title: "Missouri Compromise",
		period: "Period 4",
		description: "Agreement to maintain the balance of power between slave and free states, admitting Missouri as a slave state and Maine as a free state."
	},
	{
		year: 1823,
		title: "Monroe Doctrine",
		period: "Period 4",
		description: "Policy declaring opposition to European colonization in the Americas, asserting U.S. influence in the Western Hemisphere."
	},
	{
		year: 1828,
		title: "Andrew Jackson elected",
		period: "Period 4",
		description: "Election of Andrew Jackson, representing a shift towards greater democracy and the 'common man' in American politics."
	},
	{
		year: 1830,
		title: "Indian Removal Act",
		period: "Period 4",
		description: "Law authorizing the forced removal of Native American tribes from their ancestral lands in the southeastern U.S. to designated 'Indian Territory'."
	},
	{
		year: 1831,
		title: "Nat Turner's Rebellion",
		period: "Period 4",
		description: "Slave rebellion led by Nat Turner in Virginia, leading to stricter slave codes and increased tensions between North and South."
	},
	{
		year: 1836,
		title: "Texas Independence",
		period: "Period 4",
		description: "Texas declares independence from Mexico, leading to the establishment of the Republic of Texas."
	},
	{
		year: 1848,
		title: "Treaty of Guadalupe Hidalgo",
		period: "Period 4",
		description: "Treaty that ended the Mexican-American War, granting the U.S. significant territories in the West, including California and New Mexico."
	},
	{
		year: 1849,
		title: "Donner Party tragedy",
		period: "Period 4",
		description: "A group of American pioneers who set out for California in 1846 were stranded in the Sierra Nevada during winter, leading to starvation and death."
	},

	// Period 5 (1844-1877)
	{
		year: 1845,
		title: "Texas annexed",
		period: "Period 5",
		description: "Annexation of the Republic of Texas by the United States, leading to increased tensions with Mexico."
	},
	{
		year: 1845,
		title: "Mexican-American War begins",
		period: "Period 5",
		description: "Conflict between the United States and Mexico, stemming from the annexation of Texas and territorial disputes."
	},
	{
		year: 1848,
		title: "Seneca Falls Convention",
		period: "Period 5",
		description: "First women's rights convention in the U.S., producing the Declaration of Sentiments, which called for equal rights for women."
	},
	{
		year: 1850,
		title: "Fugitive Slave Act",
		period: "Period 5",
		description: "Law that provided for the return of enslaved people who escaped from one state into another, igniting fierce opposition in the North."
	},
	{
		year: 1852,
		title: "Uncle Tom's Cabin published",
		period: "Period 5",
		description: "Harriet Beecher Stowe's novel depicting the harsh realities of slavery, galvanizing anti-slavery sentiment in the North."
	},
	{
		year: 1854,
		title: "Bleeding Kansas",
		period: "Period 5",
		description: "Violence between pro-slavery and anti-slavery settlers in Kansas Territory, exemplifying the national conflict over slavery."
	},
	{
		year: 1857,
		title: "Dred Scott Decision",
		period: "Period 5",
		description: "Supreme Court decision that declared African Americans were not citizens and could not sue in federal courts, and that Congress had no authority to prohibit slavery in federal territories."
	},
	{
		year: 1860,
		title: "Abraham Lincoln elected",
		period: "Period 5",
		description: "Election of Abraham Lincoln, leading to the secession of Southern states and the eventual outbreak of the Civil War."
	},
	{
		year: 1861,
		title: "Civil War begins",
		period: "Period 5",
		description: "Conflict between the Northern states (Union) and Southern states (Confederacy) that seceded from the Union, primarily over the issues of slavery and states' rights."
	},
	{
		year: 1862,
		title: "Homestead Act",
		period: "Period 5",
		description: "Law that provided 160 acres of public land to settlers for a small fee, promoting westward expansion."
	},
	{
		year: 1863,
		title: "Emancipation Proclamation",
		period: "Period 5",
		description: "Executive order by President Lincoln freeing the slaves in the Confederate states, redefining the purpose of the Civil War."
	},
	{
		year: 1863,
		title: "Battle of Gettysburg",
		period: "Period 5",
		description: "Turning point battle in the Civil War, resulting in a Union victory and significant Confederate losses."
	},
	{
		year: 1865,
		title: "Lincoln assassinated",
		period: "Period 5",
		description: "President Abraham Lincoln was assassinated by John Wilkes Booth, a Confederate sympathizer, leading to widespread mourning and a struggle over Reconstruction."
	},
	{
		year: 1867,
		title: "Military Reconstruction Act",
		period: "Period 5",
		description: "Congressional act that divided the South into military districts and required states to draft new constitutions upholding the 14th Amendment."
	},
	{
		year: 1867,
		title: "U.S. purchases Alaska",
		period: "Period 5",
		description: "Acquisition of Alaska from Russia, which provided the U.S. with valuable resources and strategic advantages."
	},
	{
		year: 1877,
		title: "Compromise of 1877",
		period: "Period 5",
		description: "Informal agreement that resolved the 1876 presidential election and led to the withdrawal of federal troops from the South, effectively ending Reconstruction."
	},

	// Period 6 (1865-1898)
	{
		year: 1876,
		title: "Battle of Little Bighorn",
		period: "Period 6",
		description: "Famous battle where General Custer and his troops were defeated by Sioux and Cheyenne warriors, representing Native American resistance to U.S. expansion."
	},
	{
		year: 1886,
		title: "Haymarket Riot",
		period: "Period 6",
		description: "Labor protest in Chicago that turned violent, leading to a backlash against labor organizations and increased immigration restrictions."
	},
	{
		year: 1887,
		title: "Dawes Act",
		period: "Period 6",
		description: "Law that aimed to assimilate Native Americans into American society by allotting them individual plots of land and granting them U.S. citizenship."
	},
	{
		year: 1887,
		title: "Interstate Commerce Act",
		period: "Period 6",
		description: "Federal law that regulated the railroad industry, requiring rates to be reasonable and just, and established the Interstate Commerce Commission."
	},
	{
		year: 1890,
		title: "Wounded Knee Massacre",
		period: "Period 6",
		description: "U.S. Army's killing of 150-300 Lakota Sioux at Wounded Knee Creek, South Dakota, marking the end of the Indian Wars."
	},
	{
		year: 1890,
		title: "Sherman Antitrust Act",
		period: "Period 6",
		description: "First federal act that outlawed monopolistic business practices, aimed at maintaining competition in industries."
	},
	{
		year: 1894,
		title: "Pullman Strike",
		period: "Period 6",
		description: "Nationwide railroad strike that disrupted rail traffic and mail delivery, leading to federal intervention and highlighting labor tensions."
	},
	{
		year: 1896,
		title: '"Cross of Gold" Speech',
		period: "Period 6",
		description: "Famous speech by William Jennings Bryan advocating for bimetallism and criticizing the gold standard, representing the Populist movement."
	},
	{
		year: 1896,
		title: "Plessy v. Ferguson",
		period: "Period 6",
		description: "Supreme Court decision that upheld the constitutionality of racial segregation under the 'separate but equal' doctrine."
	},

	// Period 7 (1890-1945)
	{
		year: 1898,
		title: "Annexation of Hawaii",
		period: "Period 7",
		description: "The United States annexed Hawaii, which became a strategic naval base and coaling station in the Pacific."
	},
	{
		year: 1898,
		title: "Spanish-American War",
		period: "Period 7",
		description: "Conflict between the United States and Spain, resulting in the U.S. acquiring territories in the Caribbean and the Pacific."
	},
	{
		year: 1902,
		title: "Platt Amendment",
		period: "Period 7",
		description: "Legislation that limited Cuba's sovereignty and authorized U.S. intervention in Cuban affairs."
	},
	{
		year: 1903,
		title: "Wright Brothers' first flight",
		period: "Period 7",
		description: "Orville and Wilbur Wright made the first controlled, sustained flight with a powered aircraft, the Wright Flyer, in Kitty Hawk, North Carolina."
	},
	{
		year: 1904,
		title: "Roosevelt Corollary",
		period: "Period 7",
		description: "Addition to the Monroe Doctrine by President Theodore Roosevelt, asserting the U.S. right to intervene in Latin America to maintain stability."
	},
	{
		year: 1917,
		title: "U.S. enters World War I",
		period: "Period 7",
		description: "The United States joined the Allies in World War I, providing crucial support in terms of troops and resources."
	},
	{
		year: 1918,
		title: "Fourteen Points",
		period: "Period 7",
		description: "President Woodrow Wilson's proposal for a post-war peace settlement, emphasizing self-determination and the League of Nations."
	},
	{
		year: 1919,
		title: "Schenck v. United States",
		period: "Period 7",
		description: "Supreme Court case that upheld the conviction of Charles Schenck for distributing anti-draft leaflets, ruling that free speech could be limited in wartime."
	},
	{
		year: 1920,
		title: "19th Amendment (Women's Suffrage)",
		period: "Period 7",
		description: "Constitutional amendment granting women the right to vote, a significant victory for the women's rights movement."
	},
	{
		year: 1920,
		title: "First Red Scare",
		period: "Period 7",
		description: "Nationwide panic about communism and radical leftism in the wake of the Russian Revolution, leading to widespread suspicion and repression."
	},
	{
		year: 1920,
		title: "Prohibition begins",
		period: "Period 7",
		description: "Nationwide ban on the sale, production, and transportation of alcoholic beverages, leading to the rise of speakeasies and organized crime."
	},
	{
		year: 1929,
		title: "Stock Market Crash",
		period: "Period 7",
		description: "The crash marked the beginning of the Great Depression, a severe worldwide economic downturn."
	},
	{
		year: 1932,
		title: "FDR elected",
		period: "Period 7",
		description: "Franklin D. Roosevelt was elected President, promising a New Deal for Americans to recover from the Great Depression."
	},
	{
		year: 1935,
		title: "Social Security Act",
		period: "Period 7",
		description: "New Deal program that provided old-age pensions, unemployment insurance, and aid to the disabled and families with dependent children."
	},
	{
		year: 1939,
		title: "WWII begins in Europe",
		period: "Period 7",
		description: "The outbreak of World War II in Europe following Germany's invasion of Poland, leading to widespread devastation and loss of life."
	},
	{
		year: 1941,
		title: "Pearl Harbor attack",
		period: "Period 7",
		description: "Surprise military strike by the Japanese Navy against the United States naval base at Pearl Harbor, leading to U.S. entry into World War II."
	},
	{
		year: 1944,
		title: "D-Day",
		period: "Period 7",
		description: "Allied invasion of Nazi-occupied France at Normandy, marking a significant turning point in World War II."
	},
	{
		year: 1945,
		title: "Hiroshima and Nagasaki bombings",
		period: "Period 7",
		description: "U.S. dropped atomic bombs on the Japanese cities of Hiroshima and Nagasaki, leading to Japan's surrender and the end of World War II."
	},

	// Period 8 (1945-1980)
	{
		year: 1947,
		title: "Truman Doctrine",
		period: "Period 8",
		description: "Policy established by President Truman to contain communism, providing political, military, and economic assistance to countries resisting Soviet influence."
	},
	{
		year: 1950,
		title: "Korean War begins",
		period: "Period 8",
		description: "Conflict between North Korea (with Chinese and Soviet support) and South Korea (with U.S. and UN support), representing the first major military confrontation of the Cold War."
	},
	{
		year: 1954,
		title: "Brown v. Board of Education",
		period: "Period 8",
		description: "Landmark Supreme Court decision that overturned Plessy v. Ferguson, declaring racial segregation in public schools unconstitutional."
	},
	{
		year: 1955,
		title: "Montgomery Bus Boycott",
		period: "Period 8",
		description: "Year-long boycott of Montgomery buses by African Americans, sparked by Rosa Parks' arrest, leading to a Supreme Court ruling against bus segregation."
	},
	{
		year: 1957,
		title: "Sputnik launched",
		period: "Period 8",
		description: "The Soviet Union launched the first artificial satellite, Sputnik, marking the beginning of the space race."
	},
	{
		year: 1961,
		title: "JFK inaugurated",
		period: "Period 8",
		description: "John F. Kennedy was inaugurated as the 35th President of the United States, delivering his famous inaugural address."
	},
	{
		year: 1961,
		title: "Vietnam conflict begins",
		period: "Period 8",
		description: "The U.S. began its military involvement in Vietnam, supporting the South Vietnamese government against the communist North."
	},
	{
		year: 1962,
		title: "Cuban Missile Crisis",
		period: "Period 8",
		description: "Confrontation between the United States and the Soviet Union over Soviet missiles in Cuba, bringing the two superpowers to the brink of nuclear war."
	},
	{
		year: 1963,
		title: "March on Washington",
		period: "Period 8",
		description: "Large-scale civil rights rally where Martin Luther King Jr. delivered his 'I Have a Dream' speech, advocating for racial equality and jobs."
	},
	{
		year: 1963,
		title: "JFK assassinated",
		period: "Period 8",
		description: "President John F. Kennedy was assassinated in Dallas, Texas, leading to widespread mourning and conspiracy theories."
	},
	{
		year: 1964,
		title: "Civil Rights Act",
		period: "Period 8",
		description: "Landmark legislation that prohibited discrimination based on race, color, religion, sex, or national origin, and aimed to end segregation in public places."
	},
	{
		year: 1965,
		title: "Great Society programs begin",
		period: "Period 8",
		description: "Set of domestic programs launched by President Lyndon B. Johnson to eliminate poverty and racial injustice, and to improve education and healthcare."
	},
	{
		year: 1968,
		title: "MLK and RFK assassinated",
		period: "Period 8",
		description: "Civil rights leader Martin Luther King Jr. and Senator Robert F. Kennedy were both assassinated, leading to national mourning and riots."
	},
	{
		year: 1968,
		title: "Tet Offensive",
		period: "Period 8",
		description: "Surprise military offensive by North Vietnamese and Viet Cong forces during the Vietnamese New Year, significantly impacting U.S. public opinion on the war."
	},
	{
		year: 1968,
		title: "Democratic National Convention in Chicago",
		period: "Period 8",
		description: "Site of the 1968 Democratic National Convention, which was marked by a large anti-war protest and a controversial police crackdown."
	},
	{
		year: 1969,
		title: "Moon landing",
		period: "Period 8",
		description: "Apollo 11 mission successfully landed the first humans, Neil Armstrong and Buzz Aldrin, on the moon, marking a significant achievement in the space race."
	},
	{
		year: 1972,
		title: "Watergate break-in",
		period: "Period 8",
		description: "Burglary at the Democratic National Committee headquarters at the Watergate office complex, leading to a major political scandal."
	},
	{
		year: 1973,
		title: "Roe v. Wade",
		period: "Period 8",
		description: "Landmark Supreme Court decision that recognized a woman's constitutional right to terminate her pregnancy, legalizing abortion nationwide."
	},
	{
		year: 1979,
		title: "Iranian Hostage Crisis",
		period: "Period 8",
		description: "Diplomatic crisis where 52 American diplomats and citizens were held hostage in the U.S. embassy in Tehran, Iran, for 444 days."
	},

	// Period 9 (1980-Present)
	{
		year: 1980,
		title: "Ronald Reagan elected",
		period: "Period 9",
		description: "Election marked a conservative shift in American politics, emphasizing deregulation, tax cuts, and increased military spending."
	},
	{
		year: 1989,
		title: "Cold War ends",
		period: "Period 9",
		description: "Fall of the Berlin Wall and collapse of the Soviet Union marked the end of the decades-long Cold War and the emergence of the U.S. as the world's sole superpower."
	},
	{
		year: 1991,
		title: "Persian Gulf War",
		period: "Period 9",
		description: "Conflict between Iraq and a coalition of countries led by the United States, triggered by Iraq's invasion of Kuwait."
	},
	{
		year: 1994,
		title: "NAFTA signed",
		period: "Period 9",
		description: "North American Free Trade Agreement, creating a trilateral trade bloc between the United States, Canada, and Mexico."
	},
	{
		year: 1995,
		title: "Oklahoma City bombing",
		period: "Period 9",
		description: "Domestic terrorist bombing of the Alfred P. Murrah Federal Building in Oklahoma City, resulting in 168 deaths and significant damage."
	},
	{
		year: 2000,
		title: "Bush v. Gore decision",
		period: "Period 9",
		description: "Supreme Court case that resolved the disputed 2000 presidential election in favor of George W. Bush, effectively deciding the election."
	},
	{
		year: 2001,
		title: "September 11 attacks",
		period: "Period 9",
		description: "Terrorist attacks by al-Qaeda on the World Trade Center in New York City and the Pentagon in Washington, D.C., leading to significant loss of life and global repercussions."
	},
	{
		year: 2008,
		title: "Great Recession",
		period: "Period 9",
		description: "Severe worldwide economic crisis, the most serious since the Great Depression, leading to widespread unemployment and financial instability."
	},
	{
		year: 2008,
		title: "Barack Obama elected",
		period: "Period 9",
		description: "Election of Barack Obama as the first African American President of the United States, representing a significant moment in U.S. history."
	},
	{
		year: 2011,
		title: "Affordable Care Act enacted",
		period: "Period 9",
		description: "Major healthcare reform law expanding coverage to millions of Americans, requiring individuals to have health insurance and preventing denial of coverage for pre-existing conditions."
	}
];

export default function APUSHTimeline() {
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
				<h1 className="text-3xl font-bold mb-8 text-center">APUSH Timeline</h1>
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
