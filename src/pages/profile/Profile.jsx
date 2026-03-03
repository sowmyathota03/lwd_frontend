import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { getMyProfile, getUserById } from "../../api/UserApi";
import {
  getJobSeekerProfile,
  getJobSeekerByUserId,
} from "../../api/JobSeekerApi";

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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-indigo-600 px-10 py-8 text-white">
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
        <div className="p-10 space-y-8">

          {/* Basic Info */}
          <div className="rounded-xl shadow-sm border border-gray-200">
            <BasicInfo
              profile={basicProfile}
              setProfile={setBasicProfile}
              editable={isOwnProfile}
            />
          </div>

          {/* JOB SEEKER SECTIONS */}
          {basicProfile?.role === "JOB_SEEKER" && (
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