// import "./Dashboard.css";
// import jsPDF from "jspdf";

// export default function Dashboard({ data }) {
//   console.log("Dashboard Data:", data);

//   const ats = data?.ats_score || data;
//   const skillGap = data || {};

//   return (
//     <div className="dashboard">

//       <h1>🚀 AI Career Dashboard</h1>

//       {/* ATS SCORE */}
//       <div className="card">
//         <h2>📊 ATS Score</h2>

//         <h1 style={{ fontSize: 50 }}>
//           {data?.ats_score || 0}
//         </h1>

//         <p>
//           <b>Resume Quality:</b> {data?.resume_quality || "N/A"}
//         </p>
//       </div>

//       {/* STRENGTHS */}
//       <div className="section">
//         <h2>🟢 Strengths</h2>

//         <ul>
//           {(data?.strengths || []).map((s, i) => (
//             <li key={i} className="success">
//               {s}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* WEAKNESSES */}
//       <div className="section">
//         <h2>🔴 Weaknesses</h2>

//         <ul>
//           {(data?.weaknesses || []).map((w, i) => (
//             <li key={i} className="danger">
//               {w}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* SKILL GAP */}
//       <div className="section">
//         <h2>📈 Skill Gap Score</h2>
//         <h3>{data?.skill_gap_score || 0}%</h3>
//       </div>

//       {/* MISSING SKILLS */}
//       <div className="section">
//         <h2>🎯 Missing Skills</h2>

//         {(data?.missing_skills || []).length > 0 ? (
//           <ul>
//             {data.missing_skills.map((skill, i) => (
//               <li key={i} className="danger">
//                 {skill}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No missing skills identified.</p>
//         )}
//       </div>

//       {/* PRIORITY SKILLS */}
//       <div className="section">
//         <h2>🚀 Priority Skills To Learn</h2>

//         {(data?.priority_skills_to_learn || []).length > 0 ? (
//           <ul>
//             {data.priority_skills_to_learn.map((skill, i) => (
//               <li key={i}>{skill}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No priority skills suggested.</p>
//         )}
//       </div>

//       {/* MATCHING SKILLS */}
//       <div className="section">
//         <h2>✅ Matching Skills</h2>

//         {(data?.matching_skills || []).length > 0 ? (
//           <ul>
//             {data.matching_skills.map((skill, i) => (
//               <li key={i}>{skill}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No matching skills found.</p>
//         )}
//       </div>

//       {/* RECOMMENDATIONS */}
//       <div className="section">
//         <h2>📚 Recommendations</h2>

//         {(data?.recommendations || []).length > 0 ? (
//           <ul>
//             {data.recommendations.map((rec, i) => (
//               <li key={i}>{rec}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No recommendations available.</p>
//         )}
//       </div>

//       {/* DEBUG */}
//       <div className="debug">
//         <h3>Debug Data</h3>
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//       </div>

//     </div>
//   );
// }





import "./Dashboard.css";
import jsPDF from "jspdf";
console.log("🚀 Dashboard Rendered");
export default function Dashboard({ data }) {
  console.log("Dashboard Data:", data);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("AI Career Resume Report", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    doc.text(`ATS Score: ${data?.ats_score || 0}`, 20, 40);
    doc.text(`Resume Quality: ${data?.resume_quality || "N/A"}`, 20, 50);

    // Strengths
    doc.text("Strengths:", 20, 65);
    (data?.strengths || []).slice(0, 10).forEach((s, i) => {
      doc.text(`- ${s}`, 25, 75 + i * 8);
    });

    let y = 75 + (data?.strengths?.length || 0) * 8 + 10;

    // Weaknesses
    doc.text("Weaknesses:", 20, y);
    (data?.weaknesses || []).slice(0, 10).forEach((w, i) => {
      doc.text(`- ${w}`, 25, y + 10 + i * 8);
    });

    let y2 = y + 20 + (data?.weaknesses?.length || 0) * 8;

    // Missing Skills
    doc.text("Missing Skills:", 20, y2);
    (data?.missing_skills || []).slice(0, 10).forEach((m, i) => {
      doc.text(`- ${m}`, 25, y2 + 10 + i * 8);
    });

    doc.save("AI-Career-Report.pdf");
  };

  return (
    <div className="dashboard">

      <h1>🚀 AI Career Dashboard</h1>

      {/* ATS SCORE */}
      <div className="card">
        <h2>📊 ATS Score</h2>

        <h1 style={{ fontSize: 50 }}>
          {data?.ats_score || 0}
        </h1>

        <p>
          <b>Resume Quality:</b> {data?.resume_quality || "N/A"}
        </p>
      </div>

      {/* STRENGTHS */}
      <div className="section">
        <h2>🟢 Strengths</h2>

        <ul>
          {(data?.strengths || []).map((s, i) => (
            <li key={i} className="success">
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* WEAKNESSES */}
      <div className="section">
        <h2>🔴 Weaknesses</h2>

        <ul>
          {(data?.weaknesses || []).map((w, i) => (
            <li key={i} className="danger">
              {w}
            </li>
          ))}
        </ul>
      </div>

      {/* SKILL GAP */}
      <div className="section">
        <h2>📈 Skill Gap Score</h2>
        <h3>{data?.skill_gap_score || 0}%</h3>
      </div>

      {/* MISSING SKILLS */}
      <div className="section">
        <h2>🎯 Missing Skills</h2>

        {(data?.missing_skills || []).length > 0 ? (
          <ul>
            {data.missing_skills.map((skill, i) => (
              <li key={i} className="danger">
                {skill}
              </li>
            ))}
          </ul>
        ) : (
          <p>No missing skills identified.</p>
        )}
      </div>

      {/* PRIORITY SKILLS */}
      <div className="section">
        <h2>🚀 Priority Skills To Learn</h2>

        {(data?.priority_skills_to_learn || []).length > 0 ? (
          <ul>
            {data.priority_skills_to_learn.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No priority skills suggested.</p>
        )}
      </div>

      {/* MATCHING SKILLS */}
      <div className="section">
        <h2>✅ Matching Skills</h2>

        {(data?.matching_skills || []).length > 0 ? (
          <ul>
            {data.matching_skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No matching skills found.</p>
        )}
      </div>

      {/* RECOMMENDATIONS */}
      <div className="section">
        <h2>📚 Recommendations</h2>

        {(data?.recommendations || []).length > 0 ? (
          <ul>
            {data.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>

      {/* DOWNLOAD PDF BUTTON */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={downloadPDF}
          style={{
            padding: "10px 18px",
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          📄 Download PDF Report
        </button>
      </div>

      {/* DEBUG */}
      {/* <div className="debug">
        <h3>Debug Data</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div> */}

    </div>
  );
}

console.log("🚀 Dashboard Rendered");