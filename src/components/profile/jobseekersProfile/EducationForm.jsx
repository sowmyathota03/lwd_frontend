import { useState } from "react";
import { createEducation, updateEducation } from "../../../api/EducationApi";

function EducationForm({ education, onClose, onSave }) {
  const isEdit = !!education?.id;

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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-4 md:p-5 rounded-lg shadow-lg space-y-3">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          {isEdit ? "Edit Education" : "Add Education"}
        </h2>

        <input
          name="degree"
          placeholder="Degree (B.Tech, MBA...)"
          value={form.degree}
          onChange={handleChange}
          className="w-full border p-2 rounded-md text-sm"
        />

        <input
          name="fieldOfStudy"
          placeholder="Field of Study"
          value={form.fieldOfStudy}
          onChange={handleChange}
          className="w-full border p-2 rounded-md text-sm"
        />

        <input
          name="institutionName"
          placeholder="Institution Name"
          value={form.institutionName}
          onChange={handleChange}
          className="w-full border p-2 rounded-md text-sm"
        />

        <input
          name="university"
          placeholder="University"
          value={form.university}
          onChange={handleChange}
          className="w-full border p-2 rounded-md text-sm"
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="border p-2 rounded-md text-sm"
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="border p-2 rounded-md text-sm"
          />
        </div>

        <input
          name="percentage"
          placeholder="Percentage"
          type="number"
          value={form.percentage}
          onChange={handleChange}
          className="w-full border p-2 rounded-md text-sm"
        />

        <input
          name="grade"
          placeholder="Grade / CGPA"
          value={form.grade}
          onChange={handleChange}
          className="w-full border p-2 rounded-md text-sm"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EducationForm;