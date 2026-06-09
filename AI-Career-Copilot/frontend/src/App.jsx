// import UploadPage from "./pages/uploadPage.jsx";

// export default function App() {
//   return <UploadPage />;
// }


import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/uploadPage.jsx";
import MockInterview from "./pages/MockInterview.jsx";
import InterviewSession from "./pages/InterviewSession.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/mock-interview" element={<MockInterview />} />
       
       <Route path="/interview-session" element={<InterviewSession />} />
      </Routes>
    </BrowserRouter>
  );
}