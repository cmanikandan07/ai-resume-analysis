import json
from ai.llm_service import call_llm


def normalize_list(data, keys=None):
    """
    Robust normalizer that NEVER drops data
    """

    if data is None:
        return []

    # convert string JSON
    if isinstance(data, str):
        try:
            data = json.loads(data)
        except:
            return [data.strip()] if data.strip() else []

    # single dict
    if isinstance(data, dict):
        data = [data]

    if not isinstance(data, list):
        return [str(data)]

    output = []

    for item in data:

        if item is None:
            continue

        # string case
        if isinstance(item, str):
            if item.strip():
                output.append(item.strip())
            continue

        # dict case
        if isinstance(item, dict):

            found = False

            # try keys
            if keys:
                for key in keys:
                    if key in item and item[key]:
                        output.append(str(item[key]).strip())
                        found = True
                        break

            # fallback auto-detect
            if not found:
                for v in item.values():
                    if isinstance(v, str) and v.strip():
                        output.append(v.strip())
                        found = True
                        break

            if not found:
                output.append(str(item))

    # remove duplicates but preserve order
    return list(dict.fromkeys(output))


def analyze_skill_gap(resume, jd):

    prompt = f"""
You are an ATS system.

Return ONLY valid JSON.

Resume:
{resume}

Job Description:
{jd}

Output format:
{{
  "matching_skills": [],
  "missing_skills": [],
  "recommendations": [],
  "skill_gap_score": 0,
  "priority_skills_to_learn": []
}}
"""

    response = call_llm(prompt)

    if not response:
        return default_response("No response from AI")

    if isinstance(response, dict) and "error" in response:
        return default_response("AI error")

    try:
        llm_text = response.get("response", "") if isinstance(response, dict) else str(response)

        llm_text = llm_text.replace("```json", "").replace("```", "").strip()

        result = json.loads(llm_text)

        # SAFE defaults
        result.setdefault("matching_skills", [])
        result.setdefault("missing_skills", [])
        result.setdefault("recommendations", [])
        result.setdefault("skill_gap_score", 0)
        result.setdefault("priority_skills_to_learn", [])

        # NORMALIZATION (FIXED)
        result["matching_skills"] = normalize_list(result["matching_skills"])
        result["missing_skills"] = normalize_list(result["missing_skills"])
        result["recommendations"] = normalize_list(result["recommendations"])
        result["priority_skills_to_learn"] = normalize_list(result["priority_skills_to_learn"])

        # SAFE SCORE conversion
        try:
            result["skill_gap_score"] = int(float(result.get("skill_gap_score", 0)))
        except:
            result["skill_gap_score"] = 0

        print("\n========== FINAL NORMALIZED OUTPUT ==========")
        print(json.dumps(result, indent=2))
        print("============================================\n")

        return result

    except Exception as e:
        return default_response(f"Parse error: {str(e)}")


def default_response(msg):
    return {
        "matching_skills": [],
        "missing_skills": [],
        "recommendations": [msg],
        "skill_gap_score": 0,
        "priority_skills_to_learn": []
    }