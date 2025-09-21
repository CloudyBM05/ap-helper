import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Type definitions
interface Unit2QuizQuestion {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

interface Unit2QuizGroup {
  stimulus: string;
  text: string;
  questions: Unit2QuizQuestion[];
}

interface FlatUnit2QuizQuestion {
  stimulus: string;
  text: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

// Group questions by stimulus, matching the structure of other quizzes
const unit2QuizGroups: Unit2QuizGroup[] = [
	{
		stimulus: "Captain John Smith's writings (1608)",
		text: "He that will not work shall not eat... Our food was but a small can of barley soaked in water... and we were not above 60 persons surviving by the end of winter.",
		questions: [
			{
				question: '1. According to the passage, which of the following BEST explains the early struggles of the Jamestown settlers?',
				options: [
					'A. Native resistance to English trade',
					'B. Lack of effective leadership and preparation',
					'C. Poor tobacco cultivation techniques',
					'D. Strict enforcement of British colonial policy',
				],
				answer: 1,
				explanation: "B. Smith's account reveals poor planning and leadership - settlers weren't working effectively, they had inadequate food supplies, and most died during the harsh winter. This demonstrates a lack of preparation and effective leadership rather than external factors."
			},
			{
				question: '2. What event most helped rescue the Jamestown colony from total failure?',
				options: [
					'A. The Salem Witch Trials',
					'B. The Maryland Toleration Act',
					'C. The cultivation of tobacco as a cash crop',
					'D. The founding of the Massachusetts Bay Colony',
				],
				answer: 2,
				explanation: "C. The cultivation of tobacco as a cash crop, particularly after John Rolfe's successful experiments, provided the economic foundation that saved Jamestown and made it profitable for the Virginia Company."
			}
		]
	},
	{
		stimulus: "The Mayflower Compact (1620)",
		text: "...we do solemnly and mutually in the presence of God, covenant and combine ourselves together into a civil body politic... for our better ordering and preservation.",
		questions: [
			{
				question: '3. The Mayflower Compact is significant in American history because it:',
				options: [
					'A. Established the first successful English colony',
					'B. Guaranteed complete religious freedom',
					'C. Created a foundation for self-government in the colonies',
					'D. Abolished the monarchy in the colonies',
				],
				answer: 2,
				explanation: 'C. The Mayflower Compact established the principle of self-governance through mutual consent and democratic decision-making, serving as an early model for colonial self-government that would influence later democratic developments.'
			},
			{
				question: '4. Which of the following groups most likely supported the ideas expressed in the Mayflower Compact?',
				options: [
					'A. Southern plantation owners',
					'B. Spanish conquistadors',
					'C. Puritan settlers in New England',
					'D. French fur traders',
				],
				answer: 2,
				explanation: "C. Puritan settlers in New England strongly believed in covenant theology and self-governance under God's authority. Their religious and political beliefs aligned with the democratic and religious principles expressed in the Mayflower Compact."
			}
		]
	},
	{
		stimulus: "The Maryland Toleration Act (1649)",
		text: "That no person professing to believe in Jesus Christ shall from henceforth be troubled, molested or discountenanced for his or her religion...",
		questions: [
			{
				question: '5. The Maryland Toleration Act was primarily intended to:',
				options: [
					'A. Promote Puritanism in New England',
					'B. Protect Catholics in a Protestant-dominated colony',
					'C. Encourage slavery among Christian colonists',
					'D. Ban all non-Christian religions from the colony',
				],
				answer: 1,
				explanation: 'B. Maryland was founded as a haven for Catholics fleeing Protestant persecution in England. The Toleration Act was designed to protect the Catholic minority from Protestant discrimination while still maintaining Christian religious requirements.'
			}
		]
	},
	{
		stimulus: "British Mercantilist Policy",
		text: "Colonies existed to enrich the mother country. Laws such as the Navigation Acts ensured that trade favored Britain and that raw materials flowed to English markets.",
		questions: [
			{
				question: '6. What was the primary purpose of British mercantilism?',
				options: [
					'A. To encourage colonial self-sufficiency',
					'B. To promote free trade with other European powers',
					'C. To maximize wealth by maintaining a favorable balance of trade',
					'D. To establish political equality between colonies and the Crown',
				],
				answer: 2,
				explanation: 'C. Mercantilism aimed to maximize national wealth by ensuring that exports exceeded imports, creating a favorable balance of trade. Colonies provided raw materials to the mother country and served as markets for finished goods.'
			},
			{
				question: '7. One effect of the Navigation Acts was:',
				options: [
					'A. The immediate end of the Atlantic slave trade',
					'B. Greater colonial freedom in manufacturing goods',
					'C. Increased smuggling by colonial merchants',
					'D. Legalization of religious tolerance across all colonies',
				],
				answer: 2,
				explanation: 'C. The Navigation Acts restricted colonial trade to British ships and required certain goods to pass through British ports. These restrictions led to widespread smuggling as colonists sought to trade directly with other nations for better prices.'
			}
		]
	},
	{
		stimulus: "Account of the Pueblo Revolt (1680)",
		text: "The Pueblos destroyed Catholic churches and drove the Spanish from the region... though the Spanish later reconquered the territory, they moderated their policies.",
		questions: [
			{
				question: '8. The Pueblo Revolt was significant because it:',
				options: [
					'A. Marked the first successful British colony in the West',
					'B. Demonstrated Native resistance to Spanish colonization',
					'C. Ended all European presence in New Mexico',
					'D. Unified Spanish and Pueblo interests in New Spain',
				],
				answer: 1,
				explanation: 'B. The Pueblo Revolt of 1680 was one of the most successful Native American uprisings against European colonization, showing that indigenous peoples could organize effective resistance and temporarily expel European colonizers from their territories.'
			}
		]
	},
	{
		stimulus: "Enlightenment Thought and the Great Awakening",
		text: 'All men are born with natural rights to life, liberty, and property. —John Locke / "Sinners in the Hands of an Angry God" —Jonathan Edwards',
		questions: [
			{
				question: '9. How did Enlightenment ideas differ from those of the First Great Awakening?',
				options: [
					'A. Enlightenment thinkers promoted emotional appeals over reason',
					'B. Enlightenment thinkers emphasized science and rational thought, while Awakening preachers focused on personal salvation',
					'C. The Enlightenment only impacted England, not the colonies',
					'D. Both movements were strongly anti-religious',
				],
				answer: 1,
				explanation: 'B. The Enlightenment emphasized reason, science, and rational thinking about government and society, while the Great Awakening focused on emotional religious experience, personal salvation, and direct relationship with God through faith rather than reason.'
			},
			{
				question: '10. What was one major result of the First Great Awakening?',
				options: [
					'A. The colonies rejected religious practices',
					'B. Religion became centralized under royal authority',
					'C. A spirit of equality and resistance to elite authority grew among colonists',
					'D. Enlightenment ideas were rejected in favor of monarchy',
				],
				answer: 2,
				explanation: 'C. The Great Awakening promoted the idea that all people could have a direct relationship with God, challenging traditional religious hierarchy. This democratic spirit of equality and resistance to established authority would later influence political resistance to British rule.'
			}
		]
	}
];

// Flatten questions for navigation, but keep group info for rendering
const allQuestions: FlatUnit2QuizQuestion[] = unit2QuizGroups.reduce((acc: FlatUnit2QuizQuestion[], group) => {
	group.questions.forEach((q) => {
		acc.push({
			stimulus: group.stimulus,
			text: group.text,
			question: q.question,
			options: q.options,
			answer: q.answer,
			explanation: q.explanation
		});
	});
	return acc;
}, []);

const APUSHUnit2Quiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(allQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [crossedOut, setCrossedOut] = useState<number[][]>(Array(allQuestions.length).fill(null).map(() => []));
  const navigate = useNavigate();

  const handleSelect = (idx: number) => {
    setSelected(idx);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setSelected(null);
    setCurrent((prev) => prev + 1);
  };

  const handleSubmit = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setSubmitted(true);
  };

  const handleGoBack = () => {
    navigate('/apush-study-guide/unit/2');
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
      setSelected(answers[current - 1]);
    }
  };

  const handleCrossOut = (idx: number) => {
    setCrossedOut((prev) => {
      const copy = prev.map(arr => [...arr]);
      const arr = copy[current];
      if (arr.includes(idx)) {
        copy[current] = arr.filter(i => i !== idx);
      } else {
        copy[current] = [...arr, idx];
      }
      return copy;
    });
  };

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
      onClick={() => navigate('/apush-study-guide/unit/2')}
    >
      <span className="text-xl">←</span> Back to Study Guide
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} /> {/* Add vertical space below the button */}
        <h1 className="text-3xl font-bold mb-8 text-center">Quiz Results</h1>
        {allQuestions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = userAnswer === q.answer;
          return (
            <div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
              <div className="mb-2 text-slate-500">Question {idx + 1}</div>
              <div className="mb-2 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <div className="font-semibold text-blue-800 mb-1">{q.stimulus}</div>
                {q.text && <div className="text-slate-700">{q.text}</div>}
              </div>
              <div className="mb-2 font-semibold">{q.question}</div>
              <ul className="mb-2">
                {q.options.map((opt: string, i: number) => (
                  <li
                    key={i}
                    className={`px-3 py-1 rounded ${i === q.answer ? 'bg-green-100 font-bold' : ''} ${userAnswer === i && userAnswer !== q.answer ? 'bg-red-100' : ''}`}
                  >
                    {opt}
                    {i === q.answer && (
                      <span className="ml-2 text-green-700 font-semibold">(Correct)</span>
                    )}
                    {userAnswer === i && userAnswer !== q.answer && (
                      <span className="ml-2 text-red-700">(Your answer)</span>
                    )}
                  </li>
                ))}
              </ul>
              {userAnswer === null ? (
                <div className="text-yellow-700 mb-1">You did not answer this question.</div>
              ) : isCorrect ? (
                <div className="text-green-700 mb-1">Correct!</div>
              ) : (
                <div className="text-red-700 mb-1">Incorrect.</div>
              )}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                <p className="text-blue-800">{q.explanation}</p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
            onClick={handleGoBack}
          >
            Go Back to Unit
          </button>
        </div>
      </div>
    );
  }

  if (current >= allQuestions.length) {
    return null;
  }

	// Find the group for the current question
	let groupIdx = 0, qIdx = current;
	for (let i = 0; i < unit2QuizGroups.length; i++) {
		const group = unit2QuizGroups[i];
		if (qIdx < group.questions.length) {
			groupIdx = i;
			break;
		} else {
			qIdx -= group.questions.length;
		}
	}
	const group = unit2QuizGroups[groupIdx];
	const q = group.questions[qIdx];


  return (
    <div className="max-w-2xl mx-auto py-12 px-4 relative">
      {BackToGuideButton}
      <div style={{ height: 48 }} /> {/* Add vertical space below the button */}
      <div className="mb-8">
        <div className="mb-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-t-lg min-h-[32px]">
            <div className="font-semibold text-blue-800 mb-1">{group.stimulus}</div>
            <div className="text-slate-700">{group.text}</div>
          </div>
        </div>
        <div className="text-slate-500 mb-2">
          Question {current + 1} of {allQuestions.length}
        </div>
        <div className="text-lg font-semibold mb-4">{q.question}</div>
        <div className="space-y-3">
          {q.options.map((opt: string, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg border w-full text-left transition-all duration-200 ${
                  selected === idx ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-slate-800'
                } ${crossedOut[current]?.includes(idx) ? 'line-through opacity-50' : ''}`}
                onClick={() => handleSelect(idx)}
                disabled={crossedOut[current]?.includes(idx)}
              >
                {opt}
              </button>
              <button
                type="button"
                className={`ml-2 px-2 py-1 rounded border text-xs ${crossedOut[current]?.includes(idx) ? 'bg-red-200 text-red-700 border-red-400' : 'bg-slate-100 text-slate-500 border-slate-300'}`}
                onClick={() => handleCrossOut(idx)}
                aria-label="Cross out option"
              >
                {crossedOut[current]?.includes(idx) ? 'Uncross' : 'Cross out'}
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-lg shadow hover:bg-slate-300 transition-all duration-300"
          onClick={handleBack}
          disabled={current === 0}
        >
          Back
        </button>
        {current < allQuestions.length - 1 ? (
          <button
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
            onClick={handleNext}
            disabled={selected === null}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
            onClick={handleSubmit}
            disabled={selected === null}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default APUSHUnit2Quiz;
