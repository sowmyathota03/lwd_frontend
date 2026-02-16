import React from "react";
import { useNavigate } from "react-router-dom";

function Career() {
  const navigate = useNavigate();

  const careerPaths = [
    {
      id: 1,
      title: "Immediate Joiner Jobs",
      desc: "Jobs for candidates who can join within 0–15 days.",
    },
    {
      id: 2,
      title: "Notice Period Friendly Jobs",
      desc: "Companies accepting 30–90 day notice period candidates.",
    },
    {
      id: 3,
      title: "Bench Candidate Hiring",
      desc: "Special openings for employees currently on bench.",
    },
    {
      id: 4,
      title: "Skill Upgrade Opportunities",
      desc: "Roles that allow learning React, Java, and Full Stack.",
    },
    {
      id: 5,
      title: "Freshers & Internships",
      desc: "Entry-level jobs and internships for graduates.",
    },
    {
      id: 6,
      title: "Remote & Contract Jobs",
      desc: "Work-from-home and short-term contract roles.",
    },
  ];

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f2fe, #f0fdfa)",
        color: "#0f172a",
      }}
    >
      {/* HEADER */}
      <h1 style={{ textAlign: "center", color: "#0ea5a4" }}>LWD Careers</h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "750px",
          margin: "10px auto 40px",
          lineHeight: "26px",
          color: "#334155",
        }}
      >
        LWD (Last Working Day) portal helps bench and notice-period candidates
        find quick and relevant job opportunities based on skills,
        availability, and last working day timeline.
      </p>

      {/* WHY LWD */}
      <section
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          marginBottom: "40px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ color: "#0284c7" }}>Why Use LWD Career Portal?</h2>
        <ul style={{ lineHeight: "30px", color: "#475569" }}>
          <li>✔ Jobs for Immediate Joiners</li>
          <li>✔ Notice Period Friendly Companies</li>
          <li>✔ Bench Employee Opportunities</li>
          <li>✔ Quick Apply & Faster Hiring</li>
          <li>✔ Resume & Career Support Tools</li>
        </ul>
      </section>

      {/* CAREER PATHS */}
      <section>
        <h2 style={{ textAlign: "center", color: "#0284c7" }}>
          Explore Opportunities
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "25px",
            marginTop: "25px",
            justifyContent: "center",
          }}
        >
          {careerPaths.map((career) => (
            <div
              key={career.id}
              style={{
                width: "300px",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
                transition: "transform 0.2s",
              }}
            >
              <h3 style={{ color: "#0ea5a4" }}>{career.title}</h3>
              <p style={{ color: "#64748b" }}>{career.desc}</p>
              <button
                onClick={() => navigate("/jobs")}
                style={{
                  marginTop: "10px",
                  padding: "9px 18px",
                  backgroundColor: "#0284c7",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                View Jobs
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section
        style={{
          marginTop: "50px",
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ color: "#0284c7" }}>Career Support Tools</h2>
        <ul style={{ lineHeight: "30px", color: "#475569" }}>
          <li>📄 Resume Building Tips</li>
          <li>🧮 Last Working Day Calculator</li>
          <li>🎯 Interview Preparation Guides</li>
          <li>📢 Immediate Job Alerts</li>
        </ul>
      </section>

      {/* CTA */}
      <section style={{ textAlign: "center", marginTop: "50px" }}>
        <h2 style={{ color: "#0ea5a4" }}>Restart Your Career Faster</h2>
        <p style={{ color: "#475569" }}>
          Create your profile and apply for jobs aligned with your LWD.
        </p>

        <button
          onClick={() => navigate("/profile")}
          style={{
            padding: "12px 26px",
            backgroundColor: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          Create Profile
        </button>
      </section>
    </div>
  );
}

export default Career;
