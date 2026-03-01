const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/APStatisticsShortFRQ1.tsx',
  'src/pages/APStatisticsShortFRQ2.tsx',
  'src/pages/APStatisticsShortFRQ3.tsx',
  'src/pages/APStatisticsShortFRQ4.tsx',
  'src/pages/APStatisticsShortFRQ5.tsx',
];

const MIN_WORDS = 15;
const MAX_WORDS = 80;
const MAX_CHARS = 600;

files.forEach((filePath) => {
  console.log(`\nProcessing: ${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // 1. Add imports at the top
  if (!content.includes("import { useAuth }")) {
    content = content.replace(
      /import React, { useState } from 'react';/,
      `import React, { useState, useEffect } from 'react';\nimport { useAuth } from '../hooks/useAuth';\nimport AuthModal from '../components/AuthModal';`
    );
  }
  
  // 2. Find the component name
  const componentMatch = content.match(/const\s+(\w+):\s*React\.FC\s*=/);
  if (!componentMatch) {
    console.error(`Could not find component name in ${filePath}`);
    return;
  }
  const componentName = componentMatch[1];
  
  // 3. Add state variables after existing useState declarations
  const afterFirstUseState = content.indexOf('useState', content.indexOf('const'));
  const lineEnd = content.indexOf(';', afterFirstUseState);
  
  if (!content.includes('const { user, getAuthHeaders } = useAuth()')) {
    const insertPos = content.indexOf('\n', lineEnd) + 1;
    const authState = `  const { user, getAuthHeaders } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [wordCounts, setWordCounts] = useState<{ [key: string]: number }>({});
  const [charCounts, setCharCounts] = useState<{ [key: string]: number }>({});
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
`;
    content = content.slice(0, insertPos) + authState + content.slice(insertPos);
  }
  
  // 4. Add localStorage effect after state declarations
  if (!content.includes('// Load saved answers from localStorage')) {
    const effectInsertPos = content.indexOf('const handleChange');
    const effectCode = `
  // Load saved answers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('apstat-frq-answers-${componentName.toLowerCase()}');
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved answers', e);
      }
    }
  }, []);

  // Save answers to localStorage
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('apstat-frq-answers-${componentName.toLowerCase()}', JSON.stringify(answers));
    }
  }, [answers]);

  // Validation helper
  const validateAnswer = (text: string): { wordCount: number; charCount: number; error: string | null } => {
    const wordCount = text.trim().split(/\\s+/).filter(w => w.length > 0).length;
    const charCount = text.length;
    
    let error = null;
    if (text.trim().length === 0) {
      error = null; // No error for empty
    } else if (wordCount < ${MIN_WORDS}) {
      error = \`Too short (${MIN_WORDS}-${MAX_WORDS} words required)\`;
    } else if (wordCount > ${MAX_WORDS}) {
      error = \`Too long (${MIN_WORDS}-${MAX_WORDS} words required)\`;
    } else if (charCount > ${MAX_CHARS}) {
      error = \`Too long (max ${MAX_CHARS} characters)\`;
    }
    
    return { wordCount, charCount, error };
  };

`;
    content = content.slice(0, effectInsertPos) + effectCode + content.slice(effectInsertPos);
  }
  
  // 5. Replace handleChange function
  const handleChangeRegex = /const handleChange = \(part: string, value: string\) => \{[\s\S]*?\n  \};/;
  const newHandleChange = `const handleChange = (part: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [part]: value }));
    
    const { wordCount, charCount, error } = validateAnswer(value);
    setWordCounts(prev => ({ ...prev, [part]: wordCount }));
    setCharCounts(prev => ({ ...prev, [part]: charCount }));
    setValidationErrors(prev => ({ ...prev, [part]: error || '' }));
  };`;
  
  content = content.replace(handleChangeRegex, newHandleChange);
  
  // 6. Replace handleSubmit function
  const handleSubmitStart = content.indexOf('const handleSubmit = async () => {');
  const handleSubmitEnd = content.indexOf('\n  };', handleSubmitStart) + 5;
  
  const newHandleSubmit = `const handleSubmit = async () => {
    // Check authentication
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Validate all answers
    const hasErrors = PARTS.some(part => {
      const answer = answers[part.id] || '';
      const { error } = validateAnswer(answer);
      return error !== null || answer.trim().length === 0;
    });

    if (hasErrors) {
      setError('Please fill in all parts with valid answers (${MIN_WORDS}-${MAX_WORDS} words, max ${MAX_CHARS} chars each).');
      return;
    }

    setGrading(true);
    setError(null);
    setGrades(null);
    
    try {
      const answersArray = PARTS.map((part) => answers[part.id] || '');
      const apiUrl = import.meta.env.DEV
        ? '/api/grade-apstat-frq'
        : 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-apstat-frq';
      
      const authHeaders = await getAuthHeaders();
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders,
        },
        body: JSON.stringify({
          answers: answersArray,
          prompt_intro: aiPrompt,
        })
      });
      
      if (response.status === 401) {
        setError('Authentication required. Please log in to use AI grading.');
        setShowAuthModal(true);
        setGrading(false);
        return;
      }
      
      if (response.status === 429) {
        const data = await response.json();
        setError(data.error || 'Daily limit reached. You can only grade one FRQ per day across all AP courses.');
        setGrading(false);
        return;
      }
      
      if (!response.ok) {
        throw new Error('Failed to contact AI grading service.');
      }
      
      const data = await response.json();
      let parsed = [];
      try {
        parsed = data.result;
      } catch {
        setError('Failed to parse AI grading results.');
        setGrading(false);
        return;
      }
      
      setGrades(
        parsed.map((g: any, i: number) =>
          \`\${PARTS[i].label}: \${g.score}/1 - \${g.explanation}\`
        )
      );
      
      // Clear saved answers after successful grading
      localStorage.removeItem('apstat-frq-answers-${componentName.toLowerCase()}');
    } catch (err: any) {
      setError(err.message || 'Failed to contact AI grading service.');
    }
    setGrading(false);
  };`;
  
  content = content.slice(0, handleSubmitStart) + newHandleSubmit + content.slice(handleSubmitEnd);
  
  // 7. Update textarea section with validation feedback
  const textareaSection = /(<div key={part\.id} className="w-full">[\s\S]*?<\/textarea>\s*<\/div>)/;
  const newTextareaSection = `<div key={part.id} className="w-full">
                  <label className="block font-semibold mb-2 text-slate-700">
                    {part.label}
                    <span className="text-xs font-normal text-slate-500 ml-2">
                      ({wordCounts[part.id] || 0} words, {charCounts[part.id] || 0} chars)
                    </span>
                  </label>
                  <textarea
                    className={\`w-full min-h-[120px] border rounded-lg p-3 focus:outline-none focus:ring-2 transition \${
                      validationErrors[part.id]
                        ? 'border-red-500 focus:ring-red-400'
                        : (answers[part.id] && !validationErrors[part.id])
                        ? 'border-green-500 focus:ring-green-400'
                        : 'border-slate-300 focus:ring-purple-400'
                    }\`}
                    value={answers[part.id] || ''}
                    onChange={e => handleChange(part.id, e.target.value)}
                    placeholder={\`Type your answer for \${part.label} here...\`}
                    disabled={grading}
                  />
                  {validationErrors[part.id] && (
                    <p className="text-xs text-red-600 mt-1">{validationErrors[part.id]}</p>
                  )}
                  {!validationErrors[part.id] && answers[part.id] && (
                    <p className="text-xs text-green-600 mt-1">✓ Valid ({MIN_WORDS}-${MAX_WORDS} words, max ${MAX_CHARS} chars)</p>
                  )}
                </div>`;
  
  content = content.replace(textareaSection, newTextareaSection);
  
  // 8. Add AuthModal before closing </div>
  if (!content.includes('<AuthModal')) {
    const beforeClosingDiv = content.lastIndexOf('</div>\n  );\n};');
    const authModalCode = `
        {/* Auth Modal */}
        {showAuthModal && (
          <AuthModal onClose={() => setShowAuthModal(false)} />
        )}
`;
    content = content.slice(0, beforeClosingDiv) + authModalCode + content.slice(beforeClosingDiv);
  }
  
  // 9. Add Clear Answers button
  if (!content.includes('Clear Answers')) {
    const submitButtonRegex = /(<button[\s\S]*?{grading \? 'Grading\.\.\.' : 'SUBMIT'}[\s\S]*?<\/button>)/;
    const match = content.match(submitButtonRegex);
    if (match) {
      const replacement = match[0] + `
            <button
              className="mb-4 px-6 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold shadow hover:bg-slate-300 transition"
              onClick={() => {
                setAnswers({});
                setWordCounts({});
                setCharCounts({});
                setValidationErrors({});
                setGrades(null);
                setError(null);
                localStorage.removeItem('apstat-frq-answers-${componentName.toLowerCase()}');
              }}
              disabled={grading}
            >
              Clear Answers
            </button>`;
      content = content.replace(submitButtonRegex, replacement);
    }
  }
  
  // Write the updated content
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ Updated: ${filePath}`);
});

console.log('\n✅ All AP Statistics FRQ files updated successfully!');
