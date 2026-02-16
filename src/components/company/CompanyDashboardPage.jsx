import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CompanyDashboardPage.css";
import { getCompanyById } from "../api/CompanyApi";

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

  if (loading) return <p className="loading">Loading company...</p>;
  if (!company) return <p className="error">Company not found</p>;

  return (
    <div className="company-dashboard">
      <div className="company-card">
        <h2>{company.companyName}</h2>

        <div className="company-meta">
          {company.location} •{" "}
          <a href={company.website} target="_blank" rel="noreferrer">
            {company.website}
          </a>
        </div>

        <span
          className={`status-badge ${
            company.isActive ? "active" : "blocked"
          }`}
        >
          {company.isActive ? "ACTIVE" : "BLOCKED"}
        </span>

        <div className="dashboard-actions">
          <button
            onClick={() => navigate(`/admin/company/${companyId}/recruiters`)}
          >
            View Recruiters
          </button>


          <button
            onClick={() =>
              navigate(`/recruiter-admin/companies/${companyId}/jobs`)
            }
          >
            View Jobs
          </button>

          <button
            className="secondary"
            onClick={() =>
              navigate(
                `/recruiter-admin/companies/${companyId}/applications`
              )
            }
          >
            View Applications
          </button>
        </div>
      </div>
    </div>
  );
}
