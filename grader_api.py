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
        # Check if this is an advanced question that could benefit from Gemini
        advanced_keywords = ['analyze', 'compare', 'evaluate', 'significance', 'impact', 'why', 'how', 'what if', 'consequences', 'complex', 'relationship', 'factors', 'causes', 'effects', 'explain']
        is_advanced_question = any(keyword in message.lower() for keyword in advanced_keywords) or len(message.split()) > 10
        
        # Try Gemini for advanced questions when available
        socratic_data = None
        if is_advanced_question:
            socratic_data = get_gemini_socratic_response(message, course, unit, conversation_history)
        
        # Fall back to traditional Socratic response if Gemini not available or for basic questions
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
        # Build context for Gemini
        context = f"""You are an expert Socratic tutor for {course.upper()} {unit.upper()}. 

Your teaching philosophy:
- Ask thoughtful questions rather than giving direct answers
- Guide students to discover knowledge themselves
- Build on their existing knowledge
- Use historical evidence and examples
- Encourage critical thinking

Student's message: "{user_input}"

Previous conversation: {str(conversation_history[-3:]) if conversation_history else 'No previous conversation'}

Respond with a Socratic question or guided discussion that helps the student explore the topic deeper. Keep responses under 150 words."""

        model = genai.GenerativeModel('gemini-3-flash-preview')
        response = model.generate_content(context)
        
        if response and response.text:
            return {
                'response': response.text.strip(),
                'source': 'gemini_ai',
                'topic': 'advanced_discussion',
                'concepts_introduced': [],
                'progress_update': {}
            }
    except Exception as e:
        print(f"Gemini API error: {e}")
        # Try to list available models for debugging
        try:
            for model in genai.list_models():
                if 'generateContent' in model.supported_generation_methods:
                    print(f"Available Gemini model: {model.name}")
        except:
            pass
        # Fall back to traditional responses
        pass
    
    return None

# Enhanced Socratic tutoring system with all APUSH units support
def get_socratic_response(user_input, course, unit, conversation_history):
    """Enhanced Socratic AI that works with all APUSH units dynamically"""
    msg = user_input.lower()
    
    # Normalize unit format - handle both "Unit 1" and "unit1" formats
    if unit and isinstance(unit, str):
        # Convert "Unit 1", "UNIT 1", "Unit1", etc. to "unit1"
        unit = unit.lower()
        if "unit " in unit:
            unit = unit.replace(" ", "")
    
    # Load study guide content for the specific unit
    study_content = load_study_guide_content(unit, course)
    
    # Convert study guide content to topics format dynamically
    unit_topics = {}
    if study_content and 'sections' in study_content:
        for section_key, section_data in study_content['sections'].items():
            unit_topics[section_key] = {
                'title': section_data.get('title', section_key.replace('_', ' ').title()),
                'key_concepts': section_data.get('key_facts', [])
            }
    
    if not unit_topics:
        # Fallback for unrecognized units
        return {
            'response': f"I'm ready to help you learn about {unit}! What specific topic or question would you like to explore?",
            'topic': 'general',
            'source': 'enhanced_socratic_system',
            'concepts_introduced': [],
            'progress_update': {}
        }
    
    # Analyze user's knowledge level from conversation history
    def analyze_user_progress(user_input, topic_key, conversation_history):
        user_messages = [msg.get('content', '') for msg in conversation_history if msg.get('sender') == 'user']
        all_user_text = ' '.join(user_messages + [user_input]).lower()
        
        if topic_key not in unit_topics:
            return {'introduced': False, 'practiced': False, 'mastered': False, 'concepts_mentioned': []}
        
        topic_data = unit_topics[topic_key]
        concepts_mentioned = []
        
        # Check which concepts the user has mentioned
        for concept in topic_data['key_concepts']:
            concept_keywords = concept.lower().split()[:3]  # First 3 words as keywords
            if any(keyword in all_user_text for keyword in concept_keywords):
                concepts_mentioned.append(concept)
        
        # Determine progress level
        num_concepts = len(concepts_mentioned)
        total_concepts = len(topic_data['key_concepts'])
        
        introduced = num_concepts > 0 or any(keyword in all_user_text for keyword in [topic_key.lower(), topic_data['title'].lower().split()[0]])
        practiced = num_concepts >= 2 and len(user_messages) >= 3
        mastered = num_concepts >= 4 and len(user_messages) >= 6 and any(advanced_word in all_user_text for advanced_word in ['analyze', 'compare', 'evaluate', 'significance', 'impact'])
        
        return {
            'introduced': introduced,
            'practiced': practiced, 
            'mastered': mastered,
            'concepts_mentioned': concepts_mentioned,
            'concept_count': num_concepts,
            'total_concepts': total_concepts
        }
    
    # Detect current topic
    detected_topic = 'general'
    for topic_key in unit_topics.keys():
        topic_keywords = topic_key.lower()
        topic_title_words = unit_topics[topic_key]['title'].lower().split()
        
        if topic_keywords in msg or any(word in msg for word in topic_title_words[:2]):
            detected_topic = topic_key
            break
    
    # Handle complete beginner requests
    if any(phrase in msg for phrase in ["dont know", "don't know", "no idea", "never heard", "completely lost", "nothing", "confused", "lost"]):
        # Get overview from study content
        overview = study_content.get('overview', f"Let's start with {unit}!")
        first_section = list(unit_topics.values())[0] if unit_topics else {}
        sample_concepts = first_section.get('key_concepts', [])[:3] if first_section else []
        
        return {
            'response': f"No worries! Let's start with the big picture. {overview} What aspect interests you most?",
            'topic': 'general',
            'concepts_introduced': sample_concepts,
            'progress_update': {'general': {'introduced': True, 'concepts_learned': sample_concepts}}
        }
        
    # Handle overview/explanation requests
    if any(phrase in msg for phrase in ["what is", "what was", "can you explain", "please explain", "help me understand", "give me information", "tell me about", "overview"]):
        overview = study_content.get('overview', f"Here's an overview of {unit}:")
        
        # Get key concepts from first few sections
        introduced_concepts = []
        progress_update = {}
        
        for section_key, section_data in list(unit_topics.items())[:3]:  # First 3 sections
            concepts = section_data.get('key_concepts', [])[:2]  # First 2 concepts per section
            introduced_concepts.extend(concepts)
            progress_update[section_key] = {'introduced': True, 'concepts_learned': concepts}
        
        return {
            'response': f"{overview} Which part would you like to dive deeper into?",
            'topic': 'general',
            'concepts_introduced': introduced_concepts,
            'progress_update': progress_update
        }
    
    # Topic-specific intelligent responses
    if detected_topic in unit_topics:
        topic_data = unit_topics[detected_topic]
        user_progress = analyze_user_progress(user_input, detected_topic, conversation_history)
        
        # Beginner level - introduce core concepts
        if not user_progress['practiced']:
            key_concepts = topic_data['key_concepts'][:3]  # First 3 concepts
            concept_text = ', '.join(key_concepts)
            
            response = f"Great question about {topic_data['title']}! Key facts: {concept_text}. What questions do you have about these developments?"
                    
            return {
                'response': response,
                'topic': detected_topic,
                'source': 'enhanced_socratic_system',
                'concepts_introduced': key_concepts,
                'progress_update': {detected_topic: {'introduced': True, 'practiced': True, 'concepts_learned': key_concepts}}
            }
        
        # Advanced level - push for deeper analysis
        elif user_progress['practiced'] and not user_progress['mastered']:
            response = f"You're developing good knowledge of {topic_data['title']}! Now let's think critically: Can you analyze the broader significance and long-term consequences of these developments?"
                    
            return {
                'response': response,
                'topic': detected_topic,
                'source': 'enhanced_socratic_system',
                'concepts_introduced': [],
                'progress_update': {detected_topic: {'practiced': True, 'advanced_thinking': True}}
            }
        
        # Mastery level - synthesis and assessment readiness
        elif user_progress['mastered']:
            mastery_response = f"Outstanding mastery of {topic_data['title']}! You've demonstrated deep understanding of {len(user_progress['concepts_mentioned'])} key concepts. You're ready for assessment questions on this topic!"
            
            return {
                'response': mastery_response,
                'topic': detected_topic,
                'source': 'enhanced_socratic_system',
                'concepts_introduced': [],
                'progress_update': {detected_topic: {'mastered': True, 'ready_for_assessment': True}}
            }
    
    # General Socratic questions for non-topic-specific input
    socratic_questions = [
        f"What evidence supports that idea? Can you think of specific examples from {unit}?",
        f"How does this connect to what we know about this time period? What patterns do you notice?",
        "What do you think were the most important causes? Can you rank them by significance?",
        "If you were in that situation, what factors would influence your decisions?",
        "How might different groups have experienced this differently?",
        "What questions does this raise for you? What would you want to investigate further?",
        "Can you compare this to other historical events? What similarities and differences do you notice?"
    ]
    
    import random
    return {
        'response': random.choice(socratic_questions),
        'topic': 'general',
        'source': 'enhanced_socratic_system',
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

@app.route("/api/unit-topics", methods=["GET", "OPTIONS"])
@cross_origin(origins=[
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "https://cloudybm05.github.io",
    "https://aphelper.tech",
    "https://www.aphelper.tech",
    "https://ap-helper-2d9f117e9bdb.herokuapp.com"
], supports_credentials=True, methods=["GET", "OPTIONS"], allow_headers="*")
def get_unit_topics():
    """Get list of topics for a specific unit"""
    try:
        # Get unit parameter
        unit = request.args.get('unit', '').strip()
        course = request.args.get('course', '').strip()
        
        if not unit:
            return jsonify({
                "error": "Unit parameter is required"
            }), 400
        
        # Normalize unit format
        if unit and isinstance(unit, str):
            unit = unit.lower()
            if "unit " in unit:
                unit = unit.replace(" ", "")
        
        # Load study guide content for the specific unit
        study_content = load_study_guide_content(unit, course)
        
        if not study_content or 'sections' not in study_content:
            return jsonify({
                "error": f"No content found for unit: {unit}"
            }), 404
        
        # Convert sections to topic list
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
