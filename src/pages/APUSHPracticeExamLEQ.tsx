import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../hooks/useAuth';

const APUSHPracticeExamLEQ: React.FC = () => {
	const { setId, questionId } = useParams<{ setId: string; questionId: string }>();
	const navigate = useNavigate();
	const [answer, setAnswer] = useState('');
	const [grading, setGrading] = useState(false);
	const [grade, setGrade] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [showAuthModal, setShowAuthModal] = useState(false);
	
	const { isAuthenticated, getAuthHeaders } = useAuth();

	const STORAGE_KEY = `apush-leq-set${setId}-q${questionId}-answer`;
	
	// Word count limits for LEQ
	const MIN_WORDS = 200;  // Minimum for a reasonable LEQ
	const MAX_WORDS = 1000; // Maximum to prevent spam

	// Load saved answer from localStorage on mount or question change
	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			try {
				setAnswer(saved);
			} catch (e) {
				console.error('Failed to load saved answer:', e);
			}
		}
	}, [setId, questionId, STORAGE_KEY]);

	// Save answer to localStorage on change
	useEffect(() => {
		if (answer.trim()) {
			localStorage.setItem(STORAGE_KEY, answer);
		}
	}, [answer, STORAGE_KEY]);

	// Helper function to count words
	const countWords = (text: string): number => {
		return text.trim().split(/\s+/).filter(word => word.length > 0).length;
	};

	const wordCount = countWords(answer);

	const getPdfUrl = () => {
		if (setId === '1') {
			return `${import.meta.env.BASE_URL}APUSH-LEQ1.pdf`;
		} else if (setId === '2') {
			return `${import.meta.env.BASE_URL}APUSH-LEQ2.pdf`;
		}
		return '';
	};

	const pdfUrl = getPdfUrl();

	const handleBackClick = () => {
		navigate('/apush-practice-exam/leq/select');
	};

	const getGradingPrompt = () => {
		const basePrompt = `You are an expert APUSH grader. Grade the following Long Essay Question (LEQ) response on a scale of 0-6 based on the official 2024 APUSH LEQ rubric.

		LEQ Question: [This will be determined by the selected question]

		Student's Essay:
		"""
		${answer}
		"""

		Please provide a detailed breakdown for each of the 6 possible points:
		1.  **Thesis/Claim (0-1 pt):** Does it respond to the prompt with a historically defensible thesis/claim that establishes a line of reasoning?
		2.  **Contextualization (0-1 pt):** Does it describe a broader historical context relevant to the prompt?
		3.  **Evidence - Point 1 (0-1 pt):** Does it provide specific examples of evidence relevant to the topic of the prompt?
		4.  **Evidence - Point 2 (0-1 pt):** Does it SUPPORT an argument in response to the prompt using specific and relevant examples of evidence?
		5.  **Analysis and Reasoning - Point 1 (0-1 pt):** Does it use historical reasoning (e.g., comparison, causation, CCOT) to frame or structure an argument that addresses the prompt?
		6.  **Analysis and Reasoning - Point 2 (0-1 pt):** Does it demonstrate a complex understanding of the historical development that is the focus of the prompt?

		For each point, state whether the student earned the point and provide a concise justification with a direct quote from the essay if applicable.

		Finally, provide a total score (e.g., "Total Score: 4/6") and a summary paragraph explaining what the student did well and what they can improve upon. Structure the output clearly with headings for each rubric point.`;

		const leqPrompts: { [key: string]: { [key: string]: string } } = {
			'1': {
				'2': `Prompt:
Grade this APUSH LEQ using the official 6-point rubric. Be strict: award points only for historically accurate, specific, and directly relevant content. Do not reward vague, general, or off-topic responses.

LEQ Prompt:
Evaluate how Native American societies adapted to the presence of European colonists in North America from 1500 to 1754.

Student's Essay:
"""
${answer}
"""

Rubric:

Thesis (0–1): Responds clearly to prompt with a historically defensible claim.

Contextualization (0–1): Describes broader relevant developments before/during the time period.

Evidence (0–2):
 - 1 pt: Provides specific examples of Native adaptation.
 - 2 pts: Uses evidence to support argument.

Analysis & Reasoning (0–2):
 - 1 pt: Shows reasoning (e.g., causation, change/continuity).
 - 2 pts: Demonstrates complex understanding (e.g., multiple causes, nuanced differences among tribes).

Output Format:
Score: X/6

Thesis: [0/1]

Context: [0/1]

Evidence: [0–2]

Reasoning: [0–2]
Justification: [brief explanation for each section]`,
				'3': `Grade this APUSH LEQ using the 6-point rubric. Be strict: award points only for specific, historically accurate, and directly relevant responses. No vague or off-topic claims.

LEQ Question:
Evaluate how different reform movements in the U.S. responded to industrialization, 1820–1900.

Student's Essay:
"""
${answer}
"""

Rubric:

Thesis (0–1): Defensible claim that directly answers the prompt.

Contextualization (0–1): Describes broader relevant developments before/during 1820–1900.

Evidence (0–2):
 - 1 pt: Provides specific examples (e.g., labor unions, temperance, abolition, women’s rights, education reform).
 - 2 pts: Supports a clear argument using evidence.

Analysis & Reasoning (0–2):
 - 1 pt: Uses reasoning (cause/effect, continuity/change).
 - 2 pts: Shows complex understanding (e.g., variation among movements, unintended effects).

Output Format:
Score: X/6

Thesis: [0/1]

Context: [0/1]

Evidence: [0–2]

Reasoning: [0–2]
Justification: [brief explanation for each score]`,
				'4': `Prompt:
Grade this APUSH LEQ using the 6-point rubric. Be strict: award points only for specific, historically accurate, and directly relevant responses. No vague or general claims.

LEQ Question:
Evaluate how U.S. foreign policy responded to world changes from 1890 to 1930.

Student's Essay:
"""
${answer}
"""

Rubric:

Thesis (0–1): Defensible claim answering the prompt.

Contextualization (0–1): Describes broader relevant developments before/during 1890–1930.

Evidence (0–2):
 - 1 pt: Cites specific developments (e.g., Spanish-American War, Roosevelt Corollary, WWI, isolationism, League of Nations).
 - 2 pts: Uses evidence to support a clear argument.

Analysis & Reasoning (0–2):
 - 1 pt: Shows cause/effect or continuity/change.
 - 2 pts: Demonstrates complexity (e.g., shift from expansionism to isolationism, economic vs. military motives).

Output Format:
Score: X/6

Thesis: [0/1]

Context: [0/1]

Evidence: [0–2]

Reasoning: [0–2]
Justification: [brief reason for each score]`
			},
			'2': {
				'2': `Prompt:
Grade this APUSH LEQ using the 6-point rubric. Be strict: award points only for specific, accurate, and directly relevant content. No vague or general claims.

LEQ Question:
Evaluate how British colonists in the Americas adapted to their environments from 1607 to 1754.

Student's Essay:
"""
${answer}
"""

Rubric:

Thesis (0–1): Defensible claim directly answering the prompt.

Contextualization (0–1): Describes broader relevant developments before/during 1607–1754.

Evidence (0–2):
 - 1 pt: Specific examples (e.g., New England town structures, plantation economies, Native alliances, regional agriculture).
 - 2 pts: Uses evidence to support argument.

Reasoning (0–2):
 - 1 pt: Uses reasoning (cause/effect, regional variation, environmental factors).
 - 2 pts: Demonstrates complexity (e.g., contrasts between regions, changing adaptations over time).

Output Format:
Score: X/6

Thesis: [0/1]

Context: [0/1]

Evidence: [0–2]

Reasoning: [0–2]
Justification: [brief explanation for each score]`,
				'3': `Prompt:
Grade this APUSH LEQ using the 6-point rubric. Be strict: award points only for specific, historically accurate, and directly relevant content. No vague or general claims.

LEQ Question:
Evaluate how sectional tensions shaped U.S. society from 1800 to 1848.

Student's Essay:
"""
${answer}
"""

Rubric:

Thesis (0–1): Clear, defensible claim answering the prompt.

Contextualization (0–1): Broader relevant background (e.g., early republic, westward expansion, market revolution).

Evidence (0–2):
 - 1 pt: Specific examples (e.g., Missouri Compromise, tariff debates, slavery, states’ rights, North/South economic differences).
 - 2 pts: Evidence supports a cohesive argument.

Reasoning (0–2):
 - 1 pt: Shows cause/effect or change/continuity.
 - 2 pts: Demonstrates complexity (e.g., tension across multiple domains—political, economic, cultural).

Output Format:
Score: X/6

Thesis: [0/1]

Context: [0/1]

Evidence: [0–2]

Reasoning: [0–2]
Justification: [brief reason for each score]`,
				'4': `Prompt:
Grade this APUSH LEQ using the 6-point rubric. Be strict: award points only for specific, historically accurate, and directly relevant content. No vague or general claims.

LEQ Question:
Evaluate how U.S. society responded to economic changes from 1960 to 2000.

Student's Essay:
"""
${answer}
"""

Rubric:

Thesis (0–1): Defensible claim that directly addresses the prompt.

Contextualization (0–1): Relevant background before or during 1960–2000 (e.g., post-WWII prosperity, Cold War economy).

Evidence (0–2):
 - 1 pt: Specific examples (e.g., deindustrialization, women entering the workforce, Reaganomics, rise of service sector, income inequality).
 - 2 pts: Evidence supports a clear argument.

Reasoning (0–2):
 - 1 pt: Uses cause/effect, continuity/change, etc.
 - 2 pts: Shows complexity (e.g., differing responses by race, gender, class; liberal vs. conservative economic views).

Output Format:
Score: X/6

Thesis: [0/1]

Context: [0/1]

Evidence: [0–2]

Reasoning: [0–2]
Justification: [brief reason for each score]`
			}
		};

		const specificPrompt = leqPrompts[setId!]?.[questionId!];
		if (specificPrompt) {
			return specificPrompt;
		}

		const leqQuestions: { [key: string]: { [key: string]: string } } = {
			'1': {
				'2': 'Evaluate how Native American societies adapted to European colonists in North America, 1500–1754.',
				'3': 'Evaluate how different reform movements in the U.S. responded to industrialization, 1820–1900.',
				'4': 'Evaluate how U.S. foreign policy responded to world changes from 1890 to 1930.'
			},
			'2': {
				'2': 'Evaluate how British colonists in the Americas adapted to their environments from 1607 to 1754.',
				'3': 'Evaluate how sectional tensions shaped U.S. society from 1800 to 1848.',
				'4': 'Evaluate how U.S. society responded to economic changes from 1960 to 2000.'
			}
		};

		const questionText = leqQuestions[setId!]?.[questionId!] || 'A general LEQ question.';
		return basePrompt.replace('[This will be determined by the selected question]', questionText);
	};

	const handleSubmit = async () => {
		if (!answer.trim()) {
			setError('Please write an essay before submitting.');
			return;
		}

		// Check word count
		const currentWordCount = countWords(answer);
		if (currentWordCount < MIN_WORDS) {
			setError(`Your essay is too short. Minimum ${MIN_WORDS} words required (you have ${currentWordCount} words).`);
			return;
		}
		if (currentWordCount > MAX_WORDS) {
			setError(`Your essay is too long. Maximum ${MAX_WORDS} words allowed (you have ${currentWordCount} words).`);
			return;
		}
		
		// Check if user is authenticated
		if (!isAuthenticated) {
			setShowAuthModal(true);
			return;
		}
		
		setGrading(true);
		setError(null);
		setGrade(null);

		const prompt = getGradingPrompt();
		const apiUrl = import.meta.env.DEV
			? '/api/grade_essay'
			: 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade_essay';

		try {
			const headers: Record<string, string> = {
				'Content-Type': 'application/json',
				...getAuthHeaders(),
			};
			
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers,
				body: JSON.stringify({ prompt }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				if (response.status === 429) {
					throw new Error(errorData.error || 'Daily limit reached. You can submit 1 assignment for AI grading per day.');
				}
				if (response.status === 401) {
					// Token expired or invalid
					setShowAuthModal(true);
					return;
				}
				throw new Error(errorData.error || 'An unknown error occurred.');
			}

			const data = await response.json();
			setGrade(data.grade);
			// Clear saved answer after successful grading
			localStorage.removeItem(STORAGE_KEY);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setGrading(false);
		}
	};

	return (
		<div className='min-h-screen bg-slate-50 py-8 px-4'>
			<div className='max-w-7xl mx-auto'>
				<button
					onClick={handleBackClick}
					className='mb-4 px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold shadow-sm hover:bg-slate-100 transition'
				>
					&larr; Back to LEQ Selection
				</button>
				<div className='flex flex-col md:flex-row justify-center items-start gap-8'>
					{/* PDF Viewer */}
					<div className='flex-1 bg-white shadow-lg p-6 flex flex-col'>
						<h2 className='text-xl font-bold mb-4 text-center'>
							APUSH LEQ - Set {setId}, Question {questionId}
						</h2>
						{pdfUrl ? (
							<iframe
								src={pdfUrl}
								title={`APUSH LEQ PDF - Set ${setId}`}
								className='w-full flex-1 min-h-[800px] border rounded-lg'
							/>
						) : (
							<div className='text-center p-8'>PDF not available for this set yet.</div>
						)}
					</div>

					{/* LEQ Answer */}
					<div className='flex-1 max-w-2xl p-6 flex flex-col items-center'>
						<h2 className='text-xl font-bold mb-4 text-center'>
							Your LEQ Answer
						</h2>
						<textarea
							className='w-full min-h-[500px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition'
							value={answer}
							onChange={(e) => {
								setAnswer(e.target.value);
								// Save to localStorage immediately as user types
								localStorage.setItem(STORAGE_KEY, e.target.value);
							}}
							placeholder={`Type your essay for Question ${questionId} here...`}
							disabled={grading}
						/>
						<div className='w-full mt-2 text-sm text-slate-600'>
							Word count: {wordCount}
							<span className='ml-2 text-slate-500'>(Minimum: {MIN_WORDS} words | Maximum: {MAX_WORDS} words)</span>
						</div>
						<button
							className='mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition'
							onClick={handleSubmit}
							disabled={!answer.trim() || grading}
						>
							{grading ? 'Grading...' : 'SUBMIT FOR AI GRADE'}
						</button>
						{error && (
							<div className={`mt-6 font-semibold ${
								error.includes('Daily limit') ? 'text-orange-600 bg-orange-50 border border-orange-200 rounded-lg p-4' :
								error.includes('Authentication') || error.includes('login') ? 'text-blue-600 bg-blue-50 border border-blue-200 rounded-lg p-4' :
								'text-red-600'
							}`}>
								{(error.includes('Daily limit') || error.includes('Authentication') || error.includes('login')) && (
									<div className='flex items-center mb-2'>
										<span className={`mr-2 ${error.includes('Daily limit') ? 'text-orange-500' : 'text-blue-500'}`}>
											{error.includes('Daily limit') ? '⏰' : '🔒'}
										</span>
										<span className='font-bold'>
											{error.includes('Daily limit') ? 'Rate Limit Reached' : 'Authentication Required'}
										</span>
									</div>
								)}
								{error}
								{error.includes('Daily limit') && (
									<div className='mt-2 text-sm text-orange-700'>
										This helps keep the service available for everyone. Try again tomorrow!
									</div>
								)}
								{(error.includes('Authentication') || error.includes('login')) && (
									<div className='mt-2 text-sm text-blue-700'>
										<button 
											onClick={() => setShowAuthModal(true)}
											className='underline hover:no-underline'
										>
											Click here to log in or create a free account
										</button>
									</div>
								)}
							</div>
						)}
						{grade && (
							<div className='mt-8 w-full bg-green-50 border border-green-200 rounded-lg p-4'>
								<h3 className='text-lg font-bold mb-2 text-green-700'>
									AI Grading Results
								</h3>
								<p className='whitespace-pre-wrap'>{grade}</p>
							</div>
						)}
					</div>
				</div>
			</div>
			
			<AuthModal 
				isOpen={showAuthModal}
				onClose={() => setShowAuthModal(false)}
				onSuccess={() => {
					setShowAuthModal(false);
				}}
			/>
		</div>
	);
};

export default APUSHPracticeExamLEQ;
