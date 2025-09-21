import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit5Content = [
  {
    key: '5.1',
    title: '5.1: Introducing Statistics — Why Is My Sample Not Like Yours?',
    bullets: [
      {
        subtopic: 'Sampling Variability',
        points: [
          'Different random samples from the same population produce different statistics.',
        ],
      },
      {
        subtopic: 'Sampling Distribution',
        points: [
          'The collection of all possible sample statistics from the same sample size.',
        ],
      },
      {
        subtopic: 'Purpose',
        points: [
          'Helps quantify how much sample statistics vary and forms the foundation for inference.',
        ],
      },
    ],
  },
  {
    key: '5.2',
    title: '5.2: The Normal Distribution, Revisited',
    bullets: [
      {
        subtopic: 'Standard Normal Distribution',
        points: [
          'Mean μ = 0, standard deviation σ = 1',
          'Use z-scores: z = (x − μ) / σ',
        ],
      },
      {
        subtopic: 'TI-84 Calculations',
        points: [
          'normalcdf(lower, upper, μ, σ) → finds probability between values.',
          'invNorm(area, μ, σ) → finds value given a left-tail probability.',
        ],
      },
      {
        subtopic: 'Example 5.1: Lightbulb Lifespan (μ = 1500, σ = 75)',
        points: [
          'P(lightbulb < 1410): normalcdf(0,1410,1500,75) = 0.1151',
          'P(1563 < lightbulb < 1648): normalcdf(1563,1648,1500,75) = 0.1762',
          'P(1416 < lightbulb < 1677): normalcdf(1416,1677,1500,75) = 0.8595',
          'Show: distribution name, parameters, boundaries, direction of interest, and final probability.',
        ],
      },
    ],
  },
  {
    key: '5.3',
    title: '5.3: The Central Limit Theorem (CLT)',
    bullets: [
      {
        subtopic: 'CLT Statement',
        points: [
          'For large n ≥ 30, the sampling distribution of x̄ is approximately normal, regardless of population shape.',
          'μ_x̄ = μ, σ_x̄ = σ / √n',
        ],
      },
      {
        subtopic: 'Example 5.2: Naked Mole Rats (μ = 21, σ = 3, n = 40)',
        points: [
          'P(20 < x̄ < 22): normalcdf(20,22,21,0.474) = 0.965',
          '90% Left-tail cutoff: invNorm(0.10,21,0.474) ≈ 20.39',
        ],
      },
    ],
  },
  {
    key: '5.4',
    title: '5.4: Biased and Unbiased Point Estimates',
    bullets: [
      {
        subtopic: 'Unbiased Estimator',
        points: [
          'Sampling distribution is centered at the true parameter.',
          'Sample mean, sample proportion, and sample slope are unbiased.',
        ],
      },
      {
        subtopic: 'Biased Estimator',
        points: [
          'Sampling distribution is not centered at the true value (e.g., sample maximum).',
        ],
      },
      {
        subtopic: 'Example 5.3: Baseball Estimators',
        points: [
          'Unbiased: Estimators B, C, D (means near 146g)',
          'Lowest variability at n = 40: Estimator A',
          'Best for n = 100: Estimator D (unbiased with shrinking variability)',
        ],
      },
    ],
  },
  {
    key: '5.5',
    title: '5.5: Sampling Distributions for Sample Proportions',
    bullets: [
      {
        subtopic: 'Mean',
        points: ['μ_p̂ = p'],
      },
      {
        subtopic: 'Standard Deviation',
        points: ['σ_p̂ = sqrt[ p(1 − p) / n ]'],
      },
      {
        subtopic: 'Shape',
        points: [
          'Approx. normal if: np ≥ 10 and n(1 − p) ≥ 10',
        ],
      },
      {
        subtopic: 'Example 5.4',
        points: [
          'p = 0.80, n = 110 → Check: np = 88, n(1 − p) = 22 ✔',
          'P( p̂ < 0.75 ): normalcdf(–1000, 0.75, 0.80, 0.0381) = 0.0947',
        ],
      },
    ],
  },
  {
    key: '5.6',
    title: '5.6: Sampling Distributions for Differences in Sample Proportions',
    bullets: [
      {
        subtopic: 'Mean',
        points: ['μ_p̂1 − p̂2 = p1 − p2'],
      },
      {
        subtopic: 'Standard Deviation',
        points: ['σ = sqrt[ p1(1 − p1)/n1 + p2(1 − p2)/n2 ]'],
      },
      {
        subtopic: 'Example 5.5: Fast Food Study',
        points: [
          'p₁ = 0.25, n₁ = 110; p₂ = 0.19, n₂ = 120 → All ≥10 ✔',
          'P(diff > 0.10): normalcdf(0.10,1,0.06,0.0547) = 0.232',
        ],
      },
    ],
  },
  {
    key: '5.7',
    title: '5.7: Sampling Distributions for Sample Means',
    bullets: [
      {
        subtopic: 'Mean',
        points: ['μ_x̄ = μ'],
      },
      {
        subtopic: 'Standard Deviation',
        points: ['σ_x̄ = σ / √n'],
      },
      {
        subtopic: 'Shape',
        points: ['Approximately normal if n ≥ 30 or population is normal'],
      },
      {
        subtopic: 'Example 5.6: Energy Drink Caffeine',
        points: [
          'μ = 200 mg, σ = 10 mg, n = 6',
          'Mean = 200, SD = 10 / √6 ≈ 4.08 mg',
        ],
      },
    ],
  },
  {
    key: '5.8',
    title: '5.8: Sampling Distributions for Differences in Sample Means',
    bullets: [
      {
        subtopic: 'Mean',
        points: ['μ_x̄1 − x̄2 = μ1 − μ2'],
      },
      {
        subtopic: 'Standard Deviation',
        points: ['σ = sqrt[ σ1²/n1 + σ2²/n2 ]'],
      },
      {
        subtopic: 'Example 5.7: Genetic Mutations',
        points: [
          'μ₁ = 65, σ₁ = 15, n₁ = 35; μ₂ = 25, σ₂ = 5, n₂ = 40',
          'P(35 < diff < 45): normalcdf(35,45,40,2.656) = 0.940',
        ],
      },
    ],
  },
  {
    key: '5.9',
    title: 'Simulation of Sampling Distributions',
    bullets: [
      {
        subtopic: 'When to Use Simulation',
        points: [
          'Used when no normal model applies (e.g., medians, max, variances).',
        ],
      },
      {
        subtopic: 'Analysis',
        points: [
          'Analyze shape, center, spread of the simulated sampling distributions.',
          'Example: Sample medians → roughly normal',
          'Variances → right-skewed',
          'Minimums → roughly bell-shaped',
        ],
      },
    ],
  },
];

const APStatisticsUnit5 = () => {
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
            onClick={() => navigate('/ap-statistics/unit/5/quiz')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${
              activeTab === 'quiz'
                ? 'border-b-4 border-orange-500 text-orange-700'
                : 'text-slate-500 hover:text-orange-600'
            }`}
          >
            Take Quiz
          </button>
          {/* Add a quiz tab if you have a quiz page for AP Stats */}
        </div>
        {/* Content */}
        {activeTab === 'topics' && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-purple-700">
                AP Statistics Unit 5: Sampling Distributions
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                Sampling variability, normal and sampling distributions, CLT, point estimates, and simulation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="space-y-4">
                {unit5Content.map((topic) => (
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

export default APStatisticsUnit5;
