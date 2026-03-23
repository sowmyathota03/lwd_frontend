import { useEffect, useState } from "react";
import { getCompanyAnalytics } from "../../api/CompanyApi";
import Loader from "../../components/common/Loader";

export default function CompanyAnalytics(companyId) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, [companyId]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getCompanyAnalytics(companyId);
      setAnalytics(data);
    } catch (err) {
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="lwd-page max-w-6xl mx-auto px-4 py-6 space-y-6">

      {/* Title */}
      <h2 className="lwd-title text-2xl">
        Company Analytics
      </h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="lwd-card p-6">
          <p className="lwd-text">Total Jobs</p>
          <h3 className="text-3xl font-bold text-blue-600">
            {analytics.totalJobs}
          </h3>
        </div>

        <div className="lwd-card p-6">
          <p className="lwd-text">Total Recruiters</p>
          <h3 className="text-3xl font-bold text-green-600">
            {analytics.totalRecruiters}
          </h3>
        </div>

        <div className="lwd-card p-6">
          <p className="lwd-text">Total Applications</p>
          <h3 className="text-3xl font-bold text-purple-600">
            {analytics.totalApplications}
          </h3>
        </div>

      </div>

      {/* Job Status Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="lwd-card p-6">
          <p className="lwd-text">Active Jobs</p>
          <h3 className="text-3xl font-bold text-green-600">
            {analytics.activeJobs}
          </h3>
        </div>

        <div className="lwd-card p-6">
          <p className="lwd-text">Closed Jobs</p>
          <h3 className="text-3xl font-bold text-red-600">
            {analytics.closedJobs}
          </h3>
        </div>

      </div>

    </div>
  );
}