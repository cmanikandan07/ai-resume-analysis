# # from flask import Blueprint, request, jsonify

# # from services.mock_interview_service import (
# #     generate_question,
# #     evaluate_answer
# # )

# # mock_interview_bp = Blueprint(
# #     "mock_interview",
# #     __name__
# # )


# # @mock_interview_bp.route(
# #     "/start",
# #     methods=["POST"]
# # )
# # def start_interview():

# #     data = request.json

# #     skills = data.get("skills", [])

# #     result = generate_question(skills)

# #     return jsonify(result)


# # @mock_interview_bp.route(
# #     "/evaluate",
# #     methods=["POST"]
# # )
# # def evaluate():

# #     data = request.json

# #     result = evaluate_answer(
# #         data.get("question", ""),
# #         data.get("answer", "")
# #     )

# #     return jsonify(result)



# from flask import Blueprint, request, jsonify
# import uuid

# from services.interview_service import generate_interview_questions
# from services.mock_interview_service import evaluate_answer

# mock_interview_bp = Blueprint("mock_interview", __name__)


# # =========================
# # START INTERVIEW (FIXED)
# # =========================
# @mock_interview_bp.route("/start", methods=["POST"])
# def start_interview():
#     try:
#         data = request.json

#         resume = data.get("resume", "")
#         skills = data.get("skills", [])

#         # STEP 1: use resume if skills not provided
#         skillset = skills if skills else resume

#         # STEP 2: GENERATE MULTI QUESTIONS (IMPORTANT FIX)
#         result = generate_interview_questions(skillset)

#         questions = result.get("questions", [])

#         return jsonify({
#             "sessionId": str(uuid.uuid4()),
#             "questions": questions
#         })

#     except Exception as e:
#         print("START ERROR:", e)
#         return jsonify({"error": "Failed to start interview"}), 500


# # =========================
# # EVALUATE ANSWER (UNCHANGED)
# # =========================
# @mock_interview_bp.route("/evaluate", methods=["POST"])
# def evaluate():

#     data = request.json

#     result = evaluate_answer(
#         data.get("question", ""),
#         data.get("answer", "")
#     )

#     return jsonify(result)


from flask import Blueprint, request, jsonify
import uuid

from services.interview_service import generate_interview_questions
from services.mock_interview_service import evaluate_answer

mock_interview_bp = Blueprint("mock_interview", __name__)


# =========================
# START INTERVIEW (FIXED)
# =========================
@mock_interview_bp.route("/start", methods=["POST"])
def start_interview():
    try:
        data = request.json

        resume = data.get("resume", "")
        skills = data.get("skills", [])

        # STEP 1: use resume if skills not provided
        skillset = skills if skills else resume

        # STEP 2: GENERATE MULTI QUESTIONS (IMPORTANT FIX)
        result = generate_interview_questions(skillset)

        questions = result.get("questions", [])

        return jsonify({
            "sessionId": str(uuid.uuid4()),
            "questions": questions
        })

    except Exception as e:
        print("START ERROR:", e)
        return jsonify({"error": "Failed to start interview"}), 500


# =========================
# EVALUATE ANSWER (UNCHANGED)
# =========================
@mock_interview_bp.route("/evaluate", methods=["POST"])
def evaluate():

    data = request.json

    result = evaluate_answer(
        data.get("question", ""),
        data.get("answer", "")
    )

    return jsonify(result)