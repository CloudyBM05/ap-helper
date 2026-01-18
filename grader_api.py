from flask import Flask, request, jsonify
from flask_cors import cross_origin
import openai
import os
import json
import random
import re
import traceback
import ast
import base64
from dotenv import load_dotenv
import jwt
from functools import wraps
from datetime import datetime, timezone
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)

# Store your OpenAI API key securely (use environment variable in production)
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Configure Gemini API for Socratic chat
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    print("Gemini API configured for Socratic chat")
else:
    print("Warning: GEMINI_API_KEY not found - Socratic chat will use fallback responses")

# Initialize Firebase Admin SDK - Make it completely optional
FIREBASE_ENABLED = False
try:
    import firebase_admin
    from firebase_admin import credentials, auth as firebase_auth
    
    # Check if Firebase credentials are available
    if os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY") or os.getenv("GOOGLE_APPLICATION_CREDENTIALS"):
        if not firebase_admin._apps:
            # Use service account key from environment variable
            service_account_key = os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY")
            if service_account_key:
                import json
                cred = credentials.Certificate(json.loads(service_account_key))
                firebase_admin.initialize_app(cred)
            else:
                # Use default credentials (for deployed environments)
                firebase_admin.initialize_app()
        FIREBASE_ENABLED = True
        print("Firebase Admin SDK initialized successfully")
    else:
        print("Firebase credentials not found - using JWT-only authentication")
except ImportError:
    print("firebase-admin not installed - using JWT-only authentication")
    firebase_auth = None
except Exception as e:
    print(f"Warning: Firebase Admin SDK initialization failed: {e}")
    print("Falling back to JWT-only authentication")
    firebase_auth = None

@app.route("/", methods=["GET"])
def root():
    """Root endpoint to check if the API is running"""
    return jsonify({
        "message": "AP Helper API is running",
        "status": "healthy",
        "available_endpoints": [
            "/api/grade-saq",
            "/api/grade_essay", 
            "/api/grade-dbq",
            "/api/grade-leq",
            "/api/grade-apgov",
            "/api/grade-psych-frq",
            "/api/grade-apmicro-frq",
            "/api/grade-apmacro-frq",
            "/api/grade-aphug-frq",
            "/api/grade-apstat-frq",
            "/api/grade-apbio-frq",
            "/api/chat/send",
            "/api/unit-topics",
            "/api/socratic-chat"
        ]
    })

# Authentication configuration (keeping JWT as fallback)
SECRET_KEY = os.getenv("SECRET_KEY", "supersecretkey")
ALGORITHM = "HS256"

def verify_jwt_token(token):
    """Verify JWT token and return username if valid"""
    try:
        # First try to decode as a proper JWT
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            return None
        return username
    except jwt.PyJWTError:
        try:
            # Fallback: try to decode as base64 encoded JSON (for mock tokens)
            import base64
            decoded_bytes = base64.b64decode(token + '==')  # Add padding if needed
            payload = json.loads(decoded_bytes.decode('utf-8'))
            username = payload.get("sub") or payload.get("email")
            if username:
                return username
        except Exception:
            pass
        return None

def verify_firebase_token(token):
    """Verify Firebase ID token and return user info if valid"""
    if not FIREBASE_ENABLED:
        print("DEBUG: Firebase not enabled, skipping Firebase verification")
        return None
    
    try:
        print("DEBUG: Attempting Firebase token verification...")
        # Verify the Firebase ID token using the imported auth module
        decoded_token = firebase_auth.verify_id_token(token)
        uid = decoded_token['uid']
        email = decoded_token.get('email')
        # Use email as user identifier, fallback to UID
        user_id = email or uid
        print(f"DEBUG: Firebase token verification successful for user: {user_id}")
        return user_id
    except Exception as e:
        print(f"DEBUG: Firebase token verification failed: {e}")
        return None

def require_auth(f):
    """Decorator to require authentication for endpoints"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        print(f"DEBUG: Auth header received: {auth_header}")
        
        if not auth_header:
            print("DEBUG: No auth header found")
            return jsonify({"error": "Authentication required. Please log in to use AI grading."}), 401
        
        try:
            # Extract token from "Bearer <token>" format
            token = auth_header.split(" ")[1]
            print(f"DEBUG: Extracted token (first 50 chars): {token[:50]}...")
        except IndexError:
            print("DEBUG: Invalid auth header format")
            return jsonify({"error": "Invalid authorization header format."}), 401
        
        # Try Firebase token verification first, then fallback to JWT
        print("DEBUG: Trying Firebase token verification...")
        username = verify_firebase_token(token)
        if not username:
            print("DEBUG: Firebase verification failed, trying JWT...")
            username = verify_jwt_token(token)
        
        print(f"DEBUG: Final username: {username}")
        
        if not username:
            print("DEBUG: All token verification methods failed")
            return jsonify({"error": "Invalid or expired authentication token."}), 401
        
        # Add username to request context
        request.authenticated_user = username
        print(f"DEBUG: Authentication successful for user: {username}")
        return f(*args, **kwargs)
    return decorated_function

# Daily usage tracking
USAGE_FILE = "daily_usage.json"

def load_usage_data():
    """Load daily usage data from file"""
    try:
        if os.path.exists(USAGE_FILE):
            with open(USAGE_FILE, 'r') as f:
                return json.load(f)
    except Exception as e:
        print(f"Error loading usage data: {e}")
    return {}

def save_usage_data(data):
    """Save daily usage data to file"""
    try:
        with open(USAGE_FILE, 'w') as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error saving usage data: {e}")

def check_daily_limit(user_email, endpoint_type):
    """
    Check if user has reached daily limit for ANY grading type
    endpoint_type: 'saq', 'dbq', 'leq', 'essay', 'apgov', 'psych-frq', 'micro-frq', 'macro-frq', 'aphug-frq', or 'apstat-frq' (for logging purposes)
    Returns: (allowed: bool, message: str)
    
    User gets 1 grading per day total (across ALL types: SAQ, DBQ, LEQ, Essay, AP Gov, AP Psych, AP Micro, AP Macro, AP Human Geo, AP Stats)
    This applies across ALL AP courses - once you grade any FRQ, you cannot grade another until tomorrow.
    """
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    usage_data = load_usage_data()
    
    # Get or create user's usage record
    if user_email not in usage_data:
        usage_data[user_email] = {"date": today, "count": 0, "last_type": None}
    
    user_usage = usage_data[user_email]
    
    # Reset counts if it's a new day
    if user_usage.get("date") != today:
        user_usage = {"date": today, "count": 0, "last_type": None}
        usage_data[user_email] = user_usage
    
    # Check daily limit (1 grading per day across ALL types)
    current_count = user_usage.get("count", 0)
    
    if current_count >= 1:
        last_type = user_usage.get("last_type", "question")
        return False, f"Daily limit reached. You already used your 1 free AI grading today ({last_type.upper()}). Try again tomorrow!"
    
    # Increment count and save which type was used
    user_usage["count"] = current_count + 1
    user_usage["last_type"] = endpoint_type
    usage_data[user_email] = user_usage
    save_usage_data(usage_data)
    
    print(f"DEBUG: Usage saved for {user_email}: count={user_usage['count']}, type={endpoint_type}, date={today}")
    
    return True, "OK"

def track_usage(endpoint_type):
    """Decorator to track and limit daily usage for specific endpoint types"""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # User must be authenticated first (require_auth already applied)
            user_email = request.authenticated_user
            
            # Check daily limit
            allowed, message = check_daily_limit(user_email, endpoint_type)
            
            if not allowed:
                print(f"DEBUG: Daily limit reached for {user_email} on {endpoint_type}")
                return jsonify({"error": message}), 429  # 429 = Too Many Requests
            
            print(f"DEBUG: Usage tracked for {user_email} on {endpoint_type}")
            return f(*args, **kwargs)
        return decorated_function
    return decorator

def parse_ai_json(content_str):
    """
    Robustly parse JSON from AI response that might use single quotes instead of double quotes
    """
    try:
        # First try standard JSON parsing
        return json.loads(content_str)
    except json.JSONDecodeError:
        try:
            # Try using ast.literal_eval for single-quoted JSON
            import ast
            return ast.literal_eval(content_str)
        except (ValueError, SyntaxError):
            # If that fails, try converting single quotes to double quotes
            # Replace single quotes with double quotes, but be careful about apostrophes in strings
            fixed_content = re.sub(r"'([^']*)':", r'"\1":', content_str)  # Fix keys
            fixed_content = re.sub(r":\s*'([^']*)'", r': "\1"', fixed_content)  # Fix string values
            return json.loads(fixed_content)

@app.route("/api/grade-saq", methods=["POST", "OPTIONS"])
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
@track_usage('saq')
def grade_saq():
    import json
    data = request.json
    answers = data.get("answers", ["", "", ""])
    prompt_intro = data.get("prompt_intro") or "You are an APUSH teacher. Grade each part (0 or 1 point) based on accuracy, clarity, and correct use of historical thinking skills. Give a short explanation for each score."
    sources = data.get("sources") or ""
    questions = data.get("questions") or ""

    # Build the system prompt dynamically
    system_prompt = prompt_intro.strip()
    if sources.strip():
        system_prompt += f"\n\nSources (summary):\n{sources.strip()}"
    if questions.strip():
        system_prompt += f"\n\nQuestions:\n{questions.strip()}"
    system_prompt += "\n\nRespond ONLY with a JSON array of 3 objects, one per part: [{{'score': 1, 'explanation': '...'}}, ...] No extra text or formatting."

    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": f"SAQ A: {answers[0]}\nSAQ B: {answers[1]}\nSAQ C: {answers[2]}"
                }
            ],
            temperature=0.2
        )
        print("OpenAI raw response:", response)
        content = response.choices[0].message.content
        print("OpenAI message content:", content)
        try:
            result_json = parse_ai_json(content)
            # Repair step: fix common key typos and filter for objects with both 'score' and 'explanation', only keep first 3
            def fix_keys(obj):
                if isinstance(obj, dict):
                    new_obj = {}
                    for k, v in obj.items():
                        key = k.lower()
                        if 'score' in key:
                            new_obj['score'] = v
                        elif 'explanation' in key or 'sxplanation' in key or 'scolanation' in key:
                            new_obj['explanation'] = v
                    return new_obj
                return obj
            if isinstance(result_json, list):
                filtered = [fix_keys(obj) for obj in result_json]
                filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                result_json = filtered[:3]
        except Exception as e:
            print("Failed to parse AI response as JSON:", content)
            print("Exception:", e)
            # Fallback: try to extract JSON array from the response using regex
            match = re.search(r'(\[.*\])', content, re.DOTALL)
            if match:
                json_str = match.group(1)
                try:
                    result_json = parse_ai_json(json_str)
                    # Repair step as above
                    def fix_keys(obj):
                        if isinstance(obj, dict):
                            new_obj = {}
                            for k, v in obj.items():
                                key = k.lower()
                                if 'score' in key:
                                    new_obj['score'] = v
                                elif 'explanation' in key or 'sxplanation' in key or 'scolanation' in key:
                                    new_obj['explanation'] = v
                            return new_obj
                        return obj
                    if isinstance(result_json, list):
                        filtered = [fix_keys(obj) for obj in result_json]
                        filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                        result_json = filtered[:3]
                    return jsonify({"result": result_json})
                except Exception as e2:
                    print("Regex fallback also failed:", e2)
            return jsonify({"error": "AI response could not be parsed."}), 500
        return jsonify({"result": result_json})
    except Exception as e:
        print("Error in /api/grade-saq:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/api/grade_essay", methods=["POST", "OPTIONS"])
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
@track_usage('essay')
def grade_essay():
    data = request.json
    prompt = data.get("prompt")

    if not prompt:
        return jsonify({"error": "Prompt is required."}), 400

    try:
        response = openai.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert APUSH essay grader. Your response will be shown directly to the student."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
        )
        grade = response.choices[0].message.content.strip()
        return jsonify({"grade": grade})

    except Exception as e:
        print(f"Error calling OpenAI: {e}")
        return jsonify({"error": "Failed to get grade from AI."}), 500

@app.route("/api/grade-dbq", methods=["POST", "OPTIONS"])
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
@track_usage('dbq')
def grade_dbq():
    data = request.json
    
    # Handle different frontend data structures
    prompt = data.get("prompt")
    if not prompt:
        # Alternative structure: { answer, prompt_intro }
        answer = data.get("answer", "")
        prompt_intro = data.get("prompt_intro", "")
        if answer and prompt_intro:
            prompt = f"{prompt_intro}\n\nStudent's DBQ Essay:\n{answer}"
        else:
            return jsonify({"error": "Prompt or essay content is required."}), 400

    try:
        response = openai.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert APUSH DBQ grader. Your response will be shown directly to the student."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
        )
        grade = response.choices[0].message.content.strip()
        return jsonify({"grade": grade})

    except Exception as e:
        print(f"Error calling OpenAI: {e}")
        return jsonify({"error": "Failed to get grade from AI."}), 500

@app.route("/api/grade-leq", methods=["POST", "OPTIONS"])
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
@track_usage('leq')
def grade_leq():
    data = request.json
    
    # Handle different frontend data structures
    prompt = data.get("prompt")
    if not prompt:
        # Alternative structure: { answer, prompt_intro }
        answer = data.get("answer", "")
        prompt_intro = data.get("prompt_intro", "")
        if answer and prompt_intro:
            prompt = f"{prompt_intro}\n\nStudent's LEQ Essay:\n{answer}"
        else:
            return jsonify({"error": "Prompt or essay content is required."}), 400

    try:
        response = openai.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert APUSH LEQ grader. Your response will be shown directly to the student."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.2,
        )
        grade = response.choices[0].message.content.strip()
        return jsonify({"grade": grade})

    except Exception as e:
        print(f"Error calling OpenAI: {e}")
        return jsonify({"error": "Failed to get grade from AI."}), 500

@app.route("/api/grade-apgov", methods=["POST", "OPTIONS"])
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
@track_usage('apgov')
def grade_apgov():
    # This endpoint is identical to /api/grade-saq but for AP Gov Concept Application
    import json
    data = request.json
    answers = data.get("answers", ["", "", ""])
    prompt_intro = data.get("prompt_intro") or "You are an AP Gov teacher. Grade each part (0 or 1 point) based on accuracy, clarity, and correct use of government concepts. Give a short explanation for each score."
    sources = data.get("sources") or ""
    questions = data.get("questions") or ""

    # Build the system prompt dynamically
    system_prompt = prompt_intro.strip()
    if sources.strip():
        system_prompt += f"\n\nSources (summary):\n{sources.strip()}"
    if questions.strip():
        system_prompt += f"\n\nQuestions:\n{questions.strip()}"
    system_prompt += "\n\nRespond ONLY with a JSON array of 3 objects, one per part: [{'score': 1, 'explanation': '...'}, ...] No extra text or formatting."

    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": f"Concept Application A: {answers[0]}\nConcept Application B: {answers[1]}\nConcept Application C: {answers[2]}"
                }
            ],
            temperature=0.2
        )
        content = response.choices[0].message.content
        try:
            result_json = parse_ai_json(content)
            def fix_keys(obj):
                if isinstance(obj, dict):
                    new_obj = {}
                    for k, v in obj.items():
                        key = k.lower()
                        if 'score' in key:
                            new_obj['score'] = v
                        elif 'explanation' in key or 'sxplanation' in key or 'scolanation' in key:
                            new_obj['explanation'] = v
                    return new_obj
                return obj
            if isinstance(result_json, list):
                filtered = [fix_keys(obj) for obj in result_json]
                filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                result_json = filtered[:3]
        except Exception as e:
            match = re.search(r'(\[.*\])', content, re.DOTALL)
            if match:
                json_str = match.group(1)
                try:
                    result_json = parse_ai_json(json_str)
                    def fix_keys(obj):
                        if isinstance(obj, dict):
                            new_obj = {}
                            for k, v in obj.items():
                                key = k.lower()
                                if 'score' in key:
                                    new_obj['score'] = v
                                elif 'explanation' in key or 'sxplanation' in key or 'scolanation' in key:
                                    new_obj['explanation'] = v
                            return new_obj
                        return obj
                    if isinstance(result_json, list):
                        filtered = [fix_keys(obj) for obj in result_json]
                        filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                        result_json = filtered[:3]
                    return jsonify({"result": result_json})
                except Exception as e2:
                    pass
            return jsonify({"error": "AI response could not be parsed."}), 500
        return jsonify({"result": result_json})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/api/grade-psych-frq", methods=["POST", "OPTIONS"])
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
@track_usage('psych-frq')
def grade_psych_frq():
    """Grade AP Psychology FRQ (AAQ or EBQ)"""
    import json
    data = request.json
    answers = data.get("answers", [])
    prompt_intro = data.get("prompt_intro", "")
    num_parts = len(answers)

    # Build the system prompt
    system_prompt = prompt_intro.strip()
    system_prompt += "\n\nRespond ONLY with a JSON array of objects, one per part: [{'score': 1, 'explanation': '...'}, ...] No extra text or formatting."

    # Build answer string
    answer_text = "\n".join([f"Part {chr(65 + i)}: {ans}" for i, ans in enumerate(answers)])
    
    try:
        # Use gpt-3.5-turbo for shorter responses (AAQ/EBQ are typically concise)
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": answer_text
                }
            ],
            temperature=0.2
        )
        
        content = response.choices[0].message.content
        print("OpenAI response:", content)
        
        try:
            result_json = parse_ai_json(content)
            # Repair step: fix common key typos
            def fix_keys(obj):
                if isinstance(obj, dict):
                    new_obj = {}
                    for k, v in obj.items():
                        key = k.lower()
                        if 'score' in key:
                            new_obj['score'] = v
                        elif 'explanation' in key or 'sxplanation' in key:
                            new_obj['explanation'] = v
                    return new_obj
                return obj
            
            if isinstance(result_json, list):
                filtered = [fix_keys(obj) for obj in result_json]
                filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                result_json = filtered[:num_parts]
        except Exception as e:
            print("Failed to parse AI response as JSON:", content)
            print("Exception:", e)
            # Fallback: try to extract JSON array from the response using regex
            match = re.search(r'(\[.*\])', content, re.DOTALL)
            if match:
                json_str = match.group(1)
                try:
                    result_json = parse_ai_json(json_str)
                    def fix_keys(obj):
                        if isinstance(obj, dict):
                            new_obj = {}
                            for k, v in obj.items():
                                key = k.lower()
                                if 'score' in key:
                                    new_obj['score'] = v
                                elif 'explanation' in key or 'sxplanation' in key:
                                    new_obj['explanation'] = v
                            return new_obj
                        return obj
                    if isinstance(result_json, list):
                        filtered = [fix_keys(obj) for obj in result_json]
                        filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                        result_json = filtered[:num_parts]
                    return jsonify({"result": result_json})
                except Exception as e2:
                    print("Regex fallback also failed:", e2)
            return jsonify({"error": "AI response could not be parsed."}), 500
        
        return jsonify({"result": result_json})
    except Exception as e:
        print("Error in /api/grade-psych-frq:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/api/grade-apmicro-frq", methods=["POST", "OPTIONS"])
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
@track_usage('micro-frq')
def grade_apmicro_frq():
    """Grade AP Microeconomics FRQ (Short or Long)"""
    import json
    data = request.json
    answers = data.get("answers", [])
    prompt_intro = data.get("prompt_intro", "")
    num_parts = len(answers)

    # Build the system prompt
    system_prompt = prompt_intro.strip()
    system_prompt += "\n\nRespond ONLY with a JSON array of objects, one per part: [{'score': 1, 'explanation': '...'}, ...] No extra text or formatting."

    # Build answer string
    answer_text = "\n".join([f"Part {chr(65 + i)}: {ans}" for i, ans in enumerate(answers)])
    
    try:
        # Use gpt-3.5-turbo-0125 for cost-effective grading (AP Micro FRQs are typically concise)
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": answer_text
                }
            ],
            temperature=0.2
        )
        
        content = response.choices[0].message.content
        print("OpenAI response:", content)
        
        try:
            result_json = parse_ai_json(content)
            # Repair step: fix common key typos
            def fix_keys(obj):
                if isinstance(obj, dict):
                    new_obj = {}
                    for k, v in obj.items():
                        key = k.lower()
                        if 'score' in key:
                            new_obj['score'] = v
                        elif 'explanation' in key or 'sxplanation' in key:
                            new_obj['explanation'] = v
                    return new_obj
                return obj
            
            if isinstance(result_json, list):
                filtered = [fix_keys(obj) for obj in result_json]
                filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                result_json = filtered[:num_parts]
        except Exception as e:
            print("Failed to parse AI response as JSON:", content)
            print("Exception:", e)
            # Fallback: try to extract JSON array from the response using regex
            match = re.search(r'(\[.*\])', content, re.DOTALL)
            if match:
                json_str = match.group(1)
                try:
                    result_json = parse_ai_json(json_str)
                    def fix_keys(obj):
                        if isinstance(obj, dict):
                            new_obj = {}
                            for k, v in obj.items():
                                key = k.lower()
                                if 'score' in key:
                                    new_obj['score'] = v
                                elif 'explanation' in key or 'sxplanation' in key:
                                    new_obj['explanation'] = v
                            return new_obj
                        return obj
                    if isinstance(result_json, list):
                        filtered = [fix_keys(obj) for obj in result_json]
                        filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                        result_json = filtered[:num_parts]
                    return jsonify({"result": result_json})
                except Exception as e2:
                    print("Regex fallback also failed:", e2)
            return jsonify({"error": "AI response could not be parsed."}), 500
        
        return jsonify({"result": result_json})
    except Exception as e:
        print("Error in /api/grade-apmicro-frq:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/api/grade-apmacro-frq", methods=["POST", "OPTIONS"])
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
@track_usage('macro-frq')
def grade_apmacro_frq():
    """Grade AP Macroeconomics FRQ (Short or Long)"""
    import json
    data = request.json
    answers = data.get("answers", [])
    prompt_intro = data.get("prompt_intro", "")
    num_parts = len(answers)

    # Build the system prompt
    system_prompt = prompt_intro.strip()
    system_prompt += "\n\nRespond ONLY with a JSON array of objects, one per part: [{'score': 1, 'explanation': '...'}, ...] No extra text or formatting."

    # Build answer string
    answer_text = "\n".join([f"Part {chr(65 + i)}: {ans}" for i, ans in enumerate(answers)])
    
    try:
        # Use gpt-3.5-turbo-0125 for cost-effective grading (AP Macro FRQs are typically concise)
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": answer_text
                }
            ],
            temperature=0.2
        )
        
        content = response.choices[0].message.content
        print("OpenAI response:", content)
        
        try:
            result_json = parse_ai_json(content)
            # Repair step: fix common key typos
            def fix_keys(obj):
                if isinstance(obj, dict):
                    new_obj = {}
                    for k, v in obj.items():
                        key = k.lower()
                        if 'score' in key:
                            new_obj['score'] = v
                        elif 'explanation' in key or 'sxplanation' in key:
                            new_obj['explanation'] = v
                    return new_obj
                return obj
            
            if isinstance(result_json, list):
                filtered = [fix_keys(obj) for obj in result_json]
                filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                result_json = filtered[:num_parts]
        except Exception as e:
            print("Failed to parse AI response as JSON:", content)
            print("Exception:", e)
            # Fallback: try to extract JSON array from the response using regex
            match = re.search(r'(\[.*\])', content, re.DOTALL)
            if match:
                json_str = match.group(1)
                try:
                    result_json = parse_ai_json(json_str)
                    def fix_keys(obj):
                        if isinstance(obj, dict):
                            new_obj = {}
                            for k, v in obj.items():
                                key = k.lower()
                                if 'score' in key:
                                    new_obj['score'] = v
                                elif 'explanation' in key or 'sxplanation' in key:
                                    new_obj['explanation'] = v
                            return new_obj
                        return obj
                    if isinstance(result_json, list):
                        filtered = [fix_keys(obj) for obj in result_json]
                        filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                        result_json = filtered[:num_parts]
                    return jsonify({"result": result_json})
                except Exception as e2:
                    print("Regex fallback also failed:", e2)
            return jsonify({"error": "AI response could not be parsed."}), 500
        
        return jsonify({"result": result_json})
    except Exception as e:
        print("Error in /api/grade-apmacro-frq:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/api/grade-aphug-frq", methods=["POST", "OPTIONS"])
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
@track_usage('aphug-frq')
def grade_aphug_frq():
    """Grade AP Human Geography FRQ (Concept Application, Spatial Relationships, Scale Analysis)"""
    import json
    data = request.json
    answers = data.get("answers", [])
    prompt_intro = data.get("prompt_intro", "")
    num_parts = len(answers)

    # Build the system prompt
    system_prompt = prompt_intro.strip()
    system_prompt += "\n\nRespond ONLY with a JSON array of objects, one per part: [{'score': 1, 'explanation': '...'}, ...] No extra text or formatting."

    # Build answer string
    answer_text = "\n".join([f"Part {chr(65 + i)}: {ans}" for i, ans in enumerate(answers)])
    
    try:
        # Use gpt-3.5-turbo-0125 for cost-effective grading (APHG FRQs are typically concise)
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": answer_text
                }
            ],
            temperature=0.2
        )
        
        content = response.choices[0].message.content
        print("OpenAI response:", content)
        
        try:
            result_json = parse_ai_json(content)
            # Repair step: fix common key typos
            def fix_keys(obj):
                if isinstance(obj, dict):
                    new_obj = {}
                    for k, v in obj.items():
                        key = k.lower()
                        if 'score' in key:
                            new_obj['score'] = v
                        elif 'explanation' in key or 'sxplanation' in key:
                            new_obj['explanation'] = v
                    return new_obj
                return obj
            
            if isinstance(result_json, list):
                filtered = [fix_keys(obj) for obj in result_json]
                filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                result_json = filtered[:num_parts]
        except Exception as e:
            print("Failed to parse AI response as JSON:", content)
            print("Exception:", e)
            # Fallback: try to extract JSON array from the response using regex
            match = re.search(r'(\[.*\])', content, re.DOTALL)
            if match:
                json_str = match.group(1)
                try:
                    result_json = parse_ai_json(json_str)
                    def fix_keys(obj):
                        if isinstance(obj, dict):
                            new_obj = {}
                            for k, v in obj.items():
                                key = k.lower()
                                if 'score' in key:
                                    new_obj['score'] = v
                                elif 'explanation' in key or 'sxplanation' in key:
                                    new_obj['explanation'] = v
                            return new_obj
                        return obj
                    if isinstance(result_json, list):
                        filtered = [fix_keys(obj) for obj in result_json]
                        filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                        result_json = filtered[:num_parts]
                    return jsonify({"result": result_json})
                except Exception as e2:
                    print("Regex fallback also failed:", e2)
            return jsonify({"error": "AI response could not be parsed."}), 500
        
        return jsonify({"result": result_json})
    except Exception as e:
        print("Error in /api/grade-aphug-frq:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route("/api/grade-apstat-frq", methods=["POST", "OPTIONS"])
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
@track_usage('apstat-frq')
def grade_apstat_frq():
    """Grade AP Statistics FRQ (Short FRQs)"""
    import json
    data = request.json
    answers = data.get("answers", [])
    prompt_intro = data.get("prompt_intro", "")
    num_parts = len(answers)

    # Build the system prompt
    system_prompt = prompt_intro.strip()
    system_prompt += "\n\nRespond ONLY with a JSON array of objects, one per part: [{'score': 1, 'explanation': '...'}, ...] No extra text or formatting."

    # Build answer string
    answer_text = "\n".join([f"Part {chr(65 + i) if i < 26 else f'{chr(65 + i//26 - 1)}({chr(97 + i%26)})'}: {ans}" for i, ans in enumerate(answers)])
    
    try:
        # Use gpt-3.5-turbo-0125 for cost-effective grading (AP Stats FRQs are typically concise)
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": answer_text
                }
            ],
            temperature=0.2
        )
        
        content = response.choices[0].message.content
        print("OpenAI response:", content)
        
        try:
            result_json = parse_ai_json(content)
            # Repair step: fix common key typos
            def fix_keys(obj):
                if isinstance(obj, dict):
                    new_obj = {}
                    for k, v in obj.items():
                        key = k.lower()
                        if 'score' in key:
                            new_obj['score'] = v
                        elif 'explanation' in key or 'sxplanation' in key:
                            new_obj['explanation'] = v
                    return new_obj
                return obj
            
            if isinstance(result_json, list):
                filtered = [fix_keys(obj) for obj in result_json]
                filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                result_json = filtered[:num_parts]
        except Exception as e:
            print("Failed to parse AI response as JSON:", content)
            print("Exception:", e)
            # Fallback: try to extract JSON array from the response using regex
            match = re.search(r'(\[.*\])', content, re.DOTALL)
            if match:
                json_str = match.group(1)
                try:
                    result_json = parse_ai_json(json_str)
                    def fix_keys(obj):
                        if isinstance(obj, dict):
                            new_obj = {}
                            for k, v in obj.items():
                                key = k.lower()
                                if 'score' in key:
                                    new_obj['score'] = v
                                elif 'explanation' in key or 'sxplanation' in key:
                                    new_obj['explanation'] = v
                            return new_obj
                        return obj
                    if isinstance(result_json, list):
                        filtered = [fix_keys(obj) for obj in result_json]
                        filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                        result_json = filtered[:num_parts]
                    return jsonify({"result": result_json})
                except Exception as e2:
                    print("Regex fallback also failed:", e2)
            return jsonify({"error": "AI response could not be parsed."}), 500
        
        return jsonify({"result": result_json})
    except Exception as e:
        print("Error in /api/grade-apstat-frq:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

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
    """Grade AP Biology FRQ (Short or Long)"""
    import json
    data = request.json
    answers = data.get("answers", [])
    prompt_intro = data.get("prompt_intro", "")
    num_parts = len(answers)

    # Build the system prompt
    system_prompt = prompt_intro.strip()
    system_prompt += "\n\nRespond ONLY with a JSON array of objects, one per part: [{'score': 1, 'explanation': '...'}, ...] No extra text or formatting."

    # Build answer string - simpler approach for part labels
    part_labels = []
    for i in range(num_parts):
        if num_parts <= 4:
            # Short FRQ: A, B, C, D
            part_labels.append(chr(65 + i))
        else:
            # Long FRQ: A, B(i), B(ii), B(iii), C(i), C(ii), C(iii), D(i), D(ii)
            if i == 0:
                part_labels.append('A')
            elif 1 <= i <= 3:
                part_labels.append(f"B({'i' * (i)})")
            elif 4 <= i <= 6:
                part_labels.append(f"C({'i' * (i - 3)})")
            else:
                part_labels.append(f"D({'i' * (i - 6)})")
    
    answer_text = "\n".join([f"Part {part_labels[i]}: {ans}" for i, ans in enumerate(answers)])
    
    try:
        # Use gpt-3.5-turbo for shorter responses (4 parts), gpt-4o-mini for longer (9 parts)
        model = "gpt-3.5-turbo-0125" if num_parts <= 4 else "gpt-4o-mini"
        response = openai.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": answer_text
                }
            ],
            temperature=0.2
        )
        
        content = response.choices[0].message.content
        print("OpenAI response:", content)
        
        try:
            result_json = parse_ai_json(content)
            # Repair step: fix common key typos
            def fix_keys(obj):
                if isinstance(obj, dict):
                    new_obj = {}
                    for k, v in obj.items():
                        key = k.lower()
                        if 'score' in key:
                            new_obj['score'] = v
                        elif 'explanation' in key or 'sxplanation' in key:
                            new_obj['explanation'] = v
                    return new_obj
                return obj
            
            if isinstance(result_json, list):
                filtered = [fix_keys(obj) for obj in result_json]
                filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                result_json = filtered[:num_parts]
        except Exception as e:
            print("Failed to parse AI response as JSON:", content)
            print("Exception:", e)
            # Fallback: try to extract JSON array from the response using regex
            match = re.search(r'(\[.*\])', content, re.DOTALL)
            if match:
                json_str = match.group(1)
                try:
                    result_json = parse_ai_json(json_str)
                    def fix_keys(obj):
                        if isinstance(obj, dict):
                            new_obj = {}
                            for k, v in obj.items():
                                key = k.lower()
                                if 'score' in key:
                                    new_obj['score'] = v
                                elif 'explanation' in key or 'sxplanation' in key:
                                    new_obj['explanation'] = v
                            return new_obj
                        return obj
                    if isinstance(result_json, list):
                        filtered = [fix_keys(obj) for obj in result_json]
                        filtered = [obj for obj in filtered if 'score' in obj and 'explanation' in obj]
                        result_json = filtered[:num_parts]
                    return jsonify({"result": result_json})
                except Exception as e2:
                    print("Regex fallback also failed:", e2)
            return jsonify({"error": "AI response could not be parsed."}), 500
        
        return jsonify({"result": result_json})
    except Exception as e:
        print("Error in /api/grade-apbio-frq:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# Progress tracking system - persistent storage
USER_PROGRESS_FILE = "socratic_progress.json"

def load_user_progress():
    """Load user progress data from file"""
    try:
        if os.path.exists(USER_PROGRESS_FILE):
            with open(USER_PROGRESS_FILE, 'r') as f:
                return json.load(f)
    except Exception as e:
        print(f"Error loading progress data: {e}")
    return {}

def save_user_progress(data):
    """Save user progress data to file"""
    try:
        with open(USER_PROGRESS_FILE, 'w') as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error saving progress data: {e}")

def load_study_guide_content(unit, course=None):
    """Load comprehensive study guide content for all APUSH units"""
    try:
        # Normalize unit format - handle both "Unit 1" and "unit1" formats
        if unit and isinstance(unit, str):
            # Convert "Unit 1", "UNIT 1", "Unit1", etc. to "unit1"
            unit = unit.lower()
            if "unit " in unit:
                unit = unit.replace(" ", "")
            elif unit.startswith("unit") and not unit.startswith("unit"):
                # Handle edge cases
                pass
        
        # Comprehensive content for all 9 APUSH units
        all_units_content = {
            'unit1': {
                'overview': """
                Unit 1 (1491-1607) covers encounters between Native American societies and European explorers/colonizers. 
                Key themes: diversity of pre-Columbian societies, European motivations (economic, religious, political), 
                Spanish colonization impact, biological/cultural exchanges, early English colonization attempts.
                """,
                'sections': {
                    'cahokia_details': {
                        'title': 'Cahokia and Pre-Columbian Civilizations',
                        'key_facts': ["Cahokia: Population 10,000-20,000 at peak (larger than London), sophisticated urban planning, mound builders, complex agricultural system, major trade hub"]
                    },
                    'tenochtitlan_details': {
                        'title': 'Aztec Empire and Tenochtitlan',
                        'key_facts': ["Tenochtitlan: Aztec capital 200,000+ inhabitants, floating gardens (chinampas), sophisticated aqueducts and causeways, imperial tribute system"]
                    },
                    'three_sisters': {
                        'title': 'Native American Agriculture',
                        'key_facts': ["Three Sisters agriculture: corn provides stalk for beans, beans fix nitrogen for corn and squash, squash leaves provide ground cover - sophisticated agricultural knowledge"]
                    },
                    'european_tech': {
                        'title': 'European Technological Advantages',
                        'key_facts': ["European technological advantages: steel weapons, horses, gunpowder weapons, navigational tools (compass, astrolabe), sailing ships (caravels)"]
                    },
                    'disease_impact': {
                        'title': 'Disease and Demographic Catastrophe',
                        'key_facts': ["Disease devastation: Native Americans had no immunity to Old World diseases (smallpox, measles, typhus), 90%+ population decline, demographic catastrophe"]
                    },
                    'encomienda_system': {
                        'title': 'Spanish Labor Systems',
                        'key_facts': ["Encomienda: Spanish labor system granting colonists control over Native labor and tribute, led to exploitation and cultural destruction"]
                    }
                }
            },
            'unit2': {
                'overview': """
                Unit 2 (1607-1754) covers colonial America development. Key themes: colonial regions (New England, Middle, Southern), 
                economic systems, labor (indentured servants, slavery), colonial society, transatlantic trade, early self-governance.
                """,
                'sections': {
                    'jamestown': {
                        'title': 'Jamestown and Early Virginia',
                        'key_facts': ["Jamestown (1607): First permanent English settlement, joint-stock company funding, tobacco cultivation saved colony, John Smith leadership"]
                    },
                    'plymouth': {
                        'title': 'Plymouth and the Pilgrims',
                        'key_facts': ["Plymouth (1620): Mayflower Compact, Pilgrims seeking religious freedom, William Bradford leadership, peaceful Native relations initially"]
                    },
                    'massachusetts_bay': {
                        'title': 'Massachusetts Bay Colony',
                        'key_facts': ["Massachusetts Bay Colony (1630): 'City upon a Hill' vision, John Winthrop, Puritan theocracy, Great Migration of 20,000 Puritans"]
                    },
                    'tobacco_economy': {
                        'title': 'Tobacco and Southern Economy',
                        'key_facts': ["Tobacco economy: 'Brown gold,' labor-intensive cultivation, indentured servants initially, shift to enslaved African labor"]
                    },
                    'triangle_trade': {
                        'title': 'Atlantic Trade Networks',
                        'key_facts': ["Triangular Trade: Europe to Africa (manufactured goods), Africa to Americas (enslaved people), Americas to Europe (raw materials)"]
                    },
                    'great_awakening': {
                        'title': 'The Great Awakening',
                        'key_facts': ["Great Awakening (1730s-1740s): Religious revival, emotional preaching, challenged traditional authority, George Whitefield and Jonathan Edwards"]
                    }
                }
            },
            'unit3': {
                'overview': """
                Unit 3 (1754-1800) covers imperial conflicts, Revolution, and early republic. Key themes: French and Indian War, 
                taxation without representation, Declaration of Independence, Revolutionary War, Articles of Confederation, Constitution.
                """,
                'sections': {
                    'seven_years_war': {
                        'title': 'Seven Years War and Imperial Crisis',
                        'key_facts': ["Seven Years' War/French and Indian War (1754-1763): Global conflict, British victory, massive war debt, end of salutary neglect"]
                    },
                    'stamp_act': {
                        'title': 'Taxation and Colonial Resistance',
                        'key_facts': ["Stamp Act (1765): First direct tax on colonists, 'No taxation without representation,' Sons of Liberty resistance, repealed 1766"]
                    },
                    'boston_massacre': {
                        'title': 'Boston Massacre and Rising Tensions',
                        'key_facts': ["Boston Massacre (1770): British soldiers killed 5 colonists, propaganda tool, Crispus Attucks first casualty"]
                    },
                    'declaration_independence': {
                        'title': 'Declaration of Independence',
                        'key_facts': ["Declaration of Independence (1776): Thomas Jefferson author, natural rights philosophy, list of grievances, proclaimed equality"]
                    },
                    'revolutionary_war': {
                        'title': 'The Revolutionary War',
                        'key_facts': ["Revolutionary War: Continental Army, foreign alliances (France), guerrilla tactics, Yorktown victory (1781)"]
                    },
                    'articles_confederation': {
                        'title': 'Articles of Confederation',
                        'key_facts': ["Articles of Confederation: Weak central government, no taxation power, no executive, Shays' Rebellion exposed weaknesses"]
                    }
                }
            },
            'unit4': {
                'overview': """
                Unit 4 (1800-1848) covers territorial expansion and reform movements. Key themes: Jeffersonian democracy, 
                War of 1812, nationalism, westward expansion, Market Revolution, reform movements, sectional tensions.
                """,
                'sections': {
                    'louisiana_purchase': {
                        'title': 'Louisiana Purchase and Expansion',
                        'key_facts': ["Louisiana Purchase (1803): Doubled nation's size, $15 million, constitutional questions, Lewis & Clark expedition"]
                    },
                    'war_1812': {
                        'title': 'War of 1812',
                        'key_facts': ["War of 1812: 'Second War of Independence,' British impressment, Battle of New Orleans, Hartford Convention, national unity"]
                    },
                    'market_revolution': {
                        'title': 'The Market Revolution',
                        'key_facts': ["Market Revolution: Transportation revolution (canals, railroads), factory system, cash crop agriculture, urbanization"]
                    },
                    'manifest_destiny': {
                        'title': 'Manifest Destiny',
                        'key_facts': ["Manifest Destiny: Belief in westward expansion destiny, Mexican-American War, Treaty of Guadalupe Hidalgo, California Gold Rush"]
                    },
                    'jackson_democracy': {
                        'title': 'Jacksonian Democracy',
                        'key_facts': ["Jacksonian Democracy: Common man politics, spoils system, opposition to Bank of US, Indian Removal Act"]
                    },
                    'abolition_movement': {
                        'title': 'Reform Movements',
                        'key_facts': ["Abolition Movement: William Lloyd Garrison, Frederick Douglass, Underground Railroad, moral arguments against slavery"]
                    }
                }
            },
            'unit5': {
                'overview': """
                Unit 5 (1844-1877) covers sectional conflict, Civil War, and Reconstruction. Key themes: slavery expansion debates, 
                Compromise of 1850, Kansas-Nebraska Act, Republican Party, Lincoln, Civil War, emancipation, Reconstruction policies.
                """,
                'sections': {
                    'compromise_1850': {
                        'title': 'Compromise of 1850',
                        'key_facts': ["Compromise of 1850: California free state, stronger Fugitive Slave Act, Utah/New Mexico popular sovereignty, delayed crisis"]
                    },
                    'kansas_nebraska': {
                        'title': 'Kansas-Nebraska Act and Bleeding Kansas',
                        'key_facts': ["Kansas-Nebraska Act (1854): Popular sovereignty, repealed Missouri Compromise, 'Bleeding Kansas' violence"]
                    },
                    'republican_party': {
                        'title': 'Republican Party Formation',
                        'key_facts': ["Republican Party formation (1854): Opposition to slavery expansion, 'Free Soil, Free Labor, Free Men'"]
                    },
                    'lincoln_douglas': {
                        'title': 'Lincoln-Douglas Debates',
                        'key_facts': ["Lincoln-Douglas Debates (1858): 'House divided' speech, Freeport Doctrine, slavery expansion central issue"]
                    },
                    'civil_war': {
                        'title': 'The Civil War',
                        'key_facts': ["Civil War (1861-1865): Union advantages, Emancipation Proclamation (1863), total war strategy, Appomattox surrender"]
                    },
                    'reconstruction': {
                        'title': 'Reconstruction Era',
                        'key_facts': ["Reconstruction: Lincoln's 10% Plan, Radical Republican policies, 13th, 14th, 15th Amendments, Jim Crow response"]
                    }
                }
            },
            'unit6': {
                'overview': """
                Unit 6 (1865-1898) covers industrialization and Gilded Age. Key themes: transcontinental railroad, 
                industrialization, immigration, urbanization, labor movements, political corruption, agrarian discontent.
                """,
                'sections': {
                    'transcontinental_railroad': {
                        'title': 'Transcontinental Railroad',
                        'key_facts': ["Transcontinental Railroad (1869): Linked Atlantic and Pacific, Chinese and Irish labor, government subsidies, transformed economy"]
                    },
                    'new_immigration': {
                        'title': 'New Immigration',
                        'key_facts': ["New Immigration: Southern and Eastern Europeans, religious and cultural differences, nativism, Chinese Exclusion Act"]
                    },
                    'industrial_growth': {
                        'title': 'Industrial Growth and Robber Barons',
                        'key_facts': ["Industrial Growth: Steel (Carnegie), oil (Rockefeller), electricity (Edison), assembly line production"]
                    },
                    'labor_movements': {
                        'title': 'Labor Movements',
                        'key_facts': ["Labor Movements: Knights of Labor, American Federation of Labor, Great Railroad Strike (1877), Haymarket Affair (1886)"]
                    },
                    'populist_movement': {
                        'title': 'Populist Movement',
                        'key_facts': ["Populist Movement: Farmers' Alliance, William Jennings Bryan, free silver, income tax, direct election of senators"]
                    },
                    'closing_frontier': {
                        'title': 'Closing of the Frontier',
                        'key_facts': ["Closing of Frontier: Census 1890, Turner's Frontier Thesis, last Indian wars, cattle industry boom"]
                    }
                }
            },
            'unit7': {
                'overview': """
                Unit 7 (1890-1945) covers Progressive Era, imperialism, WWI, 1920s, Depression, New Deal, WWII. 
                Key themes: reform movements, overseas expansion, wartime changes, economic boom/bust, federal power expansion.
                """,
                'sections': {
                    'progressive_reforms': {
                        'title': 'Progressive Era Reforms',
                        'key_facts': ["Progressive Reforms: Muckrakers, trust-busting, consumer protection, conservation, direct democracy reforms"]
                    },
                    'spanish_american_war': {
                        'title': 'Spanish-American War and Imperialism',
                        'key_facts': ["Spanish-American War (1898): USS Maine, 'Splendid Little War,' Treaty of Paris, Philippines debate"]
                    },
                    'world_war_one': {
                        'title': 'World War I',
                        'key_facts': ["World War I: Neutrality to intervention, submarine warfare, Zimmermann Telegram, 'make world safe for democracy'"]
                    },
                    'twenties_culture': {
                        'title': 'The Roaring Twenties',
                        'key_facts': ["1920s Culture: Roaring Twenties, consumerism, radio, movies, Harlem Renaissance, fundamentalism vs modernism"]
                    },
                    'great_depression': {
                        'title': 'The Great Depression',
                        'key_facts': ["Great Depression: Stock Market Crash (1929), bank failures, unemployment 25%, Dust Bowl migration"]
                    },
                    'world_war_two': {
                        'title': 'World War II',
                        'key_facts': ["World War II: Pearl Harbor, Arsenal of Democracy, D-Day, Holocaust, atomic bombs, emergence as superpower"]
                    }
                }
            },
            'unit8': {
                'overview': """
                Unit 8 (1945-1980) covers Cold War era. Key themes: containment, civil rights movement, 
                Great Society, Vietnam War, counterculture, women's rights, environmental movement, conservative backlash.
                """,
                'sections': {
                    'cold_war_origins': {
                        'title': 'Cold War Origins',
                        'key_facts': ["Cold War Origins: Iron Curtain, Truman Doctrine, Marshall Plan, NATO formation, nuclear arms race"]
                    },
                    'civil_rights_movement': {
                        'title': 'Civil Rights Movement',
                        'key_facts': ["Civil Rights Movement: Brown v. Board, Montgomery Bus Boycott, MLK Jr., Freedom Rides, Civil Rights Act (1964)"]
                    },
                    'great_society': {
                        'title': 'Great Society Programs',
                        'key_facts': ["Great Society: LBJ's domestic program, War on Poverty, Medicare/Medicaid, immigration reform"]
                    },
                    'vietnam_war': {
                        'title': 'Vietnam War',
                        'key_facts': ["Vietnam War: Gulf of Tonkin, escalation, My Lai Massacre, antiwar protests, Pentagon Papers"]
                    },
                    'counterculture': {
                        'title': '1960s Counterculture',
                        'key_facts': ["1960s Counterculture: Youth rebellion, hippies, Woodstock, drug culture, generation gap"]
                    },
                    'womens_liberation': {
                        'title': 'Women\'s Liberation Movement',
                        'key_facts': ["Women's Liberation: Betty Friedan, NOW, ERA campaign, Roe v. Wade, workplace equality"]
                    }
                }
            },
            'unit9': {
                'overview': """
                Unit 9 (1980-present) covers recent America. Key themes: conservative resurgence, end of Cold War, 
                technological revolution, globalization, 9/11, political polarization, economic changes, demographic shifts.
                """,
                'sections': {
                    'reagan_revolution': {
                        'title': 'Reagan Revolution',
                        'key_facts': ["Reagan Revolution: Conservative coalition, supply-side economics, deregulation, military buildup, moral majority"]
                    },
                    'cold_war_end': {
                        'title': 'End of the Cold War',
                        'key_facts': ["End of Cold War: Reagan-Gorbachev summits, Berlin Wall fall (1989), Soviet Union collapse (1991)"]
                    },
                    'technology_boom': {
                        'title': 'Technology Revolution',
                        'key_facts': ["Technology Revolution: Personal computers, internet, dot-com boom and bust, social media transformation"]
                    },
                    'nine_eleven': {
                        'title': 'September 11 and War on Terror',
                        'key_facts': ["September 11, 2001: Terrorist attacks, War on Terror, Patriot Act, Afghanistan and Iraq Wars"]
                    },
                    'obama_presidency': {
                        'title': 'Obama Era',
                        'key_facts': ["Obama Era: First African American president, Affordable Care Act, 2008 financial crisis, Tea Party response"]
                    },
                    'political_polarization': {
                        'title': 'Political Polarization',
                        'key_facts': ["Political Polarization: Red states vs blue states, partisan media, congressional gridlock, culture wars"]
                    }
                }
            }
        }
        
        # AP Government units content
        apgov_units_content = {
            'unit1': {
                'overview': """
                Unit 1: Foundations of American Democracy covers the constitutional framework, federalism, and separation of powers.
                Key themes: Enlightenment ideals, Articles of Confederation weaknesses, Constitutional Convention, 
                federalism, separation of powers, checks and balances, Bill of Rights.
                """,
                'sections': {
                    'enlightenment_ideals': {
                        'title': 'Enlightenment Ideas and Democracy',
                        'key_facts': ["Natural rights (Locke): Life, liberty, property", "Social contract theory", "Popular sovereignty", "Limited government", "Separation of powers (Montesquieu)"]
                    },
                    'articles_confederation': {
                        'title': 'Articles of Confederation',
                        'key_facts': ["Weak central government", "No executive branch", "No national judiciary", "No power to tax", "Unanimous consent for amendments", "Shays' Rebellion highlighted weaknesses"]
                    },
                    'constitutional_convention': {
                        'title': 'Constitutional Convention',
                        'key_facts': ["Philadelphia 1787", "Virginia Plan vs New Jersey Plan", "Great Compromise", "Three-Fifths Compromise", "Commerce Compromise", "Federalists vs Anti-Federalists"]
                    },
                    'federalism': {
                        'title': 'Federalism',
                        'key_facts': ["Division of power between national and state governments", "Dual federalism", "Cooperative federalism", "Devolution", "Unfunded mandates", "Supremacy Clause"]
                    },
                    'separation_powers': {
                        'title': 'Separation of Powers and Checks and Balances',
                        'key_facts': ["Legislative, Executive, Judicial branches", "Checks and balances prevent abuse", "Presidential veto", "Congressional override", "Judicial review", "Senate confirmation"]
                    },
                    'bill_of_rights': {
                        'title': 'Bill of Rights and Individual Liberties',
                        'key_facts': ["First 10 amendments", "Protection of individual rights", "Federalist promise to Anti-Federalists", "Freedom of speech, religion, press", "Due process", "States' rights (10th Amendment)"]
                    }
                }
            },
            'unit2': {
                'overview': """
                Unit 2: Interactions Among Branches of Government covers the structure, powers, and relationships 
                between Congress, the presidency, federal courts, and bureaucracy.
                """,
                'sections': {
                    'congress_structure': {
                        'title': 'Congressional Structure and Powers',
                        'key_facts': ["Bicameral legislature", "House: 435 members, 2-year terms", "Senate: 100 members, 6-year terms", "Enumerated powers (Article I, Section 8)", "Necessary and Proper Clause", "Power of the purse"]
                    },
                    'congressional_elections': {
                        'title': 'Congressional Elections and Representation',
                        'key_facts': ["Single-member districts", "Redistricting and gerrymandering", "Incumbent advantage", "Candidate recruitment", "Campaign finance", "Voter turnout in midterms"]
                    },
                    'presidency': {
                        'title': 'The Presidency',
                        'key_facts': ["Chief Executive", "Commander in Chief", "Chief Diplomat", "Legislative leader", "Head of State", "Executive orders", "Executive agreements", "Signing statements"]
                    },
                    'federal_bureaucracy': {
                        'title': 'Federal Bureaucracy',
                        'key_facts': ["Implementation of policy", "Rule-making authority", "Independent agencies", "Cabinet departments", "Regulatory agencies", "Iron triangles", "Issue networks"]
                    },
                    'federal_courts': {
                        'title': 'Federal Court System',
                        'key_facts': ["Supreme Court", "Courts of Appeals", "District Courts", "Judicial review", "Life tenure", "Judicial restraint vs activism", "Precedent (stare decisis)"]
                    },
                    'inter_branch_relations': {
                        'title': 'Inter-branch Relations',
                        'key_facts': ["Presidential-Congressional relations", "Divided government", "Executive privilege", "Congressional oversight", "Impeachment", "Confirmation process"]
                    }
                }
            },
            'unit3': {
                'overview': """
                Unit 3: Civil Liberties and Civil Rights examines individual freedoms protected by the Constitution 
                and how these rights have expanded through legislation and court decisions.
                """,
                'sections': {
                    'first_amendment': {
                        'title': 'First Amendment Freedoms',
                        'key_facts': ["Freedom of religion (Establishment and Free Exercise)", "Freedom of speech and press", "Freedom of assembly and petition", "Prior restraint", "Clear and present danger test", "Symbolic speech"]
                    },
                    'second_amendment': {
                        'title': 'Second Amendment and Gun Rights',
                        'key_facts': ["Right to bear arms", "Individual vs collective rights debate", "District of Columbia v. Heller (2008)", "McDonald v. Chicago (2010)", "State vs federal gun laws"]
                    },
                    'criminal_justice': {
                        'title': 'Criminal Justice and Due Process',
                        'key_facts': ["Fourth Amendment (searches and seizures)", "Fifth Amendment (self-incrimination, double jeopardy)", "Sixth Amendment (right to counsel, jury trial)", "Eighth Amendment (cruel and unusual punishment)", "Miranda rights"]
                    },
                    'civil_rights_movement': {
                        'title': 'Civil Rights Movement',
                        'key_facts': ["Brown v. Board of Education (1954)", "Civil Rights Act of 1964", "Voting Rights Act of 1965", "Martin Luther King Jr.", "Nonviolent resistance", "Federal enforcement"]
                    },
                    'equal_protection': {
                        'title': 'Equal Protection and Discrimination',
                        'key_facts': ["14th Amendment Equal Protection Clause", "Levels of scrutiny", "Gender discrimination", "LGBTQ+ rights", "Disability rights", "Age discrimination"]
                    },
                    'affirmative_action': {
                        'title': 'Affirmative Action',
                        'key_facts': ["Regents of University of California v. Bakke (1978)", "Diversity as compelling interest", "Strict scrutiny standard", "Recent Supreme Court decisions", "Race-conscious policies debate"]
                    }
                }
            },
            'unit4': {
                'overview': """
                Unit 4: Political Ideologies and Beliefs examines American political culture, public opinion formation,
                ideologies, and how citizens develop their political beliefs.
                """,
                'sections': {
                    'political_culture': {
                        'title': 'American Political Culture',
                        'key_facts': ["Liberty, equality, democracy", "Individualism", "Rule of law", "Limited government", "American Dream", "Civic duty and participation"]
                    },
                    'political_socialization': {
                        'title': 'Political Socialization',
                        'key_facts': ["Family influence", "Education", "Peer groups", "Media", "Major events", "Generational effects", "Life cycle effects"]
                    },
                    'public_opinion': {
                        'title': 'Public Opinion and Polling',
                        'key_facts': ["Scientific polling", "Sample size and margin of error", "Random sampling", "Question wording effects", "Push polls", "Exit polls", "Tracking polls"]
                    },
                    'political_ideologies': {
                        'title': 'Political Ideologies',
                        'key_facts': ["Liberalism vs Conservatism", "Role of government", "Economic policy differences", "Social issues", "Libertarianism", "Populism", "Moderate positions"]
                    },
                    'party_identification': {
                        'title': 'Party Identification and Voting Behavior',
                        'key_facts': ["Strong vs weak partisans", "Independent voters", "Split-ticket voting", "Straight-ticket voting", "Issue voting", "Retrospective vs prospective voting"]
                    },
                    'demographic_groups': {
                        'title': 'Demographic Groups and Political Beliefs',
                        'key_facts': ["Gender gap", "Racial and ethnic differences", "Religious differences", "Age cohorts", "Educational attainment", "Geographic differences", "Income levels"]
                    }
                }
            },
            'unit5': {
                'overview': """
                Unit 5: Political Participation examines how citizens participate in democracy through voting,
                campaigns, elections, political parties, interest groups, and media.
                """,
                'sections': {
                    'voting_rights': {
                        'title': 'Voting Rights and Suffrage',
                        'key_facts': ["15th Amendment (race)", "19th Amendment (gender)", "24th Amendment (poll tax)", "26th Amendment (age 18)", "Voting Rights Act of 1965", "Motor Voter Act"]
                    },
                    'voter_turnout': {
                        'title': 'Voter Turnout and Participation',
                        'key_facts': ["Presidential vs midterm elections", "Socioeconomic factors", "Age and turnout", "Education levels", "Registration requirements", "Early voting", "Absentee voting"]
                    },
                    'elections_campaigns': {
                        'title': 'Elections and Campaigns',
                        'key_facts': ["Primary elections", "General elections", "Electoral College", "Campaign finance", "Political Action Committees (PACs)", "Super PACs", "Hard vs soft money"]
                    },
                    'political_parties': {
                        'title': 'Political Parties',
                        'key_facts': ["Two-party system", "Party functions", "Party organization", "Party in government", "Party in electorate", "Realignment", "Dealignment"]
                    },
                    'interest_groups': {
                        'title': 'Interest Groups and Lobbying',
                        'key_facts': ["Pluralism", "Types of interest groups", "Lobbying strategies", "Grassroots vs grasstops", "Iron triangles", "Issue networks", "Revolving door"]
                    },
                    'media_politics': {
                        'title': 'Media and Politics',
                        'key_facts': ["Traditional vs new media", "Media bias", "Agenda setting", "Priming and framing", "Horse race coverage", "Social media impact", "Echo chambers"]
                    }
                }
            }
        }
        
        # Determine which content to return based on course context or unit prefix
        if course == 'apgov' or unit.startswith('apgov') or unit.startswith('gov'):
            # Handle AP Gov units
            gov_unit = unit.replace('apgov', '').replace('gov', '')
            if not gov_unit.startswith('unit'):
                gov_unit = 'unit' + gov_unit
            return apgov_units_content.get(gov_unit, {})
        else:
            # Default to APUSH content
            return all_units_content.get(unit, {})
        
    except Exception as e:
        print(f"Could not load study guide content for {unit}: {e}")
        return {}

# Unit Topics API endpoint for Socratic chat
@app.route("/api/unit-topics", methods=["GET", "OPTIONS"])
@cross_origin(origins=[
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://127.0.0.1:5173",
    "https://cloudybm05.github.io",
    "https://aphelper.tech",
    "https://www.aphelper.tech",
    "https://ap-helper-2d9f117e9bdb.herokuapp.com"
], supports_credentials=True, methods=["GET", "POST", "OPTIONS"], allow_headers="*")
def get_unit_topics_api():
    course = request.args.get("course")
    unit = request.args.get("unit")
    
    if not course or not unit:
        return jsonify({"error": "Course and unit parameters are required"}), 400
    
    try:
        # Define topics for each course and unit
        topics_data = {}
        
        if course == "apush":
            topics_data = {
                "unit1": {
                    "unit": "unit1",
                    "course": "apush", 
                    "overview": "This unit covers the period when two different worlds first met. Before 1492, Native Americans had developed amazing civilizations - cities, agriculture, trade networks. Europeans were just discovering the Americas existed! This collision changed everything.",
                    "topics": [
                        {
                            "key": "nativeAmericans",
                            "title": "Pre-Columbian Native American Societies",
                            "keyFacts": [
                                "Diverse societies with complex political, economic, and social structures",
                                "Major civilizations: Aztec Empire, Inca Empire, Maya civilization", 
                                "Cahokia: Population of 10,000-20,000 (larger than London at the time)",
                                "Tenochtitlan: Aztec capital with 200,000+ inhabitants",
                                "Agricultural innovations: Three Sisters crops (corn, beans, squash)"
                            ]
                        },
                        {
                            "key": "europeanMotivations",
                            "title": "European Motivations for Exploration",
                            "keyFacts": [
                                "God, Gold, and Glory - the three main motivations",
                                "Economic: Desire for Asian spices, search for water route to Asia",
                                "Religious: Spread Christianity, Counter-Reformation zeal",
                                "Political: Nation-building, competition between European powers",
                                "Technological advances: Improved navigation, better ships"
                            ]
                        },
                        {
                            "key": "spanishColonization", 
                            "title": "Spanish Colonization and Conquest",
                            "keyFacts": [
                                "Conquistadors: Cortés conquered Aztecs (1519-1521), Pizarro conquered Incas (1532)",
                                "Encomienda system: Forced Native American labor",
                                "Superior technology: Horses, steel weapons, gunpowder",
                                "Disease impact: European diseases killed about 90% of Native Americans",
                                "Cultural assimilation and religious conversion efforts"
                            ]
                        },
                        {
                            "key": "columbianExchange",
                            "title": "The Columbian Exchange",
                            "keyFacts": [
                                "Biological exchange: Crops, animals, diseases between continents",
                                "Old World to New World: Horses, cattle, pigs, wheat, diseases",
                                "New World to Old World: Corn, potatoes, tomatoes, tobacco",
                                "Demographic catastrophe: Native population declined by 90%",
                                "Environmental transformation of both worlds"
                            ]
                        },
                        {
                            "key": "earlyEnglishColonization",
                            "title": "Early English Colonization Attempts", 
                            "keyFacts": [
                                "Roanoke: The 'Lost Colony' (1587) - first English attempt",
                                "Joint-stock companies: Virginia Company founded Jamestown (1607)",
                                "Challenges: Hostile environment, conflicts with natives, starvation",
                                "Economic motivations: Search for gold, trade opportunities",
                                "Competition with Spanish colonial empire"
                            ]
                        }
                    ]
                },
                "unit2": {
                    "unit": "unit2",
                    "course": "apush",
                    "overview": "The early republic period saw the United States establishing its identity through political, economic, and social changes. From Jeffersonian democracy to westward expansion, this era shaped modern America.",
                    "topics": [
                        {
                            "key": "jeffersonianDemocracy",
                            "title": "Jeffersonian Democracy and Republican Ideals",
                            "keyFacts": [
                                "Strict constitutional interpretation vs. loose interpretation",
                                "Agrarian vision vs. industrial development",
                                "States' rights vs. federal power",
                                "Louisiana Purchase (1803) doubled the nation's size",
                                "Emphasis on individual liberty and limited government"
                            ]
                        },
                        {
                            "key": "warOf1812",
                            "title": "War of 1812 and National Identity",
                            "keyFacts": [
                                "Causes: British impressment, trade restrictions, War Hawks",
                                "Key battles: Battle of New Orleans, burning of Washington D.C.",
                                "Results: Increased nationalism, 'Era of Good Feelings'",
                                "End of Federalist Party",
                                "Native American resistance ended in the Northwest"
                            ]
                        },
                        {
                            "key": "marketRevolution",
                            "title": "Market Revolution and Economic Change",
                            "keyFacts": [
                                "Transportation revolution: Canals, roads, railroads",
                                "Industrial development in the Northeast", 
                                "Agricultural commercialization in the South and West",
                                "Rise of wage labor and factory system",
                                "Growth of cities and urbanization"
                            ]
                        },
                        {
                            "key": "westwardExpansion",
                            "title": "Westward Expansion and Manifest Destiny",
                            "keyFacts": [
                                "Indian Removal Act (1830) and Trail of Tears",
                                "Texas annexation and Mexican-American War",
                                "California Gold Rush (1849)",
                                "Oregon Trail and westward migration",
                                "Conflict over slavery in new territories"
                            ]
                        },
                        {
                            "key": "reformMovements",
                            "title": "Reform Movements and Social Change",
                            "keyFacts": [
                                "Second Great Awakening and religious revival",
                                "Abolitionist movement: Garrison, Douglass, Underground Railroad",
                                "Women's rights: Seneca Falls Convention (1848)",
                                "Temperance movement against alcohol consumption",
                                "Educational reform and public school movement"
                            ]
                        }
                    ]
                }
                # Add more APUSH units as needed
            }
        elif course == "apgov":
            topics_data = {
                "unit1": {
                    "unit": "unit1", 
                    "course": "apgov",
                    "overview": "The foundations of American democracy, from Enlightenment ideals through the Constitution and Bill of Rights. This unit explores how the founders designed a system of limited government with checks and balances.",
                    "topics": [
                        {
                            "key": "enlightenmentIdeals",
                            "title": "Enlightenment Ideals and Democratic Theory",
                            "keyFacts": [
                                "Natural rights: Life, liberty, and property (Locke)",
                                "Social contract theory and consent of the governed", 
                                "Separation of powers (Montesquieu)",
                                "Popular sovereignty and majority rule",
                                "Individual rights vs. government power"
                            ]
                        },
                        {
                            "key": "articlesOfConfederation",
                            "title": "Articles of Confederation and Early Challenges",
                            "keyFacts": [
                                "Weak central government by design",
                                "No executive branch or federal court system",
                                "Difficulty raising revenue and regulating commerce",
                                "Shays' Rebellion highlighted weaknesses", 
                                "Need for stronger union became apparent"
                            ]
                        },
                        {
                            "key": "constitutionalConvention",
                            "title": "Constitutional Convention and Compromises",
                            "keyFacts": [
                                "Great Compromise: Bicameral legislature",
                                "Three-Fifths Compromise on slavery representation",
                                "Electoral College system for president",
                                "Federalists vs. Anti-Federalists debate",
                                "Ratification process and The Federalist Papers"
                            ]
                        },
                        {
                            "key": "federalism",
                            "title": "Federalism and Division of Powers",
                            "keyFacts": [
                                "Enumerated, implied, and concurrent powers",
                                "Supremacy Clause and federal preemption",
                                "Reserved powers to states (10th Amendment)",
                                "Necessary and Proper Clause",
                                "Evolution from dual to cooperative federalism"
                            ]
                        },
                        {
                            "key": "billOfRights",
                            "title": "Bill of Rights and Individual Liberties",
                            "keyFacts": [
                                "First ten amendments to the Constitution",
                                "Protection of individual rights from government",
                                "First Amendment: Religion, speech, press, assembly",
                                "Due process rights and criminal justice protections",
                                "Incorporation doctrine and application to states"
                            ]
                        }
                    ]
                }
                # Add more AP Gov units as needed
            }
        elif course == "apmicro":
            topics_data = {
                "unit1": {
                    "unit": "unit1",
                    "course": "apmicro",
                    "overview": "This unit introduces fundamental economic concepts including scarcity, opportunity cost, and the basic economic problem. Students learn how individuals and societies make choices when resources are limited.",
                    "topics": [
                        {
                            "key": "scarcityChoice",
                            "title": "Scarcity and Choice",
                            "keyFacts": [
                                "Scarcity forces individuals and societies to make choices",
                                "Opportunity cost is the next best alternative forgone",
                                "Resources are limited but wants are unlimited",
                                "Trade-offs occur with every economic decision",
                                "Efficient allocation maximizes total benefit"
                            ]
                        },
                        {
                            "key": "ppf",
                            "title": "Production Possibilities Frontier",
                            "keyFacts": [
                                "Shows maximum combinations of goods that can be produced",
                                "Points on the curve represent efficient production",
                                "Concave shape reflects increasing opportunity costs",
                                "Shifts outward with economic growth",
                                "Illustrates trade-offs and opportunity costs"
                            ]
                        },
                        {
                            "key": "economicSystems",
                            "title": "Economic Systems and Markets",
                            "keyFacts": [
                                "Market economy relies on price signals and private ownership",
                                "Command economy uses central planning",
                                "Mixed economies combine market and government control",
                                "Specialization and trade increase efficiency",
                                "Comparative advantage determines trade patterns"
                            ]
                        },
                        {
                            "key": "marginalAnalysis",
                            "title": "Marginal Analysis and Decision Making",
                            "keyFacts": [
                                "Marginal benefit is additional benefit from one more unit",
                                "Marginal cost is additional cost from one more unit",
                                "Optimal decisions occur when marginal benefit equals marginal cost",
                                "Diminishing marginal returns affect production decisions",
                                "Rational actors compare marginal benefits and costs"
                            ]
                        },
                        {
                            "key": "economicModels",
                            "title": "Economic Models and Assumptions",
                            "keyFacts": [
                                "Ceteris paribus: holding all else constant",
                                "Models simplify reality to understand relationships",
                                "Positive vs. normative economic statements",
                                "Rational self-interest guides decision making",
                                "Economic models help predict behavior"
                            ]
                        }
                    ]
                },
                "unit2": {
                    "unit": "unit2",
                    "course": "apmicro",
                    "overview": "This unit explores how supply and demand interact to determine prices and quantities in markets. Understanding market forces is crucial for analyzing consumer and producer behavior.",
                    "topics": [
                        {
                            "key": "demandCurve",
                            "title": "Demand and Consumer Behavior",
                            "keyFacts": [
                                "Law of demand: higher price leads to lower quantity demanded",
                                "Demand curve slopes downward",
                                "Determinants: income, tastes, prices of related goods, expectations",
                                "Normal goods vs. inferior goods",
                                "Substitutes and complements affect demand"
                            ]
                        },
                        {
                            "key": "supplyCurve", 
                            "title": "Supply and Producer Behavior",
                            "keyFacts": [
                                "Law of supply: higher price leads to higher quantity supplied",
                                "Supply curve slopes upward",
                                "Determinants: input costs, technology, expectations, number of sellers",
                                "Producer surplus measures benefit to sellers",
                                "Supply shifts affect market equilibrium"
                            ]
                        },
                        {
                            "key": "marketEquilibrium",
                            "title": "Market Equilibrium and Efficiency",
                            "keyFacts": [
                                "Equilibrium occurs where supply equals demand",
                                "Market clearing price eliminates shortages and surpluses",
                                "Consumer and producer surplus measure total welfare",
                                "Deadweight loss occurs when markets are inefficient",
                                "Price signals coordinate economic activity"
                            ]
                        },
                        {
                            "key": "elasticity",
                            "title": "Price Elasticity of Demand",
                            "keyFacts": [
                                "Measures responsiveness of quantity demanded to price changes",
                                "Elastic demand: percentage change in quantity > percentage change in price",
                                "Inelastic demand: percentage change in quantity < percentage change in price",
                                "Determinants: substitutes, necessity vs. luxury, time frame",
                                "Total revenue depends on elasticity"
                            ]
                        },
                        {
                            "key": "marketEfficiency",
                            "title": "Market Efficiency and Welfare",
                            "keyFacts": [
                                "Allocative efficiency: resources go to highest valued uses",
                                "Productive efficiency: goods produced at lowest cost",
                                "Free markets maximize total economic surplus",
                                "Pareto efficiency: no one can be made better off without making someone worse off",
                                "Market failures occur when efficiency conditions aren't met"
                            ]
                        }
                    ]
                },
                "unit6": {
                    "unit": "unit6",
                    "course": "apmicro",
                    "overview": "This unit examines market failures and the role of government intervention. Students analyze situations where free markets don't produce efficient outcomes and explore policy solutions.",
                    "topics": [
                        {
                            "key": "marketFailure",
                            "title": "Types of Market Failure",
                            "keyFacts": [
                                "Externalities create costs or benefits for third parties",
                                "Public goods are non-rival and non-excludable",
                                "Monopoly power leads to higher prices and lower output",
                                "Information asymmetries create market inefficiencies",
                                "Common resources face tragedy of the commons"
                            ]
                        },
                        {
                            "key": "externalities",
                            "title": "Externalities and Social Costs",
                            "keyFacts": [
                                "Negative externalities: pollution, traffic congestion",
                                "Positive externalities: education, vaccination",
                                "Private cost vs. social cost diverge with externalities",
                                "Coase theorem: private bargaining can solve externality problems",
                                "Pigouvian taxes internalize external costs"
                            ]
                        },
                        {
                            "key": "publicGoods",
                            "title": "Public Goods and Free Riders",
                            "keyFacts": [
                                "Pure public goods: national defense, lighthouses",
                                "Non-rival consumption: one person's use doesn't reduce others'",
                                "Non-excludable: can't prevent non-payers from using",
                                "Free rider problem: individuals use without paying",
                                "Government provision may be necessary"
                            ]
                        },
                        {
                            "key": "informationProblems",
                            "title": "Information Economics",
                            "keyFacts": [
                                "Asymmetric information: one party knows more than the other",
                                "Adverse selection: low-quality products drive out high-quality",
                                "Moral hazard: behavior changes after transaction",
                                "Principal-agent problems in employment relationships",
                                "Signaling and screening help overcome information gaps"
                            ]
                        },
                        {
                            "key": "governmentPolicy",
                            "title": "Government Intervention and Policy",
                            "keyFacts": [
                                "Taxes and subsidies can correct market failures",
                                "Regulation sets rules for market behavior",
                                "Antitrust laws prevent monopoly abuse",
                                "Government failure: intervention may worsen outcomes",
                                "Cost-benefit analysis guides policy decisions"
                            ]
                        }
                    ]
                },
                "unit3": {
                    "unit": "unit3",
                    "course": "apmicro",
                    "overview": "This unit examines how firms make production decisions and compete in perfectly competitive markets. Understanding cost structures and profit maximization is essential for analyzing firm behavior.",
                    "topics": [
                        {
                            "key": "productionFunction",
                            "title": "Production and Productivity",
                            "keyFacts": [
                                "Production function relates inputs to outputs",
                                "Short run: at least one fixed input",
                                "Long run: all inputs are variable",
                                "Law of diminishing marginal returns",
                                "Total, average, and marginal product relationships"
                            ]
                        },
                        {
                            "key": "costsOfProduction",
                            "title": "Costs of Production",
                            "keyFacts": [
                                "Fixed costs don't vary with output",
                                "Variable costs change with production level",
                                "Marginal cost is additional cost of one more unit",
                                "Average costs include AFC, AVC, and ATC",
                                "U-shaped cost curves due to diminishing returns"
                            ]
                        },
                        {
                            "key": "perfectCompetition",
                            "title": "Perfect Competition Market Structure",
                            "keyFacts": [
                                "Many small firms selling identical products",
                                "Perfect information and no barriers to entry",
                                "Firms are price takers",
                                "P = MR in perfect competition",
                                "Economic profits attract new firms"
                            ]
                        },
                        {
                            "key": "profitMaximization",
                            "title": "Profit Maximization",
                            "keyFacts": [
                                "Firms maximize profit where MR = MC",
                                "Economic profit = total revenue - total cost",
                                "Shutdown point: price below average variable cost",
                                "Break-even point: price equals average total cost",
                                "Long-run equilibrium: zero economic profit"
                            ]
                        },
                        {
                            "key": "supplyCurveDerivation",
                            "title": "Supply Curve and Market Outcomes",
                            "keyFacts": [
                                "Firm's supply curve is MC above AVC",
                                "Market supply is horizontal sum of firm supplies",
                                "Producer surplus measures firm benefits",
                                "Long-run supply depends on industry costs",
                                "Entry and exit drive long-run equilibrium"
                            ]
                        }
                    ]
                },
                "unit4": {
                    "unit": "unit4",
                    "course": "apmicro",
                    "overview": "This unit explores imperfectly competitive markets including monopoly, oligopoly, and monopolistic competition. Students learn how market power affects pricing, output, and efficiency.",
                    "topics": [
                        {
                            "key": "monopoly",
                            "title": "Monopoly Market Structure",
                            "keyFacts": [
                                "Single seller with no close substitutes",
                                "High barriers to entry prevent competition",
                                "Monopolist is price maker, not price taker",
                                "Downward-sloping demand curve",
                                "MR < P for monopolist"
                            ]
                        },
                        {
                            "key": "monopolyPricing",
                            "title": "Monopoly Pricing and Output",
                            "keyFacts": [
                                "Profit maximization: MR = MC",
                                "Price determined from demand curve",
                                "Monopoly price > marginal cost",
                                "Creates deadweight loss",
                                "Economic profits possible in long run"
                            ]
                        },
                        {
                            "key": "priceDiscrimination",
                            "title": "Price Discrimination",
                            "keyFacts": [
                                "Charging different prices for same product",
                                "First-degree: perfect price discrimination",
                                "Second-degree: quantity discounts",
                                "Third-degree: different customer groups",
                                "Requires market power and prevention of resale"
                            ]
                        },
                        {
                            "key": "oligopoly",
                            "title": "Oligopoly and Strategic Behavior",
                            "keyFacts": [
                                "Few large firms dominate the market",
                                "Mutual interdependence in decision making",
                                "Game theory analyzes strategic interactions",
                                "Collusion vs. competition trade-offs",
                                "Kinked demand curve model"
                            ]
                        },
                        {
                            "key": "monopolisticCompetition",
                            "title": "Monopolistic Competition",
                            "keyFacts": [
                                "Many firms selling differentiated products",
                                "Some market power from product differentiation",
                                "Easy entry and exit",
                                "Short-run profits attract entry",
                                "Long-run: zero economic profit like perfect competition"
                            ]
                        }
                    ]
                },
                "unit5": {
                    "unit": "unit5",
                    "course": "apmicro",
                    "overview": "This unit examines factor markets where firms hire inputs like labor, land, and capital. Understanding factor demand and wage determination is crucial for analyzing income distribution.",
                    "topics": [
                        {
                            "key": "derivedDemand",
                            "title": "Derived Demand for Factors",
                            "keyFacts": [
                                "Factor demand derives from product demand",
                                "Marginal revenue product (MRP) determines factor demand",
                                "MRP = MP × MR for the product",
                                "Profit-maximizing hiring: MRP = factor price",
                                "Factor demand shifts with product demand changes"
                            ]
                        },
                        {
                            "key": "laborMarkets",
                            "title": "Labor Markets and Wage Determination",
                            "keyFacts": [
                                "Labor supply reflects opportunity cost of time",
                                "Backward-bending labor supply possible",
                                "Equilibrium wage where labor supply meets demand",
                                "Minimum wage creates surplus (unemployment)",
                                "Human capital affects productivity and wages"
                            ]
                        },
                        {
                            "key": "wageDecisions",
                            "title": "Factors Affecting Wages",
                            "keyFacts": [
                                "Productivity differences affect wages",
                                "Education and training increase human capital",
                                "Compensating differentials for job characteristics",
                                "Geographic mobility affects wage differences",
                                "Discrimination creates wage gaps"
                            ]
                        },
                        {
                            "key": "monopsony",
                            "title": "Monopsony in Factor Markets",
                            "keyFacts": [
                                "Single buyer of a factor (e.g., company town)",
                                "Faces upward-sloping factor supply curve",
                                "Marginal factor cost > factor price",
                                "Hires less and pays lower wages than competitive market",
                                "Creates deadweight loss in factor market"
                            ]
                        },
                        {
                            "key": "capitalLandMarkets",
                            "title": "Capital and Land Markets",
                            "keyFacts": [
                                "Capital earning depends on marginal revenue product",
                                "Interest rate represents cost of capital",
                                "Present value determines investment decisions",
                                "Land supply is perfectly inelastic",
                                "Economic rent goes to land owners"
                            ]
                        }
                    ]
                }
                # Add more AP Micro units as needed
            }
        elif course == "apmacro":
            topics_data = {
                "unit1": {
                    "unit": "unit1",
                    "course": "apmacro",
                    "overview": "This unit introduces fundamental macroeconomic concepts including economic systems, trade-offs, and the role of government in the economy. Students learn how economies are organized and how societies make collective economic decisions.",
                    "topics": [
                        {
                            "key": "economicSystems",
                            "title": "Economic Systems and Resource Allocation",
                            "keyFacts": [
                                "Traditional, command, and market economic systems",
                                "Mixed economies combine different approaches",
                                "Property rights affect economic efficiency",
                                "Role of government varies by system",
                                "Resource allocation mechanisms differ"
                            ]
                        },
                        {
                            "key": "comparativeAdvantage",
                            "title": "Comparative Advantage and Trade",
                            "keyFacts": [
                                "Absolute vs comparative advantage concepts",
                                "Opportunity cost determines trade patterns",
                                "Specialization increases total output",
                                "Trade benefits all participating parties",
                                "Production possibilities and trade-offs"
                            ]
                        },
                        {
                            "key": "marginalAnalysis",
                            "title": "Marginal Analysis and Decision Making",
                            "keyFacts": [
                                "Marginal benefit vs marginal cost framework",
                                "Optimal decisions occur at MB = MC",
                                "Thinking at the margin principle",
                                "Diminishing marginal utility concept",
                                "Economic efficiency and optimization"
                            ]
                        },
                        {
                            "key": "marketFailures",
                            "title": "Market Failures and Government Intervention",
                            "keyFacts": [
                                "Externalities create market inefficiencies",
                                "Public goods require government provision",
                                "Income inequality and distribution issues",
                                "Market power and monopoly problems",
                                "Role of government in correcting failures"
                            ]
                        },
                        {
                            "key": "economicGoals",
                            "title": "Economic Goals and Trade-offs",
                            "keyFacts": [
                                "Economic growth vs environmental protection",
                                "Efficiency vs equity trade-offs",
                                "Price stability vs full employment",
                                "Individual freedom vs collective welfare",
                                "Short-term vs long-term considerations"
                            ]
                        }
                    ]
                },
                "unit2": {
                    "unit": "unit2",
                    "course": "apmacro",
                    "overview": "This unit covers how economists measure economic performance through various indicators and understand the business cycle. Students learn about GDP, inflation, unemployment, and economic fluctuations.",
                    "topics": [
                        {
                            "key": "gdpMeasurement",
                            "title": "Gross Domestic Product (GDP)",
                            "keyFacts": [
                                "GDP measures total economic output",
                                "Expenditure approach: C + I + G + (X - M)",
                                "Income approach: wages + profits + rents + interest",
                                "Nominal vs real GDP adjustments",
                                "GDP per capita for living standards"
                            ]
                        },
                        {
                            "key": "unemploymentTypes",
                            "title": "Unemployment and Labor Force",
                            "keyFacts": [
                                "Frictional unemployment: job search time",
                                "Structural unemployment: skills mismatch",
                                "Cyclical unemployment: business cycle related",
                                "Natural rate of unemployment (NAIRU)",
                                "Labor force participation rate"
                            ]
                        },
                        {
                            "key": "inflationMeasurement",
                            "title": "Inflation and Price Indices",
                            "keyFacts": [
                                "Consumer Price Index (CPI) basket approach",
                                "GDP deflator measures all goods",
                                "Core inflation excludes food and energy",
                                "Real vs nominal interest rates",
                                "Effects of inflation on different groups"
                            ]
                        },
                        {
                            "key": "businessCycle",
                            "title": "Business Cycle and Economic Fluctuations",
                            "keyFacts": [
                                "Peak, recession, trough, expansion phases",
                                "Leading, lagging, and coincident indicators",
                                "Seasonal vs cyclical patterns",
                                "Duration and amplitude variations",
                                "Historical business cycle patterns"
                            ]
                        },
                        {
                            "key": "economicWellbeing",
                            "title": "Limitations of Economic Indicators",
                            "keyFacts": [
                                "GDP doesn't measure quality of life",
                                "Underground economy not counted",
                                "Environmental costs ignored in GDP",
                                "Income distribution matters for welfare",
                                "Alternative measures like GNH"
                            ]
                        }
                    ]
                },
                "unit3": {
                    "unit": "unit3",
                    "course": "apmacro",
                    "overview": "This unit examines how national income and the price level are determined through aggregate demand and supply analysis. Students learn about economic equilibrium and factors that cause shifts in the economy.",
                    "topics": [
                        {
                            "key": "aggregateDemand",
                            "title": "Aggregate Demand and Components",
                            "keyFacts": [
                                "AD = C + I + G + (X - M) components",
                                "Wealth effect of price level changes",
                                "Interest rate effect on investment",
                                "Foreign exchange effect on net exports",
                                "Factors shifting AD curve"
                            ]
                        },
                        {
                            "key": "aggregateSupply",
                            "title": "Aggregate Supply and Production",
                            "keyFacts": [
                                "Short-run vs long-run aggregate supply",
                                "Sticky wages and prices in short run",
                                "Resource costs affect supply",
                                "Productivity and technology changes",
                                "Expected inflation impacts SRAS"
                            ]
                        },
                        {
                            "key": "macroEquilibrium",
                            "title": "Macroeconomic Equilibrium",
                            "keyFacts": [
                                "Short-run equilibrium AD = SRAS",
                                "Long-run equilibrium at full employment",
                                "Recessionary and inflationary gaps",
                                "Self-correcting mechanism in long run",
                                "Policy interventions to restore equilibrium"
                            ]
                        },
                        {
                            "key": "multiplierEffect",
                            "title": "Multiplier Effects",
                            "keyFacts": [
                                "Spending multiplier amplifies initial changes",
                                "MPC determines multiplier size",
                                "Tax and balanced budget multipliers",
                                "Crowding out reduces multiplier effect",
                                "Time lags in multiplier process"
                            ]
                        },
                        {
                            "key": "phillipsCurve",
                            "title": "Phillips Curve Relationship",
                            "keyFacts": [
                                "Short-run trade-off between inflation and unemployment",
                                "Expectations-augmented Phillips curve",
                                "Long-run Phillips curve is vertical",
                                "Supply shocks shift the curve",
                                "Policy implications for central banks"
                            ]
                        }
                    ]
                },
                "unit4": {
                    "unit": "unit4",
                    "course": "apmacro",
                    "overview": "This unit explores the financial sector, including money, banking, and monetary policy. Students learn how the Federal Reserve influences the economy through various monetary policy tools.",
                    "topics": [
                        {
                            "key": "moneyFunctions",
                            "title": "Money and Its Functions",
                            "keyFacts": [
                                "Medium of exchange eliminates barter",
                                "Unit of account for measuring value",
                                "Store of value over time",
                                "M1 and M2 money supply measures",
                                "Characteristics of good money"
                            ]
                        },
                        {
                            "key": "bankingSystem",
                            "title": "Banking and Money Creation",
                            "keyFacts": [
                                "Fractional reserve banking system",
                                "Money multiplier process",
                                "Reserve requirements limit lending",
                                "Bank balance sheets and T-accounts",
                                "FDIC insurance protects deposits"
                            ]
                        },
                        {
                            "key": "federalReserve",
                            "title": "Federal Reserve System",
                            "keyFacts": [
                                "Central bank with regional structure",
                                "Board of Governors sets policy",
                                "FOMC makes interest rate decisions",
                                "Bank regulation and supervision",
                                "Lender of last resort function"
                            ]
                        },
                        {
                            "key": "monetaryPolicy",
                            "title": "Monetary Policy Tools",
                            "keyFacts": [
                                "Open market operations most important tool",
                                "Discount rate for bank borrowing",
                                "Reserve requirements affect money supply",
                                "Interest on excess reserves (IOER)",
                                "Forward guidance and communication"
                            ]
                        },
                        {
                            "key": "transmissionMechanism",
                            "title": "Monetary Policy Transmission",
                            "keyFacts": [
                                "Interest rates affect investment and consumption",
                                "Exchange rate channel for net exports",
                                "Credit channel through bank lending",
                                "Asset price effects on wealth",
                                "Time lags in policy effectiveness"
                            ]
                        }
                    ]
                },
                "unit5": {
                    "unit": "unit5",
                    "course": "apmacro",
                    "overview": "This unit examines the long-run consequences of monetary and fiscal policies. Students learn about the relationships between policy actions and economic outcomes over time.",
                    "topics": [
                        {
                            "key": "fiscalPolicy",
                            "title": "Fiscal Policy and Government Spending",
                            "keyFacts": [
                                "Expansionary vs contractionary fiscal policy",
                                "Automatic stabilizers vs discretionary policy",
                                "Government spending multiplier effects",
                                "Tax policy and economic incentives",
                                "Budget deficits and surpluses"
                            ]
                        },
                        {
                            "key": "crowdingOut",
                            "title": "Crowding Out and Policy Limitations",
                            "keyFacts": [
                                "Government borrowing increases interest rates",
                                "Private investment gets crowded out",
                                "Complete vs partial crowding out",
                                "Foreign capital flows and exchange rates",
                                "Ricardian equivalence theory"
                            ]
                        },
                        {
                            "key": "debtSustainability",
                            "title": "Government Debt and Sustainability",
                            "keyFacts": [
                                "Debt-to-GDP ratio for sustainability",
                                "Interest payments on government debt",
                                "Generational equity and future taxpayers",
                                "Default risk and credit ratings",
                                "Monetizing debt through money creation"
                            ]
                        },
                        {
                            "key": "supplySideEconomics",
                            "title": "Supply-Side Economics",
                            "keyFacts": [
                                "Tax cuts can stimulate economic growth",
                                "Laffer curve shows tax revenue relationship",
                                "Incentive effects on work and saving",
                                "Long-run aggregate supply shifts",
                                "Evidence on supply-side policies"
                            ]
                        },
                        {
                            "key": "inflationPolitics",
                            "title": "Politics and Long-run Growth",
                            "keyFacts": [
                                "Political business cycles",
                                "Time inconsistency of optimal policy",
                                "Central bank independence",
                                "Rules vs discretion in policy",
                                "Institutional factors in growth"
                            ]
                        }
                    ]
                },
                "unit6": {
                    "unit": "unit6",
                    "course": "apmacro",
                    "overview": "This unit covers international trade and finance, including exchange rates, balance of payments, and the effects of trade policies. Students learn how countries interact economically in the global economy.",
                    "topics": [
                        {
                            "key": "comparativeAdvantageInternational",
                            "title": "International Trade and Comparative Advantage",
                            "keyFacts": [
                                "Countries benefit from specialization and trade",
                                "Comparative advantage determines trade patterns",
                                "Gains from trade increase total welfare",
                                "Terms of trade affect distribution of gains",
                                "Trade creates winners and losers domestically"
                            ]
                        },
                        {
                            "key": "exchangeRates",
                            "title": "Exchange Rates and Currency Markets",
                            "keyFacts": [
                                "Supply and demand determine exchange rates",
                                "Appreciation vs depreciation effects",
                                "Purchasing power parity theory",
                                "Interest rate parity relationship",
                                "Fixed vs floating exchange rate systems"
                            ]
                        },
                        {
                            "key": "balanceOfPayments",
                            "title": "Balance of Payments",
                            "keyFacts": [
                                "Current account: trade in goods and services",
                                "Capital account: financial flows",
                                "Balance of payments always balances",
                                "Current account deficits and surpluses",
                                "Relationship to domestic saving and investment"
                            ]
                        },
                        {
                            "key": "tradePolicies",
                            "title": "Trade Policies and Protection",
                            "keyFacts": [
                                "Tariffs increase domestic prices",
                                "Quotas limit quantity of imports",
                                "Deadweight loss from protection",
                                "Arguments for and against protection",
                                "WTO and trade liberalization"
                            ]
                        },
                        {
                            "key": "globalInterdependence",
                            "title": "Global Economic Interdependence",
                            "keyFacts": [
                                "Economic growth spillovers between countries",
                                "Financial crisis contagion effects",
                                "Coordination of macroeconomic policies",
                                "Role of international organizations",
                                "Challenges of globalization"
                            ]
                        }
                    ]
                }
            }
        elif course == "apworld" or course == "world":
            topics_data = {
                "unit1": {
                    "unit": "unit1",
                    "course": "apworld",
                    "overview": "The period 1200-1450 CE saw massive trade networks connecting civilizations across Asia, Africa, and Europe. This unit explores how the Silk Roads, Indian Ocean trade, and the Mongol Empire created the first global connections.",
                    "topics": [
                        {
                            "key": "silkRoads",
                            "title": "The Silk Roads and Overland Trade",
                            "keyFacts": [
                                "Connected China to Mediterranean across Central Asia",
                                "Traded silk, spices, precious stones, and ideas",
                                "Spread Buddhism, Islam, and technology",
                                "Caravanserai provided safety and rest stops",
                                "Decline due to Ming isolationism and Ottoman taxes"
                            ]
                        },
                        {
                            "key": "indianOceanTrade",
                            "title": "Indian Ocean Maritime Trading Network",
                            "keyFacts": [
                                "Connected East Africa, Middle East, India, and Southeast Asia",
                                "Monsoon winds enabled seasonal sailing patterns",
                                "Spread Islam to Southeast Asia and East Africa",
                                "Swahili city-states flourished on East African coast",
                                "Chinese treasure fleets under Admiral Zheng He (1405-1433)"
                            ]
                        },
                        {
                            "key": "mongolEmpire",
                            "title": "The Mongol Empire and Its Impact",
                            "keyFacts": [
                                "Largest contiguous land empire in history",
                                "Connected East and West under Pax Mongolica",
                                "Promoted religious tolerance and cultural exchange",
                                "Facilitated trade and communication across Eurasia",
                                "Split into four khanates after Mongke Khan's death"
                            ]
                        },
                        {
                            "key": "transSaharanTrade",
                            "title": "Trans-Saharan Trade Networks",
                            "keyFacts": [
                                "Connected North and West Africa across Sahara Desert",
                                "Gold and salt were primary trade goods",
                                "Spread Islam into West Africa",
                                "Great empires: Ghana, Mali, Songhai",
                                "Timbuktu became center of Islamic learning"
                            ]
                        },
                        {
                            "key": "culturalExchange",
                            "title": "Cultural and Technological Exchange",
                            "keyFacts": [
                                "Paper-making spread from China to Islamic world",
                                "Printing technology and gunpowder diffused westward",
                                "Mathematical concepts like Arabic numerals",
                                "Religious ideas spread along trade routes",
                                "Disease transmission: Black Death followed trade routes"
                            ]
                        }
                    ]
                },
                "unit2": {
                    "unit": "unit2",
                    "course": "apworld", 
                    "overview": "The period 1450-1750 CE marked the beginning of global trade networks. European maritime exploration created the first truly worldwide connections, while land-based empires consolidated power across Asia and the Middle East.",
                    "topics": [
                        {
                            "key": "europeanExploration",
                            "title": "European Maritime Exploration",
                            "keyFacts": [
                                "Portuguese pioneered Atlantic exploration and Indian Ocean routes",
                                "Spanish conquistadors conquered Aztec and Inca empires",
                                "Dutch and English established global trading companies",
                                "Motivated by Gold, God, and Glory",
                                "New navigation technology: compass, astrolabe, caravel ships"
                            ]
                        },
                        {
                            "key": "columbianExchange",
                            "title": "The Columbian Exchange",
                            "keyFacts": [
                                "Massive biological exchange between Old and New Worlds",
                                "Diseases devastated Native American populations",
                                "New World crops: potatoes, corn, tomatoes transformed Old World",
                                "Old World animals: horses, cattle changed New World societies",
                                "Cultural and technological exchange accelerated"
                            ]
                        },
                        {
                            "key": "atlanticSlaveTradeSystem",
                            "title": "Atlantic Slave Trade System", 
                            "keyFacts": [
                                "Triangular trade connected Europe, Africa, and Americas",
                                "12-15 million Africans forcibly transported to Americas",
                                "Plantation agriculture in Caribbean and Brazil",
                                "African societies disrupted by slave raids",
                                "Resistance: revolts, maroon communities, cultural preservation"
                            ]
                        },
                        {
                            "key": "landBasedEmpires",
                            "title": "Land-Based Empires",
                            "keyFacts": [
                                "Ottoman Empire controlled Eastern Mediterranean and Balkans",
                                "Safavid Persia established Shia Islam as state religion", 
                                "Mughal Empire unified most of Indian subcontinent",
                                "Qing Dynasty expanded Chinese territory to largest extent",
                                "All used gunpowder weapons and bureaucratic administration"
                            ]
                        },
                        {
                            "key": "globalTradeExpansion",
                            "title": "Expansion of Global Trade",
                            "keyFacts": [
                                "Manila galleons connected Asia and Americas via Pacific",
                                "Joint-stock companies financed long-distance trade",
                                "European trading posts established in Asia and Africa",
                                "Silver from Americas flowed to China and Europe",
                                "Proto-industrialization in Europe and China"
                            ]
                        }
                    ]
                },
                "unit3": {
                    "unit": "unit3",
                    "course": "apworld",
                    "overview": "The period 1750-1900 CE was dominated by industrialization and imperialism. The Industrial Revolution transformed society while European powers colonized much of Africa and Asia.",
                    "topics": [
                        {
                            "key": "industrialRevolution",
                            "title": "The Industrial Revolution", 
                            "keyFacts": [
                                "Started in Britain with textile manufacturing",
                                "Steam power revolutionized transportation and production",
                                "Factory system replaced handicraft production",
                                "Urbanization and new social classes emerged",
                                "Spread to Western Europe and North America"
                            ]
                        },
                        {
                            "key": "newImperialism",
                            "title": "New Imperialism and Colonization",
                            "keyFacts": [
                                "European powers colonized most of Africa and Asia",
                                "Scramble for Africa: Berlin Conference (1884-85)",
                                "Economic motives: raw materials and markets",
                                "Technological advantages: railroads, telegraphs, modern weapons",
                                "Civilizing mission justified cultural imperialism"
                            ]
                        },
                        {
                            "key": "nationalism",
                            "title": "Rise of Nationalism",
                            "keyFacts": [
                                "Unification movements: Germany and Italy",
                                "Independence movements in Latin America",
                                "Ethnic nationalism in Ottoman and Austrian empires",
                                "Cultural nationalism: language, literature, traditions",
                                "Challenge to multi-ethnic empires"
                            ]
                        },
                        {
                            "key": "abolitionMovements",
                            "title": "Abolition and Reform Movements",
                            "keyFacts": [
                                "British abolished slave trade (1807) then slavery (1833)",
                                "Serfdom ended in Russia (1861)",
                                "Women's rights movements gained momentum", 
                                "Prison and education reforms",
                                "Religious revival and moral reform movements"
                            ]
                        },
                        {
                            "key": "globalMigration",
                            "title": "Global Migration Patterns",
                            "keyFacts": [
                                "Massive migration from Europe to Americas",
                                "Indentured labor from Asia to work on plantations",
                                "Internal migration from rural to urban areas",
                                "Chinese and Indian diaspora spread globally",
                                "Refugees from famines and persecution"
                            ]
                        }
                    ]
                },
                "unit4": {
                    "unit": "unit4",
                    "course": "apworld",
                    "overview": "The period 1900-present includes global conflicts, decolonization, and contemporary challenges. Two world wars reshaped the global order, while decolonization ended European empires.",
                    "topics": [
                        {
                            "key": "globalConflicts",
                            "title": "Global Conflicts and Total War",
                            "keyFacts": [
                                "World War I: industrialized warfare, Russian Revolution",
                                "Interwar period: economic depression, rise of fascism",
                                "World War II: Holocaust, atomic bombs, global scale",
                                "Cold War: ideological conflict between US and USSR",
                                "Proxy wars in Korea, Vietnam, Afghanistan"
                            ]
                        },
                        {
                            "key": "decolonization",
                            "title": "Decolonization Movements",
                            "keyFacts": [
                                "Indian independence: Gandhi's non-violent resistance",
                                "African independence movements: Ghana first (1957)",
                                "Vietnam War: nationalist struggle against foreign powers",
                                "Arab nationalism and Israeli-Palestinian conflict",
                                "Legacy: new nations struggled with borders and development"
                            ]
                        },
                        {
                            "key": "economicSystems",
                            "title": "Competing Economic Systems",
                            "keyFacts": [
                                "Capitalism vs. communism during Cold War",
                                "Marshall Plan rebuilt Western Europe",
                                "Soviet five-year plans industrialized USSR",
                                "Chinese economic reforms under Deng Xiaoping",
                                "Globalization and free trade in late 20th century"
                            ]
                        },
                        {
                            "key": "humanRights",
                            "title": "Human Rights and Social Movements",
                            "keyFacts": [
                                "Universal Declaration of Human Rights (1948)",
                                "Civil rights movement in United States",
                                "Apartheid system in South Africa ended (1990s)",
                                "Women's liberation and gender equality movements",
                                "Environmental movement and climate change awareness"
                            ]
                        },
                        {
                            "key": "globalChallenges",
                            "title": "Contemporary Global Challenges",
                            "keyFacts": [
                                "Terrorism: 9/11 attacks changed international security",
                                "Economic inequality within and between nations",
                                "Climate change requires global cooperation",
                                "Technology revolution: internet, social media",
                                "Pandemic responses test international coordination"
                            ]
                        }
                    ]
                }
                # Add more AP World units as needed
            }
        elif course == "apbiology":
            topics_data = {
                "unit1": {
                    "unit": "unit1",
                    "course": "apbiology",
                    "overview": "This unit covers the chemical foundation of life. Understanding biochemistry is essential because all biological processes depend on chemical interactions. From water's unique properties to complex macromolecules, chemistry drives life.",
                    "topics": [
                        {
                            "key": "waterBonds",
                            "title": "Water and Hydrogen Bonds",
                            "keyFacts": [
                                "Water is polar and forms hydrogen bonds",
                                "High specific heat regulates temperature",
                                "Cohesion and adhesion enable transport",
                                "Universal solvent for biological reactions",
                                "Ice is less dense than liquid water"
                            ]
                        },
                        {
                            "key": "macromolecules",
                            "title": "Biological Macromolecules",
                            "keyFacts": [
                                "Carbohydrates provide energy and structure",
                                "Lipids form membranes and store energy",
                                "Proteins perform diverse cellular functions",
                                "Nucleic acids store genetic information",
                                "Polymers form through dehydration synthesis"
                            ]
                        },
                        {
                            "key": "enzymes",
                            "title": "Enzymes and Catalysis",
                            "keyFacts": [
                                "Enzymes lower activation energy",
                                "Active site determines specificity",
                                "Temperature and pH affect enzyme function",
                                "Competitive and noncompetitive inhibition",
                                "Enzyme regulation controls metabolic pathways"
                            ]
                        },
                        {
                            "key": "carbonChemistry",
                            "title": "Carbon and Organic Chemistry",
                            "keyFacts": [
                                "Carbon forms four covalent bonds",
                                "Functional groups determine properties",
                                "Isomers have different structures/functions",
                                "Carbon chains form diverse molecules",
                                "Organic molecules are carbon-based"
                            ]
                        },
                        {
                            "key": "pHBuffers",
                            "title": "pH and Biological Buffers",
                            "keyFacts": [
                                "pH measures hydrogen ion concentration",
                                "Acids donate protons, bases accept protons",
                                "Buffers resist pH changes",
                                "Biological systems require stable pH",
                                "Enzyme function depends on optimal pH"
                            ]
                        }
                    ]
                },
                "unit2": {
                    "unit": "unit2",
                    "course": "apbiology",
                    "overview": "Cells are the fundamental units of life. This unit explores cell structure and function, comparing prokaryotic and eukaryotic cells, and examining how cellular components work together to maintain life.",
                    "topics": [
                        {
                            "key": "cellMembrane",
                            "title": "Cell Membrane Structure and Function",
                            "keyFacts": [
                                "Phospholipid bilayer with embedded proteins",
                                "Selective permeability controls transport",
                                "Fluid mosaic model describes structure",
                                "Cholesterol affects membrane fluidity",
                                "Membrane proteins have diverse functions"
                            ]
                        },
                        {
                            "key": "prokaryoteEukaryote",
                            "title": "Prokaryotic vs Eukaryotic Cells",
                            "keyFacts": [
                                "Prokaryotes lack membrane-bound nucleus",
                                "Eukaryotes have compartmentalized organelles",
                                "Both have ribosomes and genetic material",
                                "Size differences and complexity levels",
                                "Evolutionary relationship between cell types"
                            ]
                        },
                        {
                            "key": "organelles",
                            "title": "Organelles and Their Functions",
                            "keyFacts": [
                                "Nucleus contains DNA and controls cell",
                                "Mitochondria produce ATP through respiration",
                                "Ribosomes synthesize proteins",
                                "ER and Golgi process and transport proteins",
                                "Lysosomes digest cellular waste"
                            ]
                        },
                        {
                            "key": "cytoskeleton",
                            "title": "Cytoskeleton and Cell Movement",
                            "keyFacts": [
                                "Microfilaments, microtubules, intermediate filaments",
                                "Provides structure and enables movement",
                                "Motor proteins transport organelles",
                                "Cilia and flagella enable cell locomotion",
                                "Dynamic structure that can reorganize"
                            ]
                        },
                        {
                            "key": "cellTransport",
                            "title": "Membrane Transport Mechanisms",
                            "keyFacts": [
                                "Passive transport requires no energy",
                                "Active transport requires ATP",
                                "Diffusion and osmosis move substances",
                                "Endocytosis and exocytosis transport large molecules",
                                "Concentration gradients drive transport"
                            ]
                        }
                    ]
                },
                "unit3": {
                    "unit": "unit3",
                    "course": "apbiology",
                    "overview": "This unit explores how cells obtain and use energy. From cellular respiration to photosynthesis, these processes power all life on Earth through the transfer and transformation of energy.",
                    "topics": [
                        {
                            "key": "cellularRespiration",
                            "title": "Cellular Respiration Overview",
                            "keyFacts": [
                                "Glucose is broken down to produce ATP",
                                "Three stages: glycolysis, Krebs cycle, electron transport",
                                "Occurs in mitochondria (eukaryotes)",
                                "Requires oxygen for maximum efficiency",
                                "Produces CO2 and water as waste products"
                            ]
                        },
                        {
                            "key": "photosynthesis",
                            "title": "Photosynthesis Process",
                            "keyFacts": [
                                "Converts light energy into chemical energy",
                                "Two stages: light reactions and Calvin cycle",
                                "Occurs in chloroplasts",
                                "Produces glucose and oxygen from CO2 and water",
                                "Foundation of most food chains"
                            ]
                        },
                        {
                            "key": "atpEnergy",
                            "title": "ATP and Energy Transfer",
                            "keyFacts": [
                                "ATP is the universal energy currency",
                                "Energy released when phosphate bonds break",
                                "ADP + Pi + energy → ATP",
                                "Powers active transport and biosynthesis",
                                "Constantly recycled in cells"
                            ]
                        },
                        {
                            "key": "enzymesMetabolism",
                            "title": "Enzymes in Metabolic Pathways",
                            "keyFacts": [
                                "Enzymes catalyze metabolic reactions",
                                "Allosteric regulation controls pathways",
                                "Feedback inhibition prevents overproduction",
                                "Competitive inhibition blocks active sites",
                                "Temperature and pH affect enzyme activity"
                            ]
                        },
                        {
                            "key": "fermentation",
                            "title": "Fermentation and Anaerobic Respiration",
                            "keyFacts": [
                                "Alternative to aerobic respiration",
                                "Occurs without oxygen",
                                "Produces less ATP than aerobic respiration",
                                "Lactic acid and alcoholic fermentation",
                                "Important for muscle cells and microorganisms"
                            ]
                        }
                    ]
                },
                "unit4": {
                    "unit": "unit4",
                    "course": "apbiology",
                    "overview": "This unit examines how cells communicate and respond to their environment. Cell signaling is crucial for multicellular organisms to coordinate growth, development, and responses to stimuli.",
                    "topics": [
                        {
                            "key": "signalTransduction",
                            "title": "Signal Transduction Pathways",
                            "keyFacts": [
                                "Three stages: reception, transduction, response",
                                "Signal molecules bind to receptor proteins",
                                "Cascade of molecular interactions amplifies signal",
                                "Cellular responses include gene expression changes",
                                "Allows cells to respond to environment"
                            ]
                        },
                        {
                            "key": "cellCycle",
                            "title": "Cell Cycle and Mitosis",
                            "keyFacts": [
                                "G1, S, G2, and M phases",
                                "DNA replication occurs during S phase",
                                "Mitosis produces two identical diploid cells",
                                "Checkpoints prevent errors",
                                "Cyclins and CDKs regulate progression"
                            ]
                        },
                        {
                            "key": "apoptosis",
                            "title": "Programmed Cell Death (Apoptosis)",
                            "keyFacts": [
                                "Controlled cell death for development",
                                "Removes damaged or unnecessary cells",
                                "Triggered by internal and external signals",
                                "DNA fragmentation and cell shrinkage",
                                "Essential for proper development"
                            ]
                        },
                        {
                            "key": "cancerCellCycle",
                            "title": "Cancer and Cell Cycle Disruption",
                            "keyFacts": [
                                "Uncontrolled cell division",
                                "Mutations in tumor suppressor genes",
                                "Oncogenes promote cell division",
                                "Metastasis spreads cancer cells",
                                "Checkpoint failures allow damaged cells to divide"
                            ]
                        },
                        {
                            "key": "hormoneSignaling",
                            "title": "Hormone and Chemical Signaling",
                            "keyFacts": [
                                "Chemical messengers coordinate physiology",
                                "Steroid and protein hormones work differently",
                                "Second messengers amplify signals",
                                "Negative feedback maintains homeostasis",
                                "Receptor specificity determines response"
                            ]
                        }
                    ]
                },
                "unit5": {
                    "unit": "unit5",
                    "course": "apbiology",
                    "overview": "This unit covers heredity and how traits are passed from parents to offspring. Understanding genetics reveals how DNA determines characteristics and how genetic variation arises.",
                    "topics": [
                        {
                            "key": "mendelianGenetics",
                            "title": "Mendelian Genetics and Inheritance",
                            "keyFacts": [
                                "Genes exist in pairs (alleles)",
                                "Dominant and recessive alleles",
                                "Law of segregation and independent assortment",
                                "Punnett squares predict offspring ratios",
                                "Testcrosses reveal unknown genotypes"
                            ]
                        },
                        {
                            "key": "dnaStructure",
                            "title": "DNA Structure and Replication",
                            "keyFacts": [
                                "Double helix with complementary base pairs",
                                "A-T and G-C base pairing rules",
                                "Semi-conservative replication",
                                "DNA polymerase synthesizes new strands",
                                "Proofreading reduces replication errors"
                            ]
                        },
                        {
                            "key": "proteinSynthesis",
                            "title": "Protein Synthesis (Transcription and Translation)",
                            "keyFacts": [
                                "DNA → RNA → Protein (central dogma)",
                                "Transcription produces mRNA from DNA",
                                "Translation produces proteins from mRNA",
                                "Ribosomes read mRNA codons",
                                "tRNA brings amino acids to ribosomes"
                            ]
                        },
                        {
                            "key": "mutations",
                            "title": "Mutations and Genetic Variation",
                            "keyFacts": [
                                "Point mutations change single nucleotides",
                                "Insertions and deletions cause frameshifts",
                                "Silent, missense, and nonsense mutations",
                                "Mutations provide raw material for evolution",
                                "Some mutations are harmful, others beneficial"
                            ]
                        },
                        {
                            "key": "biotechnology",
                            "title": "Biotechnology and Genetic Engineering",
                            "keyFacts": [
                                "PCR amplifies specific DNA sequences",
                                "Gel electrophoresis separates DNA by size",
                                "CRISPR allows precise gene editing",
                                "Recombinant DNA creates genetically modified organisms",
                                "DNA fingerprinting identifies individuals"
                            ]
                        }
                    ]
                },
                "unit6": {
                    "unit": "unit6",
                    "course": "apbiology",
                    "overview": "This unit examines gene expression and regulation. Understanding how genes are turned on and off explains how cells differentiate and respond to environmental changes.",
                    "topics": [
                        {
                            "key": "geneRegulation",
                            "title": "Gene Expression and Regulation",
                            "keyFacts": [
                                "Genes can be turned on or off",
                                "Transcription factors control gene expression",
                                "Enhancers and silencers affect transcription",
                                "Epigenetic modifications alter gene activity",
                                "Different cell types express different genes"
                            ]
                        },
                        {
                            "key": "operonModel",
                            "title": "Operon Model in Prokaryotes",
                            "keyFacts": [
                                "Lac operon responds to lactose presence",
                                "Trp operon responds to tryptophan levels",
                                "Negative and positive regulation",
                                "Operator sequences control transcription",
                                "Efficient way to control multiple genes"
                            ]
                        },
                        {
                            "key": "eukaryoticRegulation",
                            "title": "Eukaryotic Gene Regulation",
                            "keyFacts": [
                                "Multiple levels of control",
                                "Chromatin structure affects accessibility",
                                "Alternative splicing creates protein variants",
                                "MicroRNAs regulate gene expression",
                                "More complex than prokaryotic regulation"
                            ]
                        },
                        {
                            "key": "cellDifferentiation",
                            "title": "Cell Differentiation and Development",
                            "keyFacts": [
                                "Same DNA, different gene expression patterns",
                                "Stem cells can become specialized cells",
                                "Homeotic genes control body plan development",
                                "Environmental factors influence development",
                                "Irreversible changes in cell fate"
                            ]
                        },
                        {
                            "key": "virusesGenetics",
                            "title": "Viruses and Genetic Material",
                            "keyFacts": [
                                "Viruses contain DNA or RNA genomes",
                                "Lytic and lysogenic viral cycles",
                                "Retroviruses use reverse transcription",
                                "Viral evolution occurs rapidly",
                                "Horizontal gene transfer in bacteria"
                            ]
                        }
                    ]
                },
                "unit7": {
                    "unit": "unit7",
                    "course": "apbiology",
                    "overview": "This unit explores how species change over time through evolution. Natural selection and other mechanisms drive the diversity of life we see today.",
                    "topics": [
                        {
                            "key": "naturalSelection",
                            "title": "Natural Selection and Evolution",
                            "keyFacts": [
                                "Variation, inheritance, selection, time",
                                "Differential survival and reproduction",
                                "Fitness measures reproductive success",
                                "Directional, stabilizing, disruptive selection",
                                "Evolution explains unity and diversity of life"
                            ]
                        },
                        {
                            "key": "evidenceEvolution",
                            "title": "Evidence for Evolution",
                            "keyFacts": [
                                "Fossil record shows change over time",
                                "Comparative anatomy reveals homologous structures",
                                "Molecular evidence shows genetic similarities",
                                "Biogeography explains species distribution",
                                "Direct observation of evolutionary change"
                            ]
                        },
                        {
                            "key": "populationGenetics",
                            "title": "Population Genetics and Hardy-Weinberg",
                            "keyFacts": [
                                "Allele frequencies in populations",
                                "Hardy-Weinberg equilibrium conditions",
                                "Factors that change allele frequencies",
                                "Gene flow, genetic drift, mutations",
                                "Mathematical models predict changes"
                            ]
                        },
                        {
                            "key": "speciation",
                            "title": "Speciation and Reproductive Isolation",
                            "keyFacts": [
                                "Formation of new species",
                                "Geographic and reproductive isolation",
                                "Prezygotic and postzygotic barriers",
                                "Allopatric and sympatric speciation",
                                "Adaptive radiation creates diversity"
                            ]
                        },
                        {
                            "key": "phylogeny",
                            "title": "Phylogeny and Classification",
                            "keyFacts": [
                                "Evolutionary relationships among species",
                                "Phylogenetic trees show common ancestry",
                                "Molecular clocks estimate divergence times",
                                "Taxonomy reflects evolutionary relationships",
                                "Three domains of life"
                            ]
                        }
                    ]
                },
                "unit8": {
                    "unit": "unit8",
                    "course": "apbiology",
                    "overview": "This unit examines how organisms interact with each other and their environment. Ecology reveals the complex relationships that sustain life on Earth.",
                    "topics": [
                        {
                            "key": "populationEcology",
                            "title": "Population Dynamics and Growth",
                            "keyFacts": [
                                "Exponential and logistic growth models",
                                "Carrying capacity limits population size",
                                "Density-dependent and density-independent factors",
                                "Population cycles and fluctuations",
                                "Human population growth patterns"
                            ]
                        },
                        {
                            "key": "communityEcology",
                            "title": "Community Interactions",
                            "keyFacts": [
                                "Competition for limited resources",
                                "Predator-prey relationships",
                                "Mutualism benefits both species",
                                "Parasitism and commensalism",
                                "Species diversity and stability"
                            ]
                        },
                        {
                            "key": "ecosystems",
                            "title": "Ecosystem Structure and Function",
                            "keyFacts": [
                                "Energy flow through trophic levels",
                                "Primary producers convert solar energy",
                                "Food webs show complex relationships",
                                "Decomposers recycle nutrients",
                                "Pyramid of energy, numbers, biomass"
                            ]
                        },
                        {
                            "key": "biogeochemicalCycles",
                            "title": "Biogeochemical Cycles",
                            "keyFacts": [
                                "Carbon cycle and climate regulation",
                                "Nitrogen cycle and nutrient availability",
                                "Water cycle drives weather patterns",
                                "Phosphorus cycle limits productivity",
                                "Human impacts on global cycles"
                            ]
                        },
                        {
                            "key": "humanImpact",
                            "title": "Human Impact on the Environment",
                            "keyFacts": [
                                "Climate change from greenhouse gases",
                                "Habitat destruction and fragmentation",
                                "Pollution affects ecosystem health",
                                "Overexploitation threatens species",
                                "Conservation efforts protect biodiversity"
                            ]
                        }
                    ]
                }
                # Add more AP Biology units as needed
            }
        elif course == "appsychology":
            topics_data = {
                "unit1": {
                    "unit": "unit1",
                    "course": "appsychology",
                    "overview": "This unit introduces psychology as a science and explores the foundations of psychological research. Understanding research methods and ethical principles is essential for evaluating psychological claims and studies.",
                    "topics": [
                        {
                            "key": "historyPerspectives",
                            "title": "History and Perspectives in Psychology",
                            "keyFacts": [
                                "Wilhelm Wundt established first psychology lab (1879)",
                                "Major perspectives: biological, cognitive, behavioral, psychodynamic, humanistic",
                                "Structuralism vs. functionalism debate",
                                "Modern psychology emphasizes scientific method",
                                "Cross-cultural psychology examines universal vs. cultural differences"
                            ]
                        },
                        {
                            "key": "researchMethods",
                            "title": "Research Methods and Design",
                            "keyFacts": [
                                "Experimental vs. correlational research designs",
                                "Independent and dependent variables",
                                "Random sampling and assignment",
                                "Case studies, surveys, and naturalistic observation",
                                "Operational definitions ensure measurability"
                            ]
                        },
                        {
                            "key": "statisticsData",
                            "title": "Statistical Concepts and Data Analysis",
                            "keyFacts": [
                                "Descriptive statistics: mean, median, mode",
                                "Measures of variability: range, standard deviation",
                                "Normal distribution and bell curve",
                                "Statistical significance and p-values",
                                "Correlation coefficients measure relationships"
                            ]
                        },
                        {
                            "key": "ethicsResearch",
                            "title": "Ethics in Psychological Research",
                            "keyFacts": [
                                "Informed consent protects participants",
                                "Institutional Review Boards (IRBs) review studies",
                                "Debriefing explains study purposes afterward",
                                "Confidentiality and anonymity protect privacy",
                                "Risk-benefit analysis guides ethical decisions"
                            ]
                        },
                        {
                            "key": "criticalThinking",
                            "title": "Critical Thinking in Psychology",
                            "keyFacts": [
                                "Empirical evidence over anecdotal claims",
                                "Replication confirms research findings",
                                "Peer review ensures quality control",
                                "Avoid confirmation bias and overgeneralization",
                                "Scientific skepticism questions extraordinary claims"
                            ]
                        }
                    ]
                },
                "unit2": {
                    "unit": "unit2", 
                    "course": "appsychology",
                    "overview": "This unit examines the biological bases of behavior, including brain structure, neurotransmitters, and the nervous system. Understanding neuroscience helps explain how biological processes influence thoughts, emotions, and behaviors.",
                    "topics": [
                        {
                            "key": "neuronsNeurotransmitters", 
                            "title": "Neurons and Neurotransmitters",
                            "keyFacts": [
                                "Neurons communicate through electrical and chemical signals",
                                "Action potentials travel down axons",
                                "Neurotransmitters cross synapses between neurons",
                                "Dopamine, serotonin, and acetylcholine affect behavior",
                                "Reuptake and enzyme breakdown end neurotransmission"
                            ]
                        },
                        {
                            "key": "nervousSystem",
                            "title": "Nervous System Structure",
                            "keyFacts": [
                                "Central nervous system: brain and spinal cord",
                                "Peripheral nervous system: nerves throughout body",
                                "Autonomic nervous system controls involuntary functions",
                                "Sympathetic vs. parasympathetic responses",
                                "Somatic nervous system controls voluntary movement"
                            ]
                        },
                        {
                            "key": "brainStructure",
                            "title": "Brain Structure and Function",
                            "keyFacts": [
                                "Cerebral cortex handles complex thinking",
                                "Limbic system processes emotions and memory",
                                "Brain stem controls vital life functions",
                                "Cerebellum coordinates movement and balance",
                                "Left and right hemisphere specializations"
                            ]
                        },
                        {
                            "key": "endocrineSystem",
                            "title": "Endocrine System and Hormones",
                            "keyFacts": [
                                "Hormones are chemical messengers in bloodstream",
                                "Pituitary gland is 'master gland'",
                                "Stress hormones: cortisol and adrenaline",
                                "Sex hormones influence development and behavior",
                                "Hormones work slower but longer than neurotransmitters"
                            ]
                        },
                        {
                            "key": "geneticsBehavior",
                            "title": "Genetics and Behavior",
                            "keyFacts": [
                                "Heritability estimates genetic influence on traits",
                                "Twin and adoption studies separate nature vs. nurture",
                                "Gene-environment interactions shape development",
                                "Evolutionary psychology explains adaptive behaviors",
                                "Genetic predispositions don't guarantee outcomes"
                            ]
                        }
                    ]
                },
                "unit3": {
                    "unit": "unit3",
                    "course": "appsychology", 
                    "overview": "This unit explores how we receive, process, and interpret sensory information from our environment. Understanding sensation and perception is crucial for explaining how we experience and make sense of the world around us.",
                    "topics": [
                        {
                            "key": "sensoryProcesses",
                            "title": "Sensory Processes and Thresholds",
                            "keyFacts": [
                                "Absolute threshold is minimum stimulus needed for detection",
                                "Difference threshold (JND) is smallest detectable change",
                                "Weber's Law: larger stimuli need bigger changes to detect",
                                "Sensory adaptation reduces response to constant stimuli",
                                "Signal detection theory explains decision-making in perception"
                            ]
                        },
                        {
                            "key": "visionHearing",
                            "title": "Vision and Audition",
                            "keyFacts": [
                                "Light wavelength determines color, amplitude determines brightness",
                                "Retina contains rods (dim light) and cones (color vision)",
                                "Sound waves have frequency (pitch) and amplitude (loudness)",
                                "Cochlea in inner ear converts sound to neural signals",
                                "Both systems use feature detection and parallel processing"
                            ]
                        },
                        {
                            "key": "otherSenses",
                            "title": "Chemical and Body Senses",
                            "keyFacts": [
                                "Taste and smell are chemical senses using receptors",
                                "Gate control theory explains pain perception",
                                "Kinesthetic sense tracks body position and movement",
                                "Vestibular sense maintains balance and spatial orientation",
                                "Touch includes pressure, temperature, and pain receptors"
                            ]
                        },
                        {
                            "key": "perceptualOrganization",
                            "title": "Perceptual Organization",
                            "keyFacts": [
                                "Gestalt principles: proximity, similarity, closure, continuity",
                                "Figure-ground relationship organizes visual scenes",
                                "Depth perception uses binocular and monocular cues",
                                "Size constancy maintains object size despite distance",
                                "Shape and brightness constancy maintain object identity"
                            ]
                        },
                        {
                            "key": "perceptualInterpretation",
                            "title": "Perceptual Interpretation and Context",
                            "keyFacts": [
                                "Experience and expectations influence perception",
                                "Context effects change how stimuli are interpreted",
                                "Perceptual set creates readiness to perceive certain things",
                                "Culture influences perceptual interpretation",
                                "Attention selectively focuses on relevant information"
                            ]
                        }
                    ]
                },
                "unit4": {
                    "unit": "unit4",
                    "course": "appsychology",
                    "overview": "This unit examines states of consciousness, including sleep, dreams, and altered states. Understanding consciousness helps explain the rhythm of daily life and how various factors affect awareness and cognitive function.",
                    "topics": [
                        {
                            "key": "consciousnessStates",
                            "title": "Levels of Consciousness",
                            "keyFacts": [
                                "Consciousness exists on a continuum from alert to unconscious",
                                "Selective attention focuses awareness on specific stimuli",
                                "Divided attention splits focus between multiple tasks",
                                "Inattentional blindness misses obvious stimuli when distracted",
                                "Change blindness fails to notice environmental changes"
                            ]
                        },
                        {
                            "key": "sleepRhythms",
                            "title": "Sleep and Circadian Rhythms",
                            "keyFacts": [
                                "Circadian rhythms follow 24-hour biological cycles",
                                "Suprachiasmatic nucleus controls biological clock",
                                "Melatonin regulates sleep-wake cycles",
                                "REM sleep features rapid eye movement and vivid dreams",
                                "NREM sleep has four stages from light to deep sleep"
                            ]
                        },
                        {
                            "key": "sleepDreams",
                            "title": "Sleep Disorders and Dreams",
                            "keyFacts": [
                                "Insomnia involves difficulty falling or staying asleep",
                                "Sleep apnea causes breathing interruptions during sleep",
                                "Narcolepsy involves sudden uncontrollable sleep attacks",
                                "Dreams occur mainly during REM sleep",
                                "Freud's theory: dreams reveal unconscious desires"
                            ]
                        },
                        {
                            "key": "psychoactiveSubstances",
                            "title": "Psychoactive Substances",
                            "keyFacts": [
                                "Depressants (alcohol, barbiturates) slow nervous system",
                                "Stimulants (caffeine, cocaine) speed up nervous system",
                                "Hallucinogens (LSD, marijuana) alter perception",
                                "Tolerance requires increasing amounts for same effect",
                                "Physical dependence creates withdrawal symptoms"
                            ]
                        },
                        {
                            "key": "alteredStates",
                            "title": "Other Altered States",
                            "keyFacts": [
                                "Hypnosis involves focused attention and suggestibility",
                                "Meditation promotes relaxation and mindfulness",
                                "Dissociation involves detachment from normal awareness",
                                "Near-death experiences share common features",
                                "Sensory deprivation can produce hallucinations"
                            ]
                        }
                    ]
                },
                "unit5": {
                    "unit": "unit5",
                    "course": "appsychology",
                    "overview": "This unit explores how organisms learn and adapt their behavior through experience. Understanding learning principles helps explain how behaviors are acquired, maintained, and changed throughout life.",
                    "topics": [
                        {
                            "key": "classicalConditioning",
                            "title": "Classical Conditioning",
                            "keyFacts": [
                                "Pavlov discovered learning through association",
                                "Unconditioned stimulus naturally triggers response",
                                "Conditioned stimulus learns to trigger response",
                                "Acquisition is learning phase of conditioning",
                                "Extinction occurs when CS no longer paired with US"
                            ]
                        },
                        {
                            "key": "operantConditioning",
                            "title": "Operant Conditioning",
                            "keyFacts": [
                                "Skinner studied learning through consequences",
                                "Reinforcement increases behavior frequency",
                                "Punishment decreases behavior frequency",
                                "Positive adds stimulus, negative removes stimulus",
                                "Schedules of reinforcement affect learning patterns"
                            ]
                        },
                        {
                            "key": "cognitiveFactors",
                            "title": "Cognitive Factors in Learning",
                            "keyFacts": [
                                "Cognitive maps represent spatial knowledge",
                                "Latent learning occurs without obvious reinforcement",
                                "Insight learning involves sudden problem understanding",
                                "Observational learning occurs through watching others",
                                "Mirror neurons may facilitate imitation"
                            ]
                        },
                        {
                            "key": "biologicalConstraints",
                            "title": "Biological Constraints on Learning",
                            "keyFacts": [
                                "Preparedness makes some associations easier to learn",
                                "Instinctive drift interferes with learned behaviors",
                                "Taste aversion learning has adaptive value",
                                "Critical periods limit when learning can occur",
                                "Species-specific learning patterns exist"
                            ]
                        },
                        {
                            "key": "applicationsPrinciples",
                            "title": "Learning Applications and Principles",
                            "keyFacts": [
                                "Behavior modification uses learning principles therapeutically",
                                "Token economies reinforce desired behaviors",
                                "Systematic desensitization treats phobias",
                                "Modeling teaches complex behaviors through observation",
                                "Transfer of learning applies knowledge to new situations"
                            ]
                        }
                    ]
                },
                "unit6": {
                    "unit": "unit6",
                    "course": "appsychology",
                    "overview": "This unit examines cognitive processes including memory, thinking, and language. Understanding cognition explains how we process information, solve problems, and communicate with others.",
                    "topics": [
                        {
                            "key": "memoryProcesses",
                            "title": "Memory Processes and Systems",
                            "keyFacts": [
                                "Encoding transforms information into memory format",
                                "Storage maintains information over time",
                                "Retrieval accesses stored information when needed",
                                "Sensory memory briefly holds sensory information",
                                "Working memory actively processes current information"
                            ]
                        },
                        {
                            "key": "longTermMemory",
                            "title": "Long-term Memory Systems",
                            "keyFacts": [
                                "Explicit memory includes episodic and semantic memory",
                                "Implicit memory includes procedural and priming effects",
                                "Episodic memory stores personal experiences",
                                "Semantic memory stores general knowledge and facts",
                                "Procedural memory stores skills and habits"
                            ]
                        },
                        {
                            "key": "forgettingMemory",
                            "title": "Forgetting and Memory Construction",
                            "keyFacts": [
                                "Interference theory: new learning disrupts old memory",
                                "Decay theory: memories fade without rehearsal",
                                "Motivated forgetting involves deliberate suppression",
                                "Memory construction can create false memories",
                                "Source amnesia forgets where information came from"
                            ]
                        },
                        {
                            "key": "thinkingConcepts",
                            "title": "Thinking and Concept Formation",
                            "keyFacts": [
                                "Concepts organize knowledge into categories",
                                "Prototypes represent typical category examples",
                                "Algorithms guarantee correct problem solutions",
                                "Heuristics provide mental shortcuts for decisions",
                                "Schemas organize knowledge about events or situations"
                            ]
                        },
                        {
                            "key": "languageCommunication",
                            "title": "Language and Communication",
                            "keyFacts": [
                                "Language has phonemes, morphemes, and syntax rules",
                                "Critical period exists for language acquisition",
                                "Chomsky proposed universal grammar theory",
                                "Language influences thought (linguistic relativity)",
                                "Bilingualism affects cognitive flexibility"
                            ]
                        }
                    ]
                },
                "unit7": {
                    "unit": "unit7",
                    "course": "appsychology",
                    "overview": "This unit explores motivation, emotion, and personality theories. Understanding these concepts helps explain why people behave differently and what drives human behavior across situations.",
                    "topics": [
                        {
                            "key": "motivationTheories",
                            "title": "Theories of Motivation",
                            "keyFacts": [
                                "Drive-reduction theory: motivation stems from biological needs",
                                "Arousal theory: optimal arousal level motivates behavior",
                                "Hierarchy of needs: physiological to self-actualization",
                                "Incentive theory: external rewards motivate behavior",
                                "Self-determination theory emphasizes autonomy and competence"
                            ]
                        },
                        {
                            "key": "hungerEating",
                            "title": "Hunger and Eating Behavior", 
                            "keyFacts": [
                                "Hypothalamus regulates hunger and satiety signals",
                                "Glucose levels and stomach contractions signal hunger",
                                "Set point theory maintains stable body weight",
                                "Environmental cues trigger eating behaviors",
                                "Eating disorders involve dysfunctional eating patterns"
                            ]
                        },
                        {
                            "key": "emotionTheories",
                            "title": "Theories of Emotion",
                            "keyFacts": [
                                "James-Lange theory: bodily changes precede emotions",
                                "Cannon-Bard theory: physiological and emotional responses simultaneous",
                                "Schachter-Singer theory: cognition interprets arousal",
                                "Facial feedback hypothesis: expressions influence emotions",
                                "Evolutionary theory: emotions serve adaptive functions"
                            ]
                        },
                        {
                            "key": "emotionalExpression",
                            "title": "Emotional Expression and Recognition",
                            "keyFacts": [
                                "Basic emotions appear universally across cultures",
                                "Facial expressions communicate emotional states",
                                "Display rules vary by culture for emotional expression",
                                "Emotional intelligence involves recognizing and managing emotions",
                                "Stress responses involve physiological and psychological components"
                            ]
                        },
                        {
                            "key": "personalityTheories",
                            "title": "Personality Theories and Assessment",
                            "keyFacts": [
                                "Trait theories identify stable personality characteristics",
                                "Big Five factors: openness, conscientiousness, extraversion, agreeableness, neuroticism",
                                "Psychodynamic theory emphasizes unconscious influences",
                                "Humanistic theory focuses on self-concept and growth",
                                "Social-cognitive theory emphasizes situation and cognition interactions"
                            ]
                        }
                    ]
                },
                "unit8": {
                    "unit": "unit8",
                    "course": "appsychology",
                    "overview": "This unit examines abnormal psychology, including psychological disorders and their treatment. Understanding mental health helps reduce stigma and explains how disorders are diagnosed and treated.",
                    "topics": [
                        {
                            "key": "abnormalityModels",
                            "title": "Defining and Models of Abnormality",
                            "keyFacts": [
                                "Abnormality involves distress, dysfunction, and deviance",
                                "Medical model treats disorders as medical illnesses",
                                "Biopsychosocial model considers multiple contributing factors",
                                "DSM-5 provides diagnostic criteria for disorders",
                                "Cultural factors influence definitions of abnormal behavior"
                            ]
                        },
                        {
                            "key": "anxietyDisorders",
                            "title": "Anxiety and Trauma-Related Disorders",
                            "keyFacts": [
                                "Generalized anxiety disorder involves excessive worry",
                                "Panic disorder includes recurrent panic attacks",
                                "Phobias involve irrational fears of specific objects",
                                "PTSD develops after traumatic experiences",
                                "OCD involves obsessions and compulsive behaviors"
                            ]
                        },
                        {
                            "key": "moodDisorders",
                            "title": "Mood Disorders",
                            "keyFacts": [
                                "Major depression involves persistent sadness and anhedonia",
                                "Bipolar disorder alternates between mania and depression",
                                "Seasonal affective disorder relates to light exposure",
                                "Learned helplessness may contribute to depression",
                                "Cognitive distortions maintain depressive thinking patterns"
                            ]
                        },
                        {
                            "key": "schizophreniaDisorders",
                            "title": "Schizophrenia and Psychotic Disorders",
                            "keyFacts": [
                                "Positive symptoms include hallucinations and delusions",
                                "Negative symptoms include flattened affect and withdrawal",
                                "Dopamine hypothesis links neurotransmitter to symptoms",
                                "Genetic and environmental factors contribute to development",
                                "Early intervention improves long-term outcomes"
                            ]
                        },
                        {
                            "key": "treatmentApproaches",
                            "title": "Treatment Approaches and Therapies",
                            "keyFacts": [
                                "Psychoanalytic therapy explores unconscious conflicts",
                                "Cognitive-behavioral therapy challenges distorted thinking",
                                "Humanistic therapy emphasizes self-acceptance and growth",
                                "Biological treatments include medication and ECT",
                                "Community mental health provides accessible services"
                            ]
                        }
                    ]
                },
                "unit9": {
                    "unit": "unit9",
                    "course": "appsychology",
                    "overview": "This unit examines how people think, feel, and behave in social situations. Understanding social psychology helps explain interpersonal relationships, group dynamics, and social influences on behavior.",
                    "topics": [
                        {
                            "key": "socialThinking",
                            "title": "Social Thinking and Attribution",
                            "keyFacts": [
                                "Attribution theory explains how we judge others' behavior",
                                "Fundamental attribution error overemphasizes personality factors",
                                "Self-serving bias attributes success to internal factors",
                                "Cognitive dissonance creates discomfort from conflicting beliefs",
                                "Attitude change occurs through central and peripheral routes"
                            ]
                        },
                        {
                            "key": "socialInfluence",
                            "title": "Social Influence and Conformity",
                            "keyFacts": [
                                "Conformity involves changing behavior to match group norms",
                                "Asch's studies showed power of group pressure",
                                "Compliance techniques include foot-in-door and door-in-face",
                                "Obedience to authority can override personal morals",
                                "Social facilitation improves performance on simple tasks"
                            ]
                        },
                        {
                            "key": "groupBehavior",
                            "title": "Group Behavior and Social Identity",
                            "keyFacts": [
                                "Social identity theory explains in-group favoritism",
                                "Group polarization intensifies group attitudes",
                                "Groupthink occurs when harmony overrides critical thinking",
                                "Social loafing reduces individual effort in groups",
                                "Deindividuation decreases self-awareness in crowds"
                            ]
                        },
                        {
                            "key": "prejudiceDiscrimination",
                            "title": "Prejudice and Discrimination",
                            "keyFacts": [
                                "Prejudice involves negative attitudes toward groups",
                                "Discrimination involves biased behavior against groups",
                                "In-group bias favors one's own group members",
                                "Contact hypothesis suggests interaction reduces prejudice",
                                "Implicit bias operates outside conscious awareness"
                            ]
                        },
                        {
                            "key": "aggressionAltruism",
                            "title": "Aggression and Altruism",
                            "keyFacts": [
                                "Frustration-aggression hypothesis links blocking goals to aggression",
                                "Social learning theory explains aggression through modeling",
                                "Bystander effect reduces helping in group situations",
                                "Diffusion of responsibility decreases individual action",
                                "Altruism involves helping others without personal benefit"
                            ]
                        }
                    ]
                },
                "unit10": {
                    "unit": "unit10",
                    "course": "appsychology",
                    "overview": "This unit examines psychological development across the lifespan. Understanding developmental psychology helps explain how people change physically, cognitively, and socially from conception through old age.",
                    "topics": [
                        {
                            "key": "developmentalTheories",
                            "title": "Theories of Development",
                            "keyFacts": [
                                "Nature vs. nurture debate examines genetic vs. environmental influences",
                                "Critical periods are specific times when development must occur",
                                "Sensitive periods allow optimal but not exclusive development",
                                "Continuity vs. discontinuity describes gradual vs. stage-like development",
                                "Stability vs. change examines personality consistency over time"
                            ]
                        },
                        {
                            "key": "prenatalInfancy",
                            "title": "Prenatal Development and Infancy",
                            "keyFacts": [
                                "Teratogens can harm prenatal development",
                                "Attachment styles affect later relationships",
                                "Stranger anxiety emerges around 8 months",
                                "Motor development follows predictable sequences",
                                "Infantile amnesia limits early memory formation"
                            ]
                        },
                        {
                            "key": "cognitiveDevelopment",
                            "title": "Cognitive Development Theories",
                            "keyFacts": [
                                "Piaget's stages: sensorimotor, preoperational, concrete, formal",
                                "Conservation understanding develops in concrete operational stage",
                                "Vygotsky emphasized social and cultural influences",
                                "Zone of proximal development guides optimal instruction",
                                "Theory of mind develops understanding of others' mental states"
                            ]
                        },
                        {
                            "key": "socialMoralDevelopment",
                            "title": "Social and Moral Development",
                            "keyFacts": [
                                "Kohlberg's moral stages progress from preconventional to postconventional",
                                "Gilligan proposed care-based moral reasoning",
                                "Erikson's psychosocial stages span entire lifespan",
                                "Identity formation is crucial task of adolescence",
                                "Parenting styles affect child development outcomes"
                            ]
                        },
                        {
                            "key": "adulthoodAging",
                            "title": "Adulthood and Aging",
                            "keyFacts": [
                                "Crystallized intelligence increases with age",
                                "Fluid intelligence peaks in early adulthood",
                                "Menopause and andropause mark hormonal changes",
                                "Empty nest syndrome affects some parents",
                                "Death and dying involve predictable psychological stages"
                            ]
                        }
                    ]
                }
                # AP Psychology units are now complete (unit1-unit10)
            }
        
        # Get the requested unit data
        unit_data = topics_data.get(unit, {})
        if not unit_data:
            # Return empty structure if unit not found
            return jsonify({
                "unit": unit,
                "course": course,
                "overview": "Unit information not available yet.",
                "topics": []
            })
        
        return jsonify(unit_data)
        
    except Exception as e:
        print(f"Error in get_unit_topics: {e}")
        traceback.print_exc()
        return jsonify({
            "error": "Failed to load unit topics",
            "unit": unit,
            "course": course,
            "overview": "Error loading unit information.",
            "topics": []
        }), 500

# Socratic AI endpoints
@app.route("/api/chat/send", methods=["POST", "OPTIONS"])
@cross_origin(origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "https://cloudybm05.github.io",
    "https://aphelper.tech",
    "https://www.aphelper.tech",
    "https://ap-helper-2d9f117e9bdb.herokuapp.com"
], supports_credentials=True, methods=["GET", "POST", "OPTIONS"], allow_headers="*")
# @require_auth  # Optional - remove comment to enable auth
def socratic_chat_send():
    data = request.json
    message = data.get("message")
    conversation_history = data.get("conversationHistory", [])
    course = data.get("course")
    unit = data.get("unit")
    user_id = data.get("userId", "anonymous")
    detected_topic = data.get("detectedTopic")

    if not message:
        return jsonify({"error": "Message is required."}), 400

    try:
        # Always try Gemini AI first for courses with topic definitions
        courses_with_topics = ['apbiology', 'appsychology', 'apgov', 'apmicro', 'aphug', 'apstat', 'apush', 'apworld']
        
        socratic_data = None
        
        # Try Gemini for supported courses with topic definitions
        if course in courses_with_topics:
            socratic_data = get_gemini_socratic_response(message, course, unit, conversation_history)
        
        # For other courses or if Gemini fails, check if it's an advanced question
        if not socratic_data:
            advanced_keywords = ['analyze', 'compare', 'evaluate', 'significance', 'impact', 'why', 'how', 'what if', 'consequences', 'complex', 'relationship', 'factors', 'causes', 'effects', 'explain']
            is_advanced_question = any(keyword in message.lower() for keyword in advanced_keywords) or len(message.split()) > 10
            
            if is_advanced_question:
                socratic_data = get_gemini_socratic_response(message, course, unit, conversation_history)
        
        # Fall back to traditional Socratic response if Gemini not available
        if not socratic_data:
            socratic_data = get_socratic_response(message, course, unit, conversation_history)
        
        # Determine the actual response source
        response_source = socratic_data.get('source', 'enhanced_socratic_system')
        
        # Update and save user progress 
        progress_data = load_user_progress()
        if user_id not in progress_data:
            progress_data[user_id] = {}
        
        unit_key = f"{course}_{unit}"
        if unit_key not in progress_data[user_id]:
            progress_data[user_id][unit_key] = {}
            
        # Update progress with new data
        if socratic_data.get('progress_update'):
            progress_data[user_id][unit_key].update(socratic_data['progress_update'])
            save_user_progress(progress_data)
        
        # Calculate completion status
        user_progress = progress_data[user_id][unit_key]
        total_sections = len(load_study_guide_content(unit, course).get('sections', {}))
        learned_sections = len([k for k, v in user_progress.items() if v.get('introduced') or v.get('mastered')])
        
        overall_progress = (learned_sections / total_sections * 100) if total_sections > 0 else 0
        ready_for_assessment = learned_sections >= max(1, total_sections * 0.8)  # 80% completion
        
        completion_message = ""
        if ready_for_assessment and overall_progress >= 80:
            completion_message = "\\n\\n🎓 **Excellent progress!** You've learned most of the key concepts in this unit. You're ready for the unit assessment!"

        return jsonify({
            "response": socratic_data['response'] + completion_message,
            "source": response_source,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "progressUpdate": socratic_data.get('progress_update', {}),
            "conceptsLearned": socratic_data.get('concepts_introduced', []),
            "topicFocus": socratic_data.get('topic', 'general'),
            "overallProgress": overall_progress,
            "readyForFinalAssessment": ready_for_assessment,
            "sectionsLearned": learned_sections,
            "totalSections": total_sections
        })

    except Exception as e:
        print(f"Error in Socratic chat: {e}")
        traceback.print_exc()
        return jsonify({
            "response": "I'm having trouble processing that right now. Could you rephrase your question or try asking about a specific aspect of the topic?",
            "source": "error_fallback",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }), 500

# Gemini-enhanced Socratic response function
def get_gemini_socratic_response(user_input, course, unit, conversation_history):
    """Use Gemini API for sophisticated Socratic responses when available"""
    if not GEMINI_API_KEY:
        return None
        
    try:
        # Build context for Gemini based on course
        if course == "apbiology":
            context = f"""You are an expert AP Biology tutor for {course.upper()} {unit.upper()}. 

INSTRUCTION: For direct questions like "Tell me about X" or "What is X" or "Analyze X", provide informative answers with bullet points FIRST, then ask ONE follow-up question.

Your teaching approach:
- Give clear, factual biological information when requested
- Use bullet points for key scientific facts
- Follow information with ONE thoughtful question
- Be educational first, Socratic second
- Focus on biological concepts, processes, and relationships

Student's message: "{user_input}"

Previous conversation: {str(conversation_history[-2:]) if conversation_history else 'First question'}

If the student asks "Tell me about [topic]" or "Analyze [topic]", start with "**[Topic Name]**" and provide 3-4 bullet points of key biological information, then ask ONE question to guide deeper thinking. Keep under 250 words."""
        elif course == "appsychology":
            context = f"""You are an expert AP Psychology tutor for {course.upper()} {unit.upper()}. 

INSTRUCTION: For any question about psychology, provide informative answers with bullet points when helpful, then ask ONE follow-up question.

Your teaching approach:
- Give clear, factual psychological information
- Use bullet points for key concepts and research findings
- Follow information with ONE thoughtful question
- Be educational first, Socratic second
- Focus on psychological theories, research, and real-world applications
- Connect concepts to everyday behavior when relevant

Student's message: "{user_input}"

Previous conversation: {str(conversation_history[-2:]) if conversation_history else 'First question'}

If the student asks about a psychological concept, start with "**[Topic Name]**" and provide 3-4 bullet points of key psychological information, then ask ONE question to guide deeper thinking. Keep under 250 words."""
        else:
            # History courses
            context = f"""You are an expert history tutor for {course.upper()} {unit.upper()}. 

INSTRUCTION: For direct questions like "Tell me about X" or "What is X", provide informative answers with bullet points FIRST, then ask ONE follow-up question.

Your teaching approach:
- Give clear, factual information when requested
- Use bullet points for key facts
- Follow information with ONE thoughtful question
- Be educational first, Socratic second

Student's message: "{user_input}"

Previous conversation: {str(conversation_history[-2:]) if conversation_history else 'First question'}

If the student asks "Tell me about [topic]", start with "**[Topic Name]**" and provide 3-4 bullet points of key information, then ask ONE question to guide deeper thinking. Keep under 200 words."""

        # Try different Gemini model names using current available models
        model_names = [
            'models/gemini-2.5-flash',
            'models/gemini-2.5-pro', 
            'models/gemini-2.0-flash',
            'models/gemini-flash-latest',
            'models/gemini-pro-latest'
        ]
        
        response = None
        for model_name in model_names:
            try:
                model = genai.GenerativeModel(model_name)
                response = model.generate_content(context)
                print(f"Gemini API success with model {model_name}: {len(response.text) if response and response.text else 0} chars")
                break  # Success, exit the loop
            except Exception as model_error:
                print(f"Failed to use model {model_name}: {model_error}")
                continue
        
        if response and response.text:
            print(f"Gemini API success: {len(response.text)} chars")
            return {
                'response': response.text.strip(),
                'source': 'gemini_ai',
                'topic': 'advanced_discussion',
                'concepts_introduced': [],
                'progress_update': {}
            }
        else:
            print("Gemini API returned empty response")
    except Exception as e:
        print(f"Gemini API error: {e}")
        print(f"Error type: {type(e).__name__}")
        # Try to list available models for debugging
        try:
            print("Available Gemini models:")
            for model in genai.list_models():
                if 'generateContent' in model.supported_generation_methods:
                    print(f"  - {model.name}")
        except Exception as list_error:
            print(f"Could not list models: {list_error}")
        # Fall back to traditional responses
        pass
    
    return None

# Conversational Socratic tutoring system - responds to what user actually says
# Universal Socratic AI system that works across all AP courses and units
def get_socratic_response(user_input, course, unit, conversation_history):
    """Comprehensive conversational Socratic AI for APUSH, AP Gov, and AP World - all units"""
    msg = user_input.lower()
    
    # Get recent conversation context for continuity
    recent_ai_messages = []
    recent_user_messages = []
    for item in conversation_history[-3:]:  # Last 3 exchanges
        if item.get('sender') == 'ai':
            recent_ai_messages.append(item.get('content', '').lower())
        elif item.get('sender') == 'user':
            recent_user_messages.append(item.get('content', '').lower())
    
    # Get course-specific context and information
    course_info = get_course_context(course, unit)
    
    # Handle confusion and clarification requests
    if any(phrase in msg for phrase in ['confused', 'what are you talking about', 'not sure', "don't understand", 'idk', "don't know"]):
        if any('disease' in ai_msg or 'war' in ai_msg or 'constitution' in ai_msg for ai_msg in recent_ai_messages):
            return generate_clarification_response(course, unit, recent_ai_messages)
        else:
            return {
                'response': f"**No worries!** 📚 We're studying **{course_info['title']}**.\n\n**What interests you?**\n{course_info['topics_overview']}",
                'topic': 'clarification',
                'source': 'conversational_socratic',
                'concepts_introduced': [],
                'progress_update': {}
            }
    
    # Handle requests for overview/general information
    if any(phrase in msg for phrase in ['overview', 'what is this unit', 'tell me about this unit', 'summary', 'what this unit about', 'dive deep']):
        return {
            'response': f"**{course_info['title']}** 🎓\n\n{course_info['overview']}\n\n**Key themes:**\n{course_info['key_themes']}\n\nWhich of these catches your interest most? Or do you want to dive into how they all connect?",
            'topic': 'unit_overview',
            'source': 'conversational_socratic',
            'concepts_introduced': course_info['main_concepts'],
            'progress_update': {f'{course}_{unit}_overview': {'introduced': True}}
        }
    
    # Respond to population/harm/conflict/war references contextually
    if any(word in msg for word in ['population', 'harm', 'hurt', 'killed', 'died', 'death', 'harmed', 'war', 'conflict', 'violence']):
        return handle_conflict_disease_topics(msg, course, unit, recent_ai_messages, course_info)
    
    # Handle questions about people/groups/societies 
    if any(phrase in msg for phrase in ['what were', 'who were', 'tell me about', 'what was', 'people like', 'society', 'civilization']):
        return handle_society_questions(msg, course, unit, course_info)
    
    # Handle government/political questions
    if any(word in msg for word in ['government', 'political', 'constitution', 'president', 'congress', 'democracy', 'election', 'voting']):
        return handle_government_questions(msg, course, unit, course_info)
    
    # Handle economic questions  
    if any(word in msg for word in ['economic', 'economy', 'trade', 'money', 'business', 'industrial', 'agriculture']):
        return handle_economic_questions(msg, course, unit, course_info)
    
    # Handle cultural/social questions
    if any(word in msg for word in ['cultural', 'culture', 'religion', 'social', 'art', 'literature', 'movement']):
        return handle_cultural_questions(msg, course, unit, course_info)
    
    # For unclear or off-topic responses, guide gently
    return {
        'response': f"**I want to make sure I understand what you're curious about!** 🤔\n\nWe're exploring **{course_info['title']}**.\n\n**You could ask about:**\n{course_info['suggested_questions']}\n\n**Or just tell me** what aspect interests you most!",
        'topic': 'guidance',
        'source': 'conversational_socratic',
        'concepts_introduced': [],
        'progress_update': {}
    }

def get_course_context(course, unit):
    """Get comprehensive context for any AP course and unit"""
    
    # Comprehensive APUSH content
    apush_content = {
        'unit1': {
            'title': 'APUSH Unit 1: 1491-1607',
            'overview': '**The meeting of three worlds** - Native American societies, European exploration, and the beginning of colonization.',
            'key_themes': '• **Native American diversity** - Complex societies before Europeans\n• **European motivations** - Gold, Glory, and God\n• **The Columbian Exchange** - Biological and cultural transfers\n• **Spanish colonization** - Encomienda system and conquest',
            'topics_overview': '• Native American societies\n• European exploration\n• What happened when they encountered each other',
            'main_concepts': ['native diversity', 'columbian exchange', 'spanish colonization', 'european motivations'],
            'suggested_questions': '• "What were Native American societies like?"\n• "Why did Europeans come to America?"\n• "How did diseases affect populations?"\n• "What was the Columbian Exchange?"'
        },
        'unit2': {
            'title': 'APUSH Unit 2: 1607-1754', 
            'overview': '**Colonial America takes shape** - English colonies develop distinct regional characteristics and cultures.',
            'key_themes': '• **Colonial regions** - New England, Middle, Southern colonies\n• **Labor systems** - Indentured servitude to slavery\n• **Atlantic trade** - Triangular trade networks\n• **Colonial society** - Religion, culture, governance',
            'topics_overview': '• Different colonial regions\n• How the economy developed\n• Colonial society and culture',
            'main_concepts': ['colonial regions', 'labor systems', 'atlantic trade', 'colonial society'],
            'suggested_questions': '• "How were the colonies different from each other?"\n• "Why did slavery become so important?"\n• "What was the Great Awakening?"\n• "How did trade work in colonial America?"'
        },
        'unit3': {
            'title': 'APUSH Unit 3: 1754-1800',
            'overview': '**Revolution and the new nation** - From British subjects to independent Americans creating a new government.',
            'key_themes': '• **Imperial crisis** - French and Indian War consequences\n• **Revolutionary War** - "No taxation without representation"\n• **Creating government** - Articles of Confederation to Constitution\n• **Early republic** - Washington, Adams, political parties',
            'topics_overview': '• Causes of the Revolution\n• The Revolutionary War\n• Creating the Constitution',
            'main_concepts': ['imperial crisis', 'revolution', 'constitution', 'early republic'],
            'suggested_questions': '• "Why did colonists rebel against Britain?"\n• "How did they win the Revolutionary War?"\n• "Why did the Articles of Confederation fail?"\n• "How does the Constitution work?"'
        },
        'unit4': {
            'title': 'APUSH Unit 4: 1800-1848',
            'overview': '**Democracy and expansion** - The nation grows westward while debating slavery and reform.',
            'key_themes': '• **Jeffersonian democracy** - Republican ideals vs Federalist vision\n• **Westward expansion** - Manifest Destiny and territorial growth\n• **Market Revolution** - Transportation, industry, agriculture\n• **Reform movements** - Abolition, women\'s rights, religion',
            'topics_overview': '• Democratic changes\n• Moving west\n• Economic transformation\n• Social reform movements',
            'main_concepts': ['jacksonian democracy', 'manifest destiny', 'market revolution', 'reform movements'],
            'suggested_questions': '• "What was Jacksonian democracy?"\n• "Why did Americans believe in Manifest Destiny?"\n• "How did the economy change?"\n• "What were the major reform movements?"'
        },
        'unit5': {
            'title': 'APUSH Unit 5: 1844-1877',
            'overview': '**Sectional conflict and Civil War** - The nation tears apart over slavery, fights a civil war, and attempts Reconstruction.',
            'key_themes': '• **Sectional tensions** - Slavery expansion debates\n• **Civil War** - Causes, conduct, consequences\n• **Emancipation** - End of slavery\n• **Reconstruction** - Rebuilding and civil rights',
            'topics_overview': '• Why the Civil War happened\n• How the war was fought\n• Reconstruction after the war',
            'main_concepts': ['sectional crisis', 'civil war', 'emancipation', 'reconstruction'],
            'suggested_questions': '• "Why couldn\'t they compromise on slavery?"\n• "How did the North win the Civil War?"\n• "What was Reconstruction like?"\n• "Why did Reconstruction end?"'
        },
        'unit6': {
            'title': 'APUSH Unit 6: 1865-1898',
            'overview': '**The Gilded Age** - Industrialization transforms America while inequality and political corruption grow.',
            'key_themes': '• **Industrialization** - Railroads, steel, oil, electricity\n• **Immigration** - "New" immigrants from Southern/Eastern Europe\n• **Labor struggles** - Industrial working conditions and unions\n• **Political corruption** - Machine politics and reform efforts',
            'topics_overview': '• Industrial growth\n• New waves of immigration\n• Labor and working conditions\n• Political problems',
            'main_concepts': ['industrialization', 'new immigration', 'labor movements', 'political corruption'],
            'suggested_questions': '• "How did industrialization change America?"\n• "Who were the new immigrants?"\n• "Why did workers form unions?"\n• "What was political corruption like?"'
        },
        'unit7': {
            'title': 'APUSH Unit 7: 1890-1945',
            'overview': '**America becomes a world power** - From Progressive reforms through two world wars to global leadership.',
            'key_themes': '• **Progressive Era** - Social and political reforms\n• **World War I** - America joins global conflict\n• **1920s culture** - Prosperity and cultural change\n• **Great Depression and New Deal** - Economic crisis and government response\n• **World War II** - Global war and American victory',
            'topics_overview': '• Progressive reforms\n• World War I\n• The Roaring Twenties\n• Great Depression\n• World War II',
            'main_concepts': ['progressive reforms', 'world war i', 'twenties culture', 'great depression', 'world war ii'],
            'suggested_questions': '• "What did Progressives want to reform?"\n• "Why did America join World War I?"\n• "What caused the Great Depression?"\n• "How did World War II change America?"'
        },
        'unit8': {
            'title': 'APUSH Unit 8: 1945-1980',
            'overview': '**Cold War America** - Superpower status brings new responsibilities while social movements transform society.',
            'key_themes': '• **Cold War** - Confrontation with Soviet Union\n• **Civil Rights Movement** - Fighting for racial equality\n• **Vietnam War** - Controversial foreign intervention\n• **Counterculture** - Youth rebellion and social change\n• **Conservative reaction** - Pushback against liberal changes',
            'topics_overview': '• Cold War tensions\n• Civil Rights Movement\n• Vietnam War\n• Cultural changes of the 1960s',
            'main_concepts': ['cold war', 'civil rights', 'vietnam war', 'counterculture'],
            'suggested_questions': '• "What was the Cold War about?"\n• "How did the Civil Rights Movement succeed?"\n• "Why was Vietnam so controversial?"\n• "What was the counterculture movement?"'
        },
        'unit9': {
            'title': 'APUSH Unit 9: 1980-Present',
            'overview': '**Contemporary America** - Conservative resurgence, technological revolution, globalization, and recent challenges.',
            'key_themes': '• **Conservative revolution** - Reagan and the New Right\n• **End of Cold War** - Soviet collapse and American hegemony\n• **Technology revolution** - Digital age transformation\n• **9/11 and War on Terror** - New security challenges\n• **Political polarization** - Increasing partisan division',
            'topics_overview': '• Conservative politics\n• End of the Cold War\n• Technology changes\n• Recent events and challenges',
            'main_concepts': ['reagan revolution', 'cold war end', 'technology revolution', 'war on terror'],
            'suggested_questions': '• "What was the Reagan Revolution?"\n• "How did the Cold War end?"\n• "How has technology changed society?"\n• "What has happened since 9/11?"'
        }
    }
    
    # Comprehensive AP Government content
    apgov_content = {
        'unit1': {
            'title': 'AP Government Unit 1: Foundations of Democracy',
            'overview': '**How American democracy was designed** - From Enlightenment ideas to the Constitution and federalism.',
            'key_themes': '• **Enlightenment ideals** - Natural rights and social contract\n• **Constitutional Convention** - Creating the framework\n• **Federalism** - Dividing power between levels\n• **Separation of powers** - Checks and balances\n• **Bill of Rights** - Protecting individual liberties',
            'topics_overview': '• Democratic theory\n• Constitutional design\n• Federalism\n• Individual rights',
            'main_concepts': ['enlightenment ideals', 'constitution', 'federalism', 'separation of powers'],
            'suggested_questions': '• "What influenced the founders\' thinking?"\n• "How does federalism work?"\n• "Why separation of powers?"\n• "How does the Constitution protect rights?"'
        },
        'unit2': {
            'title': 'AP Government Unit 2: Interactions Among Branches',
            'overview': '**How government actually works** - Congress, presidency, courts, and bureaucracy in action.',
            'key_themes': '• **Congress** - Lawmaking, representation, elections\n• **Presidency** - Executive power and leadership\n• **Federal courts** - Judicial review and interpretation\n• **Bureaucracy** - Policy implementation\n• **Inter-branch relations** - Cooperation and conflict',
            'topics_overview': '• How Congress works\n• Presidential powers\n• Court system\n• Government agencies',
            'main_concepts': ['congressional powers', 'presidential power', 'judicial review', 'bureaucracy'],
            'suggested_questions': '• "How does Congress make laws?"\n• "What can the president do?"\n• "How do courts check other branches?"\n• "Why do we need a bureaucracy?"'
        },
        'unit3': {
            'title': 'AP Government Unit 3: Civil Liberties and Civil Rights',
            'overview': '**Freedom and equality in practice** - How individual rights are protected and expanded.',
            'key_themes': '• **First Amendment** - Speech, religion, press freedoms\n• **Due process** - Criminal justice protections\n• **Equal protection** - Fighting discrimination\n• **Civil rights movements** - Expanding equality\n• **Supreme Court cases** - Defining rights',
            'topics_overview': '• Constitutional freedoms\n• Criminal justice rights\n• Fighting discrimination\n• Civil rights movements',
            'main_concepts': ['first amendment', 'due process', 'equal protection', 'civil rights'],
            'suggested_questions': '• "How far does free speech go?"\n• "What rights do accused people have?"\n• "How did civil rights expand?"\n• "What role do courts play in rights?"'
        },
        'unit4': {
            'title': 'AP Government Unit 4: Political Ideologies and Beliefs',
            'overview': '**How Americans think about politics** - Political culture, public opinion, and ideological differences.',
            'key_themes': '• **Political culture** - American democratic values\n• **Political socialization** - How views form\n• **Public opinion** - Polling and measurement\n• **Ideologies** - Liberal vs conservative\n• **Party identification** - Political loyalty',
            'topics_overview': '• American political values\n• How opinions form\n• Liberal vs conservative\n• Political parties',
            'main_concepts': ['political culture', 'political socialization', 'ideologies', 'party identification'],
            'suggested_questions': '• "What do Americans believe about government?"\n• "How do people form political views?"\n• "What\'s the difference between liberal and conservative?"\n• "Why do people identify with parties?"'
        },
        'unit5': {
            'title': 'AP Government Unit 5: Political Participation',
            'overview': '**How citizens participate in democracy** - Voting, campaigns, parties, interest groups, and media.',
            'key_themes': '• **Voting rights** - Expanding suffrage\n• **Elections** - Campaigns and Electoral College\n• **Political parties** - Organization and functions\n• **Interest groups** - Lobbying and influence\n• **Media** - Information and bias',
            'topics_overview': '• Voting and elections\n• Political parties\n• Interest groups\n• Media influence',
            'main_concepts': ['voting rights', 'elections', 'political parties', 'interest groups'],
            'suggested_questions': '• "How have voting rights expanded?"\n• "How do campaigns work?"\n• "What do political parties do?"\n• "How do interest groups influence policy?"'
        }
    }
    
    # AP World History content (Period-based units)
    apworld_content = {
        'unit1': {
            'title': 'AP World Unit 1: 1200-1450 CE',
            'overview': '**Global trade networks before 1450** - How different civilizations connected across continents.',
            'key_themes': '• **Silk Roads** - Trade across Asia\n• **Indian Ocean** - Maritime trade networks\n• **Trans-Saharan** - Trade across Africa\n• **Mongol Empire** - Largest land empire\n• **Cultural exchange** - Ideas, religions, technologies',
            'topics_overview': '• Major trade routes\n• The Mongol Empire\n• Cultural exchanges\n• Different civilizations',
            'main_concepts': ['silk roads', 'indian ocean trade', 'mongol empire', 'cultural exchange'],
            'suggested_questions': '• "How did trade networks connect the world?"\n• "What was the Mongol impact?"\n• "How did ideas spread?"\n• "What were different civilizations like?"'
        },
        'unit2': {
            'title': 'AP World Unit 2: 1450-1750 CE',
            'overview': '**Early modern global connections** - European exploration creates the first truly global trade networks.',
            'key_themes': '• **European exploration** - Maritime empires\n• **Columbian Exchange** - Global biological exchange\n• **Atlantic slave trade** - Forced migration\n• **Land-based empires** - Ottoman, Safavid, Mughal, Qing\n• **Cultural synthesis** - Mixing of traditions',
            'topics_overview': '• European exploration\n• The Columbian Exchange\n• Land-based empires\n• Global trade expansion',
            'main_concepts': ['european exploration', 'columbian exchange', 'land empires', 'global trade'],
            'suggested_questions': '• "Why did Europeans explore?"\n• "What was the Columbian Exchange?"\n• "How did land empires work?"\n• "How did the world become more connected?"'
        },
        'unit3': {
            'title': 'AP World Unit 3: 1750-1900 CE',
            'overview': '**Industrial age and imperialism** - Industrialization transforms the world and creates new forms of empire.',
            'key_themes': '• **Industrial Revolution** - Technology and society\n• **New imperialism** - European colonial expansion\n• **Nationalism** - New forms of identity\n• **Abolition movements** - Ending slavery\n• **Migration patterns** - Global population movements',
            'topics_overview': '• Industrial Revolution\n• New imperialism\n• Nationalism\n• Social changes',
            'main_concepts': ['industrialization', 'new imperialism', 'nationalism', 'global migration'],
            'suggested_questions': '• "How did industrialization change society?"\n• "Why did imperialism expand?"\n• "What is nationalism?"\n• "How did people migrate globally?"'
        },
        'unit4': {
            'title': 'AP World Unit 4: 1900-Present',
            'overview': '**The modern world** - Global conflicts, decolonization, and contemporary challenges.',
            'key_themes': '• **Global conflicts** - World wars and Cold War\n• **Decolonization** - End of European empires\n• **Economic systems** - Capitalism, socialism, globalization\n• **Human rights** - Universal rights movements\n• **Environmental challenges** - Global cooperation needs',
            'topics_overview': '• World wars\n• Decolonization\n• Economic systems\n• Global challenges',
            'main_concepts': ['global conflicts', 'decolonization', 'economic systems', 'human rights'],
            'suggested_questions': '• "What caused the world wars?"\n• "How did decolonization happen?"\n• "How do different economic systems work?"\n• "What are today\'s global challenges?"'
        }
    }
    
    # Determine which content to use based on course
    if course == 'apush':
        return apush_content.get(unit, {
            'title': f'APUSH Unit {unit}',
            'overview': 'We\'re exploring American history!',
            'key_themes': '• Historical themes and patterns',
            'topics_overview': '• Various historical topics',
            'main_concepts': ['american history'],
            'suggested_questions': '• Ask me anything about this period!'
        })
    elif course == 'apgov' or course == 'gov':
        return apgov_content.get(unit, {
            'title': f'AP Government Unit {unit}',
            'overview': 'We\'re studying American government and politics!',
            'key_themes': '• Government structures and processes',
            'topics_overview': '• Political institutions and behaviors',
            'main_concepts': ['american government'],
            'suggested_questions': '• Ask me about government and politics!'
        })
    elif course == 'apworld' or course == 'world':
        return apworld_content.get(unit, {
            'title': f'AP World Unit {unit}',
            'overview': 'We\'re exploring world history!',
            'key_themes': '• Global patterns and connections',
            'topics_overview': '• Civilizations and global interactions',
            'main_concepts': ['world history'],
            'suggested_questions': '• Ask me about global history!'
        })
    else:
        return {
            'title': f'{course.upper()} Unit {unit}',
            'overview': 'We\'re studying this subject!',
            'key_themes': '• Key concepts and themes',
            'topics_overview': '• Various topics',
            'main_concepts': ['general concepts'],
            'suggested_questions': '• Ask me anything about this topic!'
        }

def generate_clarification_response(course, unit, recent_ai_messages):
    """Generate contextual clarification based on recent conversation"""
    if any('disease' in msg for msg in recent_ai_messages):
        return {
            'response': "**Let me clarify the disease topic!** 💭\n\nWhen Europeans came to America, they brought diseases like smallpox. Native Americans had no immunity, so about 90% died.\n\nWhat would help you understand this better - why they had no immunity, or how this changed everything?",
            'topic': 'disease_clarification',
            'source': 'conversational_socratic',
            'concepts_introduced': ['disease impact', 'immunity'],
            'progress_update': {'disease_impact': {'clarified': True}}
        }
    elif any('war' in msg for msg in recent_ai_messages):
        if course == 'apush':
            return {
                'response': "**Let me clarify the war topic!** ⚔️\n\nWars shaped American history in major ways - they changed borders, ended slavery, made us a world power.\n\nWhich war interests you most, or what specific aspect would you like to understand better?",
                'topic': 'war_clarification', 
                'source': 'conversational_socratic',
                'concepts_introduced': ['warfare', 'historical impact'],
                'progress_update': {'war_impact': {'clarified': True}}
            }
    elif any('constitution' in msg for msg in recent_ai_messages):
        return {
            'response': "**Let me clarify the Constitution!** 📜\n\nThe Constitution is our plan for government - it sets up three branches, divides federal and state power, and protects our rights.\n\nWhat would help you understand it better - how it's organized, or how it protects rights?",
            'topic': 'constitution_clarification',
            'source': 'conversational_socratic', 
            'concepts_introduced': ['constitution', 'government structure'],
            'progress_update': {'constitution': {'clarified': True}}
        }
    
    return {
        'response': "**No worries!** 📚 Let's restart with something that interests you.\n\n**What would you like to explore?**\n• Key events and turning points\n• Important people and their impact\n• How things changed over time",
        'topic': 'general_clarification',
        'source': 'conversational_socratic',
        'concepts_introduced': [],
        'progress_update': {}
    }

def handle_conflict_disease_topics(msg, course, unit, recent_ai_messages, course_info):
    """Handle questions about conflict, disease, death, harm, etc."""
    discussing_related = any('disease' in ai_msg or 'war' in ai_msg or 'conflict' in ai_msg for ai_msg in recent_ai_messages)
    
    if 'disease' in msg or 'population' in msg or ('died' in msg and course == 'apush' and unit in ['unit1', 'unit2']):
        if discussing_related:
            return {
                'response': "**Exactly! The impact was devastating.** 😔\n\nDisease was often the biggest factor in population decline - sometimes killing 90% of people who had no immunity.\n\n**Think about this:** How do you think this changed the balance of power? What made some groups more vulnerable than others?",
                'topic': 'disease_consequences',
                'source': 'conversational_socratic',
                'concepts_introduced': ['population decline', 'power dynamics'],
                'progress_update': {'disease_impact': {'analyzed': True}}
            }
        else:
            return {
                'response': "**Yes, there were often devastating population impacts.** 💔\n\nThroughout history, disease has been a major factor - especially when different populations met for the first time.\n\n**Why do you think** some groups were more vulnerable to disease than others? What factors made the difference?",
                'topic': 'disease_introduction',
                'source': 'conversational_socratic',
                'concepts_introduced': ['disease impact', 'population effects'],
                'progress_update': {'disease_impact': {'introduced': True}}
            }
    
    elif 'war' in msg or 'conflict' in msg or 'violence' in msg:
        if course == 'apush':
            if unit in ['unit3', 'unit5']:  # Revolutionary War or Civil War units
                return {
                    'response': "**War was a defining force in American history.** ⚔️\n\n**Major American wars:**\n• **Revolutionary War** - Independence from Britain\n• **Civil War** - Union vs Confederacy over slavery\n• **World Wars** - America becomes global power\n\n**Key question:** What do you think made these wars so important for American development? How did they change the nation?",
                    'topic': 'american_wars',
                    'source': 'conversational_socratic',
                    'concepts_introduced': ['revolutionary war', 'civil war', 'world wars'],
                    'progress_update': {'war_impact': {'introduced': True}}
                }
        elif course == 'apworld':
            return {
                'response': "**Conflict has shaped world history.** 🌍\n\n**Think about this:** Wars often spread technology, ideas, and diseases between different regions. They also created and destroyed empires.\n\n**What interests you more** - how wars changed borders and empires, or how they spread ideas and technology between cultures?",
                'topic': 'global_conflicts',
                'source': 'conversational_socratic', 
                'concepts_introduced': ['warfare', 'cultural exchange'],
                'progress_update': {'conflict_impact': {'introduced': True}}
            }
    
    return {
        'response': f"**That's an important aspect of {course_info['title']}.** 🤔\n\nConflict and change often go together in history. What specifically interests you about this - the causes, the consequences, or how different groups experienced it?\n\nTell me more about what you're thinking!",
        'topic': 'conflict_general',
        'source': 'conversational_socratic',
        'concepts_introduced': [],
        'progress_update': {}
    }

def handle_society_questions(msg, course, unit, course_info):
    """Handle questions about people, societies, and civilizations"""
    if course == 'apush':
        if 'native american' in msg or 'indigenous' in msg:
            return {
                'response': "**Native Americans were incredibly diverse!** 🏛️\n\n**Before Europeans arrived:**\n• **Hundreds of different societies** - Each adapted to their environment\n• **Major cities** - Cahokia had 15,000+ people (bigger than London!)\n• **Advanced agriculture** - The \"Three Sisters\" (corn, beans, squash)\n• **Complex trade networks** - Goods traveled thousands of miles\n\n**What surprises you most** about this? Many people don't realize how advanced and varied Native societies were. What would you like to explore - their cities, farming, or trade?",
                'topic': 'native_societies',
                'source': 'conversational_socratic',
                'concepts_introduced': ['native diversity', 'cahokia', 'three sisters'],
                'progress_update': {'native_societies': {'introduced': True}}
            }
        elif any(word in msg for word in ['colonial', 'colonist', 'puritan', 'pilgrim']):
            return {
                'response': "**Colonial Americans developed distinct regional cultures!** 🏘️\n\n**Three main regions:**\n• **New England** - Puritans, small farms, shipping, education\n• **Middle Colonies** - Diverse religions, wheat farming, cities\n• **Southern Colonies** - Plantation agriculture, slavery, aristocratic culture\n\n**Interesting question:** Why do you think these regions developed so differently? What factors shaped their unique characteristics?",
                'topic': 'colonial_society',
                'source': 'conversational_socratic',
                'concepts_introduced': ['colonial regions', 'regional differences'],
                'progress_update': {'colonial_society': {'introduced': True}}
            }
    
    elif course == 'apworld':
        return {
            'response': f"**Societies around the world were amazingly diverse!** 🌏\n\n**In this period**, you had everything from:\n• **Nomadic empires** (like the Mongols)\n• **Agricultural civilizations** (like China and India)\n• **Trading city-states** (like in East Africa)\n• **Island societies** (like in Southeast Asia)\n\n**What fascinates you** - how geography shaped these societies, how they interacted with each other, or their different ways of organizing government?",
            'topic': 'world_societies',
            'source': 'conversational_socratic',
            'concepts_introduced': ['global diversity', 'civilization types'],
            'progress_update': {'world_societies': {'introduced': True}}
        }
    
    return {
        'response': f"**Great question about societies in {course_info['title']}!** 👥\n\nSocieties in this period had fascinating ways of organizing themselves - different economic systems, social structures, and cultural practices.\n\nWhat specifically interests you - how they were organized, how people lived, or how they changed over time?",
        'topic': 'society_general',
        'source': 'conversational_socratic',
        'concepts_introduced': [],
        'progress_update': {}
    }

def handle_government_questions(msg, course, unit, course_info):
    """Handle questions about government, politics, constitution, etc."""
    if course == 'apgov':
        if 'constitution' in msg:
            return {
                'response': "**The Constitution is our government's blueprint!** 📜\n\n**Key principles:**\n• **Separation of powers** - Legislative, Executive, Judicial\n• **Checks and balances** - Each branch limits the others\n• **Federalism** - Power shared between national and state governments\n• **Bill of Rights** - Protects individual liberties\n\n**Here's the big question:** Why did the founders think these principles were so important? What were they trying to prevent?",
                'topic': 'constitution',
                'source': 'conversational_socratic',
                'concepts_introduced': ['separation of powers', 'checks and balances', 'federalism'],
                'progress_update': {'constitution': {'introduced': True}}
            }
        elif 'congress' in msg or 'president' in msg:
            return {
                'response': "**Great question about how our government actually works!** 🏛️\n\n**The branches have different jobs:**\n• **Congress** - Makes laws, controls spending\n• **President** - Executes laws, commander-in-chief\n• **Courts** - Interpret laws, check other branches\n\n**But here's the interesting part:** They're designed to compete with each other! Why do you think the founders wanted that tension?",
                'topic': 'branches_government',
                'source': 'conversational_socratic',
                'concepts_introduced': ['congressional power', 'presidential power', 'judicial review'],
                'progress_update': {'government_branches': {'introduced': True}}
            }
    
    elif course == 'apush':
        if unit in ['unit3', 'unit4']:  # Revolutionary era or Early Republic
            return {
                'response': "**Creating American government was a huge challenge!** 🇺🇸\n\n**The big questions:**\n• How much power should the federal government have?\n• How do you balance majority rule with minority rights?\n• How do you prevent tyranny while staying effective?\n\n**Think about this:** The founders had just fought a war against a government they saw as tyrannical. How did that experience shape their choices about American government?",
                'topic': 'american_government_creation',
                'source': 'conversational_socratic',
                'concepts_introduced': ['federal power', 'tyranny prevention'],
                'progress_update': {'government_creation': {'introduced': True}}
            }
    
    return {
        'response': f"**Government is a key theme in {course_info['title']}!** 🗳️\n\nDifferent societies have organized political power in fascinating ways - from empires to democracies to city-states.\n\nWhat interests you most - how governments get their power, how they use it, or how they change over time?",
        'topic': 'government_general',
        'source': 'conversational_socratic',
        'concepts_introduced': [],
        'progress_update': {}
    }

def handle_economic_questions(msg, course, unit, course_info):
    """Handle questions about economics, trade, industry, agriculture, etc."""
    if course == 'apworld' and 'trade' in msg:
        return {
            'response': "**Trade networks connected the ancient world!** 🛣️\n\n**Major trade routes:**\n• **Silk Roads** - Connected Asia with Europe and Africa\n• **Indian Ocean** - Maritime trade across the ocean\n• **Trans-Saharan** - Caravans across the Sahara Desert\n• **Mediterranean** - Connected Europe, Asia, and Africa\n\n**Here's the fascinating part:** Merchants didn't just trade goods - they also spread ideas, religions, and diseases! How do you think trade changed the societies it connected?",
            'topic': 'global_trade',
            'source': 'conversational_socratic',
            'concepts_introduced': ['silk roads', 'indian ocean trade', 'trans-saharan'],
            'progress_update': {'global_trade': {'introduced': True}}
        }
    
    elif course == 'apush':
        if unit in ['unit4', 'unit6']:  # Market Revolution or Gilded Age
            return {
                'response': "**The American economy was transforming!** 💰\n\n**Major changes:**\n• **Transportation revolution** - Canals, railroads connected markets\n• **Industrial growth** - Factories replaced home production\n• **Agricultural commercialization** - Farming for markets, not just subsistence\n• **Urban growth** - Cities became economic centers\n\n**Think about this:** How do you think these economic changes affected ordinary people's daily lives? Who benefited most and who struggled?",
                'topic': 'american_economic_change',
                'source': 'conversational_socratic',
                'concepts_introduced': ['market revolution', 'industrialization'],
                'progress_update': {'economic_change': {'introduced': True}}
            }
    
    return {
        'response': f"**Economics is crucial to understanding {course_info['title']}!** 💼\n\nEconomic systems - how people produce, trade, and distribute goods - shaped societies in fundamental ways.\n\nWhat interests you most - how trade worked, how technology changed production, or how economic changes affected different social groups?",
        'topic': 'economics_general',
        'source': 'conversational_socratic',
        'concepts_introduced': [],
        'progress_update': {}
    }

def handle_cultural_questions(msg, course, unit, course_info):
    """Handle questions about culture, religion, social movements, etc."""
    if course == 'apush' and any(word in msg for word in ['religion', 'religious', 'awakening']):
        return {
            'response': "**Religion played a huge role in American history!** ⛪\n\n**Major religious movements:**\n• **Great Awakening** (1730s-40s) - Emotional Christianity, challenged authority\n• **Second Great Awakening** (1800s) - Inspired reform movements\n• **Puritanism** - Shaped New England culture\n• **Religious diversity** - Different colonies, different faiths\n\n**Interesting question:** How do you think religious revivals connected to social and political changes? Why might emotional religion appeal during times of change?",
            'topic': 'american_religion',
            'source': 'conversational_socratic',
            'concepts_introduced': ['great awakening', 'religious diversity'],
            'progress_update': {'american_religion': {'introduced': True}}
        }
    
    elif 'culture' in msg or 'social' in msg:
        return {
            'response': f"**Culture and society were constantly changing in {course_info['title']}!** 🎭\n\n**Cultural changes include:**\n• New ideas about government, society, and individual rights\n• Artistic and literary movements\n• Changes in daily life and social customs\n• Religious and philosophical developments\n\n**Think about this:** What forces do you think drive cultural change? How do new ideas spread through society?",
            'topic': 'cultural_change',
            'source': 'conversational_socratic',
            'concepts_introduced': ['cultural change', 'idea spread'],
            'progress_update': {'culture': {'introduced': True}}
        }
    
    return {
        'response': f"**Cultural aspects of {course_info['title']} are fascinating!** 🎨\n\nCulture - the ideas, beliefs, arts, and customs of societies - both shapes and is shaped by political and economic changes.\n\nWhat interests you most - how cultures develop, how they interact with each other, or how they change over time?",
        'topic': 'culture_general',
        'source': 'conversational_socratic',
        'concepts_introduced': [],
        'progress_update': {}
    }

        
@app.route("/api/quiz/answer", methods=["POST", "OPTIONS"])
@cross_origin(origins=[
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://127.0.0.1:5173",
    "https://cloudybm05.github.io",
    "https://aphelper.tech",
    "https://www.aphelper.tech",
    "https://ap-helper-2d9f117e9bdb.herokuapp.com"
], supports_credentials=True, methods=["GET", "POST", "OPTIONS"], allow_headers="*")
# @require_auth  # Temporarily disabled for local testing
def quiz_answer():
    data = request.json
    user_id = data.get("userId")
    topic = data.get("topic")
    selected_answer = data.get("selectedAnswer")
    correct_answer = data.get("correctAnswer")
    course = data.get("course")
    unit = data.get("unit")
    
    try:
        is_correct = selected_answer == correct_answer
        progress_update = {}
        
        if is_correct:
            progress_update[topic] = {
                "introduced": True,
                "practiced": True,
                "mastered": True,
                "quizPassed": True,
                "quizScore": 100
            }
            message = "Excellent work! You've mastered this topic. 🎉"
        else:
            progress_update[topic] = {
                "introduced": True,
                "practiced": True,
                "mastered": False,
                "quizPassed": False,
                "needsReview": True
            }
            message = "Not quite right, but that's how we learn! Let's review this concept. 📚"
        
        return jsonify({
            "message": message,
            "progressUpdate": progress_update,
            "timestamp": datetime.now(timezone.utc).isoformat()
        })
        
    except Exception as e:
        print(f"Error in quiz answer: {e}")
        return jsonify({"error": "Failed to process quiz answer."}), 500

@app.route("/api/socratic-chat", methods=["POST", "OPTIONS"])
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
def socratic_chat():
    data = request.json
    question = data.get("question")
    chat_history = data.get("chat_history", [])
    course = data.get("course", "apush")
    unit = data.get("unit", "unit1")
    user_id = data.get("user_id", "anonymous")

    if not question:
        return jsonify({"error": "Question is required."}), 400

    try:
        # Use the updated Socratic AI system
        socratic_data = get_socratic_response(question, course, unit, chat_history)
        
        # Calculate completion status 
        study_content = load_study_guide_content(unit, course)
        total_sections = len(study_content.get('sections', {})) if study_content else 0
        learned_sections = len(socratic_data.get('progress_update', {}))
        
        overall_progress = (learned_sections / total_sections * 100) if total_sections > 0 else 0
        ready_for_assessment = overall_progress >= 80
        
        return jsonify({
            "response": socratic_data['response'],
            "source": "socratic_ai_system",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "topic": socratic_data.get('topic', 'general'),
            "concepts_introduced": socratic_data.get('concepts_introduced', []),
            "progress_update": socratic_data.get('progress_update', {}),
            "overall_progress": overall_progress,
            "ready_for_assessment": ready_for_assessment
        })
        
    except Exception as e:
        print(f"Error calling Socratic AI: {e}")
        return jsonify({"error": "Failed to get response from Socratic AI."}), 500

# Duplicate endpoint disabled - using the main one above that has all course data
# @app.route("/api/unit-topics", methods=["GET", "OPTIONS"])
# @cross_origin(origins=[
#     "http://localhost:5173",
#     "http://localhost:5174", 
#     "http://127.0.0.1:5173",
#     "http://127.0.0.1:5174",
#     "https://cloudybm05.github.io",
#     "https://aphelper.tech",
#     "https://www.aphelper.tech",
#     "https://ap-helper-2d9f117e9bdb.herokuapp.com"
# ], supports_credentials=True, methods=["GET", "OPTIONS"], allow_headers="*")
# def get_unit_topics():
#     """Get list of topics for a specific unit"""
#     try:
#         # Get unit parameter
#         unit = request.args.get('unit', '').strip()
#         course = request.args.get('course', '').strip()
#         
#         if not unit:
#             return jsonify({
#                 "error": "Unit parameter is required"
#             }), 400
#         
#         # Normalize unit format
#         if unit and isinstance(unit, str):
#             unit = unit.lower()
#             if "unit " in unit:
#                 unit = unit.replace(" ", "")
#         
#         # First try to load study guide content
#         study_content = load_study_guide_content(unit, course)
        
        # Check if study guide has meaningful content
        has_meaningful_content = (
            study_content and 
            'sections' in study_content and 
            len(study_content.get('sections', {})) > 0 and
            study_content.get('overview', '').strip() != 'Unit information not available yet.'
        )
        
        # If no meaningful study guide content, generate topics from Socratic AI course context
        if not has_meaningful_content:
            # Use the same comprehensive content that Socratic AI uses
            course_context = get_course_context(course, unit)
            
            # Generate topics from course context
            topics = []
            main_concepts = course_context.get('main_concepts', [])
            overview = course_context.get('overview', 'Comprehensive study content for this unit.')
            
            # Create topic entries from main concepts
            for i, concept in enumerate(main_concepts, 1):
                topics.append({
                    'key': concept.replace(' ', '_').lower(),
                    'title': concept.replace('_', ' ').title(),
                    'keyFacts': [
                        f"Key concept in {course_context.get('title', 'this unit')}",
                        "Covered comprehensively in Socratic AI chat",
                        "Ask questions to explore this topic in depth",
                        "Context-aware explanations available"
                    ]
                })
            
            # If no main concepts, create a default topic
            if not topics:
                topics.append({
                    'key': 'comprehensive_content',
                    'title': 'Comprehensive Unit Content',
                    'keyFacts': [
                        "All unit topics available through Socratic AI",
                        "Context-aware tutoring system",
                        "Ask any question about this unit",
                        "Dynamic content generation"
                    ]
                })
            
            return jsonify({
                "unit": unit,
                "course": course,
                "overview": overview,
                "topics": topics
            })
        
        # Convert study guide sections to topic list
        topics = []
        for section_key, section_data in study_content['sections'].items():
            topics.append({
                'key': section_key,
                'title': section_data.get('title', section_key.replace('_', ' ').title()),
                'keyFacts': section_data.get('key_facts', [])
            })
        
        return jsonify({
            "unit": unit,
            "course": course,
            "overview": study_content.get('overview', '').strip(),
            "topics": topics
        })
        
    except Exception as e:
        print(f"Error getting unit topics: {e}")
        return jsonify({
            "error": "Failed to get unit topics"
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
