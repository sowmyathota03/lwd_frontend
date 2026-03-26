import { useState } from "react";
import SearchCompanies from "../company/SearchCompanies";
import { requestCompanyApproval } from "../../api/RecruiterApi";

function RecruiterCompanyRequest() {
  const [loadingCompanyId, setLoadingCompanyId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequestApproval = async (companyId) => {
    try {
      setLoadingCompanyId(companyId);
      setMessage("");
      setError("");

      await requestCompanyApproval(companyId);

      setMessage("Company approval request sent successfully ✅");
    } catch (err) {
      console.error("Error sending request", err);
      setError("Failed to send request ❌");
    } finally {
      setLoadingCompanyId(null);
    }
  };

  return (
    <div className="lwd-page p-6">

      <div className="lwd-container space-y-6">

        {/* HEADER */}
        <div className="lwd-card">
          <h2 className="lwd-page-title">
            Request Company Access
          </h2>

          <p className="lwd-text mt-2">
            Search your company and request job posting access.
          </p>
        </div>

        {/* SUCCESS MESSAGE */}
        {message && (
          <div className="lwd-card text-sm text-green-700 bg-green-100 dark:bg-green-900/40 dark:text-green-300 text-center">
            {message}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {error && (
          <div className="lwd-card text-sm text-red-700 bg-red-100 dark:bg-red-900/40 dark:text-red-300 text-center">
            {error}
          </div>
        )}

        {/* SEARCH SECTION */}
        <div className="lwd-card lwd-card-hover">
          <SearchCompanies
            showRequestButton={true}
            onRequestCompany={handleRequestApproval}
            loadingCompanyId={loadingCompanyId}
          />
        </div>

      </div>
    </div>
  );
}

export default RecruiterCompanyRequest;