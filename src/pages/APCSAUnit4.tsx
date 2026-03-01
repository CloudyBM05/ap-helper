import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit4Content = [
	{
		key: '4.1',
		title: '4.1 – while Loops',
		bullets: [
			[
				'**while loop structure**: while (condition) { statements to repeat }',
				'**Condition evaluation**: Checked before each iteration, loop continues while condition is true',
				'**Infinite loops**: Can occur if condition never becomes false',
				'**Loop body**: Code inside braces that gets repeated',
				'**Pre-test loop**: Condition is tested before entering the loop body',
				'Example: while (count < 10) { System.out.println(count); count++; }',
				'**Common pattern**: Initialize variable before loop, update variable inside loop',
			],
		],
	},
	{
		key: '4.2',
		title: '4.2 – for Loops',
		bullets: [
			[
				'**for loop structure**: for (initialization; condition; update) { statements }',
				'**Three parts**: Initialization runs once, condition checked before each iteration, update runs after each iteration',
				'**Scope**: Variables declared in initialization are local to the loop',
				'**Equivalent to while**: for loops can be rewritten as while loops',
				'**Counter-controlled**: Typically used when number of iterations is known',
				'Example: for (int i = 0; i < 10; i++) { System.out.println(i); }',
				'**Best practice**: Use descriptive variable names for loop counters',
			],
		],
	},
	{
		key: '4.3',
		title: '4.3 – Developing Algorithms Using Strings',
		bullets: [
			[
				'**String traversal**: Using loops to examine each character in a string',
				'**charAt() method**: Accesses individual characters at specific indices',
				'**length() method**: Determines how many times to loop',
				'**Building strings**: Concatenating characters or substrings during iteration',
				'**Pattern searching**: Looking for specific characters or substrings',
				'Example: for (int i = 0; i < str.length(); i++) { char ch = str.charAt(i); }',
				'**Common algorithms**: Counting characters, reversing strings, finding patterns',
			],
		],
	},
	{
		key: '4.4',
		title: '4.4 – Nested Iteration',
		bullets: [
			[
				'**Nested loops**: Loops inside other loops for multidimensional processing',
				'**Execution pattern**: Inner loop completes all iterations for each iteration of outer loop',
				'**Two-dimensional patterns**: Useful for grids, tables, and coordinate systems',
				'**Complexity**: Nested loops can significantly increase execution time',
				'**Variable scope**: Inner loop variables are separate from outer loop variables',
				'Example: for (int row = 0; row < 3; row++) { for (int col = 0; col < 3; col++) { } }',
				'**Applications**: Matrix operations, game boards, image processing',
			],
		],
	},
	{
		key: '4.5',
		title: '4.5 – Informal Code Analysis',
		bullets: [
			[
				'**Algorithm efficiency**: Analyzing how execution time grows with input size',
				'**Big O notation**: Mathematical way to describe algorithm performance',
				'**Linear time O(n)**: Execution time grows proportionally with input size',
				'**Quadratic time O(n²)**: Execution time grows with square of input size (nested loops)',
				'**Best vs worst case**: Performance can vary based on input characteristics',
				'**Loop analysis**: Count how many times loops execute relative to input size',
				'**Optimization**: Identifying ways to reduce unnecessary operations',
			],
		],
	},
];

export const timelineData = [
	{
		key: 'while-loops',
		icon: '🔄',
		title: 'while Loops',
		summary: 'Basic iteration structure that repeats code while a condition remains true.',
		details: [
			'while loops are pre-test loops - condition is checked before each iteration.',
			'Perfect for situations where you don\'t know exactly how many times to loop.',
			'Must be careful to avoid infinite loops by ensuring the condition eventually becomes false.',
		],
	},
	{
		key: 'for-loops',
		icon: '⚡',
		title: 'for Loops',
		summary: 'Counter-controlled loops with initialization, condition, and update in one line.',
		details: [
			'for loops combine initialization, condition, and update in a compact format.',
			'Ideal when you know exactly how many times you want to iterate.',
			'Loop counter variables have local scope within the loop.',
		],
	},
	{
		key: 'string-algorithms',
		icon: '🔤',
		title: 'String Processing Algorithms',
		summary: 'Using loops to process and analyze string data character by character.',
		details: [
			'String traversal allows examination of each character individually.',
			'charAt() method provides access to characters at specific positions.',
			'Common patterns include counting, searching, and transforming text.',
		],
	},
	{
		key: 'nested-iteration',
		icon: '📊',
		title: 'Nested Iteration',
		summary: 'Loops within loops for processing multi-dimensional data structures.',
		details: [
			'Inner loop completes all iterations for each iteration of the outer loop.',
			'Essential for working with 2D arrays, grids, and matrix operations.',
			'Can significantly impact performance due to multiplicative effect.',
		],
	},
	{
		key: 'algorithm-analysis',
		icon: '📈',
		title: 'Algorithm Analysis',
		summary: 'Understanding and measuring the efficiency of iterative algorithms.',
		details: [
			'Big O notation describes how algorithm performance scales with input size.',
			'Linear algorithms O(n) scale proportionally with input.',
			'Quadratic algorithms O(n²) often result from nested loops.',
			'Analysis helps choose the most efficient approach for large datasets.',
		],
	},
];

const APCSAUnit4StudyGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState('topics');
  const [openTopic, setOpenTopic] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleTopic = (key: string) => {
    setOpenTopic(openTopic === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/apcsa-study-guide')}
          className="mb-6 px-4 py-2 rounded-lg bg-white text-orange-600 font-semibold hover:bg-slate-100 transition-colors shadow-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Units
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-800">AP CSA Unit 4: Iteration</h1>
          <p className="text-lg text-slate-600 mt-2">Master loops and repetitive processes to create efficient algorithms.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b-2 border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('topics')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'topics' ? 'border-b-4 border-orange-600 text-orange-700' : 'text-slate-500 hover:text-orange-600'}`}
          >
            Key Topics
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-6 py-3 font-semibold text-lg transition-colors ${activeTab === 'timeline' ? 'border-b-4 border-orange-600 text-orange-700' : 'text-slate-500 hover:text-orange-600'}`}
          >
            Timeline
          </button>
          <button
            onClick={() => navigate('/apcsa-study-guide/unit/4/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-orange-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit4Content.map((topic) => (
                <div key={topic.key} className="border-b border-slate-200 last:border-b-0 pb-4">
                  <button
                    onClick={() => toggleTopic(topic.key)}
                    className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-orange-700">{topic.title}</h3>
                    <span className="text-2xl text-slate-500">{openTopic === topic.key ? '-' : '+'}</span>
                  </button>
                  {openTopic === topic.key && (
                    <div className="p-4 bg-slate-50 rounded-b-lg">
                      <ul className="space-y-2">
                        {topic.bullets[0].map((bullet, index) => (
                          <li key={index} className="text-base text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: bullet.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="relative border-l-4 border-orange-200 ml-4 pl-8 space-y-12">
              {timelineData.map((event) => (
                <div key={event.key} className="relative">
                  <div className="absolute -left-11 -top-1 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-2xl shadow-md">
                    {event.icon}
                  </div>
                  <div className="bg-slate-50 p-6 rounded-xl shadow-md">
                    <h3 className="text-2xl font-bold text-orange-800 mb-2">{event.title}</h3>
                    <p className="text-lg text-slate-600 mb-4">{event.summary}</p>
                    <ul className="space-y-2 list-disc pl-5">
                      {event.details.map((detail, index) => (
                        <li key={index} className="text-base text-slate-700" dangerouslySetInnerHTML={{ __html: detail.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default APCSAUnit4StudyGuide;
