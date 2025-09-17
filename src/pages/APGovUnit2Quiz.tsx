import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const apGovUnit2Quiz = [
  // Questions 1–3 (stimulus group)
  {
    question: `Questions 1–3 refer to the following excerpt from Federalist No. 51 (James Madison, 1788):\n“Ambition must be made to counteract ambition... It may be a reflection on human nature that such devices should be necessary to control the abuses of government. But what is government itself, but the greatest of all reflections on human nature? If men were angels, no government would be necessary.”\n\n1. Based on the excerpt, which constitutional principle is Madison defending?`,
    options: [
      'A) Federalism',
      'B) Judicial review',
      'C) Separation of powers',
      'D) Direct democracy'
    ],
    answer: 2,
    explanation: 'Madison is defending the principle of separation of powers, arguing that government must be structured so that each branch can check the others because people are not angels.'
  },
  {
    question: `2. Which of the following modern features best reflects the principle Madison describes?`,
    options: [
      'A) Senate confirmation of Supreme Court nominees',
      'B) Use of executive agreements in foreign policy',
      'C) State control of education',
      'D) Term limits for House members'
    ],
    answer: 0,
    explanation: 'Senate confirmation of Supreme Court nominees is a modern example of one branch checking another, reflecting separation of powers.'
  },
  {
    question: `3. Which of the following situations best illustrates Madison’s view that “ambition must be made to counteract ambition”?`,
    options: [
      'A) The Supreme Court overturning a state law',
      'B) Congress overriding a presidential veto',
      'C) A president issuing an executive order',
      'D) Congress amending the Constitution'
    ],
    answer: 1,
    explanation: 'Congress overriding a presidential veto is a direct example of one branch using its power to check another, as Madison described.'
  },
  // Questions 4–6 (stimulus group)
  {
    question: `Questions 4–6 refer to the following scenario:\nA member of Congress introduces a bill to reform immigration policy. The bill is passed by the House but fails in the Senate due to a filibuster. The member of Congress attempts to build bipartisan support and reintroduces a revised version in the next session.\n\n4. What feature of the Senate allowed the bill to be blocked?`,
    options: [
      'A) Cloture motion',
      'B) Power of the purse',
      'C) Filibuster',
      'D) Discharge petition'
    ],
    answer: 2,
    explanation: 'The filibuster allows a minority of senators to block a bill by extending debate, unless 60 senators vote for cloture.'
  },
  {
    question: `5. Which of the following powers of Congress is most relevant in creating immigration legislation?`,
    options: [
      'A) The power to declare war',
      'B) The power to regulate interstate commerce',
      'C) The power to coin money',
      'D) The power to establish post offices'
    ],
    answer: 1,
    explanation: 'Congress’s power to regulate interstate commerce is the constitutional basis for most federal immigration laws.'
  },
  {
    question: `6. What action can end a filibuster in the Senate?`,
    options: [
      'A) A pocket veto',
      'B) A cloture vote with 60 senators',
      'C) A simple majority vote',
      'D) A presidential executive order'
    ],
    answer: 1,
    explanation: 'A filibuster can only be ended by a cloture vote, which requires 60 senators.'
  },
  // Questions 7–8 (stimulus group)
  {
    question: `Questions 7–8 refer to the following excerpt from Article III of the Constitution:\n“The judicial power of the United States shall be vested in one Supreme Court, and in such inferior Courts as the Congress may from time to time ordain and establish...”\n\n7. Which of the following statements is supported by this excerpt?`,
    options: [
      'A) Congress cannot limit the Court’s appellate jurisdiction',
      'B) The Constitution allows for a system of dual sovereignty',
      'C) Congress has the power to establish lower federal courts',
      'D) The Court’s power to declare laws unconstitutional is listed'
    ],
    answer: 2,
    explanation: 'The excerpt explicitly gives Congress the authority to create lower federal courts beneath the Supreme Court.'
  },
  {
    question: `8. Which case established the power of judicial review for the Supreme Court?`,
    options: [
      'A) McCulloch v. Maryland',
      'B) U.S. v. Lopez',
      'C) Marbury v. Madison',
      'D) Baker v. Carr'
    ],
    answer: 2,
    explanation: 'Marbury v. Madison (1803) established the Supreme Court’s power of judicial review.'
  },
  // Questions 9–10 (stimulus group)
  {
    question: `Questions 9–10 refer to the following scenario:\nA federal agency, the Environmental Protection Agency (EPA), enforces clean air regulations and creates new rules on vehicle emissions. An automobile manufacturer challenges the EPA’s authority in court.\n\n9. Which of the following best describes the role of the EPA in this scenario?`,
    options: [
      'A) Executive enforcement',
      'B) Legislative oversight',
      'C) Judicial review',
      'D) Discharge petition'
    ],
    answer: 0,
    explanation: 'The EPA is part of the executive branch and is responsible for enforcing laws and regulations.'
  },
  {
    question: `10. What principle gives agencies like the EPA the ability to create regulations?`,
    options: [
      'A) Reserved powers',
      'B) Discretionary rulemaking authority',
      'C) Enumerated powers',
      'D) Cloture procedures'
    ],
    answer: 1,
    explanation: 'Congress delegates discretionary rulemaking authority to agencies like the EPA, allowing them to create detailed regulations.'
  }
];

const APGovUnit2QuizPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(apGovUnit2Quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [crossedOut, setCrossedOut] = useState<number[][]>(Array(apGovUnit2Quiz.length).fill(null).map(() => []));
  const navigate = useNavigate();

  const stimulusGroups = useMemo(() => {
    const groups: { start: number; end: number; stimulus: string; source: string | null }[] = [];
    let i = 0;
    while (i < apGovUnit2Quiz.length) {
      const q = apGovUnit2Quiz[i];
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
        while (end < apGovUnit2Quiz.length) {
          const nextQ = apGovUnit2Quiz[end];
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
          {apGovUnit2Quiz.map((q, idx) => {
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

  if (current >= apGovUnit2Quiz.length) {
    return null;
  }

  const q = apGovUnit2Quiz[current];
  const stimulusGroup = getStimulusForQuestion(current);
  const questionText = parseQuestionText(q.question);

  return (
    <div className="bg-slate-50 text-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-8 relative">
            <BackToGuideButton />
            <div style={{ height: 48 }} />
            <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">AP Gov Unit 2 Quiz</h1>
            <div className="mb-4">
                {stimulusGroup && (
                    <>
                        <div className="mb-2 text-red-700 whitespace-pre-line">{stimulusGroup.stimulus}</div>
                        {stimulusGroup.source && <div className="mb-4 text-xs text-slate-500 italic">{stimulusGroup.source}</div>}
                    </>
                )}
                <div className="text-slate-500 mb-2">
                    Question {current + 1} of {apGovUnit2Quiz.length}
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
                {current < apGovUnit2Quiz.length - 1 ? (
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

export default APGovUnit2QuizPage;
