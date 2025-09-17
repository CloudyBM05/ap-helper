import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit5QuizQuestions = [
  {
    id: 1,
    stimulus: 'John O’Sullivan, "Annexation," The United States Magazine and Democratic Review (1845)',
    text: '"...the right of our manifest destiny to overspread and to possess the whole of the continent which Providence has given us for the development of the great experiment of liberty and federated self-government entrusted to us."',
    questions: [
      {
        question: "The concept of Manifest Destiny, as described by O'Sullivan, was used to justify:",
        options: [
          'A) the abolition of slavery',
          'B) westward expansion to the Pacific Ocean',
          'C) the establishment of a national bank',
          'D) secession of the Southern states'
        ],
        answer: 1,
        explanation: "Manifest Destiny was the 19th-century belief that the United States was destined to expand across North America, from the Atlantic to the Pacific. This idea was used to justify territorial acquisitions, including the annexation of Texas and the Mexican-American War."
      }
    ]
  },
  {
    id: 2,
    stimulus: 'Excerpt from the Compromise of 1850',
    text: '"It being desirable, for the peace, concord, and harmony of the Union of these States, to settle and adjust amicably all existing questions of controversy between them arising out of the institution of slavery upon a fair, equitable and just basis... That California shall be admitted as a State, without the adoption by Congress of any provision prohibiting or establishing slavery within its limits."',
    questions: [
      {
        question: 'A key provision of the Compromise of 1850, not mentioned in this excerpt, was:',
        options: [
          'A) the admission of Kansas as a slave state',
          'B) the enactment of a new and stronger Fugitive Slave Law',
          'C) the abolition of the slave trade in the District of Columbia',
          'D) the extension of the Missouri Compromise line to the Pacific'
        ],
        answer: 1,
        explanation: 'The Compromise of 1850 included several measures, one of the most controversial being the Fugitive Slave Act, which required all citizens, including those in free states, to assist in the capture and return of escaped slaves.'
      }
    ]
  },
  {
    id: 3,
    stimulus: 'Dred Scott v. Sandford, Supreme Court decision (1857)',
    text: '"...we think they [people of African ancestry] are not, and that they are not included, and were not intended to be included, under the word ‘citizens’ in the Constitution, and can therefore claim none of the rights and privileges which that instrument provides for and secures to citizens of the United States."',
    questions: [
      {
        question: 'The Dred Scott decision had which of the following effects?',
        options: [
          'A) It settled the issue of slavery in the territories.',
          'B) It declared the Missouri Compromise unconstitutional.',
          'C) It was widely praised by abolitionists.',
          'D) It led to the immediate secession of the Southern states.'
        ],
        answer: 1,
        explanation: 'The Supreme Court ruled in Dred Scott v. Sandford that Congress had no power to prohibit slavery in the territories, thereby declaring the Missouri Compromise of 1820 unconstitutional and further inflaming sectional tensions.'
      }
    ]
  },
  {
    id: 4,
    stimulus: 'Abraham Lincoln, Gettysburg Address (1863)',
    text: '"...we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth."',
    questions: [
      {
        question: "Lincoln's Gettysburg Address is best understood as an effort to:",
        options: [
          'A) announce the end of the Civil War',
          'B) justify the high casualties of the war',
          'C) redefine the purpose of the war to include the abolition of slavery and the preservation of the Union',
          'D) criticize the leadership of the Confederate army'
        ],
        answer: 2,
        explanation: "The Gettysburg Address reframed the Civil War as a struggle not just to preserve the Union, but to bring about a 'new birth of freedom' and ensure the survival of American democracy, implicitly connecting the war's purpose to the abolition of slavery."
      }
    ]
  },
  {
    id: 5,
    stimulus: 'Excerpt from the Fourteenth Amendment to the U.S. Constitution (1868)',
    text: '"All persons born or naturalized in the United States, and subject to the jurisdiction thereof, are citizens of the United States and of the State wherein they reside. No State shall make or enforce any law which shall abridge the privileges or immunities of citizens of the United States; nor shall any State deprive any person of life, liberty, or property, without due process of law; nor deny to any person within its jurisdiction the equal protection of the laws."',
    questions: [
      {
        question: 'The Fourteenth Amendment was primarily intended to:',
        options: [
          'A) grant voting rights to all male citizens',
          'B) protect the civil rights of formerly enslaved people',
          'C) abolish slavery throughout the United States',
          'D) give women the right to vote'
        ],
        answer: 1,
        explanation: 'The Fourteenth Amendment was a cornerstone of Radical Reconstruction, designed to grant citizenship to and protect the civil rights of African Americans against discriminatory state laws, such as the Black Codes, in the post-Civil War South.'
      }
    ]
  },
  {
    id: 6,
    stimulus: 'Wilmot Proviso (1846)',
    text: '"Provided, That, as an express and fundamental condition to the acquisition of any territory from the Republic of Mexico by the United States, by virtue of any treaty which may be negotiated between them, and to the use by the Executive of the moneys herein appropriated, neither slavery nor involuntary servitude shall ever exist in any part of said territory..."',
    questions: [
      {
        question: 'The Wilmot Proviso revealed growing sectional tensions over which issue?',
        options: [
          'A) The expansion of slavery into newly acquired territories',
          'B) The right of states to nullify federal laws',
          'C) The constitutionality of the national bank',
          'D) The treatment of Native Americans in the West'
        ],
        answer: 0,
        explanation: 'The Wilmot Proviso, which sought to ban slavery in territories acquired from Mexico, highlighted the intense and growing conflict between the North and South over the expansion of slavery.'
      }
    ]
  },
  {
    id: 7,
    stimulus: 'Kansas-Nebraska Act (1854)',
    text: '"...it being the true intent and meaning of this act not to legislate slavery into any Territory or State, nor to exclude it therefrom, but to leave the people thereof perfectly free to form and regulate their domestic institutions in their own way, subject only to the Constitution of the United States."',
    questions: [
      {
        question: 'The principle described in the excerpt, known as popular sovereignty, led directly to:',
        options: [
          'A) a peaceful resolution of the slavery issue in the territories',
          'B) the immediate abolition of slavery in Kansas and Nebraska',
          'C) violent conflict between pro-slavery and anti-slavery settlers in Kansas',
          'D) the secession of Southern states from the Union'
        ],
        answer: 2,
        explanation: 'The Kansas-Nebraska Act\'s implementation of popular sovereignty led to a rush of both pro-slavery and anti-slavery settlers to Kansas, resulting in violent clashes known as "Bleeding Kansas."'
      }
    ]
  },
  {
    id: 8,
    stimulus: 'Republican Party Platform (1860)',
    text: '"That the normal condition of all the territory of the United States is that of freedom... we deny the authority of Congress, of a territorial legislature, or of any individuals, to give legal existence to slavery in any Territory of the United States."',
    questions: [
      {
        question: 'The election of Abraham Lincoln in 1860 on this platform directly led to:',
        options: [
          'A) the outbreak of the Mexican-American War',
          'B) the passage of the Compromise of 1850',
          'C) the secession of several Southern states',
          'D) the ratification of the Fifteenth Amendment'
        ],
        answer: 2,
        explanation: 'The Republican Party\'s platform of preventing the expansion of slavery into the territories was seen as a direct threat to the Southern way of life, leading seven Southern states to secede from the Union shortly after Lincoln\'s election.'
      }
    ]
  },
  {
    id: 9,
    stimulus: 'The Emancipation Proclamation (1863)',
    text: '"...all persons held as slaves within any State or designated part of a State, the people whereof shall then be in rebellion against the United States, shall be then, thenceforward, and forever free..."',
    questions: [
      {
        question: 'A significant limitation of the Emancipation Proclamation was that it:',
        options: [
          'A) applied only to states in rebellion and not to border states loyal to the Union',
          'B) was immediately declared unconstitutional by the Supreme Court',
          'C) freed all slaves in the United States without exception',
          'D) was rejected by the abolitionist movement as insufficient'
        ],
        answer: 0,
        explanation: 'The Emancipation Proclamation was a strategic military order that freed slaves only in Confederate-held territory. It did not apply to the loyal border states, where slavery remained legal until the passage of the 13th Amendment.'
      }
    ]
  },
  {
    id: 10,
    stimulus: 'Historian Eric Foner on Reconstruction',
    text: '"What remained of Reconstruction? For the freedmen, a system of economic dependency and political subordination. For the nation, the triumph of a racist ideology that justified the abandonment of the ideal of equality."',
    questions: [
      {
        question: 'Which of the following provides the best evidence to support Foner\'s argument about the failures of Reconstruction?',
        options: [
          'A) The passage of the 13th, 14th, and 15th Amendments',
          'B) The rise of the Ku Klux Klan and the implementation of Black Codes and Jim Crow laws',
          'C) The establishment of the Freedmen\'s Bureau to assist former slaves',
          'D) The election of African American officials to state and federal office'
        ],
        answer: 1,
        explanation: 'The rise of the KKK and the enactment of Black Codes and Jim Crow laws demonstrated the failure of Reconstruction to protect the rights of African Americans, leading to a system of political subordination and racial segregation that supports Foner\'s argument.'
      }
    ]
  }
];

const allQuestions = unit5QuizQuestions.reduce((acc: any[], group) => {
  group.questions.forEach((q) => {
    acc.push({
      stimulus: group.stimulus,
      text: group.text,
      question: q.question,
      options: q.options,
      answer: q.answer,
      explanation: q.explanation
    });
  });
  return acc;
}, []);

const APUSHUnit5Quiz: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(allQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [crossedOut, setCrossedOut] = useState<number[][]>(Array(allQuestions.length).fill(null).map(() => []));
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
    navigate('/apush-study-guide/unit/5');
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
      setSelected(answers[current - 1]);
    }
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
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-blue-700 shadow transition flex items-center gap-2 z-20"
      onClick={() => navigate('/apush-study-guide/unit/5')}
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
            <div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
              <div className="mb-2 text-slate-500">Question {idx + 1}</div>
              <div className="mb-2 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <div className="font-semibold text-blue-800 mb-1">{q.stimulus}</div>
                <div className="text-slate-700">{q.text}</div>
              </div>
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
            <div className="font-semibold text-blue-800 mb-1">{q.stimulus}</div>
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
                  selected === idx ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-slate-800'
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
            className="bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
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

export default APUSHUnit5Quiz;
