# CORS Fix for AP Biology FRQ Endpoint

## Issue
AP Biology FRQ grading was failing from the production domain `https://aphelper.tech` with the following error:

```
Access to fetch at 'https://ap-helper-2d9f117e9bdb.herokuapp.com/api/grade-apbio-frq' 
from origin 'https://aphelper.tech' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Root Cause
The `/api/grade-apbio-frq` endpoint was missing:
1. `@cross_origin` decorator with allowed origins
2. `OPTIONS` method support for CORS preflight requests

## Fix Applied
Updated `grader_api.py` line 1080:

### Before:
```python
@app.route('/api/grade-apbio-frq', methods=['POST'])
@require_auth
@track_usage('apbio-frq')
def grade_apbio_frq():
```

### After:
```python
@app.route('/api/grade-apbio-frq', methods=['POST', 'OPTIONS'])
@cross_origin(origins=[
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://127.0.0.1:5173",
    "https://cloudybm05.github.io",
    "https://aphelper.tech",
    "https://www.aphelper.tech",
    "https://ap-helper-2d9f117e9bdb.herokuapp.com"
], supports_credentials=True, methods=["GET", "POST", "OPTIONS"], allow_headers="*")
@require_auth
@track_usage('apbio-frq')
def grade_apbio_frq():
```

## Changes Made
1. ✅ Added `@cross_origin` decorator with all required origins
2. ✅ Added `OPTIONS` to methods list for preflight requests
3. ✅ Enabled `supports_credentials=True` for authentication headers
4. ✅ Set `allow_headers="*"` to accept Authorization header

## Deployment
- **Committed**: e78736a
- **Heroku Release**: v172
- **Status**: ✅ Deployed and live
- **Date**: October 12, 2025

## Testing
After deployment, AP Biology FRQ grading should work from:
- ✅ `http://localhost:5173` (development)
- ✅ `https://cloudybm05.github.io/ap-helper` (GitHub Pages)
- ✅ `https://aphelper.tech` (custom domain - **FIXED**)
- ✅ `https://www.aphelper.tech` (custom domain with www)

## Verification Steps
1. Navigate to: https://aphelper.tech/#/ap-biology-practice-exam/short-frq/set1
2. Sign in with valid credentials
3. Fill in answers (meeting word/character requirements)
4. Click "SUBMIT"
5. Should receive grading results without CORS error

## Related Files
- `grader_api.py` - Backend API file
- `src/pages/APBiologyShortFRQ.tsx` - Frontend Short FRQ
- `src/pages/APBiologyLongFRQ.tsx` - Frontend Long FRQ

## Status
🟢 **RESOLVED** - AP Biology FRQ grading now works from all production domains.

## Additional Notes
All other endpoints in `grader_api.py` already had proper CORS configuration:
- `/api/grade-saq` ✅
- `/api/grade_essay` ✅
- `/api/grade-dbq` ✅
- `/api/grade-leq` ✅
- `/api/grade-apgov` ✅
- `/api/grade-psych-frq` ✅
- `/api/grade-apmicro-frq` ✅
- `/api/grade-apmacro-frq` ✅
- `/api/grade-aphug-frq` ✅
- `/api/grade-apstat-frq` ✅
- `/api/grade-apbio-frq` ✅ **NOW FIXED**

This was an oversight during the initial implementation of the AP Biology FRQ endpoint.
