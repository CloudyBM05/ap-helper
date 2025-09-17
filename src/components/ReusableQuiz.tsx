import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface QuizQuestion {
    id: string;
    stimulus?: string;
    stem: string;
    options: string[];
    answer: string;
    explanation?: string;
}

interface QuizData {
    questions: QuizQuestion[];
    answerKey: { [key: string]: string };
}

interface ReusableQuizProps {
    quizData: QuizData;
    quizTitle: string;
    resultsRoute?: string; // Optional route for a dedicated results page
}

const ReusableQuiz: React.FC<ReusableQuizProps> = ({ quizData, quizTitle, resultsRoute }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
    const [crossedOutOptions, setCrossedOutOptions] = useState<{ [key: string]: string[] }>({});
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    const currentQuestion = quizData.questions[currentQuestionIndex];

    const handleOptionSelect = (questionId: string, option: string) => {
        setUserAnswers(prev => ({ ...prev, [questionId]: option }));
    };

    const handleCrossOut = (e: React.MouseEvent, questionId: string, option: string) => {
        e.preventDefault(); // Prevent context menu
        setCrossedOutOptions(prev => {
            const currentCrossed = prev[questionId] || [];
            if (currentCrossed.includes(option)) {
                return { ...prev, [questionId]: currentCrossed.filter(o => o !== option) };
            } else {
                return { ...prev, [questionId]: [...currentCrossed, option] };
            }
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        if (resultsRoute) {
            navigate(resultsRoute, { state: { userAnswers, quizData } });
        } else {
            setShowResults(true);
        }
    };

    const calculateScore = () => {
        return quizData.questions.reduce((score, q) => {
            return userAnswers[q.id] === q.answer ? score + 1 : score;
        }, 0);
    };

    const getOptionText = (option: string) => {
        return option.substring(option.indexOf(')') + 1).trim();
    };

    if (showResults) {
        const score = calculateScore();
        const total = quizData.questions.length;
        const percentage = ((score / total) * 100).toFixed(2);

        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-slate-800">
                <h2 className="text-3xl font-bold text-red-800 mb-4">Quiz Results</h2>
                <p className="text-xl mb-2">You scored <span className="font-bold">{score}</span> out of <span className="font-bold">{total}</span> ({percentage}%)</p>
                <div className="mt-6 space-y-4">
                    {quizData.questions.map(q => {
                        const userAnswer = userAnswers[q.id];
                        const isCorrect = userAnswer === q.answer;
                        return (
                            <div key={q.id} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                                <p className="font-semibold">{q.stem}</p>
                                <p className="text-sm mt-2">Your answer: <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>{userAnswer ? getOptionText(userAnswer) : 'Not answered'}</span></p>
                                {!isCorrect && <p className="text-sm">Correct answer: <span className="text-green-700">{getOptionText(q.answer)}</span></p>}
                                {q.explanation && <p className="text-sm mt-1 text-slate-600"><em>Explanation: {q.explanation}</em></p>}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-800 mb-1">{quizTitle}</h2>
            <p className="text-slate-600 mb-4">Question {currentQuestionIndex + 1} of {quizData.questions.length}</p>
            
            <div key={currentQuestion.id} className="mb-6">
                {currentQuestion.stimulus && <p className="mb-4 text-slate-600 whitespace-pre-wrap border-l-4 border-slate-200 pl-4">{currentQuestion.stimulus}</p>}
                <p className="font-semibold text-slate-800 mb-4 text-lg">{currentQuestion.stem}</p>
                
                <div className="space-y-2">
                    {currentQuestion.options.map(option => {
                        const isSelected = userAnswers[currentQuestion.id] === option;
                        const isCrossedOut = (crossedOutOptions[currentQuestion.id] || []).includes(option);
                        
                        let buttonClass = "w-full text-left p-3 rounded-lg border transition-colors duration-150 ";
                        if (isCrossedOut) {
                            buttonClass += "line-through bg-slate-100 text-slate-400 border-slate-200";
                        } else if (isSelected) {
                            buttonClass += "bg-red-100 border-red-400 text-red-800 font-semibold";
                        } else {
                            buttonClass += "bg-white hover:bg-red-50 border-slate-300";
                        }

                        return (
                            <button
                                key={option}
                                onClick={() => !isCrossedOut && handleOptionSelect(currentQuestion.id, option)}
                                onContextMenu={(e) => handleCrossOut(e, currentQuestion.id, option)}
                                className={buttonClass}
                            >
                                {getOptionText(option)}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0}
                    className="py-2 px-6 bg-slate-200 text-slate-800 font-bold rounded-lg hover:bg-slate-300 transition-colors disabled:bg-slate-100 disabled:text-slate-400"
                >
                    Back
                </button>
                
                {currentQuestionIndex === quizData.questions.length - 1 ? (
                    <button
                        onClick={handleSubmit}
                        className="py-2 px-6 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Submit
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="py-2 px-6 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Next
                    </button>
                )}
            </div>
             <p className="text-center text-slate-500 text-sm mt-4">Right-click to cross out an answer choice.</p>
        </div>
    );
};

export default ReusableQuiz;
