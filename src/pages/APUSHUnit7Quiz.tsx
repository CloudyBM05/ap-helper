import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit7QuizQuestions = [
    {
        id: 1,
        stimulus: 'Senator Albert Beveridge, 1900',
        text: '“God has not been preparing the English-speaking and Teutonic peoples for a thousand years for nothing… He has made us the master organizers of the world to establish system where chaos reigns. He has given us the spirit of progress to overwhelm the forces of reaction… The Philippines are ours forever... Our flag shall establish justice, liberty, and law.”',
        questions: [
            {
                question: '1. Which ideology is most reflected in Beveridge’s statement?',
                options: [
                    'A) Socialism',
                    'B) Isolationism',
                    'C) Social Darwinism',
                    'D) Anti-imperialism',
                ],
                answer: 2,
                explanation:
                    'Beveridge’s speech reflects Social Darwinism, the belief that certain nations and races were superior and destined to rule over others. This ideology was used to justify American imperialism and expansion, framing it as a moral obligation to "civilize" other peoples.',
            },
            {
                question: '2. Which of the following best explains the historical context of Beveridge’s statement?',
                options: [
                    'A) The outbreak of World War I',
                    'B) The end of the Spanish-American War',
                    'C) The rejection of the League of Nations',
                    'D) The beginning of the Progressive Movement',
                ],
                answer: 1,
                explanation:
                    'This speech was given in 1900, shortly after the Spanish-American War (1898), which resulted in the U.S. acquiring the Philippines, Guam, and Puerto Rico. The debate over what to do with these new territories, particularly the Philippines, was a central political issue of the time.',
            },
        ],
    },
    {
        id: 2,
        stimulus: 'Woodrow Wilson’s Address to Congress, April 2, 1917',
        text: '“The world must be made safe for democracy. Its peace must be planted upon the tested foundations of political liberty... We are but one of the champions of the rights of mankind.”',
        questions: [
            {
                question: '3. What event directly followed Wilson’s speech?',
                options: [
                    'A) The signing of the Versailles Treaty',
                    'B) The declaration of war on Germany',
                    'C) The passing of the Social Security Act',
                    'D) The establishment of the League of Nations',
                ],
                answer: 1,
                explanation:
                    'This address was President Wilson\'s formal request to Congress to declare war on Germany. Citing Germany\'s unrestricted submarine warfare and the Zimmermann Telegram, Wilson argued that the U.S. must enter World War I to protect democracy, leading to the official declaration of war.',
            },
            {
                question: '4. Wilson’s idealism in this speech most directly influenced which of the following?',
                options: [
                    'A) The Roosevelt Corollary',
                    'B) The Fourteen Points',
                    'C) The Dawes Act',
                    'D) The Platt Amendment',
                ],
                answer: 1,
                explanation:
                    'The idealistic principles in this speech—making the world "safe for democracy" and championing human rights—were the foundation for Wilson\'s Fourteen Points. This later peace plan called for self-determination, free trade, and a League of Nations to ensure future global peace.',
            },
        ],
    },
    {
        id: 3,
        stimulus: 'Excerpt from the 1920 Republican Platform',
        text: '“We condemn the experiment in paternalism involved in the Democratic administration’s attempt to control industry, agriculture, labor, and capital... We pledge ourselves to a policy of strict economy in government expenditures.”',
        questions: [
            {
                question: '5. Which of the following best reflects the public mood that helped Republicans win in 1920?',
                options: [
                    'A) Desire to expand the welfare state',
                    'B) Support for Wilson’s foreign policy',
                    'C) Disillusionment with wartime government control',
                    'D) Enthusiasm for joining the League of Nations',
                ],
                answer: 2,
                explanation:
                    'After World War I, many Americans were tired of the government\'s heavy-handed wartime economic controls and interventions. The Republican platform tapped into this public sentiment by promising a "return to normalcy" with less government spending and regulation.',
            },
            {
                question: '6. The candidate who most benefited from this Republican platform in 1920 was:',
                options: [
                    'A) Franklin D. Roosevelt',
                    'B) Woodrow Wilson',
                    'C) Warren G. Harding',
                    'D) Theodore Roosevelt',
                ],
                answer: 2,
                explanation:
                    'Warren G. Harding ran on the 1920 Republican platform with the famous slogan "A Return to Normalcy." He won a landslide victory by promising to end the era of Progressive reforms and wartime government activism, which appealed to a nation weary of international entanglements and domestic upheaval.',
            },
        ],
    },
    {
        id: 4,
        stimulus: 'Franklin D. Roosevelt’s First Inaugural Address, 1933',
        text: '“The only thing we have to fear is fear itself… This great Nation will endure as it has endured, will revive and will prosper... Our greatest primary task is to put people to work.”',
        questions: [
            {
                question: '7. Which major event was the immediate context for Roosevelt’s speech?',
                options: [
                    'A) The U.S. entry into World War II',
                    'B) The Red Scare',
                    'C) The Great Depression',
                    'D) The Bonus Army March',
                ],
                answer: 2,
                explanation:
                    'Roosevelt gave this speech at the height of the Great Depression in 1933. With millions unemployed and the banking system on the verge of collapse, his address was intended to restore public confidence and signal a new, active approach from the federal government to combat the economic crisis.',
            },
            {
                question: '8. Which of the following New Deal programs was most directly aligned with Roosevelt’s call to “put people to work”?',
                options: [
                    'A) Social Security Act',
                    'B) Civilian Conservation Corps',
                    'C) Wagner Act',
                    'D) Hawley-Smoot Tariff',
                ],
                answer: 1,
                explanation:
                    'The Civilian Conservation Corps (CCC) was a prime example of a New Deal program designed to "put people to work." It hired unemployed young men for public conservation projects, such as planting trees and improving national parks, providing them with jobs and a steady income.',
            },
        ],
    },
    {
        id: 5,
        stimulus: 'Executive Order 9066 (1942)',
        text: '“The successful prosecution of the war requires every possible protection against espionage and sabotage... I hereby authorize and direct the Secretary of War to prescribe military areas... from which any or all persons may be excluded.”',
        questions: [
            {
                question: '9. The policy authorized in this order resulted in:',
                options: [
                    'A) The desegregation of military units',
                    'B) The internment of Japanese Americans',
                    'C) The recruitment of women into the military',
                    'D) The relocation of German POWs',
                ],
                answer: 1,
                explanation:
                    'Executive Order 9066 was the legal basis for the forced removal and incarceration of over 120,000 Japanese Americans, two-thirds of whom were U.S. citizens, from the West Coast during World War II. They were relocated to internment camps in the interior of the country based on fears of espionage and sabotage.',
            },
            {
                question: '10. The Supreme Court upheld this policy in which case?',
                options: [
                    'A) Roe v. Wade',
                    'B) Brown v. Board of Education',
                    'C) Schenck v. United States',
                    'D) Korematsu v. United States',
                ],
                answer: 3,
                explanation:
                    'In the 1944 case Korematsu v. United States, the Supreme Court ruled that the forced internment of Japanese Americans was constitutional, arguing that it was justified by military necessity during wartime. This decision has since been widely condemned as a grave civil liberties violation.',
            },
        ],
    },
];

const allQuestions = unit7QuizQuestions.reduce((acc: any[], group) => {
    group.questions.forEach((q) => {
        acc.push({
            stimulus: group.stimulus,
            text: group.text,
            question: q.question,
            options: q.options,
            answer: q.answer,
            explanation: q.explanation,
        });
    });
    return acc;
}, []);

const APUSHUnit7Quiz: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [answers, setAnswers] = useState<(number | null)[]>(
        Array(allQuestions.length).fill(null)
    );
    const [submitted, setSubmitted] = useState(false);
    const [crossedOut, setCrossedOut] = useState<number[][]>(
        Array(allQuestions.length)
            .fill(null)
            .map(() => [])
    );
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
        navigate('/apush-study-guide/unit/7');
    };

    const handleBack = () => {
        if (current > 0) {
            setCurrent((prev) => prev - 1);
            setSelected(answers[current - 1]);
        }
    };

    const handleCrossOut = (idx: number) => {
        setCrossedOut((prev) => {
            const copy = prev.map((arr) => [...arr]);
            const arr = copy[current];
            if (arr.includes(idx)) {
                copy[current] = arr.filter((i) => i !== idx);
            } else {
                copy[current] = [...arr, idx];
            }
            return copy;
        });
    };

    const BackToGuideButton = (
        <button
            className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
            onClick={() => navigate('/apush-study-guide/unit/7')}
        >
            <span className="text-xl">←</span> Back to Study Guide
        </button>
    );

    if (submitted) {
        return (
            <div className="max-w-3xl mx-auto py-12 px-4 relative">
                {BackToGuideButton}
                <div style={{ height: 48 }} />
                <h1 className="text-3xl font-bold mb-8 text-center">Quiz Results</h1>
                {allQuestions.map((q, idx) => {
                    const userAnswer = answers[idx];
                    const isCorrect = userAnswer === q.answer;
                    return (
                        <div
                            key={idx}
                            className="mb-8 p-6 rounded-xl border bg-white shadow"
                        >
                            <div className="mb-2 text-slate-500">Question {idx + 1}</div>
                            <div className="mb-2 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                                <div className="font-semibold text-blue-800 mb-1">
                                    {q.stimulus}
                                </div>
                                <div className="text-slate-700">{q.text}</div>
                            </div>
                            <div className="mb-2 font-semibold">{q.question}</div>
                            <ul className="mb-2">
                                {q.options.map((opt: string, i: number) => (
                                    <li
                                        key={i}
                                        className={`px-3 py-1 rounded ${
                                            i === q.answer
                                                ? 'bg-green-100 font-bold'
                                                : ''
                                        } ${
                                            userAnswer === i && userAnswer !== q.answer
                                                ? 'bg-red-100'
                                                : ''
                                        }`}
                                    >
                                        {opt}
                                        {i === q.answer && (
                                            <span className="ml-2 text-green-700 font-semibold">
                                                (Correct)
                                            </span>
                                        )}
                                        {userAnswer === i && userAnswer !== q.answer && (
                                            <span className="ml-2 text-red-700">
                                                (Your answer)
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            {userAnswer === null ? (
                                <div className="text-yellow-700 mb-1">
                                    You did not answer this question.
                                </div>
                            ) : isCorrect ? (
                                <div className="text-green-700 mb-1">Correct!</div>
                            ) : (
                                <div className="text-red-700 mb-1">Incorrect.</div>
                            )}
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <h4 className="font-semibold text-blue-900 mb-2">
                                    Explanation:
                                </h4>
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

    const q = allQuestions[current];

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 relative">
            {BackToGuideButton}
            <div style={{ height: 48 }} />
            <div className="mb-8">
                <div className="mb-4">
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-t-lg">
                        <div className="font-semibold text-blue-800 mb-1">
                            {q.stimulus}
                        </div>
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
                                    selected === idx
                                        ? 'bg-blue-500 text-white border-blue-600'
                                        : 'bg-white text-slate-800'
                                } ${
                                    crossedOut[current]?.includes(idx)
                                        ? 'line-through opacity-50'
                                        : ''
                                }`}
                                onClick={() => handleSelect(idx)}
                                disabled={crossedOut[current]?.includes(idx)}
                            >
                                {opt}
                            </button>
                            <button
                                type="button"
                                className={`ml-2 px-2 py-1 rounded border text-xs ${
                                    crossedOut[current]?.includes(idx)
                                        ? 'bg-red-200 text-red-700 border-red-400'
                                        : 'bg-slate-100 text-slate-500 border-slate-300'
                                }`}
                                onClick={() => handleCrossOut(idx)}
                                aria-label="Cross out option"
                            >
                                {crossedOut[current]?.includes(idx)
                                    ? 'Uncross'
                                    : 'Cross out'}
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
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
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

export default APUSHUnit7Quiz;
