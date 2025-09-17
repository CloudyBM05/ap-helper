import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit6Content = [
    {
        key: '6.2',
        title: '6.2 – Westward Expansion Economics',
        bullets: [[
            '**Mechanization of Agriculture**',
            'Introduction of machines like the mechanical reaper and combine harvester led to a major increase in crop output.',
            'Corn and wheat production doubled between 1870–1900.',
            'Small farmers couldn\'t afford new equipment and were often bought out by large agribusinesses.',
            '',
            '**Market Effects**',
            'Crop surpluses caused a drop in prices due to supply and demand.',
            'This hurt small farmers most, who had less room for profit.',
            '',
            '**Challenges for Farmers**',
            'High costs of manufactured goods due to industrial trusts and monopolies.',
            'Railroads charged excessive fees to transport crops, cutting into farmer profits.',
            '',
            '**National Grange Movement**',
            'Founded in 1868 to support farmers.',
            'Pushed for Granger Laws to regulate railroad prices and corporate abuse.',
            'Led to the Interstate Commerce Act (1886) and formation of the Interstate Commerce Commission (ICC).',
            '',
            '**Federal Support for Migration**',
            'Pacific Railway Acts: gave land grants to railroad companies to build transcontinental railroads.',
            'Homestead Act (1862): offered 160 acres of free land to settlers who farmed it for 5 years.',
            'Resulted in massive westward migration and the completion of the first transcontinental railroad in 1869.',
            '',
            '**Gold & Silver Rushes**',
            'California Gold Rush (1848) and Pike’s Peak (1859) created boomtowns like Denver and Boulder.',
            'These towns were ethnically diverse due to international migration.',
        ]],
    },
    {
        key: '6.3',
        title: '6.3 – Westward Migration After the Civil War',
        bullets: [[
            '**Frontier Settlement**',
            'After 1877, settlers moved west for land and opportunity.',
            'By 1890, the Census Bureau declared the frontier closed.',
            '',
            '**Push Factors**',
            'Homestead Act gave people access to free land.',
            'Railroads allowed access to remote areas and markets.',
            '',
            '**Cattle Trade & Cowboy Culture**',
            'Large cattle herds grazed the plains, moved along trails by cowboys.',
            'Cowboys became romanticized symbols of the West.',
            '',
            '**End of the Open Range**',
            'Invention of barbed wire ended free-range grazing.',
            'Farmers enclosed land, diminishing the cowboy lifestyle.',
            '',
            '**Sodbusters**',
            'Farmers who broke tough prairie soil to cultivate crops.',
            'Only 20% got land via the Homestead Act; most bought from railroads or private owners.',
            '',
            '**Closing of the Frontier**',
            '1890 Census: no clear frontier line.',
            'The Oklahoma Land Rush marked the final stage of continental expansion.',
            '',
            '**Turner Thesis**',
            'Historian Frederick Jackson Turner argued that the frontier had shaped American democracy and social mobility.',
            'Its closure raised concerns about the future of American identity.',
            '',
            '**Impact on Native Americans**',
            'Native peoples were pushed onto reservations with restricted autonomy.',
            'The Dawes Act (1887) tried to assimilate Native Americans through allotment of land.',
            'Indian Appropriation Act (1871) ended treaty-making with tribes.',
            '',
            '**Native Resistance**',
            'Sioux Wars and Comanche Wars marked military conflict.',
            'Ghost Dance Movement was a spiritual resistance.',
            'Culminated in Wounded Knee Massacre (1890): over 200 Native men, women, and children killed by U.S. Army.',
        ]],
    },
    {
        key: '6.4',
        title: '6.4 – The New South',
        bullets: [[
            '**Vision for the New South**',
            'Post-Civil War South promoted economic modernization and industrialization.',
            'Championed by Henry Grady, who envisioned industrial growth and diversification.',
            '',
            '**Southern Growth**',
            'Textile manufacturing increased.',
            'Urban centers and railroads expanded.',
            '',
            '**Persistent Challenges**',
            'The region remained predominantly agricultural.',
            'Sharecropping and tenant farming trapped many (especially African Americans) in debt peonage.',
            '',
            '**Racial Segregation**',
            'Plessy v. Ferguson (1896): legalized segregation under "separate but equal."',
            'Jim Crow Laws enforced racial discrimination.',
            '',
            '**Violence and Disenfranchisement**',
            'African Americans faced lynchings, voting restrictions, and exclusion from juries.',
            'Over 1,000 lynchings occurred in the 1890s.',
            '',
            '**Resistance Movements**',
            'Ida B. Wells fought against lynching and injustice.',
            'Booker T. Washington advocated for vocational education and economic independence.',
            'Henry Turner promoted African emigration.',
        ]],
    },
    {
        key: '6.5',
        title: '6.5 – Industrialization of America',
        bullets: [[
            '**Transition to National & Global Markets**',
            'Shift from local production to mass manufacturing for national and global consumption.',
            '',
            '**Railroads as a Catalyst**',
            'Federal land grants encouraged railroad expansion (170 million acres).',
            'Enabled the creation of a national market and urbanization.',
            '',
            '**Steel Revolution**',
            'Bessemer Process allowed efficient and affordable steel production.',
            'Steel became the backbone of railroads, bridges, and buildings.',
            '',
            '**Natural Resources**',
            'Coal (especially from Pennsylvania) fueled factories.',
            'Oil began replacing coal as a dominant energy source.',
            '',
            '**Communication**',
            'Telegraph (Samuel Morse, 1844): enabled instant long-distance communication.',
            'Trans-Atlantic cable and telephone improved global and domestic connectivity.',
        ]],
    },
    {
        key: '6.6',
        title: '6.6 – Rise of Industrial Capitalism',
        bullets: [[
            '**The Gilded Age**',
            'A period of rapid economic growth masked by underlying social problems.',
            'Term coined by Mark Twain.',
            '',
            '**Rise of Big Business**',
            'Corporations grew, replacing small local businesses.',
            'Monopolies formed through trusts (e.g., Standard Oil).',
            '',
            '**Key Business Strategies**',
            'Horizontal Integration: one firm controls an entire industry (Rockefeller).',
            'Vertical Integration: control every part of production (Carnegie).',
            '',
            '**Government’s Role**',
            'Laissez-faire approach: minimal interference in business.',
            'Allowed monopolies to flourish.',
            '',
            '**Exploitation of Labor**',
            'Poor working conditions, low wages, child labor.',
            'Justified by Social Darwinism: survival of the fittest in business.',
            '',
            '**Gospel of Wealth**',
            'Carnegie promoted philanthropy: use wealth for public good.',
            'Funded libraries, universities, and cultural institutions.',
        ]],
    },
    {
        key: '6.7',
        title: '6.7 – The Gilded Age',
        bullets: [[
            '**Wealth Inequality**',
            'Bourgeoisie flaunted wealth (e.g., Biltmore Mansion).',
            'Working-class families struggled to survive on low wages.',
            '',
            '**Economic Crises**',
            'Panics of 1873 and 1893 caused mass unemployment.',
            '',
            '**Labor Movements**',
            'Workers organized for better pay and safer conditions.',
            'Notable unions:',
            '  • Knights of Labor: inclusive, against child labor and trusts.',
            '  • AFL: skilled, white male workers only; focused on wages/safety.',
            '',
            '**Major Strikes**',
            'Great Railroad Strike (1877): national shutdown.',
            'Pullman Strike (1894): led by Eugene V. Debs, crushed by federal troops.',
        ]],
    },
    {
        key: '6.8',
        title: '6.8 – Immigration and Migration',
        bullets: [[
            '**Immigration Surge**',
            '16 million immigrants (mostly from Europe and China) arrived between 1865–1898.',
            'Settled in cities like New York, Chicago, Pittsburgh.',
            '',
            '**Urbanization**',
            'Cities grew rapidly, filled with tenements and poor sanitation.',
            'Ethnic enclaves allowed immigrants to preserve their culture.',
            '',
            '**Exoduster Movement**',
            'Thousands of African Americans migrated West after Reconstruction.',
            'Sought to escape Jim Crow laws and white violence.',
            'Supported by the Kansas Freedmen’s Aid Society.',
        ]],
    },
    {
        key: '6.9',
        title: '6.9 – American Responses to Immigration',
        bullets: [[
            '**Nativism**',
            'Anti-immigrant sentiment rose due to job competition and cultural differences.',
            'American Protective Association (APA) opposed Catholics and "inferior races."',
            '',
            '**Labor Union Concerns**',
            'Immigrants undercut wages and broke strikes, weakening union power.',
            '',
            '**Social Darwinism**',
            'Claimed immigrants would degrade the racial stock and moral fabric of the nation.',
            '',
            '**Chinese Exclusion**',
            'Chinese Exclusion Act (1882): first law to ban immigration by race/nationality.',
            '',
            '**Jane Addams and Settlement Houses**',
            'Hull House offered language lessons, childcare, and job training to help immigrants assimilate.',
        ]],
    },
    {
        key: '6.10',
        title: '6.10 – Rise of the Middle Class',
        bullets: [[
            '**Corporate Structures**',
            'Rise of middle managers in large corporations.',
            'New professions: accounting, law, clerical work, medicine.',
            '',
            '**Women in Workforce**',
            'Women entered clerical jobs with the spread of the typewriter.',
            'Earned wages and gained independence.',
            '',
            '**Middle-Class Lifestyle**',
            'Better wages, more leisure time, consumer goods.',
            '',
            '**Leisure Activities**',
            'Amusement parks, sports (baseball, football), circuses.',
            '',
            '**Carnegie’s Philanthropy**',
            'Supported libraries, universities, and cultural institutions to uplift society.',
        ]],
    },
    {
        key: '6.11',
        title: '6.11 – Industrial Capitalism and Reform',
        bullets: [[
            '**Problems of Industrial Capitalism**',
            'Low wages, long hours, unsafe working conditions.',
            'Growing wealth gap.',
            '',
            '**Reform Movements**',
            'Henry George: advocated a single tax on land to reduce inequality.',
            'Edward Bellamy: wrote Looking Backward, imagining a socialist utopia.',
            'Socialism: promoted by Eugene V. Debs, stressed shared ownership.',
            '',
            '**Social Gospel**',
            'Religious movement urging Christians to tackle social problems.',
            'Inspired middle-class activism.',
            '',
            '**Women’s Rights**',
            'NAWSA (1890): led by Stanton and Anthony to push for voting rights.',
            '',
            '**Temperance**',
            'WCTU (1874) and Carrie Nation advocated for alcohol abstinence.',
        ]],
    },
    {
        key: '6.12',
        title: '6.12 – Role of Government',
        bullets: [[
            '**Laissez-Faire Ideology**',
            'Dominated during the Gilded Age; minimal regulation.',
            'Based on Adam Smith’s Wealth of Nations.',
            '',
            '**Criticism**',
            'Ignored the need for competition; monopolies flourished unchecked.',
            '',
            '**Limited Government Response**',
            'Half-hearted efforts like the Interstate Commerce Commission lacked enforcement power.',
            '',
            '**Support for Business**',
            'U.S. backed imperialism to aid business:',
            '  • Overthrow of Hawaiian monarchy (1893).',
            '  • Open Door Policy in China (1899) for trade.',
        ]],
    },
    {
        key: '6.13',
        title: '6.13 – Politics in the Gilded Age',
        bullets: [[
            '**Party Division**',
            'Democrats: South, pro-states’ rights, supported by immigrants.',
            'Republicans: North, industrialist support, backed African Americans and Protestants.',
            '',
            '**Government Corruption**',
            'Patronage systems dominated politics (giving jobs to loyalists).',
            'Pendleton Act (1881): began civil service reform via competitive exams.',
            '',
            '**Economic Debates**',
            'Currency: silver vs. gold standard.',
            'Tariffs: protected industries but hurt farmers and trade.',
            '',
            '**Populist Party**',
            'Emerged from farmer unrest; called for reforms:',
            '  • Direct election of senators.',
            '  • Graduated income tax.',
            '  • Unlimited silver coinage.',
            '  • 8-hour workday.',
            '',
            '**Urban Machines**',
            'Tammany Hall (Boss Tweed) provided services in exchange for votes, but was deeply corrupt.',
        ]],
    },
];

export const timelineDataUnit6 = [
    {
      key: '1862',
      icon: '📜',
      title: '1862 – Homestead Act',
      summary: 'Offered 160 acres of free land to settlers who agreed to farm it for five years, accelerating westward migration.',
      details: [
        'A major driver of settlement in the American West.',
        'Led to the cultivation of the Great Plains.',
      ],
    },
    {
      key: '1869',
      icon: '🚂',
      title: '1869 – First Transcontinental Railroad Completed',
      summary: 'The Union Pacific and Central Pacific railroads met at Promontory, Utah, connecting the East and West coasts.',
      details: [
        'Revolutionized transportation and trade across the country.',
        'Facilitated economic growth and further settlement of the West.',
      ],
    },
    {
      key: '1877',
      icon: '✊',
      title: '1877 – Great Railroad Strike',
      summary: 'A massive, nationwide strike of railroad workers that was violently suppressed by federal troops.',
      details: [
        'Highlighted the growing conflict between labor and capital.',
        'Marked the beginning of a period of intense labor unrest.',
      ],
    },
    {
      key: '1882',
      icon: '🚫',
      title: '1882 – Chinese Exclusion Act',
      summary: 'The first federal law to prohibit the immigration of a specific ethnic group.',
      details: [
        'Fueled by nativist sentiment and economic fears.',
        'Remained in effect until 1943.',
      ],
    },
    {
      key: '1886',
      icon: '⚖️',
      title: '1886 – Interstate Commerce Act',
      summary: 'Created the Interstate Commerce Commission (ICC) to regulate railroad rates and ensure fair practices.',
      details: [
        'The first federal law to regulate private industry in the U.S.',
        'Initially weak, but set a precedent for future government regulation.',
      ],
    },
    {
      key: '1890',
      icon: '😢',
      title: '1890 – Wounded Knee Massacre',
      summary: 'The U.S. Army killed over 200 Lakota men, women, and children, effectively ending the Ghost Dance movement and the Indian Wars.',
      details: [
        'A tragic culmination of decades of conflict between Native Americans and the U.S. government.',
        'Marked the end of widespread armed Native American resistance.',
      ],
    },
    {
      key: '1896',
      icon: ' segregated',
      title: '1896 – Plessy v. Ferguson',
      summary: 'The Supreme Court upheld the constitutionality of racial segregation under the "separate but equal" doctrine.',
      details: [
        'Legitimized Jim Crow laws and the segregation of public facilities.',
        'Remained the law of the land until it was overturned by Brown v. Board of Education in 1954.',
      ],
    },
  ];

const APUSHUnit6StudyGuide: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-blue-800">APUSH Unit 6: The Gilded Age (1865-1898)</h1>
          <p className="text-lg text-slate-600 mt-2">Explore the key events, people, and concepts of the Gilded Age.</p>
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
            onClick={() => navigate('/apush-study-guide/unit/6/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-blue-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit6Content.map((topic) => (
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
              {timelineDataUnit6.map((event) => (
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

export default APUSHUnit6StudyGuide;
