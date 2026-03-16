import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import Loader from "../common/Loader";
import JobSeekerDetails from "./jobseekersProfile/JobSeekerDetails";
import JobSeekerSkills from "./jobseekersProfile/JobSeekerSkills";
import Experience from "./jobseekersProfile/Experience";
import BasicInfo from "../profile/comman/BasicInfo";
import Education from "./jobseekersProfile/Education";
import Internship from "./jobseekersProfile/Internship";
import Project from "./jobseekersProfile/Project";
import Certification from "./jobseekersProfile/Certification";
import AboutInfo from "./jobseekersProfile/AboutInfo";
import ProfileCompletion from "./jobseekersProfile/ProfileCompletion";
import ResumeUpload from "./jobseekersProfile/ResumeUpload";
import LinkedInUrl from "./jobseekersProfile/LinkedInUrl";
import GitHubUrl from "./jobseekersProfile/GitHubUrl";
import CareerObjective from "./jobseekersProfile/CareerObjective";

import AddStatus from "../../pages/profile/components/AddStatus";

import { getMyProfile, getUserById } from "../../api/UserApi";
import {
  getJobSeekerProfile,
  getJobSeekerByUserId,
} from "../../api/JobSeekerApi";

const MISSING_ITEM_MAP = {
  "Add headline": { sectionId: "basic-info", field: "headline" },
  "Add about section": { sectionId: "about", field: "about" },
  "Add location": { sectionId: "basic-info", field: "location" },
  "Add skills": { sectionId: "skills", field: "skills" },
  "Add education": { sectionId: "education", field: "education" },
  "Add experience": { sectionId: "experience", field: "experience" },
  "Upload resume": { sectionId: "resume", field: "resume" },
  "Add availability details": {
    sectionId: "job-seeker-details",
    field: "availability",
  },
  "Add expected salary": {
    sectionId: "job-seeker-details",
    field: "expectedCtc",
  },
  "Upload profile photo": { sectionId: "basic-info", field: "profileImage" },
  "Add internships": { sectionId: "internship", field: "internship" },
  "Add projects": { sectionId: "project", field: "project" },
  "Add certifications": { sectionId: "certification", field: "certification" },
};

const JobSeekerProfile = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const scrollContainerRef = useRef(null);

  const isOwnProfile = !userId || user?.userId === Number(userId);

  const [focusTarget, setFocusTarget] = useState(null);

  const [basicProfile, setBasicProfile] = useState(null);
  const [jobSeekerProfile, setJobSeekerProfile] = useState(null);

  const [basicLoading, setBasicLoading] = useState(true);
  const [extendedLoading, setExtendedLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (focusTarget?.sectionId) {
      const element = document.getElementById(focusTarget.sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }, [focusTarget]);

  /* ================= BASIC PROFILE ================= */
  useEffect(() => {
    const fetchBasicProfile = async () => {
      try {
        setBasicLoading(true);

        let res;

        if (isOwnProfile) {
          res = await getMyProfile();
        } else {
          res = await getUserById(userId);
        }
        console.log("Basic Profile:", res.data);

        setBasicProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setBasicLoading(false);
      }
    };

    fetchBasicProfile();
  }, [userId, isOwnProfile]);

  /* ================= JOB SEEKER PROFILE ================= */
  useEffect(() => {
    const fetchExtendedProfile = async () => {
      if (!basicProfile || basicProfile.role !== "JOB_SEEKER") {
        setExtendedLoading(false);
        return;
      }

      try {
        setExtendedLoading(true);

        let res;

        if (isOwnProfile) {
          res = await getJobSeekerProfile();
        } else {
          res = await getJobSeekerByUserId(userId);
        }
        setJobSeekerProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setExtendedLoading(false);
      }
    };

    fetchExtendedProfile();
  }, [basicProfile, userId, isOwnProfile]);

  if (basicLoading || extendedLoading) return <Loader fullScreen />;

  const handleMissingClick = (missingItem) => {
    const target = MISSING_ITEM_MAP[missingItem];
    if (target) {
      setFocusTarget(target);
    } else {
      setFocusTarget(null);
    }
  };

  /* ================= SECTIONS ================= */
  const sections = [
    {
      id: "basic-info",
      title: "Basic Info",
      component: (
        <BasicInfo
          profile={basicProfile}
          setProfile={setJobSeekerProfile}
          editable={isOwnProfile}
          focusField={
            focusTarget?.sectionId === "basic-info" ? focusTarget.field : null
          }
        />
      ),
    },
    {
      id: "job-seeker-details",
      title: "Job Seeker Details",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <JobSeekerDetails
          profile={jobSeekerProfile}
          setProfile={setJobSeekerProfile}
          editable={isOwnProfile}
          focusField={
            focusTarget?.sectionId === "job-seeker-details"
              ? focusTarget.field
              : null
          }
        />
      ),
    },

    {
      id: "about",
      title: "About",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <AboutInfo
          profile={jobSeekerProfile}
          setProfile={setJobSeekerProfile}
          editable={isOwnProfile}
          userId={userId}
          isOwnProfile={isOwnProfile}
          focusField={
            focusTarget?.sectionId === "about" ? focusTarget.field : null
          }
        />
      ),
    },

    {
      id: "career-objective",
      title: "Career Objective",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <CareerObjective
          editable={isOwnProfile}
          objective={jobSeekerProfile?.careerObjective}
        />
      ),
    },

    {
      id: "skills",
      title: "Skills",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <JobSeekerSkills
          editable={isOwnProfile}
          isOwnProfile={isOwnProfile}
          userId={basicProfile?.id}
          focusField={
            focusTarget?.sectionId === "skills" ? focusTarget.field : null
          }
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
          focusField={
            focusTarget?.sectionId === "experience" ? focusTarget.field : null
          }
        />
      ),
    },

    {
      id: "education",
      title: "Education",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <Education
          userId={isOwnProfile ? null : userId}
          editable={isOwnProfile}
          focusField={
            focusTarget?.sectionId === "education" ? focusTarget.field : null
          }
        />
      ),
    },

    {
      id: "internship",
      title: "Internship",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <Internship
          userId={isOwnProfile ? null : userId}
          editable={isOwnProfile}
          focusField={
            focusTarget?.sectionId === "internship" ? focusTarget.field : null
          }
        />
      ),
    },

    {
      id: "project",
      title: "Projects",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <Project
          userId={isOwnProfile ? null : userId}
          editable={isOwnProfile}
          focusField={
            focusTarget?.sectionId === "project" ? focusTarget.field : null
          }
        />
      ),
    },

    {
      id: "certification",
      title: "Certifications",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <Certification
          userId={isOwnProfile ? null : userId}
          editable={isOwnProfile}
          focusField={
            focusTarget?.sectionId === "certification"
              ? focusTarget.field
              : null
          }
        />
      ),
    },

    {
      id: "resume",
      title: "Resume",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <ResumeUpload
          userId={isOwnProfile ? null : userId}
          editable={isOwnProfile}
          initialFile={jobSeekerProfile?.resume}
          focusField={
            focusTarget?.sectionId === "resume" ? focusTarget.field : null
          }
        />
      ),
    },

    {
      id: "linkedin",
      title: "LinkedIn",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <LinkedInUrl
          editable={isOwnProfile}
          initialUrl={jobSeekerProfile?.linkedinUrl}
        />
      ),
    },

    {
      id: "github",
      title: "GitHub",
      component: basicProfile?.role === "JOB_SEEKER" && (
        <GitHubUrl
          editable={isOwnProfile}
          initialUrl={jobSeekerProfile?.githubUrl}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* LEFT SIDEBAR - Navigation */}
        <aside className="w-full lg:w-1/4 bg-gray-50 border-r border-gray-200 p-6 sticky top-0 lg:top-6 h-fit lg:h-[calc(100vh-3rem)] overflow-y-auto">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Profile Sections
          </h3>
          <nav className="space-y-1">
            {sections.map(
              (section) =>
                section.component && (
                  <button
                    key={section.id}
                    onClick={() => {
                      const el = document.getElementById(section.id);
                      if (el) {
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {section.title}
                  </button>
                ),
            )}
          </nav>
        </aside>

        {/* RIGHT CONTENT - Profile sections */}
        <main
          ref={scrollContainerRef}
          className="w-full lg:w-3/4 bg-white p-6 lg:p-8"
        >
          {/* Profile Header Card */}
          <div className="mb-8 bg-linear-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-1">
                  {isOwnProfile
                    ? "My Profile"
                    : basicProfile?.name || "User Profile"}
                </h1>
                {basicProfile?.role && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/20 rounded-full">
                    {basicProfile.role.replace("_", " ")}
                  </span>
                )}
              </div>
              <div className="mt-4 md:mt-0 space-y-1 text-sm text-blue-100">
                <AddStatus
                  isActive={basicProfile?.isActive}
                  lastActiveAt={basicProfile?.lastActiveAt}
                />
                {basicProfile?.updatedAt && (
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>
                      Last updated{" "}
                      {new Date(basicProfile.updatedAt).toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Completion Widget */}
          <div className="mb-8">
            <ProfileCompletion
              userId={basicProfile?.id}
              isOwnProfile={isOwnProfile}
              scrollContainerRef={scrollContainerRef}
              onMissingClick={handleMissingClick}
            />
          </div>

          {/* All Profile Sections */}
          <div className="space-y-6">
            {sections.map(
              (section) =>
                section.component && (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-4"
                  >
                    {section.component}
                  </section>
                ),
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
