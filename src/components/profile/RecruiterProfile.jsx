import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";

import Loader from "../common/Loader";
import BasicInfo from "../profile/comman/BasicInfo";
import RecruiterDetails from "./recruiterProfile/RecruiterDetails";
import RecruiterProfileAnalyst from "./recruiterProfile/RecruiterProfileAnalyst";

import { getMyProfile, getUserById } from "../../api/UserApi";
import {
  getRecruiterProfile,
  getRecruiterByUserId,
} from "../../api/RecruiterApi";

const RecruiterProfile = () => {
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

  /* ================= RECRUITER PROFILE ================= */

  const { data: extendedProfile, isLoading: extendedLoading } = useQuery({
    queryKey: ["recruiterProfile", basicProfile?.id],
    queryFn: async () => {
      if (isOwnProfile) {
        const res = await getRecruiterProfile();
        return res.data;
      } else {
        const res = await getRecruiterByUserId(userId);
        return res.data;
      }
    },
    enabled: !!basicProfile && basicProfile.role === "RECRUITER",
  });

  const [recruiterProfile, setRecruiterProfile] = useState(null);

  useEffect(() => {
    if (extendedProfile) setRecruiterProfile(extendedProfile);
  }, [extendedProfile]);

  if (basicLoading || extendedLoading) return <Loader fullScreen />;

  /* ================= SECTIONS ================= */

  const sections = [
    {
      id: "basic-info",
      title: "Basic Info",
      component: basicProfile.role === "RECRUITER" && (
        <BasicInfo
          profile={basicProfile}
          setProfile={setRecruiterProfile}
          editable={isOwnProfile}
        />
      ),
    },
    {
      id: "recruiter-details",
      title: "Recruiter Details",
      component: basicProfile.role === "RECRUITER" && (
        <RecruiterDetails
          profile={recruiterProfile}
          setProfile={setRecruiterProfile}
          editable={isOwnProfile}
        />
      ),
    },
    {
      id: "recruiter-analytics",
      title: "Recruiter Analytics",
      component: basicProfile.role === "RECRUITER" && (
        <RecruiterProfileAnalyst
          userId={isOwnProfile ? null : userId}
          editable={isOwnProfile}
        />
      ),
    },
  ];

  return (
    <div className="lwd-page py-6 px-4">
      <div className="max-w-7xl mx-auto lwd-card flex flex-col md:flex-row overflow-hidden">

        {/* LEFT SIDEBAR */}
        <aside className="w-full md:w-1/4 lwd-sidebar sticky top-4 h-[calc(100vh-32px)] overflow-auto">

          <h3 className="lwd-label mb-4 uppercase">
            Profile Sections
          </h3>

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
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium
                  text-gray-700 hover:bg-blue-50 hover:text-blue-700
                  dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:text-blue-400
                  transition"
                >
                  {section.title}
                </button>
              ),
          )}
        </aside>

        {/* RIGHT CONTENT */}
        <main className="w-full md:w-3/4 p-6 space-y-6">

          {/* HEADER */}
          <div className="lwd-card bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <h2 className="text-2xl font-semibold">
              {isOwnProfile
                ? "My Recruiter Profile"
                : `${basicProfile?.name || "Recruiter Profile"}`}
            </h2>
          </div>

          {/* SECTIONS */}
          <div className="space-y-6">
            {sections.map(
              (section) =>
                section.component && (
                  <section key={section.id} id={section.id}>
                    <div className="lwd-card lwd-card-hover">

                      <div className="lwd-section-header">
                        {section.title}
                      </div>

                      <div className="p-4">
                        {section.component}
                      </div>

                    </div>
                  </section>
                ),
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RecruiterProfile;