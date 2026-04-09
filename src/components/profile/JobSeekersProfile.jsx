import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import Loader from "../common/Loader";
import JobSeekerDetails from "./jobseekersProfile/JobSeekerDetails";
import JobSeekerSkills from "./jobseekersProfile/JobSeekerSkills";
import Experience from "./jobseekersProfile/Experience";
import Education from "./jobseekersProfile/Education";
import Internship from "./jobseekersProfile/Internship";
import Project from "./jobseekersProfile/Project";
import Certification from "./jobseekersProfile/Certification";
import AboutInfo from "./jobseekersProfile/AboutInfo";
import ProfileCompletion from "./jobseekersProfile/ProfileCompletion";
import ResumeUpload from "./jobseekersProfile/ResumeUpload";
import LinkedInUrl from "./jobseekersProfile/LinkedInUrl";
import GitHubUrl from "./jobseekersProfile/GitHubUrl";

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

  const isOwnProfile = !userId || user?.userId === Number(userId);

  const [focusTarget, setFocusTarget] = useState(null);
  const [basicProfile, setBasicProfile] = useState(null);
  const [jobSeekerProfile, setJobSeekerProfile] = useState(null);

  const [basicLoading, setBasicLoading] = useState(true);
  const [extendedLoading, setExtendedLoading] = useState(true);

  // ✅ NEW: sidebar state
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (focusTarget?.sectionId) {
      const element = document.getElementById(focusTarget.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
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
    setFocusTarget(target || null);
  };

  const sections = [
    {
      id: "about",
      title: "About",
      component: (
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
      id: "job-seeker-details",
      title: "Job Seeker Details",
      component: (
        <JobSeekerDetails
          profile={jobSeekerProfile}
          setProfile={setJobSeekerProfile}
          editable={isOwnProfile}
        />
      ),
    },
    {
      id: "skills",
      title: "Skills",
      component: (
        <JobSeekerSkills
          editable={isOwnProfile}
          isOwnProfile={isOwnProfile}
          userId={userId}
        />
      ),
    },
    {
      id: "experience",
      title: "Experience",
      component: <Experience editable={isOwnProfile} userId={userId} />,
    },
    {
      id: "education",
      title: "Education",
      component: <Education editable={isOwnProfile} userId={userId} />,
    },
    {
      id: "internship",
      title: "Internship",
      component: <Internship editable={isOwnProfile} userId={userId} />,
    },
    {
      id: "project",
      title: "Projects",
      component: <Project editable={isOwnProfile} userId={userId} />,
    },
    {
      id: "certification",
      title: "Certifications",
      component: <Certification editable={isOwnProfile} userId={userId} />,
    },
    {
      id: "resume",
      title: "Resume",
      component: <ResumeUpload editable={isOwnProfile} userId={userId} />,
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      component: <LinkedInUrl editable={isOwnProfile} userId={userId} />,
    },
    {
      id: "github",
      title: "GitHub",
      component: <GitHubUrl editable={isOwnProfile} userId={userId} />,
    },
  ];

  return (
    <div className="lwd-page py-6 px-4">
      {/* ✅ Mobile Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowSidebar(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          ☰ Sections
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row relative">
        {/* ✅ Overlay */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* ✅ Sidebar */}
        <aside
          className={`
            fixed lg:static top-0 left-0 h-full z-50 bg-white dark:bg-slate-900
            w-64 p-4 transform transition-transform duration-300
            ${showSidebar ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:w-1/4
          `}
        >
          <h3 className="lwd-label mb-4 uppercase">Profile Sections</h3>

          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth" });
                setShowSidebar(false); // auto close
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-sm hover:bg-blue-50 dark:hover:bg-slate-800"
            >
              {section.title}
            </button>
          ))}
        </aside>

        {/* ✅ Content */}
        <main className="w-full lg:w-3/4 p-6">
          <div className="mb-6 lwd-card bg-linear-to-r from-blue-600 to-indigo-700 text-white flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {isOwnProfile ? "My Profile" : basicProfile?.name}
            </h1>
            <div>
              <AddStatus
                isActive={basicProfile?.isActive}
                lastActiveAt={basicProfile?.lastActiveAt}
              />
            </div>
          </div>

          <div className="mb-6 lwd-card">
            <ProfileCompletion
              userId={userId}
              isOwnProfile={isOwnProfile}
              onMissingClick={handleMissingClick}
            />
          </div>

          <div className="space-y-6">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <div className="lwd-card lwd-card-hover">
                  <div className="lwd-section-header">{section.title}</div>
                  <div className="p-4">{section.component}</div>
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobSeekerProfile;
