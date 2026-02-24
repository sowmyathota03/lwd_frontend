import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { getMyProfile, getUserById } from "../../api/UserApi";

import {
  getMyProfile as getJobSeekerProfile,
  getJobSeekerByUserId,
} from "../../api/JobSeekerApi";

import Loader from "../../components/common/Loader";
import BasicInfo from "../../components/profile/BasicInfo";
import RoleBadge from "../../components/profile/RoleBadge";
import JobSeekerDetails from "../../components/profile/JobSeekerDetails";
import RecruiterDetails from "../../components/profile/RecruiterDetails";
import AdminDetails from "../../components/profile/AdminDetails";

const Profile = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);

  const [basicProfile, setBasicProfile] = useState(null);
  const [extendedProfile, setExtendedProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const isOwnProfile = !userId || user?.userId === Number(userId);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        let basicRes;

        // 🔹 If visiting /profile → own profile
        if (!userId) {
          basicRes = await getMyProfile();
        } else {
          // 🔹 Visiting /profile/:userId
          basicRes = await getUserById(userId);
        }

        const userData = basicRes.data;
        setBasicProfile(userData);

        // 🔹 Fetch extended profile based on role
        if (userData.role === "JOB_SEEKER") {
          if (isOwnProfile) {
            const js = await getJobSeekerProfile();
            setExtendedProfile(js.data);
          } else {
            const js = await getJobSeekerByUserId(userId);
            setExtendedProfile(js.data);
          }
        }

        // Future:
        // if (userData.role === "RECRUITER") { ... }
      } catch (err) {
        console.error("Profile load error", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  if (loading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">
            {isOwnProfile ? "My Profile" : `${basicProfile?.name} - Profile`}
          </h2>
          <RoleBadge role={basicProfile?.role} />
        </div>

        <BasicInfo
          profile={basicProfile}
          setProfile={setBasicProfile}
          editable={isOwnProfile}
        />

        {basicProfile?.role === "JOB_SEEKER" && (
          <JobSeekerDetails
            profile={extendedProfile}
            setProfile={setExtendedProfile}
            editable={isOwnProfile}
          />
        )}

        {basicProfile?.role === "RECRUITER" && (
          <RecruiterDetails editable={isOwnProfile} />
        )}

        {basicProfile?.role === "ADMIN" && (
          <AdminDetails editable={isOwnProfile} />
        )}
      </div>
    </div>
  );
};

export default Profile;
