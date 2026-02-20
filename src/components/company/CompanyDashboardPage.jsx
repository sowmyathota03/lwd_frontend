import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCompanyById } from "../api/CompanyApi";
import Loader from "../components/common/Loader";

export default function CompanyDashboardPage() {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const data = await getCompanyById(companyId);
        setCompany(data);
      } catch (err) {
        console.error("Failed to fetch company", err);
      } finally {
        setLoading(false);
      }
    };

    loadCompany();
  }, [companyId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 mt-12">
        <Loader fullScreen={false} />
      </div>
    );

  if (!company)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 mt-12">
        <p className="text-red-500 font-medium">
          Company not found
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6 mt-12">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        
        {/* Company Name */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {company.companyName}
        </h2>

        {/* Meta Info */}
        <div className="text-sm text-gray-500 mb-4">
          {company.location} •{" "}
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            {company.website}
          </a>
        </div>

        {/* Status Badge */}
        <span
          className={`inline-flex items-center px-4 py-1 rounded-full text-xs font-semibold tracking-wide ${
            company.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {company.isActive ? "ACTIVE" : "BLOCKED"}
        </span>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={() =>
              navigate(`/admin/company/${companyId}/recruiters`)
            }
            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition transform hover:-translate-y-0.5"
          >
            View Recruiters
          </button>

          <button
            onClick={() =>
              navigate(`/recruiter-admin/companies/${companyId}/jobs`)
            }
            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition transform hover:-translate-y-0.5"
          >
            View Jobs
          </button>

          <button
            onClick={() =>
              navigate(
                `/recruiter-admin/companies/${companyId}/applications`
              )
            }
            className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 text-sm font-medium hover:bg-gray-300 transition transform hover:-translate-y-0.5"
          >
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
}
