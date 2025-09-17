import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const saqQuestions = {
	1: {
		sources: `Source: Historian A (2010): "The market revolution was a liberating force for American women, offering them new opportunities for economic independence and social engagement outside the domestic sphere."

Source: Historian B (2012): "The market revolution, while creating some new jobs, largely reinforced traditional gender roles, confining women to low-wage labor and domesticity while celebrating a male-dominated public sphere."`,
		questions: `A. Briefly describe ONE specific historical development that supports Historian A's interpretation.
B. Briefly describe ONE specific historical development that supports Historian B's interpretation.
C. Briefly explain ONE specific reason for the difference in the historians' interpretations.`,
		prompt: `You are an expert APUSH grader. For question 1, grade the user's response for parts A, B, and C. Each part is worth 1 point.

- **Part A (1 point):** Award a point for describing a specific development supporting Historian A (e.g., Lowell Mill girls earning wages, women's involvement in reform movements like abolitionism or temperance which grew from new social networks).
- **Part B (1 point):** Award a point for describing a specific development supporting Historian B (e.g., the rise of the "cult of domesticity," limited and poorly paid work options for women, legal doctrines like coverture limiting women's property rights).
- **Part C (1 point):** Award a point for explaining a reason for the different interpretations (e.g., focus on different groups of women (urban vs. rural, middle-class vs. working-class), different types of evidence (prescriptive literature vs. economic data), or different definitions of "liberation").

For each part, provide a score (0 or 1) and a concise explanation for your reasoning based on historical accuracy and specificity.`,
	},
	2: {
		sources: `Source: Image of a "Hooverville" shack town during the Great Depression.`,
		questions: `A. Briefly describe ONE specific cause of the development depicted in the image.
B. Briefly describe ONE specific effect of the development depicted in the image on American society.
C. Briefly explain ONE specific action taken by the federal government to address the problems of the Great Depression.`,
		prompt: `You are an expert APUSH grader. For question 2, grade the user's response for parts A, B, and C. Each part is worth 1 point.

- **Part A (1 point):** Award a point for describing a cause of Hoovervilles (e.g., mass unemployment following the 1929 stock market crash, bank failures wiping out savings, Dust Bowl migrations, President Hoover's initial policy of limited federal intervention).
- **Part B (1 point):** Award a point for describing an effect on society (e.g., widespread homelessness and poverty, increased social unrest and protests, erosion of public trust in government and capitalism, rise of mutual aid societies).
- **Part C (1 point):** Award a point for explaining a specific government action (e.g., a New Deal program like the CCC, PWA, or WPA creating jobs; the Social Security Act providing a safety net; the FDIC insuring bank deposits).

For each part, provide a score (0 or 1) and a concise explanation for your reasoning based on historical accuracy and specificity.`,
	},
	3: {
		sources: `Source: U.S. Supreme Court decision, Brown v. Board of Education of Topeka (1954).`,
		questions: `A. Briefly describe the historical context in which this decision was made.
B. Briefly describe ONE specific argument used by the Supreme Court in its ruling.
C. Briefly explain ONE specific limitation or challenge to implementing the decision in the 1950s and 1960s.`,
		prompt: `You are an expert APUSH grader. For question 3, grade the user's response for parts A, B, and C. Each part is worth 1 point.

- **Part A (1 point):** Award a point for describing the historical context (e.g., the "separate but equal" doctrine established by Plessy v. Ferguson, the ongoing Civil Rights Movement, the context of the Cold War and America's image abroad).
- **Part B (1 point):** Award a point for describing a specific argument from the ruling (e.g., that separate educational facilities are "inherently unequal," that segregation harms the psychological development of Black children, that segregation violates the Equal Protection Clause of the 14th Amendment).
- **Part C (1 point):** Award a point for explaining a limitation or challenge (e.g., "Massive Resistance" from Southern states, the "Southern Manifesto," the use of pupil placement laws to evade desegregation, violence from groups like the KKK, the slow pace of enforcement without federal troops).

For each part, provide a score (0 or 1) and a concise explanation for your reasoning based on historical accuracy and specificity.`,
	},
	4: {
		sources: `Source: A political cartoon from the 1980s depicting President Ronald Reagan cutting social program budgets while increasing military spending.`,
		questions: `A. Briefly describe the point of view of the cartoonist.
B. Briefly explain ONE specific policy of the Reagan administration that reflects the cartoonist's point of view.
C. Briefly explain ONE specific effect of the policies referenced in the cartoon.`,
		prompt: `You are an expert APUSH grader. For question 4, grade the user's response for parts A, B, and C. Each part is worth 1 point.

- **Part A (1 point):** Award a point for describing the cartoonist's point of view (e.g., critical of Reagan's priorities, suggesting Reaganomics favored the military at the expense of the poor and needy, highlighting a growing budget deficit).
- **Part B (1 point):** Award a point for explaining a specific policy (e.g., supply-side economics (Reaganomics) involving tax cuts, deregulation of industries, cuts to programs like food stamps or housing assistance, increased defense spending for programs like the Strategic Defense Initiative (SDI)).
- **Part C (1 point):** Award a point for explaining a specific effect (e.g., a significant increase in the national debt, a widening gap between the rich and poor, the end of the Cold War, a recession in the early 1980s followed by economic growth).

For each part, provide a score (0 or 1) and a concise explanation for your reasoning based on historical accuracy and specificity.`,
	},
};

const APUSHPracticeExamSAQ2024: React.FC = () => {
	const { questionId } = useParams<{ questionId: string }>();
	const navigate = useNavigate();
	const [answers, setAnswers] = useState(['', '', '']);
	const [grading, setGrading] = useState(false);
	const [grades, setGrades] = useState<string[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	const qId = parseInt(questionId || '1', 10);
	const questionData = saqQuestions[qId as keyof typeof saqQuestions];

	const getPdfUrlForQuestion = (questionId: number) => {
		// NOTE: These are placeholder PDFs. Replace with actual 2024 PDFs when available.
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
							APUSH 2024 SAQ - Question {questionId}
						</h2>
						<iframe
							src={pdfUrl}
							title={`APUSH 2024 SAQ PDF - Question ${questionId}`}
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

export default APUSHPracticeExamSAQ2024;
