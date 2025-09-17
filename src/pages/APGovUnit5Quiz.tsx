import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const apGovUnit5Quiz = [
  // Questions 1–2 (stimulus group)
  {
    question: `Questions 1–2 refer to the following excerpt from the Voting Rights Act of 1965:\n“No voting qualification or prerequisite to voting... shall be imposed or applied by any State or political subdivision to deny or abridge the right of any citizen of the United States to vote on account of race or color.”\n\n1. Which constitutional provision does the Voting Rights Act of 1965 most directly enforce?`,
    options: [
      'A) Article I, Section 4',
      'B) The 15th Amendment',
      'C) The 1st Amendment',
      'D) The 14th Amendment'
    ],
    answer: 1,
    explanation: 'The 15th Amendment prohibits denying the right to vote based on race or color. The Voting Rights Act of 1965 was passed to enforce this constitutional protection.'
  },
  {
    question: `2. Which of the following best explains why Congress passed the Voting Rights Act of 1965?`,
    options: [
      'A) To increase voter turnout among college students',
      'B) To protect political parties from gerrymandering',
      'C) To eliminate racial discrimination in voting practices',
      'D) To require voter ID laws in all states'
    ],
    answer: 2,
    explanation: 'Congress passed the Voting Rights Act of 1965 to address and eliminate racial discrimination in voting, especially in states with a history of discriminatory practices.'
  },
  // Questions 3–4 (stimulus group)
  {
    question: `Questions 3–4 refer to the following graph:\nGraph description: The graph shows turnout in presidential and midterm elections from 1980 to 2020. Turnout is consistently higher in presidential elections.\n\n3. Which of the following best explains the trend shown in the graph?`,
    options: [
      'A) Presidential elections are held less frequently',
      'B) Midterm elections receive more media coverage',
      'C) Voters perceive presidential elections as more impactful',
      'D) States offer more early voting options during midterms'
    ],
    answer: 2,
    explanation: 'Voters generally see presidential elections as more important and impactful, which leads to higher turnout compared to midterms.'
  },
  {
    question: `4. Which demographic group is most likely to vote in both midterm and presidential elections?`,
    options: [
      'A) Young adults aged 18–29',
      'B) Senior citizens aged 65 and older',
      'C) Recent immigrants',
      'D) High school students'
    ],
    answer: 1,
    explanation: 'Senior citizens are the most consistent voters and are most likely to participate in both midterm and presidential elections.'
  },
  // Questions 5–6 (stimulus group)
  {
    question: `Questions 5–6 refer to the following scenario:\nA group of voters supports stronger environmental regulations and universal healthcare. They typically vote for candidates from the Democratic Party and have consistently supported liberal causes for over a decade.\n\n5. What model of voting behavior does this group most likely follow?`,
    options: [
      'A) Prospective voting',
      'B) Retrospective voting',
      'C) Rational choice voting',
      'D) Party-line voting'
    ],
    answer: 3,
    explanation: 'Party-line voting is when voters consistently support one party across elections, as described in the scenario.'
  },
  {
    question: `6. Which of the following most directly explains their voting behavior?`,
    options: [
      'A) Candidate personality',
      'B) Media framing',
      'C) Party identification',
      'D) Voting eligibility requirements'
    ],
    answer: 2,
    explanation: 'Party identification is the strongest predictor of voting behavior for individuals who consistently support one party.'
  },
  // Questions 7–8 (stimulus group)
  {
    question: `Questions 7–8 refer to the following information:\nIn the 2020 Democratic primaries, some states held open primaries while others held closed primaries. In open primary states, registered Republicans and independents were allowed to vote in the Democratic primary.\n\n7. Which of the following is most likely a criticism of the open primary system?`,
    options: [
      'A) It discourages voter participation',
      'B) It results in lower turnout among independents',
      'C) It allows voters from opposing parties to influence nominee selection',
      'D) It increases the likelihood of runoff elections'
    ],
    answer: 2,
    explanation: 'A common criticism of open primaries is that they allow members of opposing parties to vote and potentially influence the selection of a party’s nominee.'
  },
  {
    question: `8. Which of the following is a benefit of closed primaries?`,
    options: [
      'A) They limit the role of political parties',
      'B) They prevent crossover voting by opposition members',
      'C) They increase turnout among unaffiliated voters',
      'D) They encourage independent candidates to run'
    ],
    answer: 1,
    explanation: 'Closed primaries help ensure that only registered party members select the party’s nominee, preventing crossover voting.'
  },
  // Questions 9–10 (stimulus group)
  {
    question: `Questions 9–10 refer to the following description of campaign financing:\nCandidate A receives thousands of small-dollar donations from individuals and spends the money directly on campaign ads.\nCandidate B benefits from a Super PAC that runs ads supporting their candidacy but is not formally coordinated with the campaign.\n\n9. What type of contribution is Candidate A receiving?`,
    options: [
      'A) Soft money',
      'B) Hard money',
      'C) Bundled donations',
      'D) Independent expenditures'
    ],
    answer: 1,
    explanation: 'Hard money refers to direct contributions to a candidate’s campaign, which are regulated and reported.'
  },
  {
    question: `10. What Supreme Court decision made Candidate B’s campaign support legal under the First Amendment?`,
    options: [
      'A) Baker v. Carr (1962)',
      'B) McCulloch v. Maryland (1819)',
      'C) Shaw v. Reno (1993)',
      'D) Citizens United v. FEC (2010)'
    ],
    answer: 3,
    explanation: 'Citizens United v. FEC (2010) ruled that independent expenditures by corporations and unions are protected speech, allowing Super PACs to spend unlimited amounts as long as they do not coordinate with candidates.'
  }
];

const APGovUnit5QuizPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(apGovUnit5Quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [crossedOut, setCrossedOut] = useState<number[][]>(Array(apGovUnit5Quiz.length).fill(null).map(() => []));
  const navigate = useNavigate();

  const stimulusGroups = useMemo(() => {
    const groups: { start: number; end: number; stimulus: string; source: string | null }[] = [];
    let i = 0;
    while (i < apGovUnit5Quiz.length) {
      const q = apGovUnit5Quiz[i];
      const match = q.question.match(/^(Questions? \d+\u2013?\d* refer to the following [^:]+:|Questions? \d+\u2013?\d* refer to the following scenario:|Questions? \d+\u2013?\d* refer to the following graph:|Questions? \d+\u2013?\d* refer to the following excerpt from [^:]+:)([\s\S]+?)\n\n/);
      if (match) {
        const stimulus = match[2].trim();
        const header = match[1];
        const infoMatch = header.match(/from ([^:]+):?\s*(\(([^)]+)\))?/i);
        let source = null;
        if (infoMatch) {
          source = infoMatch[3] ? `${infoMatch[1].trim()} — ${infoMatch[3].trim()}` : infoMatch[1].trim();
        }
        
        let end = i + 1;
        while (end < apGovUnit5Quiz.length) {
          const nextQ = apGovUnit5Quiz[end];
          const nextStimulus = nextQ.question.match(/^(Questions? \d+\u2013?\d* refer to the following [^:]+:|Questions? \d+\u2013?\d* refer to the following scenario:|Questions? \d+\u2013?\d* refer to the following graph:|Questions? \d+\u2013?\d* refer to the following excerpt from [^:]+:)(.*)/);
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
    const match = question.match(/^(Questions? \d+\u2013?\d* refer to the following [^:]+:|Questions? \d+\u2013?\d* refer to the following scenario:|Questions? \d+\u2013?\d* refer to the following graph:|Questions? \d+\u2013?\d* refer to the following excerpt from [^:]+:)([\s\S]+?)\n\n([\s\S]*)$/);
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
          {apGovUnit5Quiz.map((q, idx) => {
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

  if (current >= apGovUnit5Quiz.length) {
    return null;
  }

  const q = apGovUnit5Quiz[current];
  const stimulusGroup = getStimulusForQuestion(current);
  const questionText = parseQuestionText(q.question);

  return (
    <div className="bg-slate-50 text-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-8 relative">
            <BackToGuideButton />
            <div style={{ height: 48 }} />
            <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">AP Gov Unit 5 Quiz</h1>
            <div className="mb-4">
                {stimulusGroup && (
                    <>
                        <div className="mb-2 text-red-700 whitespace-pre-line">{stimulusGroup.stimulus}</div>
                        {stimulusGroup.source && <div className="mb-4 text-xs text-slate-500 italic">{stimulusGroup.source}</div>}
                    </>
                )}
                <div className="text-slate-500 mb-2">
                    Question {current + 1} of {apGovUnit5Quiz.length}
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
                {current < apGovUnit5Quiz.length - 1 ? (
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

export default APGovUnit5QuizPage;
