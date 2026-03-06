import { useState } from "react";
import {
  createEducation,
  updateEducation,
} from "../../api/EducationApi";

const EducationForm = ({ education, onClose, refresh }) => {

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
    try {
      setLoading(true);

      if (education) {
        await updateEducation(education.id, form);
      } else {
        await createEducation(form);
      }

      refresh();
      onClose();

    } catch (err) {
      console.error("Education save error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

      <div className="bg-white w-130 p-6 rounded-xl shadow-lg space-y-4">

        <h2 className="text-xl font-semibold text-gray-800">
          {education ? "Edit Education" : "Add Education"}
        </h2>

        {/* Degree */}
        <input
          name="degree"
          placeholder="Degree (B.Tech, MBA...)"
          value={form.degree}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        {/* Field */}
        <input
          name="fieldOfStudy"
          placeholder="Field of Study"
          value={form.fieldOfStudy}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        {/* Institution */}
        <input
          name="institutionName"
          placeholder="Institution Name"
          value={form.institutionName}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        {/* University */}
        <input
          name="university"
          placeholder="University"
          value={form.university}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        {/* Dates */}
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

        {/* Percentage */}
        <input
          name="percentage"
          placeholder="Percentage"
          type="number"
          value={form.percentage}
          onChange={handleChange}
          className="w-full border p-2 rounded-md"
        />

        {/* Grade */}
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
            className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default EducationForm;
