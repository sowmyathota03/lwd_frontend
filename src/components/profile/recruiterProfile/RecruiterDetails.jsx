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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    >
      {!editing ? (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field label="Designation" value={profile?.designation} />
            <Field label="Experience (Years)" value={profile?.experience} />
            <Field label="Location" value={profile?.location} />
            <Field label="Phone" value={profile?.phone} />
            {/* LinkedIn Field */}
            <Field
              label="LinkedIn"
              value={
                profile?.linkedinUrl ? (
                  <button
                    onClick={() => window.open(profile.linkedinUrl, "_blank")}
                    className="text-sm text-semibold text-blue-600 underline hover:text-blue-800"
                  >
                    View LinkedIn
                  </button>
                ) : (
                  "Not Provided"
                )
              }
            />
            <Field label="About" value={profile?.about} />
          </div>
        </>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input
              label="Designation"
              name="designation"
              value={formData.designation || ""}
              onChange={handleChange}
            />
            <Input
              label="Experience (Years)"
              name="experience"
              type="number"
              value={formData.experience || ""}
              onChange={handleChange}
            />
            <Input
              label="Location"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={handleChange}
            />
            <Input
              label="LinkedIn URL"
              name="linkedinUrl"
              value={formData.linkedinUrl || ""}
              onChange={handleChange}
            />
            <Input
              label="About"
              name="about"
              value={formData.about || ""}
              onChange={handleChange}
            />
          </div>

          <Buttons
            onCancel={handleCancel}
            onSave={handleSave}
            loading={loading}
          />
        </>
      )}
    </Section>
  );
};

export default RecruiterDetails;
