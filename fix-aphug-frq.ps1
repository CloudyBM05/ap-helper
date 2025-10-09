# PowerShell script to fix all AP Human Geography FRQ files

$files = @(
    "APHumanGeographyConceptApplicationSet1.tsx",
    "APHumanGeographyConceptApplicationSet2.tsx",
    "APHumanGeographySpatialRelationshipsSet1.tsx",
    "APHumanGeographySpatialRelationshipsSet2.tsx",
    "APHumanGeographyScaleAnalysisSet1.tsx",
    "APHumanGeographyScaleAnalysisSet2.tsx"
)

foreach ($file in $files) {
    $filePath = "src\pages\$file"
    Write-Host "Processing $file..." -ForegroundColor Cyan
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Add imports
        $content = $content -replace "import React, \{ useState \} from 'react';", "import React, { useState, useEffect } from 'react';`nimport { useAuth } from '../hooks/useAuth';`nimport AuthModal from '../components/AuthModal';"
        
        # Add useAuth and state variables
        $content = $content -replace "const navigate = useNavigate\(\);", "const navigate = useNavigate();`n  const { user, getAuthHeaders } = useAuth();"
        $content = $content -replace "\[error, setError\] = useState<string \| null>\(null\);", "[error, setError] = useState<string | null>(null);`n  const [showAuthModal, setShowAuthModal] = useState(false);`n  const [wordCounts, setWordCounts] = useState<{ [key: string]: number }>({});`n  const [charCounts, setCharCounts] = useState<{ [key: string]: number }>({});`n  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});"
        
        # Add localStorage key based on file name
        $storageKey = $file -replace "APHumanGeography", "aphug-" -replace "Set", "-set" -replace ".tsx", "" -replace "([A-Z])", "-`$1"
        $storageKey = $storageKey.ToLower() -replace "^-", ""
        $content = $content -replace "const APHumanGeography", "`n  const STORAGE_KEY = '$storageKey';`n`n  const APHumanGeography"
        
        # Add useEffects for localStorage and counts
        $useEffects = @"
`n
  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved answers:', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    }
  }, [answers]);

  // Update word and character counts
  useEffect(() => {
    const newWordCounts: { [key: string]: number } = {};
    const newCharCounts: { [key: string]: number } = {};
    PARTS.forEach(part => {
      const text = answers[part.id] || '';
      newWordCounts[part.id] = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      newCharCounts[part.id] = text.length;
    });
    setWordCounts(newWordCounts);
    setCharCounts(newCharCounts);
  }, [answers]);
"@
        $content = $content -replace "const handleChange", "$useEffects`n`n  const handleChange"
        
        # Update handleChange with validation
        $newHandleChange = @"
const handleChange = (part: string, value: string) => {
    const chars = value.length;
    let validationError = '';
    if (chars > 500) {
      validationError = 'Character limit exceeded (500 max)';
    }
    setValidationErrors(prev => ({ ...prev, [part]: validationError }));
    setAnswers((prev) => ({ ...prev, [part]: value }));
  };

  const validateAnswers = (): boolean => {
    const errors: { [key: string]: string } = {};
    let hasError = false;
    PARTS.forEach(part => {
      const text = answers[part.id] || '';
      const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      const chars = text.length;
      if (words < 10) {
        errors[part.id] = 'Too short (min 10 words)';
        hasError = true;
      } else if (words > 60) {
        errors[part.id] = 'Too long (max 60 words)';
        hasError = true;
      } else if (chars > 500) {
        errors[part.id] = 'Character limit exceeded (500 max)';
        hasError = true;
      }
    });
    setValidationErrors(errors);
    return !hasError;
  };
"@
        $content = $content -replace "const handleChange = \(part: string, value: string\) => \{[^}]+\};", $newHandleChange
        
        # Update handleSubmit with auth and validation
        $content = $content -replace "const handleSubmit = async \(\) => \{", @"
const handleSubmit = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (!validateAnswers()) {
      setError('Please fix validation errors before submitting.');
      return;
    }
"@
        
        # Fix API endpoint
        $content = $content -replace "/api/grade-aphug", "/api/grade-aphug-frq"
        
        # Add auth headers
        $content = $content -replace "const apiUrl = import.meta.env.DEV", @"
const authHeaders = getAuthHeaders();
      if (!Object.keys(authHeaders).length) {
        setError('Authentication failed. Please log in again.');
        setGrading(false);
        return;
      }
      const apiUrl = import.meta.env.DEV
"@
        $content = $content -replace "headers: \{ 'Content-Type': 'application/json' \},", "headers: {`n          'Content-Type': 'application/json',`n          ...authHeaders`n        },"
        
        # Add 429 handling
        $content = $content -replace "if \(\!response\.ok\) throw new Error", @"
if (response.status === 429) {
        const data = await response.json();
        setError(data.error || 'Daily limit reached. Try again tomorrow!');
        setGrading(false);
        return;
      }
      if (!response.ok) throw new Error
"@
        
        # Add AuthModal to return
        $content = $content -replace "return \(", "return (`n    <>`n      <AuthModal `n        isOpen={showAuthModal} `n        onClose={() => setShowAuthModal(false)}`n        onSuccess={() => setShowAuthModal(false)}`n      />"
        $content = $content -replace "</div>\s+</div>\s+</div>\s+\);", "</div>`n        </div>`n      </div>`n    </>`n  );"
        
        # Add auth warning box before submit button
        $authBox = @"
{!user && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 w-full">
                  🔒 <strong>Authentication required</strong> to use AI grading. Please{' '}
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="underline font-semibold hover:text-yellow-900"
                  >
                    log in
                  </button>{' '}
                  to continue.
                </div>
              )}
"@
        $content = $content -replace '<button\s+className="mb-4', "$authBox`n              <button`n                className=`"mb-4"
        
        # Update submit button to include disabled state
        $content = $content -replace 'disabled={grading}', 'disabled={grading || !user}'
        
        # Add word/char counts and validation to textareas
        $textareaBlock = @"
<textarea
                      className={``w-full min-h-[120px] border rounded-lg p-3 focus:outline-none focus:ring-2 transition ``${
                        validationErrors[part.id]
                          ? 'border-red-500 focus:ring-red-400 bg-red-50'
                          : 'border-slate-300 focus:ring-emerald-400'
                      }``}
                      value={answers[part.id] || ''}
                      onChange={e => handleChange(part.id, e.target.value)}
                      placeholder={``Type your answer for ``${part.label} here...``}
                      disabled={grading}
                    />
                    <div className="mt-2 flex justify-between text-sm">
                      <span className={wordCounts[part.id] >= 10 && wordCounts[part.id] <= 60 ? 'text-green-600' : 'text-red-600'}>
                        {wordCounts[part.id] || 0} words (10-60 required)
                      </span>
                      <span className={charCounts[part.id] > 500 ? 'text-red-600' : 'text-slate-600'}>
                        {charCounts[part.id] || 0}/500 chars
                      </span>
                    </div>
                    {validationErrors[part.id] && (
                      <div className="mt-2 text-sm text-red-600 font-semibold">
                        ⚠️ {validationErrors[part.id]}
                      </div>
                    )}
"@
        $content = $content -replace '<textarea\s+className="w-full[^>]+>[^<]*</textarea>', $textareaBlock
        
        # Update grading results to show proper format
        $content = $content -replace '{grades.map\(\(g, i\) => \([\s\S]+?\<li key=\{i\}[^>]+>\s+\{g\}', @"
{grades.map((g, i) => (
                    <li key={i} className="text-green-900">
                      <strong>{PARTS[i]?.label}:</strong> Score: {typeof g === 'object' ? (g.score || 'N/A') : 'N/A'} - {typeof g === 'object' ? (g.explanation || JSON.stringify(g)) : g}
"@
        
        Set-Content -Path $filePath -Value $content
        Write-Host "✓ Fixed $file" -ForegroundColor Green
    } else {
        Write-Host "✗ File not found: $filePath" -ForegroundColor Red
    }
}

Write-Host "`nAll AP Human Geography FRQ files have been updated!" -ForegroundColor Green
