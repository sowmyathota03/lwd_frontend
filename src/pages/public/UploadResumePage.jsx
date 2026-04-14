import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ResumeUpload from "../../components/profile/jobseekersProfile/ResumeUpload";

const ResumeUploadPage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login first.</div>;

  return (
    <div className="min-h-screen lwd-page flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <ResumeUpload editable={true} userId={user.userId} />
      </div>
    </div>
  );
};

export default ResumeUploadPage;
