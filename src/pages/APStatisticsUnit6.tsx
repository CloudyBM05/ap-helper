import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit6Content = [
  {
    key: '6.1',
    title: '6.1 – Constructing a Confidence Interval for a Population Proportion',
    bullets: [
      {
        subtopic: 'Purpose',
        points: ['Used to estimate the true proportion (p) in a population.'],
      },
      {
        subtopic: 'Formula',
        points: [
          'p̂ ± z* · sqrt[ p̂(1 − p̂) / n ]',
          'Where:',
          'p̂: sample proportion',
          'z*: critical value based on the confidence level (e.g., 1.96 for 95%)',
        ],
      },
      {
        subtopic: 'Interpretation',
        points: [
          '“We are __% confident that the true proportion is between ___ and ___.”',
        ],
      },
    ],
  },
  {
    key: '6.2',
    title: '6.2 – Interpreting a Confidence Interval for a Population Proportion',
    bullets: [
      {
        subtopic: 'Confidence Interval',
        points: ['Gives a range of plausible values.'],
      },
      {
        subtopic: 'Confidence Level',
        points: ['Tells how often the method would capture the true proportion in repeated samples.'],
      },
      {
        subtopic: 'Interpretation Tip',
        points: [
          'Don’t say “there’s a __% chance the true value is in the interval.”',
          'Say: “If we repeated the procedure many times, about __% of the intervals would contain the true proportion.”',
        ],
      },
    ],
  },
  {
    key: '6.3',
    title: '6.3 – Estimating a Population Proportion',
    bullets: [
      {
        subtopic: 'Estimation',
        points: ['Use sample statistics to estimate population parameters.'],
      },
      {
        subtopic: 'Key Conditions for CI',
        points: [
          'Random sample',
          '10% condition: sample size ≤ 10% of population',
          'Large Counts: n·p̂ ≥ 10 and n·(1 − p̂) ≥ 10',
        ],
      },
    ],
  },
  {
    key: '6.4',
    title: '6.4 – Introduction to Significance Testing',
    bullets: [
      {
        subtopic: 'Purpose',
        points: ['Evaluate claims about population parameters.'],
      },
      {
        subtopic: 'Key Concepts',
        points: [
          'Null hypothesis (H₀): assumed true (e.g., p = 0.5)',
          'Alternative hypothesis (Hₐ): what you\'re testing (e.g., p > 0.5)',
          'p-value: probability of getting results at least as extreme, assuming H₀ is true',
          'If p-value < α → reject H₀',
        ],
      },
    ],
  },
  {
    key: '6.5',
    title: '6.5 – Carrying Out a Significance Test for a Population Proportion',
    bullets: [
      {
        subtopic: 'Test Statistic (z-score)',
        points: [
          'z = (p̂ − p₀) / sqrt[ p₀(1 − p₀) / n ]',
          'Use a normal distribution for calculating p-values.',
          'Calculator: 1-PropZTest',
        ],
      },
    ],
  },
  {
    key: '6.6',
    title: '6.6 – Determining the Sample Size Required for a Desired Margin of Error',
    bullets: [
      {
        subtopic: 'Margin of Error (ME)',
        points: [
          'z* · sqrt[ p(1 − p) / n ] ≤ desired ME',
          'Rearranged to solve for sample size n.',
          'If no estimate for p, use 0.5 (maximizes variability).',
        ],
      },
    ],
  },
  {
    key: '6.7',
    title: '6.7 – Interpreting a P-Value and Justifying a Claim About a Population Proportion',
    bullets: [
      {
        subtopic: 'Small p-value',
        points: ['Strong evidence against H₀.'],
      },
      {
        subtopic: 'Justifications',
        points: [
          'Link the p-value to the significance level (α).',
          'Discuss context and what it means about the population.',
        ],
      },
    ],
  },
  {
    key: '6.8',
    title: '6.8 – Type I and Type II Errors',
    bullets: [
      {
        subtopic: 'Type I error',
        points: ["Rejecting H₀ when it's true (false positive)"],
      },
      {
        subtopic: 'Type II error',
        points: ["Failing to reject H₀ when it's false (false negative)"],
      },
      {
        subtopic: 'Power',
        points: [
          'Probability of correctly rejecting H₀ (1 - probability of Type II error)',
          'Increasing power:',
          'Larger sample',
          'Larger α',
          'Stronger effect size',
        ],
      },
    ],
  },
  {
    key: '6.9',
    title: '6.9 – Confidence Intervals for the Difference Between Two Proportions',
    bullets: [
      {
        subtopic: 'Formula',
        points: [
          '(p̂₁ − p̂₂) ± z* · sqrt[ p̂₁(1 − p̂₁)/n₁ + p̂₂(1 − p̂₂)/n₂ ]',
        ],
      },
      {
        subtopic: 'Conditions',
        points: [
          'Random samples',
          'Independent samples',
          'Both groups meet Large Counts: n₁·p̂₁ ≥ 10, etc.',
          'Calculator: 2-PropZInt',
        ],
      },
    ],
  },
  {
    key: '6.10',
    title: '6.10 – Significance Tests for the Difference Between Two Proportions',
    bullets: [
      {
        subtopic: 'Pooled Proportion for Standard Error',
        points: [
          'p̂_c = (x₁ + x₂) / (n₁ + n₂)',
          'z = (p̂₁ − p̂₂) / sqrt[ p̂_c(1 − p̂_c)(1/n₁ + 1/n₂) ]',
          'Conditions: same as 6.9',
          'Calculator: 2-PropZTest',
        ],
      },
    ],
  },
  {
    key: '6.11',
    title: '6.11 – Using Confidence Intervals and Significance Tests to Draw Appropriate Conclusions',
    bullets: [
      {
        subtopic: 'Drawing Conclusions',
        points: [
          'Use CI to determine plausible values for a parameter.',
          'Use significance tests to evaluate claims.',
          'Tie everything back to:',
          'Context',
          'Whether the conditions were met',
          'Whether you have statistical significance',
          'And if applicable, practical significance',
        ],
      },
    ],
  },
];

const APStatisticsUnit6 = () => {
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
            onClick={() => navigate('/ap-statistics/unit/6/quiz')}
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
                AP Statistics Unit 6: Inference for Categorical Data – Proportions
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                Confidence intervals, significance tests, sample size, errors, and inference for proportions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="space-y-4">
                {unit6Content.map((topic) => (
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

export default APStatisticsUnit6;
