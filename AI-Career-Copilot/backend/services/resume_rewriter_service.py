from ai.llm_service import call_llm
import json

def rewrite_resume(resume_text):

    prompt = f"""
You are an expert ATS Resume Writer.

Analyze the resume.

Return STRICT JSON ONLY.

{{
  "original_resume":"",

  "improved_resume":"",

  "changes":[
    {{
      "before":"",
      "after":"",
      "reason":""
    }}
  ]
}}

Resume:

{resume_text}

Rules:

1. Improve ATS score
2. Improve grammar
3. Add professional action verbs
4. Keep information truthful
5. Explain every major change
6. Return ONLY valid JSON
"""

    response = call_llm(prompt)

    try:
        return json.loads(response)

    except:
        return {
            "original_resume": resume_text,
            "improved_resume": response,
            "changes": []
        }