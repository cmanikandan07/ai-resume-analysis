import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function InterviewSession() {
  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const total = questions.length;
  const current = questions[index];

  // =========================
  // SAFETY CHECK
  // =========================
  if (!questions.length) {
    return (
      <div style={{ padding: "20px", color: "#fff", background: "#111827", minHeight: "100vh" }}>
        <h2>No Interview Data Found / Session Expired</h2>
        <button onClick={() => navigate("/mock-interview")}>
          Go Back
        </button>
      </div>
    );
  }

  // =========================
  // SUBMIT ANSWER (EVALUATION)
  // =========================
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/interview/evaluate",
        {
          question: current.question,
          answer: answer,
          skill: current.skill,
          type: current.type,
        }
      );

      console.log("EVALUATE RESPONSE:", res.data);

      setResult({
        score: res.data.score,
        feedback: res.data.weaknesses?.join(", ") || "",
        idealAnswer: res.data.ideal_answer || "",
      });

    } catch (err) {
      console.error(err);

      setResult({
        score: 0,
        feedback: "Error evaluating answer",
        idealAnswer: "No ideal answer available",
      });

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // NEXT QUESTION
  // =========================
  const nextQuestion = () => {
    setAnswer("");
    setResult(null);
    setIndex((prev) => Math.min(prev + 1, total - 1));
  };

  // =========================
  // PREVIOUS QUESTION
  // =========================
  const prevQuestion = () => {
    setAnswer("");
    setResult(null);
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        background: "#0f172a",
        color: "#fff",
        fontFamily: "Arial",
      }}
    >
      {/* HEADER */}
      <h2 style={{ color: "#38bdf8" }}>🎤 AI Mock Interview</h2>

      <h3>
        Question {index + 1} of {total}
      </h3>

      {/* QUESTION CARD */}
      <div
        style={{
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #334155",
          background: "#1e293b",
          marginBottom: "15px",
        }}
      >
        {current.question}
      </div>

      {/* ANSWER BOX */}
      <textarea
        rows={6}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Write your answer here..."
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #334155",
          background: "#0b1220",
          color: "#fff",
          marginBottom: "10px",
        }}
      />

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "10px 15px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          background: "#22c55e",
          color: "#000",
          fontWeight: "bold",
        }}
      >
        {loading ? "Evaluating..." : "Submit Answer"}
      </button>

      {/* RESULT BOX */}
      {result && (
        <div
          style={{
            marginTop: "20px",
            padding: "20px",
            borderRadius: "12px",
            background: "#1e1e2f",
            border: "1px solid #2d2d44",
            boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
          }}
        >
          {/* SCORE */}
          <h3 style={{ color: "#4ade80" }}>
            📊 Score: {result.score}/100
          </h3>

          {/* FEEDBACK */}
          <div style={{ marginTop: "10px" }}>
            <b style={{ color: "#fbbf24" }}>Feedback:</b>
            <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
              {result.feedback.split(",").map((item, i) => (
                <li key={i} style={{ color: "#e5e7eb" }}>
                  {item.trim()}
                </li>
              ))}
            </ul>
          </div>

          {/* IDEAL ANSWER */}
          <div style={{ marginTop: "15px" }}>
            <b style={{ color: "#60a5fa" }}>Ideal Answer:</b>
            <p
              style={{
                marginTop: "5px",
                color: "#cbd5e1",
                lineHeight: "1.6",
              }}
            >
              {result.idealAnswer}
            </p>
          </div>
        </div>
      )}

      {/* NAVIGATION */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={prevQuestion} disabled={index === 0}>
          Previous
        </button>

        <button
          onClick={nextQuestion}
          disabled={index === total - 1}
          style={{ marginLeft: "10px" }}
        >
          Next
        </button>
      </div>

      {/* END SESSION */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/")}>
          End Interview
        </button>
      </div>
    </div>
  );
}