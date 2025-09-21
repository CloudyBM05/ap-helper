import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit9QuizQuestions = [
    {
        id: 1,
        stimulus: 'Ronald Reagan, First Inaugural Address, 1981',
        text: '“In this present crisis, government is not the solution to our problem; government is the problem... It is time to reawaken this industrial giant, to get government back within its means, and to lighten our punitive tax burden.”',
        questions: [
            {
                question: '1. The ideas expressed in this excerpt were most consistent with which of the following?',
                options: [
                    'A) The New Deal',
                    'B) The Great Society',
                    'C) Modern Conservatism',
                    'D) Progressivism',
                ],
                answer: 2,
                explanation:
                    "Reagan's speech is a foundational text of modern conservatism, which advocates for lower taxes, reduced government spending, and deregulation. This marked a significant shift away from the liberal traditions of the New Deal and Great Society.",
            },
            {
                question: '2. The policies enacted as a result of the sentiments expressed in the speech, often called “Reaganomics,” led most directly to which of the following?',
                options: [
                    'A) A significant increase in social welfare spending.',
                    'B) A decrease in the national debt.',
                    'C) A significant reduction in income taxes, particularly for the wealthy.',
                    'D) An expansion of environmental regulations.',
                ],
                answer: 2,
                explanation:
                    '“Reaganomics,” or supply-side economics, was centered on large tax cuts, especially the Economic Recovery Act of 1981, which reduced income tax rates across the board. These policies also led to an increase in the national debt, not a decrease.',
            },
        ],
    },
    {
        id: 2,
        stimulus: 'George H. W. Bush, Address to the Nation on the Invasion of Iraq, 1991',
        text: '“Just two hours ago, allied air forces began an attack on military targets in Iraq and Kuwait... This conflict started August 2nd when the dictator of Iraq invaded a small and helpless neighbor. Kuwait...was crushed, its people brutalized. Five months ago, Saddam Hussein started this cruel war against Kuwait. Tonight, the battle has been joined.”',
        questions: [
            {
                question: '3. The conflict described in this speech is most directly a result of what post-Cold War reality?',
                options: [
                    'A) The decline of the United States as a global power.',
                    'B) The emergence of the United States as the world’s sole superpower.',
                    'C) The spread of communism in the Middle East.',
                    'D) The success of isolationist foreign policy.',
                ],
                answer: 1,
                explanation:
                    "With the Soviet Union dissolved, the United States was the sole superpower, enabling it to lead a broad international coalition to repel Iraq’s invasion of Kuwait. This action demonstrated America’s new geopolitical dominance.",
            },
            {
                question: '4. The war described in the speech had which of the following consequences for the United States?',
                options: [
                    'A) A long-term occupation of Iraq.',
                    'B) A renewed focus on environmental issues.',
                    'C) Increased American dependence on foreign oil.',
                    'D) A short, successful military campaign followed by a decision not to remove Saddam Hussein from power.',
                ],
                answer: 3,
                explanation:
                    'The Persian Gulf War was a decisive military victory that successfully liberated Kuwait. However, the coalition chose not to invade Baghdad or remove Saddam Hussein, a decision that would have significant implications for future conflicts in the region.',
            },
        ],
    },
    {
        id: 3,
        stimulus: 'Excerpt from the North American Free Trade Agreement (NAFTA), 1994',
        text: '“The Government of Canada, the Government of the United Mexican States and the Government of the United States of America, resolved to... CREATE an expanded and secure market for the goods and services produced in their territories, REDUCE distortions to trade, ESTABLISH clear and mutually advantageous rules governing their trade...”',
        questions: [
            {
                question: '5. The primary goal of the agreement from which this text is excerpted was to...',
                options: [
                    'A) Increase tariffs on goods traded between member nations.',
                    'B) Limit immigration from Mexico to the United States.',
                    'C) Eliminate trade barriers and create a free-trade zone.',
                    'D) Strengthen the power of labor unions in all three countries.',
                ],
                answer: 2,
                explanation:
                    'NAFTA’s central purpose was to eliminate most tariffs and other trade barriers between the U.S., Canada, and Mexico, creating one of the world’s largest free-trade zones to stimulate economic growth.',
            },
            {
                question: '6. Debates over policies like NAFTA in the 1990s and 2000s were most directly a result of which of the following economic trends?',
                options: [
                    'A) The decline of the service sector economy.',
                    'B) The outsourcing of manufacturing jobs and deindustrialization.',
                    'C) A decrease in the national debt.',
                    'D) The success of small, local businesses over large corporations.',
                ],
                answer: 1,
                explanation:
                    'A major criticism of NAFTA was that it accelerated the process of deindustrialization in the United States, as companies moved manufacturing jobs to Mexico to take advantage of lower labor costs. This contributed to wage stagnation and the decline of unions.',
            },
        ],
    },
    {
        id: 4,
        stimulus: 'George W. Bush, Address to the Nation, September 11, 2001',
        text: '“Today, our fellow citizens, our way of life, our very freedom came under attack in a series of deliberate and deadly terrorist acts... The pictures of airplanes flying into buildings, fires burning, huge structures collapsing, have filled us with disbelief, terrible sadness, and a quiet, unyielding anger. These acts of mass murder were intended to frighten our nation into chaos and retreat. But they have failed. Our country is strong.”',
        questions: [
            {
                question: '7. The immediate U.S. response to the events described in this speech was...',
                options: [
                    'A) The declaration of a “War on Terror” and the invasion of Afghanistan.',
                    'B) The signing of new diplomatic treaties with Middle Eastern nations.',
                    'C) A retreat into an isolationist foreign policy.',
                    'D) The creation of the Department of Homeland Security and the passage of the Patriot Act.',
                ],
                answer: 0,
                explanation:
                    'In the immediate aftermath of the 9/11 attacks, President Bush declared a global “War on Terror.” The first military action was the invasion of Afghanistan in October 2001 to overthrow the Taliban regime, which had harbored the al-Qaeda terrorists responsible for the attacks.',
            },
            {
                question: '8. The long-term consequences of the events described in the speech included which of the following?',
                options: [
                    'A) A decrease in government surveillance and an expansion of civil liberties.',
                    'B) A period of unprecedented peace and stability in the Middle East.',
                    'C) Debates over the balance between national security and civil liberties, and prolonged military engagements in Iraq and Afghanistan.',
                    'D) A reduction in the U.S. defense budget.',
                ],
                answer: 2,
                explanation:
                    'The War on Terror led to long, costly wars in Afghanistan and Iraq. Domestically, it sparked intense debate over the Patriot Act and increased government surveillance, which raised significant concerns about the erosion of civil liberties in the name of security.',
            },
        ],
    },
];

const allQuestions = unit9QuizQuestions.reduce((acc: any[], group) => {
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

const APUSHUnit9Quiz: React.FC = () => {
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
        navigate('/apush-study-guide/unit/9');
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
            onClick={() => navigate('/apush-study-guide/unit/9')}
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

export default APUSHUnit9Quiz;
