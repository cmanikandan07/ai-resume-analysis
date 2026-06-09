from flask import Blueprint, request, jsonify
from services.resume_rewriter_service import rewrite_resume

resume_rewriter_bp = Blueprint(
    "resume_rewriter",
    __name__
)

@resume_rewriter_bp.route(
    "/rewrite",
    methods=["POST"]
)
def rewrite():

    data = request.get_json()

    resume = data.get("resume", "")

    if not resume:
        return jsonify({
            "error": "Resume required"
        }), 400

    result = rewrite_resume(resume)

    return jsonify(result)