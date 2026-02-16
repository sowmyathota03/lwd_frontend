// src/pages/jobs/CreateJob.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJobAsAdmin, createJobAsRecruiter } from "../api/JobsApi";
import "./CreateJob.css";

export default function CreateJob({ companyId, role }) {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    industry: "",
    minExperience: "",
    maxExperience: "",
    jobType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...job,
      salary: job.salary ? Number(job.salary) : null,
      minExperience: job.minExperience ? Number(job.minExperience) : null,
      maxExperience: job.maxExperience ? Number(job.maxExperience) : null,
    };

    try {
      if (role === "ADMIN") {
        await createJobAsAdmin(companyId, payload);
      } else {
        await createJobAsRecruiter(payload);
      }

      alert("✅ Job created successfully");
      navigate("/recruiters/jobs");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create job");
    }
  };

  return (
    <div className="create-job-container">
      <form className="create-job-form" onSubmit={handleSubmit}>
        <h2>Create Job</h2>

        <div className="form-group">
          <label>Job Title *</label>
          <input
            name="title"
            value={job.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input
              name="location"
              value={job.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={job.salary}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Industry</label>
            <input
              name="industry"
              value={job.industry}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Job Type</label>
            <select
              name="jobType"
              value={job.jobType}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="CONTRACT">Contract</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Min Experience (Years)</label>
            <input
              type="number"
              name="minExperience"
              value={job.minExperience}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Max Experience (Years)</label>
            <input
              type="number"
              name="maxExperience"
              value={job.maxExperience}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Create Job
        </button>
      </form>
    </div>
  );
}
