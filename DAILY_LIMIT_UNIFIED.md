# Daily Limit System - UNIFIED ACROSS ALL AP COURSES ✅

## Date: October 2025

## Summary
Successfully unified the daily limit enforcement system. **All AP course FRQ grading now shares a single daily limit: 1 grading per day across ALL courses.**

## How It Works

### Backend Enforcement (Source of Truth)
- **File:** `grader_api.py`
- **Decorator:** `@track_usage(endpoint_type)`
- **Function:** `check_daily_limit(user_email, endpoint_type)`
- **Storage:** `daily_usage.json` on Heroku backend
- **Response:** HTTP 429 (Too Many Requests) when limit exceeded

### Tracked Endpoint Types:
1. `'saq'` - APUSH/AP World SAQ
2. `'dbq'` - APUSH/AP World DBQ
3. `'leq'` - APUSH/AP World LEQ
4. `'essay'` - General essay grading
5. `'apgov'` - AP Gov FRQs (all 4 types)
6. `'psych-frq'` - AP Psychology FRQs (AAQ + EBQ)

### Daily Limit Logic:
```python
# From check_daily_limit() in grader_api.py
if current_count >= 1:
    last_type = user_usage.get("last_type", "question")
    return False, f"Daily limit reached. You already used your 1 free AI grading today ({last_type.upper()}). Try again tomorrow!"
```

**Translation:** Once you grade ANY FRQ from ANY AP course, you cannot grade another FRQ (from any course) until the next day.

## Example Scenarios

### Scenario 1: Cross-Course Limit
1. Student grades APUSH SAQ Set 1 at 9:00 AM → ✅ Success
2. Student tries to grade AP Gov Concept Application at 10:00 AM (same day) → ❌ Blocked (429 error)
3. Student tries to grade AP Psych AAQ at 11:00 AM (same day) → ❌ Blocked (429 error)
4. Next day, student grades AP World DBQ → ✅ Success (new day, counter reset)

### Scenario 2: Same Course Multiple Attempts
1. Student grades AP Psych AAQ at 2:00 PM → ✅ Success
2. Student tries to grade AP Psych EBQ at 3:00 PM (same day) → ❌ Blocked (429 error)
3. Next day, student grades AP Psych EBQ → ✅ Success

### Scenario 3: Backend Tracks Everything
1. Student grades on Computer A (APUSH SAQ) → ✅ Success, tracked by backend
2. Student switches to Computer B, tries to grade AP Gov → ❌ Blocked (backend remembers user)
3. Student clears browser cache, tries again → ❌ Still blocked (backend is source of truth)

## Frontend vs Backend

### Previous System (Inconsistent)
- **APUSH/AP World:** Backend-only (429 responses)
- **AP Gov:** Backend-only (429 responses)
- **AP Psych:** ❌ Frontend localStorage (could be bypassed)

### New System (Unified) ✅
- **ALL COURSES:** Backend-only enforcement (429 responses)
- **Frontend:** No localStorage limit checking
- **Frontend:** Handles 429 response with user-friendly error message
- **Result:** Consistent, secure, cannot be bypassed

## Code Changes

### Files Modified:

1. **APPsychPracticeExamAAQSelect.tsx**
   - ❌ Removed frontend localStorage daily limit check
   - ✅ Added 429 status handling
   - ✅ Clear error message about cross-course limit

2. **APPsychPracticeExamEBQSelect.tsx**
   - ❌ Removed frontend localStorage daily limit check
   - ✅ Added 429 status handling
   - ✅ Clear error message about cross-course limit

3. **grader_api.py**
   - ✅ Updated comment to include 'psych-frq' in endpoint types
   - ✅ Clarified that limit applies across ALL AP courses

### Error Handling Pattern (All AP Courses Now Use This):

```typescript
// Check for authentication error
if (response.status === 401) {
  setShowAuthModal(true);
  setGradeError('Authentication required. Please sign in to continue.');
  setGrading(false);
  return;
}

// Check for daily limit error (429)
if (response.status === 429) {
  const errorData = await response.json().catch(() => ({}));
  setGradeError(errorData.error || 'Daily limit reached: You can only grade 1 FRQ per day (across all AP courses: APUSH, AP World, AP Gov, AP Psych). Please try again tomorrow.');
  setGrading(false);
  return;
}

// Check for other errors
if (!response.ok) {
  const errorData = await response.json().catch(() => ({}));
  throw new Error(errorData.error || 'Failed to contact AI grading service.');
}
```

## Error Messages

### Backend Error Message (from grader_api.py):
```
"Daily limit reached. You already used your 1 free AI grading today (SAQ). Try again tomorrow!"
```

### Frontend Error Message (all courses):
```
"Daily limit reached: You can only grade 1 FRQ per day (across all AP courses: APUSH, AP World, AP Gov, AP Psych). Please try again tomorrow."
```

**Note:** The backend message includes which FRQ type was used (SAQ, DBQ, LEQ, etc.). The frontend adds clarification that it's across all courses.

## Why This Approach?

### Security
- ✅ Backend is source of truth (cannot be bypassed)
- ✅ User cannot clear localStorage to reset limit
- ✅ User cannot modify frontend code to bypass check
- ✅ Limit tracked by authenticated user email

### Consistency
- ✅ All AP courses use same enforcement method
- ✅ Same error handling pattern across all FRQ pages
- ✅ Clear, consistent error messages

### User Experience
- ✅ Immediate feedback (429 response is fast)
- ✅ Clear explanation of why limit was reached
- ✅ User knows which FRQ type they already graded today
- ✅ User understands limit applies across all courses

### Fairness
- ✅ Prevents abuse of AI grading service
- ✅ Encourages thoughtful use of AI feedback
- ✅ Manages API costs (OpenAI usage)
- ✅ Equal access for all students (1 per day each)

## Backend Implementation Details

### Track Usage Decorator
```python
@track_usage('psych-frq')
def grade_psych_frq():
    """Grade AP Psychology FRQ (AAQ or EBQ)"""
    # ... grading logic
```

The decorator:
1. Extracts authenticated user email
2. Calls `check_daily_limit(user_email, 'psych-frq')`
3. Returns 429 if limit reached
4. Increments counter if allowed
5. Saves to `daily_usage.json`

### Daily Usage Data Structure
```json
{
  "user@example.com": {
    "date": "2025-10-06",
    "count": 1,
    "last_type": "psych-frq"
  }
}
```

### Counter Reset Logic
```python
# Reset counts if it's a new day
if user_usage.get("date") != today:
    user_usage = {"date": today, "count": 0, "last_type": None}
    usage_data[user_email] = user_usage
```

Every day at midnight (UTC), the counter resets to 0 for all users automatically.

## Testing the Daily Limit

### Manual Testing Steps:

1. **Test Same Course Blocking:**
   - Grade APUSH SAQ Set 1 → Should succeed
   - Try to grade APUSH SAQ Set 2 → Should show 429 error
   - Verify error message mentions "already used your 1 free AI grading today (SAQ)"

2. **Test Cross-Course Blocking:**
   - Grade AP Gov Concept Application → Should succeed
   - Try to grade AP Psych AAQ → Should show 429 error
   - Verify error message mentions "across all AP courses"

3. **Test Next Day Reset:**
   - Grade any FRQ today → Should succeed
   - Wait until next day (or manually change date in backend data)
   - Grade a different FRQ → Should succeed

4. **Test Authentication Requirement:**
   - Log out
   - Try to grade any FRQ → Should show authentication modal
   - Log in
   - Try to grade → Should proceed

### Automated Testing (Future):
- Unit tests for `check_daily_limit()`
- Integration tests for endpoint decorators
- End-to-end tests for user flows

## Deployment Status ✅

### Git Commit
- **Commit Hash:** 7a2167b
- **Branch:** master & main
- **Message:** "fix: Unify daily limit enforcement - backend only, 1 grading/day across ALL AP courses (APUSH, AP World, AP Gov, AP Psych)"
- **Files Changed:** 3 files, 19 insertions(+), 28 deletions(-)

### Changes Summary:
- Removed 28 lines of frontend localStorage checks
- Added 19 lines of 429 error handling
- Net reduction of 9 lines (simpler, cleaner code)

### Frontend Deployment
- ✅ Build completed: 8.53s
- ✅ Deployed to: GitHub Pages
- ✅ Status: Published
- ✅ Live URL: `https://aphelper.tech`

### Backend Deployment
- ℹ️ Backend running on: `https://ap-helper-2d9f117e9bdb.herokuapp.com`
- ℹ️ Backend file: `grader_api.py` (updated comment)
- ⚠️ **Action Needed:** Deploy backend to Heroku to apply comment update
  - Comment update is non-functional (doesn't affect behavior)
  - Backend already enforces cross-course limit correctly
  - Deploy when convenient, no urgency

## Comparison: Old vs New

### Old System (Inconsistent):
```
APUSH SAQ       → Backend tracks 'saq'
APUSH DBQ       → Backend tracks 'dbq'
APUSH LEQ       → Backend tracks 'leq'
AP Gov FRQs     → Backend tracks 'apgov'
AP Psych AAQ    → Frontend localStorage ❌
AP Psych EBQ    → Frontend localStorage ❌
```

**Problem:** AP Psych could be bypassed by clearing localStorage

### New System (Unified):
```
APUSH SAQ       → Backend tracks 'saq'       → 429 if any already graded
APUSH DBQ       → Backend tracks 'dbq'       → 429 if any already graded
APUSH LEQ       → Backend tracks 'leq'       → 429 if any already graded
AP Gov FRQs     → Backend tracks 'apgov'     → 429 if any already graded
AP Psych AAQ    → Backend tracks 'psych-frq' → 429 if any already graded ✅
AP Psych EBQ    → Backend tracks 'psych-frq' → 429 if any already graded ✅
```

**Solution:** All use backend enforcement, all share same limit

## Related Documentation

- `AP_PSYCH_FRQ_DEPLOYMENT_COMPLETE.md` - AP Psych FRQ implementation
- `AP_GOV_DEPLOYMENT_COMPLETE.md` - AP Gov FRQ implementation
- `APUSH_FRQ_PERSISTENCE_COMPLETE.md` - APUSH FRQ implementation
- `AP_WORLD_FRQ_COMPLETE.md` - AP World FRQ implementation
- `AUTHENTICATION_IMPLEMENTATION.md` - Auth system docs

## Frequently Asked Questions

### Q: Why only 1 grading per day total?
**A:** To manage API costs (OpenAI charges per request), prevent abuse, and encourage thoughtful use of AI feedback. Students can practice unlimited times - the limit only applies to AI grading.

### Q: Can I grade practice problems without using AI?
**A:** Yes! You can fill out as many practice FRQs as you want, save them to localStorage, review PDFs, etc. The limit only applies when you click "GRADE" and submit to the AI.

### Q: What if I'm in multiple AP classes?
**A:** The limit is per student account, not per class. If you're taking APUSH, AP World, and AP Gov, you still only get 1 AI grading per day total. Choose wisely!

### Q: Will this change in the future?
**A:** Possibly. If costs decrease or funding increases, we may offer more gradings per day. For now, 1 per day ensures fairness and sustainability.

### Q: What counts as "tomorrow"?
**A:** The backend uses UTC timezone. "Tomorrow" starts at midnight UTC (which may be different from your local time). The counter resets automatically every 24 hours.

### Q: Can teachers/admins get more gradings per day?
**A:** Currently, no. Everyone has the same limit. If you need more for classroom use, contact the administrators about special access.

## Success Metrics ✅

- **Code Simplification:** 9 fewer lines of code
- **Security Improvement:** Removed client-side bypass vulnerability
- **Consistency:** All courses now use same enforcement method
- **User Experience:** Clear error messages across all courses
- **Deployment:** Zero errors, successful build and deploy
- **Cost Management:** Prevents API abuse across all courses

## Final Status

🎉 **DAILY LIMIT SYSTEM - UNIFIED AND DEPLOYED!** 🎉

- ✅ All AP courses (APUSH, AP World, AP Gov, AP Psych) share 1 daily limit
- ✅ Backend-only enforcement (secure, cannot be bypassed)
- ✅ Consistent error handling across all FRQ pages
- ✅ Clear user messaging about cross-course limit
- ✅ Zero errors, production-ready
- ✅ Live at https://aphelper.tech

**Students now have a fair, consistent, and secure daily limit system across all AP courses!**

---

**Deployment Date:** October 2025
**Status:** ✅ COMPLETE & LIVE
**Next:** Monitor usage patterns, gather student feedback, consider adjustments if needed
