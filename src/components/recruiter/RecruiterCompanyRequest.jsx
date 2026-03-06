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
    <div className="p-6 space-y-6">

      <h2 className="text-2xl font-semibold">
        Request Company Access
      </h2>

      <p className="text-gray-600">
        Search your company and request job posting access.
      </p>

      <SearchCompanies
        showRequestButton={true}
        onRequestCompany={handleRequestApproval}
        loadingCompanyId={loadingCompanyId}
      />

    </div>
  );
}

export default RecruiterCompanyRequest;
