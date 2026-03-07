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
import Education from "../../components/profile/Education";
import Internship from "../../components/profile/Internship";
import Project from "../../components/profile/Project";
import Certification from "../../components/profile/Certification";
import AboutInfo from "../../components/profile/AboutInfo";
import ProfileCompletion from "../../components/profile/ProfileCompletion";
import ResumeUpload from "../../components/profile/ResumeUpload";
import LinkedInUrl from "../../components/profile/LinkedInUrl";
import GitHubUrl from "../../components/profile/GitHubUrl";
import CareerObjective from "../../components/profile/CareerObjective";
import Achievements from "../../components/profile/Achievements";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /* ================= BASIC PROFILE ================= */
  const { data: basicProfile, isLoading: basicLoading } = useQuery({
    queryKey: ["profile", userId || "me"],
    queryFn: async () => {
      if (isOwnProfile) {
        const res = await getMyProfile();
        return res.data;
      } else {
        const res = await getUserById(userId);
        return res.data;
      }
    },
  });

  /* ================= JOB SEEKER PROFILE ================= */
  const { data: extendedProfile, isLoading: extendedLoading } = useQuery({
    queryKey: ["jobSeekerProfile", basicProfile?.id],
    queryFn: async () => {
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

  const [jobSeekerProfile, setJobSeekerProfile] = useState(null);

  useEffect(() => {
    if (extendedProfile) setJobSeekerProfile(extendedProfile);
  }, [extendedProfile]);

  if (basicLoading || extendedLoading) return <Loader fullScreen />;

  /* ================= SECTIONS ================= */
  const sections = [
    {
      id: "basic-info",
      title: "Basic Info",
      component: <BasicInfo profile={basicProfile} editable={isOwnProfile} />,
    },
    {
      id: "job-seeker-details",
      title: "Job Seeker Details",
      component:
        basicProfile?.role === "JOB_SEEKER" && (
          <JobSeekerDetails
            profile={jobSeekerProfile}
            setProfile={setJobSeekerProfile}
            editable={isOwnProfile}
          />
        ),
    },
    {
      id: "about",
      title: "About",
      component:
        basicProfile?.role === "JOB_SEEKER" && (
          <AboutInfo
            profile={jobSeekerProfile}
            setProfile={setJobSeekerProfile}
            editable={isOwnProfile}
            userId={userId}
            isOwnProfile={isOwnProfile}
          />
        ),
    },
    {
      id: "career-objective",
      title: "Career Objective",
      component:
        basicProfile?.role === "JOB_SEEKER" && (
          <CareerObjective
            editable={isOwnProfile}
            objective={jobSeekerProfile?.careerObjective}
          />
        ),
    },
    {
      id: "skills",
      title: "Skills",
      component:
        basicProfile?.role === "JOB_SEEKER" && (
          <JobSeekerSkills
            editable={isOwnProfile}
            isOwnProfile={isOwnProfile}
            userId={basicProfile?.id}
          />
        ),
    },
    {
      id: "experience",
      title: "Experience",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <Experience
          userId={isOwnProfile ? null : userId}
          editable={isOwnProfile}
        />
      ),
    },
    {
      id: "education",
      title: "Education",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <Education userId={isOwnProfile ? null : userId} editable={isOwnProfile} />
      ),
    },
    {
      id: "internship",
      title: "Internship",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <Internship userId={isOwnProfile ? null : userId} editable={isOwnProfile} />
      ),
    },
    {
      id: "project",
      title: "Projects",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <Project userId={isOwnProfile ? null : userId} editable={isOwnProfile} />
      ),
    },
    {
      id: "certification",
      title: "Certifications",
      component: basicProfile?.role === "JOB_SEEKER" &&(
        <Certification userId={isOwnProfile ? null : userId} editable={isOwnProfile} />
      ),
    },

    /* ================= ACHIEVEMENTS ================= */
    {
      id: "achievements",
      title: "Achievements",
      component:
        basicProfile?.role === "JOB_SEEKER" && (
          <Achievements
            editable={isOwnProfile}
            achievements={jobSeekerProfile?.achievements}
          />
        ),
    },

    {
      id: "resume",
      title: "Resume",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <ResumeUpload
          editable={isOwnProfile}
          initialFile={jobSeekerProfile?.resume}
        />
      ),
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      component: basicProfile?.role === "JOB_SEEKER" &&(
        <LinkedInUrl
          editable={isOwnProfile}
          initialUrl={jobSeekerProfile?.linkedinUrl}
        />
      ),
    },
    {
      id: "github",
      title: "GitHub",
      component: basicProfile?.role === "JOB_SEEKER" &&(
        <GitHubUrl
          editable={isOwnProfile}
          initialUrl={jobSeekerProfile?.githubUrl}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-1/4 border-r border-gray-200 bg-gray-50 p-4 space-y-2 sticky top-4 h-[calc(100vh-32px)] overflow-auto">
          {sections.map(
            (section) =>
              section.component && (
                <button
                  key={section.id}
                  onClick={() =>
                    document
                      .getElementById(section.id)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="w-full text-left px-3 py-2 rounded hover:bg-gray-200 transition font-medium text-gray-700"
                >
                  {section.title}
                </button>
              )
          )}
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-4 md:p-6 space-y-4 overflow-auto">

          <div className="bg-indigo-500 px-6 py-6 text-white rounded-xl mb-4">
            <h2 className="text-2xl font-semibold">
              {isOwnProfile
                ? "My Profile"
                : `${basicProfile?.name || "User Profile"}`}
            </h2>
          </div>

          {basicProfile?.role === "JOB_SEEKER" && <ProfileCompletion />}

          {sections.map(
            (section) =>
              section.component && (
                <div
                  key={section.id}
                  id={section.id}
                  className="rounded-xl shadow-sm border border-gray-200 p-4"
                >
                  {section.component}
                </div>
              )
          )}

          {basicProfile?.role === "RECRUITER" && (
            <div className="rounded-xl shadow-sm border border-gray-200 p-4">
              <RecruiterDetails editable={isOwnProfile} />
            </div>
          )}

          {basicProfile?.role === "ADMIN" && (
            <div className="rounded-xl shadow-sm border border-gray-200 p-4">
              <AdminDetails editable={isOwnProfile} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;