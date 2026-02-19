import React, { useEffect, useState } from "react";
import {
  getMyProfile,
  createOrUpdateProfile,
} from "../../api/JobSeekerApi";

const JobSeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentCompany: "",
    totalExperience: "",
    currentCTC: "",
    expectedCTC: "",
    currentLocation: "",
    preferredLocation: "",
    noticeStatus: "",
    noticePeriod: "",
    lastWorkingDay: "",
    availableFrom: "",
    immediateJoiner: false,
    skills: "",
    resumeUrl: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();
      if (res.data) {
        setProfile(res.data);
        setFormData(res.data);
      }
    } catch (err) {
      console.log("No profile found");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await createOrUpdateProfile(formData);
      setProfile(res.data);
      setIsEdit(false);
      alert("Profile Updated Successfully");
    } catch (err) {
      alert("Error saving profile");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* LEFT SIDEBAR */}
        <div style={styles.sidebar}>
          <div style={styles.avatar}>
            {profile?.fullName?.charAt(0) || "U"}
          </div>
          <h3 style={styles.name}>
            {profile?.fullName || "Your Name"}
          </h3>
          <p style={styles.company}>
            {profile?.currentCompany || "Current Company"}
          </p>

          {!isEdit && (
            <button
              style={styles.editButton}
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div style={styles.content}>
          {isEdit ? (
            <>
              <h2 style={styles.heading}>Edit Profile</h2>

              {renderInput("Full Name", "fullName", formData, handleChange)}
              {renderInput("Email", "email", formData, handleChange)}

              {renderTwoInputs(
                "Current Company",
                "currentCompany",
                "Total Experience (Years)",
                "totalExperience",
                formData,
                handleChange
              )}

              {renderTwoInputs(
                "Current CTC",
                "currentCTC",
                "Expected CTC",
                "expectedCTC",
                formData,
                handleChange
              )}

              {renderTwoInputs(
                "Current Location",
                "currentLocation",
                "Preferred Location",
                "preferredLocation",
                formData,
                handleChange
              )}

              <div style={styles.grid2}>
                <div>
                  <label style={styles.label}>Notice Status</label>
                  <select
                    name="noticeStatus"
                    value={formData.noticeStatus}
                    onChange={handleChange}
                    style={styles.input}
                  >
                    <option value="">Select</option>
                    <option value="SERVING">Serving Notice</option>
                    <option value="NOT_SERVING">Not Serving</option>
                  </select>
                </div>

                {renderInputField(
                  "Notice Period (Days)",
                  "noticePeriod",
                  formData,
                  handleChange
                )}
              </div>

              {renderTwoDateInputs(
                "Last Working Day",
                "lastWorkingDay",
                "Available From",
                "availableFrom",
                formData,
                handleChange
              )}

              <div style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  name="immediateJoiner"
                  checked={formData.immediateJoiner}
                  onChange={handleChange}
                />
                <span>Immediate Joiner</span>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Skills</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  style={styles.textarea}
                />
              </div>

              {renderInput("Resume URL", "resumeUrl", formData, handleChange)}

              <button style={styles.saveButton} onClick={handleSubmit}>
                Save Changes
              </button>
            </>
          ) : (
            <>
              <h2 style={styles.heading}>Profile Details</h2>
              {renderDetail("Email", profile?.email)}
              {renderDetail("Experience", profile?.totalExperience + " Years")}
              {renderDetail("Current CTC", "₹ " + profile?.currentCTC)}
              {renderDetail("Expected CTC", "₹ " + profile?.expectedCTC)}
              {renderDetail("Location", profile?.currentLocation)}
              {renderDetail("Notice Status", profile?.noticeStatus)}
              {renderDetail("Skills", profile?.skills)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};



const renderInput = (label, name, formData, handleChange) => (
  <div style={styles.formGroup}>
    <label style={styles.label}>{label}</label>
    <input
      name={name}
      value={formData[name]}
      onChange={handleChange}
      style={styles.input}
    />
  </div>
);

const renderInputField = (label, name, formData, handleChange) => (
  <div>
    <label style={styles.label}>{label}</label>
    <input
      name={name}
      value={formData[name]}
      onChange={handleChange}
      style={styles.input}
    />
  </div>
);

const renderTwoInputs = (
  label1,
  name1,
  label2,
  name2,
  formData,
  handleChange
) => (
  <div style={styles.grid2}>
    {renderInputField(label1, name1, formData, handleChange)}
    {renderInputField(label2, name2, formData, handleChange)}
  </div>
);

const renderTwoDateInputs = (
  label1,
  name1,
  label2,
  name2,
  formData,
  handleChange
) => (
  <div style={styles.grid2}>
    <div>
      <label style={styles.label}>{label1}</label>
      <input
        type="date"
        name={name1}
        value={formData[name1]}
        onChange={handleChange}
        style={styles.input}
      />
    </div>
    <div>
      <label style={styles.label}>{label2}</label>
      <input
        type="date"
        name={name2}
        value={formData[name2]}
        onChange={handleChange}
        style={styles.input}
      />
    </div>
  </div>
);

const renderDetail = (label, value) => (
  <div style={styles.detailRow}>
    <span style={styles.detailLabel}>{label}</span>
    <span>{value || "-"}</span>
  </div>
);



const styles = {
  page: {
    background: "#f4f6f9",
    minHeight: "100vh",
    padding: "40px",
  },
  container: {
    maxWidth: "1100px",
    margin: "auto",
    display: "flex",
    gap: "30px",
  },
  sidebar: {
    width: "280px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#1d4ed8",
    color: "#fff",
    fontSize: "30px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
  },
  name: { marginBottom: "5px" },
  company: { color: "#6b7280", marginBottom: "20px" },
  editButton: {
    padding: "10px 20px",
    background: "#1d4ed8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  content: {
    flex: 1,
    background: "#ffffff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  heading: { marginBottom: "20px" },
  formGroup: { marginBottom: "20px" },
  label: { display: "block", marginBottom: "6px", fontWeight: "600" },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    height: "80px",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  saveButton: {
    padding: "12px 25px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  detailLabel: { fontWeight: "600", color: "#374151" },
};

export default JobSeekerProfile;
