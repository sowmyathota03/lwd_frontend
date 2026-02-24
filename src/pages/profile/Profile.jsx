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

        if (!userId) {
          basicRes = await getMyProfile();
        } else {
          basicRes = await getUserById(userId);
        }

        const userData = basicRes.data;
        setBasicProfile(userData);

        if (userData.role === "JOB_SEEKER") {
          if (isOwnProfile) {
            const js = await getJobSeekerProfile();
            setExtendedProfile(js.data);
          } else {
            const js = await getJobSeekerByUserId(userId);
            setExtendedProfile(js.data);
          }
        }
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 py-12 px-4">

      <div className="max-w-5xl mx-auto rounded-2xl shadow-xl overflow-hidden">

        {/* Header Gradient */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-10 py-8 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold tracking-wide">
              {isOwnProfile
                ? "My Profile"
                : `${basicProfile?.name} - Profile`}
            </h2>
            <RoleBadge role={basicProfile?.role} />
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white p-10 space-y-8">

          <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-md p-6 border border-gray-200">
            <BasicInfo
              profile={basicProfile}
              setProfile={setBasicProfile}
              editable={isOwnProfile}
            />
          </div>

          {basicProfile?.role === "JOB_SEEKER" && (
            <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-md p-6 border border-gray-200">
              <JobSeekerDetails
                profile={extendedProfile}
                setProfile={setExtendedProfile}
                editable={isOwnProfile}
              />
            </div>
          )}

          {basicProfile?.role === "RECRUITER" && (
            <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-md p-6 border border-gray-200">
              <RecruiterDetails editable={isOwnProfile} />
            </div>
          )}

          {basicProfile?.role === "ADMIN" && (
            <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-md p-6 border border-gray-200">
              <AdminDetails editable={isOwnProfile} />
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Profile;