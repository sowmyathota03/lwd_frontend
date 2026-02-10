import React, { useState } from "react";

function JobAlert() {
  const [alert, setAlert] = useState({
    role: "",
    location: "",
    experience: ""
  });

  const handleChange = (e) => {
    setAlert({
      ...alert,
      [e.target.name]: e.target.value
    }); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Alert Saved:", alert);
    alert("Job Alert Saved Successfully!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Set Job Alert</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        
        <label>Job Role:</label>
        <input
          type="text"
          name="role"
          value={alert.role}
          onChange={handleChange}
          placeholder="Enter Role"
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={alert.location}
          onChange={handleChange}
          placeholder="Enter Location"
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <label>Experience:</label>
        <select
          name="experience"
          value={alert.experience}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        >
          <option value="">Select Experience</option>
          <option value="0-1">0-1 Years</option>
          <option value="1-3">1-3 Years</option>
          <option value="3-5">3-5 Years</option>
          <option value="5+">5+ Years</option>
        </select>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Save Alert
        </button>
      </form>
    </div>
  );
}

export default JobAlert;
