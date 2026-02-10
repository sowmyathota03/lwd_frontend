import React, { useState } from "react";

function PostJob() {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    experience: "",
    skills: "",
    description: ""
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", job);
    alert("Job Posted Successfully!");

    setJob({
      title: "",
      company: "",
      location: "",
      experience: "",
      skills: "",
      description: ""
    });
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        minHeight: "100vh",
        paddingTop: "40px"
      }}
    >
      <div
        style={{
          width: "420px",
          margin: "auto",
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333" }}>Post a Job</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={job.title}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={job.company}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={job.location}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={job.experience}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills Required"
            value={job.skills}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Job Description"
            value={job.description}
            onChange={handleChange}
            rows="4"
            style={{ ...inputStyle, height: "90px" }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#4facfe",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
              transition: "0.3s"
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#00c6ff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4facfe")}
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "8px 0",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none"
};

export default PostJob;
  