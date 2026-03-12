// components/profile/RecruiterProfile.jsx
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BasicInfo from "../profile/comman/BasicInfo";
import RecruiterDetails from './recruiterProfile/RecruiterDetails';
import CompanyLogo from './recruiterProfile/CompanyLogo';
import CompanyWebsite from './recruiterProfile/CompanyWebsite';
import SocialLinks from './recruiterProfile/SocialLinks';
import CompanyDetails from './recruiterProfile/CompanyDetails';
import PostedJobs from './recruiterProfile/PostedJobs';
import Loader from '../common/Loader';
import { getRecruiterProfile, getRecruiterByUserId } from '../../api/UserApi'; // adjust path as needed

const RecruiterProfile = ({ basicProfile, isOwnProfile, userId }) => {
  const [recruiterProfile, setRecruiterProfile] = useState(null);

  // Fetch recruiter-specific profile
  const { isLoading, error } = useQuery({
    queryKey: ['recruiterProfile', userId || 'me'],
    queryFn: async () => {
      let res;
      if (isOwnProfile) {
        res = await getRecruiterProfile();
      } else {
        res = await getRecruiterByUserId(userId);
      }
      return res.data;
    },
    enabled: !!basicProfile, // only run when basicProfile is available
    onSuccess: (data) => setRecruiterProfile(data),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Loader fullScreen />;
  if (error) return <p className="text-center text-red-500">Failed to load recruiter profile.</p>;

  const sections = [
    {
      id: 'basic-info',
      title: 'Basic Info',
      component: <BasicInfo profile={basicProfile} setProfile={setRecruiterProfile} editable={isOwnProfile} />,
    },
    {
      id: 'recruiter-details',
      title: 'Recruiter Details',
      component: (
        <RecruiterDetails
          profile={recruiterProfile}
          setProfile={setRecruiterProfile}
          editable={isOwnProfile}
        />
      ),
    },
    {
      id: 'company-logo',
      title: 'Company Logo',
      component: (
        <CompanyLogo
          logoUrl={recruiterProfile?.logo}
          onUpdate={(newLogo) =>
            setRecruiterProfile((prev) => ({ ...prev, logo: newLogo }))
          }
          editable={isOwnProfile}
        />
      ),
    },
    {
      id: 'company-website',
      title: 'Company Website',
      component: (
        <CompanyWebsite
          website={recruiterProfile?.website}
          onUpdate={(newWebsite) =>
            setRecruiterProfile((prev) => ({ ...prev, website: newWebsite }))
          }
          editable={isOwnProfile}
        />
      ),
    },
    {
      id: 'social-links',
      title: 'Social Links',
      component: (
        <SocialLinks
          links={recruiterProfile?.socialLinks}
          onUpdate={(newLinks) =>
            setRecruiterProfile((prev) => ({ ...prev, socialLinks: newLinks }))
          }
          editable={isOwnProfile}
        />
      ),
    },
    {
      id: 'company-details',
      title: 'Company Details',
      component: (
        <CompanyDetails
          details={recruiterProfile?.companyDetails}
          onUpdate={(newDetails) =>
            setRecruiterProfile((prev) => ({ ...prev, companyDetails: newDetails }))
          }
          editable={isOwnProfile}
        />
      ),
    },
    {
      id: 'posted-jobs',
      title: 'Posted Jobs',
      component: <PostedJobs userId={userId} editable={isOwnProfile} />,
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
                      ?.scrollIntoView({ behavior: 'smooth' })
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
                ? 'My Recruiter Profile'
                : basicProfile?.name || 'Recruiter Profile'}
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