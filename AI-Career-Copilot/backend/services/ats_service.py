# import json
# from ai.llm_service import call_llm

# def calculate_ats_score(text):

#     prompt = f"""
# You are an advanced ATS (Applicant Tracking System) used by leading global companies.

# Your task is to evaluate the resume and generate an ATS score based on
# industry-standard hiring practices.

# RESUME:

# {text}

# ---

# ### EVALUATION CRITERIA

# 1. Resume Structure and Formatting
# 2. ATS Compatibility
# 3. Skills Relevance
# 4. Experience Quality
# 5. Education and Certifications
# 6. Project Quality
# 7. Professional Presentation
# 8. Industry Readiness

# ---

# ### SCORING SCALE

# 0-40   : Poor
# 41-60  : Average
# 61-80  : Good
# 81-100 : Excellent

# ---

# ### RULES

# - Detect the likely career domain from the resume.
# - Do not assume skills not mentioned.
# - Be realistic and ATS-focused.
# - Consider both technical and non-technical careers.
# - Return only valid JSON.

# ---

# ### OUTPUT FORMAT (STRICT JSON ONLY)

# {{
#   "career_domain": "",
#   "ats_score": 0,
#   "resume_quality": "",
#   "experience_level": "",
#   "strengths": [],
#   "weaknesses": [],
#   "missing_skills": [],
#   "recommendations": []
# }}
# """

#     response = call_llm(prompt)

#     # Handle timeout / LLM errors
#     if isinstance(response, dict) and "error" in response:
#         return {
#             "career_domain": "Unknown",
#             "ats_score": 0,
#             "resume_quality": "Unknown",
#             "experience_level": "Unknown",
#             "strengths": [],
#             "weaknesses": ["LLM Timeout"],
#             "missing_skills": [],
#             "recommendations": [
#                 "Try again later or use a smaller model"
#             ]
#         }

#     try:
#         # Handle both string and dict responses
#         if isinstance(response, dict):
#             llm_text = response.get("response", "").strip()
#         else:
#             llm_text = str(response).strip()

#         llm_text = (
#             llm_text
#             .replace("```json", "")
#             .replace("```", "")
#             .strip()
#         )

#         return json.loads(llm_text)

#     except Exception as e:
#         return {
#             "career_domain": "Unknown",
#             "ats_score": 0,
#             "resume_quality": "Unknown",
#             "experience_level": "Unknown",
#             "strengths": [],
#             "weaknesses": [f"Parsing Error: {str(e)}"],
#             "missing_skills": [],
#             "recommendations": [
#                 "Check LLM response format"
#             ],
#             "raw_response": response
#         }




import json
import re
from ai.llm_service import call_llm


# ==============================
# 🧠 FALLBACK RULE-BASED SCORING (GENERIC)
# ==============================
def fallback_ats_score(text):

    text = text.lower()
    score = 0

    # Basic structure signals
    if len(text.split()) > 100:
        score += 20
    if "experience" in text:
        score += 15
    if "project" in text:
        score += 15
    if "education" in text:
        score += 10
    if "skills" in text:
        score += 10

    # generic keyword density
    keywords = ["managed", "developed", "led", "created", "built", "designed"]
    score += sum(5 for k in keywords if k in text)

    return min(score, 100)


# ==============================
# 🧹 CLEAN JSON FUNCTION
# ==============================
def clean_json(text):
    if not text:
        return None

    text = text.strip()
    text = text.replace("```json", "").replace("```", "")

    # extract first JSON block if messy output
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        return match.group(0)

    return text


# ==============================
# 🚀 MAIN FUNCTION
# ==============================
def calculate_ats_score(resume_text):

    prompt = f"""
You are an advanced Applicant Tracking System (ATS).

Evaluate this resume objectively across all industries (IT, marketing, finance, HR, sales, engineering, etc.)

RESUME:
{resume_text}

Return ONLY valid JSON in this format:

{{
  "career_domain": "",
  "ats_score": 0,
  "resume_quality": "",
  "experience_level": "",
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "recommendations": []
}}

Rules:
- Be neutral and industry-agnostic
- Do NOT assume missing skills
- Base scoring only on resume content
- No explanations
"""

    # ==============================
    # 🤖 LLM CALL
    # ==============================
    response = call_llm(prompt)

    # ==============================
    # ❗ FALLBACK IF LLM FAILS
    # ==============================
    if not response:
        return {
            "career_domain": "Unknown",
            "ats_score": fallback_ats_score(resume_text),
            "resume_quality": "Generated via fallback",
            "experience_level": "Unknown",
            "strengths": [],
            "weaknesses": ["LLM unavailable"],
            "missing_skills": [],
            "recommendations": ["Improve resume structure and keywords"]
        }

    # ==============================
    # 🧹 CLEAN RESPONSE
    # ==============================
    try:
        cleaned = clean_json(response)
        parsed = json.loads(cleaned)

        # 🔥 Hybrid scoring (VERY IMPORTANT)
        llm_score = parsed.get("ats_score", 0)
        rule_score = fallback_ats_score(resume_text)

        final_score = int((llm_score * 0.7) + (rule_score * 0.3))
        parsed["ats_score"] = final_score

        return parsed

    except Exception as e:

        return {
            "career_domain": "Unknown",
            "ats_score": fallback_ats_score(resume_text),
            "resume_quality": "Fallback mode",
            "experience_level": "Unknown",
            "strengths": [],
            "weaknesses": [f"Parsing error: {str(e)}"],
            "missing_skills": [],
            "recommendations": [
                "LLM response invalid, using fallback scoring"
            ],
            "raw_response": response
        }