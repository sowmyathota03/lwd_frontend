import React from "react";

function CareerAdvice() {
  const tips = [
    "Build a strong resume with clear skills and projects.",
    "Practice coding and technical interview questions daily.",
    "Improve communication and English speaking skills.",
    "Create LinkedIn and GitHub profiles.",
    "Apply for internships to gain real-time experience.",
    "Learn trending technologies like React, Java, Python.",
    "Attend webinars and tech workshops."
  ];

  return (
    <div
      style={{
        background: "linear-gradient(to right, #667eea, #764ba2)",
        minHeight: "100vh",
        padding: "40px",
        color: "white"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Career Advice
      </h1>

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          backgroundColor: "white",
          color: "#333",
          borderRadius: "12px",
          padding: "25px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
          Tips for Job Seekers
        </h3>

        <ul style={{ lineHeight: "1.8" }}>
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CareerAdvice;
