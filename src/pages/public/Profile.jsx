import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMyProfile, getUserById, updateMyProfile } from "../../api/UserApi";
import "./Profile.css";

// Simple JWT decoder (only decodes payload)
function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (err) {
    console.error("Invalid JWT token", err);
    return null;
  }
}

const Profile = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [editing, setEditing] = useState(false); // controls form visibility

  // Decode JWT to get logged-in user ID
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded) {
        const id = Number(decoded.userId);
        setLoggedInUserId(id);
      }
    }
  }, []);

  // Fetch profile (own or other)
  useEffect(() => {
    if (loggedInUserId === null) return;

    const fetchProfile = userId ? getUserById(userId) : getMyProfile();

    fetchProfile
      .then((res) => {
        setProfile(res.data);
        if (res.data.id === loggedInUserId) {
          setFormData({
            name: res.data.name || "",
            phone: res.data.phone || "",
          });
        }
        console.log("Fetched profile:", res.data);
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, [userId, loggedInUserId]);

  const isOwnProfile = profile?.id === loggedInUserId;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    updateMyProfile(formData)
      .then((res) => {
        setProfile(res.data);
        setEditing(false); // collapse form after update
        alert("Profile updated successfully!");
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  const handleCancel = () => {
    // reset form to original values
    setFormData({
      name: profile.name || "",
      phone: profile.phone || "",
    });
    setEditing(false);
  };

  if (!profile) return <p className="loading-text">Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      <p><b>Name:</b> {profile.name}</p>
      <p><b>Email:</b> {profile.email}</p>
      <p><b>Phone:</b> {profile.phone || "-"}</p>
      <p><b>Role:</b> {profile.role}</p>
      <p><b>Status:</b> {profile.isActive ? "Active" : "Inactive"}</p>
      <p><b>Created At:</b> {new Date(profile.createdAt).toLocaleDateString("en-GB")}</p>
      <p><b>Updated At:</b> {new Date(profile.updatedAt).toLocaleDateString("en-GB")}</p>
      {profile.companyName && (
          <p><b>Company:</b> {profile.companyName}</p>
        )}



      {/* Update section for own profile */}
      {isOwnProfile && (
        <div className="update-section">
          {!editing ? (
            <button onClick={() => setEditing(true)}>Update Profile</button>
          ) : (
            <div className="update-form">
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Name"
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                placeholder="Phone"
                onChange={handleChange}
              />
              <div className="form-buttons">
                <button className="confirm" onClick={handleUpdate}>Confirm</button>
                <button className="cancel" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
