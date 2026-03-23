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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Edit Job Seeker Details</h2>
          <p className="modal-subtitle">
            Update your notice period, availability, and professional information.
          </p>
        </div>

        {/* Form */}
        <form className="modal-body space-y-6" onSubmit={handleSubmit}>

          {/* Notice Section */}
          <div>
            <h3 className="lwd-title mb-4">Notice & Availability</h3>

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

              <div className="flex flex-wrap gap-4 items-center md:col-span-2 lg:col-span-3">
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

          {/* Professional Section */}
          <div className="border-t pt-4 dark:border-gray-700">
            <h3 className="lwd-title mb-4">Professional Information</h3>

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

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" />
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