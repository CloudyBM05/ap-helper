import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit2Content = [
	{
		key: '2.2',
		title: '2.2 – European Colonization of the Americas',
		bullets: [
			[
				'**Spanish Colonization:**',
				'Colonies built to extract wealth (gold, silver, agriculture).',
				'Encomienda system: forced labor of Native Americans.',
				'Shifted to enslaved African labor as Native populations declined.',
				'Rigid caste system based on racial ancestry (peninsulares, mestizos, etc.).',
				'Mission system aimed to convert natives to Christianity—met resistance.',
				'',
				'**French Colonization:**',
				'Aimed to find Northwest Passage to Asia; sidetracked by internal issues.',
				'Founded Quebec (1608) under Samuel de Champlain.',
				'Focused on fur trade and alliances with Native Americans.',
				'Few settlers; developed positive trade and cultural exchange with natives.',
				'',
				'**Dutch Colonization:**',
				'Sent Henry Hudson in 1624, founded New Amsterdam.',
				'Focused on economic gain, not religious conversion or large settlements.',
				'Set up a prosperous trade hub, including fur trade with natives.',
				'',
				'**British Colonization:**',
				'Motivated by enclosure movement, war with France/Ireland, and religious persecution.',
				'Colonists came in family units seeking land and new opportunities.',
				'Initially coexisted with natives, but later expelled them after tensions arose.',
				'Unlike Spanish intermarriage or French cooperation, British pushed natives off land.',
			],
		],
	},
	{
		key: '2.3',
		title: '2.3 – European Colonization in the Americas',
		bullets: [
			[
				'**Chesapeake Colonies:**',
				'Jamestown (1607): first permanent British colony, funded by joint-stock company.',
				'Early failures: settlers searched for gold instead of farming.',
				'Saved by tobacco, introduced by John Rolfe.',
				'Labor mostly done by indentured servants.',
				'Native land encroachment led to tensions and Bacon\'s Rebellion (1676).',
				'',
				'**New England Colonies:**',
				'Settled by Pilgrims (1620) and Puritans for religious/economic reasons.',
				'Migrated in family groups, formed self-sufficient farming communities.',
				'High death rate initially, but society stabilized with agriculture and trade.',
				'',
				'**British West Indies & Southern Coast:**',
				'First British colonies were Caribbean islands like Barbados.',
				'Grew sugarcane and tobacco—required huge enslaved labor force.',
				'Enforced harsh slave codes—enslaved people treated as property.',
				'',
				'**Middle Colonies:**',
				'NY, NJ: export economy (cereal crops), diverse populations.',
				'Wealth inequality grew with the rise of an elite merchant class.',
				'Pennsylvania (by William Penn): promoted religious freedom, peace with natives.',
				'',
				'**Governance Systems:**',
				'Far from Britain, colonies developed democratic institutions.',
				'Virginia: House of Burgesses (first elected assembly).',
				'New England: Mayflower Compact (church-based self-rule).',
				'Southern and Middle Colonies: elites dominated assemblies.',
			],
		],
	},
	{
		key: '2.4',
		title: '2.4 – The Transatlantic Trade',
		bullets: [
			[
				'**Triangular Trade:**',
				'New England → Africa: rum → enslaved laborers.',
				'Africa → Caribbean: enslaved laborers → sugarcane.',
				'Caribbean → New England: sugarcane → rum.',
				'Middle Passage: brutal journey for enslaved Africans; high death rates.',
				'',
				'**Mercantilism:**',
				'Wealth measured in gold/silver; fixed amount in world.',
				'Colonies existed to support mother country (raw materials, markets).',
				'Navigation Acts restricted trade to British ships and ports.',
				'',
				'**Effects of Transatlantic Trade:**',
				'Massive profits for merchants, investors, and plantation owners.',
				'Cities like Boston, NY, and Charleston flourished.',
				'Consumer revolution: new goods changed daily life and social status.',
				'Created a global trade network; deeply altered societies in Africa, Europe, and the Americas.',
			],
		],
	},
	{
		key: '2.5',
		title: '2.5 – European Interactions with American Indians',
		bullets: [
			[
				'**Spanish Interactions:**',
				'Encomienda system: coerced native labor for agriculture/mining.',
				'Introduced caste system ranking by racial background.',
				'Used force to convert natives; led to revolts like the Pueblo Revolt (1680).',
				'Revolt was successful temporarily; Spanish returned and reconquered later.',
				'',
				'**English Interactions:**',
				'Few attempts at converting or intermarrying with natives.',
				'Initially peaceful trade and cultural exchanges (weapons, farming methods).',
				'Encroachment on land led to conflict, e.g., Metacom\'s War (1675–1676).',
				'King Philip\'s War was one of the deadliest in colonial history; ended in native defeat.',
				'',
				'**French Interactions:**',
				'Built fur trading posts, not large settlements.',
				'Allied with natives militarily and economically.',
				'More peaceful than Spanish/English, but still saw natives as inferior.',
				'',
				'**Comparison:**',
				'Spanish: brutal coercion, conversion, intermarriage.',
				'French: cooperative trade and alliance.',
				'English: coexistence → land conflict → expulsion.',
			],
		],
	},
	{
		key: '2.6',
		title: '2.6 – Slavery in the British Colonies',
		bullets: [
			[
				'**Distribution of Enslaved People:**',
				'New England: few slaves, mostly household servants.',
				'Middle Colonies: mix of indentured and enslaved labor.',
				'Chesapeake: tobacco plantations with many slaves.',
				'Southern Colonies: huge plantations with the largest enslaved population.',
				'',
				'**Chattel Slavery:**',
				'Slaves treated as property; status inherited.',
				'Borrowed slave codes from harsh British West Indies.',
				'Laws allowed extreme punishments and control.',
				'Interracial marriage banned to maintain racial hierarchy.',
				'',
				'**Slave Resistance:**',
				'Covert: preserving African culture, work slowdowns, tool sabotage.',
				'Overt: rebellions like Stono Rebellion (1739), where slaves rose up and killed owners.',
			],
		],
	},
	{
		key: '2.7',
		title: '2.7 – Colonial Society and Structure',
		bullets: [
			[
				'**The Enlightenment:**',
				'Emphasized reason, science, and individual rights over tradition.',
				'Spread through transatlantic print culture.',
				'Key Thinkers:',
				'  • John Locke: natural rights (life, liberty, property).',
				'  • Rousseau: three-branch government for checks/balances.',
				'  • Voltaire: power from the people via social contract.',
				'  • Kant: supported checks and balances to limit tyranny.',
				'',
				'**Religious Impact:**',
				'Enlightenment undermined biblical authority, promoting science.',
				'Many questioned church teachings in favor of empirical evidence.',
				'',
				'**The Great Awakening:**',
				'Religious revival movement (1730s–1740s) across all colonies.',
				'Emphasized heartfelt Christianity over reason.',
				'Jonathan Edwards: blended Enlightenment with intense spirituality.',
				'George Whitefield: toured colonies preaching emotional salvation.',
				'',
				'**Social Consequences:**',
				'Gave common people justification to resist elite authority.',
				'Inspired participatory democracy (e.g., town meetings).',
				'Created shared American identity across the colonies.',
				'',
				'**Enlightenment + Great Awakening:**',
				'Enlightenment → liberty and rational government.',
				'Awakening → unity, anti-elitism, and resistance to tyranny.',
				'Together: helped shape early American democracy and resistance to British control.',
			],
		],
	},
];

export const timelineDataUnit2 = [
	{
		key: '1607',
		icon: '🏴',
		title: '1607 – Jamestown Founded',
		summary: 'First permanent English settlement in North America, marking the beginning of the Chesapeake colonies.',
		details: [
			'Funded by the Virginia Company, a joint-stock company.',
			'Early years marked by disease, famine, and conflict with the Powhatan Confederacy.',
			'John Smith’s leadership and the cultivation of tobacco helped the colony survive.',
		],
	},
	{
		key: '1620',
		icon: '⛪',
		title: '1620 – Plymouth Colony Founded',
		summary: 'Pilgrims, seeking religious freedom, establish Plymouth Colony in New England.',
		details: [
			'Sailed on the Mayflower and signed the Mayflower Compact, a form of self-government.',
			'Relied on help from the Wampanoag tribe to survive early hardships.',
		],
	},
	{
		key: '1630',
		icon: '📜',
		title: '1630 – Massachusetts Bay Colony Founded',
		summary: 'Puritans establish the Massachusetts Bay Colony, seeking to create a “city upon a hill.”',
		details: [
			'Led by John Winthrop, the colony was founded on religious and social ideals.',
			'Great Migration of Puritans to New England in the 1630s.',
			'Strict religious governance led to dissent and the founding of other colonies (e.g., Rhode Island).',
		],
	},
	{
		key: '1675',
		icon: '⚔️',
		title: '1675 – King Philip’s War',
		summary: 'A major conflict between New England colonists and Native American tribes led by Metacom (King Philip).',
		details: [
			'Caused by colonial expansion and tensions over land and resources.',
			'Resulted in a devastating defeat for Native Americans and the end of significant resistance in New England.',
		],
	},
	{
		key: '1676',
		icon: '🔥',
		title: '1676 – Bacon’s Rebellion',
		summary: 'An armed rebellion in Virginia led by Nathaniel Bacon against Governor William Berkeley.',
		details: [
			'Fueled by grievances of former indentured servants over land, Native American policies, and political power.',
			'Led to a shift from indentured servitude to African slavery as the primary labor source in the Chesapeake.',
		],
	},
	{
		key: '1681',
		icon: '🤝',
		title: '1681 – Pennsylvania Founded',
		summary: 'William Penn establishes Pennsylvania as a “holy experiment” based on Quaker principles.',
		details: [
			'Promoted religious tolerance, fair dealings with Native Americans, and a diverse population.',
			'Philadelphia became a major port and center of commerce.',
		],
	},
	{
		key: '1692',
		icon: '🧙‍♀️',
		title: '1692 – Salem Witch Trials',
		summary: 'A series of hearings and prosecutions of people accused of witchcraft in colonial Massachusetts.',
		details: [
			'Reflected social and religious tensions, as well as anxieties about the changing nature of colonial society.',
			'Led to the execution of 20 people and marked a turning point in colonial justice.',
		],
	},
	{
		key: '1730s',
		icon: '📖',
		title: '1730s-1740s – The Great Awakening',
		summary: 'A religious revival that swept through the American colonies, emphasizing individual religious experience.',
		details: [
			'Led by preachers like Jonathan Edwards and George Whitefield.',
			'Challenged traditional church authority and led to the growth of new Protestant denominations.',
			'Promoted a sense of shared American identity.',
		],
	},
];

const APUSHUnit2StudyGuide: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-blue-800">APUSH Unit 2: Colonial Society (1607–1754)</h1>
          <p className="text-lg text-slate-600 mt-2">The development of British colonies and their role in the growing transatlantic world.</p>
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
            onClick={() => navigate('/apush-study-guide/unit/2/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-blue-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit2Content.map((topic) => (
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
                      {(() => {
                        const items = topic.bullets[0];
                        const groupedItems = [];
                        let currentGroup: { heading: string; points: string[] } | null = null;

                        for (const item of items) {
                          if (item.startsWith('**') && item.endsWith('**')) {
                            if (currentGroup) {
                              groupedItems.push(currentGroup);
                            }
                            currentGroup = { heading: item, points: [] };
                          } else if (item === '') {
                            if (currentGroup) {
                              groupedItems.push(currentGroup);
                              currentGroup = null;
                            }
                          } else if (currentGroup) {
                            currentGroup.points.push(item);
                          }
                        }
                        if (currentGroup) {
                          groupedItems.push(currentGroup);
                        }

                        return groupedItems.map((group, i) => (
                          <div key={i} className="mb-4">
                            <h4
                              className="text-lg font-semibold text-blue-800"
                              dangerouslySetInnerHTML={{ __html: group.heading.replace(/\*\*(.*?)\*\*/g, '$1') }}
                            />
                            <ul className="mt-2 space-y-2 pl-5">
                              {group.points.map((point, j) => {
                                if (point.trim().startsWith('•')) {
                                  return (
                                    <li key={j} className="text-base text-slate-700 leading-relaxed">
                                      <ul className="list-disc pl-5">
                                        <li dangerouslySetInnerHTML={{ __html: point.trim().substring(1).trim() }} />
                                      </ul>
                                    </li>
                                  );
                                }
                                if (point.endsWith(':')) {
                                  return (
                                    <p key={j} className="font-semibold mt-2 text-slate-700" dangerouslySetInnerHTML={{ __html: point }} />
                                  );
                                }
                                return (
                                  <li key={j} className="text-base text-slate-700 leading-relaxed list-disc" dangerouslySetInnerHTML={{ __html: point }} />
                                );
                              })}
                            </ul>
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="relative border-l-4 border-blue-200 ml-4 pl-8 space-y-12">
              {timelineDataUnit2.map((event) => (
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

export default APUSHUnit2StudyGuide;
