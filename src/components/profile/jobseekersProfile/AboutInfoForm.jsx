import { useState, useEffect } from "react";
import { updateAboutInfo } from "../../../api/JobSeekerApi";

function AboutInfoForm({ profile, setProfile, onClose }) {
  const [formData, setFormData] = useState({
    headline: "",
    about: ""
  });
  const [loading, setLoading] = useState(false);

  // Load profile data into form
  useEffect(() => {
    if (profile) {
      setFormData({
        headline: profile.headline || "",
        about: profile.about || ""
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updated = await updateAboutInfo(formData);

      setProfile((prev) => ({
        ...prev,
        headline: updated.headline,
        about: updated.about
      }));

      onClose();
    } catch (error) {
      console.error("Update failed", error);
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
        className="lwd-card w-full max-w-lg mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
          <h2 className="lwd-title">Edit About Information</h2>
          <p className="lwd-text mt-1">
            Update your headline and professional summary.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Headline */}
          <div>
            <label className="lwd-label mb-1 block">Headline</label>
            <input
              type="text"
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              placeholder="e.g. Software Engineer"
              className="lwd-input"
              disabled={loading}
            />
          </div>

          {/* About */}
          <div>
            <label className="lwd-label mb-1 block">About</label>
            <textarea
              name="about"
              rows={5}
              value={formData.about}
              onChange={handleChange}
              placeholder="Write about yourself..."
              className="lwd-input resize-y"
              disabled={loading}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="lwd-btn-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="lwd-btn-primary flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      fill="currentColor"
                      className="opacity-75"
                    />
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

export default AboutInfoForm;