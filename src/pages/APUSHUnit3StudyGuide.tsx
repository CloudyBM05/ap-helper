import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit3Content = [
	{
		key: '3.2',
		title: '3.2 – French and Indian War',
		bullets: [[
			'**Causes:**',
			'Conflict over the Ohio River Valley between French and British.',
			'British-American colonists expanded into land claimed by the French.',
			'George Washington’s failed diplomacy led to skirmishes (e.g., Fort Duquesne).',
			'Native American alliances played a critical role early in the conflict.',
			'',
			'**The Albany Congress (1754):**',
			'Colonial delegates met to discuss joint defense, trade, and expansion.',
			'The Iroquois Confederacy offered minimal support.',
			'Benjamin Franklin proposed the Albany Plan of Union—early push for unified colonial government—but it was rejected.',
			'',
			'**The War:**',
			'French dominated early; British gained advantage with reinforcements and new leadership (William Pitt).',
			'British imposed harsh wartime policies: impressment and quartering, increasing colonial resentment.',
			'',
			'**Treaty of Paris (1763):**',
			'Ended the war: Britain gained all French land east of the Mississippi.',
			'Spain ceded Florida to Britain; France gave Louisiana to Spain.',
			'Marked the start of Britain’s empire-building in North America.',
			'',
			'**Effects:**',
			'Sparked westward migration and conflict with Native Americans.',
			'Led to the Proclamation Line of 1763—restricted colonial expansion west of Appalachians.',
			'Britain’s debt doubled → new taxes on colonies to pay war costs.',
		]],
	},
	{
		key: '3.3',
		title: '3.3 – Reasons for American Anger',
		bullets: [[
			'**Taxation Without Representation:**',
			'Prime Minister George Grenville imposed taxes to pay war debts.',
			'Colonial resistance stemmed from having no voice in Parliament.',
			'',
			'**End of Salutary Neglect:**',
			'Britain started strictly enforcing trade laws (Navigation Acts).',
			'Wartime provisions like Quartering Act extended into peacetime.',
			'',
			'**New Taxes:**',
			'Sugar Act: taxed luxuries like wine, coffee, and sugar.',
			'Stamp Act: tax on printed materials.',
			'Currency Act: restricted colonial currency.',
			'',
			'**Colonial Resistance:**',
			'Formation of protest groups: Sons and Daughters of Liberty.',
			'Widespread boycotts and petitions.',
			'Stamp Act Congress: unified colonies to challenge Parliament.',
			'',
			'**Key Concepts:**',
			'Virtual representation: British claim that Parliament represented all subjects.',
			'“No taxation without representation”: colonial response.',
		]],
	},
	{
		key: '3.4',
		title: '3.4 – Philosophical Foundations of the American Revolution',
		bullets: [[
			'**Colonial Shift in Identity:**',
			'Initially, colonists wanted reconciliation, not independence.',
			'Loyal subjects hoped for restored rights.',
			'',
			'**Influence of the Enlightenment:**',
			'John Locke: natural rights, consent of the governed, self-rule.',
			'Rousseau: social contract, laws require public consent.',
			'Montesquieu: separation of powers across legislative, executive, and judicial branches.',
			'',
			'**Thomas Paine’s Common Sense:**',
			'Made Enlightenment ideas digestible for the masses.',
			'Strong argument for independence—immensely popular.',
			'',
			'**Declaration of Independence (1776):**',
			'Written by Thomas Jefferson.',
			'Cited Enlightenment principles: natural rights, social contract.',
			'Officially declared the colonies independent from Britain.',
		]],
	},
	{
		key: '3.5',
		title: '3.5 – The American Revolution',
		bullets: [[
			'**Internal Conflict:**',
			'Patriots vs Loyalists vs neutrals.',
			'',
			'**Early War Struggles:**',
			'Washington’s army was untrained, poorly equipped, and regionally divided.',
			'',
			'**British Strength:**',
			'Professional army and 60,000 Loyalists.',
			'Initial upper hand due to organization and resources.',
			'',
			'**Turning Point:**',
			'Washington’s Christmas surprise at Trenton.',
			'Victory at Saratoga brought French support—game changer.',
			'',
			'**Yorktown and Treaty of Paris (1783):**',
			'Final blow at Yorktown with French aid.',
			'Treaty recognized U.S. independence; western boundary at Mississippi River.',
			'',
			'**Role of Black Americans:**',
			'~5,000 fought for the Patriot cause, mostly from the North.',
		]],
	},
	{
		key: '3.6',
		title: '3.6 – Impacts of the Revolution',
		bullets: [[
			'**Slavery:**',
			'Northern abolition grew; southern reliance increased.',
			'The anti-slavery movement lost momentum post-war.',
			'',
			'**Democracy:**',
			'No more nobility or titles.',
			'Expanded suffrage in state constitutions.',
			'',
			'**Women:**',
			'Emergence of “Republican Motherhood.”',
			'Push for women’s education.',
			'Judith Sargent Murray: advocated for women’s self-sufficiency.',
			'',
			'**Global Impact:**',
			'Inspired:',
			'French Revolution (1789): rights, liberty, and equality.',
			'Haitian Revolution (1791): first successful slave revolt.',
			'Latin American revolutions: broke from Spanish/Portuguese rule.',
		]],
	},
	{
		key: '3.7',
		title: '3.7 – Articles of Confederation',
		bullets: [[
			'**Overview:**',
			'Ratified 1781, weak central government.',
			'No executive or national court.',
			'Each state had one vote, unanimous consent required for amendments.',
			'',
			'**Issues:**',
			'Couldn’t tax, raise a military, or control trade.',
			'Western expansion caused conflicts with Native Americans.',
			'',
			'**Northwest Ordinance (1787):**',
			'Banned slavery in the Northwest Territory.',
			'Set guidelines for territories becoming states.',
			'Promoted public education and protected property rights.',
			'',
			'**Shays’s Rebellion (1786):**',
			'Economic hardship → farmer revolt.',
			'No federal army to respond.',
			'Proved the Articles were too weak, prompting calls for change.',
		]],
	},
	{
		key: '3.8',
		title: '3.8 – Creating the Constitution',
		bullets: [[
			'**Constitutional Convention (1787):**',
			'Intended to revise Articles, ended up scrapping them.',
			'',
			'**Representation Debate:**',
			'Virginia Plan (big states) vs. New Jersey Plan (small states).',
			'Great Compromise: bicameral legislature (House by population, Senate equal).',
			'',
			'**Slavery Debate:**',
			'3/5 Compromise: slaves counted as 3/5 of a person for representation.',
			'No ban on slave trade until 1808.',
			'',
			'**Presidency:**',
			'Elected via Electoral College.',
			'House: 2-year terms, popular vote. Senate: 6-year terms, chosen by legislatures.',
			'',
			'**Ratification Battle:**',
			'Federalists: supported Constitution.',
			'Anti-Federalists: feared central power, demanded Bill of Rights.',
			'Compromise: promise to add Bill of Rights secured ratification.',
		]],
	},
	{
		key: '3.9',
		title: '3.9 – The Constitution',
		bullets: [[
			'**Federalism:**',
			'Shared power between federal and state governments.',
			'',
			'**Supremacy Clause:**',
			'National laws override state laws.',
			'',
			'**Enumerated vs Reserved Powers:**',
			'Enumerated: listed federal powers (e.g., declare war).',
			'Reserved: anything not listed goes to the states (e.g., marriage laws).',
			'',
			'**Separation of Powers:**',
			'Legislative (makes laws), Executive (enforces laws), Judicial (interprets laws).',
			'',
			'**Checks and Balances:**',
			'Each branch can check the other to prevent tyranny.',
		]],
	},
	{
		key: '3.10',
		title: '3.10 – Washington’s Presidency',
		bullets: [[
			'**Executive Departments:**',
			'Treasury (Hamilton), State (Jefferson), War, Justice.',
			'',
			'**Hamilton’s Financial Plan:**',
			'National Bank: unify currency and credit.',
			'Absorbed state debts to build national unity.',
			'',
			'**“Elastic Clause”:**',
			'Allowed implied powers (e.g., National Bank).',
			'',
			'**Foreign Policy:**',
			'Proclamation of Neutrality (1793): stayed out of French wars.',
			'Jay Treaty: eased tensions with Britain.',
			'Pinckney Treaty: trade rights on Mississippi River from Spain.',
			'',
			'**Domestic Events:**',
			'Whiskey Rebellion: crushed by federal troops, proving strong Constitution.',
			'Battle of Fallen Timbers: U.S. gained Native land in Ohio Valley.',
			'',
			'**Political Parties Emerge:**',
			'Federalists (Hamilton): strong gov, commerce.',
			'Democratic-Republicans (Jefferson): states’ rights, agriculture.',
			'',
			'**Farewell Address:**',
			'Warned against political factions and foreign entanglements.',
		]],
	},
	{
		key: '3.11',
		title: '3.11 – American Identity in the Early Republic',
		bullets: [[
			'**Cultural Developments:**',
			'Art and literature reflected national pride and republican values.',
			'Noah Webster standardized American English.',
			'',
			'**Regional Differences:**',
			'North: industrializing, urbanizing, favored tariffs.',
			'South: agrarian, dependent on slavery, opposed tariffs.',
			'West: focused on expansion, infrastructure, and cheap land.',
		]],
	},
];

export const timelineDataUnit3 = [
	{
		key: '1754',
		icon: '⚔️',
		title: '1754 – French and Indian War Begins',
		summary: 'A conflict between Great Britain and France over territory in North America, which led to increased British control and colonial resentment.',
		details: [
			'The war began over disputed land in the Ohio River Valley.',
			'The British victory in 1763 resulted in France ceding its North American territories.',
			'The war left Britain with a massive debt, leading to new taxes on the colonies.',
		],
	},
	{
		key: '1763',
		icon: '📜',
		title: '1763 – Proclamation of 1763',
		summary: 'A British decree that prohibited colonial settlement west of the Appalachian Mountains to prevent conflict with Native Americans.',
		details: [
			'The proclamation was widely ignored by colonists, who continued to move west.',
			'It was seen as an infringement on colonial rights and contributed to growing tensions.',
		],
	},
	{
		key: '1765',
		icon: '📄',
		title: '1765 – Stamp Act',
		summary: 'A direct tax on all printed materials in the colonies, which sparked widespread protests and resistance.',
		details: [
			'The act was met with the slogan “no taxation without representation.”',
			'The Sons of Liberty organized boycotts and intimidated tax collectors.',
			'The act was repealed in 1766, but the Declaratory Act asserted British authority.',
		],
	},
	{
		key: '1770',
		icon: '💥',
		title: '1770 – Boston Massacre',
		summary: 'A deadly confrontation between British soldiers and a Boston mob, which fueled anti-British sentiment.',
		details: [
			'Five colonists were killed, and the event was used as propaganda by patriots.',
			'John Adams defended the soldiers in court, and most were acquitted.',
		],
	},
	{
		key: '1773',
		icon: '☕',
		title: '1773 – Boston Tea Party',
		summary: 'A protest against the Tea Act in which colonists dumped British tea into Boston Harbor.',
		details: [
			'The Tea Act was intended to help the struggling British East India Company.',
			'The protest led to the passage of the Intolerable Acts, which further punished Massachusetts.',
		],
	},
	{
		key: '1775',
		icon: '🔫',
		title: '1775 – Battles of Lexington and Concord',
		summary: 'The first military engagements of the American Revolutionary War, marking the start of open conflict.',
		details: [
			'British troops were sent to seize colonial military supplies in Concord.',
			'The “shot heard ’round the world” at Lexington began the war.',
		],
	},
	{
		key: '1776',
		icon: '🖋️',
		title: '1776 – Declaration of Independence',
		summary: 'A document that declared the thirteen colonies independent from Great Britain and outlined the principles of American democracy.',
		details: [
			'Written primarily by Thomas Jefferson, it was adopted on July 4, 1776.',
			'It asserted the natural rights of life, liberty, and the pursuit of happiness.',
		],
	},
	{
		key: '1783',
		icon: '🕊️',
		title: '1783 – Treaty of Paris',
		summary: 'The treaty that officially ended the Revolutionary War and recognized American independence.',
		details: [
			'The treaty established the boundaries of the new nation, from the Atlantic to the Mississippi River.',
			'It also addressed issues of debt, prisoners of war, and fishing rights.',
		],
	},
];

const APUSHUnit3StudyGuide: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-blue-800">APUSH Unit 3: The American Revolution (1754–1800)</h1>
          <p className="text-lg text-slate-600 mt-2">The causes, events, and consequences of the American Revolution.</p>
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
            onClick={() => navigate('/apush-study-guide/unit/3/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-blue-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit3Content.map((topic) => (
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
              {timelineDataUnit3.map((event) => (
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

export default APUSHUnit3StudyGuide;
