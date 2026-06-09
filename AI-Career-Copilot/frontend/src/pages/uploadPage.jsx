// import { useState } from "react";
// import axios from "axios";
// import "./upload.css";

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [resume, setResume] = useState("");
//   const [jd, setJd] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleAnalyze = async () => {
//     try {
//       setLoading(true);

//       let response;

//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("jd", jd);

//         response = await axios.post(
//           "http://localhost:5000/api/resume/upload",
//           formData
//         );

//         setResult(response.data);
//       } else {
//         response = await axios.post(
//           "http://localhost:5000/api/ai/analyze",
//           { resume, jd }
//         );

//         setResult(response.data.data);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.error || "Backend Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app">

//       {!result ? (
//         <div className="hero">
//           <div className="card">

//             <div className="badge">AI Powered Resume Scanner</div>

//             <h1>AI Resume Analyzer</h1>

//             <p className="subtitle">
//               Upload your resume PDF and get ATS score, skills, missing keywords, and insights.
//             </p>

//             {/* FILE UPLOAD */}
//             <label className="upload-box">
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//               <span>
//                 {file ? `📄 ${file.name}` : "📄 Choose Resume PDF"}
//               </span>
//             </label>

//             <textarea
//               placeholder="OR paste resume here..."
//               value={resume}
//               onChange={(e) => setResume(e.target.value)}
//             />

//             <textarea
//               placeholder="Paste Job Description..."
//               value={jd}
//               onChange={(e) => setJd(e.target.value)}
//             />

//             <button onClick={handleAnalyze} disabled={loading}>
//               {loading ? "Analyzing..." : "Analyze Resume"}
//             </button>

//             <div className="features">
//               <span>ATS Score</span>
//               <span>Skill Detection</span>
              
//             </div>

//           </div>
//         </div>
//       ) : (
//         <div className="result-page">
//           <div className="result-card">

//             <h1>Resume Analysis Result</h1>

//             {/* SCORE CIRCLE */}
//             <div className="score-circle">
//               <span>{result?.ats_score || 0}%</span>
//               <p>ATS Score</p>
//             </div>

//             {/* GRID */}
//             <div className="summary-grid">
//               <div>
//                 <h3>📊 Resume Quality</h3>
//                 <p>{result?.resume_quality}</p>
//               </div>

//               <div>
//                 <h3>🟢 Matching Skills</h3>
//                 <p>{result?.matching_skills?.length || 0}</p>
//               </div>

//               <div>
//                 <h3>🔴 Missing Skills</h3>
//                 <p>{result?.missing_skills?.length || 0}</p>
//               </div>
//             </div>

//             {/* MATCHING */}
//             <div className="section">
//               <h2>✅ Matching Skills</h2>
//               <div className="chips">
//                 {result?.matching_skills?.map((s, i) => (
//                   <span key={i}>{s}</span>
//                 ))}
//               </div>
//             </div>

//             {/* MISSING */}
//             <div className="section">
//               <h2>⚠ Missing Skills</h2>
//               <div className="chips warning">
//                 {result?.missing_skills?.map((s, i) => (
//                   <span key={i}>{s}</span>
//                 ))}
//               </div>
//             </div>

//             {/* WEAKNESS */}
//             <div className="section">
//               <h2>🔴 Weaknesses</h2>
//               <ul>
//                 {result?.weaknesses?.map((w, i) => (
//                   <li key={i}>{w}</li>
//                 ))}
//               </ul>
//             </div>

//             {/* BACK BUTTON */}
//             <button className="back-btn" onClick={() => setResult(null)}>
//               🔙 Analyze Another Resume
//             </button>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }





// import { useState } from "react";
// import axios from "axios";
// import "./upload.css";
// import Dashboard from "./Dashboard";

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [resume, setResume] = useState("");
//   const [jd, setJd] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [improvedResume, setImprovedResume] = useState("");
//   const handleAnalyze = async () => {
//     try {
//       setLoading(true);

//       let response;

//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("jd", jd);

//         response = await axios.post(
//           "http://localhost:5000/api/resume/upload",
//           formData
//         );

//         setResult(response.data);
//       } else {
//         response = await axios.post(
//           "http://localhost:5000/api/ai/analyze",
//           { resume, jd }
//         );

//         setResult(response.data.data);
//       }

//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.error || "Backend Error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="app">

//       {/* ✅ RESULT VIEW (Dashboard) */}
//       {result ? (
//         <Dashboard data={result} />
//       ) : (
//         /* ✅ UPLOAD VIEW */
//         <div className="hero">
//           <div className="card">

//             <div className="badge">AI Powered Resume Scanner</div>

//             <h1>AI Resume Analyzer</h1>

//             <p className="subtitle">
//               Upload your resume PDF and get ATS score, skills, missing keywords, and insights.
//             </p>

//             {/* FILE UPLOAD */}
//             <label className="upload-box">
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//               <span>
//                 {file ? `📄 ${file.name}` : "📄 Choose Resume PDF"}
//               </span>
//             </label>

//             {/* TEXT AREA - RESUME */}
//             <textarea
//               placeholder="OR paste resume here..."
//               value={resume}
//               onChange={(e) => setResume(e.target.value)}
//             />

//             {/* TEXT AREA - JD */}
//             <textarea
//               placeholder="Paste Job Description..."
//               value={jd}
//               onChange={(e) => setJd(e.target.value)}
//             />

//             {/* BUTTON */}
//             <button onClick={handleAnalyze} disabled={loading}>
//               {loading ? "Analyzing..." : "Analyze Resume"}
//             </button>

//             <div className="features">
//               <span>ATS Score</span>
//               <span>Skill Detection</span>
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }


// import { useState } from "react";
// import axios from "axios";
// import "./upload.css";
// import Dashboard from "./Dashboard";
// import MockInterview from "./MockInterview";
// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [resume, setResume] = useState("");
//   const [jd, setJd] = useState("");

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [rewriteLoading, setRewriteLoading] = useState(false);

//   const [originalResume, setOriginalResume] = useState("");
//   const [improvedResume, setImprovedResume] = useState("");
//   const [changesSuggested, setChangesSuggested] = useState([]);

//   // ==========================
//   // ANALYZE RESUME
//   // ==========================
//   const handleAnalyze = async () => {
//     try {
//       setLoading(true);

//       let response;

//       if (file) {
//         const formData = new FormData();

//         formData.append("file", file);
//         formData.append("jd", jd);

//         response = await axios.post(
//           "http://localhost:5000/api/resume/upload",
//           formData
//         );

//         setResult(response.data);
//       } else {
//         response = await axios.post(
//           "http://localhost:5000/api/ai/analyze",
//           {
//             resume,
//             jd,
//           }
//         );

//         setResult(response.data.data);
//       }
//     } catch (error) {
//       console.error(error);

//       alert(
//         error?.response?.data?.error ||
//           "Analyze failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================
//   // RESUME REWRITER
//   // ==========================
//   const handleRewriteResume = async () => {
//     try {
//       setRewriteLoading(true);

//       let resumeText = "";

//       // pasted resume
//       if (resume?.trim()) {
//         resumeText = resume.trim();
//       }

//       // uploaded PDF
//       if (file) {
//         const formData = new FormData();

//         formData.append("file", file);

//         const uploadRes = await axios.post(
//           "http://localhost:5000/api/resume/upload",
//           formData
//         );

//         console.log(
//           "UPLOAD RESPONSE:",
//           uploadRes.data
//         );

//         if (uploadRes.data?.resume_text) {
//           resumeText =
//             uploadRes.data.resume_text;
//         }
//       }

//       if (!resumeText) {
//         alert(
//           "Please upload a PDF or paste resume first"
//         );
//         return;
//       }

//       setOriginalResume(resumeText);

//       const response = await axios.post(
//         "http://localhost:5000/api/resume/rewrite",
//         {
//           resume: resumeText,
//         }
//       );

//       console.log(
//         "REWRITE RESPONSE:",
//         response.data
//       );

//       setImprovedResume(
//         response.data?.improved_resume ||
//           response.data?.rewritten_resume ||
//           response.data?.resume ||
//           ""
//       );

//       setChangesSuggested(
//         response.data?.changes ||
//           response.data?.changes_suggested ||
//           []
//       );
//     } catch (error) {
//       console.error(error);

//       console.log(
//         "FULL ERROR:",
//         error?.response?.data
//       );

//       alert(
//         error?.response?.data?.error ||
//           "Resume rewrite failed"
//       );
//     } finally {
//       setRewriteLoading(false);
//     }
//   };

//   return (
//     <div className="app">
//       {result ? (
//         <Dashboard data={result} />
//       ) : (
//         <div className="hero">
//           <div className="card">
//             <div className="badge">
//               AI Powered Resume Scanner
//             </div>

//             <h1>AI Resume Analyzer</h1>

//             <p className="subtitle">
//               Upload your resume and receive ATS
//               insights, missing skills, career
//               guidance, and AI-powered resume
//               improvements.
//             </p>

//             {/* PDF Upload */}
//             <label className="upload-box">
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) =>
//                   setFile(e.target.files[0])
//                 }
//               />

//               <span>
//                 {file
//                   ? `📄 ${file.name}`
//                   : "📄 Choose Resume PDF"}
//               </span>
//             </label>

//             {/* Resume */}
//             <textarea
//               placeholder="Paste Resume..."
//               value={resume}
//               onChange={(e) =>
//                 setResume(e.target.value)
//               }
//             />

//             {/* JD */}
//             <textarea
//               placeholder="Paste Job Description..."
//               value={jd}
//               onChange={(e) =>
//                 setJd(e.target.value)
//               }
//             />

//             {/* Analyze */}
//             <button
//               onClick={handleAnalyze}
//               disabled={loading}
//             >
//               {loading
//                 ? "Analyzing..."
//                 : "🚀 Analyze Resume"}
//             </button>

//             {/* Rewrite */}
//             <button
//               style={{
//                 marginTop: "12px",
//                 background: "#7c3aed",
//               }}
//               onClick={handleRewriteResume}
//               disabled={rewriteLoading}
//             >
//               {rewriteLoading
//                 ? "Rewriting..."
//                 : "✨ AI Resume Rewriter"}
//             </button>

//             {/* RESULTS */}
//             {improvedResume && (
//               <div
//                 style={{
//                   marginTop: "30px",
//                   textAlign: "left",
//                 }}
//               >
//                 <h3>
//                   📝 Original Resume
//                 </h3>

//                 <textarea
//                   rows={8}
//                   value={originalResume}
//                   readOnly
//                 />

//                 <h3
//                   style={{
//                     marginTop: "20px",
//                   }}
//                 >
//                   🚀 Improved Resume
//                 </h3>

//                 <textarea
//                   rows={12}
//                   value={improvedResume}
//                   readOnly
//                 />

//                 <button
//                   style={{
//                     marginTop: "10px",
//                     background: "#16a34a",
//                   }}
//                   onClick={() =>
//                     navigator.clipboard.writeText(
//                       improvedResume
//                     )
//                   }
//                 >
//                   📋 Copy Improved Resume
//                 </button>

//                 {changesSuggested.length >
//                   0 && (
//                   <>
//                     <h3
//                       style={{
//                         marginTop: "25px",
//                       }}
//                     >
//                       🔥 Changes Suggested
//                     </h3>

//                     {changesSuggested.map(
//                       (change, index) => (
//                         <div
//                           key={index}
//                           style={{
//                             padding: "12px",
//                             marginBottom:
//                               "10px",
//                             border:
//                               "1px solid #333",
//                             borderRadius:
//                               "8px",
//                           }}
//                         >
//                           <p>
//                             <strong>
//                               Before:
//                             </strong>{" "}
//                             {
//                               change.before
//                             }
//                           </p>

//                           <p>
//                             <strong>
//                               After:
//                             </strong>{" "}
//                             {change.after}
//                           </p>

//                           <p>
//                             <strong>
//                               Reason:
//                             </strong>{" "}
//                             {
//                               change.reason
//                             }
//                           </p>
//                         </div>
//                       )
//                     )}
//                   </>
//                 )}
//               </div>
//             )}

//             <div className="features">
//               <span>ATS Score</span>
//               <span>Skill Detection</span>
//               <span>Resume Rewriter</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import { useState } from "react";
// import axios from "axios";
// import "./upload.css";
// import Dashboard from "./Dashboard";
// import MockInterview from "./MockInterview";

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [resume, setResume] = useState("");
//   const [jd, setJd] = useState("");

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [rewriteLoading, setRewriteLoading] = useState(false);

//   const [originalResume, setOriginalResume] = useState("");
//   const [improvedResume, setImprovedResume] = useState("");
//   const [changesSuggested, setChangesSuggested] = useState([]);

//   // ==========================
//   // ANALYZE RESUME
//   // ==========================
//   const handleAnalyze = async () => {
//     try {
//       setLoading(true);

//       let response;

//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("jd", jd);

//         response = await axios.post(
//           "http://localhost:5000/api/resume/upload",
//           formData
//         );

//         setResult(response.data);
//       } else {
//         response = await axios.post(
//           "http://localhost:5000/api/ai/analyze",
//           {
//             resume,
//             jd,
//           }
//         );

//         setResult(response.data.data);
//       }
//     } catch (error) {
//       console.error(error);

//       alert(
//         error?.response?.data?.error ||
//           "Analyze failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================
//   // RESUME REWRITER
//   // ==========================
//   const handleRewriteResume = async () => {
//     try {
//       setRewriteLoading(true);

//       let resumeText = "";

//       // Use pasted resume
//       if (resume?.trim()) {
//         resumeText = resume.trim();
//       }

//       // Use uploaded PDF
//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);

//         const uploadRes = await axios.post(
//           "http://localhost:5000/api/resume/upload",
//           formData
//         );

//         if (uploadRes.data?.resume_text) {
//           resumeText = uploadRes.data.resume_text;
//         }
//       }

//       if (!resumeText) {
//         alert(
//           "Please upload a PDF or paste resume first"
//         );
//         return;
//       }

//       setOriginalResume(resumeText);

//       const response = await axios.post(
//         "http://localhost:5000/api/resume/rewrite",
//         {
//           resume: resumeText,
//         }
//       );

//       console.log(
//         "REWRITE RESPONSE:",
//         response.data
//       );

//       setImprovedResume(
//         response.data?.improved_resume ||
//           response.data?.rewritten_resume ||
//           response.data?.resume ||
//           ""
//       );

//       setChangesSuggested(
//         response.data?.changes ||
//           response.data?.changes_suggested ||
//           []
//       );
//     } catch (error) {
//       console.error(error);

//       alert(
//         error?.response?.data?.error ||
//           "Resume rewrite failed"
//       );
//     } finally {
//       setRewriteLoading(false);
//     }
//   };

//   return (
//     <div className="app">
//       {result ? (
//         <Dashboard data={result} />
//       ) : (
//         <div className="hero">
//           <div className="card">

//             <div className="badge">
//               AI Powered Resume Scanner
//             </div>

//             <h1>AI Resume Analyzer</h1>

//             <p className="subtitle">
//               Upload your resume and receive ATS
//               insights, skill-gap analysis,
//               AI-powered resume rewriting,
//               and mock interview preparation.
//             </p>

//             {/* PDF Upload */}
//             <label className="upload-box">
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) =>
//                   setFile(e.target.files[0])
//                 }
//               />

//               <span>
//                 {file
//                   ? `📄 ${file.name}`
//                   : "📄 Choose Resume PDF"}
//               </span>
//             </label>

//             {/* Resume */}
//             <textarea
//               placeholder="Paste Resume..."
//               value={resume}
//               onChange={(e) =>
//                 setResume(e.target.value)
//               }
//             />

//             {/* Job Description */}
//             <textarea
//               placeholder="Paste Job Description..."
//               value={jd}
//               onChange={(e) =>
//                 setJd(e.target.value)
//               }
//             />

//             {/* Analyze */}
//             <button
//               onClick={handleAnalyze}
//               disabled={loading}
//             >
//               {loading
//                 ? "Analyzing..."
//                 : "🚀 Analyze Resume"}
//             </button>

//             {/* Rewrite */}
//             <button
//               style={{
//                 marginTop: "12px",
//                 background: "#7c3aed",
//               }}
//               onClick={handleRewriteResume}
//               disabled={rewriteLoading}
//             >
//               {rewriteLoading
//                 ? "Rewriting..."
//                 : "✨ AI Resume Rewriter"}
//             </button>

//             {/* ==========================
//                 MOCK INTERVIEW SECTION
//             ========================== */}
//             <div
//               style={{
//                 marginTop: "40px",
//                 paddingTop: "20px",
//                 borderTop: "1px solid #333",
//               }}
//             >
//               <h2>
//                 🎤 AI Mock Interview Simulator
//               </h2>

//               <p>
//                 Practice interview questions
//                 based on your resume.
//               </p>

//               <MockInterview
//                 resumeText={
//                   originalResume ||
//                   resume ||
//                   ""
//                 }
//               />
//             </div>

//             {/* ==========================
//                 REWRITER RESULT
//             ========================== */}
//             {improvedResume && (
//               <div
//                 style={{
//                   marginTop: "30px",
//                   textAlign: "left",
//                 }}
//               >
//                 <h3>
//                   📝 Original Resume
//                 </h3>

//                 <textarea
//                   rows={8}
//                   value={originalResume}
//                   readOnly
//                 />

//                 <h3
//                   style={{
//                     marginTop: "20px",
//                   }}
//                 >
//                   🚀 Improved Resume
//                 </h3>

//                 <textarea
//                   rows={12}
//                   value={improvedResume}
//                   readOnly
//                 />

//                 <button
//                   style={{
//                     marginTop: "10px",
//                     background: "#16a34a",
//                   }}
//                   onClick={() =>
//                     navigator.clipboard.writeText(
//                       improvedResume
//                     )
//                   }
//                 >
//                   📋 Copy Improved Resume
//                 </button>

//                 {changesSuggested.length > 0 && (
//                   <>
//                     <h3
//                       style={{
//                         marginTop: "25px",
//                       }}
//                     >
//                       🔥 Changes Suggested
//                     </h3>

//                     {changesSuggested.map(
//                       (change, index) => (
//                         <div
//                           key={index}
//                           style={{
//                             padding: "12px",
//                             marginBottom: "10px",
//                             border:
//                               "1px solid #333",
//                             borderRadius:
//                               "8px",
//                           }}
//                         >
//                           <p>
//                             <strong>
//                               Before:
//                             </strong>{" "}
//                             {change.before}
//                           </p>

//                           <p>
//                             <strong>
//                               After:
//                             </strong>{" "}
//                             {change.after}
//                           </p>

//                           <p>
//                             <strong>
//                               Reason:
//                             </strong>{" "}
//                             {change.reason}
//                           </p>
//                         </div>
//                       )
//                     )}
//                   </>
//                 )}
//               </div>
//             )}

//             <div className="features">
//               <span>ATS Score</span>
//               <span>Skill Detection</span>
//               <span>Resume Rewriter</span>
//               <span>Mock Interview</span>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







// import { useState } from "react";
// import axios from "axios";
// import "./upload.css";
// import Dashboard from "./Dashboard";
// import MockInterview from "./MockInterview";

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [resume, setResume] = useState("");
//   const [jd, setJd] = useState("");

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [rewriteLoading, setRewriteLoading] = useState(false);

//   const [originalResume, setOriginalResume] = useState("");
//   const [improvedResume, setImprovedResume] = useState("");
//   const [changesSuggested, setChangesSuggested] = useState([]);

//   // ⭐ NEW: Interview control states
//   const [interviewStarted, setInterviewStarted] = useState(false);
//   const [interviewQuestion, setInterviewQuestion] = useState("");

//   // ==========================
//   // ANALYZE RESUME
//   // ==========================
//   const handleAnalyze = async () => {
//     try {
//       setLoading(true);

//       let response;

//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("jd", jd);

//         response = await axios.post(
//           "http://localhost:5000/api/resume/upload",
//           formData
//         );

//         setResult(response.data);
//       } else {
//         response = await axios.post(
//           "http://localhost:5000/api/ai/analyze",
//           {
//             resume,
//             jd,
//           }
//         );

//         setResult(response.data.data);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.error || "Analyze failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================
//   // RESUME REWRITER
//   // ==========================
//   const handleRewriteResume = async () => {
//     try {
//       setRewriteLoading(true);

//       let resumeText = "";

//       if (resume?.trim()) {
//         resumeText = resume.trim();
//       }

//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);

//         const uploadRes = await axios.post(
//           "http://localhost:5000/api/resume/upload",
//           formData
//         );

//         if (uploadRes.data?.resume_text) {
//           resumeText = uploadRes.data.resume_text;
//         }
//       }

//       if (!resumeText) {
//         alert("Please upload a PDF or paste resume first");
//         return;
//       }

//       setOriginalResume(resumeText);

//       const response = await axios.post(
//         "http://localhost:5000/api/resume/rewrite",
//         {
//           resume: resumeText,
//         }
//       );

//       setImprovedResume(
//         response.data?.improved_resume ||
//           response.data?.rewritten_resume ||
//           response.data?.resume ||
//           ""
//       );

//       setChangesSuggested(
//         response.data?.changes ||
//           response.data?.changes_suggested ||
//           []
//       );
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.error || "Resume rewrite failed");
//     } finally {
//       setRewriteLoading(false);
//     }
//   };

//   // ==========================
//   // ⭐ MOCK INTERVIEW START FIX
//   // ==========================
//   const startInterview = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/interview/start",
//         {
//           resume: originalResume || resume,
//         }
//       );

//       console.log("INTERVIEW START RESPONSE:", res.data);

//       setInterviewQuestion(res.data?.question || "");
//       setInterviewStarted(true);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to start interview");
//     }
//   };

//   return (
//     <div className="app">

//       {/* ==========================
//           DASHBOARD VIEW
//       ========================== */}
//       {result ? (
//         <Dashboard data={result} />
//       ) : (
//         <div className="hero">
//           <div className="card">

//             <div className="badge">
//               AI Powered Resume Scanner
//             </div>

//             <h1>AI Resume Analyzer</h1>

//             <p className="subtitle">
//               Upload your resume and receive ATS insights, skill-gap analysis,
//               AI-powered resume rewriting, and mock interview preparation.
//             </p>

//             {/* ==========================
//                 PDF UPLOAD
//             ========================== */}
//             <label className="upload-box">
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />

//               <span>
//                 {file ? `📄 ${file.name}` : "📄 Choose Resume PDF"}
//               </span>
//             </label>

//             {/* Resume Text */}
//             <textarea
//               placeholder="Paste Resume..."
//               value={resume}
//               onChange={(e) => setResume(e.target.value)}
//             />

//             {/* JD */}
//             <textarea
//               placeholder="Paste Job Description..."
//               value={jd}
//               onChange={(e) => setJd(e.target.value)}
//             />

//             {/* Analyze */}
//             <button onClick={handleAnalyze} disabled={loading}>
//               {loading ? "Analyzing..." : "🚀 Analyze Resume"}
//             </button>

//             {/* Rewrite */}
//             <button
//               style={{ marginTop: "12px", background: "#7c3aed" }}
//               onClick={handleRewriteResume}
//               disabled={rewriteLoading}
//             >
//               {rewriteLoading ? "Rewriting..." : "✨ AI Resume Rewriter"}
//             </button>

//             {/* ==========================
//                 MOCK INTERVIEW SECTION
//             ========================== */}
//             <div
//               style={{
//                 marginTop: "40px",
//                 paddingTop: "20px",
//                 borderTop: "1px solid #333",
//               }}
//             >
//               <h2>🎤 AI Mock Interview Simulator</h2>

//               <p>Practice interview questions based on your resume.</p>

//               {/* ⭐ START BUTTON */}
//               {!interviewStarted && (
//                 <button onClick={startInterview}>
//                   🎤 Start Mock Interview
//                 </button>
//               )}

//               {/* ⭐ SHOW INTERVIEW ONLY AFTER START */}
//               {interviewStarted && (
//                 <MockInterview
//                   resumeText={originalResume || resume || ""}
//                   question={interviewQuestion}
//                 />
//               )}
//             </div>

//             {/* ==========================
//                 REWRITER RESULT
//             ========================== */}
//             {improvedResume && (
//               <div style={{ marginTop: "30px", textAlign: "left" }}>
//                 <h3>📝 Original Resume</h3>
//                 <textarea rows={8} value={originalResume} readOnly />

//                 <h3 style={{ marginTop: "20px" }}>
//                   🚀 Improved Resume
//                 </h3>

//                 <textarea rows={12} value={improvedResume} readOnly />

//                 <button
//                   style={{ marginTop: "10px", background: "#16a34a" }}
//                   onClick={() =>
//                     navigator.clipboard.writeText(improvedResume)
//                   }
//                 >
//                   📋 Copy Improved Resume
//                 </button>

//                 {changesSuggested.length > 0 && (
//                   <>
//                     <h3 style={{ marginTop: "25px" }}>
//                       🔥 Changes Suggested
//                     </h3>

//                     {changesSuggested.map((change, index) => (
//                       <div
//                         key={index}
//                         style={{
//                           padding: "12px",
//                           marginBottom: "10px",
//                           border: "1px solid #333",
//                           borderRadius: "8px",
//                         }}
//                       >
//                         <p><strong>Before:</strong> {change.before}</p>
//                         <p><strong>After:</strong> {change.after}</p>
//                         <p><strong>Reason:</strong> {change.reason}</p>
//                       </div>
//                     ))}
//                   </>
//                 )}
//               </div>
//             )}

//             {/* FEATURES */}
//             <div className="features">
//               <span>ATS Score</span>
//               <span>Skill Detection</span>
//               <span>Resume Rewriter</span>
//               <span>Mock Interview</span>
//             </div>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// import { useState } from "react";
// import axios from "axios";
// import "./upload.css";
// import Dashboard from "./Dashboard";
// import MockInterview from "./MockInterview";

// export default function UploadPage() {

//   // =========================
//   // CORE STATES
//   // =========================
//   const [file, setFile] = useState(null);
//   const [resume, setResume] = useState("");
//   const [jd, setJd] = useState("");

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [rewriteLoading, setRewriteLoading] = useState(false);

//   const [originalResume, setOriginalResume] = useState("");
//   const [improvedResume, setImprovedResume] = useState("");
//   const [changesSuggested, setChangesSuggested] = useState([]);

//   // =========================
//   // INTERVIEW STATE (SIMPLIFIED)
//   // =========================
//   const [interviewStarted, setInterviewStarted] = useState(false);

//   // =========================
//   // ANALYZE RESUME
//   // =========================
//   const handleAnalyze = async () => {
//     try {
//       setLoading(true);

//       let response;

//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("jd", jd);

//         response = await axios.post(
//           "http://localhost:5000/api/resume/upload",
//           formData
//         );

//         setResult(response.data);
//       } else {
//         response = await axios.post(
//           "http://localhost:5000/api/ai/analyze",
//           {
//             resume,
//             jd,
//           }
//         );

//         setResult(response.data.data);
//       }

//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.error || "Analyze failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // RESUME REWRITER
//   // =========================
//   const handleRewriteResume = async () => {
//     try {
//       setRewriteLoading(true);

//       let resumeText = resume?.trim();

//       if (file && !resumeText) {
//         const formData = new FormData();
//         formData.append("file", file);

//         const uploadRes = await axios.post(
//           "http://localhost:5000/api/resume/upload",
//           formData
//         );

//         resumeText = uploadRes.data?.resume_text || "";
//       }

//       if (!resumeText) {
//         alert("Please upload or paste resume");
//         return;
//       }

//       setOriginalResume(resumeText);

//       const response = await axios.post(
//         "http://localhost:5000/api/resume/rewrite",
//         { resume: resumeText }
//       );

//       setImprovedResume(
//         response.data?.improved_resume ||
//         response.data?.rewritten_resume ||
//         response.data?.resume ||
//         ""
//       );

//       setChangesSuggested(
//         response.data?.changes ||
//         response.data?.changes_suggested ||
//         []
//       );

//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.error || "Resume rewrite failed");
//     } finally {
//       setRewriteLoading(false);
//     }
//   };

//   // =========================
//   // START INTERVIEW (FIXED)
//   // =========================
//   const startInterview = async () => {
//     try {

//       const res = await axios.post(
//         "http://localhost:5000/api/interview/start",
//         {
//           resume: originalResume || resume,
//            total_questions: selectedCount
//         }
        
//       );

//       console.log("INTERVIEW START RESPONSE:", res.data);

//       // ⭐ IMPORTANT: ONLY trigger interview mode
//       setInterviewStarted(true);

//     } catch (err) {
//       console.error(err);
//       alert("Failed to start interview");
//     }
//   };

//   return (
//     <div className="app">

//       {/* =========================
//           DASHBOARD
//       ========================= */}
//       {result ? (
//         <Dashboard data={result} />
//       ) : (
//         <div className="hero">

//           <div className="card">

//             <div className="badge">
//               AI Powered Resume Scanner
//             </div>

//             <h1>AI Resume Analyzer</h1>

//             <p className="subtitle">
//               Upload resume, get ATS score, skill gap analysis,
//               AI rewriting, and mock interviews.
//             </p>

//             {/* FILE UPLOAD */}
//             <label className="upload-box">
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />

//               <span>
//                 {file ? file.name : "📄 Choose Resume PDF"}
//               </span>
//             </label>

//             {/* INPUTS */}
//             <textarea
//               placeholder="Paste Resume..."
//               value={resume}
//               onChange={(e) => setResume(e.target.value)}
//             />

//             <textarea
//               placeholder="Paste Job Description..."
//               value={jd}
//               onChange={(e) => setJd(e.target.value)}
//             />

//             {/* ANALYZE */}
//             <button onClick={handleAnalyze} disabled={loading}>
//               {loading ? "Analyzing..." : "🚀 Analyze Resume"}
//             </button>

//             {/* REWRITE */}
//             <button
//               style={{ marginTop: "12px", background: "#7c3aed" }}
//               onClick={handleRewriteResume}
//               disabled={rewriteLoading}
//             >
//               {rewriteLoading ? "Rewriting..." : "✨ AI Resume Rewriter"}
//             </button>

//             {/* =========================
//                 MOCK INTERVIEW
//             ========================= */}
//             <div style={{
//               marginTop: "40px",
//               paddingTop: "20px",
//               borderTop: "1px solid #333"
//             }}>

//               <h2>🎤 AI Mock Interview</h2>

//               {!interviewStarted && (
//                 <button onClick={startInterview}>
//                   Start Mock Interview
//                 </button>
//               )}

//               {/* ⭐ FIXED: NO extra props needed */}
//               {interviewStarted && (
//                 <MockInterview
//                   resumeText={originalResume || resume || ""}
//                 />
//               )}

//             </div>

//             {/* REWRITE RESULT */}
//             {improvedResume && (
//               <div style={{ marginTop: "30px" }}>

//                 <h3>📝 Original Resume</h3>
//                 <textarea rows={8} value={originalResume} readOnly />

//                 <h3>🚀 Improved Resume</h3>
//                 <textarea rows={12} value={improvedResume} readOnly />

//                 <button
//                   onClick={() => navigator.clipboard.writeText(improvedResume)}
//                 >
//                   📋 Copy Improved Resume
//                 </button>

//               </div>
//             )}

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./upload.css";
// import Dashboard from "./Dashboard";

// export default function UploadPage() {
//   // =========================
//   // STATES
//   // =========================
//   const [file, setFile] = useState(null);
//   const [resume, setResume] = useState("");
//   const [jd, setJd] = useState("");

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [rewriteLoading, setRewriteLoading] = useState(false);

//   const [originalResume, setOriginalResume] = useState("");
//   const [improvedResume, setImprovedResume] = useState("");
//   const [changesSuggested, setChangesSuggested] = useState([]);

//   const [questionCount, setQuestionCount] = useState(5);

//   const navigate = useNavigate();

//   // =========================
//   // ANALYZE RESUME
//   // =========================
//   const handleAnalyze = async () => {
//     try {
//       setLoading(true);

//       let response;

//       if (file) {
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("jd", jd);

//         response = await axios.post(
//           "http://localhost:5000/api/resume/upload",
//           formData
//         );

//         setResult(response.data);
//       } else {
//         response = await axios.post(
//           "http://localhost:5000/api/ai/analyze",
//           {
//             resume,
//             jd,
//           }
//         );

//         setResult(response.data.data);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.error || "Analyze failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // RESUME REWRITE
//   // =========================
//   const handleRewriteResume = async () => {
//     try {
//       setRewriteLoading(true);

//       let resumeText = resume?.trim();

//       if (file && !resumeText) {
//         const formData = new FormData();
//         formData.append("file", file);

//         const uploadRes = await axios.post(
//           "http://localhost:5000/api/resume/upload",
//           formData
//         );

//         resumeText = uploadRes.data?.resume_text || "";
//       }

//       if (!resumeText) {
//         alert("Please upload or paste resume");
//         return;
//       }

//       setOriginalResume(resumeText);

//       const response = await axios.post(
//         "http://localhost:5000/api/resume/rewrite",
//         { resume: resumeText }
//       );

//       setImprovedResume(
//         response.data?.improved_resume ||
//         response.data?.rewritten_resume ||
//         response.data?.resume ||
//         ""
//       );

//       setChangesSuggested(
//         response.data?.changes ||
//         response.data?.changes_suggested ||
//         []
//       );
//     } catch (error) {
//       console.error(error);
//       alert(error?.response?.data?.error || "Resume rewrite failed");
//     } finally {
//       setRewriteLoading(false);
//     }
//   };

//   // =========================
//   // START INTERVIEW (FIXED FLOW)
//   // =========================
//   const startInterview = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/interview/start",
//         {
//           resume: originalResume || resume,
//           total_questions: Number(questionCount),
//         }
//       );

//       const questions = res?.data?.questions || [];

//       if (!questions.length) {
//         alert("No questions generated");
//         return;
//       }

//       // ✅ MOVE TO NEXT PAGE (ROUTER FLOW)
//       navigate("/interview-session", {
//         state: {
//           questions: questions,
//         },
//       });
//     } catch (err) {
//       console.error(err);
//       alert("Failed to start interview");
//     }
//   };

//   return (
//     <div className="app">
//       {result ? (
//         <Dashboard data={result} />
//       ) : (
//         <div className="hero">
//           <div className="card">
//             <div className="badge">AI Powered Resume Scanner</div>

//             <h1>AI Resume Analyzer</h1>

//             <p className="subtitle">
//               Upload resume, get ATS score, skill gap analysis, AI rewriting,
//               and mock interviews.
//             </p>

//             {/* FILE UPLOAD */}
//             <label className="upload-box">
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />
//               <span>{file ? file.name : "📄 Choose Resume PDF"}</span>
//             </label>

//             {/* TEXT INPUTS */}
//             <textarea
//               placeholder="Paste Resume..."
//               value={resume}
//               onChange={(e) => setResume(e.target.value)}
//             />

//             <textarea
//               placeholder="Paste Job Description..."
//               value={jd}
//               onChange={(e) => setJd(e.target.value)}
//             />

//             {/* ANALYZE */}
//             <button onClick={handleAnalyze} disabled={loading}>
//               {loading ? "Analyzing..." : "🚀 Analyze Resume"}
//             </button>

//             {/* REWRITE */}
//             <button
//               style={{ marginTop: "12px", background: "#7c3aed" }}
//               onClick={handleRewriteResume}
//               disabled={rewriteLoading}
//             >
//               {rewriteLoading ? "Rewriting..." : "✨ AI Resume Rewriter"}
//             </button>

//             {/* =========================
//                 MOCK INTERVIEW SECTION
//             ========================= */}
//             <div
//               style={{
//                 marginTop: "40px",
//                 paddingTop: "20px",
//                 borderTop: "1px solid #333",
//               }}
//             >
//               <h2>🎤 AI Mock Interview</h2>

//               <label>Select Number of Questions</label>
//               <select
//                 value={questionCount}
//                 onChange={(e) => setQuestionCount(e.target.value)}
//               >
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={15}>15</option>
//                 <option value={20}>20</option>
//               </select>

//               <button onClick={startInterview}>
//                 Start Mock Interview
//               </button>
//             </div>

//             {/* REWRITE RESULT */}
//             {improvedResume && (
//               <div style={{ marginTop: "30px" }}>
//                 <h3>📝 Original Resume</h3>
//                 <textarea rows={8} value={originalResume} readOnly />

//                 <h3>🚀 Improved Resume</h3>
//                 <textarea rows={12} value={improvedResume} readOnly />

//                 <button
//                   onClick={() =>
//                     navigator.clipboard.writeText(improvedResume)
//                   }
//                 >
//                   📋 Copy Improved Resume
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./upload.css";
import Dashboard from "./Dashboard";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rewriteLoading, setRewriteLoading] = useState(false);

  const [originalResume, setOriginalResume] = useState("");
  const [improvedResume, setImprovedResume] = useState("");
  const [changesSuggested, setChangesSuggested] = useState([]);

  const [questionCount, setQuestionCount] = useState(5);

  const navigate = useNavigate();

  // =========================
  // ANALYZE RESUME
  // =========================
  const handleAnalyze = async () => {
    try {
      setLoading(true);

      let response;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("jd", jd);

        response = await axios.post(
          "http://localhost:5000/api/resume/upload",
          formData
        );

        setResult(response.data);
      } else {
        response = await axios.post(
          "http://localhost:5000/api/ai/analyze",
          {
            resume,
            jd,
          }
        );

        setResult(response.data.data);
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error || "Analyze failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESUME REWRITE
  // =========================
  const handleRewriteResume = async () => {
    try {
      setRewriteLoading(true);

      let resumeText = resume?.trim();

      if (file && !resumeText) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await axios.post(
          "http://localhost:5000/api/resume/upload",
          formData
        );

        resumeText = uploadRes.data?.resume_text || "";
      }

      if (!resumeText) {
        alert("Please upload or paste resume");
        return;
      }

      setOriginalResume(resumeText);

      const response = await axios.post(
        "http://localhost:5000/api/resume/rewrite",
        { resume: resumeText }
      );

      setImprovedResume(
        response.data?.improved_resume ||
        response.data?.rewritten_resume ||
        response.data?.resume ||
        ""
      );

      setChangesSuggested(
        response.data?.changes ||
        response.data?.changes_suggested ||
        []
      );

    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.error || "Resume rewrite failed");
    } finally {
      setRewriteLoading(false);
    }
  };

  // =========================
  // START INTERVIEW (🔥 FIXED)
  // =========================
  const startInterview = async () => {
    try {
      let resumeText = "";

      // 1. Prefer typed resume
      if (resume && resume.trim()) {
        resumeText = resume.trim();
      }

      // 2. If not, extract from file
      else if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await axios.post(
          "http://localhost:5000/api/resume/upload",
          formData
        );

        resumeText = uploadRes.data?.resume_text || "";
      }

      if (!resumeText) {
        alert("Please upload or paste resume first");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/interview/start",
        {
          resume: resumeText, // 🔥 FIXED
          jd: jd || "",
          total_questions: Number(questionCount),
        }
      );

      const questions = res?.data?.questions || [];

      if (!questions.length) {
        alert("No questions generated");
        return;
      }

      navigate("/interview-session", {
        state: {
          questions,
        },
      });

    } catch (err) {
      console.error(err);
      alert("Failed to start interview");
    }
  };

  return (
    <div className="app">
      {result ? (
        <Dashboard data={result} />
      ) : (
        <div className="hero">
          <div className="card">
            <div className="badge">AI Powered Resume Scanner</div>

            <h1>AI Resume Analyzer</h1>

            <p className="subtitle">
              Upload resume, get ATS score, skill gap analysis, AI rewriting,
              and mock interviews.
            </p>

            {/* FILE UPLOAD */}
            <label className="upload-box">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <span>{file ? file.name : "📄 Choose Resume PDF"}</span>
            </label>

            {/* TEXT INPUTS */}
            <textarea
              placeholder="Paste Resume..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />

            <textarea
              placeholder="Paste Job Description..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />

            {/* ANALYZE */}
            <button onClick={handleAnalyze} disabled={loading}>
              {loading ? "Analyzing..." : "🚀 Analyze Resume"}
            </button>

            {/* REWRITE */}
            <button
              style={{ marginTop: "12px", background: "#7c3aed" }}
              onClick={handleRewriteResume}
              disabled={rewriteLoading}
            >
              {rewriteLoading ? "Rewriting..." : "✨ AI Resume Rewriter"}
            </button>

            {/* =========================
                MOCK INTERVIEW SECTION
            ========================= */}
            <div
              style={{
                marginTop: "40px",
                paddingTop: "20px",
                borderTop: "1px solid #333",
              }}
            >
              <h2>🎤 AI Mock Interview</h2>

              <label>Select Number of Questions</label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(e.target.value)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>

              <button onClick={startInterview}>
                Start Mock Interview
              </button>
            </div>

            {/* REWRITE RESULT */}
            {improvedResume && (
              <div style={{ marginTop: "30px" }}>
                <h3>📝 Original Resume</h3>
                <textarea rows={8} value={originalResume} readOnly />

                <h3>🚀 Improved Resume</h3>
                <textarea rows={12} value={improvedResume} readOnly />

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(improvedResume)
                  }
                >
                  📋 Copy Improved Resume
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}