import { useState, useEffect } from "react";
import { createExperience, updateExperience } from "../../../api/ExperienceApi";

function ExperienceForm({ experience, onClose, refetch }) {
  const isEdit = !!experience?.id;

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    employmentType: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    jobDescription: "",
    location: ""
  });

  /* ================= LOAD DATA FOR EDIT ================= */
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
        location: experience.location || ""
      });
    }
  }, [experience]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-96 p-4 md:p-5 rounded-lg shadow-lg">
        <h2 className="text-lg md:text-xl font-semibold mb-3">
          {isEdit ? "Edit Experience" : "Add Experience"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm"
            required
          />

          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm"
            required
          />

          <input
            type="text"
            name="employmentType"
            placeholder="Employment Type"
            value={formData.employmentType}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm"
          />

          <div className="flex gap-2">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border p-2 rounded text-sm w-full"
            />
            {!formData.currentlyWorking && (
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="border p-2 rounded text-sm w-full"
              />
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="currentlyWorking"
              checked={formData.currentlyWorking}
              onChange={handleChange}
            />
            Currently Working
          </label>

          <textarea
            name="jobDescription"
            placeholder="Job Description"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-full border p-2 rounded text-sm"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExperienceForm;