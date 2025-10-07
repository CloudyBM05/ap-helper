# Quick Guide: Complete Remaining 3 AP Micro Short FRQ Pages

## Files to Update
1. `src/pages/APMicroShortFRQSet1Q3.tsx`
2. `src/pages/APMicroShortFRQSet2Q2.tsx`
3. `src/pages/APMicroShortFRQSet2Q3.tsx`

## Template to Use
Use `APMicroShortFRQSet1Q1.tsx` or `APMicroShortFRQSet1Q2.tsx` as your template.

## Steps for Each File (15-20 min per file)

### 1. Open the template file
Open `src/pages/APMicroShortFRQSet1Q1.tsx` (or Set1Q2)

### 2. Copy entire file content

### 3. Open target file
Open one of the 3 remaining files

### 4. Replace entire content with template

### 5. Update these specific values:

#### For Set1Q3:
- Change: `const STORAGE_KEY = 'apmicro-short-frq-set1q3';`
- Change component name: `const APMicroShortFRQSet1Q3 = () => {`
- Change export: `export default APMicroShortFRQSet1Q3;`
- Update PDF path: `const PDF = '/APMicro-Short1Set1.pdf';` (or correct path)
- Update title: `"Collegeboard 2025 Short FRQ Set 1 - Question 3"`
- Update back button: `navigate('/ap-microeconomics-practice-exam/short-frq/set1')`
- Update `PARTS` array if different number of parts
- Update `GRADING_PROMPT` with specific rubric for Q3

#### For Set2Q2:
- Change: `const STORAGE_KEY = 'apmicro-short-frq-set2q2';`
- Change component name: `const APMicroShortFRQSet2Q2 = () => {`
- Change export: `export default APMicroShortFRQSet2Q2;`
- Update PDF path: `const PDF = '/APMicro-Short1Set2.pdf';` (or correct path)
- Update title: `"Collegeboard 2025 Short FRQ Set 2 - Question 2"`
- Update back button: `navigate('/ap-microeconomics-practice-exam/short-frq/set2')`
- Update `PARTS` array if different number of parts
- Update `GRADING_PROMPT` with specific rubric for Q2

#### For Set2Q3:
- Change: `const STORAGE_KEY = 'apmicro-short-frq-set2q3';`
- Change component name: `const APMicroShortFRQSet2Q3 = () => {`
- Change export: `export default APMicroShortFRQSet2Q3;`
- Update PDF path: `const PDF = '/APMicro-Short1Set2.pdf';` (or correct path)
- Update title: `"Collegeboard 2025 Short FRQ Set 2 - Question 3"`
- Update back button: `navigate('/ap-microeconomics-practice-exam/short-frq/set2')`
- Update `PARTS` array if different number of parts
- Update `GRADING_PROMPT` with specific rubric for Q3

### 6. Check PARTS array
Make sure the PARTS array matches the number of parts in the question:
```tsx
// Example for 3 parts:
const PARTS = [
  { id: 'A', label: 'Part A' },
  { id: 'B', label: 'Part B' },
  { id: 'C', label: 'Part C' }
];

// Example for 5 parts (like Set1Q2):
const PARTS = [
  { id: 'A', label: 'Part A' },
  { id: 'B', label: 'Part B' },
  { id: 'Ci', label: 'Part C (i)' },
  { id: 'Cii', label: 'Part C (ii)' },
  { id: 'Ciii', label: 'Part C (iii)' }
];
```

### 7. Update GRADING_PROMPT
Add the specific grading rubric for that question. If you don't have one yet, use a generic one:

```tsx
const GRADING_PROMPT = `Grade the following AP Microeconomics Short FRQ (Set X, Question Y) using the standard AP rubric. Be strict and provide clear, concise explanations for each part.

Scoring Guidelines:
- Part A: 1 point for [description]
- Part B: 1 point for [description]
- Part C: 1 point for [description]

Respond ONLY with a JSON array of objects, one per part: [{'score': 0 or 1, 'explanation': '...'}, ...] No extra text or formatting.`;
```

### 8. Save and test
- Save the file
- Check for TypeScript errors
- Test in browser (npm run dev)
- Verify localStorage key is unique
- Verify all functionality works

## Quick Checklist Per File

- [ ] Copy template (Set1Q1 or Set1Q2)
- [ ] Update component name
- [ ] Update export statement
- [ ] Update STORAGE_KEY
- [ ] Update PDF path
- [ ] Update page title
- [ ] Update back button navigation
- [ ] Update PARTS array (if needed)
- [ ] Update GRADING_PROMPT
- [ ] Save file
- [ ] Test in browser
- [ ] Verify localStorage
- [ ] Verify authentication
- [ ] Verify grading works

## Common Mistakes to Avoid

❌ **Don't forget to:**
- Change the component name (causes export errors)
- Change the STORAGE_KEY (causes data conflicts)
- Update the export statement at bottom
- Match PARTS array to actual question parts

✅ **Do remember to:**
- Keep all imports unchanged
- Keep all state variables unchanged
- Keep all validation logic unchanged
- Keep all useEffect hooks unchanged
- Only change: names, keys, prompts, titles, navigation

## After Completing All 3 Pages

### Test Each Page:
1. Open in browser
2. Log in
3. Type answers
4. Check word/char counts
5. Submit for grading
6. Verify results display
7. Refresh page - verify localStorage

### Deploy:
```bash
git add src/pages/APMicroShortFRQSet1Q3.tsx
git add src/pages/APMicroShortFRQSet2Q2.tsx
git add src/pages/APMicroShortFRQSet2Q3.tsx
git commit -m "feat: Complete AP Micro Short FRQ pages (all 5 questions)"
git push origin master
```

## Need Help?

If you get stuck:
1. Compare with Set1Q1.tsx or Set1Q2.tsx
2. Check for typos in component name
3. Verify STORAGE_KEY is unique
4. Make sure PARTS array matches question
5. Ensure grading prompt is formatted correctly

That's it! 15-20 minutes per file, and you'll have all AP Micro FRQ pages complete! 🎉
