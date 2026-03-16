import { useState } from "react";

/**
 * EducationForm component - Modal for adding/editing education details
 * 
 * @param {Object} props
 * @param {Object} [props.education] - Existing education data (for edit mode)
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.onSave - Callback with saved education data
 */
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
            {isEdit ? "Edit Education" : "Add Education"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {isEdit
              ? "Update your educational background."
              : "Add your educational qualifications."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-5">
          {/* Degree */}
          <div>
            <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-1">
              Degree
            </label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="e.g. B.Tech, MBA"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Field of Study */}
          <div>
            <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
              Field of Study
            </label>
            <input
              type="text"
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={form.fieldOfStudy}
              onChange={handleChange}
              placeholder="e.g. Computer Science, Marketing"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Institution Name */}
          <div>
            <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700 mb-1">
              Institution Name
            </label>
            <input
              type="text"
              id="institutionName"
              name="institutionName"
              value={form.institutionName}
              onChange={handleChange}
              placeholder="e.g. Indian Institute of Technology"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* University */}
          <div>
            <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
              University
            </label>
            <input
              type="text"
              id="university"
              name="university"
              value={form.university}
              onChange={handleChange}
              placeholder="e.g. Delhi University"
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
                value={form.startDate}
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
                value={form.endDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
                disabled={loading}
              />
            </div>
          </div>

          {/* Percentage */}
          <div>
            <label htmlFor="percentage" className="block text-sm font-medium text-gray-700 mb-1">
              Percentage
            </label>
            <input
              type="number"
              id="percentage"
              name="percentage"
              value={form.percentage}
              onChange={handleChange}
              placeholder="e.g. 85.5"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow disabled:bg-gray-50 disabled:text-gray-500"
              disabled={loading}
            />
          </div>

          {/* Grade / CGPA */}
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
              Grade / CGPA
            </label>
            <input
              type="text"
              id="grade"
              name="grade"
              value={form.grade}
              onChange={handleChange}
              placeholder="e.g. 8.5 CGPA"
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
              type="button"
              onClick={handleSave}
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

export default EducationForm;