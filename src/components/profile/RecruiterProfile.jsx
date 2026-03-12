import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";

import Loader from "../common/Loader";
import BasicInfo from "../profile/comman/BasicInfo";
import RecruiterDetails from "./recruiterProfile/RecruiterDetails";
import CompanyLogo from "./recruiterProfile/CompanyLogo";
import CompanyWebsite from "./recruiterProfile/CompanyWebsite";
import SocialLinks from "./recruiterProfile/SocialLinks";
import CompanyDetails from "./recruiterProfile/CompanyDetails";
import PostedJobs from "./recruiterProfile/PostedJobs";

import { getMyProfile, getUserById } from "../../api/UserApi";
import {
  getRecruiterProfile,
  getRecruiterByUserId,
} from "../../api/RecruiterApi";
import RecruiterProfileAnalyst from "./recruiterProfile/RecruiterProfileAnalyst";

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
          userId={isOwnProfile ? null : userId} // null for logged-in recruiter
          editable={isOwnProfile} // if self-profile
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
              ),
          )}
        </div>

        {/* RIGHT CONTENT */}

        <div className="w-full md:w-3/4 border-r border-gray-200 bg-gray-50 p-4 space-y-2 sticky top-4 h-[calc(100vh-32px)] overflow-auto">
          {/* HEADER */}

          <div className="bg-indigo-500 p-4 text-white rounded-xl">
            <h2 className="text-2xl font-semibold">
              {isOwnProfile
                ? "My Recruiter Profile"
                : `${basicProfile?.name || "Recruiter Profile"}`}
            </h2>
          </div>

          {/* SECTIONS */}

          <div className="p-10 space-y-8">
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
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
