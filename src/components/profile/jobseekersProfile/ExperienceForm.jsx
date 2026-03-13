import { useState, useEffect } from "react";
import { createExperience, updateExperience } from "../../../api/ExperienceApi";

/**
 * ExperienceForm component - Modal for adding/editing work experience
 *
 * @param {Object} props
 * @param {Object} [props.experience] - Existing experience data (for edit mode)
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.refetch - Function to refresh parent data after save
 */
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

  // Load data for edit mode
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
      // Optionally show user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEdit ? "Edit Experience" : "Add Experience"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEdit
              ? "Update your work experience details."
              : "Add your work experience to your profile."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Company Name (required) */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              placeholder="e.g. Google, Microsoft"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Job Title (required) */}
          <div>
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              placeholder="e.g. Software Engineer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Employment Type & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">
                Employment Type
              </label>
              <input
                type="text"
                id="employmentType"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                placeholder="e.g. Full-time, Contract"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Bangalore, Remote"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                disabled={loading}
              />
            </div>
          </div>

          {/* Start Date & End Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                disabled={loading || formData.currentlyWorking}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Currently Working checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="currentlyWorking"
              name="currentlyWorking"
              checked={formData.currentlyWorking}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              disabled={loading}
            />
            <label htmlFor="currentlyWorking" className="ml-2 text-sm text-gray-700">
              I am currently working here
            </label>
          </div>

          {/* Job Description */}
          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              rows={4}
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Describe your responsibilities and achievements..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow resize-y disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white py-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-20 justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
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