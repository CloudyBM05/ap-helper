import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit3Content = [
  {
    key: '3.1',
    title: '3.1 – Aggregate Demand (AD)',
    bullets: [
      {
        subtopic: 'Definition & Formula',
        points: [
          'Inverse relationship between aggregate price level and real GDP demanded.',
          'Formula: AD = C + I + G + (X − M)',
        ],
      },
      {
        subtopic: 'AD Curve Shape',
        points: [
          'Wealth Effect: Higher prices lower real wealth → ↓ consumption.',
          'Interest Rate Effect: Higher prices → ↑ interest rates → ↓ investment/consumption.',
          'Foreign Sector Substitution Effect: U.S. goods become more expensive → ↑ imports, ↓ exports.',
        ],
      },
      {
        subtopic: 'Shifts in AD',
        points: [
          'Increase AD (→):',
          '  ↑ Consumer confidence/income',
          '  ↓ Taxes',
          '  ↑ Government spending',
          '  ↑ Foreign incomes or tastes for U.S. goods',
          'Decrease AD (←):',
          '  Opposite of above',
        ],
      },
      {
        subtopic: 'Component Breakdown',
        points: [
          'Consumer Spending (C): Driven by income, expectations, taxes.',
          'Investment (I): Based on interest rates, expected profitability.',
          'Government (G): Direct impact on AD via spending, taxes, transfers.',
          'Net Exports (X − M): Affected by global conditions and exchange rates.',
        ],
      },
    ],
  },
  {
    key: '3.2',
    title: '3.2 – Spending and Tax Multipliers',
    bullets: [
      {
        subtopic: 'Multiplier Effect',
        points: [
          'Initial spending triggers a chain reaction in consumption.',
        ],
      },
      {
        subtopic: 'MPC & MPS',
        points: [
          'MPC (Marginal Propensity to Consume): Portion of income spent.',
          'MPS (Marginal Propensity to Save): Portion of income saved.',
          'MPC + MPS = 1',
        ],
      },
      {
        subtopic: 'Spending Multiplier',
        points: [
          'Formula: 1 / MPS',
          'Example: MPS = 0.35 → Multiplier = 2.86',
        ],
      },
      {
        subtopic: 'Tax Multiplier',
        points: [
          'Formula: –MPC / MPS',
          'Always smaller than the spending multiplier.',
          'Example: MPC = 0.8, Tax ∆ = $50 → Multiplier = –4 → GDP ∆ = –$200',
        ],
      },
    ],
  },
  {
    key: '3.3',
    title: '3.3 – Short-Run Aggregate Supply (SRAS)',
    bullets: [
      {
        subtopic: 'SRAS Definition',
        points: [
          'Positive relationship between price level and quantity of goods/services firms are willing to produce short-term.',
        ],
      },
      {
        subtopic: 'Short-Run Dynamics',
        points: [
          'Input prices are sticky.',
          'SRAS is upward-sloping.',
        ],
      },
      {
        subtopic: 'Three Ranges of SRAS',
        points: [
          'Stage 1 (GDPu): Recession, lots of unemployment.',
          'Stage 2 (GDPf): Near full employment, rising costs.',
          'Stage 3 (GDPc): Economy at full capacity, SRAS nearly vertical.',
        ],
      },
      {
        subtopic: 'SRAS Shifts',
        points: [
          'Right (↑ AS): ↓ Input prices, ↓ business taxes, deregulation, good weather.',
          'Left (↓ AS): ↑ Input prices, ↑ regulation, war/natural disasters.',
        ],
      },
    ],
  },
  {
    key: '3.4',
    title: '3.4 – Long-Run Aggregate Supply (LRAS)',
    bullets: [
      {
        subtopic: 'LRAS Definition',
        points: [
          'Output possible at full employment (GDPf), vertical at GDPf.',
        ],
      },
      {
        subtopic: 'Long-Run Characteristics',
        points: [
          'Input prices fully adjust.',
          'AS is vertical (Classical model).',
        ],
      },
      {
        subtopic: 'LRAS Shifts',
        points: [
          '↑ Resources (labor, capital, natural resources)',
          '↑ Productivity (technology, training)',
          '↑ Incentives (investment, policy)',
          'Example: 1990s tech boom → ↑ LRAS → long-term economic growth.',
        ],
      },
    ],
  },
  {
    key: '3.5',
    title: '3.5 – Equilibrium in AD-AS Model',
    bullets: [
      {
        subtopic: 'Equilibrium',
        points: [
          'Where AD intersects SRAS (and LRAS for full employment).',
        ],
      },
      {
        subtopic: 'Types of Gaps',
        points: [
          'Recessionary Gap: GDP < GDPf → ↑ unemployment.',
          'Inflationary Gap: GDP > GDPf → ↑ inflation.',
        ],
      },
      {
        subtopic: 'Graph Interpretation',
        points: [
          'PL (Price Level) vs Real GDP.',
        ],
      },
    ],
  },
  {
    key: '3.6',
    title: '3.6 – Changes in the AD-AS Model in the Short Run',
    bullets: [
      {
        subtopic: 'Determinants of GDP (AD components)',
        points: [
          'Consumer spending, investment, government, net exports.',
        ],
      },
      {
        subtopic: 'Supply Shocks',
        points: [
          'Positive: ↓ Input prices, ↑ productivity → SRAS right.',
          'Negative: ↑ Input prices (e.g., oil embargo) → SRAS left.',
        ],
      },
    ],
  },
  {
    key: '3.7',
    title: '3.7 – Long-Run Self-Adjustment',
    bullets: [
      {
        subtopic: 'Recessionary Adjustment',
        points: [
          '↓ AD → recession → ↓ input demand → ↓ input prices → SRAS shifts right → restores GDPf.',
        ],
      },
      {
        subtopic: 'Inflationary Adjustment',
        points: [
          '↑ AD → inflationary gap → ↑ input demand → ↑ input prices → SRAS shifts left → GDP returns to GDPf.',
        ],
      },
      {
        subtopic: 'Key Concept',
        points: [
          'Prices adjust over time to restore full employment without government intervention (Classical view).',
        ],
      },
    ],
  },
  {
    key: '3.8',
    title: '3.8 – Fiscal Policy',
    bullets: [
      {
        subtopic: 'Definition',
        points: [
          'Use of government spending/taxes to influence AD.',
        ],
      },
      {
        subtopic: 'Types',
        points: [
          'Expansionary Policy: ↑ G or ↓ T to ↑ AD → close recessionary gap.',
          'Multiplier: Spending > Taxes in effect size.',
          'Contractionary Policy: ↓ G or ↑ T to ↓ AD → close inflationary gap.',
        ],
      },
      {
        subtopic: 'Sticky Prices',
        points: [
          'Keynesian View: Prices/wages slow to fall.',
          'Classical View: Prices/wages adjust quickly.',
        ],
      },
      {
        subtopic: 'Example Calculation',
        points: [
          'MPC = 0.5 → Spending Multiplier = 2',
          'To fill a $50B gap → Spend $25B OR',
          'Tax multiplier = 1 → Tax cut = $50B',
        ],
      },
    ],
  },
  {
    key: '3.9',
    title: '3.9 – Automatic Stabilizers',
    bullets: [
      {
        subtopic: 'Definition',
        points: [
          'Fiscal tools built into the system to stabilize the economy automatically (without new laws).',
        ],
      },
      {
        subtopic: 'During Recession',
        points: [
          '↑ Unemployment → ↑ Gov transfers (e.g., TANF) → ↑ AD',
        ],
      },
      {
        subtopic: 'During Inflation',
        points: [
          '↑ Incomes → ↑ Progressive taxes → ↓ AD',
        ],
      },
      {
        subtopic: 'Examples',
        points: [
          'Unemployment insurance',
          'Welfare programs',
          'Progressive income tax',
        ],
      },
    ],
  },
];

const APMacroUnit3 = () => {
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
            onClick={() => navigate('/ap-macroeconomics/unit/3/quiz')}
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
                AP Macroeconomics Unit 3: National Income and Price Determination
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                Aggregate demand, aggregate supply, equilibrium, fiscal policy, and automatic stabilizers.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="space-y-4">
                {unit3Content.map((topic) => (
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
              navigate('/ap-macroeconomics/unit/3/quiz');
              return null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default APMacroUnit3;
