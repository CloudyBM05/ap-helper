from flask import Flask, request, jsonify
from flask_cors import cross_origin
import openai
import os
import json
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Store your OpenAI API key securely (use environment variable in production)
openai.api_key = os.environ.get("OPENAI_API_KEY")

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

@app.route("/api/grade_essay", methods=["POST"])
@cross_origin(origins=[
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://127.0.0.1:5173", 
    "https://cloudybm05.github.io",
    "https://aphelper.tech", 
    "https://www.aphelper.tech",
    "https://ap-helper-2d9f117e9bdb.herokuapp.com"
])
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
def grade_dbq():
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
def grade_leq():
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

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
