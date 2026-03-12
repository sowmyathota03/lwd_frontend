import { useState, useEffect } from "react";
import { updateAboutInfo } from "../../../api/JobSeekerApi";

function AboutInfoForm({ profile, setProfile, onClose }) {

  const [formData, setFormData] = useState({
    headline: "",
    about: ""
  });

  const [loading, setLoading] = useState(false);

  // Load profile data
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

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updated = await updateAboutInfo(formData);

      // Update UI instantly
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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">

      <div className="bg-white p-6 rounded-lg w-175">

        <h2 className="text-xl font-semibold mb-4">
          Edit About Info
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="headline"
            placeholder="Headline"
            value={formData.headline}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="about"
            rows={4}
            placeholder="Write about yourself..."
            value={formData.about}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

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
              disabled={loading}
              className="px-4 py-1 bg-blue-500 text-white rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AboutInfoForm;
