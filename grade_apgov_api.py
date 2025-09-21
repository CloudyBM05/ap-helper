from flask import request, jsonify
from grader_api import app

@app.route("/api/grade-apgov", methods=["POST", "OPTIONS"])
def grade_apgov():
    # This endpoint is identical to /api/grade-saq but for AP Gov Concept Application
    # It uses the same logic as /api/grade-saq, but can be customized if needed
    from grader_api import grade_saq
    return grade_saq()
