import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMyCompany } from "../../api/CompanyApi";
import Loader from "../common/Loader";

export default function CompanyAdminRouteGuard({ children }) {
  const [allowed, setAllowed] = useState(null);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const company = await getMyCompany();

      if (!company) {
        setRedirectPath("/company/setup");
        setAllowed(false);
        return;
      }

      switch (company.status) {
        case "ACTIVE":
          setAllowed(true);
          break;
        case "PENDING":
          setRedirectPath("/company/pending");
          setAllowed(false);
          break;
        case "REJECTED":
          setRedirectPath("/company/rejected");
          setAllowed(false);
          break;
        case "SUSPENDED":
          setRedirectPath("/company/suspended");
          setAllowed(false);
          break;
        default:
          setRedirectPath("/company/setup");
          setAllowed(false);
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        setRedirectPath("/company/setup");
      } else {
        setRedirectPath("/login");
      }
      setAllowed(false);
    }
  };

  if (allowed === null) {
    return (
      <div className="lwd-page flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader />
          <p className="lwd-text mt-4">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
}