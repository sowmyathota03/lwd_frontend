import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext";

import Loader from "../../components/common/Loader";
import JobSeekerProfile from "../../components/profile/JobSeekersProfile";
import RecruiterProfile from "../../components/profile/RecruiterProfile";

import { getMyProfile, getUserById } from "../../api/UserApi";

const Profile = () => {

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

  return (
    <div key={userId || "me"}>
      {basicProfile?.role === "JOB_SEEKER" && (
        <JobSeekerProfile
          basicProfile={basicProfile}
          isOwnProfile={isOwnProfile}
          userId={userId}
        />
      )}

      {basicProfile?.role === "RECRUITER" && (
        <RecruiterProfile
          basicProfile={basicProfile}
          isOwnProfile={isOwnProfile}
          userId={userId}
        />
      )}
    </div>
  );
};

export default Profile;
