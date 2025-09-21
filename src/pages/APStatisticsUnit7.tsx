import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit7Content = [
  {
    key: '7.1',
    title: '7.1 – Introducing Statistics: Should I Worry About Error?',
    bullets: [
      {
        subtopic: 'Sampling Variability',
        points: [
          'Sampling variability causes estimates to differ from the true population parameters.',
          'Errors can be random (sampling error) or systematic (bias).',
          'Importance of understanding sampling error before making inferences.',
          'Hypothesis testing and confidence intervals help quantify uncertainty.',
        ],
      },
    ],
  },
  {
    key: '7.2',
    title: '7.2 – Constructing a Confidence Interval for a Population Mean',
    bullets: [
      {
        subtopic: 'When to Use t-distribution',
        points: [
          'Use t-distribution when population standard deviation (σ) is unknown.',
        ],
      },
      {
        subtopic: 'Confidence Interval Formula',
        points: [
          '\u0305x ± t*\u2091\u2090 × s/√n',
          'Degrees of freedom: df = n - 1.',
        ],
      },
      {
        subtopic: 'Conditions',
        points: [
          'Random sample,',
          'Normal population or large enough n,',
          'Sample less than 10% of population.',
          'Larger n → t-distribution approaches normal.',
        ],
      },
    ],
  },
  {
    key: '7.3',
    title: '7.3 – Justifying a Claim About a Population Mean Based on a Confidence Interval',
    bullets: [
      {
        subtopic: 'Interpretation',
        points: [
          '“We are (1−α)100% confident that μ lies in the interval.”',
          'If a hypothesized value is not in the CI, it is not plausible as the true mean.',
          'Wider intervals → more confidence but less precision.',
          'Larger sample size → narrower intervals.',
        ],
      },
    ],
  },
  {
    key: '7.4',
    title: '7.4 – Setting Up a Test for a Population Mean',
    bullets: [
      {
        subtopic: 'Hypotheses',
        points: [
          'H₀: μ = μ₀, Hₐ: μ ≠ μ₀ (or one-sided alternatives)',
        ],
      },
      {
        subtopic: 'Assumptions',
        points: [
          'Random sampling,',
          'Normality or large n,',
          'Independence.',
        ],
      },
      {
        subtopic: 'Test Statistic',
        points: [
          'Use t-distribution for test statistic.',
        ],
      },
    ],
  },
  {
    key: '7.5',
    title: '7.5 – Carrying Out a Test for a Population Mean',
    bullets: [
      {
        subtopic: 'Test Statistic',
        points: [
          't = (\u0305x − μ₀) / (s/√n)',
          'Find P-value using t-distribution with df = n - 1.',
          'Reject H₀ if P-value < significance level α.',
          'Interpret in context.',
        ],
      },
      {
        subtopic: 'Example',
        points: [
          'Air-conditioning units power usage test showing significance at 5% but not 1%.',
        ],
      },
    ],
  },
  {
    key: '7.6',
    title: '7.6 – Confidence Intervals for the Difference of Two Means',
    bullets: [
      {
        subtopic: 'Formula',
        points: [
          '(\u0305x₁ − \u0305x₂) ± t*\u2091\u2090 × sqrt[ s₁²/n₁ + s₂²/n₂ ]',
          'Degrees of freedom typically calculated with a formula or approximated conservatively.',
        ],
      },
      {
        subtopic: 'Conditions',
        points: [
          'Two independent random samples,',
          'Normality or large sample sizes n₁, n₂ ≥ 30.',
        ],
      },
      {
        subtopic: 'Example',
        points: [
          'Difference in accidents per month between two departments.',
        ],
      },
    ],
  },
  {
    key: '7.7',
    title: '7.7 – Justifying a Claim About the Difference of Two Means Based on a Confidence Interval',
    bullets: [
      {
        subtopic: 'Interpretation',
        points: [
          'If 0 is not in the interval, conclude a significant difference.',
          'If 0 is in the interval, no evidence of difference.',
          'Interpret the confidence interval in context.',
        ],
      },
    ],
  },
  {
    key: '7.8',
    title: '7.8 – Setting Up a Test for the Difference of Two Population Means',
    bullets: [
      {
        subtopic: 'Hypotheses',
        points: [
          'H₀: μ₁ − μ₂ = 0, Hₐ: μ₁ − μ₂ ≠ 0 (or one-sided)',
        ],
      },
      {
        subtopic: 'Conditions',
        points: [
          'Check conditions for independent samples and normality or large n.',
        ],
      },
      {
        subtopic: 'Test',
        points: [
          'Use two-sample t-test.',
        ],
      },
    ],
  },
  {
    key: '7.9',
    title: '7.9 – Carrying Out a Test for the Difference of Two Population Means',
    bullets: [
      {
        subtopic: 'Test Statistic',
        points: [
          't = [ (\u0305x₁ − \u0305x₂) − 0 ] / sqrt[ s₁²/n₁ + s₂²/n₂ ]',
          'Calculate P-value with df as above.',
          'Make decision based on P-value and interpret.',
        ],
      },
      {
        subtopic: 'Example',
        points: [
          'Sales rep testing difference in computer downtime found no significant evidence.',
        ],
      },
    ],
  },
  {
    key: '7.10',
    title: '7.10 – Skills Focus: Selecting, Implementing, and Communicating Inference Procedures',
    bullets: [
      {
        subtopic: 'Best Practices',
        points: [
          'Choose correct inference method based on data type and study design.',
          'Check assumptions thoroughly.',
          'Use technology (TI-84, Casio Prizm, etc.) for calculations.',
          'Clearly state conclusions in context.',
          'Communicate type of errors and implications (Type I and Type II errors, power).',
          'Understand paired data requires one-sample inference on differences.',
          'Use simulation methods for P-value estimation when appropriate.',
        ],
      },
    ],
  },
];

const APStatisticsUnit7 = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleTopic = (key: string) => {
    setOpenTopic(openTopic === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-purple-50 text-slate-800">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        <button
          onClick={() => navigate('/ap-statistics-study-guide')}
          className="mb-6 px-4 py-2 rounded-lg bg-white text-purple-600 font-semibold hover:bg-purple-100 transition-colors shadow-sm flex items-center gap-2"
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
        <div className="flex justify-center border-b-2 border-purple-200 mb-8">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${
              activeTab === 'topics'
                ? 'border-b-4 border-purple-600 text-purple-700'
                : 'text-slate-500 hover:text-purple-600'
            }`}
          >
            Key Topics
          </button>
          <button
            onClick={() => navigate('/ap-statistics/unit/7/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-purple-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>
        {/* Content */}
        {activeTab === 'topics' && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-purple-700">
                AP Statistics Unit 7: Inference for Quantitative Data – Means
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                Confidence intervals, significance tests, and inference for means and differences of means.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="space-y-4">
                {unit7Content.map((topic) => (
                  <div
                    key={topic.key}
                    className="border-b border-purple-200 last:border-b-0 pb-4"
                  >
                    <button
                      onClick={() => toggleTopic(topic.key)}
                      className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-purple-700">
                        {topic.title}
                      </h3>
                      <span className="text-2xl text-purple-400">
                        {openTopic === topic.key ? '-' : '+'}
                      </span>
                    </button>
                    {openTopic === topic.key && (
                      <div className="p-4 bg-purple-50 rounded-b-lg">
                        <div className="space-y-4">
                          {topic.bullets.map((section, idx) => (
                            <div key={idx}>
                              <div className="font-semibold text-purple-800 mb-1">
                                {section.subtopic}
                              </div>
                              <ul className="list-disc ml-6 text-slate-700 space-y-1">
                                {section.points.map((point, i) => (
                                  <li key={i}>{point}</li>
                                ))}
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
      </div>
    </div>
  );
};

export default APStatisticsUnit7;
