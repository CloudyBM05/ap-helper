import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const unit2Content = [
	{
		key: '2.1',
		title: '2.1 – Objects - Instances of Classes',
		bullets: [
			[
				'**Objects**: Instances of classes that represent real-world entities or concepts',
				'**Classes**: Blueprints that define the structure and behavior of objects',
				'**Instance variables**: Attributes that store the state of an object',
				'**Methods**: Define the behavior and actions that objects can perform',
				'**Instantiation**: Creating objects using the new keyword and constructor',
				'Example: String str = new String("Hello"); creates a String object',
				'**Object reference**: Variable stores the memory address, not the actual object',
			],
		],
	},
	{
		key: '2.2',
		title: '2.2 – Creating and Storing Objects (Instantiation)',
		bullets: [
			[
				'**Constructor**: Special method used to create and initialize objects',
				'**new keyword**: Allocates memory for the object and calls the constructor',
				'**Object reference variables**: Store the memory address of objects',
				'**Null reference**: Special value indicating no object is referenced',
				'**Multiple references**: Several variables can reference the same object',
				'Example: Scanner sc1 = new Scanner(System.in); Scanner sc2 = sc1;',
				'**Memory allocation**: Objects stored in heap memory, references in stack',
			],
		],
	},
	{
		key: '2.3',
		title: '2.3 – Calling a Void Method',
		bullets: [
			[
				'**Void methods**: Methods that perform actions but do not return values',
				'**Method signature**: Includes method name, parameters, and return type',
				'**Method call**: objectReference.methodName(parameters)',
				'**Parameters vs Arguments**: Parameters are in method definition, arguments are actual values passed',
				'**Side effects**: Changes that occur as result of method execution (printing, modifying variables)',
				'Example: System.out.println("Hello"); - println is a void method',
				'**Overloaded methods**: Same name but different parameter lists',
			],
		],
	},
	{
		key: '2.4',
		title: '2.4 – Calling a Void Method with Parameters',
		bullets: [
			[
				'**Parameter passing**: Sending data to methods for processing',
				'**Actual parameters**: Values or variables passed when calling the method',
				'**Parameter matching**: Arguments must match parameters in number, order, and type',
				'**Pass by value**: Java passes copies of primitive values to methods',
				'**Pass by reference**: Object references (memory addresses) are passed',
				'Example: str.substring(1, 4) passes two int parameters to substring method',
				'**Method chaining**: Calling multiple methods in sequence when return values allow',
			],
		],
	},
	{
		key: '2.5',
		title: '2.5 – Calling a Non-void Method',
		bullets: [
			[
				'**Return value**: Data that methods send back to the calling code',
				'**Return type**: Specifies what type of data the method returns',
				'**Assignment**: Storing return values in variables of compatible type',
				'**Method composition**: Using return value of one method as argument for another',
				'**Chaining**: Calling methods on return values when appropriate',
				'Example: int length = str.length(); stores returned int value',
				'**Ignored return values**: Valid to call non-void methods without storing result',
			],
		],
	},
	{
		key: '2.6',
		title: '2.6 – String Objects - Concatenation, Literals, and More',
		bullets: [
			[
				'**String literals**: Text enclosed in double quotes, automatically creates String objects',
				'**Concatenation**: Combining strings using + operator',
				'**Implicit string conversion**: Other types automatically convert to strings in concatenation',
				'**String immutability**: String objects cannot be changed after creation',
				'**String pool**: Java optimizes memory by reusing identical string literals',
				'Example: "Hello" + "World" creates "HelloWorld"',
				'**Escape sequences**: \\n (newline), \\" (quote), \\\\ (backslash)',
			],
		],
	},
	{
		key: '2.7',
		title: '2.7 – String Methods',
		bullets: [
			[
				'**length()**: Returns number of characters in the string',
				'**substring()**: Extracts portion of string using start and end indices',
				'**indexOf()**: Finds position of character or substring, returns -1 if not found',
				'**equals()**: Compares strings for identical content (case-sensitive)',
				'**compareTo()**: Compares strings lexicographically, returns negative/zero/positive',
				'Example: str.substring(1, 4) returns characters from index 1 up to (but not including) 4',
				'**Zero-indexed**: String positions start at 0, not 1',
			],
		],
	},
	{
		key: '2.8',
		title: '2.8 – Wrapper Classes - Integer and Double',
		bullets: [
			[
				'**Wrapper classes**: Object versions of primitive data types',
				'**Integer class**: Wrapper for int primitive, provides useful methods and constants',
				'**Double class**: Wrapper for double primitive, provides methods for floating-point operations',
				'**Autoboxing**: Automatic conversion from primitive to wrapper object',
				'**Unboxing**: Automatic conversion from wrapper object to primitive',
				'**Constants**: Integer.MAX_VALUE, Integer.MIN_VALUE, Double.MAX_VALUE',
				'**Utility methods**: Integer.parseInt(), Double.parseDouble() for string conversion',
			],
		],
	},
	{
		key: '2.9',
		title: '2.9 – Using the Math Class',
		bullets: [
			[
				'**Static methods**: Called using class name, not object instance',
				'**Math.abs()**: Returns absolute value of a number',
				'**Math.pow()**: Calculates base raised to exponent power',
				'**Math.sqrt()**: Returns square root of a number',
				'**Math.random()**: Generates random double between 0.0 (inclusive) and 1.0 (exclusive)',
				'**Math constants**: Math.PI (3.14159...), Math.E (2.71828...)',
				'**Random integers**: (int)(Math.random() * range) + min for integers in range',
			],
		],
	},
];

export const timelineData = [
	{
		key: 'Classes',
		icon: '🏗️',
		title: 'Understanding Classes and Objects',
		summary: 'Classes serve as blueprints for creating objects that represent real-world entities.',
		details: [
			'Classes define the structure (instance variables) and behavior (methods) of objects.',
			'Objects are instances of classes created using the new keyword and constructors.',
		],
	},
	{
		key: 'Instantiation',
		icon: '⚡',
		title: 'Object Instantiation',
		summary: 'Creating objects in memory using constructors and the new keyword.',
		details: [
			'Constructors initialize objects when they are created.',
			'Object references store memory addresses, not the actual objects.',
			'Multiple references can point to the same object in memory.',
		],
	},
	{
		key: 'Methods',
		icon: '🔧',
		title: 'Method Calls',
		summary: 'Calling methods on objects to perform actions and retrieve information.',
		details: [
			'Void methods perform actions but do not return values.',
			'Non-void methods return data that can be stored or used.',
			'Parameters pass data to methods for processing.',
		],
	},
	{
		key: 'Strings',
		icon: '📝',
		title: 'String Objects and Methods',
		summary: 'Working with String objects and their built-in methods for text manipulation.',
		details: [
			'Strings are immutable objects that represent sequences of characters.',
			'String methods like substring(), length(), and indexOf() provide text processing capabilities.',
			'String concatenation uses the + operator to combine text.',
		],
	},
	{
		key: 'Wrappers',
		icon: '📦',
		title: 'Wrapper Classes',
		summary: 'Object versions of primitive types with additional methods and functionality.',
		details: [
			'Integer and Double classes wrap primitive int and double values.',
			'Autoboxing and unboxing automatically convert between primitives and wrappers.',
			'Wrapper classes provide utility methods and constants.',
		],
	},
	{
		key: 'Math',
		icon: '🧮',
		title: 'Math Class Usage',
		summary: 'Using static methods from the Math class for mathematical operations.',
		details: [
			'Math class provides static methods for common mathematical operations.',
			'Math.random() generates random numbers for simulations and games.',
			'Mathematical constants like Math.PI are available for calculations.',
		],
	},
];

const APCSAUnit2StudyGuide: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-orange-800">AP CSA Unit 2: Using Objects</h1>
          <p className="text-lg text-slate-600 mt-2">Understanding classes, objects, and method calls in Java programming.</p>
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
            onClick={() => navigate('/apcsa-study-guide/unit/2/quiz')}
            className="px-6 py-3 font-semibold text-lg text-slate-500 hover:text-orange-600 transition-colors"
          >
            Take Quiz
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {activeTab === 'topics' && (
            <div className="space-y-4">
              {unit2Content.map((topic) => (
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

export default APCSAUnit2StudyGuide;
