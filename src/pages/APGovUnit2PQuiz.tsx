  const questionText = parseQuestionText(q.question);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <div className="flex-grow">
        <div className="max-w-2xl mx-auto px-4 py-12 relative">
            <BackToGuideButton />
            <div style={{ height: 48 }} />
            <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">AP Gov Unit 2 Quiz</h1>
            <div className="mb-8">
                {stimulusGroup && (
                    <>
                        <div className="mb-2 text-red-700 whitespace-pre-line">{stimulusGroup.stimulus}</div>
                        {stimulusGroup.source && <div className="mb-4 text-xs text-slate-500 italic">{stimulusGroup.source}</div>}
                    </>
                )}
                <div className="text-slate-500 mb-2">
                    Question {current + 1} of {apGovUnit2Quiz.length}
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
            <div className="flex justify-between mt-8">
                <button
                    className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold text-lg shadow hover:bg-slate-300 transition-all duration-300"
                    onClick={handleBack}
                    disabled={current === 0}
                >
                    Back
                </button>
                {current < apGovUnit2Quiz.length - 1 ? (
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
    </div>
  );
};