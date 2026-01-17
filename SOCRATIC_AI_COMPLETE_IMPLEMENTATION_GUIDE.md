# Socratic AI Chat System - Complete Implementation Guide

## Overview
This document provides a comprehensive guide for implementing and replicating the Socratic AI chat system to new AP courses. The system includes an AI-powered sidebar with specific topics, a main chat interface, and navigation buttons to study guides/quizzes.

## System Architecture

### Core Files
1. **`src/pages/SocraticChat.tsx`** - Main chat interface (PRIMARY FILE)
2. **`src/pages/SocraticLearning.tsx`** - Course selection page
3. **`src/App.tsx`** - Main routing configuration
4. **Backend API** - Heroku-deployed Python Flask API (grader_api.py)

### Navigation Pattern
- Main route: `/socratic-chat/:course/:unit`
- Course selection: `/socratic-learning`
- Study guides: Course-specific patterns (see routing section)

## Current Supported Courses

### 1. APUSH (AP US History)
- **Units**: 1-9
- **Chat Route**: `/socratic-chat/apush/unit1` through `/socratic-chat/apush/unit9`
- **Study Guide Routes**: `/apush-study-guide/unit/1/quiz` through `/apush-study-guide/unit/9/quiz`
- **Navigation Pattern**: `/apush-study-guide/unit/X/quiz`

### 2. AP Government
- **Units**: 1-5
- **Chat Route**: `/socratic-chat/apgov/unit1` through `/socratic-chat/apgov/unit5`
- **Study Guide Routes**: `/ap-gov-unit/1` through `/ap-gov-unit/5`
- **Navigation Pattern**: `/ap-gov-unit/X`

### 3. AP World History
- **Units**: 1-9
- **Chat Route**: `/socratic-chat/apworld/unit1` through `/socratic-chat/apworld/unit9`
- **Study Guide Routes**: `/ap-world-study-guide/unit/1` through `/ap-world-study-guide/unit/9`
- **Navigation Pattern**: `/ap-world-study-guide/unit/X`

## Sidebar Topics Implementation

### Topics Data Structure
```typescript
interface UnitTopic {
  key: string;        // Unique identifier
  title: string;      // Display title
  keyFacts: string[]; // Array of key facts (5 recommended)
}
```

### Implementation in SocraticChat.tsx
Located in the `getUnitTopics()` function around line 200-300.

#### For each course:
```typescript
// APUSH Example
if (course === 'apush') {
  if (unit === 'unit1') {
    return [
      {
        key: 'nativeAmerican',
        title: 'Native American Societies',
        keyFacts: [
          'Complex societies before European contact',
          'Agricultural and hunter-gatherer cultures',
          'Trade networks across North America',
          'Diverse political and social structures',
          'Adaptation to different environments'
        ]
      },
      // ... 4 more topics for comprehensive coverage
    ];
  }
  // ... repeat for units 2-9
}
```

### Topic Requirements per Unit
- **Minimum**: 4 topics per unit
- **Recommended**: 5 topics per unit
- **Key Facts**: Exactly 5 per topic
- **Coverage**: All major concepts for the unit

## Study Guide Button Implementation

### Current Logic (SocraticChat.tsx line 1130-1155)
```typescript
<button
  onClick={() => {
    if (course === 'apush') {
      navigate(`/apush-study-guide/unit/${unit?.replace('unit', '')}/quiz`);
    } else if (course === 'apgov') {
      navigate(`/ap-gov-unit/${unit?.replace('unit', '')}`);
    } else if (course === 'apworld' || course === 'world') {
      navigate(`/ap-world-study-guide/unit/${unit?.replace('unit', '')}`);
    } else {
      // Fallback for any other courses
      console.log(`Navigation not implemented for course: ${course}`);
      alert(`Study guide for ${course?.toUpperCase()} ${unit?.toUpperCase()} is coming soon!`);
    }
  }}
  className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-semibold rounded-lg hover:from-emerald-600 hover:to-blue-600 transition-all duration-300 shadow-lg"
>
  Take {unit?.toUpperCase()} {course === 'apush' ? 'Quiz' : 'Study Guide'} →
</button>
```

### Button Text Logic
- **APUSH**: "Take UNIT[X] Quiz →"
- **All other courses**: "Take UNIT[X] Study Guide →"

## Course Information Implementation

### Unit Information Structure
Located in `getUnitInfo()` function around line 60-100:

```typescript
const getUnitInfo = () => {
  if (course === 'apush') {
    const unitData = {
      'unit1': { title: 'APUSH Unit 1: Colonial Period and Independence', period: '1491–1800', emoji: '🌎' },
      // ... continue for all units
    };
    return unitData[unit as keyof typeof unitData] || { title: `APUSH ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
  }
  // Repeat pattern for other courses
};
```

## Course Selection Page (SocraticLearning.tsx)

### Course Configuration
```typescript
const courses = [
  {
    id: 'apworld',
    title: 'AP World History',
    description: 'Explore global patterns and processes from 1200 CE to present',
    category: 'social',
    color: 'from-green-500 to-emerald-500',
    units: [
      { id: 1, emoji: '🏛️', title: 'The Global Tapestry', period: 'c. 1200-1450' },
      // ... continue for all 9 units
    ]
  },
  // ... other courses
];
```

## Routing Configuration (App.tsx)

### Required Routes for New Course
1. **Chat Route**: `/socratic-chat/:course/:unit`
2. **Study Guide Routes**: Course-specific pattern
3. **Quiz Routes**: If applicable
4. **Course Selection**: Already implemented in `/socratic-learning`

### Example for AP Biology (New Course)
```typescript
// In App.tsx imports
import APBiologyStudyGuide from './pages/APBiologyStudyGuide';
import APBiologyUnit1 from './pages/APBiologyUnit1';
import APBiologyUnit1Quiz from './pages/APBiologyUnit1Quiz';
// ... repeat for all units

// In Routes section
<Route path="/ap-biology-study-guide" element={<APBiologyStudyGuide />} />
<Route path="/ap-biology/unit/1" element={<APBiologyUnit1 />} />
<Route path="/ap-biology/unit/1/quiz" element={<APBiologyUnit1Quiz />} />
// ... repeat for all units and quizzes
```

## Backend API Integration

### Current Endpoint
- **URL**: Heroku-deployed Flask API
- **Endpoint**: `/chat/socratic`
- **Method**: POST
- **Authentication**: Bearer token required

### Request Format
```typescript
const response = await fetch(`${API_URL}/chat/socratic`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    ...authHeaders
  },
  body: JSON.stringify({
    message: userMessage,
    course: course,
    unit: unit,
    context: conversationContext,
    memory: conversationMemory
  })
});
```

## Adding a New Course - Step-by-Step Guide

### Step 1: Add Course to SocraticLearning.tsx
```typescript
{
  id: 'newcourse',
  title: 'AP New Course',
  description: 'Description of the new course',
  category: 'appropriate_category', // stem, english, social, languages, arts
  color: 'from-color-500 to-color-500',
  units: [
    { id: 1, emoji: '📚', title: 'Unit 1 Title', period: 'Time Period' },
    // ... all units for the course
  ]
}
```

### Step 2: Add Topics to SocraticChat.tsx
In the `getUnitTopics()` function:
```typescript
if (course === 'newcourse') {
  if (unit === 'unit1') {
    return [
      {
        key: 'topic1',
        title: 'First Major Topic',
        keyFacts: [
          'Key fact 1',
          'Key fact 2',
          'Key fact 3',
          'Key fact 4',
          'Key fact 5'
        ]
      },
      // ... 4 more topics
    ];
  }
  // ... repeat for all units
}
```

### Step 3: Add Unit Information
In the `getUnitInfo()` function:
```typescript
if (course === 'newcourse') {
  const unitData = {
    'unit1': { title: 'New Course Unit 1: Title', period: 'Time Period', emoji: '📚' },
    // ... all units
  };
  return unitData[unit as keyof typeof unitData] || { title: `New Course ${unit?.toUpperCase()}`, period: '', emoji: '📚' };
}
```

### Step 4: Add Study Guide Button Logic
In the button onClick handler:
```typescript
} else if (course === 'newcourse') {
  navigate(`/new-course-study-guide/unit/${unit?.replace('unit', '')}`);
```

### Step 5: Create Study Guide/Quiz Pages
- Create individual unit study guide pages
- Create individual quiz pages (if applicable)
- Follow the existing naming pattern

### Step 6: Add Routes to App.tsx
```typescript
// Add imports for all new pages
import NewCourseStudyGuide from './pages/NewCourseStudyGuide';
// ... all unit pages

// Add routes
<Route path="/new-course-study-guide" element={<NewCourseStudyGuide />} />
<Route path="/new-course/unit/1" element={<NewCourseUnit1 />} />
<Route path="/new-course/unit/1/quiz" element={<NewCourseUnit1Quiz />} />
// ... all units
```

### Step 7: Update Backend (if needed)
- Ensure the backend API can handle the new course identifier
- Add course-specific content/prompts if required

## Deployment Process

### Frontend (GitHub Pages)
```powershell
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy

# Verify deployment
# Visit https://aphelper.tech to confirm changes are live
```

### Backend (Heroku)
```powershell
# Commit changes
git add .
git commit -m "Add support for [new course]"

# Push to GitHub
git push origin main

# Deploy to Heroku
git push heroku main

# Verify backend deployment
# Test API endpoints
```

## Testing Checklist

### For Each New Course/Unit:
- [ ] Course appears in `/socratic-learning` selection page
- [ ] Chat route `/socratic-chat/[course]/[unit]` loads correctly
- [ ] Sidebar displays 4-5 specific topics (not generic "Socratic AI Ready")
- [ ] Each topic shows 5 key facts when clicked
- [ ] "Take UNIT[X] Study Guide →" button navigates correctly
- [ ] Target study guide page exists and loads
- [ ] All units (1-9 or course-specific) are implemented
- [ ] Backend API responds correctly to new course identifier

## Troubleshooting Common Issues

### 1. Sidebar Shows "Socratic AI Ready"
- **Cause**: Missing topics implementation for the course/unit
- **Solution**: Add topics in `getUnitTopics()` function

### 2. Study Guide Button Shows Alert
- **Cause**: Missing navigation logic or route
- **Solution**: Add course logic to button onClick handler and ensure routes exist

### 3. Chat Not Loading
- **Cause**: Backend doesn't recognize course identifier
- **Solution**: Update backend to handle new course, or use existing supported course format

### 4. Missing Units
- **Cause**: Incomplete implementation in `getUnitTopics()` or `getUnitInfo()`
- **Solution**: Add all units for the course following the pattern

## Current Status Summary

### ✅ Completed Features:
- APUSH units 1-9 with comprehensive topics and working study guide buttons
- AP Gov units 1-5 with comprehensive topics and working study guide buttons  
- AP World units 1-9 with comprehensive topics and working study guide buttons
- Sidebar always shows specific topics (no more generic messages)
- All study guide buttons navigate to correct pages
- Course selection page with proper categorization
- Live deployment on aphelper.tech and Heroku

### 🎯 Ready for Replication:
The system is now fully documented and ready for replication to new courses. Follow the step-by-step guide above to add any new AP course following the established patterns.

## File Locations Quick Reference
- **Main Chat Logic**: `src/pages/SocraticChat.tsx`
- **Course Selection**: `src/pages/SocraticLearning.tsx`  
- **Routing**: `src/App.tsx`
- **Backend**: `grader_api.py` (Heroku)
- **Deployment**: `package.json` scripts for GitHub Pages

This comprehensive guide ensures that the Socratic AI chat system can be efficiently replicated to any new AP course while maintaining consistency and functionality across the platform.
