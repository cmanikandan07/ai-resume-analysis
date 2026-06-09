import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from services.resume_service import process_resume

resume_bp = Blueprint("resume_bp", __name__)

UPLOAD_FOLDER = "uploads"


@resume_bp.route("/upload", methods=["POST"])
def upload_resume():
    try:
        file = request.files.get("file")
        jd = request.form.get("jd", "")

        if not file:
            return jsonify({"error": "No file uploaded"}), 400

        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)

        file.save(file_path)

        result = process_resume(file_path, jd)

        if "error" in result:
            return jsonify(result), 500

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500