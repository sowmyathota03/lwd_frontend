// pages/ProfilePage.jsx
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../context/AuthContext';
import { getMyProfile, getUserById } from '../api/UserApi';
import Loader from '../components/common/Loader';
import JobSeekersProfile from '../../components/profile/JobSeekersProfile'; // adjust path as needed
import RecruiterProfile from '../../components/profile/RecruiterProfile';   // adjust path as needed

function ProfilePage() {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);

  const isOwnProfile = !userId || user?.userId === Number(userId);

  // Fetch basic profile to determine role
  const { data: basicProfile, isLoading, error } = useQuery({
    queryKey: ['profile', userId || 'me'],
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
  if (error) return <p className="text-center text-red-500">Failed to load profile.</p>;
  if (!basicProfile) return <p className="text-center">No profile found.</p>;

  // Render based on role
  if (basicProfile.role === 'JOB_SEEKER') {
    return <JobSeekersProfile />; // JobSeekersProfile already fetches its own data
  }

  if (basicProfile.role === 'RECRUITER') {
    return (
      <RecruiterProfile
        basicProfile={basicProfile}
        isOwnProfile={isOwnProfile}
        userId={userId}
      />
    );
  }

  // Handle admin or other roles if needed
  return <p className="text-center">Profile type not supported.</p>;
}

export default ProfilePage;