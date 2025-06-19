from flask import Flask, request, jsonify
from ap_seminar_grader import grade_essay

app = Flask(__name__)

@app.route("/api/grade", methods=["POST"])
def grade():
    data = request.get_json()
    essay = data.get("essay", "")
    if not essay:
        return jsonify({"error": "No essay provided"}), 400
    result = grade_essay(essay)
    return jsonify({"grading": result})

if __name__ == "__main__":
    app.run(port=5000, debug=True)