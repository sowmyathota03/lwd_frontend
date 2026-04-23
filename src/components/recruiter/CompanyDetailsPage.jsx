import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import { getCompanyById } from "../../api/CompanyApi";

function CompanyDetailsPage() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);
        setError("");

        // Replace this with real API
        // const res = await getCompanyById(id);
        // setCompany(res.data);

        setCompany({
          id,
          name: "Infosys",
          industry: "IT Services",
          location: "Bengaluru",
          email: "hr@infosys.com",
          website: "https://www.infosys.com",
          description:
            "Infosys is a global leader in consulting, technology, and digital transformation services.",
        });
      } catch (err) {
        console.error("Failed to load company", err);
        setError("Failed to load company details");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="lwd-page p-6">
        <div className="lwd-container">
          <div className="lwd-card text-center">Loading company details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="lwd-page p-6">
        <div className="lwd-container">
          <div className="lwd-card text-red-600 dark:text-red-400 text-center">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="lwd-page p-6">
        <div className="lwd-container">
          <div className="lwd-card text-center">Company not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="lwd-page p-6">
      <div className="lwd-container space-y-6">
        <div className="lwd-card">
          <h1 className="lwd-page-title">{company.name}</h1>
          <p className="lwd-text mt-2">
            View company information before sending recruiter access request.
          </p>
        </div>

        <div className="lwd-card space-y-4">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Industry
            </h2>
            <p className="lwd-text mt-1">{company.industry || "N/A"}</p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Location
            </h2>
            <p className="lwd-text mt-1">{company.location || "N/A"}</p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Email
            </h2>
            <p className="lwd-text mt-1">{company.email || "N/A"}</p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Website
            </h2>
            <p className="lwd-text mt-1">
              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {company.website}
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Description
            </h2>
            <p className="lwd-text mt-1">{company.description || "N/A"}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/recruiter/company-requests" className="lwd-btn-primary">
            Go to Request Page
          </Link>

          <Link to="/recruiter/companies" className="lwd-btn-secondary">
            Back to Companies
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetailsPage;