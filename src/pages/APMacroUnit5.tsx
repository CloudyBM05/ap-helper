import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit5Content = [
  {
    key: '5.1',
    title: '5.1 – Fiscal and Monetary Policy Actions in the Short Run',
    bullets: [
      {
        subtopic: 'Fiscal Policy and Classical Adjustment',
        points: [
          'Recessionary Gap Adjustment (Classical View):',
          '  AD shifts left due to low confidence → real GDP falls below full employment → recession.',
          '  PL1 falls to PL2 → unemployment rises.',
          '  SRAS gradually shifts right (SRAS → SRAS2) due to falling input costs, restoring GDPf.',
          'Inflationary Gap Adjustment (Classical View):',
          '  AD shifts right → GDP rises above full employment to GDPi → inflation occurs.',
          '  Factor prices rise → SRAS shifts left (SRAS → SRAS2) → GDP returns to full employment at higher PL (PL3).',
        ],
      },
      {
        subtopic: 'Monetary Policy',
        points: [
          'Recessionary Gap Correction:',
          '  Expansionary monetary policy used to boost spending → lower interest rates.',
          '  Often coordinated with expansionary fiscal policy.',
          '  Risk: Inflation if overused.',
          'Inflationary Gap Correction:',
          '  Contractionary monetary policy used to reduce spending → higher interest rates.',
          '  Often paired with contractionary fiscal policy.',
          '  Risk: Rising unemployment.',
        ],
      },
      {
        subtopic: 'Coordination of Policies',
        points: [
          'Independent Central Bank avoids political influence.',
          'Different combinations of policies can address varying gap magnitudes.',
        ],
      },
    ],
  },
  {
    key: '5.2',
    title: '5.2 – Phillips Curve',
    bullets: [
      {
        subtopic: 'Short-Run Phillips Curve (SRPC)',
        points: [
          'Inverse relationship between inflation and unemployment.',
          'Demand-pull inflation → movement along SRPC: lower unemployment, higher inflation.',
          'High unemployment → risk of deflation; curve may dip below x-axis.',
        ],
      },
      {
        subtopic: 'Shifts in SRPC',
        points: [
          'Caused by supply shocks or changes in inflation expectations.',
        ],
      },
      {
        subtopic: 'Recession and Deflation',
        points: [
          'AD falls → unemployment rises → inflation falls or deflation occurs.',
          'SRAS constant → economy contracts.',
        ],
      },
      {
        subtopic: 'Supply-Side Boom',
        points: [
          'SRAS shifts right → price level falls, output rises → unemployment falls.',
        ],
      },
      {
        subtopic: 'Stagflation (Cost-Push Inflation)',
        points: [
          'SRAS shifts left → inflation + high unemployment.',
          'One of the worst macroeconomic scenarios.',
        ],
      },
      {
        subtopic: 'Long-Run Phillips Curve (LRPC)',
        points: [
          'Vertical at natural rate of unemployment (e.g., 4%).',
          'No tradeoff between inflation and unemployment in the long run.',
        ],
      },
    ],
  },
  {
    key: '5.3',
    title: '5.3 – Money Growth and Inflation',
    bullets: [
      {
        subtopic: 'Inflation and Monetary Policy',
        points: [
          'Inflation = increase in money supply.',
          'Expansionary policy closes recessionary gaps.',
          'Deflation = decrease in money supply → contraction.',
        ],
      },
      {
        subtopic: 'Types of Inflation',
        points: [
          'Demand-Pull Inflation: Caused by increased consumer spending → AD shifts right. Increases both price level and real GDP.',
          'Cost-Push Inflation: Caused by decreased supply (e.g., resource shortage). SRAS shifts left → higher prices, lower output.',
          'Wage-Price Spiral: Cost-push and demand-pull combined. Higher prices → higher wages → higher production costs → more inflation.',
          'Double shift: AD right + SRAS left → higher PL, stagnant GDP.',
        ],
      },
      {
        subtopic: 'Inflation from Money Supply Changes',
        points: [
          'Fed increases MS → lower interest rates → increased money quantity → inflation.',
          'Theory of Monetary Neutrality: Money affects nominal variables, not real ones. Long-run: more money just increases price levels.',
          'Quantity Theory of Money: MV = PQ (Money Supply × Velocity = Price Level × Real GDP). If M increases, then P, Q, or V must adjust. In long-run, more M → more P (inflation).',
        ],
      },
    ],
  },
  {
    key: '5.4',
    title: '5.4 – Deficits and the National Debt',
    bullets: [
      {
        subtopic: 'Key Terms',
        points: [
          'Fiscal Stimulus: Expansionary fiscal policy.',
          'Fiscal Restraint: Contractionary fiscal policy.',
          'Budget Surplus: Revenues > Expenditures.',
          'Budget Deficit: Expenditures > Revenues.',
          'National Debt: Accumulated deficits.',
        ],
      },
      {
        subtopic: 'US National Debt',
        points: [
          '$31 trillion as of 2023.',
          'Mandatory spending includes: Social Security, Medicare, interest payments.',
        ],
      },
      {
        subtopic: 'State and Local Debts',
        points: [
          'Recessionary Gap: Low tax revenue, high spending → deficit.',
          'Inflationary Gap: High tax revenue, low spending → surplus.',
        ],
      },
      {
        subtopic: 'Balanced Budget Issues',
        points: [
          'Cutting spending = recession risk.',
          'Cutting taxes = inflation risk.',
        ],
      },
    ],
  },
  {
    key: '5.5',
    title: '5.5 – Crowding Out',
    bullets: [
      {
        subtopic: 'Definition',
        points: [
          'Government borrowing reduces private investment by increasing interest rates.',
        ],
      },
      {
        subtopic: 'Loanable Funds Market',
        points: [
          'Gov’t demand ↑ → interest rates ↑ → private investment ↓.',
        ],
      },
      {
        subtopic: 'Crowding Out Process',
        points: [
          'Gov’t increases G → AD shifts right → economic growth.',
          'Loanable funds demand ↑ → real interest rate ↑.',
          'Private sector borrowing ↓ → investment ↓.',
        ],
      },
      {
        subtopic: 'Consequences',
        points: [
          'May prevent full recovery from recession.',
          'Long-run: Reduced capital formation → slower growth.',
        ],
      },
      {
        subtopic: 'Not Always an Issue',
        points: [
          'If enough funds available, crowding out minimal.',
          'If economy underutilized, gov’t spending can be effective.',
        ],
      },
    ],
  },
  {
    key: '5.6',
    title: '5.6 – Economic Growth',
    bullets: [
      {
        subtopic: 'GDP per Capita',
        points: [
          'Real GDP / Population.',
          'Measures standard of living.',
        ],
      },
      {
        subtopic: 'Aggregate Production Function',
        points: [
          'Shows relationship between output and capital/labor inputs.',
        ],
      },
      {
        subtopic: 'Production Possibilities Curve (PPC)',
        points: [
          'PPC shifts outward if:',
          '  Resource quantity ↑.',
          '  Resource quality ↑.',
          '  Technology improves.',
        ],
      },
      {
        subtopic: 'Productivity',
        points: [
          'Output per worker.',
          'Higher productivity = higher growth.',
        ],
      },
      {
        subtopic: 'Determinants of Productivity',
        points: [
          'Physical capital: Machines/tools used in production.',
          'Human capital: Education, skills, health.',
          'Natural resources: Renewable and nonrenewable.',
          'Technology: Innovation in production methods.',
        ],
      },
    ],
  },
  {
    key: '5.7',
    title: '5.7 – Public Policy and Economic Growth',
    bullets: [
      {
        subtopic: 'Types of Policies to Promote Growth',
        points: [
          'Education Spending: Improves human capital → more productive workforce.',
          'Infrastructure Spending: Enhances efficiency → supports production and trade.',
          'Innovation Incentives: Patents, R&D funding → encourages new tech.',
          'Employment Policies: More workers → more output.',
        ],
      },
      {
        subtopic: 'Supply-Side Fiscal Policy',
        points: [
          'Focused on reducing taxes to boost AS.',
          'Encourages work, saving, investment, and innovation.',
        ],
      },
      {
        subtopic: 'Saving and Investment',
        points: [
          'Investment Tax Credit: Incentivizes businesses to invest in capital.',
          'Lower Income Taxes: Increases disposable income → ↑ consumption and saving. Stimulates both AD and AS.',
        ],
      },
      {
        subtopic: 'Productivity Incentives',
        points: [
          'Higher after-tax income → greater labor effort.',
        ],
      },
      {
        subtopic: 'Risk-Taking',
        points: [
          'Lower capital gains tax → more entrepreneurial activity.',
        ],
      },
    ],
  },
];

const APMacroUnit5 = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleTopic = (key: string) => {
    setOpenTopic(openTopic === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => navigate('/ap-macroeconomics-study-guide')}
          className="mb-6 px-4 py-2 rounded-lg bg-white text-cyan-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to Units
        </button>
        {/* Tabs */}
        <div className="flex justify-center border-b-2 border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${
              activeTab === 'topics'
                ? 'border-b-4 border-cyan-600 text-cyan-700'
                : 'text-slate-500 hover:text-cyan-600'
            }`}
          >
            Key Topics
          </button>
          <button
            onClick={() => navigate('/ap-macroeconomics/unit/5/quiz')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${
              activeTab === 'quiz'
                ? 'border-b-4 border-cyan-600 text-cyan-700'
                : 'text-slate-500 hover:text-cyan-600'
            }`}
          >
            Take Quiz
          </button>
        </div>
        {/* Content */}
        {activeTab === 'topics' && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-cyan-700">
                AP Macroeconomics Unit 5: Long-Run Consequences of Stabilization Policies
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                Fiscal and monetary policy, Phillips curve, inflation, debt, crowding out, and economic growth.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="space-y-4">
                {unit5Content.map((topic) => (
                  <div
                    key={topic.key}
                    className="border-b border-slate-200 last:border-b-0 pb-4"
                  >
                    <button
                      onClick={() => toggleTopic(topic.key)}
                      className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-cyan-700">
                        {topic.title}
                      </h3>
                      <span className="text-2xl text-slate-500">
                        {openTopic === topic.key ? '-' : '+'}
                      </span>
                    </button>
                    {openTopic === topic.key && (
                      <div className="p-4 bg-slate-50 rounded-b-lg">
                        <div className="space-y-4">
                          {topic.bullets.map((section, idx) => (
                            <div key={idx}>
                              <div className="font-semibold text-cyan-800 mb-1">
                                {section.subtopic}
                              </div>
                              <ul className="list-disc ml-6 text-slate-700 space-y-1">
                                {section.points.map((point, i) =>
                                  point.startsWith('  ')
                                    ? (
                                      <li
                                        key={i}
                                        style={{
                                          listStyle: 'none',
                                          marginLeft: '1.5rem',
                                        }}
                                      >
                                        {point.trim()}
                                      </li>
                                    )
                                    : (
                                      <li key={i}>{point}</li>
                                    )
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {activeTab === 'quiz' && (
          <div className="text-center mt-12">
            {/* Redirect to quiz page */}
            {(() => {
              navigate('/ap-macroeconomics/unit/5/quiz');
              return null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default APMacroUnit5;
