import { useEffect } from "react";

<<<<<<< HEAD:src/pages/recruiterProfile/RecruiterProfile.jsx
import BasicInfo from "../../pages/recruiterProfile/components/BasicInfo"
import RecruiterDetails from "../../pages/recruiterProfile/components/RecruiterDetails";
import SocialLinks from "../../pages/recruiterProfile/components/SocialLinks";
=======
import BasicInfo from "../../components/profile/recruiterProfile/BasicInfo"
import RecruiterDetails from "../../components/profile/recruiterProfile/RecruiterDetails";
import CompanyLogo from "../../components/profile/recruiterProfile/CompanyLogo";
import CompanyWebsite from "../../components/profile/recruiterProfile/CompanyWebsite";
import SocialLinks from "../../components/profile/recruiterProfile/SocialLinks";
import CompanyDetails from "../../components/profile/recruiterProfile/CompanyDetails";
import PostedJobs from "../../components/profile/recruiterProfile/PostedJobs";
>>>>>>> d55b448611d5053be68cf7d61bdb970050651b02:src/pages/profile/RecruiterProfile.jsx

const RecruiterProfile = ({ basicProfile, isOwnProfile, userId }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            id: "basic-info",
            title: "Basic Info",
            component: (
                <BasicInfo
                    profile={basicProfile}
                    editable={isOwnProfile}
                />
            ),
        },
        {
            id: "recruiter-details",
            title: "Recruiter Details",
            component: (
                <RecruiterDetails editable={isOwnProfile} />
            ),
        },
        {
            id: "social-links",
            title: "Social Links",
            component: (
                <SocialLinks editable={isOwnProfile} />
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

                    {/* HEADER */}
                    <div className="bg-indigo-500 px-6 py-6 text-white rounded-xl mb-4">
                        <h2 className="text-2xl font-semibold">
                            {isOwnProfile
                                ? "My Recruiter Profile"
                                : `${basicProfile?.name || "Recruiter Profile"}`}
                        </h2>
                    </div>

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

                </div>

            </div>

        </div>
    );
};

export default RecruiterProfile;