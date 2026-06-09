import json
from ai.llm_service import call_llm


def safe_json_parse(response: str):
    """
    Safely parse LLM JSON output.
    Handles markdown, empty response, invalid JSON.
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


def generate_interview_questions(skillset):

    prompt = f"""
You are a senior hiring manager and interviewer at a top global company.

Your task is to generate high-quality interview questions based on the candidate's skills.

Skills:
{skillset}

---

### REQUIREMENTS

Generate exactly 10 interview questions.

Include a mix of:
- Technical
- Scenario-based
- Troubleshooting
- Conceptual
- Real-world application

---

### DIFFICULTY DISTRIBUTION
- 3 Easy
- 4 Medium
- 3 Hard

---

### OUTPUT FORMAT (STRICT JSON ONLY)

{{
  "questions": [
    {{
      "question": "",
      "skill": "",
      "difficulty": "Easy",
      "type": "Technical"
    }}
  ]
}}

---

### RULES

- Return ONLY valid JSON
- No markdown
- No explanations
- No extra text
- Must generate exactly 10 questions
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
            "questions": [],
            "error": "Invalid JSON from LLM",
            "improvement_suggestion": "LLM output was not valid JSON. Improve prompt or enforce stricter formatting."
        }

    return parsed