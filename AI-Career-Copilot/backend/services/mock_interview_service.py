import json
from ai.llm_service import call_llm


def generate_question(skills):

    prompt = f"""
You are a senior technical interviewer.

Generate ONE interview question.

Skills:
{skills}

Return JSON ONLY.

{{
  "question":""
}}
"""

    response = call_llm(prompt)

    try:
        return json.loads(response)
    except:
        return {
            "question": response
        }


def evaluate_answer(question, answer):

    prompt = f"""
You are a senior interviewer.

Question:
{question}

Candidate Answer:
{answer}

Evaluate the answer.

Return JSON ONLY.

{{
  "score": 0,
  "strengths": [],
  "weaknesses": [],
  "ideal_answer":""
}}
"""

    response = call_llm(prompt)

    try:
        return json.loads(response)
    except:
        return {
            "score": 0,
            "strengths": [],
            "weaknesses": [],
            "ideal_answer": response
        }