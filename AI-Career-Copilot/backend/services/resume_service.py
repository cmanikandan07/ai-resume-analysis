# import os
# from utils.file_parser import extract_text_from_pdf
# from services.ats_service import calculate_ats_score
# from services.skill_gap_service import analyze_skill_gap


# def safe_list(value):
#     if not value:
#         return []

#     if isinstance(value, list):
#         cleaned = []
#         for item in value:
#             if isinstance(item, dict):
#                 cleaned.append(
#                     item.get("resume_skill")
#                     or item.get("job_description_skill")
#                     or item.get("skill_name")
#                     or str(item)
#                 )
#             else:
#                 cleaned.append(str(item))
#         return cleaned

#     return [str(value)]


# def process_resume(file_path, jd):

#     try:
#         resume_text = extract_text_from_pdf(file_path)

#         if not resume_text:
#             return {"error": "Unable to extract resume text"}

#         # ATS ANALYSIS
#         try:
#             ats_result = calculate_ats_score(resume_text)
#         except Exception as e:
#             ats_result = {
#                 "career_domain": "Unknown",
#                 "ats_score": 0,
#                 "resume_quality": "Unknown",
#                 "experience_level": "Unknown",
#                 "strengths": [],
#                 "weaknesses": [],
#                 "missing_skills": [],
#                 "recommendations": [f"ATS failed: {str(e)}"]
#             }

#         # SKILL GAP ANALYSIS
#         try:
#             skill_gap_result = analyze_skill_gap(resume_text, jd)
#         except Exception as e:
#             skill_gap_result = {
#                 "matching_skills": [],
#                 "missing_skills": [],
#                 "recommendations": [f"Skill gap failed: {str(e)}"],
#                 "skill_gap_score": 0,
#                 "priority_skills_to_learn": []
#             }

#         # FINAL RESPONSE
#         return {
#             "career_domain": ats_result.get("career_domain", "Unknown"),
#             "ats_score": ats_result.get("ats_score", 0),
#             "resume_quality": ats_result.get("resume_quality", "Unknown"),
#             "experience_level": ats_result.get("experience_level", "Unknown"),

#             "strengths": ats_result.get("strengths", []),
#             "weaknesses": ats_result.get("weaknesses", []),

#             "matching_skills": safe_list(skill_gap_result.get("matching_skills")),
#             "missing_skills": safe_list(skill_gap_result.get("missing_skills")),

#             "recommendations": skill_gap_result.get("recommendations", []),
#             "skill_gap_score": skill_gap_result.get("skill_gap_score", 0),

#             "priority_skills_to_learn": safe_list(
#                 skill_gap_result.get("priority_skills_to_learn")
#             ),

#             "resume_text": resume_text[:2000]
#         }

#     except Exception as e:
#         return {"error": str(e)}



import os
import json
from utils.file_parser import extract_text_from_pdf
from services.ats_service import calculate_ats_score
from services.skill_gap_service import analyze_skill_gap


from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename


def safe_list(value, key=None):
    """
    Converts all formats (string/list/dict) → clean list of strings
    """
    if not value:
        return []

    # If LLM returns JSON string accidentally
    if isinstance(value, str):
        try:
            value = json.loads(value)
        except:
            return [value]

    if isinstance(value, list):
        cleaned = []

        for item in value:
            if isinstance(item, dict):
                if key and key in item:
                    cleaned.append(str(item.get(key)))
                else:
                    cleaned.append(
                        str(
                            item.get("resume_skill")
                            or item.get("job_description_skill")
                            or item.get("skill_name")
                            or item.get("recommendation_text")
                            or item
                        )
                    )
            else:
                cleaned.append(str(item))

        return cleaned

    if isinstance(value, dict):
        return [str(value)]

    return [str(value)]


def process_resume(file_path, jd):

    try:
        resume_text = extract_text_from_pdf(file_path)

        if not resume_text:
            return {"error": "Unable to extract resume text"}

        # ATS ANALYSIS
        try:
            ats_result = calculate_ats_score(resume_text)
        except Exception as e:
            ats_result = {
                "career_domain": "Unknown",
                "ats_score": 0,
                "resume_quality": "Unknown",
                "experience_level": "Unknown",
                "strengths": [],
                "weaknesses": [],
                "missing_skills": [],
                "recommendations": [f"ATS failed: {str(e)}"]
            }

        # SKILL GAP ANALYSIS
        try:
            skill_gap_result = analyze_skill_gap(resume_text, jd)

            # IMPORTANT: if LLM returns raw JSON string
            if isinstance(skill_gap_result, str):
                try:
                    skill_gap_result = json.loads(skill_gap_result)
                except:
                    skill_gap_result = {}

        except Exception as e:
            skill_gap_result = {
                "matching_skills": [],
                "missing_skills": [],
                "recommendations": [f"Skill gap failed: {str(e)}"],
                "skill_gap_score": 0,
                "priority_skills_to_learn": []
            }

        # FINAL RESPONSE (CLEANED)
        return {
            "career_domain": ats_result.get("career_domain", "Unknown"),
            "ats_score": ats_result.get("ats_score", 0),
            "resume_quality": ats_result.get("resume_quality", "Unknown"),
            "experience_level": ats_result.get("experience_level", "Unknown"),

            "strengths": safe_list(ats_result.get("strengths")),
            "weaknesses": safe_list(ats_result.get("weaknesses")),

            "matching_skills": safe_list(skill_gap_result.get("matching_skills")),
            "missing_skills": safe_list(skill_gap_result.get("missing_skills")),

            "recommendations": safe_list(skill_gap_result.get("recommendations")),

            "skill_gap_score": skill_gap_result.get("skill_gap_score", 0),

            "priority_skills_to_learn": safe_list(
                skill_gap_result.get("priority_skills_to_learn"),
                key="skill_name"
            ),

            "resume_text": resume_text[:2000]
        }

    except Exception as e:
        return {"error": str(e)}
    
    print("resume_service loaded successfully")