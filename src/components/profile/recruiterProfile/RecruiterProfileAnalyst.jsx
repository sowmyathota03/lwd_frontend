import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getRecruiterProfileSummary, getMyRecruiterProfile } from "../../../api/RecruiterApi";
import { AuthContext } from "../../../context/AuthContext";

const RecruiterProfileAnalyst = ({ userId }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [recruiter, setRecruiter] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    const fetchProfile = userId
      ? getRecruiterProfileSummary(Number(userId))
      : getMyRecruiterProfile();

    fetchProfile
      .then((data) => setRecruiter(data))
      .catch((err) => console.error("Failed to fetch recruiter:", err))
      .finally(() => setLoading(false));
  }, [user, userId]);
  console.log(recruiter);
  if (!user) return <p>Please log in to view recruiter profile.</p>;
  if (loading) return <p>Loading recruiter profile...</p>;
  if (!recruiter) return <p>No recruiter found.</p>;

  
  return (
    <div className="p-6 bg-gray-100 shadow rounded-lg space-y-6">
      {/* Performance Summary */}
      <div className="border-b pb-4">
        <h3 className="text-xl font-semibold mb-2">Performance Summary</h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <li className="text-black">Posted Jobs: {recruiter.myPostedJobs}</li>
          <li className="text-black">Active Jobs: {recruiter.myActiveJobs}</li>
          <li className="text-black">Total Applications: {recruiter.totalApplications}</li>
          <li className="text-black">Interviews Scheduled: {recruiter.interviewsScheduled}</li>
          <li className="text-black">Shortlisted Candidates: {recruiter.shortlistedCandidates}</li>
        </ul>
      </div>

      {/* Per Job Stats */}
      <div className="border-b pb-4">
        <h3 className="text-xl font-semibold mb-2">Per Job Statistics</h3>
        {recruiter.perJobStats?.length ? (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1 text-black">Job Title</th>
                <th className="border px-2 py-1 text-black">Applications</th>
                <th className="border px-2 py-1 text-black">Shortlisted</th>
                <th className="border px-2 py-1 text-black">Rejected</th>
                <th className="border px-2 py-1 text-black">Pending</th>
                <th className="border px-2 py-1 text-black">Interview</th>
              </tr>
            </thead>
            <tbody>
              {recruiter.perJobStats.map((job, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => navigate(`/admin/managejob/${job.jobId}/analytics`)}
                      className="text-black hover:text-blue-600 underline"
                    >
                      {job.jobTitle}
                    </button>
                  </td>
                  <td className="border px-2 py-1 text-black">{job.applications}</td>
                  <td className="border px-2 py-1 text-black">{job.shortlisted}</td>
                  <td className="border px-2 py-1 text-black">{job.rejected}</td>
                  <td className="border px-2 py-1 text-black">{job.pending}</td>
                  <td className="border px-2 py-1 text-black">{job.interview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-black">No job statistics available.</p>
        )}
      </div>

      {/* Recent Applications */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Recent Applications</h3>
        {recruiter.recentApplications?.length ? (
          <table className="w-full border">
            <thead className="bg-gray-100"> 
              <tr>
                <th className="border px-2 py-1 text-black">Candidate Name</th>
                <th className="border px-2 py-1 text-black">Job Title</th>
                <th className="border px-2 py-1 text-black">Applied Date</th>
                <th className="border px-2 py-1 text-black">Status</th>
                <th className="border px-2 py-1 text-black">Source</th>
              </tr>
            </thead>
            <tbody>
              {recruiter.recentApplications.map((app, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1 text-black">{app.candidateName}</td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => navigate(`/recruiter-admin/applications`)}
                      className="text-black hover:text-blue-600 underline"
                    >
                      {app.jobTitle}
                    </button>
                  </td>
                  <td className="border px-2 py-1 text-black">{app.appliedDate}</td>
                  <td className="border px-2 py-1 text-black">{app.status}</td>
                  <td className="border px-2 py-1 text-black">{app.applicationSource}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-black">No recent applications.</p>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfileAnalyst;