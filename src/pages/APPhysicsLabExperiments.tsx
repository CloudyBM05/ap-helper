import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Microscope, CheckCircle, XCircle, RotateCcw, FlaskConical } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
  labType: 'Measurement' | 'Design' | 'Analysis' | 'Error';
}

const APPhysicsLabExperiments = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(75 * 60); // 75 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Sample questions focused on laboratory techniques and experimental design
  const questions: Question[] = [
    {
      id: 1,
      question: "A student is measuring the acceleration due to gravity using a pendulum. To minimize experimental error, which of the following is the MOST important consideration?",
      options: [
        "Using a very heavy bob to reduce air resistance effects",
        "Measuring the period for multiple oscillations and dividing by the number of oscillations",
        "Using the longest possible string length",
        "Ensuring the pendulum swings through a large angle (>30°)"
      ],
      correctAnswer: 1,
      explanation: "Measuring multiple oscillations and averaging reduces timing errors, which are typically the largest source of uncertainty in pendulum experiments. Large angles violate the small-angle approximation needed for T = 2π√(L/g).",
      topic: "Simple Harmonic Motion",
      labType: 'Measurement'
    },
    {
      id: 2,
      question: "In an experiment to determine the spring constant of a spring, a student plots Force (N) vs. Extension (m). The graph shows a linear relationship with slope 45 N/m and y-intercept of 2 N. What does the y-intercept most likely represent?",
      options: [
        "The spring constant",
        "A systematic error in the force measurements",
        "The natural length of the spring",
        "The elastic limit of the spring"
      ],
      correctAnswer: 1,
      explanation: "For an ideal spring, F = kx, so the y-intercept should be zero when no extension occurs. A non-zero y-intercept typically indicates a systematic error, such as the spring holder's weight or incorrect zero calibration.",
      topic: "Hooke's Law",
      labType: 'Analysis'
    },
    {
      id: 3,
      question: "A student designs an experiment to measure the coefficient of kinetic friction between a block and an inclined plane. Which experimental design would provide the MOST accurate results?",
      options: [
        "Measure the critical angle where the block just begins to slide",
        "Measure the acceleration of the block sliding down various angles",
        "Time the block sliding down a fixed distance at various angles",
        "Measure the force needed to pull the block up the incline at constant velocity"
      ],
      correctAnswer: 1,
      explanation: "Measuring acceleration allows direct calculation of μₖ from a = g(sin θ - μₖ cos θ). This method separates static and kinetic friction and provides data at multiple angles for better accuracy.",
      topic: "Friction",
      labType: 'Design'
    },
    {
      id: 4,
      question: "In a collision experiment, a student measures the velocities of two carts before and after collision. The uncertainty in each velocity measurement is ±0.1 m/s. If the initial velocities are 2.0 ± 0.1 m/s and 0.0 ± 0.1 m/s, what is the uncertainty in the initial momentum of the first cart (mass = 0.5 kg)?",
      options: [
        "±0.05 kg⋅m/s",
        "±0.1 kg⋅m/s",
        "±0.2 kg⋅m/s",
        "±0.5 kg⋅m/s"
      ],
      correctAnswer: 0,
      explanation: "For p = mv, the uncertainty is Δp = m × Δv = 0.5 kg × 0.1 m/s = 0.05 kg⋅m/s. When multiplying by a constant (mass), the absolute uncertainty is scaled by that constant.",
      topic: "Momentum",
      labType: 'Error'
    },
    {
      id: 5,
      question: "A student is investigating the relationship between the frequency of a wave on a string and the tension in the string. Which variables should be kept constant to ensure a valid experiment?",
      options: [
        "Only the length of the string",
        "Only the mass per unit length of the string",
        "Both the length and mass per unit length of the string",
        "The frequency and wavelength of the wave"
      ],
      correctAnswer: 2,
      explanation: "For v = √(T/μ) and f = v/λ, both string length (which determines possible wavelengths) and linear mass density μ must be constant to isolate the effect of tension T on frequency f.",
      topic: "Waves on Strings",
      labType: 'Design'
    },
    {
      id: 6,
      question: "In a photoelectric effect experiment, a student observes that no photoelectrons are emitted when light of wavelength 600 nm is incident on a metal surface. What can be concluded about the work function of the metal?",
      options: [
        "The work function is less than 2.07 eV",
        "The work function is greater than 2.07 eV",
        "The work function equals 2.07 eV",
        "No conclusion can be drawn about the work function"
      ],
      correctAnswer: 1,
      explanation: "No photoelectrons means hf < φ. For λ = 600 nm: E = hc/λ = (4.14 × 10⁻¹⁵ eV⋅s)(3.00 × 10⁸ m/s)/(600 × 10⁻⁹ m) = 2.07 eV. Since no electrons are emitted, φ > 2.07 eV.",
      topic: "Photoelectric Effect",
      labType: 'Analysis'
    },
    {
      id: 7,
      question: "A student measures the period of a physical pendulum (a rod) for different pivot points along its length. To find the center of mass experimentally, the student should look for the pivot point where:",
      options: [
        "The period is minimum",
        "The period is maximum",
        "The period equals that of a simple pendulum of the same length",
        "The motion is not simple harmonic"
      ],
      correctAnswer: 0,
      explanation: "For a physical pendulum, T = 2π√(I/mgd) where d is distance from pivot to center of mass. The period is minimum when dI/dd is minimum, which occurs when the pivot is at the center of mass (d minimized while maintaining oscillation).",
      topic: "Physical Pendulum",
      labType: 'Measurement'
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
    setTimeRemaining(75 * 60);
    setIsTimerActive(false);
  };

  const getLabTypeColor = (labType: string) => {
    switch (labType) {
      case 'Measurement': return 'text-blue-600 bg-blue-100';
      case 'Design': return 'text-purple-600 bg-purple-100';
      case 'Analysis': return 'text-green-600 bg-green-100';
      case 'Error': return 'text-orange-600 bg-orange-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  if (!isTimerActive && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/ap-physics-practice-exam/mcq')}
            className="flex items-center text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to MCQ Selection
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-teal-200">
            <div className="text-center">
              <div className="bg-teal-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <Microscope className="w-10 h-10 text-teal-600" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Physics Laboratory Experiments
              </h1>
              
              <p className="text-lg text-slate-600 mb-6">
                Questions focused on experimental design, data analysis, and laboratory techniques
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sm">
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="font-semibold text-slate-900">Questions</div>
                  <div className="text-slate-600">{questions.length} Multiple Choice</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="font-semibold text-slate-900">Time Limit</div>
                  <div className="text-slate-600">75 minutes</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="font-semibold text-slate-900">Focus</div>
                  <div className="text-slate-600">Lab Techniques</div>
                </div>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-teal-900 mb-2 flex items-center">
                  <FlaskConical className="w-5 h-5 mr-2" />
                  Laboratory Skills Assessment
                </h3>
                <div className="text-teal-800 text-sm text-left space-y-2">
                  <p>• <strong>Experimental Design:</strong> Planning effective investigations</p>
                  <p>• <strong>Data Analysis:</strong> Interpreting graphs and calculating uncertainties</p>
                  <p>• <strong>Measurement Techniques:</strong> Minimizing systematic and random errors</p>
                  <p>• <strong>Laboratory Safety:</strong> Proper handling of equipment and procedures</p>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={startExam}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Start Lab Assessment
                </button>
                
                <div className="text-sm text-slate-600">
                  <p>• Questions cover all major physics lab techniques</p>
                  <p>• Focus on experimental methodology</p>
                  <p>• Emphasizes error analysis and data interpretation</p>
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
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-teal-200">
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
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Lab Assessment Complete!</h2>
              <p className="text-xl text-gray-600 mb-4">
                Score: {score}/{questions.length} ({percentage}%)
              </p>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetExam}
                  className="flex items-center bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Assessment
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
                      <span className={`text-xs px-2 py-1 rounded ${getLabTypeColor(question.labType)}`}>
                        {question.labType}
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
                  
                  <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                    <h4 className="font-semibold text-teal-900 mb-2">Explanation:</h4>
                    <p className="text-teal-800 text-sm">{question.explanation}</p>
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/ap-physics-practice-exam/mcq')}
            className="flex items-center text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Exit Assessment
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-teal-600">
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
            className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded h-2 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-teal-200">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Question {currentQuestion + 1}
              </h2>
              <div className="flex gap-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {questions[currentQuestion].topic}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getLabTypeColor(questions[currentQuestion].labType)}`}>
                  {questions[currentQuestion].labType}
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
                    ? 'border-teal-500 bg-teal-50 text-teal-900'
                    : 'border-gray-200 hover:border-teal-300 hover:bg-teal-25'
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
                  Submit Assessment
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
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
                    ? 'bg-teal-600 text-white'
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

export default APPhysicsLabExperiments;
