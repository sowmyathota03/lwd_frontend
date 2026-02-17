import { useEffect, useState } from "react";
import {
  getMyProfile,
  createOrUpdateProfile,
} from "../../api/JobSeekerApi";

const JobSeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    currentCompany: "",
    totalExperience: "",
    currentLocation: "",
    preferredLocation: "",
    skills: "",
    expectedCTC: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getMyProfile();
      if (response.data) {
        setProfile(response.data);
        setFormData(response.data);
      }
    } catch (err) {
      console.log("No profile found → Create new");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await createOrUpdateProfile(formData);
      setProfile(response.data);
      setIsEdit(false);
      alert("Profile saved successfully");
    } catch (err) {
      setError("Failed to save profile");
    }
  };

  const handleHover = (e, hover) => {
    e.target.style.transform = hover ? "scale(1.05)" : "scale(1)";
  };

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading profile...</h3>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Job Seeker Profile</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {!profile || isEdit ? (
          <div style={styles.formGrid}>
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="currentCompany"
              placeholder="Current Company"
              value={formData.currentCompany}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="totalExperience"
              placeholder="Experience (Years)"
              value={formData.totalExperience}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="currentLocation"
              placeholder="Current Location"
              value={formData.currentLocation}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="preferredLocation"
              placeholder="Preferred Location"
              value={formData.preferredLocation}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="skills"
              placeholder="Skills"
              value={formData.skills}
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="expectedCTC"
              placeholder="Expected CTC"
              value={formData.expectedCTC}
              onChange={handleChange}
              style={styles.input}
            />

            <button
              style={styles.saveBtn}
              onClick={handleSubmit}
              onMouseEnter={(e) => handleHover(e, true)}
              onMouseLeave={(e) => handleHover(e, false)}
            >
              💾 Save Profile
            </button>
          </div>
        ) : (
          <div style={styles.viewBox}>
            <p><strong>Name:</strong> {profile.fullName}</p>
            <p><strong>Company:</strong> {profile.currentCompany}</p>
            <p><strong>Experience:</strong> {profile.totalExperience} yrs</p>
            <p><strong>Location:</strong> {profile.currentLocation}</p>
            <p><strong>Skills:</strong> {profile.skills}</p>
            <p><strong>Expected CTC:</strong> ₹{profile.expectedCTC}</p>

            <button
              style={styles.editBtn}
              onClick={() => setIsEdit(true)}
            >
              ✏️ Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#eef2ff,#f0fdf4)",
  },

  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    width: "fit-content",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#4f46e5",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
  },

  saveBtn: {
    gridColumn: "span 2",
    alignSelf: "center",
    padding: "12px 28px",
    background: "linear-gradient(135deg,#3b82f6,#6366f1)",
    color: "white",
    border: "none",
    borderRadius: "30px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(59,130,246,0.4)",
    transition: "all 0.2s ease-in-out",
  },

  viewBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  editBtn: {
    marginTop: "15px",
    padding: "10px 20px",
    background: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  },
};

export default JobSeekerProfile;
