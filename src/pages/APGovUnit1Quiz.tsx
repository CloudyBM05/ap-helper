import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const apGovUnit1Quiz = [
  {
    question: `Questions 1–2 refer to the following excerpt from Federalist No. 10 (James Madison, 1787):\n“The latent causes of faction are thus sown in the nature of man... A zeal for different opinions concerning religion, concerning government... have, in turn, divided mankind into parties, inflamed them with mutual animosity... The protection of these faculties is the first object of government.”\n\n1. Based on the passage, which of the following best describes Madison\'s view of factions?`,
    options: [
      'A) Factions are dangerous and must be eliminated.',
      'B) Factions are inevitable and must be managed.',
      'C) Factions are only a concern in direct democracies.',
      'D) Factions reflect moral corruption in society.'
    ],
    answer: 1,
    explanation: "Madison believed factions are a natural part of human society and cannot be eliminated, so the government must be designed to control their effects."
  },
  {
    question: `2. Which of the following constitutional features did Madison argue would best control the effects of factions?`,
    options: [
      'A) A parliamentary government',
      'B) A strong executive branch',
      'C) A large republic with pluralism',
      'D) A bill of rights limiting government'
    ],
    answer: 2,
    explanation: "Madison argued that a large republic with many competing interests (pluralism) would prevent any one faction from dominating."
  },
  {
    question: `Questions 3–5 refer to the following scenario:\nA state passes a law allowing medical marijuana, but federal law prohibits the possession of marijuana. Federal agents arrest individuals for marijuana possession despite the state\'s law.\n\n3. This situation best reflects which of the following constitutional principles?`,
    options: [
      'A) Checks and balances',
      'B) Popular sovereignty',
      'C) Federalism',
      'D) Separation of powers'
    ],
    answer: 2,
    explanation: "This scenario demonstrates federalism, where both state and federal governments have authority, but federal law is supreme."
  },
  {
    question: `4. Which clause of the Constitution allows the federal government to override the state law in this scenario?`,
    options: [
      'A) Commerce Clause',
      'B) Supremacy Clause',
      'C) Full Faith and Credit Clause',
      'D) Necessary and Proper Clause'
    ],
    answer: 1,
    explanation: "The Supremacy Clause establishes that federal law takes precedence over conflicting state laws."
  },
  {
    question: `5. Which of the following court cases most directly relates to this conflict between state and federal authority?`,
    options: [
      'A) Marbury v. Madison',
      'B) U.S. v. Lopez',
      'C) McCulloch v. Maryland',
      'D) Baker v. Carr'
    ],
    answer: 2,
    explanation: "McCulloch v. Maryland established federal supremacy and addressed conflicts between state and federal power."
  },
  {
    question: `Questions 6–7 refer to the following excerpt from the Articles of Confederation (1781):\n"Each state retains its sovereignty, freedom, and independence, and every power... which is not by this Confederation expressly delegated to the United States..."\n\n6. Which of the following weaknesses in the Articles is best illustrated by this excerpt?`,
    options: [
      'A) The lack of a national court system',
      'B) The inability of Congress to levy taxes',
      'C) The dominance of state power over national authority',
      'D) The requirement for a unanimous vote to amend the Articles'
    ],
    answer: 2,
    explanation: "The excerpt shows that states held most of the power, making the national government weak."
  },
  {
    question: `7. What was a significant consequence of the structure described in the Articles?`,
    options: [
      'A) The rise of a strong national military',
      'B) The outbreak of war with Britain',
      'C) The creation of executive orders',
      'D) The inability of the federal government to respond to crises like Shays’ Rebellion'
    ],
    answer: 3,
    explanation: "The weak federal government could not respond effectively to crises such as Shays’ Rebellion."
  },
  {
    question: `8. Which of the following is an example of checks and balances?`,
    options: [
      'A) Congress overrides a presidential veto',
      'B) The federal government regulates interstate commerce',
      'C) States set their own election procedures',
      'D) Congress passes an unfunded mandate'
    ],
    answer: 0,
    explanation: "Overriding a presidential veto is a check by the legislative branch on the executive branch."
  },
  {
    question: `9. In a participatory democracy, which of the following actions would be most encouraged?`,
    options: [
      'A) Judges issuing majority opinions',
      'B) A political party creating a national platform',
      'C) Citizens attending local town hall meetings',
      'D) Lobbyists negotiating with lawmakers'
    ],
    answer: 2,
    explanation: "Participatory democracy emphasizes direct involvement, such as citizens attending town hall meetings."
  },
  {
    question: `10. Which of the following best explains the primary intent of the Necessary and Proper Clause?`,
    options: [
      'A) To restrict the federal government’s ability to expand its power',
      'B) To allow Congress flexibility to carry out its enumerated powers',
      'C) To authorize the president to issue executive orders',
      'D) To allow the states to pass laws not listed in the Constitution'
    ],
    answer: 1,
    explanation: "The Necessary and Proper Clause gives Congress flexibility to make laws needed to execute its listed powers."
  }
];

const APGovUnit1QuizPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(apGovUnit1Quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [crossedOut, setCrossedOut] = useState<number[][]>(Array(apGovUnit1Quiz.length).fill(null).map(() => []));
  const navigate = useNavigate();

  const stimulusGroups = useMemo(() => {
    const groups: { start: number; end: number; stimulus: string; source: string | null }[] = [];
    let i = 0;
    while (i < apGovUnit1Quiz.length) {
      const q = apGovUnit1Quiz[i];
      const match = q.question.match(/^(Questions? \d+\u2013?\d* refer to the following [^:]+:|Questions? \d+\u2013?\d* refer to the following scenario:|Questions? \d+\u2013?\d* refer to the following excerpt from [^:]+:)([\s\S]+?)\n\n/);
      if (match) {
        const stimulus = match[2].trim();
        const header = match[1];
        const infoMatch = header.match(/from ([^:]+):?\s*(\(([^)]+)\))?/i);
        let source = null;
        if (infoMatch) {
          source = infoMatch[3] ? `${infoMatch[1].trim()} — ${infoMatch[3].trim()}` : infoMatch[1].trim();
        }
        
        let end = i + 1;
        while (end < apGovUnit1Quiz.length) {
          const nextQ = apGovUnit1Quiz[end];
          const nextStimulus = nextQ.question.match(/^(Questions? \d+\u2013?\d* refer to the following [^:]+:|Questions? \d+\u2013?\d* refer to the following scenario:|Questions? \d+\u2013?\d* refer to the following excerpt from [^:]+:)(.*)/);
          if (nextStimulus) break;
          end++;
        }
        groups.push({ start: i, end: end, stimulus, source });
        i = end;
      } else {
        i++;
      }
    }
    return groups;
  }, []);

  const getStimulusForQuestion = (index: number) => {
    return stimulusGroups.find(g => index >= g.start && index < g.end) || null;
  };

  const parseQuestionText = (question: string) => {
    const match = question.match(/^(Questions? \d+\u2013?\d* refer to the following [^:]+:|Questions? \d+\u2013?\d* refer to the following scenario:|Questions? \d+\u2013?\d* refer to the following excerpt from [^:]+:)([\s\S]+?)\n\n([\s\S]*)$/);
    if (match) {
      return match[3].trim();
    }
    return question;
  };

  const handleSelect = (idx: number) => {
    setSelected(idx);
  };

  const handleCrossOut = (idx: number) => {
    setCrossedOut((prev) => {
      const copy = prev.map(arr => [...arr]);
      const arr = copy[current];
      if (arr.includes(idx)) {
        copy[current] = arr.filter(i => i !== idx);
      } else {
        copy[current] = [...arr, idx];
        if (selected === idx) setSelected(null);
      }
      return copy;
    });
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setSelected(null);
    setCurrent((prev) => prev + 1);
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
      setSelected(answers[current - 1]);
    }
  };

  const handleSubmit = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setSubmitted(true);
  };

  const handleGoBack = () => navigate(-1);

  const BackToGuideButton = () => (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
      onClick={handleGoBack}
    >
      <span className="text-xl">←</span> Back to Study Guide
    </button>
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800">
        <div className="max-w-3xl mx-auto py-12 px-4 relative">
          <BackToGuideButton />
          <div style={{ height: 48 }} />
          <h1 className="text-3xl font-bold mb-8 text-center text-red-800">Quiz Results</h1>
          {apGovUnit1Quiz.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.answer;
            const stimulusGroup = getStimulusForQuestion(idx);
            const questionText = parseQuestionText(q.question);

            return (
              <div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
                <div className="mb-2 text-slate-500">Question {idx + 1}</div>
                {stimulusGroup && stimulusGroup.start === idx && (
                  <>
                    <div className="mb-2 text-red-700 whitespace-pre-line">{stimulusGroup.stimulus}</div>
                    {stimulusGroup.source && <div className="mb-4 text-xs text-slate-500 italic">{stimulusGroup.source}</div>}
                  </>
                )}
                <div className="mb-2 font-semibold">{questionText}</div>
                <ul className="mb-2">
                  {q.options.map((opt: string, i: number) => (
                    <li
                      key={i}
                      className={`px-3 py-1 rounded ${i === q.answer ? 'bg-green-100 font-bold' : ''} ${userAnswer === i && userAnswer !== q.answer ? 'bg-red-100' : ''}`}
                    >
                      {opt}
                      {i === q.answer && <span className="ml-2 text-green-700 font-semibold">(Correct)</span>}
                      {userAnswer === i && userAnswer !== q.answer && <span className="ml-2 text-red-700">(Your answer)</span>}
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
      </div>
    );
  }

  if (current >= apGovUnit1Quiz.length) {
    return null;
  }

  const q = apGovUnit1Quiz[current];
  const stimulusGroup = getStimulusForQuestion(current);
  const questionText = parseQuestionText(q.question);

  return (
    <div className="bg-slate-50 text-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-8 relative">
            <BackToGuideButton />
            <div style={{ height: 48 }} />
            <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">AP Gov Unit 1 Quiz</h1>
            <div className="mb-4">
                {stimulusGroup && (
                    <>
                        <div className="mb-2 text-red-700 whitespace-pre-line">{stimulusGroup.stimulus}</div>
                        {stimulusGroup.source && <div className="mb-4 text-xs text-slate-500 italic">{stimulusGroup.source}</div>}
                    </>
                )}
                <div className="text-slate-500 mb-2">
                    Question {current + 1} of {apGovUnit1Quiz.length}
                </div>
                <div className="text-lg font-semibold mb-4 whitespace-pre-line">{questionText}</div>
                <div className="space-y-3">
                    {q.options.map((opt: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                            <button
                                type="button"
                                className={`px-4 py-2 rounded-lg border w-full text-left transition-all duration-200 text-base
                                    ${selected === idx ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-slate-800'}
                                    ${crossedOut[current]?.includes(idx) ? 'line-through opacity-50' : ''}
                                `}
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
            <div className="flex justify-between mt-4">
                <button
                    className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-lg shadow hover:bg-slate-300 transition-all duration-300"
                    onClick={handleBack}
                    disabled={current === 0}
                >
                    Back
                </button>
                {current < apGovUnit1Quiz.length - 1 ? (
                    <button
                        className="bg-gradient-to-r from-red-600 to-red-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-red-700 hover:to-red-500 transition-all duration-300"
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
    </div>
  );
};

export default APGovUnit1QuizPage;
