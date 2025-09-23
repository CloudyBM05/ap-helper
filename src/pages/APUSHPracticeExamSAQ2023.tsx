import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const saqQuestions = {
	1: {
		sources: `Source: "The true revolution was radical and transformative... It was the substitution of republican for monarchical principles."
—Gordon S. Wood, historian, The Radicalism of the American Revolution, 1991

Source: "The American Revolution was not a revolution in the sense of a radical turnover of society... The ‘class struggle’ was not a significant phenomenon."
—Howard Zinn, historian, A People's History of the United States, 1980`,
		questions: `A. Briefly describe ONE major difference between Wood’s and Zinn’s interpretations of the American Revolution.
B. Briefly explain how ONE specific historical event or development from the period 1775 to 1800 could be used to support Wood’s argument.
C. Briefly explain how ONE specific historical event or development from the period 1775 to 1800 could be used to support Zinn’s argument.`,
		prompt: `You are an expert APUSH grader. For question 1, grade the user's response for parts A, B, and C. Each part is worth 1 point.

- **Part A (1 point):** Award a point for describing the difference: Wood sees the Revolution as a radical societal shift in political thought, while Zinn sees it as a conservative event that maintained existing social and economic structures.
- **Part B (1 point):** Award a point for a specific development supporting Wood (e.g., the abolition of primogeniture, the disestablishment of state churches, the ideals of the Declaration of Independence inspiring challenges to slavery and patriarchy, the creation of republican state constitutions).
- **Part C (1 point):** Award a point for a specific development supporting Zinn (e.g., the persistence of slavery, the limited political role of women, property qualifications for voting in many states, the handling of Shays' Rebellion).

For each part, provide a score (0 or 1) and a concise explanation for your reasoning based on historical accuracy and specificity.`
	},
	2: {
		sources: `Source: John Gast, "American Progress," 1872.`,
		questions: `A. Briefly describe ONE historical development represented in the painting.
B. Briefly explain ONE specific cause of the development described in Part A.
C. Briefly explain ONE specific effect of the development described in Part A on Native American populations.`,
		prompt: `You are an expert APUSH grader. For question 2, grade the user's response for parts A, B, and C. Each part is worth 1 point.

- **Part A (1 point):** Award a point for describing a development shown (e.g., westward expansion, Manifest Destiny, the spread of technology like railroads and telegraphs, the displacement of Native Americans and buffalo).
- **Part B (1 point):** Award a point for explaining a cause (e.g., the desire for land and resources, government policies like the Homestead Act, a belief in American cultural and racial superiority, economic opportunities in the West).
- **Part C (1 point):** Award a point for explaining an effect on Native Americans (e.g., loss of land and forced removal to reservations, destruction of the buffalo herds which were central to their way of life, violent conflict and massacres, attempts at forced assimilation like the Dawes Act).

For each part, provide a score (0 or 1) and a concise explanation for your reasoning based on historical accuracy and specificity.`
	},
	3: {
		sources: ``,
		questions: `A. Briefly describe ONE way the Cold War affected United States domestic policy in the 1950s.
B. Briefly describe a SECOND way the Cold War affected United States domestic policy in the 1950s.
C. Briefly explain ONE way in which the Civil Rights Movement responded to the political climate of the Cold War.`,
		prompt: `You are an expert APUSH grader. For question 3, grade the user's response for parts A, B, and C. Each part is worth 1 point.

- **Part A/B (1 point each):** Award points for describing distinct domestic policy effects (e.g., the Second Red Scare and McCarthyism leading to loyalty oaths and blacklisting; the creation of the interstate highway system for defense purposes; massive federal funding for science and math education (NDEA) after Sputnik).
- **Part C (1 point):** Award a point for explaining a Civil Rights response (e.g., activists highlighting the hypocrisy of fighting for freedom abroad while segregation existed at home; the federal government taking action (like in Brown v. Board) partly to improve America's image in the ideological battle with the USSR).

For each part, provide a score (0 or 1) and a concise explanation for your reasoning based on historical accuracy and specificity.`
	},
	4: {
		sources: ``,
		questions: `A. Briefly explain ONE specific cause for the rise of a conservative movement in the United States from 1960 to 1980.
B. Briefly explain a SECOND specific cause for the rise of a conservative movement in the United States from 1960 to 1980.
C. Briefly explain ONE specific political effect of the conservative movement in the 1980s.`,
		prompt: `You are an expert APUSH grader. For question 4, grade the user's response for parts A, B, and C. Each part is worth 1 point.

- **Part A/B (1 point each):** Award points for explaining distinct causes (e.g., backlash to the social changes and counterculture of the 1960s; opposition to the Supreme Court's liberal rulings (like Roe v. Wade); the growth of the Sunbelt and its suburban, anti-big government politics; the rise of the religious right; economic anxieties like stagflation).
- **Part C (1 point):** Award a point for explaining a political effect in the 1980s (e.g., the election of Ronald Reagan, tax cuts (Reaganomics), deregulation of industries, appointments of conservative judges, a more assertive anti-communist foreign policy).

For each part, provide a score (0 or 1) and a concise explanation for your reasoning based on historical accuracy and specificity.`
	},
};

const APUSHPracticeExamSAQ2023: React.FC = () => {
	const { questionId } = useParams<{ questionId: string }>();
	const navigate = useNavigate();
	const [answers, setAnswers] = useState(['', '', '']);
	const [grading, setGrading] = useState(false);
	const [grades, setGrades] = useState<string[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	const qId = parseInt(questionId || '1', 10);
	const questionData = saqQuestions[qId as keyof typeof saqQuestions];

	const getPdfUrlForQuestion = (questionId: number) => {
		// NOTE: These are placeholder PDFs. Replace with actual 2023 PDFs when available.
		let pdfFile = '';
		if (questionId === 1) {
			pdfFile = 'APUSH2025-SAQ1.pdf'; // Placeholder
		} else if (questionId === 2) {
			pdfFile = 'APUSH2025-SAQ2.pdf'; // Placeholder
		} else if (questionId === 3 || questionId === 4) {
			pdfFile = 'APUSH2025-SAQ3.pdf'; // Placeholder
		}

		if (pdfFile) {
			return `${import.meta.env.BASE_URL}${pdfFile}`;
		}
		return `${import.meta.env.BASE_URL}apush-2025-SAQ.pdf`; // Fallback
	};

	const pdfUrl = getPdfUrlForQuestion(qId);

	useEffect(() => {
		if (!questionData) {
			navigate('/apush-practice-exam/saq/select');
		}
	}, [questionData, navigate]);

	const handleBackClick = () => {
		navigate('/apush-practice-exam/saq/select');
	};

	const handleChange = (idx: number, value: string) => {
		setAnswers((prev) => {
			const copy = [...prev];
			copy[idx] = value;
			return copy;
		});
	};

	const handleSubmit = async () => {
		setGrading(true);
		setError(null);
		setGrades(null);

		const { sources, questions, prompt } = questionData;

		const apiUrl = import.meta.env.DEV
			? '/api/grade-saq'
			: 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-saq';

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					answers,
					prompt_intro: prompt,
					sources,
					questions,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.error || 'Failed to contact AI grading service.'
				);
			}

			const data = await response.json();
			let parsed: { score: number; explanation: string }[] = [];
			try {
				parsed = data.result;
			} catch {
				setError('Failed to contact AI grading service.');
				setGrading(false);
				return;
			}
			setGrades(
				parsed.map(
					(g, i) =>
						`Part ${String.fromCharCode(65 + i)}: ${g.score}/1 - ${
							g.explanation
						}`
				)
			);
		} catch (err: any) {
			setError(err.message || 'An unknown error occurred. Please try again.');
		}
		setGrading(false);
	};

	if (!questionData) {
		return null;
	}

	return (
		<div className='min-h-screen bg-slate-50 py-8 px-4'>
			<div className='max-w-7xl mx-auto'>
				<button
					onClick={handleBackClick}
					className='mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition'
				>
					&larr; Back to SAQ Selection
				</button>
				<div className='flex flex-col md:flex-row justify-center items-start gap-8'>
					<div className='flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col'>
						<h2 className='text-xl font-bold mb-4 text-center'>
							APUSH 2023 SAQ - Question {questionId}
						</h2>
						<iframe
							src={pdfUrl}
							title={`APUSH 2023 SAQ PDF - Question ${questionId}`}
							className='w-full flex-1 min-h-[1000px] border rounded-lg'
						/>
						<div className='text-xs text-slate-500 mt-2 text-center'>
							(Using 2025 PDF as a placeholder) If the PDF does not load,{' '}
							<a
								href={pdfUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='underline text-blue-600'
							>
								click here to open in a new tab
							</a>
							.
						</div>
					</div>
					<div className='flex-1 max-w-2xl p-6 flex flex-col items-center'>
						<h2 className='text-xl font-bold mb-4 text-center'>
							Your SAQ Answers for Question {questionId}
						</h2>
						<button
							className='mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition'
							onClick={handleSubmit}
							disabled={grading}
						>
							{grading ? 'Grading...' : 'SUBMIT FOR AI GRADE'}
						</button>
						<div className='w-full space-y-6'>
							{[0, 1, 2].map((idx) => (
								<div key={idx} className='w-full'>
									<label className='block font-semibold mb-2'>{`Part ${String.fromCharCode(
										65 + idx
									)}`}</label>
									<textarea
										className='w-full min-h-[150px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
										value={answers[idx]}
										onChange={(e) => handleChange(idx, e.target.value)}
										placeholder={`Type your answer for Part ${String.fromCharCode(
											65 + idx
										)} here...`}
										disabled={grading}
									/>
								</div>
							))}
						</div>
						{error && (
							<div className='mt-6 text-red-600 font-semibold'>{error}</div>
						)}
						{grades && (
							<div className='mt-8 w-full bg-green-50 border border-green-200 rounded-lg p-4'>
								<h3 className='text-lg font-bold mb-2 text-green-700'>
									AI Grading Results
								</h3>
								<ul className='list-disc pl-6 space-y-2'>
									{grades.map((g, i) => (
										<li key={i} className='text-green-900'>
											{g}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default APUSHPracticeExamSAQ2023;
