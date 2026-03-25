import { useState } from "react";
import SearchCompanies from "../company/SearchCompanies";
import { requestCompanyApproval } from "../../api/RecruiterApi";

function RecruiterCompanyRequest() {
  const [loadingCompanyId, setLoadingCompanyId] = useState(null);

  const handleRequestApproval = async (companyId) => {
    try {
      setLoadingCompanyId(companyId);

      await requestCompanyApproval(companyId);

      alert("Company approval request sent successfully");
    } catch (error) {
      console.error("Error sending request", error);
      alert("Failed to send request");
    } finally {
      setLoadingCompanyId(null);
    }
  };

  return (
    <div className="lwd-page p-6">

      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="lwd-card">
          <h2 className="lwd-title text-2xl">
            Request Company Access
          </h2>

          <p className="lwd-text mt-2">
            Search your company and request job posting access.
          </p>
        </div>

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