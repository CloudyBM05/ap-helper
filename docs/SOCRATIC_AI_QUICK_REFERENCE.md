# Socratic AI Quick Reference Card

## 🚀 Quick Add New Course Checklist

### 1. Course Selection Page (`SocraticLearning.tsx`)
```typescript
// Add to courses array around line 6
{
  id: 'newcourse',
  title: 'AP New Course',
  description: 'Course description',
  category: 'social', // stem, english, social, languages, arts
  color: 'from-purple-500 to-pink-500',
  units: [
    { id: 1, emoji: '📚', title: 'Unit 1 Title', period: 'Time Period' },
    // ... add all units
  ]
}
```

### 2. Chat Topics (`SocraticChat.tsx` line ~200-300)
```typescript
// Add to getUnitTopics() function
if (course === 'newcourse') {
  if (unit === 'unit1') {
    return [
      {
        key: 'topic1', 
        title: 'Topic Title',
        keyFacts: ['Fact 1', 'Fact 2', 'Fact 3', 'Fact 4', 'Fact 5']
      },
      // Add 4-5 topics per unit
    ];
  }
  // Repeat for all units
}
```

### 3. Unit Info (`SocraticChat.tsx` line ~60-100)
```typescript
// Add to getUnitInfo() function
if (course === 'newcourse') {
  const unitData = {
    'unit1': { title: 'New Course Unit 1: Title', period: 'Period', emoji: '📚' },
    // ... all units
  };
  return unitData[unit as keyof typeof unitData] || { title: `New Course ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
}
```

### 4. Study Guide Button (`SocraticChat.tsx` line ~1140)
```typescript
// Add to button onClick handler
} else if (course === 'newcourse') {
  navigate(`/new-course-study-guide/unit/${unit?.replace('unit', '')}`);
```

### 5. Routes (`App.tsx`)
```typescript
// Add imports
import NewCourseStudyGuide from './pages/NewCourseStudyGuide';
import NewCourseUnit1 from './pages/NewCourseUnit1';
// ... all units

// Add routes in Routes section
<Route path="/new-course-study-guide" element={<NewCourseStudyGuide />} />
<Route path="/new-course/unit/1" element={<NewCourseUnit1 />} />
<Route path="/new-course/unit/1/quiz" element={<NewCourseUnit1Quiz />} />
// ... all units
```

## 📁 Key Files & Line Numbers

| File | Purpose | Key Lines |
|------|---------|-----------|
| `SocraticChat.tsx` | Main chat logic | 60-100 (unit info), 200-300 (topics), 1130-1155 (button) |
| `SocraticLearning.tsx` | Course selection | 6-50 (courses array) |
| `App.tsx` | Routing | 320-650 (routes section) |

## 🎯 Current Course Patterns

| Course | Chat Route | Study Guide Route | Button Text |
|--------|------------|-------------------|-------------|
| APUSH | `/socratic-chat/apush/unit1` | `/apush-study-guide/unit/1/quiz` | "Take UNIT1 Quiz →" |
| AP Gov | `/socratic-chat/apgov/unit1` | `/ap-gov-unit/1` | "Take UNIT1 Study Guide →" |
| AP World | `/socratic-chat/apworld/unit1` | `/ap-world-study-guide/unit/1` | "Take UNIT1 Study Guide →" |

## ⚡ Deploy Commands

```powershell
# Frontend (GitHub Pages)
npm run build && npm run deploy

# Backend (Heroku)
git add . && git commit -m "Update" && git push origin main && git push heroku main
```

## 🧪 Testing Checklist
- [ ] Course shows in `/socratic-learning`
- [ ] Chat loads at `/socratic-chat/[course]/unit1`
- [ ] Sidebar shows specific topics (not "Socratic AI Ready")
- [ ] Button navigates to correct study guide page
- [ ] All units implemented (check units 1-9)

## 🔥 Hot Tips
- **Topics per unit**: 4-5 recommended
- **Key facts per topic**: Exactly 5
- **Emoji usage**: One per unit for visual appeal
- **Course ID**: Use lowercase, no spaces (e.g., 'apbiology')
- **Unit format**: Always 'unit1', 'unit2', etc.

## 🚨 Common Pitfalls
1. **Missing fallback in getUnitTopics()** → Sidebar shows generic message
2. **Typo in course ID** → Navigation breaks
3. **Missing route in App.tsx** → 404 errors
4. **Inconsistent unit numbering** → Button navigation fails

## 📱 Current Live Status
- ✅ APUSH (9 units) - Fully operational
- ✅ AP Gov (5 units) - Fully operational  
- ✅ AP World (9 units) - Fully operational
- 🎯 Ready for new courses!
