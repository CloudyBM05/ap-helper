from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import openai
import os
import re
import traceback
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configure CORS globally with more permissive settings
CORS(app, origins=[
    "http://localhost:5173",
    "http://localhost:5174", 
    "http://127.0.0.1:5173",
    "https://cloudybm05.github.io",
    "https://aphelper.tech",
    "https://www.aphelper.tech"
], supports_credentials=True, methods=['GET', 'POST', 'OPTIONS'])

# Add CORS preflight handling
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
        response.headers.add('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,OPTIONS")
        return response

# Add error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({"error": "Method not allowed for this endpoint"}), 405

# Add a health check endpoint
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "message": "AI Grading API is running"}), 200

# Store your OpenAI API key securely (use environment variable in production)
openai.api_key = os.environ.get("OPENAI_API_KEY")

@app.route("/api/grade-saq", methods=["POST", "OPTIONS"])
def grade_saq():
    if request.method == "OPTIONS":
        # Handle preflight request
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
        response.headers.add('Access-Control-Allow-Methods', "POST,OPTIONS")
        return response
        
    import json
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        answers = data.get("answers", [])
        if not answers:
            return jsonify({"error": "No answers provided"}), 400
            
        prompt_intro = data.get("prompt_intro") or "You are an AP teacher. Grade each part (0 or 1 point) based on accuracy, clarity, and correct use of historical thinking skills. Give a short explanation for each score."
        sources = data.get("sources") or ""
        questions = data.get("questions") or ""
        num_parts = len(answers)

        # Build the system prompt dynamically
        system_prompt = prompt_intro.strip()
        if sources.strip():
            system_prompt += f"\n\nSources (summary):\n{sources.strip()}"
        if questions.strip():
            system_prompt += f"\n\nQuestions:\n{questions.strip()}"
        system_prompt += f"\n\nRespond ONLY with a JSON array of {num_parts} objects, one per part: [{{'score': 1, 'explanation': '...'}}, ...] No extra text or formatting."

        user_content = ""
        for i, answer in enumerate(answers):
            user_content += f"Part {chr(65 + i)}: {answer}\n"

        response = openai.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": user_content
                }
            ],
            temperature=0.2
        )
        print("OpenAI raw response:", response)
        content = response.choices[0].message.content
        print("OpenAI message content:", content)
        try:
            result_json = json.loads(content)
            # Repair step: fix common key typos and filter for objects with both 'score' and 'explanation'
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
                    result_json = json.loads(json_str)
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
                        result_json = filtered[:num_parts]
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
def grade_essay():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "Content-Type,Authorization")
        response.headers.add('Access-Control-Allow-Methods', "POST,OPTIONS")
        return response
        
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data provided"}), 400
            
        prompt = data.get("prompt")
        if not prompt:
            return jsonify({"error": "Prompt is required."}), 400

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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
    # Force redeploy 2024-12-28 - All FRQ endpoints fixed and deployed