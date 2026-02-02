import React from "react";

function JobSearchBlock() {
  return (
    <section
      className="first_block"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "40px",
        backgroundColor: "lightpink",
        color: "black",
      }}
    >
      <div style={{ maxWidth: "50%" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "15px" }}>
          Find Your Dream Job with LWD
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Explore thousands of verified jobs from top companies. Build your career the smart way!
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <input
            type="text"
            placeholder="Job title, skills"
            style={{ padding: "10px", flex: 1, borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <input
            type="text"
            placeholder="Location"
            style={{ padding: "10px", flex: 1, borderRadius: "6px", border: "1px solid #ccc" }}
          />
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Search Jobs
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "45%" }}>
        <img
          src="https://media.istockphoto.com/id/1349094945/photo/human-using-a-computer-laptop-for-searching-for-job-and-fill-out-personal-data-on-job-website.jpg?s=612x612&w=0&k=20&c=nVCY302pin29eP1rN0eBGstQN3WF4YQTWvZ4TvAs21g="
          alt="Job Search"
          style={{ width: "100%", borderRadius: "12px", boxShadow: "0 8px 16px rgba(0,0,0,0.2)" }}
        />
      </div>
    </section>
  );
}

export default JobSearchBlock;
