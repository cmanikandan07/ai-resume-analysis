import json
from ai.llm_service import call_llm


def safe_json_parse(response: str):
    """
    Safely parse LLM JSON output.
    Handles:
    - empty response
    - markdown ```json
    - invalid JSON
    """
    try:
        if not response or response.strip() == "":
            return None

        cleaned = response.strip()
        cleaned = cleaned.replace("```json", "").replace("```", "").strip()

        return json.loads(cleaned)

    except Exception as e:
        print("❌ JSON PARSE ERROR:", e)
        print("RAW RESPONSE:\n", response)
        return None


def improve_resume(resume_text):

    prompt = f"""
You are a senior resume writer, ATS optimization expert, and career coach.

Your task is to improve the provided resume for ATS compatibility,
professional presentation, and industry relevance.

RESUME:
{resume_text}

---

### IMPORTANT RULES

- Do NOT invent experience, skills, or achievements
- Only improve existing content
- Keep factual accuracy
- Return ONLY valid JSON
- No markdown
- No explanations

---

### OUTPUT FORMAT (STRICT JSON ONLY)

{{
  "career_domain": "",
  "improved_resume": "",
  "ats_optimized_resume": "",
  "keyword_enhancements": [],
  "missing_sections": [],
  "improvement_summary": "",
  "ats_recommendations": [],
  "professional_branding_suggestions": []
}}
"""

    # 🔥 Call LLM
    response = call_llm(prompt)

    print("\n===== RAW LLM RESPONSE =====")
    print(response)
    print("===========================\n")

    # 🔥 Safe JSON parsing
    parsed = safe_json_parse(response)

    if parsed is None:
        return {
            "career_domain": "Unknown",
            "improved_resume": "",
            "ats_optimized_resume": "",
            "keyword_enhancements": [],
            "missing_sections": [],
            "improvement_summary": "LLM returned invalid JSON response.",
            "ats_recommendations": [
                "Improve prompt structure or enforce stricter JSON output"
            ],
            "professional_branding_suggestions": [],
            "error": "Invalid JSON from LLM"
        }

    return parsed