import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { updateMyProfile } from "../../../api/UserApi";
import { Section, Grid, Field, Input, Buttons } from "./Helpers";   

const BasicInfo = ({ profile, editable }) => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  if (!profile) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name || "",
      phone: profile.phone || "",
    });
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateMyProfile({
        name: formData.name,
        phone: formData.phone,
      });
      // Invalidate the profile query to refetch updated data
      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      setEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      title="Basic Information"
      editable={editable}
      editing={editing}
      onEdit={() => setEditing(true)}
    >
      {!editing ? (
        <Grid mdCols={2} lgCols={3}>
          <Field label="Name" value={profile.name} />
          <Field label="Email" value={profile.email} />
          <Field label="Phone" value={profile.phone} />
        </Grid>
      ) : (
        <>
          <Grid mdCols={2} lgCols={3}>
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Email"
              value={profile.email}
              disabled
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
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

export default BasicInfo;