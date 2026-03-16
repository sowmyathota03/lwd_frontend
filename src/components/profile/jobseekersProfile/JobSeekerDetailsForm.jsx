import { useState, useEffect } from "react";
import { createOrUpdateProfile } from "../../../api/JobSeekerApi";
import { Input, Select, Checkbox } from "../comman/Helpers";

function JobSeekerDetailsForm({ profile, setProfile, onClose, noticeOptions }) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createOrUpdateProfile(formData);
      setProfile(res.data);
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      // Optionally show error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-auto my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Job Seeker Details</h2>
          <p className="text-sm text-gray-500 mt-1">
            Update your notice period, availability, and professional information.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Notice & Availability */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-4">Notice & Availability</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Select
                label="Notice Status"
                name="noticeStatus"
                value={formData.noticeStatus || ""}
                onChange={handleChange}
                options={noticeOptions}
                disabled={loading}
              />
              <Input
                label="Notice Period (Days)"
                name="noticePeriod"
                type="number"
                value={formData.noticePeriod || ""}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                type="date"
                label="Last Working Day"
                name="lastWorkingDay"
                value={formData.lastWorkingDay || ""}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                type="date"
                label="Available From"
                name="availableFrom"
                value={formData.availableFrom || ""}
                onChange={handleChange}
                disabled={loading}
              />
              <div className="flex space-x-4 items-center md:col-span-2 lg:col-span-3">
                <Checkbox
                  label="Serving Notice"
                  name="isServingNotice"
                  checked={formData.isServingNotice || false}
                  onChange={handleChange}
                  disabled={loading}
                />
                <Checkbox
                  label="Immediate Joiner"
                  name="immediateJoiner"
                  checked={formData.immediateJoiner || false}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="border-t pt-4">
            <h3 className="text-md font-semibold text-gray-800 mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Input
                label="Current Company"
                name="currentCompany"
                value={formData.currentCompany || ""}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                label="Current CTC"
                name="currentCTC"
                value={formData.currentCTC || ""}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                label="Total Experience"
                name="totalExperience"
                value={formData.totalExperience || ""}
                onChange={handleChange}
                disabled={loading}
                placeholder="e.g. 5 years"
              />
              <Input
                label="Expected CTC"
                name="expectedCTC"
                value={formData.expectedCTC || ""}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                label="Current Location"
                name="currentLocation"
                value={formData.currentLocation || ""}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                label="Preferred Location"
                name="preferredLocation"
                value={formData.preferredLocation || ""}
                onChange={handleChange}
                disabled={loading}
              />
              <Input
                label="Resume URL"
                name="resumeUrl"
                value={formData.resumeUrl || ""}
                onChange={handleChange}
                disabled={loading}
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
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
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobSeekerDetailsForm;