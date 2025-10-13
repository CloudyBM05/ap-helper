from flask import Flask, request, jsonify
from flask_cors import cross_origin
import openai
import os
import json
from dotenv import load_dotenv
import jwt
from functools import wraps
from datetime import datetime, timezone

load_dotenv()

app = Flask(__name__)

# Store your OpenAI API key securely (use environment variable in production)
openai.api_key = os.environ.get("OPENAI_API_KEY")

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
            import re
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
            import re
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
        import traceback
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
            import re
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
        import traceback
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
            import re
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
        import traceback
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
            import re
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
        import traceback
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
            import re
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
        import traceback
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
            import re
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
        import traceback
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
            import re
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
        import traceback
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
            import re
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
        import traceback
        print("Error in /api/grade-apbio-frq:", e)
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
