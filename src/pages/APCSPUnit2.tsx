import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const unit2Content = [
	{
		key: '2.1',
		title: '2.1 — Binary Numbers',
		bullets: [
			{
				subtopic: 'Numerical Representation in Computing',
				points: [
					'All digital data is represented numerically using binary numbers.',
					'A bit is the smallest unit of information a computer stores or manipulates — it can only be 0 or 1.',
					'Bits are grouped to form bytes (8 bits) and larger units, enabling representation of complex data (text, images, audio, etc.).',
				],
			},
			{
				subtopic: 'Binary to Decimal Conversion',
				points: [
					'Each binary digit represents a power of 2, starting with 2⁰ on the right.',
					'Example: 1101₂ = 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13₁₀',
				],
			},
			{
				subtopic: 'Decimal to Binary Conversion',
				points: [
					'Find the largest power of 2 less than or equal to the decimal number.',
					'Subtract and repeat until the number is 0.',
					'Example: 200₁₀ → 11001000₂',
				],
			},
			{
				subtopic: 'Digital Images as Bits',
				points: [
					'Images = collection of pixels, each pixel represented in binary.',
					'In black-and-white images, 1 = black, 0 = white.',
					'Metadata stores information like image dimensions (e.g., 10×10 pixels).',
					'Grid patterns of 0s and 1s map to pixel colors on a screen.',
				],
			},
			{
				subtopic: 'Binary and Color Representation',
				points: [
					'Color is represented with RGB (Red, Green, Blue) values.',
					'Each color channel ranges from 0 to 255 in decimal, or 00000000₂ to 11111111₂ in binary.',
					'Combining different intensity levels of RGB creates millions of colors.',
				],
			},
			{
				subtopic: 'Music as Bits',
				points: [
					'Analog signal: continuous in time and value.',
					'Digital signal: discrete in time and values, often represented as bits.',
					'Sampling: capturing an analog signal at regular intervals to store it digitally.',
					'Digital formats are resilient to noise compared to analog formats.',
				],
			},
		],
	},
	{
		key: '2.2',
		title: '2.2 — Data Compression',
		bullets: [
			{
				subtopic: 'Purpose',
				points: [
					'Reduces file size to save storage space or bandwidth.',
					'Common in formats like MP3, MP4, JPG, PNG, ZIP, RAR.',
					'Compression is reversible (lossless) or irreversible (lossy).',
				],
			},
			{
				subtopic: 'Lossless Compression',
				points: [
					'Allows exact reconstruction of original data.',
					'Common for text files, where any change could alter meaning.',
					'Used in ZIP archives, PNG images, and some audio formats.',
					'Ensures data integrity — decompressed output matches the original.',
				],
			},
			{
				subtopic: 'Lossy Compression',
				points: [
					'Removes some data permanently for greater size reduction.',
					'Used in images, audio, and video where some loss is acceptable.',
					'Removes redundant or less noticeable details (e.g., high frequencies in audio, slight pixel changes in images).',
				],
			},
			{
				subtopic: 'Examples of Lossy Compression',
				points: [
					'Images: JPEG compression may cause pixelation when enlarged.',
					'Audio: MP3 removes inaudible sounds.',
					'Video: some frames and details are removed without significant visible quality loss.',
				],
			},
		],
	},
	{
		key: '2.3',
		title: '2.3 — Extracting Information from Data',
		bullets: [
			{
				subtopic: 'Data Explosion',
				points: [
					'Growth in digitized information from transactions, online activity, IoT devices, etc.',
					'Large data sets allow detection of patterns and relationships between seemingly unrelated sources.',
				],
			},
			{
				subtopic: 'Analyze Data Sources',
				points: [
					'Sources include websites, emails, chat logs, videos, audio files, documents, customer messages.',
				],
			},
			{
				subtopic: 'Define Objectives',
				points: [
					'Know whether you need trends, causes, quantities, or other insights.',
				],
			},
			{
				subtopic: 'Choose Tools and Storage',
				points: [
					'Select software to read and visualize data; store in databases for processing.',
				],
			},
			{
				subtopic: 'Clean the Data',
				points: [
					'Remove whitespace, symbols, duplicates, and irrelevant entries.',
				],
			},
			{
				subtopic: 'Analyze Data Patterns',
				points: [
					'Use charts, graphs, and visual analytics to interpret results.',
				],
			},
		],
	},
	{
		key: '2.4',
		title: '2.4 — Using Programs with Data',
		bullets: [
			{
				subtopic: 'Data Analysis Workflow',
				points: [
					'Step 1: Gather data (from extraction or input sources).',
					'Step 2: Transform/filter data to prepare for analysis.',
					'Step 3: Use visualization tools to identify trends and patterns.',
				],
			},
			{
				subtopic: 'Visualization Tools',
				points: [
					'Present findings in a way that\'s easy to interpret and compare.',
				],
			},
			{
				subtopic: 'Graph Types',
				points: [
					'Picture graphs: use images to represent values.',
					'Bar graphs: vertical or horizontal bars to compare quantities.',
					'Line graphs: show trends over time with connecting lines.',
					'Scatter plots: plot points to find correlations; often include a best-fit line.',
				],
			},
		],
	},
];

const APCSPUnit2 = () => {
	const [activeTab, setActiveTab] = useState('topics');
	const [openTopic, setOpenTopic] = useState<string | null>(null);
	const navigate = useNavigate();

	const toggleTopic = (key: string) => {
		setOpenTopic(openTopic === key ? null : key);
	};

	return (
		<div className="min-h-screen bg-violet-50 text-slate-800">
			<div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
				<button
					onClick={() => navigate('/ap-computer-science-principles-study-guide')}
					className="mb-6 px-4 py-2 rounded-lg bg-white text-violet-600 font-semibold hover:bg-violet-100 transition-colors shadow-sm flex items-center gap-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
					Back to Big Ideas
				</button>
				{/* Tabs */}
				<div className="flex justify-center border-b-2 border-violet-200 mb-8">
					<button
						onClick={() => setActiveTab('topics')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'topics'
								? 'border-b-4 border-violet-600 text-violet-700'
								: 'text-slate-500 hover:text-violet-600'
						}`}
					>
						Key Topics
					</button>
					<button
						onClick={() => navigate('/ap-csp-big-idea/2/quiz')}
						className={`px-6 py-3 font-semibold text-lg transition-colors ${
							activeTab === 'quiz'
								? 'border-b-4 border-orange-500 text-orange-700'
								: 'text-slate-500 hover:text-orange-600'
						}`}
					>
						Take Quiz
					</button>
				</div>
				{/* Content */}
				{activeTab === 'topics' && (
					<>
						<div className="text-center mb-8">
							<h1 className="text-4xl font-bold text-violet-700">
								📊 AP CSP Big Idea 2: Data
							</h1>
							<p className="text-lg text-slate-600 mt-2">
								Binary representation, data compression, information extraction, and data analysis using programming tools.
							</p>
						</div>
						<div className="bg-white p-6 rounded-2xl shadow-lg">
							<div className="space-y-4">
								{unit2Content.map((topic) => (
									<div
										key={topic.key}
										className="border-b border-violet-200 last:border-b-0 pb-4"
									>
										<button
											onClick={() => toggleTopic(topic.key)}
											className="w-full text-left flex justify-between items-center p-4 rounded-lg hover:bg-violet-50 transition-colors"
										>
											<h3 className="text-xl font-semibold text-violet-700">
												{topic.title}
											</h3>
											<span className="text-2xl text-violet-400">
												{openTopic === topic.key ? '-' : '+'}
											</span>
										</button>
										{openTopic === topic.key && (
											<div className="p-4 bg-violet-50 rounded-b-lg">
												<div className="space-y-4">
													{topic.bullets.map((section, idx) => (
														<div key={idx}>
															<div className="font-semibold text-violet-800 mb-1">
																{section.subtopic}
															</div>
															<ul className="list-disc ml-6 text-slate-700 space-y-1">
																{section.points.map((point, i) => (
																	<li key={i}>{point}</li>
																))}
															</ul>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default APCSPUnit2;
