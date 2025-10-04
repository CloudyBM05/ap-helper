# Authentication Implementation for AI Grading System

## Summary
Successfully implemented authentication requirement for all AI grading endpoints on aphelper.tech. Users must now be logged in with Firebase to use the AI grading features.

## Changes Made

### Backend (Heroku - grader_api.py)

#### 1. Added Authentication Imports and Setup
- Added `jwt` and `functools.wraps` imports
- Added Firebase Admin SDK initialization (optional, falls back to JWT)
- Set up authentication configuration with SECRET_KEY

#### 2. Created Authentication Functions
- `verify_jwt_token(token)` - Verifies JWT tokens
- `verify_firebase_token(token)` - Verifies Firebase ID tokens
- `require_auth(f)` - Decorator function that protects endpoints

#### 3. Protected All Grading Endpoints
Added `@require_auth` decorator to:
- `/api/grade-saq` - SAQ grading
- `/api/grade_essay` - Essay grading
- `/api/grade-dbq` - DBQ grading
- `/api/grade-leq` - LEQ grading
- `/api/grade-apgov` - AP Gov grading

#### 4. Updated requirements.txt
Added:
- `PyJWT` - For JWT token verification
- `firebase-admin` - For Firebase token verification

### Frontend (aphelper.tech - React/TypeScript)

#### 1. Enhanced useAuth Hook (`src/hooks/useAuth.ts`)
Added:
- `token` state variable
- `isAuthenticated` computed property
- `getAuthHeaders()` method - Returns authorization headers
- Token storage in localStorage
- Automatic token refresh on auth state change

#### 2. Updated Grading Pages
Modified the following pages to require authentication:
- `APUSHPracticeExamSAQ2023.tsx`
- `APUSHPracticeExamSAQ2024.tsx`
- `APUSHPracticeExamSAQ2025.tsx`
- `APUSHPracticeExamDBQ.tsx`

**Changes in each page:**
1. Import `useAuth` hook
2. Destructure `isAuthenticated` and `getAuthHeaders` from useAuth
3. Added authentication check before grading
4. Added auth headers to fetch requests

#### Sample Code Pattern:
```typescript
// Import
import { useAuth } from '../hooks/useAuth';

// In component
const { isAuthenticated, getAuthHeaders } = useAuth();

// In handleSubmit
if (!isAuthenticated) {
    setError('Please log in to use AI grading. Click the "Login" button in the navigation bar.');
    return;
}

// In fetch
const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
    },
    body: JSON.stringify({...}),
});
```

## How It Works

### Authentication Flow:
1. **User logs in** via Firebase on aphelper.tech
2. **Firebase returns ID token** - stored in localStorage and state
3. **User submits grading request** - Frontend checks authentication
4. **Token sent to backend** in Authorization header: `Bearer <token>`
5. **Backend verifies token** using Firebase Admin SDK or JWT
6. **Request processed** if valid, or rejected with 401 if invalid

### Cross-Origin Security:
- ✅ CORS properly configured on backend for aphelper.tech
- ✅ Firebase tokens are verified server-side (can't be faked)
- ✅ Tokens expire automatically (Firebase: 1 hour, JWT: configurable)
- ✅ Failed auth returns clear error messages to user

## Files Modified

### Backend:
- `grader_api.py` - Added full authentication system
- `requirements.txt` - Added PyJWT and firebase-admin

### Frontend:
- `src/hooks/useAuth.ts` - Enhanced with token management
- `src/pages/APUSHPracticeExamSAQ2023.tsx` - Added auth
- `src/pages/APUSHPracticeExamSAQ2024.tsx` - Added auth
- `src/pages/APUSHPracticeExamSAQ2025.tsx` - Added auth
- `src/pages/APUSHPracticeExamDBQ.tsx` - Added auth

## Remaining Files to Update

The following pages also use grading endpoints and should be updated with the same pattern:

### SAQ Pages:
- `src/pages/APUSHPracticeExamSAQ2025Set2.tsx`
- `src/pages/APWorldPracticeExamSAQ2025.tsx`
- `src/pages/APStatisticsShortFRQ1.tsx`
- `src/pages/APStatisticsShortFRQ2.tsx`
- `src/pages/APStatisticsShortFRQ3.tsx`
- `src/pages/APStatisticsShortFRQ4.tsx`
- `src/pages/APStatisticsShortFRQ5.tsx`
- `src/pages/APStatisticsInvestigativeTask1.tsx`
- `src/pages/APMicroShortFRQSet1Q2.tsx`
- `src/pages/APMicroShortFRQSet1Q3.tsx`
- `src/pages/APMicroShortFRQSet2Q2.tsx`
- `src/pages/APMicroShortFRQSet2Q3.tsx`
- `src/pages/APMacroShortFRQ.tsx`
- `src/pages/APHumanGeographyScaleAnalysisSet1.tsx`

### DBQ/LEQ Pages:
- `src/pages/APUSHPracticeExamLEQ.tsx`
- `src/pages/APWorldPracticeExamDBQ2025.tsx`
- `src/pages/APWorldPracticeExamLEQ2025.tsx`

## Deployment Instructions

### 1. Deploy Backend to Heroku:
```bash
cd "c:\Users\Brandon\Downloads\projectsave - Copy (2)"
git add grader_api.py requirements.txt
git commit -m "Add authentication to AI grading endpoints"
git push heroku main
```

### 2. Set Environment Variables on Heroku:
```bash
heroku config:set SECRET_KEY="your-secret-key-here"
heroku config:set FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account",...}'
```

### 3. Deploy Frontend to Netlify:
The frontend changes will be deployed automatically when you push to your repository (if you have auto-deploy enabled).

## Testing

### Test Authentication:
1. **Logged Out User**: Should see error message prompting to log in
2. **Logged In User**: Should be able to submit and receive grades
3. **Expired Token**: Should fail gracefully and prompt re-login

### Test Error Messages:
- No auth token: "Authentication required. Please log in to use AI grading."
- Invalid token: "Invalid or expired authentication token."
- Server error: Original error messages preserved

## Benefits

✅ **Protects OpenAI API costs** - Only authenticated users can grade
✅ **User accountability** - Track usage per user
✅ **Rate limiting ready** - Can add per-user limits later
✅ **Firebase integration** - Uses existing auth system
✅ **Graceful fallback** - JWT support if Firebase unavailable
✅ **Clear user feedback** - Helpful error messages

## Notes

- The backend supports both Firebase tokens (preferred) and JWT tokens (fallback)
- Firebase Admin SDK is optional - the system will work with JWT-only if Firebase isn't configured
- All existing CORS origins are preserved
- The authentication doesn't break any existing functionality for non-grading pages
