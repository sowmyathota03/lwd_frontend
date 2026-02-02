import React from "react";
import { useNavigate } from "react-router-dom";

function Career() {
  const navigate = useNavigate();

  const careerPaths = [
    {
      id: 1,
      title: "IT & Software Jobs",
      desc: "Explore opportunities in React, Java, Python, Full Stack, and more.",
    },
    {
      id: 2,
      title: "Finance & Banking",
      desc: "Jobs in accounting, banking, auditing, and financial analysis.",
    },
    {
      id: 3,
      title: "Marketing & Sales",
      desc: "Digital marketing, SEO, content creation, and sales roles.",
    },
    {
      id: 4,
      title: "HR & Management",
      desc: "Human resources, recruitment, and operations jobs.",
    },
    {
      id: 5,
      title: "Freshers & Internships",
      desc: "Entry-level jobs and internships for fresh graduates.",
    },
    {
      id: 6,
      title: "Remote Jobs",
      desc: "Work-from-home opportunities across industries.",
    },
  ];

  return (
    <div style={{ padding: "40px",  backgroundColor: "#111827" ,color:"#EDE9FE"}}>
      
      
      <h1 style={{ textAlign: "center", }}>Careers</h1>
      <p
        style={{
          textAlign: "center",
          maxWidth: "700px",
          margin: "10px auto 40px",
          // color: "#EDE9FE",
        }}
      >
        Discover career opportunities across multiple industries.  
        Our job portal helps you find the right job based on your skills,
        experience, and career goals.
      </p>

      <section style={{ marginBottom: "40px" }}>
        <h2>Why Search Jobs with LWD?</h2>
        <ul style={{ lineHeight: "28px" }}>
          <li>✔ Verified job openings from trusted companies</li>
          <li>✔ Jobs for freshers and experienced professionals</li>
          <li>✔ Multiple job categories in one platform</li>
          <li>✔ Easy job search and quick apply</li>
        </ul>
      </section>
      
      <section>
        <h2>Explore Career Paths</h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {careerPaths.map((career) => (
            <div
              key={career.id}
              style={{
                width: "300px",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                backgroundColor:"white",
                color:"black",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{career.title}</h3>
              <p style={{ color: "darkgray" }}>{career.desc}</p>
              <button
                onClick={() => navigate("/jobs")}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  backgroundColor: "#2563eb",
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

     
      <section style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Start Your Career Journey Today</h2>
        <p >
          Create your profile and apply efor jobs that match your skills.
        </p>

        <button
          onClick={() => navigate("/Profile")}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Create Profile
        </button>
      </section>
    </div>
  );
}
export default Career;
