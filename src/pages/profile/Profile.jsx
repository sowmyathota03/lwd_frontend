
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { getMyProfile, getUserById } from '../api/UserApi';
import Loader from '../components/common/Loader';
import JobSeekersProfile from '../../components/profile/JobSeekersProfile'; // adjust path as needed
import RecruiterProfile from '../../components/profile/RecruiterProfile';   // adjust path as needed

function Profile() {

  const { userId } = useParams();
  const { user } = useContext(AuthContext);

  const isOwnProfile = !userId || user?.userId === Number(userId);

  const { data: basicProfile, isLoading } = useQuery({
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

  if (isLoading) return <Loader fullScreen />;

  // ROLE BASED PROFILE
  if (basicProfile?.role === "JOB_SEEKER") {
    return (
      <JobSeekerProfile
        basicProfile={basicProfile}
        isOwnProfile={isOwnProfile}
        userId={userId}
      />
    );
  }

  if (basicProfile?.role === "RECRUITER") {
    return (
      <RecruiterProfile
        basicProfile={basicProfile}
        isOwnProfile={isOwnProfile}
        userId={userId}
      />
    );
  }

  return null;
};


export default Profile; 

