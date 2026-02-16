import { useEffect, useState } from "react";
import { getMyProfile } from "../../api/JobSeekerApi";

const JobSeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getMyProfile();
      setProfile(response.data);
    } catch (err) {
      setError("Failed to fetch profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h3>Loading profile...</h3>;
  if (error) return <h3 style={{ color: "red" }}>{error}</h3>;
  if (!profile) return <h3>No profile found</h3>;

  return (
    <div style={styles.container}>
      <h2>Job Seeker Profile</h2>

      <div style={styles.card}>
        <p><strong>Full Name:</strong> {profile.fullName}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Current Company:</strong> {profile.currentCompany}</p>
        <p><strong>Total Experience:</strong> {profile.totalExperience} years</p>
        <p><strong>Current Location:</strong> {profile.currentLocation}</p>
        <p><strong>Preferred Location:</strong> {profile.preferredLocation}</p>
        <p><strong>Skills:</strong> {profile.skills}</p>
        <p><strong>Notice Status:</strong> {profile.noticeStatus}</p>
        <p><strong>Immediate Joiner:</strong> {profile.immediateJoiner ? "Yes" : "No"}</p>
        <p><strong>Available From:</strong> {profile.availableFrom}</p>
        <p><strong>Expected CTC:</strong> ₹{profile.expectedCTC} LPA</p>
        <p>
          <strong>Resume:</strong>{" "}
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
            View Resume
          </a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  card: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    maxWidth: "600px",
    backgroundColor: "#f9f9f9",
  },
};

export default JobSeekerProfile;
