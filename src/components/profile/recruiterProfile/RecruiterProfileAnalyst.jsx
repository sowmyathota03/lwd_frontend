import { useEffect, useState, useContext } from "react";
import { getRecruiterProfileSummary, getMyRecruiterProfile } from "../../../api/RecruiterApi";
import { AuthContext } from "../../../context/AuthContext";

const RecruiterProfileAnalyst = ({ userId }) => {
  const { user } = useContext(AuthContext);
  const [recruiter, setRecruiter] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    // Determine which API to call
    const fetchProfile = userId
      ? getRecruiterProfileSummary(Number(userId)) // Admin/company view
      : getMyRecruiterProfile();                   // Self view

    fetchProfile
      .then((data) => setRecruiter(data))
      .catch((err) => console.error("Failed to fetch recruiter:", err))
      .finally(() => setLoading(false));
  }, [user, userId]);

  if (!user) return <p>Please log in to view recruiter profile.</p>;
  if (loading) return <p>Loading recruiter profile...</p>;
  if (!recruiter) return <p>No recruiter found.</p>;

  return (
    <div className="p-6 bg-white shadow rounded-lg space-y-6">
      {/* Basic Info */}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-semibold">{recruiter.name}</h2>
        <p>{recruiter.designation}</p>
        <p>{recruiter.location}</p>
        <p>{recruiter.phone}</p>
        <p>
          LinkedIn:{" "}
          {recruiter.linkedinUrl ? (
            <a
              href={recruiter.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View Profile
            </a>
          ) : (
            "Not Provided"
          )}
        </p>
        <p>About: {recruiter.about}</p>
      </div>

      {/* Performance Summary */}
      <div className="border-b pb-4">
        <h3 className="text-xl font-semibold mb-2">Performance Summary</h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <li>Posted Jobs: {recruiter.myPostedJobs}</li>
          <li>Active Jobs: {recruiter.myActiveJobs}</li>
          <li>Total Applications: {recruiter.totalApplications}</li>
          <li>Interviews Scheduled: {recruiter.interviewsScheduled}</li>
          <li>Shortlisted Candidates: {recruiter.shortlistedCandidates}</li>
        </ul>
      </div>

      {/* Per Job Stats */}
      <div className="border-b pb-4">
        <h3 className="text-xl font-semibold mb-2">Per Job Statistics</h3>
        {recruiter.perJobStats?.length ? (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Job Title</th>
                <th className="border px-2 py-1">Applications</th>
                <th className="border px-2 py-1">Shortlisted</th>
                <th className="border px-2 py-1">Rejected</th>
                <th className="border px-2 py-1">Pending</th>
                <th className="border px-2 py-1">Interview</th>
              </tr>
            </thead>
            <tbody>
              {recruiter.perJobStats.map((job, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{job.jobTitle}</td>
                  <td className="border px-2 py-1">{job.applications}</td>
                  <td className="border px-2 py-1">{job.shortlisted}</td>
                  <td className="border px-2 py-1">{job.rejected}</td>
                  <td className="border px-2 py-1">{job.pending}</td>
                  <td className="border px-2 py-1">{job.interview}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No job statistics available.</p>
        )}
      </div>

      {/* Recent Applications */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Recent Applications</h3>
        {recruiter.recentApplications?.length ? (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Candidate Name</th>
                <th className="border px-2 py-1">Job Title</th>
                <th className="border px-2 py-1">Applied Date</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Source</th>
              </tr>
            </thead>
            <tbody>
              {recruiter.recentApplications.map((app, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{app.candidateName}</td>
                  <td className="border px-2 py-1">{app.jobTitle}</td>
                  <td className="border px-2 py-1">{app.appliedDate}</td>
                  <td className="border px-2 py-1">{app.status}</td>
                  <td className="border px-2 py-1">{app.applicationSource}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recent applications.</p>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfileAnalyst;
