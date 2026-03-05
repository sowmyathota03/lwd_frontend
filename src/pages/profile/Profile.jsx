import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";

import Loader from "../../components/common/Loader";
import BasicInfo from "../../components/profile/BasicInfo";
import JobSeekerDetails from "../../components/profile/JobSeekerDetails";
import JobSeekerSkills from "../../components/profile/JobSeekerSkills";
import RecruiterDetails from "../../components/profile/RecruiterDetails";
import AdminDetails from "../../components/profile/AdminDetails";
import Education from "../../components/profile/Education";
import Internship from "../../components/profile/Internship";
import Project from "../../components/profile/Project";
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
  });

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
  });

  if (basicLoading || extendedLoading) return <Loader fullScreen />;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* PROFILE HEADER */}

        <div className="bg-white rounded-xl p-8 mb-8 shadow-sm">

          <div className="flex items-center gap-6">

            <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-semibold">
              {basicProfile?.name?.charAt(0)}
            </div>

            <div>

              <h1 className="text-2xl font-semibold text-gray-800">
                {basicProfile?.name}
              </h1>

              <p className="text-gray-600">
                {extendedProfile?.designation || "Job Seeker"}
              </p>

              <p className="text-gray-500 text-sm">
                {basicProfile?.email}
              </p>

              <div className="mt-2">
                <AddStatus updatedAt={basicProfile?.updatedAt} />
              </div>

            </div>

          </div>

        </div>

        {/* MAIN GRID */}

        <div className="grid md:grid-cols-4 gap-8">

          {/* SIDEBAR */}

          <div className="bg-white rounded-xl p-6 shadow-sm h-fit">

            <h2 className="text-lg font-semibold mb-5 text-gray-800">
              My Profile
            </h2>

            <ul className="space-y-4 text-gray-600 text-sm">

              <li>
                <a href="#personal" className="hover:text-indigo-600">
                  Personal Info
                </a>
              </li>

              <li>
                <a href="#education" className="hover:text-indigo-600">
                  Education
                </a>
              </li>

              <li>
                <a href="#internship" className="hover:text-indigo-600">
                  Internship
                </a>
              </li>

              <li>
                <a href="#projects" className="hover:text-indigo-600">
                  Projects
                </a>
              </li>

              <li>
                <a href="#skills" className="hover:text-indigo-600">
                  Skills
                </a>
              </li>

            </ul>

          </div>

          {/* CONTENT */}

          <div className="md:col-span-3 space-y-8">

            {/* PERSONAL INFO */}

            <div id="personal" className="bg-white rounded-xl shadow-sm p-6">
              <BasicInfo
                profile={basicProfile}
                editable={isOwnProfile}
              />
            </div>

            {basicProfile?.role === "JOB_SEEKER" && (
              <>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <JobSeekerDetails
                    profile={extendedProfile}
                    editable={isOwnProfile}
                  />
                </div>

                <div id="skills" className="bg-white rounded-xl shadow-sm p-6">
                  <JobSeekerSkills
                    editable={isOwnProfile}
                    isOwnProfile={isOwnProfile}
                    userId={basicProfile?.id}
                  />
                </div>

                <div id="education" className="bg-white rounded-xl shadow-sm p-6">
                  <Education
                    userId={isOwnProfile ? null : userId}
                    editable={isOwnProfile}
                  />
                </div>

                <div id="internship" className="bg-white rounded-xl shadow-sm p-6">
                  <Internship
                    userId={isOwnProfile ? null : userId}
                    editable={isOwnProfile}
                  />
                </div>

                <div id="projects" className="bg-white rounded-xl shadow-sm p-6">
                  <Project
                    userId={isOwnProfile ? null : userId}
                    editable={isOwnProfile}
                  />
                </div>

              </>
            )}

            {basicProfile?.role === "RECRUITER" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <RecruiterDetails editable={isOwnProfile} />
              </div>
            )}

            {basicProfile?.role === "ADMIN" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <AdminDetails editable={isOwnProfile} />
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;

