import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const apGovUnit3Quiz = [
  // Questions 1–3 (stimulus group)
  {
    question: `Questions 1–3 refer to the following excerpt from the First Amendment of the U.S. Constitution:\n“Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble...”\n\n1. Which Supreme Court case is most associated with interpreting the "establishment clause" of the First Amendment?`,
    options: [
      'A) Engel v. Vitale',
      'B) New York Times Co. v. United States',
      'C) Schenck v. United States',
      'D) Gideon v. Wainwright'
    ],
    answer: 0,
    explanation: 'Engel v. Vitale (1962) ruled that school-sponsored prayer in public schools violated the establishment clause, clarifying the government cannot promote religion.'
  },
  {
    question: `2. Which of the following is the best example of “free exercise” protections under the First Amendment?`,
    options: [
      'A) The government banning a religious practice deemed harmful to public safety',
      'B) Allowing citizens to wear religious symbols in public schools',
      'C) Prohibiting religious speech in public parks',
      'D) Limiting religious speech to private property only'
    ],
    answer: 1,
    explanation: 'Allowing citizens to wear religious symbols in public schools is a direct example of protecting the free exercise of religion.'
  },
  {
    question: `3. Which test or doctrine does the Supreme Court apply when deciding cases involving freedom of speech?`,
    options: [
      'A) Clear and Present Danger test',
      'B) Lemon test',
      'C) Exclusionary rule',
      'D) Strict scrutiny'
    ],
    answer: 0,
    explanation: 'The Clear and Present Danger test is used to determine when speech can be limited if it poses a significant threat.'
  },
  // Questions 4–6 (stimulus group)
  {
    question: `Questions 4–6 refer to the following scenario:\nIn 1964, the Civil Rights Act outlawed discrimination based on race, color, religion, sex, or national origin in public accommodations. Despite the law, a restaurant owner refuses service to African American customers.\n\n4. Which amendment provides the constitutional basis for Congress to pass the Civil Rights Act?`,
    options: [
      'A) First Amendment',
      'B) Fourteenth Amendment',
      'C) Fifteenth Amendment',
      'D) Tenth Amendment'
    ],
    answer: 1,
    explanation: 'The Fourteenth Amendment’s Equal Protection Clause gives Congress the authority to address discrimination by states and individuals.'
  },
  {
    question: `5. What legal doctrine was overturned by the Civil Rights Act and later Supreme Court decisions such as Brown v. Board of Education?`,
    options: [
      'A) Separate but equal',
      'B) Incorporation',
      'C) Judicial activism',
      'D) Affirmative action'
    ],
    answer: 0,
    explanation: 'The "separate but equal" doctrine, established in Plessy v. Ferguson, was overturned by Brown v. Board and the Civil Rights Act.'
  },
  {
    question: `6. What government agency enforces laws prohibiting discrimination in employment and public accommodations?`,
    options: [
      'A) Federal Election Commission (FEC)',
      'B) Equal Employment Opportunity Commission (EEOC)',
      'C) Environmental Protection Agency (EPA)',
      'D) Department of Homeland Security (DHS)'
    ],
    answer: 1,
    explanation: 'The EEOC is responsible for enforcing federal laws that make it illegal to discriminate against a job applicant or employee.'
  },
  // Questions 7–8 (stimulus group)
  {
    question: `Questions 7–8 refer to the following excerpt from the Fourteenth Amendment:\n“No state shall... deprive any person of life, liberty, or property, without due process of law; nor deny to any person within its jurisdiction the equal protection of the laws.”\n\n7. Which Supreme Court case used the Equal Protection Clause of the Fourteenth Amendment to apply most Bill of Rights protections to the states?`,
    options: [
      'A) Plessy v. Ferguson',
      'B) Brown v. Board of Education',
      'C) Gideon v. Wainwright',
      'D) Mapp v. Ohio'
    ],
    answer: 3,
    explanation: 'Mapp v. Ohio (1961) incorporated the exclusionary rule to the states, using the Fourteenth Amendment’s due process and equal protection clauses.'
  },
  {
    question: `8. The due process clause has been interpreted to include which of the following rights?`,
    options: [
      'A) The right to privacy',
      'B) The right to bear arms',
      'C) The right to vote for women',
      'D) The right to free speech'
    ],
    answer: 0,
    explanation: 'The Supreme Court has interpreted the due process clause to protect rights not explicitly listed, such as the right to privacy.'
  },
  // Questions 9–10 (stimulus group)
  {
    question: `Questions 9–10 refer to the following scenario:\nA high school student wears a black armband to school in protest of a war. The school suspends the student for this expression.\n\n9. Which Supreme Court case protected the student’s right to symbolic speech in public schools?`,
    options: [
      'A) Tinker v. Des Moines',
      'B) Hazelwood School District v. Kuhlmeier',
      'C) Morse v. Frederick',
      'D) Bethel School District v. Fraser'
    ],
    answer: 0,
    explanation: 'Tinker v. Des Moines (1969) protected students’ right to symbolic speech in public schools as long as it does not cause substantial disruption.'
  },
  {
    question: `10. Which limitation on free speech is most likely to be upheld in a school setting?`,
    options: [
      'A) Speech that causes substantial disruption',
      'B) Speech that offends other students',
      'C) Speech that criticizes the government',
      'D) Speech promoting unpopular religious views'
    ],
    answer: 0,
    explanation: 'The Supreme Court has ruled that schools can limit speech that causes substantial disruption to the learning environment.'
  }
];

const APGovUnit3QuizPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(apGovUnit3Quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [crossedOut, setCrossedOut] = useState<number[][]>(Array(apGovUnit3Quiz.length).fill(null).map(() => []));
  const navigate = useNavigate();

  const stimulusGroups = useMemo(() => {
    const groups: { start: number; end: number; stimulus: string; source: string | null }[] = [];
    let i = 0;
    while (i < apGovUnit3Quiz.length) {
      const q = apGovUnit3Quiz[i];
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
        while (end < apGovUnit3Quiz.length) {
          const nextQ = apGovUnit3Quiz[end];
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
          {apGovUnit3Quiz.map((q, idx) => {
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

  if (current >= apGovUnit3Quiz.length) {
    return null;
  }

  const q = apGovUnit3Quiz[current];
  const stimulusGroup = getStimulusForQuestion(current);
  const questionText = parseQuestionText(q.question);

  return (
    <div className="bg-slate-50 text-slate-800">
        <div className="max-w-2xl mx-auto px-4 py-8 relative">
            <BackToGuideButton />
            <div style={{ height: 48 }} />
            <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">AP Gov Unit 3 Quiz</h1>
            <div className="mb-4">
                {stimulusGroup && (
                    <>
                        <div className="mb-2 text-red-700 whitespace-pre-line">{stimulusGroup.stimulus}</div>
                        {stimulusGroup.source && <div className="mb-4 text-xs text-slate-500 italic">{stimulusGroup.source}</div>}
                    </>
                )}
                <div className="text-slate-500 mb-2">
                    Question {current + 1} of {apGovUnit3Quiz.length}
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
                {current < apGovUnit3Quiz.length - 1 ? (
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

export default APGovUnit3QuizPage;
