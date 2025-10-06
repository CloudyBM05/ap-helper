import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const APUSHPracticeExamSAQ2025: React.FC = () => {
	const { questionId } = useParams<{ questionId: string }>();
	const navigate = useNavigate();
	const { isAuthenticated, getAuthHeaders } = useAuth();
	const [answers, setAnswers] = useState(['', '', '']);
	const [grading, setGrading] = useState(false);
	const [grades, setGrades] = useState<string[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	const qId = parseInt(questionId || '1', 10);
	const STORAGE_KEY = `apush-saq-2025-set1-q${qId}-answers`;
	
	// Word and character count limits for SAQ
	const MIN_WORDS_PER_PART = 20;   // Minimum words per SAQ part
	const MAX_WORDS_PER_PART = 200;  // Maximum words per SAQ part
	const MAX_CHARS_PER_PART = 1200; // Maximum characters per SAQ part to prevent token abuse

	// Load saved answers from localStorage on mount or question change
	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				const parsedAnswers = JSON.parse(saved);
				if (Array.isArray(parsedAnswers) && parsedAnswers.length === 3) {
					setAnswers(parsedAnswers);
				}
			} catch (e) {
				console.error('Failed to load saved answers:', e);
			}
		}
	}, [qId, STORAGE_KEY]);

	const getPdfUrlForQuestion = (questionId: number) => {
		let pdfFile = '';
		if (questionId === 1) {
			pdfFile = 'APUSH2025-SAQ1.pdf';
		} else if (questionId === 2) {
			pdfFile = 'APUSH2025-SAQ2.pdf';
		} else if (questionId === 3 || questionId === 4) {
			pdfFile = 'APUSH2025-SAQ3.pdf';
		}

		if (pdfFile) {
			return `${import.meta.env.BASE_URL}${pdfFile}`;
		}
		// Fallback to a generic PDF if the specific one isn't found
		return `${import.meta.env.BASE_URL}apush-2025-SAQ.pdf`;
	};

	const pdfUrl = getPdfUrlForQuestion(qId);

	const handleBackClick = () => {
		navigate('/apush-practice-exam/saq/select');
	};

	const handleChange = (idx: number, value: string) => {
		setAnswers((prev) => {
			const copy = [...prev];
			copy[idx] = value;
			// Save to localStorage immediately as user types
			localStorage.setItem(STORAGE_KEY, JSON.stringify(copy));
			return copy;
		});
	};

	const handleSubmit = async () => {
		// Check if user is authenticated
		if (!isAuthenticated) {
			setError('Please log in to use AI grading. Click the "Login" button in the navigation bar.');
			return;
		}

		// Word count validation
		const wordCounts = answers.map(ans => ans.trim() ? ans.trim().split(/\s+/).length : 0);
		
		for (let i = 0; i < wordCounts.length; i++) {
			if (wordCounts[i] < MIN_WORDS_PER_PART) {
				setError(`Part ${String.fromCharCode(65 + i)} is too short. Please write at least ${MIN_WORDS_PER_PART} words. Current: ${wordCounts[i]} words.`);
				return;
			}
			if (wordCounts[i] > MAX_WORDS_PER_PART) {
				setError(`Part ${String.fromCharCode(65 + i)} exceeds the maximum length. Please keep it under ${MAX_WORDS_PER_PART} words. Current: ${wordCounts[i]} words.`);
				return;
			}
		}

		// Character count validation
		for (let i = 0; i < answers.length; i++) {
			if (answers[i].length > MAX_CHARS_PER_PART) {
				setError(`Part ${String.fromCharCode(65 + i)} exceeds the maximum character limit. Please reduce to under ${MAX_CHARS_PER_PART} characters.`);
				return;
			}
		}

		setGrading(true);
		setError(null);
		setGrades(null);

		let prompt_intro;
		if (qId === 1) {
			prompt_intro =
				'Grade this APUSH SAQ (3 parts: A, B, C). 1 point per part. Award only if the answer is specific, historically accurate, and directly answers the prompt. No vague claims. BE STRICT! Timeframe: 1789–1820.\n\nSAQ Context:\n\nWilentz: Democracy expanded after 1800; Jeffersonians opened the system.\n\nBouton: Elites limited democracy; Democratic-Republicans kept elite systems.\n\nQuestions:\nA. What’s one key difference in Wilentz vs. Bouton’s interpretations?\nB. What’s one 1789–1820 event that supports Wilentz’s view?\nC. What’s one 1789–1820 event that supports Bouton’s view?\n\nOutput:\nA: [0 or 1], reason: [...]\nB: [0 or 1], reason: [...]\nC: [0 or 1], reason: [...]';
		} else if (qId === 2) {
			prompt_intro =
				'Grade an APUSH SAQ (3 parts: A, B, C). 1 point per part. Only award if the answer is specific, historically accurate, and directly addresses the prompt. No vague or general claims. BE STRICT! Timeframe: 1820–1865.\n\nSAQ Context:\nIn 1830, Senator Daniel Webster (MA, Whig) argued for national unity and federal support for internal improvements, rejecting Robert Hayne’s (SC, Democrat) states’ rights view.\n\nQuestions:\nA. What was one purpose of promoting ideas like Webster’s?\nB. What is one 1820–1848 development that influenced this debate?\nC. What is one 1848–1865 debate similar to this one?\n\nOutput:\nA: [0 or 1], reason: [...]\nB: [0 or 1], reason: [...]\nC: [0 or 1], reason: [...]';
		} else if (qId === 3) {
			prompt_intro =
				'Grade APUSH SAQ (A–C). 1 point each. Award point only if answer is specific, historically accurate, and directly addresses the question. BE STRICT! No vague claims.\n\nQuestions:\nA. Name one political development in British North America (1607–1753).\nB. Name one effect of the Seven Years’ War (1754–1765).\nC. Explain how one group responded to rights debates (1765–1783).\n\nOutput:\nA: [0 or 1], reason: [...]\nB: [0 or 1], reason: [...]\nC: [0 or 1], reason: [...]';
		} else if (qId === 4) {
			prompt_intro =
				"Grade APUSH SAQ (A–C). 1 point each. Give point only if answer is specific, historically accurate, and directly answers the question. No vague/general claims. BE STRICT!\n\nQuestions:\nA. Describe one political development during Reconstruction (1865–1877).\nB. Describe one effect of Reconstruction ending (1877–1900).\nC. Explain how one group responded to federal gov’t debates (1900–1945).\n\nOutput:\nA: [0 or 1], reason: [...]\nB: [0 or 1], reason: [...]\nC: [0 or 1], reason: [...]";
		} else {
			prompt_intro =
				'You are an APUSH teacher. Grade parts A, B, and C (0 or 1 point each) based on: (1) historically accurate info, (2) clarity, (3) correct use of “describe” (more than naming) and “explain” (why or how). Give a short explanation for each score.';
		}

		const apiUrl = import.meta.env.DEV
			? '/api/grade-saq'
			: 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-saq';

		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...getAuthHeaders(),
				},
				body: JSON.stringify({
					answers,
					prompt_intro,
					sources: '', // Sources are in the prompt for Q1-4
					questions: '', // Questions are in the prompt for Q1-4
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				if (response.status === 429) {
					throw new Error(errorData.error || 'Daily limit reached. You can submit 1 assignment for AI grading per day.');
				}
				throw new Error(errorData.error || 'Failed to contact AI grading service.');
			}

			const data = await response.json();
			let parsed: { score: number; explanation: string }[] = [];
			try {
				const parsedResult = data.result;
				parsed = parsedResult;
			} catch {
				setError("Failed to contact AI grading service.");
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
			// Clear saved answers after successful grading
			localStorage.removeItem(STORAGE_KEY);
		} catch (err: any) {
			setError(err.message || "Unknown error.");
		}
		setGrading(false);
	};

	return (
		<div className='min-h-screen bg-slate-50 py-8 px-4'>
			<div className='max-w-7xl mx-auto'>
				<button
					onClick={handleBackClick}
					className='mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition'
				>
					&larr; Back to SAQ Selection
				</button>
				<div className='flex flex-col md:flex-row justify-center items-start'>
					{/* PDF Viewer */}
					<div className='flex-[1.5] min-w-[400px] max-w-5xl bg-white shadow-lg p-6 flex flex-col'>
						<h2 className='text-xl font-bold mb-4 text-center'>
							APUSH 2025 SAQ - Question {questionId}
						</h2>
						<iframe
							src={pdfUrl}
							title={`APUSH 2025 SAQ PDF - Question ${questionId}`}
							className='w-full flex-1 min-h-[1000px] border rounded-lg'
						/>
						<div className='text-xs text-slate-500 mt-2 text-center'>
							If the PDF does not load,{' '}
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
					{/* SAQ Answers */}
					<div className='flex-1 max-w-2xl p-6 flex flex-col items-center'>
						<h2 className='text-xl font-bold mb-4 text-center'>
							Your SAQ Answers for Question {questionId}
						</h2>
						<button
							className='mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition'
							onClick={handleSubmit}
							disabled={grading}
						>
							{grading ? 'Grading...' : 'SUBMIT'}
						</button>
						<div className='w-full space-y-6'>
							{[0, 1, 2].map((idx) => {
								const wordCount = answers[idx].trim() ? answers[idx].trim().split(/\s+/).length : 0;
								const charCount = answers[idx].length;
								const isUnderMin = wordCount > 0 && wordCount < MIN_WORDS_PER_PART;
								const isOverMaxWords = wordCount > MAX_WORDS_PER_PART;
								const isOverMaxChars = charCount > MAX_CHARS_PER_PART;
								
								return (
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
										<div className={`mt-1 text-sm ${isOverMaxWords ? 'text-red-600 font-semibold' : isUnderMin ? 'text-orange-600' : 'text-slate-600'}`}>
											Word count: {wordCount}
											<span className='ml-2 text-slate-500'>
												(Min: {MIN_WORDS_PER_PART} | Max: {MAX_WORDS_PER_PART})
											</span>
											{isOverMaxWords && <span className='ml-2'>⚠️ Exceeds maximum word count</span>}
											{isUnderMin && <span className='ml-2'>⚠️ Below minimum word count</span>}
										</div>
										<div className={`mt-1 text-sm ${isOverMaxChars ? 'text-red-600 font-semibold' : 'text-slate-600'}`}>
											Character count: {charCount}
											<span className='ml-2 text-slate-500'>
												(Max: {MAX_CHARS_PER_PART})
											</span>
											{isOverMaxChars && <span className='ml-2'>⚠️ Exceeds maximum character limit</span>}
										</div>
									</div>
								);
							})}
						</div>
						{error && (
							<div className={`mt-6 font-semibold ${error.includes('Daily limit') ? 'text-orange-600 bg-orange-50 border border-orange-200 rounded-lg p-4' : 'text-red-600'}`}>
								{error.includes('Daily limit') && (
									<div className='flex items-center mb-2'>
										<span className='text-orange-500 mr-2'>⏰</span>
										<span className='font-bold'>Rate Limit Reached</span>
									</div>
								)}
								{error}
								{error.includes('Daily limit') && (
									<div className='mt-2 text-sm text-orange-700'>
										This helps keep the service available for everyone. Try again tomorrow!
									</div>
								)}
							</div>
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

export default APUSHPracticeExamSAQ2025;
