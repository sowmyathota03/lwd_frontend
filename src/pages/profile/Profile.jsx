import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";

import JobSeekerSkills from "../../components/profile/JobSeekerSkills";
import Loader from "../../components/common/Loader";
import BasicInfo from "../../components/profile/BasicInfo";
import RoleBadge from "../../components/profile/RoleBadge";
import JobSeekerDetails from "../../components/profile/JobSeekerDetails";
import RecruiterDetails from "../../components/profile/RecruiterDetails";
import AdminDetails from "../../components/profile/AdminDetails";

import { getMyProfile, getUserById } from "../../api/UserApi";
import {
  getJobSeekerProfile,
  getJobSeekerByUserId,
} from "../../api/JobSeekerApi";

const Profile = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);

  const isOwnProfile = !userId || user?.userId === Number(userId);

  /* ================= BASIC PROFILE QUERY ================= */

  const {
    data: basicProfile,
    isLoading: basicLoading,
  } = useQuery({
    queryKey: ["profile", userId || "me"],
    queryFn: async () => {
      if (!userId) {
        const res = await getMyProfile();
        return res.data;
      } else {
        const res = await getUserById(userId);
        return res.data;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  /* ================= EXTENDED PROFILE QUERY ================= */

  const {
    data: extendedProfile,
    isLoading: extendedLoading,
  } = useQuery({
    queryKey: ["jobSeekerProfile", userId || "me"],
    queryFn: async () => {
      if (!basicProfile || basicProfile.role !== "JOB_SEEKER") return null;

      if (isOwnProfile) {
        const res = await getJobSeekerProfile();
        return res.data;
      } else {
        const res = await getJobSeekerByUserId(userId);
        return res.data;
      }
    },
    enabled: !!basicProfile && basicProfile.role === "JOB_SEEKER",
    staleTime: 5 * 60 * 1000,
  });

  if (basicLoading || extendedLoading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-blue-100 to-purple-100 py-12 px-4">
      <div className="max-w-5xl mx-auto rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 px-10 py-8 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold tracking-wide">
              {isOwnProfile
                ? "My Profile"
                : `${basicProfile?.name} - Profile`}
            </h2>
            <RoleBadge role={basicProfile?.role} />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-10 space-y-8">

          <div className="bg-linear-to-r from-white to-gray-50 rounded-xl shadow-md border border-gray-200">
            <BasicInfo
              profile={basicProfile}
              editable={isOwnProfile}
            />
          </div>

          {basicProfile?.role === "JOB_SEEKER" && (
            <div className="bg-linear-to-r from-white to-gray-50 rounded-xl shadow-md border border-gray-200">
              <JobSeekerDetails
                profile={extendedProfile}
                editable={isOwnProfile}
              />
            </div>
          )}

          {basicProfile?.role === "JOB_SEEKER" && (
            <JobSeekerSkills
              editable={isOwnProfile}
              isOwnProfile={isOwnProfile}
              userId={basicProfile?.id}
            />
          )}

          {basicProfile?.role === "RECRUITER" && (
            <div className="bg-linear-to-r from-white to-gray-50 rounded-xl shadow-md border border-gray-200">
              <RecruiterDetails editable={isOwnProfile} />
            </div>
          )}

          {basicProfile?.role === "ADMIN" && (
            <div className="bg-linear-to-r from-white to-gray-50 rounded-xl shadow-md border border-gray-200">
              <AdminDetails editable={isOwnProfile} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
