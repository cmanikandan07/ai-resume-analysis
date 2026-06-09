import React from "react";
import "./AtsDashboard.css";
import jsPDF from "jspdf";

export default function AtsDashboard({ data }) {
  if (!data) return null;

  const score = data.ats_score || 0;

  const getScoreColor = () => {
    if (score >= 80) return "#22c55e";
    if (score >= 50) return "#facc15";
    return "#ef4444";
  };

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <div className="header">
        <h1>Resume Analysis Result</h1>
      </div>

      {/* SCORE SECTION */}
      <div className="score-section">
        <div className="circle-wrapper">
          <svg className="progress-circle" viewBox="0 0 36 36">
            <path
              className="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="circle-progress"
              stroke={getScoreColor()}
              strokeDasharray={`${score}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="score-text">
              {score}%
            </text>
          </svg>
        </div>

        <div className="score-label">
          ATS Score
          <p>
            {score >= 80
              ? "Excellent resume"
              : score >= 50
              ? "Good but needs improvement"
              : "Needs strong improvement"}
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div className="cards">

        <div className="card">
          <h3>Resume Quality</h3>
          <p>{data.resume_quality}</p>
        </div>

        <div className="card">
          <h3>Matching Skills</h3>
          <p>{data.matching_skills?.length || 0}</p>
        </div>

        <div className="card">
          <h3>Missing Skills</h3>
          <p>{data.missing_skills?.length || 0}</p>
        </div>

      </div>

      {/* SKILLS */}
      <div className="section">
        <h2>🟢 Matching Skills</h2>
        <div className="tags">
          {data.matching_skills?.map((skill, i) => (
            <span key={i} className="tag green">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* IMPROVEMENT AREAS */}
      <div className="section">
        <h2>🟡 Improvement Areas</h2>
        <ul className="list">
          {data.weaknesses?.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      </div>

      {/* RECOMMENDATIONS */}
      <div className="section">
        <h2>🚀 Recommendations</h2>
        <ul className="list">
          {data.recommendations?.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}