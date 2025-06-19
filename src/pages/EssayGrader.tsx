import React, { useState } from 'react';
import { Send, FileText, Clock, Target, CheckCircle } from 'lucide-react';

const subjects = [
  { value: 'ap_seminar', label: 'AP Seminar' }
];

const essayTypeOptions: Record<string, { value: string; label: string }[]> = {
  ap_seminar: [
    { value: 'iwa', label: 'IWA' },
    { value: 'irr', label: 'IRR' },
  ],
};

const EssayGrader = () => {
  const [essayText, setEssayText] = useState('');
  const [subject, setSubject] = useState('ap_seminar');
  const [essayType, setEssayType] = useState(essayTypeOptions['ap_seminar'][0].value);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSubject = e.target.value;
    setSubject(newSubject);
    setEssayType(essayTypeOptions[newSubject][0].value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!essayText.trim()) return;

    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/api/grade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ essay: essayText, essay_type: essayType, subject }),
      });
      const data = await response.json();
      setResult(data.grading || data.error || 'No response from grader.');
    } catch (error) {
      setResult('Error connecting to grading server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            AI-Powered Essay Grader
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get instant, rubric-based feedback on your AP essays. Our AI analyzes your 
            writing using official College Board standards and provides detailed suggestions 
            for improvement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Essay Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Submit Your Essay</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="essay" className="block text-sm font-semibold text-slate-700 mb-3">
                    Essay Content
                  </label>
                  <textarea
                    id="essay"
                    value={essayText}
                    onChange={(e) => setEssayText(e.target.value)}
                    placeholder="Paste your AP essay here for AI-powered evaluation and feedback..."
                    className="w-full h-64 p-4 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none text-slate-700 placeholder-slate-400"
                    required
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-slate-500">
                      {essayText.length} characters
                    </span>
                    <span className="text-sm text-slate-500">
                      Recommended: 500-1500 words
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="essay-type" className="block text-sm font-semibold text-slate-700 mb-2">
                      Essay Type
                    </label>
                    <select 
                      id="essay-type"
                      value={essayType}
                      onChange={(e) => setEssayType(e.target.value)}
                      className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    >
                      {essayTypeOptions[subject].map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                      AP Subject
                    </label>
                    <select 
                      id="subject"
                      value={subject}
                      onChange={handleSubjectChange}
                      className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    >
                      {subjects.map(subject => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={!essayText.trim() || isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing Essay...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Get AI Evaluation</span>
                    </>
                  )}
                </button>
              </form>
              {/* Grading Result */}
              {result && (
                <div className="mt-8 bg-white border border-slate-200 rounded-xl p-6 shadow">
                  <h3 className="text-lg font-bold mb-2 text-slate-900">AI Grading Result</h3>
                  <pre className="whitespace-pre-wrap text-slate-700">{result}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Features Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">What You'll Get</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">Rubric-based scoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">Detailed feedback</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">Improvement suggestions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700">Grammar & style analysis</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Grading Process</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Text Analysis</p>
                    <p className="text-sm text-slate-600">AI reads and understands your essay</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Rubric Evaluation</p>
                    <p className="text-sm text-slate-600">Scored against AP standards</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Instant Results</p>
                    <p className="text-sm text-slate-600">Get feedback in seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssayGrader;