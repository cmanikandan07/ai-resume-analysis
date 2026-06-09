# from flask import Blueprint, request, jsonify

# from services.ai_ats_service import analyze_resume
# from services.skill_gap_service import analyze_skill_gap
# from services.interview_service import generate_interview_questions

# ai_bp = Blueprint("ai", __name__)

# @ai_bp.route("/ats", methods=["POST"])
# def ats():
#     data = request.json

#     result = analyze_resume(data["resume"])
#     return jsonify(result)


# @ai_bp.route("/skill-gap", methods=["POST"])
# def skill_gap():
#     data = request.json

#     result = analyze_skill_gap(
#         data["resume"],
#         data["job_description"]
#     )

#     return jsonify(result)


# @ai_bp.route("/interview", methods=["POST"])
# def interview():
#     data = request.json

#     result = generate_interview_questions(
#         data["skills"]
#     )

#     return jsonify(result)

from flask import Blueprint, request, jsonify

from services.ai_ats_service import analyze_resume
from services.skill_gap_service import analyze_skill_gap
from services.interview_service import generate_interview_questions
from services.learning_roadmap_service import generate_learning_roadmap

# NEW IMPORT
from services.resume_rewriter_service import rewrite_resume

ai_bp = Blueprint("ai", __name__)


# ==========================================
# ATS
# ==========================================
@ai_bp.route("/ats", methods=["POST"])
def ats():
    data = request.json

    result = analyze_resume(
        data.get("resume", "")
    )

    return jsonify(result)


# ==========================================
# SKILL GAP
# ==========================================
@ai_bp.route("/skill-gap", methods=["POST"])
def skill_gap():
    data = request.json

    result = analyze_skill_gap(
        data.get("resume", ""),
        data.get("job_description", "")
    )

    return jsonify(result)


# ==========================================
# INTERVIEW QUESTIONS
# ==========================================
@ai_bp.route("/interview", methods=["POST"])
def interview():
    data = request.json

    result = generate_interview_questions(
        data.get("skills", "")
    )

    return jsonify(result)


# ==========================================
# LEARNING ROADMAP
# ==========================================
@ai_bp.route("/roadmap", methods=["POST"])
def roadmap():

    data = request.json

    result = generate_learning_roadmap(
        data.get("resume", ""),
        data.get("missing_skills", []),
        data.get("target_role", "")
    )

    return jsonify(result)


# ==========================================
# NEW FEATURE
# AI RESUME REWRITER
# ==========================================
@ai_bp.route("/rewrite-resume", methods=["POST"])
def rewrite_resume_api():

    try:
        data = request.get_json()

        resume = data.get("resume", "")

        if not resume:
            return jsonify({
                "success": False,
                "error": "Resume is required"
            }), 400

        result = rewrite_resume(resume)

        return jsonify({
            "success": True,
            "improved_resume": result.get(
                "improved_resume",
                ""
            ),
            "changes_suggested": result.get(
                "changes_suggested",
                []
            )
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500