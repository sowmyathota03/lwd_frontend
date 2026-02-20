import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobsByRecruiter } from "../../api/RecruiterAdminApi";
import Loader from "../common/Loader";

export default function JobListPage() {
  const { recruiterId } = useParams();
  console.log("Recruiter ID from URL:", recruiterId);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (recruiterId) {
      fetchJobs();
    }
  }, [recruiterId]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getJobsByRecruiter(recruiterId);
      console.log("Fetched Jobs:", data);
      setJobs(data);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="mt-6 text-center text-gray-600 font-medium">
       <Loader fullScreen={false} />
      </p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Jobs Posted by Recruiter
      </h2>

      {error && (
        <p className="mb-4 text-center text-red-500 font-medium">
          {error}
        </p>
      )}

      {jobs.length === 0 ? (
        <p className="mt-6 text-center text-gray-500">
          No jobs found
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-blue-50 text-gray-700">
                <th className="px-4 py-3 text-left font-semibold">Title</th>
                <th className="px-4 py-3 text-left font-semibold">Company</th>
                <th className="px-4 py-3 text-left font-semibold">Location</th>
                <th className="px-4 py-3 text-left font-semibold">Experience</th>
                <th className="px-4 py-3 text-left font-semibold">Type</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-3">{job.title}</td>
                  <td className="px-4 py-3">
                    {job.company?.companyName || "-"}
                  </td>
                  <td className="px-4 py-3">{job.location}</td>
                  <td className="px-4 py-3">
                    {job.minExperience} - {job.maxExperience} yrs
                  </td>
                  <td className="px-4 py-3">{job.jobType}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-semibold ${
                        job.status.toLowerCase() === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
