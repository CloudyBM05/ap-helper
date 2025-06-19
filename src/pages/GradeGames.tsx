import React, { useState, useRef, useEffect } from 'react';

const AP_CLASSES = [
  { value: 'APUSH', label: 'AP US History' },
  { value: 'APGov', label: 'AP Government' },
  { value: 'APWorld', label: 'AP World History' }
];

// Use import.meta.env.BASE_URL for all public asset paths
// Use lowercase for all asset filenames to avoid case-sensitivity issues on GitHub Pages
const BOSS_IMAGE = `${import.meta.env.BASE_URL}boss1.png`;
const USER_IMAGE = `${import.meta.env.BASE_URL}user-hero.png`;
const SLASH_IMAGE = `${import.meta.env.BASE_URL}slashing.png`;
const IMPACT_IMAGE = `${import.meta.env.BASE_URL}impact.png`;

const getRandomBoss = () => ({ name: 'Boss 1', img: BOSS_IMAGE });

const correctSoundUrl = `${import.meta.env.BASE_URL}sounds/correct.mp3`;
const wrongSoundUrl = `${import.meta.env.BASE_URL}sounds/wrong.mp3`;
const winSoundUrl = `${import.meta.env.BASE_URL}sounds/win.mp3`;
const loseSoundUrl = `${import.meta.env.BASE_URL}sounds/lose.mp3`;
const slashSE = `${import.meta.env.BASE_URL}slashse.mp3`;
const impactSE = `${import.meta.env.BASE_URL}impactse.mp3`;

const fetchAIQuestion = async (apClass: string) => {
  // Simulate OpenAI API call (replace with real API if desired)
  // For demo, just return a random question
  const demoQuestions: Record<string, any[]> = {
    APUSH: [
      {
        question: "Which event marked the start of the American Revolution?",
        choices: ["Boston Tea Party", "Battle of Lexington and Concord", "Declaration of Independence", "Boston Massacre"],
        answer: 1,
        explanation: "The Battle of Lexington and Concord in 1775 marked the start of the American Revolution."
      },
      {
        question: "Who was President during the Great Depression and World War II?",
        choices: ["Herbert Hoover", "Franklin D. Roosevelt", "Harry S. Truman", "Woodrow Wilson"],
        answer: 1,
        explanation: "Franklin D. Roosevelt was President during both the Great Depression and most of World War II."
      }
    ],
    APGov: [
      {
        question: "What is the main purpose of the Federalist Papers?",
        choices: [
          "To declare independence from Britain",
          "To support ratification of the Constitution",
          "To outline the Bill of Rights",
          "To establish the Supreme Court"
        ],
        answer: 1,
        explanation: "The Federalist Papers were written to support ratification of the US Constitution."
      }
    ],
    APWorld: [
      {
        question: "Which empire was known for its road system and capital at Cuzco?",
        choices: ["Aztec", "Inca", "Maya", "Ottoman"],
        answer: 1,
        explanation: "The Inca Empire was known for its road system and capital at Cuzco."
      }
    ]
  };
  const pool = demoQuestions[apClass] || [];
  return pool[Math.floor(Math.random() * pool.length)];
};

const playSound = (url: string) => {
  const audio = new Audio(url);
  audio.play();
};

const BeatTheBoss: React.FC<{ apClass: string; onExit: () => void }> = ({ apClass, onExit }) => {
  const [userHP, setUserHP] = useState(3);
  const [bossHP, setBossHP] = useState(3);
  const [question, setQuestion] = useState<any>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [boss] = useState({ name: 'Boss 1', img: BOSS_IMAGE });
  const [round, setRound] = useState(1);
  const [anim, setAnim] = useState<'idle' | 'attack' | 'hurt' | 'win' | 'lose'>('idle');
  const [bossAnim, setBossAnim] = useState<'idle' | 'hurt' | 'lose' | 'attack'>('idle');
  const [showSlash, setShowSlash] = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const userImgRef = useRef<HTMLImageElement>(null);
  const bossImgRef = useRef<HTMLImageElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play/stop background music on mount/unmount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Lower the music volume (0.0 - 1.0)
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const nextQuestion = async () => {
    setSelected(null);
    setFeedback(null);
    setAnim('idle');
    setBossAnim('idle');
    setShowSlash(false);
    setShowImpact(false);
    const q = await fetchAIQuestion(apClass);
    setQuestion(q);
  };

  React.useEffect(() => {
    nextQuestion();
    // eslint-disable-next-line
  }, [round]);

  const handleAnswer = (idx: number) => {
    setSelected(idx);
    if (question && idx === question.answer) {
      setAnim('attack');
      setTimeout(() => {
        setShowSlash(true);
        playSound(slashSE); // Play hero slash sound
      }, 350);
      setTimeout(() => {
        setBossHP(hp => hp - 1);
        setBossAnim('hurt');
        setFeedback("Correct! " + question.explanation);
        setAnim('idle');
        setShowSlash(false);
      }, 700);
      playSound(correctSoundUrl);
    } else {
      setBossAnim('attack');
      setTimeout(() => {
        setShowImpact(true);
        playSound(impactSE); // Play boss impact sound
      }, 350);
      setTimeout(() => {
        setUserHP(hp => hp - 1);
        setAnim('hurt');
        setBossAnim('idle');
        setFeedback("Wrong! " + (question ? question.explanation : ''));
        setShowImpact(false);
      }, 700);
      playSound(wrongSoundUrl);
      setTimeout(() => setAnim('idle'), 1200);
    }
    setTimeout(() => {
      setAnim('idle');
      setBossAnim('idle');
      setShowSlash(false);
      setShowImpact(false);
      if (bossHP - (idx === question.answer ? 1 : 0) <= 0 || userHP - (idx === question.answer ? 0 : 1) <= 0) return;
      setRound(r => r + 1);
    }, 1800);
  };

  React.useEffect(() => {
    if (userHP <= 0) playSound(loseSoundUrl);
    if (bossHP <= 0) playSound(winSoundUrl);
  }, [userHP, bossHP]);

  if (userHP <= 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-3xl font-bold text-red-600 mb-4">You Lost!</h2>
        <div className="mb-2">The boss <span className="font-bold">{boss.name}</span> remains undefeated.</div>
        <img src={boss.img} alt="Boss" className="w-32 h-32 mb-4 animate-bounce" />
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold" onClick={onExit}>
          Play Again
        </button>
      </div>
    );
  }
  if (bossHP <= 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-3xl font-bold text-green-600 mb-4">You Beat the Boss!</h2>
        <div className="mb-2">Congratulations, you defeated <span className="font-bold">{boss.name}</span>!</div>
        <img src={USER_IMAGE} alt="User Hero" className="w-32 h-32 mb-4 animate-bounce" />
        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold" onClick={onExit}>
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8 flex flex-col items-center">
      {/* Background music */}
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}Age of War - Theme Soundtrack.mp3`} loop autoPlay />
      <div className="relative flex items-end justify-between w-full mb-6" style={{ minHeight: 120 }}>
        {/* Hero */}
        <div className="flex flex-col items-center z-10" style={{ width: 120 }}>
          <img
            ref={userImgRef}
            src={USER_IMAGE}
            alt="You"
            className={`w-24 h-24 mb-2 transition-all duration-300
              ${anim === 'attack' ? 'run-to-boss' : ''}
              ${anim === 'hurt' ? 'animate-shake' : ''}
            `}
            style={
              anim === 'attack'
                ? { position: 'relative', left: '260px', transition: 'left 0.35s linear' }
                : { position: 'relative', left: 0, transition: 'left 0.35s linear' }
            }
          />
          <span className="font-bold text-blue-700">You</span>
          <span className="text-lg">❤️ {userHP}</span>
        </div>
        {/* Slash animation */}
        {showSlash && (
          <img
            src={SLASH_IMAGE}
            alt="Slash Animation"
            className="absolute z-30 pointer-events-none w-24 h-24"
            style={{
              left: 'calc(100% - 100px)',
              bottom: '90px',
              transform: 'translateX(-50%)',
              animation: 'slash-fade 0.4s linear',
              imageRendering: 'pixelated'
            }}
          />
        )}
        {/* Boss */}
        <div className="flex flex-col items-center z-10" style={{ width: 120 }}>
          <img
            ref={bossImgRef}
            src={boss.img}
            alt="Boss"
            className={`w-24 h-24 mb-2 transition-all duration-300
              ${bossAnim === 'hurt' ? 'animate-shake' : ''}
              ${bossAnim === 'attack' ? 'boss-attack' : ''}
            `}
            style={
              bossAnim === 'attack'
                ? { position: 'relative', right: '260px', transition: 'right 0.35s linear' }
                : { position: 'relative', right: 0, transition: 'right 0.35s linear' }
            }
          />
          <span className="font-bold text-red-700">{boss.name}</span>
          <span className="text-lg">💀 {bossHP}</span>
        </div>
        {/* Impact animation */}
        {showImpact && (
          <img
            src={IMPACT_IMAGE}
            alt="Impact Animation"
            className="absolute z-40 pointer-events-none w-20 h-20"
            style={{
              left: '100px', // Position over the hero
              bottom: '90px',
              transform: 'translateX(-50%)',
              animation: 'impact-fade 0.4s linear',
              imageRendering: 'pixelated'
            }}
          />
        )}
      </div>
      <div className="w-full mb-4">
        <div className="text-lg font-bold mb-2">Boss: {boss.name} asks:</div>
        <div className="mb-4 text-slate-700">{question ? question.question : "Loading..."}</div>
        <div className="flex flex-col gap-3">
          {question &&
            question.choices.map((choice: string, idx: number) => (
              <button
                key={idx}
                disabled={selected !== null}
                className={`px-4 py-2 rounded-lg border font-semibold transition-all ${
                  selected === idx
                    ? idx === question.answer
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200'
                }`}
                onClick={() => handleAnswer(idx)}
              >
                {choice}
              </button>
            ))}
        </div>
        {feedback && (
          <div className="mt-4 text-center font-semibold">
            {feedback}
          </div>
        )}
      </div>
      <div className="mt-6 text-xs text-slate-500">Round {round}</div>
    </div>
  );
};

const GradeGames: React.FC = () => {
  const [mode, setMode] = useState<'menu' | 'single' | 'multi' | 'beatboss' | null>('menu');
  const [apClass, setApClass] = useState<string>('');

  return (
    <div className="min-h-screen py-12 px-4 bg-slate-50 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-700">Grade Games</h1>
      {mode === 'menu' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
          <div
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-blue-100 hover:border-blue-400"
            onClick={() => setMode('single')}
          >
            <span className="text-3xl mb-2">🎮</span>
            <span className="text-xl font-bold text-blue-700 mb-2">Singleplayer</span>
            <span className="text-slate-600">Play solo games and challenge the boss!</span>
          </div>
          <div
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center opacity-60 cursor-not-allowed border-2 border-blue-100"
          >
            <span className="text-3xl mb-2">🤝</span>
            <span className="text-xl font-bold text-blue-700 mb-2">Multiplayer</span>
            <span className="text-slate-600">Coming soon!</span>
          </div>
        </div>
      )}
      {mode === 'single' && (
        <div className="w-full max-w-md mt-8 flex flex-col items-center">
          <button
            className="mb-6 px-4 py-2 text-blue-600 hover:text-blue-800 flex items-center gap-2"
            onClick={() => setMode('menu')}
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center">Choose a Game</h2>
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-4 rounded-xl font-bold text-lg shadow hover:from-blue-600 hover:to-teal-600 transition-all duration-300 mb-4"
            onClick={() => setMode('beatboss')}
          >
            🥊 Beat the Boss
          </button>
        </div>
      )}
      {mode === 'beatboss' && !apClass && (
        <div className="w-full max-w-md mt-8 flex flex-col items-center">
          <button
            className="mb-6 px-4 py-2 text-blue-600 hover:text-blue-800 flex items-center gap-2"
            onClick={() => setMode('single')}
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center">Choose AP Class</h2>
          {AP_CLASSES.map(cls => (
            <button
              key={cls.value}
              className="w-full bg-white border-2 border-blue-200 rounded-xl p-6 mb-4 font-semibold text-blue-700 hover:border-blue-400 transition"
              onClick={() => setApClass(cls.value)}
            >
              {cls.label}
            </button>
          ))}
        </div>
      )}
      {mode === 'beatboss' && apClass && (
        <BeatTheBoss apClass={apClass} onExit={() => { setApClass(''); setMode('single'); }} />
      )}
    </div>
  );
};

export default GradeGames;
