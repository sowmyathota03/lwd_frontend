import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMyCompany } from "../../api/CompanyApi";
import Loader from "../common/Loader";

export default function CompanyOnboardingGate() {
  const [targetPath, setTargetPath] = useState(null);

  useEffect(() => {
    checkCompanyStatus();
  }, []);

  const checkCompanyStatus = async () => {
    try {
      const company = await getMyCompany();

      if (!company) {
        setTargetPath("/company/setup");
        return;
      }

      switch (company.status) {
        case "PENDING":
          setTargetPath("/company/pending");
          break;
        case "ACTIVE":
          setTargetPath("/company-admin/dashboard");
          break;
        case "REJECTED":
          setTargetPath("/company/rejected");
          break;
        case "SUSPENDED":
          setTargetPath("/company/suspended");
          break;
        default:
          setTargetPath("/company/setup");
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        setTargetPath("/company/setup");
      } else {
        setTargetPath("/login");
      }
    }
  };

  if (!targetPath) {
    return (
      <div className="lwd-page flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader />
          <p className="lwd-text mt-4">Checking company status...</p>
        </div>
      </div>
    );
  }

  return <Navigate to={targetPath} replace />;
}