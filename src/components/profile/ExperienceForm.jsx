import { useState, useEffect } from "react";
import { createExperience, updateExperience } from "../../api/ExperienceApi";

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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">

      <div className="bg-white p-6 rounded-lg w-125">

        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Experience" : "Add Experience"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="text"
            name="employmentType"
            placeholder="Employment Type"
            value={formData.employmentType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-2">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            {!formData.currentlyWorking && (
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            )}
          </div>

          <label className="flex items-center gap-2">
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
            className="w-full border p-2 rounded"
          />

          {/* Buttons */}

          <div className="flex justify-end gap-2 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-1 bg-blue-500 text-white rounded"
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
