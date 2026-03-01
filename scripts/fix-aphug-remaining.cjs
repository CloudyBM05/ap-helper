const fs = require('fs');
const path = require('path');

const files = [
  'APHumanGeographySpatialRelationshipsSet2.tsx',
  'APHumanGeographyScaleAnalysisSet1.tsx',
  'APHumanGeographyScaleAnalysisSet2.tsx'
];

const storageKeys = {
  'APHumanGeographySpatialRelationshipsSet2.tsx': 'aphug-spatial-relationships-set2',
  'APHumanGeographyScaleAnalysisSet1.tsx': 'aphug-scale-analysis-set1',
  'APHumanGeographyScaleAnalysisSet2.tsx': 'aphug-scale-analysis-set2'
};

files.forEach(file => {
  const filePath = path.join(__dirname, 'src', 'pages', file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Update textarea section with validation UI
  const textareaPattern = /(<div className="w-full space-y-6">\s*\{PARTS\.map\(\(part\) => \([\s\S]*?<\/div>\s*\)\)\}\s*<\/div>)/;
  const newTextareaSection = `<div className="w-full space-y-6">
                {PARTS.map((part) => {
                  const wordCount = wordCounts[part.id] || 0;
                  const charCount = charCounts[part.id] || 0;
                  const validationError = validationErrors[part.id];
                  const isValid = wordCount >= 10 && wordCount <= 60 && charCount <= 500;
                  const borderColor = !answers[part.id] 
                    ? 'border-slate-300' 
                    : validationError 
                      ? 'border-red-400'
                      : isValid 
                        ? 'border-green-400'
                        : 'border-yellow-400';
                  
                  return (
                    <div key={part.id} className="w-full">
                      <label className="block font-semibold mb-2 text-slate-700">{part.label}</label>
                      <textarea
                        className={\`w-full min-h-[120px] border \${borderColor} rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition\`}
                        value={answers[part.id] || ''}
                        onChange={(e) => handleChange(part.id, e.target.value)}
                        placeholder={\`Type your answer for \${part.label} here...\`}
                        disabled={grading}
                      />
                      <div className="mt-1 text-sm flex justify-between items-center">
                        <span className={wordCount < 10 ? 'text-red-500' : wordCount > 60 ? 'text-orange-500' : 'text-green-600'}>
                          Words: {wordCount}/60 (min: 10)
                        </span>
                        <span className={charCount > 500 ? 'text-red-500' : 'text-slate-500'}>
                          Characters: {charCount}/500
                        </span>
                      </div>
                      {validationError && (
                        <div className="mt-1 text-sm text-red-600 font-semibold">{validationError}</div>
                      )}
                    </div>
                  );
                })}
              </div>`;

  if (textareaPattern.test(content)) {
    content = content.replace(textareaPattern, newTextareaSection);
  }

  // Fix AuthModal props
  content = content.replace(
    /<AuthModal\s+onClose=\{[^}]+\}\s+onSuccess=\{[^}]+\}\s*\/>/,
    `<AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />`
  );

  fs.writeFileSync(filePath, content);
  console.log(`✓ Updated ${file}`);
});

console.log('\nAll remaining AP Human Geography FRQ files updated!');
