import { useState, useEffect } from "react";
import { createInternship, updateInternship } from "../../../api/InternshipApi";

/**
 * InternshipForm component - Modal for adding/editing an internship
 *
 * @param {Object} props
 * @param {Object} [props.internship] - Existing internship data (for edit mode)
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onSave - Callback with saved internship data
 */
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

  // Load data for edit mode
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
            {isEdit ? "Edit Internship" : "Add Internship"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEdit
              ? "Update the details of your internship."
              : "Add a new internship experience to your profile."}
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

          {/* Role (required) */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              placeholder="e.g. Software Engineer Intern"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Employment Type */}
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
              placeholder="e.g. Full-time, Part-time, Remote"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Location */}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                disabled={loading}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your responsibilities and achievements..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow resize-y disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Skills (comma separated) */}
          <div>
            <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, Python"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Stipend */}
          <div>
            <label htmlFor="stipend" className="block text-sm font-medium text-gray-700 mb-1">
              Stipend
            </label>
            <input
              type="number"
              id="stipend"
              name="stipend"
              value={formData.stipend}
              onChange={handleChange}
              placeholder="e.g. 20000"
              step="1000"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
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

export default InternshipForm;