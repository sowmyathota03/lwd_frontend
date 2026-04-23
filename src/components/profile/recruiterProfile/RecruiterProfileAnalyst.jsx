import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  getRecruiterProfileSummary,
  getMyRecruiterProfile,
} from "../../../api/RecruiterApi";
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

  if (!user)
    return <p className="lwd-text">Please log in to view recruiter profile.</p>;

  if (loading)
    return <p className="lwd-text">Loading recruiter profile...</p>;

  if (!recruiter)
    return <p className="lwd-text">No recruiter found.</p>;

  return (
    <div className="lwd-page p-6 space-y-6">

      {/* Performance Summary */}
      <div className="lwd-card lwd-card-hover">
        <h3 className="lwd-title mb-4">Performance Summary</h3>

        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <li className="lwd-text">Posted Jobs: {recruiter.myPostedJobs}</li>
          <li className="lwd-text">Active Jobs: {recruiter.myActiveJobs}</li>
          <li className="lwd-text">Total Applications: {recruiter.totalApplications}</li>
          <li className="lwd-text">Interviews Scheduled: {recruiter.interviewsScheduled}</li>
          <li className="lwd-text">Shortlisted Candidates: {recruiter.shortlistedCandidates}</li>
        </ul>
      </div>

      {/* Per Job Stats */}
      <div className="lwd-card lwd-card-hover">
        <h3 className="lwd-title mb-4">Per Job Statistics</h3>

        {recruiter.perJobStats?.length ? (
          <table className="lwd-table">
            <thead className="lwd-table-header">
              <tr>
                <th className="px-3 py-2 text-left">Job Title</th>
                <th className="px-3 py-2 text-left">Applications</th>
                <th className="px-3 py-2 text-left">Shortlisted</th>
                <th className="px-3 py-2 text-left">Rejected</th>
                <th className="px-3 py-2 text-left">Pending</th>
                <th className="px-3 py-2 text-left">Interview</th>
              </tr>
            </thead>

            <tbody>
              {recruiter.perJobStats.map((job, idx) => (
                <tr key={idx} className="lwd-table-row">
                  <td className="px-3 py-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/managejob/${job.jobId}/analytics`)
                      }
                      className="lwd-link"
                    >
                      {job.jobTitle}
                    </button>
                  </td>

                  <td className="px-3 py-2">{job.applications}</td>
                  <td className="px-3 py-2">{job.shortlisted}</td>
                  <td className="px-3 py-2">{job.rejected}</td>
                  <td className="px-3 py-2">{job.pending}</td>
                  <td className="px-3 py-2">{job.interview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="lwd-text">No job statistics available.</p>
        )}
      </div>

      {/* Recent Applications */}
      <div className="lwd-card lwd-card-hover">
        <h3 className="lwd-title mb-4">Recent Applications</h3>

        {recruiter.recentApplications?.length ? (
          <table className="lwd-table">
            <thead className="lwd-table-header">
              <tr>
                <th className="px-3 py-2 text-left">Candidate Name</th>
                <th className="px-3 py-2 text-left">Job Title</th>
                <th className="px-3 py-2 text-left">Applied Date</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-left">Source</th>
              </tr>
            </thead>

            <tbody>
              {recruiter.recentApplications.map((app, idx) => (
                <tr key={idx} className="lwd-table-row">
                  <td className="px-3 py-2">{app.candidateName}</td>

                  <td className="px-3 py-2">
                    <button
                      onClick={() =>
                        navigate(`/company-admin/applications`)
                      }
                      className="lwd-link"
                    >
                      {app.jobTitle}
                    </button>
                  </td>

                  <td className="px-3 py-2">{app.appliedDate}</td>
                  <td className="px-3 py-2">
                    <span className="lwd-badge">{app.status}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="lwd-badge">
                      {app.applicationSource}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="lwd-text">No recent applications.</p>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfileAnalyst;