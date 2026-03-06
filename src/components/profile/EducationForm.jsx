import { useState, useEffect } from "react";
import { createEducation, updateEducation } from "../../api/EducationApi";

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
      <div className="bg-white w-125 p-6 rounded-xl shadow-lg space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {isEdit ? "Edit Education" : "Add Education"}
        </h2>

        <input
          name="degree"
          placeholder="Degree (B.Tech, MBA...)"
          value={form.degree}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <input
          name="fieldOfStudy"
          placeholder="Field of Study"
          value={form.fieldOfStudy}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <input
          name="institutionName"
          placeholder="Institution Name"
          value={form.institutionName}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <input
          name="university"
          placeholder="University"
          value={form.university}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
          <input
            type="date"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="border p-2 rounded-md"
          />
        </div>

        <input
          name="percentage"
          placeholder="Percentage"
          type="number"
          value={form.percentage}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        <input
          name="grade"
          placeholder="Grade / CGPA"
          value={form.grade}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EducationForm;
