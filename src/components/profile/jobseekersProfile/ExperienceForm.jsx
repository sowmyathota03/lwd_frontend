import { useState, useEffect } from "react";
import { createExperience, updateExperience } from "../../../api/ExperienceApi";

function ExperienceForm({ experience, onClose, refetch }) {
  const isEdit = Boolean(experience?.id);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    employmentType: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    jobDescription: "",
    location: "",
  });

  useEffect(() => {
    if (experience) {
      setFormData({
        companyName: experience.companyName || "",
        jobTitle: experience.jobTitle || "",
        employmentType: experience.employmentType || "",
        startDate: experience.startDate || "",
        endDate: experience.endDate || "",
        currentlyWorking: experience.currentlyWorking || false,
        jobDescription: experience.jobDescription || "",
        location: experience.location || "",
      });
    }
  }, [experience]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await updateExperience(experience.id, formData);
      } else {
        await createExperience(formData);
      }
      refetch();
      onClose();
    } catch (error) {
      console.error("Error saving experience", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? "Edit Experience" : "Add Experience"}
          </h2>
          <p className="modal-subtitle">
            {isEdit
              ? "Update your work experience details."
              : "Add your work experience to your profile."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-body space-y-5">

          {/* Company */}
          <div>
            <label className="form-label">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="e.g. Google"
              className="input-field"
              disabled={loading}
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="form-label">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              placeholder="e.g. Software Engineer"
              className="input-field"
              disabled={loading}
            />
          </div>

          {/* Employment Type + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Employment Type</label>
              <input
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                placeholder="Full-time"
                className="input-field"
                disabled={loading}
              />
            </div>

            <div>
              <label className="form-label">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Bangalore / Remote"
                className="input-field"
                disabled={loading}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input-field"
                disabled={loading}
              />
            </div>

            <div>
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled={loading || formData.currentlyWorking}
                className="input-field"
              />
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="currentlyWorking"
              checked={formData.currentlyWorking}
              onChange={handleChange}
              className="lwd-checkbox"
              disabled={loading}
            />
            <label className="lwd-text">
              I am currently working here
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Job Description</label>
            <textarea
              name="jobDescription"
              rows={4}
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Describe your work..."
              className="input-field resize-y"
              disabled={loading}
            />
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  {isEdit ? "Updating..." : "Saving..."}
                </>
              ) : (
                isEdit ? "Update" : "Save"
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ExperienceForm;