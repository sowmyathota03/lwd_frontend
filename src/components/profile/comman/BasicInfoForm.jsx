import { useState, useEffect } from "react";
import { updateMyProfile } from "../../../api/UserApi";

function BasicInfoForm({ profile, setProfile, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  // Load profile data into form
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await updateMyProfile({
        name: formData.name,
        phone: formData.phone,
      });
      // Update parent state with response
      setProfile(res.data);
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      // Optionally show error message to user
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
        className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Edit Basic Information</h2>
          <p className="text-sm text-gray-500 mt-1">Update your name and phone number.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              disabled={loading}
            />
          </div>

          {/* Email field (read-only) */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>

          {/* Phone field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              disabled={loading}
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-2">
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

export default BasicInfoForm;