import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const APUSHPracticeExamDBQ: React.FC = () => {
	const { setId } = useParams<{ setId: string }>();
	const navigate = useNavigate();
	const { isAuthenticated, getAuthHeaders } = useAuth();
	const [answer, setAnswer] = useState('');
	const [grading, setGrading] = useState(false);
	const [grade, setGrade] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const getPdfUrl = () => {
		if (setId === '1') {
			return `${import.meta.env.BASE_URL}APUSH-DBQ1.pdf`;
		} else if (setId === '2') {
			return `${import.meta.env.BASE_URL}APUSH-DBQ2.pdf`;
		}
		return '';
	};

	const pdfUrl = getPdfUrl();

	const handleBackClick = () => {
		navigate('/apush-practice-exam/dbq/select');
	};

	const getGradingPrompt = () => {
		if (setId === '1') {
			return `Grade the APUSH DBQ based off rubric below, BE VERY STRICT:

Thesis/Claim (0–1 pt) – Clear, defensible thesis that establishes a line of reasoning.

Contextualization (0–1 pt) – Broader relevant historical context clearly described.

Evidence (0–2 pts) –

1 pt: Specific historical evidence relevant to the prompt.

2 pts: Evidence supports an argument in response to the prompt.

Analysis & Reasoning (0–2 pts) –

1 pt: Uses reasoning like causation, continuity/change, or comparison.

2 pts: Demonstrates complex understanding of historical developments.

Document Use (required for Evidence/Reasoning pts) –

Uses at least 4 of the 7 documents effectively.

Explains POV, purpose, situation, or audience for at least 2 documents.

Uses at least 1 piece of outside evidence not from the 7 documents.

Prompt:

Evaluate the extent to which the role of the federal government in the U.S. economy changed from 1932 to 1980.

Document Summaries:

Doc 1 (1937): Black women workers protest racial and gender discrimination in WPA jobs under the New Deal.

Doc 2 (1943): War Food Administration describes migrant farm labor shortages during WWII and the U.S. plan to import foreign labor (e.g., Bracero Program).

Doc 3 (1957): Image of federal officials viewing a display of the Interstate Highway System (Federal-Aid Highway Act of 1956).

Doc 4 (1962): JFK State of the Union supports federal health insurance for the elderly, arguing wealth should serve people’s welfare.

Doc 5 (1964): Barry Goldwater’s GOP convention speech opposes centralized federal power and favors limited government and individual freedom.

Doc 6 (1969): César Chávez testifies to Congress urging support for unionization and labor rights of migrant farmworkers.

Doc 7 (1976): Rep. Marjorie Holt critiques “reckless” federal spending, central planning, and government overreach as tyranny.

Now evaluate the following student DBQ essay based on that context. Give:

Category-by-category score (e.g., 1/1, 1/1, 2/2, 1/2)

Short justification for each score

Student Essay:
"""
${answer}
"""
`;
		} else if (setId === '2') {
			return `Grade the APUSH DBQ based off rubric below, BE VERY STRICT:
Thesis/Claim (0–1 pt) – Clear, historically defensible thesis with a line of reasoning.

Contextualization (0–1 pt) – Describes broader historical context relevant to the prompt.

Evidence (0–2 pts)

1 pt: Provides specific relevant historical evidence.

2 pts: Uses that evidence to support an argument.

Analysis & Reasoning (0–2 pts)

1 pt: Uses historical reasoning (causation, comparison, continuity/change).

2 pts: Demonstrates complex understanding (multiple variables, perspectives, etc.).

Document Use Requirements (tied to evidence & reasoning):

Uses at least 4 of the 7 documents to support arguments.

Explains POV, purpose, audience, or situation for at least 2 documents.

Uses at least 1 piece of outside evidence not found in the 7 documents.

Prompt:

Evaluate the extent to which economic changes influenced United States society between 1865 and 1910.

Document Summaries:

Doc 1 (1869) – Minister Francis Vinton praises the Transcontinental Railroad as a triumph of free trade, national unity, and peace.

Doc 2 (1879) – Henry George criticizes industrial capitalism for increasing poverty amid progress, arguing wealth accumulates unfairly.

Doc 3 (1886) – Labor activist Lucy Parsons warns monopolies are destroying the middle class, fueling class conflict and poverty despite prosperity.

Doc 4 (1894) – Ex-president Benjamin Harrison defends manufacturers and criticizes class envy, calling for unity and protection of U.S. industry.

Doc 5 (1897) – Female labor reformer M.E.J. Kelley promotes the union label as ethical consumption—opposing sweatshops, supporting living wages.

Doc 6 (1900) – New York Times editorial glorifies industrial leaders ("Captains of Industry") as key to national strength and global influence.

Doc 7 (1903) – Political cartoon titled “The Trust Buster” shows Roosevelt taming a multi-armed corporate octopus labeled "Trusts."

Now evaluate the following student DBQ essay using this context. For each category, give:

Score (e.g., 1/1, 1/1, 2/2, 1/2)

Brief rationale for the score

Student Essay:
"""
${answer}
"""
`;
		}

		// Fallback for other sets
		const dbqPrompts: { [key: string]: string } = {
			'2': 'Evaluate the extent to which westward expansion shaped American society from 1820 to 1860.',
		};

		const question = dbqPrompts[setId!] || 'A general DBQ question.';

		return `You are an expert APUSH grader. Grade the following Document-Based Question (DBQ) response on a scale of 0-7 based on the official APUSH DBQ rubric. Be very strict.

DBQ Question: ${question}

Student's Essay:
"""
${answer}
"""

Please provide a detailed breakdown for each of the 7 possible points:
1.  **Thesis/Claim (0-1 pt):** Responds with a historically defensible thesis that establishes a line of reasoning.
2.  **Contextualization (0-1 pt):** Describes a broader historical context relevant to the prompt.
3.  **Evidence from Documents (0-2 pts):**
    - **1 pt:** USES the content of at least THREE documents to address the prompt.
    - **2 pts:** SUPPORTS an argument using at least SIX documents.
4.  **Evidence Beyond the Documents (0-1 pt):** USES at least one additional piece of specific historical evidence (not in the documents) relevant to the argument.
5.  **Analysis and Reasoning - Sourcing (0-1 pt):** For at least THREE documents, EXPLAINS how or why the document’s point of view, purpose, historical situation, and/or audience is relevant to an argument.
6.  **Analysis and Reasoning - Complexity (0-1 pt):** Demonstrates a complex understanding of the historical development (e.g., nuance, corroboration, qualification).

For each point, state whether the student earned the point and provide a concise justification with direct quotes where applicable. Finally, provide a total score (e.g., "Total Score: 5/7") and a summary of strengths and weaknesses.`;
	};

	const handleSubmit = async () => {
		if (!answer.trim()) {
			setError('Please write an essay before submitting.');
			return;
		}

		// Check if user is authenticated
		if (!isAuthenticated) {
			setError('Please log in to use AI grading. Click the "Login" button in the navigation bar.');
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
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					...getAuthHeaders(),
				},
				body: JSON.stringify({ prompt }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'An unknown error occurred.');
			}

			const data = await response.json();
			setGrade(data.grade);
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
					&larr; Back to DBQ Selection
				</button>
				<div className='flex flex-col md:flex-row justify-center items-start gap-8'>
					<div className='flex-1 bg-white shadow-lg p-6 flex flex-col'>
						<h2 className='text-xl font-bold mb-4 text-center'>
							APUSH DBQ - Set {setId}
						</h2>
						{pdfUrl ? (
							<iframe
								src={pdfUrl}
								title={`APUSH DBQ PDF - Set ${setId}`}
								className='w-full flex-1 min-h-[800px] border rounded-lg'
							/>
						) : (
							<div className='text-center p-8'>PDF not available for this set yet.</div>
						)}
					</div>
					<div className='flex-1 max-w-2xl p-6 flex flex-col items-center'>
						<h2 className='text-xl font-bold mb-4 text-center'>
							Your DBQ Answer
						</h2>
						<textarea
							className='w-full min-h-[500px] border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition'
							value={answer}
							onChange={(e) => setAnswer(e.target.value)}
							placeholder='Type your DBQ essay here...'
							disabled={grading}
						/>
						<button
							className='mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition'
							onClick={handleSubmit}
							disabled={!answer.trim() || grading}
						>
							{grading ? 'Grading...' : 'SUBMIT FOR AI GRADE'}
						</button>
						{error && (
							<div className='mt-6 text-red-600 font-semibold'>{error}</div>
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
		</div>
	);
};

export default APUSHPracticeExamDBQ;
