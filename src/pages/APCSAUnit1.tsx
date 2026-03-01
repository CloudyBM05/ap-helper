import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Timeline event type
interface TimelineEvent {
  key: string;
  icon: string;
  title: string;
  summary: string;
  details: string[];
}

const unit1Content = [
	{
		key: '1.1',
		title: '1.1 – Why Programming? Why Java?',
		bullets: [
			[
				'**Programming Definition**: Writing precise, logical instructions that a computer can execute',
				'**Problem-solving process**: Taking input → Processing with algorithms → Producing output',
				'**Real-world applications**: Simulations, data analysis, automation, games and applications',
				'**Why Java**: Object-oriented programming (OOP), platform-independent, strong typing, readable syntax',
				'**Basic Java structure**: public class, main method, System.out.println()',
				'**AP CSA focus**: Logic and problem-solving skills over just syntax memorization',
			],
		],
	},
	{
		key: '1.2',
		title: '1.2 – Variables and Primitive Data Types',
		bullets: [
			[
				'**Variables**: Store values in memory with a type, name, and value',
				'**Static typing**: Variables must be declared before use in Java',
				'**int**: Whole numbers (5, -10, 0)',
				'**double**: Decimal numbers with double precision (3.14, -2.5)',
				'**boolean**: True or false values only',
				'**char**: Single characters using Unicode (\'A\', \'7\', \'@\')',
				'**Variable naming**: Cannot start with number, no spaces, use camelCase',
				'Example declarations: int age = 16; double gpa = 3.75; boolean isStudent = true;',
			],
		],
	},
	{
		key: '1.3',
		title: '1.3 – Expressions and Assignment Statements',
		bullets: [
			[
				'**Expressions**: Combine variables, literals, and operators to evaluate to one value',
				'**Assignment statements**: Store values using = operator, right side evaluated first',
				'**Arithmetic operators**: + (addition), - (subtraction), * (multiplication), / (division), % (modulo)',
				'**Operator precedence**: Parentheses → Multiplication/Division/Modulo → Addition/Subtraction',
				'Example: int result = 3 + 4 * 2; // result = 11 (not 14)',
				'**Reassignment**: x = x + 2; increases x by 2',
			],
		],
	},
	{
		key: '1.4',
		title: '1.4 – Assignment Statements and Input',
		bullets: [
			[
				'**Scanner class**: Reads input from users, must import java.util.Scanner',
				'**Scanner creation**: Scanner sc = new Scanner(System.in);',
				'**Input methods**: nextInt() for integers, nextDouble() for decimals, nextLine() for strings',
				'**Common pitfall**: nextInt() leaves newline character, may need sc.nextLine() to clear buffer',
				'**Input validation**: Always consider what happens with unexpected input',
				'Example: int age = sc.nextInt(); String name = sc.nextLine();',
			],
		],
	},
	{
		key: '1.5',
		title: '1.5 – Casting and Ranges of Variables',
		bullets: [
			[
				'**Type casting**: Converting one data type to another',
				'**Widening cast (automatic)**: int to double happens automatically',
				'**Narrowing cast (manual)**: double to int requires explicit cast operator',
				'**Casting syntax**: (int) 3.9 returns 3 (truncates, does not round)',
				'**int range**: -2,147,483,648 to 2,147,483,647',
				'**double range**: Very large range but with limited precision',
				'**Data loss warning**: Casting from double to int loses decimal portion',
			],
		],
	},
	{
		key: '1.6',
		title: '1.6 – Compound Assignment Operators',
		bullets: [
			[
				'**Compound operators**: Combine operation with assignment for efficiency',
				'**+= operator**: x += 5 equivalent to x = x + 5',
				'**-= operator**: x -= 3 equivalent to x = x - 3',
				'***= operator**: x *= 2 equivalent to x = x * 2',
				'**/= operator**: x /= 4 equivalent to x = x / 4',
				'**%= operator**: x %= 3 equivalent to x = x % 3',
				'More concise and commonly used in professional programming',
			],
		],
	},
	{
		key: '1.7',
		title: '1.7 – Application Program Interface (API) and Libraries',
		bullets: [
			[
				'**API definition**: A set of prewritten classes and methods for reuse',
				'**Benefits**: Prevents reinventing the wheel, increases productivity',
				'**java.lang package**: Automatically imported, contains basic classes',
				'**java.util package**: Scanner, ArrayList, and other utility classes',
				'**Math class**: Math.sqrt(16) returns 4.0, Math.random() for random numbers',
				'**Documentation**: Essential for understanding available methods and parameters',
			],
		],
	},
	{
		key: '1.8',
		title: '1.8 – Documentation With Comments',
		bullets: [
			[
				'**Single-line comments**: // for brief explanations on one line',
				'**Multi-line comments**: /* */ for longer explanations spanning multiple lines',
				'**Javadoc comments**: /** */ for documenting methods and classes professionally',
				'**Good commenting practices**: Explain why, not what the code does',
				'**Avoid obvious comments**: Don\'t state what is clearly visible in the code',
				'**Professional development**: Well-commented code is easier to maintain and debug',
			],
		],
	},
	{
		key: '1.9',
		title: '1.9 – Calling a Void Method With Parameters',
		bullets: [
			[
				'**Void methods**: Do not return a value, perform an action',
				'**Method structure**: public static void methodName(parameters)',
				'**Calling methods**: Use methodName(arguments) with matching parameters',
				'**Parameter matching**: Must match number, type, and order exactly',
				'**Method benefits**: Code reusability, better organization, easier debugging',
				'Example: printMessage("Hello!") calls a void method with a String parameter',
			],
		],
	},
	{
		key: '1.10',
		title: '1.10 – Calling a Non-Void Method',
		bullets: [
			[
				'**Non-void methods**: Return a value that can be used or stored',
				'**Return types**: Specify what type of data the method returns',
				'**Using return values**: Assign to variables or use directly in expressions',
				'**Method calls in expressions**: Can be part of larger calculations',
				'**Return statement**: Required in non-void methods to provide a value',
				'Example: int sum = add(3, 4); stores the returned value in sum',
			],
		],
	},
	{
		key: '1.11',
		title: '1.11 – Using the Math Class',
		bullets: [
			[
				'**Math.abs()**: Returns absolute value of a number',
				'**Math.pow()**: Calculates exponents, Math.pow(2, 3) returns 8.0',
				'**Math.sqrt()**: Returns square root, Math.sqrt(16) returns 4.0',
				'**Math.random()**: Returns random double between 0.0 (inclusive) and 1.0 (exclusive)',
				'**Random integers**: (int)(Math.random() * 10) generates 0-9',
				'**Static methods**: Called using class name, no object creation needed',
			],
		],
	},
	{
		key: '1.12',
		title: '1.12 – Objects: Instances of Classes',
		bullets: [
			[
				'**Class vs Object**: Class is blueprint, object is instance',
				'**Object characteristics**: State (fields/attributes) and behavior (methods)',
				'**Object creation**: Uses new keyword with constructor',
				'**Reference variables**: Store memory addresses, not actual objects',
				'**Multiple references**: Several variables can reference the same object',
				'Example: String name = "Brandon"; creates a String object',
			],
		],
	},
	{
		key: '1.13',
		title: '1.13 – Creating and Storing Objects',
		bullets: [
			[
				'**Object instantiation**: Scanner sc = new Scanner(System.in);',
				'**Reference variables**: Store memory addresses pointing to objects',
				'**Null references**: Variables can be assigned null (no object)',
				'**Runtime errors**: Calling methods on null references causes NullPointerException',
				'**Object initialization**: Constructor runs when new keyword is used',
				'**Memory management**: Java handles allocation and garbage collection automatically',
			],
		],
	},
	{
		key: '1.14',
		title: '1.14 – Calling a Void Method (Objects)',
		bullets: [
			[
				'**Instance method calls**: objectName.methodName(arguments)',
				'**Method invocation**: Uses dot notation to access object methods',
				'**Object state**: Methods can modify the object\'s internal state',
				'**Method parameters**: Arguments passed to customize method behavior',
				'**Side effects**: Void methods often change object state or produce output',
				'Example: System.out.println("Hello"); calls println method on out object',
			],
		],
	},
	{
		key: '1.15',
		title: '1.15 – String Methods',
		bullets: [
			[
				'**String immutability**: Strings cannot be modified after creation',
				'**length()**: Returns number of characters in the string',
				'**substring()**: Extracts portion of string, substring(start, end)',
				'**equals()**: Compares string contents, use instead of == operator',
				'**charAt()**: Returns character at specified index',
				'**indexOf()**: Finds position of character or substring',
				'**String comparison**: Use .equals() for content, == compares references only',
				'Example: "Computer".substring(0, 4) returns "Comp"',
			],
		],
	},
];

export const timelineData = [
	{
		key: 'programming',
		icon: '💻',
		title: 'Programming Fundamentals',
		summary: 'Understanding the basics of programming and why Java is chosen for AP CSA.',
		details: [
			'Programming involves writing logical instructions for computers.',
			'Java offers object-oriented programming with platform independence.',
			'Strong typing system helps catch errors early in development.',
		],
	},
	{
		key: 'variables',
		icon: '📊',
		title: 'Variables and Data Types',
		summary: 'Learning to store and work with different types of data.',
		details: [
			'Variables must be declared with a specific type in Java.',
			'Four primitive types: int, double, boolean, char.',
			'Variable naming follows camelCase convention.',
		],
	},
	{
		key: 'expressions',
		icon: '🔢',
		title: 'Expressions and Operations',
		summary: 'Combining variables and operators to create meaningful computations.',
		details: [
			'Expressions evaluate to a single value.',
			'Operator precedence follows mathematical rules.',
			'Assignment stores the result of expressions in variables.',
		],
	},
	{
		key: 'input',
		icon: '⌨️',
		title: 'User Input with Scanner',
		summary: 'Accepting input from users to create interactive programs.',
		details: [
			'Scanner class provides methods for reading different data types.',
			'Must handle potential input mismatches and buffer issues.',
			'Essential for creating interactive applications.',
		],
	},
	{
		key: 'casting',
		icon: '🔄',
		title: 'Type Casting and Ranges',
		summary: 'Converting between data types and understanding limitations.',
		details: [
			'Widening casts happen automatically (int to double).',
			'Narrowing casts require explicit casting and may lose data.',
			'Understanding data type ranges prevents overflow errors.',
		],
	},
	{
		key: 'compound',
		icon: '➕',
		title: 'Compound Assignment',
		summary: 'Efficient operators for modifying variables.',
		details: [
			'Compound operators combine arithmetic with assignment.',
			'More concise than writing full assignment statements.',
			'Commonly used in loops and accumulation patterns.',
		],
	},
	{
		key: 'api',
		icon: '📚',
		title: 'APIs and Libraries',
		summary: 'Using prewritten code to enhance programming efficiency.',
		details: [
			'APIs provide ready-made solutions to common problems.',
			'Math class offers mathematical functions and constants.',
			'Documentation is essential for effective API usage.',
		],
	},
	{
		key: 'objects',
		icon: '🏗️',
		title: 'Objects and Classes',
		summary: 'Introduction to object-oriented programming concepts.',
		details: [
			'Objects are instances of classes with state and behavior.',
			'String methods demonstrate object-oriented programming.',
			'Reference variables store addresses, not actual objects.',
		],
	},
];

const APCSAUnit1StudyGuide: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-orange-800">AP CSA Unit 1: Primitive Types</h1>
          <p className="text-lg text-slate-600 mt-2">Variables, data types, operators, and basic programming fundamentals.</p>
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
            onClick={() => navigate('/apcsa-study-guide/unit/1/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-orange-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit1Content.map((topic) => (
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

export default APCSAUnit1StudyGuide;
