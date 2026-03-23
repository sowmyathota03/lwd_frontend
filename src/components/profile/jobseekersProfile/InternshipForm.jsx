import { useState, useEffect } from "react";
import { createInternship, updateInternship } from "../../../api/InternshipApi";

function InternshipForm({ internship, onClose, onSave }) {
  const isEdit = Boolean(internship?.id);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
    location: "",
    skills: "",
    stipend: "",
    employmentType: "",
  });

  useEffect(() => {
    if (internship) {
      setFormData({
        companyName: internship.companyName || "",
        role: internship.role || "",
        startDate: internship.startDate || "",
        endDate: internship.endDate || "",
        description: internship.description || "",
        location: internship.location || "",
        skills: internship.skills || "",
        stipend: internship.stipend || "",
        employmentType: internship.employmentType || "",
      });
    }
  }, [internship]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let saved;
      if (isEdit) {
        saved = await updateInternship(internship.id, formData);
      } else {
        saved = await createInternship(formData);
      }
      onSave(saved);
      onClose();
    } catch (error) {
      console.error("Error saving internship", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? "Edit Internship" : "Add Internship"}
          </h2>
          <p className="modal-subtitle">
            {isEdit
              ? "Update the details of your internship."
              : "Add a new internship experience to your profile."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-body">

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
              placeholder="e.g. Google, Microsoft"
              className="input-field"
              disabled={loading}
            />
          </div>

          {/* Role */}
          <div>
            <label className="form-label">
              Role <span className="text-red-500">*</span>
            </label>
            <input
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              placeholder="e.g. Software Engineer Intern"
              className="input-field"
              disabled={loading}
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="form-label">Employment Type</label>
            <input
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              placeholder="e.g. Full-time, Remote"
              className="input-field"
              disabled={loading}
            />
          </div>

          {/* Location */}
          <div>
            <label className="form-label">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Bangalore"
              className="input-field"
              disabled={loading}
            />
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
                className="input-field"
                disabled={loading}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="form-label">Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your work..."
              className="input-field resize-y"
              disabled={loading}
            />
          </div>

          {/* Skills */}
          <div>
            <label className="form-label">Skills</label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js"
              className="input-field"
              disabled={loading}
            />
          </div>

          {/* Stipend */}
          <div>
            <label className="form-label">Stipend</label>
            <input
              type="number"
              name="stipend"
              value={formData.stipend}
              onChange={handleChange}
              placeholder="e.g. 20000"
              className="input-field"
              disabled={loading}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="modal-footer">
          <button
            onClick={onClose}
            disabled={loading}
            className="btn-secondary"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn-primary flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8V0" fill="currentColor" className="opacity-75" />
                </svg>
                {isEdit ? "Updating..." : "Saving..."}
              </>
            ) : (
              isEdit ? "Update" : "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default InternshipForm;