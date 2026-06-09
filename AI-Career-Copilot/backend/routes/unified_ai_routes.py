# from flask import Blueprint, request, jsonify
# from services.unified_ai_service import unified_ai_analysis

# unified_ai_bp = Blueprint("unified_ai", __name__)

# @unified_ai_bp.route("/api/ai/analyze", methods=["POST"])
# def analyze():
#     data = request.json

#     resume = data.get("resume")
#     jd = data.get("jd")

#     result = unified_ai_analysis(resume, jd)

#     return jsonify(result)


from flask import Blueprint, request, jsonify
from services.unified_ai_service import unified_ai_analysis

unified_ai_bp = Blueprint("unified_ai", __name__)

@unified_ai_bp.route("/api/ai/analyze", methods=["POST"])
def analyze():

    data = request.json

    resume = data.get("resume")
    jd = data.get("jd")

    result = unified_ai_analysis(resume, jd)

    print("\n========== FINAL API RESPONSE ==========")
    print(result)
    print("========================================\n")

    return jsonify(result)