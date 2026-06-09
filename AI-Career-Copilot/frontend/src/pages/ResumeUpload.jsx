import { useState } from "react";
import { analyzeResume } from "../api/aiApi";
import Dashboard from "./Dashboard";

export default function UploadResume() {
  const [resume, setResume] = useState("");
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    const data = await analyzeResume(resume, jd);
    setResult(data);
    console.log("STATE SET TO:", response.data);
  };

  if (result) {
    return <Dashboard data={result} />;
  }

  return (
    <div>
      <h2>AI Career Copilot</h2>

      <textarea
        placeholder="Paste Resume"
        onChange={(e) => setResume(e.target.value)}
      />

      <textarea
        placeholder="Paste Job Description"
        onChange={(e) => setJd(e.target.value)}
      />

      <button onClick={handleAnalyze}>
        Analyze Resume
      </button>
    </div>
  );
}