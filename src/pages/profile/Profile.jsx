import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";

import Loader from "../../components/common/Loader";
import JobSeekerDetails from "../../components/profile/JobSeekerDetails";
import JobSeekerSkills from "../../components/profile/JobSeekerSkills";
import RecruiterDetails from "../../components/profile/RecruiterDetails";
import AdminDetails from "../../components/profile/AdminDetails";
import Experience from "../../components/profile/Experience";
import BasicInfo from "../../components/profile/BasicInfo";

import Education from "./components/Education";
import Internship from "./components/Internship";
import Project from "./components/Project";

import AddStatus from "./components/AddStatus";

import { getMyProfile, getUserById } from "../../api/UserApi";
import {
  getJobSeekerProfile,
  getJobSeekerByUserId,
} from "../../api/JobSeekerApi";
import AboutInfo from "../../components/profile/AboutInfo";
import ProfileCompletion from "../../components/profile/ProfileCompletion";

const Profile = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);

  const isOwnProfile = !userId || user?.userId === Number(userId);

  // ================= BASIC PROFILE =================
  const { data: basicProfile, isLoading: basicLoading } = useQuery({
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

  // ================= JOB SEEKER PROFILE =================
  const { data: extendedProfile, isLoading: extendedLoading } = useQuery({
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

  // ================= LOCAL STATE FOR INSTANT UPDATE =================
  const [jobSeekerProfile, setJobSeekerProfile] = useState(null);

  useEffect(() => {
    if (extendedProfile) {
      setJobSeekerProfile(extendedProfile);
    }
  }, [extendedProfile]);

  if (basicLoading || extendedLoading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-indigo-500 px-10 py-8 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-semibold">
              {isOwnProfile ? "My Profile" : `${basicProfile?.name}`}
            </h2>
            <div className="flex flex-col text-sm text-gray-500 gap-1 items-center">
              <AddStatus updatedAt={basicProfile?.updatedAt} />

              {basicProfile?.updatedAt && (
                <span className="flex items-center gap-1">
                  <span>Last updated</span>
                  <span className="font-medium text-gray-700">
                    {new Date(basicProfile.updatedAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
        {basicProfile?.role === "JOB_SEEKER" && <ProfileCompletion />}

        <div className="p-10 space-y-8">
          <div className="rounded-xl shadow-sm border border-gray-200">
            <BasicInfo
              profile={basicProfile}
              setProfile={setJobSeekerProfile}
              editable={isOwnProfile}
            />
          </div>

          {basicProfile?.role === "JOB_SEEKER" && (
            <>
              <div className="rounded-xl shadow-sm border border-gray-200">
                <JobSeekerDetails
                  profile={jobSeekerProfile}
                  setProfile={setJobSeekerProfile}
                  editable={isOwnProfile}
                />
              </div>

              <div className="rounded-xl shadow-sm border border-gray-200">
                <AboutInfo
                  profile={jobSeekerProfile}
                  setProfile={setJobSeekerProfile}
                  editable={isOwnProfile}
                  userId={userId}
                  isOwnProfile={isOwnProfile}
                />
              </div>

              <div className="rounded-xl shadow-sm border border-gray-200">
                <JobSeekerSkills
                  editable={isOwnProfile}
                  isOwnProfile={isOwnProfile}
                  userId={basicProfile?.id}
                />
              </div>

              <div className="rounded-xl shadow-sm border border-gray-200">
                <Education
                  userId={isOwnProfile ? null : userId}
                  editable={isOwnProfile}
                />
              </div>

              <div className="rounded-xl shadow-sm border border-gray-200">
                <Experience
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

          {basicProfile?.role === "RECRUITER" && (
            <div className="rounded-xl shadow-sm border border-gray-200">
              <RecruiterDetails editable={isOwnProfile} />
            </div>
          )}

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
