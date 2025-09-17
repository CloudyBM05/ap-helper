import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const apGovUnit4Quiz = [
  // Questions 1–3 (stimulus group)
  {
    question: `Questions 1–3 refer to the following excerpt from a speech by President Ronald Reagan (1981):\n“In this present crisis, government is not the solution to our problem; government is the problem. It is my intention to curb the size and influence of the federal establishment...”\n\n1. Which political ideology is most closely aligned with the views expressed in the excerpt?`,
    options: [
      'A) Liberalism',
      'B) Libertarianism',
      'C) Conservatism',
      'D) Progressivism'
    ],
    answer: 2,
    explanation: 'Conservatism is most closely aligned with Reagan’s view that government should be limited and less involved in economic affairs.'
  },
  {
    question: `2. A supporter of Reagan’s statement would most likely favor which of the following policies?`,
    options: [
      'A) Expanding federal welfare programs',
      'B) Increasing federal funding for public education',
      'C) Deregulating private industries',
      'D) Raising corporate tax rates'
    ],
    answer: 2,
    explanation: 'Deregulating private industries is consistent with the belief that government should have a smaller role in the economy.'
  },
  {
    question: `3. The belief that government should reduce its role in the economy is most consistent with which economic theory?`,
    options: [
      'A) Keynesian economics',
      'B) Supply-side economics',
      'C) Monetary policy theory',
      'D) Federalist economic model'
    ],
    answer: 1,
    explanation: 'Supply-side economics advocates for lower taxes and less regulation, arguing that this will stimulate economic growth.'
  },
  // Questions 4–6 (stimulus group)
  {
    question: `Questions 4–6 refer to the following scenario:\nA national poll finds that 78% of Americans support increased background checks for gun buyers. However, a bill to expand background checks fails in the Senate.\n\n4. What does this scenario best illustrate?`,
    options: [
      'A) The impact of judicial review',
      'B) Political efficacy',
      'C) The influence of minority interest groups',
      'D) The concept of federalism'
    ],
    answer: 2,
    explanation: 'The scenario shows how minority interest groups can influence legislation even when a majority of the public supports a policy.'
  },
  {
    question: `5. Which of the following best explains how public opinion polls should be conducted to ensure accuracy?`,
    options: [
      'A) Use of leading questions to guide responses',
      'B) Relying on volunteers from political parties',
      'C) Random sampling of a representative population',
      'D) Conducting polls only in battleground states'
    ],
    answer: 2,
    explanation: 'Random sampling of a representative population is essential for accurate and unbiased polling results.'
  },
  {
    question: `6. What term best describes the difference between the results of a poll and the actual views of the population?`,
    options: [
      'A) Standard deviation',
      'B) Confidence interval',
      'C) Sampling error',
      'D) Response distortion'
    ],
    answer: 2,
    explanation: 'Sampling error is the statistical term for the difference between poll results and the true population values.'
  },
  // Questions 7–8 (stimulus group)
  {
    question: `Questions 7–8 refer to the following graph:\nGraph Description: The chart shows voter turnout by age group in the 2020 presidential election. Voters aged 65+ had the highest turnout rate, while voters aged 18–29 had the lowest.\n\n7. Which of the following is the most likely explanation for the voting pattern shown?`,
    options: [
      'A) Younger voters are more likely to vote along party lines',
      'B) Older voters are more likely to have established voting habits',
      'C) Younger voters are more likely to be discouraged by exit polls',
      'D) Older voters tend to support third-party candidates'
    ],
    answer: 1,
    explanation: 'Older voters are more likely to have established voting habits, which leads to higher turnout among this group.'
  },
  {
    question: `8. Which concept explains how younger individuals often adopt political beliefs from their families?`,
    options: [
      'A) Political efficacy',
      'B) Political socialization',
      'C) Retrospective voting',
      'D) Liberalization theory'
    ],
    answer: 1,
    explanation: 'Political socialization is the process by which individuals acquire political beliefs, often from family.'
  },
  // Questions 9–10 (stimulus group)
  {
    question: `Questions 9–10 refer to the following description of two voters:\nVoter A is a small-business owner who favors low taxes, opposes most regulations, and supports strong national defense.\nVoter B supports universal health care, stronger environmental protections, and expanded civil rights for minorities.\n\n9. Based on their preferences, which ideological labels best match Voter A and Voter B?`,
    options: [
      'A) A = Liberal, B = Conservative',
      'B) A = Libertarian, B = Populist',
      'C) A = Conservative, B = Liberal',
      'D) A = Moderate, B = Libertarian'
    ],
    answer: 2,
    explanation: 'Voter A’s preferences align with conservatism, while Voter B’s align with liberalism.'
  },
  {
    question: `10. Voter A is most likely to support which of the following economic policies?`,
    options: [
      'A) Expanding Social Security benefits',
      'B) Raising corporate tax rates',
      'C) Implementing government-run health care',
      'D) Reducing business regulations'
    ],
    answer: 3,
    explanation: 'A conservative small-business owner would most likely support reducing business regulations.'
  }
];

const APGovUnit4QuizPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(apGovUnit4Quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [crossedOut, setCrossedOut] = useState<number[][]>(Array(apGovUnit4Quiz.length).fill(null).map(() => []));
  const navigate = useNavigate();

  const stimulusGroups = useMemo(() => {
    const groups: { start: number; end: number; stimulus: string; source: string | null }[] = [];
    let i = 0;
    while (i < apGovUnit4Quiz.length) {
      const q = apGovUnit4Quiz[i];
      const match = q.question.match(/^(Questions? \d+\u2013?\d* refer to the following [^:]+:|Questions? \d+\u2013?\d* refer to the following scenario:|Questions? \d+\u2013?\d* refer to the following excerpt from [^:]+:|Questions? \d+\u2013?\d* refer to the following graph:)([\s\S]+?)\n\n/);
      if (match) {
        const stimulus = match[2].trim();
        const header = match[1];
        const infoMatch = header.match(/from ([^:]+):?\s*(\(([^)]+)\))?/i);
        let source = null;
        if (infoMatch) {
          source = infoMatch[3] ? `${infoMatch[1].trim()} — ${infoMatch[3].trim()}` : infoMatch[1].trim();
        }
        
        let end = i + 1;
        while (end < apGovUnit4Quiz.length) {
          const nextQ = apGovUnit4Quiz[end];
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
    const match = question.match(/^(Questions? \d+\u2013?\d* refer to the following [^:]+:|Questions? \d+\u2013?\d* refer to the following scenario:|Questions? \d+\u2013?\d* refer to the following excerpt from [^:]+:|Questions? \d+\u2013?\d* refer to the following graph:)([\s\S]+?)\n\n([\s\S]*)$/);
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
          {apGovUnit4Quiz.map((q, idx) => {
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

  if (current >= apGovUnit4Quiz.length) {
    return null;
  }

  const q = apGovUnit4Quiz[current];
  const stimulusGroup = getStimulusForQuestion(current);
  const questionText = parseQuestionText(q.question);

  return (
    <div className="bg-slate-50 text-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-8 relative">
            <BackToGuideButton />
            <div style={{ height: 48 }} />
            <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">AP Gov Unit 4 Quiz</h1>
            <div className="mb-4">
                {stimulusGroup && (
                    <>
                        <div className="mb-2 text-red-700 whitespace-pre-line">{stimulusGroup.stimulus}</div>
                        {stimulusGroup.source && <div className="mb-4 text-xs text-slate-500 italic">{stimulusGroup.source}</div>}
                    </>
                )}
                <div className="text-slate-500 mb-2">
                    Question {current + 1} of {apGovUnit4Quiz.length}
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
                {current < apGovUnit4Quiz.length - 1 ? (
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

export default APGovUnit4QuizPage;
