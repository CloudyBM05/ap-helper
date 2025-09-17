import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit8Content = [
  {
    key: '8.0',
    title: '8.0 – Unit 8 Overview: Chi Square',
    bullets: [
      {
        subtopic: 'Chi-square (χ²) tests',
        points: [
          'Used to analyze categorical data.',
          'Measure how observed counts differ from expected counts under a specific hypothesis.',
          'Common chi-square tests include:',
          { isSubList: true, items: [
            'Goodness-of-Fit Test (one categorical variable)',
            'Test for Independence (relationship between two categorical variables)',
            'Test for Homogeneity (compare distributions across groups)'
          ]},
          'Chi-square tests rely on the chi-square distribution, which is skewed right, non-negative, and characterized by degrees of freedom (df).',
          'Large chi-square statistics and small P-values indicate evidence against the null hypothesis.'
        ],
      },
    ],
  },
  {
    key: '8.1',
    title: '8.1 – Introducing Statistics: Are My Results Unexpected?',
    bullets: [
      {
        subtopic: 'Chi-square Statistic',
        points: [
          'Perfect fit between observed and expected values is unrealistic.',
          'The chi-square statistic summarizes discrepancies as: χ² = Σ (Oᵢ − Eᵢ)² / Eᵢ',
          'Oᵢ = observed counts, Eᵢ = expected counts.',
          'Smaller χ² indicates better fit; larger χ² suggests poor fit.',
          'P-value is the probability of observing such an extreme χ² if the null hypothesis is true.',
          'Chi-square distribution depends on degrees of freedom: df = number of categories − 1 for goodness-of-fit.',
          'Skewness decreases as df increases.',
          'Use technology (e.g., TI-84, Casio) for calculations of χ² and P-values.'
        ],
      },
    ],
  },
  {
    key: '8.2',
    title: '8.2 – Setting Up a Chi-Square Goodness-of-Fit Test',
    bullets: [
      {
        subtopic: 'Purpose & Hypotheses',
        points: [
          'Purpose: Test if observed categorical data fit a claimed distribution.',
          'H₀: The observed distribution fits the claimed theoretical distribution.',
          'Hₐ: The observed distribution does not fit the claimed distribution.'
        ],
      },
      {
        subtopic: 'Conditions',
        points: [
          'Random sample.',
          'Expected counts for each category ≥ 5.',
          'Sample size less than 10% of population.'
        ],
      },
      {
        subtopic: 'Calculating Expected Counts',
        points: [
          'Eᵢ = (proportion in population) × (sample size)',
          'Example: Distribution of liquor stores in city regions compared to area proportions.'
        ],
      },
    ],
  },
  {
    key: '8.3',
    title: '8.3 – Carrying Out a Chi-Square Goodness-of-Fit Test',
    bullets: [
      {
        subtopic: 'Steps',
        points: [
          'Compute chi-square statistic: χ² = Σ (Oᵢ − Eᵢ)² / Eᵢ',
          'Find degrees of freedom: df = k − 1, where k = number of categories.',
          'Calculate P-value using χ²-distribution.',
          'Decision rule: If P-value < significance level (e.g., 0.05), reject H₀. Otherwise, fail to reject H₀.',
          'Interpret results in context.',
          'Example: No sufficient evidence that liquor stores are distributed differently than area proportions (P = 0.099 > 0.05).'
        ],
      },
    ],
  },
  {
    key: '8.4',
    title: '8.4 – Expected Counts in Two-Way Tables',
    bullets: [
      {
        subtopic: 'Expected Counts',
        points: [
          'For tests involving two categorical variables, calculate expected counts under null hypothesis as:',
          'Eᵢⱼ = (row totalᵢ × column totalⱼ) / grand total',
          'Check that all expected counts ≥ 5.',
          'Random and independent sampling conditions must be met.',
          'Used in Test for Independence and Test for Homogeneity.'
        ],
      },
    ],
  },
  {
    key: '8.5',
    title: '8.5 – Setting Up a Chi-Square Test for Homogeneity or Independence',
    bullets: [
      {
        subtopic: 'Test for Independence',
        points: [
          'Tests if two categorical variables are independent in a single population.',
          'H₀: Variables are independent.',
          'Hₐ: Variables are not independent.'
        ],
      },
      {
        subtopic: 'Test for Homogeneity',
        points: [
          'Tests if multiple populations have the same distribution of a categorical variable.',
          'H₀: All populations have the same distribution.',
          'Hₐ: At least one population differs.'
        ],
      },
      {
        subtopic: 'Both Tests',
        points: [
          'Both use contingency tables (rows and columns).',
          'Degrees of freedom: df = (r − 1)(c − 1), where r = number of rows, c = number of columns.',
          'Conditions: Random, independent samples. Expected counts ≥ 5 in all cells. Sample sizes less than 10% of populations.'
        ],
      },
    ],
  },
  {
    key: '8.6',
    title: '8.6 – Carrying Out a Chi-Square Test for Homogeneity or Independence',
    bullets: [
      {
        subtopic: 'Steps',
        points: [
          'Calculate test statistic: χ² = Σ (Oᵢⱼ − Eᵢⱼ)² / Eᵢⱼ',
          'Find degrees of freedom as above.',
          'Use χ²-distribution to find P-value.',
          'Decision: Reject H₀ if P-value < α (e.g., 0.05), evidence of association or difference. Otherwise, fail to reject H₀.',
          'Example: Poll of marijuana legalization support vs. party affiliation showed a significant relationship (P < 0.001).',
          'Example: Satisfaction across job categories showed differing proportions (P = 0.0335).'
        ],
      },
    ],
  },
  {
    key: '8.7',
    title: '8.7 – Skills Focus: Selecting an Appropriate Inference Procedure for Categorical Data',
    bullets: [
      {
        subtopic: 'Choosing the Right Test & Interpretation',
        points: [
          'Determine research question type:',
          { isSubList: true, items: [
            'One categorical variable? Use Goodness-of-Fit.',
            'Two categorical variables in one population? Use Test for Independence.',
            'Comparing distributions across multiple populations? Use Test for Homogeneity.'
          ]},
          'Check assumptions and conditions carefully: Random sampling, Expected counts ≥ 5, Independence of observations.',
          'Use technology tools (TI-84, Casio Prizm) to compute test statistics, P-values, and expected counts.',
          'Interpret results carefully in context: Relate conclusions to research questions, Consider practical significance, Avoid inferring causation from association.',
          'Understand implications of Type I error (false positive) and Type II error (false negative) in context.'
        ],
      },
    ],
  },
];

const APStatisticsUnit8 = () => {
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
            onClick={() => navigate('/ap-statistics/unit/8/quiz')}
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
                AP Statistics Unit 8: Inference for Categorical Data – Chi-Square
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                Chi-square tests for goodness-of-fit, independence, and homogeneity; expected counts, conditions, and interpretation.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="space-y-4">
                {unit8Content.map((topic) => (
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
                                {section.points.map((point, i) => {
                                  if (typeof point === 'string') {
                                    return <li key={i}>{point}</li>;
                                  } else if (point.isSubList && Array.isArray(point.items)) {
                                    return (
                                      <ul key={i} className="list-disc ml-8">
                                        {point.items.map((sub, j) => (
                                          <li key={j}>{sub}</li>
                                        ))}
                                      </ul>
                                    );
                                  }
                                  return null;
                                })}
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

export default APStatisticsUnit8;
