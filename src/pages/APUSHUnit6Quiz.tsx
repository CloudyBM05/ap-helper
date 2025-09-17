import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit6QuizQuestions = [
	{
		id: 1,
		stimulus: 'Excerpt from the Omaha Platform of the Populist Party (1892)',
		text: '"We meet in the midst of a nation brought to the verge of moral, political, and material ruin. Corruption dominates the ballot-box, the Legislatures, the Congress… From the same prolific womb of governmental injustice we breed two great classes—tramps and millionaires... We demand a national currency, safe, sound, and flexible... issued by the general government... We demand a graduated income tax... We demand government ownership of the railroads..."',
		questions: [
			{
				question: 'What was the primary goal of the Populist Party as expressed in this platform?',
				options: [
					'A. Promote laissez-faire capitalism',
					'B. Eliminate all forms of government regulation',
					'C. Reduce the power of corporate and financial elites',
					'D. Reinforce the gold standard',
				],
				answer: 2,
				explanation:
					'The Omaha Platform directly attacks the influence of wealth on politics and the resulting inequality (tramps and millionaires). By demanding government control over currency and railroads and a graduated income tax, the Populists sought to curb the power of large corporations and banks, which they believed corrupted the government and exploited farmers and laborers.',
			},
			{
				question: 'What problem were the Populists addressing with their demand for government ownership of railroads?',
				options: [
					'A. Railroads refused to hire immigrant labor',
					'B. Railroads charged discriminatory rates that hurt farmers',
					'C. Railroads created too many jobs and raised wages',
					'D. Railroads limited western expansion',
				],
				answer: 1,
				explanation:
					'During the Gilded Age, railroads held monopolies over transportation in many areas and were notorious for charging small farmers exorbitant rates to ship their crops, while giving preferential rates to large corporations. Government ownership was proposed as a solution to end these discriminatory practices and ensure fair access for all.',
			},
		],
	},
	{
		id: 2,
		stimulus: 'From Frederick Jackson Turner’s “The Significance of the Frontier in American History” (1893)',
		text: '“The frontier has been the line of most rapid and effective Americanization. The frontier is the outer edge of the wave—the meeting point between savagery and civilization... And now, four centuries from the discovery of America, at the end of a hundred years under the Constitution, the frontier has gone, and with its going has closed the first period of American history.”',
		questions: [
			{
				question: 'According to Turner, why was the closing of the frontier significant?',
				options: [
					'A. It meant the U.S. would no longer expand economically.',
					'B. It ended an era that defined American democracy and identity.',
					'c. It signaled the end of Native American resistance.',
					'D. It showed that America had fully industrialized.',
				],
				answer: 1,
				explanation:
					'Turner’s ‘Frontier Thesis’ argued that the experience of westward expansion was central to forming the American character—promoting values like individualism, democracy, and self-reliance. He believed the closing of the frontier marked a pivotal and uncertain turning point, as the nation would now have to find new ways to sustain its unique identity without this defining influence.',
			},
			{
				question: 'Which historical development best illustrates the "closing of the frontier"?',
				options: [
					'A. The Homestead Act',
					'B. The completion of the transcontinental railroad',
					'C. The 1890 Census declaring the frontier closed',
					'D. The gold rush in California',
				],
				answer: 2,
				explanation:
					'Frederick Jackson Turner was directly inspired by the 1890 U.S. Census Bureau report, which stated that a continuous frontier line no longer existed in the American West. This official declaration prompted his reflection on the significance of the frontier’s disappearance in American history.',
			},
		],
	},
	{
		id: 3,
		stimulus: 'Excerpt from Looking Backward by Edward Bellamy (1888)',
		text: '“It is a mistake to suppose that crime, poverty, and social miseries are inseparable from human society. They are simply symptoms of a disordered social system. Under a system where labor is honorably shared and goods are equitably distributed, such evils will vanish.”',
		questions: [
			{
				question: 'Which of the following ideologies is most closely associated with Bellamy’s ideas?',
				options: [
					'A. Social Darwinism',
					'B. Laissez-faire capitalism',
					'C. Utopian socialism',
					'D. Nativism',
				],
				answer: 2,
				explanation:
					'Bellamy’s novel, Looking Backward, is a classic example of utopian socialism. It imagines a future society where the government has nationalized all industry and created a cooperative system that eliminates inequality and social problems, reflecting the core ideals of a planned, socialist utopia.',
			},
			{
				question:
					'Bellamy’s perspective in this excerpt most directly challenges which belief common during the Gilded Age?',
				options: [
					'A. The idea that government should regulate the economy',
					'B. The belief in free silver as an economic solution',
					'C. The acceptance of inequality as a natural part of industrial society',
					'D. The support for civil service reform',
				],
				answer: 2,
				explanation:
					'Bellamy directly challenges the Social Darwinist belief, common in the Gilded Age, that poverty and inequality were natural and inevitable outcomes of competition. He argues instead that they are correctable flaws of the capitalist system, not inherent features of humanity.',
			},
		],
	},
	{
		id: 4,
		stimulus: 'From The Atlanta Constitution (1886), edited by Henry Grady',
		text: '“The New South presents a perfect democracy… It is a land of opportunity, of education, of steady growth and of diversified industries. She stands with the North upon the question of the Union… but out of the ruins of the old South has arisen a New South, breathing the spirit of modern progress.”',
		questions: [
			{
				question:
					'What was the central message Henry Grady promoted through his vision of the "New South"?',
				options: [
					'A. The South should return to a plantation-based economy',
					'B. The South should industrialize and diversify its economy',
					'C. Reconstruction should be renewed and expanded',
					'D. The South should cut all economic ties with the North',
				],
				answer: 1,
				explanation:
					'Henry Grady was a leading proponent of the ‘New South’ ideology, which called for the post-Civil War South to move away from its agrarian roots and embrace industrialization, manufacturing, and economic diversification to match the North’s prosperity.',
			},
			{
				question:
					'Which of the following best undermines Grady’s ‘New South’ vision in practice?',
				options: [
					'A. The expansion of African American voting rights',
					'B. The rise of the Populist Party',
					'C. The continuation of sharecropping and Jim Crow segregation',
					'D. The growth of southern railroad lines',
				],
				answer: 2,
				explanation:
					'Despite Grady’s vision of a progressive ‘New South,’ the reality was that the region remained largely impoverished and agricultural. The economic system of sharecropping trapped many in debt, and the legal enforcement of racial segregation through Jim Crow laws contradicted the claim of a ‘perfect democracy’ and equal opportunity.',
			},
		],
	},
	{
		id: 5,
		stimulus: 'Data on Immigration (1865–1898)',
		text: 'Between 1865 and 1898, more than 16 million immigrants arrived in the U.S., primarily from Southern and Eastern Europe. Most settled in urban centers like New York, Chicago, and Pittsburgh. Many worked in industrial jobs, often for low wages and in dangerous conditions. Native-born Americans increasingly saw them as threats to social order and economic stability.',
		questions: [
			{
				question:
					'Which group most likely supported restrictions on immigration during this period?',
				options: [
					'A. Industrialists',
					'B. Nativist organizations',
					'C. Southern planters',
					'D. Western landowners',
				],
				answer: 1,
				explanation:
					'Nativist organizations, such as the American Protective Association, were formed specifically to oppose immigration. They were fueled by fears that immigrants from Southern and Eastern Europe were culturally inferior, loyal to the Pope, and would take jobs from native-born workers.',
			},
			{
				question:
					'Which legislative act best reflects the anti-immigrant sentiment described?',
				options: [
					'A. The Homestead Act',
					'B. The Dawes Act',
					'C. The Chinese Exclusion Act',
					'D. The Interstate Commerce Act',
				],
				answer: 2,
				explanation:
					'The Chinese Exclusion Act of 1882 is the most prominent example of legislative action driven by anti-immigrant sentiment in this era. It was the first federal law to ban an entire ethnic group from immigrating to the United States, reflecting widespread nativist and economic fears.',
			},
		],
	},
];

const allQuestions = unit6QuizQuestions.reduce((acc: any[], group) => {
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

const APUSHUnit6Quiz: React.FC = () => {
	const [current, setCurrent] = useState(0);
	const [selected, setSelected] = useState<number | null>(null);
	const [answers, setAnswers] = useState<(number | null)[]>(
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
		navigate('/apush-study-guide/unit/6');
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
			onClick={() => navigate('/apush-study-guide/unit/6')}
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

export default APUSHUnit6Quiz;
