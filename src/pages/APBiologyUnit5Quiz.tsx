import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'What is the expected phenotypic ratio of the F2 generation from this dihybrid cross?',
    passage: 'In a species of flowering plant, purple flowers (P) are dominant to white flowers (p), and tall stems (T) are dominant to short stems (t). A plant breeder crosses two plants that are heterozygous for both traits (PpTt × PpTt).',
    options: [
      'A. 9:3:3:1 (purple tall : purple short : white tall : white short)',
      'B. 3:1 (purple : white)',
      'C. 1:2:1 (tall : medium : short)',
      'D. 1:1:1:1 (all combinations equally likely)'
    ],
    answer: 0,
    explanation: 'In a dihybrid cross between two heterozygotes (PpTt × PpTt), the expected phenotypic ratio is 9:3:3:1. This represents 9 purple tall : 3 purple short : 3 white tall : 1 white short. This ratio results from the independent assortment of the two genes during meiosis.',
    type: 'stimulus',
    stimulusSet: 1,
    stimulusTitle: 'Questions 1-2. Dihybrid Cross and Inheritance'
  },
  {
    question: 'What is the most likely genotype of the black-coated parent?',
    passage: 'A researcher is studying the inheritance of coat color in mice. Black coat (B) is dominant to brown coat (b). The researcher performs a test cross by mating a black-coated mouse of unknown genotype with a brown-coated mouse. The offspring are: 18 black-coated mice and 22 brown-coated mice.',
    options: [
      'A. BB (homozygous dominant)',
      'B. Bb (heterozygous)',
      'C. bb (homozygous recessive)',
      'D. Cannot be determined from the data'
    ],
    answer: 1,
    explanation: 'The approximately 1:1 ratio of black to brown offspring (18:22) indicates that the black-coated parent is heterozygous (Bb). If it were homozygous dominant (BB), all offspring would be black. The test cross (Bb × bb) produces a 1:1 ratio of Bb (black) to bb (brown) offspring.',
    type: 'stimulus',
    stimulusSet: 1
  },
  {
    question: 'During which phase of meiosis does crossing over occur?',
    options: [
      'A. Prophase I',
      'B. Metaphase I',
      'C. Anaphase I',
      'D. Prophase II'
    ],
    answer: 0,
    explanation: 'Crossing over occurs during prophase I of meiosis when homologous chromosomes pair up (synapsis) to form tetrads. During this process, non-sister chromatids exchange genetic material, which increases genetic variation in the resulting gametes.',
    type: 'individual'
  },
  {
    question: 'Which of the following best explains why genetic variation is important for sexually reproducing populations?',
    options: [
      'A. It ensures that all offspring are identical to their parents',
      'B. It provides raw material for natural selection and adaptation to environmental changes',
      'C. It reduces the number of mutations that occur during DNA replication',
      'D. It guarantees that favorable traits will be passed to the next generation'
    ],
    answer: 1,
    explanation: 'Genetic variation provides the raw material for natural selection. When environmental conditions change, populations with greater genetic diversity are more likely to have individuals with traits that allow them to survive and reproduce, enabling the population to adapt to new conditions.',
    type: 'individual'
  },
  {
    question: 'What percentage of their male offspring is expected to be color blind?',
    passage: 'In humans, color blindness is an X-linked recessive trait. A woman who is a carrier for color blindness (X^c X) marries a man with normal color vision (XY).',
    options: [
      'A. 0%',
      'B. 25%',
      'C. 50%',
      'D. 100%'
    ],
    answer: 2,
    explanation: 'Male offspring receive their X chromosome from their mother and their Y chromosome from their father. Since the mother is a carrier (X^c X), she has a 50% chance of passing the X chromosome with the color blindness allele (X^c) to each male offspring. Males who receive X^c will be color blind because they have no second X chromosome to mask the recessive allele.',
    type: 'stimulus',
    stimulusSet: 2,
    stimulusTitle: 'Questions 5-6. X-linked Inheritance'
  },
  {
    question: 'What will be the phenotypic ratio of their offspring?',
    passage: 'A plant species exhibits incomplete dominance for flower color. Red flowers (RR) crossed with white flowers (WW) produce pink flowers (RW). If two pink-flowered plants are crossed:',
    options: [
      'A. All pink flowers',
      'B. 1 red : 2 pink : 1 white',
      'C. 3 red : 1 white',
      'D. 1 red : 1 white'
    ],
    answer: 1,
    explanation: 'In incomplete dominance, the heterozygote shows a blended phenotype. When two pink-flowered plants (RW × RW) are crossed, the offspring will be: 1 RR (red) : 2 RW (pink) : 1 WW (white), giving a 1:2:1 phenotypic ratio.',
    type: 'stimulus',
    stimulusSet: 2
  },
  {
    question: 'What is the primary difference between meiosis I and meiosis II?',
    options: [
      'A. Meiosis I produces diploid cells; meiosis II produces haploid cells',
      'B. Meiosis I separates homologous chromosomes; meiosis II separates sister chromatids',
      'C. Meiosis I involves DNA replication; meiosis II does not',
      'D. Meiosis I occurs in somatic cells; meiosis II occurs in gametes'
    ],
    answer: 1,
    explanation: 'The key difference is that meiosis I separates homologous chromosome pairs (reducing chromosome number from diploid to haploid), while meiosis II separates sister chromatids (similar to mitosis). Both divisions produce haploid cells, but meiosis I is the reductional division where chromosome number is halved.',
    type: 'individual'
  },
  {
    question: 'Nondisjunction during meiosis can result in:',
    options: [
      'A. Increased genetic variation through crossing over',
      'B. Gametes with abnormal numbers of chromosomes',
      'C. The formation of identical twin offspring',
      'D. Reduced chromosome condensation'
    ],
    answer: 1,
    explanation: 'Nondisjunction is the failure of chromosomes to separate properly during meiosis. This can occur during anaphase I (failure of homologous chromosomes to separate) or anaphase II (failure of sister chromatids to separate), resulting in gametes with too many or too few chromosomes, leading to aneuploidy.',
    type: 'individual'
  },
  {
    question: 'What can be concluded about these genes?',
    passage: 'In fruit flies, the genes for eye color and wing length are located on the same chromosome. Red eyes (R) are dominant to white eyes (r), and long wings (L) are dominant to short wings (l). A heterozygous fly (RrLl) is test crossed with a homozygous recessive fly (rrll). The offspring are: 45% red eyes, long wings; 45% white eyes, short wings; 5% red eyes, short wings; 5% white eyes, long wings.',
    options: [
      'A. The genes assort independently according to Mendel\'s laws',
      'B. The genes are linked, and recombination frequency is 10%',
      'C. The genes are linked, and recombination frequency is 50%',
      'D. One of the genes shows incomplete dominance'
    ],
    answer: 1,
    explanation: 'The data shows that most offspring (90%) have parental combinations (red-long and white-short), while only 10% show recombinant combinations (red-short and white-long). This indicates the genes are linked on the same chromosome. The recombination frequency is 10% (5% + 5%), suggesting the genes are relatively close together on the chromosome.',
    type: 'stimulus',
    stimulusSet: 3,
    stimulusTitle: 'Questions 9-10. Gene Linkage and Recombination'
  },
  {
    question: 'In oogenesis, why does only one functional egg cell result from meiosis, while spermatogenesis produces four functional sperm cells?',
    passage: 'In fruit flies, the genes for eye color and wing length are located on the same chromosome. Red eyes (R) are dominant to white eyes (r), and long wings (L) are dominant to short wings (l). A heterozygous fly (RrLl) is test crossed with a homozygous recessive fly (rrll). The offspring are: 45% red eyes, long wings; 45% white eyes, short wings; 5% red eyes, short wings; 5% white eyes, long wings.',
    options: [
      'A. Female meiosis includes an extra division that males do not have',
      'B. The cytoplasm is distributed unequally during female meiosis to conserve resources',
      'C. Male gametes do not undergo cytokinesis',
      'D. Female meiosis stops after the first division'
    ],
    answer: 1,
    explanation: 'During oogenesis, cytokinesis is unequal, with most of the cytoplasm going to one cell (the egg) and very little to the other cells (polar bodies). This conserves nutrients and organelles for the one egg that might be fertilized. The polar bodies eventually degenerate. In contrast, spermatogenesis involves equal division of cytoplasm, producing four functional sperm cells.',
    type: 'stimulus',
    stimulusSet: 3
  },
];

const APBiologyUnit5Quiz = () => {
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
    setSelected(newAnswers[current + 1] ?? null);
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
      className="absolute top-4 left-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-semibold text-green-700 shadow transition flex items-center gap-2 z-20"
      onClick={() => navigate('/ap-biology/unit/5')}
    >
      <span className="text-xl">←</span> Back to Study Guide
    </button>
  );

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 relative">
        {BackToGuideButton}
        <div style={{ height: 48 }} />
        <h1 className="text-3xl font-bold mb-8 text-center text-green-700">Quiz Results</h1>
        {questions.map((q, idx) => {
          const userAnswer = answers[idx];
          const isCorrect = userAnswer === q.answer;
          return (
            <div key={idx} className="mb-8 p-6 rounded-xl border bg-white shadow">
              {q.stimulusTitle && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                  <h3 className="font-bold text-blue-800">{q.stimulusTitle}</h3>
                </div>
              )}
              {q.passage && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                  <h4 className="font-semibold text-gray-700 mb-2">Passage:</h4>
                  <p className="text-gray-800 italic whitespace-pre-line">"{q.passage}"</p>
                </div>
              )}
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
                <div className="text-green-700 mb-1">You did not answer this question.</div>
              ) : isCorrect ? (
                <div className="text-green-700 mb-1">Correct!</div>
              ) : (
                <div className="text-red-700 mb-1">Incorrect.</div>
              )}
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Explanation:</h4>
                <p className="text-green-800">{q.explanation}</p>
              </div>
            </div>
          );
        })}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-green-500 to-lime-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-lime-500 transition-all duration-300"
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
        {q.stimulusTitle && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <h3 className="font-bold text-blue-800">{q.stimulusTitle}</h3>
          </div>
        )}
        {q.passage && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold text-gray-700 mb-2">Passage:</h4>
            <p className="text-gray-800 italic whitespace-pre-line">"{q.passage}"</p>
          </div>
        )}
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
                  selected === idx ? 'bg-green-500 text-white border-green-600' : 'bg-white text-slate-800'
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
            className="bg-gradient-to-r from-green-500 to-lime-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-lime-500 transition-all duration-300"
            onClick={handleNext}
            disabled={selected === null}
          >
            Next
          </button>
        ) : (
          <button
            className="bg-gradient-to-r from-green-500 to-lime-400 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-lime-500 transition-all duration-300"
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

export default APBiologyUnit5Quiz;
