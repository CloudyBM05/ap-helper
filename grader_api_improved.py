from flask import Flask, request, jsonify
from flask_cors import cross_origin
import openai
import os
import json
import random
import re
from dotenv import load_dotenv
import jwt
from functools import wraps
from datetime import datetime, timezone
import traceback

load_dotenv()

app = Flask(__name__)

# Store your OpenAI API key securely (use environment variable in production)
openai.api_key = os.environ.get("OPENAI_API_KEY")

# Initialize Firebase Admin SDK - Make it completely optional for local development
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
    endpoint_type: 'saq', 'dbq', 'leq', 'essay', 'apgov', 'psych-frq', etc.
    Returns: (allowed: bool, message: str)
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

# Progress tracking system - persistent storage for Socratic learning
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

def load_study_guide_content(unit):
    """Load accurate study guide content from our TSX files - 100% accurate content"""
    unit_content = {
        'unit1': {
            'overview': 'Native American Societies and European Exploration (1491-1607)',
            'sections': {
                'native_american_peoples': {
                    'title': 'Native American Peoples',
                    'key_facts': [
                        'Aztecs: Central Mexico, sprawling cities, hierarchical governments, written language, advanced canals, ritual offerings',
                        'Mayans: Yucatan Peninsula, massive cities, complex waterworks, soaring stone temples, divine rulers',
                        'Incas: Andes and Pacific coast, 16 million people, well-organized empire, terraced fields for potatoes, extensive road network',
                        'Maize: Powerhouse crop, high yields drove population booms, sophisticated irrigation, diverse social hierarchies',
                        'Southwest Pueblo: New Mexico and Arizona, permanent adobe and stone villages, cultivated corn, beans, and squash',
                        'Great Plains: Small kin-based bands, roamed plains hunting bison and gathering roots, valued mobility and shared resources',
                        'Pacific Northwest: Chinook and Chumash, fished salmon, massive cedar plank houses, ocean voyage canoes',
                        'Mississippi Valley: Hopewell (4-6K people) and Cahokia (10-30K people), fertile agriculture, wide trade, centralized chiefs',
                        'Northeast Iroquois: Communal longhouses, Three Sisters agriculture (corn, beans, squash), confederacies of allied villages'
                    ]
                },
                'european_exploration': {
                    'title': 'European Exploration of the Americas',
                    'key_facts': [
                        'Motivations: Post-plague population surge, centralized monarchies funding luxury-hungry elites, merchants seeking new Asian spice routes',
                        'Challenges: Overland routes across Afro-Eurasia controlled by Muslim powers, limited direct European access to eastern markets',
                        'Portugal Solution: Prince Henry built coastal forts, deployed caravels, adopted astrolabes and stern-post rudders to sail around Africa',
                        'Spain Entry: Ferdinand and Isabella unified Spain, backed Columbus westward voyage 1492, accidentally landed Caribbean while chasing spices'
                    ]
                },
                'columbian_exchange': {
                    'title': 'The Columbian Exchange',
                    'key_facts': [
                        'Definition: Vast transfer of plants, animals, minerals, people, diseases between Old and New Worlds',
                        'Disease: European smallpox and measles decimated Native populations (Hispaniola lost ~300K people), Europeans and Africans had greater immunity',
                        'Crops: New World maize, potatoes, tomatoes, cacao, tobacco transformed European diets; Old World grains, citrus, rice enriched American fields',
                        'Animals & Minerals: Horses, pigs, cattle reshaped American landscape; American silver and gold bolstered Spanish treasuries',
                        'People: Forced migrations included African slaves to Americas, some Native Americans to Europe, underpinned brutal plantation economies'
                    ]
                },
                'labor_systems': {
                    'title': 'Labor Systems and Societal Restructuring', 
                    'key_facts': [
                        'African Slavery: Pre-European African servitude was limited and non-hereditary; Europeans transformed it into lifelong, inheritable bondage for plantations',
                        'Encomienda: Spanish settlers granted land and forced native labor under religious guise, high native mortality led to imported African labor',
                        'Caste System: Spain imposed rigid social tiers—Peninsulares, Creoles, Mestizos, Mulattos, Africans, Native Americans—to regulate taxes and labor',
                        'Economic Impact: New World silver enriched European elites but often deepened peasant poverty'
                    ]
                },
                'spanish_colonial_dominance': {
                    'title': 'Spanish Colonial Dominance in the Americas',
                    'key_facts': [
                        'Mission System: Spain extended reach by sending missionaries northward to convert Native Americans rather than conquering solely by force',
                        'Cultural Exchange: Spaniards traded metal tools, horses, fur-trade partnerships; some Europeans married into native tribes for alliances',
                        'Resistance: 1680 Pueblo Revolt briefly expelled Spanish priests, showcased power of unified indigenous action',
                        'Debate on Conquest: Bartolomé de Las Casas condemned Spanish brutality, while others insisted on civilizations mandate to conquer'
                    ]
                },
                'timeline_events': {
                    'title': 'Key Timeline Events',
                    'key_facts': [
                        '1492: Columbus arrives in Caribbean, initiating sustained European contact with Americas',
                        '1519: Cortés conquers Aztecs, allies with native groups hostile to Aztecs, smallpox and advanced weaponry aid Spanish victory',
                        '1533: Pizarro conquers Incas, Spanish gain vast wealth from silver and gold mines, collapse of Inca structures',
                        '1565: St. Augustine founded, first permanent European settlement in US, Spanish military outpost and mission center',
                        '1588: English defeat Spanish Armada, Spanish naval power declines, English begin establishing North American colonies',
                        '1607: Jamestown founded, first permanent English settlement in North America, early struggles with disease and starvation',
                        '1619: First Africans arrive in Virginia, marking start of African slavery in English colonies'
                    ]
                }
            }
        }
        # Add other units here as needed
    }
    return unit_content.get(unit, {})

# Enhanced Socratic AI endpoints
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
# Uncomment the line below to enable authentication
# @require_auth
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
        # Enhanced Socratic tutoring system with accurate study guide integration
        def get_enhanced_socratic_response(user_input, course, unit, conversation_history, user_id):
            msg = user_input.lower()
            
            # Load accurate study guide content
            study_content = load_study_guide_content(unit)
            if not study_content:
                return {
                    'response': f"I'm ready to help you learn about {unit}! What specific topic or question would you like to explore?",
                    'topic': 'general',
                    'concepts_introduced': [],
                    'progress_update': {}
                }
            
            # Get unit sections
            unit_sections = study_content.get('sections', {})
            
            # Load user progress
            progress_data = load_user_progress()
            user_progress = progress_data.get(user_id, {}).get(f"{course}_{unit}", {})
            
            # Track conversation patterns to balance answering vs questioning
            user_message_count = len([m for m in conversation_history if m.get('sender') == 'user'])
            question_ratio = 0.3 if user_message_count < 3 else 0.5  # Ask questions 30% of time initially, 50% later
            
            # Detect what topic user is asking about
            detected_topic = None
            for section_key, section_data in unit_sections.items():
                section_keywords = section_key.replace('_', ' ').split()
                title_keywords = section_data['title'].lower().split()
                
                # Check if message contains topic keywords
                if any(keyword in msg for keyword in section_keywords) or any(keyword in msg for keyword in title_keywords):
                    detected_topic = section_key
                    break
                
                # Also check key facts for matching concepts
                for fact in section_data['key_facts']:
                    fact_keywords = fact.lower().split()[:4]  # First 4 words
                    if any(keyword in msg for keyword in fact_keywords if len(keyword) > 3):
                        detected_topic = section_key
                        break
                if detected_topic:
                    break
            
            # Handle specific question types
            is_question = any(q in msg for q in ["what", "who", "when", "where", "why", "how", "can you explain", "tell me about"])
            is_confused = any(phrase in msg for phrase in ["don't understand", "confused", "don't know", "help me", "explain"])
            is_compare = any(phrase in msg for phrase in ["compare", "difference", "similar", "versus", "vs"])
            
            # If user is asking for specific information, provide it (more answering, less questioning)
            if is_question or is_confused:
                if detected_topic and detected_topic in unit_sections:
                    section = unit_sections[detected_topic]
                    
                    # Select relevant facts based on user question
                    relevant_facts = []
                    question_keywords = msg.split()
                    
                    for fact in section['key_facts']:
                        # Score relevance based on keyword matches
                        fact_words = fact.lower().split()
                        matches = sum(1 for word in question_keywords if word in fact_words and len(word) > 3)
                        if matches > 0:
                            relevant_facts.append((fact, matches))
                    
                    # Sort by relevance and take top 3-4
                    relevant_facts.sort(key=lambda x: x[1], reverse=True)
                    selected_facts = [fact for fact, score in relevant_facts[:4]]
                    
                    if not selected_facts:
                        selected_facts = section['key_facts'][:3]  # Default to first 3
                    
                    # Create informative response with minimal questioning
                    response = f"Great question about {section['title']}! Here's what you should know:\n\n"
                    for i, fact in enumerate(selected_facts, 1):
                        response += f"• {fact}\n"
                    
                    # Add a light follow-up question only occasionally
                    if question_ratio > 0.5 and len(selected_facts) > 1:
                        followup_questions = [
                            f"Which of these aspects of {section['title'].lower()} interests you most?",
                            f"How do you think these developments in {section['title'].lower()} affected other groups?",
                            f"What questions do these facts about {section['title'].lower()} raise for you?"
                        ]
                        response += f"\n{random.choice(followup_questions)}"
                    
                    # Update progress
                    progress_update = {
                        detected_topic: {
                            'introduced': True,
                            'concepts_learned': selected_facts,
                            'last_interaction': datetime.now(timezone.utc).isoformat()
                        }
                    }
                    
                    return {
                        'response': response,
                        'topic': detected_topic,
                        'concepts_introduced': selected_facts,
                        'progress_update': progress_update
                    }
                
                # General question without specific topic
                else:
                    overview = study_content.get('overview', '')
                    response = f"Let me give you an overview of {overview}:\n\n"
                    
                    # Provide key points from each section
                    for section_key, section_data in list(unit_sections.items())[:3]:  # First 3 sections
                        response += f"**{section_data['title']}**: {section_data['key_facts'][0]}\n\n"
                    
                    response += "What specific aspect would you like to explore further?"
                    
                    return {
                        'response': response,
                        'topic': 'overview',
                        'concepts_introduced': [overview],
                        'progress_update': {'overview': {'introduced': True}}
                    }
            
            # Handle comparison requests (provide factual comparison with minimal questioning)
            elif is_compare:
                if 'native' in msg and 'european' in msg:
                    response = "Here's how Native American and European societies differed:\n\n"
                    response += "**Native American Societies:**\n"
                    response += "• Diverse societies: Cahokia (10-30K people), Tenochtitlan (200K+ people)\n"
                    response += "• Sophisticated agriculture: Three Sisters (corn, beans, squash), terraced fields\n"
                    response += "• Complex trade networks spanning continental distances\n\n"
                    response += "**European Societies:**\n" 
                    response += "• Centralized monarchies funding exploration for wealth and prestige\n"
                    response += "• Advanced naval technology: caravels, astrolabes, steel weapons\n"
                    response += "• Motivated by 'Three Gs': God (Christianity), Gold (wealth), Glory (prestige)\n\n"
                    response += "The collision of these very different worlds led to massive changes for both sides."
                    
                    return {
                        'response': response,
                        'topic': 'comparison',
                        'concepts_introduced': ['Native American societies', 'European societies', 'cultural collision'],
                        'progress_update': {'comparison': {'mastered': True}}
                    }
            
            # For general statements or when user shares knowledge, provide encouragement + accurate facts
            else:
                # Acknowledge what they know and build on it
                response = "That's a good observation! "
                
                if detected_topic and detected_topic in unit_sections:
                    section = unit_sections[detected_topic]
                    response += f"Building on that, here are some key facts about {section['title']}:\n\n"
                    
                    # Add 2-3 relevant facts
                    for fact in section['key_facts'][:3]:
                        response += f"• {fact}\n"
                    
                    # Occasionally add a thought-provoking question
                    if random.random() < question_ratio:
                        response += f"\nWhat do you think was the most significant impact of {section['title'].lower()}?"
                else:
                    # General encouragement with overview
                    response += "Let me add some context:\n\n"
                    overview_facts = []
                    for section_data in list(unit_sections.values())[:2]:
                        overview_facts.extend(section_data['key_facts'][:1])
                    
                    for fact in overview_facts:
                        response += f"• {fact}\n"
                    
                    response += "\nWhat would you like to explore next?"
                
                return {
                    'response': response,
                    'topic': detected_topic or 'general',
                    'concepts_introduced': [],
                    'progress_update': {}
                }
        
        # Get enhanced response
        socratic_data = get_enhanced_socratic_response(message, course, unit, conversation_history, user_id)
        
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
        total_sections = len(load_study_guide_content(unit).get('sections', {}))
        learned_sections = len([k for k, v in user_progress.items() if v.get('introduced') or v.get('mastered')])
        
        overall_progress = (learned_sections / total_sections * 100) if total_sections > 0 else 0
        ready_for_assessment = learned_sections >= max(1, total_sections * 0.8)  # 80% completion
        
        completion_message = ""
        if ready_for_assessment and overall_progress >= 80:
            completion_message = "\n\n🎓 **Excellent progress!** You've learned most of the key concepts in this unit. You're ready for the unit assessment!"

        return jsonify({
            "response": socratic_data['response'] + completion_message,
            "source": "enhanced_socratic_system",
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

# Include all your existing grading endpoints here
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
    system_prompt += "\n\nRespond ONLY with a JSON array of 3 objects, one per part: [{'score': 1, 'explanation': '...'}] No extra text or formatting."

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
            print("Failed to parse AI response as JSON:", content)
            return jsonify({"error": "Failed to parse AI response. Please try again."}), 500
        
        return jsonify({"result": result_json})
    except Exception as e:
        print("Error in /api/grade-saq:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True)
