import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit5Content = [
  {
    key: '5.2',
    title: '5.2 – Westward Expansion and Manifest Destiny',
    bullets: [[
      '**Definition of Manifest Destiny**',
      'Coined by John O\'Sullivan in 1845.',
      'The belief that Americans had a God-given right to expand westward from the Atlantic to the Pacific.',
      'Framed as a moral duty to spread democracy and civilization.',
      '',
      '**Motivations for Expansion**',
      'Economic: Gold Rush (1848), farming, natural resources.',
      'Government: Preemption Acts allowed settlers to purchase land cheaply.',
      'Religious Freedom: Mormons moved to Utah to escape persecution.',
      '',
      '**Election of James K. Polk (1844)**',
      'Campaigned on expansion: Texas and Oregon.',
      'Polk was a key supporter of Manifest Destiny and territorial growth.',
      '',
      '**Texas and Mexico**',
      'American settlers clashed with Mexican laws: anti-slavery, Catholic conversion.',
      'The Texas Revolution (1836): led by Sam Houston, resulted in Texas independence, but Mexico refused to recognize it.',
      '',
      '**Oregon Territory**',
      'Dispute between Britain and U.S.',
      'Settled peacefully with the Oregon Treaty (1846): U.S. gained land south of 49th parallel.',
    ]],
  },
  {
    key: '5.3',
    title: '5.3 – Causes of the Mexican-American War',
    bullets: [[
      '**Annexation of Texas**',
      'Finalized under President John Tyler (1845).',
      'Mexico viewed this as an act of war.',
      '',
      '**Border Dispute**',
      'U.S. claimed Rio Grande; Mexico claimed Nueces River.',
      '',
      '**Polk’s Diplomacy and Provocation**',
      'Sent John Slidell to purchase California and New Mexico—Mexico refused.',
      'Sent General Zachary Taylor to disputed territory—skirmish ensued.',
      'Polk declared war in 1846.',
      '',
      '**Key Effects**',
      'Treaty of Guadalupe Hidalgo (1848): U.S. gained California and Southwest; established Rio Grande as border.',
      'Wilmot Proviso: Proposed banning slavery in new territories (failed but intensified sectional conflict).',
      'Impact on Mexicans/Indigenous Peoples: Promised citizenship but faced racial discrimination and segregation.',
    ]],
  },
  {
    key: '5.4',
    title: '5.4 – The Growing Tension Over Slavery',
    bullets: [[
      '**Expansion of Slavery Debate**',
      'Triggered by land from the Mexican-American War.',
      '',
      '**Three Main Positions**',
      'Southern View: Slavery is protected under the Constitution.',
      'Free Soil Movement: Opposed slavery in new territories, not the South.',
      'Popular Sovereignty: Let people in each territory vote.',
      '',
      '**Missouri Compromise Significance**',
      'Previously solved expansion issues (36°30′ line).',
      'Now threatened by new acquisitions.',
      '',
      '**California and New Mexico**',
      'Applied as free states—angered Southerners.',
      'Free states gained Senate control.',
      '',
      '**Compromise of 1850 (Henry Clay)**',
      'CA admitted as free state.',
      'NM and UT: Popular sovereignty.',
      'Slave trade banned in D.C.',
      'Stronger Fugitive Slave Law—most controversial part.',
    ]],
  },
  {
    key: '5.5',
    title: '5.5 – Regional Conflict: Immigration and Slavery',
    bullets: [[
      '**Immigration & Nativism**',
      'Surge in Irish/German immigrants led to backlash.',
      'Formed enclaves but faced discrimination.',
      'Know-Nothing Party: Nativist, anti-immigrant.',
      '',
      '**Labor Differences**',
      'North: Free wage labor, industrialized.',
      'South: Enslaved labor, agricultural economy.',
      '',
      '**Free Soil vs. Abolitionists**',
      'Free Soil: Wanted land free of slavery for white settlers.',
      'Abolitionists: Wanted full abolition of slavery.',
      '',
      '**Abolitionist Influence**',
      'William Lloyd Garrison’s The Liberator.',
      'Frederick Douglass’s speeches.',
      'Uncle Tom’s Cabin by Harriet Beecher Stowe.',
      'Underground Railroad: Led by figures like Harriet Tubman.',
      '',
      '**John Brown**',
      'Led a failed raid at Harper’s Ferry (1859).',
      'Seen as a martyr in the North and a terrorist in the South.',
    ]],
  },
  {
    key: '5.6',
    title: '5.6 – The Failure of Compromise',
    bullets: [[
      '**Kansas-Nebraska Act (1854)**',
      'Proposed by Stephen Douglas.',
      'Repealed Missouri Compromise—allowed popular sovereignty in new territories.',
      '',
      '**Bleeding Kansas**',
      'Violent conflict between pro- and anti-slavery settlers in Kansas following the Kansas-Nebraska Act (which allowed popular sovereignty).',
      'Two rival governments (Lecompton vs. Topeka).',
      'Federal government sided with pro-slavery faction.',
      '',
      '**Dred Scott Decision (1857)**',
      'Slaves were not citizens—could not sue.',
      'Congress had no authority to ban slavery in territories.',
      'Nullified Missouri Compromise and Popular Sovereignty.',
      '',
      '**Political Fallout**',
      'Whigs collapse—split into pro- and anti-slavery.',
      'Birth of Republican Party (1854): Anti-slavery expansion.',
      'Democrats become sectionalized (Southern stronghold).',
    ]],
  },
  {
    key: '5.7',
    title: '5.7 – Election of 1860 and Its Effects',
    bullets: [[
      '**Republican Platform**',
      'Abraham Lincoln: Prevent expansion of slavery, not abolish it.',
      '',
      '**Democratic Party Split**',
      'North: Stephen Douglas (Popular Sovereignty).',
      'South: John Breckinridge (Federal slave code).',
      '',
      '**Election Results**',
      'Lincoln won with no Southern electoral votes.',
      'South saw Lincoln’s win as a threat to slavery and their influence.',
      '',
      '**Secession**',
      'South Carolina seceded in Dec. 1860.',
      'Followed by 6 others: GA, AL, MS, LA, TX, FL.',
      'Later joined by VA, AR, TN, NC—formed Confederate States of America.',
    ]],
  },
  {
    key: '5.8',
    title: '5.8 – The American Civil War',
    bullets: [[
      '**Union Advantages**',
      'Larger population, more industry, stronger navy, established government.',
      '',
      '**Confederate Advantages**',
      'Home field advantage, better generals (e.g., Lee, Jackson).',
      '',
      '**Economic Mobilization**',
      'North: Industrial boom, support from manufacturers like Carnegie.',
      'South: Dependent on tariffs and cotton exports—failed under blockade.',
      '',
      '**War Opposition**',
      'South: Resistance to central government.',
      'North: Draft riots (e.g., NYC Draft Riot of 1863).',
      '',
      '**Turning Points**',
      'Fort Sumter: First shots of war.',
      'Bull Run: Showed war would be long.',
      'Anaconda Plan: Union strategy—naval blockade + Mississippi River control.',
      'Emancipation Proclamation (1863): Shifted war aim to ending slavery—only freed slaves in rebelling states.',
      '',
      '**Major Victories**',
      'Vicksburg (1863): Union took Mississippi.',
      'Gettysburg: Huge Union win.',
      'Sherman’s March to the Sea: Destroyed Southern infrastructure.',
      'Appomattox (1865): Lee surrendered to Grant.',
    ]],
  },
  {
    key: '5.9',
    title: '5.9 – Leadership During the Civil War',
    bullets: [[
      '**Emancipation Proclamation**',
      'Political and military strategy to isolate Confederacy internationally.',
      'Motivated Black Americans to join Union army.',
      '',
      '**Gettysburg Address**',
      'Reframed war as a struggle for equality and liberty.',
      'Emphasized the unfinished work of American democracy.',
    ]],
  },
  {
    key: '5.10',
    title: '5.10 – Reconstruction',
    bullets: [[
      '**Lincoln’s 10% Plan**',
      '10% of voters take loyalty oath, ratify 13th Amendment (abolished slavery).',
      '',
      '**Johnson’s Presidency**',
      'Continued Lincoln\'s plan but allowed ex-Confederates back into power.',
      'Opposed by Radical Republicans who wanted harsher measures.',
      '',
      '**Radical Republican Actions**',
      'Passed Reconstruction Acts (1867): Military rule in the South.',
      'Civil Rights Act (1866), 14th Amendment (citizenship/equal protection).',
      'Impeached Johnson (survived by 1 vote).',
      '',
      '**Freedmen’s Bureau**',
      'Assisted freed slaves with education, healthcare, family reunification.',
      '',
      '**Women’s Rights & Suffrage Movement**',
      'Divided over 15th Amendment (voting rights for Black men but not women).',
      'National vs. American Woman Suffrage Associations formed.',
    ]],
  },
  {
    key: '5.11',
    title: '5.11 – Post-Civil War Reconstruction Failure',
    bullets: [[
      '**Black Advancement**',
      'Established schools, churches, and political institutions.',
      'Some served in state and federal government.',
      '',
      '**Southern Resistance**',
      'Black Codes restricted rights.',
      'Sharecropping trapped many in debt.',
      'KKK used violence to suppress Black voters.',
      '',
      '**End of Reconstruction**',
      'Panic of 1873 shifted focus to economy.',
      'Compromise of 1877: Hayes became president, troops withdrawn from South.',
      'Redeemer governments restored white supremacy.',
    ]],
  },
];

export const timelineDataUnit5 = [
    {
      key: '1845',
      icon: '⭐️',
      title: '1845 – Annexation of Texas',
      summary: 'The U.S. officially annexed the Republic of Texas, which had declared independence from Mexico in 1836.',
      details: [
        'This act enraged Mexico and directly led to the Mexican-American War.',
      ],
    },
    {
      key: '1846-1848',
      icon: '⚔️',
      title: '1846–1848 – Mexican-American War',
      summary: 'A conflict between the U.S. and Mexico, largely over the disputed Texas border and expansionist ambitions.',
      details: [
        'Resulted in the Treaty of Guadalupe Hidalgo, giving the U.S. vast new territories in the Southwest.',
      ],
    },
    {
      key: '1846',
      icon: '📜',
      title: '1846 – Wilmot Proviso Introduced',
      summary: 'Proposed banning slavery in any territory gained from Mexico.',
      details: [
        'Though it was defeated, it intensified sectional tensions between North and South.',
      ],
    },
    {
      key: '1848',
      icon: '♀️',
      title: '1848 – Seneca Falls Convention',
      summary: "The first major women's rights convention in U.S. history, held in New York.",
      details: [
        'Organized by Elizabeth Cady Stanton and Lucretia Mott, it issued the Declaration of Sentiments, demanding equal rights for women.',
      ],
    },
    {
      key: '1850',
      icon: '⛓️',
      title: '1850 – Fugitive Slave Law',
      summary: 'Part of the Compromise of 1850, it required citizens to help capture runaway slaves and penalized those who aided fugitives.',
      details: [
        'Infuriated Northerners and strengthened abolitionist resistance.',
      ],
    },
    {
      key: '1852',
      icon: '📖',
      title: '1852 – Uncle Tom’s Cabin Published',
      summary: 'Harriet Beecher Stowe’s anti-slavery novel that stirred moral outrage in the North.',
      details: [
        'Widely credited with fueling the abolitionist movement and deepening sectional conflict.',
      ],
    },
    {
      key: '1854',
      icon: '🩸',
      title: '1854 – Bleeding Kansas',
      summary: 'Violent clashes between pro- and anti-slavery settlers in Kansas following the Kansas-Nebraska Act.',
      details: [
        'Became a symbol of how compromise was failing.',
      ],
    },
    {
      key: '1857',
      icon: '⚖️',
      title: '1857 – Dred Scott Decision',
      summary: 'Supreme Court ruled that African Americans were not citizens and Congress couldn’t ban slavery in territories.',
      details: [
        'Invalidated the Missouri Compromise and heightened tensions.',
      ],
    },
    {
      key: '1860',
      icon: '🗳️',
      title: '1860 – Lincoln’s Election',
      summary: 'Abraham Lincoln won on a platform opposing the expansion of slavery.',
      details: [
        'Southern states viewed this as a threat and began seceding shortly after.',
      ],
    },
    {
      key: '1861-1865',
      icon: '⚔️',
      title: '1861–1865 – Civil War',
      summary: 'Fought between the Union (North) and Confederacy (South) over secession and slavery.',
      details: [
        'The deadliest conflict in U.S. history, resulting in Union victory and abolition of slavery.',
      ],
    },
    {
      key: '1862',
      icon: '🏞️',
      title: '1862 – Homestead Act',
      summary: 'Granted 160 acres of land to settlers willing to farm it for five years.',
      details: [
        'Encouraged westward migration and expansion of agricultural frontier.',
      ],
    },
    {
      key: '1863',
      icon: '🕊️',
      title: '1863 – Emancipation Proclamation',
      summary: 'Issued by Lincoln, it freed enslaved people in Confederate-held territory.',
      details: [
        'Reframed the war as a fight against slavery and discouraged European support for the South.',
      ],
    },
    {
      key: '1863',
      icon: '🎖️',
      title: '1863 – Battle of Gettysburg',
      summary: 'Major turning point in the Civil War; Union victory halted Confederate momentum in the North.',
      details: [
        'Lincoln later delivered the Gettysburg Address, redefining the purpose of the war.',
      ],
    },
    {
      key: '1865',
      icon: '💀',
      title: '1865 – Lincoln Assassinated',
      summary: 'President Lincoln was shot by John Wilkes Booth just days after the Civil War ended.',
      details: [
        'His death left Reconstruction in the hands of less conciliatory leaders.',
      ],
    },
    {
      key: '1867',
      icon: '🏛️',
      title: '1867 – Military Reconstruction Act',
      summary: 'Divided the South into five military districts.',
      details: [
        'Enforced federal authority and protected rights of freedmen as Southern states rejoined the Union.',
      ],
    },
    {
      key: '1867',
      icon: '🏔️',
      title: '1867 – Purchase of Alaska',
      summary: 'U.S. bought Alaska from Russia for $7.2 million.',
      details: [
        'Known initially as “Seward’s Folly,” it later proved valuable for resources.',
      ],
    },
    {
      key: '1877',
      icon: '🚪',
      title: '1877 – Compromise of 1877',
      summary: 'Resolved the disputed 1876 election by making Rutherford B. Hayes president.',
      details: [
        'In exchange, federal troops were removed from the South, effectively ending Reconstruction and leaving Black Southerners vulnerable to segregation and disenfranchisement.',
      ],
    },
  ];

const APUSHUnit5StudyGuide: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-blue-800">APUSH Unit 5: The Civil War & Reconstruction (1844–1877)</h1>
          <p className="text-lg text-slate-600 mt-2">The causes, events, and consequences of the Civil War and the subsequent era of Reconstruction.</p>
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
            onClick={() => navigate('/apush-study-guide/unit/5/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-blue-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit5Content.map((topic) => (
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
              {timelineDataUnit5.map((event) => (
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

export default APUSHUnit5StudyGuide;
