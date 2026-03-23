import { useState } from "react";
import { createEducation, updateEducation } from "../../../api/EducationApi";

function EducationForm({ education, onClose, onSave }) {
  const isEdit = Boolean(education?.id);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    degree: education?.degree || "",
    fieldOfStudy: education?.fieldOfStudy || "",
    institutionName: education?.institutionName || "",
    university: education?.university || "",
    startDate: education?.startDate || "",
    endDate: education?.endDate || "",
    percentage: education?.percentage || "",
    grade: education?.grade || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let saved;
      if (isEdit) {
        saved = await updateEducation(education.id, form);
      } else {
        saved = await createEducation(form);
      }
      onSave(saved);
      onClose();
    } catch (err) {
      console.error("Education save error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            {isEdit ? "Edit Education" : "Add Education"}
          </h2>
          <p className="modal-subtitle">
            {isEdit
              ? "Update your educational background."
              : "Add your educational qualifications."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="modal-body">

          {/* Degree */}
          <div>
            <label className="form-label">Degree</label>
            <input
              type="text"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="e.g. B.Tech, MBA"
              className="input-field"
              disabled={loading}
            />
          </div>

          {/* Field of Study */}
          <div>
            <label className="form-label">Field of Study</label>
            <input
              type="text"
              name="fieldOfStudy"
              value={form.fieldOfStudy}
              onChange={handleChange}
              placeholder="e.g. Computer Science"
              className="input-field"
              disabled={loading}
            />
          </div>

          {/* Institution */}
          <div>
            <label className="form-label">Institution Name</label>
            <input
              type="text"
              name="institutionName"
              value={form.institutionName}
              onChange={handleChange}
              className="input-field"
              disabled={loading}
            />
          </div>

          {/* University */}
          <div>
            <label className="form-label">University</label>
            <input
              type="text"
              name="university"
              value={form.university}
              onChange={handleChange}
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
                value={form.startDate}
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
                value={form.endDate}
                onChange={handleChange}
                className="input-field"
                disabled={loading}
              />
            </div>
          </div>

          {/* Percentage */}
          <div>
            <label className="form-label">Percentage</label>
            <input
              type="number"
              name="percentage"
              value={form.percentage}
              onChange={handleChange}
              step="0.01"
              className="input-field"
              disabled={loading}
            />
          </div>

          {/* Grade */}
          <div>
            <label className="form-label">Grade / CGPA</label>
            <input
              type="text"
              name="grade"
              value={form.grade}
              onChange={handleChange}
              className="input-field"
              disabled={loading}
            />
          </div>

          {/* Buttons */}
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
              type="button"
              onClick={handleSave}
              className="btn-primary flex items-center gap-2 justify-center"
              disabled={loading}
            >
              {loading ? "Saving..." : isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EducationForm;