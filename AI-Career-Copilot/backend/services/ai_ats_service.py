import json
from ai.llm_service import call_llm


def safe_json_parse(response: str):
    """
    Safely parses LLM output into JSON.
    Handles:
    - empty response
    - markdown ```json
    - invalid JSON
    """
    try:
        if not response or response.strip() == "":
            return None

        # Remove markdown formatting if present
        cleaned = response.strip()
        cleaned = cleaned.replace("```json", "").replace("```", "").strip()

        return json.loads(cleaned)

    except Exception as e:
        print("❌ JSON PARSE ERROR:", e)
        print("RAW RESPONSE:\n", response)
        return None


def analyze_resume(resume_text):

    prompt = f"""
You are a senior ATS system and hiring expert used by top global companies.

Your task is to analyze the given resume and evaluate its overall employability, ATS compatibility, and professional quality.

Resume:
{resume_text}

---

### OUTPUT FORMAT (STRICT JSON ONLY)

{{
  "ats_score": 0,
  "resume_quality": "",
  "job_readiness": "",
  "strengths": [],
  "weaknesses": [],
  "missing_keywords": [],
  "improvement_suggestions": [],
  "recommended_roles": [],
  "experience_level": "",
  "industry_fit": ""
}}

---

### RULES

- Return ONLY valid JSON
- No markdown
- No explanations
- No extra text
- Base analysis only on resume content
"""

    # 🔥 Call LLM
    response = call_llm(prompt)

    print("\n===== RAW LLM RESPONSE =====")
    print(response)
    print("===========================\n")

    # 🔥 Safe parsing
    parsed = safe_json_parse(response)

    if parsed is None:
        return {
            "ats_score": 0,
            "resume_quality": "Unknown",
            "job_readiness": "Unknown",
            "strengths": [],
            "weaknesses": ["Parsing error from LLM response"],
            "missing_keywords": [],
            "improvement_suggestions": [
                "LLM did not return valid JSON. Try improving prompt or reduce resume size."
            ],
            "recommended_roles": [],
            "experience_level": "Unknown",
            "industry_fit": "Unknown"
        }

    return parsed