# from flask import Flask
# from flask_cors import CORS

# from routes.resume_routes import resume_bp
# from routes.ai_routes import ai_bp
# from routes.unified_ai_routes import unified_ai_bp
# from routes.mock_interview_routes import mock_interview_bp
# from routes.resume_rewriter_routes import resume_rewriter_bp
# app = Flask(__name__)

# CORS(app)

# # Register Blueprints (ALL AFTER app creation)

# # Resume APIs
# app.register_blueprint(
#      resume_bp,
#      url_prefix="/api/resume"
#  )

# app.register_blueprint(
#     resume_rewriter_bp,
#     url_prefix="/api/resume"
# )

# # AI APIs
# app.register_blueprint(
#     ai_bp,
#     url_prefix="/api/ai"
# )

# # Unified AI API (IMPORTANT)
# app.register_blueprint(
#     unified_ai_bp,
#     url_prefix="/api/ai"
# )

# app.register_blueprint(
#     mock_interview_bp,
#     url_prefix="/api/interview"
# )
# @app.route("/")
# def home():
#     return {
#         "message": "AI Career Copilot Backend Running"
#     }

# if __name__ == "__main__":
#     app.run(
#         host="0.0.0.0",
#         port=5000,
#         debug=True
#     )






import os
from flask import Flask
from flask_cors import CORS
CORS(app)
# Blueprints
from routes.resume_routes import resume_bp
from routes.ai_routes import ai_bp
from routes.unified_ai_routes import unified_ai_bp
from routes.mock_interview_routes import mock_interview_bp
from routes.resume_rewriter_routes import resume_rewriter_bp

# =========================
# APP INIT
# =========================
app = Flask(__name__)

# =========================
# CORS (Production Safe)
# =========================
CORS(app, resources={r"/api/*": {"origins": "*"}})

# =========================
# REGISTER BLUEPRINTS
# =========================

# Resume APIs
app.register_blueprint(resume_bp, url_prefix="/api/resume")
app.register_blueprint(resume_rewriter_bp, url_prefix="/api/resume")

# AI APIs
app.register_blueprint(ai_bp, url_prefix="/api/ai")

# Unified AI APIs
app.register_blueprint(unified_ai_bp, url_prefix="/api/ai")

# Mock Interview APIs
app.register_blueprint(mock_interview_bp, url_prefix="/api/interview")

# =========================
# HEALTH CHECK ROUTE
# =========================
@app.route("/")
def home():
    return {
        "message": "AI Career Copilot Backend Running 🚀",
        "status": "healthy"
    }


# =========================
# RENDER COMPATIBLE START
# =========================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render uses PORT env
    app.run(
        host="0.0.0.0",
        port=port,
        debug=False  # ❗ must be False in production
    )