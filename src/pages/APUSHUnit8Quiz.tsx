import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit8QuizQuestions = [
    {
        id: 1,
        stimulus: 'Lyndon B. Johnson, Remarks on the Signing of the Civil Rights Act of 1964',
        text: '“We believe that all men are created equal. Yet many are denied equal treatment... We believe that all men have certain unalienable rights. Yet many Americans do not enjoy those rights. We believe that all men are entitled to the blessings of liberty. Yet millions are being deprived of those blessings—not because of their own failures, but because of the color of their skin.”',
        questions: [
            {
                question: '1. The ideas expressed by Johnson in this speech are most consistent with which of the following?',
                options: [
                    'A) The decision in Plessy v. Ferguson',
                    'B) The principles of the Progressive Era',
                    'C) The goals of the Great Society',
                    'D) The foreign policy of containment',
                ],
                answer: 2,
                explanation:
                    'Johnson\'s speech directly reflects the goals of his Great Society programs, which aimed to eliminate poverty and racial injustice. The Civil Rights Act of 1964 was a cornerstone of this agenda, seeking to end segregation and discrimination, thereby extending the “blessings of liberty” to all Americans.',
            },
            {
                question: '2. The passage of the Civil Rights Act of 1964 was a direct result of which of the following?',
                options: [
                    'A) The March on Washington for Jobs and Freedom',
                    'B) The end of the Vietnam War',
                    'C) The success of the New Deal',
                    'D) The decline of the Republican Party',
                ],
                answer: 0,
                explanation:
                    'The massive and peaceful March on Washington in 1963, where Martin Luther King Jr. delivered his “I Have a Dream” speech, created significant public pressure and moral momentum that helped ensure the passage of the Civil Rights Act of 1964. It demonstrated the power and unity of the Civil Rights Movement.',
            },
        ],
    },
    {
        id: 2,
        stimulus: 'Gulf of Tonkin Resolution, 1964',
        text: '“Resolved by the Senate and House of Representatives... That the Congress approves and supports the determination of the President, as Commander in Chief, to take all necessary measures to repel any armed attack against the forces of the United States and to prevent further aggression.”',
        questions: [
            {
                question: '3. This resolution led most directly to which of the following?',
                options: [
                    'A) A formal declaration of war against North Vietnam',
                    'B) A significant escalation of U.S. involvement in Vietnam',
                    'C) The withdrawal of U.S. troops from Southeast Asia',
                    'D) The signing of a peace treaty with North Vietnam',
                ],
                answer: 1,
                explanation:
                    'The Gulf of Tonkin Resolution gave President Lyndon B. Johnson broad authority to use military force in Vietnam without a formal declaration of war. This led to a massive escalation of the conflict, including the deployment of hundreds of thousands of U.S. combat troops and the start of a sustained bombing campaign.',
            },
            {
                question: '4. The powers granted to the President in this resolution were later curtailed by which of the following?',
                options: [
                    'A) The Truman Doctrine',
                    'B) The Marshall Plan',
                    'C) The War Powers Act of 1973',
                    'D) The Camp David Accords',
                ],
                answer: 2,
                explanation:
                    'The War Powers Act of 1973 was passed by Congress to reassert its constitutional authority over war-making. It was a direct response to the controversial and open-ended nature of the Gulf of Tonkin Resolution, and it placed limits on the president’s ability to commit U.S. forces to an armed conflict without congressional approval.',
            },
        ],
    },
    {
        id: 3,
        stimulus: 'Betty Friedan, The Feminine Mystique, 1963',
        text: '“The problem lay buried, unspoken, for many years in the minds of American women. It was a strange stirring, a sense of dissatisfaction... Each suburban wife struggled with it alone. As she made the beds, shopped for groceries... she was afraid to ask even of herself the silent question — ‘Is this all?’”',
        questions: [
            {
                question: '5. The sentiment expressed in this excerpt is most associated with which of the following?',
                options: [
                    'A) The first-wave feminist movement of the 19th century',
                    'B) The rise of the modern conservative movement',
                    'C) The beginning of the second-wave feminist movement',
                    'D) The cultural conformity of the 1920s',
                ],
                answer: 2,
                explanation:
                    'Betty Friedan’s *The Feminine Mystique* is widely credited with sparking the second-wave feminist movement of the 1960s and 1970s. The book articulated the widespread unhappiness of women who were confined to the domestic sphere and sought greater personal fulfillment and professional opportunities.',
            },
            {
                question: '6. Which of the following was a significant legislative achievement of the movement inspired by this book?',
                options: [
                    'A) The 19th Amendment',
                    'B) The Equal Rights Amendment (ERA)',
                    'C) Title IX of the Education Amendments of 1972',
                    'D) The Social Security Act',
                ],
                answer: 2,
                explanation:
                    'Title IX is a landmark law that prohibits sex-based discrimination in any school or any other education program that receives funding from the federal government. It was a major victory for the second-wave feminist movement, dramatically increasing women’s access to higher education and athletic programs.',
            },
        ],
    },
    {
        id: 4,
        stimulus: 'Richard Nixon, Address to the Nation on the War in Vietnam, 1969',
        text: '“And so tonight—to you, the great silent majority of my fellow Americans—I ask for your support. I pledged in my campaign for the Presidency to end the war in a way that we could win the peace. The more support I can have from the American people, the sooner that pledge can be redeemed.”',
        questions: [
            {
                question: '7. Nixon’s appeal to the “silent majority” was an attempt to counter which of the following?',
                options: [
                    'A) The growing anti-war protest movement',
                    'B) The influence of the Soviet Union',
                    'C) The demands of the Civil Rights Movement',
                    'D) The expansion of liberal social programs',
                ],
                answer: 0,
                explanation:
                    'Nixon’s “silent majority” speech was a political strategy to mobilize moderate Americans who he believed were being overshadowed by the vocal anti-war protesters. He sought their support for his policy of “Vietnamization” and a gradual, honorable withdrawal from the war, positioning himself as a representative of the nation’s patriotic, less-radical citizens.',
            },
            {
                question: '8. Which of the following events most directly contradicted Nixon’s promise to “win the peace”?',
                options: [
                    'A) The signing of the SALT I treaty',
                    'B) The opening of relations with China',
                    'C) The fall of Saigon in 1975',
                    'D) The Watergate scandal',
                ],
                answer: 2,
                explanation:
                    'Despite Nixon’s promises, the U.S.-backed government of South Vietnam collapsed in 1975 when North Vietnamese forces captured the capital, Saigon. This event marked the final, definitive failure of American efforts to secure a non-communist South Vietnam and contradicted the idea of having won a lasting peace.',
            },
        ],
    },
    {
        id: 5,
        stimulus: 'Ronald Reagan, First Inaugural Address, 1981',
        text: '“In this present crisis, government is not the solution to our problem; government is the problem... It is time to reawaken this industrial giant, to get government back within its means, and to lighten our punitive tax burden.”',
        questions: [
            {
                question: '9. Reagan’s speech reflects a shift toward which of the following political philosophies?',
                options: [
                    'A) Keynesian economics',
                    'B) New Deal liberalism',
                    'C) Modern conservatism',
                    'D) Cold War internationalism',
                ],
                answer: 2,
                explanation:
                    'Reagan’s address is a classic statement of modern conservatism, which advocates for lower taxes, reduced government spending, and deregulation of the economy. This philosophy marked a significant departure from the New Deal and Great Society traditions of an activist federal government.',
            },
            {
                question: '10. The policies inspired by this speech, often called “Reaganomics,” included which of the following?',
                options: [
                    'A) Increasing the top marginal tax rate',
                    'B) Expanding the federal bureaucracy',
                    'C) Significant cuts in taxes and social spending',
                    'D) Strengthening the power of labor unions',
                ],
                answer: 2,
                explanation:
                    '“Reaganomics,” or supply-side economics, was centered on the idea that cutting taxes for corporations and the wealthy would stimulate investment and benefit the entire economy. This was accompanied by significant cuts to social programs and deregulation, representing a clear implementation of the philosophy outlined in his speech.',
            },
        ],
    },
];

const allQuestions = unit8QuizQuestions.reduce((acc: any[], group) => {
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

const APUSHUnit8Quiz: React.FC = () => {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [answers, setAnswers] = useState<(number | null)[]> (
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
        navigate('/apush-study-guide/unit/8');
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
            onClick={() => navigate('/apush-study-guide/unit/8')}
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

export default APUSHUnit8Quiz;
