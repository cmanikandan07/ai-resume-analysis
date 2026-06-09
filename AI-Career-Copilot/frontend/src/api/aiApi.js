// const handleAnalyze = async () => {
//     setLoading(true);
  
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5000/api/ai/skill-gap",
//         {
//           resume,
//           job_description: jd
//         }
//       );
  
//       setResult(response.data);
//       console.log("STATE SET TO:", response.data);
  
//     } catch (error) {
//       console.log(error);
//       alert("Backend error");
//     }
  
//     setLoading(false);
//   };


const handleAnalyze = async () => {
  setLoading(true);

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/ai/skill-gap",
      {
        resume,
        job_description: jd,
      }
    );

    console.log("FULL RESPONSE:", response.data);

    // ⭐ safer extraction (handles different backend formats)
    const resultData = response.data?.data || response.data;

    setResult(resultData);

    console.log("STATE SET TO:", resultData);

  } catch (error) {
    console.log("ERROR:", error);
    alert(error?.response?.data?.error || "Backend error");
  } finally {
    setLoading(false); // ⭐ ALWAYS runs
  }
};