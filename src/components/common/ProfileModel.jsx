import { useEffect, useState} from "react";
import { getUserById } from "../../api/UserApi";

const ProfileModal = ({ userId, onClose }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!userId) return;

    getUserById(userId)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  if (!profile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      
      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-gray-200 p-6 space-y-6 animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
        >
          ×
        </button>

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            User Profile
          </h2>

          {profile.role && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 uppercase">
              {profile.role}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="space-y-4 text-sm">
          {profile.name && (
            <div>
              <p className="text-gray-500 text-xs uppercase">Name</p>
              <p className="font-medium text-gray-800">{profile.name}</p>
            </div>
          )}

          {profile.email && (
            <div>
              <p className="text-gray-500 text-xs uppercase">Email</p>
              <p className="text-gray-700 wrap-break-word">{profile.email}</p>
            </div>
          )}

          {profile.phone && profile.phone.trim() !== "" && (
            <div>
              <p className="text-gray-500 text-xs uppercase">Phone</p>
              <p className="text-gray-700">{profile.phone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
