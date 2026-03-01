import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit3Content = [
	{
		key: '3.1',
		title: '3.1 – Boolean Expressions',
		bullets: [
			[
				'**Boolean data type**: Can only hold true or false values',
				'**Comparison operators**: == (equal), != (not equal), < (less than), > (greater than), <= (less than or equal), >= (greater than or equal)',
				'**Boolean expressions**: Expressions that evaluate to either true or false',
				'**Precedence**: Arithmetic operators are evaluated before comparison operators',
				'**Common mistakes**: Using = (assignment) instead of == (comparison)',
				'Example: boolean isAdult = age >= 18; evaluates to true if age is 18 or older',
				'**String comparison**: Use .equals() method, not == operator for strings',
			],
		],
	},
	{
		key: '3.2',
		title: '3.2 – if Statements and Control Flow',
		bullets: [
			[
				'**if statement structure**: if (condition) { statements to execute }',
				'**Control flow**: Program executes code blocks based on boolean conditions',
				'**Block scope**: Variables declared inside {} are only accessible within that block',
				'**Single vs multiple statements**: Single statements don\'t require braces, but best practice is to always use them',
				'**Nested conditions**: if statements can contain other if statements',
				'Example: if (score >= 90) { grade = "A"; }',
				'**Code readability**: Proper indentation makes conditional logic easier to follow',
			],
		],
	},
	{
		key: '3.3',
		title: '3.3 – if-else Statements',
		bullets: [
			[
				'**if-else structure**: if (condition) { statements } else { alternative statements }',
				'**Mutual exclusivity**: Only one branch (if or else) will execute, never both',
				'**Default behavior**: else provides a fallback when the if condition is false',
				'**Dangling else**: else clause belongs to the nearest if statement',
				'**Code coverage**: Every possible path should be considered in testing',
				'Example: if (temperature > 80) { System.out.println("Hot"); } else { System.out.println("Not hot"); }',
				'**Binary decisions**: if-else is perfect for two-option scenarios',
			],
		],
	},
	{
		key: '3.4',
		title: '3.4 – else if Statements',
		bullets: [
			[
				'**else if structure**: Allows checking multiple conditions in sequence',
				'**Sequential evaluation**: Conditions checked from top to bottom, stops at first true condition',
				'**Multiple branches**: Can have many else if statements between if and else',
				'**Final else**: Optional catch-all for when no conditions are true',
				'**Efficiency**: Only one branch executes, making it efficient for exclusive conditions',
				'Example: if (grade >= 90) { letter = "A"; } else if (grade >= 80) { letter = "B"; } else { letter = "C"; }',
				'**Range checking**: Common pattern for categorizing values into ranges',
			],
		],
	},
	{
		key: '3.5',
		title: '3.5 – Compound Boolean Expressions',
		bullets: [
			[
				'**Logical operators**: && (AND), || (OR), ! (NOT)',
				'**AND (&&)**: Both conditions must be true for the entire expression to be true',
				'**OR (||)**: At least one condition must be true for the entire expression to be true',
				'**NOT (!)**: Reverses the boolean value (true becomes false, false becomes true)',
				'**Short-circuit evaluation**: && stops checking if first condition is false, || stops checking if first condition is true',
				'**Parentheses**: Control order of evaluation, similar to arithmetic expressions',
				'Example: if (age >= 13 && age <= 19) { System.out.println("Teenager"); }',
			],
		],
	},
	{
		key: '3.6',
		title: '3.6 – Equivalent Boolean Expressions',
		bullets: [
			[
				'**De Morgan\'s Laws**: !(A && B) equals (!A || !B), and !(A || B) equals (!A && !B)',
				'**Double negation**: !!A equals A (two negations cancel out)',
				'**Boolean algebra**: Mathematical rules apply to boolean expressions',
				'**Simplification**: Complex boolean expressions can often be simplified for readability',
				'**Truth tables**: Can be used to verify that two expressions are equivalent',
				'**Common patterns**: if (!condition) versus if (condition == false)',
				'Example: !(x > 5 && y < 10) is equivalent to (x <= 5 || y >= 10)',
			],
		],
	},
	{
		key: '3.7',
		title: '3.7 – Comparing Objects',
		bullets: [
			[
				'**Reference vs content comparison**: == compares object references, .equals() compares content',
				'**String comparison**: Always use .equals() for string content comparison',
				'**null values**: Check for null before calling methods to avoid NullPointerException',
				'**Case sensitivity**: "Hello".equals("hello") returns false',
				'**Object equality**: Custom classes need to override equals() method for meaningful comparison',
				'**Best practices**: Use .equals() for objects, == for primitives',
				'Example: if (name != null && name.equals("John")) { // safe comparison }',
			],
		],
	},
];

export const timelineData = [
	{
		key: 'boolean-expressions',
		icon: '🔍',
		title: 'Boolean Expressions',
		summary: 'Understanding how to create expressions that evaluate to true or false.',
		details: [
			'Boolean expressions use comparison operators like ==, !=, <, >, <=, >=.',
			'These expressions form the foundation for decision-making in programs.',
			'Common mistake: using = (assignment) instead of == (comparison).',
		],
	},
	{
		key: 'if-statements',
		icon: '🛤️',
		title: 'if Statements',
		summary: 'Basic conditional execution where code runs only if a condition is true.',
		details: [
			'if statements allow programs to make decisions based on data.',
			'Code blocks are enclosed in curly braces for clarity and scope.',
			'Proper indentation makes the logic flow easier to follow.',
		],
	},
	{
		key: 'if-else',
		icon: '⚡',
		title: 'if-else Statements',
		summary: 'Two-way branching where one of two code blocks will execute.',
		details: [
			'if-else provides a binary choice: do one thing or another.',
			'Exactly one branch will execute, making it perfect for either-or decisions.',
			'The else clause serves as a default fallback option.',
		],
	},
	{
		key: 'else-if',
		icon: '🌳',
		title: 'else if Chains',
		summary: 'Multi-way branching for checking multiple conditions in sequence.',
		details: [
			'else if allows testing multiple mutually exclusive conditions.',
			'Conditions are evaluated top-to-bottom, stopping at the first true one.',
			'Commonly used for categorizing data into ranges or groups.',
		],
	},
	{
		key: 'logical-operators',
		icon: '🧠',
		title: 'Compound Boolean Expressions',
		summary: 'Combining multiple conditions using logical operators (&&, ||, !).',
		details: [
			'&& (AND) requires both conditions to be true.',
			'|| (OR) requires at least one condition to be true.',
			'! (NOT) reverses the boolean value.',
			'Short-circuit evaluation improves efficiency.',
		],
	},
	{
		key: 'boolean-algebra',
		icon: '🔄',
		title: 'Equivalent Boolean Expressions',
		summary: 'Understanding that different boolean expressions can be logically equivalent.',
		details: [
			'De Morgan\'s Laws help transform complex boolean expressions.',
			'Boolean algebra provides rules for simplifying expressions.',
			'Truth tables can verify that expressions are equivalent.',
		],
	},
	{
		key: 'object-comparison',
		icon: '⚖️',
		title: 'Comparing Objects',
		summary: 'Understanding the difference between reference and content comparison.',
		details: [
			'== compares object references (memory addresses).',
			'.equals() compares object content (actual values).',
			'Always check for null before calling methods on objects.',
			'String comparison should always use .equals() method.',
		],
	},
];

const APCSAUnit3StudyGuide: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-orange-800">AP CSA Unit 3: Boolean Expressions and if Statements</h1>
          <p className="text-lg text-slate-600 mt-2">Learn to make decisions in your programs using conditional logic.</p>
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
            onClick={() => navigate('/apcsa-study-guide/unit/3/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-orange-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit3Content.map((topic) => (
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

export default APCSAUnit3StudyGuide;
