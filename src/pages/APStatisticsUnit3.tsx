import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit3Content = [
  {
    key: '3.0',
    title: '3.0 – Unit 3 Overview: Collecting Data',
    bullets: [
      {
        subtopic: 'Goal',
        points: ['Learn how to collect reliable data using proper study designs to make valid inferences.'],
      },
      {
        subtopic: 'Focus on',
        points: [
          'Choosing representative samples.',
          'Understanding bias in data collection.',
          'Designing controlled experiments.',
        ],
      },
      {
        subtopic: 'Foundation',
        points: ['Builds foundation for statistical inference in later units.'],
      },
    ],
  },
  {
    key: '3.1',
    title: '3.1 – Introducing Statistics: Do the Data We Collected Tell the Truth?',
    bullets: [
      {
        subtopic: 'Validity of Data',
        points: [
          'Depends on how the data was collected.',
          'Poor data collection leads to bias, making results unreliable.',
          'Key Question: Does the data accurately reflect the population?',
        ],
      },
    ],
  },
  {
    key: '3.2',
    title: '3.2 – Introduction to Planning a Study',
    bullets: [
      {
        subtopic: 'Define the Population',
        points: ['Who are you trying to learn about?'],
      },
      {
        subtopic: 'Identify the Sample',
        points: ['Subset selected from the population.'],
      },
      {
        subtopic: 'Choose a Sampling Method',
        points: ['Avoid bias and allow generalization.'],
      },
      {
        subtopic: 'Distinguish between',
        points: [
          'Observational studies (no treatment).',
          'Experiments (apply treatments).',
        ],
      },
    ],
  },
  {
    key: '3.3',
    title: '3.3 – Random Sampling and Data Collection',
    bullets: [
      {
        subtopic: 'Good Sampling Methods (reduce bias, increase validity)',
        points: [
          'Simple Random Sample (SRS): Every individual has an equal chance of being selected.',
          'Methods: random number generator, names in a hat, etc.',
          'Steps: Label population units, Randomize, Select sample.',
          'Stratified Random Sample: Divide population into homogeneous strata (e.g., grade levels), randomly sample from each stratum. Reduces variability and ensures subgroup representation.',
          'Cluster Sampling: Divide population into heterogeneous clusters (mini-populations), randomly select entire clusters. Often used for logistical efficiency.',
          'Systematic Random Sampling: Select every nth individual after a random starting point. Example: Survey every 5th person entering a building.',
        ],
      },
    ],
  },
  {
    key: '3.4',
    title: '3.4 – Potential Problems with Sampling',
    bullets: [
      {
        subtopic: 'Bad Sampling Methods (introduce bias)',
        points: [
          'Convenience Sample: Selecting individuals easiest to reach. Example: Interviewing only people at your lunch table.',
          'Voluntary Response Sample: Individuals choose whether to respond. Leads to strong opinion bias.',
        ],
      },
      {
        subtopic: 'Sources of Bias',
        points: [
          'Undercoverage: Certain groups left out of the sampling process. Example: No internet users in an online survey.',
          'Nonresponse: Individuals selected but don’t respond. Example: Ignoring a phone survey.',
          'Response Bias: Responses are inaccurate due to pressure or dishonesty. Example: Lying about illegal behavior.',
          'Wording of Questions: Leading or confusing wording affects responses. Example: “Do you agree that great students use this app?”',
        ],
      },
    ],
  },
  {
    key: '3.5',
    title: '3.5 – Introduction to Experimental Design',
    bullets: [
      {
        subtopic: 'Observational Study',
        points: [
          'Observe individuals without influencing them.',
          'Can show association but not causation.',
        ],
      },
      {
        subtopic: 'Experiment',
        points: [
          'Apply treatments and observe the effects.',
          'Can establish causality if well-designed.',
        ],
      },
    ],
  },
  {
    key: '3.6',
    title: '3.6 – Selecting an Experimental Design',
    bullets: [
      {
        subtopic: 'Principles of Experimental Design (CRCR)',
        points: [
          'Comparison: Compare treatment groups to detect effects.',
          'Random Assignment: Assign treatments randomly to reduce confounding. Creates roughly equivalent groups.',
          'Control: Keep other variables constant. Prevents lurking/confounding variables from affecting results.',
          'Replication: Use enough subjects to generalize findings. More subjects = more reliable results.',
        ],
      },
      {
        subtopic: 'Vocabulary',
        points: [
          'Experimental Units: The individuals (humans, animals, plants, etc.) in the experiment.',
          'Subjects: If the experimental units are people.',
          'Factor: An explanatory variable being studied.',
          'Level: A specific value of a factor (e.g., low, medium, high dose).',
          'Treatment: A combination of factor levels given to subjects.',
        ],
      },
    ],
  },
  {
    key: '3.7',
    title: '3.7 – Inference and Experiments',
    bullets: [
      {
        subtopic: 'Advanced Designs',
        points: [
          'Completely Randomized Design: Subjects are randomly assigned to all treatments. Simplest form of experiment.',
          'Randomized Block Design: Subjects are split into blocks (groups with a shared characteristic). Within each block, treatments are randomly assigned. Used to control variability within subgroups. Example: Split by age, gender, income group, etc.',
          'Matched Pairs Design: Special case of block design. Subjects are paired based on similarity. One in each pair gets each treatment randomly. Alternatively, the same person gets both treatments in random order (repeated measures).',
        ],
      },
      {
        subtopic: 'Blinding',
        points: [
          'Single Blind: Subjects do not know which treatment they are getting.',
          'Double Blind: Neither subjects nor evaluators know group assignments. Prevents placebo effect and evaluator bias.',
        ],
      },
      {
        subtopic: 'Confounding Variables',
        points: [
          'Variables related to both the explanatory and response variables. Can falsely suggest or mask a treatment effect. Well-designed experiments control for confounding.',
        ],
      },
    ],
  },
];

const APStatisticsUnit3 = () => {
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
            onClick={() => navigate('/ap-statistics/unit/3/quiz')}
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
                AP Statistics Unit 3: Collecting Data
              </h1>
              <p className="text-lg text-slate-600 mt-2">
                Sampling methods, bias, experimental design, and inference from experiments.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="space-y-4">
                {unit3Content.map((topic) => (
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

export default APStatisticsUnit3;
