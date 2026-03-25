import React, { useState } from "react";

function JobAlert() {
  const [alertData, setAlertData] = useState({
    role: "",
    location: "",
    experience: "",
  });

  const handleChange = (e) => {
    setAlertData({
      ...alertData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Alert Saved:", alertData);
    alert("Job Alert Saved Successfully!");
  };

  return (
    <div className="lwd-page flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md lwd-card p-6">

        <h2 className="lwd-title text-center mb-6">
          Set Job Alert
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Role */}
          <div>
            <label className="lwd-label">Job Role</label>
            <input
              type="text"
              name="role"
              value={alertData.role}
              onChange={handleChange}
              placeholder="Enter Role"
              required
              className="lwd-input mt-1"
            />
          </div>

          {/* Location */}
          <div>
            <label className="lwd-label">Location</label>
            <input
              type="text"
              name="location"
              value={alertData.location}
              onChange={handleChange}
              placeholder="Enter Location"
              required
              className="lwd-input mt-1"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="lwd-label">Experience</label>
            <select
              name="experience"
              value={alertData.experience}
              onChange={handleChange}
              required
              className="lwd-input mt-1"
            >
              <option value="">Select Experience</option>
              <option value="0-1">0-1 Years</option>
              <option value="1-3">1-3 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full lwd-btn-primary mt-4"
          >
            Save Alert
          </button>

        </form>
      </div>
    </div>
  );
}

export default JobAlert;