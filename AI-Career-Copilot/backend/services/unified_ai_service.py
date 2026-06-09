# from services.ats_service import calculate_ats_score
# from services.skill_gap_service import analyze_skill_gap
# from services.interview_service import generate_interview_questions

# def unified_ai_analysis(resume_text, jd):

#     ats = calculate_ats_score(resume_text)
#     skill_gap = analyze_skill_gap(resume_text, jd)
#     interview = generate_interview_questions(resume_text)

#     return {
#         "ats_score": ats,
#         "skill_gap": skill_gap,
#         "interview_questions": interview
#     }


from services.ats_service import calculate_ats_score
from services.skill_gap_service import analyze_skill_gap
from services.interview_service import generate_interview_questions
from services.learning_roadmap_service import generate_learning_roadmap


def unified_ai_analysis(resume_text, jd):

    ats = calculate_ats_score(resume_text)

    skill_gap = analyze_skill_gap(
        resume_text,
        jd
    )

    roadmap = generate_learning_roadmap(
        resume_text,
        skill_gap.get("missing_skills", [])
    )

    interview = generate_interview_questions(
        resume_text
    )

    return {
        "ats_score": ats,
        "skill_gap": skill_gap,
        "learning_roadmap": roadmap,
        "interview_questions": interview
    }