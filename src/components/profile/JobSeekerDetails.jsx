import { useState, useEffect } from "react";
import { createOrUpdateProfile } from "../../api/JobSeekerApi";
import {
  Section,
  Grid,
  Field,
  Input,
  Buttons,
  Select,
  Checkbox,
} from "./Helpers";

const JobSeekerDetails = ({ profile, setProfile, editable }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const NOTICE_STATUS_OPTIONS = [
    { value: "SERVING_NOTICE", label: "Serving Notice" },
    { value: "IMMEDIATE_JOINER", label: "Immediate Joiner" },
    { value: "NOT_LOOKING", label: "Not Looking" },
    { value: "OPEN_TO_WORK", label: "Open To Work" },
    { value: "NOT_SERVING", label: "Not Serving" },
    { value: "ANY", label: "Any" },
  ];

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  if (!profile && !editable) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCancel = () => {
    setFormData(profile || {});
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await createOrUpdateProfile(formData);
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
      title="Job Seeker Details"
      editable={editable}
      editing={editing}
      onEdit={() => setEditing(true)}
    >
      {!editing ? (
        <>
          {/* ================= NOTICE ================= */}
          <h3 className="text-md font-semibold text-gray-700 mt-8 mb-4">
            Notice & Availability
          </h3>
          <Grid mdCols={2} lgCols={3}>
            <Field label="Notice Status" value={profile?.noticeStatus} />
            <Field label="Notice Period (Days)" value={profile?.noticePeriod} />
            <Field label="Last Working Day" value={profile?.lastWorkingDay} />
            <Field label="Available From" value={profile?.availableFrom} />
            <Field
              label="Serving Notice"
              value={profile?.isServingNotice ? "Yes" : "No"}
            />
            <Field
              label="Immediate Joiner"
              value={profile?.immediateJoiner ? "Yes" : "No"}
            />
          </Grid>

          {/* ================= PROFESSIONAL ================= */}
          <h3 className="text-md font-semibold text-gray-700 mt-8 mb-4 border-t-4 pt-4 border-gray-200">
            Professional Information
          </h3>
          <Grid mdCols={2} lgCols={3}>
            <Field label="Current Company" value={profile?.currentCompany} />
            <Field label="Total Experience" value={profile?.totalExperience} />
            <Field label="Current CTC" value={profile?.currentCTC} />
            <Field label="Expected CTC" value={profile?.expectedCTC} />
            <Field label="Current Location" value={profile?.currentLocation} />
            <Field
              label="Preferred Location"
              value={profile?.preferredLocation}
            />
            <Field label="Resume URL" value={profile?.resumeUrl} />
          </Grid>
        </>
      ) : (
        <>
          {/* ================= NOTICE ================= */}
          <h3 className="text-md font-semibold text-gray-700 mt-8 mb-4">
            Notice & Availability
          </h3>
          <Grid>
            <Select
              label="Notice Status"
              name="noticeStatus"
              value={formData.noticeStatus || ""}
              onChange={handleChange}
              options={NOTICE_STATUS_OPTIONS}
            />

            <div className="flex justify-around">
              <Checkbox
                label="Serving Notice"
                name="isServingNotice"
                checked={formData.isServingNotice || false}
                onChange={handleChange}
              />

              <Checkbox
                label="Immediate Joiner"
                name="immediateJoiner"
                checked={formData.immediateJoiner || false}
                onChange={handleChange}
              />
            </div>

            <Input
              label="Notice Period (Days)"
              name="noticePeriod"
              value={formData.noticePeriod || ""}
              onChange={handleChange}
            />
            <Input
              type="date"
              label="Last Working Day"
              name="lastWorkingDay"
              value={formData.lastWorkingDay || ""}
              onChange={handleChange}
            />
            <Input
              type="date"
              label="Available From"
              name="availableFrom"
              value={formData.availableFrom || ""}
              onChange={handleChange}
            />
          </Grid>

          {/* ================= PROFESSIONAL ================= */}
          <h3 className="text-md font-semibold text-gray-700 mt-8 mb-4">
            Professional Information
          </h3>
          <Grid>
            <Input
              label="Current Company"
              name="currentCompany"
              value={formData.currentCompany || ""}
              onChange={handleChange}
            />
            <Input
              label="Total Experience"
              name="totalExperience"
              value={formData.totalExperience || ""}
              onChange={handleChange}
            />
            <Input
              label="Current CTC"
              name="currentCTC"
              value={formData.currentCTC || ""}
              onChange={handleChange}
            />
            <Input
              label="Expected CTC"
              name="expectedCTC"
              value={formData.expectedCTC || ""}
              onChange={handleChange}
            />
            <Input
              label="Current Location"
              name="currentLocation"
              value={formData.currentLocation || ""}
              onChange={handleChange}
            />
            <Input
              label="Preferred Location"
              name="preferredLocation"
              value={formData.preferredLocation || ""}
              onChange={handleChange}
            />
            <Input
              label="Resume URL"
              name="resumeUrl"
              value={formData.resumeUrl || ""}
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

export default JobSeekerDetails;
