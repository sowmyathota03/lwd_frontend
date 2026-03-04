import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";

<<<<<<< HEAD
import JobSeekerSkills from "../../components/profile/JobSeekerSkills";
=======
import { getMyProfile, getUserById } from "../../api/UserApi";
import {
  getJobSeekerProfile,
  getJobSeekerByUserId,
} from "../../api/JobSeekerApi";

>>>>>>> 21cbe117f6ac80007d630ac612f42ef7dc534180
import Loader from "../../components/common/Loader";
import BasicInfo from "../../components/profile/BasicInfo";

import JobSeekerDetails from "../../components/profile/JobSeekerDetails";
import JobSeekerSkills from "../../components/profile/JobSeekerSkills";
import RecruiterDetails from "../../components/profile/RecruiterDetails";
import AdminDetails from "../../components/profile/AdminDetails";
import Education from "./components/Education";
import Internship from "./components/Internship";
import Project from "./components/Project";
import AddStatus from "./components/AddStatus";

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
<<<<<<< HEAD
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-blue-100 to-purple-100 py-12 px-4">
      <div className="max-w-5xl mx-auto rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 px-10 py-8 text-white">
=======
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-indigo-600 px-10 py-8 text-white">
>>>>>>> 21cbe117f6ac80007d630ac612f42ef7dc534180
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold">
              {isOwnProfile
                ? "My Profile"
                : `${basicProfile?.name}`}
            </h2>

            {/* Only Status (No RoleBadge) */}
            <AddStatus updatedAt={basicProfile?.updatedAt} />
          </div>
        </div>

        {/* Content */}
<<<<<<< HEAD
        <div className="bg-white p-10 space-y-8">
=======
        <div className="p-10 space-y-8">
>>>>>>> 21cbe117f6ac80007d630ac612f42ef7dc534180

          {/* Basic Info */}
          <div className="rounded-xl shadow-sm border border-gray-200">
            <BasicInfo
              profile={basicProfile}
              editable={isOwnProfile}
            />
          </div>

          {/* JOB SEEKER SECTIONS */}
          {basicProfile?.role === "JOB_SEEKER" && (
<<<<<<< HEAD
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

=======
            <>
              <div className="rounded-xl shadow-sm border border-gray-200">
                <JobSeekerDetails
                  profile={extendedProfile}
                  setProfile={setExtendedProfile}
                  editable={isOwnProfile}
                />
              </div>

              <div className="rounded-xl shadow-sm border border-gray-200">
                <JobSeekerSkills editable={isOwnProfile} />
              </div>

              <div className="rounded-xl shadow-sm border border-gray-200">
                <Education
                  userId={isOwnProfile ? null : userId}
                  editable={isOwnProfile}
                />
              </div>

              <div className="rounded-xl shadow-sm border border-gray-200">
                <Internship
                  userId={isOwnProfile ? null : userId}
                  editable={isOwnProfile}
                />
              </div>

              <div className="rounded-xl shadow-sm border border-gray-200">
                <Project
                  userId={isOwnProfile ? null : userId}
                  editable={isOwnProfile}
                />
              </div>
            </>
          )}

          {/* RECRUITER SECTION */}
>>>>>>> 21cbe117f6ac80007d630ac612f42ef7dc534180
          {basicProfile?.role === "RECRUITER" && (
            <div className="rounded-xl shadow-sm border border-gray-200">
              <RecruiterDetails editable={isOwnProfile} />
            </div>
          )}

          {/* ADMIN SECTION */}
          {basicProfile?.role === "ADMIN" && (
            <div className="rounded-xl shadow-sm border border-gray-200">
              <AdminDetails editable={isOwnProfile} />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Profile;
