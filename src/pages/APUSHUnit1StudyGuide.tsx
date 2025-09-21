import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Timeline event type
interface TimelineEvent {
  key: string;
  icon: string;
  title: string;
  summary: string;
  details: string[];
}

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
				'',
				'**North American Native Peoples**',
				'**Southwest (Pueblo):** In today’s New Mexico and Arizona, Pueblo societies built permanent adobe and stone villages, cultivating corn, beans, and squash.',
				'**Great Plains & Basin (Nomads):** Small kin‑based bands roamed the plains hunting bison and gathering roots, valuing mobility and shared resources.',
				'**Pacific Northwest (Fishing Villages):** Tribes like the Chinook and Chumash fished salmon, crafted massive cedar plank houses, and built canoes for ocean voyages.',
				'**Mississippi Valley (Complex Societies):** The Hopewell (4–6 K people) and Cahokia (10–30 K people) harnessed fertile lands for agriculture, traded widely, and formed centralized leadership under powerful chiefs.',
				'**Northeast (Iroquois):** Living in lengthy communal longhouses, they grew the “Three Sisters” (corn, beans, squash) and organized into confederacies of allied villages.',
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
			],
		],
	},
];

export const timelineData = [
	{
		key: '1492',
		icon: '🌎',
		title: '1492 – Columbus Arrives',
		summary: 'Columbus lands in the Caribbean, initiating sustained European contact with the Americas.',
		details: [
			'Columbus’s arrival marks the beginning of the Columbian Exchange.',
			'Massive demographic, ecological, and cultural changes for both hemispheres.',
		],
	},
	{
		key: '1519',
		icon: '🗿',
		title: '1519 – Cortés Conquers Aztecs',
		summary: 'Spanish conquistador Hernán Cortés begins the conquest of the Aztec Empire.',
		details: [
			'Cortés allies with native groups hostile to the Aztecs.',
			'Smallpox and advanced weaponry aid Spanish victory.',
		],
	},
	{
		key: '1533',
		icon: '⛰️',
		title: '1533 – Pizarro Conquers Incas',
		summary: 'Francisco Pizarro conquers the Inca Empire in South America.',
		details: [
			'Spanish gain vast wealth from silver and gold mines.',
			'Collapse of Inca political and social structures.',
		],
	},
	{
		key: '1565',
		icon: '🏰',
		title: '1565 – St. Augustine Founded',
		summary: 'The Spanish establish St. Augustine, the first permanent European settlement in what is now the U.S.',
		details: [
			'St. Augustine in Florida becomes a military outpost and mission center.',
			'Spanish influence spreads in the Southeast.',
		],
	},
	{
		key: '1588',
		icon: '⚓',
		title: '1588 – English Defeat Spanish Armada',
		summary: 'England’s victory over the Spanish Armada paves the way for English colonization.',
		details: [
			'Spanish naval power declines.',
			'English begin to establish colonies in North America.',
		],
	},
	{
		key: '1607',
		icon: '🏴‍☠️',
		title: '1607 – Jamestown Founded',
		summary: 'The first permanent English settlement in North America is established at Jamestown, Virginia.',
		details: [
			'Early struggles with disease, starvation, and conflict with Native Americans.',
			'Tobacco cultivation ensures colony’s survival.',
		],
	},
	{
		key: '1619',
		icon: '⚖️',
		title: '1619 – First Africans Arrive in Virginia',
		summary: 'First recorded Africans arrive in English North America, marking the start of African slavery in the colonies.',
		details: [
			'Slavery becomes central to the Southern economy.',
			'House of Burgesses established as first representative assembly.',
		],
	},
	{
		key: '1620',
		icon: '⛵',
		title: '1620 – Pilgrims Land at Plymouth',
		summary: 'Pilgrims establish Plymouth Colony and sign the Mayflower Compact.',
		details: [
			'Mayflower Compact sets precedent for self-government.',
			'Plymouth Colony survives with help from Native Americans.',
		],
	},
];

const APUSHUnit1StudyGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleTopic = (key: string) => {
    setOpenTopic(openTopic === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/apush-study-guide')}
          className="mb-6 px-4 py-2 rounded-lg bg-white text-blue-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Units
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800">APUSH Unit 1: The Colonial World (1491–1607)</h1>
          <p className="text-lg text-slate-600 mt-2">From pre-Columbian societies to the dawn of European colonization.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b-2 border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'topics' ? 'border-b-4 border-blue-600 text-blue-700' : 'text-slate-500 hover:text-blue-600'}`}
          >
            Key Topics
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'timeline' ? 'border-b-4 border-blue-600 text-blue-700' : 'text-slate-500 hover:text-blue-600'}`}
          >
            Timeline
          </button>
          <button
            onClick={() => navigate('/apush-study-guide/unit/1/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-blue-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit1Content.map((topic) => (
                <div key={topic.key} className="border-b border-slate-200 last:border-b-0 pb-4">
                  <button
                    onClick={() => toggleTopic(topic.key)}
                    className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-blue-700">{topic.title}</h3>
                    <span className="text-2xl text-slate-500">{openTopic === topic.key ? '-' : '+'}</span>
                  </button>
                  {openTopic === topic.key && (
                    <div className="p-4 bg-slate-50 rounded-b-lg">
                      <ul className="space-y-2">
                        {topic.bullets[0].map((bullet, index) => (
                          <li key={index} className="text-base text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="relative border-l-4 border-blue-200 ml-4 pl-8 space-y-12">
              {timelineData.map((event) => (
                <div key={event.key} className="relative">
                  <div className="absolute -left-11 -top-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-md">
                    {event.icon}
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl shadow-md">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">{event.title}</h3>
                    <p className="text-lg text-slate-600 mb-4">{event.summary}</p>
                    <ul className="space-y-2 list-disc pl-5">
                      {event.details.map((detail, index) => (
                        <li key={index} className="text-base text-slate-700" dangerouslySetInnerHTML={{ __html: detail.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default APUSHUnit1StudyGuide;
