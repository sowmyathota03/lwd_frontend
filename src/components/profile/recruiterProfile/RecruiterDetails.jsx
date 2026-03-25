import { useState, useEffect } from "react";
import { createOrUpdateRecruiterProfile } from "../../../api/RecruiterApi";
import { Section, Input, Buttons, Field } from "../comman/Helpers";

const RecruiterDetails = ({ profile, setProfile, editable }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  if (!profile && !editable) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(profile || {});
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await createOrUpdateRecruiterProfile(formData);
      setProfile(res.data);
      setEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      title="Recruiter Details"
      editable={editable}
      editing={editing}
      onEdit={() => setEditing(true)}
      className="lwd-card lwd-card-hover"
    >
      {!editing ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label="Designation" value={profile?.designation} className="lwd-text" />
          <Field label="Experience (Years)" value={profile?.experience} className="lwd-text" />
          <Field label="Location" value={profile?.location} className="lwd-text" />
          <Field label="Phone" value={profile?.phone} className="lwd-text" />
          {/* LinkedIn Field */}
          <Field
            label="LinkedIn"
            value={
              profile?.linkedinUrl ? (
                <button
                  onClick={() => window.open(profile.linkedinUrl, "_blank")}
                  className="lwd-link"
                >
                  View LinkedIn
                </button>
              ) : (
                "Not Provided"
              )
            }
          />
          <Field label="About" value={profile?.about} className="lwd-text" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Designation"
              name="designation"
              value={formData.designation || ""}
              onChange={handleChange}
              className="lwd-input"
            />
            <Input
              label="Experience (Years)"
              name="experience"
              type="number"
              value={formData.experience || ""}
              onChange={handleChange}
              className="lwd-input"
            />
            <Input
              label="Location"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="lwd-input"
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={handleChange}
              className="lwd-input"
            />
            <Input
              label="LinkedIn URL"
              name="linkedinUrl"
              value={formData.linkedinUrl || ""}
              onChange={handleChange}
              className="lwd-input"
            />
            <Input
              label="About"
              name="about"
              value={formData.about || ""}
              onChange={handleChange}
              className="lwd-input"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={loading}
              className="btn-primary"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </Section>
  );
};

export default RecruiterDetails;