import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit4Content = [
  {
    key: '4.1',
    title: '4.1 – Financial Assets',
    bullets: [
      {
        subtopic: 'Physical vs Financial Investment',
        points: [
          'Firms invest in physical capital only if the expected return ≥ real interest rate.',
          'Financial investments provide a rate of return (profit or loss over time).',
        ],
      },
      {
        subtopic: 'Key Financial Concepts',
        points: [
          'Liquidity: Ease of converting assets to cash.',
          '  Most liquid asset = cash',
          'Rate of Return: Return on an investment over time.',
          '  Higher returns are preferred.',
          'Risk: Probability that actual returns differ from expected.',
        ],
      },
      {
        subtopic: 'Types of Financial Assets',
        points: [
          'Stocks: Represent ownership (equity) in a firm. Issuing stock = equity financing.',
          'Bonds: Certificates of indebtedness; used for borrowing (debt financing). Pay fixed interest over time; price inversely related to interest rates. Bought/sold on secondary markets.',
          'Loans: Borrowed money repaid with interest (e.g., credit cards).',
          'Bank Deposits: Money in checking accounts; available on demand (e.g., debit cards). Typically earns no interest.',
        ],
      },
      {
        subtopic: 'Bond Prices vs Interest Rates',
        points: [
          'Inverse relationship.',
          'If interest rates fall → bond prices rise.',
          'If interest rates rise → bond prices fall.',
        ],
      },
    ],
  },
  {
    key: '4.2',
    title: '4.2 – Nominal vs Real Interest Rates',
    bullets: [
      {
        subtopic: 'Interest Rate Definitions',
        points: [
          'Nominal Interest Rate: Not adjusted for inflation.',
          'Real Interest Rate: Adjusted for inflation; reflects actual purchasing power.',
        ],
      },
      {
        subtopic: 'Formulas',
        points: [
          'Nominal = Real + Inflation',
          'Real = Nominal – Inflation',
        ],
      },
      {
        subtopic: 'Implications',
        points: [
          'Positive real interest → gain in purchasing power.',
          'Negative real interest → loss in purchasing power.',
          'Negative real rates encourage borrowing and discourage saving.',
        ],
      },
      {
        subtopic: 'Impact on Behavior',
        points: [
          'Consumers and businesses may borrow more if real interest is low/negative.',
          'Investors may face reduced returns and seek alternative assets.',
        ],
      },
    ],
  },
  {
    key: '4.3',
    title: '4.3 – Definition, Measurement, and Functions of Money',
    bullets: [
      {
        subtopic: 'Types of Money',
        points: [
          'Fiat Money: No intrinsic value; accepted due to government backing.',
          'Commodity Money: Has intrinsic value (e.g., gold, tobacco).',
        ],
      },
      {
        subtopic: 'Functions of Money',
        points: [
          'Medium of Exchange: Used to buy goods/services.',
          'Unit of Account: Standard of value; allows price comparisons.',
          'Store of Value: Holds purchasing power over time (unless inflation occurs).',
        ],
      },
      {
        subtopic: 'Money Supply Measures',
        points: [
          'M1: Most liquid—currency, checking deposits, traveler’s checks.',
          'M2: M1 + savings deposits, time deposits, money market funds.',
        ],
      },
      {
        subtopic: 'Monetary Base (MB)',
        points: [
          'Currency in circulation + bank reserves.',
          'Used for final settlement; more narrow than M1 or M2.',
        ],
      },
    ],
  },
  {
    key: '4.4',
    title: '4.4 – Banking and the Expansion of the Money Supply',
    bullets: [
      {
        subtopic: 'Fractional Reserve Banking',
        points: [
          'Banks hold a fraction of deposits in reserve; lend the rest.',
          'Reserve Ratio (rr): Required percentage of deposits to be held in reserve.',
        ],
      },
      {
        subtopic: 'Key Concepts',
        points: [
          'Reserve Requirement: Set by Fed; minimum rr banks must maintain.',
          'Excess Reserves: Reserves above what’s required; can be loaned out.',
        ],
      },
      {
        subtopic: 'Assets vs Liabilities',
        points: [
          'Assets: Loans, reserves.',
          'Liabilities: Deposits, owed funds.',
        ],
      },
      {
        subtopic: 'T-Account Example',
        points: [
          'Deposit = $1,000; rr = 10%',
          '$100 → required reserve',
          '$900 → excess reserve (can be loaned)',
        ],
      },
      {
        subtopic: 'Money Multiplier',
        points: [
          'Formula: 1 / rr',
          'Determines how much total money can be created from excess reserves.',
          'Can be limited by:',
          '  Banks holding more reserves',
          '  Borrowers holding cash',
          '  Reduced willingness to borrow/lend',
        ],
      },
    ],
  },
  {
    key: '4.5',
    title: '4.5 – The Money Market',
    bullets: [
      {
        subtopic: 'Money Demand',
        points: [
          'Transaction Demand: Money needed for everyday purchases. Increases with nominal GDP.',
          'Asset Demand: Holding money instead of interest-bearing assets. Inversely related to interest rate.',
          'Total Demand for Money: Sum of transaction and asset demand.',
        ],
      },
      {
        subtopic: 'Money Demand Curve',
        points: [
          'Downward sloping due to asset demand being sensitive to interest rates.',
        ],
      },
      {
        subtopic: 'Shifters of Money Demand',
        points: [
          'Price level',
          'Real GDP',
          'Transaction costs',
        ],
      },
      {
        subtopic: 'Money Supply',
        points: [
          'Set by central bank (Fed); vertical on graph (not dependent on interest rate).',
        ],
      },
      {
        subtopic: 'Monetary Policy Tools',
        points: [
          'Open Market Operations (OMOs): Buying/selling bonds.',
          'Discount Rate: Interest rate for banks borrowing from Fed.',
          'Reserve Requirements: Percentage of deposits banks must hold.',
        ],
      },
      {
        subtopic: 'Equilibrium',
        points: [
          'Where money demand intersects with money supply—determines nominal interest rate.',
        ],
      },
    ],
  },
  {
    key: '4.6',
    title: '4.6 – Monetary Policy',
    bullets: [
      {
        subtopic: 'Goals',
        points: [
          'Promote full employment, price stability, and economic growth.',
        ],
      },
      {
        subtopic: 'Types',
        points: [
          'Expansionary Policy (Easy Money): Used during recessions. Fed increases money supply → lowers interest rates → ↑ AD.',
          'Contractionary Policy (Tight Money): Used during inflation. Fed decreases money supply → raises interest rates → ↓ AD.',
        ],
      },
      {
        subtopic: 'Tools of Monetary Policy',
        points: [
          'Open Market Operations (OMOs): Fed buys bonds → increases money supply → lowers interest rate. Fed sells bonds → decreases money supply → raises interest rate.',
          'Federal Funds Rate: Rate at which banks lend to each other overnight. Targeted by Fed through OMOs.',
          'Discount Rate: Rate banks pay to borrow from the Fed. Lower rate = more borrowing = ↑ money supply.',
          'Reserve Requirement: Lower requirement = more lending = ↑ money supply.',
        ],
      },
    ],
  },
  {
    key: '4.7',
    title: '4.7 – The Loanable Funds Market',
    bullets: [
      {
        subtopic: 'Demand for Loanable Funds',
        points: [
          'Comes from borrowers (households, firms, government).',
          'Inversely related to real interest rate.',
        ],
      },
      {
        subtopic: 'Shifters',
        points: [
          'Foreign demand',
          'Domestic borrowing/lending',
          'Government deficit spending',
          'Future expectations',
        ],
      },
      {
        subtopic: 'Supply of Loanable Funds',
        points: [
          'Comes from savers (households, foreigners, banks).',
          'Positively related to real interest rate.',
        ],
      },
      {
        subtopic: 'Shifters',
        points: [
          'Savings rate',
          'Future expectations',
          'Lending at discount window',
          'Foreign purchases of domestic assets',
        ],
      },
      {
        subtopic: 'Market Outcome',
        points: [
          'Real interest rate adjusts to balance supply and demand.',
          '↑ Demand → ↑ Real interest rate',
          '↑ Supply → ↓ Real interest rate',
        ],
      },
    ],
  },
];

const APMacroUnit4 = () => {
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
            onClick={() => navigate('/ap-macroeconomics/unit/4/quiz')}
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
                AP Macroeconomics Unit 4: Financial Sector
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                Financial assets, interest rates, money, banking, monetary policy, and loanable funds.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="space-y-4">
                {unit4Content.map((topic) => (
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
              navigate('/ap-macroeconomics/unit/4/quiz');
              return null;
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default APMacroUnit4;
