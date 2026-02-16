// src/pages/jobs/EditJob.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../api/JobsApi";
import "./CreateJob.css"; // reuse same CSS

export default function EditJob() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    industry: "",
    minExperience: "",
    maxExperience: "",
    jobType: "",
  });

  // Load job (from state or API)
  useEffect(() => {
    if (state) {
      setFormData({
        ...state,
        salary: state.salary ?? "",
        minExperience: state.minExperience ?? "",
        maxExperience: state.maxExperience ?? "",
      });
    } else {
      fetchJob();
    }
  }, []);

  const fetchJob = async () => {
    try {
      const job = await getJobById(id);
      setFormData({
        ...job,
        salary: job.salary ?? "",
        minExperience: job.minExperience ?? "",
        maxExperience: job.maxExperience ?? "",
      });
    } catch (err) {
      alert("Failed to load job");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      salary: formData.salary ? Number(formData.salary) : null,
      minExperience: formData.minExperience
        ? Number(formData.minExperience)
        : null,
      maxExperience: formData.maxExperience
        ? Number(formData.maxExperience)
        : null,
    };

    try {
      await updateJob(id, payload);
      alert("✅ Job updated successfully");
      navigate("/recruiters/managejob");
    } catch (err) {
      alert("❌ Update failed");
    }
  };

  return (
    <div className="create-job-container">
      <form className="create-job-form" onSubmit={handleUpdate}>
        <h2>Edit Job</h2>

        <div className="form-group">
          <label>Job Title *</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Industry</label>
            <input
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Job Type</label>
            <select
              name="jobType"
              value={formData.jobType || ""}
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
            <label>Min Experience</label>
            <input
              type="number"
              name="minExperience"
              value={formData.minExperience}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Max Experience</label>
            <input
              type="number"
              name="maxExperience"
              value={formData.maxExperience}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Update Job
        </button>
      </form>
    </div>
  );
}
