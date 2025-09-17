import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const APPhysicsMITWorkbook = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(85 * 60); // 85 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Sample questions adapted from MIT-style physics problems
  const questions: Question[] = [
    {
      id: 1,
      question: "A particle moves along the x-axis with position given by x(t) = 2t³ - 12t² + 18t + 5 (where x is in meters and t is in seconds). At what time(s) is the particle momentarily at rest?",
      options: [
        "t = 1 s and t = 3 s",
        "t = 2 s and t = 4 s", 
        "t = 0 s and t = 6 s",
        "t = 1.5 s and t = 4.5 s"
      ],
      correctAnswer: 0,
      explanation: "The particle is at rest when velocity v(t) = dx/dt = 0. Taking the derivative: v(t) = 6t² - 24t + 18 = 6(t² - 4t + 3) = 6(t-1)(t-3). Setting v(t) = 0 gives t = 1 s and t = 3 s.",
      topic: "Kinematics",
      difficulty: 'Medium'
    },
    {
      id: 2,
      question: "A block of mass m slides down a frictionless inclined plane of angle θ, then across a horizontal surface with coefficient of kinetic friction μₖ before coming to rest. If the block travels a distance d on the horizontal surface, what was the height h of the inclined plane?",
      options: [
        "h = μₖd",
        "h = μₖd/tan(θ)",
        "h = μₖd·tan(θ)", 
        "h = d/(μₖ·sin(θ))"
      ],
      correctAnswer: 0,
      explanation: "Using energy conservation: Initial PE = Work done by friction. mgh = μₖmgd, therefore h = μₖd. The angle θ doesn't appear because we're given the distance d traveled on the horizontal surface.",
      topic: "Energy and Work",
      difficulty: 'Hard'
    },
    {
      id: 3,
      question: "A uniform rod of length L and mass M rotates about an axis through one end, perpendicular to the rod. What is the moment of inertia of the rod about this axis?",
      options: [
        "ML²/12",
        "ML²/3",
        "ML²/6",
        "ML²/2"
      ],
      correctAnswer: 1,
      explanation: "For a uniform rod rotating about one end: I = ∫₀ᴸ (M/L)r² dr = (M/L) × (L³/3) = ML²/3. This is different from rotation about the center (ML²/12).",
      topic: "Rotational Motion",
      difficulty: 'Hard'
    },
    {
      id: 4,
      question: "Two identical springs with spring constant k are connected in series. What is the equivalent spring constant of the combination?",
      options: [
        "2k",
        "k/2",
        "k",
        "k²"
      ],
      correctAnswer: 1,
      explanation: "For springs in series: 1/k_eq = 1/k₁ + 1/k₂. With identical springs: 1/k_eq = 1/k + 1/k = 2/k, so k_eq = k/2. Springs in series are more compliant (easier to stretch).",
      topic: "Simple Harmonic Motion",
      difficulty: 'Medium'
    },
    {
      id: 5,
      question: "A wave on a string has the form y(x,t) = A sin(kx - ωt + φ). If the wave speed is v, which relationship is always true?",
      options: [
        "v = ω/k",
        "v = ωk",
        "v = A/k",
        "v = φ/ω"
      ],
      correctAnswer: 0,
      explanation: "The wave speed v = λf = (2π/k)(ω/2π) = ω/k. This is a fundamental relationship for all waves, relating angular frequency ω and wave number k to wave speed.",
      topic: "Waves",
      difficulty: 'Medium'
    }
  ];

  useEffect(() => {
    setSelectedAnswers(new Array(questions.length).fill(null));
  }, []);

  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [timeRemaining, isTimerActive]);

  const startExam = () => {
    setIsTimerActive(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResults) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    setIsTimerActive(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score: number, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const resetExam = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setTimeRemaining(85 * 60);
    setIsTimerActive(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Hard': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  if (!isTimerActive && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/ap-physics-practice-exam/mcq')}
            className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to MCQ Selection
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                MIT Physics Workbook
              </h1>
              
              <p className="text-lg text-slate-600 mb-6">
                University-level physics problems adapted from MIT coursework
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sm">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="font-semibold text-slate-900">Questions</div>
                  <div className="text-slate-600">{questions.length} Multiple Choice</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="font-semibold text-slate-900">Time Limit</div>
                  <div className="text-slate-600">85 minutes</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="font-semibold text-slate-900">Difficulty</div>
                  <div className="text-slate-600">Advanced</div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">About This Workbook</h3>
                <p className="text-blue-800 text-sm text-left">
                  These problems are adapted from MIT's physics curriculum and emphasize deep conceptual understanding 
                  and mathematical problem-solving skills. They cover advanced applications of physics principles 
                  typically found in college-level courses.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={startExam}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Start MIT Workbook
                </button>
                
                <div className="text-sm text-slate-600">
                  <p>• Calculator permitted for all questions</p>
                  <p>• Mathematical derivations may be required</p>
                  <p>• Focus on conceptual understanding</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
            <div className="text-center mb-8">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                percentage >= 70 ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {percentage >= 70 ? (
                  <CheckCircle className="w-10 h-10 text-green-600" />
                ) : (
                  <XCircle className="w-10 h-10 text-red-600" />
                )}
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">MIT Workbook Complete!</h2>
              <p className="text-xl text-gray-600 mb-4">
                Score: {score}/{questions.length} ({percentage}%)
              </p>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetExam}
                  className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Workbook
                </button>
                <button
                  onClick={() => navigate('/ap-physics-practice-exam/mcq')}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back to MCQ Selection
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Question {index + 1}
                    </h3>
                    <div className="flex gap-2">
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {question.topic}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{question.question}</p>
                  
                  <div className="space-y-2 mb-4">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg border ${
                          optionIndex === question.correctAnswer
                            ? 'bg-green-100 border-green-300'
                            : selectedAnswers[index] === optionIndex && optionIndex !== question.correctAnswer
                            ? 'bg-red-100 border-red-300'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="font-medium mr-3">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          <span>{option}</span>
                          {optionIndex === question.correctAnswer && (
                            <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                          )}
                          {selectedAnswers[index] === optionIndex && optionIndex !== question.correctAnswer && (
                            <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
                    <p className="text-blue-800 text-sm">{question.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/ap-physics-practice-exam/mcq')}
            className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Exit Workbook
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-blue-600">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
            <span className="text-slate-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg p-1 mb-6 shadow-sm">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded h-2 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-200">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Question {currentQuestion + 1}
              </h2>
              <div className="flex gap-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {questions[currentQuestion].topic}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(questions[currentQuestion].difficulty)}`}>
                  {questions[currentQuestion].difficulty}
                </span>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {questions[currentQuestion].question}
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
              >
                <div className="flex items-center">
                  <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center font-semibold mr-4">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex space-x-3">
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Submit Workbook
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Question Navigator</h3>
          <div className="grid grid-cols-10 gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 text-xs font-semibold rounded transition-colors ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : selectedAnswers[index] !== null
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APPhysicsMITWorkbook;
