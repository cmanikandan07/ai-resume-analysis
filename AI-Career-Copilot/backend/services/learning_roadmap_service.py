import json
from ai.llm_service import call_llm


def generate_learning_roadmap(
    resume_text,
    missing_skills,
    target_role=""
):

    prompt = f"""
You are an expert career coach and learning advisor.

Resume:
{resume_text}

Missing Skills:
{missing_skills}

Target Role:
{target_role}

TASK:

Create a structured learning roadmap.

RULES:

- Work for ANY profession.
- Prioritize skills logically.
- Include estimated learning duration.
- Explain why each skill matters.
- Return ONLY valid JSON.

OUTPUT:

{{
  "roadmap": [
    {{
      "skill": "",
      "priority": "High",
      "duration_weeks": 0,
      "reason": ""
    }}
  ]
}}
"""

    response = call_llm(prompt)

    try:

        if isinstance(response, dict):
            llm_text = response.get("response", "")
        else:
            llm_text = str(response)

        llm_text = (
            llm_text
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(llm_text)

    except Exception:

        return {
            "roadmap": []
        }