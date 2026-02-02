import React from "react";

function JobCard({ job, onApply }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "8px",
        width: "280px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        transition: "transform 0.2s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div>
        <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>{job.title}</h3>
        <p><b>Company:</b> {job.company}</p>
        <p><b>Location:</b> {job.location}</p>
        <p><b>Experience:</b> {job.experience}</p>
        <p><b>Description:</b> {job.description}</p>
      </div>

      <button
  onClick={() => onApply(job)}
  style={{
    marginTop: "10px",
    padding: "12px 0",        // taller button
    width: "50%",            // full width
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",       // optional, looks better
    fontSize: "16px"          // optional, bigger text
  }}
>
  Apply Now
</button>

    </div>
  );
}

export default JobCard;
