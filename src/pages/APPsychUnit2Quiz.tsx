import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Which of the following is an example of top‑down processing?',
    options: [
      'A. Detecting faint light with only a few photons',
      'B. Identifying a sentence by knowing its context',
      'C. Recognizing a melody by hearing individual notes',
      'D. Feeling an object in the dark by touching it',
    ],
    answer: 1,
    explanation: 'Top-down processing uses prior knowledge or context to interpret information, as in identifying a sentence by its context.'
  },
  {
    question: 'In an experiment, participants fail to notice a gorilla walking through a group of basketball players. This phenomenon exemplifies:',
    options: [
      'A. Change blindness',
      'B. Selective attention',
      'C. Inattentional blindness',
      'D. Sensory adaptation',
    ],
    answer: 2,
    explanation: 'Inattentional blindness is failing to notice a visible stimulus when attention is focused elsewhere.'
  },
  {
    question: 'Two people stand 20 feet from a tree. One appears larger because they use the principle of:',
    options: [
      'A. Retinal disparity',
      'B. Linear perspective',
      'C. Interposition',
      'D. Relative size',
    ],
    answer: 3,
    explanation: 'Relative size is a monocular cue where closer objects appear larger than those farther away.'
  },
  {
    question: 'Which memory stage has the least capacity and lasts only a few seconds?',
    options: [
      'A. Sensory memory',
      'B. Short-term memory',
      'C. Working memory',
      'D. Long-term memory',
    ],
    answer: 0,
    explanation: 'Sensory memory holds information for a very brief period and has the least capacity.'
  },
  {
    question: 'Learning vocabulary by making flashcards and reviewing over days instead of cramming illustrates:',
    options: [
      'A. Maintenance rehearsal',
      'B. Chunking',
      'C. Distributed practice',
      'D. Levels-of-processing',
    ],
    answer: 2,
    explanation: 'Distributed practice (spacing effect) is spreading study sessions over time for better retention.'
  },
  {
    question: 'Which term describes the tendency to remember the first and last items in a list better than the middle items?',
    options: [
      'A. Level of processing',
      'B. Serial position effect',
      'C. Tip‑of‑the‑tongue phenomenon',
      'D. Mnemonic advantage',
    ],
    answer: 1,
    explanation: 'The serial position effect is the tendency to recall the first and last items in a list best.'
  },
  {
    question: 'A psychologist studying eyewitness errors manipulates misinformation about an event. This research explores:',
    options: [
      'A. Encoding failure',
      'B. Retrieval cue dependency',
      'C. Misinformation effect',
      'D. Source amnesia',
    ],
    answer: 2,
    explanation: 'The misinformation effect is when post-event information alters memory of the event.'
  },
  {
    question: 'Solving a crossword by repeatedly applying specific rules is an example of using a(n):',
    options: [
      'A. Heuristic',
      'B. Algorithm',
      'C. Insight strategy',
      'D. Mental set',
    ],
    answer: 1,
    explanation: 'An algorithm is a step-by-step procedure that guarantees a solution.'
  },
  {
    question: 'Deciding not to invest in a poor-performing stock because you’ve already lost most of your money illustrates:',
    options: [
      'A. Gambler’s fallacy',
      'B. Sunk-cost fallacy',
      'C. Availability heuristic',
      'D. Confirmation bias',
    ],
    answer: 1,
    explanation: 'The sunk-cost fallacy is continuing a behavior due to previously invested resources.'
  },
  {
    question: 'A person scoring high in fluid intelligence is most likely good at:',
    options: [
      'A. Memorizing historical facts',
      'B. Solving a new puzzle pattern',
      'C. Recalling vocabulary definitions',
      'D. Outlining a researched essay',
    ],
    answer: 1,
    explanation: 'Fluid intelligence involves reasoning and solving novel problems.'
  },
];

const APPsychUnit2Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [crossedOut, setCrossedOut] = useState<number[][]>(Array(questions.length).fill(null).map(() => []));
  const navigate = useNavigate();

  const handleSelect = (idx: number) => {
    setSelected(idx);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setSelected(answers[current + 1] ?? null);
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

  const handleRetake = () => {
    setAnswers(Array(questions.length).fill(null));
    setSelected(null);
    setCurrent(0);
    setSubmitted(false);
    setCrossedOut(Array(questions.length).fill(null).map(() => []));
  };

  const handleCrossOut = (idx: number) => {
    setCrossedOut((prev) => {
      const copy = prev.map(arr => [...arr]);
      const arr = copy[current];
      if (arr.includes(idx)) {
        copy[current] = arr.filter(i => i !== idx);
      } else {
        copy[current] = [...arr, idx];
      }
      return copy;
    });
  };

  const BackToGuideButton = (
    <button
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-yellow-700 shadow transition flex items-center gap-2 z-20"
      onClick={() => navigate('/ap-psychology-study-guide')}
    >
      <span className="text-xl">←</span> Back to Study Guide
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        <h1 className="text-3xl font-bold mb-8 text-center text-yellow-700">Quiz Results</h1>
        {questions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = userAnswer === q.answer;
          return (
            <div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
              <div className="mb-2 text-slate-500">Question {idx + 1}</div>
              <div className="mb-2 font-semibold">{q.question}</div>
              <ul className="mb-2">
                {q.options.map((opt: string, i: number) => (
                  <li
                    key={i}
                    className={`px-3 py-1 rounded ${i === q.answer ? 'bg-green-100 font-bold' : ''} ${userAnswer === i && userAnswer !== q.answer ? 'bg-red-100' : ''}`}
                  >
                    {opt}
                    {i === q.answer && (
                      <span className="ml-2 text-green-700 font-semibold">(Correct)</span>
                    )}
                    {userAnswer === i && userAnswer !== q.answer && (
                      <span className="ml-2 text-red-700">(Your answer)</span>
                    )}
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
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Explanation:</h4>
                <p className="text-yellow-800">{q.explanation}</p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
            onClick={handleRetake}
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  if (current >= questions.length) {
    return null;
  }

  const q = questions[current];

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 relative">
      {BackToGuideButton}
      <div style={{ height: 48 }} />
      <div className="mb-8">
        <div className="text-slate-500 mb-2">
          Question {current + 1} of {questions.length}
        </div>
        <div className="text-lg font-semibold mb-4">{q.question}</div>
        <div className="space-y-3">
          {q.options.map((opt: string, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg border w-full text-left transition-all duration-200 ${
                  selected === idx ? 'bg-yellow-500 text-white border-yellow-600' : 'bg-white text-slate-800'
                } ${crossedOut[current]?.includes(idx) ? 'line-through opacity-50' : ''}`}
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
        {current < questions.length - 1 ? (
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
            onClick={handleNext}
            disabled={selected === null}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-all duration-300"
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

export default APPsychUnit2Quiz;
