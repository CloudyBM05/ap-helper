import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit6Content = [
  {
    key: '6.1',
    title: '6.1 – Balance of Payment Accounts',
    bullets: [
      {
        subtopic: 'Balance of Payments Statement',
        points: [
          'Summary of all payments between the US and foreign countries, tracking inflows and outflows.',
        ],
      },
      {
        subtopic: 'Current Account',
        points: [
          'Records trade in goods/services and investment income flows.',
          'Deficit means US sends more dollars abroad than it receives.',
          'Example: Dividends sent to foreign investors.',
        ],
      },
      {
        subtopic: 'Capital (Financial) Account',
        points: [
          'Records flow of investments in real/financial assets between nations.',
          'Surplus means more foreign capital inflows than US investment abroad.',
          'Example: Foreign firm buying a US factory.',
        ],
      },
      {
        subtopic: 'Official Reserves Account',
        points: [
          'Fed’s adjustments to keep the balance of payments at zero by adding/subtracting foreign currency reserves.',
        ],
      },
      {
        subtopic: 'Deficit and Surplus',
        points: [
          'When combined current and capital accounts don’t balance, Fed intervenes by adjusting reserves.',
        ],
      },
      {
        subtopic: 'Circular Flow',
        points: [
          'Dollars sent abroad equal dollars received from foreigners, keeping accounts balanced through trade and capital flows.',
        ],
      },
    ],
  },
  {
    key: '6.2',
    title: '6.2 – Exchange Rates',
    bullets: [
      {
        subtopic: 'Exchange Rate',
        points: [
          'Price of one currency in terms of another (e.g., 2 USD = 1 Euro).',
        ],
      },
      {
        subtopic: 'Determinants of Exchange Rates',
        points: [
          'Consumer tastes: More demand for foreign goods depreciates the dollar; more demand for US goods appreciates it.',
          'Relative incomes: Growing incomes increase demand for imports and foreign currency.',
          'Speculation: Investors trade currencies expecting future value changes, affecting demand.',
          'Example: If US interest rates fall relative to Japan’s, yen appreciates, dollar depreciates.',
        ],
      },
    ],
  },
  {
    key: '6.3',
    title: '6.3 – Foreign Exchange Market',
    bullets: [
      {
        subtopic: 'Foreign Exchange Demand',
        points: [
          'Quantity of currency buyers want at different exchange rates; inverse relationship with exchange rate.',
        ],
      },
      {
        subtopic: 'Foreign Exchange Supply',
        points: [
          'Quantity of currency sellers offer at different rates; direct relationship with exchange rate.',
        ],
      },
      {
        subtopic: 'FOREX Market Equilibrium',
        points: [
          'When supply equals demand for a currency at a certain rate.',
        ],
      },
      {
        subtopic: 'Connection to Monetary Policy',
        points: [
          'Increasing money supply lowers interest rates → dollar depreciates → US exports become cheaper → aggregate demand (AD) increases.',
          'Decreasing money supply raises interest rates → dollar appreciates → US exports more expensive → AD decreases.',
        ],
      },
      {
        subtopic: 'Factors increasing dollar demand and appreciation',
        points: [
          'Strong European demand for US goods.',
          'Rising European incomes.',
          'Falling US price levels.',
          'Speculation favoring the dollar.',
          'Higher US interest rates.',
        ],
      },
    ],
  },
  {
    key: '6.4',
    title: '6.4 – Effect of Changes in Policies & Economic Conditions on Foreign Exchange Market',
    bullets: [
      {
        subtopic: 'Determinants Changing Currency Demand or Supply',
        points: [
          'Foreign tastes.',
          'Trade prices.',
          'Income levels.',
          'Real interest rates.',
        ],
      },
      {
        subtopic: 'Fiscal Policy Impact',
        points: [
          'Expansionary (↑ spending or ↓ taxes) increases AD, GDP, prices → can affect currency value.',
          'Contractionary (↓ spending or ↑ taxes) decreases AD, GDP, prices → affects currency inversely.',
        ],
      },
      {
        subtopic: 'Monetary Policy Impact',
        points: [
          'Expansionary monetary policy (↓ reserve ratio, ↓ discount rate, buying bonds) → increases money supply → lowers interest rates → raises AD and price level → affects exchange rates.',
          'Contractionary monetary policy (↑ reserve ratio, ↑ discount rate, selling bonds) → decreases money supply → raises interest rates → lowers AD and price level → impacts exchange rates.',
        ],
      },
      {
        subtopic: 'Tariffs',
        points: [
          'Revenue tariff: Tax on imported goods not made domestically; raises some government revenue without much trade distortion.',
          'Protective tariff: Tax on domestically produced goods to protect from foreign competition; raises domestic prices, reduces imports, creates deadweight loss.',
        ],
      },
      {
        subtopic: 'Economic Effects of Tariffs',
        points: [
          'Higher consumer prices and less consumption.',
          'Increased domestic production.',
          'Reduced imports.',
          'Government revenue raised (on revenue tariffs).',
          'Inefficiency due to protection of less efficient domestic producers.',
        ],
      },
      {
        subtopic: 'Quotas',
        points: [
          'Limit on quantity of imports allowed.',
          'Similar effects to tariffs but no government revenue.',
          'Both tariffs and quotas increase prices, reduce consumer surplus, protect inefficient producers, and cause deadweight loss.',
        ],
      },
    ],
  },
  {
    key: '6.5',
    title: '6.5 – Changes in the Foreign Exchange Market and Net Exports',
    bullets: [
      {
        subtopic: 'Appreciating Currency',
        points: [
          'Currency value rises relative to another currency.',
        ],
      },
      {
        subtopic: 'Depreciating Currency',
        points: [
          'Currency value falls relative to another currency.',
        ],
      },
      {
        subtopic: 'Impact on Net Exports',
        points: [
          'Decrease in net exports leads to lower AD, reduced production and employment.',
          'Increase in net exports raises AD, production, and employment.',
        ],
      },
    ],
  },
  {
    key: '6.6',
    title: '6.6 – Real Interest Rates and International Capital Flows',
    bullets: [
      {
        subtopic: 'Capital Flow',
        points: [
          'Inbound capital flow: Foreign investment in domestic assets, stimulated by high real interest rates.',
          'Outbound capital flow: Domestic investment in foreign assets, stimulated by lower domestic interest rates.',
        ],
      },
      {
        subtopic: 'Impact on Net Exports',
        points: [
          'Higher domestic real interest rates attract foreign capital, currency appreciates, exports become more expensive, net exports decrease.',
          'Lower domestic real interest rates lead to currency depreciation, cheaper exports, increased net exports.',
        ],
      },
      {
        subtopic: 'Central Banks and Domestic Interest Rates',
        points: [
          'Central banks influence interest rates through monetary tools (open market operations, discount rates, reserve requirements).',
          'Higher central bank rates encourage banks to raise their rates, attracting foreign investment.',
          'Higher bank loan and deposit rates affect borrowing, saving, and overall interest rate levels in the economy.',
        ],
      },
    ],
  },
];

const APMacroUnit6 = () => {
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
            onClick={() => navigate('/ap-macroeconomics/unit/6/quiz')}
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
                AP Macroeconomics Unit 6: Open Economy—International Trade and Finance
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                Balance of payments, exchange rates, foreign exchange, trade policy, and capital flows.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="space-y-4">
                {unit6Content.map((topic) => (
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
              navigate('/ap-macroeconomics/unit/6/quiz');
              return null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default APMacroUnit6;
