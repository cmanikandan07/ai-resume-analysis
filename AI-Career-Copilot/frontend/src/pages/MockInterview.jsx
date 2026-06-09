// import { useState } from "react";
// import axios from "axios";

// export default function MockInterview() {

//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [result, setResult] = useState(null);

//   const startInterview = async () => {

//     const response = await axios.post(
//       "https://ai-resume-ymbi.onrender.com/api/interview/start",
//       {
//         skills: [
//           "AWS",
//           "Docker",
//           "Kubernetes"
//         ]
//       }
//     );

//     setQuestion(response.data.question);
//   };

//   const submitAnswer = async () => {

//     const response = await axios.post(
//       "https://ai-resume-ymbi.onrender.com/api/interview/evaluate",
//       {
//         question,
//         answer
//       }
//     );

//     setResult(response.data);
//   };

//   return (
//     <div>

//       <h2>🎤 AI Mock Interview</h2>

//       <button onClick={startInterview}>
//         Start Interview
//       </button>

//       {question && (
//         <>
//           <h3>{question}</h3>

//           <textarea
//             rows={6}
//             value={answer}
//             onChange={(e) =>
//               setAnswer(e.target.value)
//             }
//           />

//           <button onClick={submitAnswer}>
//             Submit Answer
//           </button>
//         </>
//       )}

//       {result && (
//         <>
//           <h3>Score: {result.score}/10</h3>

//           <h4>Strengths</h4>
//           <ul>
//             {result.strengths?.map((s, i) => (
//               <li key={i}>{s}</li>
//             ))}
//           </ul>

//           <h4>Weaknesses</h4>
//           <ul>
//             {result.weaknesses?.map((s, i) => (
//               <li key={i}>{s}</li>
//             ))}
//           </ul>

//           <h4>Ideal Answer</h4>
//           <p>{result.ideal_answer}</p>
//         </>
//       )}

//     </div>
//   );
// }



// import { useState } from "react";
// import axios from "axios";

// export default function MockInterview() {

//   const [sessionId, setSessionId] = useState(null);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [result, setResult] = useState(null);
//   const [isFinished, setIsFinished] = useState(false);

//   // 🔥 START INTERVIEW (NO HARDCODED SKILLS)
//   const startInterview = async () => {

//     const response = await axios.post(
//       "https://ai-resume-ymbi.onrender.com/api/interview/start",
//       {
//         resume: "user_resume_text_here"
//       }
//     );

//     setSessionId(response.data.sessionId);
//     setQuestion(response.data.question);
//     setIsFinished(false);
//     setResult(null);
//   };

//   // 🔥 SUBMIT ANSWER (MULTI QUESTION FLOW)
//   const submitAnswer = async () => {

//     const response = await axios.post(
//       "https://ai-resume-ymbi.onrender.com/api/interview/evaluate",
//       {
//         sessionId,
//         question,
//         answer
//       }
//     );

//     const data = response.data;

//     // CASE 1: NEXT QUESTION
//     if (data.nextQuestion) {
//       setQuestion(data.nextQuestion);
//       setAnswer("");
//       return;
//     }

//     // CASE 2: FINAL RESULT
//     if (data.finalResult) {
//       setResult(data.finalResult);
//       setIsFinished(true);
//       setQuestion("");
//     }
//   };

//   return (
//     <div>

//       <h2>🎤 AI Mock Interview</h2>

//       {!sessionId && (
//         <button onClick={startInterview}>
//           Start Interview
//         </button>
//       )}

//       {question && !isFinished && (
//         <>
//           <h3>{question}</h3>

//           <textarea
//             rows={6}
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//           />

//           <button onClick={submitAnswer}>
//             Submit Answer
//           </button>
//         </>
//       )}

//       {result && isFinished && (
//         <>
//           <h3>Score: {result.score}/10</h3>

//           <h4>Strengths</h4>
//           <ul>
//             {result.strengths?.map((s, i) => (
//               <li key={i}>{s}</li>
//             ))}
//           </ul>

//           <h4>Weaknesses</h4>
//           <ul>
//             {result.weaknesses?.map((s, i) => (
//               <li key={i}>{s}</li>
//             ))}
//           </ul>

//           <h4>Ideal Answer</h4>
//           <p>{result.ideal_answer}</p>
//         </>
//       )}

//     </div>
//   );
// }


// import { useState } from "react";
// import axios from "axios";

// export default function MockInterview({ resumeText = "" }) {

//   const [sessionId, setSessionId] = useState("");
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [result, setResult] = useState(null);
//   const [isFinished, setIsFinished] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // =========================
//   // START INTERVIEW
//   // =========================
//   const startInterview = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "https://ai-resume-ymbi.onrender.com/api/interview/start",
//         {
//           resume: resumeText,
//         }
//       );

//       console.log("START RESPONSE:", response.data);

//       const data = response.data;

//       // ✅ FIX 1: Always ensure sessionId exists
//       const generatedSessionId =
//         data.sessionId ||
//         Date.now().toString() + Math.random().toString(36).substr(2, 5);

//       setSessionId(generatedSessionId);

//       setQuestion(data.question || "");
//       setIsFinished(false);
//       setResult(null);
//       setAnswer("");

//     } catch (error) {
//       console.error("START ERROR:", error);
//       alert(error?.response?.data?.error || "Failed to start interview");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // SUBMIT ANSWER
//   // =========================
//   const submitAnswer = async () => {
//     try {
//       if (!answer.trim()) {
//         alert("Please write an answer");
//         return;
//       }

//       if (!sessionId) {
//         alert("Session not started. Please restart interview.");
//         return;
//       }

//       setLoading(true);

//       const response = await axios.post(
//         "https://ai-resume-ymbi.onrender.com/api/interview/evaluate",
//         {
//           sessionId,
//           question,
//           answer,
//         }
//       );

//       const data = response.data;

//       console.log("EVALUATE RESPONSE:", data);

//       // =========================
//       // NEXT QUESTION FLOW
//       // =========================
//       if (data.nextQuestion) {
//         setQuestion(data.nextQuestion);
//         setAnswer("");
//         return;
//       }

//       // =========================
//       // FINAL RESULT FLOW
//       // =========================
//       const finalResult = data.finalResult || data;

//       if (finalResult) {
//         setResult(finalResult);
//         setIsFinished(true);
//         setQuestion("");
//       }

//     } catch (error) {
//       console.error("EVALUATE ERROR:", error);
//       alert(error?.response?.data?.error || "Evaluation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // RESET
//   // =========================
//   const resetInterview = () => {
//     setSessionId("");
//     setQuestion("");
//     setAnswer("");
//     setResult(null);
//     setIsFinished(false);
//   };

//   return (
//     <div style={{ padding: "20px" }}>

//       <h2>🎤 AI Mock Interview</h2>

//       {/* START BUTTON */}
//       {!sessionId && (
//         <button onClick={startInterview} disabled={loading}>
//           {loading ? "Starting..." : "Start Interview"}
//         </button>
//       )}

//       {/* QUESTION */}
//       {question && !isFinished && (
//         <>
//           <h3 style={{ marginTop: "20px" }}>
//             {question}
//           </h3>

//           <textarea
//             rows={6}
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             placeholder="Type your answer..."
//           />

//           <br />

//           <button onClick={submitAnswer} disabled={loading}>
//             {loading ? "Submitting..." : "Submit Answer"}
//           </button>
//         </>
//       )}

//       {/* RESULT */}
//       {isFinished && result && (
//         <div style={{ marginTop: "20px" }}>

//           <h3>📊 Score: {result.score || 0}/10</h3>

//           <h4>✅ Strengths</h4>
//           <ul>
//             {(result.strengths || []).map((s, i) => (
//               <li key={i}>{s}</li>
//             ))}
//           </ul>

//           <h4>❌ Weaknesses</h4>
//           <ul>
//             {(result.weaknesses || []).map((s, i) => (
//               <li key={i}>{s}</li>
//             ))}
//           </ul>

//           <h4>💡 Ideal Answer</h4>
//           <p>{result.ideal_answer || "N/A"}</p>

//           <button onClick={resetInterview} style={{ marginTop: "15px" }}>
//             🔄 Restart Interview
//           </button>

//         </div>
//       )}

//     </div>
//   );
// }






// import { useState } from "react";
// import axios from "axios";

// export default function MockInterview({ resumeText = "" }) {

//   // =========================
//   // CORE STATES
//   // =========================
//   const [sessionId, setSessionId] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [questionList, setQuestionList] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");

//   const [result, setResult] = useState(null);
//   const [isFinished, setIsFinished] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [totalQuestions, setTotalQuestions] = useState(5);

//   // =========================
//   // START INTERVIEW
//   // =========================
// const startInterview = async () => {
//   try {
//     const res = await axios.post(
//       "https://ai-resume-ymbi.onrender.com/api/interview/start",
//       {
//         resume: resumeText
//       }
//     );

//     console.log("START RESPONSE:", res.data);

//     // ⭐ IMPORTANT FIX
//     const questions = res.data.questions || [];

//     if (questions.length === 0) {
//       alert("No questions generated");
//       return;
//     }

//     setSessionId(res.data.sessionId);

//     // store FULL list
//     setQuestionList(questions);

//     // show first question
//     setCurrentIndex(0);
//     setQuestion(questions[0].question);

//   } catch (err) {
//     console.error(err);
//     alert("Failed to start interview");
//   }
// };

//   // =========================
//   // SUBMIT ANSWER
//   // =========================
// const submitAnswer = async () => {
//   const res = await axios.post(
//     "https://ai-resume-ymbi.onrender.com/api/interview/evaluate",
//     {
//       sessionId,
//       question,
//       answer
//     }
//   );

//   const nextIndex = currentIndex + 1;

//   if (nextIndex < questionList.length) {
//     setCurrentIndex(nextIndex);
//     setQuestion(questionList[nextIndex].question);
//     setAnswer("");
//   } else {
//     setResult(res.data);
//     setIsFinished(true);
//   }
// };
//   // =========================
//   // RESET INTERVIEW
//   // =========================
//   const resetInterview = () => {
//     setSessionId("");
//     setQuestions([]);
//     setCurrentIndex(0);
//     setQuestion("");
//     setAnswer("");
//     setResult(null);
//     setIsFinished(false);
//   };

//   // =========================
//   // UI
//   // =========================
//   return (
//     <div style={{
//       padding: "20px",
//       maxWidth: "700px",
//       margin: "auto",
//       fontFamily: "Arial"
//     }}>

//       <h2>🎤 AI Mock Interview</h2>

//       {/* QUESTION COUNT INPUT */}
//       {!sessionId && (
//         <div style={{ marginBottom: "15px" }}>
//           <label>Number of Questions: </label>
//           <input
//             type="number"
//             min="1"
//             max="10"
//             value={totalQuestions}
//             onChange={(e) => setTotalQuestions(Number(e.target.value))}
//           />
//         </div>
//       )}

//       {/* START BUTTON */}
//       {!sessionId && (
//         <button onClick={startInterview} disabled={loading}>
//           {loading ? "Starting..." : "Start Interview"}
//         </button>
//       )}

//       {/* PROGRESS */}
//       {sessionId && !isFinished && (
//         <p>
//           Question {currentIndex + 1} of {questions.length}
//         </p>
//       )}

//       {/* QUESTION */}
//       {question && !isFinished && (
//         <>
//           <h3 style={{ marginTop: "20px" }}>
//             {question}
//           </h3>

//           <textarea
//             rows={6}
//             value={answer}
//             onChange={(e) => setAnswer(e.target.value)}
//             placeholder="Type your answer..."
//           />

//           <br />

//           <button onClick={submitAnswer} disabled={loading}>
//             {loading ? "Submitting..." : "Submit Answer"}
//           </button>
//         </>
//       )}

//       {/* RESULT */}
//       {isFinished && result && (
//         <div style={{ marginTop: "20px" }}>

//           <h3>📊 Final Score: {result.score || 0}/10</h3>

//           <h4>✅ Strengths</h4>
//           <ul>
//             {(result.strengths || []).map((s, i) => (
//               <li key={i}>{s}</li>
//             ))}
//           </ul>

//           <h4>❌ Weaknesses</h4>
//           <ul>
//             {(result.weaknesses || []).map((s, i) => (
//               <li key={i}>{s}</li>
//             ))}
//           </ul>

//           <h4>💡 Ideal Answer</h4>
//           <p>{result.ideal_answer || "N/A"}</p>

//           <button onClick={resetInterview} style={{ marginTop: "15px" }}>
//             🔄 Restart Interview
//           </button>

//         </div>
//       )}

//     </div>
//   );
// }




// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function MockInterview() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [currentIndex, setCurrentIndex] = useState(0);

//   // user selection (IMPORTANT FIX)
//   const [questionCount, setQuestionCount] = useState(5);

//   const [started, setStarted] = useState(false);

//   // =========================
//   // START INTERVIEW
//   // =========================
//   const startInterview = async () => {
//     try {
//       setLoading(true);
//       setCurrentIndex(0);
//       setQuestions([]);

//       const res = await axios.post("/api/interview/start", {
//         questionCount: Number(questionCount),
//       });

//       const fetchedQuestions = res?.data?.questions || [];

//       setQuestions(fetchedQuestions);
//       setStarted(true);
//     } catch (err) {
//       console.error("Start Interview Error:", err);
//       setQuestions([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // NAVIGATION FIXED
//   // =========================
//   const nextQuestion = () => {
//     setCurrentIndex((prev) =>
//       Math.min(prev + 1, (questions?.length || 1) - 1)
//     );
//   };

//   const prevQuestion = () => {
//     setCurrentIndex((prev) => Math.max(prev - 1, 0));
//   };

//   // =========================
//   // SAFE VALUES (IMPORTANT FIX)
//   // =========================
//   const totalQuestions = questions?.length || 0;
//   const currentQuestion = questions?.[currentIndex];

//   return (
//     <div className="mock-container">
//       {!started ? (
//         <div className="setup-box">
//           <h2>Mock Interview Setup</h2>

//           <label>Select Number of Questions:</label>
//           <select
//             value={questionCount}
//             onChange={(e) => setQuestionCount(e.target.value)}
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={15}>15</option>
//             <option value={20}>20</option>
//           </select>

//           <button onClick={startInterview} disabled={loading}>
//             {loading ? "Starting..." : "Start Interview"}
//           </button>
//         </div>
//       ) : (
//         <div className="interview-box">
//           {/* HEADER FIX */}
//           <div className="header">
//             <h3>
//               Question {totalQuestions === 0 ? 0 : currentIndex + 1} of{" "}
//               {totalQuestions}
//             </h3>
//           </div>

//           {/* QUESTION SAFE RENDER */}
//           <div className="question-box">
//             {currentQuestion ? (
//               <p>{currentQuestion}</p>
//             ) : (
//               <p>No questions available</p>
//             )}
//           </div>

//           {/* CONTROLS */}
//           <div className="controls">
//             <button onClick={prevQuestion} disabled={currentIndex === 0}>
//               Previous
//             </button>

//             <button
//               onClick={nextQuestion}
//               disabled={currentIndex >= totalQuestions - 1}
//             >
//               Next
//             </button>
//           </div>

//           {/* RESET */}
//           <button
//             className="reset-btn"
//             onClick={() => {
//               setStarted(false);
//               setQuestions([]);
//               setCurrentIndex(0);
//             }}
//           >
//             Restart
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }







// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function MockInterview() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [questionCount, setQuestionCount] = useState(5);

//   const navigate = useNavigate();

//   // =========================
//   // START INTERVIEW (FIXED REDIRECT)
//   // =========================
//   const startInterview = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.post("/api/interview/start", {
//         questionCount: Number(questionCount),
//       });

//       const fetchedQuestions = res?.data?.questions || [];

//       if (fetchedQuestions.length === 0) {
//         alert("No questions generated");
//         return;
//       }

//       // 🔥 IMPORTANT: redirect to next page
//       navigate("/interview-session", {
//         state: {
//           questions: fetchedQuestions,
//           questionCount: fetchedQuestions.length,
//         },
//       });
//     } catch (err) {
//       console.error("Start Interview Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mock-container">
//       <div className="setup-box">
//         <h2>Mock Interview Setup</h2>

//         <label>Select Number of Questions:</label>

//         <select
//           value={questionCount}
//           onChange={(e) => setQuestionCount(e.target.value)}
//         >
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//           <option value={15}>15</option>
//           <option value={20}>20</option>
//         </select>

//         <button onClick={startInterview} disabled={loading}>
//           {loading ? "Starting..." : "Start Interview"}
//         </button>
//       </div>
//     </div>
//   );
// }







import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MockInterview() {
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);

  const navigate = useNavigate();

  // =========================
  // START INTERVIEW (RESUME-BASED FIX)
  // =========================
  const startInterview = async () => {
    try {
      setLoading(true);

      const resumeText = localStorage.getItem("resumeText") || "";
      const jdText = localStorage.getItem("jdText") || "";

      const res = await axios.post("/api/interview/start", {
        questionCount: Number(questionCount),

        // 🔥 IMPORTANT: SEND CONTEXT
        resume: resumeText,
        jd: jdText,
      });

      const fetchedQuestions = res?.data?.questions || [];

      if (!fetchedQuestions.length) {
        alert("No questions generated. Please check resume input.");
        return;
      }

      // Navigate to interview session
      navigate("/interview-session", {
        state: {
          questions: fetchedQuestions,
          questionCount: fetchedQuestions.length,
        },
      });

    } catch (err) {
      console.error("Start Interview Error:", err);
      alert("Failed to start interview. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="mock-container"
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="setup-box"
        style={{
          padding: "30px",
          borderRadius: "12px",
          background: "#1e293b",
          border: "1px solid #334155",
          width: "400px",
        }}
      >
        <h2 style={{ color: "#38bdf8" }}>Mock Interview Setup</h2>

        <label style={{ display: "block", marginTop: "15px" }}>
          Select Number of Questions:
        </label>

        <select
          value={questionCount}
          onChange={(e) => setQuestionCount(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "10px",
            borderRadius: "6px",
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #334155",
          }}
        >
          <option value={5}>5 Questions</option>
          <option value={10}>10 Questions</option>
          <option value={15}>15 Questions</option>
          <option value={20}>20 Questions</option>
        </select>

        <button
          onClick={startInterview}
          disabled={loading}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            background: "#22c55e",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Starting..." : "Start Interview"}
        </button>
      </div>
    </div>
  );
}