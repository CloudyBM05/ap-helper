import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Original stimuli with multiple questions per stimulus group
const unit1QuizQuestions = [
  {
    id: 1,
    stimulus: "Excerpt from Bartolomé de Las Casas, A Short Account of the Destruction of the Indies (1542)",
    text: "“The Christians have murdered so many people in their thirst for gold that I can hardly bring myself to write it… they made gallows just high enough for the feet to nearly touch the ground, and burned the Indians alive. This is the way they treated the native people of Hispaniola and Cuba.”",
    questions: [
      {
        question: "Las Casas's account is best understood in the context of:",
        options: [
          "A) the Protestant Reformation in Europe",
          "B) debates over the treatment of Native peoples",
          "C) conflict between France and Spain over colonial territory",
          "D) Spanish resistance to African slavery"
        ],
        answer: 1,
        explanation: "Las Casas's account directly addresses the treatment of indigenous peoples by Spanish colonizers, making it central to debates about Native rights and colonial practices."
      },
      {
        question: "Las Casas's main purpose in writing this account was to:",
        options: [
          "A) praise the efficiency of Spanish colonization",
          "B) justify the use of encomienda labor",
          "C) expose abuses and advocate for reform",
          "D) support Portuguese claims in the Americas"
        ],
        answer: 2,
        explanation: "Las Casas wrote to expose and condemn Spanish mistreatment of Native Americans, seeking reforms in colonial practices."
      },
      {
        question: "Which group would most likely have supported Las Casas's point of view?",
        options: [
          "A) Spanish plantation owners in the Caribbean",
          "B) Conquistadors seeking glory and riches",
          "C) Christian missionaries advocating for indigenous rights",
          "D) English settlers competing with Spanish colonies"
        ],
        answer: 2,
        explanation: "Christian missionaries advocating for indigenous rights would have aligned with Las Casas's humanitarian concerns and criticism of colonial abuses."
      }
    ]
  },
  {
    id: 2,
    stimulus: "Description of Native American Societies before European Contact",
    text: "“Native American groups across the continent adapted to their environments in diverse ways. For example, the Iroquois in the Northeast lived in settled villages and practiced agriculture, growing the ‘Three Sisters’ crops: corn, beans, and squash. In contrast, the Great Plains tribes were often nomadic, following buffalo herds and living in portable homes such as tipis. Meanwhile, societies in the Pacific Northwest relied heavily on fishing, especially salmon, and built permanent wooden homes.”",
    questions: [
      {
        question: "Which conclusion about Native American societies before European contact is best supported by the passage?",
        options: [
          "A) All Native Americans were nomadic hunter-gatherers",
          "B) Native societies adapted their lifestyles to different environments",
          "C) Agriculture was the primary economic activity across all Native groups",
          "D) Native Americans had no permanent settlements"
        ],
        answer: 1,
        explanation: "The passage demonstrates how different Native American groups adapted to their specific environments, from agricultural settlements to nomadic lifestyles."
      },
      {
        question: "The description of the ‘Three Sisters’ farming method demonstrates that:",
        options: [
          "A) Native groups in the Northeast practiced sustainable agriculture",
          "B) Native Americans lacked knowledge of crop diversity",
          "C) The Great Plains tribes were mainly agricultural",
          "D) Fishing was the main livelihood in the Northeast"
        ],
        answer: 0,
        explanation: "The ‘Three Sisters’ farming method (corn, beans, and squash) represents sophisticated agricultural knowledge and sustainable farming practices."
      }
    ]
  },
  {
    id: 3,
    stimulus: "Excerpt from Hernán Cortés's Second Letter to Charles V (1520)",
    text: "“We found in these towns large numbers of people living together… there are temples and markets, and the people appear to be skilled in crafts and commerce. Their city, Tenochtitlán, is as large as any in Spain.”",
    questions: [
      {
        question: "Cortés's description of Tenochtitlán most directly challenges which common European belief at the time?",
        options: [
          "A) That Native peoples lacked organized government",
          "B) That Native people had no religion",
          "C) That the Americas had no valuable resources",
          "D) That Native Americans had not settled in one place"
        ],
        answer: 0,
        explanation: "Cortés's description of large populations, markets, and skilled crafts directly challenges European assumptions about Native Americans lacking sophisticated social and governmental organization."
      },
      {
        question: "Which of the following was a long-term consequence of encounters like Cortés's in the New World?",
        options: [
          "A) The spread of maize cultivation to Europe",
          "B) The replacement of European monarchies by native rulers",
          "C) The collapse of major indigenous empires due to disease and conquest",
          "D) A shared empire between Spain and the Aztecs"
        ],
        answer: 2,
        explanation: "The encounter between Europeans and Native Americans led to the collapse of major indigenous empires through a combination of disease, warfare, and conquest."
      }
    ]
  },
  {
    id: 4,
    stimulus: "Excerpt on Differences in Worldviews Between Native Americans and Europeans",
    text: "“Native American groups generally viewed land as a communal resource, to be used and cared for by the community as a whole rather than owned by individuals. Their spiritual beliefs emphasized harmony with nature and the presence of spirits in animals, plants, and natural features. In contrast, European colonists believed in private property rights and viewed land primarily as a commodity to be bought, sold, and exploited. Europeans also practiced a monotheistic religion centered on Christianity, which shaped their worldview and interactions with indigenous peoples.”",
    questions: [
      {
        question: "Which of the following best describes a major source of conflict between Native Americans and Europeans based on the passage?",
        options: [
          "A) Disagreements over religious conversion methods",
          "B) Differing views on land ownership and use",
          "C) Competition for trade with Asian markets",
          "D) Conflicts over language and communication"
        ],
        answer: 1,
        explanation: "The fundamental difference in views about land ownership and use—communal versus private property—was a major source of conflict between Native Americans and Europeans."
      },
      {
        question: "How did European ideas about land ownership influence their colonial policies?",
        options: [
          "A) They led to cooperative land-sharing agreements with Native groups",
          "B) They justified the seizure and private ownership of indigenous lands",
          "C) They caused Europeans to adopt Native American communal practices",
          "D) They resulted in Europeans abandoning permanent settlements"
        ],
        answer: 1,
        explanation: "European beliefs in private property rights were used to justify the taking of Native American lands, as they viewed communally held land as 'unused' or available for private ownership."
      },
      {
        question: "The passage suggests that Native American spiritual beliefs:",
        options: [
          "A) Were identical to European Christian beliefs",
          "B) Encouraged exploitation of natural resources",
          "C) Promoted a harmonious relationship with the environment",
          "D) Were irrelevant to Native American social structure"
        ],
        answer: 2,
        explanation: "The passage explicitly states that Native American spiritual beliefs emphasized harmony with nature, showing their belief in a balanced relationship with the environment."
      }
    ]
  }
];

// Flatten questions to yield 10 questions. Each question entry will include its full stimulus and text.
const allQuestions = unit1QuizQuestions.reduce((acc: any[], group) => {
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

// Now allQuestions is a flattened array of 10 questions.
const APUSHUnitQuiz: React.FC = () => {
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
    navigate('/apush-study-guide/unit/1');
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

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Quiz Results</h1>
        {allQuestions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = userAnswer === q.answer;
          return (
            <div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
              <div className="mb-2 text-slate-500">Question {idx + 1}</div>
              <div className="mb-2 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <div className="font-semibold text-blue-800 mb-1">{q.stimulus}</div>
                <div className="text-slate-700">{q.text}</div>
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
    return null; // Fallback for invalid state
  }

  const q = allQuestions[current];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-8">
        {/* Always show the stimulus box */}
        <div className="mb-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-t-lg">
            <div className="font-semibold text-blue-800 mb-1">{q.stimulus}</div>
            <div className="text-slate-700">{q.text}</div>
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

export default APUSHUnitQuiz;
