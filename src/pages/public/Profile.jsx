import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getMyProfile, getUserById, updateMyProfile } from "../../api/UserApi";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext); // ✅ from context

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [editing, setEditing] = useState(false);

  const loggedInUserId = user?.userId; // 👈 comes from JWT

  useEffect(() => {
    if (!loggedInUserId && !userId) return;

    const fetchProfile = userId
      ? getUserById(userId)
      : getMyProfile();

    fetchProfile
      .then((res) => {
        setProfile(res.data);

        if (res.data.id === loggedInUserId) {
          setFormData({
            name: res.data.name || "",
            phone: res.data.phone || "",
          });
        }
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
        setEditing(false);
      })
      .catch((err) => console.error("Error updating profile:", err));
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name || "",
      phone: profile.phone || "",
    });
    setEditing(false);
  };

  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            User Profile
          </h2>

          <span className="px-4 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-700">
            {profile.role}
          </span>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <p className="font-medium text-gray-500">Name</p>
            <p className="text-base font-semibold">{profile.name}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500">Email</p>
            <p className="text-base">{profile.email}</p>
          </div>

          <div>
            <p className="font-medium text-gray-500">Phone</p>
            <p className="text-base">{profile.phone || "-"}</p>
          </div>
        </div>

        {/* Edit Section */}
        {isOwnProfile && (
          <div className="border-t pt-6 space-y-4">

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
              >
                Update Profile
              </button>
            ) : (
              <div className="space-y-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleUpdate}
                    className="px-6 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;
