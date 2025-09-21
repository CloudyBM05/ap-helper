import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit2Content = [
  {
    key: '2.0',
    title: '2.0 – Unit 2 Overview: Exploring Two-Variable Data',
    bullets: [
      {
        subtopic: 'Focus',
        points: ['Examining relationships between two variables measured from a single sample.'],
      },
      {
        subtopic: 'Types of Data',
        points: [
          'Two categorical variables (e.g., gender and voting preference).',
          'Two quantitative variables (e.g., frog length and weight).',
        ],
      },
      {
        subtopic: 'Main Goal',
        points: [
          'Determine if a statistical association exists and how strong it is.',
          'Develop tools to model, interpret, and predict relationships using statistical graphs and numerical summaries.',
        ],
      },
    ],
  },
  {
    key: '2.1',
    title: '2.1 – Introducing Statistics: Are Variables Related?',
    bullets: [
      {
        subtopic: 'Purpose',
        points: ['Explore whether a connection exists between two variables.'],
      },
      {
        subtopic: 'Relationships',
        points: [
          'Association between two categorical variables.',
          'Trends/patterns between two quantitative variables.',
        ],
      },
      {
        subtopic: 'Important to Distinguish',
        points: [
          'Correlation ≠ causation.',
          'Observed associations may be due to confounding variables or random chance.',
        ],
      },
    ],
  },
  {
    key: '2.2',
    title: '2.2 – Representing Two Categorical Variables',
    bullets: [
      {
        subtopic: 'Two-Way Table',
        points: [
          'Displays frequencies of two categorical variables.',
          'Organizes counts into rows and columns.',
        ],
      },
      {
        subtopic: 'Types of Frequencies',
        points: [
          'Marginal: Totals for each category (row/column sums).',
          'Joint: Intersection of categories (cell values).',
          'Conditional: Proportions calculated within a category (row or column).',
        ],
      },
      {
        subtopic: 'Graphical Tools',
        points: [
          'Segmented Bar Graphs: Show conditional relative frequencies using colored segments. Useful for visualizing associations.',
          'Side-by-Side Bar Graphs: Compare categories across groups directly.',
        ],
      },
    ],
  },
  {
    key: '2.3',
    title: '2.3 – Statistics for Two Categorical Variables',
    bullets: [
      {
        subtopic: 'Association vs. Independence',
        points: [
          'If conditional distributions are similar across groups → no association.',
          'If they vary significantly → association exists.',
        ],
      },
      {
        subtopic: 'Steps',
        points: [
          'Calculate conditional relative frequencies.',
          'Compare frequencies between categories.',
          'Use graphs/tables to determine if variables are related.',
        ],
      },
      {
        subtopic: 'Example',
        points: [
          'If 80% of bus riders are tardy but only 30% of walkers are tardy → likely association.',
        ],
      },
    ],
  },
  {
    key: '2.4',
    title: '2.4 – Representing the Relationship Between Two Quantitative Variables',
    bullets: [
      {
        subtopic: 'Scatterplots',
        points: [
          'Plot individual data points for two quantitative variables.',
          'X-axis: Explanatory (independent) variable.',
          'Y-axis: Response (dependent) variable.',
        ],
      },
      {
        subtopic: 'Describing Scatterplots: DUFS',
        points: [
          'Direction: Positive (both variables increase) or Negative (one increases, the other decreases).',
          'Unusual Features: Outliers, Clusters.',
          'Form: Linear, Curved (nonlinear), No pattern.',
          'Strength: Strong (tight pattern), Weak (widely scattered).',
        ],
      },
    ],
  },
  {
    key: '2.5',
    title: '2.5 – Correlation',
    bullets: [
      {
        subtopic: 'Correlation Coefficient (r)',
        points: [
          'Measures the strength and direction of a linear relationship.',
          'Range: −1 ≤ r ≤ 1.',
          'r > 0: Positive correlation.',
          'r < 0: Negative correlation.',
          'r = 0: No linear relationship.',
        ],
      },
      {
        subtopic: 'Properties',
        points: [
          'Not resistant to outliers.',
          'Only valid for linear relationships.',
          'Switching x and y does not change r.',
          'Units do not affect r.',
        ],
      },
    ],
  },
  {
    key: '2.6',
    title: '2.6 – Linear Regression Models',
    bullets: [
      {
        subtopic: 'Least Squares Regression Line (LSRL)',
        points: [
          'Equation: ŷ = a + bx',
          'ŷ: Predicted value.',
          'a: y-intercept (predicted y when x = 0).',
          'b: Slope (change in y per 1 unit change in x).',
        ],
      },
      {
        subtopic: 'Interpretation of Slope',
        points: [
          'For each additional unit of x, y is predicted to increase/decrease by b units.',
        ],
      },
      {
        subtopic: 'Interpretation of y-intercept',
        points: [
          'The predicted value of y when x = 0 (if it makes sense in context).',
        ],
      },
      {
        subtopic: 'Prediction',
        points: [
          'Interpolation: Predicting within the range of data (safe).',
          'Extrapolation: Predicting outside the range (risky, often inaccurate).',
        ],
      },
    ],
  },
  {
    key: '2.7',
    title: '2.7 – Residuals',
    bullets: [
      {
        subtopic: 'Residual',
        points: [
          'Residual = Actual − Predicted (y − ŷ)',
          'Positive residual → actual is above prediction.',
          'Negative residual → actual is below prediction.',
        ],
      },
      {
        subtopic: 'Residual Plot',
        points: [
          'A scatterplot of residuals vs. x-values.',
          'Should show no pattern if the linear model is appropriate.',
          'A curved pattern indicates that a non-linear model might be better.',
        ],
      },
    ],
  },
  {
    key: '2.8',
    title: '2.8 – Least Squares Regression',
    bullets: [
      {
        subtopic: 'Line of Best Fit',
        points: [
          'Minimizes the sum of squared residuals.',
        ],
      },
      {
        subtopic: 'Standard Deviation of Residuals (s)',
        points: [
          'Measures the average prediction error.',
          'Smaller s = better predictions.',
        ],
      },
      {
        subtopic: 'Coefficient of Determination (R²)',
        points: [
          'R² = (correlation)²',
          'Interprets the percentage of variation in the response variable explained by the explanatory variable.',
          'Example: R² = 0.85 → 85% of variation in y is explained by x.',
        ],
      },
    ],
  },
  {
    key: '2.9',
    title: '2.9 – Analyzing Departures from Linearity',
    bullets: [
      {
        subtopic: 'Outliers',
        points: [
          'Points far from the data trend.',
          'Can weaken or inflate correlation.',
        ],
      },
      {
        subtopic: 'High-Leverage Points',
        points: [
          'Far from the mean in x-direction.',
          'Can pull the regression line toward themselves.',
        ],
      },
      {
        subtopic: 'Influential Points',
        points: [
          'Greatly affect slope, y-intercept, and R² when removed.',
        ],
      },
      {
        subtopic: 'Important',
        points: [
          'Always plot data before trusting statistics.',
        ],
      },
    ],
  },
];

const APStatisticsUnit2 = () => {
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
            onClick={() => navigate('/ap-statistics/unit/2/quiz')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${
              activeTab === 'quiz'
                ? 'border-b-4 border-orange-500 text-orange-700'
                : 'text-slate-500 hover:text-orange-600'
            }`}
          >
            Take Quiz
          </button>
        </div>
        {/* Content */}
        {activeTab === 'topics' && (
          <>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-purple-700">
                AP Statistics Unit 2: Exploring Two-Variable Data
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                Categorical and quantitative relationships, two-way tables, scatterplots, correlation, regression, and analyzing departures from linearity.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="space-y-4">
                {unit2Content.map((topic) => (
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

export default APStatisticsUnit2;
